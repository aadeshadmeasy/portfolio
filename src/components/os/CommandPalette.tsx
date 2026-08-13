"use client";

import { useEffect, useMemo, useState } from "react";
import { desktopApps } from "@/content/apps";
import { articles, ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";
import { fuzzyMatch } from "@/lib/utils";
import { themeLabels } from "@/lib/themes";
import type { ThemeMode } from "@/lib/types";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const APP_COMMANDS: Record<string, string> = {
  projects: "OPEN PROJECTS — FINDER",
  results: "OPEN CLIENT RESULTS — PROOF.APP",
  systems: "OPEN HOW WE WORK — SYSTEMS.APP",
  achievements: "OPEN ACHIEVEMENTS — VAULT.APP",
  proof: "OPEN TESTIMONIALS — VOICES.APP",
  journey: "OPEN JOURNEY — TIMELINE.APP",
  founder: "OPEN FOUNDER.TXT — NOTEPAD",
  casefiles: "OPEN CASE FILES — FINDER",
  fieldnotes: "OPEN AI FIELD NOTES — BLOG.APP",
  calendar: "OPEN CALENDAR — SCHEDULE.APP",
  contact: "OPEN LEAVE A MESSAGE — MAIL.APP",
  browser: "OPEN BROWSER — AADESHNET.APP",
  whiteboard: "OPEN WHITEBOARD — NOTES.APP",
  learn: "OPEN LEARN — MEDIA.APP",
  socials: "OPEN SOCIALS — SHARE.APP",
  voice: "OPEN AI VOICE AGENT — VOICE.APP",
  emergency: "OPEN EMERGENCY — SOS.APP",
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { openApp, setTheme } = useOS();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo(() => {
    const base = [
      ...desktopApps.map((a) => ({
        type: "APP",
        label: APP_COMMANDS[a.id] ?? `OPEN ${a.name.toUpperCase()}`,
        action: () => openApp(a.id, a.name),
      })),
      ...articles.map((a) => ({
        type: "ARTICLE",
        label: a.title.toUpperCase(),
        action: () => window.open(`/blog/${a.slug}`, "_blank"),
      })),
      ...(["day", "night", "dark"] as ThemeMode[]).map((t) => ({
        type: "THEME",
        label: `SWITCH TO ${themeLabels[t]} MODE`,
        action: () => setTheme(t),
      })),
      {
        type: "CONTACT",
        label: `EMAIL ${ownerProfile.conversion.email.toUpperCase()}`,
        action: () => {
          window.location.href = `mailto:${ownerProfile.conversion.email}`;
        },
      },
    ];
    return base.filter((i) => fuzzyMatch(query, i.label));
  }, [openApp, query, setTheme]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, items.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && items[active]) {
        items[active].action();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, active, onClose]);

  useEffect(() => {
    setActive(0);
    if (!open) setQuery("");
  }, [query, open]);

  if (!open) return null;

  return (
    <div className="search-palette" onClick={onClose} role="presentation">
      <div className="search-window" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <div className="search-title">
          <span>{ownerProfile.identity.osName.toUpperCase()} SEARCH</span>
          <button type="button" className="retro-btn" onClick={onClose} style={{ fontSize: 11, padding: "2px 8px" }}>
            ESC
          </button>
        </div>
        <div className="search-input-row">
          <span aria-hidden>&gt;</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Open an app or run a command..."
          />
        </div>
        <ul className="search-results">
          {items.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className={`search-result-btn${i === active ? " active" : ""}`}
              >
                <span>{item.label}</span>
                <span className="search-result-type">{item.type}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-4 py-6 text-center text-sm">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
