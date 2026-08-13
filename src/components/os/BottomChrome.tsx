"use client";

import { useEffect, useState } from "react";
import { Dock } from "@/components/os/Dock";
import { MusicPlayer } from "@/components/os/MusicPlayer";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export function BottomChrome() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(readStorage(STORAGE_KEYS.bottomBarExpanded, true));
  }, []);

  const toggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      writeStorage(STORAGE_KEYS.bottomBarExpanded, next);
      return next;
    });
  };

  if (!expanded) {
    return (
      <button
        type="button"
        className="bottom-chrome-tab"
        onClick={toggle}
        aria-label="Expand dock and music player"
      >
        ▲ DOCK &amp; MUSIC
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="bottom-chrome-collapse"
        onClick={toggle}
        aria-label="Collapse dock and music player"
      >
        ▼
      </button>
      <Dock />
      <MusicPlayer />
    </>
  );
}
