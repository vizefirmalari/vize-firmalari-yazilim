import Link from "next/link";
import { DestinationEditorialImage } from "@/components/home/destination-editorial-image";
import { DestinationFlagBadge } from "@/components/home/destination-flag-badge";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import type { HomeLinkCard } from "@/lib/homepage/discovery-model";
import { getDestinationVisual } from "@/lib/homepage/vitrin-assets";

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
      }}
      aria-hidden
    />
  );
}

function DestinationPhotoLayers({
  imageUrls,
  gradientClassName,
  tintClassName,
  sizes,
}: {
  imageUrls: readonly string[];
  gradientClassName: string;
  tintClassName: string;
  sizes: string;
}) {
  return (
    <>
      <DestinationEditorialImage
        urls={imageUrls}
        gradientClassName={gradientClassName}
        sizes={sizes}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${tintClassName}`}
        aria-hidden
      />
      <NoiseOverlay />
    </>
  );
}

function DestinationGridCard({
  card,
  featured,
}: {
  card: HomeLinkCard;
  featured: boolean;
}) {
  const v = getDestinationVisual(card.id, card.title);
  const sizeClass = featured ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  const titleClass = featured
    ? "text-lg md:text-[1.22rem]"
    : "text-sm md:text-[0.95rem]";
  const metaClass = featured
    ? "text-xs md:text-sm"
    : "text-[11px]";

  return (
    <Link
      href={card.href}
      className={`group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(11,60,93,0.16)] ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(11,60,93,0.24)] ${sizeClass}`}
    >
      <DestinationPhotoLayers
        imageUrls={v.imageUrls}
        gradientClassName={v.gradientClassName}
        tintClassName={v.tintClassName}
        sizes={featured ? "(max-width: 768px) 320px, 560px" : "220px"}
      />
      <div className="absolute right-3 top-3 z-2">
        <DestinationFlagBadge iso={v.flagIso} title={card.title} size="md" />
      </div>
      <div className="relative z-1 flex min-h-[45%] flex-col justify-end bg-linear-to-t from-black/62 via-black/26 to-transparent p-4">
        <h3 className={`line-clamp-2 font-bold leading-tight tracking-tight text-white ${titleClass}`}>
          {card.title}
        </h3>
        <p className={`mt-1 font-medium tabular-nums text-white/82 ${metaClass}`}>
          {countLabel(card.count)}
        </p>
      </div>
    </Link>
  );
}

function DestinationGridPanel({ cards }: { cards: HomeLinkCard[] }) {
  const [a, b, c] = cards;
  if (!a) return null;
  return (
    <div className="grid w-[min(calc(100vw-3rem),40rem)] shrink-0 snap-start grid-cols-3 auto-rows-[7.5rem] gap-4 md:w-160 md:auto-rows-[8.5rem] md:gap-5">
      <DestinationGridCard card={a} featured />
      {b ? <DestinationGridCard card={b} featured={false} /> : null}
      {c ? <DestinationGridCard card={c} featured={false} /> : null}
    </div>
  );
}

function chunkDestinationPanels(cards: HomeLinkCard[]): HomeLinkCard[][] {
  if (!cards.length) return [];
  const out: HomeLinkCard[][] = [];
  for (let i = 0; i < cards.length; i += 3) {
    const slice = cards.slice(i, i + 3);
    if (slice.length) out.push(slice);
  }
  return out;
}

function panelKey(cards: HomeLinkCard[]): string {
  return cards.map((c) => c.id).join("-");
}

export function HomepageDestinationShowcase({
  cards,
}: {
  cards: HomeLinkCard[];
}) {
  const panels = chunkDestinationPanels(cards);
  if (!panels.length) return null;

  return (
    <HomepageHorizontalScroller gapClass="gap-4 md:gap-5" snap>
      {panels.map((p) => (
        <DestinationGridPanel key={panelKey(p)} cards={p} />
      ))}
    </HomepageHorizontalScroller>
  );
}

