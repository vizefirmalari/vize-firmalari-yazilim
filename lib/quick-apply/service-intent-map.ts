export type IntentClusterKey =
  | "visa-services"
  | "migration-residence"
  | "citizenship-golden-visa"
  | "study-abroad"
  | "international-career"
  | "company-investment"
  | "legal-official"
  | "tourism-travel"
  | "consular-operations";

export type IntentFilterType =
  | "expertise"
  | "service"
  | "operation"
  | "travel"
  | "legal";

export type IntentMatchItem = {
  label: string;
  type: IntentFilterType;
  aliases?: string[];
};

export type IntentQuickTag = {
  label: string;
  targetLabel: string;
  clusterKey: IntentClusterKey;
};

export type IntentCluster = {
  key: IntentClusterKey;
  icon: string;
  title: string;
  shortDescription: string;
  userVisibleDescription: string;
  secondStepLabel: string;
  secondStepPlaceholder: string;
  countryPlaceholder: string;
  recommendedCountries: string[];
  aliases: string[];
  relatedExpertise: IntentMatchItem[];
  relatedServices: IntentMatchItem[];
  relatedOperations: IntentMatchItem[];
  relatedTags: IntentQuickTag[];
};

function item(label: string, type: IntentFilterType, aliases?: string[]): IntentMatchItem {
  return { label, type, aliases };
}

function tag(label: string, targetLabel: string, clusterKey: IntentClusterKey): IntentQuickTag {
  return { label, targetLabel, clusterKey };
}

export const DISPLAY_LABEL_NORMALIZATION: Record<string, string> = {
  "is kurma danismanligi": "İş Kurma Danışmanlığı",
  "yatirim danismanlig": "Yatırım Danışmanlığı",
  "yatirim danismanligi": "Yatırım Danışmanlığı",
  "uzun donemli d tipi vizeler": "Uzun Dönemli / D Tipi Vizeler",
  "evrak danismanlik": "Evrak / Danışmanlık",
};

