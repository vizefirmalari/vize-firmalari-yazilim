import Image from "next/image";
import Link from "next/link";

import { StorefrontServiceDetailGallery } from "@/components/software-storefront/storefront-detail-gallery";
import { GROWTH_SALES_WHATSAPP_INQUIRY_URL, growthSalesWhatsAppUrlWithText } from "@/lib/constants/contact";
import { pickStorefrontDetailMainImage } from "@/lib/data/software-storefront";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { detailPathForServiceSlug } from "@/lib/software/storefront-hubs";
import type {
  PublicSoftwareProductBadgeRow,
  PublicSoftwareProductFaqRow,
  PublicSoftwareProductFeatureRow,
  PublicSoftwareProductImageRow,
  PublicSoftwareProductRelatedRow,
  PublicStorefrontServiceRow,
  StorefrontContentBlock,
} from "@/lib/types/software-storefront";

type Props = {
  category: { id: string; name: string; slug: string };
  service: PublicStorefrontServiceRow;
  images: PublicSoftwareProductImageRow[];
  badges: PublicSoftwareProductBadgeRow[];
  faq: PublicSoftwareProductFaqRow[];
  features: PublicSoftwareProductFeatureRow[];
  related: PublicSoftwareProductRelatedRow[];
  contentBlocks: StorefrontContentBlock[];
  siblingServices: PublicStorefrontServiceRow[];
  content: {
    what_it_does: string | null;
    who_for: string | null;
    how_it_works: string | null;
  };
};

