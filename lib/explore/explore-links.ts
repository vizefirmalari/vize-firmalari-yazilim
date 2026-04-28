import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";

function norm(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function resolveExploreHrefByTerm(term: string): string | null {
  const q = norm(term);
  if (!q) return null;

  for (const category of EXPLORE_CATEGORIES) {
    if (norm(category.label).includes(q) || q.includes(norm(category.label))) {
      return `/kesfet/${category.slug}`;
    }
    const aliases = category.match.countryAliasesAny ?? [];
    if (aliases.some((alias) => norm(alias).includes(q) || q.includes(norm(alias)))) {
      return `/kesfet/${category.slug}`;
    }
    const needles = category.match.serviceNeedlesAny ?? [];
    if (needles.some((needle) => norm(needle).includes(q) || q.includes(norm(needle)))) {
      return `/kesfet/${category.slug}`;
    }
  }

  return null;
}
