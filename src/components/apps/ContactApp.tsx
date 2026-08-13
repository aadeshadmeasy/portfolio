"use client";

import { useState } from "react";
import { ownerProfile } from "@/content/owner-profile";

export function ContactApp() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("bot-field") as HTMLInputElement)?.value;
    if (honeypot) return;

    setStatus("success");
    form.reset();
  };

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Strategy calls, agentic OS builds, and voice AI implementations.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <a
          href={ownerProfile.conversion.bookingUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="min-h-11 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Book a call
        </a>
        <a
          href={ownerProfile.conversion.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: "var(--border)" }}
        >
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(ownerProfile.conversion.email)}
          className="min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: "var(--border)" }}
        >
          Copy email
        </button>
      </div>

      <section>
        <h3 className="mb-2 font-semibold">Services</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {ownerProfile.services.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </section>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>
        <label className="block text-sm font-medium">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full min-h-11 rounded-lg border bg-transparent px-3 py-2"
            style={{ borderColor: "var(--border)" }}
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full min-h-11 rounded-lg border bg-transparent px-3 py-2"
            style={{ borderColor: "var(--border)" }}
          />
        </label>
        <label className="block text-sm font-medium">
          Desired build
          <textarea
            name="brief"
            rows={3}
            className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2"
            style={{ borderColor: "var(--border)" }}
          />
        </label>
        <label className="block text-sm font-medium">
          Timeline
          <input
            name="timeline"
            className="mt-1 w-full min-h-11 rounded-lg border bg-transparent px-3 py-2"
            style={{ borderColor: "var(--border)" }}
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-lg px-5 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Send brief
        </button>
        {status === "success" && (
          <p className="text-sm text-emerald-600" role="status">
            Thanks — your brief was captured. Email fallback: {ownerProfile.conversion.email}
          </p>
        )}
      </form>

      <p className="text-xs text-[var(--text-muted)]">
        <strong>SOS:</strong> {ownerProfile.conversion.emergencyLabel} — urgent business
        implementation only, not emergency services.
      </p>
    </div>
  );
}
