"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getConversationPeerReadState(conversationId: string) {
  const id = conversationId.trim();
  if (!id) return { ok: false as const, error: "Geçersiz konuşma." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false as const, error: "Sunucu yapılandırması eksik." };

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) return { ok: false as const, error: "Oturum gerekli." };

  const { data, error } = await supabase
    .from("conversation_participants")
    .select("user_id, last_read_message_id")
    .eq("conversation_id", id);

  if (error) return { ok: false as const, error: error.message };

  const peer = (data ?? []).find((r) => String(r.user_id) !== user.id);
  return {
    ok: true as const,
    peerLastReadMessageId: peer?.last_read_message_id ? String(peer.last_read_message_id) : null,
  };
}
