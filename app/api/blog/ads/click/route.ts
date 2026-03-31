import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

const SESSION_COOKIE = "vf_ads_sid";

function isSafeHttpUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const adId = url.searchParams.get("adId")?.trim() || "";
  const postId = url.searchParams.get("postId")?.trim() || null;
  const slot = (url.searchParams.get("slot")?.trim() || "") as "top" | "middle" | "bottom";
  const target = url.searchParams.get("target")?.trim() || "";

  if (!adId || !["top", "middle", "bottom"].includes(slot) || !isSafeHttpUrl(target)) {
    return NextResponse.redirect(new URL("/", url.origin), { status: 302 });
  }

  const supabase = createSupabaseServiceRoleClient();
  if (supabase) {
    const cookieStore = await cookies();
    let sessionKey = cookieStore.get(SESSION_COOKIE)?.value ?? "";
    if (!sessionKey) {
      sessionKey = crypto.randomUUID();
      cookieStore.set(SESSION_COOKIE, sessionKey, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    await supabase.from("blog_ad_events").insert({
      blog_ad_id: adId,
      post_id: postId,
      slot_position: slot,
      event_type: "click",
      session_key: sessionKey,
    });
  }

  return NextResponse.redirect(target, { status: 302 });
}

