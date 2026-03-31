import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAGE_SIZE = 6;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const currentId = url.searchParams.get("currentId")?.trim() || "";
  const categoryId = url.searchParams.get("categoryId")?.trim() || "";
  const offset = Number(url.searchParams.get("offset") || "0");
  const tags = (url.searchParams.get("tags") || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 10);
  const countries = (url.searchParams.get("countries") || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 10);

  const supabase = await createSupabaseServerClient();
  if (!supabase || !currentId) {
    return NextResponse.json({ items: [], hasMore: false }, { status: 200 });
  }

  let query = supabase
    .from("firm_blog_posts")
    .select("id,title,slug,summary,cover_image_url,published_at,category_id,tags,related_countries")
    .eq("status", "published")
    .not("published_at", "is", null)
    .neq("id", currentId)
    .order("published_at", { ascending: false });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  if (tags.length > 0) {
    query = query.overlaps("tags", tags);
  }
  if (countries.length > 0) {
    query = query.overlaps("related_countries", countries);
  }

  const { data, error } = await query.range(offset, offset + PAGE_SIZE - 1);
  if (error) {
    return NextResponse.json({ items: [], hasMore: false }, { status: 200 });
  }

  return NextResponse.json({
    items: (data ?? []).map((item) => ({
      id: String(item.id),
      title: String(item.title ?? ""),
      slug: String(item.slug ?? ""),
      summary: String(item.summary ?? ""),
      coverImageUrl: item.cover_image_url ? String(item.cover_image_url) : null,
      publishedAt: item.published_at ? String(item.published_at) : null,
    })),
    hasMore: (data ?? []).length === PAGE_SIZE,
  });
}

