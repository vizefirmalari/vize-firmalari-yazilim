"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  flagUrlForIso,
  getCountryFlagCodeFromName,
} from "@/lib/firma/country-flag";
import {
  allIntentItems,
  displayIntentLabel,
  findIntentItemByLabel,
  intentClusterByKey,
  SERVICE_INTENT_CLUSTERS,
  type IntentMatchItem,
} from "@/lib/quick-apply/service-intent-map";
import { slugify } from "@/lib/slug";

export type SmartDiscoveryVisaOption = {
  value: string;
  label: string;
};

export type SmartDiscoveryTrustState = {
  google: boolean;
  tax: boolean;
  office: boolean;
  officeVerified: boolean;
  online: boolean;
  corpHigh: boolean;
  active: boolean;
};

export type SmartDiscoveryInitialState = {
  countries: string[];
  visaTypes: string[];
  mainServices: string[];
  trust: SmartDiscoveryTrustState;
};

type IntentOption = {
  id: string;
  slug: string;
  icon: string;
  label: string;
  description: string;
  subTypeTitle: string;
  subTypeLabels: string[];
  mainServiceNeedles: string[];
  firmTypeNeedles: string[];
  recommendedCountryNeedles?: string[];
  defaultVisaType?: string;
};

type FloatingPosition = {
  top: number;
  left: number;
  width: number;
};

type DiscoverySubTypeOption = SmartDiscoveryVisaOption & {
  filterType: IntentMatchItem["type"];
};

