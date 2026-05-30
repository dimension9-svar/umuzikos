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

## 1. Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
│  Customer App    Driver App    Restaurant Portal    Admin    │
│  (React Native)  (React Native)  (Next.js)        (Next.js) │
└──────────┬───────────┬──────────────┬───────────────┬───────┘
           │           │              │               │
           ▼           ▼              ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
│                  (Node.js / Express)                         │
│              Vercel Serverless Functions                      │
├──────────┬───────────┬──────────────┬───────────────────────┤
│   Auth   │    REST   │   WebSocket  │   Webhooks            │
│ (Clerk)  │    API    │   (Socket.io)│  (Payment callbacks)  │
└──────────┴─────┬─────┴──────┬───────┴───────────────────────┘
                 │            │
    ┌────────────┴──┐    ┌────┴────────────┐
    │  PostgreSQL   │    │     Redis        │
    │  + PostGIS    │    │  (sessions,      │
    │  (Supabase)   │    │   pub/sub,       │
    │               │    │   rate limiting)  │
    └───────────────┘    └─────────────────┘
           │
    ┌──────┴──────┐
    │  Supabase   │
    │  Storage    │
    │  (images)   │
    └─────────────┘
```

### 1.2 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Mobile apps** | React Native (Expo SDK 52+) | Single codebase for iOS/Android, Expo managed workflow, OTA updates |
| **Web apps** | Next.js 15 (App Router) | SSR for restaurant portal, RSC for admin dashboard, shared with API |
| **API** | Node.js + Express (or Next.js API routes) | TypeScript throughout, serverless-compatible |
| **Database** | PostgreSQL 16 + PostGIS | Relational data, spatial queries for radius, Supabase hosted |
| **Auth** | Clerk | Phone OTP, social sign-in (Google/Apple), role-based access |
| **Realtime** | Supabase Realtime (Postgres Changes) + Socket.io fallback | Driver location broadcast, order status updates |
| **Cache** | Redis (Upstash) | Session store, rate limiting, driver location cache |
| **File storage** | Supabase Storage | Restaurant images, menu item photos, driver avatars |
| **Payments** | Paystack (card), SnapScan API, Ozow API | SA payment rails, webhook-based confirmation |
| **Maps** | Google Maps Platform | Geocoding, directions, driver tracking, distance matrix |
| **Push notifications** | Expo Notifications + Firebase Cloud Messaging | Order updates, promo alerts |
| **Hosting** | Vercel (web), Expo EAS (mobile builds) | Zero-config deploys, edge functions |
| **Monitoring** | Sentry | Error tracking across all surfaces |
| **Analytics** | PostHog | Product analytics, feature flags, session replay |

### 1.3 Monorepo Structure

```
umuzikos/
├── apps/
│   ├── customer/              # React Native (Expo) — customer app
│   │   ├── app/               # Expo Router file-based routing
│   │   ├── components/        # Screen-specific components
│   │   ├── hooks/             # Custom hooks
│   │   └── app.json
│   ├── driver/                # React Native (Expo) — driver app
│   │   ├── app/
│   │   ├── components/
│   │   └── app.json
│   ├── restaurant/            # Next.js — restaurant portal
│   │   ├── app/               # App Router
│   │   ├── components/
│   │   └── next.config.js
│   └── admin/                 # Next.js — admin dashboard
│       ├── app/
│       ├── components/
│       └── next.config.js
├── packages/
│   ├── tokens/                # Design tokens (shared across all apps)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shapes.ts
│   │   └── index.ts
│   ├── ui/                    # Shared UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Chip.tsx
│   │   └── index.ts
│   ├── api-client/            # Typed API client (shared)
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── hooks.ts
│   ├── db/                    # Database schema + migrations
│   │   ├── schema.ts          # Drizzle ORM schema
│   │   ├── migrations/
│   │   └── seed.ts
│   └── config/                # Shared config (env, constants)
│       ├── constants.ts
│       └── env.ts
├── services/
│   ├── api/                   # Express API server (or Next.js API routes)
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── index.ts
│   └── realtime/              # WebSocket server for driver tracking
│       ├── server.ts
│       └── handlers/
├── turbo.json
├── package.json
└── .env.example
```

**Tooling:**
- **Monorepo:** Turborepo
- **Package manager:** pnpm
- **ORM:** Drizzle ORM (type-safe, SQL-like)
- **Validation:** Zod (shared schemas between client + server)
- **Linting:** ESLint + Prettier, shared config
- **TypeScript:** Strict mode, path aliases via `tsconfig.json`

---

## 2. Database Schema

### 2.1 Entity Relationship Overview

```
restaurants ─┬── menu_categories ── menu_items ─── item_options
             │                                 └── item_dietary_tags
             └── restaurant_hours

users ─┬── addresses
       ├── payment_methods
       └── favourites

orders ─┬── order_items ── order_item_options
        ├── order_status_log
        ├── order_ratings
        └── driver_assignments

