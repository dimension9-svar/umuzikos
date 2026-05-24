"use client";

import { useMemo, useState } from "react";
import { RESTAURANTS, type MenuItem } from "../_components/data";
import { fmt, useApp } from "../_components/state";
import { AppBar, HeartIcon, ImgSlot, StarIcon } from "../_components/ui";

const slugifyItem = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ───────────────────────── S-020 Restaurant Detail ───────────────────────── */

export function RestaurantScreen({ slug }: { slug: string }) {
  const r = RESTAURANTS.find((x) => x.slug === slug);
  const { navigate, favourites, toggleFavourite, cart, goBack } = useApp();
  if (!r) {
    return (
      <div className="screen">
        <AppBar title="Not found" />
        <div className="screen-body"><div className="screen-pad">No kitchen with slug &ldquo;{slug}&rdquo;.</div></div>
      </div>
    );
  }
  const fav = favourites.includes(r.slug);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cart.reduce((n, l) => n + (l.item.price + (l.optionsExtra ?? 0)) * l.qty, 0);

  return (
    <div className="screen">
      <div className="screen-body">
        {/* Hero with floating app bar */}
        <div className="rd-hero">
          <ImgSlot label={`${r.name} hero photo`} radius={0} />
          <div className="scrim" />
          <div className="float-app-bar">
            <button className="ab-icon" onClick={goBack} aria-label="Back">
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="ab-icon" aria-label="Share">
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
              </button>
              <button className={`ab-icon${fav ? "" : ""}`} onClick={() => toggleFavourite(r.slug)} aria-label="Favourite" style={fav ? { color: "var(--md-sys-color-primary)" } : undefined}>
                <HeartIcon filled={fav} />
              </button>
            </div>
          </div>
        </div>

        {/* Detail card */}
        <div className="rd-card">
          <h1>{r.name}</h1>
          <div className="meta-row">
            <span><StarIcon /> <b>{r.rating.toFixed(1)}</b> ({r.reviews.toLocaleString()})</span>
            <span>·</span>
            <span>{r.sub}</span>
            <span>·</span>
            <button onClick={() => navigate(`/r/${r.slug}/reviews`)} style={{ color: "var(--md-sys-color-primary)", fontWeight: 700 }}>See reviews →</button>
          </div>
          <p className="about">{r.about}</p>
          <div className="quick-stats">
            <div className="qs">
              <div className="n">{r.prepTime}</div>
              <div className="muted">Prep time</div>
            </div>
            <div className="qs">
              <div className="n">{fmt(r.baseDeliveryFee)}</div>
              <div className="muted">From, delivery</div>
            </div>
            <div className="qs">
              <div className="n">{r.hours.split(" ")[0]}</div>
              <div className="muted">{r.hours.split(" ").slice(1).join(" ") || "Today"}</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div style={{ marginTop: 24 }}>
          <div className="menu-section-title">Menu</div>
          {r.menu.map((m) => (
            <button key={m.name} className="menu-item-row" onClick={() => navigate(`/r/${r.slug}/item/${slugifyItem(m.name)}`)}>
              <div className="info">
                <div className="name">{m.name}</div>
                <div className="desc">{m.desc}</div>
                <div className="price">{fmt(m.price)}</div>
              </div>
              <div className="thumb">
                <ImgSlot label={m.name} radius={8} />
                <span className="add">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Spacer so floating cart doesn't cover content */}
        <div style={{ height: cartCount > 0 ? 96 : 24 }} />
      </div>

      {cartCount > 0 && (
        <button className="float-cart" onClick={() => navigate("/cart")}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 999, background: "var(--md-sys-color-primary)", color: "var(--md-sys-color-on-primary)", fontWeight: 800, fontSize: 13 }}>
              {cartCount}
            </span>
            <span>
              <div className="l1">View cart</div>
              <div className="l2">{fmt(cartTotal)} · {cart[0]?.restaurantName}</div>
            </span>
          </div>
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}
    </div>
  );
}

/* ───────────────────────── S-021 Menu Item Detail ───────────────────────── */

const MOCK_OPTIONS: { group: string; type: "radio" | "checkbox"; required: boolean; values: { name: string; mod: number; def?: boolean }[] }[] = [
  {
    group: "Choose your size",
    type: "radio",
    required: true,
    values: [
      { name: "Regular", mod: 0, def: true },
      { name: "Large", mod: 2500 },
    ],
  },
  {
    group: "Add extras",
    type: "checkbox",
    required: false,
    values: [
      { name: "Extra cheese", mod: 1500 },
      { name: "Side salad", mod: 2200 },
      { name: "Garlic bread", mod: 2800 },
    ],
  },
];

export function MenuItemScreen({ slug, itemSlug }: { slug: string; itemSlug: string }) {
  const r = RESTAURANTS.find((x) => x.slug === slug);
  const item: MenuItem | undefined = r?.menu.find((m) => slugifyItem(m.name) === itemSlug);
  const { addToCart, navigate, goBack } = useApp();

  const [qty, setQty] = useState(1);
  const [radioPick, setRadioPick] = useState<string>("Regular");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");

  const optionsExtra = useMemo(() => {
    let total = 0;
    const radioOpt = MOCK_OPTIONS[0].values.find((v) => v.name === radioPick);
    if (radioOpt) total += radioOpt.mod;
    MOCK_OPTIONS[1].values.forEach((v) => { if (checks[v.name]) total += v.mod; });
    return total;
  }, [radioPick, checks]);

  if (!r || !item) {
    return (
      <div className="screen">
        <AppBar title="Not found" />
        <div className="screen-body"><div className="screen-pad">Menu item not found.</div></div>
      </div>
    );
  }

  const totalCents = (item.price + optionsExtra) * qty;

  const selectedOptions: string[] = [];
  selectedOptions.push(`Size: ${radioPick}`);
  Object.entries(checks).forEach(([k, v]) => { if (v) selectedOptions.push(k); });

  return (
    <div className="screen">
      <div className="screen-body">
        <div className="rd-hero" style={{ aspectRatio: "1 / 1" }}>
          <ImgSlot label={item.name} radius={0} />
          <div className="scrim" />
          <div className="float-app-bar">
            <button className="ab-icon" onClick={goBack} aria-label="Back">
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            </button>
          </div>
        </div>

        <div className="screen-pad" style={{ paddingTop: 20 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.5px", margin: "0 0 4px" }}>{item.name}</h1>
          <p className="muted" style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</p>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{fmt(item.price)}</div>

          {MOCK_OPTIONS.map((g) => (
            <div key={g.group} style={{ marginTop: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{g.group}</h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: g.required ? "var(--md-sys-color-primary)" : "var(--md-sys-color-on-surface-variant)", textTransform: "uppercase", letterSpacing: 1 }}>
                  {g.required ? "Required" : "Optional"}
                </span>
              </div>
              {g.values.map((v) => {
                const isOn = g.type === "radio" ? radioPick === v.name : !!checks[v.name];
                return (
                  <label key={v.name} className={`opt-row${isOn ? " is-selected" : ""}`} style={{ cursor: "pointer", marginTop: 8 }}>
                    <div className="head">
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{v.name}</div>
                        {v.mod > 0 && <div className="meta">+ {fmt(v.mod)}</div>}
                      </div>
                    </div>
                    <input
                      type={g.type}
                      name={g.group}
                      checked={isOn}
                      onChange={() => {
                        if (g.type === "radio") setRadioPick(v.name);
                        else setChecks((c) => ({ ...c, [v.name]: !c[v.name] }));
                      }}
                      style={{ position: "absolute", opacity: 0 }}
                    />
                    <span className="check">{isOn && <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}</span>
                  </label>
                );
              })}
            </div>
          ))}

          <div style={{ marginTop: 24 }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Notes for the kitchen</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 200))}
              placeholder="e.g. no chilli, extra crispy"
              style={{ width: "100%", height: 80, padding: 12, border: "1.5px solid var(--md-sys-color-outline)", borderRadius: 8, fontFamily: "inherit", fontSize: 14, outline: 0 }}
            />
            <div style={{ fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", textAlign: "right", marginTop: 4 }}>{notes.length}/200</div>
          </div>
        </div>

        <div style={{ height: 110 }} />
      </div>

      <div className="bottom-cta">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="qty" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 6px", height: 44, background: "var(--md-sys-color-surface-container)", borderRadius: 999, fontWeight: 800, fontSize: 16 }}>
            <button style={{ width: 32, height: 32, borderRadius: "50%" }} onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
            <span style={{ minWidth: 20, textAlign: "center" }}>{qty}</span>
            <button style={{ width: 32, height: 32, borderRadius: "50%" }} onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
          </div>
          <button
            className="btn btn-lg btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              addToCart(r, item, qty, { options: selectedOptions, optionsExtra, notes: notes || undefined });
              navigate(`/r/${r.slug}`);
            }}
          >
            Add to cart — {fmt(totalCents)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-022 Reviews ───────────────────────── */

const MOCK_REVIEWS = [
  { name: "Thandi M.", stars: 5, ts: "2 days ago", body: "Fillet was perfect medium-rare, sides were generous, rider was right on time." },
  { name: "Pieter v.d.B.", stars: 5, ts: "5 days ago", body: "Best kota in town. Period." },
  { name: "Aisha K.", stars: 4, ts: "1 week ago", body: "Good food, packaging held up, rider couldn't find the gate first try but called." },
  { name: "Lerato S.", stars: 5, ts: "2 weeks ago", body: "The koeksister is unreal. Will definitely reorder." },
  { name: "Johan P.", stars: 4, ts: "3 weeks ago", body: "Solid braai. A bit slow on a Saturday but worth the wait." },
];

export function ReviewsScreen({ slug }: { slug: string }) {
  const r = RESTAURANTS.find((x) => x.slug === slug);
  const breakdown = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 1 },
  ];
  return (
    <div className="screen">
      <AppBar title={r ? `${r.name} reviews` : "Reviews"} />
      <div className="screen-body">
        <div className="screen-pad">
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, letterSpacing: "-1.5px", lineHeight: 1 }}>{r?.rating.toFixed(1)}</div>
              <div style={{ display: "inline-flex", gap: 2, marginTop: 4, color: "var(--md-sys-color-primary)" }}>
                {[1,2,3,4,5].map((i) => <StarIcon key={i} />)}
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{r?.reviews.toLocaleString()} reviews</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              {breakdown.map((b) => (
                <div key={b.stars} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ width: 16 }}>{b.stars}</span>
                  <StarIcon size={12} />
                  <div style={{ flex: 1, height: 6, background: "var(--md-sys-color-surface-container)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${b.pct}%`, height: "100%", background: "var(--md-sys-color-on-surface)" }} />
                  </div>
                  <span style={{ width: 32, textAlign: "right", color: "var(--md-sys-color-on-surface-variant)" }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            {MOCK_REVIEWS.map((rv) => (
              <div key={rv.name} style={{ padding: "14px 0", borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{rv.name}</span>
                  <span style={{ fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{rv.ts}</span>
                </div>
                <div style={{ display: "flex", gap: 2, color: "var(--md-sys-color-primary)", marginBottom: 6 }}>
                  {[1,2,3,4,5].map((i) => <StarIcon key={i} size={12} on={i <= rv.stars} />)}
                </div>
                <div style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", lineHeight: 1.5 }}>{rv.body}</div>
              </div>
            ))}
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}
