import {
  VISA_REGION_LABEL,
  VISA_REGION_TOKEN_ORDER,
  type VisaRegionToken,
} from "@/lib/visa-regions/tokens";
import { normalizeCountryKey } from "@/lib/firma/coverage-catalog";

/** Motor ile aynı sıra — “Tüm bölgeler” */
export const ALL_LISTING_VISA_REGION_LABELS: string[] =
  VISA_REGION_TOKEN_ORDER.map((t: VisaRegionToken) => VISA_REGION_LABEL[t]);

/** Popüler bölgeler — üst sıra; dönüşüm için en sık aranan rotalar */
export const POPULAR_VISA_REGION_LABELS: string[] = [
  VISA_REGION_LABEL.schengen,
  VISA_REGION_LABEL.uk,
  VISA_REGION_LABEL.usa,
  VISA_REGION_LABEL.canada,
  VISA_REGION_LABEL.uae,
];

type PopularCountryDef = { label: string; match: (n: string) => boolean };

/** Popüler ülkeler — CMS’teki adla eşleşen ilk kayıt seçilir (sıra öncelik) */
export const POPULAR_COUNTRY_DEFS: PopularCountryDef[] = [
  { label: "Almanya", match: (n) => n.includes("almanya") },
  { label: "Fransa", match: (n) => n.includes("fransa") },
  { label: "Hollanda", match: (n) => n.includes("hollanda") },
  { label: "Belçika", match: (n) => n.includes("belcika") },
  { label: "Kanada", match: (n) => n.includes("kanada") },
  { label: "Avusturya", match: (n) => n.includes("avusturya") },
  { label: "Yunanistan", match: (n) => n.includes("yunanistan") },
  {
    label: "İngiltere",
    match: (n) => n.includes("ingiltere") || n.includes("birlesikkrallik"),
  },
  { label: "Avustralya", match: (n) => n.includes("avustralya") },
];

export type PopularCountryRow = { label: string; value: string };

export function resolvePopularCountryRowsFromConfig(
  countryOptions: string[]
): PopularCountryRow[] {
  const sorted = [...countryOptions].sort((a, b) =>
    a.localeCompare(b, "tr")
  );
  const used = new Set<string>();
  const out: PopularCountryRow[] = [];
  for (const def of POPULAR_COUNTRY_DEFS) {
    const found = sorted.find((c) => {
      if (used.has(c)) return false;
      const n = normalizeCountryKey(c);
      return def.match(n);
    });
    if (found) {
      used.add(found);
      out.push({ label: def.label, value: found });
    }
  }
  return out;
}

/**
 * CMS `company_types.name` ile birebir eşleşen sabit sıra — yalnızca seçenek
 * listesinde bulunanlar gösterilir (ayrı taxonomy kopyası oluşturulmaz).
 */
export const POPULAR_FIRM_TYPE_NAME_ORDER: readonly string[] = [
  "Vize Danışmanlık Şirketi",
  "Hukuk Bürosu",
  "Seyahat Acentesi",
  "Eğitim ve Vize Danışmanlığı",
  "Vize Başvuru Merkezi",
];

export function resolvePopularFirmTypeLabelsFromOptions(
  companyTypeOptions: string[]
): string[] {
  const set = new Set(companyTypeOptions);
  return POPULAR_FIRM_TYPE_NAME_ORDER.filter((name) => set.has(name));
}

/** CMS adıyla kesişenler; sıra sabit — `main_service_categories` ile uyumlu */
export const POPULAR_MAIN_SERVICE_NAME_ORDER: readonly string[] = [
  "Vize Hizmeti",
  "Oturum",
  "Vatandaşlık",
  "Randevu Hizmeti",
  "Göçmenlik Hukuku",
  "Başvuru Süreç Yönetimi",
];

export function resolvePopularMainServiceLabelsFromOptions(
  options: string[]
): string[] {
  const set = new Set(options);
  return POPULAR_MAIN_SERVICE_NAME_ORDER.filter((name) => set.has(name));
}
