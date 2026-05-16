import Link from "next/link";
import type { ReactNode } from "react";

import { ServiceVitrinDetailTabs, type ServiceVitrinDetailTab } from "@/components/service-vitrin/service-vitrin-detail-tabs";
import { ServiceVitrinFaqAccordion } from "@/components/service-vitrin/service-vitrin-faq-accordion";
import { ServiceVitrinGallery } from "@/components/service-vitrin/service-vitrin-gallery";
import { parseProcessTimeline, ServiceVitrinRichContent } from "@/components/service-vitrin/service-vitrin-rich-content";
import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";
import {
  SERVICE_STOREFRONT_PUBLIC_BASE,
  SERVICE_STOREFRONT_WHATSAPP_URL,
  serviceStorefrontDetailPath,
} from "@/lib/constants/service-storefront";
import type { ServiceStorefrontPublicDetail } from "@/lib/data/service-storefront-public";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";

type Props = ServiceStorefrontPublicDetail;

function infoRows(item: Props["item"]): { label: string; value: string }[] {
  return [
    { label: "Kurulum süresi", value: item.setup_time },
    { label: "Teslimat süresi", value: item.delivery_time },
    { label: "Abonelik dönemi", value: item.subscription_period },
    { label: "Destek süresi", value: item.support_duration },
    { label: "İlk kurulum kapsamı", value: item.setup_scope },
    { label: "Aylık hizmet kapsamı", value: item.monthly_scope },
    { label: "Kimler için uygun?", value: item.target_audience },
    { label: "Hizmet sonrası destek", value: item.post_support_notes },
    { label: "Gerekli ön bilgiler", value: item.prerequisites },
    { label: "Hizmet kapsamı", value: item.service_scope },
  ].filter((r): r is { label: string; value: string } => Boolean(r.value?.trim()));
}

function mergeRelatedCards(data: Props) {
  const seen = new Set<string>();
  const out: Props["related"] = [];
  for (const s of [...data.related, ...data.sameCategory]) {
    if (seen.has(s.id)) continue;
    seen.add(s.id);
    out.push(s);
    if (out.length >= 8) break;
  }
  return out;
}

function displayTags(tags: string[]): string[] {
  return tags.map((t) => t.trim()).filter(Boolean).slice(0, 5);
}

