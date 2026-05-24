"use client";

import { useEffect, useState } from "react";
import type { Restaurant } from "./data";

/* ───────── Helpers ───────── */

export function formatRands(cents: number): string {
  return `R ${(cents / 100).toFixed(2)}`;
}

/* ───────── Mode toggle ───────── */

export function ModeToggle({
  mode,
  onToggle,
}: {
  mode: "design" | "wireframe";
  onToggle: () => void;
}) {
  return (
    <button className="mode-toggle" onClick={onToggle} aria-label="Toggle wireframe / design mode">
      <span className="dot" />
      <span>View: {mode === "wireframe" ? "Wireframe" : "Design"}</span>
      <span aria-hidden="true">⇄</span>
    </button>
  );
}

/* ───────── Body scroll lock on overlay open ───────── */

function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/* ───────── Generic modal ───────── */

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  wide,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  wide?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useBodyLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="scrim" onClick={onClose}>
      <div
        className={`modal${wide ? " wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ───────── Restaurant detail modal ───────── */

export function RestaurantModal({
  restaurant,
  onClose,
  onAddToCart,
}: {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (item: { restaurant: string; name: string; price: number }) => void;
}) {
  return (
    <Modal
      open={Boolean(restaurant)}
      onClose={onClose}
      title={restaurant?.name || ""}
      subtitle={
        restaurant
          ? `${restaurant.sub} · ★ ${restaurant.rating.toFixed(1)} (${restaurant.reviews.toLocaleString()}) · ${restaurant.prepTime} · ${restaurant.hours}`
          : undefined
      }
      wide
    >
      {restaurant && (
        <>
          <p style={{ marginTop: 0, marginBottom: 20, color: "var(--md-sys-color-on-surface-variant)" }}>
            {restaurant.about}
          </p>
          <div className="menu-list">
            {restaurant.menu.map((item) => (
              <div key={item.name} className="menu-item">
                <div className="name">{item.name}</div>
                <div className="desc">{item.desc}</div>
                <div className="price">{formatRands(item.price)}</div>
                <div className="add">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      onAddToCart({ restaurant: restaurant.name, name: item.name, price: item.price })
                    }
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}

/* ───────── Auth modal ───────── */

export function AuthModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}) {
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [stage, setStage] = useState<"input" | "otp">("input");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!open) {
      setStage("input");
      setValue("");
      setTab("phone");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Sign in to UmuziKos" subtitle="Per Codex §3 — phone OTP or email magic link via Clerk">
      <div className="tabs" role="tablist">
        <button className={`tab${tab === "phone" ? " is-active" : ""}`} onClick={() => setTab("phone")}>Phone</button>
        <button className={`tab${tab === "email" ? " is-active" : ""}`} onClick={() => setTab("email")}>Email</button>
      </div>

      {stage === "input" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStage("otp");
          }}
        >
          <div className="field">
            <label>{tab === "phone" ? "South African mobile" : "Email address"}</label>
            <input
              type={tab === "phone" ? "tel" : "email"}
              placeholder={tab === "phone" ? "+27 82 123 4567" : "you@example.co.za"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-lg btn-primary" style={{ marginTop: 16, width: "100%" }}>
            {tab === "phone" ? "Send OTP" : "Send magic link"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess(tab === "phone" ? "Signed in — welcome" : "Magic-link sign-in confirmed");
            onClose();
          }}
        >
          <div className="field">
            <label>Verification code</label>
            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} placeholder="123456" autoFocus />
          </div>
          <p style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginTop: 12 }}>
            Sent to {value || "your device"}. Wireframe: any 6 digits work.
          </p>
          <button type="submit" className="btn btn-lg btn-primary" style={{ marginTop: 16, width: "100%" }}>
            Verify &amp; sign in
          </button>
          <button type="button" className="btn btn-text" style={{ marginTop: 8, width: "100%" }} onClick={() => setStage("input")}>
            ← Use a different {tab === "phone" ? "number" : "email"}
          </button>
        </form>
      )}
    </Modal>
  );
}

/* ───────── App download modal ───────── */

export function AppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Get the UmuziKos app" subtitle="iOS + Android · React Native (Expo)">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div className="qr-box"><span>QR · APP</span></div>
        <p style={{ margin: 0, textAlign: "center", color: "var(--md-sys-color-on-surface-variant)", fontSize: 14 }}>
          Scan with your phone camera, or grab it from the stores.
        </p>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <a href="#" className="store-btn" style={{ flex: 1 }} aria-label="Download on the App Store">
            <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.43 2.226-1.34 3.038-.89.81-1.95 1.32-3.08 1.246-.13-1.1.42-2.27 1.27-3.05.89-.81 2.13-1.4 3.15-1.234zM21 17.34c-.49 1.15-.73 1.66-1.36 2.68-.88 1.42-2.12 3.19-3.66 3.21-1.37.01-1.72-.89-3.58-.88-1.86.01-2.25.9-3.62.88-1.54-.02-2.71-1.62-3.59-3.04C2.7 16.79 2.45 11.41 4.94 8.57c1.16-1.32 2.83-2.16 4.59-2.19 1.4-.02 2.72.94 3.58.94.86 0 2.47-1.16 4.16-.99.71.03 2.7.29 3.98 2.17-3.5 1.92-2.93 6.88.75 8.84z" /></svg>
            <div>
              <div className="s1">Download on the</div>
              <div className="s2">App Store</div>
            </div>
          </a>
          <a href="#" className="store-btn" style={{ flex: 1 }} aria-label="Get it on Google Play">
            <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.84c-.36.36-.6.92-.6 1.66v17c0 .74.24 1.3.6 1.66l9.55-10.16L3.6 1.84zM14.32 11.85l2.66-2.83-11.55-6.6c-.36-.21-.69-.27-.97-.18l9.86 9.61zm0 .3l-9.86 9.6c.28.1.61.04.97-.17l11.55-6.6-2.66-2.83zm6.32-3.83l-2.94-1.68-2.91 3.08 2.91 3.09 2.94-1.68c.99-.57.99-1.49 0-2.06z" /></svg>
            <div>
              <div className="s1">Get it on</div>
              <div className="s2">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </Modal>
  );
}

/* ───────── Address-check modal ───────── */

export function AddressModal({
  open,
  initial,
  onClose,
  onResult,
}: {
  open: boolean;
  initial: string;
  onClose: () => void;
  onResult: (msg: string) => void;
}) {
  const [addr, setAddr] = useState(initial);
  const [result, setResult] = useState<null | { inZone: boolean; distance: string; note: string }>(null);

  useEffect(() => {
    if (open) {
      setAddr(initial);
      setResult(null);
    }
  }, [open, initial]);

  const check = () => {
    const a = addr.trim().toLowerCase();
    if (!a) return;
    // Wireframe heuristic: tag a few known suburb names; everything else within Secunda gets "in zone".
    const out = /(evander|kinross|trichard\s*near|outer\s*embalenhle)/i.test(a);
    if (out) {
      setResult({ inZone: false, distance: ">8 km", note: "Outside the 8 km delivery zone — we can't deliver here yet." });
    } else {
      // pretend a sensible distance
      const km = (2 + Math.random() * 5).toFixed(1);
      setResult({ inZone: true, distance: `~${km} km`, note: `${km} km from the waterfront — you're in the zone.` });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Check your address" subtitle="UmuziKos delivers within 8 km of the Lake Umuzi Waterfront">
      <div className="field">
        <label>Address or suburb</label>
        <input
          type="text"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="123 Main Road, Secunda"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              check();
            }
          }}
        />
      </div>
      <button className="btn btn-md btn-primary" style={{ marginTop: 12, width: "100%" }} onClick={check}>
        Check delivery zone
      </button>

      {result && (
        <div className="zone-result">
          <div className="ico">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {result.inZone ? <path d="M5 13l4 4L19 7" /> : <path d="M6 6l12 12M6 18L18 6" />}
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>
              {result.inZone ? "In zone" : "Out of zone"} · {result.distance}
            </div>
            <div style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)" }}>{result.note}</div>
          </div>
        </div>
      )}

      {result?.inZone && (
        <button
          className="btn btn-md btn-outlined"
          style={{ marginTop: 16, width: "100%" }}
          onClick={() => {
            onResult("Address saved — browse kitchens below.");
            onClose();
          }}
        >
          Save address &amp; browse kitchens →
        </button>
      )}
    </Modal>
  );
}

