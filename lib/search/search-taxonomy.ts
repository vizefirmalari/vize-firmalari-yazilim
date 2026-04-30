import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import type { SpecializationKey } from "@/lib/constants/firm-specializations";
import { canonicalizeSearchQueryForSeo, normalizeForRankingCompare } from "@/lib/search/search-synonyms";
import { foldAsciiLower } from "@/lib/search/search-text";

/** Firma satırına uygulanan ek anlamsal eşlemeler (/arama ile gelişmiş filtre mantığıyla uyumlu) */
export type FirmSearchSemanticIntent =
  | { kind: "trust"; flag: "tax" | "license" | "physical" | "office_verified" }
  | { kind: "service_mode"; flag: "online" | "face" | "remote" | "weekend" }
  | { kind: "language_pro"; flag: "multilingual" | "corp_domain" };

export type SearchTaxonomyType =
  | "region"
  | "country"
  | "city"
  | "firm_type"
  | "visa_expertise"
  | "main_service"
  | "corp_trust"
  | "service_mode"
  | "language_pro";

export type SearchTaxonomyEntry = {
  label: string;
  type: SearchTaxonomyType;
  group: string;
  /** `canonicalizeSearchQueryForSeo` ile üretilmiş href sorgusu */
  query: string;
  href: string;
  aliases: string[];
  relatedTerms: string[];
  /** Keşfet vitrin slug — öneri satırına “Kategori sayfası” eklemek için */
  kesfetSlug?: string;
  specializationKey?: SpecializationKey;
  semanticIntents?: FirmSearchSemanticIntent[];
};

/** Öneri API / dropdown satırı */
export type TaxonomySearchSuggestionRow = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  query: string;
  kesfetSlug?: string;
  entryType: SearchTaxonomyType;
  /** skor sıralaması: exact label önceliği için */
  matchRank: number;
};

const TR_PROVINCES = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Aksaray",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Ardahan",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
] as const;

function e(x: Omit<SearchTaxonomyEntry, "href" | "query"> & Partial<Pick<SearchTaxonomyEntry, "href" | "query">>): SearchTaxonomyEntry {
  const query = canonicalizeSearchQueryForSeo(x.label);
  const href = x.href ?? `/arama?q=${encodeURIComponent(query)}`;
  return {
    ...x,
    query,
    href,
    aliases: [...x.aliases],
    relatedTerms: [...x.relatedTerms],
  };
}

const REGIONS: SearchTaxonomyEntry[] = (
  [
    {
      label: "Schengen Bölgesi",
      type: "region",
      group: "Bölgeler",
      aliases: ["schengen bölgesi", "schengen bolgesi", "avrupa schengen", "schengen alanı"],
      relatedTerms: ["schengen vizesi", "schengen vizeler", "turistik vize"],
      kesfetSlug: "schengen-vizesi",
    },
    {
      label: "İngiltere",
      type: "region",
      group: "Bölgeler",
      aliases: ["ingiltere uk", "birleşik krallık", "birlesik krallık"],
      relatedTerms: ["İngiltere Vizesi", "ingiltere vizesi"],
      kesfetSlug: "ingiltere-vizesi",
    },
    {
      label: "ABD",
      type: "region",
      group: "Bölgeler",
      aliases: ["amerika", "united states", "usa", "us", "birleşik devletler", "amerika birleşik devletleri"],
      relatedTerms: ["ABD Vizesi", "abd vizesi"],
      kesfetSlug: "abd-vizesi",
    },
    {
      label: "Kanada",
      type: "region",
      group: "Bölgeler",
      aliases: ["canada"],
      relatedTerms: ["Kanada oturumu", "kanada vizesi"],
      kesfetSlug: "kanada-konferans-evi",
    },
    {
      label: "Dubai / BAE",
      type: "region",
      group: "Bölgeler",
      aliases: ["dubai", "bae", "b.a.e.", "birleşik arap emirlikleri"],
      relatedTerms: ["Dubai Vizesi", "dubai vizesi", "tourist dubai"],
    },
    {
      label: "Avustralya",
      type: "region",
      group: "Bölgeler",
      aliases: ["australia", "avustralia"],
      relatedTerms: ["Öğrenci Vizesi", "çalışma vizesi", "turistik vize"],
      kesfetSlug: "avustralya-vizesi",
    },
    {
      label: "Asya",
      type: "region",
      group: "Bölgeler",
      aliases: ["asian", "ASYA"],
      relatedTerms: [],
    },
    {
      label: "Afrika",
      type: "region",
      group: "Bölgeler",
      aliases: [],
      relatedTerms: [],
    },
  ] as const
).map((r) =>
  e({
    label: r.label as string,
    type: "region",
    group: "Bölgeler",
    aliases: [...(("aliases" in r && r.aliases) || [])],
    relatedTerms: [...(("relatedTerms" in r && r.relatedTerms) || [])],
    kesfetSlug: "kesfetSlug" in r ? r.kesfetSlug : undefined,
  })
);

