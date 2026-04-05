import Link from "next/link";

import { ExploreEuStarBadge } from "@/components/explore/explore-eu-star-badge";
import { ExploreTileArt } from "@/components/explore/explore-tile-art";
import { FlagIcon } from "@/components/explore/flag-icon";
import type { ExploreCategoryDef, ExploreVisualType } from "@/lib/explore/explore-types";
import {
  CARD_VARIANT_GRID,
  resolveExploreTheme,
} from "@/lib/explore/explore-visual-themes";

function artWrapperClass(visualType: ExploreVisualType): string {
  switch (visualType) {
    case "country":
      return "bottom-0 left-0 right-0 h-[62%] w-full translate-y-1";
    case "region":
      return "bottom-0 left-0 right-0 h-[58%] w-full translate-y-1";
    case "visa_type":
      return "bottom-1 -right-1 h-[56%] w-[82%]";
    case "process":
      return "bottom-0 right-0 h-[52%] w-[72%]";
    default:
      return "bottom-0 right-0 h-[50%] w-[70%]";
  }
}

type Props = {
  category: ExploreCategoryDef;
  firmCount: number;
  showCount: boolean;
};

export function ExploreTileCard({ category, firmCount, showCount }: Props) {
  const theme = resolveExploreTheme(category.themeKey);
  const gridClass = CARD_VARIANT_GRID[theme.cardVariant];
  const href = `/kesfet/${category.slug}`;
  const countLabel =
    firmCount === 0 ? "Henüz firma yok" : `${firmCount} firma`;

  const typeLabel =
    theme.visualType === "country"
      ? "Hedef"
      : theme.visualType === "region"
        ? "Bölge"
        : theme.visualType === "visa_type"
          ? "Vize türü"
          : "Süreç";

  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/15 p-4 text-white outline-none transition duration-200 hover:border-white/25 hover:brightness-[1.03] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:rounded-3xl md:p-5 ${theme.baseClass} ${theme.shadowClass} ${gridClass} ${theme.grainClass ?? ""}`}
      aria-label={`${category.label}. ${showCount ? countLabel + ". " : ""}Detay sayfasına git.`}
    >
      {theme.orbClass ? (
        <div
          className={`pointer-events-none absolute inset-0 ${theme.orbClass}`}
          aria-hidden
        />
      ) : null}

      <div
        className={`pointer-events-none absolute inset-0 ${theme.overlayClass}`}
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute overflow-hidden opacity-[0.95] ${artWrapperClass(theme.visualType)}`}
        aria-hidden
      >
        <ExploreTileArt id={theme.decorationId} className="h-full w-full" />
      </div>

      {theme.flagIso || theme.euStarBadge ? (
        <div
          className="pointer-events-none absolute right-3 top-3 z-[2] md:right-3.5 md:top-3.5"
          aria-hidden
        >
          <div className="rounded-lg border border-white/45 bg-white/22 p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_12px_rgba(0,0,0,0.22)] backdrop-blur-[6px] md:p-1.5">
            {theme.euStarBadge ? (
              <ExploreEuStarBadge size="sm" />
            ) : theme.flagIso ? (
              <FlagIcon country={theme.flagIso} size="sm" variant="bordered" />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="relative z-[3] flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/12 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/90 ring-1 ring-white/20 backdrop-blur-[2px]">
            {typeLabel}
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-white/55">
            Keşfet
          </span>
        </div>
        <span className="text-lg font-bold leading-snug tracking-tight drop-shadow-md md:text-xl">
          {category.label}
        </span>
        {showCount ? (
          <span className="text-xs font-medium text-white/88 drop-shadow">
            {countLabel}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
