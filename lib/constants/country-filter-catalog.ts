/**
 * Filtre paneli “Tüm ülkeler” için tamamlayıcı ülke kataloğu (Türkçe UI).
 * CMS (`countries`) ve firmalardan gelen isimler `mergeCountryFilterOptionsFromFirms` ile birleştirilir;
 * burada eksik egemen devlet adları tamamlanır. Kıta / vize bölgesi etiketleri bu katalogda yoktur.
 */
import raw from "./country-filter-catalog.json";

export const COUNTRY_FILTER_CATALOG: string[] = raw as string[];