export function normalizeIntentText(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function displayIntentLabel(label: string): string {
  const normalized = normalizeIntentText(label);
  return DISPLAY_LABEL_NORMALIZATION[normalized] ?? label.trim();
}

export const SERVICE_INTENT_CLUSTERS: IntentCluster[] = [
  {
    key: "visa-services",
    icon: "🛂",
    title: "Vize Hizmetleri",
    shortDescription: "Schengen, ülke vizeleri ve kısa süreli başvuru süreçleri",
    userVisibleDescription: "Schengen, ülke vizeleri ve kısa süreli başvuru süreçleri",
    secondStepLabel: "Vize türü",
    secondStepPlaceholder: "Vize türü seçin",
    countryPlaceholder: "Vize Hizmetleri için önerilen hedefler",
    recommendedCountries: ["ABD", "İngiltere", "Kanada", "Almanya", "Fransa", "Hollanda", "Yunanistan", "İtalya", "Dubai / BAE"],
    aliases: ["vize", "başvuru", "konsolosluk"],
    relatedExpertise: [
      item("Schengen Vizesi", "expertise", ["Schengen"]),
      item("ABD Vizesi", "expertise", ["ABD"]),
      item("Kanada Vizesi", "expertise"),
      item("İngiltere Vizesi", "expertise"),
      item("Dubai Vizesi", "expertise"),
      item("Turistik Vize", "expertise"),
      item("İş / Ticari Vize", "expertise"),
      item("Eğitim Vizesi", "expertise"),
      item("Erasmus Vizesi", "expertise", ["Erasmus"]),
      item("Transit Vizesi", "expertise"),
      item("Fuar Vizesi", "expertise"),
      item("Konferans Vizesi", "expertise"),
      item("Ziyaret Vizesi", "expertise"),
      item("Diplomatik Vize", "expertise"),
      item("E-Vize", "expertise"),
      item("Sporcu Vizesi", "expertise"),
      item("Sanatçı Vizesi", "expertise"),
      item("Tır Şoförü Vizesi", "expertise"),
      item("Akraba Ziyareti Vizesi", "expertise"),
    ],
    relatedServices: [],
    relatedOperations: [],
    relatedTags: [
      tag("ABD Vizesi", "ABD Vizesi", "visa-services"),
      tag("Schengen", "Schengen Vizesi", "visa-services"),
      tag("İngiltere Vizesi", "İngiltere Vizesi", "visa-services"),
      tag("Kanada Vizesi", "Kanada Vizesi", "visa-services"),
      tag("Dubai Vizesi", "Dubai Vizesi", "visa-services"),
      tag("Turistik Vize", "Turistik Vize", "visa-services"),
    ],
  },
  {
    key: "migration-residence",
    icon: "⌂",
    title: "Göç ve Oturum Hizmetleri",
    shortDescription: "Oturum, ikamet, aile birleşimi ve yerleşim süreçleri",
    userVisibleDescription: "Oturum, ikamet, aile birleşimi ve yerleşim süreçleri",
    secondStepLabel: "Oturum / göç türü",
    secondStepPlaceholder: "Oturum süreci seçin",
    countryPlaceholder: "Göç ve Oturum için önerilen hedefler",
    recommendedCountries: ["Almanya", "Kanada", "İngiltere", "Avustralya", "Hollanda", "Portekiz", "İspanya", "BAE"],
    aliases: ["göç", "oturum", "ikamet"],
    relatedExpertise: [
      item("Aile Birleşimi", "expertise"),
      item("Çalışma Vizesi", "expertise"),
      item("Nitelikli İşçi Göçü", "expertise"),
    ],
    relatedServices: [
      item("Oturum", "service"),
      item("Oturum Hizmetleri", "service"),
      item("Çalışma İzni", "service"),
      item("Uzun Dönemli / D Tipi Vizeler", "service", ["Uzun dönemli / D tipi vizeler"]),
      item("Aile Birleşimi Oturumu", "service"),
      item("Evlilik Oturumu", "service"),
      item("Emeklilik Oturumu", "service"),
      item("Soy Bağları Oturumu", "service"),
      item("İş / Şirket Temsilcilik Oturumu", "service"),
      item("Göç ve Entegrasyon Danışmanlığı", "service"),
    ],
    relatedOperations: [],
    relatedTags: [
      tag("Oturum", "Oturum", "migration-residence"),
      tag("Aile Birleşimi", "Aile Birleşimi", "migration-residence"),
      tag("Nitelikli İşçi", "Nitelikli İşçi Göçü", "migration-residence"),
      tag("Çalışma İzni", "Çalışma İzni", "migration-residence"),
    ],
  },
  {
    key: "citizenship-golden-visa",
    icon: "◆",
    title: "Vatandaşlık ve Golden Visa",
    shortDescription: "Yatırım yoluyla oturum, vatandaşlık ve Golden Visa süreçleri",
    userVisibleDescription: "Yatırım yoluyla oturum, vatandaşlık ve Golden Visa süreçleri",
    secondStepLabel: "Vatandaşlık / yatırım türü",
    secondStepPlaceholder: "Süreç türü seçin",
    countryPlaceholder: "Golden Visa için önerilen hedefler",
    recommendedCountries: ["Yunanistan", "Portekiz", "İspanya", "Malta", "Karadağ", "Dominika", "St. Kitts ve Nevis", "Türkiye", "BAE"],
    aliases: ["golden", "vatandaşlık", "yatırım"],
    relatedExpertise: [
      item("Golden Visa", "expertise"),
      item("Yunanistan Golden Visa", "expertise"),
      item("Yatırım Yoluyla Vatandaşlık", "expertise"),
      item("Yatırım Yoluyla Oturum", "expertise"),
      item("Soy Bağı ile Vatandaşlık", "expertise"),
      item("Vatandaşlık Hizmetleri", "expertise"),
    ],
    relatedServices: [
      item("Vatandaşlık", "service"),
      item("Yatırım Göçü Danışmanlığı", "service"),
      item("Gayrimenkul Danışmanlığı", "service"),
      item("Emlak Danışmanlığı", "service"),
      item("Şirket Kurulumu", "service"),
    ],
    relatedOperations: [],
    relatedTags: [
      tag("Golden Visa", "Golden Visa", "citizenship-golden-visa"),
      tag("Yunanistan Golden Visa", "Yunanistan Golden Visa", "citizenship-golden-visa"),
      tag("Yatırım Yoluyla Oturum", "Yatırım Yoluyla Oturum", "citizenship-golden-visa"),
      tag("Vatandaşlık", "Vatandaşlık", "citizenship-golden-visa"),
      tag("Şirket Kurulumu", "Şirket Kurulumu", "citizenship-golden-visa"),
    ],
  },
  {
    key: "study-abroad",
    icon: "🎓",
    title: "Yurtdışı Eğitim",
    shortDescription: "Okul kabulü, öğrenci vizesi ve eğitim danışmanlığı",
    userVisibleDescription: "Okul kabulü, öğrenci vizesi, Erasmus ve eğitim danışmanlığı",
    secondStepLabel: "Eğitim süreci",
    secondStepPlaceholder: "Eğitim veya öğrenci vizesi seçin",
    countryPlaceholder: "Yurtdışı Eğitim için önerilen hedefler",
    recommendedCountries: ["Almanya", "İngiltere", "Kanada", "ABD", "Avustralya", "Polonya", "Hollanda", "İrlanda"],
    aliases: ["eğitim", "öğrenci", "erasmus"],
    relatedExpertise: [
      item("Öğrenci Vizesi", "expertise", ["Öğrenci"]),
      item("Eğitim Vizesi", "expertise"),
      item("Erasmus Vizesi", "expertise", ["Erasmus"]),
    ],
    relatedServices: [
      item("Yurtdışı Eğitim Danışmanlığı", "service"),
      item("Almanya Eğitim Danışmanlığı", "service", ["Almanya Eğitimi"]),
      item("Dil Sınav Merkezi", "service"),
      item("Dil Sertifikasyon Hizmeti", "service"),
      item("Konaklama Danışmanlığı", "service"),
    ],
    relatedOperations: [item("Başvuru Süreç Yönetimi", "operation")],
    relatedTags: [
      tag("Öğrenci", "Öğrenci Vizesi", "study-abroad"),
      tag("Erasmus", "Erasmus Vizesi", "study-abroad"),
      tag("Almanya Eğitimi", "Almanya Eğitim Danışmanlığı", "study-abroad"),
      tag("Dil Okulu", "Dil Sınav Merkezi", "study-abroad"),
      tag("Kanada Vizesi", "Kanada Vizesi", "visa-services"),
    ],
  },
  {
    key: "international-career",
    icon: "💼",
    title: "Uluslararası Kariyer ve Çalışma",
    shortDescription: "Çalışma vizesi, iş yerleştirme ve kariyer süreçleri",
    userVisibleDescription: "Çalışma vizesi, iş yerleştirme ve kariyer süreçleri",
    secondStepLabel: "Kariyer / çalışma türü",
    secondStepPlaceholder: "Çalışma süreci seçin",
    countryPlaceholder: "Uluslararası Kariyer için önerilen hedefler",
    recommendedCountries: ["Almanya", "Kanada", "İngiltere", "Avustralya", "Hollanda", "Dubai / BAE", "Katar", "Suudi Arabistan"],
    aliases: ["çalışma", "kariyer", "iş"],
    relatedExpertise: [
      item("Çalışma Vizesi", "expertise"),
      item("Freelancer Vizesi", "expertise"),
      item("Startup Vizesi", "expertise"),
      item("Girişimci Vizesi", "expertise"),
      item("Tır Şoförü Vizesi", "expertise"),
    ],
    relatedServices: [
      item("Çalışma İzni", "service"),
      item("Nitelikli İşçi Yerleştirme", "service"),
      item("Nitelikli İşçi Göçü", "service"),
      item("Sağlık Çalışanı Yerleştirme", "service"),
      item("Sağlık Sektörü İş Yerleştirme", "service"),
      item("Uluslararası Kariyer Danışmanlığı", "service"),
    ],
    relatedOperations: [],
    relatedTags: [
      tag("Çalışma", "Çalışma Vizesi", "international-career"),
      tag("Nitelikli İşçi", "Nitelikli İşçi Yerleştirme", "international-career"),
      tag("Sağlık Çalışanı", "Sağlık Çalışanı Yerleştirme", "international-career"),
      tag("Tır Şoförü", "Tır Şoförü Vizesi", "international-career"),
      tag("Freelancer", "Freelancer Vizesi", "international-career"),
      tag("Startup", "Startup Vizesi", "international-career"),
    ],
  },
  {
    key: "company-investment",
    icon: "▦",
    title: "Şirket Kurulumu ve Yatırım",
    shortDescription: "Yurtdışı şirket, yatırım ve ticari yapılanma danışmanlığı",
    userVisibleDescription: "Yurtdışı şirket, yatırım ve ticari yapılanma danışmanlığı",
    secondStepLabel: "Şirket / yatırım türü",
    secondStepPlaceholder: "Ticari süreç seçin",
    countryPlaceholder: "Şirket ve yatırım için önerilen hedefler",
    recommendedCountries: ["Dubai / BAE", "İngiltere", "Almanya", "Amerika", "Kanada", "Hollanda", "Estonya", "Portekiz"],
    aliases: ["şirket", "yatırım", "ticari"],
    relatedExpertise: [
      item("İş / Ticari Vize", "expertise"),
      item("Girişimci Vizesi", "expertise"),
      item("Startup Vizesi", "expertise"),
    ],
    relatedServices: [
      item("Şirket Kurulumu", "service"),
      item("İş Kurma Danışmanlığı", "service", ["iş Kurma Danışmanlığı"]),
      item("İş Geliştirme Danışmanlığı", "service"),
      item("Yatırım Danışmanlığı", "service", ["Yatırım Danışmanlığ", "Yatırım DanışmanlığI"]),
      item("Hibe ve Teşvik Danışmanlığı", "service"),
      item("İş / Şirket Temsilcilik Oturumu", "service"),
    ],
    relatedOperations: [],
    relatedTags: [
      tag("Şirket Kurulumu", "Şirket Kurulumu", "company-investment"),
      tag("Yatırım Danışmanlığı", "Yatırım Danışmanlığı", "company-investment"),
      tag("Startup", "Startup Vizesi", "company-investment"),
      tag("Girişimci", "Girişimci Vizesi", "company-investment"),
    ],
  },
  {
    key: "legal-official",
    icon: "⚖",
    title: "Hukuki ve Resmi Süreçler",
    shortDescription: "İtiraz, red sonrası, denklik ve resmi belge süreçleri",
    userVisibleDescription: "İtiraz, red sonrası, denklik ve resmi belge süreçleri",
    secondStepLabel: "Resmi süreç türü",
    secondStepPlaceholder: "Destek türü seçin",
    countryPlaceholder: "Hukuki süreç için hedef ülke seçin",
    recommendedCountries: ["Almanya", "İngiltere", "Kanada", "ABD", "Hollanda", "Fransa", "İtalya"],
    aliases: ["hukuk", "resmi", "itiraz"],
    relatedExpertise: [
      item("İtiraz / Red Sonrası", "expertise", ["Red Sonrası"]),
      item("Soy Bağı ile Vatandaşlık", "expertise"),
      item("Vatandaşlık Hizmetleri", "expertise"),
    ],
    relatedServices: [
      item("Hukuki Danışmanlık", "legal"),
      item("Göçmenlik Hukuku", "legal"),
      item("Avukat Desteği", "legal"),
      item("Yeminli Tercüman", "legal"),
      item("Tercüme", "legal"),
      item("Mesleki Denklik", "legal"),
    ],
    relatedOperations: [
      item("Konsolosluk Yazıları", "operation"),
      item("Ön Onay İşlemleri", "operation"),
    ],
    relatedTags: [
      tag("Red Sonrası", "İtiraz / Red Sonrası", "legal-official"),
      tag("Hukuki Danışmanlık", "Hukuki Danışmanlık", "legal-official"),
      tag("Tercüme", "Tercüme", "legal-official"),
      tag("Denklik", "Mesleki Denklik", "legal-official"),
    ],
  },
  {
    key: "tourism-travel",
    icon: "✈",
    title: "Turizm ve Seyahat",
    shortDescription: "Turistik vize, seyahat planı, tur ve tatil hizmetleri",
    userVisibleDescription: "Turistik vize, seyahat planı, tur ve tatil hizmetleri",
    secondStepLabel: "Seyahat / tur türü",
    secondStepPlaceholder: "Seyahat hizmeti seçin",
    countryPlaceholder: "Turizm ve Seyahat için önerilen hedefler",
    recommendedCountries: ["Schengen Bölgesi", "Yunanistan", "İtalya", "Fransa", "Balkanlar", "Dubai / BAE", "Mısır", "Tayland"],
    aliases: ["turizm", "seyahat", "tatil"],
    relatedExpertise: [item("Turistik Vize", "expertise")],
    relatedServices: [
      item("Otobüslü Avrupa Turları", "travel"),
      item("Balkan Turları", "travel"),
      item("Gemi Turları", "travel"),
      item("Kültür Turları", "travel"),
      item("Asya Turları", "travel"),
      item("Vizesiz Turlar", "travel"),
      item("Yurtiçi ve Yurtdışı Tur Programları", "travel"),
      item("Otel Tatilleri", "travel"),
      item("Kişiye Özel Tatil Hizmetleri", "travel"),
      item("Uçak Bileti", "travel"),
      item("Transfer Hizmetleri", "travel"),
      item("Seyahat Sağlık Sigortası", "travel"),
      item("Rezervasyon Hizmeti", "travel"),
      item("Konaklama Danışmanlığı", "travel"),
    ],
    relatedOperations: [],
    relatedTags: [
      tag("Turistik Vize", "Turistik Vize", "tourism-travel"),
      tag("Balkan Turları", "Balkan Turları", "tourism-travel"),
      tag("Uçak Bileti", "Uçak Bileti", "tourism-travel"),
      tag("Transfer", "Transfer Hizmetleri", "tourism-travel"),
    ],
  },
  {
    key: "consular-operations",
    icon: "◎",
    title: "Konsolosluk ve Operasyon Hizmetleri",
    shortDescription: "Randevu, evrak, başvuru takibi ve konsolosluk operasyonları",
    userVisibleDescription: "Randevu, evrak, başvuru takibi ve konsolosluk operasyonları",
    secondStepLabel: "Operasyon hizmeti",
    secondStepPlaceholder: "İşlem türü seçin",
    countryPlaceholder: "Operasyon hizmeti için hedef ülke seçin",
    recommendedCountries: ["Almanya", "İngiltere", "ABD", "Kanada", "Fransa", "İtalya", "Hollanda", "Yunanistan"],
    aliases: ["konsolosluk", "randevu", "evrak", "operasyon"],
    relatedExpertise: [],
    relatedServices: [
      item("Tercüme", "legal"),
      item("Yeminli Tercüman", "legal"),
    ],
    relatedOperations: [
      item("Başvuru Süreç Yönetimi", "operation"),
      item("Dosya Hizmeti", "operation"),
      item("Randevu Hizmeti", "operation"),
      item("Konsolosluk İşlemleri", "operation"),
      item("Konsolosluk Yazıları", "operation"),
      item("Ön Onay İşlemleri", "operation"),
      item("Pasaport", "operation"),
      item("Evrak / Danışmanlık", "operation"),
      item("Rezervasyon Hizmeti", "operation"),
    ],
    relatedTags: [
      tag("Randevu Hizmeti", "Randevu Hizmeti", "consular-operations"),
      tag("Evrak İşlemleri", "Evrak / Danışmanlık", "consular-operations"),
      tag("Dosya Hizmeti", "Dosya Hizmeti", "consular-operations"),
      tag("Konsolosluk Yazıları", "Konsolosluk Yazıları", "consular-operations"),
      tag("Pasaport", "Pasaport", "consular-operations"),
    ],
  },
];

export const DEFAULT_POPULAR_INTENT_TAGS: IntentQuickTag[] = [
  tag("ABD Vizesi", "ABD Vizesi", "visa-services"),
  tag("Schengen", "Schengen Vizesi", "visa-services"),
  tag("Öğrenci", "Öğrenci Vizesi", "study-abroad"),
  tag("Çalışma", "Çalışma Vizesi", "international-career"),
  tag("Golden Visa", "Golden Visa", "citizenship-golden-visa"),
  tag("İngiltere Vizesi", "İngiltere Vizesi", "visa-services"),
  tag("Kanada Vizesi", "Kanada Vizesi", "visa-services"),
  tag("Dubai Vizesi", "Dubai Vizesi", "visa-services"),
  tag("Oturum", "Oturum", "migration-residence"),
  tag("Vatandaşlık", "Vatandaşlık", "citizenship-golden-visa"),
  tag("Yurtdışı Eğitim", "Yurtdışı Eğitim Danışmanlığı", "study-abroad"),
  tag("Şirket Kurulumu", "Şirket Kurulumu", "company-investment"),
  tag("Turistik Vize", "Turistik Vize", "tourism-travel"),
  tag("Aile Birleşimi", "Aile Birleşimi", "migration-residence"),
  tag("Red Sonrası", "İtiraz / Red Sonrası", "legal-official"),
  tag("Erasmus", "Erasmus Vizesi", "study-abroad"),
  tag("Freelancer", "Freelancer Vizesi", "international-career"),
  tag("Startup", "Startup Vizesi", "international-career"),
  tag("Yatırım Göçü", "Yatırım Göçü Danışmanlığı", "citizenship-golden-visa"),
  tag("Konsolosluk İşlemleri", "Konsolosluk İşlemleri", "consular-operations"),
  tag("Randevu Hizmeti", "Randevu Hizmeti", "consular-operations"),
  tag("Evrak İşlemleri", "Evrak / Danışmanlık", "consular-operations"),
];

export function intentClusterByKey(key: string | null | undefined): IntentCluster | null {
  if (!key) return null;
  return SERVICE_INTENT_CLUSTERS.find((cluster) => cluster.key === key) ?? null;
}

export function allIntentItems(cluster: IntentCluster): IntentMatchItem[] {
  const seen = new Set<string>();
  const out: IntentMatchItem[] = [];
  for (const entry of [
    ...cluster.relatedExpertise,
    ...cluster.relatedServices,
    ...cluster.relatedOperations,
  ]) {
    const label = displayIntentLabel(entry.label);
    const key = normalizeIntentText(label);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...entry, label });
  }
  return out;
}

export function orderedTagsForCluster(cluster: IntentCluster): IntentQuickTag[] {
  const seen = new Set<string>();
  const out: IntentQuickTag[] = [];
  for (const tagItem of [...cluster.relatedTags, ...DEFAULT_POPULAR_INTENT_TAGS]) {
    const key = normalizeIntentText(`${tagItem.label}:${tagItem.targetLabel}`);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(tagItem);
  }
  return out;
}

export function findIntentItemByLabel(label: string): {
  cluster: IntentCluster;
  item: IntentMatchItem;
} | null {
  const wanted = normalizeIntentText(label);
  for (const cluster of SERVICE_INTENT_CLUSTERS) {
    for (const item of allIntentItems(cluster)) {
      const labels = [item.label, ...(item.aliases ?? [])];
      if (labels.some((candidate) => normalizeIntentText(candidate) === wanted)) {
        return { cluster, item };
      }
    }
  }
  return null;
}
