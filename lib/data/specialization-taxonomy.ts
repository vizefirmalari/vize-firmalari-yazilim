import { unstable_cache } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { FirmRow } from "@/lib/types/firm";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";

export type SpecializationTaxonomyRow = {
  id: string;
  slug: string;
  label: string;
  affects_corporate_score: boolean;
  is_active: boolean;
  sort_order: number;
};

/** Ana sayfa / liste filtreleri — yalnızca aktif kayıtlar */
async function getPublicSpecializationTaxonomyRaw(): Promise<
  Pick<SpecializationTaxonomyRow, "slug" | "label" | "sort_order">[]
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("specialization_taxonomy")
    .select("slug,label,sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    console.warn("[getPublicSpecializationTaxonomy]", error.message);
    return [];
  }
  return (data ?? []) as Pick<SpecializationTaxonomyRow, "slug" | "label" | "sort_order">[];
}

export const getPublicSpecializationTaxonomy = unstable_cache(
  getPublicSpecializationTaxonomyRaw,
  ["public-specialization-taxonomy"],
  { revalidate: 900 }
);

export async function attachFirmCustomSpecializations(
  supabase: SupabaseClient,
  rows: FirmRow[]
): Promise<FirmRow[]> {
  if (!rows.length) return rows;
  try {
    const { data, error } = await supabase
      .from("firm_specialization_custom")
      .select("firm_id, specialization_taxonomy(slug, label)")
      .in(
        "firm_id",
        rows.map((r) => r.id)
      );
    if (error || !data?.length) return rows;

    const byFirm = new Map<string, { slug: string; label: string }[]>();
    for (const raw of data as unknown as {
      firm_id: string;
      specialization_taxonomy:
        | { slug: string; label: string }
        | { slug: string; label: string }[]
        | null;
    }[]) {
      let tax = raw.specialization_taxonomy;
      if (Array.isArray(tax)) tax = tax[0] ?? null;
      if (!tax?.slug) continue;
      const list = byFirm.get(raw.firm_id) ?? [];
      list.push({ slug: tax.slug, label: tax.label });
      byFirm.set(raw.firm_id, list);
    }
    if (byFirm.size === 0) return rows;

    return rows.map((r) => {
      const extra = byFirm.get(r.id);
      if (!extra?.length) return r;
      return { ...r, custom_specializations: extra };
    });
  } catch (e) {
    console.warn("[attachFirmCustomSpecializations]", e);
    return rows;
  }
}

export async function countActiveTaxonomySlugsForCorporateness(
  supabase: SupabaseClient,
  slugs: string[]
): Promise<number> {
  if (!slugs.length) return 0;
  const unique = [...new Set(slugs.map((s) => s.trim().toLowerCase()).filter(Boolean))];
  if (!unique.length) return 0;

  const { data, error } = await supabase
    .from("specialization_taxonomy")
    .select("slug")
    .in("slug", unique)
    .eq("is_active", true)
    .eq("affects_corporate_score", true);

  if (error) {
    console.warn("[countActiveTaxonomySlugsForCorporateness]", error.message);
    return 0;
  }
  return (data ?? []).length;
}

export async function taxonomyIdsForActiveSlugs(
  supabase: SupabaseClient,
  slugs: string[]
): Promise<Map<string, string>> {
  const slugMap = new Map<string, string>();
  const unique = [...new Set(slugs.map((s) => s.trim().toLowerCase()).filter(Boolean))];
  if (!unique.length) return slugMap;

  const { data, error } = await supabase
    .from("specialization_taxonomy")
    .select("id,slug")
    .in("slug", unique)
    .eq("is_active", true);

  if (error) {
    console.warn("[taxonomyIdsForActiveSlugs]", error.message);
    return slugMap;
  }
  for (const row of data ?? []) {
    slugMap.set(String((row as { slug: string }).slug), String((row as { id: string }).id));
  }
  return slugMap;
}

export async function replaceFirmSpecializationCustom(
  supabase: SupabaseClient,
  firmId: string,
  slugs: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const slugMap = await taxonomyIdsForActiveSlugs(supabase, slugs);
  const ids = [...slugMap.values()];
  const { error: delErr } = await supabase
    .from("firm_specialization_custom")
    .delete()
    .eq("firm_id", firmId);
  if (delErr) return { ok: false, error: delErr.message };

  if (!ids.length) return { ok: true };

  const { error: insErr } = await supabase.from("firm_specialization_custom").insert(
    ids.map((taxonomy_id) => ({ firm_id: firmId, taxonomy_id }))
  );
  if (insErr) return { ok: false, error: insErr.message };
  return { ok: true };
}
