import Image from "next/image";
import { ownerProfile } from "@/content/owner-profile";

export function DesktopPortrait() {
  return (
    <div className="desktop-portrait" aria-hidden>
      <Image
        src={ownerProfile.identity.sprite}
        alt=""
        width={140}
        height={280}
        priority
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
