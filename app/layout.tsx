import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_FAVICON_URL } from "@/lib/constants";
import { getSiteUrl } from "@/lib/env";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: SITE_FAVICON_URL, type: "image/png", sizes: "any" }],
    shortcut: [{ url: SITE_FAVICON_URL, type: "image/png" }],
    apple: [{ url: SITE_FAVICON_URL, type: "image/png" }],
  },
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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
