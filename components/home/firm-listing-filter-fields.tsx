"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { ListingRangeBounds } from "@/lib/firma/listing-filters";
import type { FirmSort } from "@/lib/types/firm";
import { normalizeCountryKey } from "@/lib/firma/coverage-catalog";
import { buildUnifiedCountryFilterList } from "@/lib/firma/filter-country-options";
import {
  ALL_LISTING_VISA_REGION_LABELS,
  POPULAR_VISA_REGION_LABELS,
  resolvePopularCountryRowsFromConfig,
  resolvePopularFirmTypeLabelsFromOptions,
  resolvePopularMainServiceLabelsFromOptions,
} from "@/lib/firma/listing-filter-config";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { isBuiltinSpecializationKey } from "@/lib/firma/specialization-match";
import {
  normalizeOfficeCityKey,
  POPULAR_OFFICE_CITY_NAMES,
  TURKEY_OFFICE_PROVINCE_NAMES,
} from "@/lib/constants/turkiye-ofis-sehirleri";
import { ListingFilterSearchableMultiPicker } from "@/components/home/listing-filter-searchable-multi-picker";

/** Masaüstü sol panelde tek dış scroll; mobil / alt sayfada iç liste kısıtları korunur. */
const FILTER_INNER_SCROLL_LG_FLUSH =
  "lg:max-h-none lg:overflow-y-visible lg:overscroll-auto";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-foreground/45 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-primary"
        aria-expanded={open}
      >
        {title}
        <Chevron open={open} />
      </button>
      {open ? <div className="pb-3">{children}</div> : null}
    </div>
  );
}

function RangePair({
  minBound,
  maxBound,
  low,
  high,
  lowAriaLabel,
  highAriaLabel,
  onLowChange,
  onHighChange,
}: {
  minBound: number;
  maxBound: number;
  low: number;
  high: number;
  lowAriaLabel: string;
  highAriaLabel: string;
  onLowChange: (v: number) => void;
  onHighChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-[11px] text-foreground/50">
            <span>Min</span>
            <span className="tabular-nums text-foreground/70">{low}</span>
          </div>
          <input
            type="range"
            aria-label={lowAriaLabel}
            min={minBound}
            max={maxBound}
            value={low}
            onChange={(e) => {
              const v = Number(e.target.value);
              onLowChange(Math.min(v, high));
            }}
            className="mt-1 h-2 w-full cursor-pointer accent-primary"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-[11px] text-foreground/50">
            <span>Maks</span>
            <span className="tabular-nums text-foreground/70">{high}</span>
          </div>
          <input
            type="range"
            aria-label={highAriaLabel}
            min={minBound}
            max={maxBound}
            value={high}
            onChange={(e) => {
              const v = Number(e.target.value);
              onHighChange(Math.max(v, low));
            }}
            className="mt-1 h-2 w-full cursor-pointer accent-primary"
          />
        </div>
      </div>
    </div>
  );
}

