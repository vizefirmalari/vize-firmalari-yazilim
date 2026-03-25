import type { LineBreakdown, SectionScore } from "./types";

export function clampInt(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Tek bir kriter satırı — section modülleri tarafından kullanılır */
export function scoringLine(
  key: string,
  label: string,
  points: number,
  max: number
): LineBreakdown {
  const p = Math.max(0, Math.min(max, points));
  return { key, label, points: p, max };
}

export function sumSectionPoints(lines: LineBreakdown[], sectionMax: number): number {
  const raw = lines.reduce((s, l) => s + l.points, 0);
  return Math.min(sectionMax, raw);
}

export function finalizeSection(
  partial: Omit<SectionScore, "section_score">
): SectionScore {
  const section_score = sumSectionPoints(partial.lines, partial.section_max);
  return { ...partial, section_score };
}
