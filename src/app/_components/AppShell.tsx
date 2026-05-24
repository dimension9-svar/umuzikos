"use client";

import { useEffect, useRef, useState } from "react";
import { AppProvider, useApp } from "./state";
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
    else if (cartCount > 0) navigate("/cart");
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

/* ───────────────────────── Screen router ───────────────────────── */

function parseRoute(route: string) {
  const path = route.split("?")[0];
  const segs = path.split("/").filter(Boolean);
  if (segs.length === 0) return { name: "home" };
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
  // Hide on splash (it has its own dark style merged into the splash bg)
  return !route.startsWith("/splash");
}

function StatusDark(route: string) {
  return route.startsWith("/splash");
}

/* ───────────────────────── Outer shell ───────────────────────── */

function ShellInner() {
  const { route, navigate } = useApp();
  const showTabs = ShouldShowTabs(route);
  const showStatus = ShouldShowStatusBar(route);
  const statusDark = StatusDark(route);

  return (
    <div className="stage">
      <div className="stage-header">
        <span className="badge-dot">U</span>
        <span>UmuziKos</span>
        <span className="muted-tag">CUSTOMER APP · PROTOTYPE</span>
      </div>

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

      <div className="demo-controls">
        <button className="demo-btn secondary" onClick={() => navigate("/screens")} aria-label="All screens">
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x={3} y={3} width={7} height={7} rx={1} />
            <rect x={14} y={3} width={7} height={7} rx={1} />
            <rect x={3} y={14} width={7} height={7} rx={1} />
            <rect x={14} y={14} width={7} height={7} rx={1} />
          </svg>
          All screens
        </button>
        <button className="demo-btn" onClick={() => navigate("/home")} aria-label="Reset to home">
          <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}

export function AppShell() {
  return (
    <AppProvider>
      <ShellInner />
    </AppProvider>
  );
}
