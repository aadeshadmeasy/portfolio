"use client";

import { useMemo } from "react";
import { dailyMotivation, ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

export function DailyTransmission() {
  const { openApp } = useOS();

  const statement = useMemo(() => {
    const dayIndex = new Date().getDate() % dailyMotivation.length;
    return dailyMotivation[dayIndex];
  }, []);

  const today = new Date()
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: ownerProfile.identity.timezone,
    })
    .toUpperCase();

  const openScheduling = () => openApp("calendar", "Calendar");

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

        <div className="daily-schedule-block daily-schedule-block--primary">
          <p className="daily-schedule-kicker">BOOK A CALL</p>
          <p className="daily-schedule-copy">
            Connect with <strong>{ownerProfile.identity.fullName}</strong> via Calendly.
          </p>
          <button type="button" onClick={openScheduling} className="retro-btn-green">
            CONNECT VIA CALENDLY
          </button>
          {CALENDLY_URL ? (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="daily-schedule-link"
            >
              Open Calendly ↗
            </a>
          ) : (
            <p className="daily-schedule-hint">
              Add <code>NEXT_PUBLIC_CALENDLY_URL</code> to your <code>.env.local</code>.
            </p>
          )}
        </div>

        <p className="daily-quote">{statement}</p>
        <p className="daily-meta">{ownerProfile.identity.osName} / DAILY MOTIVATION</p>
      </div>
    </aside>
  );
}
