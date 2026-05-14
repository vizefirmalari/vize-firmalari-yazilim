import Image from "next/image";
import Link from "next/link";

import { detailPathForServiceSlug } from "@/lib/software/storefront-hubs";
import { GROWTH_SALES_WHATSAPP_INQUIRY_URL } from "@/lib/constants/contact";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import type { PublicStorefrontServiceRow } from "@/lib/types/software-storefront";

type Props = {
  service: PublicStorefrontServiceRow;
  categoryLabel: string;
};

function cardImageSrc(service: PublicStorefrontServiceRow): string | null {
  const raw =
    service.thumbnail_image_url ||
    service.hero_image_url ||
    service.cover_image_url ||
    service.mobile_cover_image_url;
  return raw?.trim() || null;
}

export function StorefrontServiceCard({ service, categoryLabel }: Props) {
  const href = detailPathForServiceSlug(service.slug);
  const img = cardImageSrc(service);
  const transformed = img
    ? withSupabaseImageTransform(img, { width: 640, height: 360, quality: 78 })
    : null;
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const featureLines = [...service.package_includes, ...[]].slice(0, 4);

  return (
    <article className="premium-card flex h-full flex-col overflow-hidden transition duration-200 hover:border-secondary/25 hover:shadow-md">
      <Link href={href} className="relative block aspect-[16/10] w-full bg-surface">
        {transformed ? (
          <Image
            src={transformed}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/90 to-secondary/80 text-3xl text-white/90">
            ◆
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="max-w-[min(100%,12rem)] truncate rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-primary/85">
            {categoryLabel}
          </span>
          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-foreground/50">
            Vitrinde
          </span>
          {service.is_featured ? (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary/88">
              Öne çıkan
            </span>
          ) : null}
          {service.is_popular ? (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-foreground/55">
              En çok tercih edilen
            </span>
          ) : null}
          {service.is_new ? (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-foreground/55">
              Yeni
            </span>
          ) : null}
          {service.is_fast_setup ? (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-foreground/55">
              Hızlı kurulum
            </span>
          ) : null}
          {service.badge ? (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold text-foreground/55">
              {service.badge}
            </span>
          ) : null}
        </div>
        <div>
          <Link href={href} className="text-lg font-bold tracking-tight text-primary hover:underline">
            {service.title}
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">{service.short_description}</p>
        </div>
        {featureLines.length > 0 ? (
          <ul className="space-y-1.5 text-xs font-medium text-foreground/60">
            {featureLines.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-secondary" aria-hidden>
                  ✓
                </span>
                <span className="min-w-0">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto space-y-3 border-t border-border pt-3">
          {!service.is_custom_price ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-border bg-surface px-3 py-2">
                <p className="font-semibold text-foreground/45">Kurulum</p>
                <p className="mt-0.5 text-sm font-bold text-primary">{formatTryLira(service.setup_price) ?? "—"}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-3 py-2">
                <p className="font-semibold text-foreground/45">Aylık</p>
                <p className="mt-0.5 text-sm font-bold text-primary">{formatTryLira(service.monthly_price) ?? "—"}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-primary/85">{priceLine}</p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href={href}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
            >
              Detayları gör
            </Link>
            <Link
              href={`/iletisim?konu=${encodeURIComponent(service.title)}`}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-surface"
            >
              Teklif al
            </Link>
            <a
              href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-center text-sm font-semibold text-primary transition hover:border-secondary/25"
            >
              Satın Al
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
