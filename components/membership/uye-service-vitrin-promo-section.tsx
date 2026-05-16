import type { ServiceStorefrontPromoCard } from "@/lib/data/service-storefront-membership-promo";

import { UyeServiceVitrinSlider } from "@/components/membership/uye-service-vitrin-slider";

const COPY = {
  "panel-free": {
    title: "Firma paneliniz ücretsiz, büyüme çözümleriniz hazır",
    description:
      "Platforma katılan firmalar; reklam, otomasyon, web, CRM ve yapay zekâ çözümlerini tek merkezden inceleyebilir.",
  },
  "after-publish": {
    title: "Yayına alındıktan sonra işinizi büyütecek çözümler",
    description:
      "Onay sonrası firma panelinizden erişebileceğiniz yazılım, reklam ve otomasyon hizmetlerini keşfedin.",
  },
} as const;

type Variant = keyof typeof COPY;

type Props = {
  variant: Variant;
  items: ServiceStorefrontPromoCard[];
  className?: string;
};

export function UyeServiceVitrinPromoSection({ variant, items, className = "" }: Props) {
  if (!items.length) return null;

  const copy = COPY[variant];

  return (
    <section
      className={`rounded-2xl border border-primary/12 bg-linear-to-br from-white via-surface/30 to-primary/5 p-5 shadow-[0_8px_32px_rgba(11,60,93,0.06)] sm:p-6 ${className}`}
      aria-label="Yazılım ve büyüme hizmetleri vitrini"
    >
      <div className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/65">Hizmet vitrini</p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-primary sm:text-xl">{copy.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/78">{copy.description}</p>
      </div>
      <div className="mt-5">
        <UyeServiceVitrinSlider items={items} />
      </div>
    </section>
  );
}
