"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Metin mesajı gönderir; RLS katılımcı ve sender_id doğrular.
 */
export async function sendChatMessage(conversationId: string, body: string) {
  const text = body.trim();
  if (!text) {
    return { ok: false as const, error: "Mesaj boş olamaz." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false as const, error: "Sunucu yapılandırması eksik." };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { ok: false as const, error: "Oturum gerekli." };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      kind: "text",
      body: text,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false as const, error: error.message };
  }

  return { ok: true as const, messageId: data.id };
}
