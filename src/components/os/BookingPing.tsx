"use client";

import { useState } from "react";
import { ownerProfile } from "@/content/owner-profile";

export function BookingPing() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside className="booking-ping retro-window" role="status">
      <div className="retro-window-title maroon compact">
        <span>BOOKING SIGNAL</span>
        <button
          type="button"
          className="retro-window-close"
          onClick={() => setDismissed(true)}
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
