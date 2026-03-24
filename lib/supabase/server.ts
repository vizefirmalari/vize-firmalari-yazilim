import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server Components & Server Actions için.
 * Route Handler’da OAuth kod değişimi için `response` üzerine çerez yazan ayrı kalıp kullanın
 * (`app/auth/callback/route.ts` içindeki gibi); aksi halde redirect yanıtında Set-Cookie kaybolabilir.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          /* RSC içinde setAll bazen desteklenmez; middleware + callback yanıtı asıl kaynak */
        }
      },
    },
  });
}