drivers ── driver_locations (PostGIS POINT)

promotions ── promo_redemptions
```

### 2.2 Core Tables

```sql
-- ═══ RESTAURANTS ═══════════════════════════════════════════════

CREATE TABLE restaurants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  cuisine_tags    TEXT[] DEFAULT '{}',
  image_url       TEXT,
  cover_image_url TEXT,
  phone           TEXT,
  email           TEXT,
  latitude        DECIMAL(10, 7) NOT NULL,
  longitude       DECIMAL(10, 7) NOT NULL,
  location        GEOGRAPHY(POINT, 4326),  -- PostGIS
  avg_rating      DECIMAL(2, 1) DEFAULT 0,
  total_reviews   INTEGER DEFAULT 0,
  delivery_fee    INTEGER NOT NULL DEFAULT 1500,  -- cents (R15.00)
  min_order       INTEGER DEFAULT 0,              -- cents
  avg_prep_time   INTEGER DEFAULT 20,             -- minutes
  is_active       BOOLEAN DEFAULT true,
  accepts_pickup  BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE restaurant_hours (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id   UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  day_of_week     SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun
  open_time       TIME NOT NULL,
  close_time      TIME NOT NULL,
  is_closed       BOOLEAN DEFAULT false
);

-- ═══ MENU ══════════════════════════════════════════════════════

CREATE TABLE menu_categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id   UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id     UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  restaurant_id   UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  price           INTEGER NOT NULL,  -- cents
  image_url       TEXT,
  is_available    BOOLEAN DEFAULT true,
  is_popular      BOOLEAN DEFAULT false,
  sort_order      INTEGER DEFAULT 0,
  dietary_tags    TEXT[] DEFAULT '{}',  -- ['halal','vegetarian','spicy']
  allergens       TEXT[] DEFAULT '{}',  -- ['gluten','dairy','nuts']
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE item_options (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id         UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  group_name      TEXT NOT NULL,        -- "Choose your size", "Add extras"
  group_type      TEXT NOT NULL CHECK (group_type IN ('radio', 'checkbox')),
  is_required     BOOLEAN DEFAULT false,
  max_selections  INTEGER DEFAULT 1,
  sort_order      INTEGER DEFAULT 0
);

CREATE TABLE item_option_values (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  option_id       UUID NOT NULL REFERENCES item_options(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,         -- "Large", "Extra cheese"
  price_modifier  INTEGER DEFAULT 0,     -- cents, can be 0
  is_default      BOOLEAN DEFAULT false,
  sort_order      INTEGER DEFAULT 0
);

-- ═══ USERS ═════════════════════════════════════════════════════

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id        TEXT UNIQUE NOT NULL,  -- from Clerk auth
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  avatar_url      TEXT,
  role            TEXT NOT NULL DEFAULT 'customer'
                  CHECK (role IN ('customer','driver','restaurant','admin')),
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE addresses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label           TEXT DEFAULT 'Home',   -- Home, Work, Other
  street          TEXT NOT NULL,
  suburb          TEXT,
  city            TEXT DEFAULT 'Secunda',
  postal_code     TEXT,
  latitude        DECIMAL(10, 7),
  longitude       DECIMAL(10, 7),
  location        GEOGRAPHY(POINT, 4326),
  instructions    TEXT,                  -- "Blue gate, ring twice"
  is_default      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE favourites (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id   UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, restaurant_id)
);

-- ═══ ORDERS ════════════════════════════════════════════════════

CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    TEXT NOT NULL UNIQUE,  -- UMK-20260524-0042
  user_id         UUID NOT NULL REFERENCES users(id),
  restaurant_id   UUID NOT NULL REFERENCES restaurants(id),
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN (
                    'pending','confirmed','preparing','ready',
                    'picked_up','on_the_way','delivered','cancelled'
                  )),
  order_type      TEXT NOT NULL DEFAULT 'delivery'
                  CHECK (order_type IN ('delivery', 'pickup')),
  -- Pricing (all in cents)
  subtotal        INTEGER NOT NULL,
  delivery_fee    INTEGER NOT NULL DEFAULT 0,
  service_fee     INTEGER NOT NULL DEFAULT 0,
  discount        INTEGER NOT NULL DEFAULT 0,
  total           INTEGER NOT NULL,
  -- Delivery
  delivery_address_id UUID REFERENCES addresses(id),
  delivery_instructions TEXT,
  delivery_type   TEXT CHECK (delivery_type IN (
                    'hand_to_me','leave_at_door','meet_at_gate','call_on_arrival'
                  )),
  -- Scheduling
  is_scheduled    BOOLEAN DEFAULT false,
  scheduled_for   TIMESTAMPTZ,
  -- Payment
  payment_method  TEXT NOT NULL CHECK (payment_method IN (
                    'card','snapscan','ozow','cash'
                  )),
  payment_status  TEXT DEFAULT 'pending'
                  CHECK (payment_status IN ('pending','paid','failed','refunded')),
  payment_ref     TEXT,                  -- external payment reference
  -- Promo
  promo_code_id   UUID REFERENCES promotions(id),
  -- Timestamps
  confirmed_at    TIMESTAMPTZ,
  preparing_at    TIMESTAMPTZ,
  ready_at        TIMESTAMPTZ,
  picked_up_at    TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  cancel_reason   TEXT,
  estimated_delivery TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id),
  name            TEXT NOT NULL,         -- snapshot at order time
  unit_price      INTEGER NOT NULL,      -- cents, snapshot
  quantity        INTEGER NOT NULL DEFAULT 1,
  special_instructions TEXT,             -- max 200 chars
  line_total      INTEGER NOT NULL       -- unit_price * quantity + options
);

