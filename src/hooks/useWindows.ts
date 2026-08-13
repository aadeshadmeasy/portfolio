"use client";

import { useCallback, useState } from "react";
import type { WindowState } from "@/lib/types";

let zCounter = 1000;

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((appId: string, title: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        zCounter += 1;
        return prev.map((w) =>
          w.id === existing.id ? { ...w, zIndex: zCounter } : w,
        );
      }
      zCounter += 1;
      const id = `${appId}-${Date.now()}`;
      return [
        ...prev,
        { id, appId, title, zIndex: zCounter, maximized: false },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w)),
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w,
      ),
    );
  }, []);

  const closeAll = useCallback(() => setWindows([]), []);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMaximize,
    closeAll,
  };
}
