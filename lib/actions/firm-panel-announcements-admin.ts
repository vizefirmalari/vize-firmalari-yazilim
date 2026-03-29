"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createFirmPanelAnnouncement(input: {
  title: string;
  body: string;
  sort_order?: number;
  expires_at?: string | null;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const ctx = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const { data, error } = await supabase
    .from("firm_panel_announcements")
    .insert({
      title: input.title.trim(),
      body: input.body.trim(),
      is_published: true,
      sort_order: input.sort_order ?? 0,
      expires_at: input.expires_at || null,
      created_by: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !data?.id) return { ok: false, error: error?.message ?? "Kayıt oluşturulamadı" };

  revalidatePath("/admin/firm-panel/announcements");
  revalidatePath("/panel");
  return { ok: true, id: data.id as string };
}

export async function updateFirmPanelAnnouncement(
  id: string,
  patch: Partial<{
    title: string;
    body: string;
    is_published: boolean;
    sort_order: number;
    expires_at: string | null;
  }>
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const { error } = await supabase.from("firm_panel_announcements").update(patch).eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/firm-panel/announcements");
  revalidatePath("/panel");
  return { ok: true };
}

export async function deleteFirmPanelAnnouncement(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Yapılandırma eksik" };

  const { error } = await supabase.from("firm_panel_announcements").delete().eq("id", id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/firm-panel/announcements");
  revalidatePath("/panel");
  return { ok: true };
}
