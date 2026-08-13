"use client";

import { useState } from "react";
import Image from "next/image";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

type Mood = "happy" | "sad";

export function Companion() {
  const [mood, setMood] = useState<Mood>("happy");
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div className="companion-zone">
      <div className="retro-panel flex items-end gap-2 p-2">
        <Image
          src="/assets/companion-pixel.png"
          alt=""
          width={40}
          height={40}
          style={{ imageRendering: "pixelated" }}
        />
        <div className="flex flex-col gap-1">
          <button type="button" className="retro-btn text-xs px-2 py-1" onClick={() => setMood("happy")}>
            HAPPY
          </button>
          <button type="button" className="retro-btn text-xs px-2 py-1" onClick={() => setMood("sad")}>
            SAD
          </button>
          <button
            type="button"
            className="retro-btn text-xs px-2 py-1"
            onClick={() => setSoundOn((s) => !s)}
          >
            {soundOn ? "SOUND ON" : "SOUND OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}
