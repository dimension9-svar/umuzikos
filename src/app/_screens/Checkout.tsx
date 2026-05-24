"use client";

import { useMemo, useState } from "react";
import { calcFees, fmt, useApp, type OrderType } from "../_components/state";
import { AppBar, Check, ImgSlot } from "../_components/ui";

/* ───────────────────────── S-030 Cart ───────────────────────── */

export function CartScreen() {
  const { cart, updateCartQty, removeFromCart, clearCart, navigate, addresses, selectedAddressId } = useApp();
  const addr = addresses.find((a) => a.id === selectedAddressId);
  const distance = addr?.distanceKm ?? 3.2;
  const subtotal = cart.reduce((n, l) => n + (l.item.price + (l.optionsExtra ?? 0)) * l.qty, 0);
  const { deliveryFee, serviceFee } = calcFees(subtotal, distance, "delivery");
  const total = subtotal + deliveryFee + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="screen">
        <AppBar title="Cart" onBack={() => navigate("/home")} />
        <div className="screen-body">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--md-sys-color-surface-container)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--md-sys-color-on-surface-variant)" }}><path d="M6 6h15l-1.5 9h-12L4 3H2" /><circle cx={9} cy={20} r={1.5} /><circle cx={18} cy={20} r={1.5} /></svg>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Your cart is empty.</div>
            <div className="muted" style={{ fontSize: 14, maxWidth: "28ch", margin: "0 auto 24px" }}>Pick one of the seven kitchens and add a dish.</div>
            <button className="btn btn-lg btn-primary" onClick={() => navigate("/home")}>Browse kitchens</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <AppBar
        title="Cart"
        onBack={() => navigate(`/r/${cart[0].restaurantSlug}`)}
        actions={
          <button className="ab-icon" onClick={() => { clearCart(); }} aria-label="Clear">
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" /></svg>
          </button>
        }
      />
      <div className="screen-body">
        <div className="screen-pad">
          <div className="cart-card">
            <div className="restaurant-name">{cart[0].restaurantName}</div>
            {cart.map((l, i) => (
              <div key={i} className="cart-line-row">
                <div>
                  <div className="name">{l.item.name}</div>
                  {l.options && l.options.length > 0 && (
                    <div className="opts">{l.options.join(", ")}</div>
                  )}
                  {l.notes && <div className="opts" style={{ fontStyle: "italic" }}>“{l.notes}”</div>}
                  <button onClick={() => removeFromCart(i)} style={{ color: "var(--md-sys-color-on-surface-variant)", fontSize: 12, fontWeight: 700, marginTop: 4 }}>Remove</button>
                </div>
                <div className="qty">
                  <button onClick={() => updateCartQty(i, l.qty - 1)} aria-label="Decrease">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => updateCartQty(i, l.qty + 1)} aria-label="Increase">+</button>
                </div>
                <div className="price">{fmt((l.item.price + (l.optionsExtra ?? 0)) * l.qty)}</div>
              </div>
            ))}
            <button onClick={() => navigate(`/r/${cart[0].restaurantSlug}`)} style={{ color: "var(--md-sys-color-primary)", fontWeight: 700, fontSize: 13, marginTop: 8 }}>
              + Add more from {cart[0].restaurantName}
            </button>
          </div>

          <div className="totals">
            <div className="row"><span>Subtotal</span><span className="r">{fmt(subtotal)}</span></div>
            <div className="row"><span>Delivery ({distance.toFixed(1)} km)</span><span className="r">{fmt(deliveryFee)}</span></div>
            <div className="row"><span>Service fee (5%, capped R 5–R 25)</span><span className="r">{fmt(serviceFee)}</span></div>
            <div className="row total"><span>Total</span><span className="r">{fmt(total)}</span></div>
          </div>

          <div style={{ height: 16 }} />
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-lg btn-primary" style={{ width: "100%" }} onClick={() => navigate("/checkout")}>
          Continue to checkout · {fmt(total)}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-031 Checkout ───────────────────────── */

