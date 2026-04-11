/**
 * Ülke adı → ISO 3166-1 alpha-2 → flagcdn.com görseli.
 * https://flagcdn.com/w40/{code}.png
 */

export const FLAGCDN_WIDTH = 40;

/**
 * flagcdn.com yalnızca belirli genişlikleri sunar (w20, w40, w80, …).
 * w28 gibi ara değerler 404 verir; UI’da bayrakların düşmemesi için en yakın desteklenen genişliğe yuvarlanır.
 * @see https://flagcdn.com/
 */
const FLAGCDN_ALLOWED_WIDTHS = [20, 40, 80, 160, 320, 640, 1280, 2560] as const;

function snapToFlagcdnWidth(px: number): number {
  const n = Number.isFinite(px) ? Math.max(16, Math.min(256, Math.round(px))) : FLAGCDN_WIDTH;
  let best: (typeof FLAGCDN_ALLOWED_WIDTHS)[number] = FLAGCDN_ALLOWED_WIDTHS[0];
  let bestDiff = Math.abs(best - n);
  for (const w of FLAGCDN_ALLOWED_WIDTHS) {
    const d = Math.abs(w - n);
    if (d < bestDiff) {
      best = w;
      bestDiff = d;
    }
  }
  return best;
}

/** flagcdn.com — `widthPx` genişliğe göre (örn. 20, 40) PNG */
export function flagUrlForIso(iso: string, widthPx: number = FLAGCDN_WIDTH): string {
  const w = snapToFlagcdnWidth(widthPx);
  return `https://flagcdn.com/w${w}/${iso.toLowerCase()}.png`;
}

function normalizeCountryName(input: string): string {
  const trimmed = input
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
  const lower = trimmed.toLocaleLowerCase("tr").normalize("NFC");
  return lower
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/\s+/g, "");
}

const warnedMissing = new Set<string>();

export function logMissingCountryMapping(countryName: string): void {
  if (process.env.NODE_ENV !== "production") {
    if (warnedMissing.has(countryName)) return;
    warnedMissing.add(countryName);
    console.warn(
      `[country-flag] Eksik ülke eşlemesi (ISO): "${countryName}" — lib/firma/country-flag.ts içine ekleyin.`
    );
  }
}

/** Schengen / AB bölgeleri için EU bayrağı (flagcdn `eu`) */
export function regionUsesEuFlag(regionLabel: string): boolean {
  const n = normalizeCountryName(regionLabel);
  if (!n) return false;
  if (n.includes("schengen")) return true;
  if (n === "ab") return true;
  if (n.includes("avrupabirligi")) return true;
  if (n.includes("avrupa") && n.includes("birligi")) return true;
  if (n === "avrupabirligi") return true;
  return false;
}

export function euFlagUrl(): string {
  return flagUrlForIso("eu");
}

/**
 * “Hizmet verilen bölgeler” rozetleri için bayrak(lar).
 * Asya / Afrika: temsili birkaç ülke bayrağı (küçük çoklu gösterim).
 */