const CORE_COUNTRIES = [
  "Almanya",
  "Fransa",
  "Hollanda",
  "Belçika",
  "Kanada",
  "Avusturya",
  "Yunanistan",
  "Avustralya",
  "İtalya",
  "İsviçre",
  "İspanya",
  "Portekiz",
  "Polonya",
  "Çekya",
  "İngiltere",
  "Macaristan",
  "Bulgaristan",
  "Romanya",
  "Hırvatistan",
  "Slovenya",
  "Slovakya",
  "Estonya",
  "Letonya",
  "Litvanya",
  "Danimarka",
  "İsveç",
  "Norveç",
  "Finlandiya",
  "Malta",
  "Kıbrıs",
  "İrlanda",
  "Lüksemburg",
  "Ukrayna",
  "Rusya",
  "Japonya",
  "Güney Kore",
  "Çin",
  "Hindistan",
  "Malezya",
  "Singapur",
  "İran",
];

const EXTRA_COUNTRY_ALIASES: Record<string, string[]> = {
  Almanya: ["germany", "deutschland"],
  Fransa: ["france"],
  Hollanda: ["netherlands", "amsterdam"],
  Belçika: ["belgium"],
  İtalya: ["italy", "italya"],
  İngiltere: ["uk", "britanya", "british", "united kingdom", "birleşik krallık", "ingiltere vizesi"],
};

const COUNTRY_ENTRIES: SearchTaxonomyEntry[] = CORE_COUNTRIES.map((label) =>
  e({
    label,
    type: "country",
    group: "Ülkeler",
    aliases: EXTRA_COUNTRY_ALIASES[label] ?? [],
    relatedTerms: [],
    kesfetSlug: slugHintForCountry(label),
  })
);

function slugHintForCountry(label: string): string | undefined {
  const m: Record<string, string> = {
    Almanya: "almanya-vizesi",
    Fransa: "fransa-vizesi",
    İngiltere: "ingiltere-vizesi",
    Hollanda: "hollanda-vizesi",
    Belçika: "belcika-vizesi",
    İtalya: "italya-vizesi",
    İspanya: "ispanya-vizesi",
    Kanada: "kanada-konferans-evi",
  };
  return m[label];
}

const OFFICE_CITIES_PRIORITY = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Gaziantep",
  "Kocaeli",
];

const CITY_ENTRIES: SearchTaxonomyEntry[] = [
  ...OFFICE_CITIES_PRIORITY.map((label) =>
    e({
      label,
      type: "city",
      group: "Ofis Konumu",
      aliases: [],
      relatedTerms: [],
    })
  ),
  ...TR_PROVINCES.filter((p) => !OFFICE_CITIES_PRIORITY.includes(p as string)).map((label) =>
    e({
      label,
      type: "city",
      group: "Ofis Konumu",
      aliases: [],
      relatedTerms: [],
    })
  ),
];

const FIRM_TYPES: string[] = [
  "Vize Danışmanlık Şirketi",
  "Hukuk Bürosu",
  "Seyahat Acentesi",
  "Eğitim ve Vize Danışmanlığı",
  "Vize Başvuru Merkezi",
  "Denklik ve Vize Danışmanlığı",
  "Eğitim ve Dil Sınav Merkezi",
  "Gayrimenkul Danışmanlık Firması",
  "Golden Visa & Gayrimenkul Danışmanlığı",
  "Göçmenlik ve Eğitim Danışmanlığı",
  "Oturum ve Şirket Kurulumu Danışmanlığı",
  "Pasaport ve Vize Hizmetleri",
  "Resmi Platform Hesabı",
  "Schengen vizesi",
  "Turizm ve Vize Danışmanlık Firması",
  "Uluslararası Kariyer ve İnsan Kaynakları Danışmanlığı",
  "Vatandaşlık ve Vize Danışmanlığı",
  "Vize Başvuru Süreç Yönetimi",
  "Yatırım Göçü Danışmanlığı",
  "Yurtdışı Çalışma ve Oturum Danışmanlığı",
];

