# UmuziKos — Design System V2.0

**White · Black · Orange**
Lake Umuzi Waterfront · Secunda · South Africa
Applies to: Customer App · Driver App · Restaurant Portal · Admin Dashboard

---

## 0. Principles

Three rules govern every design decision across all four platform surfaces:

1. **White, black, orange.** The UI is structurally white and black. Orange appears only where the user's eye must go — primary CTAs, active states, brand marks. Food photography provides the color, not the interface.
2. **Flat and solid.** No gradients, no glassmorphism, no blur, no decorative shapes, no mesh backgrounds. Every fill is a single flat color from the token system.
3. **M3 roles, not raw values.** Code references semantic role names (`--md-sys-color-primary`, `--md-sys-color-surface-container`), never hex literals. This ensures token swaps (e.g. future dark theme) require zero component changes.

---

## 1. Brand Identity

### 1.1 Wordmark

The wordmark is the logo. No separate icon or logomark exists.

- **Font:** Outfit Extra Bold (800)
- **Format:** `Umuzikos.` — capital U, lowercase remainder, trailing period
- **Period color:** Always `--md-sys-color-primary` (#F97316), except on primary backgrounds where it is white
- **Letter-spacing:** -0.8px at display size

### 1.2 Wordmark Usage

| Background | Wordmark Color | Period Color |
|---|---|---|
| White (#FFFFFF) | Black (#0A0A0A) | Orange (#F97316) |
| Black (#0A0A0A) | White (#FFFFFF) | Orange (#F97316) |
| Orange (#F97316) | White (#FFFFFF) | White (#FFFFFF) |

### 1.3 Wordmark Rules

- **Clear space:** Minimum 1× the height of the "U" on all sides
- **Minimum size:** 24px height (digital), 10mm (print)
- **Allowed backgrounds:** White, black, or primary fill only
- **Never:** Stretch, rotate, add effects, change colors, place on busy/photo backgrounds, add outlines or shadows

---

## 2. Color

### 2.1 Core Triad

| Name | Hex | CSS Variable | Usage |
|---|---|---|---|
| White | `#FFFFFF` | `--md-sys-color-surface` | Backgrounds, surfaces, cards |
| Black | `#0A0A0A` | `--md-sys-color-on-surface` | Text, headings, filled buttons |
| Orange | `#F97316` | `--md-sys-color-primary` | CTAs, active states, brand accent |

### 2.2 Orange Scale

Full tonal ramp from dark to light. The 500 step is the brand primary.

| Step | Hex | Usage |
|---|---|---|
| 900 | `#7C2D12` | On-primary-container text |
| 800 | `#9A3412` | Dark emphasis |
| 700 | `#C2410C` | Pressed state |
| 600 | `#EA580C` | Hover state |
| **500** | **`#F97316`** | **Brand primary — CTAs, active states** |
| 400 | `#FB923C` | Secondary interactive |
| 300 | `#FDBA74` | Light accent |
| 200 | `#FED7AA` | Subtle highlight |
| 100 | `#FFEDD5` | Container light |
| 50 | `#FFF7ED` | Primary container background |

### 2.3 M3 Color Roles — Primary

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Primary | `#F97316` | `--md-sys-color-primary` | CTA buttons, links, active nav icons |
| On Primary | `#FFFFFF` | `--md-sys-color-on-primary` | Text/icons on primary buttons |
| Primary Container | `#FFF7ED` | `--md-sys-color-primary-container` | Tonal fills, selected chips, active nav pill |
| On Primary Container | `#7C2D12` | `--md-sys-color-on-primary-container` | Text inside primary container |
| Primary Hover | `#EA680D` | `--md-sys-color-primary-hover` | Primary button hover state |
| Primary Pressed | `#C2510C` | `--md-sys-color-primary-pressed` | Primary button pressed state |

### 2.4 M3 Color Roles — Secondary

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Secondary | `#525252` | `--md-sys-color-secondary` | Secondary buttons, icons |
| On Secondary | `#FFFFFF` | `--md-sys-color-on-secondary` | Text on secondary fills |
| Secondary Container | `#F5F5F5` | `--md-sys-color-secondary-container` | Tonal secondary fills |
| On Secondary Container | `#1A1A1A` | `--md-sys-color-on-secondary-container` | Text in secondary container |

### 2.5 M3 Color Roles — Tertiary

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Tertiary | `#FF6B4A` | `--md-sys-color-tertiary` | Promotions, special offers |
| On Tertiary | `#FFFFFF` | `--md-sys-color-on-tertiary` | Text on tertiary |
| Tertiary Container | `#FFF1EE` | `--md-sys-color-tertiary-container` | Promo banners background |
| On Tertiary Container | `#7F1D1D` | `--md-sys-color-on-tertiary-container` | Text on promo containers |

### 2.6 M3 Color Roles — Error

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Error | `#DC2626` | `--md-sys-color-error` | Validation errors, cancel, closed |
| On Error | `#FFFFFF` | `--md-sys-color-on-error` | Text on error fills |
| Error Container | `#FEF2F2` | `--md-sys-color-error-container` | Error badge/banner background |
| On Error Container | `#991B1B` | `--md-sys-color-on-error-container` | Text inside error container |

### 2.7 M3 Color Roles — Surface

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Surface | `#FFFFFF` | `--md-sys-color-surface` | App background |
| Surface Dim | `#F5F5F5` | `--md-sys-color-surface-dim` | Dimmed background areas |
| Surface Container Lowest | `#FFFFFF` | `--md-sys-color-surface-container-lowest` | Lowest elevation |
| Surface Container Low | `#FAFAFA` | `--md-sys-color-surface-container-low` | Secondary background |
| Surface Container | `#F5F5F5` | `--md-sys-color-surface-container` | Cards, input backgrounds |
| Surface Container High | `#EFEFEF` | `--md-sys-color-surface-container-high` | Raised inputs, active surfaces |
| Surface Container Highest | `#E5E5E5` | `--md-sys-color-surface-container-highest` | Highest tint elevation |
| On Surface | `#0A0A0A` | `--md-sys-color-on-surface` | Primary text, headings |
| On Surface Variant | `#737373` | `--md-sys-color-on-surface-variant` | Secondary text, icons, placeholders |
| Inverse Surface | `#1A1A1A` | `--md-sys-color-inverse-surface` | Snackbars, tooltips |
| Inverse On Surface | `#F5F5F5` | `--md-sys-color-inverse-on-surface` | Text on inverse surface |
| Scrim | `rgba(0,0,0,0.5)` | `--md-sys-color-scrim` | Modal/sheet overlay |

### 2.8 M3 Color Roles — Outline

| Role | Hex | CSS Variable | Where Used |
|---|---|---|---|
| Outline | `#D4D4D4` | `--md-sys-color-outline` | Borders, input outlines, dividers |
| Outline Variant | `#E5E5E5` | `--md-sys-color-outline-variant` | Subtle dividers, card borders |

### 2.9 Semantic Colors

Each semantic color has four roles: base, on-base, container, and on-container.

**Success**

| Role | Hex | CSS Variable |
|---|---|---|
| Success | `#16A34A` | `--md-sys-color-success` |
| On Success | `#FFFFFF` | `--md-sys-color-on-success` |
| Success Container | `#F0FDF4` | `--md-sys-color-success-container` |
| On Success Container | `#14532D` | `--md-sys-color-on-success-container` |

Context: Open status, delivered, confirmed, free delivery, online indicators.

**Warning**

| Role | Hex | CSS Variable |
|---|---|---|
| Warning | `#CA8A04` | `--md-sys-color-warning` |
| On Warning | `#FFFFFF` | `--md-sys-color-on-warning` |
| Warning Container | `#FEFCE8` | `--md-sys-color-warning-container` |
| On Warning Container | `#713F12` | `--md-sys-color-on-warning-container` |

Context: Closing soon, pending, allergen alerts, schedule conflicts.

**Error**

| Role | Hex | CSS Variable |
|---|---|---|
| Error | `#DC2626` | `--md-sys-color-error` |
| On Error | `#FFFFFF` | `--md-sys-color-on-error` |
| Error Container | `#FEF2F2` | `--md-sys-color-error-container` |
| On Error Container | `#991B1B` | `--md-sys-color-on-error-container` |

Context: Closed, cancelled, failed, validation errors, destructive actions.

**Info**

| Role | Hex | CSS Variable |
|---|---|---|
| Info | `#2563EB` | `--md-sys-color-info` |
| On Info | `#FFFFFF` | `--md-sys-color-on-info` |
| Info Container | `#EFF6FF` | `--md-sys-color-info-container` |
| On Info Container | `#1E3A8A` | `--md-sys-color-on-info-container` |

Context: Order tracking, driver ETA, tips, neutral informational badges. Note: info blue is permitted in tracking and system UI contexts — never in food-related contexts (appetite suppression).

### 2.10 Payment Brand Colors

Used only for payment method icons and identifiers:

| Brand | Hex |
|---|---|
| Visa | `#1A1F71` |
| Mastercard | `#EB001B` |
| SnapScan | `#00A4E4` |
| Ozow | `#1DBF73` |
| Cash | `#14532D` |

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Fallback | Google Fonts |
|---|---|---|---|
| Display / Headings | Outfit | sans-serif | `family=Outfit:wght@400;500;600;700;800` |
| Body / UI | Plus Jakarta Sans | sans-serif | `family=Plus+Jakarta+Sans:wght@400;500;600;700` |

Two fonts, no exceptions. Outfit provides bold, geometric confidence for headings. Plus Jakarta Sans provides clean warmth for body text and UI labels.

### 3.2 Type Scale

| Token | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `display-large` | Outfit | 800 | 40px | 1.1 | -1px | Hero headlines, splash |
| `display-medium` | Outfit | 700 | 32px | 1.15 | -0.5px | Section headers, restaurant names (detail) |
| `headline` | Outfit | 700 | 24px | 1.2 | -0.3px | Screen titles ("Your Cart", "Checkout") |
| `title-large` | Outfit | 700 | 20px | 1.25 | 0 | Restaurant card names, subsection heads |
| `title-medium` | Plus Jakarta Sans | 700 | 16px | 1.3 | 0 | Menu item names, row titles |
| `body-large` | Plus Jakarta Sans | 400 | 15px | 1.6 | 0 | Descriptions, long-form text |
| `body-medium` | Plus Jakarta Sans | 400 | 14px | 1.5 | 0 | Secondary info (delivery time, fees) |
| `body-small` | Plus Jakarta Sans | 400 | 13px | 1.5 | 0 | Helper text, instructions |
| `label` | Plus Jakarta Sans | 700 | 12px | 1.3 | 1px | Section labels, uppercase headers |
| `caption` | Plus Jakarta Sans | 500 | 11px | 1.3 | 0 | Timestamps, ratings, metadata |

### 3.3 Typography Rules

- `label` is always uppercase with 1px letter-spacing
- Headings (Outfit) use negative letter-spacing for tightness
- Body text never exceeds 65 characters per line for readability
- Minimum text size: 11px (caption). Nothing smaller.
- Price text uses `title-medium` weight (700) regardless of context

---

## 4. Shape

### 4.1 Border Radius Scale

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| None | `0px` | `--md-sys-shape-none` | Dividers, full-bleed images |
| XS | `4px` | `--md-sys-shape-xs` | Small badges, status dots |
| SM | `8px` | `--md-sys-shape-sm` | Buttons, inputs, small cards |
| MD | `12px` | `--md-sys-shape-md` | Cards, sheets, containers |
| LG | `16px` | `--md-sys-shape-lg` | Bottom sheets, modals, navigation bars |
| XL | `24px` | `--md-sys-shape-xl` | Large modals, feature cards |
| Full | `999px` | `--md-sys-shape-full` | Chips, pills, avatars, FABs |

### 4.2 Shape Rules

- Buttons always use SM (8px) — never pill-shaped (full)
- Cards and content containers use MD (12px)
- Chips and filter pills use Full (999px)
- Input fields use SM (8px)
- Avatars use Full (999px)
- Bottom navigation bar uses LG (16px)

---

## 5. Spacing

### 5.1 Spacing Scale

4px base unit. Every margin, padding, and gap value must come from this scale.

| Token | Value | CSS Variable | Usage Examples |
|---|---|---|---|
| `space-1` | 4px | `--space-1` | Inline icon gap, tight padding |
| `space-2` | 8px | `--space-2` | Between label and input, badge padding |
| `space-3` | 12px | `--space-3` | Card internal gaps, chip padding |
| `space-4` | 16px | `--space-4` | Standard card padding, list item padding |
| `space-5` | 20px | `--space-5` | Section horizontal padding (mobile) |
| `space-6` | 24px | `--space-6` | Between content sections |
| `space-7` | 32px | `--space-7` | Major section gaps |
| `space-8` | 40px | `--space-8` | Hero vertical padding |
| `space-9` | 48px | `--space-9` | Large section spacing |
| `space-10` | 64px | `--space-10` | Page-level vertical rhythm |
| `space-11` | 80px | `--space-11` | Hero/splash vertical padding |
| `space-12` | 96px | `--space-12` | Maximum page-level spacing |

### 5.2 Spacing Rules

- Mobile horizontal padding: `space-5` (20px) on content screens
- Card internal padding: `space-4` (16px)
- Gap between list items: `space-3` (12px)
- Gap between cards in a grid: `space-4` (16px)
- No arbitrary spacing values — everything from the scale

---

## 6. Elevation

### 6.1 Surface Elevation (Light Theme)

M3 light theme uses progressively darker tint for elevation, not drop shadows.

| Level | Color | Hex | Usage |
|---|---|---|---|
| Level 0 | Surface | `#FFFFFF` | App background, base |
| Level 1 | Surface Container Low | `#FAFAFA` | Secondary background areas |
| Level 2 | Surface Container | `#F5F5F5` | Cards, input backgrounds, chips |
| Level 3 | Surface Container High | `#EFEFEF` | Active inputs, raised elements |
| Level 4 | Surface Container Highest | `#E5E5E5` | Segmented controls, steppers |
| Inverse | Inverse Surface | `#1A1A1A` | Snackbars, tooltips |

### 6.2 Shadow Usage

Shadows are reserved for floating elements only:

| Element | Shadow |
|---|---|
| Cards, containers | **None** — use surface tint |
| Card hover (desktop only) | `0 4px 20px rgba(0,0,0,0.08)` |
| FAB | `0 2px 8px rgba(0,0,0,0.15)` |
| Bottom sheet | `0 -4px 20px rgba(0,0,0,0.08)` |
| Modal | `0 8px 30px rgba(0,0,0,0.12)` |
| Dropdown/menu | `0 4px 16px rgba(0,0,0,0.1)` |

---

## 7. Motion

### 7.1 Easing Curves

All animations use the M3 standard easing: `cubic-bezier(0.2, 0, 0, 1)`

| Token | Duration | Curve | CSS Variable | Usage |
|---|---|---|---|---|
| Fast | 100ms | Standard | `--motion-fast` | Hover states, opacity changes, focus rings |
| Normal | 200ms | Standard | `--motion-normal` | Page transitions, card reveals, expand/collapse |
| Slow | 400ms | Standard | `--motion-slow` | Modal open/close, sheet slide, skeleton shimmer |
| Spring | 500ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `--motion-spring` | Add-to-cart bounce, quantity change, success checkmark |

### 7.2 Animation Patterns

- **Staggered entry:** Content elements fade up with increasing delay (0.05s increments)
- **Skeleton loading:** Shimmer animation using `--motion-slow` — never spinners for content
- **Pull-to-refresh:** Standard platform-native behavior
- **Cart badge:** Spring bounce on item count change
- **Page transitions:** Slide-in from right (forward), slide-out to right (back)

---

## 8. Components

### 8.1 Buttons

**Hierarchy:** Black filled (default action) → Orange primary (purchase CTA) → Tonal → Outlined → Text

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Filled | `on-surface` (#0A0A0A) | `surface` (#FFFFFF) | None | Sign In, Track Order, standard actions |
| Primary | `primary` (#F97316) | `on-primary` (#FFFFFF) | None | Add to Cart, Place Order, checkout CTAs |
| Tonal | `primary-container` (#FFF7ED) | `on-primary-container` (#7C2D12) | None | Reorder, secondary positive actions |
| Outlined | Transparent | `on-surface` (#0A0A0A) | 1.5px `outline` | Change, Filter, Cancel (non-destructive) |
| Text | Transparent | `primary` (#F97316) | None | See all, View details, inline links |
| Danger | `error` (#DC2626) | `on-error` (#FFFFFF) | None | Cancel Order, Delete Account |

**Sizes:**

| Size | Height | Horizontal Padding | Font Size | Radius |
|---|---|---|---|---|
| Large | 48px | 28px | 14px | SM (8px) |
| Medium | 40px | 20px | 14px | SM (8px) |
| Small | 32px | 16px | 13px | SM (8px) |

**Rules:**
- All buttons use SM radius (8px) — never pill-shaped
- Minimum touch target: 44×44px (padding area counts)
- Font weight: 700 (bold) for all button text
- Hover: darken 5% (filled/primary) or show background tint (outlined/text)
- Disabled: 40% opacity, no pointer events

### 8.2 Chips

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Filled | `on-surface` (#0A0A0A) | `surface` (#FFFFFF) | None | Active filter (selected state) |
| Tonal | `surface-container` (#F5F5F5) | `on-surface` (#0A0A0A) | None | Inactive filter option |
| Outlined | Transparent | `on-surface` (#0A0A0A) | 1.5px `outline` | Dietary tags (Halal, Vegetarian) |
| Orange | `primary` (#F97316) | `on-primary` (#FFFFFF) | None | Promotional pills (Free Delivery) |

- Height: 32px
- Padding: 0 14px
- Radius: Full (999px)
- Font: body-small (13px), weight 600

### 8.3 Status Badges

| Status | Background | Text | Dot |
|---|---|---|---|
| Success | `success-container` (#F0FDF4) | `on-success-container` (#14532D) | `success` (#16A34A) |
| Warning | `warning-container` (#FEFCE8) | `on-warning-container` (#713F12) | `warning` (#CA8A04) |
| Error | `error-container` (#FEF2F2) | `on-error-container` (#991B1B) | `error` (#DC2626) |
| Info | `info-container` (#EFF6FF) | `on-info-container` (#1E3A8A) | `info` (#2563EB) |

- Height: auto (padding-based)
- Padding: 4px 10px
- Radius: XS (4px)
- Font: caption (12px), weight 700
- Leading dot: 6px circle in base semantic color

### 8.4 Input Fields

| Property | Value |
|---|---|
| Height | 48px |
| Background | `surface` (#FFFFFF) |
| Border | 1.5px `outline` (#D4D4D4) |
| Border (focus) | 1.5px `on-surface` (#0A0A0A) |
| Radius | SM (8px) |
| Padding | 0 16px |
| Font | body-large (15px) |
| Placeholder color | `on-surface-variant` (#737373) |
| Label | body-small (13px), weight 700, above field, 6px gap |
| Helper text | caption (12px), `on-surface-variant`, 6px below |
| Error state | border `error`, helper text `error` |

### 8.5 Cards — Restaurant

| Property | Value |
|---|---|
| Background | `surface` (#FFFFFF) |
| Border | 1px `outline-variant` (#E5E5E5) |
| Radius | MD (12px) |
| Shadow | None (hover: `0 4px 20px rgba(0,0,0,0.08)` on desktop) |
| Image height | 152px |
| Body padding | 12px horizontal, 16px bottom |
| Title | title-large (Outfit 700, 15px at card size) |
| Subtitle | body-medium (13px), `on-surface-variant` |
| Meta row | caption (13px), `on-surface-variant`, dot-separated |
| Rating | body-medium weight 700, `on-surface` color |
| Promo badge | position absolute top-left, `primary` bg, 11px bold, XS radius |
| Favourite heart | position absolute top-right, 32px circle, white bg, subtle shadow |

### 8.6 Bottom Navigation

| Property | Value |
|---|---|
| Background | `surface` (#FFFFFF) |
| Border top | 1px `outline-variant` (#E5E5E5) |
| Height | 64px (content) + safe area inset |
| Items | 4: Home, Browse, Orders, Account |
| Icon size | 20px |
| Label | 10px, weight 700 |
| Inactive color | `on-surface-variant` (#737373) |
| Active icon color | `primary` (#F97316) |
| Active label color | `on-primary-container` (#7C2D12) |
| Active pill | `primary-container` (#FFF7ED), MD radius |

---

## 9. Platform-Specific Notes

### 9.1 Customer App (Mobile)

- Viewport: 375px base width, scales to device
- Safe areas: respect notch (top) and home indicator (bottom)
- Bottom navigation: always visible on root screens, hidden on pushed screens
- Minimum touch target: 44×44px
- Pull-to-refresh on all list screens

### 9.2 Driver App (Mobile)

- Same token system, same components
- Map takes priority — reduced chrome, maximum map visibility
- Status-heavy UI — semantic badges are prominent
- Large touch targets — drivers may be wearing gloves or riding
- High contrast for outdoor/sunlight readability

### 9.3 Restaurant Portal (Tablet / Desktop)

- Sidebar navigation instead of bottom nav
- Data-dense layouts with smaller spacing (use space-3 for table cells)
- Status badges are the primary visual language
- Print-friendly order tickets (inverse theme: black text on white)

### 9.4 Admin Dashboard (Desktop)

- Full sidebar + top bar layout
- Dense data tables using body-small (13px)
- Charts use the semantic color palette
- Same M3 tokens, same radius, same typography

---

## 10. Do's & Don'ts

### Do

- Use flat, solid fills for all surfaces and buttons
- Use black for default actions, orange exclusively for primary CTAs
- Let food photography provide the color in the interface
- Reference M3 color roles in code — never hardcoded hex values
- Use Outfit for all headings and Plus Jakarta Sans for all body text
- Maintain WCAG AA contrast minimum on all text
- Use generous whitespace around content blocks
- Use surface tint levels for elevation

### Don't

- Use gradients on any surface, button, or background
- Use glassmorphism, blur, or frosted-glass effects
- Use decorative blobs, floating shapes, or mesh patterns
- Use more than two typefaces (Outfit + Plus Jakarta Sans only)
- Use DM Serif Display (deprecated from V1)
- Use colored backgrounds behind cards
- Use pill-shaped buttons (pills are for chips only)
- Use blue in food-related contexts (appetite suppression)
- Use box-shadow for card/container elevation
- Use any color value not defined in this document

---

## 11. CSS Custom Properties Reference

Complete copy-paste block for all CSS variables:

```css
:root {
  /* ── Primary ── */
  --md-sys-color-primary: #F97316;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #FFF7ED;
  --md-sys-color-on-primary-container: #7C2D12;
  --md-sys-color-primary-hover: #EA680D;
  --md-sys-color-primary-pressed: #C2510C;

  /* ── Secondary ── */
  --md-sys-color-secondary: #525252;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-secondary-container: #F5F5F5;
  --md-sys-color-on-secondary-container: #1A1A1A;

  /* ── Tertiary ── */
  --md-sys-color-tertiary: #FF6B4A;
  --md-sys-color-on-tertiary: #FFFFFF;
  --md-sys-color-tertiary-container: #FFF1EE;
  --md-sys-color-on-tertiary-container: #7F1D1D;

  /* ── Error ── */
  --md-sys-color-error: #DC2626;
  --md-sys-color-on-error: #FFFFFF;
  --md-sys-color-error-container: #FEF2F2;
  --md-sys-color-on-error-container: #991B1B;

  /* ── Surface ── */
  --md-sys-color-surface: #FFFFFF;
  --md-sys-color-on-surface: #0A0A0A;
  --md-sys-color-on-surface-variant: #737373;
  --md-sys-color-surface-dim: #F5F5F5;
  --md-sys-color-surface-container-lowest: #FFFFFF;
  --md-sys-color-surface-container-low: #FAFAFA;
  --md-sys-color-surface-container: #F5F5F5;
  --md-sys-color-surface-container-high: #EFEFEF;
  --md-sys-color-surface-container-highest: #E5E5E5;
  --md-sys-color-inverse-surface: #1A1A1A;
  --md-sys-color-inverse-on-surface: #F5F5F5;
  --md-sys-color-scrim: rgba(0, 0, 0, 0.5);

  /* ── Outline ── */
  --md-sys-color-outline: #D4D4D4;
  --md-sys-color-outline-variant: #E5E5E5;

  /* ── Semantic ── */
  --md-sys-color-success: #16A34A;
  --md-sys-color-on-success: #FFFFFF;
  --md-sys-color-success-container: #F0FDF4;
  --md-sys-color-on-success-container: #14532D;

  --md-sys-color-warning: #CA8A04;
  --md-sys-color-on-warning: #FFFFFF;
  --md-sys-color-warning-container: #FEFCE8;
  --md-sys-color-on-warning-container: #713F12;

  --md-sys-color-info: #2563EB;
  --md-sys-color-on-info: #FFFFFF;
  --md-sys-color-info-container: #EFF6FF;
  --md-sys-color-on-info-container: #1E3A8A;

  /* ── Typography ── */
  --md-sys-typescale-display-font: 'Outfit', sans-serif;
  --md-sys-typescale-body-font: 'Plus Jakarta Sans', sans-serif;

  /* ── Shape ── */
  --md-sys-shape-none: 0px;
  --md-sys-shape-xs: 4px;
  --md-sys-shape-sm: 8px;
  --md-sys-shape-md: 12px;
  --md-sys-shape-lg: 16px;
  --md-sys-shape-xl: 24px;
  --md-sys-shape-full: 999px;

  /* ── Spacing ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 40px;
  --space-9: 48px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 96px;

  /* ── Motion ── */
  --motion-fast: 100ms cubic-bezier(0.2, 0, 0, 1);
  --motion-normal: 200ms cubic-bezier(0.2, 0, 0, 1);
  --motion-slow: 400ms cubic-bezier(0.2, 0, 0, 1);
  --motion-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 12. JavaScript Token Object

For React / React Native / JSX artifact builds:

```javascript
const T = {
  color: {
    primary: {
      main: '#F97316',
      onMain: '#FFFFFF',
      container: '#FFF7ED',
      onContainer: '#7C2D12',
      hover: '#EA680D',
      pressed: '#C2510C',
      scale: {
        50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74',
        400: '#FB923C', 500: '#F97316', 600: '#EA580C', 700: '#C2410C',
        800: '#9A3412', 900: '#7C2D12',
      },
    },
    secondary: {
      main: '#525252',
      onMain: '#FFFFFF',
      container: '#F5F5F5',
      onContainer: '#1A1A1A',
    },
    tertiary: {
      main: '#FF6B4A',
      onMain: '#FFFFFF',
      container: '#FFF1EE',
      onContainer: '#7F1D1D',
    },
    error: {
      main: '#DC2626',
      onMain: '#FFFFFF',
      container: '#FEF2F2',
      onContainer: '#991B1B',
    },
    surface: {
      main: '#FFFFFF',
      dim: '#F5F5F5',
      containerLowest: '#FFFFFF',
      containerLow: '#FAFAFA',
      container: '#F5F5F5',
      containerHigh: '#EFEFEF',
      containerHighest: '#E5E5E5',
      onMain: '#0A0A0A',
      onVariant: '#737373',
      inverse: '#1A1A1A',
      onInverse: '#F5F5F5',
      scrim: 'rgba(0,0,0,0.5)',
    },
    outline: {
      main: '#D4D4D4',
      variant: '#E5E5E5',
    },
    success: { main: '#16A34A', onMain: '#FFFFFF', container: '#F0FDF4', onContainer: '#14532D' },
    warning: { main: '#CA8A04', onMain: '#FFFFFF', container: '#FEFCE8', onContainer: '#713F12' },
    info:    { main: '#2563EB', onMain: '#FFFFFF', container: '#EFF6FF', onContainer: '#1E3A8A' },
  },
};

const font = {
  display: "'Outfit', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
  size: { displayLg: 40, displayMd: 32, headline: 24, titleLg: 20, titleMd: 16, bodyLg: 15, bodyMd: 14, bodySm: 13, label: 12, caption: 11 },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
  tracking: { tight: -1, snug: -0.5, normal: 0, wide: 1 },
};

const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48, 10: 64, 11: 80, 12: 96 };

const radius = { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

const shadow = {
  none: 'none',
  hover: '0 4px 20px rgba(0,0,0,0.08)',
  fab: '0 2px 8px rgba(0,0,0,0.15)',
  sheet: '0 -4px 20px rgba(0,0,0,0.08)',
  modal: '0 8px 30px rgba(0,0,0,0.12)',
  dropdown: '0 4px 16px rgba(0,0,0,0.1)',
};

const motion = {
  fast: '100ms cubic-bezier(0.2, 0, 0, 1)',
  normal: '200ms cubic-bezier(0.2, 0, 0, 1)',
  slow: '400ms cubic-bezier(0.2, 0, 0, 1)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};
```

---

*UmuziKos Design System V2.0 — Last updated May 2026*
