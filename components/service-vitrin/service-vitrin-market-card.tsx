import Image from "next/image";
import Link from "next/link";

import { StorefrontCategoryPlaceholder } from "@/components/software-storefront/storefront-category-placeholder";
import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";
import {
  SERVICE_STOREFRONT_WHATSAPP_URL,
  serviceStorefrontDetailPath,
} from "@/lib/constants/service-storefront";
import type { PublicServiceStorefrontItemRow } from "@/lib/data/service-storefront-public";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { serviceVitrinCategorySlug } from "@/lib/service-vitrin/category-slug";

type Props = {
  item: PublicServiceStorefrontItemRow;
  imageUrl: string | null;
  previewLines: string[];
};

export function ServiceVitrinMarketCard({ item, imageUrl, previewLines }: Props) {
  const detailHref = serviceStorefrontDetailPath(item.slug);
  const categorySlug = serviceVitrinCategorySlug(item.category);
  const imgSrc = imageUrl
    ? withSupabaseImageTransform(imageUrl, { width: 640, height: 640, quality: 78 })
    : null;
  const priceFallback = growthServicePriceLine(item.setup_price, item.subscription_price, item.custom_price);

  return (
    <article className="flex h-full max-w-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-primary/20 hover:shadow-md">
      <Link href={detailHref} className="relative block aspect-square w-full shrink-0 bg-white">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            loading="lazy"
            className="object-contain p-2 sm:p-2.5"
          />
        ) : (
          <StorefrontCategoryPlaceholder variant="market" categorySlug={categorySlug} categoryName={item.category} />
        )}
        {item.discount_label ? (
          <span className="absolute left-2 top-2 rounded-full bg-secondary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
            {item.discount_label}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1.5">
          <span className="max-w-full truncate rounded-full border border-primary/15 bg-primary/8 px-2 py-0.5 text-[10px] font-bold text-primary">
            {item.category}
          </span>
          {item.is_featured ? (
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-bold text-primary">Öne çıkan</span>
          ) : null}
          {item.is_new ? (
            <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-bold text-foreground/75">
              Yeni
            </span>
          ) : null}
        </div>
        <h2 className="mt-2 text-base font-bold leading-snug text-primary">
          <Link href={detailHref} className="hover:underline">
            {item.title}
          </Link>
        </h2>
        <p className={`mt-1.5 line-clamp-2 text-sm leading-relaxed text-foreground/80 ${EMOJI_TEXT_CLASS}`}>
          {item.short_description}
        </p>
        {previewLines.length ? (
          <ul className="mt-3 space-y-1.5 border-t border-border/70 pt-3">
            {previewLines.slice(0, 3).map((line) => (
              <li key={line} className="flex gap-2 text-xs font-medium text-foreground/82 sm:text-sm">
                <span className="shrink-0 font-bold text-secondary" aria-hidden>
                  ✓
                </span>
                <span className="min-w-0 line-clamp-2 leading-snug">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto space-y-2.5 border-t border-border/70 pt-3">
          {!item.custom_price && (item.setup_price != null || item.subscription_price != null) ? (
            <div className="flex flex-wrap items-end justify-between gap-3">
              {item.setup_price != null ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/55">Kurulum</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-primary sm:text-base">
                    {formatTryLira(item.setup_price)}
                  </p>
                </div>
              ) : null}
              {item.subscription_price != null ? (
                <div className={item.setup_price != null ? "text-right" : ""}>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/55">Abonelik</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-primary sm:text-base">
                    {formatTryLira(item.subscription_price)}
                    {item.subscription_period ? (
                      <span className="block text-[10px] font-semibold text-foreground/60">/{item.subscription_period}</span>
                    ) : null}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-xs font-bold text-primary sm:text-sm">{priceFallback}</p>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={detailHref}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-primary/20 bg-white px-3 text-xs font-bold text-primary transition hover:border-primary/35 hover:bg-surface/40 sm:text-sm"
            >
              Detay
            </Link>
            <a
              href={SERVICE_STOREFRONT_WHATSAPP_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-3 text-xs font-bold text-white transition hover:bg-primary/92 sm:text-sm"
            >
              Satın Al
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
