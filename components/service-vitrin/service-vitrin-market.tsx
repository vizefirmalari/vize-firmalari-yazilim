import Link from "next/link";

import { ServiceVitrinMarketCard } from "@/components/service-vitrin/service-vitrin-market-card";
import {
  SERVICE_STOREFRONT_PUBLIC_BASE,
  SERVICE_STOREFRONT_WHATSAPP_URL,
} from "@/lib/constants/service-storefront";
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
        <p className="mt-3 text-sm leading-relaxed text-foreground/82">
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

        <div className="min-w-0 flex-1 space-y-5">
          <div className="space-y-3 lg:hidden">
            <form action={SERVICE_STOREFRONT_PUBLIC_BASE} method="get" className="flex gap-2">
              <input
                name="q"
                defaultValue={q}
                placeholder="Hizmet ara…"
                className="min-w-0 flex-1 rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary/35 focus:ring-2 focus:ring-primary/25"
              />
              {category ? <input type="hidden" name="category" value={category} /> : null}
              <input type="hidden" name="sort" value={sort} />
              <button type="submit" className="shrink-0 rounded-xl bg-primary px-4 text-sm font-bold text-white">
                Ara
              </button>
            </form>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible">
            <Link
              href={buildListHref({ q: "", category: null, sort })}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                !category ? "bg-primary text-white" : "border border-border bg-white text-primary hover:border-primary/30"
              }`}
            >
              Tümü
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={buildListHref({ q, category: c, sort })}
                className={`max-w-[14rem] shrink-0 truncate rounded-full px-3 py-1.5 text-xs font-bold transition ${
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
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {items.map((it) => (
                <li key={it.id} className="h-full min-w-0">
                  <ServiceVitrinMarketCard
                    item={it}
                    imageUrl={cardImages[it.id] ?? null}
                    previewLines={previewLines[it.id] ?? []}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
