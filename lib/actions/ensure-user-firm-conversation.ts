"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EnsureUserFirmConversationResult =
  | { ok: true; conversationId: string }
  | { ok: false; error: string; code?: "AUTH" };

/**
 * Kullanıcı–firma konuşmasını bulur veya `ensure_user_firm_conversation` RPC ile oluşturur.
 */
export async function ensureUserFirmConversationAction(
  firmId: string
): Promise<EnsureUserFirmConversationResult> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { ok: false, error: "Sunucu yapılandırması eksik." };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "Mesajlaşmak için giriş yapın.", code: "AUTH" };
    }

    const { data, error } = await supabase.rpc("ensure_user_firm_conversation", {
      p_firm_id: firmId,
    });

    if (error) {
      const msg = error.message ?? "";
      if (msg.includes("not_authenticated")) {
        return { ok: false, error: "Oturum süresi doldu; tekrar giriş yapın.", code: "AUTH" };
      }
      if (msg.includes("firm_not_found")) {
        return { ok: false, error: "Firma bulunamadı." };
      }
      if (msg.includes("no_counterparty")) {
        return {
          ok: false,
          error: "Bu firma için henüz temsilci atanmadı. Lütfen daha sonra tekrar deneyin.",
        };
      }
      return { ok: false, error: msg || "Konuşma oluşturulamadı." };
    }

    if (!data || typeof data !== "string") {
      return { ok: false, error: "Geçersiz yanıt." };
    }

    return { ok: true, conversationId: data };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Beklenmeyen bir hata oluştu.";
    return { ok: false, error: message };
  }
}
