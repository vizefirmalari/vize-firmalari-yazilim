import Link from "next/link";
import { DestinationEditorialImage } from "@/components/home/destination-editorial-image";
import type { HomeLinkCard } from "@/lib/homepage/discovery-model";
import type { SpecializationKey } from "@/lib/constants/firm-specializations";

type SpecialtyVisual = {
  urls: readonly string[];
  gradient: string;
};

const u = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=900&q=80`;

const SPECIALTY_VISUALS: Record<SpecializationKey, SpecialtyVisual> = {
  schengen_expert: {
    urls: [u("photo-1454165804606-c3d57bc86b40"), u("photo-1450101499163-c8848c66ca85")],
    gradient: "bg-linear-to-br from-[#173a5a]/55 via-primary/38 to-secondary/30",
  },
  usa_visa_expert: {
    urls: [u("photo-1521791136064-7986c2920216"), u("photo-1552664730-d307ca884978")],
    gradient: "bg-linear-to-br from-[#1b2f4f]/58 via-primary/35 to-secondary/26",
  },
  student_visa_support: {
    urls: [u("photo-1523050854058-8df90110c9f1"), u("photo-1519452575417-564c1401ecc0")],
    gradient: "bg-linear-to-br from-[#1f3f62]/50 via-secondary/34 to-primary/30",
  },
  work_visa_support: {
    urls: [u("photo-1521737604893-d14cc237f11d"), u("photo-1552664730-d307ca884978")],
    gradient: "bg-linear-to-br from-[#18324f]/58 via-primary/36 to-secondary/28",
  },
  tourist_visa_support: {
    urls: [u("photo-1436491865332-7a61a109cc05"), u("photo-1476514525535-07fb3b4ae5f1")],
    gradient: "bg-linear-to-br from-[#1f4568]/45 via-secondary/30 to-primary/28",
  },
  business_visa_support: {
    urls: [u("photo-1486406146926-c627a92ad1ab"), u("photo-1460925895917-afdab827c52f")],
    gradient: "bg-linear-to-br from-[#1b3248]/60 via-primary/38 to-secondary/28",
  },
  family_reunion_support: {
    urls: [u("photo-1511895426328-dc8714191300"), u("photo-1511895426328-dc8714191300")],
    gradient: "bg-linear-to-br from-[#223a57]/52 via-primary/35 to-secondary/24",
  },
  appeal_support: {
    urls: [u("photo-1450101499163-c8848c66ca85"), u("photo-1589829545856-d10d557cf95f")],
    gradient: "bg-linear-to-br from-[#1b3046]/62 via-primary/40 to-secondary/30",
  },
};

function countLabel(n: number) {
  return n === 1 ? "1 firma" : `${n} firma`;
}

export function HomepageSpecialtyVisualGrid({ cards }: { cards: HomeLinkCard[] }) {
  if (!cards.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const key = card.specKey as SpecializationKey | undefined;
        const v =
          (key && SPECIALTY_VISUALS[key]) || {
            urls: [u("photo-1454165804606-c3d57bc86b40")],
            gradient: "bg-linear-to-br from-primary/55 via-primary/38 to-secondary/30",
          };

        return (
          <Link
            key={card.id}
            href={card.href}
            className="group relative flex min-h-40 overflow-hidden rounded-2xl shadow-[0_12px_28px_rgba(11,60,93,0.16)] ring-1 ring-white/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(11,60,93,0.22)]"
          >
            <DestinationEditorialImage
              urls={v.urls}
              gradientClassName={v.gradient}
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/72 via-black/32 to-black/14" aria-hidden />
            <div className="relative mt-auto p-4">
              <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-sm font-medium tabular-nums text-white/82">
                {countLabel(card.count)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
