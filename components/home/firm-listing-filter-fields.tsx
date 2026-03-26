"use client";

import { useState, type ReactNode } from "react";
import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { ListingRangeBounds } from "@/lib/firma/listing-filters";

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
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
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

type FilterFieldsProps = {
  draft: AppliedListingFilters;
  onChange: (next: AppliedListingFilters) => void;
  bounds: ListingRangeBounds;
  countryOptions: string[];
  serviceOptions: string[];
  companyTypeOptions: string[];
  /** Collapsible sections (mobile sheet); plain sections on desktop */
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

  const countryBlock = (
    <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
      {countryOptions.map((c) => (
        <label
          key={c}
          className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90"
        >
          <input
            type="checkbox"
            checked={draft.countries.includes(c)}
            onChange={(e) =>
              patch({
                countries: toggleListItem(
                  draft.countries,
                  c,
                  e.target.checked
                ),
              })
            }
            className="accent-primary"
          />
          <span className="truncate">{c}</span>
        </label>
      ))}
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

  const corpRange = (
    <RangePair
      minBound={bounds.corp.min}
      maxBound={bounds.corp.max}
      low={draft.corpMin}
      high={draft.corpMax}
      onLowChange={(v) => patch({ corpMin: Math.min(v, draft.corpMax) })}
      onHighChange={(v) => patch({ corpMax: Math.max(v, draft.corpMin) })}
    />
  );

  const hypeRange = (
    <RangePair
      minBound={bounds.hype.min}
      maxBound={bounds.hype.max}
      low={draft.hypeMin}
      high={draft.hypeMax}
      onLowChange={(v) => patch({ hypeMin: Math.min(v, draft.hypeMax) })}
      onHighChange={(v) => patch({ hypeMax: Math.max(v, draft.hypeMin) })}
    />
  );

  const yearRange = (
    <RangePair
      minBound={bounds.year.min}
      maxBound={bounds.year.max}
      low={draft.yearMin}
      high={draft.yearMax}
      onLowChange={(v) => patch({ yearMin: Math.min(v, draft.yearMax) })}
      onHighChange={(v) => patch({ yearMax: Math.max(v, draft.yearMin) })}
    />
  );

  if (collapsible) {
    return (
      <>
        <Collapsible title="Ülke">{countryBlock}</Collapsible>
        <Collapsible title="Hizmet Türü">{serviceBlock}</Collapsible>
        <Collapsible title="Firma Türü">{companyBlock}</Collapsible>
        <Collapsible title="Kurumsallık Skoru">{corpRange}</Collapsible>
        <Collapsible title="Hype Puanı">{hypeRange}</Collapsible>
        <Collapsible title="Kuruluş Yılı">{yearRange}</Collapsible>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-foreground">Ülke</p>
        <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
          {countryOptions.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={draft.countries.includes(c)}
                onChange={(e) =>
                  patch({
                    countries: toggleListItem(
                      draft.countries,
                      c,
                      e.target.checked
                    ),
                  })
                }
                className="accent-primary"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Hizmet Türü</p>
        <div className="mt-3 space-y-2">
          {serviceOptions.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
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
              {s}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Firma Türü</p>
        <div className="mt-3">{companyBlock}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">
          Kurumsallık Skoru
        </p>
        <div className="mt-3">{corpRange}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Hype Puanı</p>
        <div className="mt-3">{hypeRange}</div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Kuruluş Yılı</p>
        <div className="mt-3">{yearRange}</div>
      </div>
    </div>
  );
}
