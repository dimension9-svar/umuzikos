"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MenuItem, Restaurant } from "./data";
import { RESTAURANTS } from "./data";

/* ───────────────────────── Types ───────────────────────── */

export type User = {
  name: string;
  phone: string;
  email?: string;
};

export type Address = {
  id: string;
  label: string;       // "Home" | "Work" | custom
  street: string;
  suburb: string;
  city: string;
  instructions?: string;
  distanceKm: number;  // mocked distance from waterfront
};

export type PaymentMethod = {
  id: string;
  type: "card" | "snapscan" | "ozow" | "cash";
  label: string;       // "Visa ending 4242"
  meta?: string;       // "Expires 09/27"
};

export type CartLine = {
  restaurantSlug: string;
  restaurantName: string;
  item: MenuItem;
  qty: number;
  options?: string[];  // selected option labels
  optionsExtra?: number; // cents added by options
  notes?: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export type OrderType = "delivery" | "pickup";

export type Order = {
  id: string;             // UMK-YYYYMMDD-NNNN
  placedAt: number;       // epoch ms
  restaurantSlug: string;
  restaurantName: string;
  items: CartLine[];
  subtotal: number;       // cents
  deliveryFee: number;    // cents
  serviceFee: number;     // cents
  tip: number;            // cents
  discount: number;       // cents
  total: number;          // cents
  type: OrderType;
  paymentMethodId: string;
  paymentMethodLabel: string;
  addressId?: string;
  addressLabel?: string;
  status: OrderStatus;
  rated?: { restaurant: number; delivery: number; comment?: string };
};

export type Toast = { id: number; msg: string };

type AppState = {
  user: User | null;
  signIn: (u: User) => void;
  signOut: () => void;

  addresses: Address[];
  selectedAddressId: string;
  selectAddress: (id: string) => void;
  addAddress: (a: Omit<Address, "id">) => void;

  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  selectPayment: (id: string) => void;
  addPayment: (p: Omit<PaymentMethod, "id">) => void;

  favourites: string[];
  toggleFavourite: (slug: string) => void;

  cart: CartLine[];
  cartRestaurantSlug: string | null;
  addToCart: (restaurant: Restaurant, item: MenuItem, qty: number, opts?: { options?: string[]; optionsExtra?: number; notes?: string }) => void;
  updateCartQty: (idx: number, qty: number) => void;
  removeFromCart: (idx: number) => void;
  clearCart: () => void;

  activeOrder: Order | null;
  orderHistory: Order[];
  placeOrder: (args: {
    type: OrderType;
    paymentMethodId: string;
    tip?: number;
    addressId?: string;
  }) => Order;
  rateOrder: (orderId: string, restaurant: number, delivery: number, comment?: string) => void;
  advanceOrder: () => void;

  notifications: { id: string; title: string; body: string; ts: string; read: boolean }[];
  markNotificationsRead: () => void;

  toasts: Toast[];
  toast: (msg: string) => void;

  route: string;
  navigate: (path: string) => void;
  goBack: () => void;
};

const AppCtx = createContext<AppState | null>(null);
export const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp outside Provider");
  return ctx;
};

/* ───────────────────────── Defaults ───────────────────────── */

const DEFAULT_USER: User = {
  name: "Director Demo",
  phone: "+27 82 555 1234",
  email: "director@example.co.za",
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-home",
    label: "Home",
    street: "12 Lakeshore Avenue",
    suburb: "Bracken",
    city: "Secunda",
    instructions: "Blue gate, ring twice",
    distanceKm: 3.2,
  },
  {
    id: "addr-work",
    label: "Work",
    street: "Sasol Office Park, Block B",
    suburb: "Secunda CBD",
    city: "Secunda",
    distanceKm: 4.1,
  },
];

const DEFAULT_PAYMENTS: PaymentMethod[] = [
  { id: "pm-visa", type: "card", label: "Visa ending 4242", meta: "Expires 09/27" },
  { id: "pm-snapscan", type: "snapscan", label: "SnapScan", meta: "+27 82 555 1234" },
  { id: "pm-ozow", type: "ozow", label: "Ozow Instant EFT", meta: "Standard Bank" },
  { id: "pm-cash", type: "cash", label: "Cash on delivery", meta: "Pay the rider" },
];

