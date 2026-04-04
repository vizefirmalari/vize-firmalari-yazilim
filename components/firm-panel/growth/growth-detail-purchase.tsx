"use client";

import { useState } from "react";

import { GrowthPurchaseModal, type GrowthPurchaseModalBank } from "@/components/firm-panel/growth/growth-purchase-modal";
import type { GrowthServiceRow } from "@/lib/types/growth-commerce";

type Props = {
  firmId: string;
  firmName: string;
  bank: GrowthPurchaseModalBank;
  service: GrowthServiceRow;
};

export function GrowthDetailPurchase({ firmId, firmName, bank, service }: Props) {
  const [open, setOpen] = useState(false);

  if (!service.is_active) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
      >
        Satın Al
      </button>
      <GrowthPurchaseModal
        open={open}
        onClose={() => setOpen(false)}
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
