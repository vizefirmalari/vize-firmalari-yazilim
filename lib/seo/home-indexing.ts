import { parseFirmFilters } from "@/lib/data/firms";

/**
 * Ana liste sayfasında filtre / sıralama / arama veya auth modali parametreleri varken
 * indekslemeyi kapatır; kanonik her zaman kök URL kalır (duplicate içerik önlenir).
 */
export function homePageShouldNoindex(sp: {
  [key: string]: string | string[] | undefined;
}): boolean {
  const auth = typeof sp.auth === "string" ? sp.auth.trim() : "";
  if (auth.length > 0) return true;

  const next = typeof sp.next === "string" ? sp.next.trim() : "";
  if (next.length > 0) return true;

  const f = parseFirmFilters(sp);
  if (f.q.trim().length > 0) return true;
  if (f.countries.length > 0) return true;
  if (f.visaTypes.length > 0) return true;
  if (f.cities.length > 0) return true;
  if (f.mainServices.length > 0) return true;
  if (f.exploreFocusSlug) return true;
  if (f.sort !== "hype_desc") return true;

  return false;
}
