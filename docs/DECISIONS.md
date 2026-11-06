# QuickBite — Architectural Decision Records (ADRs)

> **Document Version:** 1.0.0  
> **Milestone:** 03 — Official Project Documentation  
> **Status:** Active & Accepted  

---

## Index of Decisions

* [ADR-001: Monorepo Project Structure](#adr-001-monorepo-project-structure)
* [ADR-002: React Native with Expo for Student Mobile App](#adr-002-react-native-with-expo-for-student-mobile-app)
* [ADR-003: Supabase as Core Backend & Real-time Platform](#adr-003-supabase-as-core-backend--real-time-platform)
* [ADR-004: React & TypeScript Web SPA for Business Dashboard](#adr-004-react--typescript-web-spa-for-business-dashboard)
* [ADR-005: "Premium Hybrid" Design Philosophy with Adaptive Hardware Tiering](#adr-005-premium-hybrid-design-philosophy-with-adaptive-hardware-tiering)
* [ADR-006: UPI Deep-Linking with Asynchronous Webhook Verification](#adr-006-upi-deep-linking-with-asynchronous-webhook-verification)
* [ADR-007: On-Device & Edge Function OCR for College ID Extraction](#adr-007-on-device--edge-function-ocr-for-college-id-extraction)
* [ADR-008: Deterministic Finite State Machine for Digital Pickup Tokens](#adr-008-deterministic-finite-state-machine-for-digital-pickup-tokens)

---

### ADR-001: Monorepo Project Structure

* **Context:** QuickBite requires multiple interconnected software packages: a consumer mobile app for students, an operational dashboard for canteen managers, shared data transfer objects and validation schemas, and database migrations.
* **Decision:** Adopt a structured monorepo organization:
  * `apps/student-app` (Mobile)
  * `apps/business-dashboard` (Web)
  * `packages/shared` (Common types & schemas)
  * `supabase/` (Migrations, Edge Functions, seeds)
* **Consequences:**
  * *Pros:* Single source of truth; synchronized schema updates; seamless shared TypeScript types; unified repository management.
  * *Cons:* Requires discipline to maintain clear package boundaries and prevent cross-app dependency pollution.

---

### ADR-002: React Native with Expo for Student Mobile App

* **Context:** Over 90% of students in Maharashtra universities utilize Android devices across varying hardware tiers, with a notable segment on iOS. Rapid feature iteration, OTA updates, and native UI performance are essential.
* **Decision:** Build the student mobile application using **React Native with Expo (Managed Workflow with Prebuild support) in TypeScript**.
* **Consequences:**
  * *Pros:* Single codebase delivering native 60 FPS performance on both Android and iOS; rich ecosystem for gestures, animations, and hardware camera access; smooth OTA updates via EAS.
  * *Cons:* Native modules requiring custom native code require Expo config plugins or development builds.

---

### ADR-003: Supabase as Core Backend & Real-time Platform

* **Context:** The system needs real-time synchronization between student phones and kitchen displays, robust authentication with phone/email OTP, strict data isolation between canteens, and low operational overhead.
* **Decision:** Standardize on **Supabase (PostgreSQL 15+, Supabase Auth, Supabase Realtime, and Edge Functions)**.
* **Consequences:**
  * *Pros:* Relational integrity via PostgreSQL; built-in Row Level Security (RLS) guarantees data privacy; instant WebSocket push via PostgreSQL Change Data Capture (CDC); eliminates boilerplate REST controllers.
  * *Cons:* Complex business logic must be carefully split between PostgreSQL functions/triggers and Deno Edge Functions.

---

### ADR-004: React & TypeScript Web SPA for Business Dashboard

* **Context:** Canteen operators need an interface accessible on a variety of kitchen hardware: Android tablets, POS touchscreens, laptops, and counter PCs.
* **Decision:** Build the business dashboard as a responsive **React + TypeScript Single Page Application (SPA)** using modern build tooling.
* **Consequences:**
  * *Pros:* Runs on any standard modern web browser or low-cost kitchen tablet; fast iteration; high-density tabular UI layouts suitable for kitchen order displays.
  * *Cons:* Requires active internet connectivity; offline kitchen queue caching must be handled using local browser storage (IndexedDB/LocalStorage).

---

### ADR-005: "Premium Hybrid" Design Philosophy with Adaptive Hardware Tiering

* **Context:** QuickBite seeks to redefine campus dining aesthetics. However, campus users utilize devices ranging from budget Android phones (2 GB RAM) to flagship phones.
* **Decision:** Implement the **"Premium Hybrid"** design system pairing minimalist structure with cinematic animations, accompanied by **Adaptive Hardware Tiering**:
  * *Flagship Tier:* Full blur viewports, animated Skia particle aura rings on digital tokens, dynamic list entry physics.
  * *Budget Tier:* Solid surface colors, static high-contrast SVG badges, and zero heavy blur filters.
* **Consequences:**
  * *Pros:* Delivers a world-class visual feel without sacrificing usability or causing dropped frames on budget student devices.
  * *Cons:* UI components must support runtime capability flags to toggle advanced visual effects.

---

### ADR-006: UPI Deep-Linking with Asynchronous Webhook Verification

* **Context:** India's Unified Payments Interface (UPI) is the predominant payment method for college students. Payment must complete in under 5 seconds with zero transaction ambiguity.
* **Decision:** Employ **UPI Intent Deep-Linking** on Android/iOS, combined with **Server-to-Server Webhook Verification** via Supabase Edge Functions.
* **Consequences:**
  * *Pros:* One-tap invocation of GPay, PhonePe, Paytm, or CRED directly on the student's phone; cryptographic webhook guarantees tokens are generated only after verified funds transfer.
  * *Cons:* Dependent on reliable cellular network connectivity during the banking redirect phase.

---

### ADR-007: On-Device & Edge Function OCR for College ID Extraction

* **Context:** Manual student onboarding with roll numbers, PRNs, and branches causes friction and typos. Students carry physical college ID cards with standardized textual details.
* **Decision:** Capture college ID photos within the app, preprocess the image on-device, and extract credential fields using an OCR engine via Supabase Edge Functions.
* **Consequences:**
  * *Pros:* Reduces onboarding friction to under 30 seconds; auto-populates student branch and college records.
  * *Cons:* Requires robust fallback mechanisms allowing students to manually edit or correct improperly scanned characters.

---

### ADR-008: Deterministic Finite State Machine for Digital Pickup Tokens

* **Context:** Token confusion is the primary cause of canteen shouting matches, mismanaged orders, and food coldness. A token's lifecycle must be strictly deterministic and counterfeit-proof.
* **Decision:** Enforce a strict **Finite State Machine (FSM)** at the database level:
  `PLACED` ➔ `ACCEPTED` ➔ `PREPARING` ➔ `READY_FOR_PICKUP` ➔ `COMPLETED` (or `CANCELLED`).
  Tokens display a high-visibility alphanumeric code (e.g. `B-12`) and a cryptographic QR hash.
* **Consequences:**
  * *Pros:* Impossible to bypass preparation steps; single-use QR scan prevents double redemption; real-time database triggers automatically notify students at the precise moment of readiness.
  * *Cons:* Requires kitchen staff to reliably tap status buttons on their counter terminal.
