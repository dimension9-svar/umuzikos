"use client";

import { useEffect, useState } from "react";
import { AppProvider, DEMO_USER, useApp } from "./state";
import {
  SplashScreen,
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  OtpScreen,
} from "../_screens/Onboarding";
import {
  HomeScreen,
  BrowseScreen,
  CategoryScreen,
  PromotionsScreen,
} from "../_screens/Discovery";
import {
  RestaurantScreen,
  MenuItemScreen,
  ReviewsScreen,
} from "../_screens/Restaurant";
import {
  CartScreen,
  CheckoutScreen,
  PaymentScreen,
  OrderConfirmedScreen,
  PickupScreen,
  ScheduleScreen,
} from "../_screens/Checkout";
import {
  TrackingScreen,
  ChatScreen,
  RateScreen,
} from "../_screens/Tracking";
import {
  ProfileScreen,
  OrderHistoryScreen,
  OrderDetailScreen,
  AddressesScreen,
  PaymentMethodsScreen,
  SettingsScreen,
  FavouritesScreen,
} from "../_screens/Profile";
import {
  NotificationsScreen,
  HelpScreen,
  ScreensIndex,
} from "../_screens/Support";

type Theme = "light" | "dark";

/* ───────────────────────── Theme hook ───────────────────────── */

function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("umk-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);
  const set = (t: Theme) => {
    setTheme(t);
    try { window.localStorage.setItem("umk-theme", t); } catch {}
  };
  return [theme, set];
}

/* ───────────────────────── Status bar + tab bar ───────────────────────── */

function StatusBar({ dark }: { dark?: boolean }) {
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const i = window.setInterval(tick, 30000);
    return () => window.clearInterval(i);
  }, []);
  return (
    <div className={`statusbar${dark ? " on-dark" : ""}`}>
      <span>{time}</span>
      <span className="statusbar-icons">
        <svg viewBox="0 0 18 12" width={18} height={12} fill="currentColor">
          <rect x={0} y={9} width={3} height={3} rx={0.5} />
          <rect x={5} y={6} width={3} height={6} rx={0.5} />
          <rect x={10} y={3} width={3} height={9} rx={0.5} />
          <rect x={15} y={0} width={3} height={12} rx={0.5} />
        </svg>
        <svg viewBox="0 0 16 12" width={16} height={12} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M1 5c4-4 10-4 14 0M3.5 7.5c2.5-2.5 7-2.5 9 0M6 10a2 2 0 0 1 4 0" />
        </svg>
        <svg viewBox="0 0 24 12" width={24} height={12} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x={1} y={1} width={20} height={10} rx={2.5} />
          <rect x={22} y={4} width={1.5} height={4} fill="currentColor" />
          <rect x={3} y={3} width={14} height={6} fill="currentColor" rx={1} />
        </svg>
      </span>
    </div>
  );
}

const TAB_ROOT_ROUTES = ["/home", "/browse", "/orders", "/profile", "/promotions", "/favourites", "/notifications"];

function TabBar() {
  const { route, navigate, cart, activeOrder } = useApp();
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartOrTracking = () => {
    if (activeOrder) navigate(`/order/${activeOrder.id}/track`);
    else navigate("/cart");
  };
  const Item = ({
    path,
    label,
    icon,
    onClick,
    badge,
  }: {
    path: string;
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    badge?: number;
  }) => {
    const active = route === path || route.startsWith(path + "/");
    return (
      <button className={`tab-btn${active ? " is-active" : ""}`} onClick={onClick ?? (() => navigate(path))}>
        <span className="pill">
          {icon}
          {badge ? <span className="badge-count">{badge}</span> : null}
        </span>
        <span>{label}</span>
      </button>
    );
  };
  return (
    <div className="tab-bar">
      <Item
        path="/home"
        label="Home"
        icon={
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8M5 10v10h14V10" />
          </svg>
        }
      />
      <Item
        path="/browse"
        label="Browse"
        icon={
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={11} cy={11} r={7} />
            <path d="M21 21l-4.5-4.5" />
          </svg>
        }
      />
      <Item
        path="/orders"
        label={activeOrder ? "Tracking" : "Orders"}
        onClick={cartOrTracking}
        badge={cartCount || (activeOrder ? 1 : 0)}
        icon={
          activeOrder ? (
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={12} cy={12} r={9} />
              <path d="M12 7v5l3 2" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h15l-1.5 9h-12L4 3H2" />
              <circle cx={9} cy={20} r={1.5} />
              <circle cx={18} cy={20} r={1.5} />
            </svg>
          )
        }
      />
      <Item
        path="/profile"
        label="Profile"
        icon={
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={8} r={4} />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        }
      />
    </div>
  );
}