export function StorefrontServiceDetailView({
  category,
  service,
  images,
  badges,
  faq,
  features,
  related,
  contentBlocks,
  siblingServices,
  content,
}: Props) {
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const fallbackMain = pickStorefrontDetailMainImage(images, service);
  const packageFallbackFeatures = features.length === 0 ? service.package_includes.filter(Boolean) : [];
  const hasFeaturesSection = features.length > 0 || packageFallbackFeatures.length > 0;
  const hasProcessSection =
    contentBlocks.length > 0 ||
    Boolean(content.what_it_does?.trim()) ||
    Boolean(content.who_for?.trim()) ||
    Boolean(content.how_it_works?.trim());
  const waInfo = growthSalesWhatsAppUrlWithText("Merhaba, bu yazılım çözümü hakkında bilgi almak istiyorum.");
  const waQuote = growthSalesWhatsAppUrlWithText("Detaylı teklif istiyorum.");

  const navItems: { href: string; label: string }[] = [{ href: "#genel-bakis", label: "Genel bakış" }];
  if (hasFeaturesSection) navItems.push({ href: "#ozellikler", label: "Özellikler" });
  if (hasProcessSection) navItems.push({ href: "#surec", label: "Süreç" });
  if (faq.length > 0) navItems.push({ href: "#sss", label: "SSS" });
  if (related.length > 0) navItems.push({ href: "#ilgili", label: "İlgili çözümler" });

  return (
    <article className="pb-24 md:pb-0">
      <div className="border-b border-border bg-white">
        <div className="container-shell py-6 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,22rem)] lg:items-start lg:gap-10">
            <div className="order-1 lg:order-none">
              <StorefrontServiceDetailGallery images={images} serviceTitle={service.title} fallbackUrl={fallbackMain} />
            </div>

            <div className="order-2 space-y-4 lg:order-none">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">{category.name}</p>
              <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">{service.title}</h1>
              <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">{service.short_description}</p>

              <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-foreground/55">Vitrin</span>
                {service.is_featured ? (
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-primary/88">Öne çıkan</span>
                ) : null}
                {service.is_popular ? (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground/55">En çok tercih edilen</span>
                ) : null}
                {service.is_new ? (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground/55">Yeni</span>
                ) : null}
                {service.is_fast_setup ? (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground/55">Hızlı kurulum</span>
                ) : null}
                {service.badge ? (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground/55">{service.badge}</span>
                ) : null}
                {badges.map((b) => (
                  <span key={b.id} className="rounded-full border border-border px-2.5 py-0.5 text-foreground/55">
                    {b.label}
                  </span>
                ))}
              </div>

              <div className="premium-card space-y-4 p-5">
                <p className="text-sm font-bold text-primary">Fiyatlandırma</p>
                <p className="text-sm font-medium text-foreground/70">{priceLine}</p>
                {!service.is_custom_price ? (
                  <dl className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl border border-border bg-surface p-3">
                      <dt className="font-semibold text-foreground/45">Kurulum</dt>
                      <dd className="mt-1 text-base font-bold text-primary">{formatTryLira(service.setup_price) ?? "—"}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-surface p-3">
                      <dt className="font-semibold text-foreground/45">Aylık</dt>
                      <dd className="mt-1 text-base font-bold text-primary">{formatTryLira(service.monthly_price) ?? "—"}</dd>
                    </div>
                    {service.yearly_price != null ? (
                      <div className="col-span-2 rounded-xl border border-border bg-surface p-3">
                        <dt className="font-semibold text-foreground/45">Yıllık</dt>
                        <dd className="mt-1 text-base font-bold text-primary">{formatTryLira(service.yearly_price) ?? "—"}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-primary">Teklif üzerinden</p>
                )}

                <div className="flex flex-col gap-2">
                  <a
                    href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Satın Al
                  </a>
                  <a
                    href={waInfo}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-surface"
                  >
                    WhatsApp ile bilgi al
                  </a>
                  <a
                    href={waQuote}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-surface"
                  >
                    Detaylı teklif iste
                  </a>
                  <Link
                    href="/iletisim"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-dashed border-border px-4 py-3 text-center text-sm font-semibold text-foreground/70 transition hover:bg-surface"
                  >
                    İletişim formu
                  </Link>
                </div>
                <p className="text-xs leading-relaxed text-foreground/50">
                  Satın Al; WhatsApp üzerinden “Detaylı bilgi almak istiyorum.” mesajıyla açılır. Ödeme veya sipariş bu ekrandan
                  yapılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        aria-label="Bölümler"
        className="sticky top-14 z-30 border-b border-border bg-white/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      >
        <div className="container-shell flex gap-4 overflow-x-auto text-sm font-semibold text-foreground/55 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="shrink-0 whitespace-nowrap text-primary hover:underline">
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-shell space-y-14 py-10 sm:py-12">
        <section id="genel-bakis" className="scroll-mt-28 space-y-6">
          <h2 className="text-lg font-bold text-primary">Genel bakış</h2>
          {service.long_description ? (
            <div className="max-w-none whitespace-pre-line text-sm leading-relaxed text-foreground/80">{service.long_description}</div>
          ) : (
            <p className="text-sm text-foreground/55">Uzun açıklama bu çözüm için henüz eklenmedi.</p>
          )}
        </section>

        {hasFeaturesSection ? (
          <section id="ozellikler" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-bold text-primary">Özellikler</h2>
            {features.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <p className="text-sm font-bold text-primary">
                      {f.icon ? <span className="mr-1.5 text-base">{f.icon}</span> : null}
                      {f.title}
                    </p>
                    {f.description ? <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.description}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-1 gap-2">
                {packageFallbackFeatures.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground/75"
                  >
                    <span className="text-secondary" aria-hidden>
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        {hasProcessSection ? (
          <section id="surec" className="scroll-mt-28 space-y-6">
            <h2 className="text-lg font-bold text-primary">Süreç ve kullanım</h2>
            {contentBlocks.map((block) => (
              <div key={`${block.sort_order}-${block.heading}`} className="rounded-2xl border border-border bg-surface/60 p-5">
                <h3 className="text-base font-bold text-primary">{block.heading}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75">{block.body}</p>
              </div>
            ))}
            {content.what_it_does ? (
              <div>
                <h3 className="text-base font-bold text-primary">Sistem ne işe yarar?</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75">{content.what_it_does}</p>
              </div>
            ) : null}
            {content.who_for ? (
              <div>
                <h3 className="text-base font-bold text-primary">Kimler için uygun?</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75">{content.who_for}</p>
              </div>
            ) : null}
            {content.how_it_works ? (
              <div>
                <h3 className="text-base font-bold text-primary">Süreç nasıl işler?</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75">{content.how_it_works}</p>
              </div>
            ) : null}
          </section>
        ) : null}

        {faq.length > 0 ? (
          <section id="sss" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-bold text-primary">Sık sorulan sorular</h2>
            <div className="space-y-3">
              {faq.map((f) => (
                <details
                  key={f.id}
                  className="group rounded-2xl border border-border bg-white px-4 py-3 shadow-sm open:shadow-md"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-primary outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section id="ilgili" className="scroll-mt-28 space-y-4">
            <h2 className="text-lg font-bold text-primary">Bu çözümle birlikte değerlendirilen hizmetler</h2>
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((r) => {
                const t = r.thumbnail_image_url?.trim() || null;
                const thumb = t ? withSupabaseImageTransform(t, { width: 200, height: 200, quality: 72 }) : null;
                return (
                  <Link
                    key={r.id}
                    href={detailPathForServiceSlug(r.slug)}
                    className="snap-start rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-secondary/30 sm:min-w-[260px] sm:max-w-[280px]"
                  >
                    <div className="flex gap-3">
                      {thumb ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                          <Image src={thumb} alt="" fill className="object-cover" sizes="64px" />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-primary">{r.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-foreground/65">{r.short_description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {siblingServices.length > 0 ? (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-primary">Aynı kategorideki çözümler</h2>
            <ul className="grid grid-cols-1 gap-3">
              {siblingServices.map((s) => (
                <li key={s.id}>
                  <Link
                    href={detailPathForServiceSlug(s.slug)}
                    className="block rounded-2xl border border-border bg-white p-4 text-sm transition hover:border-secondary/30 hover:shadow-sm"
                  >
                    <p className="font-bold text-primary">{s.title}</p>
                    <p className="mt-1 line-clamp-2 text-foreground/65">{s.short_description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="space-y-3 rounded-2xl border border-border bg-surface/50 p-5">
          <h2 className="text-sm font-bold text-primary">Keşfet</h2>
          <div className="flex flex-col gap-2 text-sm font-semibold text-primary sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href={`/yazilim-cozumleri?cat=${category.id}`} className="hover:underline">
              Bu kategorideki tüm yazılım çözümleri
            </Link>
            <Link href="/yazilim-cozumleri" className="hover:underline">
              Yazılım çözümleri vitrini
            </Link>
            <Link href="/otomasyon-cozumleri" className="hover:underline">
              Otomasyon çözümleri
            </Link>
            <Link href="/isini-buyut" className="hover:underline">
              İşini Büyüt
            </Link>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/98 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div className="container-shell flex gap-2">
          <a
            href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl bg-primary py-3 text-center text-xs font-semibold text-white"
          >
            Satın Al
          </a>
          <a
            href={waQuote}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl border border-border py-3 text-center text-xs font-semibold text-primary"
          >
            Teklif
          </a>
        </div>
      </div>
    </article>
  );
}
