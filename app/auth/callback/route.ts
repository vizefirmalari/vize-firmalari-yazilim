import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { safeAuthRedirectPath } from "@/lib/auth/client";

/**
 * PKCE kodu → oturum çerezleri. Çerezler `successResponse` üzerine yazılır (redirect ile birlikte gider).
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const host = request.headers.get("host") ?? requestUrl.host;
  const origin = requestUrl.origin;
  const code = requestUrl.searchParams.get("code");
  const nextPath = safeAuthRedirectPath(
    requestUrl.searchParams.get("next"),
    "/hesabim"
  );
  const redirectTarget = new URL(nextPath, origin).toString();

  const errorRedirect = NextResponse.redirect(
    new URL("/auth/auth-code-error", origin)
  );
  errorRedirect.headers.set("Cache-Control", "no-store, must-revalidate");

  if (process.env.NODE_ENV === "development") {
    console.log("[auth/callback] host=", host, "origin=", origin, "next=", nextPath);
  }

  if (!code) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth/callback] code yok → auth-code-error");
    }
    return errorRedirect;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return errorRedirect;
  }

  const successResponse = NextResponse.redirect(redirectTarget);
  successResponse.headers.set("Cache-Control", "no-store, must-revalidate");

  let cookiesWritten = 0;
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesWritten += cookiesToSet.length;
        cookiesToSet.forEach(({ name, value, options }) => {
          successResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[auth/callback] exchangeCodeForSession:", error.message);
    }
    return errorRedirect;
  }

  if (process.env.NODE_ENV === "development") {
    const { data: userData } = await supabase.auth.getUser();
    console.log(
      "[auth/callback] OK cookies set count=",
      cookiesWritten,
      "user=",
      userData.user?.id ?? "(none)"
    );
  }

  return successResponse;
}