CREATE TABLE order_item_options (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id   UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  option_name     TEXT NOT NULL,          -- "Size: Large"
  price_modifier  INTEGER DEFAULT 0       -- cents, snapshot
);

CREATE TABLE order_status_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status          TEXT NOT NULL,
  changed_by      UUID REFERENCES users(id),
  note            TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══ DRIVERS ═══════════════════════════════════════════════════

CREATE TABLE drivers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL UNIQUE REFERENCES users(id),
  vehicle_type    TEXT DEFAULT 'motorbike',
  vehicle_reg     TEXT,
  license_number  TEXT,
  is_online       BOOLEAN DEFAULT false,
  is_available    BOOLEAN DEFAULT true,  -- not on a delivery
  current_order_id UUID REFERENCES orders(id),
  avg_rating      DECIMAL(2, 1) DEFAULT 5.0,
  total_deliveries INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE driver_assignments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id),
  driver_id       UUID NOT NULL REFERENCES drivers(id),
  assigned_at     TIMESTAMPTZ DEFAULT now(),
  accepted_at     TIMESTAMPTZ,
  picked_up_at    TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  status          TEXT DEFAULT 'assigned'
                  CHECK (status IN ('assigned','accepted','picked_up','delivered','cancelled'))
);

-- Driver locations stored in Redis for real-time,
-- periodically flushed to Postgres for history
CREATE TABLE driver_location_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id       UUID NOT NULL REFERENCES drivers(id),
  location        GEOGRAPHY(POINT, 4326) NOT NULL,
  heading         DECIMAL(5, 2),         -- compass bearing
  speed           DECIMAL(5, 2),         -- km/h
  accuracy        DECIMAL(5, 2),         -- meters
  recorded_at     TIMESTAMPTZ DEFAULT now()
);

-- ═══ RATINGS ═══════════════════════════════════════════════════

CREATE TABLE order_ratings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL UNIQUE REFERENCES orders(id),
  user_id         UUID NOT NULL REFERENCES users(id),
  restaurant_rating SMALLINT CHECK (restaurant_rating BETWEEN 1 AND 5),
  delivery_rating   SMALLINT CHECK (delivery_rating BETWEEN 1 AND 5),
  comment         TEXT,
  tip_amount      INTEGER DEFAULT 0,     -- cents
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══ PROMOTIONS ════════════════════════════════════════════════

CREATE TABLE promotions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  description     TEXT,
  discount_type   TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value  INTEGER NOT NULL,      -- percentage (15) or cents (2000)
  min_order       INTEGER DEFAULT 0,     -- cents
  max_discount    INTEGER,               -- cents cap for percentage
  max_uses        INTEGER,
  current_uses    INTEGER DEFAULT 0,
  restaurant_id   UUID REFERENCES restaurants(id),  -- null = all restaurants
  valid_from      TIMESTAMPTZ NOT NULL,
  valid_until     TIMESTAMPTZ NOT NULL,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE promo_redemptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_id        UUID NOT NULL REFERENCES promotions(id),
  user_id         UUID NOT NULL REFERENCES users(id),
  order_id        UUID NOT NULL REFERENCES orders(id),
  discount_applied INTEGER NOT NULL,     -- actual cents saved
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══ NOTIFICATIONS ═════════════════════════════════════════════

CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  type            TEXT NOT NULL CHECK (type IN ('order','promo','system')),
  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  data            JSONB DEFAULT '{}',    -- deep link data
  is_read         BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);
