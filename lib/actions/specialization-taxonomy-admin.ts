"use server";

import { getAdminContext } from "@/lib/auth/admin";
import { RESERVED_SPECIALIZATION_SLUGS } from "@/lib/constants/firm-specializations";
import { slugify } from "@/lib/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeLabel(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

/**
 * Yönetim paneli — yeni uzmanlık taxonomy satırı (slug otomatik, çakışmada -2, -3 …).
 * `affects_corporate_score` varsayılan kapalı (mevcut skor davranışını korur).
 */
export async function createSpecializationTaxonomyFromPanel(
  labelRaw: string,
  affectsCorporateScore = false
): Promise<{ ok: true; slug: string; label: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const label = normalizeLabel(labelRaw);
  if (label.length < 2) return { ok: false, error: "En az 2 karakter girin." };
  if (label.length > 120) return { ok: false, error: "Etiket çok uzun (en fazla 120 karakter)." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik." };

  let base = slugify(label);
  if (!base) return { ok: false, error: "Geçerli bir slug üretilemedi." };
  if (RESERVED_SPECIALIZATION_SLUGS.has(base)) {
    return {
      ok: false,
      error: "Bu ifade sistemde sabit uzmanlık anahtarıyla çakışıyor; farklı bir ad kullanın.",
    };
  }

  let slug = base;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const { data: clash } = await supabase
      .from("specialization_taxonomy")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (!clash) break;
    slug = `${base}-${attempt + 2}`;
  }

  const { data: maxRow } = await supabase
    .from("specialization_taxonomy")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sortOrder = (typeof maxRow?.sort_order === "number" ? maxRow.sort_order : 0) + 1;

  const { error } = await supabase.from("specialization_taxonomy").insert({
    slug,
    label,
    affects_corporate_score: Boolean(affectsCorporateScore),
    is_active: true,
    sort_order: sortOrder,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Bu isim veya slug zaten kayıtlı." };
    }
    return { ok: false, error: error.message };
  }

  return { ok: true, slug, label };
}
