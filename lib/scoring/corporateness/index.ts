import type { CorporatenessInput, CorporatenessResult } from "./types";
import { clampInt } from "./helpers";
import { buildAdminInsights } from "./insights/build-insights";
import { scoreContentSection } from "./sections/content";
import { scoreDigitalSection } from "./sections/digital";
import { scoreLegalSection } from "./sections/legal";
import { scoreOperationsSection } from "./sections/operations";
import { scoreServicesSection } from "./sections/services";

export { mapFirmFormToCorporatenessInput } from "./map-input";
export { LINE_KEYS } from "./line-keys";
export type {
  CorporatenessAdminInsights,
  CorporatenessInput,
  CorporatenessResult,
  LineBreakdown,
  ScoringGap,
  SectionScore,
  WebsiteQualityLevel,
} from "./types";

const SECTION_SCORERS = [
  scoreLegalSection,
  scoreOperationsSection,
  scoreDigitalSection,
  scoreContentSection,
  scoreServicesSection,
] as const;

/**
 * Kurumsallık Skoru — 0–100, deterministik, panelde girilen veriye dayalıdır.
 * Hype / Akış aktivitesi kullanılmaz.
 */
export function calculateCorporatenessScore(input: CorporatenessInput): CorporatenessResult {
  const sections = SECTION_SCORERS.map((fn) => fn(input));
  const raw = sections.reduce((sum, sec) => sum + sec.section_score, 0);
  const totalScore = clampInt(raw, 0, 100);

  return {
    totalScore,
    breakdown: {
      legal: sections[0].section_score,
      operations: sections[1].section_score,
      digital: sections[2].section_score,
      content: sections[3].section_score,
      services: sections[4].section_score,
    },
    sections,
    admin: buildAdminInsights(input, sections, totalScore),
  };
}