```

### 2.3 Key Indexes

```sql
CREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id, status);
CREATE INDEX idx_orders_status ON orders(status) WHERE status NOT IN ('delivered','cancelled');
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id, is_available);
CREATE INDEX idx_menu_items_category ON menu_items(category_id, sort_order);
CREATE INDEX idx_driver_locations_driver ON driver_location_history(driver_id, recorded_at DESC);
CREATE INDEX idx_addresses_user ON addresses(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_restaurant_hours ON restaurant_hours(restaurant_id, day_of_week);

-- Spatial indexes
CREATE INDEX idx_addresses_location ON addresses USING GIST(location);
CREATE INDEX idx_restaurants_location ON restaurants USING GIST(location);
CREATE INDEX idx_driver_locations_geo ON driver_location_history USING GIST(location);
```

### 2.4 Money Convention

All monetary values are stored as **integers in cents** (South African cents). R15.00 = 1500. This avoids floating-point rounding errors. Formatting to `R XX.XX` happens at the presentation layer only.

```typescript
// Helper: cents to display
const formatRands = (cents: number): string => {
  return `R${(cents / 100).toFixed(2)}`;
};
```

---

## 3. Authentication & Authorization

### 3.1 Auth Provider: Clerk

| Feature | Implementation |
|---|---|
| Customer sign-up | Phone OTP (+27 number) |
| Customer sign-in | Phone OTP or email magic link |
| Social sign-in | Google, Apple |
| Driver sign-in | Phone OTP (admin-provisioned accounts) |
| Restaurant sign-in | Email + password (admin-provisioned) |
| Admin sign-in | Email + password + 2FA |

### 3.2 Roles & Permissions

| Role | Access |
|---|---|
| `customer` | Customer app only. Own orders, addresses, favourites, ratings. |
| `driver` | Driver app only. Assigned orders, own location, earnings. |
| `restaurant` | Restaurant portal for their assigned restaurant(s). Menu management, order queue, hours. |
| `admin` | Full access to admin dashboard. All data, all restaurants, all users, promotions, analytics. |

### 3.3 API Auth Flow

```
Client → Clerk SDK → JWT issued
Client → API request with Bearer token
API → Clerk middleware verifies JWT
API → Extract user_id + role from claims
API → Role-based route guard
```

### 3.4 Row-Level Security

Supabase RLS policies enforce data access at the database level:

- Customers can only read/write their own data (orders, addresses, favourites)
- Restaurants can only read/write their own restaurant's data
- Drivers can only read their assigned orders and write their own location
- Admins bypass RLS via service role key (server-side only)

---

## 4. API Design

### 4.1 Base URL

```
Production:  https://api.umuzikos.co.za/v1
Staging:     https://api-staging.umuzikos.co.za/v1
Local:       http://localhost:3001/v1
```

### 4.2 Core Endpoints

**Restaurants**

```
GET    /restaurants                    # List all (with hours, ratings, open status)
GET    /restaurants/:id                # Detail (menu, categories, hours)
GET    /restaurants/:id/menu           # Full menu with categories + items
GET    /restaurants/:id/reviews        # Paginated reviews
```

**Menu**

```
GET    /menu-items/:id                 # Item detail with options
```

**Orders**

```
POST   /orders                         # Create new order
GET    /orders                         # List user's orders (paginated, filterable)
GET    /orders/:id                     # Order detail with items, status log
PATCH  /orders/:id/cancel              # Cancel order (customer, within window)
POST   /orders/:id/reorder             # Clone order items to new cart
POST   /orders/:id/rate                # Submit rating + tip
```

**Cart** (client-side state, validated server-side at checkout)

```
POST   /orders/validate-cart           # Validate items, prices, availability
POST   /orders/calculate-fees          # Calculate delivery + service fees
POST   /promos/validate                # Validate promo code
```

**User**

```
GET    /users/me                       # Current user profile
PATCH  /users/me                       # Update profile
GET    /users/me/addresses             # List addresses
POST   /users/me/addresses             # Add address
PATCH  /users/me/addresses/:id         # Update address
DELETE /users/me/addresses/:id         # Delete address
GET    /users/me/favourites            # List favourite restaurants
POST   /users/me/favourites/:restaurantId    # Add favourite
DELETE /users/me/favourites/:restaurantId    # Remove favourite
GET    /users/me/notifications         # Paginated notifications
PATCH  /users/me/notifications/:id/read      # Mark read
```

**Payments**

```
POST   /payments/initiate              # Start payment flow (returns redirect/QR)
POST   /payments/webhook/paystack      # Paystack callback
POST   /payments/webhook/ozow          # Ozow callback
POST   /payments/webhook/snapscan      # SnapScan callback
```

**Driver (driver app)**

```
GET    /driver/current-order           # Active assigned order
PATCH  /driver/orders/:id/accept       # Accept assignment
PATCH  /driver/orders/:id/pickup       # Mark picked up
PATCH  /driver/orders/:id/deliver      # Mark delivered
PATCH  /driver/orders/:id/cash-collected  # Confirm cash payment
POST   /driver/location                # Update GPS (also via WebSocket)
PATCH  /driver/status                  # Toggle online/offline
```

**Restaurant Portal**

```
GET    /portal/orders                  # Order queue (active orders)
GET    /portal/orders/history          # Past orders
PATCH  /portal/orders/:id/confirm      # Confirm order
PATCH  /portal/orders/:id/preparing    # Start preparing
PATCH  /portal/orders/:id/ready        # Mark ready for pickup
PATCH  /portal/orders/:id/cancel       # Cancel order (with reason)
GET    /portal/menu                    # Restaurant's menu
PATCH  /portal/menu-items/:id          # Update item (price, availability)
POST   /portal/menu-items              # Add item
DELETE /portal/menu-items/:id          # Remove item
PATCH  /portal/hours                   # Update operating hours
GET    /portal/analytics               # Basic stats (today's orders, revenue)
```

**Admin**

```
GET    /admin/dashboard                # Aggregate stats
GET    /admin/orders                   # All orders (filterable)
GET    /admin/users                    # All users
GET    /admin/drivers                  # All drivers + status
POST   /admin/promotions               # Create promo
PATCH  /admin/promotions/:id           # Edit promo
GET    /admin/analytics                # Full analytics
POST   /admin/drivers                  # Onboard new driver
```

### 4.3 Response Format

All responses follow a consistent envelope:

```json
{
  "ok": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 142
  }
}
```

Error responses:

```json
{
  "ok": false,
  "error": {
    "code": "ORDER_BELOW_MINIMUM",
    "message": "Order total must be at least R50.00",
    "details": { "min_order": 5000, "current_total": 3500 }
  }
}
```

### 4.4 Pagination

Cursor-based for feeds, offset-based for admin lists:

```
GET /orders?cursor=abc123&limit=20     # Customer order history
GET /admin/orders?page=3&per_page=50   # Admin list
```

---

## 5. Order Lifecycle

### 5.1 State Machine

```
                     ┌──────────────┐
                     │   pending    │  Customer places order
                     └──────┬───────┘
                            │ Restaurant confirms
                     ┌──────▼───────┐
              ┌──────│  confirmed   │
              │      └──────┬───────┘
              │             │ Kitchen starts
              │      ┌──────▼───────┐
              │      │  preparing   │
              │      └──────┬───────┘
              │             │ Food ready
              │      ┌──────▼───────┐
              │      │    ready     │  Driver notified
              │      └──────┬───────┘
              │             │ Driver picks up
              │      ┌──────▼───────┐
              │      │  picked_up   │  (delivery only)
              │      └──────┬───────┘
              │             │ Driver en route
              │      ┌──────▼───────┐
              │      │ on_the_way   │  Customer sees tracking
              │      └──────┬───────┘
              │             │ Driver arrives
              │      ┌──────▼───────┐
              │      │  delivered   │  ✓ Complete
              │      └──────────────┘
              │
              │      ┌──────────────┐
              └─────►│  cancelled   │  (any stage before picked_up)
                     └──────────────┘
