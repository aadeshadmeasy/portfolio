"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BootScreen } from "@/components/os/BootScreen";
import { SystemNav } from "@/components/os/SystemNav";
import { Wallpaper } from "@/components/os/Wallpaper";
import { AppGrid } from "@/components/os/AppGrid";
import { DailyTransmission } from "@/components/os/DailyTransmission";
import { WindowManager } from "@/components/os/WindowManager";
import { Dock } from "@/components/os/Dock";
import { MusicPlayer } from "@/components/os/MusicPlayer";
import { DesktopPortrait } from "@/components/os/DesktopPortrait";
import { Companion } from "@/components/os/Companion";
import { BookingPing } from "@/components/os/BookingPing";
import { CallTab } from "@/components/os/CallTab";
import { CommandPalette } from "@/components/os/CommandPalette";
import { OSProvider } from "@/components/os/OSProvider";

export function Desktop() {
  const [booted, setBooted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const onBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <OSProvider>
      {!booted && <BootScreen onComplete={onBootComplete} />}
      <div className="os-shell">
        <Wallpaper />
        <SystemNav onSearchOpen={() => setSearchOpen(true)} />
        <main className="os-desktop">
          <div className="os-desktop-layout">
            <AppGrid />
            <DailyTransmission />
          </div>
        </main>
        <DesktopPortrait />
        <WindowManager />
        <Dock />
        <MusicPlayer />
        <Companion />
        <BookingPing />
        <CallTab />
        <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </OSProvider>
  );
}
