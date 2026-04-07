import Link from "next/link";
import type { HomeServiceTile } from "@/lib/homepage/discovery-model";
import { ServiceVitrinIcon } from "@/components/home/homepage-vitrin-icons";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

export function ServiceProcessChipGrid({ tiles }: { tiles: HomeServiceTile[] }) {
  if (!tiles.length) return null;

  return (
    <div className="flex flex-wrap gap-2.5 md:gap-3">
      {tiles.map((tile) => (
        <Link
          key={tile.id}
          href={tile.href}
          className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-border/75 bg-background/90 px-3 py-2 shadow-[0_1px_6px_rgba(11,60,93,0.05)] transition duration-200 hover:border-primary/28 hover:bg-primary/5 hover:shadow-[0_6px_14px_rgba(11,60,93,0.1)]"
        >
          <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center text-primary/90">
            <ServiceVitrinIcon title={tile.title} className="h-3.5 w-3.5" />
          </span>
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
