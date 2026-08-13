"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";
import type { ThemeMode } from "@/lib/types";

const DESCRIPTORS = [
  `${ownerProfile.identity.shortName.toUpperCase()} OS`,
  "AGENTIC AI BUILDER",
  "FOUNDER MODE: ACTIVE",
  "CEO · ADMEASY AI",
];

export function SystemNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const { theme, setTheme } = useOS();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [descriptorIndex, setDescriptorIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: ownerProfile.identity.timezone,
        }),
      );
      setDate(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: ownerProfile.identity.timezone,
        }),
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDescriptorIndex((i) => (i + 1) % DESCRIPTORS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const navItems = [
    { label: "Work", app: "projects" },
    { label: "Proof", app: "results" },
    { label: "Journey", app: "journey" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[5500] flex h-12 items-center justify-between gap-2 border-b px-3 sm:px-4"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Image
          src={ownerProfile.identity.sprite}
          alt=""
          width={24}
          height={24}
          className="shrink-0 rounded-md"
        />
        <span className="truncate text-sm font-semibold" style={{ fontSize: "min(14px, 3.5vw)" }}>
          {ownerProfile.identity.osName}
        </span>
        <span className="hidden font-mono text-xs text-[var(--text-muted)] sm:inline" aria-live="polite">
          {DESCRIPTORS[descriptorIndex]}
        </span>
      </div>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Quick navigation">
        {navItems.map((item) => (
          <NavButton key={item.app} label={item.label} appId={item.app} />
        ))}
        <button
          type="button"
          onClick={onSearchOpen}
          className="min-h-9 rounded-md px-2.5 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5"
          style={{ fontSize: "12px" }}
        >
          Search
        </button>
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <ThemeButton mode="day" current={theme} setTheme={setTheme} label="Day" />
        <ThemeButton mode="night" current={theme} setTheme={setTheme} label="Night" />
        <ThemeButton mode="dark" current={theme} setTheme={setTheme} label="Dark" />
        <span className="hidden items-center gap-1 sm:flex" title="Available for strategy calls">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          <span className="text-xs" style={{ fontSize: "12px" }}>Open</span>
        </span>
        <span className="hidden font-mono text-xs lg:inline" style={{ fontSize: "12px" }}>
          {date}
        </span>
        <span className="font-mono text-xs tabular-nums" style={{ fontSize: "12px" }}>
          {time} IST
        </span>
        <button
          type="button"
          onClick={onSearchOpen}
          className="min-h-9 rounded-md px-2 text-xs font-medium md:hidden"
          aria-label="Search"
        >
          ⌕
        </button>
      </div>
    </header>
  );
}

function NavButton({ label, appId }: { label: string; appId: string }) {
  const { openApp } = useOS();
  return (
    <button
      type="button"
      onClick={() => openApp(appId, label)}
      className="min-h-9 rounded-md px-2.5 text-xs font-medium hover:bg-black/5"
      style={{ fontSize: "12px" }}
    >
      {label}
    </button>
  );
}

function ThemeButton({
  mode,
  current,
  setTheme,
  label,
}: {
  mode: ThemeMode;
  current: ThemeMode;
  setTheme: (m: ThemeMode) => void;
  label: string;
}) {
  const active = current === mode;
  return (
    <button
      type="button"
      onClick={() => setTheme(mode)}
      className="min-h-9 rounded-md px-2 text-xs font-medium"
      style={{
        fontSize: "11px",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--text-secondary)",
      }}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
