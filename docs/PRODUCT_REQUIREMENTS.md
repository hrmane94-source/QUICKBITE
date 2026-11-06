# QuickBite — Product Requirements Document (PRD)

> **Document Version:** 1.0.0  
> **Milestone:** 03 — Official Project Documentation  
> **Status:** Approved Baseline  

---

## 1. Product Vision & Scope

QuickBite is an end-to-end digital ordering, queue optimization, and kitchen management solution tailored for campus food environments in Maharashtra. The platform encompasses a high-performance cross-platform mobile client for students and an intuitive, real-time web portal for canteen operators.

---

## 2. Functional Requirements — Student Application

### 2.1. Authentication & Identity
* **REQ-STU-001 (Mobile & Email OTP):** Students shall be able to register and sign in using a valid 10-digit Indian mobile phone number or institutional/personal email address, verified via a 6-digit one-time password (OTP).
* **REQ-STU-002 (College ID Card Scanning & OCR):** The application shall support capturing or uploading an image of the physical College ID card, utilizing Optical Character Recognition (OCR) to automatically extract:
  * Full Name
  * Roll Number / Student PRN
  * Department / Branch
  * College Name & Branch Year
* **REQ-STU-003 (Profile Generation & Verification):** The extracted OCR data shall pre-populate the student profile with manual editing fallback and validation safeguards.
* **REQ-STU-004 (Session Persistence):** User authentication states shall persist securely across app restarts using encrypted device storage.

### 2.2. Campus & Canteen Discovery
* **REQ-STU-005 (College Selection):** Students shall be able to select and switch their active college campus from an indexed list of supported Maharashtra institutions.
* **REQ-STU-006 (Canteen Listing & Status):** The app shall display all canteens, cafeterias, and food kiosks operating within the selected campus, indicating:
  * Open / Closed status
  * Operating hours
  * Current average preparation wait time
  * Live queue congestion level (Low, Moderate, Busy)

