import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { postId } = (await req.json()) as { postId?: string };
  const supabase = await createSupabaseServerClient();
  if (!supabase || !postId) return NextResponse.json({ ok: false }, { status: 400 });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "Giriş gerekli" }, { status: 401 });

  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing?.id) {
    await supabase.from("post_likes").delete().eq("id", existing.id);
  } else {
    await supabase.from("post_likes").insert({ post_id: postId, user_id: user.id });
  }

  const { data: all } = await supabase.from("post_likes").select("id").eq("post_id", postId);
  return NextResponse.json({ ok: true, liked: !existing?.id, likeCount: (all ?? []).length });
}

