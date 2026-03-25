import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 15;

export function scoreContentSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(LINE_KEYS.content.logo, "Logo", input.has_logo ? 2 : 0, 2),
    scoringLine(
      LINE_KEYS.content.logoAlt,
      "Logo alt metni",
      input.has_logo_alt_text ? 1 : 0,
      1
    ),
    scoringLine(
      LINE_KEYS.content.shortDesc,
      "Kısa açıklama",
      input.has_short_description ? 2 : 0,
      2
    ),
    scoringLine(
      LINE_KEYS.content.longDesc,
      "Uzun açıklama",
      input.has_long_description ? 3 : 0,
      3
    ),
    scoringLine(
      LINE_KEYS.content.pageHeading,
      "Sayfa başlığı",
      input.has_page_heading ? 1 : 0,
      1
    ),
    scoringLine(
      LINE_KEYS.content.pageSubheading,
      "Sayfa alt başlığı",
      input.has_page_subheading ? 1 : 0,
      1
    ),
    scoringLine(
      LINE_KEYS.content.seoTitle,
      "SEO başlığı",
      input.has_seo_title ? 1 : 0,
      1
    ),
    scoringLine(
      LINE_KEYS.content.metaDescription,
      "Meta açıklama",
      input.has_meta_description ? 2 : 0,
      2
    ),
    scoringLine(LINE_KEYS.content.tags, "Etiketler", input.has_tags ? 1 : 0, 1),
    scoringLine(
      LINE_KEYS.content.ogFields,
      "Open Graph alanları",
      input.has_og_fields ? 1 : 0,
      1
    ),
  ];

  return finalizeSection({
    id: "content",
    label: "Kurumsal görünürlük ve içerik olgunluğu",
    section_max: MAX,
    lines,
  });
}
