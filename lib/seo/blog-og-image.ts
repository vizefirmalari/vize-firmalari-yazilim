import { getSiteUrl } from "@/lib/env";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

/** Panel önerisi ile uyumlu; Facebook / LinkedIn kartları için tipik oran. */
export const BLOG_HERO_OG_WIDTH = 1200;
export const BLOG_HERO_OG_HEIGHT = 630;

export type BlogOgImageResolved = {
  url: string;
  width: number;
  height: number;
  alt: string;
  /** Gerçek hero kullanıldı mı (false = site varsayılanı) */
  usesHero: boolean;
};

/**
 * Sosyal önizleme için mutlak HTTPS görsel URL’si.
 * - `http(s)://` → normalize edilmiş tam URL
 * - `//cdn...` → https eklenir
 * - `/path` → site kökü ile birleştirilir
 * - `blob:`, `data:` geçersiz
 */
export function resolveToAbsoluteImageUrl(raw: string | null | undefined): string | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower.startsWith("blob:") || lower.startsWith("data:")) return null;

  try {
    if (value.startsWith("//")) {
      return new URL(`https:${value}`).href;
    }
    if (/^https?:\/\//i.test(value)) {
      const u = new URL(value);
      if (u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1")) {
        return u.href;
      }
      if (u.protocol === "http:") {
        u.protocol = "https:";
      }
      return u.href;
    }
    const site = getSiteUrl().replace(/\/$/, "");
    const path = value.startsWith("/") ? value : `/${value}`;
    return new URL(path, `${site}/`).href;
  } catch {
    return null;
  }
}

/**
 * Firma blog yazısı Open Graph / Twitter görseli.
 * Hero yoksa veya URL geçersizse site varsayılanı (Storage CDN, mutlak URL).
 */
export function resolveFirmBlogPostOgImage(input: {
  coverImageUrl: string | null | undefined;
  coverImageAlt: string | null | undefined;
  title: string;
}): BlogOgImageResolved {
  const defaultShare = resolveDefaultSiteShareImage();
  const defaultAbs = resolveToAbsoluteImageUrl(defaultShare.url) ?? defaultShare.url;
  const title = String(input.title ?? "").trim();
  const altFromCover = String(input.coverImageAlt ?? "").trim();

  const heroAbs = resolveToAbsoluteImageUrl(input.coverImageUrl);
  if (!heroAbs) {
    return {
      url: defaultAbs,
      width: BLOG_HERO_OG_WIDTH,
      height: BLOG_HERO_OG_HEIGHT,
      alt: defaultShare.alt,
      usesHero: false,
    };
  }

  return {
    url: heroAbs,
    width: BLOG_HERO_OG_WIDTH,
    height: BLOG_HERO_OG_HEIGHT,
    alt: (altFromCover || title || defaultShare.alt).slice(0, 200),
    usesHero: true,
  };
}
