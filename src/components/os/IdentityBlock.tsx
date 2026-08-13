"use client";

import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";

const ROLE_TEXT = ownerProfile.identity.roles.join(" · ");

export function IdentityBlock() {
  const { openApp } = useOS();

  return (
    <section
      className="os-panel mx-4 mt-4 max-w-2xl p-5 sm:mx-6 sm:p-6"
      aria-label="Owner identity"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
        {ROLE_TEXT}
      </p>
      <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
        {ownerProfile.identity.headline}
      </h1>
      <p className="mt-1 text-lg text-[var(--text-secondary)] sm:text-xl">
        {ownerProfile.identity.intro}
      </p>
      <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
        {ownerProfile.identity.positioning}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openApp("projects", "Projects")}
          className="min-h-11 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          {ownerProfile.conversion.primaryLabel}
        </button>
        <button
          type="button"
          onClick={() => openApp("calendar", "Calendar")}
          className="min-h-11 rounded-lg border px-5 py-2.5 text-sm font-semibold"
          style={{ borderColor: "var(--border)" }}
        >
          {ownerProfile.conversion.secondaryLabel}
        </button>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Image
          src={ownerProfile.identity.portrait}
          alt={ownerProfile.identity.fullName}
          width={56}
          height={56}
          className="rounded-xl"
        />
        <div>
          <p className="font-semibold">{ownerProfile.identity.fullName}</p>
          <p className="text-sm text-[var(--text-muted)]">{ownerProfile.identity.profession}</p>
          <p className="text-sm text-[var(--text-muted)]">{ownerProfile.identity.location}</p>
        </div>
      </div>
    </section>
  );
}
