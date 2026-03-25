import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 15;

export function scoreContentSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.content.descriptions,
      "Kısa ve uzun açıklamalar",
      input.descriptions_score_0_5,
      5
    ),
    scoringLine(
      LINE_KEYS.content.seoBundle,
      "SEO alanları",
      input.seo_score_0_5,
      5
    ),
    scoringLine(
      LINE_KEYS.content.logo,
      "Logo ve erişilebilirlik",
      input.logo_score_0_5,
      5
    ),
  ];

  return finalizeSection({
    id: "content",
    label: "Profil ve içerik kalitesi",
    section_max: MAX,
    lines,
  });
}
