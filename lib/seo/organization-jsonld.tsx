import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE_URL,
} from "@/lib/seo/defaults";
import { absoluteUrl } from "@/lib/seo/canonical";

/** Site geneli Organization şeması — kök layout’ta bir kez. */
export function OrganizationJsonLd() {
  const payload = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_BRAND_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    logo: SITE_DEFAULT_OG_IMAGE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
