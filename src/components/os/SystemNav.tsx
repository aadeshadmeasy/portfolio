"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";

export function SystemNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const { openApp } = useOS();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

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
          day: "numeric",
          month: "short",
          timeZone: ownerProfile.identity.timezone,
        }),
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const navItems = [
    { label: "WORK", app: "projects" },
    { label: "PROOF", app: "results" },
    { label: "JOURNEY", app: "journey" },
  ];

  return (
    <header className="os-taskbar" role="banner">
      <div className="flex items-center gap-1 border-r-2 border-[var(--border)] px-2">
        <Image
          src="/assets/sprite-aadesh.png"
          alt=""
          width={18}
          height={18}
          style={{ imageRendering: "pixelated" }}
        />
        <span className="font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-press-start)", fontSize: "8px" }}>
          {ownerProfile.identity.osName.replace(" ", " ")}
        </span>
      </div>

      <nav className="flex items-stretch" aria-label="Main menu">
        {navItems.map((item) => (
          <button
            key={item.app}
            type="button"
            onClick={() => openApp(item.app, item.label)}
            className="retro-btn border-0 border-r-2 border-[var(--border)] rounded-none px-3"
            style={{ boxShadow: "none", fontSize: "14px" }}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onSearchOpen}
          className="retro-btn border-0 rounded-none px-3"
          style={{ boxShadow: "none", fontSize: "14px" }}
        >
          SEARCH
        </button>
      </nav>

      <div className="ml-auto flex items-stretch">
        <div className="flex items-center gap-2 border-l-2 border-[var(--border)] px-2 text-sm">
          <span className="retro-panel px-2 py-0.5 text-xs font-bold" style={{ background: "#00aa00", color: "#fff" }}>
            BUILDING
          </span>
          <span aria-hidden>▮▮▮▯</span>
        </div>
        <div className="flex items-center border-l-2 border-[var(--border)] px-3 font-mono text-sm tabular-nums">
          <span className="hidden sm:inline">{date} · </span>
          {time} IST
        </div>
      </div>
    </header>
  );
}
