"use client";

import { useEffect, useId } from "react";
import type { FirmSort } from "@/lib/types/firm";
import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { ListingRangeBounds } from "@/lib/firma/listing-filters";
import { LISTING_SORT_OPTIONS } from "@/lib/firma/listing-filters";
import { FirmListingFilterFields } from "@/components/home/firm-listing-filter-fields";

type FilterSheetProps = {
  open: boolean;
  onClose: () => void;
  draft: AppliedListingFilters;
  onChange: (next: AppliedListingFilters) => void;
  bounds: ListingRangeBounds;
  countryOptions: string[];
  companyTypeOptions: string[];
  mainServiceCategoryOptions: string[];
  specializationTaxonomyOptions?: { slug: string; label: string }[];
  resultCount: number;
  /** Aktif filtre sayısı (başlıkta gösterilir) */
  activeFilterCount?: number;
  onApply: () => void;
  onClear: () => void;
};

export function FirmFilterBottomSheet({
  open,
  onClose,
  draft,
  onChange,
  bounds,
  countryOptions,
  companyTypeOptions,
  mainServiceCategoryOptions,
  specializationTaxonomyOptions = [],
  resultCount,
  activeFilterCount = 0,
  onApply,
  onClear,
}: FilterSheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[111] flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-2xl bg-background shadow-2xl ring-1 ring-border sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <h2 id={titleId} className="text-base font-semibold text-primary">
            Filtrele
            {activeFilterCount > 0 ? (
              <span className="ml-1.5 tabular-nums text-sm font-semibold text-foreground/50">
                ({activeFilterCount})
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-secondary"
          >
            Temizle
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-2">
          <FirmListingFilterFields
            collapsible
            draft={draft}
            onChange={onChange}
            bounds={bounds}
            countryOptions={countryOptions}
            companyTypeOptions={companyTypeOptions}
            mainServiceCategoryOptions={mainServiceCategoryOptions}
            specializationTaxonomyOptions={specializationTaxonomyOptions}
          />
        </div>

        <div className="sticky bottom-0 shrink-0 border-t border-border bg-background px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground/70">
              <span className="font-semibold tabular-nums text-foreground">
                {resultCount}
              </span>{" "}
              firma bulundu
            </p>
            <button
              type="button"
              onClick={onApply}
              className="w-full shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:brightness-95 sm:w-auto"
            >
              Sonuçları Göster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type SortSheetProps = {
  open: boolean;
  onClose: () => void;
  activeSort: FirmSort;
  onSelect: (sort: FirmSort) => void;
};

export function FirmSortBottomSheet({
  open,
  onClose,
  activeSort,
  onSelect,
}: SortSheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[111] flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-2xl bg-background shadow-2xl ring-1 ring-border sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <h2 id={titleId} className="text-base font-semibold text-primary">
            Sırala
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          <ul className="space-y-1">
            {LISTING_SORT_OPTIONS.map(({ value, label }) => {
              const selected = activeSort === value;
              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => onSelect(value)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                      selected
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/90 hover:bg-primary/5"
                    }`}
                  >
                    <span>{label}</span>
                    {selected ? (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground/80 transition hover:bg-primary/5"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
}
