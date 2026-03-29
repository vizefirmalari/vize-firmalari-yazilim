import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateChatAttachment } from "@/lib/validation/chat-attachment";

/**
 * Sohbet eki: önce Storage (path sabit), sonra mesaj + message_attachments.
 * Hata durumunda ters sırada temizlik (mesaj silme RLS: gönderen).
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  const form = await request.formData();
  const conversationId = form.get("conversationId");
  const file = form.get("file");

  if (typeof conversationId !== "string" || !conversationId) {
    return NextResponse.json({ error: "conversationId gerekli." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file gerekli." }, { status: 400 });
  }

  const v = validateChatAttachment(file);
  if (!v.ok) {
    return NextResponse.json({ error: v.reason }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  const uploadId = crypto.randomUUID();
  const path = `${conversationId}/${uploadId}_${safeName}`;

  const buf = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from("chat-attachments").upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 400 });
  }

  const { data: msg, error: msgErr } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      kind: "attachment",
      body: null,
    })
    .select("id")
    .single();

  if (msgErr || !msg) {
    await supabase.storage.from("chat-attachments").remove([path]);
    return NextResponse.json({ error: msgErr?.message ?? "Mesaj oluşturulamadı." }, { status: 400 });
  }

  const { error: attErr } = await supabase.from("message_attachments").insert({
    message_id: msg.id,
    conversation_id: conversationId,
    storage_path: path,
    file_name: file.name,
    mime_type: file.type,
    byte_size: file.size,
  });

  if (attErr) {
    await supabase.from("messages").delete().eq("id", msg.id);
    await supabase.storage.from("chat-attachments").remove([path]);
    return NextResponse.json({ error: attErr.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    messageId: msg.id,
    storagePath: path,
  });
}
