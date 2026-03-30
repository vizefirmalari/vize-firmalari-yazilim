"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Soft delete: sadece gönderen kendi mesajını silebilir.
 */
export async function deleteChatMessage(messageId: string) {
  const id = messageId.trim();
  if (!id) {
    return { ok: false as const, error: "Geçersiz mesaj." };
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

  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("messages")
    .update({
      deleted_at: nowIso,
      deleted_by: user.id,
      body: "Bu mesaj silindi",
    })
    .eq("id", id)
    .eq("sender_id", user.id)
    .is("deleted_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    return { ok: false as const, error: error.message };
  }
  if (!data) {
    return { ok: false as const, error: "Mesaj silinemedi." };
  }

  return { ok: true as const, messageId: data.id, deletedAt: nowIso, deletedBy: user.id };
}
