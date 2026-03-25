import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 20;

function websiteQualityPoints(level: CorporatenessInput["website_quality_level"]): number {
  switch (level) {
    case "professional":
      return 8;
    case "basic":
      return 4;
    default:
      return 0;
  }
}

function followerPoints(n: number): number {
  const fc = Math.max(0, Math.floor(Number(n) || 0));
  if (fc <= 0) return 0;
  if (fc < 500) return 2;
  if (fc < 2000) return 3;
  if (fc < 10000) return 4;
  if (fc < 50000) return 5;
  return 6;
}

function postPoints(n: number): number {
  const pc = Math.max(0, Math.floor(Number(n) || 0));
  if (pc <= 0) return 0;
  if (pc < 10) return 2;
  if (pc < 50) return 4;
  return 6;
}

export function scoreDigitalSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.digital.websiteQuality,
      "Web sitesi kalitesi",
      websiteQualityPoints(input.website_quality_level),
      8
    ),
    scoringLine(
      LINE_KEYS.digital.followers,
      "Toplam takipçi (dış profil)",
      followerPoints(input.social_follower_count_total),
      6
    ),
    scoringLine(
      LINE_KEYS.digital.posts,
      "Toplam gönderi (dış profil)",
      postPoints(input.social_post_count_total),
      6
    ),
  ];

  return finalizeSection({
    id: "digital",
    label: "Dijital varlık",
    section_max: MAX,
    lines,
  });
}
