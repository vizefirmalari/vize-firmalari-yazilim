export type CountryFlag = {
  src: string;
  alt: string;
};

function normalizeCountryName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    // Remove Turkish-specific diacritics for matching.
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/\s+/g, "");
}

/**
 * Returns a real, sharp flag SVG from flagcdn.com for known inputs.
 * For unknown inputs returns `null` (UI uses a safe fallback).
 */
export function getCountryFlagFromName(
  countryName: string
): CountryFlag | null {
  const key = normalizeCountryName(countryName);

  const mapToIsoCode: Record<string, string> = {
    turkiye: "tr",
    turkey: "tr",
    // normalized keys won't include diacritics, so we only map ASCII here.

    almanya: "de",
    fransa: "fr",
    italya: "it",
    ispanya: "es",
    hollanda: "nl",
    polonya: "pl",
    avusturya: "at",
    cekya: "cz",
    cek: "cz",
    cin: "cn",
    japonya: "jp",

    ingiltere: "gb",
    ingliltere: "gb",
    britanya: "gb",
    birlesik: "gb",
    birlesikkrallik: "gb",
    uk: "gb",

    amerika: "us",
    abd: "us",
    usa: "us",
    birlesikdevletler: "us",

    kanada: "ca",
    schengen: "eu",
    avrupa: "eu",
  };

  const iso = mapToIsoCode[key] ?? null;
  if (!iso) return null;

  // flagcdn provides compact flag SVGs with predictable paths.
  const src = `https://flagcdn.com/w20/${iso}.svg`;
  return {
    src,
    alt: `${countryName.trim()} bayrağı`,
  };
}
