import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ownerProfile } from "@/content/owner-profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
    images: [{ url: "/assets/avatar-hero.png", width: 512, height: 512, alt: ownerProfile.identity.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ownerProfile.identity.fullName} — ${ownerProfile.identity.headline}`,
    description: ownerProfile.identity.positioning,
    images: ["/assets/avatar-hero.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: ownerProfile.identity.fullName,
              jobTitle: ownerProfile.identity.profession,
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: "New Delhi",
                addressCountry: "IN",
              },
              worksFor: {
                "@type": "Organization",
                name: ownerProfile.company.brand,
                legalName: ownerProfile.company.legalName,
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
