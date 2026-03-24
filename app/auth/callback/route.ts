import { NextResponse } from "next/server";

import { safeAuthRedirectPath } from "@/lib/auth/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * OAuth ve e-posta doğrulama / şifre sıfırlama PKCE kodu değişimi.
 * Supabase Dashboard → Redirect URLs içinde bu kök + `/auth/callback` izinli olmalı.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = safeAuthRedirectPath(searchParams.get("next"), "/hesabim");

  if (code) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.redirect(new URL("/auth/auth-code-error", origin));
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocal = process.env.NODE_ENV === "development";
      if (isLocal) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(new URL("/auth/auth-code-error", origin));
}
