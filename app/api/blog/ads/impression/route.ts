import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

const SESSION_COOKIE = "vf_ads_sid";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      adId?: string;
      postId?: string;
      slot?: "top" | "middle" | "bottom";
    };
    const adId = body.adId?.trim() || "";
    const postId = body.postId?.trim() || null;
    const slot = body.slot;
    if (!adId || !slot) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = createSupabaseServiceRoleClient();
    if (!supabase) return NextResponse.json({ ok: true }, { status: 200 });

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
      event_type: "impression",
      session_key: sessionKey,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

