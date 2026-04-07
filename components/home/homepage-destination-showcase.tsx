import Link from "next/link";
import { DestinationEditorialImage } from "@/components/home/destination-editorial-image";
import { DestinationFlagBadge } from "@/components/home/destination-flag-badge";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import type { DestinationSlide, HomeLinkCard } from "@/lib/homepage/discovery-model";
import { buildDestinationSlides } from "@/lib/homepage/discovery-model";
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

function DestinationLargeCard({ card }: { card: HomeLinkCard }) {
  const v = getDestinationVisual(card.id, card.title);
  return (
    <Link
      href={card.href}
      className="group relative flex h-46 w-[min(100%,16.5rem)] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl shadow-[0_14px_44px_rgba(11,60,93,0.2)] ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(11,60,93,0.28)] md:h-55 md:w-68"
    >
      <DestinationPhotoLayers
        imageUrls={v.imageUrls}
        gradientClassName={v.gradientClassName}
        tintClassName={v.tintClassName}
        sizes="(max-width: 768px) 280px, 360px"
      />
      <div className="absolute right-3 top-3 z-2 md:right-3.5 md:top-3.5">
        <DestinationFlagBadge iso={v.flagIso} title={card.title} size="lg" />
      </div>
      <div className="relative z-1 flex min-h-[44%] flex-col justify-end bg-linear-to-t from-black/60 via-black/25 to-transparent px-4 pb-4.5 pt-10 md:px-5 md:pb-5 md:pt-11">
        <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-white md:text-[1.22rem]">
          {card.title}
        </h3>
        <p className="mt-1 text-xs font-medium tabular-nums text-white/82 md:text-sm">
          {countLabel(card.count)}
        </p>
      </div>
    </Link>
  );
}

function DestinationSmallCard({ card }: { card: HomeLinkCard }) {
  const v = getDestinationVisual(card.id, card.title);
  return (
    <Link
      href={card.href}
      className="group relative flex h-30 w-full shrink-0 flex-col justify-end overflow-hidden rounded-2xl shadow-[0_8px_28px_rgba(11,60,93,0.16)] ring-1 ring-white/12 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(11,60,93,0.22)] md:h-32"
    >
      <DestinationPhotoLayers
        imageUrls={v.imageUrls}
        gradientClassName={v.gradientClassName}
        tintClassName={v.tintClassName}
        sizes="200px"
      />
      <div className="absolute right-2 top-2 z-2 md:right-2.5 md:top-2.5">
        <DestinationFlagBadge iso={v.flagIso} title={card.title} size="sm" />
      </div>
      <div className="relative z-1 flex min-h-[48%] flex-col justify-end bg-linear-to-t from-black/62 via-black/24 to-transparent px-3 pb-2.5 pt-8">
        <h3 className="line-clamp-2 text-xs font-bold leading-snug text-white md:text-sm">
          {card.title}
        </h3>
        <p className="mt-0.5 text-[10px] font-semibold tabular-nums text-white/80 md:text-[11px]">
          {countLabel(card.count)}
        </p>
      </div>
    </Link>
  );
}

function DestinationMediumCard({ card }: { card: HomeLinkCard }) {
  const v = getDestinationVisual(card.id, card.title);
  return (
    <Link
      href={card.href}
      className="group relative flex h-30 w-40 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl shadow-[0_10px_34px_rgba(11,60,93,0.18)] ring-1 ring-white/12 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(11,60,93,0.24)] md:h-32 md:w-44"
    >
      <DestinationPhotoLayers
        imageUrls={v.imageUrls}
        gradientClassName={v.gradientClassName}
        tintClassName={v.tintClassName}
        sizes="240px"
      />
      <div className="absolute right-2.5 top-2.5 z-2">
        <DestinationFlagBadge iso={v.flagIso} title={card.title} size="md" />
      </div>
      <div className="relative z-1 flex min-h-[50%] flex-col justify-end bg-linear-to-t from-black/60 via-black/22 to-transparent p-3.5 pt-9 md:p-4 md:pt-10">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">
          {card.title}
        </h3>
        <p className="mt-1 text-[11px] font-semibold tabular-nums text-white/85">
          {countLabel(card.count)}
        </p>
      </div>
    </Link>
  );
}

function LSlide({ cards }: { cards: HomeLinkCard[] }) {
  const [a, b, c] = [cards[0], cards[1], cards[2]];
  if (!a) return null;
  return (
    <div className="flex w-[min(calc(100vw-3rem),28.5rem)] shrink-0 snap-start flex-col gap-3.5 md:w-114 md:flex-row md:gap-4.5">
      <DestinationLargeCard card={a} />
      <div className="flex w-full min-w-0 flex-1 flex-row gap-3.5 md:w-36 md:flex-col md:justify-stretch md:gap-4.5">
        {b ? <DestinationSmallCard card={b} /> : null}
        {c ? <DestinationSmallCard card={c} /> : null}
      </div>
    </div>
  );
}

function PairSlide({ cards }: { cards: [HomeLinkCard, HomeLinkCard] }) {
  return (
    <div className="flex w-[min(calc(100vw-3rem),23.5rem)] shrink-0 snap-start gap-3.5 md:w-94 md:gap-4.5">
      <DestinationMediumCard card={cards[0]} />
      <DestinationMediumCard card={cards[1]} />
    </div>
  );
}

function destinationSlideKey(slide: DestinationSlide): string {
  if (slide.kind === "l") {
    return `l-${slide.cards.map((c) => c.id).join("-")}`;
  }
  const [x, y] = slide.cards;
  return `p-${x?.id ?? "a"}-${y?.id ?? "b"}`;
}

export function HomepageDestinationShowcase({
  cards,
}: {
  cards: HomeLinkCard[];
}) {
  const slides = buildDestinationSlides(cards);
  if (!slides.length) return null;
  return (
    <HomepageHorizontalScroller gapClass="gap-4 md:gap-5" snap>
      {slides.map((s) =>
        s.kind === "l" ? (
          <LSlide key={destinationSlideKey(s)} cards={s.cards} />
        ) : (
          <PairSlide key={destinationSlideKey(s)} cards={s.cards} />
        )
      )}
    </HomepageHorizontalScroller>
  );
}

