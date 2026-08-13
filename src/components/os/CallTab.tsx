"use client";

import { ownerProfile } from "@/content/owner-profile";

export function CallTab() {
  return (
    <>
      {/* Desktop folded corner */}
      <a
        href={ownerProfile.conversion.bookingUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-0 right-0 z-[4000] hidden h-28 w-28 md:block"
        aria-label="Book a call — Want this for yourself?"
      >
        <div
          className="absolute bottom-0 right-0 h-full w-full"
          style={{
            background: `linear-gradient(225deg, transparent 50%, var(--accent) 50%, var(--accent) 70%, #1c1917 70%)`,
          }}
        />
        <span className="absolute bottom-4 right-3 max-w-[90px] text-right text-[11px] font-semibold leading-tight text-white">
          Want this for yourself?
          <br />
          <span className="text-amber-200">Book a call</span>
        </span>
      </a>

      {/* Mobile full-width card */}
      <a
        href={ownerProfile.conversion.bookingUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mx-4 mt-6 flex min-h-11 items-center justify-between rounded-xl border px-4 py-3 md:hidden"
        style={{ borderColor: "var(--border)", background: "var(--bg-panel)" }}
      >
        <span className="text-sm font-semibold">Want this for yourself?</span>
        <span className="text-sm font-semibold text-[var(--accent)]">Book a call →</span>
      </a>
    </>
  );
}
