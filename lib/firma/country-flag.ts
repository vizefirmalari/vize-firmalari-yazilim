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

export function getCountryFlagCodeFromName(countryName: string): string | null {
  const key = normalizeCountryName(countryName);

  // Strict mapping for the key countries we care about on this product.
  // Source expected by UI: https://flagcdn.com/w40/{code}.png
  const map: Record<string, string> = {
    germany: "de",
    almanya: "de",
    de: "de",

    uk: "gb",
    unitedkingdom: "gb",
    england: "gb",
    ingiltere: "gb",
    britain: "gb",
    greatbritain: "gb",
    gb: "gb",

    france: "fr",
    fransa: "fr",
    fr: "fr",

    italy: "it",
    italya: "it",
    it: "it",

    netherlands: "nl",
    holland: "nl",
    hollanda: "nl",
    nl: "nl",

    switzerland: "ch",
    isvicre: "ch",
    isviçre: "ch",
    ch: "ch",

    australia: "au",
    avustralya: "au",
    au: "au",

    austria: "at",
    avusturya: "at",
    at: "at",

    belgium: "be",
    belcika: "be",
    belçika: "be",
    be: "be",

    denmark: "dk",
    danimarka: "dk",
    dk: "dk",

    finland: "fi",
    finlandiya: "fi",
    fi: "fi",

    spain: "es",
    espana: "es",
    ispanya: "es",
    es: "es",

    sweden: "se",
    isvec: "se",
    isveç: "se",
    se: "se",

    latvia: "lv",
    letonya: "lv",
    lv: "lv",

    norway: "no",
    norvec: "no",
    norveç: "no",
    no: "no",

    poland: "pl",
    polonya: "pl",
    pl: "pl",

    portugal: "pt",
    portekiz: "pt",
    pt: "pt",

    slovenia: "si",
    slovenya: "si",
    si: "si",

    greece: "gr",
    yunanistan: "gr",
    gr: "gr",

    hungary: "hu",
    macaristan: "hu",
    hu: "hu",

    iceland: "is",
    izlanda: "is",
    is: "is",
  };

  return map[key] ?? null;
}
