"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";
import { useOS } from "@/components/os/OSProvider";
import type { ThemeMode } from "@/lib/types";
import { themeLabels } from "@/lib/themes";

export function SystemNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const { theme, setTheme, openApp, cycleTheme } = useOS();
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
        now
          .toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            timeZone: ownerProfile.identity.timezone,
          })
          .toUpperCase(),
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

  const nextTheme = (): ThemeMode =>
    theme === "day" ? "night" : theme === "night" ? "dark" : "day";

  return (
    <header className="os-taskbar" role="banner">
      <div className="taskbar-brand">
        <Image
          src="/assets/character-aadesh.png"
          alt=""
          width={20}
          height={20}
          style={{ imageRendering: "pixelated", objectFit: "cover", objectPosition: "top" }}
        />
        <span>{ownerProfile.identity.osName.toUpperCase()}</span>
      </div>

      <nav aria-label="Main menu">
        {navItems.map((item) => (
          <button
            key={item.app}
            type="button"
            onClick={() => openApp(item.app, item.label)}
            className="taskbar-menu-btn"
          >
            {item.label}
          </button>
        ))}
        <button type="button" onClick={onSearchOpen} className="taskbar-menu-btn">
          SEARCH
        </button>
      </nav>

      <div className="taskbar-status">
        <button
          type="button"
          className="taskbar-pill dark-btn"
          onClick={() => setTheme(nextTheme())}
          aria-label={`Switch theme, current ${themeLabels[theme]}`}
        >
          {themeLabels[theme]}
        </button>
        <div className="taskbar-pill building">
          <span>■</span> BUILDING
        </div>
        <div className="taskbar-pill" aria-hidden>
          ▮▮▮▯
        </div>
        <button
          type="button"
          className="taskbar-pill cal-btn"
          onClick={() => openApp("calendar", "Calendar")}
          aria-label="Open calendar"
        >
          CAL
        </button>
        <div className="taskbar-pill" style={{ fontFamily: "var(--pixel-font)", fontSize: 13 }}>
          {date} {time} GMT+5:30
        </div>
      </div>
    </header>
  );
}
