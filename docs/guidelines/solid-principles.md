# Coding Standards — SOLID Design Principles

**Status:** Mandatory guideline. Read before implementing or refactoring any non-trivial code in this repo.
**Scope:** Applies to all TypeScript / React / Next.js code in UmuziKos. The principles are language-agnostic; the examples are written for this stack.

SOLID is a set of five object-oriented design principles that keep code **flexible, maintainable, and scalable**. They are not rigid laws — they are heuristics. Apply them to reduce coupling and isolate change; do **not** apply them dogmatically to the point of over-abstraction. The goal is code that is easy to change, not code that is maximally generic.

---

## S — Single Responsibility Principle (SRP)

> A module should have one, and only one, reason to change.

Each unit (component, hook, function, module) should own a single concern. When a piece of code mixes responsibilities — data fetching, business rules, formatting, and rendering — a change to any one of them risks breaking the others.

**In this codebase:**
- Keep **state/business logic** in hooks and `state.tsx`; keep **rendering** in `_screens/*.tsx`. A screen component should consume `useApp()`, not compute fees inline.
- Pure helpers (`fmt`, `calcFees`, `slugifyItem`) live apart from components and do exactly one thing.
- If a component is doing fetching **and** transforming **and** presenting, split it: a container/hook for data + a presentational component for markup.

**Smell:** a file or function that you describe with the word "and" ("renders the cart **and** recalculates totals **and** persists to localStorage").

```tsx
// ✗ Mixed responsibilities
function Cart() {
  const items = useCartItems();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0); // pricing logic
  const formatted = `R ${(total / 100).toFixed(2)}`;            // formatting logic
  return <div>{formatted}</div>;                                 // rendering
}

// ✓ One reason to change each
const total = calcCartTotal(items);        // pricing — changes when fee rules change
const label = fmt(total);                  // formatting — changes when currency display changes
function Cart() { const { items } = useApp(); return <div>{fmt(calcCartTotal(items))}</div>; }
```

---

## O — Open/Closed Principle (OCP)

> Software entities should be open for extension, but closed for modification.

You should be able to add new behaviour **without editing existing, tested code**. Achieve this with composition, configuration maps, and polymorphism rather than growing `if/else` / `switch` chains.

**In this codebase:**
- New payment methods, order statuses, or screen routes should slot into a **registry/config** (a map or array), not require editing a giant conditional. Example: the status-flow array and `parseRoute` map are extension points — add an entry, don't rewrite the switch.
- Prefer data-driven dispatch (`STATUS_FLOW`, `SCREENS` directory) over hard-coded branches.

```ts
// ✗ Closed for extension — every new method edits this function
function payLabel(m: string) {
  if (m === "visa") return "Visa";
  if (m === "snapscan") return "SnapScan";
  // ...edit here forever
}

// ✓ Open for extension — add a row, touch nothing else
const PAYMENT_METHODS = {
  visa: { label: "Visa", icon: VisaIcon },
  snapscan: { label: "SnapScan", icon: SnapScanIcon },
} as const;
const payLabel = (m: keyof typeof PAYMENT_METHODS) => PAYMENT_METHODS[m].label;
```

---

## L — Liskov Substitution Principle (LSP)

> Subtypes must be substitutable for their base types without breaking correctness.

Any implementation of an interface/type must honour the **contract** the consumer expects — same shape, same invariants, no surprising exceptions or weakened guarantees. A function that accepts a `PaymentProvider` must work with **every** `PaymentProvider`.

**In this codebase (TypeScript flavour):**
- When several things implement a shared `type`/`interface`, each must fully satisfy it — don't ship a variant that throws on a method the contract says is supported, or returns `null` where the type promises a value.
- Don't narrow behaviour in a way callers can't see. If `Repository.get()` is typed to return `Order`, a mock or alternate impl returning `undefined` violates LSP and will surface as a runtime bug.

```ts
interface OrderStore { get(id: string): Order; }      // contract: always returns an Order
// ✗ Violates LSP — caller relies on a guaranteed Order, gets a crash instead
class FlakyStore implements OrderStore { get() { throw new Error("not loaded"); } }
// ✓ Honour the contract, or change the contract to get(id): Order | undefined
```

---

## I — Interface Segregation Principle (ISP)

> No client should be forced to depend on methods it does not use.

Prefer many small, focused interfaces (and props) over one fat one. A component should receive **only** the props it needs.

**In this codebase:**
- Don't pass the whole `AppContext` / a giant object into a leaf component when it needs two fields. Pass `{ qty, onIncrement }`, not the entire cart API.
- Split bloated prop types. A `RestaurantTile` that takes a 20-field `Restaurant` but renders 4 fields should take a narrow `RestaurantSummary`.
- Keep hooks focused: `useCart()` shouldn't force consumers to also adopt notification or auth concerns.

```tsx
// ✗ Fat dependency — tile knows about the entire restaurant + handlers it never calls
function RestaurantTile({ restaurant, onOrder, onReview, onFavourite }: AllTheThings) {}

// ✓ Segregated — depends only on what it renders/uses
type RestaurantSummary = { name: string; rating: number; etaMins: number; heroSlug: string };
function RestaurantTile({ r, onOpen }: { r: RestaurantSummary; onOpen: () => void }) {}
```

---

## D — Dependency Inversion Principle (DIP)

> Depend on abstractions, not concretions. High-level modules must not depend on low-level details.

Business logic should not import a concrete client (Supabase, a specific HTTP lib, `localStorage`) directly. Depend on an **interface** and inject the implementation. This is what makes code testable and swappable.

**In this codebase:**
- Screens/hooks talk to a typed data-access abstraction; the concrete Supabase (or, in the prototype, in-memory/`localStorage`) implementation is injected — not imported inside the component. This is exactly why the click-through prototype can use seeded data and the real app can swap in Supabase per Codex §2 without rewriting screens.
- Inject collaborators (clock, storage, payment gateway) so they can be mocked in unit tests.

```ts
// ✗ High-level cart logic welded to a concrete store
import { supabase } from "./supabaseClient";
async function loadOrders() { return supabase.from("orders").select(); }

// ✓ Depend on an abstraction; inject the concretion
interface OrderRepository { list(): Promise<Order[]>; }
function makeOrdersHook(repo: OrderRepository) { /* uses repo.list() */ }
// real:  makeOrdersHook(supabaseOrderRepo)
// test:  makeOrdersHook(inMemoryOrderRepo)
```

---

## Applying SOLID here — quick checklist

Before committing a change, sanity-check:

- [ ] **SRP** — Does each new function/component/hook have one clear reason to change? Logic separated from rendering?
- [ ] **OCP** — Did I extend via a config/registry/composition, or did I edit a tested conditional to bolt on a case?
- [ ] **LSP** — Do all implementations of a shared type honour its full contract (no surprise throws/nulls)?
- [ ] **ISP** — Do components/hooks depend only on the props/fields they actually use?
- [ ] **DIP** — Does business logic depend on an abstraction (injected) rather than importing a concrete client (Supabase/storage/gateway)?

**Pragmatism clause:** Don't pre-abstract for change that won't come. Introduce the abstraction at the second concrete need, not the first. Over-engineering violates the spirit of SOLID as surely as under-engineering does. When in doubt, favour the simplest design that keeps responsibilities separated and dependencies pointing at abstractions.
