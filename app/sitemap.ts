import type { MetadataRoute } from "next";
import { getSitemapBlogEntries, getSitemapFirmEntries } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo/canonical";
import { listPublicDocumentPages } from "@/lib/seo/public-routes";

/**
 * Tek sitemap çıktısı. URL sayısı ~50.000’i aşarsa `sitemap-index.xml` +
 * bölümlenmiş `sitemap-*.xml` route’ları eklenmeli (Next.js MetadataRoute.Sitemap).
 */
const MAX_URL_HINT = 45_000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...listPublicDocumentPages().map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
  ];

  const firmRows = await getSitemapFirmEntries();
  const firmEntries: MetadataRoute.Sitemap = firmRows.map((r) => ({
    url: absoluteUrl(`/firma/${r.slug}`),
    lastModified: r.created_at ? new Date(r.created_at) : now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRows = await getSitemapBlogEntries();
  const blogEntries: MetadataRoute.Sitemap = blogRows
    .filter((r) => r.firm_slug && r.post_slug)
    .map((r) => ({
      url: absoluteUrl(`/firma/${r.firm_slug}/blog/${r.post_slug}`),
      lastModified: r.published_at ? new Date(r.published_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const merged = [...staticPages, ...firmEntries, ...blogEntries];
  if (merged.length > MAX_URL_HINT) {
    console.warn(
      `[sitemap] URL sayısı (${merged.length}) önerilen üst sınırı aştı; sitemap index’e geçilmeli.`
    );
  }

  const seen = new Set<string>();
  return merged.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