```

### 5.2 Pickup Orders

Pickup orders skip driver states. The chain is:

`pending → confirmed → preparing → ready → delivered`

"Delivered" in pickup context means the customer collected the order (staff marks it via the restaurant portal or the customer presents their QR code from S-034).

### 5.3 Who Changes Status

| Transition | Changed By |
|---|---|
| `pending → confirmed` | Restaurant portal (manual) or auto after 5 min |
| `confirmed → preparing` | Restaurant portal |
| `preparing → ready` | Restaurant portal |
| `ready → picked_up` | Driver app |
| `picked_up → on_the_way` | Driver app (automatic on route start) |
| `on_the_way → delivered` | Driver app |
| `* → cancelled` | Customer (before preparing), Restaurant (any stage), Admin (any stage) |

### 5.4 Order Number Format

`UMK-YYYYMMDD-NNNN`

Example: `UMK-20260524-0042` — 42nd order on 24 May 2026. The counter resets daily. Padded to 4 digits (supports up to 9999 orders/day).

---

## 6. Real-Time Systems

### 6.1 Driver Location Tracking

**Write path (driver → server):**
- Driver app sends GPS every 5 seconds while on a delivery
- Data: `{ lat, lng, heading, speed, accuracy, timestamp }`
- Sent via WebSocket (Socket.io), falls back to HTTP POST
- Server writes to Redis hash: `driver:{driver_id}:location`
- Every 30 seconds, batch-flush Redis to `driver_location_history` table

**Read path (customer app ← server):**
- Customer subscribes to `order:{order_id}:tracking`
- Server reads driver location from Redis, pushes to subscribers
- Broadcast interval: every 3 seconds
- Payload: `{ lat, lng, heading, eta_minutes }`

### 6.2 Order Status Updates

**Via Supabase Realtime (Postgres Changes):**
- Customer app subscribes to `orders` table filtered by their `user_id`
- Restaurant portal subscribes filtered by `restaurant_id`
- Driver app subscribes filtered by `driver_id`
- Any status update triggers an automatic push to all subscribers

**Push notifications** fire in parallel for key transitions:
- `confirmed` → Customer: "Your order is confirmed!"
- `preparing` → Customer: "Your food is being prepared"
- `ready` → Driver: "Order ready for pickup at [restaurant]"
- `picked_up` → Customer: "Your rider has picked up your order"
- `on_the_way` → Customer: "Your food is on the way!"
- `delivered` → Customer: "Your order has been delivered"

### 6.3 Restaurant Order Bell

New orders trigger an audible notification in the restaurant portal:
- Supabase Realtime subscription on `orders` where `restaurant_id = mine` and `status = pending`
- Browser `Audio` API plays notification sound
- Persistent banner until order is confirmed or cancelled

---

## 7. Payments

### 7.1 Flow

```
Customer selects payment → POST /payments/initiate
Server creates payment intent with provider
Server returns { redirect_url } or { qr_code_url }
Customer completes payment externally
Provider sends webhook → POST /payments/webhook/:provider
Server verifies signature, updates order.payment_status = 'paid'
Server advances order status to 'confirmed' (or waits for restaurant)
```

### 7.2 Provider Integration

| Method | Provider | Flow |
|---|---|---|
| Card (Visa/MC) | Paystack | Redirect to Paystack checkout page → callback |
| SnapScan | SnapScan API | Generate QR code → customer scans in SnapScan app → webhook |
| Instant EFT | Ozow | Redirect to Ozow bank selector → authenticate → webhook |
| Cash | — | No payment flow. Driver confirms receipt via driver app. |

### 7.3 Webhook Security

All webhooks verify provider signatures:
- Paystack: HMAC SHA512 of request body with secret key
- Ozow: SHA512 hash verification
- SnapScan: API key in header

### 7.4 Refunds

Triggered by admin dashboard. Full or partial refund via provider API. Updates `payment_status = 'refunded'`.

---

## 8. Screen Inventories

### 8.1 Customer App (32 screens)

Full specification in `umuzikos-final-build-plan.md`. Summary:

| Suite | Screens |
|---|---|
| Onboarding | S-001 Splash, S-002/003/004 Welcome, S-005 Login, S-006 Register, S-007 OTP |
| Home & Discovery | S-010 Home Feed, S-011 Browse, S-012 Category View, S-013 Promotions |
| Restaurant | S-020 Restaurant Detail, S-021 Menu Item Detail, S-022 Reviews |
| Cart & Checkout | S-030 Cart, S-031 Checkout, S-032 Payment Method, S-033 Order Confirmed, S-034 Pickup Confirmation, S-035 Schedule Order |
| Tracking | S-040 Live Order Tracking, S-041 Driver Chat, S-042 Rate Order |
| Profile & Account | S-050 Profile, S-051 Order History, S-052 Order Detail, S-053 Saved Addresses, S-054 Payment Methods, S-055 Settings, S-056 My Favourites |
| Support | S-060 Notifications, S-061 Help Centre |

### 8.2 Driver App (12 screens)

| ID | Screen | Description |
|---|---|---|
| D-001 | Login | Phone OTP sign-in |
| D-010 | Home / Status | Online/offline toggle, current earnings today, waiting-for-order state |
| D-011 | Order Offer | Incoming order card: restaurant, customer area, estimated distance, payout. Accept/Decline buttons. 30s auto-decline timer. |
| D-020 | Active Order | Full order detail: restaurant address, items list, special instructions, customer name + phone. Navigation button → Google Maps. |
| D-021 | Pickup Confirmation | "Confirm Pickup" screen: checklist of items, "All items collected" toggle, swipe-to-confirm. |
| D-022 | Delivery Navigation | Map view with route to customer. ETA countdown. Customer address + delivery instructions prominent. |
| D-023 | Delivery Confirmation | "Confirm Delivery" screen: swipe-to-confirm or "Cash Collected" button for COD. Photo proof option. |
| D-030 | Earnings | Today, this week, this month breakdown. Per-delivery list with timestamps. |
| D-040 | Chat | In-delivery chat with customer (same protocol as S-041). |
| D-050 | Profile | Name, phone, vehicle details, rating, total deliveries. |
| D-051 | Delivery History | Past deliveries list with dates, amounts, restaurant names. |
| D-060 | Settings | Notification preferences, vehicle update, sign out. |

**Driver app specifics:**
- Always-on foreground location service when online
- Large touch targets (gloves, sunlight)
- Minimal chrome — map fills most of the screen
- Haptic feedback on order accept/decline
- Audio alert for new order offers
- Screen stays awake during active delivery

### 8.3 Restaurant Portal (8 views)

| ID | View | Description |
|---|---|---|
| R-010 | Order Queue | Live incoming orders. Cards with timer, items, order number. Accept/Reject actions. Audio bell on new order. |
| R-011 | Order Detail | Full order: items, quantities, special instructions (highlighted), customer name, delivery/pickup, scheduled time. Status advancement buttons. |
| R-020 | Order History | Past orders with filters (date range, status). Search by order number. |
| R-030 | Menu Manager | Category list → items. Toggle availability, edit price, add/remove items. Drag to reorder. |
| R-031 | Item Editor | Edit item: name, description, price, photo upload, dietary tags, allergens, customisation options. |
| R-040 | Hours & Settings | Operating hours per day. Toggle "Accepting Orders". Prep time estimate. |
| R-050 | Analytics | Today's orders, revenue, avg prep time, popular items. Simple charts. |
| R-060 | Settings | Restaurant profile, notification preferences, staff accounts. |

**Restaurant portal specifics:**
- Optimised for iPad landscape (1024×768) and desktop (1440×900)
- Sidebar navigation (always visible)
- Order queue auto-refreshes via Supabase Realtime
- Print button on order detail → thermal printer-formatted ticket
- Special instructions in bold orange to prevent missed notes
- Bulk status update: "Mark all as preparing"

### 8.4 Admin Dashboard (10 views)

| ID | View | Description |
|---|---|---|
| A-010 | Dashboard | KPIs: orders today, revenue, active drivers, avg delivery time. Charts: orders over time, revenue by restaurant. |
| A-020 | Orders | All orders table with filters (date, status, restaurant, driver). Click → detail modal. |
| A-030 | Restaurants | List of 7 restaurants. Click → detail: hours, menu count, avg rating, toggle active. |
| A-040 | Drivers | Driver list with status (online/offline/delivering). Click → detail: current location, delivery history, rating. |
| A-050 | Users | Customer list with order count, total spend, last active. Search by name/phone. |
| A-060 | Promotions | Promo list. Create/edit/deactivate. Usage stats per promo. |
| A-070 | Analytics | Deep analytics: orders by hour, heatmap of delivery addresses, avg prep time per restaurant, driver utilisation. |
| A-080 | Live Map | Real-time map showing all online drivers, active deliveries with routes. |
| A-090 | Finance | Revenue breakdown by restaurant, driver payouts, fee collection, refund log. |
| A-100 | Settings | Platform config: delivery radius, base delivery fee, service fee percentage, scheduled order window. |

---

## 9. Fee Calculation

### 9.1 Delivery Fee

```typescript
const calculateDeliveryFee = (distanceKm: number): number => {
  const BASE_FEE = 1500;      // R15.00
  const PER_KM_RATE = 500;    // R5.00 per km after 3km
  const FREE_KM = 3;
  const MAX_RADIUS = 8;

  if (distanceKm > MAX_RADIUS) throw new Error('Outside delivery radius');
  if (distanceKm <= FREE_KM) return BASE_FEE;

  const extraKm = Math.ceil(distanceKm - FREE_KM);
  return BASE_FEE + (extraKm * PER_KM_RATE);
};
```

### 9.2 Service Fee

Fixed 5% of subtotal, minimum R5.00, maximum R25.00.

```typescript
const calculateServiceFee = (subtotal: number): number => {
  const fee = Math.round(subtotal * 0.05);
  return Math.max(500, Math.min(fee, 2500));
};
```

### 9.3 Promo Discount

```typescript
const calculateDiscount = (promo: Promotion, subtotal: number): number => {
  if (subtotal < promo.min_order) return 0;

  if (promo.discount_type === 'percentage') {
    const discount = Math.round(subtotal * (promo.discount_value / 100));
    return promo.max_discount ? Math.min(discount, promo.max_discount) : discount;
  }

  return promo.discount_value; // fixed amount in cents
};
```

---

## 10. Maps & Geolocation

### 10.1 Google Maps APIs Used

| API | Usage |
|---|---|
| Maps JavaScript API | Customer tracking screen, admin live map |
| Maps SDK for Android/iOS | Driver app navigation, customer tracking (React Native) |
| Geocoding API | Address → lat/lng on address save |
| Directions API | Route calculation, ETA estimation |
| Distance Matrix API | Delivery fee calculation, driver-to-restaurant distance |
| Places API | Address autocomplete on address input |

### 10.2 Delivery Radius Check

```sql
-- PostGIS query: is this address within 8km of the waterfront?
SELECT ST_DWithin(
  address.location,
  ST_SetSRID(ST_MakePoint(29.1819, -26.5481), 4326)::geography,
  8000  -- 8km in meters
) AS is_within_radius;
```

### 10.3 Map Styling

Customer and driver apps use a clean minimal map style with UmuziKos orange for route lines and pins. No map clutter — reduced labels, no transit, no terrain.

---

## 11. Environment Variables

```bash
# ═══ Database
DATABASE_URL=postgresql://...
DIRECT_DATABASE_URL=postgresql://...  # non-pooled for migrations

