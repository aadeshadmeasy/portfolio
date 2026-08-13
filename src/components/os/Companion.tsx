"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

type CompanionState = "happy" | "sad" | "excited" | "idle";

const IMAGES: Record<CompanionState, string> = {
  happy: "/assets/companion-happy.png",
  sad: "/assets/companion-sad.png",
  excited: "/assets/companion-happy.png",
  idle: "/assets/companion-happy.png",
};

export function Companion() {
  const [state, setState] = useState<CompanionState>("idle");
  const [pos, setPos] = useState({ x: 16, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const stored = readStorage<{ x: number; y: number } | null>(STORAGE_KEYS.companion, null);
    if (stored) setPos(stored);
    else {
      setPos({ x: 16, y: window.innerHeight - 200 });
    }
  }, []);

  useEffect(() => {
    if (pos.y > 0) writeStorage(STORAGE_KEYS.companion, pos);
  }, [pos]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (window.innerWidth < 768) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 180;
    setPos({
      x: Math.max(8, Math.min(e.clientX - 32, maxX)),
      y: Math.max(56, Math.min(e.clientY - 32, maxY)),
    });
  };

  const cycleState = useCallback(() => {
    const order: CompanionState[] = ["idle", "happy", "excited", "sad"];
    setState((s) => order[(order.indexOf(s) + 1) % order.length]);
  }, []);

  const resetPosition = () => {
    setPos({ x: 16, y: window.innerHeight - 200 });
  };

  return (
    <div
      className="fixed z-[4500] touch-manipulation"
      style={{ left: pos.x, top: pos.y }}
    >
      <button
        type="button"
        onClick={cycleState}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative h-16 w-16 cursor-grab active:cursor-grabbing"
        aria-label={`AI companion — ${state}. Tap to change mood.`}
      >
        <Image
          src={IMAGES[state]}
          alt=""
          width={64}
          height={64}
          className="pointer-events-none select-none"
          draggable={false}
        />
      </button>
      <button
        type="button"
        onClick={resetPosition}
        className="mt-1 block w-full text-center text-[10px] text-[var(--text-muted)] underline"
      >
        Reset
      </button>
    </div>
  );
}

export function BookingPing({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;

  return (
    <aside
      className="fixed z-[4510] max-w-[280px] rounded-lg border p-3 shadow-lg sm:left-20"
      style={{
        left: 16,
        bottom: "5.5rem",
        background: "var(--bg-panel-solid)",
        borderColor: "var(--border)",
      }}
      role="status"
    >
      <p className="font-mono text-[10px] uppercase tracking-wide text-amber-600">
        Demonstration — not a live booking
      </p>
      <p className="mt-1 text-sm leading-snug">{ownerProfile.companion.bookingNotificationCopy}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-2 min-h-9 text-xs font-medium text-[var(--accent)]"
      >
        Dismiss
      </button>
    </aside>
  );
}