export function CheckoutScreen() {
  const { cart, addresses, selectedAddressId, selectAddress, navigate } = useApp();
  const [type, setType] = useState<OrderType>("delivery");
  const [when, setWhen] = useState<"now" | "later">("now");
  const [instructions, setInstructions] = useState("");

  const addr = addresses.find((a) => a.id === selectedAddressId);
  const distance = addr?.distanceKm ?? 3.2;
  const subtotal = cart.reduce((n, l) => n + (l.item.price + (l.optionsExtra ?? 0)) * l.qty, 0);
  const { deliveryFee, serviceFee } = calcFees(subtotal, distance, type);
  const total = subtotal + deliveryFee + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="screen">
        <AppBar title="Checkout" />
        <div className="screen-body"><div className="screen-pad">No items in cart — <button onClick={() => navigate("/home")} style={{ color: "var(--md-sys-color-primary)", fontWeight: 700 }}>browse</button>.</div></div>
      </div>
    );
  }

  return (
    <div className="screen">
      <AppBar title="Checkout" onBack={() => navigate("/cart")} />
      <div className="screen-body">
        <div className="screen-pad">
          {/* Type switch */}
          <div className="seg-row" role="tablist">
            <button className={`seg${type === "delivery" ? " is-active" : ""}`} onClick={() => setType("delivery")}>
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={6} cy={18} r={2.5} /><circle cx={18} cy={18} r={2.5} /><path d="M6 18l3-9h7l3 9M9 9l-2-4H4" /></svg>
              Delivery
            </button>
            <button className={`seg${type === "pickup" ? " is-active" : ""}`} onClick={() => setType("pickup")}>
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1 12H6L5 7z" /><path d="M9 7V4h6v3" /></svg>
              Pickup
            </button>
          </div>

          {/* When */}
          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>When</h3>
          <div className="seg-row">
            <button className={`seg${when === "now" ? " is-active" : ""}`} onClick={() => setWhen("now")}>ASAP · ~25 min</button>
            <button className={`seg${when === "later" ? " is-active" : ""}`} onClick={() => { setWhen("later"); navigate("/schedule"); }}>Schedule…</button>
          </div>

          {/* Address picker (delivery only) */}
          {type === "delivery" && (
            <>
              <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Delivery address</h3>
              {addresses.map((a) => {
                const sel = a.id === selectedAddressId;
                return (
                  <button key={a.id} className={`opt-row${sel ? " is-selected" : ""}`} onClick={() => selectAddress(a.id)}>
                    <div className="head">
                      <div className="ico">
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx={12} cy={10} r={3} /></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{a.label}</div>
                        <div className="meta">{a.street}, {a.suburb} · {a.distanceKm.toFixed(1)} km from waterfront</div>
                      </div>
                    </div>
                    <span className="check">{sel && <Check />}</span>
                  </button>
                );
              })}
              <button className="btn btn-sm btn-text" style={{ marginTop: 6 }} onClick={() => navigate("/addresses")}>+ Add new address</button>
            </>
          )}

          {type === "pickup" && (
            <div style={{ marginTop: 16, padding: 16, background: "var(--md-sys-color-surface-container)", borderRadius: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Pickup at the waterfront</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {cart[0].restaurantName}, Lake Umuzi Waterfront. You&apos;ll get a QR code to show the kitchen on collection.
              </div>
            </div>
          )}

          {/* Instructions */}
          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
            {type === "delivery" ? "Notes for the rider" : "Notes for the kitchen"}
          </h3>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value.slice(0, 200))}
            placeholder={type === "delivery" ? "Blue gate, ring twice. Dog is friendly." : "Please pack utensils."}
            style={{ width: "100%", height: 72, padding: 12, border: "1.5px solid var(--md-sys-color-outline)", borderRadius: 8, fontFamily: "inherit", fontSize: 14, outline: 0, resize: "vertical" }}
          />

          {/* Totals */}
          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Order total</h3>
          <div className="totals">
            <div className="row"><span>Subtotal</span><span className="r">{fmt(subtotal)}</span></div>
            {type === "delivery" ? (
              <div className="row"><span>Delivery ({distance.toFixed(1)} km)</span><span className="r">{fmt(deliveryFee)}</span></div>
            ) : (
              <div className="row"><span>Pickup</span><span className="r">Free</span></div>
            )}
            <div className="row"><span>Service fee (5%)</span><span className="r">{fmt(serviceFee)}</span></div>
            <div className="row total"><span>Total</span><span className="r">{fmt(total)}</span></div>
          </div>

          <div style={{ height: 16 }} />
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-lg btn-primary" style={{ width: "100%" }} onClick={() => navigate("/payment")}>
          Continue to payment
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-032 Payment Method ───────────────────────── */

export function PaymentScreen() {
  const { cart, paymentMethods, selectedPaymentId, selectPayment, addresses, selectedAddressId, placeOrder, navigate } = useApp();
  const [tip, setTip] = useState<number>(0);
  const [type] = useState<OrderType>("delivery"); // assume from prev step; default delivery
  const addr = addresses.find((a) => a.id === selectedAddressId);
  const distance = addr?.distanceKm ?? 3.2;
  const subtotal = cart.reduce((n, l) => n + (l.item.price + (l.optionsExtra ?? 0)) * l.qty, 0);
  const { deliveryFee, serviceFee } = calcFees(subtotal, distance, type);
  const total = subtotal + deliveryFee + serviceFee + tip;

  const onPay = () => {
    const o = placeOrder({ type, paymentMethodId: selectedPaymentId, tip });
    navigate(type === "pickup" ? `/order/${o.id}/pickup` : `/order/${o.id}/confirmed`);
  };

  if (cart.length === 0) {
    return (
      <div className="screen">
        <AppBar title="Payment" />
        <div className="screen-body"><div className="screen-pad">No items in cart.</div></div>
      </div>
    );
  }

  return (
    <div className="screen">
      <AppBar title="Payment" onBack={() => navigate("/checkout")} />
      <div className="screen-body">
        <div className="screen-pad">
          <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Pay with</h3>
          {paymentMethods.map((p) => {
            const sel = p.id === selectedPaymentId;
            return (
              <button key={p.id} className={`opt-row${sel ? " is-selected" : ""}`} onClick={() => selectPayment(p.id)}>
                <div className="head">
                  <div className="ico">
                    {p.type === "card" && (
                      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={13} rx={2} /><path d="M3 10h18M7 15h3" /></svg>
                    )}
                    {p.type === "snapscan" && (
                      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={4} width={7} height={7} rx={1} /><rect x={13} y={4} width={7} height={7} rx={1} /><rect x={4} y={13} width={7} height={7} rx={1} /><rect x={13} y={13} width={3} height={3} /><rect x={17} y={17} width={3} height={3} /></svg>
                    )}
                    {p.type === "ozow" && (
                      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" /><path d="M3 7l9 4 9-4M12 11v10" /></svg>
                    )}
                    {p.type === "cash" && (
                      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={6} width={18} height={12} rx={2} /><circle cx={12} cy={12} r={3} /></svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                    {p.meta && <div className="meta">{p.meta}</div>}
                  </div>
                </div>
                <span className="check">{sel && <Check />}</span>
              </button>
            );
          })}
          <button className="btn btn-sm btn-text" style={{ marginTop: 8 }} onClick={() => navigate("/payments")}>+ Add new method</button>

          {/* Tip */}
          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Tip the rider</h3>
          <div className="tip-row">
            {[0, 500, 1000, 2000].map((c) => (
              <button key={c} className={tip === c ? "is-selected" : ""} onClick={() => setTip(c)}>{c === 0 ? "No tip" : fmt(c)}</button>
            ))}
            <button onClick={() => setTip(5000)} className={tip === 5000 ? "is-selected" : ""}>{fmt(5000)}</button>
          </div>

          {/* Totals */}
          <div className="totals" style={{ marginTop: 24 }}>
            <div className="row"><span>Subtotal</span><span className="r">{fmt(subtotal)}</span></div>
            <div className="row"><span>Delivery</span><span className="r">{fmt(deliveryFee)}</span></div>
            <div className="row"><span>Service fee</span><span className="r">{fmt(serviceFee)}</span></div>
            {tip > 0 && <div className="row"><span>Tip</span><span className="r">{fmt(tip)}</span></div>}
            <div className="row total"><span>Total</span><span className="r">{fmt(total)}</span></div>
          </div>

          <div style={{ height: 16 }} />
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-lg btn-primary" style={{ width: "100%" }} onClick={onPay}>
          Place order · {fmt(total)}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-033 Order Confirmed ───────────────────────── */

export function OrderConfirmedScreen({ orderId }: { orderId: string }) {
  const { activeOrder, navigate } = useApp();
  const order = activeOrder?.id === orderId ? activeOrder : null;
  return (
    <div className="screen">
      <div className="confirmed">
        <div className="tick">
          <svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1>Order placed.</h1>
        <span className="ord-num">{orderId}</span>
        <p>
          {order?.restaurantName} is confirming your order. We&apos;ll text you when it&apos;s in the kitchen.
        </p>
      </div>
      <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn btn-lg btn-primary" onClick={() => navigate(`/order/${orderId}/track`)}>Track order</button>
        <button className="btn btn-lg btn-outlined" onClick={() => navigate(`/order/${orderId}`)}>View receipt</button>
        <button className="btn btn-text" onClick={() => navigate("/home")}>Back to home</button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-034 Pickup Confirmation ───────────────────────── */

export function PickupScreen({ orderId }: { orderId: string }) {
  const { activeOrder, navigate } = useApp();
  const order = activeOrder?.id === orderId ? activeOrder : null;
  return (
    <div className="screen">
      <AppBar title="Pickup ready" onBack={() => navigate("/home")} />
      <div className="screen-body">
        <div className="screen-pad" style={{ textAlign: "center" }}>
          <p className="muted" style={{ fontSize: 14, margin: "8px 0 20px" }}>
            Show this code at <b style={{ color: "var(--md-sys-color-on-surface)" }}>{order?.restaurantName}</b> at the waterfront.
          </p>
          <div style={{
            width: 220, height: 220, margin: "0 auto",
            background: `
              repeating-linear-gradient(0deg, #0A0A0A 0 8px, transparent 8px 16px),
              repeating-linear-gradient(90deg, #0A0A0A 0 8px, transparent 8px 16px),
              #FFFFFF
            `,
            border: "2px solid #0A0A0A", borderRadius: 8, position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 24, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 14, fontWeight: 700 }}>QR · {orderId.slice(-4)}</span>
            </div>
          </div>
          <div style={{ marginTop: 16, fontFamily: "ui-monospace, monospace", fontSize: 13, background: "var(--md-sys-color-surface-container)", display: "inline-block", padding: "6px 12px", borderRadius: 999 }}>
            {orderId}
          </div>

          <div style={{ marginTop: 24, textAlign: "left", padding: 16, border: "1px solid var(--md-sys-color-outline-variant)", borderRadius: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Your order</div>
            {order?.items.map((l, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                <span>{l.qty} × {l.item.name}</span>
                <span>{fmt((l.item.price + (l.optionsExtra ?? 0)) * l.qty)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", borderTop: "1px solid var(--md-sys-color-outline-variant)", marginTop: 8, fontWeight: 700 }}>
              <span>Total</span><span>{order ? fmt(order.total) : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-lg btn-outlined" style={{ width: "100%" }} onClick={() => navigate("/home")}>Back to home</button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-035 Schedule Order ───────────────────────── */

export function ScheduleScreen() {
  const { navigate, toast } = useApp();
  const slots = ["12:00–12:30", "12:30–13:00", "13:00–13:30", "13:30–14:00", "18:00–18:30", "18:30–19:00", "19:00–19:30", "19:30–20:00", "20:00–20:30"];
  const days = ["Today", "Tomorrow", "Sat 25 May", "Sun 26 May", "Mon 27 May"];
  const [day, setDay] = useState(days[1]);
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <div className="screen">
      <AppBar title="Schedule order" onBack={() => navigate("/checkout")} />
      <div className="screen-body">
        <div className="screen-pad">
          <p className="muted" style={{ fontSize: 13, margin: "0 0 16px" }}>
            Pick a day and 30-minute slot. We&apos;ll fire the order so it arrives within that window.
          </p>

          <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Day</h3>
          <div className="cuisine-row" style={{ margin: 0, padding: 0 }}>
            {days.map((d) => (
              <button key={d} className={`cuisine-chip${d === day ? " is-active" : ""}`} onClick={() => setDay(d)}>{d}</button>
            ))}
          </div>

          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Time slot</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                style={{
                  height: 48, padding: "0 12px",
                  border: `1.5px solid ${slot === s ? "var(--md-sys-color-on-surface)" : "var(--md-sys-color-outline-variant)"}`,
                  background: slot === s ? "var(--md-sys-color-on-surface)" : "var(--md-sys-color-surface)",
                  color: slot === s ? "var(--md-sys-color-surface)" : "var(--md-sys-color-on-surface)",
                  borderRadius: 8, fontWeight: 700, fontSize: 13,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-lg btn-primary" style={{ width: "100%" }} disabled={!slot} onClick={() => { toast(`Scheduled for ${day}, ${slot}`); navigate("/checkout"); }}>
          {slot ? `Schedule for ${day}, ${slot}` : "Pick a time slot"}
        </button>
      </div>
    </div>
  );
}
