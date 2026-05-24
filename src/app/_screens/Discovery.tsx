"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, RESTAURANTS, type Restaurant } from "../_components/data";
import { useApp } from "../_components/state";
import { AppBar, HeartIcon, ImgSlot, StarIcon } from "../_components/ui";

/* Restaurant card used across Home / Browse / Category / Favourites */
function RestaurantTile({ r }: { r: Restaurant }) {
  const { navigate, favourites, toggleFavourite } = useApp();
  const fav = favourites.includes(r.slug);
  return (
    <button className="r-tile" onClick={() => navigate(`/r/${r.slug}`)} aria-label={`Open ${r.name}`}>
      <div className="media">
        <ImgSlot label={r.name} radius={0} />
        {r.promo && <span className="promo">{r.promo}</span>}
        <button
          className={`fav${fav ? " is-on" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavourite(r.slug); }}
          aria-label={fav ? "Remove favourite" : "Add favourite"}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>
      <div className="body">
        <div className="head">
          <div className="name">{r.name}</div>
          <div className="rating"><StarIcon />{r.rating.toFixed(1)}</div>
        </div>
        <div className="sub">{r.sub} · {r.reviews.toLocaleString()} reviews</div>
        <div className="meta">
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9} /><path d="M12 7v5l3 2" /></svg>
          {r.prepTime}
          <span className="sep">·</span>
          <span>From R 15 delivery</span>
        </div>
      </div>
    </button>
  );
}

/* ───────────────────────── S-010 Home Feed ───────────────────────── */

export function HomeScreen() {
  const { navigate, addresses, selectedAddressId, user } = useApp();
  const addr = addresses.find((a) => a.id === selectedAddressId);
  return (
    <div className="screen">
      <div className="app-bar">
        <button className="addr-pill" onClick={() => navigate("/addresses")}>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx={12} cy={10} r={3} /></svg>
          <span>
            <span className="label">Deliver to</span>
            <br />
            <span className="where">{addr?.label} · {addr?.suburb}</span>
          </span>
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div style={{ flex: 1 }} />
        <button className="ab-icon" aria-label="Notifications" onClick={() => navigate("/notifications")}>
          <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3V8z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
        </button>
      </div>

      <div className="screen-body">
        <div className="screen-pad" style={{ paddingTop: 8 }}>
          <div style={{ marginBottom: 4, fontSize: 13, color: "var(--md-sys-color-on-surface-variant)" }}>
            Hey {user?.name.split(" ")[0]} —
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.5px", margin: "0 0 16px" }}>
            What&apos;ll it be tonight?
          </h1>

          {/* Promo banner */}
          <div className="promo-banner" onClick={() => navigate("/promotions")} role="button">
            <div className="eyebrow">First-order offer</div>
            <h2>R 0 delivery on your first kota.</h2>
            <p>Auto-applies at checkout. Within the 8 km zone.</p>
            <button className="btn btn-sm btn-primary pb-cta">View promotions</button>
          </div>

          {/* Categories grid */}
          <div className="section-row" style={{ marginTop: 24 }}>
            <h3>Categories</h3>
            <button className="more" onClick={() => navigate("/browse")}>See all →</button>
          </div>
          <div className="cat-grid">
            {CATEGORIES.slice(0, 8).map((c) => (
              <button key={c.name} className="cat-cell" onClick={() => navigate(`/category/${encodeURIComponent(c.name)}`)}>
                <div className="tile">
                  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <div className="lbl">{c.name}</div>
              </button>
            ))}
          </div>

          {/* All kitchens */}
          <div className="section-row" style={{ marginTop: 24 }}>
            <h3>The seven kitchens</h3>
            <button className="more" onClick={() => navigate("/browse")}>Browse all →</button>
          </div>
          <div className="r-list">
            {RESTAURANTS.map((r) => <RestaurantTile key={r.slug} r={r} />)}
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-011 Browse ───────────────────────── */

export function BrowseScreen() {
  const { navigate } = useApp();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"rating" | "time" | "name">("rating");
  const [cuisine, setCuisine] = useState<string>("All");

  const list = useMemo(() => {
    let l = RESTAURANTS.slice();
    if (cuisine !== "All") l = l.filter((r) => r.cuisines.includes(cuisine));
    if (query.trim()) {
      const q = query.toLowerCase();
      l = l.filter((r) => r.name.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (sort === "rating") l.sort((a, b) => b.rating - a.rating);
    else if (sort === "name") l.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "time") l.sort((a, b) => parseInt(a.prepTime) - parseInt(b.prepTime));
    return l;
  }, [query, sort, cuisine]);

  return (
    <div className="screen">
      <div className="app-bar"><div className="ab-title left">Browse</div></div>
      <div className="screen-body">
        <div className="screen-pad" style={{ paddingTop: 4 }}>
          <div className="search-row">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              <circle cx={11} cy={11} r={7} /><path d="M21 21l-4.5-4.5" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kitchens or dishes" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear">×</button>}
          </div>

          <div style={{ marginTop: 12 }}>
            <div className="cuisine-row">
              {CATEGORIES.map((c) => (
                <button key={c.name} className={`cuisine-chip${c.name === cuisine ? " is-active" : ""}`} onClick={() => setCuisine(c.name)}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-row">
            <button className={`sort-chip${sort === "rating" ? " is-active" : ""}`} onClick={() => setSort("rating")}>Top rated</button>
            <button className={`sort-chip${sort === "time" ? " is-active" : ""}`} onClick={() => setSort("time")}>Fastest</button>
            <button className={`sort-chip${sort === "name" ? " is-active" : ""}`} onClick={() => setSort("name")}>A–Z</button>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: "var(--md-sys-color-on-surface-variant)" }}>
            {list.length} kitchen{list.length === 1 ? "" : "s"}
          </div>

          <div className="r-list" style={{ marginTop: 8 }}>
            {list.map((r) => <RestaurantTile key={r.slug} r={r} />)}
          </div>

          {list.length === 0 && (
            <div style={{ textAlign: "center", padding: 32, color: "var(--md-sys-color-on-surface-variant)" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Nothing matches that.</div>
              <button className="btn btn-md btn-outlined" onClick={() => { setQuery(""); setCuisine("All"); }}>Reset filters</button>
            </div>
          )}

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-012 Category View ───────────────────────── */

export function CategoryScreen({ cuisine }: { cuisine: string }) {
  const { navigate } = useApp();
  const list = cuisine === "All" ? RESTAURANTS : RESTAURANTS.filter((r) => r.cuisines.includes(cuisine));
  return (
    <div className="screen">
      <AppBar title={cuisine} onBack={() => navigate("/home")} />
      <div className="screen-body">
        <div className="screen-pad">
          <p className="muted" style={{ margin: "0 0 16px", fontSize: 13 }}>
            {list.length} kitchen{list.length === 1 ? "" : "s"} serving <b>{cuisine}</b> at the Lake Umuzi Waterfront.
          </p>

          {list.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "var(--md-sys-color-on-surface-variant)" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>No kitchens match &ldquo;{cuisine}&rdquo;.</div>
              <button className="btn btn-md btn-outlined" onClick={() => navigate("/browse")}>Browse all</button>
            </div>
          ) : (
            <div className="r-list">
              {list.map((r) => <RestaurantTile key={r.slug} r={r} />)}
            </div>
          )}

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-013 Promotions ───────────────────────── */

const PROMOS = [
  { code: "FIRST15", title: "20% off your first order", body: "Auto-applies at checkout. Once per customer.", expires: "Sunday" },
  { code: "BIKERR0", title: "R 0 delivery, any kitchen", body: "Inside the 8 km zone. Min order R 80.", expires: "31 May" },
  { code: "WORS50", title: "R 50 off Bosveld Lapa", body: "Min order R 250. Halaal kitchen only.", expires: "This week" },
  { code: "MOOWINE", title: "Free dessert at Moo Moo", body: "Order any main + wine, get crème brûlée free.", expires: "Tue–Sun, 17:00 onwards" },
];

export function PromotionsScreen() {
  const { navigate, toast } = useApp();
  return (
    <div className="screen">
      <AppBar title="Promotions" onBack={() => navigate("/home")} />
      <div className="screen-body">
        <div className="screen-pad">
          {PROMOS.map((p) => (
            <div key={p.code} className="cart-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="badge" style={{ background: "var(--md-sys-color-primary-container)", color: "var(--md-sys-color-on-primary-container)", border: 0 }}>
                  {p.code}
                </span>
                <span style={{ fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>Expires {p.expires}</span>
              </div>
              <div className="restaurant-name">{p.title}</div>
              <div style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>{p.body}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-sm btn-outlined" style={{ flex: 1 }} onClick={() => { navigator.clipboard?.writeText(p.code); toast(`Code copied: ${p.code}`); }}>Copy code</button>
                <button className="btn btn-sm btn-primary" style={{ flex: 1 }} onClick={() => navigate("/browse")}>Browse</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: 16, background: "var(--md-sys-color-surface-container)", borderRadius: 12, fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", lineHeight: 1.5 }}>
            <b style={{ color: "var(--md-sys-color-on-surface)" }}>Got a code?</b> Enter it at checkout, after you pick your payment method.
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}
