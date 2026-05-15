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
    <article className="bg-surface/30 pb-24 md:pb-0">
      <div className="border-b-2 border-border bg-white shadow-sm">
        <div className="container-shell py-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,22rem)] lg:items-start lg:gap-12">
            <div className="order-1 lg:order-0">
              <StorefrontServiceDetailGallery
                images={images}
                serviceTitle={service.title}
                fallbackUrl={fallbackMain}
                categorySlug={category.slug}
                categoryName={category.name}
              />
            </div>

            <div className="order-2 space-y-5 lg:order-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/65">{category.name}</p>
              <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.4rem] lg:leading-tight">
                {service.title}
              </h1>
              <p className="text-base font-semibold leading-relaxed text-foreground/85 sm:text-lg">{service.short_description}</p>

              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/75">Vitrin</span>
                {service.is_featured ? (
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-primary">Öne çıkan</span>
                ) : null}
                {service.is_popular ? (
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/78">En çok tercih edilen</span>
                ) : null}
                {service.is_new ? (
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/78">Yeni</span>
                ) : null}
                {service.is_fast_setup ? (
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/78">Hızlı kurulum</span>
                ) : null}
                {service.badge ? (
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/78">{service.badge}</span>
                ) : null}
                {badges.map((b) => (
                  <span key={b.id} className="rounded-full border border-border bg-surface px-3 py-1 text-foreground/78">
                    {b.label}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm">
                <p className="text-base font-bold text-primary">Fiyatlandırma</p>
                <p className="mt-2 text-sm font-semibold text-foreground/80">{priceLine}</p>
                {!service.is_custom_price ? (
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-border bg-surface px-3 py-3">
                      <dt className="font-bold uppercase tracking-wide text-foreground/65">Kurulum</dt>
                      <dd className="mt-1 text-lg font-bold text-primary">{formatTryLira(service.setup_price) ?? "—"}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-surface px-3 py-3">
                      <dt className="font-bold uppercase tracking-wide text-foreground/65">Aylık</dt>
                      <dd className="mt-1 text-lg font-bold text-primary">{formatTryLira(service.monthly_price) ?? "—"}</dd>
                    </div>
                    {service.yearly_price != null ? (
                      <div className="col-span-2 rounded-xl border border-border bg-surface px-3 py-3">
                        <dt className="font-bold uppercase tracking-wide text-foreground/65">Yıllık</dt>
                        <dd className="mt-1 text-lg font-bold text-primary">{formatTryLira(service.yearly_price) ?? "—"}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-primary">Teklif üzerinden</p>
                )}

                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:opacity-95"
                  >
                    Satın Al
                  </a>
                  <a
                    href={waInfo}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-xl border-2 border-primary/20 bg-white px-4 py-3 text-center text-sm font-bold text-primary transition hover:bg-primary/5"
                  >
                    WhatsApp ile bilgi al
                  </a>
                  <a
                    href={waQuote}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-center text-sm font-bold text-primary transition hover:border-secondary/30"
                  >
                    Detaylı teklif iste
                  </a>
                  <Link
                    href="/iletisim"
                    className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-dashed border-border px-4 py-3 text-center text-sm font-bold text-foreground/75 transition hover:bg-surface"
                  >
                    İletişim formu
                  </Link>
                </div>
                <p className="mt-4 text-xs font-medium leading-relaxed text-foreground/65">
                  Satın Al; WhatsApp üzerinden “Detaylı bilgi almak istiyorum.” ile açılır. Ödeme bu ekrandan yapılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        aria-label="Bölümler"
        className="sticky top-14 z-30 border-b border-border bg-white/95 py-3.5 backdrop-blur-md"
      >
        <div className="container-shell flex gap-5 overflow-x-auto text-sm font-bold text-foreground/70 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="shrink-0 whitespace-nowrap text-primary hover:underline">
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-shell space-y-12 py-10 sm:space-y-14 sm:py-14">
        <section
          id="genel-bakis"
          className="scroll-mt-32 space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Genel bakış</h2>
          {service.long_description ? (
            <div className="max-w-none whitespace-pre-line text-base font-medium leading-relaxed text-foreground/82">
              {service.long_description}
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground/70">Uzun açıklama bu çözüm için henüz eklenmedi.</p>
          )}
        </section>

        {hasFeaturesSection ? (
          <section id="ozellikler" className="scroll-mt-32 space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Özellikler</h2>
            {features.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {features.map((f) => (
                  <li key={f.id} className="rounded-2xl border border-border bg-surface/50 p-5">
                    <p className="text-base font-bold text-primary">
                      {f.icon ? <span className="mr-2 text-lg">{f.icon}</span> : null}
                      {f.title}
                    </p>
                    {f.description ? (
                      <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/80">{f.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-1 gap-3">
                {packageFallbackFeatures.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm font-semibold text-foreground/82"
                  >
                    <span className="font-bold text-secondary" aria-hidden>
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
          <section id="surec" className="scroll-mt-32 space-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Süreç ve kullanım</h2>
            {contentBlocks.map((block) => (
              <div key={`${block.sort_order}-${block.heading}`} className="rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="text-lg font-bold text-primary">{block.heading}</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground/82">{block.body}</p>
              </div>
            ))}
            {content.what_it_does ? (
              <div>
                <h3 className="text-lg font-bold text-primary">Sistem ne işe yarar?</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground/82">{content.what_it_does}</p>
              </div>
            ) : null}
            {content.who_for ? (
              <div>
                <h3 className="text-lg font-bold text-primary">Kimler için uygun?</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground/82">{content.who_for}</p>
              </div>
            ) : null}
            {content.how_it_works ? (
              <div>
                <h3 className="text-lg font-bold text-primary">Süreç nasıl işler?</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-foreground/82">{content.how_it_works}</p>
              </div>
            ) : null}
          </section>
        ) : null}

        {faq.length > 0 ? (
          <section id="sss" className="scroll-mt-32 space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Sık sorulan sorular</h2>
            <div className="space-y-3">
              {faq.map((f) => (
                <details
                  key={f.id}
                  className="group rounded-2xl border border-border bg-surface/40 px-5 py-4 open:border-secondary/25 open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-sm font-bold text-primary outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/80">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section id="ilgili" className="scroll-mt-32 space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Bu çözümle birlikte değerlendirilen hizmetler</h2>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((r) => {
                const t = r.thumbnail_image_url?.trim() || null;
                const thumb = t ? withSupabaseImageTransform(t, { width: 200, height: 200, quality: 72 }) : null;
                return (
                  <Link
                    key={r.id}
                    href={detailPathForServiceSlug(r.slug)}
                    className="snap-start min-w-[min(100%,280px)] max-w-[300px] rounded-2xl border border-border bg-surface/40 p-5 shadow-sm transition hover:border-secondary/35 hover:bg-white sm:min-w-[260px]"
                  >
                    <div className="flex gap-4">
                      {thumb ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-white">
                          <Image src={thumb} alt="" fill className="object-cover" sizes="64px" />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-primary">{r.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs font-medium text-foreground/75">{r.short_description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {siblingServices.length > 0 ? (
          <section className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Aynı kategorideki çözümler</h2>
            <ul className="grid grid-cols-1 gap-4">
              {siblingServices.map((s) => (
                <li key={s.id}>
                  <Link
                    href={detailPathForServiceSlug(s.slug)}
                    className="block rounded-2xl border border-border bg-surface/40 p-5 text-sm font-semibold transition hover:border-secondary/35 hover:bg-white hover:shadow-sm"
                  >
                    <p className="text-base font-bold text-primary">{s.title}</p>
                    <p className="mt-2 line-clamp-2 font-medium text-foreground/78">{s.short_description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-bold text-primary">Keşfet</h2>
          <div className="flex flex-col gap-3 text-sm font-bold text-primary sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            <Link href="/yazilim-cozumleri" className="hover:underline">
              Yazılım çözümleri
            </Link>
            <Link href={`/yazilim-cozumleri?category=${encodeURIComponent(category.name)}`} className="hover:underline">
              Bu kategorideki hizmetler
            </Link>
            <Link href="/yazilim-cozumleri" className="hover:underline">
              Tüm vitrin
            </Link>
            <Link href="/otomasyon-cozumleri" className="hover:underline">
              Otomasyon çözümleri
            </Link>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-border bg-white/98 p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] md:hidden">
        <div className="container-shell flex gap-2">
          <a
            href={GROWTH_SALES_WHATSAPP_INQUIRY_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl bg-primary py-3.5 text-center text-xs font-bold text-white"
          >
            Satın Al
          </a>
          <a
            href={waQuote}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl border-2 border-primary/25 py-3.5 text-center text-xs font-bold text-primary"
          >
            Teklif
          </a>
        </div>
      </div>
    </article>
  );
}