const seededHistory = (): Order[] => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return [
    {
      id: "UMK-20260520-0042",
      placedAt: now - 4 * day,
      restaurantSlug: "moo-moo",
      restaurantName: "Moo Moo Steakhouse & Wine Bar",
      items: [
        { restaurantSlug: "moo-moo", restaurantName: "Moo Moo Steakhouse & Wine Bar", item: RESTAURANTS[5].menu[0], qty: 1 },
        { restaurantSlug: "moo-moo", restaurantName: "Moo Moo Steakhouse & Wine Bar", item: RESTAURANTS[5].menu[4], qty: 1 },
      ],
      subtotal: 38000,
      deliveryFee: 1500,
      serviceFee: 1900,
      tip: 2000,
      discount: 0,
      total: 43400,
      type: "delivery",
      paymentMethodId: "pm-visa",
      paymentMethodLabel: "Visa ending 4242",
      addressId: "addr-home",
      addressLabel: "Home",
      status: "delivered",
      rated: { restaurant: 5, delivery: 5, comment: "Perfect cook on the fillet." },
    },
    {
      id: "UMK-20260516-0188",
      placedAt: now - 8 * day,
      restaurantSlug: "eish",
      restaurantName: "Eish!! South African Kitchen",
      items: [
        { restaurantSlug: "eish", restaurantName: "Eish!! South African Kitchen", item: RESTAURANTS[3].menu[0], qty: 2 },
        { restaurantSlug: "eish", restaurantName: "Eish!! South African Kitchen", item: RESTAURANTS[3].menu[4], qty: 1 },
      ],
      subtotal: 21800,
      deliveryFee: 1500,
      serviceFee: 1090,
      tip: 0,
      discount: 0,
      total: 24390,
      type: "delivery",
      paymentMethodId: "pm-snapscan",
      paymentMethodLabel: "SnapScan",
      addressId: "addr-home",
      addressLabel: "Home",
      status: "delivered",
    },
    {
      id: "UMK-20260510-0337",
      placedAt: now - 14 * day,
      restaurantSlug: "lake-umuzi-brewing",
      restaurantName: "Lake Umuzi Brewing Company",
      items: [
        { restaurantSlug: "lake-umuzi-brewing", restaurantName: "Lake Umuzi Brewing Company", item: RESTAURANTS[6].menu[1], qty: 2 },
        { restaurantSlug: "lake-umuzi-brewing", restaurantName: "Lake Umuzi Brewing Company", item: RESTAURANTS[6].menu[4], qty: 1 },
      ],
      subtotal: 34500,
      deliveryFee: 1500,
      serviceFee: 1725,
      tip: 1000,
      discount: 0,
      total: 38725,
      type: "pickup",
      paymentMethodId: "pm-visa",
      paymentMethodLabel: "Visa ending 4242",
      status: "delivered",
      rated: { restaurant: 4, delivery: 5 },
    },
  ];
};

const seedNotifications = () => [
  { id: "n1", title: "Order delivered", body: "Your Moo Moo Steakhouse order arrived. Tap to rate.", ts: "4 days ago", read: false },
  { id: "n2", title: "20% off Bosveld Lapa", body: "First-order discount auto-applies until Sunday.", ts: "6 days ago", read: false },
  { id: "n3", title: "New: Lake Umuzi Brewing Co.", body: "Now live on UmuziKos — six taps deep.", ts: "2 weeks ago", read: true },
];

/* ───────────────────────── Helpers ───────────────────────── */

export const fmt = (cents: number) => `R ${(cents / 100).toFixed(2)}`;