export const LEGACY_INTENTS: IntentOption[] = [
  {
    id: "visa-services",
    slug: "vize-hizmetleri",
    icon: "🛂",
    label: "Vize Hizmetleri",
    description: "Schengen, ülke vizeleri ve kısa süreli başvuru süreçleri",
    subTypeTitle: "Hizmet türü",
    subTypeLabels: [
      "Schengen Vizesi",
      "ABD Vizesi",
      "Kanada Vizesi",
      "İngiltere Vizesi",
      "Dubai Vizesi",
      "Turistik Vize",
      "İş / Ticari Vize",
      "Eğitim Vizesi",
      "Erasmus Vizesi",
      "Transit Vizesi",
      "Fuar Vizesi",
      "Konferans Vizesi",
      "Ziyaret Vizesi",
      "Diplomatik Vize",
      "E-Vize",
      "Sporcu Vizesi",
      "Sanatçı Vizesi",
      "Tır Şoförü Vizesi",
      "Akraba Ziyareti Vizesi",
    ],
    mainServiceNeedles: [
      "başvuru",
      "basvuru",
      "konsolosluk",
      "randevu",
      "dosya",
      "rezervasyon",
      "seyahat sağlık",
      "seyahat saglik",
      "transfer",
    ],
    firmTypeNeedles: ["vize", "danışmanlık", "danismanlik"],
  },
  {
    id: "migration-residence",
    slug: "goc-ve-oturum-hizmetleri",
    icon: "⌂",
    label: "Göç ve Oturum Hizmetleri",
    description: "Oturum, ikamet, aile birleşimi ve yerleşim süreçleri",
    subTypeTitle: "Oturum / göç türü",
    subTypeLabels: [
      "Oturum",
      "Çalışma İzni",
      "Uzun Dönemli / D Tipi Vizeler",
      "Aile Birleşimi",
      "Aile Birleşimi Oturumu",
      "Evlilik Oturumu",
      "Emeklilik Oturumu",
      "Soy Bağları Oturumu",
      "İş / Şirket Temsilcilik Oturumu",
      "Oturum Hizmetleri",
      "Göç ve Entegrasyon Danışmanlığı",
      "Nitelikli İşçi Göçü",
    ],
    mainServiceNeedles: [
      "hukuki",
      "avukat",
      "konsolosluk yaz",
      "dosya",
      "ön onay",
      "on onay",
      "oturum",
      "göç",
      "goc",
    ],
    firmTypeNeedles: ["göç", "goc", "oturum", "ikamet", "vize", "hukuk"],
  },
  {
    id: "citizenship-golden",
    slug: "vatandaslik-ve-golden-visa",
    icon: "◆",
    label: "Vatandaşlık ve Golden Visa",
    description: "Yatırım yoluyla oturum, vatandaşlık ve Golden Visa süreçleri",
    subTypeTitle: "Vatandaşlık / yatırım türü",
    subTypeLabels: [
      "Golden Visa",
      "Yunanistan Golden Visa",
      "Yatırım Yoluyla Vatandaşlık",
      "Yatırım Yoluyla Oturum",
      "Soy Bağı ile Vatandaşlık",
      "Vatandaşlık Hizmetleri",
    ],
    mainServiceNeedles: [
      "yatırım göç",
      "yatirim goc",
      "gayrimenkul",
      "emlak",
      "şirket",
      "sirket",
      "hukuki",
      "yatırım",
      "yatirim",
    ],
    firmTypeNeedles: ["vatandaş", "vatandas", "golden", "yatırım", "yatirim", "oturum", "emlak"],
    recommendedCountryNeedles: [
      "Portekiz",
      "Yunanistan",
      "Malta",
      "İspanya",
      "İtalya",
      "Dubai",
      "Amerika",
      "Kanada",
    ],
  },
  {
    id: "education-abroad",
    slug: "yurtdisi-egitim",
    icon: "🎓",
    label: "Yurtdışı Eğitim",
    description: "Okul kabulü, eğitim danışmanlığı ve öğrenci vizesi",
    subTypeTitle: "Eğitim süreci",
    subTypeLabels: [
      "Öğrenci Vizesi",
      "Eğitim Vizesi",
      "Erasmus Vizesi",
      "Yurtdışı Eğitim Danışmanlığı",
      "Almanya Eğitim Danışmanlığı",
    ],
    mainServiceNeedles: [
      "dil sınav",
      "dil sinav",
      "dil sertifika",
      "konaklama",
      "başvuru",
      "basvuru",
      "eğitim",
      "egitim",
    ],
    firmTypeNeedles: ["eğitim", "egitim", "öğrenci", "ogrenci", "göç", "goc"],
  },
  {
    id: "career-work",
    slug: "uluslararasi-kariyer-ve-calisma",
    icon: "💼",
    label: "Uluslararası Kariyer ve Çalışma",
    description: "Çalışma vizesi, iş yerleştirme ve kariyer süreçleri",
    subTypeTitle: "Kariyer / çalışma türü",
    subTypeLabels: [
      "Çalışma Vizesi",
      "Freelancer Vizesi",
      "Startup Vizesi",
      "Girişimci Vizesi",
      "Nitelikli İşçi Yerleştirme",
      "Nitelikli İşçi Göçü",
      "Sağlık Çalışanı Yerleştirme",
      "Sağlık Sektörü İş Yerleştirme",
      "Uluslararası Kariyer Danışmanlığı",
      "Tır Şoförü Vizesi",
    ],
    mainServiceNeedles: [
      "çalışma izni",
      "calisma izni",
      "iş kurma",
      "is kurma",
      "iş geliştirme",
      "is gelistirme",
      "hibe",
      "teşvik",
      "tesvik",
      "kariyer",
    ],
    firmTypeNeedles: ["çalışma", "calisma", "kariyer", "insan kaynak", "göç", "goc"],
  },
  {
    id: "company-investment",
    slug: "sirket-kurulumu-ve-yatirim",
    icon: "▦",
    label: "Şirket Kurulumu ve Yatırım",
    description: "Yurtdışı şirket, yatırım ve ticari yapılanma danışmanlığı",
    subTypeTitle: "Şirket / yatırım süreci",
    subTypeLabels: [
      "Şirket Kurulumu",
      "İş Kurma Danışmanlığı",
      "İş Geliştirme Danışmanlığı",
      "Yatırım Danışmanlığı",
      "Hibe ve Teşvik Danışmanlığı",
    ],
    mainServiceNeedles: [
      "hukuki",
      "vergi",
      "finans",
      "şirket temsilcilik",
      "sirket temsilcilik",
      "şirket",
      "sirket",
      "yatırım",
      "yatirim",
    ],
    firmTypeNeedles: ["şirket", "sirket", "yatırım", "yatirim", "ticari"],
  },
  {
    id: "legal-official",
    slug: "hukuki-ve-resmi-surecler",
    icon: "⚖",
    label: "Hukuki ve Resmi Süreçler",
    description: "İtiraz, red sonrası, denklik ve resmi belge süreçleri",
    subTypeTitle: "Hukuki / resmi süreç",
    subTypeLabels: [
      "Hukuki Danışmanlık",
      "Göçmenlik Hukuku",
      "Avukat Desteği",
      "Yeminli Tercüman",
      "Tercüme",
      "Mesleki Denklik",
    ],
    mainServiceNeedles: [
      "konsolosluk yaz",
      "dosya",
      "ön onay",
      "on onay",
      "hukuk",
      "tercüme",
      "tercume",
      "denklik",
    ],
    firmTypeNeedles: ["hukuk", "itiraz", "danışmanlık", "danismanlik", "resmi"],
  },
  {
    id: "tourism-travel",
    slug: "turizm-ve-seyahat",
    icon: "✈",
    label: "Turizm ve Seyahat",
    description: "Turistik vize, seyahat planı ve kısa süreli başvurular",
    subTypeTitle: "Turizm / seyahat türü",
    subTypeLabels: [
      "Otobüslü Avrupa Turları",
      "Balkan Turları",
      "Gemi Turları",
      "Kültür Turları",
      "Asya Turları",
      "Vizesiz Turlar",
      "Yurtiçi ve Yurtdışı Tur Programları",
      "Otel Tatilleri",
    ],
    mainServiceNeedles: [
      "uçak bileti",
      "ucak bileti",
      "transfer",
      "konaklama",
      "seyahat sağlık",
      "seyahat saglik",
      "turizm",
      "seyahat",
    ],
    firmTypeNeedles: ["turizm", "seyahat", "vize", "danışmanlık", "danismanlik"],
  },
  {
    id: "consular-operations",
    slug: "konsolosluk-ve-operasyon-hizmetleri",
    icon: "◎",
    label: "Konsolosluk ve Operasyon Hizmetleri",
    description: "Randevu, evrak, başvuru takibi ve konsolosluk operasyonları",
    subTypeTitle: "Operasyon hizmeti",
    subTypeLabels: [
      "Başvuru Süreç Yönetimi",
      "Dosya Hizmeti",
      "Randevu Hizmeti",
      "Konsolosluk İşlemleri",
      "Konsolosluk Yazıları",
      "Ön Onay İşlemleri",
      "Pasaport",
      "Evrak / Danışmanlık",
    ],
    mainServiceNeedles: ["konsolosluk", "randevu", "evrak", "operasyon", "başvuru", "basvuru", "dosya", "pasaport"],
    firmTypeNeedles: ["konsolosluk", "operasyon", "vize", "danışmanlık", "danismanlik"],
  },
];

