# QuickBite — Smart Canteen Ordering & Queue Management Platform

[![Status](https://img.shields.io/badge/Status-Milestone%2007%20%7C%20Shared%20Package%20Foundation-073B3A.svg)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PROJECT_OVERVIEW.md)
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
| **Shared Domain Layer** | **@quickbite/shared (TypeScript + Zod 4)** | Source-first shared package for domain validation schemas, DTOs, and inferred TypeScript types. |
| **Backend & Database** | **Supabase (PostgreSQL 15+)** | Built-in Row Level Security (RLS), real-time WebSockets, robust auth, and Edge Functions. |
| **Animation Engine** | **RN Reanimated, Gesture Handler, Skia, Lottie** | 60 FPS UI-thread animations, tactile gestures, and cinematic micro-interactions. |
| **Styling & Design** | **Custom Design System ("Premium Hybrid")** | Minimalist surfaces, dark teal accents, and warm ivory themes. |
| **Build & Tooling** | **Expo EAS, Android Studio, Git/GitHub** | Modern continuous deployment and automated Android APK/AAB artifact building. |

---

## 7. Project Architecture & Monorepo Structure

### Why QuickBite Uses a Monorepo
QuickBite operates a synchronized multi-application ecosystem consisting of a consumer mobile app, a kitchen operator dashboard, shared domain models, and a Supabase backend. Adopting a monorepo architecture provides:
* **Single Source of Truth:** Shared TypeScript types, Zod validation schemas, and API contracts remain strictly aligned across mobile and web without external package registry overhead.
* **Atomic Versioning:** Any schema or domain change can be updated and validated across consumer and business surfaces in a single atomic commit.
* **Simplified Governance:** Unified tooling, shared editor conventions (`.editorconfig`), baseline TypeScript standards (`tsconfig.base.json`), and consolidated CI/CD automation.

### npm Workspaces Layout
The repository is orchestrated using **npm workspaces** via the root `package.json`:

```text
QUICKBITE/
├── package.json              # Monorepo root configuration (npm workspaces: apps/*, packages/*)
├── tsconfig.base.json        # Shared baseline TypeScript configuration
├── .editorconfig             # Unified editor formatting standards
├── .gitignore                # Environment, build, and temporary file exclusions
├── .github/
│   └── workflows/            # Monorepo CI/CD pipelines (lint, test, build validation)
├── apps/
│   ├── student-app/          # [PLANNED] React Native / Expo consumer mobile application
│   └── business-dashboard/   # [PLANNED] React + TypeScript web portal for canteen operators
├── packages/
│   └── shared/               # [IMPLEMENTED] @quickbite/shared (Zod 4 schemas & inferred types)
├── supabase/
│   ├── migrations/           # [PLANNED] Versioned SQL migrations (RLS, schema, triggers)
│   ├── functions/            # [PLANNED] Supabase Edge Functions (UPI webhooks, OCR logic)
│   └── seed/                 # [PLANNED] Development seed datasets for Maharashtra colleges
├── docs/                     # Architectural, product, and design specifications
└── design/
    ├── brand/                # Palette assets, logotypes, icons
    ├── exports/              # Production SVG/PNG component exports
    ├── references/           # UI/UX benchmark references & moodboards
    └── screenshots/          # Application preview captures
```

### Workspace Directory Roles
* **`apps/student-app` (Planned):** Consumer mobile app built with React Native and Expo (TypeScript). Delivers 60 FPS order discovery, UPI checkout, and digital token tracking. Consumes `@quickbite/shared`.
* **`apps/business-dashboard` (Planned):** Canteen operator and kitchen display portal built with React and TypeScript. Consumes `@quickbite/shared`.
* **`packages/shared` (Implemented):** Framework-agnostic TypeScript package (`@quickbite/shared`) extending `tsconfig.base.json`, housing domain schemas (Common, College, Canteen, Student, MenuItem, Order, Token, Payment) and inferred TypeScript types using Zod 4.
* **`supabase/` (Planned):** Cloud-native backend maintaining PostgreSQL DDL migrations, Row Level Security (RLS) policies, and Deno Edge Functions, decoupled from frontend Node packaging.

### Monorepo Development Workflow
Root-level npm scripts allow orchestrating common tasks across workspaces using `--workspaces --if-present`:
* `npm run typecheck` — Runs TypeScript verification across all configured workspaces.
* `npm run lint` — Runs static code linting across all configured workspaces.
* `npm run test` — Runs unit and integration test suites across all configured workspaces.

---

## 8. Development Roadmap

* [x] **Milestone 01: Project Conceptualization & Scoping** — Market research, requirement synthesis, target college profile definitions.
* [x] **Milestone 02: Monorepo & Directory Scaffolding** — Standardized folder structure established.
* [x] **Milestone 03: Official Project Documentation** — Complete architectural specifications, PRD, design system, decision records, and development log.
* [x] **Milestone 04: Initial Git Repository Setup & Remote Push** — First repository commit committed and pushed to GitHub.
* [x] **Milestone 05: Workspace Governance & Review** — Quality audit and structural verification.
* [x] **Milestone 06: Monorepo Configuration** — npm workspaces setup (`apps/*`, `packages/*`), `tsconfig.base.json`, `.editorconfig`, and root script orchestration.
* [x] **Milestone 07: Shared Package Foundation** — `@quickbite/shared` implemented with Zod 4 domain schemas, enums, and inferred TypeScript types (Current).
* [ ] **Milestone 08: Database Modeling & Supabase Migrations** — Schemas for colleges, canteens, menus, orders, tokens, and payments with RLS policies.
* [ ] **Milestone 09: Student Mobile App Foundation** — Expo initialization, theme implementation, navigation architecture, and splash experience.
* [ ] **Milestone 10: Authentication & OCR College ID Scanner** — Supabase Auth, OTP workflows, and camera-based student ID extraction.
* [ ] **Milestone 11: Discovery, Menu, & Cart Workflows** — Real-time menu browsing, filtering, and animated cart drawer.
* [ ] **Milestone 12: UPI Payment Integration & Token Dispatch** — Deep-link settlement and animated digital pickup token generation.
* [ ] **Milestone 13: Business Dashboard & KDS** — Live kitchen queue, status switcher, menu management, and sales reporting.
* [ ] **Milestone 14: Real-time Queue Synchronization & Notifications** — End-to-end WebSocket order sync and live prep countdowns.
* [ ] **Milestone 15: Production Hardening & Multi-Campus Pilot** — Stress testing, low-end Android optimization, and beta launch in Pune campuses.

---

## 9. Current Development Status

> [!NOTE]
> **Current Status: MILESTONE 07 — SHARED PACKAGE FOUNDATION (COMPLETED)**
>
> * **Codebase State:** The shared package `@quickbite/shared` is implemented in `packages/shared/` with Zod 4 domain schemas and inferred types, linked into npm workspaces.
> * **Planned Implementations:** The student application, business dashboard, and Supabase database schemas are **PLANNED** and undergoing phased implementation. No application UI code or Expo project has been initialized yet.
> * **Next Milestone:** Milestone 08 — Database Modeling & Supabase Migrations.

---

## 10. Documentation Index

For in-depth specifications, refer to the documents in [`docs/`](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs):
* 📘 [Project Overview](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PROJECT_OVERVIEW.md) — Problem context, target audience, campus personas, and rollout strategy.
* 📋 [Product Requirements Document (PRD)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/PRODUCT_REQUIREMENTS.md) — Comprehensive functional and non-functional requirements.
* 🎨 [Design System Specification](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DESIGN_SYSTEM.md) — "Premium Hybrid" philosophy, color tokens, typography, and motion guidelines.
* 🏗️ [System Architecture](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/ARCHITECTURE.md) — Data flow, database schemas, real-time state machines, and API boundaries.
* 📝 [Development Log](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DEVELOPMENT_LOG.md) — Chronological history of milestones, engineering activities, and progress.
* ⚖️ [Architecture Decision Records (ADR)](file:///c:/Users/Harshad/PROJECTS/QUICKBITE/docs/DECISIONS.md) — Rationale behind fundamental technical and design choices.
