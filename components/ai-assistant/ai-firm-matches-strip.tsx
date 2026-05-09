"use client";

import { useEffect, useMemo, useState } from "react";

import { FirmCard } from "@/components/home/firm-card";
import type { FirmRow } from "@/lib/types/firm";
import type { AiAssistantFirmMatchDTO } from "@/lib/ai-assistant/types";

type Props = {
  matches: AiAssistantFirmMatchDTO[];
};

/**
 * Yatay kaydırılabilir AI firma eşleşme şeridi.
 *
 * Kurallar:
 *  - Mevcut FirmCard component'ini olduğu gibi kullanır (kart tasarımı bozulmaz).
 *  - Firma adları AI tarafından üretilmez; firm_id'ler `/api/ai-assistant/firms`
 *    üzerinden gerçek firma kayıtlarına çözülür.
 *  - Eşleşme yoksa sade boş durum mesajı.
 */
export function AiFirmMatchesStrip({ matches }: Props) {
  const firmIds = useMemo(
    () =>
      matches
        .map((m) => m.firm_id)
        .filter((x): x is string => typeof x === "string" && x.length > 0),
    [matches]
  );

  const [firms, setFirms] = useState<FirmRow[]>([]);
  const [loading, setLoading] = useState(false);

  /** firm_ids değişince tek POST ile tüm kartları çek; boşsa sıfırla. */
  useEffect(() => {
    let cancelled = false;
    if (firmIds.length === 0) {
      setFirms([]);
      return;
    }

    setLoading(true);
    fetch("/api/ai-assistant/firms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firm_ids: firmIds }),
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
  }, [firmIds]);

  if (matches.length === 0) {
    return (
      <div className="mt-3 rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-3 text-xs text-[#6b7280]">
        Bu araştırma için şu anda sistemde uygun firma eşleşmesi bulunamadı.
      </div>
    );
  }

  if (loading && firms.length === 0) {
    return (
      <div className="mt-3 flex gap-3 overflow-x-auto px-0.5 pb-1">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-[280px] w-[280px] shrink-0 animate-pulse rounded-xl border border-[#0B3C5D]/8 bg-[#F7F9FB]"
            aria-hidden
          />
        ))}
      </div>
    );
  }

  if (firms.length === 0) return null;

  return (
    <div className="-mx-1 mt-3">
      <div className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
        Önerilen firmalar
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
        {firms.map((firm) => (
          <div
            key={firm.id}
            className="w-[296px] shrink-0 snap-start sm:w-[320px]"
          >
            <FirmCard firm={firm} />
          </div>
        ))}
      </div>
    </div>
  );
}
