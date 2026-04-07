import Image from "next/image";
import Link from "next/link";
import type { HomeLinkCard } from "@/lib/homepage/discovery-model";
import { getCityVisual } from "@/lib/homepage/vitrin-assets";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
      }}
      aria-hidden
    />
  );
}

export function HomepageCityVitrinCard({ card }: { card: HomeLinkCard }) {
  const v = getCityVisual(card.title);
  return (
    <Link
      href={card.href}
      className="group relative flex h-[6.5rem] w-[8.75rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-border/60 shadow-[0_6px_22px_rgba(11,60,93,0.1)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_36px_rgba(11,60,93,0.14)] md:h-[7rem] md:w-[9.75rem]"
    >
      <Image
        src={v.imageUrl}
        alt=""
        fill
        sizes="160px"
        className="object-cover object-center scale-[1.1] blur-[2px] transition duration-500 group-hover:scale-[1.14] group-hover:blur-[1px]"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${v.accentClass} opacity-80`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/35 to-black/15"
        aria-hidden
      />
      <NoiseOverlay />
      <div className="relative px-3 pb-2.5 pt-4">
        <h3 className="truncate text-sm font-bold text-white drop-shadow-sm md:text-[0.9375rem]">
          {card.title}
        </h3>
        <p className="mt-0.5 truncate text-[11px] font-semibold tabular-nums text-white/85">
          {countLabel(card.count)}
        </p>
      </div>
    </Link>
  );
}
