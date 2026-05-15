import Image from "next/image";
import Link from "next/link";

import {
  SERVICE_STOREFRONT_PUBLIC_BASE,
  SERVICE_STOREFRONT_WHATSAPP_URL,
  serviceStorefrontDetailPath,
} from "@/lib/constants/service-storefront";
import type { ServiceStorefrontPublicDetail } from "@/lib/data/service-storefront-public";
import { pickPrimaryServiceImage } from "@/lib/data/service-storefront-public";
import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";
import { growthServicePriceLine } from "@/lib/format/try-lira";

type Props = ServiceStorefrontPublicDetail;

function infoRows(item: Props["item"]): { label: string; value: string | null }[] {
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
    { label: "Genel kapsam", value: item.service_scope },
  ].filter((r) => r.value && r.value.trim());
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

export function ServiceVitrinDetailView(data: Props) {
  const { item, images, features, faq } = data;
  const primary = pickPrimaryServiceImage(images);
  const orderedImages = [...images].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id));
  const mainSrc = primary ?? orderedImages[0]?.display_url ?? null;
  const thumbs = orderedImages.filter((i) => i.display_url !== mainSrc).slice(0, 8);
  const priceLine = growthServicePriceLine(item.setup_price, item.subscription_price, item.custom_price);
  const info = infoRows(item);
  const relatedCards = mergeRelatedCards(data);
  const categoryHref = `${SERVICE_STOREFRONT_PUBLIC_BASE}?category=${encodeURIComponent(item.category)}`;

  return (
    <article className="container-shell pb-28 pt-8 sm:pt-10 lg:pb-16">
      <nav className="text-xs font-semibold text-foreground/55">
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
        <span className="text-foreground/75">{item.title}</span>
      </nav>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="relative aspect-square w-full bg-surface/40">
              {mainSrc ? (
                <Image src={mainSrc} alt={item.title} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 55vw" />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm font-semibold text-foreground/45">
                  Görsel yakında
                </div>
              )}
            </div>
            {thumbs.length ? (
              <div className="flex gap-2 overflow-x-auto border-t border-border/60 p-3 sm:p-4">
                {thumbs.map((im) => (
                  <div key={im.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/80 sm:h-20 sm:w-20">
                    <Image src={im.display_url} alt={im.alt_text || item.title} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Genel bakış</h2>
            {item.long_description?.trim() ? (
              <div className={`mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 sm:text-base ${EMOJI_TEXT_CLASS}`}>{item.long_description}</div>
            ) : (
              <p className={`mt-4 text-sm leading-relaxed text-foreground/70 ${EMOJI_TEXT_CLASS}`}>{item.short_description}</p>
            )}
          </section>

          {features.length ? (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-primary sm:text-2xl">Avantajlar</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.id} className="flex gap-3 rounded-xl border border-border/70 bg-surface/30 p-4">
                    <span className="mt-0.5 shrink-0 text-lg text-primary" aria-hidden>
                      {f.icon?.trim() || "✓"}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-primary">{f.title}</p>
                      {f.description?.trim() ? (
                        <p className={`mt-1 text-sm leading-relaxed text-foreground/72 ${EMOJI_TEXT_CLASS}`}>{f.description}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {info.length ? (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-primary sm:text-2xl">Hizmet bilgileri</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {info.map((row) => (
                  <div key={row.label} className="rounded-xl border border-border/60 bg-surface/25 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-foreground/50">{row.label}</dt>
                    <dd className={`mt-1 text-sm font-semibold leading-relaxed text-foreground/85 ${EMOJI_TEXT_CLASS}`}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {item.process_description?.trim() ? (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-primary sm:text-2xl">Uygulama süreci</h2>
              <div className={`mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/78 ${EMOJI_TEXT_CLASS}`}>{item.process_description}</div>
            </section>
          ) : null}

          {faq.length ? (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-primary sm:text-2xl">Sık sorulan sorular</h2>
              <ul className="mt-6 divide-y divide-border/80">
                {faq.map((f) => (
                  <li key={f.id} className="py-4 first:pt-0">
                    <p className="font-bold text-primary">{f.question}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{f.answer}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedCards.length ? (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-primary sm:text-2xl">İlgili hizmetler</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedCards.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={serviceStorefrontDetailPath(s.slug)}
                      className="block rounded-xl border border-border bg-surface/30 p-4 transition hover:border-secondary/40 hover:bg-white hover:shadow-sm"
                    >
                      <p className="font-bold text-primary">{s.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs font-medium text-foreground/60">{s.short_description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                <Link href={categoryHref} className="text-primary hover:underline">
                  Aynı kategorideki hizmetler
                </Link>
                <span className="text-foreground/25">·</span>
                <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="text-primary hover:underline">
                  Tüm vitrin
                </Link>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-base font-bold text-primary">Devam edin</h2>
              <div className="mt-4 flex flex-col gap-2 text-sm font-bold text-primary sm:flex-row sm:flex-wrap sm:gap-x-6">
                <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="hover:underline">
                  Yazılım çözümleri
                </Link>
                <Link href={categoryHref} className="hover:underline">
                  {item.category} kategorisi
                </Link>
                <Link href="/otomasyon-cozumleri" className="hover:underline">
                  Otomasyon çözümleri
                </Link>
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45">{item.category}</p>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-primary">{item.title}</h1>
            {item.tags.length ? (
              <p className="mt-2 text-xs font-medium text-foreground/50">{item.tags.join(" · ")}</p>
            ) : null}
            <p className={`mt-4 text-sm leading-relaxed text-foreground/72 ${EMOJI_TEXT_CLASS}`}>{item.short_description}</p>

            <div className="mt-6 border-t border-border/70 pt-6">
              {!item.custom_price && (item.setup_price != null || item.subscription_price != null) ? (
                <div className="space-y-4">
                  {item.setup_price != null ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/45">Kurulum</p>
                      <p className="text-2xl font-bold tabular-nums text-primary">{item.setup_price.toLocaleString("tr-TR")} ₺</p>
                    </div>
                  ) : null}
                  {item.subscription_price != null ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground/45">Abonelik</p>
                      <p className="text-2xl font-bold tabular-nums text-primary">
                        {item.subscription_price.toLocaleString("tr-TR")} ₺
                        {item.subscription_period ? (
                          <span className="ml-1 text-sm font-semibold text-foreground/55">/ {item.subscription_period}</span>
                        ) : null}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-lg font-bold text-primary">{priceLine}</p>
              )}
              {item.discount_label ? (
                <p className="mt-3 rounded-lg bg-secondary/15 px-3 py-2 text-xs font-bold text-primary">{item.discount_label}</p>
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
              <Link
                href={SERVICE_STOREFRONT_PUBLIC_BASE}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-primary/20 text-sm font-bold text-primary transition hover:border-primary/35 hover:bg-surface/40"
              >
                Vitrine dön
              </Link>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-foreground/50">
              Fiyatlar bilgilendirme amaçlıdır; nihai kapsam ve sözleşme koşulları teklif aşamasında netleştirilir.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/98 p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="container-shell flex gap-2">
          <a
            href={SERVICE_STOREFRONT_WHATSAPP_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex-1 rounded-xl bg-primary py-3.5 text-center text-xs font-bold text-white"
          >
            Satın Al
          </a>
          <Link
            href={SERVICE_STOREFRONT_PUBLIC_BASE}
            className="flex-1 rounded-xl border-2 border-primary/25 py-3.5 text-center text-xs font-bold text-primary"
          >
            Vitrin
          </Link>
        </div>
      </div>
    </article>
  );
}
