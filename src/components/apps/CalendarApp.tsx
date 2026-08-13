"use client";

import { ownerProfile } from "@/content/owner-profile";

const CALENDAR_EMBED =
  process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL ||
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "";

export function CalendarApp() {
  return (
    <div className="space-y-4">
      <p className="window-kicker">{ownerProfile.identity.osName} / CALENDAR</p>
      <h2 className="window-headline">
        30 minutes with <em>Aadesh</em>
      </h2>
      <p className="text-sm">
        Book a strategy call. A Google Meet link will be sent to your email after
        confirmation. Meetings are created via your connected calendar provider.
      </p>

      {CALENDAR_EMBED ? (
        <iframe
          src={CALENDAR_EMBED}
          title="Book a call"
          className="h-[420px] w-full border-2 border-[var(--border)] bg-white"
          loading="lazy"
        />
      ) : (
        <div className="retro-panel p-6 text-center">
          <p className="font-bold">Calendar not connected yet</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Set <code>NEXT_PUBLIC_CALENDAR_EMBED_URL</code> to your Cal.com or Google
            Calendar appointment page (with Google Meet enabled).
          </p>
          <a
            href={`mailto:${ownerProfile.conversion.email}?subject=Book%20a%20Google%20Meet%20call&body=Hi%20Aadesh%2C%20I'd%20like%20to%20schedule%20a%20call.`}
            className="retro-btn retro-btn-primary mt-4 inline-block"
          >
            EMAIL TO BOOK
          </a>
        </div>
      )}

      <p className="text-xs text-[var(--text-muted)]">
        Tip: In Cal.com → Event Types → Location → Google Meet. Confirmations email
        the Meet link automatically.
      </p>
    </div>
  );
}
