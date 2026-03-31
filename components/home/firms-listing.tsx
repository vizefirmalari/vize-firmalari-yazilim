"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_COUNTRIES } from "@/lib/constants";
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
import { specializationKeyFromLabel, type SpecializationKey } from "@/lib/constants/firm-specializations";

type Props = {
  initialFirms: FirmRow[];
  initialCountries?: string[];
  initialVisaTypes?: string[];
  initialSort?: FirmSort;
  query?: string;
  countryList?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
};

function buildApplied(
  bounds: ReturnType<typeof computeRangeBounds>,
  countries: string[],
  visaTypes: string[]
): AppliedListingFilters {
  const normalizedVisaTypes = visaTypes
    .map((v) => specializationKeyFromLabel(v) ?? (v as SpecializationKey))
    .filter(Boolean);
  return {
    coverage: {
      regionIds: [],
      countries: [...countries],
    },
    visaTypes: [...new Set(normalizedVisaTypes)],
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
  initialSort = "hype_desc",
  query = "",
  countryList,
  featuredTitle = "Öne Çıkan Vize Firmaları",
  featuredSubtitle = "Doğrulanmış firmaları karşılaştırın, iletişime geçin ve güvenle başvurun.",
}: Props) {
  const router = useRouter();
  const bounds = useMemo(
    () => computeRangeBounds(initialFirms),
    [initialFirms]
  );

  const [appliedFilters, setAppliedFilters] = useState<AppliedListingFilters>(
    () => buildApplied(bounds, initialCountries, initialVisaTypes)
  );
  const [sort, setSort] = useState<FirmSort>(initialSort);

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [filterDraft, setFilterDraft] = useState<AppliedListingFilters>(
    () => buildApplied(bounds, initialCountries, initialVisaTypes)
  );

  const urlKey = useMemo(
    () =>
      `${initialCountries.join(",")}|${initialVisaTypes.join(",")}|${initialSort}`,
    [initialCountries, initialVisaTypes, initialSort]
  );

  useEffect(() => {
    setAppliedFilters(buildApplied(bounds, initialCountries, initialVisaTypes));
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

  const countriesSource =
    countryList && countryList.length > 0 ? countryList : DEFAULT_COUNTRIES;
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

      <div className="mt-4 grid gap-6 lg:mt-0 lg:grid-cols-[minmax(280px,360px)_1fr]">
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
