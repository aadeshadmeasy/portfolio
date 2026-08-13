"use client";

import { useCallback, useEffect, useState } from "react";
import { desktopApps } from "@/content/apps";
import { AppIconGlyph } from "@/components/os/AppIcon";
import { useOS } from "@/components/os/OSProvider";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

type Positions = Record<string, { x: number; y: number }>;

export function AppGrid() {
  const { openApp, windows } = useOS();
  const [positions, setPositions] = useState<Positions>({});
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    setPositions(readStorage<Positions>(STORAGE_KEYS.layout, {}));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, appId: string) => {
      if (window.innerWidth < 1024) return;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(appId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent, appId: string) => {
      if (!dragging || dragging !== appId) return;
      const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left - 40, rect.width - 100));
      const y = Math.max(0, Math.min(e.clientY - rect.top - 40, rect.height - 120));
      setPositions((prev) => {
        const next = { ...prev, [appId]: { x, y } };
        writeStorage(STORAGE_KEYS.layout, next);
        return next;
      });
    },
    [dragging],
  );

  const handlePointerUp = useCallback(() => setDragging(null), []);

  return (
    <section
      className="relative mx-4 mt-6 min-h-[280px] sm:mx-6 lg:min-h-[320px]"
      aria-label="Applications"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:block lg:min-h-[300px]">
        {desktopApps.map((app, index) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          const pos = positions[app.id];
          const style =
            pos && typeof window !== "undefined" && window.innerWidth >= 1024
              ? { position: "absolute" as const, left: pos.x, top: pos.y, width: 120 }
              : undefined;

          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openApp(app.id, app.name)}
              onPointerDown={(e) => handlePointerDown(e, app.id)}
              onPointerMove={(e) => handlePointerMove(e, app.id)}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition hover:bg-black/5 lg:absolute lg:w-[120px] lg:cursor-grab lg:active:cursor-grabbing"
              style={style ?? undefined}
              aria-label={`Open ${app.name}: ${app.description}`}
            >
              <AppIconGlyph icon={app.icon} />
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ fontSize: "14px" }}>
                  {app.name}
                  {isOpen && (
                    <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-label="open" />
                  )}
                </p>
                {app.badge && (
                  <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                    {app.badge}
                  </p>
                )}
                <p
                  className="mt-1 line-clamp-2 text-[var(--text-muted)]"
                  style={{ fontSize: "13px", lineHeight: 1.4 }}
                >
                  {app.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
