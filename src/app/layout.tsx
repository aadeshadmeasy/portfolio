import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { ownerProfile } from "@/content/owner-profile";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${ownerProfile.identity.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${ownerProfile.identity.fullName} · ${ownerProfile.identity.osName}`,
    template: `%s · ${ownerProfile.identity.fullName}`,
  },
  description: ownerProfile.identity.positioning,
  openGraph: {
    title: `${ownerProfile.identity.fullName} — ${ownerProfile.identity.headline}`,
    description: ownerProfile.identity.positioning,
    url: siteUrl,
    siteName: ownerProfile.identity.osName,
    type: "website",
    images: [{ url: "/assets/sprite-aadesh.png", width: 512, height: 512, alt: ownerProfile.identity.fullName }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
