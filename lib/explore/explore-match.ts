import type { SpecializationKey } from "@/lib/constants/firm-specializations";
import type { FirmRow } from "@/lib/types/firm";
import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import type { ExploreCategoryDef, ExploreMatchRule } from "@/lib/explore/explore-types";
import { normalizeExploreText, normalizeExploreTokenList } from "@/lib/explore/normalize";

function firmRecord(firm: FirmRow): Record<string, unknown> {
  return firm as unknown as Record<string, unknown>;
}

function matchesVisaRegions(firm: FirmRow, labels: string[] | undefined): boolean {
  if (!labels?.length) return false;
  const regions = firm.visa_regions ?? [];
  return labels.some((l) => regions.includes(l));
}

function matchesCountryAliases(firm: FirmRow, aliases: string[] | undefined): boolean {
  if (!aliases?.length) return false;
  const countries = [
    ...normalizeExploreTokenList(firm.countries),
    ...normalizeExploreTokenList(firm.featured_countries ?? []),
  ];
  if (!countries.length) return false;
  const normalizedAliases = aliases.map((a) => normalizeExploreText(a)).filter(Boolean);
  for (const c of countries) {
    for (const a of normalizedAliases) {
      if (!a) continue;
      if (c === a || c.includes(a) || a.includes(c)) return true;
    }
  }
  return false;
}

function matchesSpecializations(
  firm: FirmRow,
  keys: SpecializationKey[] | undefined
): boolean {
  if (!keys?.length) return false;
  const r = firmRecord(firm);
  return keys.some((k) => Boolean(r[k]));
}

function buildFirmServiceBlob(firm: FirmRow): string {
  const parts = [
    ...firm.services,
    ...(firm.main_services ?? []),
    ...(firm.sub_services ?? []),
    ...(firm.custom_services ?? []),
    ...(firm.tags ?? []),
  ];
  return normalizeExploreText(parts.join(" "));
}

function matchesServiceNeedles(firm: FirmRow, needles: string[] | undefined): boolean {
  if (!needles?.length) return false;
  const blob = buildFirmServiceBlob(firm);
  if (!blob) return false;
  return needles.some((n) => {
    const nn = normalizeExploreText(n);
    return nn.length > 0 && blob.includes(nn);
  });
}

/**
 * Tek bir eşleşme kuralı: tanımlı alt koşullardan herhangi biri true ise firma dahildir.
 */
export function firmMatchesExploreRule(firm: FirmRow, rule: ExploreMatchRule): boolean {
  return (
    matchesVisaRegions(firm, rule.visaRegionLabelsAny) ||
    matchesCountryAliases(firm, rule.countryAliasesAny) ||
    matchesSpecializations(firm, rule.specializationKeysAny) ||
    matchesServiceNeedles(firm, rule.serviceNeedlesAny)
  );
}

export function firmMatchesExploreCategory(firm: FirmRow, category: ExploreCategoryDef): boolean {
  return firmMatchesExploreRule(firm, category.match);
}

export function filterFirmsByExploreCategory(
  firms: FirmRow[],
  category: ExploreCategoryDef
): FirmRow[] {
  return firms.filter((f) => firmMatchesExploreCategory(f, category));
}

export function getExploreCounts(
  firms: FirmRow[],
  categories: ExploreCategoryDef[]
): Map<string, number> {
  const map = new Map<string, number>();
  for (const c of categories) {
    map.set(c.slug, filterFirmsByExploreCategory(firms, c).length);
  }
  return map;
}

/** Bir firmanın hangi keşfet slug’larına düştüğü (otomatik sınıflandırma). */
export function getFirmExploreMatches(
  firm: FirmRow,
  categories: ExploreCategoryDef[] = EXPLORE_CATEGORIES
): string[] {
  return categories
    .filter((c) => firmMatchesExploreCategory(firm, c))
    .map((c) => c.slug);
}

export function isExploreCategoryVisibleOnHub(
  category: ExploreCategoryDef,
  firmCount: number
): boolean {
  if (category.alwaysShow) return true;
  if (category.minFirmCount <= 0) return true;
  return firmCount >= category.minFirmCount;
}