const FIRM_TYPE_ENTRIES = FIRM_TYPES.map((label) =>
  e({
    label,
    type: "firm_type",
    group: "Firma Türü",
    aliases:
      label === "Hukuk Bürosu"
        ? ["hukuk burosu", "avukatlık", "law office"]
        : label.toLowerCase().includes("golden")
          ? ["golden visa firma"]
          : [],
    relatedTerms: [],
  })
);

/** Uzmanlık / vize türü (filtre ile hizalı) */
const VISA_EXPERTISE_EXTENDED: SearchTaxonomyEntry[] = (
  [
    e({
      label: "Schengen Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "schengen_expert",
      aliases: ["schengen", "schengn", "AVRUPA SCHENGEN"],
      relatedTerms: ["turistik vize", "schengen bölgesi"],
      kesfetSlug: "schengen-vizesi",
    }),
    e({
      label: "ABD Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "usa_visa_expert",
      aliases: ["amerika vizesi", "usa visa", "us visa", "united states visa"],
      relatedTerms: ["turistik", "iş vizesi"],
      kesfetSlug: "abd-vizesi",
    }),
    e({
      label: "Öğrenci Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "student_visa_support",
      aliases: ["ogrenci", "ogrenci vizesi", "student visa"],
      relatedTerms: ["eğitim", "exchange"],
      kesfetSlug: "ogrenci-vizesi",
    }),
    e({
      label: "Çalışma Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "work_visa_support",
      aliases: ["calisma", "iş vizesi", "work visa", "employment visa"],
      relatedTerms: ["nitelikli işçi"],
      kesfetSlug: "calisma-vizesi",
    }),
    e({
      label: "Turistik Vize",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "tourist_visa_support",
      aliases: ["tourism visa", "seyahat"],
      relatedTerms: ["schengen"],
    }),
    e({
      label: "İş / Ticari Vize",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "business_visa_support",
      aliases: ["ticari", "iş vizesi", "commercial"],
      relatedTerms: [],
    }),
    e({
      label: "Aile Birleşimi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "family_reunion_support",
      aliases: [],
      relatedTerms: ["aile ziyareti"],
    }),
    e({
      label: "İtiraz / Red Sonrası",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      specializationKey: "appeal_support",
      aliases: ["ret", "red", "reddedildi", "red sonrası", "vize reddi"],
      relatedTerms: ["itiraz", "nakdi teminat"],
      kesfetSlug: "gocmenlik-hukuku",
    }),
    e({
      label: "Dubai Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["bae", "dubai turist"],
      kesfetSlug: undefined,
    }),
    e({
      label: "Freelancer Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["serbest meslek"],
    }),
    e({
      label: "Girişimci Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["startup vizesi"],
    }),
    e({
      label: "Golden Visa",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["yatırım yoluyla oturum", "yunanistan golden visa"],
      kesfetSlug: undefined,
    }),
    e({
      label: "Startup Vizesi",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["girişimci"],
    }),
    e({
      label: "Vatandaşlık Hizmetleri",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["vatandaşlık"],
      kesfetSlug: undefined,
    }),
    e({
      label: "Yatırım yoluyla oturum",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: ["golden visa yatırım"],
      relatedTerms: [],
    }),
    e({
      label: "Yatırım yoluyla vatandaşlık",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: [],
    }),
    e({
      label: "Yunanistan Golden Visa",
      type: "visa_expertise",
      group: "Uzmanlık Alanları",
      aliases: [],
      relatedTerms: ["golden visa"],
      kesfetSlug: "yunanistan-golden-visa-hizmeti",
    }),
  ]
);

