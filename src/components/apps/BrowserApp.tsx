"use client";

import { useState } from "react";
import { ownerProfile, projects } from "@/content/owner-profile";

const BOOKMARKS = [
  { title: "ADMEASY AI", url: ownerProfile.company.productUrl },
  { title: "LINKEDIN", url: ownerProfile.conversion.linkedin },
  { title: "GITHUB", url: "https://github.com/aadeshadmeasy" },
  { title: "ADMEASY.IN", url: "https://admeasy.in" },
  ...projects.filter((p) => p.url).map((p) => ({ title: p.name.toUpperCase(), url: p.url })),
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

  return (
    <div className="space-y-4">
      <p className="window-kicker">AADESHNET / READY</p>
      <h2 className="window-headline">
        Where do you <em>want to go?</em>
      </h2>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="retro-btn" onClick={() => index > 0 && (setIndex(index - 1), setUrl(history[index - 1]))}>
          ←
        </button>
        <button type="button" className="retro-btn" onClick={() => index < history.length - 1 && (setIndex(index + 1), setUrl(history[index + 1]))}>
          →
        </button>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate(url)}
          className="retro-panel min-h-9 flex-1 px-2 font-mono text-sm"
        />
        <button type="button" className="retro-btn" onClick={() => navigate(url)}>
          GO
        </button>
        <a href={url} target="_blank" rel="noreferrer noopener" className="retro-btn retro-btn-primary">
          OPEN ↗
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {BOOKMARKS.map((b) => (
          <button key={b.url} type="button" onClick={() => navigate(b.url)} className="retro-btn text-xs">
            {b.title}
          </button>
        ))}
      </div>

      <div
        className="flex min-h-[200px] flex-col items-center justify-center border-2 border-[var(--border)] bg-[#a8d8f0] p-8 text-center"
        style={{
          backgroundImage: "linear-gradient(#c8e8f8 1px, transparent 1px), linear-gradient(90deg, #c8e8f8 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <p className="font-mono text-sm break-all">{url}</p>
        <p className="mt-4 max-w-md text-sm text-[var(--text-muted)]">
          Working browser surface. Many sites block iframe embedding — use OPEN ↗ for full pages.
        </p>
      </div>
    </div>
  );
}