export function getRegionFlagsForLabel(regionLabel: string): string[] | null {
  if (regionUsesEuFlag(regionLabel)) return ["eu"];

  const compact = normalizeCountryName(regionLabel).replace(/[^a-z0-9]/g, "");
  if (!compact) return null;

  if (compact === "asya" || compact === "asia") return ["jp", "cn", "kr"];
  if (compact === "afrika" || compact === "africa") return ["za", "eg", "ng"];

  if (
    compact.includes("dubai") ||
    compact.includes("bae") ||
    compact.includes("birlesikarap") ||
    compact.includes("emirlikleri")
  ) {
    return ["ae"];
  }

  const direct = getCountryFlagCodeFromName(regionLabel);
  if (direct) return [direct];

  const spaced = regionLabel
    .replace(/\s*[/\u2013\u2014]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const alt = spaced ? getCountryFlagCodeFromName(spaced) : null;
  if (alt) return [alt];

  return null;
}

/**
 * Yaygın Türkçe / İngilizce ülke adlarından ISO kodu.
 */
export function getCountryFlagCodeFromName(countryName: string): string | null {
  const key = normalizeCountryName(countryName);
  if (!key) return null;

  const map: Record<string, string> = {
    de: "de",
    germany: "de",
    almanya: "de",

    gb: "gb",
    uk: "gb",
    unitedkingdom: "gb",
    england: "gb",
    ingiltere: "gb",
    britain: "gb",
    greatbritain: "gb",

    fr: "fr",
    france: "fr",
    fransa: "fr",

    it: "it",
    italy: "it",
    italya: "it",

    nl: "nl",
    netherlands: "nl",
    holland: "nl",
    hollanda: "nl",

    ch: "ch",
    switzerland: "ch",
    isvicre: "ch",

    au: "au",
    australia: "au",
    avustralya: "au",

    at: "at",
    austria: "at",
    avusturya: "at",

    be: "be",
    belgium: "be",
    belcika: "be",

    dk: "dk",
    denmark: "dk",
    danimarka: "dk",

    ee: "ee",
    estonia: "ee",
    estonya: "ee",

    fi: "fi",
    finland: "fi",
    finlandiya: "fi",

    es: "es",
    spain: "es",
    ispanya: "es",

    se: "se",
    sweden: "se",
    isvec: "se",

    lv: "lv",
    latvia: "lv",
    letonya: "lv",

    lt: "lt",
    lithuania: "lt",
    litvanya: "lt",

    lu: "lu",
    luxembourg: "lu",
    luksemburg: "lu",

    mt: "mt",
    malta: "mt",

    no: "no",
    norway: "no",
    norvec: "no",

    pl: "pl",
    poland: "pl",
    polonya: "pl",

    pt: "pt",
    portugal: "pt",
    portekiz: "pt",

    sk: "sk",
    slovakia: "sk",
    slovakya: "sk",

    si: "si",
    slovenia: "si",
    slovenya: "si",

    gr: "gr",
    greece: "gr",
    yunanistan: "gr",

    hu: "hu",
    hungary: "hu",
    macaristan: "hu",

    is: "is",
    iceland: "is",
    izlanda: "is",

    bg: "bg",
    bulgaria: "bg",
    bulgaristan: "bg",

    cz: "cz",
    czechia: "cz",
    czechrepublic: "cz",
    cekya: "cz",
    cekcumhuriyeti: "cz",

    hr: "hr",
    croatia: "hr",
    hirvatistan: "hr",

    ro: "ro",
    romania: "ro",
    romanya: "ro",

    li: "li",
    liechtenstein: "li",
    lihtenstayn: "li",

    us: "us",
    usa: "us",
    abd: "us",
    america: "us",
    amerika: "us",
    amerikabirlesikdevletleri: "us",
    unitedstates: "us",
    unitedstatesofamerica: "us",

    ca: "ca",
    canada: "ca",
    kanada: "ca",

    ru: "ru",
    russia: "ru",
    rusya: "ru",

    cn: "cn",
    china: "cn",
    cin: "cn",

    jp: "jp",
    japan: "jp",
    japonya: "jp",

    br: "br",
    brazil: "br",
    brezilya: "br",

    ar: "ar",
    argentina: "ar",
    arjantin: "ar",

    qa: "qa",
    qatar: "qa",
    katar: "qa",

    ae: "ae",
    uae: "ae",
    unitedarabemirates: "ae",
    birlesikarapemirlikleri: "ae",
    birlesikarap: "ae",
    dubai: "ae",
    bae: "ae",

    tr: "tr",
    turkey: "tr",
    turkiye: "tr",

    ua: "ua",
    ukraine: "ua",
    ukrayna: "ua",

    mx: "mx",
    mexico: "mx",
    meksika: "mx",

    za: "za",
    southafrica: "za",
    guneyafrika: "za",

    eg: "eg",
    egypt: "eg",
    misir: "eg",

    ma: "ma",
    morocco: "ma",
    fas: "ma",

    ng: "ng",
    nigeria: "ng",
    nijerya: "ng",

    ke: "ke",
    kenya: "ke",

    dz: "dz",
    algeria: "dz",
    cezayir: "dz",

    tn: "tn",
    tunisia: "tn",
    tunus: "tn",

    sa: "sa",
    saudiarabia: "sa",
    suudiarabistan: "sa",

    jo: "jo",
    jordan: "jo",
    urdun: "jo",

    lb: "lb",
    lebanon: "lb",
    lubnan: "lb",

    iq: "iq",
    iraq: "iq",
    irak: "iq",

    ir: "ir",
    iran: "ir",

    il: "il",
    israel: "il",
    israil: "il",

    kw: "kw",
    kuwait: "kw",
    kuveyt: "kw",

    om: "om",
    oman: "om",
    umman: "om",

    bh: "bh",
    bahrain: "bh",
    bahreyn: "bh",

    ye: "ye",
    yemen: "ye",

    kr: "kr",
    southkorea: "kr",
    kore: "kr",
    guneykore: "kr",

    th: "th",
    thailand: "th",
    tayland: "th",

    vn: "vn",
    vietnam: "vn",

    sg: "sg",
    singapore: "sg",
    singapur: "sg",

    my: "my",
    malaysia: "my",
    malezya: "my",

    id: "id",
    indonesia: "id",
    endonezya: "id",

    ph: "ph",
    philippines: "ph",
    filipinler: "ph",

    in: "in",
    india: "in",
    hindistan: "in",

    pk: "pk",
    pakistan: "pk",

    by: "by",
    belarus: "by",
    belarusya: "by",

    rs: "rs",
    serbia: "rs",
    sirbistan: "rs",

    al: "al",
    albania: "al",
    arnavutluk: "al",

    mk: "mk",
    northmacedonia: "mk",
    kuzeymakedonya: "mk",

    ba: "ba",
    bosnia: "ba",
    bosnahersek: "ba",

    ge: "ge",
    georgia: "ge",
    gurcistan: "ge",

    az: "az",
    azerbaijan: "az",
    azerbaycan: "az",

    kz: "kz",
    kazakhstan: "kz",
    kazakistan: "kz",

    uz: "uz",
    uzbekistan: "uz",
    ozbekistan: "uz",

    md: "md",
    moldova: "md",
    moldovya: "md",

    cy: "cy",
    cyprus: "cy",
    kibris: "cy",

    ie: "ie",
    ireland: "ie",
    irlanda: "ie",

    nz: "nz",
    newzealand: "nz",
    yenizelanda: "nz",

    cl: "cl",
    chile: "cl",
    sili: "cl",

    co: "co",
    colombia: "co",
    kolombiya: "co",

    pe: "pe",
    peru: "pe",

    cu: "cu",
    cuba: "cu",
    kuba: "cu",

    ve: "ve",
    venezuela: "ve",

    uy: "uy",
    uruguay: "uy",

    ec: "ec",
    ecuador: "ec",
    ekvador: "ec",

    gt: "gt",
    guatemala: "gt",

    pa: "pa",
    panama: "pa",

    cr: "cr",
    costarica: "cr",
    kostarika: "cr",

    do: "do",
    dominicanrepublic: "do",
    dominikcumhuriyeti: "do",

    np: "np",
    nepal: "np",

    lk: "lk",
    srilanka: "lk",
    srillanka: "lk",

    tz: "tz",
    tanzanya: "tz",
    tanzania: "tz",

    sn: "sn",
    senegal: "sn",

    ug: "ug",
    uganda: "ug",
  };

  const code = map[key];
  if (code) return code;

  if (key.length === 2 && /^[a-z]{2}$/.test(key)) {
    return key;
  }

  return null;
}
