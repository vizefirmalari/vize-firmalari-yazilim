"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_COUNTRIES } from "@/lib/constants";
import {
  applyListingFilters,
  computeRangeBounds,
  LISTING_SORT_OPTIONS,
  sortFirms,
  type AppliedListingFilters,
} from "@/lib/firma/listing-filters";
import { countActiveListingFilters } from "@/lib/firma/listing-filter-active-count";
import { filterCountryNamesForListing } from "@/lib/firma/filter-country-options";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmRow, FirmSort } from "@/lib/types/firm";
import { FirmCard } from "@/components/home/firm-card";
import { FirmFilterBottomSheet, FirmSortBottomSheet } from "@/components/home/firm-listing-sheets";
import { FirmListingFilterFields } from "@/components/home/firm-listing-filter-fields";
import {
  SPECIALIZATION_LABELS,
  specializationKeyFromLabel,
  type SpecializationKey,
} from "@/lib/constants/firm-specializations";
import { getExploreCategoryBySlug } from "@/lib/explore/explore-categories";

type Props = {
  initialFirms: FirmRow[];
  initialCountries?: string[];
  initialVisaTypes?: string[];
  initialCities?: string[];
  initialMainServices?: string[];
  initialExploreFocusSlug?: string | null;
  initialSort?: FirmSort;
  query?: string;
  countryList?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
  /** Ana sayfa: vitrin (keşif) alanı — sağ sütunda, filtre ile hizalı */
  children?: ReactNode;
};

function buildApplied(
  bounds: ReturnType<typeof computeRangeBounds>,
  countries: string[],
  visaTypes: string[],
  cities: string[] = [],
  mainServiceLabels: string[] = [],
  exploreFocusSlug: string | null = null
): AppliedListingFilters {
  const normalizedVisaTypes = visaTypes
    .map((v) => specializationKeyFromLabel(v) ?? (v as SpecializationKey))
    .filter(Boolean);
  return {
    coverage: {
      visaRegionLabels: [],
      countries: [...countries],
    },
    visaTypes: [...new Set(normalizedVisaTypes)],
    cities: [...cities],
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
  };
}

