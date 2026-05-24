"use client";

import { useEffect, useState } from "react";
import { useApp } from "../_components/state";
import { AppBar } from "../_components/ui";

/* ───────────────────────── S-060 Notifications ───────────────────────── */

export function NotificationsScreen() {
  const { notifications, markNotificationsRead, navigate } = useApp();
  useEffect(() => {
    const t = window.setTimeout(markNotificationsRead, 600);
    return () => window.clearTimeout(t);
  }, [markNotificationsRead]);
  return (
    <div className="screen">
      <AppBar title="Notifications" onBack={() => navigate("/home")} />
      <div className="screen-body">
        <div className="screen-pad">
          {notifications.map((n) => (
            <div key={n.id} className={`notif-row${n.read ? "" : " unread"}`}>
              <div className="ico">
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3V8z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
              </div>
              <div className="info">
                <div className="title">{n.title}</div>
                <div className="body">{n.body}</div>
                <div className="ts">{n.ts}</div>
              </div>
            </div>
          ))}
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-061 Help Centre ───────────────────────── */

const HELP_CATEGORIES = [
  { key: "ordering", title: "Ordering & delivery", desc: "Placing, scheduling, tracking, cancellation" },
  { key: "payments", title: "Payments & refunds", desc: "Card, SnapScan, Ozow, cash, refunds" },
  { key: "account", title: "Account & profile", desc: "Phone, email, password, addresses" },
  { key: "kitchen", title: "Kitchens & menu", desc: "Allergens, dietary tags, item availability" },
  { key: "rider", title: "Rider & route", desc: "Live tracking, chat, location issues" },
  { key: "popia", title: "Privacy & data", desc: "POPIA, data deletion, data export" },
];

const HELP_FAQS = [
  {
    q: "How do I cancel an order?",
    a: "You can cancel any order before the kitchen marks it Preparing — find the order in your Orders tab, tap it, and tap Cancel. After preparing starts you'll need to contact ops via WhatsApp.",
  },
  {
    q: "What happens if my food is late?",
    a: "Our delivery estimate guarantee is 5 minutes. If we're more than 5 minutes late on the upper bound of your ETA, the delivery is on us — no need to ask, it's auto-credited.",
  },
  {
    q: "Can I pay cash?",
    a: "Yes — choose Cash on Delivery at checkout. The rider will collect at the door. Please have exact change where possible.",
  },
  {
    q: "I have a dietary requirement.",
    a: "Each menu item carries dietary tags (Halaal, Vegetarian, Spicy) and allergen tags (Gluten, Dairy, Nuts). You can also pin custom notes to the kitchen at the item screen.",
  },
];

export function HelpScreen() {
  const { navigate, toast } = useApp();
  const [openId, setOpenId] = useState<number | null>(0);
  return (
    <div className="screen">
      <AppBar title="Help centre" onBack={() => navigate("/profile")} />
      <div className="screen-body">
        <div className="screen-pad">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)" }}>Categories</h3>
          {HELP_CATEGORIES.map((c) => (
            <button key={c.key} className="help-cat" onClick={() => toast(`${c.title} (prototype)`)}>
              <div className="ico">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9} /><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 17h.01" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</div>
                <div className="muted" style={{ fontSize: 12 }}>{c.desc}</div>
              </div>
            </button>
          ))}

          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, margin: "24px 0 8px", textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)" }}>Popular questions</h3>
          {HELP_FAQS.map((f, i) => (
            <div key={i} className={`faq-item${openId === i ? " open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenId(openId === i ? null : i)} aria-expanded={openId === i}>
                <span style={{ fontSize: 15 }}>{f.q}</span>
                <span className="pm">
                  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className="faq-a"><div><p style={{ fontSize: 13 }}>{f.a}</p></div></div>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: 16, background: "var(--md-sys-color-on-surface)", color: "#FFFFFF", borderRadius: 12 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Still stuck?</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "4px 0 12px" }}>Our ops team replies in under 5 minutes during waterfront hours.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-md btn-filled" style={{ background: "#FFFFFF", color: "var(--md-sys-color-on-surface)", flex: 1 }} onClick={() => toast("WhatsApp chat opened (prototype)")}>WhatsApp</button>
              <button className="btn btn-md btn-outlined" style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)", flex: 1 }} onClick={() => toast("Calling ops (prototype)")}>Call</button>
            </div>
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Screens Index (demo aid) ───────────────────────── */

const SCREENS = [
  {
    suite: "Onboarding",
    items: [
      { code: "S-001", name: "Splash", path: "/splash" },
      { code: "S-002", name: "Welcome · Step 1", path: "/welcome/1" },
      { code: "S-003", name: "Welcome · Step 2", path: "/welcome/2" },
      { code: "S-004", name: "Welcome · Step 3", path: "/welcome/3" },
      { code: "S-005", name: "Login", path: "/login" },
      { code: "S-006", name: "Register", path: "/register" },
      { code: "S-007", name: "OTP verification", path: "/otp" },
    ],
  },
  {
    suite: "Home & Discovery",
    items: [
      { code: "S-010", name: "Home feed", path: "/home" },
      { code: "S-011", name: "Browse / search", path: "/browse" },
      { code: "S-012", name: "Category view", path: "/category/Grill" },
      { code: "S-013", name: "Promotions", path: "/promotions" },
    ],
  },
  {
    suite: "Restaurant",
    items: [
      { code: "S-020", name: "Restaurant detail", path: "/r/boesies" },
      { code: "S-021", name: "Menu item detail", path: "/r/boesies/item/250g-rump-steak-chips" },
      { code: "S-022", name: "Reviews", path: "/r/moo-moo/reviews" },
    ],
  },
  {
    suite: "Cart & Checkout",
    items: [
      { code: "S-030", name: "Cart", path: "/cart" },
      { code: "S-031", name: "Checkout", path: "/checkout" },
      { code: "S-032", name: "Payment method", path: "/payment" },
      { code: "S-033", name: "Order confirmed", path: "/order/UMK-DEMO-0001/confirmed" },
      { code: "S-034", name: "Pickup confirmation", path: "/order/UMK-DEMO-0001/pickup" },
      { code: "S-035", name: "Schedule order", path: "/schedule" },
    ],
  },
  {
    suite: "Tracking",
    items: [
      { code: "S-040", name: "Live order tracking", path: "/order/UMK-20260520-0042/track" },
      { code: "S-041", name: "Driver chat", path: "/order/UMK-20260520-0042/chat" },
      { code: "S-042", name: "Rate order", path: "/order/UMK-20260520-0042/rate" },
    ],
  },
  {
    suite: "Profile & Account",
    items: [
      { code: "S-050", name: "Profile", path: "/profile" },
      { code: "S-051", name: "Order history", path: "/orders" },
      { code: "S-052", name: "Order detail", path: "/order/UMK-20260520-0042" },
      { code: "S-053", name: "Saved addresses", path: "/addresses" },
      { code: "S-054", name: "Payment methods", path: "/payments" },
      { code: "S-055", name: "Settings", path: "/settings" },
      { code: "S-056", name: "My favourites", path: "/favourites" },
    ],
  },
  {
    suite: "Support",
    items: [
      { code: "S-060", name: "Notifications", path: "/notifications" },
      { code: "S-061", name: "Help centre", path: "/help" },
    ],
  },
];

export function ScreensIndex() {
  const { navigate } = useApp();
  return (
    <div className="screen">
      <AppBar title="All 32 screens" onBack={() => navigate("/home")} />
      <div className="screen-body">
        <div className="screen-pad">
          <p className="muted" style={{ fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>
            Every screen in the customer app, per Codex §8.1. Tap any to jump to it. The URL also works directly — share <code style={{ background: "var(--md-sys-color-surface-container)", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>#/r/boesies</code> with a client and they&apos;ll land on that screen.
          </p>

          {SCREENS.map((s) => (
            <div key={s.suite} className="suite-block">
              <h3>{s.suite}</h3>
              {s.items.map((it) => (
                <button key={it.code} className="screen-card" onClick={() => navigate(it.path)}>
                  <span className="code">{it.code}</span>
                  <span className="name">{it.name}</span>
                  <div className="desc"><code style={{ fontSize: 11 }}>#{it.path}</code></div>
                </button>
              ))}
            </div>
          ))}
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}
