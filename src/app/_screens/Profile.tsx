"use client";

import { useState } from "react";
import { RESTAURANTS } from "../_components/data";
import { fmt, useApp, type Order } from "../_components/state";
import { AppBar, Check, ChevRight, HeartIcon, ImgSlot, StarIcon, statusFlowLabel, timeAgo } from "../_components/ui";

/* ───────────────────────── S-050 Profile ───────────────────────── */

export function ProfileScreen() {
  const { user, navigate, signOut, orderHistory, favourites } = useApp();
  const initials = (user?.name || "DD").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="screen">
      <div className="app-bar"><div className="ab-title left">Profile</div></div>
      <div className="screen-body">
        <div className="screen-pad" style={{ paddingTop: 8 }}>
          <div className="profile-card">
            <div className="av">{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="name">{user?.name || "Guest"}</div>
              <div className="meta">{user?.phone || "+27 …"} · {user?.email || ""}</div>
            </div>
            <button className="ab-icon" aria-label="Edit profile" onClick={() => navigate("/settings")}>
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 16, padding: "12px 14px", background: "var(--md-sys-color-surface-container)", borderRadius: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>{orderHistory.length}</div>
              <div className="muted" style={{ fontSize: 11 }}>Orders</div>
            </div>
            <div style={{ textAlign: "center", borderLeft: "1px solid var(--md-sys-color-outline-variant)", borderRight: "1px solid var(--md-sys-color-outline-variant)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>{favourites.length}</div>
              <div className="muted" style={{ fontSize: 11 }}>Favourites</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>4.8</div>
              <div className="muted" style={{ fontSize: 11 }}>Avg rating</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12L4 3H2" /><circle cx={9} cy={20} r={1.5} /><circle cx={18} cy={20} r={1.5} /></svg>}
                 title="Order history" subtitle={`${orderHistory.length} past orders`} onClick={() => navigate("/orders")} />
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx={12} cy={10} r={3} /></svg>}
                 title="Saved addresses" subtitle="Home, Work" onClick={() => navigate("/addresses")} />
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={13} rx={2} /><path d="M3 10h18M7 15h3" /></svg>}
                 title="Payment methods" subtitle="Visa, SnapScan, Ozow, Cash" onClick={() => navigate("/payments")} />
            <Row icon={<HeartIcon filled={false} />}
                 title="Favourites" subtitle={`${favourites.length} kitchens`} onClick={() => navigate("/favourites")} />
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3V8z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>}
                 title="Notifications" onClick={() => navigate("/notifications")} />
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={9} /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></svg>}
                 title="Help centre" onClick={() => navigate("/help")} />
            <Row icon={<svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>}
                 title="Settings" onClick={() => navigate("/settings")} />
          </div>

          <button className="btn btn-lg btn-outlined" style={{ width: "100%", marginTop: 20 }} onClick={() => { signOut(); navigate("/welcome/1"); }}>
            Sign out
          </button>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

function Row({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle?: string; onClick: () => void }) {
  return (
    <button className="list-row" onClick={onClick}>
      <div className="ico">{icon}</div>
      <div className="info">
        <div className="l1">{title}</div>
        {subtitle && <div className="l2">{subtitle}</div>}
      </div>
      <div className="chev"><ChevRight /></div>
    </button>
  );
}

/* ───────────────────────── S-051 Order History ───────────────────────── */

