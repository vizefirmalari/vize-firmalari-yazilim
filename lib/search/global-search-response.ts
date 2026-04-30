import type { FilterCountryRow, FilterServiceRow } from "@/lib/data/public-cms";
import type { FirmRow } from "@/lib/types/firm";
import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import type { ExploreCategoryDef } from "@/lib/explore/explore-types";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";

import { buildHomeSearchPath } from "@/lib/search/home-search-url";
import { textMatchesQuery } from "@/lib/search/search-text";

export type GlobalSearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  kind: "country" | "firm" | "visa" | "service" | "explore" | "all" | "guide" | "taxonomy";
  /** Taksonomi / gelişmiş filtre öneri etiketi (örn. Ülke, Ana hizmet) */
  badge?: string;
};

export type GlobalSearchGroup = {
  id: string;
  label: string;
  items: GlobalSearchItem[];
};

export type GlobalSearchPayload = {
  query: string;
  groups: GlobalSearchGroup[];
};

const MAX = {
  countries: 6,
  explore: 5,
  visa: 8,
  services: 6,
  firms: 10,
} as const;

function exploreMatches(cat: ExploreCategoryDef, query: string): boolean {
  const parts: string[] = [
    cat.slug,
    cat.label,
    cat.shortDescription,
    ...(cat.match.countryAliasesAny ?? []),
    ...(cat.match.serviceNeedlesAny ?? []),
    ...(cat.match.visaRegionLabelsAny ?? []),
  ].map((s) => String(s));
  return parts.some((p) => textMatchesQuery(p, query));
}

function firmSearchBlob(f: Pick<FirmRow, "name" | "slug" | "short_description" | "brand_name" | "countries" | "main_services" | "services" | "sub_services" | "visa_regions">): string {
  const chunks = [
    f.name,
    f.brand_name ?? "",
    f.short_description ?? "",
    ...(f.countries ?? []),
    ...(f.visa_regions ?? []),
    ...(f.main_services ?? []),
    ...(f.services ?? []),
    ...(f.sub_services ?? []),
  ];
  return chunks.filter(Boolean).join(" ");
}

