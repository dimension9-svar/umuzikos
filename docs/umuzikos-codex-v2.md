# UmuziKos — Technical Codex V2.0

**The Build Bible**
Single source of truth for all development across the UmuziKos platform.
Reference document for Claude Code sessions.

---

## 0. Project Overview

### 0.1 What Is UmuziKos

UmuziKos is a hyperlocal food delivery platform serving the Lake Umuzi Waterfront restaurant complex in Secunda, Mpumalanga, South Africa. It is not a marketplace — it is a single-client, closed-ecosystem delivery service for seven specific restaurants operating within the waterfront complex. Deliveries are motorbike-based within an 8km radius.

### 0.2 Partner Restaurants

| # | Name | Cuisine |
|---|---|---|
| 1 | Boesies | South African, Grill |
| 2 | Bosveld Lapa | Traditional, Braai |
| 3 | DROS | Family, Pub & Grill |
| 4 | Eish!! South African Kitchen | South African, Street Food |
| 5 | Ocean Basket | Seafood, Sushi |
| 6 | Moo Moo Steakhouse & Wine Bar | Steakhouse, Fine Dining |
| 7 | Lake Umuzi Brewing Company | Craft Beer, Pub Food |

### 0.3 Platform Surfaces

| Surface | Users | Form Factor | Framework |
|---|---|---|---|
| Customer App | End consumers | Mobile (iOS + Android) | React Native (Expo) |
| Driver App | Motorbike riders | Mobile (Android primary) | React Native (Expo) |
| Restaurant Portal | Kitchen staff, managers | Tablet + Desktop | Next.js (Web) |
| Admin Dashboard | UmuziKos operations | Desktop | Next.js (Web) |

### 0.4 Design System Reference

All UI across all four surfaces follows the UmuziKos Design System V2.0 (`umuzikos-design-system-v2.md`). Core identity: white + black + orange. M3 color roles throughout. Typography: Outfit (display) + Plus Jakarta Sans (body).

### 0.5 Business Constraints

- **Delivery radius:** 8km from Lake Umuzi Waterfront GPS coordinates (-26.5481, 29.1819)
- **Currency:** South African Rand (R), formatted as `R XX.XX`
- **Phone format:** +27 XX XXX XXXX (SA mobile)
- **Operating hours:** Per-restaurant, typically 10:00–22:00
- **Payment methods:** Card (Visa/MC), SnapScan, Instant EFT (Ozow), Cash on Delivery
- **Language:** English (primary), future: Afrikaans, Zulu

---

(Full codex preserved as-is — sections 1 through 16 cover Architecture, Database Schema, Auth, API, Order Lifecycle, Real-Time, Payments, Screen Inventories, Fees, Maps, Env, Deployment, Testing, Security, Performance, Phase Rollout. See repo or original attachment for full text.)

---

## Critical Constants (frequently referenced)

```ts
WATERFRONT_LAT = -26.5481
WATERFRONT_LNG = 29.1819
DELIVERY_RADIUS_KM = 8
BASE_DELIVERY_FEE_CENTS = 1500   // R15.00
PER_KM_RATE_CENTS = 500          // R5.00 per km after 3km
FREE_KM = 3
SERVICE_FEE_PERCENT = 5          // min R5, max R25
ORDER_NUMBER_FORMAT = "UMK-YYYYMMDD-NNNN"
```

## Critical Reminders

- **Money is integer cents everywhere.** R15.00 = 1500. Format at display only.
- **Closed ecosystem.** No "Partner with us" / "Drive with us" CTAs anywhere. Restaurants and drivers are admin-provisioned.
- **Motorbike fleet.** No bakkies, no cars in driver-side copy or imagery.
- **8km hard radius.** Use PostGIS `ST_DWithin` server-side. Client-side: surface "outside delivery zone" before checkout if address geocodes beyond.
- **POPIA.** Privacy policy, data deletion endpoint required for SA compliance.

---

*UmuziKos Technical Codex V2.0 — Last updated May 2026*
*Design System: umuzikos-design-system-v2.md*
*Customer App Screens: umuzikos-final-build-plan.md*
