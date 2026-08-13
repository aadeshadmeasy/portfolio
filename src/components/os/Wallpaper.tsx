"use client";

import { useOS } from "@/components/os/OSProvider";
import { themeWallpapers, wallpaperSprites } from "@/lib/themes";

/** Mug position on dark wallpaper (percent of scene inner box). */
const MUG_STEAM = { left: 34.8, top: 68.2 };

function SceneInner({
  theme,
  children,
}: {
  theme: "day" | "night" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div className={`wp-scene-inner wp-scene-inner--${theme}`}>
      {children}
    </div>
  );
}

export function Wallpaper() {
  const { theme } = useOS();

  return (
    <div className={`os-wallpaper os-wallpaper--${theme}`} aria-hidden>
      <div className="wallpaper-scene" key={theme}>
        <div className={`wp-scene-track wp-scene-track--${theme}`}>
          <SceneInner theme={theme}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={themeWallpapers[theme]}
              alt=""
              className="wp-scene-base"
              draggable={false}
            />
            {theme === "dark" && (
              <div
                className="wp-mug-steam-anchor"
                style={{ left: `${MUG_STEAM.left}%`, top: `${MUG_STEAM.top}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wallpaperSprites.steam}
                  alt=""
                  className="wp-sprite-steam"
                  draggable={false}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wallpaperSprites.steam}
                  alt=""
                  className="wp-sprite-steam wp-sprite-steam-2"
                  draggable={false}
                />
              </div>
            )}
          </SceneInner>
        </div>
      </div>
      <div className="os-wallpaper-scanlines" />
    </div>
  );
}
