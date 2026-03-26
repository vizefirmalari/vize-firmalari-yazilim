"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { ListingRangeBounds } from "@/lib/firma/listing-filters";
import {
  normalizeCountryKey,
  REGIONS,
  resolvePopularCountryRows,
} from "@/lib/firma/coverage-catalog";

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
  onLowChange,
  onHighChange,
}: {
  minBound: number;
  maxBound: number;
  low: number;
  high: number;
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

function toggleListItem(list: string[], item: string, checked: boolean) {
  if (checked) return list.includes(item) ? list : [...list, item];
  return list.filter((x) => x !== item);
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
    () => resolvePopularCountryRows(countryOptions),
    [countryOptions]
  );
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Popüler Ülkeler
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

function CountryFullListBlock({
  draft,
  countryOptions,
  patch,
}: {
  draft: AppliedListingFilters;
  countryOptions: string[];
  patch: (partial: Partial<AppliedListingFilters>) => void;
}) {
  const [q, setQ] = useState("");

  const popularRows = useMemo(
    () => resolvePopularCountryRows(countryOptions),
    [countryOptions]
  );
  const popularValues = useMemo(
    () => new Set(popularRows.map((r) => r.value)),
    [popularRows]
  );

  const sortedAtoZ = useMemo(
    () => [...countryOptions].sort((a, b) => a.localeCompare(b, "tr")),
    [countryOptions]
  );

  const listForScroll = useMemo(() => {
    const needle = normalizeCountryKey(q);
    return sortedAtoZ.filter((c) => {
      if (popularValues.has(c)) return false;
      if (!needle) return true;
      return normalizeCountryKey(c).includes(needle);
    });
  }, [sortedAtoZ, popularValues, q]);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Ülke Seçimi
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ülke ara…"
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
        autoComplete="off"
        enterKeyHint="search"
      />
      <div
        className="mt-2 max-h-[min(320px,50vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]"
        role="listbox"
        aria-label="Ülkeler"
      >
        {listForScroll.length === 0 ? (
          <p className="py-2 text-xs text-foreground/55">Eşleşen ülke yok.</p>
        ) : null}
        {listForScroll.map((c) => (
          <label
            key={c}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.coverage.countries.includes(c)}
              onChange={(e) =>
                patch({
                  coverage: {
                    ...draft.coverage,
                    countries: toggleListItem(
                      draft.coverage.countries,
                      c,
                      e.target.checked
                    ),
                  },
                })
              }
              className="accent-primary"
            />
            <span className="min-w-0 wrap-break-word leading-snug">{c}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

type FilterFieldsProps = {
  draft: AppliedListingFilters;
  onChange: (next: AppliedListingFilters) => void;
  bounds: ListingRangeBounds;
  countryOptions: string[];
  serviceOptions: string[];
  companyTypeOptions: string[];
  collapsible?: boolean;
};

export function FirmListingFilterFields({
  draft,
  onChange,
  bounds,
  countryOptions,
  serviceOptions,
  companyTypeOptions,
  collapsible = false,
}: FilterFieldsProps) {
  const patch = (partial: Partial<AppliedListingFilters>) =>
    onChange({ ...draft, ...partial });

  const coverageGroup = (
    <div className="space-y-4">
      <PopularCountriesBlock
        draft={draft}
        countryOptions={countryOptions}
        patch={patch}
      />

      <CountryFullListBlock
        draft={draft}
        countryOptions={countryOptions}
        patch={patch}
      />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
          Bölgeler
        </p>
        <div className="mt-2 max-h-[min(240px,40vh)] space-y-2 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]">
          {REGIONS.map((r) => (
            <label
              key={r.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
            >
              <input
                type="checkbox"
                checked={draft.coverage.regionIds.includes(r.id)}
                onChange={(e) =>
                  patch({
                    coverage: {
                      ...draft.coverage,
                      regionIds: toggleListItem(
                        draft.coverage.regionIds,
                        r.id,
                        e.target.checked
                      ),
                    },
                  })
                }
                className="accent-primary"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const serviceBlock = (
    <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
      {serviceOptions.map((s) => (
        <label
          key={s}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.services.includes(s)}
            onChange={(e) =>
              patch({
                services: toggleListItem(
                  draft.services,
                  s,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span className="truncate">{s}</span>
        </label>
      ))}
    </div>
  );

  const companyBlock =
    companyTypeOptions.length === 0 ? (
      <p className="text-xs text-foreground/55">Firma türü seçeneği bulunamadı.</p>
    ) : (
      <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
        {companyTypeOptions.map((t) => (
          <label
            key={t}
            className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
          >
            <input
              type="checkbox"
              checked={draft.companyTypes.includes(t)}
              onChange={(e) =>
                patch({
                  companyTypes: toggleListItem(
                    draft.companyTypes,
                    t,
                    e.target.checked
                  ),
                })
              }
              className="accent-primary"
            />
            <span className="truncate">{t}</span>
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

  if (collapsible) {
    return (
      <>
        <Collapsible title="Ülke / Bölge Seçimi">{coverageGroup}</Collapsible>
        <Collapsible title="Hizmet Türü">{serviceBlock}</Collapsible>
        <Collapsible title="Firma Türü">{companyBlock}</Collapsible>
        <Collapsible title="Kurumsallık & Yasal Yapı">{trustBlock}</Collapsible>
        <Collapsible title="Hizmet Biçimi">{serviceModeBlock}</Collapsible>
        <Collapsible title="Dil & Profesyonellik">{langBlock}</Collapsible>
        <Collapsible title="Kurumsallık & Hype Skoru" defaultOpen>
          {scoresBlock}
        </Collapsible>
        <Collapsible title="Kuruluş Yılı">{yearBlock}</Collapsible>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Ülke / Bölge Seçimi
        </p>
        <div className="mt-3">{coverageGroup}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Hizmet Türü</p>
        <div className="mt-3">{serviceBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Firma Türü</p>
        <div className="mt-3">{companyBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Kurumsallık & Yasal Yapı
        </p>
        <div className="mt-3">{trustBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Hizmet Biçimi</p>
        <div className="mt-3">{serviceModeBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Dil & Profesyonellik
        </p>
        <div className="mt-3">{langBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Kurumsallık & Hype Skoru
        </p>
        <div className="mt-3">{scoresBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Kuruluş Yılı</p>
        <div className="mt-3">{yearBlock}</div>
      </div>
    </div>
  );
}
