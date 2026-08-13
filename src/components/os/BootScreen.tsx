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
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const seen = readStorage<boolean>(STORAGE_KEYS.boot, false);
    if (seen) {
      onComplete();
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReduced ? 400 : 2200;
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

  const handleSkip = () => {
    setSkipped(true);
    writeStorage(STORAGE_KEYS.boot, true);
    onComplete();
  };

  if (skipped) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-6 bg-[#0f0f0f] px-6 text-center text-stone-100"
      role="dialog"
      aria-label="Loading portfolio"
    >
      <Image
        src={ownerProfile.identity.sprite}
        alt=""
        width={72}
        height={72}
        className="rounded-2xl"
        priority
      />
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">
          {ownerProfile.identity.osName} v1.0
        </p>
        <h1 className="mt-2 text-xl font-semibold sm:text-2xl">
          Loading portfolio…
        </h1>
        <p className="mt-2 max-w-md text-sm text-stone-400">
          Projects · case studies · proof · voice demos · media
        </p>
      </div>
      <div className="w-full max-w-xs">
        <div className="h-1.5 overflow-hidden rounded-full bg-stone-800">
          <div
            className="h-full bg-indigo-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-xs text-stone-500">{progress}%</p>
      </div>
      <button
        type="button"
        onClick={handleSkip}
        className="min-h-11 rounded-lg border border-stone-700 px-5 py-2 text-sm font-medium hover:bg-stone-900"
      >
        Skip Boot
      </button>
    </div>
  );
}
