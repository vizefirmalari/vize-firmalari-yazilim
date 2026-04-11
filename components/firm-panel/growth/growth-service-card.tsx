"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { GrowthPurchaseModal, type GrowthPurchaseModalBank } from "@/components/firm-panel/growth/growth-purchase-modal";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import type { GrowthServiceRow } from "@/lib/types/growth-commerce";

type Props = {
  firmId: string;
  firmName: string;
  bank: GrowthPurchaseModalBank;
  service: GrowthServiceRow;
  /** Kategori etiketi (kart üstü) */
  categoryLabel?: string | null;
  /** Öne çıkan vitrin satırı için güçlü görünüm */
  variant?: "default" | "spotlight";
  /** URL ?hizmet= ile açılış (bir kez) */
  autoOpenToken: string | null;
  onAutoOpenConsumed?: () => void;
};

const CHIP_MAX = 3;

function plainTextFromHtml(html: string, maxLen: number): string {
  const t = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen).trim()}…`;
}

export function GrowthServiceCard({
  firmId,
  firmName,
  bank,
  service,
  categoryLabel,
  variant = "default",
  autoOpenToken,
  onAutoOpenConsumed,
}: Props) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const badge = service.badge?.trim() || null;
  const featured = service.is_featured;
  const spotlight = variant === "spotlight";

  const benefitChips = useMemo(() => service.package_includes.slice(0, CHIP_MAX), [service.package_includes]);
  const remainderIncludes = useMemo(() => service.package_includes.slice(CHIP_MAX), [service.package_includes]);

  const benefitSummary = useMemo(() => {
    const joined = remainderIncludes.join(" ").trim();
    if (joined) {
      return joined.length > 200 ? `${joined.slice(0, 200).trim()}…` : joined;
    }
    if (!service.short_description?.trim() && service.long_description?.trim()) {
      return plainTextFromHtml(service.long_description, 150);
    }
    return null;
  }, [remainderIncludes, service.long_description, service.short_description]);

  useEffect(() => {
    if (!autoOpenToken || autoOpenToken !== service.id) return;
    queueMicrotask(() => {
      setPurchaseOpen(true);
      onAutoOpenConsumed?.();
    });
  }, [autoOpenToken, onAutoOpenConsumed, service.id]);

  const showSplitPrice =
    !service.is_custom_price &&
    (service.setup_price != null || service.monthly_price != null);

  const pad = spotlight ? "p-6 sm:p-7" : "p-6";
  const featuredShell =
    spotlight || featured
      ? "border-[#D9A441]/38 ring-1 ring-[#D9A441]/15"
      : "border-[#0B3C5D]/11 hover:border-[#0B3C5D]/18";

  return (
    <>
      <article
        className={`group flex h-full flex-col rounded-2xl border bg-[#FDFDFE] shadow-[0_8px_30px_rgba(11,60,93,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(11,60,93,0.09)] ${featuredShell} ${pad}`}
      >
        {/* A. Rozetler — tek akış, ayırıcı çizgi yok */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categoryLabel ? (
            <span className="max-w-[46%] truncate rounded-full bg-[#F0F3F6] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3C5D]/82 sm:max-w-none">
              {categoryLabel}
            </span>
          ) : null}
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              service.is_active ? "bg-[#EEF2F5] text-[#1A1A1A]/52" : "bg-[#F3F3F3] text-[#1A1A1A]/42"
            }`}
          >
            {service.is_active ? "Vitrinde" : "Kapalı"}
          </span>
          {featured ? (
            <span className="rounded-full bg-[#D9A441]/14 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3C5D]/88">
              Öne çıkan
            </span>
          ) : null}
          {badge ? (
            <span className="max-w-full truncate rounded-full bg-[#F4F4F4] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1A1A1A]/48">
              {badge}
            </span>
          ) : null}
        </div>

        {/* B. Başlık */}
        <h3
          className={`mt-5 font-bold leading-snug tracking-tight text-[#0B3C5D] ${spotlight ? "text-xl sm:text-[1.35rem]" : "text-[1.05rem] sm:text-lg"}`}
        >
          {service.title}
        </h3>

        {/* C. Kısa açıklama */}
        {service.short_description ? (
          <p className="mt-3 line-clamp-3 text-[0.8125rem] leading-[1.65] text-[#1A1A1A]/62 sm:text-sm">{service.short_description}</p>
        ) : null}

        {/* D. Avantaj chip’leri */}
        {benefitChips.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Öne çıkan avantajlar">
            {benefitChips.map((item, i) => (
              <span
                key={`${i}-${item.slice(0, 24)}`}
                className="inline-flex max-w-full rounded-md bg-[#F1F4F7] px-2 py-1 text-[11px] font-medium leading-snug text-[#1A1A1A]/68"
              >
                <span className="line-clamp-2">{item}</span>
              </span>
            ))}
          </div>
        ) : null}

        {/* E. Mini fayda özeti — çerçevesiz, tek blok */}
        {benefitSummary ? (
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-[#1A1A1A]/56 sm:text-xs">{benefitSummary}</p>
        ) : null}

        {/* Üst içerik ile fiyat arasında nefes; kart yüksekliğinde alta iter */}
        <div className="min-h-4 flex-1" aria-hidden />

        {/* F. Fiyat — CTA’dan hemen önce, çizgisiz */}
        <div className="mt-6">
          {showSplitPrice ? (
            <div className="flex flex-row items-end justify-between gap-4">
              {service.setup_price != null ? (
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/42">Kurulum</p>
                  <p className="mt-0.5 text-xl font-bold tabular-nums tracking-tight text-[#0B3C5D] sm:text-2xl">
                    {formatTryLira(service.setup_price)}
                  </p>
                </div>
              ) : null}
              {service.monthly_price != null ? (
                <div className={`min-w-0 text-right ${service.setup_price == null ? "ml-auto" : ""}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/42">Aylık</p>
                  <p className="mt-0.5 text-xl font-bold tabular-nums tracking-tight text-[#0B3C5D] sm:text-2xl">
                    {formatTryLira(service.monthly_price)}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/42">Fiyat</p>
              <p className="mt-0.5 text-xl font-bold tracking-tight text-[#0B3C5D] sm:text-2xl">{priceLine}</p>
            </div>
          )}
        </div>

        {/* G. CTA */}
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
          <button
            type="button"
            disabled={!service.is_active}
            onClick={() => service.is_active && setPurchaseOpen(true)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Satın Al
          </button>
          <Link
            href={`/panel/${firmId}/isini-buyut/hizmet/${service.id}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/16 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:border-[#0B3C5D]/26 hover:bg-white"
          >
            Detayları Gör
          </Link>
        </div>
      </article>

      <GrowthPurchaseModal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        firmId={firmId}
        firmName={firmName}
        bank={bank}
        service={{
          id: service.id,
          title: service.title,
          setup_price: service.setup_price,
          monthly_price: service.monthly_price,
          is_custom_price: service.is_custom_price,
        }}
      />
    </>
  );
}
