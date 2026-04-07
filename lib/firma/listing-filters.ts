import type { FirmRow, FirmSort } from "@/lib/types/firm";
import { firmMatchesCoverageSelection } from "@/lib/firma/listing-coverage-match";
import { getExploreCategoryBySlug } from "@/lib/explore/explore-categories";
import { firmMatchesExploreCategory } from "@/lib/explore/explore-match";
import {
  SPECIALIZATION_OPTIONS,
  type SpecializationKey,
} from "@/lib/constants/firm-specializations";

export function hypeValue(f: FirmRow): number {
  return f.hype_score ?? f.raw_hype_score * 100;
}

export type ListingRangeBounds = {
  corp: { min: number; max: number };
  hype: { min: number; max: number };
  year: { min: number; max: number };
};

export function computeRangeBounds(firms: FirmRow[]): ListingRangeBounds {
  let hypeMaxData = 0;
  let yearMin = Infinity;
  let yearMax = -Infinity;
  for (const f of firms) {
    const h = hypeValue(f);
    if (Number.isFinite(h) && h > hypeMaxData) hypeMaxData = h;
    const y = f.founded_year;
    if (typeof y === "number" && Number.isFinite(y)) {
      if (y < yearMin) yearMin = y;
      if (y > yearMax) yearMax = y;
    }
  }
  let hypeUpper = hypeMaxData > 0 ? Math.ceil(hypeMaxData) : 100;
  if (hypeUpper < 1) hypeUpper = 100;
  if (!Number.isFinite(yearMin) || yearMin === yearMax) {
    const y = new Date().getFullYear();
    yearMin = 1990;
    yearMax = y;
  }
  return {
    corp: { min: 0, max: 100 },
    hype: { min: 0, max: hypeUpper },
    year: { min: yearMin, max: yearMax },
  };
}

export type CoverageSelection = {
  /** `visa_regions` / türetilmiş bölge etiketleri (örn. Schengen Bölgesi) */
  visaRegionLabels: string[];
  countries: string[];
};

export type TrustFilterFlags = {
  requireTaxCertificate: boolean;
  requireLicense: boolean;
  requirePhysicalOffice: boolean;
  requireOfficeVerified: boolean;
};

export type ServiceModeFlags = {
  onlineConsulting: boolean;
  officeFaceToFace: boolean;
  remoteSupport: boolean;
  weekendSupport: boolean;
};

export type LanguageProFlags = {
  multilingualSupport: boolean;
  corporateDomain: boolean;
};

export type YearPreset = null | "recent" | "vintage";

function normalizeTr(s: string): string {
  return s.trim().toLocaleLowerCase("tr");
}

function firmMatchesCityLabels(firm: FirmRow, cities: string[]): boolean {
  if (cities.length === 0) return true;
  const fc = firm.city?.trim();
  if (!fc) return false;
  const n = normalizeTr(fc);
  return cities.some((c) => normalizeTr(c) === n);
}

function firmMatchesMainServiceLabels(firm: FirmRow, labels: string[]): boolean {
  if (labels.length === 0) return true;
  const pool: string[] = [];
  for (const arr of [firm.main_services, firm.services, firm.sub_services]) {
    if (!Array.isArray(arr)) continue;
    for (const x of arr) {
      if (typeof x === "string" && x.trim()) pool.push(normalizeTr(x));
    }
  }
  if (!pool.length) return false;
  return labels.some((label) => {
    const want = normalizeTr(label);
    if (!want) return false;
    return pool.some((p) => p === want || p.includes(want) || want.includes(p));
  });
}

export type AppliedListingFilters = {
  coverage: CoverageSelection;
  visaTypes: SpecializationKey[];
  /** URL / vitrin — şehir adları */
  cities: string[];
  /** URL / vitrin — ana hizmet veya hizmet satırı etiketi */
  mainServiceLabels: string[];
  /** Keşfet slug ile aynı eşleşme */
  exploreFocusSlug: string | null;
  trust: TrustFilterFlags;
  serviceMode: ServiceModeFlags;
  languagePro: LanguageProFlags;
  corpMin: number;
  corpMax: number;
  hypeMin: number;
  hypeMax: number;
  yearMin: number;
  yearMax: number;
  yearPreset: YearPreset;
};

/** Vitrin sayımı ve yeni taslaklar için tam varsayılan filtre */
export function createDefaultAppliedListingFilters(
  bounds: ListingRangeBounds
): AppliedListingFilters {
  return {
    coverage: { visaRegionLabels: [], countries: [] },
    visaTypes: [],
    cities: [],
    mainServiceLabels: [],
    exploreFocusSlug: null,
    trust: {
      requireTaxCertificate: false,
      requireLicense: false,
      requirePhysicalOffice: false,
      requireOfficeVerified: false,
    },
    serviceMode: {
      onlineConsulting: false,
      officeFaceToFace: false,
      remoteSupport: false,
      weekendSupport: false,
    },
    languagePro: {
      multilingualSupport: false,
      corporateDomain: false,
    },
    corpMin: bounds.corp.min,
    corpMax: bounds.corp.max,
    hypeMin: bounds.hype.min,
    hypeMax: bounds.hype.max,
    yearMin: bounds.year.min,
    yearMax: bounds.year.max,
    yearPreset: null,
  };
}

