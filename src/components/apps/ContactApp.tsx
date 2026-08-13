"use client";

import { useState } from "react";
import { ownerProfile } from "@/content/owner-profile";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(ownerProfile.conversion.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">CONTACT.SYS</h2>
      <p className="text-sm">Email or LinkedIn — no calls, no WhatsApp.</p>

      <div className="flex flex-wrap gap-2">
        <a href={`mailto:${ownerProfile.conversion.email}`} className="retro-btn retro-btn-primary">
          EMAIL AADESH
        </a>
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

      <div className="retro-panel p-3 font-mono text-sm">
        <p>{ownerProfile.conversion.email}</p>
        <p className="mt-1 text-[var(--text-muted)]">{ownerProfile.conversion.linkedin}</p>
      </div>

      <section>
        <h3 className="mb-2 font-bold">SERVICES</h3>
        <ul className="list-none space-y-1 text-sm">
          {ownerProfile.services.map((s) => (
            <li key={s.id}>▸ {s.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
