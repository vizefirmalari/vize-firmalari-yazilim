import type { FirmRow } from "@/lib/types/firm";
import { normalizeLegacyServiceLabel } from "@/lib/constants/firm-specializations";

/**
 * Kimlik > Sınıflandırma > Firma türü (`firm_category`), eski kayıtlar için `company_type`.
 */
export function effectiveFirmCategoryLabel(f: FirmRow): string {
  return (
    f.firm_category?.trim() || f.company_type?.trim() || ""
  );
}

/**
 * Kart özeti (ilk 3 hizmet): önce ana kategoriler, sonra `services`, alt hizmetler, etiketler — tekrarsız sıra.
 */
export function orderedServiceLabelsForCardSummary(f: FirmRow): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (arr: string[] | null | undefined) => {
    if (!Array.isArray(arr)) return;
    for (const s of arr) {
      const t =
        typeof s === "string" ? normalizeLegacyServiceLabel(s) : "";
      if (t && !seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    }
  };
  add(f.main_services);
  add(f.services);
  add(f.sub_services);
  add(f.custom_services);
  return out;
}

/** Filtre eşlemesi: `services`, `main_services`, `sub_services`, `custom_services` birleşimi */
export function collectAllServiceLabelsFromFirm(f: FirmRow): string[] {
  const out = new Set<string>();
  for (const list of [
    f.services,
    f.main_services,
    f.sub_services,
    f.custom_services,
  ]) {
    if (!Array.isArray(list)) continue;
    for (const s of list) {
      const t =
        typeof s === "string" ? normalizeLegacyServiceLabel(s) : "";
      if (t) out.add(t);
    }
  }
  return [...out];
}

export function mergeCompanyTypeFilterOptions(
  cmsNames: string[],
  firms: FirmRow[]
): string[] {
  const set = new Set<string>();
  for (const n of cmsNames) {
    const t = n.trim();
    if (t) set.add(t);
  }
  for (const f of firms) {
    const c = effectiveFirmCategoryLabel(f);
    if (c) set.add(c);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "tr"));
}

type CountrySortRow = { name: string; sort_order: number };

/**
 * CMS ülke sırasını korur; firmalarda olup CMS’te olmayan ülkeleri alfabetik ekler.
 */
export function mergeCountryFilterOptionsFromFirms(
  cmsOrderedRows: CountrySortRow[],
  firms: FirmRow[]
): string[] {
  const cmsOrdered = [...cmsOrderedRows].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const cmsNames = cmsOrdered.map((r) => r.name.trim()).filter(Boolean);
  const fromFirms = new Set<string>();
  for (const f of firms) {
    for (const c of f.countries ?? []) {
      const t = c.trim();
      if (t) fromFirms.add(t);
    }
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const name of cmsNames) {
    if (seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  const extras = [...fromFirms]
    .filter((n) => !seen.has(n))
    .sort((a, b) => a.localeCompare(b, "tr"));
  out.push(...extras);
  return out;
}

/** Katalog/CMS ile birleştirilmiş hizmet listesine, yayınlanmış firmalardaki tüm hizmet etiketlerini ekler */
export function mergeServiceFilterOptionsWithFirms(
  baseOptions: string[],
  firms: FirmRow[]
): string[] {
  const set = new Set(
    baseOptions.map((s) => s.trim()).filter(Boolean)
  );
  for (const f of firms) {
    for (const s of collectAllServiceLabelsFromFirm(f)) {
      set.add(s);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "tr"));
}

type MainServiceCategorySortRow = { name: string; sort_order: number };

/**
 * CMS `main_service_categories` sırası korunur; firmada olup katalogda olmayan
 * `main_services` etiketleri alfabetik eklenir (yalnızca ana hizmet dizisi).
 */
export function mergeMainServiceCategoryFilterOptionsFromRows(
  cmsRows: MainServiceCategorySortRow[],
  firms: FirmRow[]
): string[] {
  const cmsOrdered = [...cmsRows].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const cmsNames = cmsOrdered.map((r) => r.name.trim()).filter(Boolean);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const name of cmsNames) {
    if (seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  const fromFirms = new Set<string>();
  for (const f of firms) {
    if (!Array.isArray(f.main_services)) continue;
    for (const x of f.main_services) {
      const t = typeof x === "string" ? x.trim() : "";
      if (t) fromFirms.add(t);
    }
  }
  const extras = [...fromFirms]
    .filter((n) => !seen.has(n))
    .sort((a, b) => a.localeCompare(b, "tr"));
  out.push(...extras);
  return out;
}
