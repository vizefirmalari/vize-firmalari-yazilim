/**
 * Tarayıcıda OAuth `redirectTo` ve e-posta doğrulama URL'leri için kök adres.
 * Üretimde `NEXT_PUBLIC_SITE_URL` tanımlı olmalı (Vercel: Project URL veya custom domain).
 */
export function getBrowserOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

/**
 * OAuth `redirectTo` için tam callback URL’si.
 * - Lokalhost: tarayıcı kökü (port doğru kalır, örn. :3001).
 * - Üretim: `NEXT_PUBLIC_SITE_URL` varsa o (örn. https://www.vizefirmalari.com), yoksa `window.location.origin`.
 */
export function getAuthCallbackUrl(nextPath = "/"): string {
  const path = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  const envSite = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  let origin: string;
  if (typeof window !== "undefined") {
    const h = window.location.hostname;
    const loopback =
      h === "localhost" || h === "127.0.0.1" || h === "[::1]";
    origin = loopback ? window.location.origin : envSite || window.location.origin;
  } else {
    origin = envSite || "http://localhost:3000";
  }

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