function yearFilterIsFull(
  f: AppliedListingFilters,
  bounds: ListingRangeBounds
): boolean {
  if (f.yearPreset !== null) return false;
  return f.yearMin <= bounds.year.min && f.yearMax >= bounds.year.max;
}

function effectiveYearWindow(
  f: AppliedListingFilters,
  bounds: ListingRangeBounds
): { min: number; max: number } {
  let min = f.yearMin;
  let max = f.yearMax;
  if (f.yearPreset === "recent") {
    min = Math.max(bounds.year.min, bounds.year.max - 10);
    max = bounds.year.max;
  } else if (f.yearPreset === "vintage") {
    min = bounds.year.min;
    max = Math.min(bounds.year.max, bounds.year.min + 25);
  }
  return { min, max };
}

function passesTrust(firm: FirmRow, t: TrustFilterFlags): boolean {
  if (t.requireTaxCertificate && firm.has_tax_certificate !== true) {
    return false;
  }
  if (t.requireLicense && !firm.license_number?.trim()) {
    return false;
  }
  if (t.requirePhysicalOffice && firm.has_physical_office !== true) {
    return false;
  }
  if (t.requireOfficeVerified && firm.office_address_verified !== true) {
    return false;
  }
  return true;
}

function passesServiceMode(firm: FirmRow, m: ServiceModeFlags): boolean {
  const any =
    m.onlineConsulting ||
    m.officeFaceToFace ||
    m.remoteSupport ||
    m.weekendSupport;
  if (!any) return true;

  if (m.onlineConsulting) {
    const web = firm.website?.trim();
    const wq = firm.website_quality_level;
    if (!web || wq === "none") return false;
  }
  if (m.officeFaceToFace && firm.has_physical_office !== true) return false;
  if (m.remoteSupport && firm.has_physical_office !== false) return false;
  if (m.weekendSupport && firm.weekend_support !== true) return false;
  return true;
}

function passesLanguagePro(firm: FirmRow, l: LanguageProFlags): boolean {
  const any = l.multilingualSupport || l.corporateDomain;
  if (!any) return true;
  if (l.multilingualSupport) {
    const n = firm.supported_languages?.length ?? 0;
    if (n < 2) return false;
  }
  if (l.corporateDomain && firm.has_corporate_domain !== true) return false;
  return true;
}

export function applyListingFilters(
  firms: FirmRow[],
  f: AppliedListingFilters,
  bounds: ListingRangeBounds,
  query: string
): FirmRow[] {
  const qNorm = query.trim().toLowerCase();
  const yearFull = yearFilterIsFull(f, bounds);
  const yWin = effectiveYearWindow(f, bounds);

  return firms.filter((firm) => {
    if (!firmMatchesCoverageSelection(firm, f.coverage)) return false;

    if (!firmMatchesCityLabels(firm, f.cities)) return false;

    if (!firmMatchesMainServiceLabels(firm, f.mainServiceLabels)) return false;

    if (f.exploreFocusSlug) {
      const cat = getExploreCategoryBySlug(f.exploreFocusSlug);
      if (cat && !firmMatchesExploreCategory(firm, cat)) return false;
    }

    if (f.visaTypes.length > 0) {
      const active = new Set(
        SPECIALIZATION_OPTIONS.filter(({ key }) =>
          Boolean((firm as unknown as Record<string, unknown>)[key])
        ).map(({ key }) => key)
      );
      if (!f.visaTypes.some((key) => active.has(key))) return false;
    }
    if (!passesTrust(firm, f.trust)) return false;
    if (!passesServiceMode(firm, f.serviceMode)) return false;
    if (!passesLanguagePro(firm, f.languagePro)) return false;

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
      if (y < yWin.min || y > yWin.max) return false;
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
  const fy = (x: FirmRow) =>
    typeof x.founded_year === "number" && Number.isFinite(x.founded_year)
      ? x.founded_year
      : null;

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
      case "founded_year_desc": {
        const ya = fy(a);
        const yb = fy(b);
        if (ya === null && yb === null) return 0;
        if (ya === null) return 1;
        if (yb === null) return -1;
        return yb - ya;
      }
      case "founded_year_asc": {
        const ya = fy(a);
        const yb = fy(b);
        if (ya === null && yb === null) return 0;
        if (ya === null) return 1;
        if (yb === null) return -1;
        return ya - yb;
      }
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
  { value: "name_asc", label: "Firma adına göre (A-Z)" },
  { value: "hype_desc", label: "Önerilen" },
  { value: "corp_desc", label: "Kurumsallık (yüksek → düşük)" },
  { value: "hype_score_desc", label: "Hype (yüksek → düşük)" },
  { value: "founded_year_desc", label: "Kuruluş yılı (yeni → eski)" },
  { value: "founded_year_asc", label: "Kuruluş yılı (eski → yeni)" },
];
