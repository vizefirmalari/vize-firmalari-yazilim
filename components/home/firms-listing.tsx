"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { DEFAULT_COUNTRIES } from "@/lib/constants";
import {
  applyListingFilters,
  computeRangeBounds,
  LISTING_SORT_OPTIONS,
  sortFirms,
  type AppliedListingFilters,
} from "@/lib/firma/listing-filters";
import { countActiveListingFilters } from "@/lib/firma/listing-filter-active-count";
import { buildUnifiedCountryFilterList } from "@/lib/firma/filter-country-options";
import {
  mergeCompanyTypeFilterOptions,
  mergeMainServiceCategoryFilterOptionsFromRows,
} from "@/lib/firma/listing-filter-options";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmRow, FirmSort } from "@/lib/types/firm";
import { FirmCard } from "@/components/home/firm-card";
import { FirmFilterBottomSheet, FirmSortBottomSheet } from "@/components/home/firm-listing-sheets";
import { FirmListingFilterFields } from "@/components/home/firm-listing-filter-fields";
import { SPECIALIZATION_LABELS } from "@/lib/constants/firm-specializations";
import { normalizeSpecializationFilterToken } from "@/lib/firma/specialization-match";
import { getExploreCategoryBySlug } from "@/lib/explore/explore-categories";
import {
  consumeHomeListingScrollAfterSearch,
  HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY,
} from "@/lib/search/home-listing-scroll";
import {
  applyHomeListingParamsToSearchParams,
  homeListingSearchParamsEqual,
} from "@/lib/search/home-listing-url";
import {
  applyListingCategoryLock,
  type ListingCategoryLock,
} from "@/lib/firma/listing-category-lock";

type Props = {
  initialFirms: FirmRow[];
  initialCountries?: string[];
  initialVisaTypes?: string[];
  /** Admin uzmanlık bayrakları; URL `expertise` */
  initialExpertise?: string[];
  initialCities?: string[];
  initialFirmTypes?: string[];
  initialMainServices?: string[];
  initialExploreFocusSlug?: string | null;
  initialSort?: FirmSort;
  query?: string;
  countryList?: string[];
  /** CMS `company_types` + yayınlanmış firmalardan birleşik firma türü etiketleri */
  companyTypeList?: string[];
  /** CMS `main_service_categories` + firmalardaki ana hizmet etiketleri */
  mainServiceCategoryList?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
  /** Ana sayfa: vitrin (keşif) alanı — sağ sütunda, filtre ile hizalı */
  children?: ReactNode;
  /**
   * Liste URL senkronu için taban path. Ana sayfa `/`, SEO vitrinleri `/abd-vizesi` vb.
   * Verilmezse yalnızca ana sayfada `router.replace` ile query güncellenir.
   */
  listingPath?: string;
  /** SEO vitrinlerinde keşfet / ana hizmet / vize türü kilidi (ek filtrelerle birlikte kalır). */
  listingCategoryLock?: ListingCategoryLock | null;
  /** Panel taxonomy — filtre paneli ve chip etiketleri (sabit 8 anahtara ek) */
  specializationTaxonomyOptions?: { slug: string; label: string }[];
};

function buildApplied(
  bounds: ReturnType<typeof computeRangeBounds>,
  countries: string[],
  visaTypes: string[],
  cities: string[] = [],
  firmTypes: string[] = [],
  expertise: string[] = [],
  mainServiceLabels: string[] = [],
  exploreFocusSlug: string | null = null
): AppliedListingFilters {
  const normalizedVisaTypes = visaTypes
    .map((v) => normalizeSpecializationFilterToken(v))
    .filter((x): x is string => Boolean(x));
  const normalizedExpertiseKeys = expertise
    .map((v) => normalizeSpecializationFilterToken(v))
    .filter((x): x is string => Boolean(x));
  return {
    coverage: {
      visaRegionLabels: [],
      countries: [...countries],
    },
    visaTypes: [...new Set(normalizedVisaTypes)],
    expertiseKeys: [...new Set(normalizedExpertiseKeys)],
    cities: [...cities],
    firmTypes: [...firmTypes],
    mainServiceLabels: [...mainServiceLabels],
    exploreFocusSlug,
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
    requireGoogleListedRating: false,
  };
}

