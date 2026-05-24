"use client";

import { useApp } from "./state";

export function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevRight() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function StarIcon({ size = 14, on = true }: { size?: number; on?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ImgSlot({ label, radius = 12 }: { label: string; radius?: number }) {
  return (
    <div className="img-slot" data-radius={String(radius)}>
      {label}
    </div>
  );
}

export function AppBar({
  title,
  showBack = true,
  onBack,
  actions,
  dark,
  transparent,
}: {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  dark?: boolean;
  transparent?: boolean;
}) {
  const { goBack } = useApp();
  return (
    <div className={`app-bar${dark ? " dark" : ""}${transparent ? " transparent" : ""}`}>
      {showBack && (
        <button className="ab-icon" aria-label="Back" onClick={onBack ?? goBack}>
          <BackArrow />
        </button>
      )}
      {title && <div className={`ab-title${!showBack ? " left" : ""}`}>{title}</div>}
      {actions && <div className="ab-actions">{actions}</div>}
    </div>
  );
}

export function statusFlowLabel(status: string): string {
  switch (status) {
    case "pending": return "Pending";
    case "confirmed": return "Confirmed";
    case "preparing": return "Preparing";
    case "ready": return "Ready";
    case "picked_up": return "Picked up";
    case "on_the_way": return "On the way";
    case "delivered": return "Delivered";
    case "cancelled": return "Cancelled";
    default: return status;
  }
}

export function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}
