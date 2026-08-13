"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useWindows } from "@/hooks/useWindows";

type OSContextValue = ReturnType<typeof useTheme> &
  ReturnType<typeof useWindows> & {
    openApp: (appId: string, title: string) => void;
  };

const OSContext = createContext<OSContextValue | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const themeApi = useTheme();
  const windowApi = useWindows();

  const value = useMemo<OSContextValue>(
    () => ({
      ...themeApi,
      ...windowApi,
      openApp: windowApi.openWindow,
    }),
    [themeApi, windowApi],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used within OSProvider");
  return ctx;
}
