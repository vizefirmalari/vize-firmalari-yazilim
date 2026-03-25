import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 15;

function countryPoints(n: number): number {
  if (n <= 0) return 0;
  if (n <= 2) return 2;
  if (n <= 5) return 4;
  if (n <= 10) return 6;
  return 7;
}

function mainServicePoints(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 3;
  return 4;
}

function subServicePoints(n: number): number {
  if (n <= 0) return 0;
  if (n <= 3) return 1;
  if (n <= 7) return 2;
  return 3;
}

function customTagPoints(n: number): number {
  if (n < 3) return 0;
  return 1;
}

export function scoreServicesSection(input: CorporatenessInput): SectionScore {
  const cc = Math.max(0, Math.floor(Number(input.country_count) || 0));
  const mc = Math.max(0, Math.floor(Number(input.main_service_count) || 0));
  const sc = Math.max(0, Math.floor(Number(input.sub_service_count) || 0));
  const ct = Math.max(0, Math.floor(Number(input.custom_service_tag_count) || 0));

  const lines = [
    scoringLine(
      LINE_KEYS.services.countries,
      "Ülke kapsamı (seçilen ülke sayısı)",
      countryPoints(cc),
      7
    ),
    scoringLine(
      LINE_KEYS.services.mainCategories,
      "Ana hizmet kategorisi sayısı",
      mainServicePoints(mc),
      4
    ),
    scoringLine(
      LINE_KEYS.services.subServices,
      "Alt hizmet sayısı",
      subServicePoints(sc),
      3
    ),
    scoringLine(
      LINE_KEYS.services.customTags,
      "Özel hizmet etiketleri (3+)",
      customTagPoints(ct),
      1
    ),
  ];

  return finalizeSection({
    id: "services",
    label: "Hizmet kapsamı ve uzmanlık",
    section_max: MAX,
    lines,
  });
}