const INTENTS: IntentOption[] = SERVICE_INTENT_CLUSTERS.map((cluster) => ({
  id: cluster.key,
  slug: cluster.key,
  icon: cluster.icon,
  label: cluster.title,
  description: cluster.shortDescription,
  subTypeTitle: cluster.secondStepLabel,
  subTypeLabels: allIntentItems(cluster).map((item) => item.label),
  mainServiceNeedles: [],
  firmTypeNeedles: [],
  recommendedCountryNeedles: cluster.recommendedCountries,
}));

function normalize(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/[^a-z0-9]+/g, "");
}

function optionMatchesNeedles(label: string, needles: string[]): boolean {
  if (!needles.length) return true;
  const haystack = normalize(label);
  return needles.some((needle) => {
    const want = normalize(needle);
    return haystack.includes(want) || want.includes(haystack);
  });
}

function intentFromInitialVisaType(visaType: string): string {
  const builtInIntentMap: Record<string, string> = {
    schengen_expert: "visa-services",
    usa_visa_expert: "visa-services",
    tourist_visa_support: "visa-services",
    family_reunion_support: "migration-residence",
    student_visa_support: "study-abroad",
    work_visa_support: "international-career",
    business_visa_support: "company-investment",
    appeal_support: "legal-official",
  };
  if (builtInIntentMap[visaType]) return builtInIntentMap[visaType];

  const optionLabel = visaType.replace(/-/g, " ");
  const labelHit = INTENTS.find((intent) =>
    intent.subTypeLabels.some((label) => optionMatchesNeedles(label, [optionLabel]))
  );
  return labelHit?.id ?? "visa-services";
}