export function OrderHistoryScreen() {
  const { orderHistory, activeOrder, navigate } = useApp();
  return (
    <div className="screen">
      <div className="app-bar"><div className="ab-title left">Orders</div></div>
      <div className="screen-body">
        <div className="screen-pad">
          {activeOrder && (
            <button className="order-card" style={{ borderColor: "var(--md-sys-color-primary)", background: "var(--md-sys-color-primary-container)" }} onClick={() => navigate(`/order/${activeOrder.id}/track`)}>
              <div className="top">
                <span className="restaurant">{activeOrder.restaurantName}</span>
                <span className="badge badge-success"><span className="dot" /> {statusFlowLabel(activeOrder.status)}</span>
              </div>
              <div className="items-summary">In progress · {activeOrder.items.length} item{activeOrder.items.length === 1 ? "" : "s"}</div>
              <div className="bottom">
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{activeOrder.id}</span>
                <span className="total">{fmt(activeOrder.total)}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--md-sys-color-on-primary-container)", fontWeight: 700, marginTop: 4 }}>Tap to track →</div>
            </button>
          )}

          <div style={{ marginTop: activeOrder ? 16 : 0, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)" }}>
            Past orders
          </div>
          <div style={{ marginTop: 8 }}>
            {orderHistory.map((o) => (
              <button key={o.id} className="order-card" onClick={() => navigate(`/order/${o.id}`)}>
                <div className="top">
                  <span className="restaurant">{o.restaurantName}</span>
                  <span className="when">{timeAgo(o.placedAt)}</span>
                </div>
                <div className="items-summary">{o.items.map((l) => `${l.qty}× ${l.item.name}`).join(", ")}</div>
                <div className="bottom">
                  <span className="badge" style={{ background: "var(--md-sys-color-surface-container)", color: "var(--md-sys-color-on-surface)", border: 0 }}>
                    {o.type === "pickup" ? "Pickup" : "Delivered"}
                    {o.rated ? ` · ★ ${o.rated.restaurant}` : ""}
                  </span>
                  <span className="total">{fmt(o.total)}</span>
                </div>
              </button>
            ))}
          </div>

          {orderHistory.length === 0 && !activeOrder && (
            <div style={{ textAlign: "center", padding: 32, color: "var(--md-sys-color-on-surface-variant)" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>No orders yet.</div>
              <button className="btn btn-md btn-primary" onClick={() => navigate("/home")}>Order something</button>
            </div>
          )}

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-052 Order Detail ───────────────────────── */

export function OrderDetailScreen({ orderId }: { orderId: string }) {
  const { activeOrder, orderHistory, navigate, addToCart, toast } = useApp();
  const order: Order | undefined = activeOrder?.id === orderId ? activeOrder : orderHistory.find((o) => o.id === orderId);
  if (!order) {
    return <div className="screen"><AppBar title="Order" /><div className="screen-body"><div className="screen-pad">Order not found.</div></div></div>;
  }
  const reorder = () => {
    const r = RESTAURANTS.find((x) => x.slug === order.restaurantSlug);
    if (!r) return;
    order.items.forEach((l) => addToCart(r, l.item, l.qty, { options: l.options, optionsExtra: l.optionsExtra, notes: l.notes }));
    navigate("/cart");
  };
  return (
    <div className="screen">
      <AppBar title="Order" />
      <div className="screen-body">
        <div className="screen-pad">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, background: "var(--md-sys-color-surface-container)", padding: "6px 10px", borderRadius: 999 }}>{order.id}</span>
            <span className="muted" style={{ fontSize: 12 }}>{new Date(order.placedAt).toLocaleString()}</span>
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", margin: "0 0 4px" }}>{order.restaurantName}</h2>
          <span className="badge" style={{ background: order.status === "delivered" ? "var(--md-sys-color-success-container)" : "var(--md-sys-color-primary-container)", color: order.status === "delivered" ? "var(--md-sys-color-on-success-container)" : "var(--md-sys-color-on-primary-container)", border: 0 }}>
            <span className="dot" style={{ background: order.status === "delivered" ? "var(--md-sys-color-success)" : "var(--md-sys-color-primary)" }} />
            {statusFlowLabel(order.status)} · {order.type}
          </span>

          <div style={{ marginTop: 16, padding: 14, border: "1px solid var(--md-sys-color-outline-variant)", borderRadius: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Items</div>
            {order.items.map((l, i) => (
              <div key={i} style={{ padding: "8px 0", borderTop: i > 0 ? "1px solid var(--md-sys-color-outline-variant)" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span>{l.qty} × {l.item.name}</span>
                  <span style={{ fontWeight: 700 }}>{fmt((l.item.price + (l.optionsExtra ?? 0)) * l.qty)}</span>
                </div>
                {l.options && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{l.options.join(", ")}</div>}
              </div>
            ))}
          </div>

          <div className="totals" style={{ marginTop: 12 }}>
            <div className="row"><span>Subtotal</span><span className="r">{fmt(order.subtotal)}</span></div>
            {order.deliveryFee > 0 && <div className="row"><span>Delivery</span><span className="r">{fmt(order.deliveryFee)}</span></div>}
            <div className="row"><span>Service fee</span><span className="r">{fmt(order.serviceFee)}</span></div>
            {order.tip > 0 && <div className="row"><span>Tip</span><span className="r">{fmt(order.tip)}</span></div>}
            <div className="row total"><span>Total</span><span className="r">{fmt(order.total)}</span></div>
          </div>

          <div style={{ marginTop: 12, padding: 12, background: "var(--md-sys-color-surface-container)", borderRadius: 12, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
              <span className="muted">Paid via</span><span style={{ fontWeight: 700 }}>{order.paymentMethodLabel}</span>
            </div>
            {order.addressLabel && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span className="muted">Delivered to</span><span style={{ fontWeight: 700 }}>{order.addressLabel}</span>
              </div>
            )}
          </div>

          {order.rated && (
            <div style={{ marginTop: 12, padding: 12, border: "1px solid var(--md-sys-color-outline-variant)", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                You rated <span style={{ display: "inline-flex", gap: 1, color: "var(--md-sys-color-primary)" }}>
                  {[1,2,3,4,5].map((i) => <StarIcon key={i} size={12} on={i <= order.rated!.restaurant} />)}
                </span>
              </div>
              {order.rated.comment && <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>“{order.rated.comment}”</div>}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn btn-md btn-outlined" style={{ flex: 1 }} onClick={() => { toast("Help conversation opened (prototype)"); }}>Help</button>
            {!order.rated && order.status === "delivered" && (
              <button className="btn btn-md btn-outlined" style={{ flex: 1 }} onClick={() => navigate(`/order/${order.id}/rate`)}>Rate</button>
            )}
            <button className="btn btn-md btn-primary" style={{ flex: 1 }} onClick={reorder}>Reorder</button>
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-053 Saved Addresses ───────────────────────── */

export function AddressesScreen() {
  const { addresses, selectedAddressId, selectAddress, addAddress, navigate } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [instr, setInstr] = useState("");

  return (
    <div className="screen">
      <AppBar title="Addresses" />
      <div className="screen-body">
        <div className="screen-pad">
          {addresses.map((a) => {
            const sel = a.id === selectedAddressId;
            return (
              <button key={a.id} className={`opt-row${sel ? " is-selected" : ""}`} onClick={() => selectAddress(a.id)}>
                <div className="head">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx={12} cy={10} r={3} /></svg>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{a.label}</div>
                    <div className="meta">{a.street}, {a.suburb}</div>
                    {a.instructions && <div className="meta" style={{ fontStyle: "italic" }}>“{a.instructions}”</div>}
                  </div>
                </div>
                <span className="check">{sel && <Check />}</span>
              </button>
            );
          })}

          {showForm ? (
            <div style={{ marginTop: 16, padding: 16, border: "1px solid var(--md-sys-color-outline-variant)", borderRadius: 12 }}>
              <div className="field"><label>Label</label><input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home / Work / Mom's" /></div>
              <div className="field"><label>Street</label><input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="12 Main Road" /></div>
              <div className="field"><label>Suburb</label><input value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Bracken" /></div>
              <div className="field"><label>Instructions (optional)</label><input value={instr} onChange={(e) => setInstr(e.target.value)} placeholder="Blue gate, ring twice" /></div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-md btn-outlined" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
                <button
                  className="btn btn-md btn-primary"
                  style={{ flex: 1 }}
                  disabled={!label || !street || !suburb}
                  onClick={() => {
                    addAddress({ label, street, suburb, city: "Secunda", instructions: instr || undefined, distanceKm: 3 + Math.random() * 4 });
                    setShowForm(false);
                    setLabel(""); setStreet(""); setSuburb(""); setInstr("");
                  }}
                >
                  Save address
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-lg btn-outlined" style={{ width: "100%", marginTop: 16 }} onClick={() => setShowForm(true)}>
              + Add new address
            </button>
          )}

          <div style={{ marginTop: 24, padding: 12, background: "var(--md-sys-color-surface-container)", borderRadius: 12, fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", lineHeight: 1.5 }}>
            UmuziKos delivers within an 8 km radius of the Lake Umuzi Waterfront. Addresses beyond the zone will be flagged at checkout.
          </div>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-054 Payment Methods ───────────────────────── */

export function PaymentMethodsScreen() {
  const { paymentMethods, selectedPaymentId, selectPayment, addPayment } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [num, setNum] = useState("");
  return (
    <div className="screen">
      <AppBar title="Payment methods" />
      <div className="screen-body">
        <div className="screen-pad">
          {paymentMethods.map((p) => {
            const sel = p.id === selectedPaymentId;
            return (
              <button key={p.id} className={`opt-row${sel ? " is-selected" : ""}`} onClick={() => selectPayment(p.id)}>
                <div className="head">
                  <div className="ico">
                    {p.type === "card" && <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={13} rx={2} /><path d="M3 10h18M7 15h3" /></svg>}
                    {p.type === "snapscan" && <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={4} width={7} height={7} rx={1} /><rect x={13} y={4} width={7} height={7} rx={1} /><rect x={4} y={13} width={7} height={7} rx={1} /></svg>}
                    {p.type === "ozow" && <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" /></svg>}
                    {p.type === "cash" && <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={12} rx={2} /><circle cx={12} cy={12} r={3} /></svg>}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                    {p.meta && <div className="meta">{p.meta}</div>}
                  </div>
                </div>
                <span className="check">{sel && <Check />}</span>
              </button>
            );
          })}

          {showForm ? (
            <div style={{ marginTop: 16, padding: 16, border: "1px solid var(--md-sys-color-outline-variant)", borderRadius: 12 }}>
              <div className="field"><label>Card number</label><input value={num} onChange={(e) => setNum(e.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: "flex", gap: 8 }}>
                <div className="field" style={{ flex: 1 }}><label>Expires</label><input placeholder="MM/YY" /></div>
                <div className="field" style={{ flex: 1 }}><label>CVV</label><input placeholder="123" /></div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-md btn-outlined" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-md btn-primary" style={{ flex: 1 }} disabled={num.length < 4} onClick={() => {
                  const last4 = num.replace(/\D/g, "").slice(-4) || "0000";
                  addPayment({ type: "card", label: `Visa ending ${last4}`, meta: "Saved via Paystack" });
                  setShowForm(false); setNum("");
                }}>Save card</button>
              </div>
              <div style={{ fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", marginTop: 12, lineHeight: 1.4 }}>
                Tokenised via Paystack — UmuziKos never sees your full card number.
              </div>
            </div>
          ) : (
            <button className="btn btn-lg btn-outlined" style={{ width: "100%", marginTop: 16 }} onClick={() => setShowForm(true)}>
              + Add new card
            </button>
          )}
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-055 Settings ───────────────────────── */

export function SettingsScreen() {
  const { user, navigate, signOut, toast } = useApp();
  const [push, setPush] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);
  const [biometric, setBiometric] = useState(true);

  const Toggle = ({ on, title, subtitle, onToggle }: { on: boolean; title: string; subtitle?: string; onToggle: () => void }) => (
    <div className="settings-row">
      <div className="info"><div className="l1">{title}</div>{subtitle && <div className="l2">{subtitle}</div>}</div>
      <button className={`toggle${on ? " is-on" : ""}`} onClick={onToggle} aria-label={`${title} toggle`} />
    </div>
  );

  return (
    <div className="screen">
      <AppBar title="Settings" />
      <div className="screen-body">
        <div className="screen-pad">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)", margin: "8px 0" }}>Account</h3>
          <div className="settings-row">
            <div className="info"><div className="l1">Name</div><div className="l2">{user?.name}</div></div>
            <button className="chev" onClick={() => toast("Open name edit (prototype)")}><ChevRight /></button>
          </div>
          <div className="settings-row">
            <div className="info"><div className="l1">Phone</div><div className="l2">{user?.phone}</div></div>
            <button className="chev" onClick={() => toast("Open phone edit (prototype)")}><ChevRight /></button>
          </div>
          <div className="settings-row">
            <div className="info"><div className="l1">Email</div><div className="l2">{user?.email}</div></div>
            <button className="chev" onClick={() => toast("Open email edit (prototype)")}><ChevRight /></button>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)", margin: "24px 0 0" }}>Notifications</h3>
          <Toggle on={push} title="Push notifications" subtitle="Order status, rider chat" onToggle={() => setPush(!push)} />
          <Toggle on={whatsapp} title="WhatsApp updates" subtitle="Updates via WhatsApp Business" onToggle={() => setWhatsapp(!whatsapp)} />
          <Toggle on={marketing} title="Promo messages" subtitle="New kitchens, deals, weekly menu" onToggle={() => setMarketing(!marketing)} />

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--md-sys-color-on-surface-variant)", margin: "24px 0 0" }}>Security</h3>
          <Toggle on={biometric} title="Face ID for sign-in" onToggle={() => setBiometric(!biometric)} />
          <button className="list-row" onClick={() => toast("Privacy policy (prototype)")}>
            <div className="info"><div className="l1">Privacy & POPIA</div><div className="l2">South African data protection</div></div>
            <div className="chev"><ChevRight /></div>
          </button>
          <button className="list-row" onClick={() => toast("Data deletion requested (prototype)")}>
            <div className="info"><div className="l1">Delete my data</div><div className="l2">POPIA-compliant deletion request</div></div>
            <div className="chev"><ChevRight /></div>
          </button>

          <button className="btn btn-lg btn-outlined" style={{ width: "100%", marginTop: 24 }} onClick={() => { signOut(); navigate("/welcome/1"); }}>Sign out</button>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── S-056 Favourites ───────────────────────── */

export function FavouritesScreen() {
  const { favourites, navigate, toggleFavourite } = useApp();
  const list = RESTAURANTS.filter((r) => favourites.includes(r.slug));
  return (
    <div className="screen">
      <div className="app-bar"><div className="ab-title left">Favourites</div></div>
      <div className="screen-body">
        <div className="screen-pad">
          {list.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "var(--md-sys-color-on-surface-variant)" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--md-sys-color-surface-container)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "var(--md-sys-color-on-surface-variant)" }}>
                <HeartIcon filled={false} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>No favourites yet.</div>
              <p className="muted" style={{ fontSize: 13, maxWidth: "28ch", margin: "0 auto 16px" }}>Tap the heart on any kitchen to save it for quick re-ordering.</p>
              <button className="btn btn-md btn-primary" onClick={() => navigate("/home")}>Browse kitchens</button>
            </div>
          ) : (
            <div className="r-list">
              {list.map((r) => (
                <button key={r.slug} className="r-tile" onClick={() => navigate(`/r/${r.slug}`)}>
                  <div className="media">
                    <ImgSlot label={r.name} radius={0} />
                    <button className="fav is-on" onClick={(e) => { e.stopPropagation(); toggleFavourite(r.slug); }} aria-label="Remove favourite">
                      <HeartIcon filled />
                    </button>
                  </div>
                  <div className="body">
                    <div className="head"><div className="name">{r.name}</div><div className="rating"><StarIcon />{r.rating.toFixed(1)}</div></div>
                    <div className="sub">{r.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}