/** Filtre/sıralama/arama değişiminde scroll tetiklemek için deterministik imza */
function serializeAppliedListingState(
  f: AppliedListingFilters,
  sort: FirmSort,
  query: string
): string {
  const loc = (a: string, b: string) => a.localeCompare(b, "tr");
  return JSON.stringify({
    q: query.trim(),
    sort,
    regions: [...f.coverage.visaRegionLabels].sort(loc),
    countries: [...f.coverage.countries].sort(loc),
    visaTypes: [...f.visaTypes].slice().sort(),
    expertiseKeys: [...f.expertiseKeys].slice().sort(),
    cities: [...f.cities].sort(loc),
    firmTypes: [...f.firmTypes].sort(loc),
    mainServiceLabels: [...f.mainServiceLabels].sort(loc),
    exploreFocusSlug: f.exploreFocusSlug,
    trust: f.trust,
    serviceMode: f.serviceMode,
    languagePro: f.languagePro,
    corpMin: f.corpMin,
    corpMax: f.corpMax,
    hypeMin: f.hypeMin,
    hypeMax: f.hypeMax,
    yearMin: f.yearMin,
    yearMax: f.yearMax,
    yearPreset: f.yearPreset,
    requireGoogleListedRating: f.requireGoogleListedRating,
  });
}

