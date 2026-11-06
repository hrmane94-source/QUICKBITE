# QuickBite — System Architecture Specification

> **Document Version:** 1.0.0  
> **Milestone:** 03 — Official Project Documentation  
> **Status:** Architectural Baseline  

---

## 1. System Overview

QuickBite is an event-driven, real-time client-server platform designed for high-concurrency burst workloads typical of college campus dining hours. The architecture leverages a monorepo structure housing a React Native / Expo mobile client, a React / TypeScript business dashboard, shared validation logic, and a cloud-native Supabase (PostgreSQL 15+) backend.

```mermaid
graph TD
    subgraph Clients["Client Applications"]
        StudentApp["Student Mobile App<br/>(React Native / Expo)"]
        BizDash["Business Dashboard<br/>(React / TypeScript)"]
    end

    subgraph Edge["Gateway & Edge Layer"]
        SupabaseAuth["Supabase Auth<br/>(Phone OTP / JWT)"]
        EdgeFuncs["Supabase Edge Functions<br/>(Deno / TypeScript)<br/>- UPI Webhook Verification<br/>- OCR Document Extraction"]
    end

    subgraph Realtime["Synchronization Layer"]
        SupabaseRealtime["Supabase Realtime Engine<br/>(WebSockets / PostgreSQL CDC)"]
    end

    subgraph Data["Database & Storage Layer"]
        PostgreSQL[("PostgreSQL 15+ Database<br/>- Row Level Security (RLS)<br/>- Stored Procedures & Triggers")]
        Storage[("Supabase Storage<br/>- Food Photography<br/>- Encrypted ID Cards")]
    end

    subgraph External["External Services"]
        UPIProviders["UPI PSP Apps<br/>(GPay, PhonePe, Paytm, CRED)"]
        OCRService["OCR Engine<br/>(ML Vision Extraction)"]
    end

    StudentApp -->|GraphQL / REST / JWT| PostgreSQL
    StudentApp -->|Subscribe Order Updates| SupabaseRealtime
    StudentApp -->|Deep-Link Payment Intent| UPIProviders
    StudentApp -->|Upload ID Scan| EdgeFuncs

    BizDash -->|REST / JWT| PostgreSQL
    BizDash -->|Subscribe Live KDS Queue| SupabaseRealtime

    EdgeFuncs -->|Verify Webhooks / S2S| UPIProviders
    EdgeFuncs -->|Process Extraction| OCRService
    EdgeFuncs -->|Direct Mutations| PostgreSQL

    PostgreSQL -->|Change Data Capture (CDC)| SupabaseRealtime
```

---

## 2. Monorepo Organization & Code Boundaries

The codebase is organized into isolated, reusable workspaces under the root project directory:

```text
QUICKBITE/
├── apps/
│   ├── student-app/          # Mobile client for iOS and Android
│   └── business-dashboard/   # Web SPA for canteen operators and managers
├── packages/
│   └── shared/               # Shared domain models, contracts, DTOs, schemas
├── supabase/
│   ├── migrations/           # Versioned, reproducible SQL migrations
│   ├── functions/            # Serverless Edge Functions
│   └── seed/                 # Development datasets (campuses, menus)
├── docs/                     # Specifications and architectural documentation
└── design/                   # Brand tokens, UI references, and exports
```

### Module Boundaries & Responsibilities

| Directory | Scope | Dependencies & Restrictions |
| :--- | :--- | :--- |
| `apps/student-app` | React Native (Expo) consumer application | Imports from `packages/shared`. Never imports dashboard code. |
| `apps/business-dashboard` | React web application for kitchen operations | Imports from `packages/shared`. Never imports mobile app code. |
| `packages/shared` | Platform-agnostic TypeScript | Zero client dependencies (no React or React Native dependencies). Contains Zod schemas, interfaces, shared constants. |
| `supabase/migrations` | Pure SQL (PostgreSQL DDL/DML) | Versioned, idempotent schema migrations and RLS policies. |
| `supabase/functions` | Deno runtime Edge Functions | Executes sensitive business operations (UPI callbacks, OCR data handling). |

---

## 3. Data Architecture & Entity Relationship Model

The database schema is modeled around campus multi-tenancy, multi-stall canteens, catalog versioning, and real-time order state lifecycles:

```mermaid
erDiagram
    COLLEGES ||--o{ CANTEENS : hosts
    COLLEGES ||--o{ STUDENTS : enrolls
    CANTEENS ||--o{ MENU_CATEGORIES : organizes
    CANTEENS ||--o{ CANTEEN_STAFF : employs
    CANTEENS ||--o{ ORDERS : receives
    MENU_CATEGORIES ||--o{ MENU_ITEMS : contains
    ORDERS ||--|{ ORDER_ITEMS : includes
    MENU_ITEMS ||--o{ ORDER_ITEMS : ordered_as
    ORDERS ||--|| DIGITAL_TOKENS : generates
    ORDERS ||--|| PAYMENTS : settled_by
    STUDENTS ||--o{ ORDERS : places

    COLLEGES {
        uuid id PK
        string name
        string city
        string state
        string campus_code
        boolean is_active
        timestamp created_at
    }

    CANTEENS {
        uuid id PK
        uuid college_id FK
        string name
        string stall_number
        string contact_phone
        boolean is_accepting_orders
        int default_prep_minutes
        jsonb operating_hours
        timestamp created_at
    }

    STUDENTS {
        uuid id PK
        uuid college_id FK
        string auth_user_id FK
        string full_name
        string phone
        string email
        string roll_number
        string department
        boolean is_id_verified
        timestamp created_at
    }

    MENU_ITEMS {
        uuid id PK
        uuid canteen_id FK
        uuid category_id FK
        string name
        string description
        numeric price
        string image_url
        boolean is_available
        boolean is_veg
        int prep_time_minutes
        timestamp updated_at
    }

    ORDERS {
        uuid id PK
        uuid student_id FK
        uuid canteen_id FK
        string order_number
        string status
        numeric total_amount
        timestamp pickup_scheduled_for
        timestamp estimated_ready_at
        timestamp created_at
    }

    DIGITAL_TOKENS {
        uuid id PK
        uuid order_id FK
        string token_display_code
        string qr_hash
        boolean is_redeemed
        timestamp redeemed_at
    }

    PAYMENTS {
        uuid id PK
        uuid order_id FK
        numeric amount
        string payment_gateway
        string transaction_ref
        string status
        timestamp verified_at
    }
```

