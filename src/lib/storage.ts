export const STORAGE_KEYS = {
  theme: "personal-os-theme-v1",
  layout: "personal-os-layout-v1",
  whiteboard: "personal-os-whiteboard-v1",
  widgets: "personal-os-widgets-v1",
  media: "personal-os-media-v1",
  boot: "personal-os-boot-v1",
  companion: "personal-os-companion-v1",
} as const;

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}
