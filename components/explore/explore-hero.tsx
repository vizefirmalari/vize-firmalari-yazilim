import Link from "next/link";

import { ExploreEuStarBadge } from "@/components/explore/explore-eu-star-badge";
import { ExploreTileArt } from "@/components/explore/explore-tile-art";
import { FlagIcon } from "@/components/explore/flag-icon";
import type { ExploreHeroVisual } from "@/lib/explore/explore-types";
import type { ExploreThemeDef } from "@/lib/explore/explore-visual-themes";

type Props = {
  mode?: "hub" | "category";
  /** Kategori detayında kartla aynı görsel dil */
  theme?: ExploreThemeDef | null;
  visual?: ExploreHeroVisual | null;
  title: string;
  description: string;
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
  hubStats?: {
    totalCategories: number;
    totalFirmMatches: number;
    featuredRouteCount: number;
  };
};

export function ExploreHero({
  mode = "hub",
  theme = null,
  visual = null,
  title,
  description,
  compact = false,
  backHref,
  backLabel = "Keşfet",
  hubStats,
}: Props) {
  const accentClass =
    visual?.accentColor === "navy-red"
      ? "from-[#0B3C5D]/60 via-[#0B3C5D]/30 to-[#B63A3A]/20"
      : visual?.accentColor === "navy-gold"
        ? "from-[#0B3C5D]/60 via-[#0B3C5D]/30 to-[#D9A441]/25"
        : visual?.accentColor === "navy-sky"
          ? "from-[#0B3C5D]/60 via-[#0B3C5D]/30 to-[#328CC1]/25"
          : visual?.accentColor === "navy-emerald"
            ? "from-[#0B3C5D]/60 via-[#0B3C5D]/30 to-[#2f9d7e]/22"
            : "from-[#0B3C5D]/60 via-[#0B3C5D]/30 to-[#5f87c5]/24";

  if (mode === "category" && theme) {
    return (
      <div
        className={`relative overflow-hidden border-b border-border/60 text-white ${theme.heroShellClass} ${theme.grainClass ?? ""}`}
      >
        {theme.heroOrbClass ? (
          <div
            className={`pointer-events-none absolute inset-0 ${theme.heroOrbClass}`}
            aria-hidden
          />
        ) : null}
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-b ${theme.heroOverlayClass}`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-6 bottom-0 top-6 w-[min(42%,20rem)] opacity-[0.22] md:top-10 md:opacity-[0.28]"
          aria-hidden
        >
          <ExploreTileArt id={theme.decorationId} className="h-full w-full" />
        </div>
        {theme.flagIso || theme.euStarBadge ? (
          <div
            className="pointer-events-none absolute right-4 top-18 z-1 md:right-6 md:top-1/2 md:-translate-y-1/2"
            aria-hidden
          >
            <div className="rounded-lg border border-white/45 bg-white/22 p-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_12px_rgba(0,0,0,0.2)] backdrop-blur-[6px]">
              {theme.euStarBadge ? (
                <ExploreEuStarBadge size="md" />
              ) : theme.flagIso ? (
                <FlagIcon country={theme.flagIso} size="md" variant="bordered" />
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="container-shell relative z-2 py-9 md:py-11">
          <div className="grid items-center gap-5 md:grid-cols-[1fr_300px]">
            <div>
              {backHref ? (
                <nav aria-label="Gezinti" className="mb-5">
                  <Link
                    href={backHref}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/88 transition hover:text-white"
                  >
                    <span aria-hidden>←</span>
                    {backLabel}
                  </Link>
                </nav>
              ) : null}
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/65">
                Keşfet
              </p>
              <h1 className="mt-2.5 max-w-xl text-2xl font-bold leading-tight tracking-tight drop-shadow-sm md:text-3xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/88 md:text-base">
                {description}
              </p>
              <div className="mt-4 md:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-lg leading-none" aria-hidden>
                    {visual?.flagEmoji ?? "🌍"}
                  </span>
                  <span className="text-xs font-semibold text-white/92">
                    {visual?.visualLabel ?? title}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative hidden justify-self-end md:block" aria-hidden>
              <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${accentClass} blur-2xl`} />
              <div className="relative w-[280px] rounded-3xl border border-white/35 bg-white/14 p-6 shadow-[0_12px_36px_rgba(11,60,93,0.3)] backdrop-blur-xl">
                <div className="text-6xl leading-none">{visual?.flagEmoji ?? "🌍"}</div>
                <p className="mt-4 text-sm font-semibold text-white/95">
                  {visual?.visualLabel ?? title}
                </p>
                <p className="mt-1 text-xs text-white/80">
                  Vize danışmanlığı ve başvuru süreçleri
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className={`container-shell ${compact ? "py-4 md:py-5" : "py-8 md:py-10"}`}>
        <section className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-[#06324f] via-[#0b4f76] to-[#123b5c] text-white shadow-xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 38%), radial-gradient(circle at 84% 12%, rgba(123,211,255,0.2), transparent 30%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-18"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.16'%3E%3Ccircle cx='36' cy='36' r='1.6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative grid gap-6 p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8 lg:p-10">
            <div>
              <span className="inline-flex rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/95">
                KEŞFET
              </span>
              <h1 className="mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-tight md:text-[1.9rem]">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/88 md:text-base">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold text-white/92">
                  Popüler rotalar
                </span>
                <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold text-white/92">
                  Vize türleri
                </span>
                <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold text-white/92">
                  Süreç desteği
                </span>
              </div>
            </div>

            {hubStats ? (
              <div className="hidden gap-3 md:grid">
                <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Toplam kategori</p>
                  <p className="mt-1 text-2xl font-bold">{hubStats.totalCategories}</p>
                </article>
                <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Firma eşleşmesi</p>
                  <p className="mt-1 text-2xl font-bold">{hubStats.totalFirmMatches}</p>
                </article>
                <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Popüler rota</p>
                  <p className="mt-1 text-2xl font-bold">{hubStats.featuredRouteCount}</p>
                </article>
              </div>
            ) : null}
          </div>

          {hubStats ? (
            <div className="relative -mt-1 flex gap-2 overflow-x-auto px-6 pb-5 md:hidden">
              <article className="min-w-[128px] shrink-0 rounded-xl border border-white/15 bg-white/12 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">Kategori</p>
                <p className="mt-1 text-lg font-bold">{hubStats.totalCategories}</p>
              </article>
              <article className="min-w-[140px] shrink-0 rounded-xl border border-white/15 bg-white/12 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">Eşleşme</p>
                <p className="mt-1 text-lg font-bold">{hubStats.totalFirmMatches}</p>
              </article>
              <article className="min-w-[128px] shrink-0 rounded-xl border border-white/15 bg-white/12 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">Rota</p>
                <p className="mt-1 text-lg font-bold">{hubStats.featuredRouteCount}</p>
              </article>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
