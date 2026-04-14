/**
 * Vitrin arka planları — yalnızca görsel kimlik; firma verisi değil.
 * Kaynak: Unsplash (sabit photo id) + flagcdn.com (PNG bayrak).
 */
const u = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=900&q=80`;

/** Genel destinasyon / seyahat hissi — son fallback foto */
const GLOBAL_EDITORIAL_FALLBACKS = [
  u("photo-1488085061387-422e29abf400"),
  u("photo-1436491865332-7a61a109cc05"),
  u("photo-1500530855697-b586d89ba3ee"),
] as const;

const EU_FALLBACKS = [
  u("photo-1467269204594-9661b134dd2b"),
  u("photo-1499856871958-5b9627625c12"),
] as const;

export type DestinationVisual = {
  /** ISO 3166-1 alpha-2 (küçük harf); yoksa küre rozeti */
  flagIso: string | null;
  /** Öncelik sırasıyla yüklenir; hepsi kırılırsa gradient */
  imageUrls: readonly string[];
  /** Foto yokken arka plan */
  gradientClassName: string;
  /** Çok hafif ülke kimlik tonu */
  tintClassName: string;
};

function mergeUrls(
  primary: string[],
  ...fallbackTiers: readonly (readonly string[])[]
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (arr: readonly string[]) => {
    for (const x of arr) {
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    }
  };
  push(primary);
  for (const tier of fallbackTiers) push(tier);
  push([...GLOBAL_EDITORIAL_FALLBACKS]);
  return out;
}

/** Keşfet slug, `c-{ülke}` kimliği veya başlığa göre */
export function getDestinationVisual(
  cardId: string,
  title: string
): DestinationVisual {
  const gradientPrimary =
    "bg-linear-to-br from-primary/55 via-primary/35 to-secondary/40";
  const gradientEu =
    "bg-linear-to-br from-secondary/45 via-primary/30 to-primary/45";
  const gradientWarm =
    "bg-linear-to-br from-[#1a2f45] via-primary/50 to-secondary/35";
  const gradientDesert =
    "bg-linear-to-br from-[#2a2418] via-[#4a3b22]/90 to-primary/40";
  const gradientMed =
    "bg-linear-to-br from-[#1e2d3d] via-secondary/35 to-primary/45";

  const slugMap: Record<string, DestinationVisual> = {
    "ingiltere-vizesi": {
      flagIso: "gb",
      imageUrls: mergeUrls(
        [u("photo-1513635269976-596ae28d538f"), u("photo-1529655683826-aba9b3e77383")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#132d53]/28 via-[#a11830]/10 to-transparent",
    },
    "abd-vizesi": {
      flagIso: "us",
      imageUrls: mergeUrls(
        [
          u("photo-1496442226666-8d4d0e62e6e9"),
          u("photo-1485871981521-5b1fd3805eee"),
        ],
        [u("photo-1501594907352-04cda38ebc29")]
      ),
      gradientClassName: gradientWarm,
      tintClassName: "from-[#1e3a6d]/26 via-[#b22234]/8 to-transparent",
    },
    "kanada-vizesi": {
      flagIso: "ca",
      imageUrls: mergeUrls(
        [
          u("photo-1543962226-818f4301073f"),
          u("photo-1558818061-547b1114aa6a"),
        ],
        [u("photo-1511525499366-bc3f823bacb7")]
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#7b1f23]/16 via-[#1e355a]/10 to-transparent",
    },
    "dubai-vizesi": {
      flagIso: "ae",
      imageUrls: mergeUrls(
        [
          u("photo-1512453979798-5ea266f8880c"),
          u("photo-1582672060674-bc2bd808a8b5"),
        ],
        [u("photo-1518684079-3c830dcef090")]
      ),
      gradientClassName: gradientDesert,
      tintClassName: "from-[#5a3f1c]/28 via-[#1f324d]/10 to-transparent",
    },
    "yunanistan-vizesi": {
      flagIso: "gr",
      imageUrls: mergeUrls(
        [u("photo-1570077188670-e3a8d69ac5ff"), u("photo-1533105079780-92b9be482077")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientMed,
      tintClassName: "from-[#2f7fb8]/22 via-[#ffffff]/6 to-transparent",
    },
    "avustralya-vizesi": {
      flagIso: "au",
      imageUrls: mergeUrls(
        [u("photo-1523428096881-5bd79d043006"), u("photo-1523482580672-f109ba8cb9be")],
        [u("photo-1501594907352-04cda38ebc29")]
      ),
      gradientClassName: gradientWarm,
      tintClassName: "from-[#1f3b67]/24 via-[#223a62]/8 to-transparent",
    },
  };

  if (slugMap[cardId]) return slugMap[cardId]!;

  // Country-based explicit mapping (c-*) to avoid ambiguous title matching.
  const countryTitle =
    cardId.startsWith("c-") ? cardId.slice(2).trim().toLocaleLowerCase("tr") : "";
  const ISO_BY_COUNTRY_TITLE: Record<string, string> = {
    almanya: "de",
    fransa: "fr",
    hollanda: "nl",
    ingiltere: "gb",
    "birleşik krallık": "gb",
    "birlesik krallik": "gb",
    abd: "us",
    amerika: "us",
    "amerika birleşik devletleri": "us",
    "amerika birlesik devletleri": "us",
    kanada: "ca",
    dubai: "ae",
    bae: "ae",
    "birleşik arap emirlikleri": "ae",
    "birlesik arap emirlikleri": "ae",
    yunanistan: "gr",
    avustralya: "au",
    italya: "it",
    ispanya: "es",
    portekiz: "pt",
    belçika: "be",
    "belcika": "be",
    isvicre: "ch",
    "isviçre": "ch",
    avusturya: "at",
    isvec: "se",
    "isveç": "se",
    norvec: "no",
    "norveç": "no",
    danimarka: "dk",
    finlandiya: "fi",
    polonya: "pl",
    cekya: "cz",
    "çekya": "cz",
    macaristan: "hu",
    romanya: "ro",
    bulgaristan: "bg",
    hirvatistan: "hr",
    slovenya: "si",
    slovakya: "sk",
    irlanda: "ie",
    malta: "mt",
    guneykore: "kr",
    "güneykore": "kr",
    japonya: "jp",
  };
  if (countryTitle) {
    if (countryTitle === "almanya") {
      return {
        flagIso: "de",
        imageUrls: mergeUrls(
          [u("photo-1467269204594-9661b134dd2b"), u("photo-1560969184-10fe8719e047")],
          EU_FALLBACKS
        ),
        gradientClassName: gradientEu,
        tintClassName: "from-[#202020]/18 via-[#c31f2b]/8 to-transparent",
      };
    }
    if (countryTitle === "fransa") {
      return {
        flagIso: "fr",
        imageUrls: mergeUrls(
          [u("photo-1502602898657-3e91760cbb34"), u("photo-1499856871958-5b9627625c12")],
          EU_FALLBACKS
        ),
        gradientClassName: gradientEu,
        tintClassName: "from-[#1d4e8a]/20 via-[#b81f30]/8 to-transparent",
      };
    }
    if (countryTitle === "hollanda") {
      return {
        flagIso: "nl",
        imageUrls: mergeUrls(
          [u("photo-1534351590666-13e3e96b5017"), u("photo-1512470875652-80ce9acd813b")],
          EU_FALLBACKS
        ),
        gradientClassName: gradientEu,
        tintClassName: "from-[#1c4b81]/22 via-[#f45b5b]/6 to-transparent",
      };
    }
    const countryIso = ISO_BY_COUNTRY_TITLE[countryTitle];
    if (countryIso) {
      return {
        flagIso: countryIso,
        imageUrls: mergeUrls([], EU_FALLBACKS),
        gradientClassName: gradientPrimary,
        tintClassName: "from-[#1d395c]/20 via-[#328cc1]/8 to-transparent",
      };
    }
  }

  const t = title.toLowerCase();
  if (t.includes("almanya")) {
    return {
      flagIso: "de",
      imageUrls: mergeUrls(
        [u("photo-1467269204594-9661b134dd2b"), u("photo-1560969184-10fe8719e047")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#202020]/18 via-[#c31f2b]/8 to-transparent",
    };
  }
  if (t.includes("fransa")) {
    return {
      flagIso: "fr",
      imageUrls: mergeUrls(
        [
          u("photo-1502602898657-3e91760cbb34"),
          u("photo-1499856871958-5b9627625c12"),
        ],
        EU_FALLBACKS
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#1d4e8a]/20 via-[#b81f30]/8 to-transparent",
    };
  }
  if (t.includes("hollanda")) {
    return {
      flagIso: "nl",
      imageUrls: mergeUrls(
        [u("photo-1534351590666-13e3e96b5017"), u("photo-1512470875652-80ce9acd813b")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#1c4b81]/22 via-[#f45b5b]/6 to-transparent",
    };
  }
  if (t.includes("ingiltere")) {
    return {
      flagIso: "gb",
      imageUrls: mergeUrls(
        [u("photo-1513635269976-596ae28d538f"), u("photo-1529655683826-aba9b3e77383")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#132d53]/28 via-[#a11830]/10 to-transparent",
    };
  }
  if (t.includes("amerika") || t.includes("abd")) {
    return {
      flagIso: "us",
      imageUrls: mergeUrls(
        [u("photo-1496442226666-8d4d0e62e6e9"), u("photo-1485871981521-5b1fd3805eee")],
        [u("photo-1501594907352-04cda38ebc29")]
      ),
      gradientClassName: gradientWarm,
      tintClassName: "from-[#1e3a6d]/26 via-[#b22234]/8 to-transparent",
    };
  }
  if (t.includes("kanada")) {
    return {
      flagIso: "ca",
      imageUrls: mergeUrls(
        [
          u("photo-1543962226-818f4301073f"),
          u("photo-1558818061-547b1114aa6a"),
        ],
        [u("photo-1511525499366-bc3f823bacb7")]
      ),
      gradientClassName: gradientEu,
      tintClassName: "from-[#7b1f23]/16 via-[#1e355a]/10 to-transparent",
    };
  }
  if (t.includes("dubai") || t.includes("bae")) {
    return {
      flagIso: "ae",
      imageUrls: mergeUrls(
        [u("photo-1512453979798-5ea266f8880c"), u("photo-1582672060674-bc2bd808a8b5")],
        [u("photo-1518684079-3c830dcef090")]
      ),
      gradientClassName: gradientDesert,
      tintClassName: "from-[#5a3f1c]/28 via-[#1f324d]/10 to-transparent",
    };
  }
  if (t.includes("yunanistan")) {
    return {
      flagIso: "gr",
      imageUrls: mergeUrls(
        [u("photo-1570077188670-e3a8d69ac5ff"), u("photo-1533105079780-92b9be482077")],
        EU_FALLBACKS
      ),
      gradientClassName: gradientMed,
      tintClassName: "from-[#2f7fb8]/22 via-[#ffffff]/6 to-transparent",
    };
  }
  if (t.includes("avustralya")) {
    return {
      flagIso: "au",
      imageUrls: mergeUrls(
        [u("photo-1523428096881-5bd79d043006"), u("photo-1523482580672-f109ba8cb9be")],
        [u("photo-1501594907352-04cda38ebc29")]
      ),
      gradientClassName: gradientWarm,
      tintClassName: "from-[#1f3b67]/24 via-[#223a62]/8 to-transparent",
    };
  }

  return {
    flagIso: null,
    imageUrls: mergeUrls([], EU_FALLBACKS),
    gradientClassName: gradientPrimary,
    tintClassName: "from-[#1d395c]/20 via-[#328cc1]/8 to-transparent",
  };
}

export type CityVisual = {
  imageUrl: string;
  accentClass: string;
};

export function getCityVisual(cityTitle: string): CityVisual {
  const key = cityTitle.trim().toLocaleLowerCase("tr");
  const map: Record<string, CityVisual> = {
    i̇stanbul: {
      imageUrl: u("photo-1524231757912-21f4fe3a7200"),
      accentClass: "from-primary/45 via-secondary/25 to-primary/20",
    },
    istanbul: {
      imageUrl: u("photo-1524231757912-21f4fe3a7200"),
      accentClass: "from-primary/45 via-secondary/25 to-primary/20",
    },
    ankara: {
      imageUrl: u("photo-1590073844006-33379778df09"),
      accentClass: "from-secondary/40 via-primary/30 to-foreground/10",
    },
    i̇zmir: {
      imageUrl: u("photo-1507525428034-b723cf961d3e"),
      accentClass: "from-secondary/35 via-primary/25 to-secondary/20",
    },
    izmir: {
      imageUrl: u("photo-1507525428034-b723cf961d3e"),
      accentClass: "from-secondary/35 via-primary/25 to-secondary/20",
    },
    bursa: {
      imageUrl: u("photo-1441974231531-c6227db76b6e"),
      accentClass: "from-primary/40 via-primary/20 to-secondary/25",
    },
    antalya: {
      imageUrl: u("photo-1506905925346-21bda4d32df4"),
      accentClass: "from-secondary/30 via-primary/35 to-primary/15",
    },
    konya: {
      imageUrl: u("photo-1469474968028-56623f02e42e"),
      accentClass: "from-primary/35 via-secondary/20 to-primary/25",
    },
    edirne: {
      imageUrl: u("photo-1566073771259-6a8506099945"),
      accentClass: "from-primary/40 via-foreground/10 to-secondary/25",
    },
  };

  return (
    map[key] ?? {
      imageUrl: u("photo-1477959859937-fc8c934ea42e"),
      accentClass: "from-primary/35 via-secondary/20 to-primary/15",
    }
  );
}
