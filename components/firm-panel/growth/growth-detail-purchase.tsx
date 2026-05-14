import type { GrowthServiceRow } from "@/lib/types/growth-commerce";

import { GROWTH_SALES_WHATSAPP_INQUIRY_URL } from "@/lib/constants/contact";

type Props = {
  service: GrowthServiceRow;
};

export function GrowthDetailPurchase({ service }: Props) {
  if (!service.is_active) return null;

  return (
    <a
      href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
    >
      Satın Al
    </a>
  );
}
