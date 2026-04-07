import Link from "next/link";
import type { HomeLinkCard } from "@/lib/homepage/discovery-model";
import {
  SpecialtyVitrinIcon,
  VitrinIconGlobe,
} from "@/components/home/homepage-vitrin-icons";
import type { SpecializationKey } from "@/lib/constants/firm-specializations";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

export function HomepageSpecialtyVitrinCard({ card }: { card: HomeLinkCard }) {
  const key = card.specKey as SpecializationKey | undefined;
  return (
    <Link
      href={card.href}
      className="group relative flex min-h-38 w-46 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-background via-surface/70 to-background px-4.5 pb-4.5 pt-4.5 shadow-[0_10px_24px_rgba(11,60,93,0.08)] ring-1 ring-black/3 transition duration-300 hover:-translate-y-1 hover:border-primary/24 hover:shadow-[0_18px_38px_rgba(11,60,93,0.13)] hover:ring-primary/10 md:min-h-40 md:w-50 md:px-5 md:pb-5 md:pt-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(11,60,93,0.04), transparent 54%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 95% 72% at 28% 8%, rgba(50,140,193,0.16), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex-none">
          <span className="inline-flex w-fit -translate-y-0.5 rounded-[1.1rem] bg-linear-to-br from-primary/14 via-primary/9 to-secondary/10 p-3.5 text-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)] ring-1 ring-primary/14 transition duration-300 group-hover:scale-[1.04] group-hover:from-primary/18 group-hover:to-secondary/14 group-hover:ring-primary/20">
            {key ? (
              <SpecialtyVitrinIcon
                specKey={key}
                className="h-9 w-9 md:h-10 md:w-10"
              />
            ) : (
              <VitrinIconGlobe className="h-9 w-9 md:h-10 md:w-10" />
            )}
          </span>
        </div>

        <div className="mt-3.5 min-h-0 flex-1">
          <h3 className="line-clamp-2 text-[0.94rem] font-bold leading-snug tracking-tight text-primary md:text-base">
            {card.title}
          </h3>
        </div>

        <div className="pt-3">
          <p className="text-[11px] font-medium tabular-nums tracking-wide text-foreground/45">
            {countLabel(card.count)}
          </p>
        </div>
      </div>
    </Link>
  );
}
