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

  const today = new Date()
    .toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: ownerProfile.identity.timezone })
    .toUpperCase();

  return (
    <aside className="daily-transmission retro-window" aria-label="Daily transmission">
      <div className="retro-window-title maroon">
        <span>DAILY TRANSMISSION</span>
        <button type="button" className="retro-window-close" aria-label="Close">
          ×
        </button>
      </div>
      <div className="daily-transmission-body">
        <p className="daily-date">{today}</p>
        <p className="daily-quote">{statement}</p>
        <p className="daily-meta">{ownerProfile.identity.osName} / DAILY MOTIVATION</p>
        <button
          type="button"
          onClick={() => openApp("whiteboard", "Whiteboard")}
          className="retro-btn-green"
        >
          + ADD A QUICK STICKY
        </button>
      </div>
    </aside>
  );
}
