import Link from "next/link";
import { notFound } from "next/navigation";

import { FirmBlogEditorForm } from "@/components/firm-panel/firm-blog-editor-form";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ post?: string; category?: string }>;
};

async function getInitialPostForEdit(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  firmId: string,
  postId: string
) {
  const selectVariants = [
    "id, title, slug, summary, cover_image_url, cover_image_alt, meta_description, body_rich, tags, category_id, faq_items, related_countries, related_visa_types, cta_buttons, status, scheduled_at, published_at",
    "id, title, slug, summary, cover_image_url, cover_image_alt, meta_description, body_rich, tags, category_id, faq_items, related_countries, related_visa_types, status, scheduled_at, published_at",
    "id, title, slug, summary, cover_image_url, cover_image_alt, meta_description, body_rich, tags, category_id, related_countries, related_visa_types, status, scheduled_at, published_at",
    "id, title, slug, summary, cover_image_url, cover_image_alt, meta_description, body_rich, tags, category_id, status, scheduled_at, published_at",
  ] as const;

  for (const selectCols of selectVariants) {
    const result = await (supabase.from("firm_blog_posts") as any)
      .select(selectCols)
      .eq("id", postId)
      .eq("firm_id", firmId)
      .maybeSingle();
    if (result.data?.id) return result.data as Record<string, unknown>;
    if (!result.error) break;
    if (!String(result.error.message ?? "").toLowerCase().includes("column")) break;
  }

  return null;
}

export default async function FirmBlogCreatePage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  const sp = await searchParams;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select(
      "id, name, brand_name, countries, schengen_expert, usa_visa_expert, student_visa_support, work_visa_support, tourist_visa_support, business_visa_support, family_reunion_support, appeal_support"
    )
    .eq("id", firmId)
    .maybeSingle();
  if (!firm) notFound();

  const postId = typeof sp.post === "string" && sp.post.trim() ? sp.post.trim() : null;
  let initialPost: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    cover_image_url: string | null;
    cover_image_alt: string;
    meta_description: string;
    body_rich: string;
    tags: string[];
    category_id: string | null;
    faq_items: Array<{ question: string; answer: string }>;
    related_countries: string[];
    related_visa_types: string[];
    cta_buttons: unknown[];
    status: "draft" | "scheduled" | "published";
    scheduled_at: string | null;
    published_at: string | null;
  } | null = null;

  if (postId) {
    const data = await getInitialPostForEdit(supabase, firmId, postId);
    if (data) {
      initialPost = {
        id: String(data.id),
        title: String(data.title ?? ""),
        slug: String(data.slug ?? ""),
        summary: String(data.summary ?? ""),
        cover_image_url: data.cover_image_url ? String(data.cover_image_url) : null,
        cover_image_alt: String(data.cover_image_alt ?? ""),
        meta_description: String(data.meta_description ?? ""),
        body_rich: String(data.body_rich ?? ""),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        category_id: data.category_id ? String(data.category_id) : null,
        faq_items: Array.isArray(data.faq_items)
          ? (data.faq_items as Array<{ question: string; answer: string }>)
          : [],
        related_countries: Array.isArray(data.related_countries)
          ? (data.related_countries as string[])
          : [],
        related_visa_types: Array.isArray(data.related_visa_types)
          ? (data.related_visa_types as string[])
          : [],
        cta_buttons: Array.isArray(data.cta_buttons) ? (data.cta_buttons as unknown[]) : [],
        status: (data.status as "draft" | "scheduled" | "published") ?? "draft",
        scheduled_at: data.scheduled_at ? String(data.scheduled_at) : null,
        published_at: data.published_at ? String(data.published_at) : null,
      };
    }
  }

  const { data: recentPosts } = await supabase
    .from("firm_blog_posts")
    .select("id, title, status, updated_at, category_id")
    .eq("firm_id", firmId)
    .order("updated_at", { ascending: false })
    .limit(8);

  const { data: categories } = await supabase
    .from("blog_categories")
    .select("id,name,slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  const categoryMap = new Map((categories ?? []).map((c) => [String(c.id), String(c.name)]));

  const { data: relatedPosts } = await supabase
    .from("firm_blog_posts")
    .select("id,title,slug,category_id")
    .eq("firm_id", firmId)
    .neq("id", initialPost?.id ?? "")
    .order("updated_at", { ascending: false })
    .limit(30);

  const firmCountries = Array.isArray(firm.countries) ? (firm.countries as string[]) : [];
  const firmVisaTypes = SPECIALIZATION_OPTIONS.filter(({ key }) =>
    Boolean((firm as unknown as Record<string, unknown>)[key])
  ).map(({ label }) => label);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/panel/${firmId}/paylasim`}
          className="inline-flex min-h-10 items-center rounded-xl border border-[#1A1A1A]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
        >
          ← Paylaşım merkezine dön
        </Link>
        <div className="rounded-xl border border-[#1A1A1A]/10 bg-white px-3 py-2 text-xs text-[#1A1A1A]/62">
          Yayınlarınız ileride Akış modülünde gösterilecek veri yapısıyla saklanır.
        </div>
      </div>

      <FirmBlogEditorForm
        key={initialPost?.id ?? "new-post"}
        firmId={firmId}
        initialPost={initialPost}
        firmCountries={firmCountries}
        firmVisaTypes={firmVisaTypes}
        categoryOptions={(categories ?? []).map((c) => ({ id: String(c.id), name: String(c.name), slug: String(c.slug) }))}
        relatedSuggestions={(relatedPosts ?? []).map((p) => ({
          id: String(p.id),
          title: String(p.title),
          slug: String(p.slug),
          categoryId: p.category_id ? String(p.category_id) : null,
        }))}
      />

      <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
          Yayın arşivi
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {(recentPosts ?? []).map((p) => (
            <li
              key={String(p.id)}
              className="flex items-center justify-between rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#0B3C5D]">
                  {String(p.title || "Başlıksız")}
                </p>
                <p className="text-xs text-[#1A1A1A]/55">{String(p.status)}</p>
                <p className="text-[11px] text-[#0B3C5D]/70">
                  {p.category_id ? categoryMap.get(String(p.category_id)) ?? "Kategori" : "Kategori yok"}
                </p>
              </div>
              <Link
                href={`/panel/${firmId}/paylasim/blog?post=${String(p.id)}`}
                className="text-xs font-semibold text-[#0B3C5D] hover:underline"
              >
                Düzenle
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
