import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthModalProvider } from "@/components/auth/auth-modal-context";
import { AuthShell } from "@/components/auth/auth-shell";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
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
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "w50me76ko5");`}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108351445', 'ym');

ym(108351445, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HJ78HJHHMZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HJ78HJHHMZ');`}
        </Script>
      </head>
      <body
        className={`${plusJakarta.className} min-h-full flex flex-col bg-[#F7F9FB] text-[#1A1A1A]`}
      >
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108351445"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <OrganizationJsonLd />
        <AuthModalProvider>
          {children}
          <AuthShell />
          <MobileTabBar />
        </AuthModalProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
