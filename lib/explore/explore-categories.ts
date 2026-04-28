import type { ExploreCategoryDef, ExploreSectionDef } from "@/lib/explore/explore-types";

const R_UAE = "Dubai / BAE";
const R_UK = "İngiltere";
const R_USA = "ABD";
const R_CA = "Kanada";
const R_SCHENGEN = "Schengen Bölgesi";
const R_AU = "Avustralya";

export const EXPLORE_CATEGORIES: ExploreCategoryDef[] = [
  {
    slug: "dubai-vizesi",
    label: "Dubai Vizesi",
    shortDescription: "BAE ve Dubai odaklı vize danışmanlığı sunan firmalar.",
    listIntro:
      "Dubai ve Birleşik Arap Emirlikleri vize süreçlerinde destek veren firmalar aşağıda listelenmiştir. Profilleri inceleyerek size uygun danışmanlığı seçebilirsiniz.",
    sectionId: "popular",
    sectionOrder: 10,
    themeKey: "country-dubai",
    priority: 90,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇦🇪",
      visualType: "country",
      visualLabel: "Dubai / BAE Vizesi",
      accentColor: "navy-gold",
    },
    match: {
      visaRegionLabelsAny: [R_UAE],
      countryAliasesAny: [
        "dubai",
        "bae",
        "birleşik arap emirlikleri",
        "birlesik arap emirlikleri",
        "uae",
        "emirlikler",
        "abu dabi",
        "abudabi",
      ],
      serviceNeedlesAny: ["dubai", "bae", "emirlik", "abu dabi"],
    },
  },
  {
    slug: "ingiltere-vizesi",
    label: "İngiltere Vizesi",
    shortDescription: "İngiltere ve UK vize süreçlerinde uzman firmalar.",
    listIntro:
      "İngiltere vizesi ve ilgili süreçlerde hizmet veren firmalar aşağıdadır. Karşılaştırarak iletişime geçebilirsiniz.",
    sectionId: "popular",
    sectionOrder: 20,
    themeKey: "country-uk",
    priority: 88,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇬🇧",
      visualType: "country",
      visualLabel: "İngiltere Vizesi",
      accentColor: "navy-red",
    },
    match: {
      visaRegionLabelsAny: [R_UK],
      countryAliasesAny: [
        "ingiltere",
        "birleşik krallık",
        "birlesik krallik",
        "great britain",
        "united kingdom",
        "uk",
        "londra",
      ],
      serviceNeedlesAny: ["ingiltere", "uk vize", "britanya"],
    },
  },
  {
    slug: "almanya-vizesi",
    label: "Almanya Vizesi",
    shortDescription: "Almanya odaklı vize başvurularında uzman firmalar.",
    listIntro:
      "Almanya vizesi ve ilişkili başvuru süreçlerinde hizmet veren firmalar aşağıda listelenmiştir.",
    sectionId: "popular",
    sectionOrder: 25,
    themeKey: "country-schengen",
    priority: 82,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇩🇪",
      visualType: "country",
      visualLabel: "Almanya Vizesi",
      accentColor: "navy-gold",
    },
    match: {
      countryAliasesAny: ["almanya", "germany", "federal almanya", "berlin"],
      serviceNeedlesAny: ["almanya vize", "germany visa"],
    },
  },
  {
    slug: "schengen-vizesi",
    label: "Schengen Vizesi",
    shortDescription: "Schengen bölgesi ve Avrupa seyahat vizeleri.",
    listIntro:
      "Schengen vizesi ve Avrupa seyahat süreçlerinde destek sunan firmalar listelenmiştir.",
    sectionId: "popular",
    sectionOrder: 30,
    themeKey: "region-schengen",
    priority: 92,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇪🇺",
      visualType: "region",
      visualLabel: "Schengen Vizesi",
      accentColor: "navy-blue",
    },
    match: {
      visaRegionLabelsAny: [R_SCHENGEN],
      specializationKeysAny: ["schengen_expert"],
      serviceNeedlesAny: ["schengen", "avrupa vize"],
    },
  },
  {
    slug: "abd-vizesi",
    label: "Amerika Vizesi",
    shortDescription: "ABD vize ve başvuru süreçleri.",
    listIntro:
      "Amerika Birleşik Devletleri vize süreçlerinde danışmanlık veren firmalar aşağıdadır.",
    sectionId: "popular",
    sectionOrder: 40,
    themeKey: "country-usa",
    priority: 86,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇺🇸",
      visualType: "country",
      visualLabel: "ABD Vizesi",
      accentColor: "navy-red",
    },
    match: {
      visaRegionLabelsAny: [R_USA],
      specializationKeysAny: ["usa_visa_expert"],
      countryAliasesAny: [
        "amerika",
        "abd",
        "amerika birleşik devletleri",
        "amerika birlesik devletleri",
        "united states",
        "usa",
      ],
      serviceNeedlesAny: ["abd vize", "amerika vize", "usa vize"],
    },
  },
  {
    slug: "kanada-vizesi",
    label: "Kanada Vizesi",
    shortDescription: "Kanada vize, çalışma ve oturum süreçleri.",
    listIntro:
      "Kanada vizesi ve ilgili başvuru süreçlerinde hizmet veren firmalar listelenmiştir.",
    sectionId: "popular",
    sectionOrder: 50,
    themeKey: "country-canada",
    priority: 84,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇨🇦",
      visualType: "country",
      visualLabel: "Kanada Vizesi",
      accentColor: "navy-red",
    },
    match: {
      visaRegionLabelsAny: [R_CA],
      countryAliasesAny: ["kanada", "canada"],
      serviceNeedlesAny: ["kanada vize", "kanada"],
    },
  },
  {
    slug: "yunanistan-vizesi",
    label: "Yunanistan Vizesi",
    shortDescription: "Yunanistan ve Schengen bağlantılı başvurular.",
    listIntro:
      "Yunanistan vizesi ve ilgili danışmanlık sunan firmalar aşağıda yer almaktadır.",
    sectionId: "popular",
    sectionOrder: 60,
    themeKey: "country-greece",
    priority: 72,
    minFirmCount: 1,
    match: {
      countryAliasesAny: ["yunanistan", "greece", "hellas", "girit"],
      serviceNeedlesAny: ["yunanistan vize", "yunanistan"],
    },
  },
  {
    slug: "fransa-vizesi",
    label: "Fransa Vizesi",
    shortDescription: "Fransa başvurularında danışmanlık sunan firmalar.",
    listIntro:
      "Fransa vize süreçlerinde hizmet veren firmaları bu sayfada karşılaştırabilirsiniz.",
    sectionId: "popular",
    sectionOrder: 65,
    themeKey: "country-schengen",
    priority: 69,
    minFirmCount: 1,
    visual: {
      flagEmoji: "🇫🇷",
      visualType: "country",
      visualLabel: "Fransa Vizesi",
      accentColor: "navy-red",
    },
    match: {
      countryAliasesAny: ["fransa", "france", "paris"],
      serviceNeedlesAny: ["fransa vize", "france visa"],
    },
  },
  {
    slug: "hollanda-vizesi",
    label: "Hollanda Vizesi",
    shortDescription: "Hollanda odaklı vize süreçlerinde hizmet veren firmalar.",
    listIntro:
      "Hollanda vize başvurularında danışmanlık veren firmalar aşağıda listelenmiştir.",
    sectionId: "popular",
    sectionOrder: 66,
    themeKey: "country-schengen",
    priority: 68,
    minFirmCount: 1,
    match: {
      countryAliasesAny: ["hollanda", "netherlands", "amsterdam"],
      serviceNeedlesAny: ["hollanda vize", "netherlands visa"],
    },
  },
  {
    slug: "calisma-vizesi",
    label: "Çalışma Vizesi",
    shortDescription: "Çalışma ve istihdam amaçlı vize danışmanlığı.",
    listIntro:
      "Çalışma vizesi süreçlerinde destek veren firmalar aşağıda listelenmiştir.",
    sectionId: "visa_type",
    sectionOrder: 10,
    themeKey: "visa-work",
    priority: 80,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["work_visa_support"],
      serviceNeedlesAny: ["çalışma vizesi", "calisma vizesi", "iş vizesi", "is vizesi", "çalışma izni"],
    },
  },
  {
    slug: "ogrenci-vizesi",
    label: "Öğrenci Vizesi",
    shortDescription: "Eğitim ve öğrenci vize başvuruları.",
    listIntro:
      "Öğrenci vizesi danışmanlığı sunan firmaları inceleyebilirsiniz.",
    sectionId: "visa_type",
    sectionOrder: 20,
    themeKey: "visa-student",
    priority: 78,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["student_visa_support"],
      serviceNeedlesAny: ["öğrenci vizesi", "ogrenci vizesi", "student visa", "öğrenci"],
    },
  },
  {
    slug: "global-talent-visa",
    label: "Global Talent Visa",
    shortDescription: "Global Talent Visa süreçlerinde uzman firmalar.",
    listIntro:
      "Global Talent Visa ve yetenek bazlı başvurularda hizmet veren firmalar listelenmiştir.",
    sectionId: "visa_type",
    sectionOrder: 25,
    themeKey: "visa-work",
    priority: 77,
    minFirmCount: 1,
    match: {
      visaRegionLabelsAny: [R_UK],
      serviceNeedlesAny: ["global talent", "talent visa", "high potential individual"],
    },
  },
  {
    slug: "turistik-vize",
    label: "Turistik Vize",
    shortDescription: "Tatil ve kısa süreli seyahat vizeleri.",
    listIntro:
      "Turistik vize süreçlerinde yardımcı olan firmalar aşağıdadır.",
    sectionId: "visa_type",
    sectionOrder: 30,
    themeKey: "visa-tourist",
    priority: 70,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["tourist_visa_support"],
      serviceNeedlesAny: ["turistik vize", "tatil vizesi", "seyahat vizesi"],
    },
  },
  {
    slug: "is-ticari-vize",
    label: "İş / Ticari Vize",
    shortDescription: "Ticari ve iş seyahati vizeleri.",
    listIntro:
      "İş ve ticari vize danışmanlığı veren firmalar listelenmiştir.",
    sectionId: "visa_type",
    sectionOrder: 40,
    themeKey: "visa-business",
    priority: 74,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["business_visa_support"],
      serviceNeedlesAny: ["ticari vize", "iş vizesi", "is vizesi", "business visa"],
    },
  },
  {
    slug: "aile-birlesimi",
    label: "Aile Birleşimi",
    shortDescription: "Aile birleşimi ve yakın ziyareti süreçleri.",
    listIntro:
      "Aile birleşimi ve benzeri başvurularda destek sunan firmalar aşağıdadır.",
    sectionId: "visa_type",
    sectionOrder: 50,
    themeKey: "visa-family",
    priority: 76,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["family_reunion_support"],
      serviceNeedlesAny: ["aile birleşimi", "aile birlesimi", "aile ziyareti", "akraba"],
    },
  },
  {
    slug: "egitim-vizesi",
    label: "Eğitim Vizesi",
    shortDescription: "Yurtdışı eğitim ve okul başvuruları.",
    listIntro:
      "Eğitim vizesi ve yurtdışı eğitim danışmanlığı sunan firmaları keşfedin.",
    sectionId: "visa_type",
    sectionOrder: 60,
    themeKey: "visa-education",
    priority: 75,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["student_visa_support"],
      serviceNeedlesAny: [
        "eğitim vizesi",
        "egitim vizesi",
        "yurtdışı eğitim",
        "yurtdisi egitim",
        "üniversite vizesi",
        "universite vizesi",
      ],
    },
  },
  {
    slug: "oturum-islemleri",
    label: "Oturum İşlemleri",
    shortDescription: "Oturum izni ve kalıcı süreç danışmanlığı.",
    listIntro:
      "Oturum ve ikamet süreçlerinde hizmet veren firmalar aşağıda listelenmiştir.",
    sectionId: "process",
    sectionOrder: 10,
    themeKey: "process-residence",
    priority: 68,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: ["oturum", "ikamet", "kalıcı oturum", "kalici oturum", "residence permit"],
    },
  },
  {
    slug: "vatandaslik-islemleri",
    label: "Vatandaşlık İşlemleri",
    shortDescription: "Vatandaşlık başvuruları için danışmanlık veren firmalar.",
    listIntro:
      "Vatandaşlık ve uzun vadeli yerleşim süreçlerinde destek sunan firmaları inceleyin.",
    sectionId: "process",
    sectionOrder: 15,
    themeKey: "process-residence",
    priority: 66,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: ["vatandaşlık", "vatandaslik", "citizenship"],
    },
  },
  {
    slug: "red-sonrasi",
    label: "Red Sonrası Başvuru",
    shortDescription: "İtiraz ve yeniden başvuru desteği.",
    listIntro:
      "Red sonrası süreçler ve itirazlarda danışmanlık veren firmalar listelenmiştir.",
    sectionId: "process",
    sectionOrder: 20,
    themeKey: "process-appeal",
    priority: 73,
    minFirmCount: 1,
    match: {
      specializationKeysAny: ["appeal_support"],
      serviceNeedlesAny: ["red sonrası", "red sonrasi", "itiraz", "yeniden başvuru", "yeniden basvuru"],
    },
  },
  {
    slug: "evrak-basvuru-danismanligi",
    label: "Evrak ve Başvuru Danışmanlığı",
    shortDescription: "Dosya, evrak ve başvuru yönetimi.",
    listIntro:
      "Evrak hazırlığı ve başvuru süreç yönetiminde destek sunan firmalar aşağıdadır.",
    sectionId: "process",
    sectionOrder: 30,
    themeKey: "process-docs",
    priority: 62,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: [
        "evrak",
        "danışmanlık",
        "danismanlik",
        "başvuru süreç",
        "basvuru surec",
        "dosya hazırlığı",
        "dosya hazirligi",
      ],
    },
  },
  {
    slug: "gocmenlik-hukuku",
    label: "Göçmenlik Hukuku",
    shortDescription: "Göçmenlik hukuku ve itiraz süreçlerinde hizmet veren firmalar.",
    listIntro:
      "Göçmenlik hukuku alanında danışmanlık sunan firmaları bu sayfada karşılaştırabilirsiniz.",
    sectionId: "process",
    sectionOrder: 35,
    themeKey: "process-appeal",
    priority: 65,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: ["göçmenlik hukuku", "gocmenlik hukuku", "immigration law"],
    },
  },
  {
    slug: "randevu-hizmeti",
    label: "Randevu Hizmeti",
    shortDescription: "Konsolosluk ve biyometri randevu desteği.",
    listIntro:
      "Randevu planlama ve takibi konusunda hizmet veren firmalar listelenmiştir.",
    sectionId: "process",
    sectionOrder: 40,
    themeKey: "process-appointment",
    priority: 58,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: ["randevu", "biyometri", "vfs", "tls"],
    },
  },
  {
    slug: "konsolosluk-islemleri",
    label: "Konsolosluk İşlemleri",
    shortDescription: "Konsolosluk önü ve resmi işlem desteği.",
    listIntro:
      "Konsolosluk işlemleri ve yazışmalarda yardımcı olan firmalar aşağıdadır.",
    sectionId: "process",
    sectionOrder: 50,
    themeKey: "process-consulate",
    priority: 60,
    minFirmCount: 1,
    match: {
      serviceNeedlesAny: ["konsolosluk", "konsolosluk yazısı", "konsolosluk yazisi"],
    },
  },
  {
    slug: "kuzey-amerika",
    label: "Kuzey Amerika",
    shortDescription: "ABD ve Kanada odaklı vize danışmanlığı.",
    listIntro:
      "Kuzey Amerika vizelerinde hizmet veren firmalar aşağıda yer almaktadır.",
    sectionId: "regional",
    sectionOrder: 30,
    themeKey: "region-north-america",
    priority: 82,
    minFirmCount: 1,
    match: {
      visaRegionLabelsAny: [R_USA, R_CA],
      countryAliasesAny: ["amerika", "abd", "kanada", "usa", "canada"],
      serviceNeedlesAny: ["kuzey amerika", "north america"],
    },
  },
  {
    slug: "avustralya-vizesi",
    label: "Avustralya Vizesi",
    shortDescription: "Avustralya vize ve göç süreçleri.",
    listIntro:
      "Avustralya vizesi danışmanlığı sunan firmalar listelenmiştir.",
    sectionId: "regional",
    sectionOrder: 60,
    themeKey: "country-australia",
    priority: 64,
    minFirmCount: 1,
    match: {
      visaRegionLabelsAny: [R_AU],
      countryAliasesAny: ["avustralya", "australia", "sydney", "melbourne"],
      serviceNeedlesAny: ["avustralya vize"],
    },
  },
];

