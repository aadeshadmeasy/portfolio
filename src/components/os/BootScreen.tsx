"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = readStorage<boolean>(STORAGE_KEYS.boot, false);
    if (seen) {
      onComplete();
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReduced ? 300 : 1800;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next >= 100) {
        writeStorage(STORAGE_KEYS.boot, true);
        onComplete();
      } else {
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-4 bg-[#000080] px-6 text-center text-white"
      role="dialog"
      aria-label="Loading"
    >
      <Image
        src="/assets/sprite-aadesh.png"
        alt=""
        width={64}
        height={64}
        style={{ imageRendering: "pixelated" }}
        priority
      />
      <p style={{ fontFamily: "var(--font-press-start)", fontSize: "10px" }}>
        {ownerProfile.identity.osName}
      </p>
      <p className="text-lg">Loading portfolio…</p>
      <p className="text-sm opacity-80">Projects · Proof · Voice · Media</p>
      <div className="retro-panel w-full max-w-xs bg-[#c0c0c0] p-1">
        <div className="h-4 bg-white" style={{ width: `${progress}%` }} />
      </div>
      <p className="font-mono text-sm">{progress}%</p>
      <button type="button" onClick={() => { writeStorage(STORAGE_KEYS.boot, true); onComplete(); }} className="retro-btn">
        SKIP BOOT
      </button>
    </div>
  );
}
