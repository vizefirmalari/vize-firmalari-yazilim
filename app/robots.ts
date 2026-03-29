import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";

/**
 * Özel / oturum / yönetim / firma paneli yolları kapatılır.
 * Kamu listeleri, firma profilleri ve (ileride) panelden yayınlanıp açık URL’ye taşınan içerikler endekslenebilir.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/panel",
        "/hesabim",
        "/giris",
        "/kayit",
        "/firma-ekle",
        "/sifre-unuttum",
        "/sifre-yenile",
        "/auth",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
