import { getSiteUrl } from "@/lib/env";

/** Kök domain + path — sonda slash yok (Next metadataBase ile uyumlu). */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") return base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * Admin alanından girilen kanonik URL göreli olabilir; her zaman mutlak ve tekilleştirilmiş döner.
 * Tam URL farklı host’a işaret ediyorsa (hata / dış canonical) `fallbackAbsolute` kullanılır.
 */
export function resolveCanonicalUrl(
  custom: string | null | undefined,
  fallbackAbsolute: string
): string {
  const t = custom?.trim();
  if (!t) return fallbackAbsolute;
  if (/^https?:\/\//i.test(t)) {
    try {
      const customUrl = new URL(t);
      const fallbackUrl = new URL(fallbackAbsolute);
      if (customUrl.host === fallbackUrl.host) {
        return t;
      }
      return fallbackAbsolute;
    } catch {
      return fallbackAbsolute;
    }
  }
  return absoluteUrl(t);
}
