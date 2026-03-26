function normalizeCoverageLabel(input: string): string {
  return input
    .trim()
    .toLowerCase()
    // Turkish diacritic normalization for matching.
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/\s+/g, "");
}

export function isRegionCoverageLabel(raw: string): boolean {
  const label = raw?.trim();
  if (!label) return false;
  const normalized = normalizeCoverageLabel(label);
  if (!normalized) return false;
  return isRegionLabel(normalized);
}

function isRegionLabel(normalized: string): boolean {
  // Region examples: Schengen Bölgesi, Avrupa Birliği.
  // We keep this intentionally strict to avoid misclassifying real country names.

  // Schengen region
  if (
    normalized === "schengen" ||
    normalized === "schengenbolgesi" ||
    (normalized.includes("schengen") && normalized.includes("bolgesi"))
  ) {
    return true;
  }

  // EU / AB
  if (normalized === "ab") return true;
  if (normalized === "avrupabirligi" || (normalized.includes("avrupa") && normalized.includes("birligi"))) {
    return true;
  }

  // Generic "Bölgesi" patterns (helps future data while staying controlled)
  if (normalized.endsWith("bolgesi")) return true;

  return false;
}

export function splitRegionsAndCountries(
  items: string[] | null | undefined
): { regions: string[]; countries: string[] } {
  const input = Array.isArray(items) ? items : [];

  const regions: string[] = [];
  const countries: string[] = [];
  const seenRegions = new Set<string>();
  const seenCountries = new Set<string>();

  for (const raw of input) {
    const label = raw?.trim();
    if (!label) continue;

    const normalized = normalizeCoverageLabel(label);
    if (!normalized) continue;

    if (isRegionLabel(normalized)) {
      if (!seenRegions.has(normalized)) {
        regions.push(label);
        seenRegions.add(normalized);
      }
    } else {
      if (!seenCountries.has(normalized)) {
        countries.push(label);
        seenCountries.add(normalized);
      }
    }
  }

  return { regions, countries };
}

