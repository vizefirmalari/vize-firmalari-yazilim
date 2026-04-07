import type { SpecializationKey } from "@/lib/constants/firm-specializations";
import { SPECIALIZATION_LABELS } from "@/lib/constants/firm-specializations";
import type { FirmRow } from "@/lib/types/firm";
import {
  applyListingFilters,
  computeRangeBounds,
  createDefaultAppliedListingFilters,
  sortFirms,
  type AppliedListingFilters,
} from "@/lib/firma/listing-filters";

export type QuickDiscoverIconId =
  | "globe"
  | "flag"
  | "graduation"
  | "briefcase"
  | "home"
  | "badge"
  | "calendar"
  | "scales";

export type HomeQuickDiscoverItem = {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: QuickDiscoverIconId;
};

export type HomeLinkCard = {
  id: string;
  title: string;
  count: number;
  href: string;
  /** Hedef ülke kartı gradient döngüsü */
  paletteIndex?: number;
  specKey?: SpecializationKey;
};

export type HomeServiceTile = HomeLinkCard & { tileSize: "sm" | "md" };

const PRIORITY_CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Konya",
] as const;

const PRIORITY_CITY_SET = new Set<string>([...PRIORITY_CITIES]);

/** Popüler hedefler — keşfet motoru veya ülke kapsamı ile uyumlu */
const HOME_DESTINATIONS: Array<
  | { kind: "explore"; slug: string; title: string }
  | { kind: "countries"; title: string; countries: string[] }
> = [
  { kind: "explore", slug: "ingiltere-vizesi", title: "İngiltere" },
  {
    kind: "countries",
    title: "Almanya",
    countries: ["Almanya", "Germany", "Federal Almanya"],
  },
  { kind: "explore", slug: "abd-vizesi", title: "Amerika" },
  { kind: "explore", slug: "kanada-vizesi", title: "Kanada" },
  { kind: "explore", slug: "dubai-vizesi", title: "Dubai / BAE" },
  { kind: "explore", slug: "yunanistan-vizesi", title: "Yunanistan" },
  {
    kind: "countries",
    title: "Fransa",
    countries: ["Fransa", "France"],
  },
  {
    kind: "countries",
    title: "Hollanda",
    countries: ["Hollanda", "Netherlands", "Hollanda (Netherlands)"],
  },
  { kind: "explore", slug: "avustralya-vizesi", title: "Avustralya" },
];

const HOME_SPECIALTY_KEYS: readonly SpecializationKey[] = [
  "schengen_expert",
  "usa_visa_expert",
  "student_visa_support",
  "work_visa_support",
  "tourist_visa_support",
  "business_visa_support",
  "family_reunion_support",
  "appeal_support",
];

const HOME_MAIN_SERVICE_LABELS: readonly string[] = [
  "Vize Hizmeti",
  "Oturum",
  "Vatandaşlık",
  "Pasaport",
  "Evrak / Danışmanlık",
  "Randevu Hizmeti",
  "Tercüme",
  "Hukuki Danışmanlık",
  "Uzun dönemli / D tipi vizeler",
  "Yurtdışı Eğitim Danışmanlığı",
  "Başvuru Süreç Yönetimi",
  "Konsolosluk İşlemleri",
  "Göçmenlik Hukuku",
];