/* ───────────────────────── Toaster (inside device) ───────────────────────── */

function DeviceToaster() {
  const { toasts } = useApp();
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.msg}</div>
      ))}
    </div>
  );
}

/* ───────────────────────── Icons used in shell chrome ───────────────────────── */

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x={3} y={3} width={7} height={7} rx={1} />
    <rect x={14} y={3} width={7} height={7} rx={1} />
    <rect x={3} y={14} width={7} height={7} rx={1} />
    <rect x={14} y={14} width={7} height={7} rx={1} />
  </svg>
);
const ResetIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const FastIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);
const MenuBars = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

/* ───────────────────────── Demo menu — items shared by desktop pills + drawer ───────────────────────── */

function useDemoActions(closeAfter?: () => void) {
  const { navigate, signIn, signOut, clearCart } = useApp();
  const fire = (fn: () => void) => () => { fn(); closeAfter?.(); };
  return {
    goAllScreens: fire(() => navigate("/screens")),
    goHome: fire(() => navigate("/home")),
    restartOnboarding: fire(() => { signOut(); clearCart(); navigate("/splash"); }),
    skipToHome: fire(() => { signIn(DEMO_USER); navigate("/home"); }),
    advanceTracking: fire(() => {
      // jump straight to the live-tracking demo: place a quick mock active order if none, then go
      navigate("/order/UMK-20260520-0042/track");
    }),
  };
}

/* ───────────────────────── Drawer (mobile) ───────────────────────── */

