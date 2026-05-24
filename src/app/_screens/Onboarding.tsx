"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../_components/state";
import { AppBar } from "../_components/ui";

/* ───────────────────────── S-001 Splash ───────────────────────── */

export function SplashScreen() {
  const { user, navigate } = useApp();
  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate(user ? "/home" : "/welcome/1");
    }, 1600);
    return () => window.clearTimeout(t);
  }, [user, navigate]);
  return (
    <div className="screen dark" style={{ position: "absolute", inset: 0, background: "#0A0A0A", color: "#FFFFFF" }}>
      <div className="splash" style={{ flex: 1 }}>
        <div className="mark">Umuzikos<span className="dot">.</span></div>
      </div>
      <div className="spinner" />
    </div>
  );
}

/* ───────────────────────── S-002–004 Welcome carousel ───────────────────────── */

const WELCOME_STEPS = [
  {
    eyebrow: "Lake Umuzi Waterfront",
    title: "Seven kitchens. One app.",
    sub: "Boesies, Bosveld Lapa, DROS, Eish!!, Ocean Basket, Moo Moo, and Lake Umuzi Brewing Co. — every kitchen at the waterfront, in your pocket.",
    glyph: (
      <svg viewBox="0 0 64 64" width={80} height={80} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--md-sys-color-primary)" }}>
        <path d="M12 26h40l-2 30H14L12 26zm6 0c0-6 8-6 8-12m12 12c0-4 4-4 4-8" />
      </svg>
    ),
  },
  {
    eyebrow: "8 kilometres, motorbike-fast",
    title: "On your door in 25 minutes.",
    sub: "Motorbike fleet, 8 km zone, honest ETAs. If we miss our delivery estimate by more than 5 minutes, delivery is on us.",
    alt: true,
    glyph: (
      <svg viewBox="0 0 64 64" width={80} height={80} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={14} cy={48} r={8} />
        <circle cx={48} cy={48} r={8} />
        <path d="M14 48l8-18h12l8 18M22 30l-4-10h-6M42 30h6l4 10" />
      </svg>
    ),
  },
  {
    eyebrow: "Live tracking",
    title: "Watch the bike, name & number.",
    sub: "Live driver location every 3 seconds. Chat with the rider, call them, or just watch them turn into your road.",
    glyph: (
      <svg viewBox="0 0 64 64" width={80} height={80} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--md-sys-color-primary)" }}>
        <path d="M32 8c-9 0-16 7-16 16 0 12 16 32 16 32s16-20 16-32c0-9-7-16-16-16z" />
        <circle cx={32} cy={24} r={6} />
      </svg>
    ),
  },
];