export function FirmsListing({
  initialFirms,
  initialCountries = [],
  initialVisaTypes = [],
  initialExpertise = [],
  initialCities = [],
  initialFirmTypes = [],
  initialMainServices = [],
  initialExploreFocusSlug = null,
  initialSort = "name_asc",
  query = "",
  countryList,
  companyTypeList,
  mainServiceCategoryList,
  featuredTitle = "Tüm Firmalar",
  featuredSubtitle =
    "Filtreleyin, karşılaştırın ve size uygun firmayı bulun.",
  children,
  listingPath,
  listingCategoryLock = null,
  specializationTaxonomyOptions = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listingUrlBase = listingPath ?? "/";
  const shouldSyncListingUrl = pathname === listingUrlBase;
  const bounds = useMemo(
    () => computeRangeBounds(initialFirms),
    [initialFirms]
  );

  const memoCategoryLock = useMemo<ListingCategoryLock | null>(() => {
    if (!listingCategoryLock) return null;
    return {
      exploreSlug: listingCategoryLock.exploreSlug,
      mainServices: listingCategoryLock.mainServices
        ? [...listingCategoryLock.mainServices]
        : undefined,
      visaTypes: listingCategoryLock.visaTypes
        ? [...listingCategoryLock.visaTypes]
        : undefined,
    };
  }, [
    listingCategoryLock?.exploreSlug,
    listingCategoryLock?.mainServices?.join("\0"),
    listingCategoryLock?.visaTypes?.join("\0"),
  ]);

  const lockedMainServiceSet = useMemo(
    () => new Set(memoCategoryLock?.mainServices ?? []),
    [memoCategoryLock?.mainServices?.join("\0")]
  );
  const lockedVisaTypeSet = useMemo(
    () => new Set(memoCategoryLock?.visaTypes ?? []),
    [memoCategoryLock?.visaTypes?.join("\0")]
  );

  const specializationFilterLabels = useMemo(() => {
    const m: Record<string, string> = { ...SPECIALIZATION_LABELS };
    for (const row of specializationTaxonomyOptions) {
      const slug = row.slug?.trim();
      if (!slug) continue;
      m[slug] = row.label.trim() || slug;
    }
    return m;
  }, [specializationTaxonomyOptions]);

  const [appliedFilters, setAppliedFiltersBase] = useState<AppliedListingFilters>(
    () =>
      buildApplied(
        bounds,
        initialCountries,
        initialVisaTypes,
        initialCities,
        initialFirmTypes,
        initialExpertise,
        initialMainServices,
        initialExploreFocusSlug
      )
  );
  const [sort, setSort] = useState<FirmSort>(initialSort);

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [filterDraft, setFilterDraft] = useState<AppliedListingFilters>(
    () =>
      buildApplied(
        bounds,
        initialCountries,
        initialVisaTypes,
        initialCities,
        initialFirmTypes,
        initialExpertise,
        initialMainServices,
        initialExploreFocusSlug
      )
  );

  const setAppliedFiltersWithLock = useCallback(
    (update: SetStateAction<AppliedListingFilters>) => {
      setAppliedFiltersBase((prev) => {
        const next = typeof update === "function" ? update(prev) : update;
        return applyListingCategoryLock(next, memoCategoryLock);
      });
    },
    [memoCategoryLock]
  );

  const urlKey = useMemo(
    () =>
      [
        initialCountries.join(","),
        initialVisaTypes.join(","),
        initialExpertise.join(","),
        initialCities.join(","),
        initialFirmTypes.join(","),
        initialMainServices.join(","),
        initialExploreFocusSlug ?? "",
        initialSort,
      ].join("|"),
    [
      initialCountries,
      initialVisaTypes,
      initialExpertise,
      initialCities,
      initialFirmTypes,
      initialMainServices,
      initialExploreFocusSlug,
      initialSort,
    ]
  );

  useEffect(() => {
    setAppliedFiltersWithLock((prev) => {
      const base = buildApplied(
        bounds,
        initialCountries,
        initialVisaTypes,
        initialCities,
        initialFirmTypes,
        initialExpertise,
        initialMainServices,
        initialExploreFocusSlug
      );
      return {
        ...base,
        coverage: {
          ...base.coverage,
          visaRegionLabels: prev.coverage.visaRegionLabels,
        },
        trust: prev.trust,
        serviceMode: prev.serviceMode,
        languagePro: prev.languagePro,
        corpMin: prev.corpMin,
        corpMax: prev.corpMax,
        hypeMin: prev.hypeMin,
        hypeMax: prev.hypeMax,
        yearMin: prev.yearMin,
        yearMax: prev.yearMax,
        yearPreset: prev.yearPreset,
        requireGoogleListedRating: prev.requireGoogleListedRating,
      };
    });
    setSort(initialSort);
    // Yalnızca URL / sunucu filtre senkronu; firms realtime ile bounds değişince sıfırlanmaz.
     
  }, [urlKey, setAppliedFiltersWithLock]);

  const listingScrollKey = useMemo(
    () => serializeAppliedListingState(appliedFilters, sort, query),
    [appliedFilters, sort, query]
  );

  const prevListingScrollKeyForResultsRef = useRef<string | null>(null);
  const prevUrlKeyForResultsScrollRef = useRef<string | null>(null);

  /**
   * Masaüstü: sol filtre/sıralama sonrası kullanıcı sonuç alanını görmüyorsa `#firmalar`’a
   * smooth scroll (scroll-margin sticky header ile uyumlu). URL senkronundan gelen
   * güncellemelerde tetiklenmez; slider gibi hızlı ardışık değişimlerde debounce.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevL = prevListingScrollKeyForResultsRef.current;
    const prevU = prevUrlKeyForResultsScrollRef.current;

    if (prevL === null) {
      prevListingScrollKeyForResultsRef.current = listingScrollKey;
      prevUrlKeyForResultsScrollRef.current = urlKey;
      return;
    }

    const listingChanged = prevL !== listingScrollKey;
    const urlKeyChanged = prevU !== urlKey;

    prevListingScrollKeyForResultsRef.current = listingScrollKey;
    prevUrlKeyForResultsScrollRef.current = urlKey;

    if (!listingChanged) return;
    if (urlKeyChanged) return;

    const timeoutId = window.setTimeout(() => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;

      const el = document.getElementById("firmalar");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const headerReservePx = 96;
      const listingTopComfortablyVisible =
        rect.top >= headerReservePx - 10 &&
        rect.top <= window.innerHeight * 0.74;
      if (listingTopComfortablyVisible) return;

      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 175);

    return () => window.clearTimeout(timeoutId);
  }, [listingScrollKey, urlKey]);

  /** Ana sayfa / SEO vitrin: URL ile `countries`, `cities`, `visaTypes` vb. senkron (yenilemede korunur). */
  useEffect(() => {
    if (!shouldSyncListingUrl) return;
    const base = new URLSearchParams(searchParams.toString());
    const next = applyHomeListingParamsToSearchParams(base, {
      q: query,
      applied: appliedFilters,
      sort,
    });
    if (homeListingSearchParamsEqual(next, base)) return;
    const qs = next.toString();
    const prefix = listingUrlBase === "/" ? "/" : listingUrlBase;
    router.replace(qs ? `${prefix}?${qs}#firmalar` : `${prefix}#firmalar`, { scroll: false });
  }, [
    shouldSyncListingUrl,
    listingUrlBase,
    pathname,
    searchParams,
    query,
    appliedFilters,
    sort,
    router,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldSyncListingUrl) {
      sessionStorage.removeItem(HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY);
    }
  }, [pathname, shouldSyncListingUrl]);

  /** Üst arama önerisi / metin araması sonrası ana liste bölümüne kaydır (sticky header: `#firmalar` scroll-margin). */
  useEffect(() => {
    if (!shouldSyncListingUrl) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY) !== "1") return;

    let cancelled = false;
    let cleared = false;
    /** DOM zamanlayıcı id’si (`number`); Node `Timeout` ile karışmaması için açık tip. */
    const timeouts: number[] = [];

    const clearFlag = () => {
      if (cleared) return;
      cleared = true;
      consumeHomeListingScrollAfterSearch();
    };

    const scrollToListing = () => {
      if (cancelled) return false;
      const el = document.getElementById("firmalar");
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      clearFlag();
      return true;
    };

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        if (scrollToListing()) return;
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            if (scrollToListing()) return;
            timeouts.push(
              window.setTimeout(() => {
                if (cancelled) return;
                if (!scrollToListing()) clearFlag();
              }, 120)
            );
          }, 60)
        );
      }, 0)
    );

    return () => {
      cancelled = true;
      for (const t of timeouts) window.clearTimeout(t);
    };
  }, [pathname, shouldSyncListingUrl, urlKey, query]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel("firms-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "firms" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [router]);

  const countriesSource = useMemo(() => {
    const raw =
      countryList && countryList.length > 0 ? countryList : DEFAULT_COUNTRIES;
    return buildUnifiedCountryFilterList(raw);
  }, [countryList]);

  const companyTypesSource = useMemo(
    () =>
      companyTypeList && companyTypeList.length > 0
        ? companyTypeList
        : mergeCompanyTypeFilterOptions([], initialFirms),
    [companyTypeList, initialFirms]
  );

  const mainServiceCategorySource = useMemo(
    () =>
      mainServiceCategoryList && mainServiceCategoryList.length > 0
        ? mainServiceCategoryList
        : mergeMainServiceCategoryFilterOptionsFromRows([], initialFirms),
    [mainServiceCategoryList, initialFirms]
  );

  const filtered = useMemo(
    () =>
      applyListingFilters(initialFirms, appliedFilters, bounds, query),
    [initialFirms, appliedFilters, bounds, query]
  );

  const sorted = useMemo(
    () => sortFirms(filtered, sort),
    [filtered, sort]
  );

  const activeFilterCount = useMemo(
    () => countActiveListingFilters(appliedFilters, bounds),
    [appliedFilters, bounds]
  );

  const removableChipCount = useMemo(() => {
    let n = appliedFilters.coverage.visaRegionLabels.length;
    n += appliedFilters.coverage.countries.length;
    n += appliedFilters.visaTypes.length;
    n += appliedFilters.expertiseKeys.length;
    n += appliedFilters.cities.length;
    n += appliedFilters.firmTypes.length;
    n += appliedFilters.mainServiceLabels.length;
    if (appliedFilters.exploreFocusSlug) n++;
    const t = appliedFilters.trust;
    if (t.requireTaxCertificate) n++;
    if (t.requireLicense) n++;
    if (t.requirePhysicalOffice) n++;
    if (t.requireOfficeVerified) n++;
    const s = appliedFilters.serviceMode;
    if (s.onlineConsulting) n++;
    if (s.officeFaceToFace) n++;
    if (s.remoteSupport) n++;
    if (s.weekendSupport) n++;
    const l = appliedFilters.languagePro;
    if (l.multilingualSupport) n++;
    if (l.corporateDomain) n++;
    if (appliedFilters.requireGoogleListedRating) n++;
    if (appliedFilters.yearPreset !== null) n++;
    if (
      memoCategoryLock?.exploreSlug &&
      appliedFilters.exploreFocusSlug === memoCategoryLock.exploreSlug
    ) {
      n -= 1;
    }
    for (const m of appliedFilters.mainServiceLabels) {
      if (lockedMainServiceSet.has(m)) n -= 1;
    }
    for (const v of appliedFilters.visaTypes) {
      if (lockedVisaTypeSet.has(v)) n -= 1;
    }
    return n;
  }, [
    appliedFilters,
    lockedMainServiceSet,
    lockedVisaTypeSet,
    memoCategoryLock?.exploreSlug,
  ]);

  const extraNonChipFilterCount = Math.max(
    0,
    activeFilterCount - removableChipCount
  );

  const clearCoverageChip = (kind: "region" | "country", value: string) => {
    setAppliedFiltersWithLock((prev) => {
      if (kind === "region") {
        return {
          ...prev,
          coverage: {
            ...prev.coverage,
            visaRegionLabels: prev.coverage.visaRegionLabels.filter(
              (x) => x !== value
            ),
          },
        };
      }
      return {
        ...prev,
        coverage: {
          ...prev.coverage,
          countries: prev.coverage.countries.filter((x) => x !== value),
        },
      };
    });
  };

  const clearVisaChip = (key: string) => {
    if (lockedVisaTypeSet.has(key)) return;
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      visaTypes: prev.visaTypes.filter((x) => x !== key),
    }));
  };

  const clearExpertiseChip = (key: string) => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      expertiseKeys: prev.expertiseKeys.filter((x) => x !== key),
    }));
  };

  const clearTrustChip = (
    key: keyof AppliedListingFilters["trust"]
  ) => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      trust: { ...prev.trust, [key]: false },
    }));
  };

  const clearServiceChip = (
    key: keyof AppliedListingFilters["serviceMode"]
  ) => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      serviceMode: { ...prev.serviceMode, [key]: false },
    }));
  };

  const clearLangChip = (key: "multilingualSupport" | "corporateDomain") => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      languagePro: { ...prev.languagePro, [key]: false },
    }));
  };

  const clearGoogleListedRatingChip = () => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      requireGoogleListedRating: false,
    }));
  };

  const clearYearPresetChip = () => {
    setAppliedFiltersWithLock((prev) => ({ ...prev, yearPreset: null }));
  };

  const previewCount = useMemo(
    () =>
      applyListingFilters(initialFirms, filterDraft, bounds, query).length,
    [initialFirms, filterDraft, bounds, query]
  );

  const draftFilterActiveCount = useMemo(
    () => countActiveListingFilters(filterDraft, bounds),
    [filterDraft, bounds]
  );

  const clearFilterDraft = () => {
    const empty = buildApplied(bounds, [], [], [], [], [], [], null);
    setFilterDraft(applyListingCategoryLock(empty, memoCategoryLock));
  };

  const applyFilterSheet = () => {
    setAppliedFiltersWithLock(filterDraft);
    setFilterSheetOpen(false);
  };

  const sortLabel =
    LISTING_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Firma adına göre (A-Z)";

  const resetToCleanHome = () => {
    const fresh = buildApplied(bounds, [], [], [], [], [], [], null);
    setAppliedFiltersWithLock(applyListingCategoryLock(fresh, memoCategoryLock));
    setSort("name_asc");
    const pathPrefix = listingUrlBase === "/" ? "/" : listingUrlBase;
    router.replace(`${pathPrefix}#firmalar`, { scroll: false });
  };

  const clearCityChip = (value: string) => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      cities: prev.cities.filter((x) => x !== value),
    }));
  };

  const clearFirmTypeChip = (value: string) => {
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      firmTypes: prev.firmTypes.filter((x) => x !== value),
    }));
  };

  const clearMainServiceChip = (value: string) => {
    if (lockedMainServiceSet.has(value)) return;
    setAppliedFiltersWithLock((prev) => ({
      ...prev,
      mainServiceLabels: prev.mainServiceLabels.filter((x) => x !== value),
    }));
  };

  const clearExploreChip = () => {
    if (memoCategoryLock?.exploreSlug) return;
    setAppliedFiltersWithLock((prev) => ({ ...prev, exploreFocusSlug: null }));
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pathPrefix = listingUrlBase === "/" ? "/" : listingUrlBase;
    if (params.has("hedef")) {
      params.delete("hedef");
      const qs = params.toString();
      router.replace(
        qs ? `${pathPrefix}?${qs}#firmalar` : `${pathPrefix}#firmalar`,
        { scroll: false }
      );
      return;
    }
    router.replace(`${pathPrefix}#firmalar`, { scroll: false });
  };

  return (
    <section className="pb-14">
      <div className="container-shell">
        <div className="grid gap-8 pt-1 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start lg:gap-10 lg:pt-2">
        <aside
          className="premium-card hidden w-full lg:sticky lg:top-24 lg:z-[5] lg:flex lg:max-h-[calc(100dvh-7rem)] lg:flex-col lg:overflow-hidden lg:self-start"
          aria-label="Filtreler"
        >
          <div className="shrink-0 border-b border-border/70 px-5 pt-5 pb-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-primary">
                Filtrele
                {activeFilterCount > 0 ? (
                  <span className="ml-1.5 tabular-nums text-xs font-semibold text-foreground/50">
                    ({activeFilterCount})
                  </span>
                ) : null}
              </h2>
              <button
                type="button"
                onClick={resetToCleanHome}
                className="text-xs font-semibold text-secondary"
              >
                Temizle
              </button>
            </div>
          </div>

          <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-5 py-4 pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]">
            <FirmListingFilterFields
              draft={appliedFilters}
              onChange={setAppliedFiltersWithLock}
              bounds={bounds}
              countryOptions={countriesSource}
              companyTypeOptions={companyTypesSource}
              mainServiceCategoryOptions={mainServiceCategorySource}
              specializationTaxonomyOptions={specializationTaxonomyOptions}
            />

            <fieldset className="mt-8 border-t border-border pt-6">
              <legend className="text-sm font-semibold text-foreground">
                Sıralama
              </legend>
              <div className="mt-3 flex flex-col gap-2.5">
                {LISTING_SORT_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/90"
                  >
                    <input
                      type="radio"
                      name="listing-sort"
                      value={value}
                      checked={sort === value}
                      onChange={() => setSort(value)}
                      className="accent-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="lg:hidden">
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setFilterDraft(appliedFilters);
                  setFilterSheetOpen(true);
                }}
                className="flex-1 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold text-foreground/75 shadow-sm transition hover:bg-primary/5"
              >
                Filtrele
                {activeFilterCount > 0 ? (
                  <span className="ml-1 tabular-nums text-foreground/50">
                    ({activeFilterCount})
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setSortSheetOpen(true)}
                className="flex-1 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold text-foreground/75 shadow-sm transition hover:bg-primary/5"
              >
                Sırala
              </button>
            </div>
          </div>

          {children ? (
            <div className="mt-3 w-full min-w-0 lg:mt-0">{children}</div>
          ) : null}

          <div
            id="firmalar"
            className={`scroll-mt-28 ${
              children
                ? "border-t-0 pt-3 lg:pt-5"
                : "border-t border-border/70 mt-6 lg:mt-8 pt-12 lg:pt-14"
            }`}
          >
          <h2 className="text-2xl font-bold text-primary">{featuredTitle}</h2>
          <p className="mt-1 text-sm text-foreground/70">{featuredSubtitle}</p>
          <p className="mt-2 text-xs text-foreground/55 lg:hidden">
            Sıralama: <span className="font-medium text-foreground/80">{sortLabel}</span>
          </p>

          {activeFilterCount > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {appliedFilters.coverage.visaRegionLabels.map((label) => (
                <button
                  key={`r-${label}`}
                  type="button"
                  onClick={() => clearCoverageChip("region", label)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                >
                  <span className="max-w-56 truncate">{label}</span>
                  <span className="text-foreground/50" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              {appliedFilters.coverage.countries.map((c) => (
                <button
                  key={`c-${c}`}
                  type="button"
                  onClick={() => clearCoverageChip("country", c)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">{c}</span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              {appliedFilters.cities.map((city) => (
                <button
                  key={`city-${city}`}
                  type="button"
                  onClick={() => clearCityChip(city)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">{city}</span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              {appliedFilters.firmTypes.map((ft) => (
                <button
                  key={`ft-${ft}`}
                  type="button"
                  onClick={() => clearFirmTypeChip(ft)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">{ft}</span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              {appliedFilters.expertiseKeys.map((key) => (
                <button
                  key={`ex-${key}`}
                  type="button"
                  onClick={() => clearExpertiseChip(key)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    {specializationFilterLabels[key] ?? key}
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              {appliedFilters.mainServiceLabels.map((svc) =>
                lockedMainServiceSet.has(svc) ? (
                  <span
                    key={`ms-${svc}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    <span className="max-w-56 truncate">{svc}</span>
                  </span>
                ) : (
                  <button
                    key={`ms-${svc}`}
                    type="button"
                    onClick={() => clearMainServiceChip(svc)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                  >
                    <span className="max-w-56 truncate">{svc}</span>
                    <span className="text-foreground/45" aria-hidden>
                      ×
                    </span>
                  </button>
                )
              )}
              {appliedFilters.visaTypes.map((key) =>
                lockedVisaTypeSet.has(key) ? (
                  <span
                    key={`v-${key}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    <span className="max-w-56 truncate">
                      {specializationFilterLabels[key] ?? key}
                    </span>
                  </span>
                ) : (
                  <button
                    key={`v-${key}`}
                    type="button"
                    onClick={() => clearVisaChip(key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                  >
                    <span className="max-w-56 truncate">
                      {specializationFilterLabels[key] ?? key}
                    </span>
                    <span className="text-foreground/45" aria-hidden>
                      ×
                    </span>
                  </button>
                )
              )}
              {appliedFilters.exploreFocusSlug ? (
                memoCategoryLock?.exploreSlug &&
                appliedFilters.exploreFocusSlug === memoCategoryLock.exploreSlug ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    <span className="max-w-56 truncate">
                      {getExploreCategoryBySlug(appliedFilters.exploreFocusSlug)
                        ?.label ?? "Hedef"}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={clearExploreChip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    <span className="max-w-56 truncate">
                      {getExploreCategoryBySlug(appliedFilters.exploreFocusSlug)
                        ?.label ?? "Hedef"}
                    </span>
                    <span className="text-foreground/50" aria-hidden>
                      ×
                    </span>
                  </button>
                )
              ) : null}
              {appliedFilters.trust.requireTaxCertificate ? (
                <button
                  type="button"
                  onClick={() => clearTrustChip("requireTaxCertificate")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Vergi levhası mevcut
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.trust.requireLicense ? (
                <button
                  type="button"
                  onClick={() => clearTrustChip("requireLicense")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Lisans / yetki numarası var
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.trust.requirePhysicalOffice ? (
                <button
                  type="button"
                  onClick={() => clearTrustChip("requirePhysicalOffice")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Fiziksel ofis var
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.trust.requireOfficeVerified ? (
                <button
                  type="button"
                  onClick={() => clearTrustChip("requireOfficeVerified")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Doğrulanmış ofis adresi
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.requireGoogleListedRating ? (
                <button
                  type="button"
                  onClick={clearGoogleListedRatingChip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Google&apos;da puanı görünen firmalar
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.serviceMode.onlineConsulting ? (
                <button
                  type="button"
                  onClick={() => clearServiceChip("onlineConsulting")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Çevrimiçi danışmanlık
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.serviceMode.officeFaceToFace ? (
                <button
                  type="button"
                  onClick={() => clearServiceChip("officeFaceToFace")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Ofiste / yüz yüze
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.serviceMode.remoteSupport ? (
                <button
                  type="button"
                  onClick={() => clearServiceChip("remoteSupport")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Uzaktan destek
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.serviceMode.weekendSupport ? (
                <button
                  type="button"
                  onClick={() => clearServiceChip("weekendSupport")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Hafta sonu desteği
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.languagePro.multilingualSupport ? (
                <button
                  type="button"
                  onClick={() => clearLangChip("multilingualSupport")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Çok dilli destek
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.languagePro.corporateDomain ? (
                <button
                  type="button"
                  onClick={() => clearLangChip("corporateDomain")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    Kurumsal domain
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.yearPreset === "recent" ? (
                <button
                  type="button"
                  onClick={clearYearPresetChip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    En yeni (~10 yıl)
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {appliedFilters.yearPreset === "vintage" ? (
                <button
                  type="button"
                  onClick={clearYearPresetChip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    En eski (ilk 25 yıl)
                  </span>
                  <span className="text-foreground/45" aria-hidden>
                    ×
                  </span>
                </button>
              ) : null}
              {extraNonChipFilterCount > 0 ? (
                <span
                  className="inline-flex items-center rounded-full border border-border/80 bg-primary/4 px-2.5 py-1 text-xs font-medium text-foreground/65"
                  title="Kurumsallık, hype veya kuruluş yılı aralığı filtre panelinde"
                >
                  +{extraNonChipFilterCount} skor / yıl kriteri
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {sorted.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
          {sorted.length === 0 ? (
            <div className="premium-card mt-4 space-y-4 p-8 text-center text-sm leading-relaxed text-foreground/75">
              {appliedFilters.mainServiceLabels.length > 0 ? (
                <>
                  <p>
                    Seçtiğiniz hizmet kategorilerinde eşleşen firma bulunamadı.
                    Farklı hizmet veya filtre kombinasyonlarını deneyin.
                  </p>
                  <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setAppliedFiltersWithLock((prev) => ({
                          ...prev,
                          mainServiceLabels: [],
                        }))
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                    >
                      Ana hizmet filtresini kaldır
                    </button>
                    {appliedFilters.expertiseKeys.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAppliedFiltersWithLock((prev) => ({
                            ...prev,
                            expertiseKeys: [],
                          }))
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                      >
                        Uzmanlık filtresini kaldır
                      </button>
                    ) : null}
                  </div>
                </>
              ) : appliedFilters.expertiseKeys.length > 0 ? (
                <>
                  <p>
                    Seçtiğiniz uzmanlık alanında eşleşen firma bulunamadı.
                    İsterseniz diğer uzmanlık alanlarını veya firma türü / ülke
                    filtrelerini birlikte deneyin.
                  </p>
                  <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setAppliedFiltersWithLock((prev) => ({
                          ...prev,
                          expertiseKeys: [],
                        }))
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                    >
                      Uzmanlık filtresini kaldır
                    </button>
                    {appliedFilters.firmTypes.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAppliedFiltersWithLock((prev) => ({ ...prev, firmTypes: [] }))
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                      >
                        Firma türü filtresini kaldır
                      </button>
                    ) : null}
                  </div>
                </>
              ) : appliedFilters.firmTypes.length > 0 ? (
                <>
                  <p>
                    Seçtiğiniz firma türünde eşleşen kayıt bulunamadı. İsterseniz
                    diğer firma türlerini veya daha geniş ülke / ofis filtrelerini
                    deneyin.
                  </p>
                  <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setAppliedFiltersWithLock((prev) => ({ ...prev, firmTypes: [] }))
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                    >
                      Firma türü filtresini kaldır
                    </button>
                    {appliedFilters.coverage.countries.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAppliedFiltersWithLock((prev) => ({
                            ...prev,
                            coverage: { ...prev.coverage, countries: [] },
                          }))
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                      >
                        Ülke filtresini kaldır
                      </button>
                    ) : null}
                  </div>
                </>
              ) : appliedFilters.cities.length > 0 ? (
                <>
                  <p>
                    Seçtiğiniz şehirde eşleşen firma bulunamadı. İsterseniz yakın
                    şehirleri veya çevrimiçi danışmanlık sunan firmaları
                    inceleyin.
                  </p>
                  <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setAppliedFiltersWithLock((prev) => ({ ...prev, cities: [] }))
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                    >
                      Şehir filtresini kaldır
                    </button>
                    {appliedFilters.serviceMode.officeFaceToFace ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAppliedFiltersWithLock((prev) => ({
                            ...prev,
                            serviceMode: {
                              ...prev.serviceMode,
                              officeFaceToFace: false,
                            },
                          }))
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                      >
                        &quot;Ofiste / yüz yüze&quot; filtresini kaldır
                      </button>
                    ) : null}
                    {!appliedFilters.serviceMode.onlineConsulting ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAppliedFiltersWithLock((prev) => ({
                            ...prev,
                            serviceMode: {
                              ...prev.serviceMode,
                              onlineConsulting: true,
                            },
                          }))
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/85 transition hover:bg-primary/5"
                      >
                        Çevrimiçi danışmanlığı dahil et
                      </button>
                    ) : null}
                  </div>
                </>
              ) : (
                <p>
                  Bu filtrelerle eşleşen firma bulunamadı. Daha geniş sonuçlar
                  için bazı bölgeleri, ülkeleri veya diğer kriterleri
                  kaldırabilirsiniz.
                </p>
              )}
            </div>
          ) : null}
          </div>
        </div>
      </div>
      </div>

      <FirmFilterBottomSheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        draft={filterDraft}
        onChange={setFilterDraft}
        bounds={bounds}
        countryOptions={countriesSource}
        companyTypeOptions={companyTypesSource}
        mainServiceCategoryOptions={mainServiceCategorySource}
        specializationTaxonomyOptions={specializationTaxonomyOptions}
        resultCount={previewCount}
        activeFilterCount={draftFilterActiveCount}
        onApply={applyFilterSheet}
        onClear={clearFilterDraft}
      />

      <FirmSortBottomSheet
        open={sortSheetOpen}
        onClose={() => setSortSheetOpen(false)}
        activeSort={sort}
        onSelect={(next) => {
          setSort(next);
          setSortSheetOpen(false);
        }}
      />
    </section>
  );
}
