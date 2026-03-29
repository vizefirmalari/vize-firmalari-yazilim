import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Katılımcı doğrulaması sonrası kısa ömürlü indirme URL’i.
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  let body: { path?: string };
  try {
    body = (await request.json()) as { path?: string };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const path = body.path?.trim();
  if (!path || path.includes("..")) {
    return NextResponse.json({ error: "Geçersiz path." }, { status: 400 });
  }

  const conversationId = path.split("/")[0];
  if (!conversationId) {
    return NextResponse.json({ error: "Geçersiz path." }, { status: 400 });
  }

  const { data: part } = await supabase
    .from("conversation_participants")
    .select("id")
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!part) {
    return NextResponse.json({ error: "Erişim yok." }, { status: 403 });
  }

  const { data: att } = await supabase
    .from("message_attachments")
    .select("id")
    .eq("storage_path", path)
    .maybeSingle();

  if (!att) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 404 });
  }

  const { data: signed, error } = await supabase.storage
    .from("chat-attachments")
    .createSignedUrl(path, 120);

  if (error || !signed?.signedUrl) {
    return NextResponse.json({ error: error?.message ?? "URL oluşturulamadı." }, { status: 400 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
