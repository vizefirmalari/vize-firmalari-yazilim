"use server";

/**
 * Ön başvuru kayıtlarında durum / okundu güncellemesi.
 * Firma oluşturma bu aksiyonda yok; firma `firms` için admin panelinden manuel eklenir.
 */

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MembershipApplicationStatus } from "@/lib/types/business-membership-db";

const STATUSES: MembershipApplicationStatus[] = [
  "new",
  "in_review",
  "approved",
  "rejected",
];

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "in_review", "approved", "rejected"]),
  is_read: z.boolean(),
});

export type UpdateBusinessMembershipResult =
  | { ok: true }
  | { ok: false; error: string };

export async function updateBusinessMembershipApplication(input: {
  id: string;
  status: MembershipApplicationStatus;
  is_read: boolean;
}): Promise<UpdateBusinessMembershipResult> {
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Geçersiz başvuru güncellemesi." };
  }

  const ctx = await getAdminContext();
  if (!ctx) {
    return { ok: false, error: "Yetkisiz." };
  }

  if (!STATUSES.includes(parsed.data.status)) {
    return { ok: false, error: "Geçersiz durum." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Bağlantı kurulamadı." };
  }

  const { error } = await supabase
    .from("business_membership_applications")
    .update({
      status: parsed.data.status,
      is_read: parsed.data.is_read,
    })
    .eq("id", parsed.data.id);

  if (error) {
    console.error("[updateBusinessMembershipApplication]", error.message);
    return { ok: false, error: "Başvuru güncellenemedi." };
  }

  revalidatePath("/admin/business-membership-applications");
  revalidatePath(`/admin/business-membership-applications/${parsed.data.id}`);
  return { ok: true };
}
