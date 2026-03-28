import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthModalProvider } from "@/components/auth/auth-modal-context";
import { AuthShell } from "@/components/auth/auth-shell";
import { SITE_FAVICON_URL } from "@/lib/constants";
import { getSiteUrl } from "@/lib/env";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
} from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { OrganizationJsonLd } from "@/lib/seo/organization-jsonld";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

const defaultShare = resolveDefaultSiteShareImage();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: SITE_FAVICON_URL, type: "image/png", sizes: "any" }],
    shortcut: [{ url: SITE_FAVICON_URL, type: "image/png" }],
    apple: [{ url: SITE_FAVICON_URL, type: "image/png" }],
  },
  title: {
    default: SITE_DEFAULT_TITLE,
    template: `%s | ${SITE_BRAND_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_BRAND_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_BRAND_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [{ url: defaultShare.url, alt: defaultShare.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [defaultShare.url],
  },
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
        <OrganizationJsonLd />
        <AuthModalProvider>
          {children}
          <AuthShell />
        </AuthModalProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
