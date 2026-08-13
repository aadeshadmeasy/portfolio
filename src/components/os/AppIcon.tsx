import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  folder: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="4" y="12" width="40" height="28" rx="4" fill="#4F46E5" />
      <path d="M4 16h14l4-6h26v2H4z" fill="#6366F1" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#1C1917" />
      <rect x="12" y="26" width="6" height="12" fill="#F59E0B" />
      <rect x="21" y="18" width="6" height="20" fill="#4F46E5" />
      <rect x="30" y="12" width="6" height="26" fill="#22C55E" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <circle cx="24" cy="24" r="10" fill="#57534E" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="#78716C" strokeWidth="4" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#312E81" />
      <polygon points="20,16 34,24 20,32" fill="#FCD34D" />
    </svg>
  ),
  timeline: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <line x1="12" y1="8" x2="12" y2="40" stroke="#4F46E5" strokeWidth="3" />
      <circle cx="12" cy="14" r="4" fill="#F59E0B" />
      <circle cx="12" cy="24" r="4" fill="#4F46E5" />
      <circle cx="12" cy="34" r="4" fill="#22C55E" />
      <line x1="16" y1="14" x2="38" y2="14" stroke="#A8A29E" strokeWidth="2" />
      <line x1="16" y1="24" x2="34" y2="24" stroke="#A8A29E" strokeWidth="2" />
      <line x1="16" y1="34" x2="30" y2="34" stroke="#A8A29E" strokeWidth="2" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <circle cx="36" cy="12" r="6" fill="#4F46E5" />
      <circle cx="12" cy="24" r="6" fill="#F59E0B" />
      <circle cx="36" cy="36" r="6" fill="#22C55E" />
      <line x1="17" y1="21" x2="31" y2="15" stroke="#78716C" strokeWidth="2" />
      <line x1="17" y1="27" x2="31" y2="33" stroke="#78716C" strokeWidth="2" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="8" y="6" width="32" height="36" rx="2" fill="#FEF3C7" stroke="#D6D3D1" />
      <line x1="14" y1="16" x2="34" y2="16" stroke="#A8A29E" strokeWidth="2" />
      <line x1="14" y1="24" x2="30" y2="24" stroke="#A8A29E" strokeWidth="2" />
    </svg>
  ),
  sticky: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="10" y="10" width="28" height="28" rx="2" fill="#FDE047" />
      <path d="M30 10v8h8" fill="#FACC15" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <circle cx="24" cy="24" r="18" fill="#1E40AF" />
      <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="#93C5FD" strokeWidth="2" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="#93C5FD" strokeWidth="2" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="6" y="12" width="36" height="24" rx="3" fill="#4F46E5" />
      <path d="M6 14l18 12 18-12" fill="none" stroke="#C7D2FE" strokeWidth="2" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="8" y="10" width="32" height="32" rx="4" fill="#F5F5F4" stroke="#D6D3D1" />
      <rect x="8" y="10" width="32" height="10" fill="#EF4444" />
      <rect x="14" y="26" width="6" height="6" fill="#4F46E5" />
      <rect x="24" y="26" width="6" height="6" fill="#A8A29E" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="18" y="8" width="12" height="20" rx="6" fill="#6366F1" />
      <path d="M12 24a12 12 0 0024 0" fill="none" stroke="#4F46E5" strokeWidth="3" />
      <line x1="24" y1="36" x2="24" y2="42" stroke="#4F46E5" strokeWidth="3" />
    </svg>
  ),
};

export function AppIconGlyph({ icon }: { icon: string }) {
  return (
    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
      {ICONS[icon] ?? ICONS.folder}
    </div>
  );
}
