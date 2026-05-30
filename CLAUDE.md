# UmuziKos — Project Instructions

UmuziKos is the **Lake Umuzi Waterfront's own delivery service** in Secunda, Mpumalanga — a **closed ecosystem**, not a marketplace. Seven specific kitchens, a motorbike fleet, an 8 km radius from GPS (-26.5481, 29.1819). Restaurants and drivers are admin-provisioned, never recruited — so **never** add "Partner with us" / "Drive with us" CTAs anywhere.

The deployed URL **https://umuzikos.vercel.app is the customer-app click-through prototype**, not a marketing site. Don't reintroduce a marketing page at `/`.

## Coding standards & guidelines — read before any change

Before implementing or refactoring code, consult these guideline docs and follow them:

- **[docs/guidelines/solid-principles.md](docs/guidelines/solid-principles.md)** — SOLID design principles. Mandatory coding standard for all TypeScript / React / Next.js code. Check the per-principle guidance and the pre-commit checklist before writing or changing non-trivial code.

## Source-of-truth docs — read before adding business logic

- **[docs/umuzikos-codex-v2.md](docs/umuzikos-codex-v2.md)** — Technical Codex V2.0 (the Build Bible): architecture, schema, API, order lifecycle, fees, realtime, payments, screen inventories, monorepo plan. Read before adding any business logic.
- **[docs/umuzikos-design-system-v2.md](docs/umuzikos-design-system-v2.md)** — Design System V2.0: tokens, components, visual language.
- **[docs/image-manifest.md](docs/image-manifest.md)** — generation prompts for placeholder images; output goes in `public/img/` matching the slug convention.

## Stack & conventions

- **Next.js 16.2.2**, React, TypeScript. (Codex says Next 15; project is on 16 to match the D9 baseline.)
- **Material 3** design tokens, mapped from the design system. Light + dark via the `.stage.dark` class.
- **Money is stored as integer cents everywhere.** Order number format: `UMK-YYYYMMDD-NNNN`.
- **No emojis in any user-facing UI** — use SVG / typographic glyphs.
- **No mock/demo data in the real app.** The prototype's seeded menus/orders are illustrative only; the production app pulls from Supabase per Codex §2.
- Deploy direct to **Vercel** and verify on the deployed URL — don't rely on local builds as the final check.

## Architecture map (prototype)

- `src/app/page.tsx` — mounts `<AppShell />`
- `src/app/_components/state.tsx` — `AppProvider`, `useApp()`, `fmt`, `calcFees`, status flows, seed data
- `src/app/_components/AppShell.tsx` — stage, device frame, `parseRoute`, `ScreenSwitch`, `TabBar`
- `src/app/_components/ui.tsx` — shared `AppBar`, icons, `ImgSlot`, helpers
- `src/app/_components/data.ts` — 7 restaurants × 5 menu items, categories, coverage zones, FAQ
- `src/app/_screens/*.tsx` — screens grouped by codex section (Onboarding, Discovery, Restaurant, Checkout, Tracking, Profile, Support)
- `src/app/globals.css` — design-system tokens; `src/app/app.css` — phone frame + screen patterns

For new screens: add state to `state.tsx`, consume via `useApp()`, wire routes in `AppShell.tsx#parseRoute` + `ScreenSwitch`, and add a `<screen-card>` entry to `Support.tsx#SCREENS`.

The seven kitchens (canonical names, use exactly): Boesies, Bosveld Lapa, DROS, Eish!! South African Kitchen, Ocean Basket, Moo Moo Steakhouse & Wine Bar, Lake Umuzi Brewing Company.