---

## 4. Real-time Order State Machine

Order state management follows a deterministic finite state machine (FSM) enforced via PostgreSQL check constraints and triggers:

```mermaid
stateDiagram-v2
    [*] --> PLACED: Student checkout & UPI authorization confirmed
    PLACED --> ACCEPTED: Kitchen acknowledges order
    PLACED --> CANCELLED: Out of stock / Auto-timeout / Refund
    ACCEPTED --> PREPARING: Kitchen staff taps "Start Cooking"
    PREPARING --> READY_FOR_PICKUP: Dish prepared; Student notified via haptic/push
    READY_FOR_PICKUP --> COMPLETED: Token scanned & meal collected
    ACCEPTED --> CANCELLED: Unexpected disruption / Kitchen cancellation
    READY_FOR_PICKUP --> CANCELLED: Student uncollected timeout (Edge case)
    COMPLETED --> [*]
    CANCELLED --> [*]
```

### State Definitions & Trigger Behaviors
1. **`PLACED`**: Initial state generated upon successful payment webhook callback. Token created with `is_redeemed = false`.
2. **`ACCEPTED`**: Canteen staff taps "Accept" on KDS. Dynamic preparation timer begins countdown.
3. **`PREPARING`**: Kitchen designates that the order is actively being assembled/cooked.
4. **`READY_FOR_PICKUP`**: Chef marks food ready. Triggers real-time notification, haptic pattern on student phone, and mint green screen glow.
5. **`COMPLETED`**: Canteen counter scans QR code or verifies numeric token. Order is marked archived and immutable.
6. **`CANCELLED`**: Terminal state initiating automated UPI reversal workflow.

---

## 5. Integration Architecture

### 5.1. UPI Payment Integration Flow
To guarantee sub-second checkout speed for Indian students, QuickBite adopts an **Intent Deep-Linking + Server Webhook Verification** flow:
1. Student confirms cart; client requests an order payment intent from Supabase Edge Function `create-payment-intent`.
2. Edge function generates a verifiable payment session with a unique reference (`TXN_...`).
3. Client triggers Android UPI Intent chooser (Google Pay, PhonePe, Paytm, CRED).
4. Student authorizes transaction with UPI PIN in their preferred banking application.
5. Payment Gateway dispatches cryptographic webhook to `verify-payment-webhook` Supabase Edge Function.
6. Function verifies signature, updates `orders.status` to `PLACED`, and issues the digital token via atomic SQL transaction.

### 5.2. OCR College ID Processing Pipeline
1. Student captures ID card using React Native camera component with rectangular viewfinder bounds.
2. Image is compressed on-device (< 350 KB WebP) and transmitted to the `extract-student-id` Edge Function.
3. Edge Function runs text recognition to isolate Name, Roll No., and Department.
4. Extracted payload returns to client for instant student confirmation and profile auto-fill.

---

## 6. Real-time Synchronization Architecture

QuickBite utilizes **Supabase Realtime** backed by PostgreSQL Change Data Capture (CDC):

* **Channel: `canteen:{canteen_id}:kitchen`**
  * Subscribed to by the Business Dashboard KDS.
  * Receives instantaneous payloads when new rows appear in `orders` where `canteen_id = :id` and `status = 'PLACED'`.
* **Channel: `order:{order_id}:student`**
  * Subscribed to by the Student App Active Order screen.
  * Receives updates on `status`, `estimated_ready_at`, and preparation progress rings.
* **Presence Channel: `canteen:{canteen_id}:occupancy`**
  * Lightweight tracking of active in-queue students to calculate real-time queue congestion indices.

---

## 7. Security & Compliance Architecture

* **PostgreSQL Row Level Security (RLS):**
  * Students can only read and write their own orders, tokens, and profiles.
  * Canteen staff can only view and mutate orders belonging to their assigned canteen.
  * Public access is strictly restricted to active menu items and canteen profiles.
* **Cryptographic Token Verification:**
  * Tokens contain a HMAC-SHA256 hash incorporating the `order_id`, `student_id`, and `canteen_salt`.
  * Scanning verifies the hash server-side to prevent counterfeiting or duplicated chits.
* **Environment Isolation:**
  * Strict separation of credentials via environment variables (`.env.example` template provided; actual secrets never checked into Git).