const QUICK_DISCOVER: HomeQuickDiscoverItem[] = [
  {
    id: "schengen",
    label: "Schengen Vizesi",
    shortLabel: "Schengen",
    href: "/?visaTypes=schengen_expert#firmalar",
    icon: "globe",
  },
  {
    id: "abd",
    label: "ABD Vizesi",
    shortLabel: "ABD",
    href: "/?visaTypes=usa_visa_expert#firmalar",
    icon: "flag",
  },
  {
    id: "ogrenci",
    label: "Öğrenci Vizesi",
    shortLabel: "Öğrenci",
    href: "/?visaTypes=student_visa_support#firmalar",
    icon: "graduation",
  },
  {
    id: "calisma",
    label: "Çalışma Vizesi",
    shortLabel: "Çalışma",
    href: "/?visaTypes=work_visa_support#firmalar",
    icon: "briefcase",
  },
  {
    id: "oturum",
    label: "Oturum",
    shortLabel: "Oturum",
    href: `/?mainServices=${encodeURIComponent("Oturum")}#firmalar`,
    icon: "home",
  },
  {
    id: "vatandaslik",
    label: "Vatandaşlık",
    shortLabel: "Vatandaşlık",
    href: `/?mainServices=${encodeURIComponent("Vatandaşlık")}#firmalar`,
    icon: "badge",
  },
  {
    id: "randevu",
    label: "Randevu Hizmeti",
    shortLabel: "Randevu",
    href: `/?mainServices=${encodeURIComponent("Randevu Hizmeti")}#firmalar`,
    icon: "calendar",
  },
  {
    id: "goc",
    label: "Göçmenlik Hukuku",
    shortLabel: "Göçmenlik Hukuku",
    href: `/?mainServices=${encodeURIComponent("Göçmenlik Hukuku")}#firmalar`,
    icon: "scales",
  },
];

/** Önce öncelikli etiketler (karışık boyutlu vitrin); kalanlar HOME_MAIN_SERVICE_LABELS sırasıyla eklenir */
const MAIN_SERVICE_VITRIN_PRIORITY = [
  "Oturum",
  "Vatandaşlık",
  "Randevu Hizmeti",
  "Evrak / Danışmanlık",
  "Tercüme",
  "Hukuki Danışmanlık",
  "Göçmenlik Hukuku",
  "Başvuru Süreç Yönetimi",
  "Konsolosluk İşlemleri",
] as const;

function countFiltered(
  firms: FirmRow[],
  patch: Partial<
    Pick<
      AppliedListingFilters,
      | "coverage"
      | "visaTypes"
      | "cities"
      | "mainServiceLabels"
      | "exploreFocusSlug"
    >
  >
): number {
  const bounds = computeRangeBounds(firms);
  const base = createDefaultAppliedListingFilters(bounds);
  return applyListingFilters(
    firms,
    { ...base, ...patch },
    bounds,
    ""
  ).length;
}

function destinationHref(
  d: (typeof HOME_DESTINATIONS)[number]
): string {
  if (d.kind === "explore") {
    return `/?hedef=${encodeURIComponent(d.slug)}#firmalar`;
  }
  return `/?countries=${d.countries.map((c) => encodeURIComponent(c)).join(",")}#firmalar`;
}

export function buildHomeQuickDiscoverItems(): HomeQuickDiscoverItem[] {
  return QUICK_DISCOVER;
}

/** Hedef ülke slider: her slaytta 1 büyük + 2 küçük kart */
export function chunkHomeDestinations(cards: HomeLinkCard[]): HomeLinkCard[][] {
  const chunks: HomeLinkCard[][] = [];
  for (let i = 0; i < cards.length; i += 3) {
    chunks.push(cards.slice(i, i + 3));
  }
  return chunks;
}

export type DestinationSlide =
  | { kind: "l"; cards: HomeLinkCard[] }
  | { kind: "pair"; cards: [HomeLinkCard, HomeLinkCard] };

/** L şekli (1+2) ve çift orta kart slaytları sırayla */
export function buildDestinationSlides(cards: HomeLinkCard[]): DestinationSlide[] {
  if (!cards.length) return [];
  const out: DestinationSlide[] = [];
  let i = 0;
  let useL = true;
  while (i < cards.length) {
    const remaining = cards.length - i;
    if (useL) {
      // 2 kart kaldıysa L yerleşimi altta boşluk üretir; çift slayta düş.
      if (remaining === 2) {
        const a = cards[i];
        const b = cards[i + 1];
        if (a && b) {
          out.push({ kind: "pair", cards: [a, b] });
          i += 2;
          useL = !useL;
          continue;
        }
      }
      const group = cards.slice(i, Math.min(i + 3, cards.length));
      if (group.length) out.push({ kind: "l", cards: group });
      i += group.length;
    } else {
      const a = cards[i];
      const b = cards[i + 1];
      if (a && b) {
        out.push({ kind: "pair", cards: [a, b] });
        i += 2;
      } else if (a) {
        out.push({ kind: "l", cards: [a] });
        i += 1;
      } else break;
    }
    useL = !useL;
  }
  return out;
}