function toggleListItem<T extends string>(list: T[], item: T, checked: boolean): T[] {
  if (checked) return list.includes(item) ? list : [...list, item];
  return list.filter((x) => x !== item);
}

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function GoogleRatingGlyph({
  filled,
  label,
}: {
  filled: number;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-px"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={`${label}-${idx}`}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 shrink-0 ${
            idx < filled
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-300 text-slate-300"
          }`}
          aria-hidden
        >
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/** Popüler + diğer bölgeler tek `space-y-2` içinde; Dubai–Avustralya arası fazla boşluk oluşmaz */
function RegionsListBlock({
  draft,
  patch,
}: {
  draft: AppliedListingFilters;
  patch: (partial: Partial<AppliedListingFilters>) => void;
}) {
  const popularSet = useMemo(() => new Set(POPULAR_VISA_REGION_LABELS), []);
  const secondaryLabels = useMemo(
    () => ALL_LISTING_VISA_REGION_LABELS.filter((label) => !popularSet.has(label)),
    [popularSet]
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Popüler bölgeler
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
        Hedef bölgenizi bir tıkla seçin; listeyi rotaya göre daraltın.
      </p>
      <div
        className={`mt-2 max-h-[min(240px,42vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        aria-label="Bölgeler"
      >
        {POPULAR_VISA_REGION_LABELS.map((label) => (
          <label
            key={label}
            className="flex min-w-0 cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.coverage.visaRegionLabels.includes(label)}
              onChange={(e) =>
                patch({
                  coverage: {
                    ...draft.coverage,
                    visaRegionLabels: toggleListItem(
                      draft.coverage.visaRegionLabels,
                      label,
                      e.target.checked
                    ),
                  },
                })
              }
              className="accent-primary"
            />
            <span className="min-w-0 flex-1 truncate font-medium text-primary/95">
              {label}
            </span>
          </label>
        ))}
        {secondaryLabels.map((label) => (
          <label
            key={label}
            className="flex min-w-0 cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.coverage.visaRegionLabels.includes(label)}
              onChange={(e) =>
                patch({
                  coverage: {
                    ...draft.coverage,
                    visaRegionLabels: toggleListItem(
                      draft.coverage.visaRegionLabels,
                      label,
                      e.target.checked
                    ),
                  },
                })
              }
              className="accent-primary"
            />
            <span className="min-w-0 flex-1 truncate font-medium text-primary/95">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function PopularCountriesBlock({
  draft,
  countryOptions,
  patch,
}: {
  draft: AppliedListingFilters;
  countryOptions: string[];
  patch: (partial: Partial<AppliedListingFilters>) => void;
}) {
  const popularRows = useMemo(
    () => resolvePopularCountryRowsFromConfig(countryOptions),
    [countryOptions]
  );
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Popüler ülkeler
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
        Hedef ülke netleştikçe danışmanlık daha isabetli olur; buradan hızlıca seçin.
      </p>
      <div className="mt-2 space-y-2">
        {popularRows.map((row) => (
          <label
            key={row.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.coverage.countries.includes(row.value)}
              onChange={(e) =>
                patch({
                  coverage: {
                    ...draft.coverage,
                    countries: toggleListItem(
                      draft.coverage.countries,
                      row.value,
                      e.target.checked
                    ),
                  },
                })
              }
              className="accent-primary"
            />
            <span>{row.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FirmTypeFilterBlock({
  draft,
  patch,
  companyTypeOptions,
}: {
  draft: AppliedListingFilters;
  patch: (partial: Partial<AppliedListingFilters>) => void;
  companyTypeOptions: string[];
}) {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  const sortedTypes = useMemo(
    () =>
      [...companyTypeOptions].sort((a, b) => a.localeCompare(b, "tr")),
    [companyTypeOptions]
  );

  const popularLabels = useMemo(
    () => resolvePopularFirmTypeLabelsFromOptions(sortedTypes),
    [sortedTypes]
  );

  const listFiltered = useMemo(() => {
    const needle = normalizeOfficeCityKey(deferredQ);
    if (!needle) return sortedTypes;
    return sortedTypes.filter((name) =>
      normalizeOfficeCityKey(name).includes(needle)
    );
  }, [sortedTypes, deferredQ]);

  if (sortedTypes.length === 0) {
    return (
      <p className="text-xs leading-relaxed text-foreground/55">
        Firma türü listesi yüklenemedi veya henüz tanımlı değil.
      </p>
    );
  }

  return (
    <div>
      {popularLabels.length > 0 ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
            Sık seçilenler
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/50">
            Yönetim panelindeki firma türü alanıyla birebir eşleşir.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {popularLabels.map((label) => {
              const active = draft.firmTypes.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    patch({
                      firmTypes: toggleListItem(draft.firmTypes, label, !active),
                    })
                  }
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground/75 hover:bg-primary/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      <p
        className={`text-xs font-semibold uppercase tracking-wide text-foreground/55 ${
          popularLabels.length > 0 ? "mt-5" : ""
        }`}
      >
        Tüm firma türleri
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tür ara…"
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
        autoComplete="off"
        enterKeyHint="search"
      />
      <div
        className={`mt-2 max-h-[min(320px,50vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        aria-label="Firma türleri"
      >
        {listFiltered.length === 0 ? (
          <p className="py-2 text-xs text-foreground/55">Eşleşen tür yok.</p>
        ) : null}
        {listFiltered.map((label) => (
          <label
            key={label}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.firmTypes.includes(label)}
              onChange={(e) =>
                patch({
                  firmTypes: toggleListItem(
                    draft.firmTypes,
                    label,
                    e.target.checked
                  ),
                })
              }
              className="accent-primary"
            />
            <span className="min-w-0 wrap-break-word leading-snug">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function MainServiceCategoriesFilterBlock({
  draft,
  patch,
  mainServiceCategoryOptions,
}: {
  draft: AppliedListingFilters;
  patch: (partial: Partial<AppliedListingFilters>) => void;
  mainServiceCategoryOptions: string[];
}) {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  const sortedLabels = useMemo(
    () =>
      [...mainServiceCategoryOptions].sort((a, b) => a.localeCompare(b, "tr")),
    [mainServiceCategoryOptions]
  );

  const popularLabels = useMemo(
    () => resolvePopularMainServiceLabelsFromOptions(sortedLabels),
    [sortedLabels]
  );

  const listFiltered = useMemo(() => {
    const needle = normalizeOfficeCityKey(deferredQ);
    if (!needle) return sortedLabels;
    return sortedLabels.filter((name) =>
      normalizeOfficeCityKey(name).includes(needle)
    );
  }, [sortedLabels, deferredQ]);

  if (sortedLabels.length === 0) {
    return (
      <p className="text-xs leading-relaxed text-foreground/55">
        Ana hizmet kategorisi listesi yüklenemedi veya henüz tanımlı değil.
      </p>
    );
  }

  return (
    <div>
      {popularLabels.length > 0 ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
            Sık seçilenler
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/50">
            Yönetim panelindeki ana hizmet kategorileri ile aynı kaynak; firma
            kaydındaki ana hizmet listesiyle eşleşir.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {popularLabels.map((label) => {
              const active = draft.mainServiceLabels.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    patch({
                      mainServiceLabels: toggleListItem(
                        draft.mainServiceLabels,
                        label,
                        !active
                      ),
                    })
                  }
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground/75 hover:bg-primary/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      <p
        className={`text-xs font-semibold uppercase tracking-wide text-foreground/55 ${
          popularLabels.length > 0 ? "mt-5" : ""
        }`}
      >
        Tüm kategoriler
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Kategori ara…"
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
        autoComplete="off"
        enterKeyHint="search"
      />
      <div
        className={`mt-2 max-h-[min(320px,50vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        aria-label="Ana hizmet kategorileri"
      >
        {listFiltered.length === 0 ? (
          <p className="py-2 text-xs text-foreground/55">Eşleşen kategori yok.</p>
        ) : null}
        {listFiltered.map((label) => (
          <label
            key={label}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.mainServiceLabels.includes(label)}
              onChange={(e) =>
                patch({
                  mainServiceLabels: toggleListItem(
                    draft.mainServiceLabels,
                    label,
                    e.target.checked
                  ),
                })
              }
              className="accent-primary"
            />
            <span className="min-w-0 wrap-break-word leading-snug">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function OfficeLocationFilterBlock({
  draft,
  patch,
}: {
  draft: AppliedListingFilters;
  patch: (partial: Partial<AppliedListingFilters>) => void;
}) {
  const sortedProvinces = useMemo(
    () => [...TURKEY_OFFICE_PROVINCE_NAMES].sort((a, b) => a.localeCompare(b, "tr")),
    []
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Popüler şehirler
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
        Hızlı seçim; firma kaydındaki ofis şehri ile eşleşir.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {POPULAR_OFFICE_CITY_NAMES.map((city) => {
          const active = draft.cities.includes(city);
          return (
            <button
              key={city}
              type="button"
              onClick={() =>
                patch({
                  cities: toggleListItem(draft.cities, city, !active),
                })
              }
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground/75 hover:bg-primary/5"
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Tüm şehirler
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
        İl adıyla arayın; tam listeyi açıp çoklu seçim yapabilirsiniz.
      </p>
      <div className="mt-2">
        <ListingFilterSearchableMultiPicker
          variantId="listing-office-city-all"
          triggerEmptyLabel="Şehir seç"
          panelEyebrow="Tüm şehirler"
          panelHint="Firma kaydındaki ofis ili ile eşleşir; arama büyük/küçük harf duyarsızdır."
          searchPlaceholder="Şehir ara…"
          listAriaLabel="Ofis konumu şehirleri"
          selected={draft.cities}
          optionsSorted={sortedProvinces}
          normalizeKey={normalizeOfficeCityKey}
          onToggle={(city, checked) =>
            patch({
              cities: toggleListItem(draft.cities, city, checked),
            })
          }
          onClearAll={() => patch({ cities: [] })}
          clearAriaLabel="Şehir seçimini temizle"
        />
      </div>
    </div>
  );
}

function CountryFullListBlock({
  draft,
  countryOptions,
  patch,
}: {
  draft: AppliedListingFilters;
  countryOptions: string[];
  patch: (partial: Partial<AppliedListingFilters>) => void;
}) {
  const sortedAtoZ = useMemo(
    () => [...countryOptions].sort((a, b) => a.localeCompare(b, "tr")),
    [countryOptions]
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Tüm ülkeler
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
        Yalnızca ülke adları; kıta veya bölge etiketleri üstteki bölümde.
      </p>
      <div className="mt-2">
        <ListingFilterSearchableMultiPicker
          variantId="listing-country-full"
          triggerEmptyLabel="Ülke ara / seç"
          panelEyebrow="Tüm ülkeler"
          panelHint="Popüler kısayollarla aynı ülke burada da seçilebilir; arama büyük/küçük harf duyarsızdır."
          searchPlaceholder="Ülke ara…"
          listAriaLabel="Ülkeler — tam liste"
          selected={draft.coverage.countries}
          optionsSorted={sortedAtoZ}
          normalizeKey={normalizeCountryKey}
          onToggle={(c, checked) =>
            patch({
              coverage: {
                ...draft.coverage,
                countries: toggleListItem(draft.coverage.countries, c, checked),
              },
            })
          }
          onClearAll={() =>
            patch({
              coverage: { ...draft.coverage, countries: [] },
            })
          }
          clearAriaLabel="Ülke seçimini temizle"
        />
      </div>
    </div>
  );
}

type FilterFieldsProps = {
  draft: AppliedListingFilters;
  onChange: (next: AppliedListingFilters) => void;
  bounds: ListingRangeBounds;
  countryOptions: string[];
  companyTypeOptions: string[];
  mainServiceCategoryOptions: string[];
  /** Panel taxonomy — sabit boolean anahtarlarıyla çakışan slug'lar elenir */
  specializationTaxonomyOptions?: { slug: string; label: string }[];
  collapsible?: boolean;
  sort?: FirmSort;
  onSortChange?: (sort: FirmSort) => void;
  sortOptions?: { value: FirmSort; label: string }[];
};

export function FirmListingFilterFields({
  draft,
  onChange,
  bounds,
  countryOptions,
  companyTypeOptions,
  mainServiceCategoryOptions,
  specializationTaxonomyOptions = [],
  collapsible = false,
  sort,
  onSortChange,
  sortOptions = [],
}: FilterFieldsProps) {
  const patch = (partial: Partial<AppliedListingFilters>) =>
    onChange({ ...draft, ...partial });

  const extraSpecializationRows = useMemo(() => {
    const seen = new Set<string>();
    const out: { slug: string; label: string }[] = [];
    for (const row of specializationTaxonomyOptions) {
      const slug = row.slug?.trim();
      if (!slug || isBuiltinSpecializationKey(slug)) continue;
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push({ slug, label: row.label?.trim() || slug });
    }
    out.sort((a, b) => a.label.localeCompare(b.label, "tr"));
    return out;
  }, [specializationTaxonomyOptions]);

  const countryOptionsSafe = useMemo(
    () => buildUnifiedCountryFilterList(countryOptions),
    [countryOptions]
  );

  const companyTypeOptionsSafe = useMemo(
    () =>
      [...new Set(companyTypeOptions.map((s) => s.trim()).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b, "tr")
      ),
    [companyTypeOptions]
  );

  const mainServiceCategoryOptionsSafe = useMemo(
    () =>
      [
        ...new Set(
          mainServiceCategoryOptions.map((s) => s.trim()).filter(Boolean)
        ),
      ].sort((a, b) => a.localeCompare(b, "tr")),
    [mainServiceCategoryOptions]
  );

  const regionsAndCountriesGroup = (
    <div className="space-y-5">
      <div className="rounded-lg border border-border/80 bg-primary/3 p-3">
        <p className="text-sm font-semibold text-foreground">Bölgeler</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Vize hizmet bölgeleri (firma kapsamına göre; ülke seçimlerinden otomatik
          eşlenir). Ülke veya şehir adı burada değil, yalnızca bölge etiketleri.
        </p>
        <div className="mt-4">
          <RegionsListBlock draft={draft} patch={patch} />
        </div>
      </div>

      <div className="rounded-lg border border-border/80 bg-background p-3">
        <p className="text-sm font-semibold text-foreground">Ülkeler</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Yalnızca ülke adları. Kıta, bölge veya Schengen gibi etiketler için
          yukarıdaki &quot;Bölgeler&quot; bölümünü kullanın.
        </p>
        <div className="mt-4 space-y-4">
          <PopularCountriesBlock
            draft={draft}
            countryOptions={countryOptionsSafe}
            patch={patch}
          />
          <CountryFullListBlock
            draft={draft}
            countryOptions={countryOptionsSafe}
            patch={patch}
          />
        </div>
      </div>

      <div>{renderGoogleMapsFilterBlock()}</div>
    </div>
  );

  const expertiseAreaBlock = (
    <div className="space-y-2">
      {SPECIALIZATION_OPTIONS.map(({ key, label }) => (
        <label
          key={key}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.expertiseKeys.includes(key)}
            onChange={(e) =>
              patch({
                expertiseKeys: toggleListItem(
                  draft.expertiseKeys,
                  key,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      ))}
      {extraSpecializationRows.map(({ slug, label }) => (
        <label
          key={`ex-tax-${slug}`}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.expertiseKeys.includes(slug)}
            onChange={(e) =>
              patch({
                expertiseKeys: toggleListItem(
                  draft.expertiseKeys,
                  slug,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const visaTypeBlock = (
    <div className="space-y-2">
      {SPECIALIZATION_OPTIONS.map(({ key, label }) => (
        <label
          key={key}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.visaTypes.includes(key)}
            onChange={(e) =>
              patch({
                visaTypes: toggleListItem(
                  draft.visaTypes,
                  key,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      ))}
      {extraSpecializationRows.map(({ slug, label }) => (
        <label
          key={`vt-tax-${slug}`}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.visaTypes.includes(slug)}
            onChange={(e) =>
              patch({
                visaTypes: toggleListItem(
                  draft.visaTypes,
                  slug,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const trustBlock = (
    <div className="space-y-2">
      {(
        [
          ["requireTaxCertificate", "Vergi levhası mevcut"] as const,
          ["requireLicense", "Lisans / yetki numarası var"] as const,
          ["requirePhysicalOffice", "Fiziksel ofis var"] as const,
          ["requireOfficeVerified", "Doğrulanmış ofis adresi"] as const,
        ] as const
      ).map(([key, label]) => (
        <label
          key={key}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.trust[key]}
            onChange={(e) =>
              patch({
                trust: { ...draft.trust, [key]: e.target.checked },
              })
            }
            className="accent-primary"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  function renderGoogleMapsFilterBlock() {
    return (
      <div className="space-y-3 rounded-lg border border-border/80 bg-primary/2 p-3">
      <div className="flex items-center gap-2">
        <GoogleRatingGlyph filled={4} label="Google puanı filtreleri" />
        <p className="text-sm font-semibold text-foreground">Google Haritalar</p>
      </div>
      <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground/90">
        <input
          type="checkbox"
          checked={draft.requireGoogleListedRating}
          onChange={(e) =>
            patch({ requireGoogleListedRating: e.target.checked })
          }
          className="accent-primary"
        />
        <span className="leading-snug">Google&apos;da puanı görünen firmalar</span>
      </label>
      <p className="pl-7 text-xs leading-relaxed text-foreground/55">
        Google Haritalar puanı alınmış firmaları filtreleyin. Place ID tanımlı
        olmayan veya puanı bulunmayan firmalar bu filtrelerde gösterilmez.
      </p>

      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
          Minimum puan
        </p>
        {(
          [
            [4.5, 4, "4,5 ve üzeri"],
            [4.0, 4, "4,0 ve üzeri"],
            [3.5, 3, "3,5 ve üzeri"],
          ] as const
        ).map(([value, starCount, label]) => (
          <label
            key={value}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="radio"
              name="google-min-rating"
              checked={draft.googleMinRating === value}
              onChange={() => patch({ googleMinRating: value })}
              className="accent-primary"
            />
            <span className="flex min-w-0 flex-wrap items-center gap-2 leading-snug">
              <GoogleRatingGlyph
                filled={starCount}
                label={`Google puanı ${value.toLocaleString("tr-TR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })} ve üzeri`}
              />
              <span>{label}</span>
            </span>
          </label>
        ))}
        <button
          type="button"
          onClick={() => patch({ googleMinRating: null })}
          className="pl-6 text-left text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline"
        >
          Puan filtresini temizle
        </button>
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
          Minimum değerlendirme
        </p>
        {(
          [
            [100, "100+ değerlendirme"],
            [500, "500+ değerlendirme"],
            [1000, "1000+ değerlendirme"],
          ] as const
        ).map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
            <input
              type="radio"
              name="google-min-review-count"
              checked={draft.googleMinReviewCount === value}
              onChange={() => patch({ googleMinReviewCount: value })}
              className="accent-primary"
            />
            <span className="leading-snug">{label}</span>
          </label>
        ))}
        <button
          type="button"
          onClick={() => patch({ googleMinReviewCount: null })}
          className="pl-6 text-left text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline"
        >
          Değerlendirme filtresini temizle
        </button>
      </div>
      </div>
    );
  }

  const serviceModeBlock = (
    <div className="space-y-2">
      {(
        [
          ["onlineConsulting", "Çevrimiçi danışmanlık"] as const,
          ["officeFaceToFace", "Ofiste / yüz yüze"] as const,
          ["remoteSupport", "Uzaktan destek"] as const,
          ["weekendSupport", "Hafta sonu desteği"] as const,
        ] as const
      ).map(([key, label]) => (
        <label
          key={key}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.serviceMode[key]}
            onChange={(e) =>
              patch({
                serviceMode: {
                  ...draft.serviceMode,
                  [key]: e.target.checked,
                },
              })
            }
            className="accent-primary"
          />
          <span className="leading-snug">{label}</span>
        </label>
      ))}
    </div>
  );

  const langBlock = (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
        <input
          type="checkbox"
          checked={draft.languagePro.multilingualSupport}
          onChange={(e) =>
            patch({
              languagePro: {
                ...draft.languagePro,
                multilingualSupport: e.target.checked,
              },
            })
          }
          className="accent-primary"
        />
        <span>Çok dilli destek</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
        <input
          type="checkbox"
          checked={draft.languagePro.corporateDomain}
          onChange={(e) =>
            patch({
              languagePro: {
                ...draft.languagePro,
                corporateDomain: e.target.checked,
              },
            })
          }
          className="accent-primary"
        />
        <span>Kurumsal domain</span>
      </label>
    </div>
  );

  const scoresBlock = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-foreground/60">
          Kurumsallık Skoru (0–100)
        </p>
        <RangePair
          minBound={0}
          maxBound={100}
          low={draft.corpMin}
          high={draft.corpMax}
          lowAriaLabel="Minimum kurumsallik skoru"
          highAriaLabel="Maksimum kurumsallik skoru"
          onLowChange={(v) => patch({ corpMin: Math.min(v, draft.corpMax) })}
          onHighChange={(v) => patch({ corpMax: Math.max(v, draft.corpMin) })}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-foreground/60">Hype Puanı</p>
        <RangePair
          minBound={0}
          maxBound={bounds.hype.max}
          low={draft.hypeMin}
          high={draft.hypeMax}
          lowAriaLabel="Minimum hype puani"
          highAriaLabel="Maksimum hype puani"
          onLowChange={(v) => patch({ hypeMin: Math.min(v, draft.hypeMax) })}
          onHighChange={(v) => patch({ hypeMax: Math.max(v, draft.hypeMin) })}
        />
      </div>
    </div>
  );

  const yearBlock = (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            patch({
              yearPreset: draft.yearPreset === "recent" ? null : "recent",
            })
          }
          className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
            draft.yearPreset === "recent"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-foreground/75 hover:bg-primary/5"
          }`}
        >
          En yeni (~10 yıl)
        </button>
        <button
          type="button"
          onClick={() =>
            patch({
              yearPreset: draft.yearPreset === "vintage" ? null : "vintage",
            })
          }
          className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
            draft.yearPreset === "vintage"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-foreground/75 hover:bg-primary/5"
          }`}
        >
          En eski (ilk 25 yıl)
        </button>
      </div>
      <RangePair
        minBound={bounds.year.min}
        maxBound={bounds.year.max}
        low={draft.yearMin}
        high={draft.yearMax}
        lowAriaLabel="Minimum kurulus yili"
        highAriaLabel="Maksimum kurulus yili"
        onLowChange={(v) =>
          patch({
            yearMin: Math.min(v, draft.yearMax),
            yearPreset: null,
          })
        }
        onHighChange={(v) =>
          patch({
            yearMax: Math.max(v, draft.yearMin),
            yearPreset: null,
          })
        }
      />
    </div>
  );

  const sortBlock = sort && onSortChange && sortOptions.length > 0 ? (
    <div className="space-y-2">
      {sortOptions.map(({ value, label }) => (
        <div key={value}>
          {value === "corp_desc" ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Güven & kalite
            </p>
          ) : null}
          {value === "hype_score_desc" ? (
            <p className="mb-1 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Etkileşim
            </p>
          ) : null}
          {value === "founded_year_desc" ? (
            <p className="mb-1 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Kuruluş yılı
            </p>
          ) : null}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
            <input
              type="radio"
              name="listing-sort-inline"
              value={value}
              checked={sort === value}
              onChange={() => onSortChange(value)}
              className="accent-primary"
            />
            <span>{label}</span>
          </label>
        </div>
      ))}
    </div>
  ) : null;

  if (collapsible) {
    return (
      <>
        <Collapsible title="Bölgeler" defaultOpen>
          <RegionsListBlock draft={draft} patch={patch} />
        </Collapsible>
        <Collapsible title="Ülkeler" defaultOpen>
          <div className="space-y-4">
            <PopularCountriesBlock
              draft={draft}
              countryOptions={countryOptionsSafe}
              patch={patch}
            />
            <CountryFullListBlock
              draft={draft}
              countryOptions={countryOptionsSafe}
              patch={patch}
            />
          </div>
        </Collapsible>
        <Collapsible title="Google Haritalar" defaultOpen>
          {renderGoogleMapsFilterBlock()}
        </Collapsible>
        {sortBlock ? (
          <Collapsible title="Sıralama" defaultOpen>
            {sortBlock}
          </Collapsible>
        ) : null}
        <Collapsible title="Ofis Konumu" defaultOpen>
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">
            Türkiye&apos;de fiziksel ofisi bulunan firmaları şehre göre
            filtreleyin; kayıt şehri yönetim panelindeki ofis alanıyla aynıdır.
          </p>
          <OfficeLocationFilterBlock draft={draft} patch={patch} />
        </Collapsible>
        <Collapsible title="Firma Türü" defaultOpen>
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">
            Firmaları kurumsal yapısına ve faaliyet modeline göre filtreleyin;
            seçenekler CMS&apos;teki firma türü listesiyle uyumludur.
          </p>
          <FirmTypeFilterBlock
            draft={draft}
            patch={patch}
            companyTypeOptions={companyTypeOptionsSafe}
          />
        </Collapsible>
        <Collapsible title="Uzmanlık Alanları" defaultOpen>
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">
            Yönetim panelindeki uzmanlık bayraklarıyla aynı kaynak; listede
            işaretli alanlardan en az birine sahip firmalar gösterilir.
          </p>
          <div
            className={`max-h-[min(360px,55vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
          >
            {expertiseAreaBlock}
          </div>
        </Collapsible>
        <Collapsible title="Ana Hizmet Kategorileri" defaultOpen>
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">
            Firmaların sunduğu temel hizmet alanlarına göre filtreleyin. Vize,
            oturum, vatandaşlık veya hukuki danışmanlık gibi hizmetlere göre
            daha doğru firmaları bulun.
          </p>
          <div
            className={`max-h-[min(360px,55vh)] overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
          >
            <MainServiceCategoriesFilterBlock
              draft={draft}
              patch={patch}
              mainServiceCategoryOptions={mainServiceCategoryOptionsSafe}
            />
          </div>
        </Collapsible>
        <Collapsible title="Vize türü">
          <p className="mb-3 text-xs leading-relaxed text-foreground/55">
            Listeyi daraltmak için hizmet niyetine göre seçim; uzmanlık
            gücünü görmek için yukarıdaki &quot;Uzmanlık Alanları&quot;nı
            kullanın.
          </p>
          <div
            className={`max-h-[min(360px,55vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
          >
            {visaTypeBlock}
          </div>
        </Collapsible>
        <Collapsible title="Kurumsallık & yasal yapı">{trustBlock}</Collapsible>
        <Collapsible title="Hizmet biçimi">{serviceModeBlock}</Collapsible>
        <Collapsible title="Dil & profesyonellik">{langBlock}</Collapsible>
        <Collapsible title="Kurumsallık & Hype skoru" defaultOpen>
          {scoresBlock}
        </Collapsible>
        <Collapsible title="Kuruluş yılı">{yearBlock}</Collapsible>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>{regionsAndCountriesGroup}</div>

      {sortBlock ? (
        <div>
          <p className="text-sm font-semibold text-foreground">Sıralama</p>
          <div className="mt-3">{sortBlock}</div>
        </div>
      ) : null}

      <div>
        <p className="text-sm font-semibold text-foreground">Ofis Konumu</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Firmaların Türkiye&apos;deki fiziksel ofis konumuna göre filtreleyin.
          Bulunduğunuz şehirde hizmet veren firmaları bularak yüz yüze görüşme
          imkânı yakalayın.
        </p>
        <div className="mt-4">
          <OfficeLocationFilterBlock draft={draft} patch={patch} />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Firma Türü</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Yönetim panelinde tanımlanan firma yapısına göre filtreleyin. Hukuk
          bürosu, seyahat acentesi, eğitim danışmanlığı veya vize başvuru merkezi
          gibi firma türlerini seçerek daha isabetli sonuçlara ulaşın.
        </p>
        <div className="mt-4">
          <FirmTypeFilterBlock
            draft={draft}
            patch={patch}
            companyTypeOptions={companyTypeOptionsSafe}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Uzmanlık Alanları</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Firmaları uzmanlık bayraklarına göre filtreleyin. Schengen, öğrenci,
          çalışma, aile birleşimi veya red sonrası süreçlerde öne çıkan
          firmaları daha hızlı bulun.
        </p>
        <div
          className={`mt-3 max-h-[min(360px,55vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        >
          {expertiseAreaBlock}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Ana Hizmet Kategorileri
        </p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Firmaların sunduğu temel hizmet alanlarına göre filtreleyin. Vize,
          oturum, vatandaşlık, eğitim veya hukuki danışmanlık gibi hizmetlere
          göre daha doğru firmaları bulun. Yalnızca kayıttaki ana hizmet
          kategorileri dikkate alınır.
        </p>
        <div
          className={`mt-3 max-h-[min(360px,55vh)] overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        >
          <MainServiceCategoriesFilterBlock
            draft={draft}
            patch={patch}
            mainServiceCategoryOptions={mainServiceCategoryOptionsSafe}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Vize türü</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/55">
          Listeyi daraltmak için genel vize hizmet niyeti; paneldeki uzmanlık
          işaretleriyle aynı bayraklara dayanır ancak burada ayrı bir filtre
          olarak uygulanır.
        </p>
        <div
          className={`mt-3 max-h-[min(360px,55vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch] ${FILTER_INNER_SCROLL_LG_FLUSH}`}
        >
          {visaTypeBlock}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Kurumsallık & yasal yapı
        </p>
        <div className="mt-3">{trustBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Hizmet biçimi</p>
        <div className="mt-3">{serviceModeBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Dil & profesyonellik
        </p>
        <div className="mt-3">{langBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Kurumsallık & Hype skoru
        </p>
        <div className="mt-3">{scoresBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Kuruluş yılı</p>
        <div className="mt-3">{yearBlock}</div>
      </div>
    </div>
  );
}