function NavDrawer({
  open,
  onClose,
  theme,
  setTheme,
}: {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const { user } = useApp();
  const a = useDemoActions(onClose);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <>
      <div className="menu-scrim" onClick={onClose} />
      <aside className="menu-drawer" role="dialog" aria-label="Demo controls">
        <div className="menu-drawer-head">
          <div>
            <div className="title">UmuziKos · Prototype</div>
            <h3>Demo controls</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <div className="menu-drawer-body">
          <div className="menu-section">
            <h4>Theme</h4>
            <div className="theme-seg" role="tablist">
              <button className={theme === "light" ? "is-active" : ""} onClick={() => setTheme("light")}>
                <SunIcon /> Light
              </button>
              <button className={theme === "dark" ? "is-active" : ""} onClick={() => setTheme("dark")}>
                <MoonIcon /> Dark
              </button>
            </div>
          </div>

          <div className="menu-section">
            <h4>Navigate</h4>
            <button className="menu-row" onClick={a.goAllScreens}>
              <span className="ico"><GridIcon /></span>
              <span className="body">
                <div>All 32 screens</div>
                <div className="sub">Index of every codex screen</div>
              </span>
            </button>
            <button className="menu-row" onClick={a.goHome}>
              <span className="ico">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-8 9 8M5 10v10h14V10" />
                </svg>
              </span>
              <span className="body">
                <div>Home</div>
                <div className="sub">Skip to the home feed</div>
              </span>
            </button>
            <button className="menu-row" onClick={a.advanceTracking}>
              <span className="ico"><FastIcon /></span>
              <span className="body">
                <div>Jump to live tracking</div>
                <div className="sub">A mock in-flight order (auto-advances)</div>
              </span>
            </button>
          </div>

          <div className="menu-section">
            <h4>Session</h4>
            {!user ? (
              <button className="menu-row" onClick={a.skipToHome}>
                <span className="ico"><PlayIcon /></span>
                <span className="body">
                  <div>Skip onboarding</div>
                  <div className="sub">Sign in as Director Demo</div>
                </span>
              </button>
            ) : (
              <div className="menu-row" style={{ pointerEvents: "none" }}>
                <span className="ico">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={8} r={4} /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                </span>
                <span className="body">
                  <div>{user.name}</div>
                  <div className="sub">{user.phone}</div>
                </span>
              </div>
            )}
            <button className="menu-row" onClick={a.restartOnboarding}>
              <span className="ico"><ResetIcon /></span>
              <span className="body">
                <div>Restart from splash</div>
                <div className="sub">Sign out, clear cart, replay onboarding</div>
              </span>
            </button>
          </div>

          <div style={{ marginTop: 16, padding: 12, background: "var(--md-sys-color-surface-container)", borderRadius: 8, fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", lineHeight: 1.5 }}>
            Every screen has a shareable URL — copy the hash to send a teammate a direct link, e.g. <code style={{ fontSize: 11 }}>#/r/boesies</code>.
          </div>
        </div>
      </aside>
    </>
  );
}

/* ───────────────────────── Screen router ───────────────────────── */

function parseRoute(route: string) {
  const path = route.split("?")[0];
  const segs = path.split("/").filter(Boolean);
  if (segs.length === 0) return { name: "splash" };
  const [first, ...rest] = segs;
  switch (first) {
    case "splash": return { name: "splash" };
    case "welcome": return { name: "welcome", step: parseInt(rest[0] || "1", 10) };
    case "login": return { name: "login" };
    case "register": return { name: "register" };
    case "otp": return { name: "otp" };
    case "home": return { name: "home" };
    case "browse": return { name: "browse" };
    case "category": return { name: "category", cuisine: decodeURIComponent(rest[0] || "All") };
    case "promotions": return { name: "promotions" };
    case "r": {
      if (rest[1] === "item") return { name: "menu-item", slug: rest[0], itemSlug: rest[2] };
      if (rest[1] === "reviews") return { name: "reviews", slug: rest[0] };
      return { name: "restaurant", slug: rest[0] };
    }
    case "cart": return { name: "cart" };
    case "checkout": return { name: "checkout" };
    case "payment": return { name: "payment" };
    case "schedule": return { name: "schedule" };
    case "order": {
      const id = rest[0];
      const sub = rest[1];
      if (sub === "track") return { name: "tracking", orderId: id };
      if (sub === "chat") return { name: "chat", orderId: id };
      if (sub === "rate") return { name: "rate", orderId: id };
      if (sub === "pickup") return { name: "pickup", orderId: id };
      if (sub === "confirmed") return { name: "confirmed", orderId: id };
      return { name: "order-detail", orderId: id };
    }
    case "orders": return { name: "history" };
    case "profile": return { name: "profile" };
    case "addresses": return { name: "addresses" };
    case "payments": return { name: "payments" };
    case "favourites": return { name: "favourites" };
    case "settings": return { name: "settings" };
    case "notifications": return { name: "notifications" };
    case "help": return { name: "help" };
    case "screens": return { name: "screens" };
    default: return { name: "home" };
  }
}

function ScreenSwitch() {
  const { route } = useApp();
  const r = parseRoute(route);
  switch (r.name) {
    case "splash": return <SplashScreen />;
    case "welcome": return <WelcomeScreen step={r.step!} />;
    case "login": return <LoginScreen />;
    case "register": return <RegisterScreen />;
    case "otp": return <OtpScreen />;
    case "home": return <HomeScreen />;
    case "browse": return <BrowseScreen />;
    case "category": return <CategoryScreen cuisine={r.cuisine!} />;
    case "promotions": return <PromotionsScreen />;
    case "restaurant": return <RestaurantScreen slug={r.slug!} />;
    case "menu-item": return <MenuItemScreen slug={r.slug!} itemSlug={r.itemSlug!} />;
    case "reviews": return <ReviewsScreen slug={r.slug!} />;
    case "cart": return <CartScreen />;
    case "checkout": return <CheckoutScreen />;
    case "payment": return <PaymentScreen />;
    case "schedule": return <ScheduleScreen />;
    case "confirmed": return <OrderConfirmedScreen orderId={r.orderId!} />;
    case "pickup": return <PickupScreen orderId={r.orderId!} />;
    case "tracking": return <TrackingScreen orderId={r.orderId!} />;
    case "chat": return <ChatScreen orderId={r.orderId!} />;
    case "rate": return <RateScreen orderId={r.orderId!} />;
    case "order-detail": return <OrderDetailScreen orderId={r.orderId!} />;
    case "history": return <OrderHistoryScreen />;
    case "profile": return <ProfileScreen />;
    case "addresses": return <AddressesScreen />;
    case "payments": return <PaymentMethodsScreen />;
    case "favourites": return <FavouritesScreen />;
    case "settings": return <SettingsScreen />;
    case "notifications": return <NotificationsScreen />;
    case "help": return <HelpScreen />;
    case "screens": return <ScreensIndex />;
    default: return <HomeScreen />;
  }
}

function ShouldShowTabs(route: string) {
  const path = route.split("?")[0];
  return TAB_ROOT_ROUTES.some((p) => path === p || path === p + "/");
}

function ShouldShowStatusBar(route: string) {
  return !route.startsWith("/splash");
}

function StatusDark(route: string) {
  return route.startsWith("/splash");
}

/* ───────────────────────── Outer shell ───────────────────────── */

function ShellInner({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const { route } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const a = useDemoActions();

  const showTabs = ShouldShowTabs(route);
  const showStatus = ShouldShowStatusBar(route);
  const statusDark = StatusDark(route);

  return (
    <div className={`stage${theme === "dark" ? " dark" : ""}`}>
      <div className="stage-header">
        <span className="badge-dot">U</span>
        <span>UmuziKos</span>
        <span className="muted-tag">CUSTOMER APP · PROTOTYPE</span>
      </div>

      {/* Mobile-only: top-right drawer trigger */}
      <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open demo menu">
        <MenuBars />
        <span>Menu</span>
      </button>

      <div className="device" aria-label="UmuziKos customer app prototype">
        <div className="device-inner">
          <div className="device-notch" />
          {showStatus && <StatusBar dark={statusDark} />}
          <div className="screen-port">
            <ScreenSwitch />
          </div>
          {showTabs && <TabBar />}
          <DeviceToaster />
          <div className="device-home" />
        </div>
      </div>

      {/* Desktop-only: bottom-right pills (hidden on mobile via CSS) */}
      <div className="demo-controls">
        <div className="theme-seg desktop-theme">
          <button className={theme === "light" ? "is-active" : ""} onClick={() => setTheme("light")} aria-label="Light mode">
            <SunIcon />
          </button>
          <button className={theme === "dark" ? "is-active" : ""} onClick={() => setTheme("dark")} aria-label="Dark mode">
            <MoonIcon />
          </button>
        </div>
        <button className="demo-btn secondary" onClick={a.goAllScreens}>
          <GridIcon />
          All screens
        </button>
        <button className="demo-btn" onClick={a.restartOnboarding}>
          <ResetIcon />
          Restart
        </button>
      </div>

      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} theme={theme} setTheme={setTheme} />
    </div>
  );
}

export function AppShell() {
  const [theme, setTheme] = useTheme();
  return (
    <AppProvider>
      <ShellInner theme={theme} setTheme={setTheme} />
    </AppProvider>
  );
}
