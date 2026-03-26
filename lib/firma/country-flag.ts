/** Maps common Turkish country names to flag emoji for compact UI. */
export function countryFlagEmoji(countryName: string): string | null {
  const s = countryName.trim().toLowerCase();
  const map: Record<string, string> = {
    türkiye: "🇹🇷",
    türki̇ye: "🇹🇷",
    turkey: "🇹🇷",

    almanya: "🇩🇪",
    fransa: "🇫🇷",
    italya: "🇮🇹",
    ispanya: "🇪🇸",
    i̇spanya: "🇪🇸",
    hollanda: "🇳🇱",
    polonya: "🇵🇱",
    avusturya: "🇦🇹",
    çekya: "🇨🇿",
    çek: "🇨🇿",
    çin: "🇨🇳",
    japonya: "🇯🇵",
    birleşik: "🇬🇧",
    birleşikkrallık: "🇬🇧",
    uk: "🇬🇧",
    ingiltere: "🇬🇧",
    ingliltere: "🇬🇧",
    britanya: "🇬🇧",
    brit: "🇬🇧",
    amerika: "🇺🇸",
    usa: "🇺🇸",
    birleşikdevletler: "🇺🇸",
    kanada: "🇨🇦",
    birleşmiş: "🇺🇸",

    schengen: "🇪🇺",
    avrupa: "🇪🇺",
  };
  return map[s] ?? null;
}
