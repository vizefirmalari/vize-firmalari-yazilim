import Link from "next/link";

import { ExploreEuStarBadge } from "@/components/explore/explore-eu-star-badge";
import { ExploreTileArt } from "@/components/explore/explore-tile-art";
import { FlagIcon } from "@/components/explore/flag-icon";
import type { ExploreThemeDef } from "@/lib/explore/explore-visual-themes";

type Props = {
  mode?: "hub" | "category";
  /** Kategori detayında kartla aynı görsel dil */
  theme?: ExploreThemeDef | null;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function ExploreHero({
  mode = "hub",
  theme = null,
  title,
  description,
  backHref,
  backLabel = "Keşfet",
}: Props) {
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
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${theme.heroOverlayClass}`}
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
            className="pointer-events-none absolute right-4 top-[4.5rem] z-[1] md:right-6 md:top-1/2 md:-translate-y-1/2"
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
        <div className="container-shell relative z-[2] py-9 md:py-11">
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
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-b border-border/80 bg-gradient-to-br from-primary/[0.07] via-background to-secondary/[0.08]">
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-56 w-56 rounded-full bg-secondary/18 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-primary/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B3C5D' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container-shell relative py-9 md:py-11">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-secondary">
          Keşfet
        </p>
        <h1 className="mt-3 max-w-[22rem] text-2xl font-bold leading-tight tracking-tight text-primary md:max-w-2xl md:text-[1.75rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/72 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