export function FirmsListing({
  initialFirms,
  initialCountries = [],
  initialVisaTypes = [],
  initialCities = [],
  initialMainServices = [],
  initialExploreFocusSlug = null,
  initialSort = "name_asc",
  query = "",
  countryList,
  featuredTitle = "Tüm Firmalar",
  featuredSubtitle =
    "Filtreleyin, karşılaştırın ve size uygun firmayı bulun.",
  children,
}: Props) {
  const router = useRouter();
  const bounds = useMemo(
    () => computeRangeBounds(initialFirms),
    [initialFirms]
  );

  const [appliedFilters, setAppliedFilters] = useState<AppliedListingFilters>(
    () =>
      buildApplied(
        bounds,
        initialCountries,
        initialVisaTypes,
        initialCities,
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
        initialMainServices,
        initialExploreFocusSlug
      )
  );

  const urlKey = useMemo(
    () =>
      [
        initialCountries.join(","),
        initialVisaTypes.join(","),
        initialCities.join(","),
        initialMainServices.join(","),
        initialExploreFocusSlug ?? "",
        initialSort,
      ].join("|"),
    [
      initialCountries,
      initialVisaTypes,
      initialCities,
      initialMainServices,
      initialExploreFocusSlug,
      initialSort,
    ]
  );

  useEffect(() => {
    setAppliedFilters(
      buildApplied(
        bounds,
        initialCountries,
        initialVisaTypes,
        initialCities,
        initialMainServices,
        initialExploreFocusSlug
      )
    );
    setSort(initialSort);
    // Yalnızca URL / sunucu filtre senkronu; firms realtime ile bounds değişince sıfırlanmaz.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bounds, initialCountries, initialVisaTypes, initialSort: urlKey ile birlikte güncellenir
  }, [urlKey]);

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
    return filterCountryNamesForListing(raw);
  }, [countryList]);
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
    n += appliedFilters.cities.length;
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
    if (appliedFilters.yearPreset !== null) n++;
    return n;
  }, [appliedFilters]);

  const extraNonChipFilterCount = Math.max(
    0,
    activeFilterCount - removableChipCount
  );

  const clearCoverageChip = (kind: "region" | "country", value: string) => {
    setAppliedFilters((prev) => {
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

  const clearVisaChip = (key: SpecializationKey) => {
    setAppliedFilters((prev) => ({
      ...prev,
      visaTypes: prev.visaTypes.filter((x) => x !== key),
    }));
  };

  const clearTrustChip = (
    key: keyof AppliedListingFilters["trust"]
  ) => {
    setAppliedFilters((prev) => ({
      ...prev,
      trust: { ...prev.trust, [key]: false },
    }));
  };

  const clearServiceChip = (
    key: keyof AppliedListingFilters["serviceMode"]
  ) => {
    setAppliedFilters((prev) => ({
      ...prev,
      serviceMode: { ...prev.serviceMode, [key]: false },
    }));
  };

  const clearLangChip = (key: "multilingualSupport" | "corporateDomain") => {
    setAppliedFilters((prev) => ({
      ...prev,
      languagePro: { ...prev.languagePro, [key]: false },
    }));
  };

  const clearYearPresetChip = () => {
    setAppliedFilters((prev) => ({ ...prev, yearPreset: null }));
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
    setFilterDraft(buildApplied(bounds, [], [], [], [], null));
  };

  const applyFilterSheet = () => {
    setAppliedFilters(filterDraft);
    setFilterSheetOpen(false);
  };

  const sortLabel =
    LISTING_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Firma adına göre (A-Z)";

  const resetToCleanHome = () => {
    setAppliedFilters(buildApplied(bounds, [], [], [], [], null));
    setSort("name_asc");
    router.replace("/#firmalar", { scroll: false });
  };

  const clearCityChip = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      cities: prev.cities.filter((x) => x !== value),
    }));
  };

  const clearMainServiceChip = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      mainServiceLabels: prev.mainServiceLabels.filter((x) => x !== value),
    }));
  };

  const clearExploreChip = () => {
    setAppliedFilters((prev) => ({ ...prev, exploreFocusSlug: null }));
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("hedef")) {
      params.delete("hedef");
      const qs = params.toString();
      router.replace(qs ? `/?${qs}#firmalar` : "/#firmalar", { scroll: false });
      return;
    }
    router.replace("/#firmalar", { scroll: false });
  };

  return (
    <section className="pb-14">
      <div className="container-shell">
        <div className="grid gap-8 pt-1 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start lg:gap-10 lg:pt-2">
        <aside className="premium-card hidden h-fit w-full p-5 lg:sticky lg:top-24 lg:block lg:self-start">
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

          <div className="mt-5">
            <FirmListingFilterFields
              draft={appliedFilters}
              onChange={setAppliedFilters}
              bounds={bounds}
              countryOptions={countriesSource}
            />
          </div>

          <fieldset className="mt-6 border-t border-border pt-6">
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
            className={`scroll-mt-28 border-t border-border/70 pt-12 lg:pt-14 ${
              children ? "mt-12 lg:mt-14" : "mt-6 lg:mt-8"
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
              {appliedFilters.visaTypes.map((key) => (
                <button
                  key={`v-${key}`}
                  type="button"
                  onClick={() => clearVisaChip(key)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/85"
                >
                  <span className="max-w-56 truncate">
                    {SPECIALIZATION_LABELS[key]}
                  </span>
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
              {appliedFilters.mainServiceLabels.map((svc) => (
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
              ))}
              {appliedFilters.exploreFocusSlug ? (
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
            <div className="premium-card mt-4 p-8 text-center text-sm leading-relaxed text-foreground/75">
              Bu filtrelerle eşleşen firma bulunamadı. Daha geniş sonuçlar için
              bazı bölgeleri, ülkeleri veya diğer kriterleri kaldırabilirsiniz.
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
