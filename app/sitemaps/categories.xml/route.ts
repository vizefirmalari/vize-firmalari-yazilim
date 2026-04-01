import { buildSectionSitemapResponse } from "@/lib/seo/sitemap-response";

export const revalidate = 900;

export async function GET() {
  return buildSectionSitemapResponse("categories");
}