export function computeGlobalSearchPayload(
  queryRaw: string,
  hiddenParams: Record<string, string>,
  ctx: {
    countries: FilterCountryRow[];
    serviceTypes: FilterServiceRow[];
    firms: Pick<
      FirmRow,
      | "id"
      | "name"
      | "slug"
      | "short_description"
      | "brand_name"
      | "countries"
      | "main_services"
      | "services"
      | "sub_services"
      | "visa_regions"
      | "schengen_expert"
      | "usa_visa_expert"
      | "student_visa_support"
      | "work_visa_support"
      | "tourist_visa_support"
      | "business_visa_support"
      | "family_reunion_support"
      | "appeal_support"
    >[];
  }
): GlobalSearchPayload {
  const query = queryRaw.trim();
  const groups: GlobalSearchGroup[] = [];

  if (query.length < 2) {
    return { query, groups: [] };
  }

  const countryItems: GlobalSearchItem[] = [];
  for (const c of ctx.countries) {
    if (!textMatchesQuery(c.name, query) && !textMatchesQuery(c.slug, query)) continue;
    countryItems.push({
      id: `country-${c.id}`,
      kind: "country",
      title: `${c.name} için hizmet veren firmalar`,
      subtitle: "Ülke filtresiyle listeyi aç",
      href: buildHomeSearchPath(hiddenParams, { countries: [c.name] }),
    });
    if (countryItems.length >= MAX.countries) break;
  }
  if (countryItems.length) {
    groups.push({ id: "countries", label: "Ülkeler / bölgeler", items: countryItems });
  }

  const exploreItems: GlobalSearchItem[] = [];
  for (const cat of EXPLORE_CATEGORIES) {
    if (!exploreMatches(cat, query)) continue;
    exploreItems.push({
      id: `explore-${cat.slug}`,
      kind: "explore",
      title: cat.label,
      subtitle: cat.shortDescription,
      href: `/kesfet/${cat.slug}`,
    });
    if (exploreItems.length >= MAX.explore) break;
  }
  if (exploreItems.length) {
    groups.push({ id: "explore", label: "Keşfet", items: exploreItems });
  }

  const visaItems: GlobalSearchItem[] = [];
  for (const { key, label } of SPECIALIZATION_OPTIONS) {
    if (!textMatchesQuery(label, query) && !textMatchesQuery(key.replace(/_/g, " "), query)) continue;
    visaItems.push({
      id: `visa-${key}`,
      kind: "visa",
      title: `${label} sunan firmalar`,
      subtitle: "Vize türü filtresi",
      href: buildHomeSearchPath(hiddenParams, { visaTypes: [label] }),
    });
    if (visaItems.length >= MAX.visa) break;
  }
  if (visaItems.length) {
    groups.push({ id: "visa", label: "Hizmetler / uzmanlık", items: visaItems });
  }

  const serviceItems: GlobalSearchItem[] = [];
  for (const s of ctx.serviceTypes) {
    if (!textMatchesQuery(s.name, query) && !textMatchesQuery(s.slug, query)) continue;
    serviceItems.push({
      id: `svc-${s.id}`,
      kind: "service",
      title: `${s.name} hizmeti veren firmalar`,
      subtitle: "Ana hizmet filtresi",
      href: buildHomeSearchPath(hiddenParams, { mainServices: [s.name] }),
    });
    if (serviceItems.length >= MAX.services) break;
  }
  if (serviceItems.length) {
    groups.push({ id: "main-services", label: "Hizmet kategorileri", items: serviceItems });
  }

  const firmItems: GlobalSearchItem[] = [];
  const seen = new Set<string>();
  const scored = ctx.firms
    .map((f) => {
      const blob = firmSearchBlob(f);
      const nameHit = textMatchesQuery(f.name, query);
      const brandHit = f.brand_name ? textMatchesQuery(f.brand_name, query) : false;
      const blobHit = textMatchesQuery(blob, query);
      const specHit = SPECIALIZATION_OPTIONS.some(
        ({ key, label }) =>
          Boolean((f as unknown as Record<string, unknown>)[key]) &&
          (textMatchesQuery(label, query) || textMatchesQuery(key.replace(/_/g, " "), query))
      );
      const hit = nameHit || brandHit || blobHit || specHit;
      if (!hit) return null;
      let score = 0;
      if (nameHit) score += 5;
      if (brandHit) score += 3;
      if (blobHit) score += 1;
      if (specHit) score += 2;
      return { f, score };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.score - a.score);

  for (const { f } of scored) {
    if (seen.has(f.id)) continue;
    seen.add(f.id);
    firmItems.push({
      id: `firm-${f.id}`,
      kind: "firm",
      title: f.name,
      subtitle: f.short_description?.trim() || f.countries?.slice(0, 3).join(", ") || "Firma profili",
      href: `/firma/${encodeURIComponent(f.slug)}`,
    });
    if (firmItems.length >= MAX.firms) break;
  }
  if (firmItems.length) {
    groups.push({ id: "firms", label: "Firmalar", items: firmItems });
  }

  const allHref = buildHomeSearchPath(hiddenParams, { q: query });
  groups.push({
    id: "quick",
    label: "Hızlı git",
    items: [
      {
        id: "all-results",
        kind: "all",
        title: "Tüm sonuçları görüntüle",
        subtitle: "Metin araması ile ana liste",
        href: allHref,
      },
      {
        id: "kesfet-hub",
        kind: "explore",
        title: "Keşfet sayfası",
        subtitle: "Ülke ve vize türüne göre vitrin",
        href: "/kesfet",
      },
    ],
  });

  return { query, groups };
}
