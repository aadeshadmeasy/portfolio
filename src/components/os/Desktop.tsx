"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/components/os/BootScreen";
import { SystemNav } from "@/components/os/SystemNav";
import { DailyTransmission } from "@/components/os/DailyTransmission";
import { IdentityBlock } from "@/components/os/IdentityBlock";
import { AppGrid } from "@/components/os/AppGrid";
import { WindowManager } from "@/components/os/WindowManager";
import { Dock } from "@/components/os/Dock";
import { MusicPlayer } from "@/components/os/MusicPlayer";
import { CallTab } from "@/components/os/CallTab";
import { Companion, BookingPing } from "@/components/os/Companion";
import { CommandPalette } from "@/components/os/CommandPalette";
import { OSProvider } from "@/components/os/OSProvider";

export function Desktop() {
  const [booted, setBooted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPing(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const onBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <OSProvider>
      {!booted && <BootScreen onComplete={onBootComplete} />}
      <div className="os-shell">
        <div className="os-wallpaper" aria-hidden />
        <SystemNav onSearchOpen={() => setSearchOpen(true)} />
        <main className="os-desktop">
          <div className="flex flex-col gap-0 lg:flex-row lg:items-start lg:justify-between">
            <DailyTransmission />
            <div className="hidden lg:block lg:w-8" />
          </div>
          <IdentityBlock />
          <AppGrid />
          <CallTab />
        </main>
        <WindowManager />
        <Dock />
        <MusicPlayer />
        <Companion />
        <BookingPing visible={showPing} onDismiss={() => setShowPing(false)} />
        <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </OSProvider>
  );
}
