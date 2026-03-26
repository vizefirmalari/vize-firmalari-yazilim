import type { FirmRow, FirmSort } from "@/lib/types/firm";

export function hypeValue(f: FirmRow): number {
  return f.hype_score ?? f.raw_hype_score * 100;
}

export type ListingRangeBounds = {
  corp: { min: number; max: number };
  hype: { min: number; max: number };
  year: { min: number; max: number };
};

export function computeRangeBounds(firms: FirmRow[]): ListingRangeBounds {
  let hypeMin = Infinity;
  let hypeMax = -Infinity;
  let yearMin = Infinity;
  let yearMax = -Infinity;
  for (const f of firms) {
    const h = hypeValue(f);
    if (h < hypeMin) hypeMin = h;
    if (h > hypeMax) hypeMax = h;
    const y = f.founded_year;
    if (typeof y === "number" && Number.isFinite(y)) {
      if (y < yearMin) yearMin = y;
      if (y > yearMax) yearMax = y;
    }
  }
  if (!Number.isFinite(hypeMin) || hypeMin === hypeMax) {
    hypeMin = 0;
    hypeMax = 10_000;
  }
  if (!Number.isFinite(yearMin) || yearMin === yearMax) {
    const y = new Date().getFullYear();
    yearMin = 1990;
    yearMax = y;
  }
  return {
    corp: { min: 0, max: 100 },
    hype: { min: Math.floor(hypeMin), max: Math.ceil(hypeMax) },
    year: { min: yearMin, max: yearMax },
  };
}

export type AppliedListingFilters = {
  countries: string[];
  services: string[];
  companyTypes: string[];
  corpMin: number;
  corpMax: number;
  hypeMin: number;
  hypeMax: number;
  yearMin: number;
  yearMax: number;
};

function yearFilterIsFull(
  f: AppliedListingFilters,
  bounds: ListingRangeBounds
): boolean {
  return f.yearMin <= bounds.year.min && f.yearMax >= bounds.year.max;
}

export function applyListingFilters(
  firms: FirmRow[],
  f: AppliedListingFilters,
  bounds: ListingRangeBounds,
  query: string
): FirmRow[] {
  const qNorm = query.trim().toLowerCase();
  const yearFull = yearFilterIsFull(f, bounds);

  return firms.filter((firm) => {
    if (
      f.countries.length > 0 &&
      !f.countries.some((c) => firm.countries.includes(c))
    ) {
      return false;
    }
    if (
      f.services.length > 0 &&
      !f.services.some((s) => firm.services.includes(s))
    ) {
      return false;
    }
    if (f.companyTypes.length > 0) {
      const ct = firm.company_type?.trim();
      if (!ct || !f.companyTypes.includes(ct)) return false;
    }
    if (
      firm.corporateness_score < f.corpMin ||
      firm.corporateness_score > f.corpMax
    ) {
      return false;
    }
    const hv = hypeValue(firm);
    if (hv < f.hypeMin || hv > f.hypeMax) return false;

    const y = firm.founded_year;
    if (typeof y === "number" && Number.isFinite(y)) {
      if (y < f.yearMin || y > f.yearMax) return false;
    } else if (!yearFull) {
      return false;
    }

    if (!qNorm) return true;
    return (
      firm.name.toLowerCase().includes(qNorm) ||
      (firm.description?.toLowerCase().includes(qNorm) ?? false) ||
      (firm.short_description?.toLowerCase().includes(qNorm) ?? false) ||
      firm.countries.some((item) => item.toLowerCase().includes(qNorm))
    );
  });
}

export function sortFirms(list: FirmRow[], sort: FirmSort): FirmRow[] {
  const out = [...list];
  const hype = (x: FirmRow) => hypeValue(x);
  const mp = (x: FirmRow) => x.manual_priority ?? 0;

  out.sort((a, b) => {
    switch (sort) {
      case "hype_asc":
        return hype(a) - hype(b);
      case "hype_score_desc":
        return hype(b) - hype(a);
      case "corp_desc":
        return b.corporateness_score - a.corporateness_score;
      case "corp_asc":
        return a.corporateness_score - b.corporateness_score;
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "name_asc":
        return a.name.localeCompare(b.name, "tr");
      case "hype_desc":
      default:
        if (b.corporateness_score !== a.corporateness_score) {
          return b.corporateness_score - a.corporateness_score;
        }
        if (hype(b) !== hype(a)) return hype(b) - hype(a);
        return mp(b) - mp(a);
    }
  });
  return out;
}

export const LISTING_SORT_OPTIONS: {
  value: FirmSort;
  label: string;
}[] = [
  { value: "hype_desc", label: "Önerilen" },
  { value: "corp_desc", label: "Kurumsallık (yüksek → düşük)" },
  { value: "hype_score_desc", label: "Hype (yüksek → düşük)" },
  { value: "newest", label: "Yeni firmalar" },
  { value: "oldest", label: "Eski firmalar" },
];
