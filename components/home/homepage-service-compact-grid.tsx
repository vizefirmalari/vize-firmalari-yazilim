import Link from "next/link";
import type { HomeServiceTile } from "@/lib/homepage/discovery-model";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

export function HomepageServiceCompactGrid({ tiles }: { tiles: HomeServiceTile[] }) {
  if (!tiles.length) return null;

  return (
    <div className="flex flex-wrap gap-2.5 md:gap-3">
      {tiles.map((tile) => (
        <Link
          key={tile.id}
          href={tile.href}
          className="group inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/92 px-3 py-2 shadow-[0_1px_6px_rgba(11,60,93,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/28 hover:bg-primary/4 hover:shadow-[0_8px_16px_rgba(11,60,93,0.1)]"
        >
          <span className="text-xs font-semibold text-primary md:text-sm">
            {tile.title}
          </span>
          <span className="text-[10px] font-medium tabular-nums text-foreground/45 md:text-[11px]">
            {countLabel(tile.count)}
          </span>
        </Link>
      ))}
    </div>
  );
}
