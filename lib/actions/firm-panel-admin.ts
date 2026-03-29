"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AssignFirmPanelResult =
  | { ok: true; kind: "linked" | "invited" | "already_member" | "already_invited" }
  | { ok: false; error: string };

/**
 * Firma sahibi / yetkili atar: hesap varsa anında bağlar, yoksa davet oluşturur.
 */
export async function assignFirmPanelByEmail(
  firmId: string,
  email: string
): Promise<AssignFirmPanelResult> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const trimmed = email.trim();
  if (!trimmed.includes("@")) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }

  const { data, error } = await supabase.rpc("admin_assign_firm_panel_by_email", {
    p_firm_id: firmId,
    p_email: trimmed,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const kind = (data as { kind?: string })?.kind;
  if (
    kind === "linked" ||
    kind === "invited" ||
    kind === "already_member" ||
    kind === "already_invited"
  ) {
    revalidatePath(`/admin/firms/${firmId}/panel`);
    revalidatePath(`/admin/firms/${firmId}/edit`);
    return { ok: true, kind };
  }

  return { ok: false, error: "Beklenmeyen yanıt" };
}

export async function cancelFirmPanelInvitation(
  firmId: string,
  invitationId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const { error } = await supabase.rpc("admin_cancel_firm_panel_invitation", {
    p_invitation_id: invitationId,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/firms/${firmId}/panel`);
  return { ok: true };
}

export async function removeFirmPanelMember(
  firmId: string,
  memberId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const { error } = await supabase.rpc("admin_remove_firm_panel_member", {
    p_member_id: memberId,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/firms/${firmId}/panel`);
  return { ok: true };
}