export function WelcomeScreen({ step }: { step: number }) {
  const { navigate } = useApp();
  const idx = Math.max(0, Math.min(step - 1, WELCOME_STEPS.length - 1));
  const s = WELCOME_STEPS[idx];
  const isLast = idx === WELCOME_STEPS.length - 1;
  return (
    <div className="screen">
      <div className="screen-body">
        <div className="welcome-step">
          <div className={`welcome-art${s.alt ? " alt" : ""}`}>
            <span className="glyph-tag">Step {idx + 1} of {WELCOME_STEPS.length}</span>
            <div className="glyph">{s.glyph}</div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <div className="t-label" style={{ color: "var(--md-sys-color-primary)", marginBottom: 8 }}>{s.eyebrow}</div>
            <h1 className="welcome-title">{s.title}</h1>
            <p className="welcome-sub">{s.sub}</p>

            <div className="dots" role="tablist" aria-label="Onboarding steps">
              {WELCOME_STEPS.map((_, i) => <span key={i} className={`pip${i === idx ? " is-active" : ""}`} />)}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {!isLast ? (
                <>
                  <button className="btn btn-lg btn-outlined" style={{ flex: 1 }} onClick={() => navigate("/login")}>Skip</button>
                  <button className="btn btn-lg btn-primary" style={{ flex: 1 }} onClick={() => navigate(`/welcome/${idx + 2}`)}>Next</button>
                </>
              ) : (
                <>
                  <button className="btn btn-lg btn-outlined" style={{ flex: 1 }} onClick={() => navigate("/register")}>Sign up</button>
                  <button className="btn btn-lg btn-primary" style={{ flex: 1 }} onClick={() => navigate("/login")}>Sign in</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-005 Login ───────────────────────── */

export function LoginScreen() {
  const { navigate } = useApp();
  const [phone, setPhone] = useState("82 555 1234");
  return (
    <div className="screen">
      <AppBar showBack onBack={() => navigate("/welcome/1")} />
      <div className="screen-body">
        <div className="auth">
          <h1>Welcome back.</h1>
          <p className="sub">Sign in with your South African mobile number — we&apos;ll text you a code.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate("/otp"); }}>
            <div className="field">
              <label>Mobile number</label>
              <div className="prefix">
                <span>+27</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="82 123 4567"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-primary" style={{ marginTop: 20, width: "100%" }}>
              Send code
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: "var(--md-sys-color-on-surface-variant)", fontSize: 12 }}>
              <div style={{ flex: 1, height: 1, background: "var(--md-sys-color-outline-variant)" }} />
              <span>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "var(--md-sys-color-outline-variant)" }} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="btn btn-lg btn-outlined" style={{ flex: 1 }} onClick={() => navigate("/otp")}>
                Apple
              </button>
              <button type="button" className="btn btn-lg btn-outlined" style={{ flex: 1 }} onClick={() => navigate("/otp")}>
                Google
              </button>
            </div>
          </form>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--md-sys-color-on-surface-variant)" }}>
            New to UmuziKos? <button onClick={() => navigate("/register")} style={{ color: "var(--md-sys-color-primary)", fontWeight: 700 }}>Create account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-006 Register ───────────────────────── */

export function RegisterScreen() {
  const { navigate } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="screen">
      <AppBar showBack onBack={() => navigate("/welcome/1")} />
      <div className="screen-body">
        <div className="auth">
          <h1>Create an account.</h1>
          <p className="sub">Takes 30 seconds. Phone-only sign-up — no passwords to forget.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate("/otp"); }}>
            <div className="field">
              <label>Full name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="field">
              <label>Mobile number</label>
              <div className="prefix">
                <span>+27</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="82 123 4567" required />
              </div>
            </div>

            <p style={{ fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", margin: "16px 0", lineHeight: 1.4 }}>
              By continuing you agree to UmuziKos&apos;s Terms and acknowledge our POPIA-compliant Privacy Policy.
            </p>

            <button type="submit" className="btn btn-lg btn-primary" style={{ width: "100%" }}>
              Send verification code
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--md-sys-color-on-surface-variant)" }}>
            Already have an account? <button onClick={() => navigate("/login")} style={{ color: "var(--md-sys-color-primary)", fontWeight: 700 }}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-007 OTP ───────────────────────── */

export function OtpScreen() {
  const { navigate, signIn } = useApp();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const t = window.setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(t);
  }, []);

  const onChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = ch;
    setCode(next);
    if (ch && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ name: "Director Demo", phone: "+27 82 555 1234", email: "director@example.co.za" });
    navigate("/home");
  };

  return (
    <div className="screen">
      <AppBar showBack onBack={() => navigate("/login")} />
      <div className="screen-body">
        <div className="auth">
          <h1>Enter the code.</h1>
          <p className="sub">We sent a 6-digit code to +27 82 555 1234. (Prototype: any 6 digits work.)</p>

          <form onSubmit={onSubmit}>
            <div className="otp-row">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  inputMode="numeric"
                  maxLength={1}
                  value={c}
                  onChange={(e) => onChange(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <div className="resend">
              {seconds > 0 ? (
                <span>Resend in {seconds}s</span>
              ) : (
                <>
                  <span>Didn&apos;t get it?</span>
                  <button type="button" onClick={() => setSeconds(30)}>Resend</button>
                </>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary"
              style={{ width: "100%", marginTop: 8 }}
              disabled={code.filter(Boolean).length < 6}
            >
              Verify &amp; continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
