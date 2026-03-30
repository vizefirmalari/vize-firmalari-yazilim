"use server";

import { revalidatePath } from "next/cache";

import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FirmComplaintStatus } from "@/lib/types/firm-complaint-db";

const STATUSES: FirmComplaintStatus[] = [
  "new",
  "in_review",
  "resolved",
  "closed",
];

export type UpdateFirmComplaintResult =
  | { ok: true }
  | { ok: false; error: string };

export async function updateFirmComplaintAdmin(
  id: string,
  patch: { status?: FirmComplaintStatus; is_read?: boolean }
): Promise<UpdateFirmComplaintResult> {
  const ctx = await getAdminContext();
  if (!ctx) {
    return { ok: false, error: "Yetkisiz." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Bağlantı kurulamadı." };
  }

  const updates: Record<string, unknown> = {};
  if (patch.status !== undefined) {
    if (!STATUSES.includes(patch.status)) {
      return { ok: false, error: "Geçersiz durum." };
    }
    updates.status = patch.status;
  }
  if (patch.is_read !== undefined) {
    updates.is_read = patch.is_read;
  }

  if (Object.keys(updates).length === 0) {
    return { ok: true };
  }

  const { error } = await supabase
    .from("firm_complaints")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("[updateFirmComplaintAdmin]", error.message);
    return { ok: false, error: "Güncelleme başarısız." };
  }

  revalidatePath("/admin/firm-complaints");
  revalidatePath(`/admin/firm-complaints/${id}`);
  return { ok: true };
}
