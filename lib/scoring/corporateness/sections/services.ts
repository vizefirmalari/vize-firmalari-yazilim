import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 15;

function countryPoints(n: number): number {
  const c = Math.max(0, Math.floor(Number(n) || 0));
  if (c <= 0) return 0;
  if (c <= 2) return 2;
  if (c <= 5) return 3;
  if (c <= 12) return 4;
  return 5;
}

function subServicePoints(n: number): number {
  const s = Math.max(0, Math.floor(Number(n) || 0));
  if (s <= 0) return 0;
  if (s <= 3) return 2;
  if (s <= 8) return 4;
  return 5;
}

/** 0–8 bayrak → 0–5 puan */
function specializationPoints(count: number): number {
  const c = Math.max(0, Math.min(8, Math.floor(Number(count) || 0)));
  if (c <= 0) return 0;
  if (c <= 2) return 2;
  if (c <= 4) return 3;
  if (c <= 6) return 4;
  return 5;
}

export function scoreServicesSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.services.countries,
      "Hizmet verilen ülke sayısı",
      countryPoints(input.countries_served_count),
      5
    ),
    scoringLine(
      LINE_KEYS.services.subServices,
      "Alt hizmet çeşitliliği",
      subServicePoints(input.sub_service_count),
      5
    ),
    scoringLine(
      LINE_KEYS.services.specialization,
      "Uzmanlık alanları (bayraklar)",
      specializationPoints(input.specialization_flag_count),
      5
    ),
  ];

  return finalizeSection({
    id: "services",
    label: "Hizmet derinliği",
    section_max: MAX,
    lines,
  });
}
