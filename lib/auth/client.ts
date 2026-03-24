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
 * OAuth `redirectTo` — her zaman **aktif sekmenin kökü** (`window.location.origin`).
 * Böylece www / apex / port çerez alanı ile callback aynı host’ta kalır.
 * Supabase Dashboard’da hem www hem apex için `/auth/callback` izinleri ekleyin.
 *
 * Sunucu tarafında (e-posta şablonları vb.) `NEXT_PUBLIC_SITE_URL` kullanılır.
 */
export function getAuthCallbackUrl(nextPath = "/"): string {
  const path = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        "http://localhost:3000";
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
