"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Katılımcının son okuduğu mesajı günceller; message_reads’e tek satır ekler (idempotent).
 */
export async function markConversationRead(conversationId: string) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { ok: false as const, error: "Yapılandırma hatası" };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false as const, error: "Oturum yok" };
    }

    const { data: lastMsg, error: lastErr } = await supabase
      .from("messages")
      .select("id")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastErr || !lastMsg) {
      return { ok: true as const };
    }

    const { error: upErr } = await supabase
      .from("conversation_participants")
      .update({ last_read_message_id: lastMsg.id })
      .eq("conversation_id", conversationId)
      .eq("user_id", user.id);

    if (upErr) {
      return { ok: false as const, error: upErr.message };
    }

    const { error: readErr } = await supabase.from("message_reads").insert({
      conversation_id: conversationId,
      user_id: user.id,
      message_id: lastMsg.id,
      read_at: new Date().toISOString(),
    });
    if (readErr && readErr.code !== "23505") {
      return { ok: false as const, error: readErr.message };
    }

    return { ok: true as const };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "Okundu işaretlenemedi",
    };
  }
}