function flagCode(countryName: string): string | null {
  return getCountryFlagCodeFromName(countryName);
}

function FlagMark({ countryName, className = "h-5 w-7" }: { countryName: string; className?: string }) {
  const code = flagCode(countryName);
  if (!code) {
    const fallback = countryName.trim().slice(0, 2).toLocaleUpperCase("tr") || "??";
    return (
      <span className={`${className} inline-flex items-center justify-center rounded-md bg-primary/8 text-[10px] font-bold text-primary`}>
        {fallback}
      </span>
    );
  }
  return (
    <img
      src={flagUrlForIso(code, 40)}
      alt=""
      width={40}
      height={28}
      loading="lazy"
      decoding="async"
      className={`${className} rounded-md object-cover ring-1 ring-black/8`}
    />
  );
}

function buildSubTypeOptions(
  items: IntentMatchItem[],
  options: SmartDiscoveryVisaOption[]
): DiscoverySubTypeOption[] {
  const byValue = new Map<string, DiscoverySubTypeOption>();
  const exactOptions = new Map<string, SmartDiscoveryVisaOption>();
  for (const option of options) {
    const key = normalize(option.label);
    if (!exactOptions.has(key)) exactOptions.set(key, option);
  }

  for (const item of items) {
    const label = displayIntentLabel(item.label);
    const exact = item.type === "expertise" ? exactOptions.get(normalize(label)) : null;
    const option: DiscoverySubTypeOption = exact
      ? { ...exact, label, filterType: item.type }
      : {
          value: item.type === "expertise" ? slugify(label) : label,
          label,
          filterType: item.type,
        };
    if (!byValue.has(option.value)) byValue.set(option.value, option);
  }

  return [...byValue.values()];
}

function FloatingLayer({
  anchor,
  open,
  onClose,
  children,
}: {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: (position: FloatingPosition) => ReactNode;
}) {
  const [position, setPosition] = useState<FloatingPosition | null>(null);

  const update = useCallback(() => {
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const gap = 12;
    const width = Math.min(Math.max(rect.width, 320), viewportWidth - gap * 2);
    const left = Math.min(Math.max(rect.left, gap), viewportWidth - width - gap);
    setPosition({
      top: rect.bottom + 8,
      left,
      width,
    });
  }, [anchor]);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, update]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  if (!open || !position) return null;

  return createPortal(children(position), document.body);
}

