import Link from "next/link";
import type { HomeServiceTile } from "@/lib/homepage/discovery-model";
import { ServiceVitrinIcon } from "@/components/home/homepage-vitrin-icons";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

export function HomepageServiceVitrinCard({ tile }: { tile: HomeServiceTile }) {
  return (
    <Link
      href={tile.href}
      className="group relative flex h-38 w-50 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border/90 bg-linear-to-br from-primary/12 via-background to-primary/8 px-4.5 pb-5 pt-4.5 shadow-[0_10px_30px_rgba(11,60,93,0.12)] ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:border-primary/34 hover:shadow-[0_18px_44px_rgba(11,60,93,0.18)] hover:ring-primary/14 md:h-40 md:w-53 md:px-5 md:pb-5.5 md:pt-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 110% 78% at 80% -2%, rgba(11, 60, 93, 0.14), transparent 62%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(11,60,93,0.06) 0 1px, transparent 1px 9px), linear-gradient(180deg, rgba(11,60,93,0.06), rgba(11,60,93,0) 56%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-background/70 to-transparent"
        aria-hidden
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex-none">
          <span className="inline-flex w-fit rounded-xl bg-primary/16 p-3 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-primary/20 transition duration-300 group-hover:scale-[1.04] group-hover:bg-primary/20 group-hover:ring-primary/28">
            <ServiceVitrinIcon title={tile.title} className="h-8 w-8 md:h-9 md:w-9" />
          </span>
        </div>

        <div className="mt-3.5 min-h-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-primary md:text-[0.96rem]">
            {tile.title}
          </h3>
        </div>

        <div className="pt-3.5">
          <p className="text-[11px] font-semibold tabular-nums tracking-wide text-foreground/45">
            {countLabel(tile.count)}
          </p>
        </div>
      </div>
    </Link>
  );
}

