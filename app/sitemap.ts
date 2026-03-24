import type { MetadataRoute } from "next";
import { getAllFirmSlugs } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const slugs = await getAllFirmSlugs();

  const firmEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/firma/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...firmEntries,
  ];
}
