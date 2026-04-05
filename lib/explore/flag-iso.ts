/**
 * Keşfet kartlarında kullanılan bayraklar — ISO 3166-1 alpha-2 (küçük harf).
 * Bölge kartlarında (Schengen) bayrak yerine `euStarBadge` kullanılır.
 *
 * Tema eşlemesi (`explore-visual-themes`):
 * - Dubai → ae | İngiltere → gb | Amerika → us | Kanada → ca | Yunanistan → gr | Avustralya → au
 */
export const EXPLORE_FLAG_ISO = ["ae", "gb", "us", "ca", "gr", "au"] as const;

export type ExploreFlagIso = (typeof EXPLORE_FLAG_ISO)[number];

export function isExploreFlagIso(value: string): value is ExploreFlagIso {
  return (EXPLORE_FLAG_ISO as readonly string[]).includes(value);
}
