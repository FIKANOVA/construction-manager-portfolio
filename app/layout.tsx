import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// import LenisProvider from "./providers/LenisProvider"; // Removed, moving to (site)/layout.tsx

import { siteConfig } from "@/site-config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.clientName} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: ["construction manager", "GIS specialist", "project management", "M&E strategy", "AI training data", "digital product lead"],
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    title: `${siteConfig.clientName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.baseUrl,
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
