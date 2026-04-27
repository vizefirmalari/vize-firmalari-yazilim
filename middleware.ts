import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  indexNowKeyFromTxtPath,
  normalizeIndexNowKeyFromEnv,
} from "@/lib/seo/indexnow";
import { resolveLegacySlugRedirectPath } from "@/lib/seo/legacy-slug-redirects";

function withNoStore(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

/** Firma paneli — arama motorlarına URL düşmesin (meta ile birlikte HTTP başlığı). */
function withPrivateNoIndex(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

/**
 * Tüm sayfalarda Supabase oturumunu yeniler; çerezler request/response ile senkron kalır.
 * /admin/* için ek olarak admin rolü kontrolü.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const legacyRedirectPath = resolveLegacySlugRedirectPath(pathname);
  if (legacyRedirectPath) {
    const redirectUrl = new URL(legacyRedirectPath, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const indexNowKey = normalizeIndexNowKeyFromEnv();
  if (indexNowKey) {
    const pathKey = indexNowKeyFromTxtPath(pathname);
    if (pathKey && pathKey === indexNowKey) {
      return new NextResponse(indexNowKey, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  }

  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(
        new URL("/admin/login?error=config", request.url)
      );
    }
    return withNoStore(response);
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname.startsWith("/panel") || pathname.startsWith("/abonelik-sec")) {
    if (!user) {
      const next = `${pathname}${request.nextUrl.search}`;
      return withPrivateNoIndex(
        NextResponse.redirect(
          new URL(`/?auth=login&next=${encodeURIComponent(next)}`, request.url)
        )
      );
    }
    return withPrivateNoIndex(response);
  }

  if (
    process.env.NODE_ENV === "development" &&
    (pathname === "/hesabim" || pathname === "/auth/callback")
  ) {
    const h = request.headers.get("host");
    console.log(
      "[middleware]",
      pathname,
      "host=",
      h,
      "user=",
      user?.id ?? "null"
    );
  }

  if (!pathname.startsWith("/admin")) {
    return withNoStore(response);
  }

  if (pathname.startsWith("/admin/login")) {
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.role === "admin") {
        return withPrivateNoIndex(
          NextResponse.redirect(new URL("/admin", request.url))
        );
      }
    }
    return withPrivateNoIndex(response);
  }

  if (!user) {
    return withPrivateNoIndex(
      NextResponse.redirect(new URL("/admin/login", request.url))
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return withPrivateNoIndex(
      NextResponse.redirect(new URL("/admin/login?error=forbidden", request.url))
    );
  }

  return withPrivateNoIndex(response);
}

export const config = {
  matcher: [
    /*
     * Oturum çerezlerinin güncel kalması için uygulama rotalarının çoğu.
     * Hariç: Next statik/image, favicon, yaygın statik uzantılar.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon\\.jpg|robots\\.txt|sitemap\\.xml|sitemaps(?:/.*)?|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
