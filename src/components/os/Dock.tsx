"use client";

import { dockAppIds, desktopApps } from "@/content/apps";
import { PixelIcon } from "@/components/os/PixelIcon";
import { useOS } from "@/components/os/OSProvider";

export function Dock() {
  const { openApp, windows } = useOS();
  const dockApps = dockAppIds
    .map((id) => desktopApps.find((a) => a.id === id))
    .filter(Boolean) as typeof desktopApps;

  return (
    <nav className="os-dock" aria-label="Dock">
      <div className="os-dock-inner">
        {dockApps.map((app) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openApp(app.id, app.name)}
              className={`os-dock-icon${isOpen ? " is-open" : ""}`}
              data-label={app.name}
              aria-label={app.name}
            >
              <PixelIcon name={app.icon} size={32} />
            </button>
          );
        })}
        <span className="os-dock-sep" aria-hidden />
        <button
          type="button"
          onClick={() => openApp("browser", "Browser")}
          className="os-dock-icon"
          data-label="AadeshNet"
          aria-label="AadeshNet browser"
        >
          <PixelIcon name="globe" size={32} />
        </button>
      </div>
    </nav>
  );
}
