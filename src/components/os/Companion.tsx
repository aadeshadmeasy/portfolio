"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

type CompanionState = "happy" | "sad";

const IMAGES: Record<CompanionState, string> = {
  happy: "/assets/companion-happy.png",
  sad: "/assets/companion-sad.png",
};

export function Companion() {
  const [state, setState] = useState<CompanionState>("happy");
  const [pos, setPos] = useState({ x: 12, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const stored = readStorage<{ x: number; y: number } | null>(STORAGE_KEYS.companion, null);
    if (stored) setPos(stored);
  }, []);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.companion, pos);
  }, [pos]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (window.innerWidth < 768) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: Math.max(4, Math.min(e.clientX - 24, window.innerWidth - 80)),
      y: Math.max(32, Math.min(e.clientY - 24, window.innerHeight - 120)),
    });
  };

  const resetPosition = () => setPos({ x: 12, y: 0 });

  return (
    <div
      className="companion-zone"
      style={pos.y > 0 ? { position: "fixed", left: pos.x, bottom: "auto", top: pos.y } : undefined}
    >
      <div className="retro-panel flex items-end gap-2 p-2">
        <button
          type="button"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => setDragging(false)}
          className="cursor-grab active:cursor-grabbing"
          aria-label={`Pixel companion — ${state}`}
        >
          <Image
            src={IMAGES[state]}
            alt=""
            width={48}
            height={48}
            style={{ imageRendering: "pixelated" }}
          />
        </button>
        <div className="flex flex-col gap-1">
          <button type="button" className="retro-btn text-xs" onClick={() => setState("happy")}>
            HAPPY
          </button>
          <button type="button" className="retro-btn text-xs" onClick={() => setState("sad")}>
            SAD
          </button>
          <button type="button" className="retro-btn text-xs" onClick={resetPosition}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
