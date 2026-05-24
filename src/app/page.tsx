"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, COVERAGE_ZONES, FAQ, RESTAURANTS, WATERFRONT } from "./_components/data";
import {
  AddressModal,
  AppModal,
  AuthModal,
  CartDrawer,
  type CartItem,
  ModeToggle,
  RestaurantModal,
  Toaster,
  formatRands,
  useToaster,
} from "./_components/Overlays";
import type { Restaurant } from "./_components/data";

function Star() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" style={{ color: "var(--md-sys-color-primary)" }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ImgSlot({ label, radius = 12 }: { label: string; radius?: number }) {
  return <div className="img-slot" data-radius={String(radius)}><span>{label}</span></div>;
}

export default function Page() {
  /* ───────── UI state ───────── */
  const [mode, setMode] = useState<"design" | "wireframe">("wireframe");
  const [scrolled, setScrolled] = useState(false);

  const [favs, setFavs] = useState<boolean[]>(() => RESTAURANTS.map(() => false));
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroAddress, setHeroAddress] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const { toasts, toast } = useToaster();

  const rootRef = useRef<HTMLDivElement>(null);

  /* ───────── Effects ───────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    rootRef.current.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ───────── Derived ───────── */
  const visibleRestaurants = useMemo(() => {
    if (activeCategory === "All") return RESTAURANTS;
    return RESTAURANTS.filter((r) => r.cuisines.includes(activeCategory));
  }, [activeCategory]);

  const cartCount = cart.reduce((n, it) => n + it.qty, 0);

  /* ───────── Actions ───────── */
  const addToCart = (item: { restaurant: string; name: string; price: number }) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.restaurant === item.restaurant && it.name === item.name);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    toast(`Added "${item.name}" — ${formatRands(item.price)}`);
  };

  const incrementCart = (i: number) => {
    setCart((prev) => prev.map((it, idx) => (idx === i ? { ...it, qty: it.qty + 1 } : it)));
  };
  const decrementCart = (i: number) => {
    setCart((prev) =>
      prev
        .map((it, idx) => (idx === i ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0),
    );
  };

  const toggleFav = (i: number) => {
    setFavs((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    toast(favs[i] ? "Removed from favourites" : "Saved to favourites");
  };

  const scrollToRestaurants = () => {
    document.getElementById("restaurants")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroAddress.trim()) {
      setAddressOpen(true);
      return;
    }
    setAddressOpen(true);
  };

  const onCheckout = () => {
    toast(`Order placed (wireframe) — UMK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`);
    setCart([]);
    setCartOpen(false);
  };

  /* ───────── Render ───────── */
  return (
    <div ref={rootRef} className={mode === "wireframe" ? "wf" : ""}>
      {/* NAV */}
      <nav className={`nav${scrolled ? " is-scrolled" : ""}`} id="nav">
        <div className="shell nav-inner">
          <a href="#top" className="wordmark nav-brand" aria-label="UmuziKos home">
            Umuzikos<span className="dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#restaurants" className="nav-link">Kitchens</a>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#tracking" className="nav-link">Tracking</a>
            <a href="#coverage" className="nav-link">Zone</a>
            <a href="#faq" className="nav-link">Help</a>
          </div>
          <div className="nav-actions">
            <button className="nav-link" onClick={() => setAuthOpen(true)} style={{ marginRight: "var(--space-3)", fontFamily: "inherit", fontWeight: 600, fontSize: 14 }}>Sign in</button>
            {cartCount > 0 && (
              <button className="nav-cart" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}>
                Cart <span className="count">{cartCount}</span>
              </button>
            )}
            <button className="btn btn-md btn-primary" onClick={() => setAppOpen(true)}>Get the app</button>
            <button className="nav-burger" aria-label="Menu">
              <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="hero-eyebrow">
              <span className="badge badge-success"><span className="dot" />Lake Umuzi Waterfront, Secunda</span>
            </div>
            <h1>Tuck in.<br />We <span className="accent">deliver</span>.</h1>
            <p className="hero-sub">
              Seven kitchens at the Lake Umuzi Waterfront, delivered by motorbike anywhere
              in Secunda within 8&nbsp;kilometres. From braai to street food, on your door in 25&nbsp;minutes.
            </p>

            <form className="address-form" onSubmit={onHeroSubmit} aria-label="Check delivery to your address">
              <span className="pin" aria-hidden="true">
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter your address or suburb"
                autoComplete="off"
                value={heroAddress}
                onChange={(e) => setHeroAddress(e.target.value)}
              />
              <button type="submit" className="btn btn-md btn-primary">Check zone</button>
            </form>

            <div className="hero-trust">
              <div>
                <span className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </span>
                <span style={{ marginLeft: 8 }}><b>4.7</b> · across 7 kitchens</span>
              </div>
              <div><b>R0</b> delivery on your first order</div>
            </div>
          </div>

          <div className="hero-art" data-reveal>
            <ImgSlot label="Drop a hero food photo" radius={20} />

            <div className="hero-card-top" aria-hidden="true">
              <div className="av">SN</div>
              <div>
                <div className="t-body-md" style={{ fontWeight: 700 }}>Sipho is on the bike</div>
                <div className="t-caption muted">Arriving in 4 min</div>
              </div>
            </div>

            <div className="hero-card" aria-hidden="true">
              <div className="icon-wrap">
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="l1">Order delivered</div>
                <div className="l2">Eish!! · 23 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="cats" aria-label="Browse by category">
        <div className="shell">
          <div className="cats-row">
            {CATEGORIES.map((c) => {
              const isActive = c.name === activeCategory;
              return (
                <button
                  key={c.name}
                  className="cat"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategory(c.name);
                    scrollToRestaurants();
                  }}
                  style={isActive ? { background: "var(--md-sys-color-surface-container)" } : undefined}
                >
                  <div className="tile" style={isActive ? { background: "var(--md-sys-color-on-surface)", color: "var(--md-sys-color-surface)" } : undefined}>
                    <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d={c.icon} />
                    </svg>
                  </div>
                  <div className="lbl">{c.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="section" id="restaurants">
        <div className="shell">
          <div className="sec-head" data-reveal>
            <div>
              <div className="t-label eyebrow">The kitchens</div>
              <h2>All seven of them. None of them anywhere else.</h2>
            </div>
            <p>
              UmuziKos is not a marketplace — it&apos;s the Lake Umuzi Waterfront&apos;s own delivery
              service. Every kitchen below operates at the complex.
              {activeCategory !== "All" && (
                <> Showing <b>{activeCategory}</b> · <button className="btn-text" style={{ display: "inline", padding: 0 }} onClick={() => setActiveCategory("All")}>show all</button></>
              )}
            </p>
          </div>

          <div className="r-grid">
            {visibleRestaurants.map((r) => {
              const i = RESTAURANTS.indexOf(r);
              return (
                <article key={r.slug} className="r-card" data-reveal>
                  <button
                    onClick={() => setActiveRestaurant(r)}
                    aria-label={`Open ${r.name} menu`}
                    style={{ display: "block", padding: 0, width: "100%", textAlign: "left" }}
                  >
                    <div className="r-card-media">
                      <ImgSlot label={`${r.name} photo`} radius={0} />
                      {r.promo && <span className="r-card-promo">{r.promo}</span>}
                      <button
                        className={`r-card-fav${favs[i] ? " is-on" : ""}`}
                        aria-label="Favourite"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(i);
                        }}
                      >
                        <Heart filled={favs[i]} />
                      </button>
                    </div>
                    <div className="r-card-body">
                      <div className="r-card-row">
                        <h3>{r.name}</h3>
                        <span className="rating"><Star />{r.rating.toFixed(1)}</span>
                      </div>
                      <div className="sub">{r.sub} · {r.reviews.toLocaleString()} reviews</div>
                      <div className="meta">
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9} /><path d="M12 7v5l3 2" /></svg>
                        {r.prepTime}
                        <span className="sep">·</span>
                        <span>From {formatRands(r.baseDeliveryFee)} delivery</span>
                      </div>
                      <div className="tags">
                        {r.tags.map((t) => <span key={t} className="tag-out">{t}</span>)}
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>

          {visibleRestaurants.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--space-9) var(--space-4)", color: "var(--md-sys-color-on-surface-variant)" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>No kitchens match &ldquo;{activeCategory}&rdquo;.</div>
              <button className="btn btn-md btn-outlined" onClick={() => setActiveCategory("All")}>Show all 7 kitchens</button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <button className="btn btn-lg btn-outlined" onClick={() => setActiveCategory("All")}>
              Show all 7 kitchens
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section alt" id="how">
        <div className="shell">
          <div className="sec-head" data-reveal>
            <div>
              <div className="t-label eyebrow">How it works</div>
              <h2>Three taps from hungry to handed over.</h2>
            </div>
            <p>No accounts to create just to look around. No menus hidden behind email walls. Just food.</p>
          </div>

          <div className="steps">
            <div className="step" data-reveal>
              <div className="num">1</div>
              <h3>Drop your pin</h3>
              <p>Enter your address. We check the 8&nbsp;km zone and show you the seven kitchens with honest prep times.</p>
            </div>
            <div className="step" data-reveal>
              <div className="num">2</div>
              <h3>Build your order</h3>
              <p>Tap, customise, checkout. Pay with SnapScan, Ozow, card, or cash. Every cent in ZAR — no hidden fees.</p>
            </div>
            <div className="step is-primary" data-reveal>
              <div className="num">3</div>
              <h3>Track to your door</h3>
              <p>Watch the motorbike in real time. Name, face, number — not a mystery dot on a map.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" id="why">
        <div className="shell">
          <div className="sec-head" data-reveal>
            <div>
              <div className="t-label eyebrow">Why UmuziKos</div>
              <h2>The waterfront&apos;s own delivery service.</h2>
            </div>
            <p>Not a marketplace. Not a side-hustle. UmuziKos is the closed-ecosystem delivery arm of the Lake Umuzi Waterfront — seven kitchens, one app, eight kilometres.</p>
          </div>

          <div className="feat">
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12Z" /><circle cx={12} cy={10} r={3} /></svg>
              </div>
              <h3>One complex</h3>
              <p>Every order comes from the seven kitchens at the Lake Umuzi Waterfront. No dark kitchens. No ghost brands. No miles to find your food.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9} /><path d="M12 7v5l3 2" /></svg>
              </div>
              <h3>Motorbike-fast</h3>
              <p>Eight-kilometre delivery zone, motorbike fleet, 25-minute average. If we miss our ETA by more than 5 minutes, delivery is on us.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={13} rx={2} /><path d="M3 10h18M7 15h3" /></svg>
              </div>
              <h3>ZAR, no surprises</h3>
              <p>Card via Paystack, SnapScan, Ozow EFT, or cash on delivery. R 15 base delivery, 5% service fee capped at R 25. Shown before checkout, not after.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
              </div>
              <h3>Live tracking</h3>
              <p>Driver location pushed every 3 seconds. Push notifications at each stage: confirmed, in the kitchen, picked up, on the way, delivered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKING (dark) */}
      <section className="section dark" id="tracking">
        <div className="shell track-grid">
          <div data-reveal>
            <div className="t-label" style={{ color: "var(--md-sys-color-primary)", marginBottom: "var(--space-3)" }}>Live tracking</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.8px", margin: 0, maxWidth: "16ch", color: "#FFFFFF" }}>
              From kitchen pass to front door. In sight, the whole time.
            </h2>
            <ul className="track-list">
              <li className="track-item">
                <div className="tick"><svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>
                <div>
                  <p className="t-l1">Order accepted</p>
                  <p className="t-l2">Eish!! confirmed your order at 19:42</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick"><svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>
                <div>
                  <p className="t-l1">In the kitchen</p>
                  <p className="t-l2">Chef Naledi is plating your full house kota right now</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick"><svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></div>
                <div>
                  <p className="t-l1">Picked up</p>
                  <p className="t-l2">Sipho is 4 minutes away on the bike — call or message any time</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick is-empty" />
                <div>
                  <p className="t-l1" style={{ color: "rgba(255,255,255,0.6)" }}>Delivered</p>
                  <p className="t-l2">Expected at your door by 20:07</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="track-card" data-reveal>
            <div className="track-card-head">
              <div className="who">
                <div className="av">SN</div>
                <div>
                  <div className="t-body-md" style={{ fontWeight: 700 }}>Sipho Nkosi</div>
                  <div className="t-caption muted">Honda CB125F · MP 142 ZN</div>
                </div>
              </div>
              <span className="badge badge-success"><span className="dot" />On the way</span>
            </div>

            <div className="eta-lbl" style={{ marginTop: "var(--space-5)" }}>Arriving in</div>
            <div className="eta-big">4 min</div>

            <div className="track-progress" aria-hidden="true">
              <span className="on" />
              <span className="on" />
              <span className="now" />
              <span />
            </div>
            <div className="track-stages">
              <b>Confirmed</b>
              <b>Cooking</b>
              <b>On the way</b>
              <span>Delivered</span>
            </div>

            <div className="track-order-rows">
              <div className="track-order-row"><span className="l">Full house kota</span><span className="r">{formatRands(8800)}</span></div>
              <div className="track-order-row"><span className="l">Lamb bunny chow</span><span className="r">{formatRands(9500)}</span></div>
              <div className="track-order-row"><span className="l">Delivery &amp; fees (3.2 km)</span><span className="r">{formatRands(2920)}</span></div>
              <div className="track-order-row" style={{ borderTop: "1px solid var(--md-sys-color-outline-variant)", marginTop: "var(--space-2)", paddingTop: "var(--space-3)" }}>
                <span className="l" style={{ fontWeight: 700, color: "var(--md-sys-color-on-surface)" }}>Total</span>
                <span className="r" style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{formatRands(21220)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="section alt" id="coverage">
        <div className="shell cover-grid">
          <div data-reveal>
            <div className="t-label eyebrow" style={{ color: "var(--md-sys-color-primary)", marginBottom: "var(--space-3)" }}>Coverage</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.8px", margin: "0 0 var(--space-4)", maxWidth: "16ch" }}>
              Eight kilometres from the waterfront. Door to door.
            </h2>
            <p className="muted" style={{ margin: 0, maxWidth: "38ch" }}>
              UmuziKos delivers anywhere within an 8&nbsp;km radius of the Lake Umuzi Waterfront
              GPS pin&nbsp;({WATERFRONT.lat}, {WATERFRONT.lng}). Outside the radius, we can&apos;t deliver yet.
            </p>

            <ul className="cover-list">
              {COVERAGE_ZONES.map((z) => (
                <li key={z.name}>
                  <span className="name">{z.name}</span>
                  {z.status === "origin" && <span className="badge badge-info"><span className="dot" />Origin</span>}
                  {z.status === "live" && <span className="badge badge-success"><span className="dot" />Live</span>}
                  {z.status === "out" && <span className="badge badge-warning"><span className="dot" />Outside zone</span>}
                </li>
              ))}
            </ul>

            <button className="btn btn-lg btn-outlined" style={{ marginTop: "var(--space-5)" }} onClick={() => setAddressOpen(true)}>
              Check my address
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="cover-map" data-reveal>
            <ImgSlot label="Drop a Secunda 8 km zone map" radius={16} />
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="section" id="download">
        <div className="shell dl-grid">
          <div data-reveal>
            <div className="t-label eyebrow" style={{ color: "var(--md-sys-color-primary)", marginBottom: "var(--space-3)" }}>Get the app</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 var(--space-5)", maxWidth: "14ch" }}>
              The waterfront,<br />in your pocket.
            </h2>
            <p className="muted" style={{ margin: 0, maxWidth: "38ch", fontSize: 17 }}>
              Download UmuziKos for iOS or Android. Order, track and pay — all seven kitchens, one app, eight kilometres.
            </p>

            <div className="dl-stores">
              <button className="store-btn" onClick={() => setAppOpen(true)} aria-label="Download on the App Store">
                <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.43 2.226-1.34 3.038-.89.81-1.95 1.32-3.08 1.246-.13-1.1.42-2.27 1.27-3.05.89-.81 2.13-1.4 3.15-1.234zM21 17.34c-.49 1.15-.73 1.66-1.36 2.68-.88 1.42-2.12 3.19-3.66 3.21-1.37.01-1.72-.89-3.58-.88-1.86.01-2.25.9-3.62.88-1.54-.02-2.71-1.62-3.59-3.04C2.7 16.79 2.45 11.41 4.94 8.57c1.16-1.32 2.83-2.16 4.59-2.19 1.4-.02 2.72.94 3.58.94.86 0 2.47-1.16 4.16-.99.71.03 2.7.29 3.98 2.17-3.5 1.92-2.93 6.88.75 8.84z" /></svg>
                <div>
                  <div className="s1">Download on the</div>
                  <div className="s2">App Store</div>
                </div>
              </button>
              <button className="store-btn" onClick={() => setAppOpen(true)} aria-label="Get it on Google Play">
                <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.84c-.36.36-.6.92-.6 1.66v17c0 .74.24 1.3.6 1.66l9.55-10.16L3.6 1.84zM14.32 11.85l2.66-2.83-11.55-6.6c-.36-.21-.69-.27-.97-.18l9.86 9.61zm0 .3l-9.86 9.6c.28.1.61.04.97-.17l11.55-6.6-2.66-2.83zm6.32-3.83l-2.94-1.68-2.91 3.08 2.91 3.09 2.94-1.68c.99-.57.99-1.49 0-2.06z" /></svg>
                <div>
                  <div className="s1">Get it on</div>
                  <div className="s2">Google Play</div>
                </div>
              </button>
            </div>

            <div style={{ display: "flex", gap: "var(--space-5)", marginTop: "var(--space-7)", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="var(--md-sys-color-primary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                <span className="t-body-md">Free download</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="var(--md-sys-color-primary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                <span className="t-body-md">No subscription</span>
              </div>
            </div>
          </div>

          <div className="phone-art" data-reveal>
            <div className="phone">
              <div className="phone-notch" />
              <div className="phone-screen">
                <ImgSlot label="Drop an app screenshot" radius={0} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section alt" id="faq">
        <div className="shell">
          <div className="sec-head" data-reveal style={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div>
              <div className="t-label eyebrow" style={{ textAlign: "center" }}>Questions</div>
              <h2 style={{ margin: "0 auto", maxWidth: "18ch", textAlign: "center" }}>The things people actually ask us.</h2>
            </div>
          </div>

          <div className="faq">
            {FAQ.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className={`faq-item${isOpen ? " open" : ""}`} data-reveal>
                  <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="pm" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div className="faq-a"><div><p>{f.a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="shell">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="wordmark on-dark" style={{ fontSize: 32 }}>Umuzikos<span className="dot">.</span></div>
              <p>The Lake Umuzi Waterfront&apos;s own delivery service. Seven kitchens. One app. Eight kilometres.</p>
            </div>
            <div className="foot-col">
              <h4>Eat</h4>
              <ul>
                <li><a href="#restaurants">All 7 kitchens</a></li>
                <li><a href="#how">How it works</a></li>
                <li><a href="#tracking">Live tracking</a></li>
                <li><a href="#coverage">8 km zone</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Account</h4>
              <ul>
                <li><button onClick={() => setAuthOpen(true)}>Sign in</button></li>
                <li><button onClick={() => setAppOpen(true)}>Get the app</button></li>
                <li><button onClick={() => setAddressOpen(true)}>Check delivery zone</button></li>
                <li><button onClick={() => setCartOpen(true)}>View cart</button></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Help</h4>
              <ul>
                <li><a href="#faq">Help centre</a></li>
                <li><a href="#tracking">Track an order</a></li>
                <li><a href="#">WhatsApp support</a></li>
                <li><a href="#">Contact ops</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About the waterfront</a></li>
                <li><a href="#">Privacy &amp; POPIA</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">News</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <div>© 2026 UmuziKos (Pty) Ltd · Lake Umuzi Waterfront, Secunda</div>
            <div className="legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
              <a href="#">POPIA</a>
            </div>
            <div className="foot-social" aria-label="Social">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={18} height={18} rx={5} /><circle cx={12} cy={12} r={4} /><circle cx={17.5} cy={6.5} r={0.5} fill="currentColor" /></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7c0-1.1.4-2 2-2h2V1.2C16.5 1.1 15.3 1 14 1c-3 0-5 1.8-5 5v4H5v4h4v8h4z" /></svg></a>
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.84l-5.36-7-6.13 7H1.5l8.04-9.18L1.5 2h7l4.84 6.4L18.24 2zm-2.41 17.5h1.84L7.27 3.9H5.3l10.52 15.6z" /></svg></a>
              <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M19.5 6.5a5.5 5.5 0 0 1-3.5-1.25V15.5a5.5 5.5 0 1 1-5.5-5.5v3.05A2.45 2.45 0 1 0 12.5 15.5V2h2.95A5.5 5.5 0 0 0 19.5 6.5z" /></svg></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <RestaurantModal
        restaurant={activeRestaurant}
        onClose={() => setActiveRestaurant(null)}
        onAddToCart={addToCart}
      />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(m) => toast(m)}
      />
      <AppModal open={appOpen} onClose={() => setAppOpen(false)} />
      <AddressModal
        open={addressOpen}
        initial={heroAddress}
        onClose={() => setAddressOpen(false)}
        onResult={(m) => {
          toast(m);
          scrollToRestaurants();
        }}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onIncrement={incrementCart}
        onDecrement={decrementCart}
        onCheckout={onCheckout}
      />
      <Toaster toasts={toasts} />
      <ModeToggle mode={mode} onToggle={() => setMode((m) => (m === "wireframe" ? "design" : "wireframe"))} />
    </div>
  );
}