export function buildHomeDestinationCards(firms: FirmRow[]): HomeLinkCard[] {
  const out: HomeLinkCard[] = [];
  for (const d of HOME_DESTINATIONS) {
    let count = 0;
    if (d.kind === "explore") {
      count = countFiltered(firms, { exploreFocusSlug: d.slug });
    } else {
      count = countFiltered(firms, {
        coverage: { visaRegionLabels: [], countries: [...d.countries] },
      });
    }
    if (count < 1) continue;
    out.push({
      id: d.kind === "explore" ? d.slug : `c-${d.title}`,
      title: d.title,
      count,
      href: destinationHref(d),
      paletteIndex: out.length % 5,
    });
  }
  return out;
}

export function buildHomeCityCards(firms: FirmRow[]): HomeLinkCard[] {
  const byCity = new Map<string, number>();
  for (const f of firms) {
    const c = f.city?.trim();
    if (!c) continue;
    byCity.set(c, (byCity.get(c) ?? 0) + 1);
  }

  const ordered: HomeLinkCard[] = [];
  for (const label of PRIORITY_CITIES) {
    const n = byCity.get(label) ?? 0;
    if (n < 1) continue;
    ordered.push({
      id: `city-${label}`,
      title: label,
      count: n,
      href: `/?cities=${encodeURIComponent(label)}#firmalar`,
    });
  }

  const rest = [...byCity.entries()]
    .filter(([k]) => !PRIORITY_CITY_SET.has(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([title, count]) => ({
      id: `city-${title}`,
      title,
      count,
      href: `/?cities=${encodeURIComponent(title)}#firmalar`,
    }));

  return [...ordered, ...rest].slice(0, 14);
}

export function buildHomeSpecialtyCards(firms: FirmRow[]): HomeLinkCard[] {
  const out: HomeLinkCard[] = [];
  for (const key of HOME_SPECIALTY_KEYS) {
    const count = countFiltered(firms, { visaTypes: [key] });
    if (count < 1) continue;
    out.push({
      id: `spec-${key}`,
      title: SPECIALIZATION_LABELS[key],
      count,
      href: `/?visaTypes=${key}#firmalar`,
      specKey: key,
    });
  }
  return out;
}

export function buildHomeMainServiceCards(firms: FirmRow[]): HomeLinkCard[] {
  const out: HomeLinkCard[] = [];
  for (const label of HOME_MAIN_SERVICE_LABELS) {
    const count = countFiltered(firms, { mainServiceLabels: [label] });
    if (count < 1) continue;
    out.push({
      id: `svc-${label}`,
      title: label,
      count,
      href: `/?mainServices=${encodeURIComponent(label)}#firmalar`,
    });
  }
  return out;
}

export function buildHomeMainServiceTiles(firms: FirmRow[]): HomeServiceTile[] {
  const seen = new Set<string>();
  const tiles: HomeServiceTile[] = [];

  const pushTile = (label: string, displayTitle?: string) => {
    const count = countFiltered(firms, { mainServiceLabels: [label] });
    if (count < 1) return;
    if (seen.has(label)) return;
    seen.add(label);
    tiles.push({
      id: `svc-${label}`,
      title: displayTitle ?? label,
      count,
      href: `/?mainServices=${encodeURIComponent(label)}#firmalar`,
      tileSize: "md",
    });
  };

  for (const label of MAIN_SERVICE_VITRIN_PRIORITY) {
    pushTile(label);
  }

  for (const label of HOME_MAIN_SERVICE_LABELS) {
    if (!seen.has(label)) pushTile(label);
  }

  return tiles;
}

export function getFeaturedFirmsForHome(
  firms: FirmRow[],
  limit = 10
): FirmRow[] {
  const sorted = sortFirms([...firms], "corp_desc");
  return sorted.slice(0, limit);
}
