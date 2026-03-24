import { createClient } from "@supabase/supabase-js";

/**
 * Oturum çerezi olmadan anon anahtar ile okuma — SSG / `generateStaticParams`
 * ve diğer build-time aşamalarında `cookies()` kullanılamaz.
 * Yalnızca RLS ile anon'a açık veriler için kullanın.
 */
export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
