"use client";

import { useCallback, useEffect, useState } from "react";
import type { ThemeMode } from "@/lib/types";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("day");
  const [ready, setReady] = useState(false);

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
    setThemeState((t) => (t === "day" ? "night" : t === "night" ? "dark" : "day"));
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => setThemeState(mode), []);

  return { theme, setTheme, cycleTheme, ready };
}