/** ts duplicate group fix — second block used wrong literal; trim duplicate */
function dedupeExpertise(entries: SearchTaxonomyEntry[]): SearchTaxonomyEntry[] {
  const seen = new Set<string>();
  const out: SearchTaxonomyEntry[] = [];
  for (const x of entries) {
    const k = x.label;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

const MAIN_SERVICES_LONG = [
  "Vize Hizmeti",
  "Oturum",
  "Vatandaşlık",
  "Randevu Hizmeti",
  "Göçmenlik Hukuku",
  "Başvuru Süreç Yönetimi",
  "Akraba Ziyareti Vizesi",
  "Almanya Eğitim Danışmanlığı",
  "Dil Sertifikasyon Hizmeti",
  "Dil Sınav Merkezi",
  "Diplomatik Vize",
  "Dosya Hizmeti",
  "E-Vize",
  "Eğitim Vizesi",
  "Erasmus Vizesi",
  "Evrak / Danışmanlık",
  "Fuar Vizesi",
  "Gayrimenkul Danışmanlığı",
  "Göç ve Entegrasyon Danışmanlığı",
  "Green Card Başvuruları",
  "Hukuki Danışmanlık",
  "İngiltere Vizesi",
  "Kişiye Özel Tatil Hizmetleri",
  "Konaklama Danışmanlığı",
  "Konferans Vizesi",
  "Konsolosluk İşlemleri",
  "Konsolosluk Yazıları",
  "Mesleki Denklik",
  "Nitelikli İşçi Göçü",
  "Nitelikli İşçi Yerleştirme",
  "Ön Onay İşlemleri",
  "Pasaport",
  "Rezervasyon Hizmeti",
  "Sağlık Çalışanı Yerleştirme",
  "Sağlık Sektörü İş Yerleştirme",
  "Sanatçı Vizesi",
  "Seyahat Sağlık Sigortası",
  "Sporcu Vizesi",
  "Şirket Kurulumu",
  "Tercüme",
  "Transfer Hizmetleri",
  "Transit Vizesi",
  "Uçak Bileti",
  "Uluslararası Kariyer Danışmanlığı",
  "Uzun dönemli / D tipi vizeler",
  "Yurtdışı Eğitim Danışmanlığı",
  "Yurtiçi ve Yurtdışı Tur Programları",
  "Ziyaret Vizesi",
];

const MAIN_SERVICE_ENTRIES: SearchTaxonomyEntry[] = MAIN_SERVICES_LONG.map((label) =>
  e({
    label,
    type: "main_service",
    group: "Ana Hizmet Kategorileri",
    aliases:
      label === "Green Card Başvuruları"
        ? ["green card", "greencard", "kart"]

      : label === "Erasmus Vizesi"
        ? ["erasmus"]
        : label === "Uzun dönemli / D tipi vizeler"
          ? ["d tipi", "d vizeleri", "national d"]
          : label === "Sağlık Çalışanı Yerleştirme"
            ? ["hemşire", "hekim yerleştirme", "hemşirelik"]
            : label === "Randevu Hizmeti"
              ? ["randevu"]
              : label === "Evrak / Danışmanlık"
                ? ["evrak"]
                : label === "Pasaport"
                  ? ["pasaport işlemi"]
                  : label === "Tercüme"
                    ? ["tercüme hizmeti", "çeviri"]
                    : [],
    relatedTerms:
      label === "Green Card Başvuruları"
        ? ["abd göç"]
        : label === "Hukuki Danışmanlık"
          ? ["hukuk bürosu"]
          : [],
  })
);

/** Birleştirilmiş global dizi */
let _cachedFlattened: SearchTaxonomyEntry[] | null = null;

export function getStaticSearchTaxonomyEntries(): SearchTaxonomyEntry[] {
  if (_cachedFlattened) return _cachedFlattened;
  _cachedFlattened = [
    ...REGIONS,
    ...COUNTRY_ENTRIES,
    ...CITY_ENTRIES,
    ...FIRM_TYPE_ENTRIES,
    ...dedupeExpertise(VISA_EXPERTISE_EXTENDED),
    ...MAIN_SERVICE_ENTRIES,
    e({
      label: "Vergi levhası mevcut",
      type: "corp_trust",
      group: "Kurumsallık & yasal yapı",
      aliases: [],
      relatedTerms: ["vergi levhası", "mali mühür"],
      semanticIntents: [{ kind: "trust", flag: "tax" }],
    }),
    e({
      label: "Lisans / yetki numarası var",
      type: "corp_trust",
      group: "Kurumsallık & yasal yapı",
      aliases: ["lisanslı", "yetki belgesi"],
      relatedTerms: [],
      semanticIntents: [{ kind: "trust", flag: "license" }],
    }),
    e({
      label: "Fiziksel ofis var",
      type: "corp_trust",
      group: "Kurumsallık & yasal yapı",
      aliases: ["ofisle", "yüzyüze"],
      relatedTerms: [],
      semanticIntents: [{ kind: "trust", flag: "physical" }],
    }),
    e({
      label: "Doğrulanmış ofis adresi",
      type: "corp_trust",
      group: "Kurumsallık & yasal yapı",
      aliases: ["adres doğrulama"],
      relatedTerms: [],
      semanticIntents: [{ kind: "trust", flag: "office_verified" }],
    }),
    e({
      label: "Çevrimiçi danışmanlık",
      type: "service_mode",
      group: "Hizmet biçimi",
      aliases: ["online", "internetten danışmanlık"],
      relatedTerms: [],
      semanticIntents: [{ kind: "service_mode", flag: "online" }],
    }),
    e({
      label: "Ofiste / yüz yüze",
      type: "service_mode",
      group: "Hizmet biçimi",
      aliases: ["yüz yüze", "office visit"],
      relatedTerms: [],
      semanticIntents: [{ kind: "service_mode", flag: "face" }],
    }),
    e({
      label: "Uzaktan destek",
      type: "service_mode",
      group: "Hizmet biçimi",
      aliases: ["uzaktan"],
      relatedTerms: [],
      semanticIntents: [{ kind: "service_mode", flag: "remote" }],
    }),
    e({
      label: "Hafta sonu desteği",
      type: "service_mode",
      group: "Hizmet biçimi",
      aliases: ["hafta sonu", "cumartesi pazar"],
      relatedTerms: [],
      semanticIntents: [{ kind: "service_mode", flag: "weekend" }],
    }),
    e({
      label: "Çok dilli destek",
      type: "language_pro",
      group: "Dil & profesyonellik",
      aliases: ["çok dillı", "iki dil"],
      relatedTerms: [],
      semanticIntents: [{ kind: "language_pro", flag: "multilingual" }],
    }),
    e({
      label: "Kurumsal domain",
      type: "language_pro",
      group: "Dil & profesyonellik",
      aliases: ["kurumsal e-posta", "corporate email"],
      relatedTerms: [],
      semanticIntents: [{ kind: "language_pro", flag: "corp_domain" }],
    }),
  ];
  return _cachedFlattened;
}

type AliasMap = Map<string, SearchTaxonomyEntry[]>;

function buildAliasIndex(entries: SearchTaxonomyEntry[]): AliasMap {
  const map: AliasMap = new Map();
  const addKey = (key: string, entry: SearchTaxonomyEntry) => {
    if (key.length < 2) return;
    const list = map.get(key) ?? [];
    list.push(entry);
    map.set(key, list);
  };
  for (const entry of entries) {
    addKey(canonicalizeSearchQueryForSeo(entry.label), entry);
    addKey(normalizeForRankingCompare(entry.label), entry);
    addKey(foldAsciiLower(entry.label), entry);
    for (const a of entry.aliases) {
      addKey(canonicalizeSearchQueryForSeo(a), entry);
      addKey(foldAsciiLower(a), entry);
    }
    for (const r of entry.relatedTerms) {
      addKey(canonicalizeSearchQueryForSeo(r), entry);
      addKey(foldAsciiLower(r), entry);
    }
  }
  return map;
}

/** CMS’ten ek ülke isimleri (yalnızca statik çekirdekte olmayanlar için) */
export function mergeTaxonomyEntriesWithCountryNames(extraNames: string[]): SearchTaxonomyEntry[] {
  const base = getStaticSearchTaxonomyEntries();
  const have = new Set(base.filter((x) => x.type === "country").map((x) => canonicalizeSearchQueryForSeo(x.label)));
  const additions: SearchTaxonomyEntry[] = [];
  for (const name of extraNames) {
    const t = name.trim();
    if (!t) continue;
    if (have.has(canonicalizeSearchQueryForSeo(t))) continue;
    have.add(canonicalizeSearchQueryForSeo(t));
    additions.push(e({ label: t, type: "country", group: "Ülkeler", aliases: [], relatedTerms: [] }));
  }
  return additions.length ? [...base, ...additions] : base;
}

function discoverEntriesForNormalizedQuery(
  norm: string,
  corpus: SearchTaxonomyEntry[],
  index: AliasMap
): { entries: SearchTaxonomyEntry[]; matchRanks: Map<string, number> } {
  const merged: SearchTaxonomyEntry[] = [];
  const push = (ent: SearchTaxonomyEntry) => {
    if (!merged.includes(ent)) merged.push(ent);
  };
  for (const ent of index.get(norm) ?? []) push(ent);

  if (norm.length >= 4) {
    for (const ent of corpus) {
      const labelC = canonicalizeSearchQueryForSeo(ent.label);
      let hit = labelC === norm || labelC.includes(norm) || norm.includes(labelC);
      if (!hit) {
        for (const a of [...ent.aliases, ...ent.relatedTerms]) {
          const ac = canonicalizeSearchQueryForSeo(String(a));
          if (!ac || ac.length < 2) continue;
          if (ac === norm || ac.includes(norm) || norm.includes(ac)) {
            hit = true;
            break;
          }
        }
      }
      if (hit) push(ent);
    }
  }
  const matchRanks = new Map<string, number>();
  for (const entry of merged) {
    const labelC = canonicalizeSearchQueryForSeo(entry.label);
    let rank = 100;
    if (labelC === norm) rank = 1000;
    else if (labelC.includes(norm) || norm.includes(labelC)) rank = 650;
    else if (
      [...entry.aliases, ...entry.relatedTerms].some(
        (a) =>
          canonicalizeSearchQueryForSeo(a) === norm ||
          foldAsciiLower(a) === foldAsciiLower(norm)
      )
    ) {
      rank = 800;
    } else rank = 400;
    matchRanks.set(entryKey(entry), rank);
  }
  return { entries: merged, matchRanks };
}

function entryKey(ent: SearchTaxonomyEntry): string {
  return `${ent.type}:${ent.label}`;
}

/** Kullanıcı sorgusu → taksonomi eşleşmesi ve genişletilmiş iğneler */
export function matchTaxonomyIntent(
  rawQuery: string,
  options?: { extraCountryLabels?: string[] }
): {
  matchedEntries: SearchTaxonomyEntry[];
  expandedNeedles: string[];
  semanticIntents: FirmSearchSemanticIntent[];
  kesfetSlugsOrdered: string[];
  matchRankByEntry: Map<string, number>;
} {
  const qcanon = canonicalizeSearchQueryForSeo(rawQuery.trim());
  if (qcanon.length < 2) {
    return {
      matchedEntries: [],
      expandedNeedles: [],
      semanticIntents: [],
      kesfetSlugsOrdered: [],
      matchRankByEntry: new Map(),
    };
  }

  const mergedCorpus = mergeTaxonomyEntriesWithCountryNames(options?.extraCountryLabels ?? []);
  const corpusIndex = buildAliasIndex(mergedCorpus);

  const { entries, matchRanks } = discoverEntriesForNormalizedQuery(qcanon, mergedCorpus, corpusIndex);

  const seenNeedle = new Set<string>();
  const expandedNeedles: string[] = [];
  const pushNeedle = (s: string) => {
    const t = s.trim().replace(/\s+/g, " ");
    if (t.length < 2 || seenNeedle.has(t.toLocaleLowerCase("tr"))) return;
    seenNeedle.add(t.toLocaleLowerCase("tr"));
    expandedNeedles.push(t);
  };

  for (const ent of entries) {
    pushNeedle(ent.label);
    ent.aliases.forEach(pushNeedle);
    ent.relatedTerms.forEach(pushNeedle);
  }
  pushNeedle(rawQuery.trim());

  const semanticIntents: FirmSearchSemanticIntent[] = [];
  const semSeen = new Set<string>();
  for (const ent of entries) {
    for (const s of ent.semanticIntents ?? []) {
      const k = `${s.kind}:${"flag" in s ? s.flag : ""}`;
      if (semSeen.has(k)) continue;
      semSeen.add(k);
      semanticIntents.push(s);
    }
  }

  const slugSeen = new Set<string>();
  const kesfetSlugsOrdered: string[] = [];
  for (const ent of [...entries].sort(
    (a, b) => (matchRanks.get(entryKey(b)) ?? 0) - (matchRanks.get(entryKey(a)) ?? 0)
  )) {
    if (ent.kesfetSlug && !slugSeen.has(ent.kesfetSlug)) {
      slugSeen.add(ent.kesfetSlug);
      kesfetSlugsOrdered.push(ent.kesfetSlug);
    }
  }

  const dedupEntries: SearchTaxonomyEntry[] = [];
  const ek = new Set<string>();
  for (const ent of entries) {
    const k = entryKey(ent);
    if (ek.has(k)) continue;
    ek.add(k);
    dedupEntries.push(ent);
  }

  return {
    matchedEntries: dedupEntries,
    expandedNeedles,
    semanticIntents,
    kesfetSlugsOrdered,
    matchRankByEntry: matchRanks,
  };
}

function suggestionTitleSubtitle(entry: SearchTaxonomyEntry): { title: string; subtitle: string; badge: string } {
  const badge =
    entry.type === "country"
      ? "Ülke"
      : entry.type === "region"
        ? "Bölge"
        : entry.type === "city"
          ? "Şehir"
          : entry.type === "firm_type"
            ? "Firma türü"
            : entry.type === "visa_expertise"
              ? "Vize türü"
              : entry.type === "main_service"
                ? "Ana hizmet"
                : entry.type === "corp_trust"
                  ? "Kurumsallık"
                  : entry.type === "service_mode"
                    ? "Hizmet biçimi"
                    : "Profesyonellik";

  let title = `${entry.label} ile ilgili sonuçlar`;
  let subtitle = "Bu terimle ilişkilendirilmiş yayın içeriklerini görüntüle";

  if (entry.type === "country") {
    title = `${entry.label} için hizmet veren firmalar`;
    subtitle = "Ülke filtresiyle eşleşen firmaları göster";
  } else if (entry.type === "region") {
    title = `${entry.label} bölgesinde hizmet veren firmalar`;
    subtitle = "Vize bölgesi filtresine göre sonuçlar";
  } else if (entry.type === "city") {
    title = `${entry.label} ofisli firmalar`;
    subtitle = "Ofis şehir ve konum filtresine göre sonuçlar";
  } else if (entry.type === "firm_type") {
    title = `${entry.label} firmaları`;
    subtitle = "Firma türüne göre sonuçlar";
  } else if (entry.type === "visa_expertise") {
    title = `${entry.label} firmaları`;
    subtitle = "Vize türü ve uzmanlık alanına göre sonuçlar";
  } else if (entry.type === "main_service") {
    title = `${entry.label} hizmeti sunan firmalar`;
    subtitle = "Ana hizmet kategorisine göre sonuçlar";
  } else if (entry.type === "corp_trust") {
    title = `${entry.label}`;
    subtitle = "Kurumsallık ve güven filtresine uyan yayın içerikleri";
  } else if (entry.type === "service_mode") {
    title = `${entry.label}`;
    subtitle = "Hizmet biçimi sinyallerine göre firmaları listele";
  } else if (entry.type === "language_pro") {
    title = `${entry.label}`;
    subtitle = "Dil ve profesyonellik filtresine uyan yayın içerikleri";
  }

  return { title, subtitle, badge };
}

export function searchTaxonomySuggestions(
  rawQuery: string,
  options?: { extraCountryLabels?: string[] }
): TaxonomySearchSuggestionRow[] {
  const intent = matchTaxonomyIntent(rawQuery, options);
  const out: TaxonomySearchSuggestionRow[] = [];
  const seenHref = new Set<string>();

  for (const entry of intent.matchedEntries) {
    const { title, subtitle, badge } = suggestionTitleSubtitle(entry);
    const href = `/arama?q=${encodeURIComponent(entry.query)}`;
    if (seenHref.has(href)) continue;
    seenHref.add(href);
    out.push({
      id: `tax-${entry.type}-${entry.label}`.replace(/\s+/g, "-"),
      title,
      subtitle,
      badge,
      href,
      query: entry.query,
      kesfetSlug: entry.kesfetSlug,
      entryType: entry.type,
      matchRank: intent.matchRankByEntry.get(entryKey(entry)) ?? 200,
    });
  }

  out.sort((a, b) => b.matchRank - a.matchRank);
  return out.slice(0, 24);
}

export function resolveKesfetPageForSlug(slug: string): { slug: string; title: string; description: string } | null {
  const cat = EXPLORE_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return null;
  return { slug: cat.slug, title: cat.label, description: cat.shortDescription };
}

export function buildTaxonomyFilterPayload(
  rawQuery: string,
  options?: { extraCountryLabels?: string[] }
): {
  needles: string[];
  semanticIntents: FirmSearchSemanticIntent[];
  matchedLabels: string[];
} {
  const intent = matchTaxonomyIntent(rawQuery, options);
  const needlesSet = new Set(intent.expandedNeedles);
  for (const m of intent.matchedEntries) needlesSet.add(m.label);
  return {
    needles: [...needlesSet].filter((n) => n.trim().length >= 2),
    semanticIntents: intent.semanticIntents,
    matchedLabels: intent.matchedEntries.map((e) => e.label),
  };
}
