import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/env";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VizeFirmalari",
    template: "%s | VizeFirmalari",
  },
  description:
    "Vize danışmanlık firmalarını karşılaştırın; güven endeksi, hizmetler ve iletişim bilgileri tek yerde.",
  applicationName: "VizeFirmalari",
  formatDetection: { telephone: true, email: true, address: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body
        className={`${plusJakarta.className} min-h-full flex flex-col bg-[#F7F9FB] text-[#1A1A1A]`}
      >
        {children}
      </body>
    </html>
  );
}
