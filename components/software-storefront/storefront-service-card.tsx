import Image from "next/image";
import Link from "next/link";

import { StorefrontCategoryPlaceholder } from "@/components/software-storefront/storefront-category-placeholder";
import { detailPathForServiceSlug } from "@/lib/software/storefront-hubs";
import { GROWTH_SALES_WHATSAPP_INQUIRY_URL } from "@/lib/constants/contact";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import type { PublicStorefrontServiceRow } from "@/lib/types/software-storefront";

type Props = {
  service: PublicStorefrontServiceRow;
  categoryLabel: string;
  categorySlug: string;
};

function cardImageSrc(service: PublicStorefrontServiceRow): string | null {
  const raw =
    service.thumbnail_image_url ||
    service.hero_image_url ||
    service.cover_image_url ||
    service.mobile_cover_image_url;
  return raw?.trim() || null;
}

export function StorefrontServiceCard({ service, categoryLabel, categorySlug }: Props) {
  const href = detailPathForServiceSlug(service.slug);
  const img = cardImageSrc(service);
  const transformed = img ? withSupabaseImageTransform(img, { width: 720, height: 400, quality: 80 }) : null;
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const featureLines = [...service.package_includes, ...[]].slice(0, 4);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-200 hover:border-secondary/35 hover:shadow-md">
      <Link href={href} className="relative block w-full shrink-0 overflow-hidden">
        {transformed ? (
          <div className="relative aspect-[16/10] w-full">
            <Image src={transformed} alt="" fill sizes="(max-width: 1280px) 100vw, 50vw" className="object-cover" />
          </div>
        ) : (
          <StorefrontCategoryPlaceholder
            variant="card"
            categorySlug={categorySlug}
            categoryName={categoryLabel}
            headline={service.title}
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="max-w-[min(100%,14rem)] truncate rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-bold text-primary">
            {categoryLabel}
          </span>
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold text-foreground/70">
            Vitrin
          </span>
          {service.is_featured ? (
            <span className="rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold text-primary">Öne çıkan</span>
          ) : null}
          {service.is_popular ? (
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold text-foreground/75">
              En çok tercih edilen
            </span>
          ) : null}
          {service.is_new ? (
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold text-foreground/75">
              Yeni
            </span>
          ) : null}
          {service.is_fast_setup ? (
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold text-foreground/75">
              Hızlı kurulum
            </span>
          ) : null}
          {service.badge ? (
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-bold text-foreground/75">
              {service.badge}
            </span>
          ) : null}
        </div>
        <div>
          <Link href={href} className="text-lg font-bold leading-snug tracking-tight text-primary hover:underline sm:text-xl">
            {service.title}
          </Link>
          <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/80 sm:text-[15px]">{service.short_description}</p>
        </div>
        {featureLines.length > 0 ? (
          <ul className="space-y-2 border-t border-border pt-3">
            {featureLines.map((line) => (
              <li key={line} className="flex gap-2.5 text-sm font-medium text-foreground/78">
                <span className="shrink-0 font-bold text-secondary" aria-hidden>
                  ✓
                </span>
                <span className="min-w-0 leading-snug">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto space-y-4 border-t border-border pt-4">
          {!service.is_custom_price ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-foreground/65">Kurulum</p>
                <p className="mt-1 text-base font-bold text-primary">{formatTryLira(service.setup_price) ?? "—"}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-foreground/65">Aylık</p>
                <p className="mt-1 text-base font-bold text-primary">{formatTryLira(service.monthly_price) ?? "—"}</p>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-bold text-primary">{priceLine}</p>
          )}
          <a
            href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:opacity-95"
          >
            Satın Al
          </a>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href={href}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-primary/25 bg-white px-4 py-3 text-center text-sm font-bold text-primary transition hover:bg-primary/5"
            >
              Detayları Gör
            </Link>
            <Link
              href={`/iletisim?konu=${encodeURIComponent(service.title)}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-center text-sm font-bold text-primary transition hover:border-secondary/30"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
