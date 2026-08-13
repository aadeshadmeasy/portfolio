"use client";

import { desktopApps } from "@/content/apps";
import { PixelIcon } from "@/components/os/PixelIcon";
import { useOS } from "@/components/os/OSProvider";

export function AppGrid() {
  const { openApp, windows } = useOS();

  return (
    <section className="desktop-icon-grid" aria-label="Desktop applications">
      {desktopApps.map((app) => {
        const isOpen = windows.some((w) => w.appId === app.id);
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => openApp(app.id, app.name)}
            className={`desktop-icon-btn${isOpen ? " is-open" : ""}`}
            aria-label={`Open ${app.name}`}
          >
            {app.badge && <span className="icon-badge">{app.badge}</span>}
            <div className="icon-box">
              <PixelIcon name={app.icon} size={40} />
            </div>
            <span className="icon-label">{app.name}</span>
            <span className="icon-sublabel">{app.description}</span>
          </button>
        );
      })}
    </section>
  );
}
