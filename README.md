# QuickBite — Smart Canteen Ordering & Queue Management Platform

[![Status](https://img.shields.io/badge/Status-Milestone%2003%20%7C%20Official%20Documentation-073B3A.svg)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PROJECT_OVERVIEW.md)
[![Design Philosophy](https://img.shields.io/badge/Design-Premium%20Hybrid-B9F5D0.svg?labelColor=073B3A)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DESIGN_SYSTEM.md)
[![Platform](https://img.shields.io/badge/Platform-React%20Native%20%7C%20Expo%20%7C%20Supabase-FF735C.svg)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/ARCHITECTURE.md)

---

## 1. Project Introduction

**QuickBite** is a next-generation smart canteen ordering and queue management platform built specifically for college campuses across Maharashtra (Pune, Mumbai, Nagpur, Nashik, and beyond). QuickBite bridges the gap between hungry students facing short recess windows and campus food vendors struggling with order chaos, long queues, and physical cash bottlenecks.

Through digital pre-ordering, live kitchen queue visibility, dynamic preparation time estimation, and automated digital pickup tokens, QuickBite transforms campus dining into a seamless, modern, and stress-free experience.

---

## 2. QuickBite Vision

To eliminate wasted break time across collegiate institutions by modernizing food ordering, empowering canteen operators with real-time digital kitchen intelligence, and delivering a world-class mobile dining experience tailored to Indian campus ecosystems.

---

## 3. Problem Statement

Across higher education campuses in Maharashtra, break times between lectures and practical sessions are typically limited to 15 to 30 minutes. During these brief intervals, thousands of students descend upon campus canteens simultaneously:

* **Crippling Queue Congestion:** Students spend 15–25 minutes waiting in lines just to place orders and pay, often missing meals or arriving late to academic sessions.
* **Chaotic Kitchen Fulfillment:** Canteen staff juggle paper chits, shouting token numbers across crowded halls, leading to missed orders, food wastage, and incorrect dispatches.
* **Inventory & Menu Blindspots:** Students wait in line only to discover their preferred item is sold out; vendors cannot anticipate incoming rush demands.
* **Payment Bottlenecks:** Physical cash handling and unverified peer-to-peer UPI screenshots create reconciliation headaches and slow down counter queues.

---

## 4. Proposed Solution

QuickBite introduces a synchronized two-sided digital ecosystem:

1. **Student Mobile Experience (React Native / Expo):** Enables students to browse live menus from anywhere on campus, pre-order meals before lectures end, settle bills securely via instant UPI, and receive a live digital token with real-time preparation tracking.
2. **Canteen Management Dashboard (React / TypeScript):** Equips vendors with a digital Kitchen Display System (KDS), one-tap item availability toggling, automated order sequencing, and actionable sales and inventory analytics.
3. **Real-time Synchronization Engine (Supabase / PostgreSQL):** Delivers sub-second status transitions from kitchen acceptance to pickup alerts via realtime database channels.

---

## 5. Core Features

### 🎓 Planned Student Features
* **Authentication:** Fast sign-up via Mobile Number & Email OTP.
* **Campus Onboarding & OCR:** Scan physical College ID cards with instant OCR extraction to auto-fill student credentials, roll numbers, and branch details.
* **College & Canteen Selection:** Multi-campus support with instant switching between campus food outlets.
* **Rich Digital Menus:** High-fidelity food imagery, category filtering (Breakfast, Snacks, Meals, Beverages), nutritional tags, and live stock indicators.
* **Advance Pre-Ordering:** Schedule meal pickup slots aligned with lecture breaks.
* **Interactive Cart & Checkout:** Frictionless item customization, special instructions, and price summaries.
* **UPI Payment Integration:** Direct UPI deep-linking (PhonePe, Google Pay, Paytm, CRED) with automated verification.
* **Digital Token Generation:** Unique, high-contrast, tamper-evident digital tokens with QR codes for contactless pickup.
* **Live Order Tracking:** Real-time state visualization (`Placed` ➔ `Accepted` ➔ `Preparing` ➔ `Ready for Pickup` ➔ `Completed`) with dynamic prep-time countdowns.
* **Order History & Quick Reorder:** Historical order archive with one-tap reordering of favorite meals.
* **Student Profile Management:** Dietary preferences, allergy warnings, and saved college credentials.

### 🏢 Planned Business & Canteen Features
* **Business Onboarding & Setup:** Multi-outlet registration, operating hours, and stall profile configuration.
* **Menu Catalog Management:** Add, edit, price, and group menu items with rich photo uploads.
* **Live Stock Availability Toggle:** Real-time 86'ing (marking items out-of-stock) to instantly update student menus.
* **Incoming Order Queue (Kitchen Display System):** Live streaming of new orders categorized by priority, preparation time, and fulfillment stage.
* **Order Status Updating:** One-tap status advances triggering instantaneous student push and realtime notifications.
* **Staff Role Management:** Granular access controls for counter cashiers, head cooks, and canteen administrators.
* **Sales & Queue Analytics:** Visual reporting on daily revenue, peak order hours, top-selling items, and average preparation latency.

---

## 6. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Student Mobile App** | **React Native + Expo (TypeScript)** | Cross-platform native performance, rapid OTA updates, robust Android ecosystem support. |
| **Business Dashboard** | **React + TypeScript (Vite)** | Responsive web client for canteen tablets, POS terminals, and management laptops. |
| **Backend & Database** | **Supabase (PostgreSQL 15+)** | Built-in Row Level Security (RLS), real-time WebSockets, robust auth, and Edge Functions. |
| **Animation Engine** | **RN Reanimated, Gesture Handler, Skia, Lottie** | 60 FPS UI-thread animations, tactile gestures, and cinematic micro-interactions. |
| **Styling & Design** | **Custom Design System ("Premium Hybrid")** | Minimalist surfaces, dark teal accents, and warm ivory themes. |
| **Build & Tooling** | **Expo EAS, Android Studio, Git/GitHub** | Modern continuous deployment and automated Android APK/AAB artifact building. |

---

## 7. Project Architecture

The project is structured as a modular workspace designed for separation of concerns and maximum code sharing:

```text
QUICKBITE/
├── .github/
│   └── workflows/            # CI/CD pipelines (lint, test, build validation)
├── apps/
│   ├── student-app/          # React Native / Expo mobile application
│   └── business-dashboard/   # React web portal for canteen operators & admins
├── packages/
│   └── shared/               # Shared TypeScript schemas, types, DTOs, utilities
├── supabase/
│   ├── migrations/           # Versioned SQL migrations (RLS, schema, triggers)
│   ├── functions/            # Supabase Edge Functions (UPI webhooks, OCR logic)
│   └── seed/                 # Development seed datasets for Maharashtra colleges
├── docs/                     # Comprehensive architectural & product specifications
└── design/
    ├── brand/                # Palette assets, logotypes, icons
    ├── exports/              # Production SVG/PNG component exports
    ├── references/           # UI/UX benchmark references & moodboards
    └── screenshots/          # Application preview captures
```

---

## 8. Development Roadmap

* [x] **Milestone 01: Project Conceptualization & Scoping** — Market research, requirement synthesis, target college profile definitions.
* [x] **Milestone 02: Monorepo & Directory Scaffolding** — Standardized folder structure established.
* [x] **Milestone 03: Official Project Documentation** — Complete architectural specifications, PRD, design system, decision records, and development log (Current).
* [ ] **Milestone 04: Database Modeling & Supabase Migrations** — Schemas for colleges, canteens, menus, orders, tokens, and payments with RLS policies.
* [ ] **Milestone 05: Shared Package & Type System** — Common TypeScript types, validation schemas (Zod), and business constants.
* [ ] **Milestone 06: Student Mobile App Foundation** — Expo initialization, theme implementation, navigation architecture, and splash experience.
* [ ] **Milestone 07: Authentication & OCR College ID Scanner** — Supabase Auth, OTP workflows, and camera-based student ID extraction.
* [ ] **Milestone 08: Discovery, Menu, & Cart Workflows** — Real-time menu browsing, filtering, and animated cart drawer.
* [ ] **Milestone 09: UPI Payment Integration & Token Dispatch** — Deep-link settlement and animated digital pickup token generation.
* [ ] **Milestone 10: Business Dashboard & KDS** — Live kitchen queue, status switcher, menu management, and sales reporting.
* [ ] **Milestone 11: Real-time Queue Synchronization & Notifications** — End-to-end WebSocket order sync and live prep countdowns.
* [ ] **Milestone 12: Production Hardening & Multi-Campus Pilot** — Stress testing, low-end Android optimization, and beta launch in Pune campuses.

---

## 9. Current Development Status

> [!NOTE]
> **Current Status: MILESTONE 03 — OFFICIAL PROJECT DOCUMENTATION (COMPLETED)**
>
> * **Codebase State:** Architectural workspace layout verified; documentation complete; no application code or runtime packages installed yet.
> * **Feature Implementation:** All features listed in this document are currently **PLANNED** and undergoing phased development as defined in the roadmap.
> * **Next Milestone:** Milestone 04 — Supabase Schema Definition & Initial Migrations.

---

## 10. Documentation Index

For in-depth specifications, refer to the documents in [`docs/`](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs):
* 📘 [Project Overview](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PROJECT_OVERVIEW.md) — Problem context, target audience, campus personas, and rollout strategy.
* 📋 [Product Requirements Document (PRD)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PRODUCT_REQUIREMENTS.md) — Comprehensive functional and non-functional requirements.
* 🎨 [Design System Specification](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DESIGN_SYSTEM.md) — "Premium Hybrid" philosophy, color tokens, typography, and motion guidelines.
* 🏗️ [System Architecture](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/ARCHITECTURE.md) — Data flow, database schemas, real-time state machines, and API boundaries.
* 📝 [Development Log](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DEVELOPMENT_LOG.md) — Chronological history of milestones, engineering activities, and progress.
* ⚖️ [Architecture Decision Records (ADR)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DECISIONS.md) — Rationale behind fundamental technical and design choices.
