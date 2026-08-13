"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ThemeMode } from "@/lib/types";
import { THEME_CYCLE_MS } from "@/lib/themes";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

const ORDER: ThemeMode[] = ["day", "night", "dark"];

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("day");
  const [ready, setReady] = useState(false);
  const manualPauseUntil = useRef(0);

  useEffect(() => {
    const stored = readStorage<ThemeMode>(STORAGE_KEYS.theme, "day");
    setThemeState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    writeStorage(STORAGE_KEYS.theme, theme);
  }, [theme, ready]);

  const cycleTheme = useCallback(() => {
    setThemeState((t) => {
      const idx = ORDER.indexOf(t);
      return ORDER[(idx + 1) % ORDER.length];
    });
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    manualPauseUntil.current = Date.now() + 45_000;
    setThemeState(mode);
  }, []);

  // Auto-cycle backgrounds every ~18s (user can pause briefly by clicking theme pill)
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      if (Date.now() < manualPauseUntil.current) return;
      cycleTheme();
    }, THEME_CYCLE_MS);
    return () => clearInterval(id);
  }, [ready, cycleTheme]);

  return { theme, setTheme, cycleTheme, ready };
}