export function SmartVisaDiscoveryEngine({
  countryOptions,
  visaTypeOptions,
  initialState,
}: {
  countryOptions: string[];
  visaTypeOptions: SmartDiscoveryVisaOption[];
  initialState?: SmartDiscoveryInitialState;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const intentButtonRef = useRef<HTMLButtonElement | null>(null);
  const subTypeButtonRef = useRef<HTMLButtonElement | null>(null);
  const countryButtonRef = useRef<HTMLButtonElement | null>(null);
  const initialServiceType = initialState?.visaTypes[0] ?? initialState?.mainServices[0] ?? "";
  const [intentId, setIntentId] = useState<string>(intentFromInitialVisaType(initialServiceType));
  const [selectedServiceType, setSelectedServiceType] = useState(initialServiceType);
  const [country, setCountry] = useState(initialState?.countries[0] ?? "");
  const [countryQuery, setCountryQuery] = useState(initialState?.countries[0] ?? "");
  const [intentOpen, setIntentOpen] = useState(false);
  const [subTypeOpen, setSubTypeOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const selectedIntent = INTENTS.find((item) => item.id === intentId) ?? INTENTS[0];
  const selectedIntentCluster =
    intentClusterByKey(selectedIntent.id) ?? SERVICE_INTENT_CLUSTERS[0];
  const selectedIntentItems = useMemo(
    () => allIntentItems(selectedIntentCluster),
    [selectedIntentCluster]
  );

  const orderedCountries = useMemo(() => {
    const source = selectedIntent.recommendedCountryNeedles;
    if (!source?.length) return countryOptions;
    const recommended = countryOptions.filter((countryName) =>
      source.some((needle) => optionMatchesNeedles(countryName, [needle]))
    );
    const recommendedSet = new Set(recommended);
    const rest = countryOptions.filter((countryName) => !recommendedSet.has(countryName));
    return [...recommended, ...rest];
  }, [countryOptions, selectedIntent.recommendedCountryNeedles]);

  const visibleCountries = useMemo(() => {
    const q = normalize(countryQuery);
    if (!q) return orderedCountries;
    return orderedCountries.filter((item) => normalize(item).includes(q));
  }, [countryQuery, orderedCountries]);

  const subTypeOptions = useMemo(() => {
    return buildSubTypeOptions(selectedIntentItems, visaTypeOptions);
  }, [selectedIntentItems, visaTypeOptions]);

  const showSubType = subTypeOptions.length > 0;
  const selectedSubTypeLabel =
    subTypeOptions.find((option) => option.value === selectedServiceType)?.label ??
    "";
  const subTypeTitle = selectedIntent.subTypeTitle;
  const subTypePlaceholder = selectedIntentCluster.secondStepPlaceholder;

  useEffect(() => {
    const next = country.trim();
    if (!next) return;
    if (orderedCountries.some((item) => optionMatchesNeedles(item, [next]))) return;
    setCountry("");
    setCountryQuery("");
  }, [country, orderedCountries]);

  useEffect(() => {
    if (!intentOpen && !subTypeOpen && !countryOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      const el = target instanceof Element ? target : null;
      if (el?.closest("[data-smart-discovery-popover='true']")) return;
      setIntentOpen(false);
      setSubTypeOpen(false);
      setCountryOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [countryOpen, intentOpen, subTypeOpen]);

  const chooseIntent = (nextIntentId: string) => {
    const nextIntent = INTENTS.find((item) => item.id === nextIntentId) ?? INTENTS[0];
    setIntentId(nextIntent.id);
    setSelectedServiceType("");
    setCountry("");
    setCountryQuery("");
    setIntentOpen(false);
    const needsSubType = nextIntent.subTypeLabels.length > 0;
    setSubTypeOpen(needsSubType);
    setCountryOpen(!needsSubType);
  };

  const chooseCountry = (nextCountry: string) => {
    setCountry(nextCountry);
    setCountryQuery(nextCountry);
    setCountryOpen(false);
  };

  const resultHref = useMemo(() => {
    const next = new URLSearchParams();

    const resolvedCountry = country.trim() || countryQuery.trim();
    if (resolvedCountry) next.set("countries", resolvedCountry);

    const selectedOption = subTypeOptions.find((item) => item.value === selectedServiceType);
    if (selectedOption) {
      const target = findIntentItemByLabel(selectedOption.label);
      const filterType = target?.item.type ?? selectedOption.filterType;
      if (filterType === "expertise") {
        next.set("visaTypes", selectedOption.value);
      } else {
        next.set("mainServices", selectedOption.label);
      }
    }

    const qs = next.toString();
    return qs ? `/eslesme?${qs}` : "/eslesme";
  }, [country, countryQuery, selectedServiceType, subTypeOptions]);

  return (
    <section className="container-shell -mt-5 pb-7 lg:-mt-7 lg:pb-9" aria-labelledby="smart-discovery-title">
      <div ref={rootRef} className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl border border-border/80 bg-white/95 p-3 shadow-[0_18px_55px_rgba(11,60,93,0.12)] ring-1 ring-white/80 backdrop-blur sm:p-4 lg:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="relative min-w-0 flex-1">
              <div className="px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/48">
                  Ne yapmak istiyorsunuz?
                </span>
                <p className="mt-0.5 text-xs font-medium text-foreground/45">
                  Size en uygun uzman firma türünü eşleştirelim.
                </p>
              </div>
              <button
                ref={intentButtonRef}
                type="button"
                onClick={() => {
                  setIntentOpen((value) => !value);
                  setSubTypeOpen(false);
                  setCountryOpen(false);
                }}
                className="mt-2 flex h-15 w-full items-center gap-3 rounded-2xl border border-border bg-background px-4 text-left outline-none transition hover:bg-primary/4 focus:border-primary/25 focus:ring-2 focus:ring-secondary/20"
                aria-expanded={intentOpen}
                aria-haspopup="listbox"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/12 to-secondary/12 text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  {selectedIntent.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-bold text-primary">
                    {selectedIntent.label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-foreground/50">
                    {selectedIntent.description}
                  </span>
                </span>
              </button>
            </div>

            {showSubType ? (
              <div className="relative min-w-0 flex-1">
                <div className="px-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/48">
                    {subTypeTitle}
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-foreground/45">
                    İhtiyacınıza en yakın alt hizmeti seçin.
                  </p>
                </div>
                <button
                  ref={subTypeButtonRef}
                  type="button"
                  onClick={() => {
                    setSubTypeOpen((value) => !value);
                    setIntentOpen(false);
                    setCountryOpen(false);
                  }}
                  className="mt-2 flex h-15 w-full items-center gap-3 rounded-2xl border border-border bg-background px-4 text-left outline-none transition hover:bg-primary/4 focus:border-primary/25 focus:ring-2 focus:ring-secondary/20"
                  aria-expanded={subTypeOpen}
                  aria-haspopup="listbox"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-secondary/12 to-primary/10 text-sm font-bold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    VF
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-bold text-primary">
                      {selectedSubTypeLabel || subTypePlaceholder}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-medium text-foreground/50">
                      Seçim mevcut filtre sistemine aktarılır
                    </span>
                  </span>
                </button>
              </div>
            ) : null}

            <div className="relative min-w-0 flex-1">
              <div className="px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/48">
                  Hedef ülke
                </span>
                <p className="mt-0.5 text-xs font-medium text-foreground/45">
                  İşleme göre önerilen ülkelerden seçin.
                </p>
              </div>
              <button
                ref={countryButtonRef}
                type="button"
                onClick={() => {
                  setCountryOpen((value) => !value);
                  setIntentOpen(false);
                  setSubTypeOpen(false);
                }}
                className="mt-2 flex h-15 w-full items-center gap-3 rounded-2xl border border-border bg-background px-4 text-left outline-none transition hover:bg-primary/4 focus:border-primary/25 focus:ring-2 focus:ring-secondary/20"
                aria-expanded={countryOpen}
                aria-haspopup="listbox"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/8">
                  {country ? <FlagMark countryName={country} className="h-6 w-8 rounded-lg" /> : <span className="text-primary/60">⌕</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-bold text-primary">
                    {country || "Ülke seçin"}
                  </span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-foreground/50">
                    {selectedIntentCluster.countryPlaceholder}
                  </span>
                </span>
              </button>
            </div>

            <a
              href={resultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-15 shrink-0 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_100%] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-position-[100%_0] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 lg:min-w-58"
            >
              Bana Uygun Firmaları Bul
            </a>
          </div>

        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-foreground/48">
          <span className="rounded-full border border-border/70 bg-white/80 px-3 py-1 shadow-[0_4px_14px_rgba(11,60,93,0.04)]">
            Google puanı entegrasyonu
          </span>
          <span className="rounded-full border border-border/70 bg-white/80 px-3 py-1 shadow-[0_4px_14px_rgba(11,60,93,0.04)]">
            Kurumsallık skoru
          </span>
          <span className="rounded-full border border-border/70 bg-white/80 px-3 py-1 shadow-[0_4px_14px_rgba(11,60,93,0.04)]">
            Doğrulanmış firma profilleri
          </span>
        </div>

        <h2 id="smart-discovery-title" className="sr-only">
          Akıllı Vize ve Danışmanlık Başlangıç Motoru
        </h2>
      </div>

      <FloatingLayer
        anchor={intentButtonRef.current}
        open={intentOpen}
        onClose={() => setIntentOpen(false)}
      >
        {(position) => (
          <div
            data-smart-discovery-popover="true"
            role="listbox"
            className="fixed z-9999 max-h-[min(27rem,calc(100vh-2rem))] overflow-y-auto rounded-2xl border border-border bg-white/98 p-2 shadow-[0_22px_64px_rgba(11,60,93,0.22)] ring-1 ring-black/5 backdrop-blur-md animate-in fade-in slide-in-from-top-1"
            style={{ top: position.top, left: position.left, width: position.width }}
          >
            {INTENTS.map((intent) => {
              const active = intent.id === intentId;
              return (
                <button
                  key={intent.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => chooseIntent(intent.id)}
                  className={`group flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? "border-primary/20 bg-primary/8 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_10px_24px_rgba(11,60,93,0.08)]"
                      : "border-transparent text-foreground/78 hover:border-primary/10 hover:bg-primary/4 hover:shadow-[0_8px_22px_rgba(11,60,93,0.06)]"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-secondary/12 text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition group-hover:scale-[1.03]">
                    {intent.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{intent.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-foreground/55">
                      {intent.description}
                    </span>
                  </span>
                  {active ? (
                    <span className="mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      Seçili
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </FloatingLayer>

      <FloatingLayer
        anchor={subTypeButtonRef.current}
        open={subTypeOpen}
        onClose={() => setSubTypeOpen(false)}
      >
        {(position) => (
          <div
            data-smart-discovery-popover="true"
            role="listbox"
            className="fixed z-9999 max-h-[min(24rem,calc(100vh-2rem))] overflow-y-auto rounded-2xl border border-border bg-white/98 p-2 shadow-[0_22px_64px_rgba(11,60,93,0.22)] ring-1 ring-black/5 backdrop-blur-md animate-in fade-in slide-in-from-top-1"
            style={{ top: position.top, left: position.left, width: position.width }}
          >
            {subTypeOptions.map((option) => {
              const active = option.value === selectedServiceType;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedServiceType(option.value);
                    setSubTypeOpen(false);
                    setCountryOpen(true);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? "border-primary/20 bg-primary/8 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_10px_24px_rgba(11,60,93,0.08)]"
                      : "border-transparent text-foreground/78 hover:border-primary/10 hover:bg-primary/4 hover:shadow-[0_8px_22px_rgba(11,60,93,0.06)]"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-secondary/12 text-xs font-bold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    VF
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{option.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-foreground/52">
                      {option.filterType === "expertise" ? "Uzmanlık filtresi" : "Hizmet filtresi"}
                    </span>
                  </span>
                  {active ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      Seçili
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </FloatingLayer>

      <FloatingLayer
        anchor={countryButtonRef.current}
        open={countryOpen}
        onClose={() => setCountryOpen(false)}
      >
        {(position) => (
          <div
            data-smart-discovery-popover="true"
            className="fixed z-9999 rounded-2xl border border-border bg-white/98 p-2 shadow-[0_22px_64px_rgba(11,60,93,0.22)] ring-1 ring-black/5 backdrop-blur-md animate-in fade-in slide-in-from-top-1"
            style={{ top: position.top, left: position.left, width: position.width }}
          >
            <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-3">
              <span className="text-foreground/35" aria-hidden>
                ⌕
              </span>
              <input
                value={countryQuery}
                onChange={(event) => setCountryQuery(event.target.value)}
                placeholder="Ülke ara..."
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-primary outline-none placeholder:text-foreground/35"
                autoComplete="off"
                autoFocus
              />
            </div>
            {selectedIntent.recommendedCountryNeedles?.length && !countryQuery.trim() ? (
              <p className="px-3 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/38">
                Önerilen hedefler ve diğer ülkeler
              </p>
            ) : null}
            <div role="listbox" className="mt-2 max-h-[min(22rem,calc(100vh-8rem))] overflow-y-auto">
              {visibleCountries.map((item) => {
                const code = flagCode(item)?.toUpperCase() ?? "";
                const active = country === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => chooseCountry(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active
                        ? "bg-primary/8 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                        : "text-foreground/75 hover:bg-primary/4"
                    }`}
                  >
                    <FlagMark countryName={item} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{item}</span>
                    </span>
                    {code ? (
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-foreground/42">
                        {code}
                      </span>
                    ) : null}
                  </button>
                );
              })}
              {visibleCountries.length === 0 ? (
                <p className="px-3 py-4 text-sm font-medium text-foreground/50">
                  Bu işlem türü için eşleşen ülke bulunamadı.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </FloatingLayer>
    </section>
  );
}