# ═══ Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ═══ Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# ═══ Payments
PAYSTACK_SECRET_KEY=sk_...
PAYSTACK_PUBLIC_KEY=pk_...
SNAPSCAN_API_KEY=...
SNAPSCAN_MERCHANT_ID=...
OZOW_SITE_CODE=...
OZOW_PRIVATE_KEY=...

# ═══ Google Maps
GOOGLE_MAPS_API_KEY=AIza...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...  # client-side (restricted)

# ═══ Redis
REDIS_URL=redis://...

# ═══ Push Notifications
EXPO_ACCESS_TOKEN=...

# ═══ Monitoring
SENTRY_DSN=https://...
NEXT_PUBLIC_SENTRY_DSN=https://...
POSTHOG_API_KEY=phc_...

# ═══ Storage
SUPABASE_STORAGE_BUCKET=umuzikos-images

# ═══ App Config
WATERFRONT_LAT=-26.5481
WATERFRONT_LNG=29.1819
DELIVERY_RADIUS_KM=8
BASE_DELIVERY_FEE_CENTS=1500
SERVICE_FEE_PERCENT=5
```

---

## 12. Deployment

### 12.1 Environments

| Environment | URL | Branch | Purpose |
|---|---|---|---|
| Local | localhost:3000/3001 | feature/* | Development |
| Staging | staging.umuzikos.co.za | develop | QA, client demos |
| Production | umuzikos.co.za | main | Live |

### 12.2 CI/CD

```
Push to branch → GitHub Actions → lint + type-check + test
PR to develop → Deploy to staging (Vercel preview)
Merge to develop → Auto-deploy staging
PR to main → Require 1 approval
Merge to main → Auto-deploy production
```

Mobile builds:

```
Push tag v*.*.* → EAS Build (iOS + Android) → EAS Submit to stores
Hotfix → EAS Update (OTA) for JS-only changes
```

### 12.3 Infrastructure

| Service | Provider | Tier |
|---|---|---|
| Web hosting | Vercel | Pro |
| Database | Supabase | Pro (dedicated Postgres) |
| Cache | Upstash Redis | Pay-as-you-go |
| File storage | Supabase Storage | Included with Pro |
| Mobile builds | Expo EAS | Production |
| DNS | Cloudflare | Free |
| Email (transactional) | Resend | Starter |
| Error tracking | Sentry | Team |
| Analytics | PostHog | Free (self-host or cloud) |

---

## 13. Testing Strategy

### 13.1 Test Pyramid

| Level | Tool | What |
|---|---|---|
| Unit | Vitest | Business logic: fee calculation, promo validation, order state transitions |
| Integration | Vitest + Supertest | API endpoints with test database |
| Component | React Testing Library | Shared UI components (Button, Card, Badge states) |
| E2E | Playwright (web), Detox (mobile) | Critical flows: place order, track delivery, manage menu |

### 13.2 Critical Test Paths

1. Customer: Browse → Add to cart → Checkout → Pay → Track → Rate
2. Driver: Go online → Accept order → Navigate → Pickup → Deliver
3. Restaurant: Receive order → Confirm → Prepare → Ready
4. Admin: View dashboard → Manage promo → View analytics

---

## 14. Security Considerations

- All API endpoints require valid JWT (except webhooks which verify signatures)
- Rate limiting: 100 req/min per user, 20 req/min for auth endpoints
- Input validation via Zod schemas on every endpoint
- SQL injection prevention via Drizzle ORM parameterised queries
- XSS prevention via React's built-in escaping + CSP headers
- CORS restricted to known origins
- File uploads: image-only, max 5MB, virus scan via Supabase
- PII encryption at rest (Supabase manages)
- Payment data never touches our server (redirect-based flows)
- Driver location data retained for 90 days, then purged
- POPIA compliance (SA data protection law): privacy policy, data deletion endpoint

---

## 15. Performance Targets

| Metric | Target |
|---|---|
| API response (p95) | < 200ms |
| Home feed load (cold) | < 1.5s |
| Order placement | < 3s end-to-end |
| Driver location update | < 100ms server-side |
| Tracking map update | < 500ms perceived |
| Restaurant portal order bell | < 2s from placement |
| Image load (menu items) | < 500ms (CDN-cached) |
| App binary size | < 30MB (iOS), < 20MB (Android) |

---

## 16. Phase Rollout

### Phase 1 — MVP (Target: 8 weeks)

- Customer app: full ordering flow (S-001 through S-042)
- Restaurant portal: order queue + menu management
- Admin dashboard: orders + basic analytics
- Card payments only (Paystack)
- No driver app — manual dispatch via admin + WhatsApp
- No scheduled orders
- No driver chat

### Phase 2 — Driver & Payments (Target: +4 weeks)

- Driver app: full flow (D-001 through D-060)
- Live driver tracking on customer app
- Add SnapScan + Ozow + Cash
- Scheduled orders
- Push notifications

### Phase 3 — Polish & Scale (Target: +4 weeks)

- Driver chat
- Order ratings + tips
- Promo system (admin create, customer redeem)
- Analytics dashboard (full)
- Performance optimisation
- App Store + Play Store submission

---

*UmuziKos Technical Codex V2.0 — Last updated May 2026*
*Design System: umuzikos-design-system-v2.md*
*Customer App Screens: umuzikos-final-build-plan.md*
