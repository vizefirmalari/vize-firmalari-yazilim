import Link from "next/link";

import { STOREFRONT_HUB_PATH } from "@/lib/software/storefront-hubs";
import { StorefrontFilterDrawer } from "@/components/software-storefront/storefront-filter-drawer";
import { StorefrontServiceCard } from "@/components/software-storefront/storefront-service-card";
import type { PublicStorefrontCatalogCategory } from "@/lib/types/software-storefront";
import type { PublicStorefrontSortKey } from "@/lib/types/software-storefront";

function buildQuery(next: { q?: string; sort?: PublicStorefrontSortKey; cat?: string | null }): string {
  const p = new URLSearchParams();
  if (next.q?.trim()) p.set("q", next.q.trim());
  if (next.sort && next.sort !== "featured") p.set("sort", next.sort);
  if (next.cat) p.set("cat", next.cat);
  const s = p.toString();
  return s ? `?${s}` : "";
}

type Props = {
  basePath: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle: string;
  catalog: PublicStorefrontCatalogCategory[];
  q: string;
  sort: PublicStorefrontSortKey;
  cat: string | null;
  /** Ana vitrinde alt hub bağlantıları */
  showSubHubLinks?: boolean;
};

function FilterFields({
  basePath,
  q,
  sort,
  cat,
  catalog,
  idPrefix,
}: {
  basePath: string;
  q: string;
  sort: PublicStorefrontSortKey;
  cat: string | null;
  catalog: PublicStorefrontCatalogCategory[];
  idPrefix: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold text-foreground/70" htmlFor={`${idPrefix}-q`}>
          Ara
        </label>
        <input
          id={`${idPrefix}-q`}
          name="q"
          defaultValue={q}
          placeholder="Hizmet veya anahtar kelime"
          className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground shadow-sm outline-none ring-primary/0 transition focus-visible:border-secondary/40 focus-visible:ring-2 focus-visible:ring-secondary/30"
        />
      </div>
      <div>
        <p className="text-xs font-bold text-foreground/70">Sıralama</p>
        <select
          name="sort"
          defaultValue={sort}
          className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
        >
          <option value="featured">Öne çıkan / önerilen</option>
          <option value="title">Başlık (A-Z)</option>
          <option value="setup_asc">Kurulum ücreti (artan)</option>
          <option value="setup_desc">Kurulum ücreti (azalan)</option>
        </select>
      </div>
      <div>
        <p className="text-xs font-bold text-foreground/70">Kategori</p>
        <select
          name="cat"
          defaultValue={cat ?? ""}
          className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
        >
          <option value="">Tümü</option>
          {catalog.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
      >
        Uygula
      </button>
      <Link
        href={basePath}
        className="block w-full rounded-xl border border-border bg-white py-3 text-center text-sm font-bold text-primary shadow-sm transition hover:bg-surface"
      >
        Sıfırla
      </Link>
    </div>
  );
}

export function StorefrontHubListing({
  basePath,
  heroEyebrow = "B2B vitrin",
  heroTitle,
  heroSubtitle,
  catalog,
  q,
  sort,
  cat,
  showSubHubLinks,
}: Props) {
  const total = catalog.reduce((acc, c) => acc + c.services.length, 0);
  const formId = `sf-filters-${basePath.replace(/^\//, "").replace(/\//g, "-") || "hub"}`;

  return (
    <div className="container-shell pb-28 pt-8 lg:pb-14">
      <header className="border-b border-border pb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">{heroEyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
          {heroTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-foreground/80 sm:text-lg">{heroSubtitle}</p>
        {showSubHubLinks ? (
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
            <Link
              href={STOREFRONT_HUB_PATH["yazilim-cozumleri"]}
              className="rounded-full border border-border bg-white px-4 py-2 text-primary shadow-sm transition hover:border-secondary/35"
            >
              Yazılım çözümleri vitrini
            </Link>
            <Link
              href={STOREFRONT_HUB_PATH["otomasyon-cozumleri"]}
              className="rounded-full border border-border bg-white px-4 py-2 text-primary shadow-sm transition hover:border-secondary/35"
            >
              Otomasyon vitrini
            </Link>
          </div>
        ) : null}
      </header>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-foreground/75">
        <span className="rounded-full border border-border bg-white px-3 py-1.5 shadow-sm">{total} hizmet</span>
        {q ? (
          <span className="rounded-full border border-border bg-white px-3 py-1.5 shadow-sm">“{q}” araması</span>
        ) : null}
        {cat ? <span className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-primary">Kategori filtresi</span> : null}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link
          href={`${basePath}${buildQuery({ q, sort })}`}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
            !cat ? "border-primary/35 bg-primary/10 text-primary shadow-sm" : "border-border bg-white text-foreground/75 shadow-sm hover:border-secondary/30"
          }`}
        >
          Tümü
        </Link>
        {catalog.map((c) => (
          <Link
            key={c.id}
            href={`${basePath}${buildQuery({ q, sort, cat: c.id })}`}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
              cat === c.id ? "border-primary/35 bg-primary/10 text-primary shadow-sm" : "border-border bg-white text-foreground/75 shadow-sm hover:border-secondary/30"
            }`}
          >
            <span aria-hidden>{c.icon}</span> {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-base font-bold text-primary">Filtreler</p>
            <p className="mt-1 text-xs font-medium text-foreground/70">Arama, sıralama ve kategori.</p>
            <form className="mt-5 space-y-0" method="get" action={basePath}>
              <FilterFields basePath={basePath} q={q} sort={sort} cat={cat} catalog={catalog} idPrefix="desk" />
            </form>
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          {catalog.map((catBlock) => (
            <section key={catBlock.id} aria-labelledby={`cat-${catBlock.id}`} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-border pb-4">
                <h2 id={`cat-${catBlock.id}`} className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                  <span className="mr-2" aria-hidden>
                    {catBlock.icon}
                  </span>
                  {catBlock.name}
                </h2>
                <p className="text-xs font-bold text-foreground/70">{catBlock.services.length} çözüm</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {catBlock.services.map((svc) => (
                  <StorefrontServiceCard
                    key={svc.id}
                    service={svc}
                    categoryLabel={catBlock.name}
                    categorySlug={catBlock.slug}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <StorefrontFilterDrawer formId={formId}>
        <form id={formId} method="get" action={basePath} className="space-y-0">
          <FilterFields basePath={basePath} q={q} sort={sort} cat={cat} catalog={catalog} idPrefix="mob" />
        </form>
      </StorefrontFilterDrawer>
    </div>
  );
}
