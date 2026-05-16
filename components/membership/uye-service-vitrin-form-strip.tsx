import Link from "next/link";

import { UyeServiceVitrinSlider } from "@/components/membership/uye-service-vitrin-slider";
import { SERVICE_STOREFRONT_PUBLIC_BASE } from "@/lib/constants/service-storefront";
import type { ServiceStorefrontPromoCard } from "@/lib/data/service-storefront-membership-promo";

type Props = {
  items: ServiceStorefrontPromoCard[];
};

export function UyeServiceVitrinFormStrip({ items }: Props) {
  const featured = items.filter((i) => i.is_featured).slice(0, 6);
  const stripItems = (featured.length >= 3 ? featured : items).slice(0, 6);
  if (stripItems.length < 1) return null;

  return (
    <section
      className="mt-6 rounded-2xl border border-border bg-surface/40 p-4 sm:p-5"
      aria-label="Öne çıkan yazılım hizmetleri"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary/70">Büyüme çözümleri</p>
          <p className="mt-1 text-sm font-semibold text-primary">Panel onayı sonrası keşfedebileceğiniz hizmetler</p>
        </div>
        <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="text-xs font-bold text-primary hover:underline sm:shrink-0">
          Tüm hizmetleri gör →
        </Link>
      </div>
      <div className="mt-4">
        <UyeServiceVitrinSlider items={stripItems} variant="compact" />
      </div>
    </section>
  );
}
