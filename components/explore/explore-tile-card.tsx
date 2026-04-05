import Link from "next/link";

import type { ExploreCategoryDef } from "@/lib/explore/explore-types";

const SIZE_GRID: Record<
  ExploreCategoryDef["tileSize"],
  string
> = {
  large: "col-span-2 min-h-[132px] sm:min-h-[148px]",
  medium: "col-span-1 min-h-[118px] sm:min-h-[128px]",
  small: "col-span-1 min-h-[104px] sm:min-h-[112px]",
};

const VARIANT_CLASS: [string, string][] = [
  [
    "from-primary via-primary/90 to-secondary/95",
    "shadow-[0_12px_32px_rgba(11,60,93,0.22)]",
  ],
  [
    "from-secondary via-secondary/85 to-primary/90",
    "shadow-[0_12px_32px_rgba(50,140,193,0.2)]",
  ],
  [
    "from-primary/95 via-secondary/80 to-primary",
    "shadow-[0_12px_28px_rgba(11,60,93,0.18)]",
  ],
];

type Props = {
  category: ExploreCategoryDef;
  firmCount: number;
  showCount: boolean;
  variantIndex: number;
};

export function ExploreTileCard({
  category,
  firmCount,
  showCount,
  variantIndex,
}: Props) {
  const [gradient, shadow] = VARIANT_CLASS[variantIndex % VARIANT_CLASS.length];
  const href = `/kesfet/${category.slug}`;
  const countLabel =
    firmCount === 0
      ? "Henüz firma yok"
      : `${firmCount} firma`;

  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-4 text-white outline-none transition active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:rounded-3xl md:p-5 ${gradient} ${shadow} ${SIZE_GRID[category.tileSize]}`}
      aria-label={`${category.label}. ${showCount ? countLabel + ". " : ""}Detay sayfasına git.`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/15"
        aria-hidden
      />
      <div className="relative z-[1] flex flex-col gap-1">
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/80">
          Keşfet
        </span>
        <span className="text-lg font-bold leading-snug tracking-tight md:text-xl">
          {category.label}
        </span>
        {showCount ? (
          <span className="text-xs font-medium text-white/85">{countLabel}</span>
        ) : null}
      </div>
    </Link>
  );
}
