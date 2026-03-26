"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_COUNTRIES, SERVICE_OPTIONS } from "@/lib/constants";
import {
  applyListingFilters,
  computeRangeBounds,
  LISTING_SORT_OPTIONS,
  sortFirms,
  type AppliedListingFilters,
} from "@/lib/firma/listing-filters";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmRow, FirmSort } from "@/lib/types/firm";
import { FirmCard } from "@/components/home/firm-card";
import { FirmFilterBottomSheet, FirmSortBottomSheet } from "@/components/home/firm-listing-sheets";
import { FirmListingFilterFields } from "@/components/home/firm-listing-filter-fields";

type Props = {
  initialFirms: FirmRow[];
  initialCountries?: string[];
  initialServices?: string[];
  initialSort?: FirmSort;
  query?: string;
  countryList?: string[];
  serviceOptions?: string[];
  companyTypeOptions?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
};

function buildApplied(
  bounds: ReturnType<typeof computeRangeBounds>,
  countries: string[],
  services: string[]
): AppliedListingFilters {
  return {
    coverage: {
      popularIds: [],
      regionIds: [],
      countries: [...countries],
    },
    services: [...services],
    companyTypes: [],
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
  initialServices = [],
  initialSort = "hype_desc",
  query = "",
  countryList,
  serviceOptions,
  companyTypeOptions = [],
  featuredTitle = "Öne Çıkan Vize Firmaları",
  featuredSubtitle = "Doğrulanmış firmaları karşılaştırın, iletişime geçin ve güvenle başvurun.",
}: Props) {
  const router = useRouter();
  const bounds = useMemo(
    () => computeRangeBounds(initialFirms),
    [initialFirms]
  );

  const [appliedFilters, setAppliedFilters] = useState<AppliedListingFilters>(
    () => buildApplied(bounds, initialCountries, initialServices)
  );
  const [sort, setSort] = useState<FirmSort>(initialSort);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [filterDraft, setFilterDraft] = useState<AppliedListingFilters>(
    () => buildApplied(bounds, initialCountries, initialServices)
  );

  const urlKey = useMemo(
    () =>
      `${initialCountries.join(",")}|${initialServices.join(",")}|${initialSort}`,
    [initialCountries, initialServices, initialSort]
  );

  useEffect(() => {
    setAppliedFilters(buildApplied(bounds, initialCountries, initialServices));
    setSort(initialSort);
    // Yalnızca URL / sunucu filtre senkronu; firms realtime ile bounds değişince sıfırlanmaz.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bounds, initialCountries, initialServices, initialSort: urlKey ile birlikte güncellenir
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

  const countriesSource =
    countryList && countryList.length > 0 ? countryList : DEFAULT_COUNTRIES;
  const servicesSource =
    serviceOptions && serviceOptions.length > 0
      ? serviceOptions
      : [...SERVICE_OPTIONS];

  const visibleCountries = showAllCountries
    ? countriesSource
    : countriesSource.slice(0, 8);

  const filtered = useMemo(
    () =>
      applyListingFilters(initialFirms, appliedFilters, bounds, query),
    [initialFirms, appliedFilters, bounds, query]
  );

  const sorted = useMemo(
    () => sortFirms(filtered, sort),
    [filtered, sort]
  );

  const previewCount = useMemo(
    () =>
      applyListingFilters(initialFirms, filterDraft, bounds, query).length,
    [initialFirms, filterDraft, bounds, query]
  );

  const clearFilterDraft = () => {
    setFilterDraft(buildApplied(bounds, [], []));
  };

  const applyFilterSheet = () => {
    setAppliedFilters(filterDraft);
    setFilterSheetOpen(false);
  };

  const sortLabel =
    LISTING_SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Önerilen";

  return (
    <section id="firmalar" className="container-shell scroll-mt-28 pb-14">
      <div className="lg:hidden">
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              setFilterDraft(appliedFilters);
              setFilterSheetOpen(true);
            }}
            className="flex-1 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold text-foreground/75 shadow-sm transition hover:bg-primary/5"
          >
            Filtrele
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

      <div className="mt-4 grid gap-6 lg:mt-0 lg:grid-cols-[280px_1fr]">
        <aside className="premium-card hidden h-fit p-4 lg:sticky lg:top-24 lg:block">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-primary">Filtrele</h2>
            <button
              type="button"
              onClick={() =>
                setAppliedFilters(buildApplied(bounds, [], []))
              }
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
              countryOptions={visibleCountries}
              serviceOptions={servicesSource}
              companyTypeOptions={companyTypeOptions}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowAllCountries((prev) => !prev)}
                className="text-xs font-semibold text-secondary"
              >
                {showAllCountries ? "Daha Az Göster" : "Tümünü Göster"}
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-semibold text-foreground">Sıralama</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as FirmSort)}
              className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              {LISTING_SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          <h2 className="text-2xl font-bold text-primary">{featuredTitle}</h2>
          <p className="mt-1 text-sm text-foreground/70">{featuredSubtitle}</p>
          <p className="mt-2 text-xs text-foreground/55 lg:hidden">
            Sıralama: <span className="font-medium text-foreground/80">{sortLabel}</span>
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {sorted.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
          {sorted.length === 0 ? (
            <div className="premium-card mt-4 p-8 text-center text-sm text-foreground/70">
              Seçili filtrelere uygun firma bulunamadı.
            </div>
          ) : null}
        </div>
      </div>

      <FirmFilterBottomSheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        draft={filterDraft}
        onChange={setFilterDraft}
        bounds={bounds}
        countryOptions={countriesSource}
        serviceOptions={servicesSource}
        companyTypeOptions={companyTypeOptions}
        resultCount={previewCount}
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
