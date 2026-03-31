import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { postId } = (await req.json()) as { postId?: string };
  if (!postId) return NextResponse.json({ ok: false }, { status: 400 });

  const service = createSupabaseServiceRoleClient();
  if (service) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
    await service.from("post_engagement_events").insert({
      post_id: postId,
      user_id: user?.id ?? null,
      event_type: "share",
    });
  }

  return NextResponse.json({ ok: true });
}

