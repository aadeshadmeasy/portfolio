"use client";

import { desktopApps } from "@/content/apps";
import { AppIconGlyph } from "@/components/os/AppIcon";
import { useOS } from "@/components/os/OSProvider";

export function Dock() {
  const { openApp, windows } = useOS();

  const dockApps = desktopApps.filter((a) =>
    ["projects", "results", "contact", "calendar", "whiteboard", "founder"].includes(a.id),
  );

  return (
    <nav
      className="fixed bottom-14 left-1/2 z-[5500] flex -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl border px-3 py-2 shadow-lg sm:bottom-16"
      style={{ background: "var(--dock-bg)", borderColor: "var(--border)", maxWidth: "calc(100vw - 1rem)" }}
      aria-label="Dock"
    >
      {dockApps.map((app) => {
        const isOpen = windows.some((w) => w.appId === app.id);
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => openApp(app.id, app.name)}
            className="relative flex min-h-11 min-w-11 shrink-0 flex-col items-center justify-center rounded-xl p-1.5 hover:bg-black/5"
            aria-label={app.name}
            title={app.name}
          >
            <div className="h-9 w-9">
              <AppIconGlyph icon={app.icon} />
            </div>
            {isOpen && (
              <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[var(--accent)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
