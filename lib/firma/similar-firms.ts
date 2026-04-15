import type { FirmRow } from "@/lib/types/firm";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";

type SimilarFirmCandidate = {
  firm: FirmRow;
  specializationOverlap: number;
  serviceOverlap: number;
  coverageOverlap: number;
  totalScore: number;
};

function normalizeTr(value: string): string {
  return value.trim().toLocaleLowerCase("tr");
}

function setFromStringList(values: string[] | null | undefined): Set<string> {
  const out = new Set<string>();
  if (!Array.isArray(values)) return out;
  for (const value of values) {
    if (typeof value !== "string") continue;
    const normalized = normalizeTr(value);
    if (normalized) out.add(normalized);
  }
  return out;
}

function setFromSpecializations(firm: FirmRow): Set<string> {
  const out = new Set<string>();
  const raw = firm as unknown as Record<string, unknown>;
  for (const option of SPECIALIZATION_OPTIONS) {
    if (raw[option.key] === true) out.add(option.key);
  }
  if (Array.isArray(firm.custom_specializations)) {
    for (const item of firm.custom_specializations) {
      const slug = normalizeTr(item.slug ?? "");
      if (slug) out.add(slug);
    }
  }
  return out;
}

function overlapCount(left: Set<string>, right: Set<string>): number {
  if (!left.size || !right.size) return 0;
  let n = 0;
  for (const item of left) {
    if (right.has(item)) n += 1;
  }
  return n;
}

export function pickSimilarFirmsForDetail(
  sourceFirm: FirmRow,
  candidates: FirmRow[],
  limit = 8
): FirmRow[] {
  if (!Array.isArray(candidates) || candidates.length === 0) return [];

  const sourceSpecializations = setFromSpecializations(sourceFirm);
  const sourceMainServices = setFromStringList(sourceFirm.main_services);
  const sourceCoverage = new Set<string>([
    ...setFromStringList(sourceFirm.countries),
    ...setFromStringList(sourceFirm.visa_regions ?? []),
  ]);

  const ranked: SimilarFirmCandidate[] = [];
  for (const firm of candidates) {
    if (firm.id === sourceFirm.id) continue;

    const specializationOverlap = overlapCount(
      sourceSpecializations,
      setFromSpecializations(firm)
    );
    const serviceOverlap = overlapCount(
      sourceMainServices,
      setFromStringList(firm.main_services)
    );
    const coverageOverlap = overlapCount(
      sourceCoverage,
      new Set<string>([
        ...setFromStringList(firm.countries),
        ...setFromStringList(firm.visa_regions ?? []),
      ])
    );

    // İlgisiz önerileri bastırmamak için en az bir gerçek benzerlik sinyali zorunlu.
    if (specializationOverlap === 0 && serviceOverlap === 0 && coverageOverlap === 0) {
      continue;
    }

    const totalScore =
      specializationOverlap * 1000 +
      serviceOverlap * 100 +
      coverageOverlap * 10 +
      firm.corporateness_score / 1000;

    ranked.push({
      firm,
      specializationOverlap,
      serviceOverlap,
      coverageOverlap,
      totalScore,
    });
  }

  ranked.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (b.specializationOverlap !== a.specializationOverlap) {
      return b.specializationOverlap - a.specializationOverlap;
    }
    if (b.serviceOverlap !== a.serviceOverlap) return b.serviceOverlap - a.serviceOverlap;
    if (b.coverageOverlap !== a.coverageOverlap) return b.coverageOverlap - a.coverageOverlap;
    if (b.firm.corporateness_score !== a.firm.corporateness_score) {
      return b.firm.corporateness_score - a.firm.corporateness_score;
    }
    return a.firm.name.localeCompare(b.firm.name, "tr");
  });

  const out: FirmRow[] = [];
  const seen = new Set<string>();
  for (const row of ranked) {
    if (seen.has(row.firm.id)) continue;
    seen.add(row.firm.id);
    out.push(row.firm);
    if (out.length >= limit) break;
  }
  return out;
}
