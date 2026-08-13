"use client";

import { useEffect, useMemo, useState } from "react";
import { desktopApps } from "@/content/apps";
import { articles, projects } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";
import { fuzzyMatch } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { openApp, setTheme } = useOS();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo(() => {
    const base = [
      ...desktopApps.map((a) => ({
        type: "App",
        label: a.name,
        sub: a.description,
        action: () => openApp(a.id, a.name),
      })),
      ...projects.map((p) => ({
        type: "Project",
        label: p.name,
        sub: p.category,
        action: () => openApp("projects", "Projects"),
      })),
      ...articles.map((a) => ({
        type: "Article",
        label: a.title,
        sub: a.description,
        action: () => {
          window.open(`/blog/${a.slug}`, "_blank");
        },
      })),
      { type: "Theme", label: "Switch to Day mode", sub: "Theme", action: () => setTheme("day") },
      { type: "Theme", label: "Switch to Night mode", sub: "Theme", action: () => setTheme("night") },
      { type: "Theme", label: "Switch to Dark mode", sub: "Theme", action: () => setTheme("dark") },
      { type: "Contact", label: "Open Contact", sub: "Book or email", action: () => openApp("contact", "Contact") },
    ];
    return base.filter(
      (i) => fuzzyMatch(query, i.label) || fuzzyMatch(query, i.sub) || fuzzyMatch(query, i.type),
    );
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
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[5400] flex items-start justify-center bg-black/40 px-4 pt-24"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg rounded-xl border shadow-2xl"
        style={{ background: "var(--bg-panel-solid)", borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Command palette"
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search apps, projects, articles…"
          className="w-full border-b bg-transparent px-4 py-3 text-base outline-none"
          style={{ borderColor: "var(--border)" }}
        />
        <ul className="max-h-80 overflow-auto py-2">
          {items.map((item, i) => (
            <li key={`${item.type}-${item.label}`}>
              <button
                type="button"
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm"
                style={{
                  background: i === active ? "var(--accent)" : "transparent",
                  color: i === active ? "#fff" : "inherit",
                }}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-70">{item.type}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
