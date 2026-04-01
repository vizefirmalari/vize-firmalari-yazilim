import { NextResponse } from "next/server";
import { buildSitemapIndexXml, getSitemapIndexEntries } from "@/lib/seo/sitemap-core";

export const revalidate = 900;

export async function GET() {
  const entries = await getSitemapIndexEntries();
  const xml = buildSitemapIndexXml(entries);
  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}

