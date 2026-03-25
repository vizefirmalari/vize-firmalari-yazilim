import { PUBLIC_SITE_CANONICAL_ORIGIN } from "@/lib/site-origin";

/**
 * SEO / metadata / sitemap kökü.
 * Production’da localhost içeren env yok sayılır; kanonik domain’e düşülür.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  const clean =
    raw && !/localhost|127\.0\.0\.1/i.test(raw) ? raw : undefined;

  if (clean) return clean;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === "production") {
    return PUBLIC_SITE_CANONICAL_ORIGIN;
  }

  return "http://localhost:3000";
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
