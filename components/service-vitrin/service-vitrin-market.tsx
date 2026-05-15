import Image from "next/image";
import Link from "next/link";

import {
  SERVICE_STOREFRONT_PUBLIC_BASE,
  SERVICE_STOREFRONT_WHATSAPP_URL,
  serviceStorefrontDetailPath,
} from "@/lib/constants/service-storefront";
import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";
import { growthServicePriceLine } from "@/lib/format/try-lira";
import type { PublicServiceStorefrontItemRow, ServiceStorefrontSortKey } from "@/lib/data/service-storefront-public";

const SORT_OPTIONS: { value: ServiceStorefrontSortKey; label: string }[] = [
  { value: "featured", label: "Öne çıkanlar" },
  { value: "title", label: "Ada göre (A–Z)" },
  { value: "setup_asc", label: "Kurulum fiyatı (artan)" },
  { value: "setup_desc", label: "Kurulum fiyatı (azalan)" },
];

type Props = {
  items: PublicServiceStorefrontItemRow[];
  categories: string[];
  cardImages: Record<string, string>;
  previewLines: Record<string, string[]>;
  q: string;
  category: string | null;
  sort: ServiceStorefrontSortKey;
};

function buildListHref(opts: { q?: string; category?: string | null; sort?: ServiceStorefrontSortKey }): string {
  const sp = new URLSearchParams();
  if (opts.q?.trim()) sp.set("q", opts.q.trim());
  if (opts.category?.trim()) sp.set("category", opts.category.trim());
  if (opts.sort && opts.sort !== "featured") sp.set("sort", opts.sort);
  const qs = sp.toString();
  return qs ? `${SERVICE_STOREFRONT_PUBLIC_BASE}?${qs}` : SERVICE_STOREFRONT_PUBLIC_BASE;
}

