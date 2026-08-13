"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { musicTracks } from "@/content/owner-profile";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const track = musicTracks[index];

  useEffect(() => {
    const stored = readStorage<{ volume: number }>(STORAGE_KEYS.media, { volume: 0.4 });
    if (audioRef.current) audioRef.current.volume = stored.volume;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, index]);

  const toggle = () => setPlaying((p) => !p);
  const next = () => {
    setPlaying(false);
    setIndex((i) => (i + 1) % musicTracks.length);
  };
  const prev = () => {
    setPlaying(false);
    setIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length);
  };

  const onTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  }, []);

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (audioRef.current) audioRef.current.volume = v;
    writeStorage(STORAGE_KEYS.media, { volume: v });
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onEnded={next}
        preload="none"
      />
      <div className="os-music-bar" aria-label="Music player">
        <button type="button" onClick={prev} className="retro-btn" aria-label="Previous track">
          PREV
        </button>
        <button
          type="button"
          onClick={toggle}
          className="retro-btn retro-btn-primary px-5"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "PAUSE" : "PLAY"}
        </button>
        <button type="button" onClick={next} className="retro-btn" aria-label="Next track">
          NEXT
        </button>
        <div className="min-w-0 flex-1 px-2">
          <p className="truncate font-bold uppercase" style={{ fontSize: "14px" }}>
            {track.title}
          </p>
          <p className="truncate text-sm text-[var(--text-muted)]">{track.artist}</p>
          <div className="retro-panel mt-1 h-2 w-full overflow-hidden">
            <div className="h-full bg-[var(--accent-warm)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.4}
          onChange={onVolume}
          aria-label="Volume"
          className="w-16"
        />
      </div>
    </>
  );
}
