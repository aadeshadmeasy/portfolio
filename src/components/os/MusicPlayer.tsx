"use client";

import { useEffect, useState } from "react";
import { musicTracks } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const track = musicTracks[index];

  useEffect(() => {
    readStorage(STORAGE_KEYS.media, { volume: 0.5 });
  }, []);

  const toggle = () => setPlaying((p) => !p);

  const next = () => setIndex((i) => (i + 1) % musicTracks.length);
  const prev = () => setIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[5600] flex items-center gap-3 border-t px-4 py-2"
      style={{ background: "var(--dock-bg)", borderColor: "var(--border)" }}
      aria-label="Music player"
    >
      <button type="button" onClick={prev} className="min-h-11 min-w-11 text-sm" aria-label="Previous track">
        ⏮
      </button>
      <button
        type="button"
        onClick={toggle}
        className="min-h-11 min-w-11 rounded-full text-sm font-semibold"
        style={{ background: "var(--accent)", color: "#fff" }}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <button type="button" onClick={next} className="min-h-11 min-w-11 text-sm" aria-label="Next track">
        ⏭
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{track.title}</p>
        <p className="truncate text-xs text-[var(--text-muted)]">{track.artist}</p>
      </div>
      <p className="hidden text-[10px] text-[var(--text-muted)] sm:block">{track.license}</p>
    </div>
  );
}