/* ───────── Cart drawer ───────── */

export type CartItem = { restaurant: string; name: string; price: number; qty: number };

export function CartDrawer({
  open,
  onClose,
  cart,
  onIncrement,
  onDecrement,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onIncrement: (i: number) => void;
  onDecrement: (i: number) => void;
  onCheckout: () => void;
}) {
  useBodyLock(open);
  if (!open) return null;

  const subtotalC = cart.reduce((n, it) => n + it.price * it.qty, 0);
  const deliveryC = subtotalC === 0 ? 0 : 1500;
  const serviceC = subtotalC === 0 ? 0 : Math.max(500, Math.min(Math.round(subtotalC * 0.05), 2500));
  const totalC = subtotalC + deliveryC + serviceC;

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" aria-label="Your cart">
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button className="modal-close" aria-label="Close cart" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div style={{ marginBottom: 12 }}>Cart is empty.</div>
              <div style={{ fontSize: 13 }}>Open a kitchen below and add an item.</div>
            </div>
          ) : (
            cart.map((it, i) => (
              <div key={`${it.restaurant}:${it.name}:${i}`} className="cart-line">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{it.name}</div>
                  <div style={{ fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", marginTop: 2 }}>
                    {it.restaurant}
                  </div>
                </div>
                <div className="qty-pill" aria-label={`Quantity ${it.qty}`}>
                  <button onClick={() => onDecrement(i)} aria-label="Decrease">−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => onIncrement(i)} aria-label="Increase">+</button>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, minWidth: 70, textAlign: "right" }}>
                  {formatRands(it.price * it.qty)}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer-foot">
          {cart.length > 0 && (
            <>
              <div className="totals-row"><span>Subtotal</span><span className="r">{formatRands(subtotalC)}</span></div>
              <div className="totals-row"><span>Delivery (base, &lt;3 km)</span><span className="r">{formatRands(deliveryC)}</span></div>
              <div className="totals-row"><span>Service fee (5%)</span><span className="r">{formatRands(serviceC)}</span></div>
              <div className="totals-row total"><span>Total</span><span className="r">{formatRands(totalC)}</span></div>
            </>
          )}
          <button
            className="btn btn-lg btn-primary"
            style={{ marginTop: 14, width: "100%" }}
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            {cart.length === 0 ? "Add something first" : "Checkout"}
          </button>
        </div>
      </aside>
    </>
  );
}

/* ───────── Toaster ───────── */

export type Toast = { id: number; msg: string };

export function useToaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = (msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  return { toasts, toast };
}

export function Toaster({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="toaster" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.msg}</div>
      ))}
    </div>
  );
}
