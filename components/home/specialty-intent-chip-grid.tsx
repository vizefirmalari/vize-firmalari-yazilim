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

export function SpecialtyIntentChipGrid({ cards }: { cards: HomeLinkCard[] }) {
  if (!cards.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const key = card.specKey as SpecializationKey | undefined;
        return (
          <Link
            key={card.id}
            href={card.href}
            className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-border/70 bg-linear-to-r from-background via-surface/65 to-background px-3.5 py-2.5 shadow-[0_2px_10px_rgba(11,60,93,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/26 hover:bg-primary/4 hover:shadow-[0_8px_18px_rgba(11,60,93,0.1)]"
          >
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background/90 text-primary">
              {key ? (
                <SpecialtyVitrinIcon specKey={key} className="h-3.5 w-3.5" />
              ) : (
                <VitrinIconGlobe className="h-3.5 w-3.5" />
              )}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">
              {card.title}
            </span>
            <span className="shrink-0 text-[11px] font-medium tabular-nums text-foreground/50">
              {countLabel(card.count)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
