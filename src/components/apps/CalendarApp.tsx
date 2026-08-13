"use client";

import { useCallback, useEffect, useState } from "react";
import { ownerProfile } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

interface BookingSlot {
  start: string;
  end: string;
  label: string;
}

interface SlotsResponse {
  configured: boolean;
  slots: BookingSlot[];
  message?: string;
  error?: string;
}

interface BookingResponse {
  ok: boolean;
  meetLink?: string;
  htmlLink?: string;
  message?: string;
  error?: string;
  ownerEmail?: string;
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
const CALENDAR_EMBED = process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL || "";
const LEGACY_BOOKING = process.env.NEXT_PUBLIC_BOOKING_URL || "";

function calendlyEmbedUrl(url: string): string {
  if (!url.includes("calendly.com")) return "";
  const base = url.split("?")[0].replace(/\/$/, "");
  return base.includes("/embed") ? base : `${base}/embed`;
}

function resolveEmbedSrc(): string {
  const fromCalendly = calendlyEmbedUrl(CALENDLY_URL);
  if (fromCalendly) return fromCalendly;
  if (CALENDAR_EMBED) return CALENDAR_EMBED;
  const fromLegacy = calendlyEmbedUrl(LEGACY_BOOKING);
  if (fromLegacy) return fromLegacy;
  return "";
}

const EMBED_SRC = resolveEmbedSrc();

export function CalendarApp() {
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [configured, setConfigured] = useState(false);
  const [statusNote, setStatusNote] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<BookingResponse | null>(null);

  useEffect(() => {
    const saved = readStorage<{ name?: string; email?: string }>(
      STORAGE_KEYS.bookingProfile,
      {},
    );
    if (saved.name) setName(saved.name);
    if (saved.email) setEmail(saved.email);
  }, []);

  const loadSlots = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const res = await fetch("/api/booking/slots");
      const data = (await res.json()) as SlotsResponse;
      setSlots(data.slots || []);
      setConfigured(Boolean(data.configured));
      setStatusNote(data.message || data.error || "");
    } catch {
      setStatusNote("Could not load slots. Try again in a moment.");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setResult(null);

    writeStorage(STORAGE_KEYS.bookingProfile, { name, email });

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          notes,
        }),
      });
      const data = (await res.json()) as BookingResponse;
      setResult(data);
      if (data.ok) {
        writeStorage(STORAGE_KEYS.lastBooking, {
          at: new Date().toISOString(),
          slot: selectedSlot,
          meetLink: data.meetLink,
        });
        await loadSlots();
      }
    } catch {
      setResult({ ok: false, error: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (EMBED_SRC) {
    return (
      <div className="space-y-4">
        <p className="window-kicker">{ownerProfile.identity.osName} / CALENDAR</p>
        <h2 className="window-headline">
          Connect with <em>{ownerProfile.identity.fullName}</em>
        </h2>
        <p className="text-sm">
          Book a 30-minute strategy call via Calendly. Confirmation and meeting details are
          sent to your email.
        </p>
        <iframe
          src={EMBED_SRC}
          title="Book a call with Aadesh Panwar"
          className="calendly-embed h-[520px] w-full border-2 border-[var(--border)] bg-white"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="window-kicker">{ownerProfile.identity.osName} / CALENDAR</p>
      <h2 className="window-headline">
        Book a <em>Google Meet</em> with Aadesh
      </h2>
      <p className="text-sm">
        Pick a 30-minute slot (IST). Calendar invites go to you and{" "}
        <strong>{ownerProfile.conversion.email}</strong> with a Google Meet link.
      </p>

      {!configured && (
        <p className="retro-panel p-3 text-xs text-[var(--text-muted)]">
          Live calendar sync needs Google OAuth on Vercel. Slots below are suggested until env
          vars are set.
        </p>
      )}

      {statusNote && (
        <p className="text-xs text-[var(--text-muted)]">{statusNote}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border-2 border-[var(--border)] bg-white px-3 py-2"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          Email (invite sent here)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border-2 border-[var(--border)] bg-white px-3 py-2"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block text-sm">
        Agenda (optional)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full border-2 border-[var(--border)] bg-white px-3 py-2"
          placeholder="What should we discuss?"
        />
      </label>

      <div>
        <p className="mb-2 text-sm font-bold">Available slots (IST)</p>
        {loadingSlots ? (
          <p className="text-sm text-[var(--text-muted)]">Loading slots…</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">
            No open slots in the next two weeks.{" "}
            <a href={`mailto:${ownerProfile.conversion.email}`} className="underline">
              Email Aadesh
            </a>
          </p>
        ) : (
          <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
            {slots.map((slot) => (
              <button
                key={slot.start}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`retro-btn text-left text-sm ${
                  selectedSlot?.start === slot.start ? "retro-btn-primary" : ""
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleBook}
        disabled={!selectedSlot || !name.trim() || !email.trim() || submitting}
        className="retro-btn-green !w-auto px-6 disabled:opacity-50"
      >
        {submitting ? "BOOKING…" : "CONFIRM BOOKING"}
      </button>

      {result && (
        <div
          className={`retro-panel p-4 text-sm ${result.ok ? "border-lime" : ""}`}
          style={{ borderLeft: result.ok ? "4px solid var(--lime)" : "4px solid var(--maroon)" }}
        >
          {result.ok ? (
            <>
              <p className="font-bold">Booked!</p>
              <p className="mt-1">{result.message}</p>
              {result.meetLink && (
                <a href={result.meetLink} className="mt-2 inline-block underline" target="_blank" rel="noreferrer">
                  Open Google Meet link
                </a>
              )}
            </>
          ) : (
            <>
              <p className="font-bold">Could not book</p>
              <p className="mt-1">{result.error}</p>
              {result.ownerEmail && (
                <a
                  href={`mailto:${result.ownerEmail}?subject=Book%20a%20call`}
                  className="mt-2 inline-block underline"
                >
                  Email {result.ownerEmail}
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
