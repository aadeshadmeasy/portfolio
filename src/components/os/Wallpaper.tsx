"use client";

import Image from "next/image";
import { useOS } from "@/components/os/OSProvider";
import { themeWallpapers } from "@/lib/themes";

export function Wallpaper() {
  const { theme } = useOS();

  return (
    <div className="os-wallpaper" aria-hidden>
      <Image
        src={themeWallpapers[theme]}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="os-wallpaper-scanlines" />
    </div>
  );
}
