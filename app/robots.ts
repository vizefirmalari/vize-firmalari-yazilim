import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";

/**
 * Özel / oturum / yönetim yolları kapatılır. Kamu listeleri ve firma profilleri açık kalır.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
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
