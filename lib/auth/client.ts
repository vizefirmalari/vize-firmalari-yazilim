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

export function getAuthCallbackUrl(nextPath = "/"): string {
  const origin = getBrowserOrigin();
  const path = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
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
