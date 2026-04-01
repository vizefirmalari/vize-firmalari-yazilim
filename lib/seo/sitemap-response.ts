import { NextResponse } from "next/server";
import { buildUrlSetXml, getSitemapChunk } from "@/lib/seo/sitemap-core";

export async function buildSectionSitemapResponse(section: string) {
  const entries = await getSitemapChunk(section);
  if (entries.length === 0) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, s-maxage=900, stale-while-revalidate=86400",
        },
      }
    );
  }
  const xml = buildUrlSetXml(entries);
  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}

