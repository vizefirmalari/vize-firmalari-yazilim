"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Metin mesajı gönderir; RLS katılımcı ve sender_id doğrular.
 */
export async function sendChatMessage(
  conversationId: string,
  body: string,
  options?: { relatedGrowthPurchaseId?: string | null }
) {
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

  const row: Record<string, unknown> = {
    conversation_id: conversationId,
    sender_id: user.id,
    kind: "text",
    body: text,
  };
  const pr = options?.relatedGrowthPurchaseId?.trim();
  if (pr) row.related_growth_purchase_id = pr;

  const { data, error } = await supabase.from("messages").insert(row).select("id").single();

  if (error) {
    return { ok: false as const, error: error.message };
  }

  return { ok: true as const, messageId: data.id };
}
