"use client";

import { useEffect, useState } from "react";
import { ownerProfile } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export function BookingPing() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(readStorage(STORAGE_KEYS.bookingPingDismissed, false));
  }, []);

  const dismiss = () => {
    setDismissed(true);
    writeStorage(STORAGE_KEYS.bookingPingDismissed, true);
  };

  if (dismissed) return null;

  return (
    <aside className="booking-ping retro-window" role="status">
      <div className="retro-window-title maroon compact">
        <span>BOOKING SIGNAL</span>
        <button
          type="button"
          className="retro-window-close"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
      <p className="booking-ping-body">
        <span className="demo-badge">DEMO</span> Someone just booked a call with{" "}
        {ownerProfile.identity.fullName}. Looks like they do not want their business falling
        behind on AI.
      </p>
    </aside>
  );
}
