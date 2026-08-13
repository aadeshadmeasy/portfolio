const ICON_SVGS: Record<string, React.ReactNode> = {
  folder: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="2" y="8" width="28" height="20" fill="#f5e6c8" stroke="#000" strokeWidth="2" />
      <path d="M2 10h10l3-4h15v2H2z" fill="#e8c878" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="4" width="24" height="24" fill="#1a1a2e" stroke="#000" strokeWidth="2" />
      <rect x="8" y="18" width="4" height="8" fill="#e85d5d" />
      <rect x="14" y="12" width="4" height="14" fill="#e85d5d" />
      <rect x="20" y="8" width="4" height="18" fill="#e85d5d" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <circle cx="16" cy="16" r="8" fill="#c8b8e8" stroke="#000" strokeWidth="2" />
      <rect x="14" y="2" width="4" height="6" fill="#888" stroke="#000" strokeWidth="1" />
      <rect x="14" y="24" width="4" height="6" fill="#888" stroke="#000" strokeWidth="1" />
      <rect x="2" y="14" width="6" height="4" fill="#888" stroke="#000" strokeWidth="1" />
      <rect x="24" y="14" width="6" height="4" fill="#888" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="6" width="24" height="20" fill="#f5d878" stroke="#000" strokeWidth="2" />
      <polygon points="13,11 24,16 13,21" fill="#c8a030" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  timeline: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <circle cx="16" cy="16" r="12" fill="#e8d8c8" stroke="#000" strokeWidth="2" />
      <polygon points="16,8 20,18 12,18" fill="#6b3060" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="16" x2="22" y2="20" stroke="#000" strokeWidth="2" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="12" y="4" width="8" height="24" fill="#e8a0a0" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="6" r="3" fill="#fff" stroke="#000" strokeWidth="1" />
      <path d="M8 12h16M10 18h12M12 24h8" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="12" y="6" width="8" height="14" rx="4" fill="#c8c8d8" stroke="#000" strokeWidth="2" />
      <path d="M8 18a8 8 0 0016 0" fill="none" stroke="#000" strokeWidth="2" />
      <line x1="16" y1="26" x2="16" y2="30" stroke="#000" strokeWidth="2" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="6" y="4" width="20" height="24" fill="#f5e878" stroke="#000" strokeWidth="2" />
      <line x1="10" y1="12" x2="22" y2="12" stroke="#888" strokeWidth="1" />
      <line x1="10" y1="17" x2="18" y2="17" stroke="#888" strokeWidth="1" />
    </svg>
  ),
  sticky: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="6" y="6" width="20" height="20" fill="#c8e878" stroke="#000" strokeWidth="2" />
      <rect x="20" y="6" width="6" height="6" fill="#a8c858" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <circle cx="16" cy="16" r="12" fill="#88b8e8" stroke="#000" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="5" ry="12" fill="none" stroke="#000" strokeWidth="1" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="10" width="24" height="16" fill="#a8c8e8" stroke="#000" strokeWidth="2" />
      <polygon points="4,10 16,20 28,10" fill="#88a8d8" stroke="#000" strokeWidth="1" />
      <circle cx="24" cy="12" r="3" fill="#e85d5d" />
    </svg>
  ),
  case: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="8" width="24" height="18" fill="#d8c8a8" stroke="#000" strokeWidth="2" />
      <polygon points="16,10 22,18 10,18" fill="#f5d878" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="4" width="24" height="24" fill="#c8a8e8" stroke="#000" strokeWidth="2" />
      <polygon points="16,8 20,20 16,16 12,20" fill="#6b3060" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="6" y="4" width="20" height="24" fill="#e8c8a8" stroke="#000" strokeWidth="2" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="#000" strokeWidth="1" />
      <rect x="20" y="8" width="4" height="8" fill="#f5d878" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path d="M10 6h12v8a6 6 0 01-12 0V6z" fill="#f5d878" stroke="#000" strokeWidth="2" />
      <rect x="12" y="20" width="8" height="4" fill="#c8a030" stroke="#000" strokeWidth="1" />
      <rect x="10" y="24" width="12" height="3" fill="#888" stroke="#000" strokeWidth="1" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <polygon points="16,4 28,28 4,28" fill="#e85d5d" stroke="#000" strokeWidth="2" />
      <text x="16" y="24" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">!</text>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="6" width="24" height="22" fill="#f5f0e8" stroke="#000" strokeWidth="2" />
      <rect x="4" y="6" width="24" height="8" fill="#e85d5d" stroke="#000" strokeWidth="1" />
      <rect x="10" y="18" width="4" height="4" fill="#6b3060" />
    </svg>
  ),
};

export function PixelIcon({ name, size = 48 }: { name: string; size?: number }) {
  return (
    <div
      className="pixel-icon-svg"
      style={{ width: size, height: size, imageRendering: "pixelated" }}
      aria-hidden
    >
      {ICON_SVGS[name] ?? ICON_SVGS.folder}
    </div>
  );
}
