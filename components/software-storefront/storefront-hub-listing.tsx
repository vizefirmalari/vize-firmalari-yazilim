import Link from "next/link";

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
  heroTitle: string;
  heroSubtitle: string;
  catalog: PublicStorefrontCatalogCategory[];
  q: string;
  sort: PublicStorefrontSortKey;
  cat: string | null;
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
        <label className="text-xs font-semibold text-foreground/50" htmlFor={`${idPrefix}-q`}>
          Ara
        </label>
        <input
          id={`${idPrefix}-q`}
          name="q"
          defaultValue={q}
          placeholder="Hizmet veya anahtar kelime"
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary/35"
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground/50">Sıralama</p>
        <select
          name="sort"
          defaultValue={sort}
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary/35"
        >
          <option value="featured">Öne çıkan / önerilen</option>
          <option value="title">Başlık (A-Z)</option>
          <option value="setup_asc">Kurulum ücreti (artan)</option>
          <option value="setup_desc">Kurulum ücreti (azalan)</option>
        </select>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground/50">Kategori</p>
        <select
          name="cat"
          defaultValue={cat ?? ""}
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary/35"
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
        className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
      >
        Uygula
      </button>
      <Link
        href={basePath}
        className="block w-full rounded-xl border border-border py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-surface"
      >
        Sıfırla
      </Link>
    </div>
  );
}

export function StorefrontHubListing({ basePath, heroTitle, heroSubtitle, catalog, q, sort, cat }: Props) {
  const total = catalog.reduce((acc, c) => acc + c.services.length, 0);
  const formId = "storefront-filters";

  return (
    <div className="container-shell pb-28 pt-8 lg:pb-12">
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">B2B vitrin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{heroTitle}</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:text-base">{heroSubtitle}</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2 text-xs text-foreground/55">
        <span className="rounded-full border border-border bg-white px-3 py-1 font-medium">
          {total} hizmet
          {q ? ` · “${q}”` : ""}
        </span>
        {cat ? (
          <span className="rounded-full border border-border bg-white px-3 py-1 font-medium">
            Kategori filtresi aktif
          </span>
        ) : null}
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:mt-10">
        <Link
          href={`${basePath}${buildQuery({ q, sort })}`}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            !cat ? "border-primary/30 bg-primary/8 text-primary" : "border-border bg-white text-foreground/65"
          }`}
        >
          Tümü
        </Link>
        {catalog.map((c) => (
          <Link
            key={c.id}
            href={`${basePath}${buildQuery({ q, sort, cat: c.id })}`}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              cat === c.id ? "border-primary/30 bg-primary/8 text-primary" : "border-border bg-white text-foreground/65"
            }`}
          >
            <span aria-hidden>{c.icon}</span> {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-start">
        <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
          <div className="premium-card p-5">
            <p className="text-sm font-bold text-primary">Filtreler</p>
            <form className="mt-4 space-y-0" method="get" action={basePath}>
              <FilterFields basePath={basePath} q={q} sort={sort} cat={cat} catalog={catalog} idPrefix="desk" />
            </form>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          {catalog.map((catBlock) => (
            <section key={catBlock.id} aria-labelledby={`cat-${catBlock.id}`} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <h2 id={`cat-${catBlock.id}`} className="text-xl font-bold text-primary">
                  <span className="mr-1.5" aria-hidden>
                    {catBlock.icon}
                  </span>
                  {catBlock.name}
                </h2>
                <p className="text-xs font-medium text-foreground/50">{catBlock.services.length} çözüm</p>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
                {catBlock.services.map((svc) => (
                  <StorefrontServiceCard key={svc.id} service={svc} categoryLabel={catBlock.name} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <StorefrontFilterDrawer formId={formId}>
        <form method="get" action={basePath} className="space-y-0">
          <FilterFields basePath={basePath} q={q} sort={sort} cat={cat} catalog={catalog} idPrefix="mob" />
        </form>
      </StorefrontFilterDrawer>
    </div>
  );
}
