"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { FirmCard } from "@/components/home/firm-card";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { buildHomeFirmsListingHrefFromAiRequestFilters } from "@/lib/ai-assistant/listing-href-from-filters";
import type { FirmRow } from "@/lib/types/firm";
import type { AiAssistantFirmMatchDTO } from "@/lib/ai-assistant/types";

type Props = {
  matches: AiAssistantFirmMatchDTO[];
  requestFilters: Record<string, unknown> | null;
};

const EMPTY_COPY =
  "Bu araştırma için şu anda sistemde uygun firma eşleşmesi bulunamadı.";

const listingCtaClassName =
  "inline-flex items-center justify-center rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:border-primary/35 hover:bg-[#F7F9FB]";

/**
 * AI eşleşme firma şeridi — ana sayfa vitrin şeridi ile aynı kart genişliği ve
 * `HomepageHorizontalScroller` davranışı; sıralama ve ilk 20 limiti sunucuda
 * (`/api/ai-assistant/firms` + `getFirmsForAiMatchStrip`).
 */
export function AiFirmMatchesStrip({ matches, requestFilters }: Props) {
  const listingHref = useMemo(
    () => buildHomeFirmsListingHrefFromAiRequestFilters(requestFilters),
    [requestFilters]
  );

  const [firms, setFirms] = useState<FirmRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (matches.length === 0) {
      setFirms([]);
      return;
    }

    setLoading(true);
    fetch("/api/ai-assistant/firms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matches }),
    })
      .then((r) => r.json())
      .then((payload: { ok?: boolean; firms?: FirmRow[] }) => {
        if (cancelled) return;
        if (payload?.ok && Array.isArray(payload.firms)) {
          setFirms(payload.firms);
        } else {
          setFirms([]);
        }
      })
      .catch(() => {
        if (!cancelled) setFirms([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [matches]);

  if (matches.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-4">
        <p className="text-xs leading-relaxed text-[#6b7280]">{EMPTY_COPY}</p>
        <div className="mt-3">
          <Link href="/#firmalar" className={listingCtaClassName}>
            Tüm firmaları incele
          </Link>
        </div>
      </div>
    );
  }

  if (loading && firms.length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold tracking-tight text-[#0f172a]">
          Önerilen Firmalar
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
          Konuya uygunluk ve kurumsallık skoruna göre sıralanan firmalar.
        </p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-[300px] w-[min(22.5rem,calc(100vw-2.25rem))] shrink-0 animate-pulse rounded-xl border border-[#0B3C5D]/8 bg-[#F7F9FB] sm:w-90"
              aria-hidden
            />
          ))}
        </div>
      </div>
    );
  }

  if (firms.length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold tracking-tight text-[#0f172a]">
          Önerilen Firmalar
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
          Konuya uygunluk ve kurumsallık skoruna göre sıralanan firmalar.
        </p>
        <div className="mt-3 rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-3">
          <p className="text-xs leading-relaxed text-[#6b7280]">{EMPTY_COPY}</p>
        </div>
        <div className="mt-3">
          <Link href="/#firmalar" className={listingCtaClassName}>
            Tüm firmaları incele
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-[15px] font-semibold tracking-tight text-[#0f172a]">
        Önerilen Firmalar
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
        Konuya uygunluk ve kurumsallık skoruna göre sıralanan firmalar.
      </p>

      <div className="mt-3">
        <HomepageHorizontalScroller
          gapClass="gap-3 md:gap-4"
          scrollAreaPbClass="pb-0"
        >
          {firms.map((firm) => (
            <div
              key={firm.id}
              className="h-full w-[min(22.5rem,calc(100vw-2.25rem))] shrink-0 snap-start sm:w-90"
            >
              <FirmCard firm={firm} />
            </div>
          ))}
        </HomepageHorizontalScroller>
      </div>

      <div className="mt-4">
        <Link href={listingHref} className={listingCtaClassName}>
          Tüm firmaları göster
        </Link>
      </div>
    </div>
  );
}
