"use server";

import { getAdminContext } from "@/lib/auth/admin";
import { RESERVED_SPECIALIZATION_SLUGS } from "@/lib/constants/firm-specializations";
import { slugify } from "@/lib/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeLabel(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

/** DB `lower(trim(label))` ile uyumlu karşılaştırma (Türkçe büyük/küçük harf) */
function labelsConflictCanonical(a: string, b: string): boolean {
  return (
    a.trim().toLocaleLowerCase("tr") === b.trim().toLocaleLowerCase("tr")
  );
}

/**
 * Aynı görünen etiket zaten taxonomy’de var mı (slug fark etmez).
 * Katalog küçük tutulduğu için tek seferlik tam liste; indeksli sorguya geçirilebilir.
 */
async function findSpecializationTaxonomyByLabelNorm(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  label: string
): Promise<{ slug: string; label: string; is_active: boolean; affects_corporate_score: boolean } | null> {
  const { data, error } = await supabase
    .from("specialization_taxonomy")
    .select("slug, label, is_active, affects_corporate_score");
  if (error || !data?.length) return null;
  for (const row of data) {
    const lab = String(row.label ?? "");
    if (labelsConflictCanonical(lab, label)) {
      return {
        slug: String(row.slug),
        label: lab.trim() || label,
        is_active: Boolean(row.is_active),
        affects_corporate_score: Boolean(row.affects_corporate_score),
      };
    }
  }
  return null;
}

/**
 * Yönetim paneli — yeni uzmanlık taxonomy satırı (slug otomatik, çakışmada -2, -3 …).
 * `affects_corporate_score` varsayılan kapalı (mevcut skor davranışını korur).
 *
 * Alt hizmet / ana hizmet picklist’i ayrı tablolardır; aynı görünen ad oralarda olsa bile
 * taxonomy’ye yazılabilir. Çakışma yalnızca `specialization_taxonomy` içindeki benzersiz
 * etiket veya slug ile oluşur. Pasif taxonomy satırı aynı adla varsa yeniden etkinleştirilir.
 */
export async function createSpecializationTaxonomyFromPanel(
  labelRaw: string,
  affectsCorporateScore = false
): Promise<
  | { ok: true; slug: string; label: string; affects_corporate_score: boolean }
  | { ok: false; error: string }
> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const label = normalizeLabel(labelRaw);
  if (label.length < 2) return { ok: false, error: "En az 2 karakter girin." };
  if (label.length > 120) return { ok: false, error: "Etiket çok uzun (en fazla 120 karakter)." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik." };

  const affects = Boolean(affectsCorporateScore);

  const labelDup = await findSpecializationTaxonomyByLabelNorm(supabase, label);
  if (labelDup) {
    if (labelDup.is_active) {
      return {
        ok: false,
        error: `«${label}» zaten ek uzmanlık kataloğunda kayıtlı (slug: ${labelDup.slug}). Alt hizmetler ayrı bir listedir; isim benzerliği taxonomy çakışması değildir. Mevcut kaydı kullanın veya farklı bir ad verin.`,
      };
    }
    const { data: reactivated, error: upErr } = await supabase
      .from("specialization_taxonomy")
      .update({
        is_active: true,
        affects_corporate_score: affects,
        label,
      })
      .eq("slug", labelDup.slug)
      .select("slug, label, affects_corporate_score")
      .single();
    if (upErr || !reactivated) {
      return { ok: false, error: upErr?.message ?? "Pasif kayıt etkinleştirilemedi." };
    }
    return {
      ok: true,
      slug: String(reactivated.slug),
      label: String(reactivated.label ?? label),
      affects_corporate_score: Boolean(reactivated.affects_corporate_score),
    };
  }

  const base = slugify(label);
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
    affects_corporate_score: affects,
    is_active: true,
    sort_order: sortOrder,
  });

  if (error) {
    if (error.code === "23505") {
      const again = await findSpecializationTaxonomyByLabelNorm(supabase, label);
      if (again) {
        return {
          ok: false,
          error: `Bu isim veya slug zaten ek uzmanlık kataloğunda (slug: ${again.slug}). Alt hizmet satırıyla karıştırmayın; taxonomy tarafında kayıt var.`,
        };
      }
      return {
        ok: false,
        error:
          "Bu slug veya etiket başka bir taxonomy kaydıyla çakışıyor. Biraz farklı bir ad deneyin.",
      };
    }
    return { ok: false, error: error.message };
  }

  return { ok: true, slug, label, affects_corporate_score: affects };
}
