import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 20;

/** 0–10: çalışan sayısına göre ölçekli */
function employeeBandPoints(n: number): number {
  const ec = Math.max(0, Math.floor(Number(n) || 0));
  if (ec <= 0) return 0;
  if (ec <= 2) return 2;
  if (ec <= 5) return 4;
  if (ec <= 15) return 7;
  if (ec <= 40) return 9;
  return 10;
}

function consultantPoints(n: number): number {
  const c = Math.max(0, Math.floor(Number(n) || 0));
  if (c <= 0) return 0;
  if (c <= 2) return 2;
  if (c <= 5) return 4;
  return 5;
}

function officeCountPoints(n: number): number {
  const o = Math.max(0, Math.floor(Number(n) || 0));
  if (o <= 0) return 0;
  if (o === 1) return 3;
  if (o === 2) return 4;
  return 5;
}

export function scoreOperationsSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.operations.employees,
      "Çalışan sayısı (ölçekli)",
      employeeBandPoints(input.employee_count),
      10
    ),
    scoringLine(
      LINE_KEYS.operations.consultants,
      "Danışman sayısı",
      consultantPoints(input.consultant_count),
      5
    ),
    scoringLine(
      LINE_KEYS.operations.offices,
      "Ofis sayısı",
      officeCountPoints(input.office_count),
      5
    ),
  ];

  return finalizeSection({
    id: "operations",
    label: "Operasyonel kapasite",
    section_max: MAX,
    lines,
  });
}