export function ServiceVitrinMarket({ items, categories, cardImages, previewLines, q, category, sort }: Props) {
  return (
    <div className="container-shell py-10 sm:py-12">
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">B2B vitrin</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">Yazılım çözümleri</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          Kurulum ve abonelik modeliyle sunulan yazılım, otomasyon ve büyüme çözümleri. Kartlardan detaya gidin; satın alma için
          WhatsApp hattı üzerinden ekibimizle iletişime geçin.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-start lg:gap-10">
        <aside className="lg:w-64 lg:shrink-0">
          <details className="group rounded-2xl border border-border bg-white shadow-sm lg:sticky lg:top-24 lg:block lg:rounded-2xl lg:border lg:p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm lg:hidden">
              <span>Filtreler ve sıralama</span>
              <span className="text-foreground/45 transition group-open:rotate-180" aria-hidden>
                ▼
              </span>
            </summary>
            <div className="mt-3 space-y-5 border-t border-border/60 p-4 pt-5 lg:mt-0 lg:border-0 lg:p-0">
              <form action={SERVICE_STOREFRONT_PUBLIC_BASE} method="get" className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/55">Arama</label>
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Başlık, kategori veya açıklama"
                  className="w-full rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-sm text-foreground outline-none ring-primary/25 placeholder:text-foreground/40 focus:border-primary/35 focus:ring-2"
                />
                {category ? <input type="hidden" name="category" value={category} /> : null}
                <input type="hidden" name="sort" value={sort} />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition hover:bg-primary/92"
                >
                  Ara
                </button>
              </form>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">Sıralama</p>
                <ul className="mt-2 space-y-1">
                  {SORT_OPTIONS.map((o) => {
                    const active = sort === o.value;
                    return (
                      <li key={o.value}>
                        <Link
                          href={buildListHref({ q, category, sort: o.value })}
                          className={`block rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                            active ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-surface/80 hover:text-primary"
                          }`}
                        >
                          {o.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">Kategori</p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link
                      href={buildListHref({ q, category: null, sort })}
                      className={`block rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                        !category ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-surface/80 hover:text-primary"
                      }`}
                    >
                      Tümü
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        href={buildListHref({ q, category: c, sort })}
                        className={`block rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                          category === c ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-surface/80 hover:text-primary"
                        }`}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildListHref({ q: "", category: null, sort })}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                !category ? "bg-primary text-white" : "border border-border bg-white text-primary hover:border-primary/30"
              }`}
            >
              Tümü
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={buildListHref({ q, category: c, sort })}
                className={`max-w-full truncate rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  category === c ? "bg-primary text-white" : "border border-border bg-white text-primary hover:border-primary/30"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold text-foreground/75">Bu filtrelere uygun yayında hizmet bulunamadı.</p>
              <p className="mt-2 text-xs text-foreground/55">Aramayı veya kategoriyi sıfırlayıp tekrar deneyebilirsiniz.</p>
              <a
                href={SERVICE_STOREFRONT_WHATSAPP_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/92"
              >
                WhatsApp ile bilgi al
              </a>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {items.map((it) => {
                const img = cardImages[it.id];
                const lines = previewLines[it.id] ?? [];
                const priceLine = growthServicePriceLine(it.setup_price, it.subscription_price, it.custom_price);
                const detailHref = serviceStorefrontDetailPath(it.slug);
                return (
                  <li key={it.id}>
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-secondary/35 hover:shadow-md">
                      <Link href={detailHref} className="relative block aspect-square w-full bg-surface/50">
                        {img ? (
                          <Image
                            src={img}
                            alt={it.title}
                            fill
                            className="object-cover"
                            sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 40vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-surface to-white p-6 text-center">
                            <span className="text-xs font-semibold text-foreground/45">{it.title}</span>
                          </div>
                        )}
                        {it.discount_label ? (
                          <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                            {it.discount_label}
                          </span>
                        ) : null}
                      </Link>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="max-w-full truncate rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-primary/85">
                            {it.category}
                          </span>
                          {it.is_featured ? (
                            <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                              Öne çıkan
                            </span>
                          ) : null}
                          {it.is_new ? (
                            <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-bold text-primary">Yeni</span>
                          ) : null}
                          {it.is_popular ? (
                            <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-bold text-foreground/55">
                              Popüler
                            </span>
                          ) : null}
                        </div>
                        {it.tags.length ? (
                          <p className="mt-2 line-clamp-1 text-[11px] font-medium text-foreground/45">{it.tags.join(" · ")}</p>
                        ) : null}
                        <h2 className="mt-2 text-lg font-bold leading-snug text-primary">
                          <Link href={detailHref} className="hover:underline">
                            {it.title}
                          </Link>
                        </h2>
                        <p className={`mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70 ${EMOJI_TEXT_CLASS}`}>{it.short_description}</p>
                        {lines.length ? (
                          <ul className="mt-4 space-y-1.5 text-sm font-medium text-foreground/78">
                            {lines.slice(0, 3).map((line) => (
                              <li key={line} className="flex gap-2">
                                <span className="shrink-0 text-primary" aria-hidden>
                                  ✓
                                </span>
                                <span className="min-w-0 leading-snug">{line}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <div className="mt-5 min-h-4 flex-1" />
                        <div className="mt-auto space-y-3 border-t border-border/70 pt-4">
                          {!it.custom_price && (it.setup_price != null || it.subscription_price != null) ? (
                            <div className="flex flex-wrap items-end justify-between gap-4">
                              {it.setup_price != null ? (
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground/45">Kurulum</p>
                                  <p className="text-lg font-bold tabular-nums text-primary sm:text-xl">
                                    {it.setup_price.toLocaleString("tr-TR")} ₺
                                  </p>
                                </div>
                              ) : null}
                              {it.subscription_price != null ? (
                                <div className="text-right">
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground/45">Abonelik</p>
                                  <p className="text-lg font-bold tabular-nums text-primary sm:text-xl">
                                    {it.subscription_price.toLocaleString("tr-TR")} ₺
                                    {it.subscription_period ? (
                                      <span className="block text-[11px] font-semibold text-foreground/50">/{it.subscription_period}</span>
                                    ) : null}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <p className="text-sm font-bold text-primary">{priceLine}</p>
                          )}
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <Link
                              href={detailHref}
                              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border-2 border-primary/20 bg-white px-4 text-sm font-bold text-primary transition hover:border-primary/35 hover:bg-surface/40"
                            >
                              Detay
                            </Link>
                            <a
                              href={SERVICE_STOREFRONT_WHATSAPP_URL}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/92"
                            >
                              Satın Al
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
