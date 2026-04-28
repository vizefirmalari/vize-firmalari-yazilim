import Link from "next/link";

import { ExploreEuStarBadge } from "@/components/explore/explore-eu-star-badge";
import { ExploreTileArt } from "@/components/explore/explore-tile-art";
import { FlagIcon } from "@/components/explore/flag-icon";
import type { ExploreCategoryDef, ExploreVisualType } from "@/lib/explore/explore-types";
import { resolveExploreTheme } from "@/lib/explore/explore-visual-themes";

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
  category: Pick<ExploreCategoryDef, "slug" | "label" | "themeKey">;
  firmCount: number;
  showCount: boolean;
  featured?: boolean;
  contextHint?: string;
};

export function ExploreTileCard({
  category,
  firmCount,
  showCount,
  featured = false,
  contextHint,
}: Props) {
  const theme = resolveExploreTheme(category.themeKey);
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
      className={`group relative flex h-[210px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-white text-foreground outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(11,60,93,0.14)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:h-[230px] ${featured ? "ring-1 ring-primary/10" : ""}`}
      aria-label={`${category.label}. ${showCount ? countLabel + ". " : ""}Detay sayfasına git.`}
    >
      <div className={`relative h-20 shrink-0 overflow-hidden sm:h-28 md:h-28 lg:h-28 ${theme.baseClass} ${theme.shadowClass} ${theme.grainClass ?? ""}`}>
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
          className={`pointer-events-none absolute overflow-hidden opacity-[0.92] ${artWrapperClass(theme.visualType)}`}
          aria-hidden
        >
          <ExploreTileArt id={theme.decorationId} className="h-full w-full" />
        </div>
      </div>

      {theme.flagIso || theme.euStarBadge ? (
        <div
          className="pointer-events-none absolute right-2.5 top-2.5 z-2"
          aria-hidden
        >
          <div className="rounded-lg border border-white/45 bg-white/22 p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_12px_rgba(0,0,0,0.22)] backdrop-blur-[6px]">
            {theme.euStarBadge ? (
              <ExploreEuStarBadge size="sm" />
            ) : theme.flagIso ? (
              <FlagIcon country={theme.flagIso} size="sm" variant="bordered" />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="relative z-3 flex min-h-[120px] flex-1 flex-col justify-between p-3.5 sm:min-h-[112px] sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary/8 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-primary ring-1 ring-primary/15">
            {typeLabel}
          </span>
          {showCount ? (
            <span className="text-[11px] font-semibold text-foreground/72">
              {countLabel}
            </span>
          ) : null}
        </div>
        <span className="z-10 line-clamp-2 text-base font-bold leading-snug text-primary">
          {category.label}
        </span>
        {contextHint ? (
          <span className="hidden line-clamp-1 text-[11px] text-foreground/60 sm:block">
            {contextHint}
          </span>
        ) : null}
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
          Firmaları gör
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
