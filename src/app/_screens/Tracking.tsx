"use client";

import { useEffect, useRef, useState } from "react";
import { fmt, useApp, type Order } from "../_components/state";
import { AppBar, Check, ImgSlot, StarIcon, statusFlowLabel } from "../_components/ui";

/* ───────────────────────── S-040 Live Tracking ───────────────────────── */

const DELIVERY_FLOW = ["pending", "confirmed", "preparing", "ready", "picked_up", "on_the_way", "delivered"] as const;
const PICKUP_FLOW = ["pending", "confirmed", "preparing", "ready", "delivered"] as const;

function statusCopy(s: string) {
  switch (s) {
    case "pending": return "Sent to the kitchen";
    case "confirmed": return "Kitchen confirmed your order";
    case "preparing": return "Chefs are cooking now";
    case "ready": return "Food packed and ready";
    case "picked_up": return "Rider has the order";
    case "on_the_way": return "On the bike — almost there";
    case "delivered": return "Delivered to your door";
    default: return "";
  }
}

export function TrackingScreen({ orderId }: { orderId: string }) {
  const { activeOrder, orderHistory, navigate, advanceOrder } = useApp();
  const order: Order | undefined = activeOrder?.id === orderId ? activeOrder : orderHistory.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="screen">
        <AppBar title="Tracking" />
        <div className="screen-body"><div className="screen-pad">Order not found.</div></div>
      </div>
    );
  }

  const flow = order.type === "pickup" ? PICKUP_FLOW : DELIVERY_FLOW;
  const currentIdx = flow.indexOf(order.status as (typeof flow)[number]);
  const isDelivered = order.status === "delivered";

  return (
    <div className="screen">
      {/* Map area */}
      <div className="track-map">
        <ImgSlot label="Live driver map" radius={0} />
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="ab-icon" onClick={() => navigate("/home")} style={{ background: "rgba(255,255,255,0.95)", borderRadius: 999, color: "var(--md-sys-color-on-surface)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} aria-label="Back">
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </button>
          <span className="badge badge-success" style={{ background: "var(--md-sys-color-surface)", color: "var(--md-sys-color-on-surface)", border: "1px solid var(--md-sys-color-outline-variant)" }}>
            <span className="dot" style={{ background: "var(--md-sys-color-primary)" }} />
            {statusFlowLabel(order.status)}
          </span>
        </div>
      </div>

      <div className="track-card-sheet">
        {/* Driver */}
        {order.type === "delivery" && !isDelivered && (
          <div className="track-driver">
            <div className="av">SN</div>
            <div className="info">
              <div className="name">Sipho Nkosi</div>
              <div className="vehicle">Honda CB125F · MP 142 ZN · ★ 4.9</div>
            </div>
            <div className="actions">
              <button className="ico-btn" aria-label="Call" onClick={() => alert("Calling Sipho (prototype)")}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.38 2.07.73 3.05a2 2 0 0 1-.45 2.11L8.09 10.09a16 16 0 0 0 6 6l1.21-1.21a2 2 0 0 1 2.11-.45c.98.35 2 .6 3.05.73a2 2 0 0 1 1.72 2.05z" /></svg>
              </button>
              <button className="ico-btn" aria-label="Chat" onClick={() => navigate(`/order/${order.id}/chat`)}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* ETA */}
        <div className="eta-block">
          <div>
            <div className="small">{isDelivered ? "Delivered" : order.type === "pickup" ? "Ready in" : "Arriving in"}</div>
            <div className="big">
              {isDelivered ? "✓" : order.status === "preparing" ? "18 min" : order.status === "ready" ? "9 min" : order.status === "picked_up" ? "6 min" : order.status === "on_the_way" ? "4 min" : "25 min"}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--md-sys-color-on-surface-variant)" }}>
            <div style={{ fontWeight: 700, color: "var(--md-sys-color-on-surface)", marginBottom: 2 }}>{order.restaurantName}</div>
            {order.type === "delivery" && order.addressLabel ? `To ${order.addressLabel}` : "Waterfront pickup"}
          </div>
        </div>

        {/* Status timeline */}
        <div className="status-timeline">
          {flow.map((s, i) => {
            const isDone = i < currentIdx;
            const isCurrent = i === currentIdx && !isDelivered;
            const isLastDelivered = i === currentIdx && isDelivered;
            return (
              <div key={s} className={`status-step${isDone || isLastDelivered ? " is-done" : isCurrent ? " is-current" : " is-pending"}`}>
                <div className="tick"><Check /></div>
                <div className="body">
                  <div className="l1">{statusFlowLabel(s)}</div>
                  <div className="l2">{statusCopy(s)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div style={{ marginTop: 16, padding: 12, background: "var(--md-sys-color-surface-container)", borderRadius: 12, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Order</span>
            <span style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>{order.id}</span>
          </div>
          {order.items.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
              <span>{l.qty} × {l.item.name}</span>
              <span>{fmt((l.item.price + (l.optionsExtra ?? 0)) * l.qty)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", borderTop: "1px solid var(--md-sys-color-outline-variant)", marginTop: 8, fontWeight: 700 }}>
            <span>Total</span><span>{fmt(order.total)}</span>
          </div>
        </div>

        {/* Demo controls */}
        {!isDelivered && (
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="btn btn-sm btn-outlined" style={{ flex: 1 }} onClick={advanceOrder}>
              ⏩ Advance status (demo)
            </button>
          </div>
        )}
        {isDelivered && !order.rated && (
          <button className="btn btn-lg btn-primary" style={{ marginTop: 12, width: "100%" }} onClick={() => navigate(`/order/${order.id}/rate`)}>
            Rate this order
          </button>
        )}

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

/* ───────────────────────── S-041 Driver Chat ───────────────────────── */

type Msg = { dir: "in" | "out"; text: string; ts: string };

export function ChatScreen({ orderId }: { orderId: string }) {
  const { navigate } = useApp();
  const [stream, setStream] = useState<Msg[]>([
    { dir: "in", text: "Hi! I'm at the kitchen now. Heading out in 2.", ts: "19:46" },
    { dir: "out", text: "Cool, blue gate, ring twice. Dog is friendly.", ts: "19:46" },
    { dir: "in", text: "Got it 👍 GPS says 4 min.", ts: "19:47" },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [stream]);

  const send = (t: string) => {
    if (!t.trim()) return;
    const now = new Date();
    setStream((s) => [...s, { dir: "out", text: t.trim(), ts: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}` }]);
    setText("");
    // mock reply
    setTimeout(() => {
      setStream((s) => [...s, { dir: "in", text: "👍", ts: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}` }]);
    }, 1400);
  };

  const replies = ["I'll come out", "Use the buzzer", "Leave at the gate", "Running late?"];

  return (
    <div className="screen">
      <AppBar
        title="Sipho · Honda CB125F"
        onBack={() => navigate(`/order/${orderId}/track`)}
        actions={
          <button className="ab-icon" aria-label="Call" onClick={() => alert("Calling Sipho (prototype)")}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.38 2.07.73 3.05a2 2 0 0 1-.45 2.11L8.09 10.09a16 16 0 0 0 6 6l1.21-1.21a2 2 0 0 1 2.11-.45c.98.35 2 .6 3.05.73a2 2 0 0 1 1.72 2.05z" /></svg>
          </button>
        }
      />
      <div className="chat-stream">
        {stream.map((m, i) => (
          <div key={i} className={`bubble ${m.dir}`}>
            <div>{m.text}</div>
            <span className="ts">{m.ts}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="quick-replies">
        {replies.map((r) => <button key={r} onClick={() => send(r)}>{r}</button>)}
      </div>
      <div className="chat-input">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)} placeholder="Message Sipho…" />
        <button onClick={() => send(text)} aria-label="Send">
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── S-042 Rate Order ───────────────────────── */

export function RateScreen({ orderId }: { orderId: string }) {
  const { activeOrder, orderHistory, navigate, rateOrder } = useApp();
  const order = activeOrder?.id === orderId ? activeOrder : orderHistory.find((o) => o.id === orderId);
  const [rest, setRest] = useState(0);
  const [deliv, setDeliv] = useState(0);
  const [tip, setTip] = useState(0);
  const [comment, setComment] = useState("");

  if (!order) return <div className="screen"><AppBar title="Rate" /><div className="screen-body"><div className="screen-pad">Order not found.</div></div></div>;

  return (
    <div className="screen">
      <AppBar title="Rate your order" onBack={() => navigate(`/order/${order.id}`)} />
      <div className="screen-body">
        <div className="screen-pad">
          {/* Restaurant rating */}
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <ImgSlot label={order.restaurantName} radius={12} />
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, margin: "12px 0 4px" }}>{order.restaurantName}</h2>
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>How was the food?</p>
            <div className="rate-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className={i <= rest ? "is-lit" : ""} onClick={() => setRest(i)} aria-label={`${i} star`}>★</button>
              ))}
            </div>
          </div>

          {order.type === "delivery" && (
            <div style={{ marginTop: 16, padding: 16, background: "var(--md-sys-color-surface-container)", borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>And the delivery?</div>
              <div className="muted" style={{ fontSize: 12, margin: "2px 0 0" }}>Sipho · Honda CB125F</div>
              <div className="rate-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} className={i <= deliv ? "is-lit" : ""} onClick={() => setDeliv(i)} aria-label={`${i} star`}>★</button>
                ))}
              </div>
            </div>
          )}

          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Tip the rider</h3>
          <div className="tip-row">
            {[0, 500, 1000, 2000, 5000].map((c) => (
              <button key={c} className={tip === c ? "is-selected" : ""} onClick={() => setTip(c)}>{c === 0 ? "No tip" : fmt(c)}</button>
            ))}
          </div>

          <h3 style={{ margin: "24px 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Leave a comment (optional)</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 280))}
            placeholder="What stood out?"
            style={{ width: "100%", height: 88, padding: 12, border: "1.5px solid var(--md-sys-color-outline)", borderRadius: 8, fontFamily: "inherit", fontSize: 14, outline: 0, resize: "vertical" }}
          />
          <div style={{ fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", textAlign: "right" }}>{comment.length}/280</div>
        </div>
      </div>
      <div className="bottom-cta">
        <button
          className="btn btn-lg btn-primary"
          style={{ width: "100%" }}
          disabled={rest === 0}
          onClick={() => { rateOrder(order.id, rest, deliv, comment); navigate("/home"); }}
        >
          Submit rating
        </button>
      </div>
    </div>
  );
}
