/** Dahili bölge anahtarı — saklama ve sıralama için */
export type VisaRegionToken =
  | "schengen"
  | "uk"
  | "usa"
  | "canada"
  | "uae"
  | "australia"
  | "asia"
  | "africa";

/** Veritabanı / API’de gösterilen Türkçe etiketler (sabit) */
export const VISA_REGION_LABEL: Record<VisaRegionToken, string> = {
  schengen: "Schengen Bölgesi",
  uk: "İngiltere",
  usa: "ABD",
  canada: "Kanada",
  uae: "Dubai / BAE",
  australia: "Avustralya",
  asia: "Asya",
  africa: "Afrika",
};

/** Ticari öncelik + tutarlı kart / detay sırası */
export const VISA_REGION_TOKEN_ORDER: VisaRegionToken[] = [
  "schengen",
  "uk",
  "usa",
  "canada",
  "uae",
  "australia",
  "asia",
  "africa",
];
