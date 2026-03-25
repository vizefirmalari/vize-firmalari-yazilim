/**
 * OAuth / e-posta doğrulama redirect kökü.
 * Üretimde localhost env hatası veya eksik env ile asla localhost’a düşülmez.
 */

import { PUBLIC_SITE_CANONICAL_ORIGIN } from "@/lib/site-origin";

export { PUBLIC_SITE_CANONICAL_ORIGIN };

function isLoopbackHostname(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]"
  );
}

function envSiteCandidates(): { primary: string | undefined; raw: string | undefined } {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const app = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  return { primary: site || app, raw: site || app };
}

function isLocalOrigin(url: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(url);
}

/**
 * signInWithOAuth `redirectTo` ve e-posta `redirectTo` için kök URL.
 * - Tarayıcı + localhost → mevcut port/kök.
 * - Tarayıcı + canlı host → NEXT_PUBLIC_* (localhost içermiyorsa), yoksa kanonik www.
 * - Sunucu + development → env veya http://localhost:3000.
 * - Sunucu + production → temiz env veya kanonik www (asla localhost).
 */
export function resolveAuthSiteOrigin(): string {
  const { primary: envUrl } = envSiteCandidates();

  if (typeof window !== "undefined") {
    if (isLoopbackHostname(window.location.hostname)) {
      return window.location.origin;
    }
    if (envUrl && !isLocalOrigin(envUrl)) {
      return envUrl;
    }
    return PUBLIC_SITE_CANONICAL_ORIGIN;
  }

  if (process.env.NODE_ENV === "development") {
    if (envUrl) return envUrl;
    return "http://localhost:3000";
  }

  if (envUrl && !isLocalOrigin(envUrl)) {
    return envUrl;
  }
  return PUBLIC_SITE_CANONICAL_ORIGIN;
}

/** @deprecated `resolveAuthSiteOrigin` kullanın */
export function getBrowserOrigin(): string {
  return resolveAuthSiteOrigin();
}

/**
 * Supabase `redirectTo` — örn. https://www.vizefirmalari.com/auth/callback?next=%2Fhesabim
 */
export function getAuthCallbackUrl(nextPath = "/hesabim"): string {
  const path = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  const origin = resolveAuthSiteOrigin();
  return `${origin}/auth/callback?next=${encodeURIComponent(path)}`;
}

/** Açık yönlendirme önlemi: yalnızca kök-relative tek / ile başlayan yollar */
export function safeAuthRedirectPath(
  next: string | null | undefined,
  fallback = "/hesabim"
): string {
  if (!next || typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}
