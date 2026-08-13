"use client";

import { useState } from "react";
import { projects } from "@/content/owner-profile";
import { ownerProfile } from "@/content/owner-profile";

const BOOKMARKS = [
  { title: "Admeasy Ai", url: ownerProfile.company.productUrl },
  { title: "Admeasy.in", url: "https://admeasy.in" },
  { title: "GitHub", url: "https://github.com/aadeshadmeasy" },
  ...projects.filter((p) => p.url).map((p) => ({ title: p.name, url: p.url })),
];

export function BrowserApp() {
  const [url, setUrl] = useState(BOOKMARKS[0].url);
  const [history, setHistory] = useState<string[]>([BOOKMARKS[0].url]);
  const [index, setIndex] = useState(0);

  const navigate = (next: string) => {
    setUrl(next);
    const trimmed = history.slice(0, index + 1);
    trimmed.push(next);
    setHistory(trimmed);
    setIndex(trimmed.length - 1);
  };

  const back = () => {
    if (index <= 0) return;
    const i = index - 1;
    setIndex(i);
    setUrl(history[i]);
  };

  const forward = () => {
    if (index >= history.length - 1) return;
    const i = index + 1;
    setIndex(i);
    setUrl(history[i]);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <h2 className="text-xl font-bold">AadeshNet</h2>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={back} className="min-h-9 rounded border px-2 text-sm" style={{ borderColor: "var(--border)" }}>
          ←
        </button>
        <button type="button" onClick={forward} className="min-h-9 rounded border px-2 text-sm" style={{ borderColor: "var(--border)" }}>
          →
        </button>
        <button type="button" onClick={() => navigate(url)} className="min-h-9 rounded border px-2 text-sm" style={{ borderColor: "var(--border)" }}>
          ↻
        </button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate(url)}
          className="min-h-9 flex-1 rounded border bg-transparent px-2 font-mono text-sm"
          style={{ borderColor: "var(--border)" }}
        />
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="min-h-9 rounded border px-3 text-sm leading-9"
          style={{ borderColor: "var(--border)" }}
        >
          Open ↗
        </a>
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        Many sites block iframe embedding via X-Frame-Options. Use Open ↗ for full pages.
      </p>
      <div className="flex flex-wrap gap-2">
        {BOOKMARKS.map((b) => (
          <button
            key={b.url}
            type="button"
            onClick={() => navigate(b.url)}
            className="rounded-full border px-3 py-1 text-xs"
            style={{ borderColor: "var(--border)" }}
          >
            {b.title}
          </button>
        ))}
      </div>
      <div
        className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
        style={{ borderColor: "var(--border)", minHeight: 200 }}
      >
        <p className="font-mono text-sm break-all">{url}</p>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Preview unavailable for cross-origin sites. Click Open ↗ to visit.
        </p>
      </div>
    </div>
  );
}
