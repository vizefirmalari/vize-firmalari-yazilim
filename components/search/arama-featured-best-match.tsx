import Link from "next/link";

import { FirmBlogCoverDisplay } from "@/components/blog/firm-blog-cover-display";
import { FirmNameBadges } from "@/components/firms/FirmNameBadges";
import type { FeaturedBestMatch } from "@/lib/search/site-search";
import { SEARCH_BLOG_COVER_FALLBACK } from "@/lib/search/site-search";

export function AramaFeaturedBestMatch({
  featured,
  queryLabel,
}: {
  featured: FeaturedBestMatch;
  queryLabel: string;
}) {
  return (
    <section
      aria-labelledby="heading-featured-match"
      className="scroll-mt-28 rounded-2xl border border-border bg-linear-to-br from-background via-surface to-surface p-5 shadow-[0_14px_32px_rgba(11,60,93,0.08)] sm:p-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
        Öne çıkan eşleşme
      </p>
      <h2 id="heading-featured-match" className="mt-2 text-xl font-bold text-primary sm:text-2xl">
        &ldquo;{queryLabel}&rdquo; için en güçlü sonuç
      </h2>

      {featured.role === "firm" ? (
        <Link
          href={`/firma/${encodeURIComponent(featured.firm.slug)}`}
          className="group mt-5 flex flex-col gap-4 rounded-xl border border-border/80 bg-background p-4 transition hover:border-secondary/55 sm:flex-row sm:items-center"
        >
          <div className="flex min-h-20 min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary sm:min-h-24">
            {featured.firm.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-0 gap-y-1">
              <p className="text-lg font-bold text-primary group-hover:text-secondary">
                {featured.firm.name}
              </p>
              <FirmNameBadges firm={featured.firm} size="card" className="shrink-0" />
            </div>
            {featured.firm.short_description?.trim() ? (
              <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{featured.firm.short_description}</p>
            ) : featured.firm.countries?.length ? (
              <p className="mt-1 text-sm text-foreground/65">{featured.firm.countries.slice(0, 6).join(" · ")}</p>
            ) : (
              <p className="mt-1 text-sm text-foreground/65">Firma profili ve iletişim bilgileri</p>
            )}
            <span className="mt-3 inline-flex text-sm font-semibold text-secondary">
              Profile git <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      ) : null}

      {featured.role === "guide" ? (
        <Link
          href={featured.guide.href}
          className="group mt-5 flex flex-col overflow-hidden rounded-xl border border-border/80 bg-background transition hover:border-secondary/55 sm:flex-row"
        >
          <div className="min-w-0 w-full shrink-0 sm:w-52">
            <FirmBlogCoverDisplay
              src={featured.guide.coverImageUrl || SEARCH_BLOG_COVER_FALLBACK}
              alt=""
              priority
              outerClassName="rounded-2xl!"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4 sm:p-5">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {featured.guide.categoryLabel}
            </span>
            <p className="text-lg font-bold leading-snug text-primary group-hover:text-secondary">
              {featured.guide.title}
            </p>
            {featured.guide.summary?.trim() ? (
              <p className="line-clamp-2 text-sm text-foreground/70">{featured.guide.summary}</p>
            ) : null}
            <span className="mt-auto inline-flex pt-1 text-sm font-semibold text-secondary">
              Rehberi oku <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      ) : null}

      {(featured.role === "kesfet" || featured.role === "hint") && (
        <Link
          href={featured.hit.href}
          className="group mt-5 block rounded-xl border border-border/80 bg-background p-5 transition hover:border-secondary/55 sm:p-6"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
            {featured.hit.href.startsWith("/kesfet/") ? "Keşfet vitrini" : "İlgili yönlendirme"}
          </span>
          <p className="mt-2 text-lg font-bold text-primary group-hover:text-secondary">{featured.hit.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{featured.hit.shortDescription}</p>
          <span className="mt-4 inline-flex text-sm font-semibold text-secondary">
            {featured.hit.href.startsWith("/kesfet/") ? "Kategori sayfasına git" : "Devam et"}{" "}
            <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </section>
  );
}