export const EXPLORE_CATEGORY_BY_SLUG: Map<string, ExploreCategoryDef> = new Map(
  EXPLORE_CATEGORIES.map((c) => [c.slug, c])
);

export function getExploreCategoryBySlug(slug: string): ExploreCategoryDef | null {
  return EXPLORE_CATEGORY_BY_SLUG.get(slug) ?? null;
}

export function listExploreSlugs(): string[] {
  return EXPLORE_CATEGORIES.map((c) => c.slug);
}

function slugsForSection(
  sectionId: ExploreCategoryDef["sectionId"],
  extraSlugs: string[] = []
): string[] {
  const fromDef = EXPLORE_CATEGORIES.filter((c) => c.sectionId === sectionId)
    .sort((a, b) => a.sectionOrder - b.sectionOrder || b.priority - a.priority)
    .map((c) => c.slug);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...fromDef, ...extraSlugs]) {
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

/**
 * Arayüz bölümleri ve kart sırası. Bölgesel blokta popüler kartlarla çakışan slugs tekrar gösterilir.
 */
export const EXPLORE_SECTIONS: ExploreSectionDef[] = [
  {
    id: "popular",
    title: "Popüler aramalar",
    subtitle: "En sık aranan hedef ülkeler ve vize türleri.",
    slugOrder: slugsForSection("popular"),
  },
  {
    id: "visa_type",
    title: "Vize türüne göre",
    subtitle: "Başvuru niyetinize uygun danışmanlık alanları.",
    slugOrder: slugsForSection("visa_type"),
  },
  {
    id: "process",
    title: "Süreç ve ihtiyaç",
    subtitle: "Dosya, randevu ve sonrası süreç desteği.",
    slugOrder: slugsForSection("process"),
  },
  {
    id: "regional",
    title: "Bölgesel keşif",
    subtitle: "Coğrafi kapsama göre öne çıkan rotalar.",
    slugOrder: [
      "schengen-vizesi",
      "ingiltere-vizesi",
      "kuzey-amerika",
      "dubai-vizesi",
      "kanada-vizesi",
      "avustralya-vizesi",
    ],
  },
];
