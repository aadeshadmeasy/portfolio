const ICONS: Record<string, string> = {
  folder: "📁",
  chart: "📊",
  gear: "⚙",
  play: "▶",
  timeline: "🧭",
  trophy: "🏆",
  book: "📖",
  share: "📡",
  note: "📄",
  alert: "⚠",
  globe: "🌐",
  mail: "✉",
  sticky: "📝",
  mic: "🎙",
};

export function PixelIcon({ name }: { name: string }) {
  return (
    <span
      className="text-2xl leading-none"
      style={{ fontFamily: "monospace", imageRendering: "pixelated" }}
      aria-hidden
    >
      {ICONS[name] ?? "◻"}
    </span>
  );
}
