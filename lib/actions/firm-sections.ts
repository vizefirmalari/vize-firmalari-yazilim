"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAdminActivity } from "@/lib/actions/activity";
import { getAdminContext } from "@/lib/auth/admin";

const ALLOWED_KEYS = [
  "about",
  "regions",
  "services_offered",
  "process",
  "pricing",
  "faq",
  "cta",
] as const;

export type SectionKey = (typeof ALLOWED_KEYS)[number];

export async function saveFirmSections(
  firmId: string,
  firmSlug: string,
  sections: {
    section_key: SectionKey;
    title: string | null;
    body: string | null;
    extra: Record<string, unknown> | null;
    sort_order: number;
    is_visible: boolean;
  }[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  for (const s of sections) {
    if (!ALLOWED_KEYS.includes(s.section_key)) {
      return { ok: false, error: "Geçersiz bölüm anahtarı" };
    }
  }

  await supabase.from("firm_content_sections").delete().eq("firm_id", firmId);

  if (sections.length) {
    const { error } = await supabase.from("firm_content_sections").insert(
      sections.map((s) => ({
        firm_id: firmId,
        section_key: s.section_key,
        title: s.title,
        body: s.body,
        extra: s.extra,
        sort_order: s.sort_order,
        is_visible: s.is_visible,
      }))
    );
    if (error) return { ok: false, error: error.message };
  }

  await logAdminActivity(supabase, ctx.userId, "firm.sections_saved", "firm", firmId, null);
  revalidatePath(`/firma/${firmSlug}`);
  revalidatePath(`/admin/firms/${firmId}/sections`);
  return { ok: true };
}
