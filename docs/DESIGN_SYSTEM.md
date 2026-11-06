# QuickBite — Design System Specification

> **Design Philosophy:** Premium Hybrid  
> **Target Devices:** Android (Entry-Level to Flagship) & iOS  
> **Status:** Baseline Specification (Milestone 03)  

---

## 1. Design Philosophy: "Premium Hybrid"

QuickBite embraces a **Premium Hybrid** aesthetic. This philosophy unites two distinct design disciplines:
1. **Minimalist Structural Discipline:** Clean layouts, generous whitespace, sharp typographic hierarchy, and unambiguous functional controls inspired by Scandinavian design and modern fintech.
2. **Cinematic Micro-Interactions:** Fluid 60 FPS transitions, tactile haptic feedback, warm food photography, and dynamic state reveals that make the everyday college routine feel extraordinary.

The interface treats food ordering not as a mechanical chore, but as an anticipated ritual in a student's busy academic day.

---

## 2. Brand Color Palette & Semantic Tokens

### 2.1. Core Brand Colors

| Swatch | Name | Hex Code | Purpose & Semantic Role |
| :--- | :--- | :--- | :--- |
| ![#073B3A](https://via.placeholder.com/16/073B3A/073B3A.png) | **Deep Teal** | `#073B3A` | Primary brand color, headers, primary buttons, structural framing, deep dark-mode backgrounds. |
| ![#B9F5D0](https://via.placeholder.com/16/B9F5D0/B9F5D0.png) | **Fresh Mint** | `#B9F5D0` | Primary accent, success indicators, "Ready for Pickup" highlights, active toggle states. |
| ![#FAF9F4](https://via.placeholder.com/16/FAF9F4/FAF9F4.png) | **Soft Ivory** | `#FAF9F4` | Canvas / primary background in light mode, clean card surfaces, readable content sheets. |
| ![#FF735C](https://via.placeholder.com/16/FF735C/FF735C.png) | **Coral** | `#FF735C` | Secondary accent, call-to-action alerts, discounts, spicy tags, urgency and countdown badges. |
| ![#202726](https://via.placeholder.com/16/202726/202726.png) | **Charcoal** | `#202726` | High-contrast typography, primary body copy, dark surface borders, input outlines. |

### 2.2. Extended Semantic Tokens

```typescript
export const ColorTokens = {
  brand: {
    primary: '#073B3A',      // Deep Teal
    accent: '#B9F5D0',       // Fresh Mint
    background: '#FAF9F4',   // Soft Ivory
    highlight: '#FF735C',    // Coral
    textPrimary: '#202726',  // Charcoal
  },
  surface: {
    cardLight: '#FFFFFF',
    cardElevated: '#F4F2EB',
    cardDark: '#0D1A19',
    divider: '#E4E2DC',
  },
  feedback: {
    success: '#10B981',      // Emerald Green
    warning: '#F59E0B',      // Warm Amber
    error: '#EF4444',        // Bright Crimson
    info: '#3B82F6',         // Cerulean Blue
  },
  state: {
    placed: '#6B7280',       // Neutral Gray
    accepted: '#3B82F6',     // Info Blue
    preparing: '#F59E0B',    // Amber Pulse
    ready: '#10B981',        // Mint / Emerald
    completed: '#073B3A',    // Deep Teal Done
  }
} as const;
```

---

## 3. Typography Scale & Hierarchy

QuickBite utilizes a modern sans-serif typography system (e.g., `Plus Jakarta Sans` or system native `Roboto` / `San Francisco`) tuned for legibility in bright sunlight across campus courtyards:

| Level | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | 32px | Bold (700) | 40px | Onboarding greetings, Hero food cards |
| **Headline 1** | 24px | SemiBold (600) | 32px | Screen titles, Canteen titles |
| **Headline 2** | 20px | SemiBold (600) | 28px | Section headers, Category banners |
| **Subtitle** | 16px | Medium (500) | 24px | Dish names, Cart item names |
| **Body Primary** | 14px | Regular (400) | 20px | Descriptions, ingredients, instructions |
| **Body Small** | 12px | Regular (400) | 16px | Preparation timers, calorie labels, metadata |
| **Digital Token Display** | 36px | ExtraBold (800) | 44px | Monospaced digital token badges (e.g., `A-104`) |

---

## 4. Spacing System & Grid

A strict 8-point grid is observed for layout framing, with a 4-point micro-grid for compact controls:

| Token | Size | Typical Usage |
| :--- | :--- | :--- |
| `space-xxs` | 2px | Micro-borders, tiny dot indicators |
| `space-xs` | 4px | Internal badge padding, icon-text gap |
| `space-sm` | 8px | Button inner padding, small component margins |
| `space-md` | 16px | Standard screen horizontal padding, card content padding |
| `space-lg` | 24px | Section separation, header margins |
| `space-xl` | 32px | Modal sheet margins, top hero spacing |
| `space-2xl`| 48px | Empty-state illustrations, large spacing gaps |

---

## 5. Elevation, Shadows, and Surface Layering

* **Level 0 (Flat):** Background `#FAF9F4`.
* **Level 1 (Card Surface):** `#FFFFFF` with soft shadow (`rgba(7, 59, 58, 0.05)`, blur 8px, y-offset 2px).
* **Level 2 (Interactive Elements):** Elevated menu item cards, floating quick-cart bar (`rgba(7, 59, 58, 0.12)`, blur 16px, y-offset 4px).
* **Level 3 (Modals & Bottom Sheets):** Full drawer elevations with high backdrop blur on capable hardware.

---

## 6. Motion & Animation Architecture

### 6.1. Animation Stack
* **React Native Reanimated 3+:** Primary engine for UI-thread shared element transitions, layout animations, and physics-driven sheets.
* **React Native Gesture Handler:** Pan and swipe mechanics (e.g., swipe-to-confirm order pickup, drag-to-dismiss cart).
* **React Native Skia:** High-performance custom shaders, glowing radial borders on digital tokens, and canvas-rendered live queue progress rings.
* **Lottie:** Vector animations for celebratory token creation, payment confirmation ticks, and empty-state illustrations.

### 6.2. Motion Values & Curves
* **Spring Physics:** Damping ratio `15`, stiffness `150`, mass `1.0` for organic button presses and sheet reveals.
* **Timing Curves:** `Easing.bezier(0.25, 0.1, 0.25, 1.0)` (Standard Ease-In-Out) for smooth fades and layout expansions.
* **Haptics:** Tactile micro-vibrations paired with:
  * Adding an item to cart (Light impact)
  * Payment success & Token issuance (Medium notification pattern)
  * Kitchen "Ready for Pickup" notification (Heavy double-pulse alert)

---

## 7. Performance & Low-End Device Adaptation Rules

Given that collegiate users carry a vast array of smartphones (from entry-level 2GB Android Go devices to latest iPhones), the design system enforces strict performance adaptation rules:

| Design Dimension | Flagship / High-End Devices | Budget / Low-End Android Devices |
| :--- | :--- | :--- |
| **Background Blurs** | Real-time GPU blur sheets (`BlurView`) | Solid tinted `#FAF9F4` / `#073B3A` surfaces |
| **Token Visual Effects** | Skia animated particle aura & glow rings | Clean static SVG token badge with high-contrast text |
| **Image Loading** | Full-res WebP with progressive blurhash fade | Aggressively compressed WebP with instant solid color fallback |
| **List Scrolling** | Dynamic entry animations on stagger | Virtualized list items with zero mount animations |
| **Lottie Animations** | Full vector looping playback | Single-run Lottie or static SVG state icon |

---

## 8. Core Component Patterns

### 8.1. Food Item Card
* 1:1 Aspect ratio rounded image with cached WebP support.
* Vegetarian/Non-Vegetarian indicator badge in upper-left corner.
* Dish name in bold Charcoal (`#202726`) with concise description truncated at two lines.
* Pricing in Deep Teal (`#073B3A`) accompanied by an animated `+ ADD` pill button that transitions into a `- 1 +` quantity counter upon tap.

### 8.2. Digital Token Badge
* Displayed prominently on the Active Order screen.
* High-visibility alphanumeric token code (e.g., `K-42`) in large monospaced typeface.
* Embedded dynamic QR code for counter optical scanning.
* Real-time pulsating status border:
  * Amber pulse when `Preparing`.
  * Fresh Mint (`#B9F5D0`) solid glow with sound/vibration alert when `Ready for Pickup`.

### 8.3. Floating Bottom Cart Bar
* Compact, elevated pill floating above the bottom tab navigation.
* Displays item count, single-canteen origin badge, total price, and "Review Order" chevron.
* Expands smoothly into a full-height interactive checkout bottom sheet via gesture swiping.
