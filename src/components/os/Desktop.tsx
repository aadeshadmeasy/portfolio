"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/components/os/BootScreen";
import { SystemNav } from "@/components/os/SystemNav";
import { AppGrid } from "@/components/os/AppGrid";
import { WindowManager } from "@/components/os/WindowManager";
import { MusicPlayer } from "@/components/os/MusicPlayer";
import { DesktopPortrait } from "@/components/os/DesktopPortrait";
import { Companion } from "@/components/os/Companion";
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
          <div className="os-desktop-main">
            <AppGrid />
          </div>
        </main>
        <DesktopPortrait />
        <WindowManager />
        <MusicPlayer />
        <Companion />
        <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </OSProvider>
  );
}
