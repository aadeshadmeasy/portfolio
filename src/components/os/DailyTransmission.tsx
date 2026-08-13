"use client";

import { useMemo } from "react";
import { dailyMotivation, ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";

export function DailyTransmission() {
  const { openApp } = useOS();
  const statement = useMemo(() => {
    const dayIndex = new Date().getDate() % dailyMotivation.length;
    return dailyMotivation[dayIndex];
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: ownerProfile.identity.timezone,
  });

  return (
    <aside
      className="os-panel mx-4 mt-4 max-w-md p-4 sm:mx-6"
      aria-label="Daily transmission"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Daily Transmission
        </p>
        <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {ownerProfile.identity.osName}
        </span>
      </div>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{today}</p>
      <p className="mt-3 text-base leading-relaxed sm:text-[17px]">{statement}</p>
      <button
        type="button"
        onClick={() => openApp("whiteboard", "Whiteboard")}
        className="mt-4 min-h-11 rounded-lg border px-4 py-2 text-sm font-medium"
        style={{ borderColor: "var(--border)" }}
      >
        Add a Quick Sticky
      </button>
    </aside>
  );
}
