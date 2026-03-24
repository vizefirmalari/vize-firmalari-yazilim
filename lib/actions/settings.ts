"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAdminActivity } from "@/lib/actions/activity";
import { getAdminContext } from "@/lib/auth/admin";

export async function updateHomepageSettings(raw: {
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_cta_text?: string | null;
  hero_cta_link?: string | null;
  featured_section_title?: string | null;
  announcement_text?: string | null;
  promo_banner_html?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  featured_firm_ids?: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { error } = await supabase
    .from("homepage_settings")
    .update({
      ...raw,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, "homepage.updated", "settings", null, null);
  revalidatePath("/");
  revalidatePath("/admin/homepage");
  return { ok: true };
}

export async function updateContactPopupSettings(raw: {
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  working_hours?: string | null;
  show_phone?: boolean;
  show_whatsapp?: boolean;
  show_email?: boolean;
  show_website?: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { error } = await supabase
    .from("contact_popup_settings")
    .update({
      ...raw,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, "contact_popup.updated", "settings", null, null);
  revalidatePath("/");
  revalidatePath("/admin/contact-popup");
  return { ok: true };
}