### 2.3. Digital Menus & Item Discovery
* **REQ-STU-007 (Categorized Menu Browsing):** Menus shall be grouped into logical categories (e.g., Breakfast Specials, Quick Bites, Thalis & Meals, Chaat & Snacks, Beverages, Desserts).
* **REQ-STU-008 (Search & Filtering):** Real-time text search with dietary filters (Vegetarian, Non-Vegetarian, Vegan, Jain-friendly, Chef's Special).
* **REQ-STU-009 (Item Detail & Imagery):** Each menu item shall feature high-resolution imagery, item description, preparation time estimate, allergen tags, and customizable options (e.g., extra pav, spice level).
* **REQ-STU-010 (Live Stock Indication):** Out-of-stock items (86'd items) shall be immediately disabled in the UI with a distinct visual badge.

### 2.4. Cart & Advance Ordering
* **REQ-STU-011 (Smart Cart):** Persistent shopping cart supporting single-canteen order consolidation, quantity adjustments, and special cooking instructions.
* **REQ-STU-012 (Advance Time-Slot Selection):** Option to place orders for immediate preparation or schedule an advance pickup slot aligned with upcoming break schedules (e.g., 12:45 PM recess).

### 2.5. Payments & Checkout
* **REQ-STU-013 (UPI Payment Integration):** Deep-link integration with UPI payment apps (Google Pay, PhonePe, Paytm, BHIM, CRED).
* **REQ-STU-014 (Instant Payment Verification):** Real-time server-side verification of payment intent status to prevent false confirmations.
* **REQ-STU-015 (Transparent Pricing):** Clear bill breakdown displaying subtotal, taxes (if applicable), platform/convenience fee (if any), and total payable amount.

### 2.6. Digital Tokens & Live Order Tracking
* **REQ-STU-016 (Cryptographic Digital Token):** Upon confirmed payment, an encrypted, daily-cycling digital token (e.g., `A-104`) with an scannable QR code shall be generated.
* **REQ-STU-017 (Live Lifecycle Tracking):** Order state shall update via real-time WebSocket connection across stages:
  1. `PLACED` (Order received, awaiting kitchen confirmation)
  2. `ACCEPTED` (Kitchen acknowledged order)
  3. `PREPARING` (Meal currently being cooked/assembled)
  4. `READY_FOR_PICKUP` (Available at pickup counter; haptic vibration & alert sent)
  5. `COMPLETED` (Token scanned and handed over)
  6. `CANCELLED` (Item unavailable or refund initiated)
* **REQ-STU-018 (Dynamic Preparation Time Countdown):** Real-time countdown timer reflecting remaining preparation minutes, dynamically adjusted based on live kitchen queue depth.

### 2.7. History & Profile Management
* **REQ-STU-019 (Order History):** Detailed historical log of all past orders with digital receipts and status breakdowns.
* **REQ-STU-020 (One-Tap Reorder):** Ability to re-populate the cart with previous favorites in a single interaction.
* **REQ-STU-021 (Student Profile & Preferences):** Manage personal information, saved payment preferences, dietary restrictions, and notification settings.

---

## 3. Functional Requirements — Business Dashboard

### 3.1. Business Setup & Onboarding
* **REQ-BIZ-001 (Canteen Business Registration):** Streamlined registration flow for canteen proprietors, including business name, college affiliation, operating hours, and bank payout details.
* **REQ-BIZ-002 (Outlet Management):** Configure multiple food counters or stalls under a single college contract.

### 3.2. Menu & Availability Management
* **REQ-BIZ-003 (Menu CRUD Operations):** Create, update, archive, and price menu items, attach food photography, and assign category tags.
* **REQ-BIZ-004 (Instant Stock Availability Toggle):** One-tap toggle to mark any item as available or sold-out in real-time, instantly reflecting on student devices.
* **REQ-BIZ-005 (Preparation Time Configuration):** Define default baseline preparation duration for each dish.

### 3.3. Kitchen Display System (KDS) & Order Execution
* **REQ-BIZ-006 (Live Incoming Order Queue):** High-contrast, audio-chime-supported board displaying incoming orders ordered chronologically or prioritized by pickup slot.
* **REQ-BIZ-007 (Order Stage Transitioning):** Swift touch-friendly controls for kitchen staff to transition orders: `Accept` ➔ `Start Cooking` ➔ `Mark Ready`.
* **REQ-BIZ-008 (Digital Token Verification):** Integrated camera or USB barcode/QR scanner support to scan student pickup tokens and complete fulfillment.

### 3.4. Staff & Administration
* **REQ-BIZ-009 (Role-Based Access Control - RBAC):** Roles for Owner/Manager (full financial analytics & settings), Head Chef (KDS and stock toggle only), and Counter Staff (token verification only).

### 3.5. Analytics & Business Intelligence
* **REQ-BIZ-010 (Sales & Revenue Reporting):** Daily, weekly, and monthly gross sales summaries with downloadable CSV reports.
* **REQ-BIZ-011 (Operational Insights):** Metrics displaying peak surge hours, average cooking times per dish, and popular item rankings to optimize raw ingredient procurement.

---

## 4. Non-Functional Requirements (NFR)

### 4.1. Performance & Hardware Compatibility
* **NFR-PERF-001 (Device Inclusivity):** Seamless operation on entry-level Android devices (2 GB – 3 GB RAM, Android 8.0+) through flagship smartphones (12 GB+ RAM, Android 14+ / iOS 17+).
* **NFR-PERF-002 (Frame Rate):** Maintain consistent 60 FPS scrolling across menus, lists, and modal drawers.
* **NFR-PERF-003 (Animation Efficiency):** All animations executed on the native UI thread via React Native Reanimated worklets without blocking JavaScript execution.
* **NFR-PERF-004 (Image Optimization):** Heavy food photography served via progressive WebP, cached aggressively on device disk, with lightweight blurhash/color placeholders during load.
* **NFR-PERF-005 (Adaptive Rendering):** Visual effects (heavy blur filters, Skia particle shaders) dynamically scale down or disable on devices reporting low RAM or high thermal pressure.

### 4.2. Latency & Real-Time Sync
* **NFR-SYNC-001 (State Propagation):** Kitchen order status transitions shall reach student devices in less than 500 milliseconds under standard 4G/5G/Campus Wi-Fi connectivity.
* **NFR-SYNC-002 (Reconnection Grace):** Automatic exponential backoff and silent state reconciliation when devices traverse campus cellular dead zones (e.g., college basements).

### 4.3. Security & Data Integrity
* **NFR-SEC-001 (Row Level Security):** All database reads and writes governed by PostgreSQL RLS policies in Supabase, preventing unauthorized cross-tenant data access.
* **NFR-SEC-002 (Token Tamper Resistance):** Pickup tokens cryptographically signed with short TTLs and one-time redemption enforcement to eliminate double-claiming.
* **NFR-SEC-003 (Zero Secret Exposure):** No API secret keys, database service role keys, or payment merchant secrets bundled in client binaries.

---

## 5. Feature Implementation Matrix

| Module | Feature | Implementation Status | Target Milestone |
| :--- | :--- | :--- | :--- |
| **Auth** | Mobile / Email OTP | 🟡 Planned | Milestone 10 |
| **Auth** | College ID OCR Scanner | 🟡 Planned | Milestone 10 |
| **Discovery** | Campus & Canteen Selector | 🟡 Planned | Milestone 11 |
| **Catalog** | Digital Menu & Search | 🟡 Planned | Milestone 11 |
| **Checkout** | Cart & Advance Ordering | 🟡 Planned | Milestone 11 |
| **Payments** | UPI Deep Linking & Settlement | 🟡 Planned | Milestone 12 |
| **Queue** | Digital Token Generation | 🟡 Planned | Milestone 12 |
| **Queue** | Real-time KDS & Live Tracking | 🟡 Planned | Milestone 13–14 |
| **Business** | Menu Management & Stock 86'ing | 🟡 Planned | Milestone 13 |
| **Business** | Analytics & Sales Reporting | 🟡 Planned | Milestone 13 |
