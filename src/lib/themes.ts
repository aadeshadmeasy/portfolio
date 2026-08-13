import type { ThemeMode } from "@/lib/types";

/** Full-resolution scene wallpapers (1920×1080 source art). */
export const themeWallpapers: Record<ThemeMode, string> = {
  day: "/assets/wallpaper-day.png",
  night: "/assets/wallpaper-night.png",
  dark: "/assets/wallpaper-dark.png",
};

/** Small overlay sprites for additive motion (e.g. mug steam). */
export const wallpaperSprites = {
  steam: "/assets/sprites/steam.png",
} as const;

export const themeLabels: Record<ThemeMode, string> = {
  day: "DAY",
  night: "NIGHT",
  dark: "DARK",
};

export const THEME_CYCLE_MS = 18_000;