function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-32 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      <h2 className="text-lg font-bold text-primary sm:text-xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ServiceVitrinDetailView(data: Props) {
  const { item, images, features, faq } = data;
  const info = infoRows(item);
  const relatedCards = mergeRelatedCards(data);
  const categoryHref = `${SERVICE_STOREFRONT_PUBLIC_BASE}?category=${encodeURIComponent(item.category)}`;
  const tags = displayTags(item.tags);
  const priceFallback = growthServicePriceLine(item.setup_price, item.subscription_price, item.custom_price);
  const processSteps = item.process_description?.trim() ? parseProcessTimeline(item.process_description) : null;

  const tabs: ServiceVitrinDetailTab[] = [];
  tabs.push({ id: "genel-bakis", label: "Genel Bakış" });
  if (features.length) tabs.push({ id: "avantajlar", label: "Avantajlar" });
  if (info.length) tabs.push({ id: "hizmet-bilgileri", label: "Hizmet Bilgileri" });
  if (item.process_description?.trim()) tabs.push({ id: "uygulama-sureci", label: "Uygulama Süreci" });
  if (faq.length) tabs.push({ id: "sss", label: "SSS" });
  if (relatedCards.length) tabs.push({ id: "ilgili-hizmetler", label: "İlgili Hizmetler" });

  const benefitLead =
    features[0]?.description?.trim() ||
    features[0]?.title?.trim() ||
    item.short_description.trim();

  return (
    <article className="container-shell pb-28 pt-8 sm:pt-10 lg:pb-16">
      <nav className="text-xs font-semibold text-foreground/60">
        <Link href="/" className="hover:text-primary">
          Ana sayfa
        </Link>
        <span className="mx-1.5 text-foreground/35">/</span>
        <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="hover:text-primary">
          Yazılım çözümleri
        </Link>
        <span className="mx-1.5 text-foreground/35">/</span>
        <Link href={categoryHref} className="hover:text-primary">
          {item.category}
        </Link>
        <span className="mx-1.5 text-foreground/35">/</span>
        <span className="text-foreground/80">{item.title}</span>
      </nav>

      {/* Üst alan: galeri + satış paneli */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,420px)] lg:items-start lg:gap-10">
        <ServiceVitrinGallery images={images} title={item.title} category={item.category} />

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{item.category}</p>
            <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-primary sm:text-[1.65rem]">{item.title}</h1>

            {tags.length ? (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <li key={t}>
                    <span className="inline-block max-w-[12rem] truncate rounded-full border border-border bg-surface/50 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/75">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className={`mt-4 text-sm leading-relaxed text-foreground/88 sm:text-[15px] ${EMOJI_TEXT_CLASS}`}>{item.short_description}</p>

            {benefitLead && benefitLead !== item.short_description ? (
              <div className="mt-4 rounded-xl border border-primary/12 bg-primary/5 px-4 py-3 text-sm font-semibold leading-relaxed text-primary">
                {features[0]?.icon ? <span className="mr-1.5">{features[0].icon}</span> : <span className="mr-1.5">✓</span>}
                {benefitLead}
              </div>
            ) : null}

            <div className="mt-6 space-y-4 border-t border-border/80 pt-6">
              {item.custom_price ? (
                <p className="text-xl font-bold text-primary">Fiyat teklif üzerinden netleştirilir</p>
              ) : (
                <>
                  {item.setup_price != null ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/55">Kurulum</p>
                      <p className="text-2xl font-bold tabular-nums text-primary">{formatTryLira(item.setup_price)}</p>
                    </div>
                  ) : null}
                  {item.subscription_price != null ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/55">Abonelik</p>
                      <p className="text-2xl font-bold tabular-nums text-primary">
                        {formatTryLira(item.subscription_price)}
                        {item.subscription_period ? (
                          <span className="ml-1 text-sm font-semibold text-foreground/65">/ {item.subscription_period}</span>
                        ) : null}
                      </p>
                    </div>
                  ) : null}
                  {item.yearly_price != null ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/55">Yıllık</p>
                      <p className="text-xl font-bold tabular-nums text-primary">{formatTryLira(item.yearly_price)}</p>
                    </div>
                  ) : null}
                  {item.setup_price == null && item.subscription_price == null && item.yearly_price == null ? (
                    <p className="text-lg font-bold text-primary">{priceFallback}</p>
                  ) : null}
                </>
              )}
              {item.discount_label ? (
                <p className="rounded-lg bg-secondary/15 px-3 py-2 text-xs font-bold text-primary">{item.discount_label}</p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={SERVICE_STOREFRONT_WHATSAPP_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white transition hover:bg-primary/92"
              >
                Satın Al — WhatsApp
              </a>
              <a
                href={SERVICE_STOREFRONT_WHATSAPP_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-primary/20 text-sm font-bold text-primary transition hover:border-primary/35 hover:bg-surface/40"
              >
                Detaylı teklif iste
              </a>
              <Link
                href={SERVICE_STOREFRONT_PUBLIC_BASE}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground/75 transition hover:border-primary/25 hover:text-primary"
              >
                Vitrine dön
              </Link>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-foreground/60">
              Fiyatlar bilgilendirme amaçlıdır; nihai kapsam ve sözleşme koşulları teklif aşamasında netleştirilir.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-10 space-y-8">
        <ServiceVitrinDetailTabs tabs={tabs} />

        <Section id="genel-bakis" title="Genel bakış">
          {item.long_description?.trim() ? (
            <ServiceVitrinRichContent text={item.long_description} />
          ) : (
            <p className={`text-sm leading-relaxed text-foreground/88 sm:text-[15px] ${EMOJI_TEXT_CLASS}`}>{item.short_description}</p>
          )}
        </Section>

        {features.length ? (
          <Section id="avantajlar" title="Avantajlar">
            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.id} className="flex gap-3 rounded-xl border border-border/80 bg-surface/25 p-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary" aria-hidden>
                    {f.icon?.trim() || "✓"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-primary">{f.title}</p>
                    {f.description?.trim() ? (
                      <p className={`mt-1.5 text-sm leading-relaxed text-foreground/85 ${EMOJI_TEXT_CLASS}`}>{f.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {info.length ? (
          <Section id="hizmet-bilgileri" title="Hizmet bilgileri">
            <dl className="grid gap-4 sm:grid-cols-2">
              {info.map((row) => (
                <div key={row.label} className="rounded-xl border border-border/70 bg-surface/20 p-4 sm:p-5">
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-foreground/55">{row.label}</dt>
                  <dd className={`mt-2 text-sm font-semibold leading-relaxed text-foreground ${EMOJI_TEXT_CLASS}`}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}

        {item.process_description?.trim() ? (
          <Section id="uygulama-sureci" title="Uygulama süreci">
            {processSteps ? (
              <ol className="relative space-y-0 border-l-2 border-primary/20 pl-6">
                {processSteps.map((s, i) => (
                  <li key={s.step} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[1.65rem] flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white text-xs font-bold text-primary">
                      {s.step}
                    </span>
                    <p className="text-sm font-bold text-primary sm:text-base">{s.title}</p>
                    {i < processSteps.length - 1 ? <span className="sr-only">Sonraki adım</span> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <ServiceVitrinRichContent text={item.process_description} />
            )}
          </Section>
        ) : null}

        {faq.length ? (
          <Section id="sss" title="Sık sorulan sorular">
            <ServiceVitrinFaqAccordion items={faq} />
          </Section>
        ) : null}

        {relatedCards.length ? (
          <Section id="ilgili-hizmetler" title="İlgili hizmetler">
            <ul className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {relatedCards.map((s) => (
                <li key={s.id} className="w-[min(85vw,280px)] shrink-0 sm:w-auto">
                  <Link
                    href={serviceStorefrontDetailPath(s.slug)}
                    className="flex h-full flex-col rounded-xl border border-border bg-surface/25 p-4 transition hover:border-primary/25 hover:bg-white hover:shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary/70">{s.category}</span>
                    <p className="mt-1 font-bold text-primary">{s.title}</p>
                    <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-foreground/75">{s.short_description}</p>
                    <span className="mt-3 text-xs font-bold text-primary">Detayı incele →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/98 p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="container-shell flex gap-2">
          <a
            href={SERVICE_STOREFRONT_WHATSAPP_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl bg-primary py-3.5 text-center text-xs font-bold text-white"
          >
            Satın Al
          </a>
          <a
            href={SERVICE_STOREFRONT_WHATSAPP_URL}
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
