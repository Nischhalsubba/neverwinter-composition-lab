import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neverwinter-composition-lab.vercel.app"),
  title: {
    default: "Neverwinter Composition Lab",
    template: "%s | Neverwinter Composition Lab",
  },
  description: "Patch-aware Neverwinter endgame planning, support coverage, and transparent buff/debuff math.",
  applicationName: "Neverwinter Composition Lab",
  keywords: [
    "Neverwinter",
    "Neverwinter team builder",
    "Neverwinter trial planner",
    "Neverwinter dungeon setup",
    "Neverwinter buffs and debuffs",
    "Neverwinter companions",
    "Neverwinter artifacts",
    "Neverwinter composition lab",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://neverwinter-composition-lab.vercel.app/",
    siteName: "Neverwinter Composition Lab",
    title: "Neverwinter Composition Lab",
    description: "Build stronger Neverwinter trial and dungeon teams with transparent buff, debuff, artifact, companion, and mount planning.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Neverwinter Composition Lab social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neverwinter Composition Lab",
    description: "Patch-aware Neverwinter team builder for trials, dungeons, buffs, debuffs, artifacts, companions, and mounts.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
