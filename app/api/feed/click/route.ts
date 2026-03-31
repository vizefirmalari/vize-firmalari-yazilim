import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
  const postId = url.searchParams.get("postId")?.trim() || "";
  const target = url.searchParams.get("target")?.trim() || "";
  if (!postId || !target.startsWith("/") && !isSafeHttpUrl(target)) {
    return NextResponse.redirect(new URL("/akis", url.origin), { status: 302 });
  }

  const service = createSupabaseServiceRoleClient();
  if (service) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
    await service.from("post_engagement_events").insert({
      post_id: postId,
      user_id: user?.id ?? null,
      event_type: "click",
    });
  }

  if (target.startsWith("/")) {
    return NextResponse.redirect(new URL(target, url.origin), { status: 302 });
  }
  return NextResponse.redirect(target, { status: 302 });
}

