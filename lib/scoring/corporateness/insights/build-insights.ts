import type {
  CorporatenessAdminInsights,
  CorporatenessInput,
  ScoringGap,
  SectionScore,
} from "../types";
import { suggestionForLine } from "./suggestions";

function sectionRatio(s: SectionScore): number {
  return s.section_max > 0 ? s.section_score / s.section_max : 1;
}

function buildSummary(
  totalScore: number,
  sections: SectionScore[]
): string {
  const ranked = [...sections].sort((a, b) => sectionRatio(b) - sectionRatio(a));
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  const bestPct = best ? Math.round(sectionRatio(best) * 100) : 0;
  const worstPct = worst ? Math.round(sectionRatio(worst) * 100) : 0;

  return (
    `Toplam Kurumsallık Skoru ${totalScore}/100. ` +
    (best && best.section_max > 0
      ? `En güçlü bölüm: ${best.label} (${best.section_score}/${best.section_max}, %${bestPct}). `
      : "") +
    (worst && worst !== best && worst.section_max > 0
      ? `Öncelikli gelişim alanı: ${worst.label} (${worst.section_score}/${worst.section_max}, %${worstPct}).`
      : "")
  ).trim();
}

function buildGaps(
  sections: SectionScore[],
  input: CorporatenessInput
): ScoringGap[] {
  const out: ScoringGap[] = [];
  for (const sec of sections) {
    for (const line of sec.lines) {
      const missed = line.max - line.points;
      if (missed <= 0) continue;
      const suggestion = suggestionForLine(line.key, line, input);
      out.push({
        key: line.key,
        sectionId: sec.id,
        sectionLabel: sec.label,
        lineLabel: line.label,
        pointsEarned: line.points,
        pointsMax: line.max,
        missedPoints: missed,
        suggestion: suggestion || `"${line.label}" alanını tamamlayın.`,
      });
    }
  }
  out.sort((a, b) => b.missedPoints - a.missedPoints);
  return out;
}

function buildHintsFromGaps(gaps: ScoringGap[], limit: number): string[] {
  const hints: string[] = [];
  for (const g of gaps.slice(0, limit)) {
    hints.push(`${g.sectionLabel}: ${g.lineLabel} — ${g.missedPoints} puan kazanılabilir.`);
  }
  if (hints.length === 0) {
    hints.push("Tüm kriterlerde üst banda yakınsınız veya kalan eksikler küçük.");
  }
  return hints;
}

function buildNextSteps(gaps: ScoringGap[]): string[] {
  const steps: string[] = [];
  const seen = new Set<string>();
  for (const g of gaps) {
    if (steps.length >= 5) break;
    const t = g.suggestion.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    steps.push(t);
  }
  return steps;
}

export function buildAdminInsights(
  input: CorporatenessInput,
  sections: SectionScore[],
  totalScore: number
): CorporatenessAdminInsights {
  const gaps = buildGaps(sections, input);
  return {
    summary: buildSummary(totalScore, sections),
    gaps,
    nextSteps: buildNextSteps(gaps),
    hints: buildHintsFromGaps(gaps, 8),
  };
}
