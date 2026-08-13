import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";

export function DesktopPortrait() {
  return (
    <div className="desktop-portrait" aria-hidden>
      <Image
        src="/assets/character-aadesh.png"
        alt=""
        width={160}
        height={320}
        priority
        style={{ imageRendering: "pixelated", objectFit: "contain" }}
      />
    </div>
  );
}
