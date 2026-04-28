import { unstable_cache } from "next/cache";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export type LatestBlogGuide = {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  categoryLabel: string;
  publishedAt: string;
};

type PostRow = {
  id: string;
  slug: string | null;
  firm_id: string | null;
  title: string | null;
  summary: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string | null;
  category_id: string | null;
  related_visa_types: string[] | null;
};

function isValidSlug(value: string | null | undefined): value is string {
  const s = String(value ?? "").trim();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}

function normalizeExcerpt(value: string | null | undefined): string {
  const raw = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!raw) return "Başvuru süreci için hazırlanan bu rehberi inceleyin.";
  return raw.length > 140 ? `${raw.slice(0, 137).trimEnd()}...` : raw;
}

function resolveCategoryLabel(
  categoryName: string | undefined,
  relatedVisaTypes: string[] | null | undefined
): string {
  const c = String(categoryName ?? "").trim();
  if (c) return c;
  const firstVisaType = Array.isArray(relatedVisaTypes) ? String(relatedVisaTypes[0] ?? "").trim() : "";
  if (firstVisaType) return firstVisaType;
  return "Vize Rehberi";
}

const getLatestBlogGuidesCached = unstable_cache(
  async (): Promise<LatestBlogGuide[]> => {
    const supabase = createSupabasePublicClient();
    if (!supabase) return [];

    const { data: postRows } = await supabase
      .from("firm_blog_posts")
      .select(
        "id,slug,firm_id,title,summary,cover_image_url,published_at,created_at,category_id,related_visa_types,status"
      )
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(120);

    const posts = (postRows ?? []) as PostRow[];
    if (!posts.length) return [];

    const firmIds = Array.from(
      new Set(posts.map((row) => String(row.firm_id ?? "")).filter((id) => id.length > 0))
    );
    if (!firmIds.length) return [];

    const [{ data: firmRows }, { data: categoryRows }] = await Promise.all([
      supabase
        .from("firms")
        .select("id,slug,status,is_indexable,firm_page_enabled")
        .in("id", firmIds)
        .eq("status", "published")
        .eq("is_indexable", true),
      supabase.from("blog_categories").select("id,name"),
    ]);

    const firmSlugById = new Map(
      (firmRows ?? [])
        .filter((row) => (row as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false)
        .map((row) => ({
          id: String((row as { id?: string }).id ?? ""),
          slug: String((row as { slug?: string }).slug ?? ""),
        }))
        .filter((row) => row.id.length > 0 && isValidSlug(row.slug))
        .map((row) => [row.id, row.slug])
    );

    const categoryNameById = new Map(
      (categoryRows ?? []).map((row) => [
        String((row as { id?: string }).id ?? ""),
        String((row as { name?: string }).name ?? ""),
      ])
    );

    const guides: LatestBlogGuide[] = [];
    for (const post of posts) {
      if (guides.length >= 20) break;
      const postSlug = String(post.slug ?? "");
      if (!isValidSlug(postSlug)) continue;
      const firmId = String(post.firm_id ?? "");
      const firmSlug = firmSlugById.get(firmId);
      if (!firmSlug || !isValidSlug(firmSlug)) continue;

      const publishedAt = String(post.published_at ?? post.created_at ?? "");
      if (!publishedAt) continue;

      guides.push({
        id: String(post.id),
        href: `/firma/${firmSlug}/blog/${postSlug}`,
        title: String(post.title ?? "").trim() || "Vize Rehberi",
        excerpt: normalizeExcerpt(post.summary),
        coverImageUrl: post.cover_image_url ? String(post.cover_image_url) : null,
        categoryLabel: resolveCategoryLabel(
          categoryNameById.get(String(post.category_id ?? "")),
          post.related_visa_types
        ),
        publishedAt,
      });
    }

    return guides;
  },
  ["latest-blog-guides-kesfet-v1"],
  { revalidate: 900 }
);

export async function getLatestBlogGuides(): Promise<LatestBlogGuide[]> {
  try {
    return await getLatestBlogGuidesCached();
  } catch (error) {
    console.error("getLatestBlogGuides error:", error);
    return [];
  }
}
