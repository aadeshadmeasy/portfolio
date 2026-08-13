"use client";

import { ownerProfile } from "@/content/owner-profile";

export function CallTab() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL ||
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    ownerProfile.conversion.bookingUrl ||
    "mailto:aadesh.panwar@admeasy.in?subject=Book%20a%20Google%20Meet%20call";

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="call-tab-fold"
      aria-label="Book a call — Want this for yourself?"
    >
      <span className="call-tab-text">
        IF YOU WANT THIS FOR YOURSELF
        <br />
        <strong>BOOK A CALL ↗</strong>
      </span>
    </a>
  );
}
