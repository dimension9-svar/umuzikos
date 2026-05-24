"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, FAQ, RESTAURANTS } from "./_components/data";

function Star() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" style={{ color: "var(--md-sys-color-primary)" }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ImgSlot({ label, radius = 12 }: { label: string; radius?: number }) {
  return (
    <div className="img-slot" data-radius={String(radius)}>
      {label}
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [favs, setFavs] = useState<boolean[]>(RESTAURANTS.map((r) => r.fav));
  const [openFaq, setOpenFaq] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef}>
      {/* NAV */}
      <nav className={`nav${scrolled ? " is-scrolled" : ""}`} id="nav">
        <div className="shell nav-inner">
          <a href="#top" className="wordmark nav-brand" aria-label="Umuzikos home">
            Umuzikos<span className="dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#restaurants" className="nav-link">Restaurants</a>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#partner-restaurants" className="nav-link">For Restaurants</a>
            <a href="#partner-drivers" className="nav-link">For Drivers</a>
            <a href="#faq" className="nav-link">Help</a>
          </div>
          <div className="nav-actions">
            <a href="#" className="nav-link" style={{ marginRight: "var(--space-3)" }}>Sign in</a>
            <a href="#download" className="btn btn-md btn-primary">Get the app</a>
            <button className="nav-burger" aria-label="Menu">
              <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="hero-eyebrow">
              <span className="badge badge-success"><span className="dot" />Now serving Secunda &amp; Lake Umuzi</span>
            </div>
            <h1>Tuck in.<br />We <span className="accent">deliver</span>.</h1>
            <p className="hero-sub">
              Local kitchens, real photographs, honest ETAs. UmuziKos brings Secunda&apos;s best food
              — from braai to biryani — to your door in under 35 minutes.
            </p>

            <form
              className="address-form"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Find food near you"
            >
              <span className="pin" aria-hidden="true">
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
              </span>
              <input type="text" placeholder="Enter your address or suburb" autoComplete="off" />
              <button type="submit" className="btn btn-md btn-primary">Find food</button>
            </form>

            <div className="hero-trust">
              <div>
                <span className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
                <span style={{ marginLeft: 8 }}><b>4.8</b> · 12k+ ratings</span>
              </div>
              <div><b>R0</b> delivery on your first order</div>
            </div>
          </div>

          <div className="hero-art" data-reveal>
            <ImgSlot label="Drop a hero food photo" radius={20} />

            <div className="hero-card-top" aria-hidden="true">
              <div className="av">JM</div>
              <div>
                <div className="t-body-md" style={{ fontWeight: 700 }}>Jaco is on the way</div>
                <div className="t-caption muted">Arriving in 6 min</div>
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
                <div className="l2">Babbel &amp; Bites · 27 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="cats" aria-label="Browse by cuisine">
        <div className="shell">
          <div className="cats-row">
            {CATEGORIES.map((c) => (
              <a key={c.name} className="cat" href="#restaurants" aria-label={c.name}>
                <div className="tile">
                  <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                </div>
                <div className="lbl">{c.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="section" id="restaurants">
        <div className="shell">
          <div className="sec-head" data-reveal>
            <div>
              <div className="t-label eyebrow">Featured kitchens</div>
              <h2>Local food, photographed in your kitchen.</h2>
            </div>
            <p>Every restaurant on UmuziKos is independently owned and operated within 12 km of Lake Umuzi Waterfront. No dark kitchens, no ghost brands.</p>
          </div>

          <div className="r-grid">
            {RESTAURANTS.map((r, i) => (
              <article key={r.name} className="r-card" data-reveal>
                <div className="r-card-media">
                  <ImgSlot label={`Drop ${r.name} photo`} radius={0} />
                  {r.promo && <span className="r-card-promo">{r.promo}</span>}
                  <button
                    className={`r-card-fav${favs[i] ? " is-on" : ""}`}
                    aria-label="Favourite"
                    onClick={() =>
                      setFavs((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                    }
                  >
                    <Heart filled={favs[i]} />
                  </button>
                </div>
                <div className="r-card-body">
                  <div className="r-card-row">
                    <h3>{r.name}</h3>
                    <span className="rating"><Star />{r.rating.toFixed(1)}</span>
                  </div>
                  <div className="sub">{r.sub} · {r.reviews.toLocaleString()} ratings</div>
                  <div className="meta">
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={12} cy={12} r={9} />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    {r.time}
                    <span className="sep">·</span>
                    {r.fee === "Free" ? (
                      <span style={{ color: "var(--md-sys-color-on-success-container)", fontWeight: 700 }}>Free delivery</span>
                    ) : (
                      `${r.fee} delivery`
                    )}
                  </div>
                  <div className="tags">
                    {r.tags.map((t) => <span key={t} className="tag-out">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <a href="#" className="btn btn-lg btn-outlined">
              Browse all 86 restaurants
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
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
              <h3>Pick your spot</h3>
              <p>Drop a pin on Lake Umuzi or anywhere in Secunda. We&apos;ll show every kitchen open right now — with honest delivery times.</p>
            </div>
            <div className="step" data-reveal>
              <div className="num">2</div>
              <h3>Build your order</h3>
              <p>Tap, customise, checkout. Pay with SnapScan, Ozow, card, or cash. Track every cent in ZAR — no hidden fees.</p>
            </div>
            <div className="step is-primary" data-reveal>
              <div className="num">3</div>
              <h3>Track to your door</h3>
              <p>Watch your driver in real time. Get a name, a face and a number — not a mystery dot moving on a map.</p>
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
              <h2>Built in Secunda. For Secunda.</h2>
            </div>
            <p>We are not Uber Eats. We are not Mr D. We&apos;re the local crew that knows the parking is murder at Lake Umuzi after 6pm.</p>
          </div>

          <div className="feat">
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12Z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
              </div>
              <h3>Always local</h3>
              <p>Every kitchen is independently owned. No chains pretending to be local, no ghost brands operating from a warehouse.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={9} />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Honest ETAs</h3>
              <p>Times include kitchen prep, peak traffic, and parking. If we&apos;re wrong by more than 5 minutes, delivery is on us.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={3} y={6} width={18} height={13} rx={2} />
                  <path d="M3 10h18M7 15h3" />
                </svg>
              </div>
              <h3>ZAR, no surprises</h3>
              <p>Pay with SnapScan, Ozow, Visa, Mastercard, or cash at the door. Service fee is shown before checkout, not after.</p>
            </div>
            <div className="feat-cell" data-reveal>
              <div className="ico-wrap">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              </div>
              <h3>Quick by design</h3>
              <p>Average 27 minutes from tap to table. Live dispatch routes drivers around Lake Umuzi&apos;s worst traffic.</p>
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
              From the kitchen pass to your front door. In sight, the whole time.
            </h2>
            <ul className="track-list">
              <li className="track-item">
                <div className="tick">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="t-l1">Order accepted</p>
                  <p className="t-l2">Babbel &amp; Bites confirmed your order at 19:42</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="t-l1">In the kitchen</p>
                  <p className="t-l2">Chef Mathobi is plating your butter chicken right now</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="t-l1">Driver picked up</p>
                  <p className="t-l2">Jaco is 6 minutes away — call or message any time</p>
                </div>
              </li>
              <li className="track-item">
                <div className="tick is-empty" />
                <div>
                  <p className="t-l1" style={{ color: "rgba(255,255,255,0.6)" }}>Delivered</p>
                  <p className="t-l2">Expected at your door by 20:09</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="track-card" data-reveal>
            <div className="track-card-head">
              <div className="who">
                <div className="av">JM</div>
                <div>
                  <div className="t-body-md" style={{ fontWeight: 700 }}>Jaco Marais</div>
                  <div className="t-caption muted">Toyota Hilux · MP 142 ZN</div>
                </div>
              </div>
              <span className="badge badge-success"><span className="dot" />On the way</span>
            </div>

            <div className="eta-lbl" style={{ marginTop: "var(--space-5)" }}>Arriving in</div>
            <div className="eta-big">6 min</div>

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
              <div className="track-order-row"><span className="l">Butter chicken &amp; naan</span><span className="r">R 142.00</span></div>
              <div className="track-order-row"><span className="l">Lamb biryani</span><span className="r">R 168.00</span></div>
              <div className="track-order-row"><span className="l">Delivery (3.2 km)</span><span className="r">R 22.00</span></div>
              <div
                className="track-order-row"
                style={{ borderTop: "1px solid var(--md-sys-color-outline-variant)", marginTop: "var(--space-2)", paddingTop: "var(--space-3)" }}
              >
                <span className="l" style={{ fontWeight: 700, color: "var(--md-sys-color-on-surface)" }}>Total</span>
                <span className="r" style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>R 332.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section" id="partners">
        <div className="shell">
          <div className="sec-head" data-reveal>
            <div>
              <div className="t-label eyebrow">Partners</div>
              <h2>Run a kitchen, or run with us.</h2>
            </div>
            <p>Two-sided platform, two-sided support. Whichever way you join, you&apos;re on a same-day onboarding promise.</p>
          </div>

          <div className="partners">
            <div className="partner restaurant" id="partner-restaurants" data-reveal>
              <div className="t-label label">For Restaurants</div>
              <h3>List your kitchen. Keep your kitchen.</h3>
              <p>One tablet, every order. Lower commissions than the big platforms, your branding on every food container, and same-day onboarding in Secunda.</p>
              <div className="stats">
                <div className="stat"><div className="n">8%</div><div className="l">Flat commission</div></div>
                <div className="stat"><div className="n">24h</div><div className="l">Onboarding</div></div>
                <div className="stat"><div className="n">86</div><div className="l">Active kitchens</div></div>
              </div>
              <div className="actions">
                <a href="#" className="btn btn-lg btn-primary">Partner with us</a>
                <a href="#" className="btn btn-lg btn-outlined btn-on-dark">Read pricing</a>
              </div>
            </div>

            <div className="partner driver" id="partner-drivers" data-reveal>
              <div className="t-label label">For Drivers</div>
              <h3>Drive your hours. Get paid weekly.</h3>
              <p>Bike or bakkie, full-time or after work. UmuziKos pays Fridays and boosts you during peak demand at Lake Umuzi on Saturday nights.</p>
              <div className="stats">
                <div className="stat"><div className="n">R 28+</div><div className="l">Per delivery</div></div>
                <div className="stat"><div className="n">2×</div><div className="l">Peak boost</div></div>
                <div className="stat"><div className="n">Fri</div><div className="l">Weekly payouts</div></div>
              </div>
              <div className="actions">
                <a href="#" className="btn btn-lg btn-filled">Drive with us</a>
                <a href="#" className="btn btn-lg btn-outlined">Requirements</a>
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
              Around Lake Umuzi, and a few extra zip codes.
            </h2>
            <p className="muted" style={{ margin: 0, maxWidth: "38ch" }}>
              We deliver across the Lake Umuzi catchment and the surrounding Secunda area. Don&apos;t see your suburb? Tell us — we expand on demand.
            </p>

            <ul className="cover-list">
              <li>
                <span className="name">Lake Umuzi Waterfront</span>
                <span className="badge badge-success"><span className="dot" />Live now</span>
              </li>
              <li>
                <span className="name">Secunda CBD &amp; Bracken</span>
                <span className="badge badge-success"><span className="dot" />Live now</span>
              </li>
              <li>
                <span className="name">Goedehoop &amp; Trichardt</span>
                <span className="badge badge-success"><span className="dot" />Live now</span>
              </li>
              <li>
                <span className="name">Embalenhle Ext 13–18</span>
                <span className="badge badge-warning"><span className="dot" />Pilot · weekends only</span>
              </li>
              <li>
                <span className="name">Evander &amp; Kinross</span>
                <span className="badge badge-info"><span className="dot" />Coming Q3 2026</span>
              </li>
            </ul>
          </div>

          <div className="cover-map" data-reveal>
            <ImgSlot label="Drop a Secunda / Lake Umuzi map image" radius={16} />
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="section" id="download">
        <div className="shell dl-grid">
          <div data-reveal>
            <div className="t-label eyebrow" style={{ color: "var(--md-sys-color-primary)", marginBottom: "var(--space-3)" }}>Get the app</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 var(--space-5)", maxWidth: "14ch" }}>
              The whole town,<br />in your pocket.
            </h2>
            <p className="muted" style={{ margin: 0, maxWidth: "38ch", fontSize: 17 }}>
              Download UmuziKos for iOS or Android. Order, track and pay — all without leaving your couch on a Lake Umuzi Friday night.
            </p>

            <div className="dl-stores">
              <a href="#" className="store-btn" aria-label="Download on the App Store">
                <svg className="ico" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.43 2.226-1.34 3.038-.89.81-1.95 1.32-3.08 1.246-.13-1.1.42-2.27 1.27-3.05.89-.81 2.13-1.4 3.15-1.234zM21 17.34c-.49 1.15-.73 1.66-1.36 2.68-.88 1.42-2.12 3.19-3.66 3.21-1.37.01-1.72-.89-3.58-.88-1.86.01-2.25.9-3.62.88-1.54-.02-2.71-1.62-3.59-3.04C2.7 16.79 2.45 11.41 4.94 8.57c1.16-1.32 2.83-2.16 4.59-2.19 1.4-.02 2.72.94 3.58.94.86 0 2.47-1.16 4.16-.99.71.03 2.7.29 3.98 2.17-3.5 1.92-2.93 6.88.75 8.84z" />
                </svg>
                <div>
                  <div className="s1">Download on the</div>
                  <div className="s2">App Store</div>
                </div>
              </a>
              <a href="#" className="store-btn" aria-label="Get it on Google Play">
                <svg className="ico" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.6 1.84c-.36.36-.6.92-.6 1.66v17c0 .74.24 1.3.6 1.66l9.55-10.16L3.6 1.84zM14.32 11.85l2.66-2.83-11.55-6.6c-.36-.21-.69-.27-.97-.18l9.86 9.61zm0 .3l-9.86 9.6c.28.1.61.04.97-.17l11.55-6.6-2.66-2.83zm6.32-3.83l-2.94-1.68-2.91 3.08 2.91 3.09 2.94-1.68c.99-.57.99-1.49 0-2.06l-.0-0.01z" />
                </svg>
                <div>
                  <div className="s1">Get it on</div>
                  <div className="s2">Google Play</div>
                </div>
              </a>
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
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="pm" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
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
              <div className="wordmark on-dark" style={{ fontSize: 32 }}>
                Umuzikos<span className="dot">.</span>
              </div>
              <p>Lake Umuzi food, delivered. Built in Secunda, run from Secunda, for everyone in Secunda.</p>
            </div>
            <div className="foot-col">
              <h4>Eat</h4>
              <ul>
                <li><a href="#">All restaurants</a></li>
                <li><a href="#">New on UmuziKos</a></li>
                <li><a href="#">Promotions</a></li>
                <li><a href="#">Gift vouchers</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Partners</h4>
              <ul>
                <li><a href="#">For Restaurants</a></li>
                <li><a href="#">For Drivers</a></li>
                <li><a href="#">Business orders</a></li>
                <li><a href="#">Press kit</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Help</h4>
              <ul>
                <li><a href="#">Help centre</a></li>
                <li><a href="#">Track an order</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">WhatsApp support</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Sustainability</a></li>
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
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={3} y={3} width={18} height={18} rx={5} />
                  <circle cx={12} cy={12} r={4} />
                  <circle cx={17.5} cy={6.5} r={0.5} fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                  <path d="M13 22v-8h3l1-4h-4V7c0-1.1.4-2 2-2h2V1.2C16.5 1.1 15.3 1 14 1c-3 0-5 1.8-5 5v4H5v4h4v8h4z" />
                </svg>
              </a>
              <a href="#" aria-label="X">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                  <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.84l-5.36-7-6.13 7H1.5l8.04-9.18L1.5 2h7l4.84 6.4L18.24 2zm-2.41 17.5h1.84L7.27 3.9H5.3l10.52 15.6z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                  <path d="M19.5 6.5a5.5 5.5 0 0 1-3.5-1.25V15.5a5.5 5.5 0 1 1-5.5-5.5v3.05A2.45 2.45 0 1 0 12.5 15.5V2h2.95A5.5 5.5 0 0 0 19.5 6.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
