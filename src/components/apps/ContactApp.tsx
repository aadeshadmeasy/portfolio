"use client";

import { useState } from "react";
import { ownerProfile } from "@/content/owner-profile";

export function ContactApp() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [note, setNote] = useState("");

  const copyEmail = () => {
    navigator.clipboard?.writeText(ownerProfile.conversion.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(note || "Hi Aadesh, reaching out from your portfolio OS.");
    window.location.href = `mailto:${ownerProfile.conversion.email}?subject=Message%20from%20Aadesh%20OS&body=${body}`;
    setSent(true);
  };

  return (
    <div className="space-y-4">
      <p className="window-kicker">{ownerProfile.identity.osName} WHITEBOARD</p>
      <h2 className="window-headline">
        Leave a <em>message.</em>
      </h2>
      <p className="text-sm">Email or LinkedIn — messages open your mail client.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-bold">YOUR NOTE</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What should Aadesh build, fix, or remember?"
          rows={4}
          className="w-full border-2 border-[var(--border)] bg-white p-2 font-mono text-sm"
          maxLength={500}
        />
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="retro-btn-green" style={{ width: "auto" }}>
            + SEND VIA EMAIL
          </button>
          <button type="button" onClick={copyEmail} className="retro-btn">
            {copied ? "COPIED!" : "COPY EMAIL"}
          </button>
          <a
            href={ownerProfile.conversion.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="retro-btn"
          >
            LINKEDIN
          </a>
        </div>
        {sent && (
          <p className="text-sm text-[var(--maroon)]" role="status">
            Opening mail to {ownerProfile.conversion.email}
          </p>
        )}
      </form>
    </div>
  );
}