export function calcFees(subtotalC: number, distanceKm: number, type: OrderType) {
  if (subtotalC === 0) return { deliveryFee: 0, serviceFee: 0 };
  const deliveryFee = type === "pickup" ? 0 : (distanceKm <= 3 ? 1500 : 1500 + Math.ceil(distanceKm - 3) * 500);
  const raw = Math.round(subtotalC * 0.05);
  const serviceFee = Math.max(500, Math.min(raw, 2500));
  return { deliveryFee, serviceFee };
}

function makeOrderNumber(): string {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const seq = String(Math.floor(Math.random() * 9999)).padStart(4, "0");
  return `UMK-${ymd}-${seq}`;
}

const STATUS_FLOW_DELIVERY: OrderStatus[] = [
  "pending", "confirmed", "preparing", "ready", "picked_up", "on_the_way", "delivered",
];
const STATUS_FLOW_PICKUP: OrderStatus[] = [
  "pending", "confirmed", "preparing", "ready", "delivered",
];

/* ───────────────────────── Provider ───────────────────────── */

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(DEFAULT_ADDRESSES[0].id);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(DEFAULT_PAYMENTS);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(DEFAULT_PAYMENTS[0].id);
  const [favourites, setFavourites] = useState<string[]>(["moo-moo", "eish"]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>(seededHistory());
  const [notifications, setNotifications] = useState(seedNotifications());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [route, setRoute] = useState<string>("/home");

  /* hash router */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apply = () => {
      const h = window.location.hash;
      const path = h ? h.replace(/^#/, "") : "/home";
      setRoute(path || "/home");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window === "undefined") return;
    if (!path.startsWith("/")) path = "/" + path;
    window.location.hash = path;
  }, []);

  const goBack = useCallback(() => {
    if (typeof window === "undefined") return;
    window.history.length > 1 ? window.history.back() : (window.location.hash = "/home");
  }, []);

  /* Toaster */
  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  /* Cart */
  const cartRestaurantSlug = cart[0]?.restaurantSlug ?? null;

  const addToCart: AppState["addToCart"] = (restaurant, item, qty, opts) => {
    setCart((prev) => {
      if (prev[0]?.restaurantSlug && prev[0].restaurantSlug !== restaurant.slug) {
        toast(`Cart cleared — switched to ${restaurant.name}.`);
        return [
          {
            restaurantSlug: restaurant.slug,
            restaurantName: restaurant.name,
            item,
            qty,
            options: opts?.options,
            optionsExtra: opts?.optionsExtra,
            notes: opts?.notes,
          },
        ];
      }
      const existingIdx = prev.findIndex(
        (l) =>
          l.item.name === item.name &&
          JSON.stringify(l.options ?? []) === JSON.stringify(opts?.options ?? []) &&
          (l.notes || "") === (opts?.notes || ""),
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = { ...next[existingIdx], qty: next[existingIdx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          restaurantSlug: restaurant.slug,
          restaurantName: restaurant.name,
          item,
          qty,
          options: opts?.options,
          optionsExtra: opts?.optionsExtra,
          notes: opts?.notes,
        },
      ];
    });
    toast(`Added ${qty} × ${item.name}`);
  };

  const updateCartQty = (idx: number, qty: number) => {
    setCart((prev) =>
      prev
        .map((l, i) => (i === idx ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    );
  };
  const removeFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };
  const clearCart = () => setCart([]);

  /* Order placement + auto-progression */
  const advanceTimer = useRef<number | null>(null);
  const placeOrder: AppState["placeOrder"] = ({ type, paymentMethodId, tip = 0, addressId }) => {
    const addr = addresses.find((a) => a.id === (addressId || selectedAddressId));
    const distance = addr?.distanceKm ?? 3.2;
    const subtotal = cart.reduce((n, l) => n + (l.item.price + (l.optionsExtra ?? 0)) * l.qty, 0);
    const { deliveryFee, serviceFee } = calcFees(subtotal, distance, type);
    const total = subtotal + deliveryFee + serviceFee + tip;
    const pm = paymentMethods.find((p) => p.id === paymentMethodId)!;
    const order: Order = {
      id: makeOrderNumber(),
      placedAt: Date.now(),
      restaurantSlug: cart[0].restaurantSlug,
      restaurantName: cart[0].restaurantName,
      items: cart.slice(),
      subtotal,
      deliveryFee,
      serviceFee,
      tip,
      discount: 0,
      total,
      type,
      paymentMethodId,
      paymentMethodLabel: pm.label,
      addressId: type === "delivery" ? addr?.id : undefined,
      addressLabel: type === "delivery" ? addr?.label : undefined,
      status: "pending",
    };
    setActiveOrder(order);
    setCart([]);
    return order;
  };

  /* Auto-advance the active order through its lifecycle every 7s */
  useEffect(() => {
    if (!activeOrder) return;
    const flow = activeOrder.type === "pickup" ? STATUS_FLOW_PICKUP : STATUS_FLOW_DELIVERY;
    const idx = flow.indexOf(activeOrder.status);
    if (idx < 0 || idx >= flow.length - 1) return;
    const next = flow[idx + 1];
    advanceTimer.current = window.setTimeout(() => {
      setActiveOrder((o) => (o ? { ...o, status: next } : o));
    }, 7000);
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, [activeOrder]);

  /* When delivered, push to history */
  useEffect(() => {
    if (activeOrder && activeOrder.status === "delivered") {
      setOrderHistory((h) => [activeOrder, ...h]);
    }
  }, [activeOrder]);

  const advanceOrder = () => {
    if (!activeOrder) return;
    const flow = activeOrder.type === "pickup" ? STATUS_FLOW_PICKUP : STATUS_FLOW_DELIVERY;
    const i = flow.indexOf(activeOrder.status);
    if (i < flow.length - 1) {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      setActiveOrder((o) => (o ? { ...o, status: flow[i + 1] } : o));
    }
  };

  const rateOrder: AppState["rateOrder"] = (orderId, restaurant, delivery, comment) => {
    const rated = { restaurant, delivery, comment };
    setOrderHistory((h) => h.map((o) => (o.id === orderId ? { ...o, rated } : o)));
    if (activeOrder?.id === orderId) {
      setActiveOrder({ ...activeOrder, rated });
    }
    toast("Thanks for the feedback");
  };

  /* Misc actions */
  const toggleFavourite: AppState["toggleFavourite"] = (slug) => {
    setFavourites((prev) => {
      const on = prev.includes(slug);
      toast(on ? "Removed from favourites" : "Saved to favourites");
      return on ? prev.filter((s) => s !== slug) : [...prev, slug];
    });
  };

  const selectAddress = (id: string) => setSelectedAddressId(id);
  const addAddress: AppState["addAddress"] = (a) => {
    const newAddr = { ...a, id: "addr-" + Date.now() };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    toast("Address saved");
  };

  const selectPayment = (id: string) => setSelectedPaymentId(id);
  const addPayment: AppState["addPayment"] = (p) => {
    const np = { ...p, id: "pm-" + Date.now() };
    setPaymentMethods((prev) => [...prev, np]);
    setSelectedPaymentId(np.id);
    toast("Payment method added");
  };

  const signIn: AppState["signIn"] = (u) => {
    setUser(u);
    toast(`Welcome, ${u.name.split(" ")[0]}`);
  };
  const signOut = () => {
    setUser(null);
    toast("Signed out");
  };

  const markNotificationsRead = () => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  };

  const value = useMemo<AppState>(
    () => ({
      user,
      signIn,
      signOut,
      addresses,
      selectedAddressId,
      selectAddress,
      addAddress,
      paymentMethods,
      selectedPaymentId,
      selectPayment,
      addPayment,
      favourites,
      toggleFavourite,
      cart,
      cartRestaurantSlug,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      activeOrder,
      orderHistory,
      placeOrder,
      rateOrder,
      advanceOrder,
      notifications,
      markNotificationsRead,
      toasts,
      toast,
      route,
      navigate,
      goBack,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user, addresses, selectedAddressId, paymentMethods, selectedPaymentId,
      favourites, cart, activeOrder, orderHistory, notifications,
      toasts, route,
    ],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
