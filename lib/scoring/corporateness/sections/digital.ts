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
  if (n <= 0) return 0;
  if (n < 1000) return 1;
  if (n < 5000) return 2;
  if (n < 10000) return 3;
  if (n < 25000) return 4;
  return 5;
}

function postPoints(n: number): number {
  if (n <= 0) return 0;
  if (n < 20) return 1;
  if (n < 100) return 2;
  return 3;
}

export function scoreDigitalSection(input: CorporatenessInput): SectionScore {
  const ig = input.has_instagram ? 1 : 0;
  const fb = input.has_facebook ? 1 : 0;
  const li = input.has_linkedin ? 1 : 0;
  const tw = input.has_twitter ? 1 : 0;
  const socialPresence = ig + fb + li + tw;

  const fc = Math.max(0, Math.floor(Number(input.social_follower_count_total) || 0));
  const pc = Math.max(0, Math.floor(Number(input.social_post_count_total) || 0));

  const lines = [
    scoringLine(
      LINE_KEYS.digital.websiteQuality,
      "Web sitesi kalitesi",
      websiteQualityPoints(input.website_quality_level),
      8
    ),
    scoringLine(
      LINE_KEYS.digital.socialPresence,
      "Sosyal hesap varlığı (Instagram, Facebook, LinkedIn, X)",
      socialPresence,
      4
    ),
    scoringLine(
      LINE_KEYS.digital.followers,
      "Toplam takipçi (sosyal)",
      followerPoints(fc),
      5
    ),
    scoringLine(
      LINE_KEYS.digital.posts,
      "Toplam gönderi sayısı (sosyal)",
      postPoints(pc),
      3
    ),
  ];

  return finalizeSection({
    id: "digital",
    label: "Dijital varlık",
    section_max: MAX,
    lines,
  });
}
