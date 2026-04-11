import { COUNTRY_FILTER_CATALOG } from "./country-filter-catalog";

/** İlk görünümde gösterilen ülkeler (sıra önemli) */
export const TOP_COUNTRIES = [
  "Almanya",
  "Amerika",
  "İngiltere",
  "Kanada",
  "Fransa",
  "İtalya",
  "Hollanda",
  "İsviçre",
] as const;

/** Tamamlayıcı ülke listesi — `country-filter-catalog` + TOP (CMS yokken yedek). */
export const ALL_COUNTRIES = [
  ...new Set<string>([...TOP_COUNTRIES, ...COUNTRY_FILTER_CATALOG]),
].sort((a, b) => a.localeCompare(b, "tr"));

export const SERVICE_OPTIONS = [
  "Vize İşlemleri",
  "Oturum",
  "Vatandaşlık",
  "Form & Dilekçe",
  "Konsolosluk İşlemleri",
] as const;
