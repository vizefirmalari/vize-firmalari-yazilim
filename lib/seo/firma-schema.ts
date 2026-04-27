import { resolveFirmCoverageDisplay } from "@/lib/firma/resolve-firm-coverage";
import { resolveToAbsoluteImageUrl } from "@/lib/seo/blog-og-image";
import type { FirmRow } from "@/lib/types/firm";

function keywordString(firm: FirmRow): string | undefined {
  const tags = Array.isArray(firm.tags) ? firm.tags.filter(Boolean) : [];
  const allCoverage = Array.isArray(firm.countries) ? firm.countries : [];
  const { regions, countries } = resolveFirmCoverageDisplay({
    countries: allCoverage,
    visa_regions: firm.visa_regions,
  });
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
    resolveToAbsoluteImageUrl(firm.og_image_url?.trim()) ||
    resolveToAbsoluteImageUrl(firm.logo_url?.trim()) ||
    undefined;
  const logoUrl = resolveToAbsoluteImageUrl(firm.logo_url?.trim());
  const logoAlt = String(firm.logo_alt_text ?? "").trim() || `${firm.name} logosu`;
  const allCoverage = Array.isArray(firm.countries) ? firm.countries : [];
  const { regions, countries } = resolveFirmCoverageDisplay({
    countries: allCoverage,
    visa_regions: firm.visa_regions,
  });
  const coverageAll = [...regions, ...countries];
  const keywords = keywordString(firm);
  const sameAs = [
    firm.website,
    firm.instagram,
    firm.facebook,
    firm.linkedin,
    firm.youtube,
    firm.twitter,
    firm.telegram,
  ]
    .map((value) => String(value ?? "").trim())
    .filter((value) => value.length > 0);
  const streetAddress = String(firm.address ?? "").trim();
  const addressLocality = String(firm.district ?? "").trim() || String(firm.city ?? "").trim();
  const addressCountry = String(firm.hq_country ?? "").trim();
  const postalCode = String(firm.postal_code ?? "").trim();

  const localBusiness: Record<string, unknown> = {
    "@type": "LocalBusiness",
    name: firm.name,
    description: firm.description ?? firm.short_description ?? undefined,
    url: pageUrl,
    telephone: firm.phone ?? undefined,
    email: firm.email ?? undefined,
    keywords,
    areaServed: coverageAll.map((c) => ({
      "@type": "Place",
      name: c,
    })),
    image: ogOrLogo,
    logo: logoUrl
      ? {
          "@type": "ImageObject",
          url: logoUrl,
          caption: logoAlt,
        }
      : undefined,
    address:
      streetAddress || addressLocality || addressCountry || postalCode
        ? {
            "@type": "PostalAddress",
            streetAddress: streetAddress || undefined,
            addressLocality: addressLocality || undefined,
            postalCode: postalCode || undefined,
            addressCountry: addressCountry || undefined,
          }
        : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    name: firm.name,
    url: pageUrl,
    telephone: firm.phone ?? undefined,
    email: firm.email ?? undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
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

  const graph: object[] = [localBusiness, organization, breadcrumb];

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
