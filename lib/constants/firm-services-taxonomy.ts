/**
 * Firma hizmetleri — admin formu ve (isteğe bağlı) genel filtre birleştirmesi.
 * Alt hizmet listesi genişletilebilir; veritabanı herhangi bir string kabul eder.
 */
export const MAIN_SERVICE_CATEGORIES = [
  "Vize Hizmeti",
  "Oturum",
  "Vatandaşlık",
  "Pasaport",
  "Evrak / Danışmanlık",
] as const;

export type MainServiceCategory = (typeof MAIN_SERVICE_CATEGORIES)[number];

/** Önerilen alt hizmetler (arama ile seçilir; listede olmayan da eklenebilir) */
export const SUB_SERVICE_CATALOG = [
  "Schengen vizesi",
  "Almanya vizesi",
  "Amerika vizesi",
  "İngiltere vizesi",
  "Kanada vizesi",
  "Avustralya vizesi",
  "Öğrenci vizesi",
  "Turistik vize",
  "Ticari vize",
  "Aile birleşimi",
  "Çalışma vizesi",
  "Transit vize",
  "Pasaport işlemleri",
  "Evrak hazırlama",
  "Randevu alma",
  "Red sonrası danışmanlık",
  "VIP danışmanlık",
  "Express başvuru",
  "Konsolosluk mülakat hazırlığı",
  "Vize başvuru takibi",
  "Oturum izni uzatma",
  "Kalıcı oturum",
  "Yatırımcı vizesi",
  "Startup vizesi",
  "Dijital göçmenlik vizesi",
  "Schengen uzmanı",
  "İtiraz ve hukuki danışmanlık",
  "Çeviri ve apostil",
  "Sağlık sigortası danışmanlığı",
  "Konaklama ve uçuş planlaması",
] as const;

/** Ana sayfa / filtre checkbox listesi: DB + katalog + geriye dönük etiketler */
export function mergePublicServiceFilterOptions(
  dbNames: string[],
  legacyOptions: readonly string[] = []
): string[] {
  const set = new Set<string>();
  for (const n of MAIN_SERVICE_CATEGORIES) set.add(n);
  for (const n of SUB_SERVICE_CATALOG) set.add(n);
  for (const n of dbNames) {
    const t = n.trim();
    if (t) set.add(t);
  }
  for (const n of legacyOptions) {
    const t = n.trim();
    if (t) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "tr"));
}
