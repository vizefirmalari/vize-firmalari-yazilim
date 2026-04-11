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

  const valueBlurb = useMemo(() => {
    if (remainderIncludes.length > 0) {
      return remainderIncludes.join(" · ");
    }
    if (service.long_description?.trim()) {
      return plainTextFromHtml(service.long_description, 140);
    }
    return null;
  }, [remainderIncludes, service.long_description]);

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

  return (
    <>
      <article
        className={`group flex h-full flex-col rounded-2xl border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(11,60,93,0.1)] ${
          spotlight || featured
            ? "border-[#D9A441]/40 p-6 ring-1 ring-[#D9A441]/18 sm:p-7"
            : "border-[#0B3C5D]/12 p-5 hover:border-[#0B3C5D]/22"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? (
            <span className="rounded-full border border-[#0B3C5D]/12 bg-[#F7F9FB] px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3C5D]/80">
              {categoryLabel}
            </span>
          ) : null}
          {featured ? (
            <span className="rounded-full border border-[#D9A441]/35 bg-[#D9A441]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B3C5D]/90">
              Öne çıkan
            </span>
          ) : null}
          {badge ? (
            <span className="rounded-full border border-[#0B3C5D]/10 bg-white px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              {badge}
            </span>
          ) : null}
          <span
            className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              service.is_active
                ? "border border-[#0B3C5D]/10 bg-[#F4F6F8] text-[#1A1A1A]/55"
                : "border border-[#1A1A1A]/12 bg-[#FAFAFA] text-[#1A1A1A]/45"
            }`}
          >
            {service.is_active ? "Vitrinde" : "Şu an kapalı"}
          </span>
        </div>

        <h3
          className={`mt-4 font-bold tracking-tight text-[#0B3C5D] ${spotlight ? "text-lg sm:text-xl" : "text-base sm:text-[17px]"}`}
        >
          {service.title}
        </h3>
        {service.short_description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#1A1A1A]/65">{service.short_description}</p>
        ) : null}

        {benefitChips.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Öne çıkan avantajlar">
            {benefitChips.map((item) => (
              <span
                key={item}
                className="inline-flex max-w-full items-center rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-2.5 py-1 text-[11px] font-medium leading-snug text-[#1A1A1A]/70"
              >
                <span className="line-clamp-2">{item}</span>
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 rounded-xl border border-[#0B3C5D]/10 bg-[#FAFBFC] px-4 py-3">
          {showSplitPrice ? (
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              {service.setup_price != null ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Kurulum</p>
                  <p className="text-lg font-bold tabular-nums text-[#0B3C5D]">{formatTryLira(service.setup_price)}</p>
                </div>
              ) : null}
              {service.monthly_price != null ? (
                <div className={service.setup_price != null ? "sm:text-right" : ""}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Aylık</p>
                  <p className="text-lg font-bold tabular-nums text-[#0B3C5D]">{formatTryLira(service.monthly_price)}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Fiyat</p>
              <p className="text-lg font-bold text-[#0B3C5D]">{priceLine}</p>
            </div>
          )}
        </div>

        {valueBlurb ? (
          <div className="mt-4 rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/40">Bu çözüm size ne sağlar?</p>
            <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/60">{valueBlurb}</p>
          </div>
        ) : null}

        <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:items-stretch">
          <button
            type="button"
            disabled={!service.is_active}
            onClick={() => service.is_active && setPurchaseOpen(true)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A3552] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Satın Al
          </button>
          <Link
            href={`/panel/${firmId}/isini-buyut/hizmet/${service.id}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/18 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:border-[#0B3C5D]/30 hover:bg-[#F7F9FB]"
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
