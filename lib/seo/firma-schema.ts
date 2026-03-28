import { splitRegionsAndCountries } from "@/lib/firma/split-coverage-regions-countries";
import type { FirmRow } from "@/lib/types/firm";

function keywordString(firm: FirmRow): string | undefined {
  const tags = Array.isArray(firm.tags) ? firm.tags.filter(Boolean) : [];
  const allCoverage = Array.isArray(firm.countries) ? firm.countries : [];
  const { regions, countries } = splitRegionsAndCountries(allCoverage);
  const coverageAll = [...regions, ...countries];

  const keywordSet = new Set<string>();
  for (const k of tags) {
    const s = String(k).trim();
    if (s) keywordSet.add(s);
  }
  for (const c of coverageAll) {
    const s = String(c).trim();
    if (s) keywordSet.add(s);
  }
  return keywordSet.size ? Array.from(keywordSet).join(", ") : undefined;
}

export function buildFirmSchemaGraph(
  firm: FirmRow,
  pageUrl: string,
  homeUrl: string
) {
  const ogOrLogo =
    firm.og_image_url?.trim() || firm.logo_url?.trim() || undefined;
  const allCoverage = Array.isArray(firm.countries) ? firm.countries : [];
  const { regions, countries } = splitRegionsAndCountries(allCoverage);
  const coverageAll = [...regions, ...countries];
  const keywords = keywordString(firm);

  const professionalService: Record<string, unknown> = {
    "@type": "ProfessionalService",
    name: firm.name,
    description: firm.description ?? undefined,
    url: pageUrl,
    telephone: firm.phone ?? undefined,
    email: firm.email ?? undefined,
    keywords,
    areaServed: coverageAll.map((c) => ({
      "@type": "Place",
      name: c,
    })),
    image: ogOrLogo,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana sayfa",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: firm.name,
        item: pageUrl,
      },
    ],
  };

  const graph: object[] = [professionalService, breadcrumb];

  const faq = Array.isArray(firm.faq_json) ? firm.faq_json : [];
  if (faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
