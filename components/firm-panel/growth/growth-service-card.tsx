"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { GrowthPurchaseModal, type GrowthPurchaseModalBank } from "@/components/firm-panel/growth/growth-purchase-modal";
import { growthServicePriceLine } from "@/lib/format/try-lira";
import type { GrowthServiceRow } from "@/lib/types/growth-commerce";

type Props = {
  firmId: string;
  firmName: string;
  bank: GrowthPurchaseModalBank;
  service: GrowthServiceRow;
  /** URL ?hizmet= ile açılış (bir kez) */
  autoOpenToken: string | null;
  onAutoOpenConsumed?: () => void;
};

export function GrowthServiceCard({
  firmId,
  firmName,
  bank,
  service,
  autoOpenToken,
  onAutoOpenConsumed,
}: Props) {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const badge = service.badge?.trim() || null;
  const featured = service.is_featured;

  useEffect(() => {
    if (autoOpenToken && autoOpenToken === service.id) {
      setPurchaseOpen(true);
      onAutoOpenConsumed?.();
    }
  }, [autoOpenToken, onAutoOpenConsumed, service.id]);

  return (
    <>
      <article
        className={`group flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(11,60,93,0.12)] ${
          featured
            ? "border-[#D9A441]/35 ring-1 ring-[#D9A441]/20"
            : "border-[#0B3C5D]/12 hover:border-[#0B3C5D]/22"
        }`}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold tracking-tight text-[#0B3C5D]">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/65">{service.short_description}</p>
          <p className="mt-3 text-sm font-semibold text-[#0B3C5D]">{priceLine}</p>
          {service.package_includes.length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-xs leading-relaxed text-[#1A1A1A]/60">
              {service.package_includes.map((item, i) => (
                <li key={`${i}-${item}`}>{item}</li>
              ))}
            </ul>
          ) : null}
          {badge ? (
            <p className="mt-2 inline-block rounded-full bg-[#F4F6F8] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
              {badge}
            </p>
          ) : null}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled={!service.is_active}
            onClick={() => service.is_active && setPurchaseOpen(true)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Satın Al
          </button>
          <Link
            href={`/panel/${firmId}/isini-buyut/hizmet/${service.id}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:border-[#0B3C5D]/35 hover:bg-[#F7F9FB]"
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
