import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyBackButton } from "@/components/blog/sticky-back-button";
import { BlogAdSlot } from "@/components/blog/blog-ad-slot";
import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";
import { FirmContactSheet } from "@/components/blog/firm-contact-sheet";
import { RelatedPostsInfinite } from "@/components/blog/related-posts-infinite";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";
import { pickWeightedAd, type BlogAdRow } from "@/lib/blog/ads";
import { getSiteUrl } from "@/lib/env";

type Props = {
  params: Promise<{ slug: string; postSlug: string }>;
};

type FaqItem = { question: string; answer: string };
type DbClient =
  | NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>
  | NonNullable<ReturnType<typeof createSupabaseServiceRoleClient>>;
type PostRow = {
  id: string;
  firm_id: string | null;
  title: string | null;
  slug: string | null;
  summary: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  body_rich: string | null;
  published_at: string | null;
  tags?: string[] | null;
  cta_buttons?: unknown[] | null;
  related_countries?: string[] | null;
  faq_items?: FaqItem[] | null;
  faq_schema_json?: unknown;
  category_id?: string | null;
  company_slug?: string | null;
  company_name?: string | null;
  company_logo_url?: string | null;
};

const getActiveBlogAds = unstable_cache(
  async () => {
    const service = createSupabaseServiceRoleClient();
    if (!service) return [] as BlogAdRow[];
    const { data } = await service
      .from("blog_ads")
      .select("id,ad_type,title,advertiser_name,image_url,cta_text,sponsor_name,sponsor_logo_url,native_image_url,native_title,native_description,target_url,position,weight,start_date,end_date,is_active,target_category_ids,target_countries,target_visa_types")
      .eq("is_active", true);
    const now = Date.now();
    return ((data ?? []) as BlogAdRow[]).filter((item) => {
      const startOk = new Date(item.start_date).getTime() <= now;
      const endOk = !item.end_date || new Date(item.end_date).getTime() >= now;
      return startOk && endOk;
    });
  },
  ["blog-active-ads"],
  { revalidate: 300 }
);

function includesTarget(list: string[] | null | undefined, value: string | null | undefined): boolean {
  if (!Array.isArray(list) || list.length === 0) return true;
  if (!value) return false;
  return list.includes(value);
}

function splitBodyForMiddleAd(html: string): { first: string; second: string } {
  const parts = html.split("</p>");
  if (parts.length <= 3) return { first: html, second: "" };
  const mid = Math.floor(parts.length / 2);
  const first = `${parts.slice(0, mid).join("</p>")}</p>`;
  const second = `${parts.slice(mid).join("</p>")}`;
  return { first, second };
}

async function getPublishedPostBySlug(
  dataClient: DbClient,
  postSlug: string
) {
  const selectVariants = [
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,cta_buttons,related_countries,faq_items,faq_schema_json,category_id,company_slug,company_name,company_logo_url",
    // Backward-compatible fallback for environments missing newer blog columns.
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,cta_buttons,related_countries,faq_items,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,cta_buttons,related_countries,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,cta_buttons,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,related_countries,faq_items,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,related_countries,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,category_id,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,category_id,company_name",
  ] as const;

  for (const selectCols of selectVariants) {
    const postsTable = dataClient.from("firm_blog_posts") as any;
    const primary = await postsTable
      .select(selectCols)
      .eq("slug", postSlug)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (primary.data?.id) return primary.data as PostRow;
    if (!primary.error) continue;
    if (!String(primary.error.message ?? "").toLowerCase().includes("column")) continue;

    const relaxed = await postsTable
      .select(selectCols)
      .ilike("slug", postSlug)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (relaxed.data?.id) return relaxed.data as PostRow;
    if (!relaxed.error) continue;
    if (!String(relaxed.error.message ?? "").toLowerCase().includes("column")) {
      return null;
    }
  }

  const postsTable = dataClient.from("firm_blog_posts") as any;
  const finalTry = await postsTable
    .select(selectVariants[selectVariants.length - 1])
    .ilike("slug", postSlug)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (finalTry.data as PostRow | null) ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { slug, postSlug } = await params;
  const supabase = await createSupabaseServerClient();
  const service = createSupabaseServiceRoleClient();
  const dataClient = service ?? supabase;
  if (!dataClient) return {};
  const db = dataClient;
  const post = await getPublishedPostBySlug(db, postSlug);
  if (!post?.id) return {};
  let resolvedSlug = String((post as { company_slug?: string | null }).company_slug ?? slug);
  if (!resolvedSlug && post.firm_id) {
    const { data: firm } = await db.from("firms").select("slug").eq("id", String(post.firm_id)).maybeSingle();
    resolvedSlug = String(firm?.slug ?? slug);
  }

  const canonical = `${getSiteUrl().replace(/\/$/, "")}/firma/${resolvedSlug}/blog/${postSlug}`;
  return {
    title: String(post.title),
    description: String(post.meta_description ?? ""),
    alternates: { canonical },
    openGraph: {
      title: String(post.title),
      description: String(post.meta_description ?? ""),
      url: canonical,
      images: post.cover_image_url ? [{ url: String(post.cover_image_url) }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: String(post.title),
      description: String(post.meta_description ?? ""),
      images: post.cover_image_url ? [String(post.cover_image_url)] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, postSlug } = await params;
  const supabase = await createSupabaseServerClient();
  const service = createSupabaseServiceRoleClient();
  const dataClient = service ?? supabase;
  if (!dataClient) notFound();
  const db = dataClient;

  // URL'deki firma slug yanlış olsa bile yazıyı postSlug üzerinden bul.
  const post = await getPublishedPostBySlug(db, postSlug);
  if (!post?.id) notFound();

  const postCompanySlug = String((post as { company_slug?: string | null }).company_slug ?? "");
  const postCompanyName = String((post as { company_name?: string | null }).company_name ?? "");
  const postCompanyLogo = (post as { company_logo_url?: string | null }).company_logo_url ?? null;

  const { data: firm } = post.firm_id
    ? await db
        .from("firms")
        .select("id,slug,name,logo_url,whatsapp,phone,email,website,address,working_hours,main_services,countries,founded_year,firm_category,schengen_expert,usa_visa_expert,student_visa_support,work_visa_support,tourist_visa_support,business_visa_support,family_reunion_support,appeal_support")
        .eq("id", String(post.firm_id))
        .maybeSingle()
    : { data: null };

  const expertiseLabels = [
    firm?.schengen_expert ? "Schengen Vizesi" : null,
    firm?.usa_visa_expert ? "ABD Vizesi" : null,
    firm?.student_visa_support ? "Öğrenci Vizesi" : null,
    firm?.work_visa_support ? "Çalışma Vizesi" : null,
    firm?.tourist_visa_support ? "Turistik Vize" : null,
    firm?.business_visa_support ? "Ticari Vize" : null,
    firm?.family_reunion_support ? "Aile Birleşimi" : null,
    firm?.appeal_support ? "Vize Red İtirazı" : null,
  ].filter((x): x is string => Boolean(x));

  const resolvedFirmSlug = String(firm?.slug ?? postCompanySlug ?? "");
  if (!resolvedFirmSlug) notFound();

  if (resolvedFirmSlug !== slug) {
    redirect(`/firma/${resolvedFirmSlug}/blog/${postSlug}`);
  }

  const { data: category } = post.category_id
    ? await db.from("blog_categories").select("name").eq("id", String(post.category_id)).maybeSingle()
    : { data: null };

  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];
  const countries = Array.isArray(post.related_countries) ? (post.related_countries as string[]) : [];
  const faqItems = Array.isArray(post.faq_items) ? (post.faq_items as FaqItem[]) : [];
  const ctaButtons = normalizeBlogCtaButtons(post.cta_buttons ?? []);
  const { first, second } = splitBodyForMiddleAd(String(post.body_rich ?? ""));

  const { data: initialRelated } = await db
    .from("firm_blog_posts")
    .select("id,title,slug,summary,cover_image_url,published_at")
    .eq("status", "published")
    .eq("category_id", post.category_id ?? "")
    .neq("id", String(post.id))
    .order("published_at", { ascending: false })
    .limit(6);

  const ads = await getActiveBlogAds();
  const daySeed = new Date().toISOString().slice(0, 10);
  const targetedAds = ads.filter((ad) => {
    const byCategory = includesTarget(ad.target_category_ids, post.category_id ? String(post.category_id) : null);
    const byCountry =
      !Array.isArray(ad.target_countries) ||
      ad.target_countries.length === 0 ||
      countries.some((country) => ad.target_countries?.includes(country));
    const byVisa =
      !Array.isArray(ad.target_visa_types) ||
      ad.target_visa_types.length === 0 ||
      tags.some((tag) => ad.target_visa_types?.includes(tag));
    return byCategory && byCountry && byVisa;
  });
  const topAd = pickWeightedAd(targetedAds.filter((x) => x.position === "top"), `${post.id}-top-${daySeed}`);
  const middlePool = targetedAds.filter((x) => x.position === "middle" && x.id !== topAd?.id);
  const middleAd = pickWeightedAd(middlePool, `${post.id}-middle-${daySeed}`);
  const bottomPool = targetedAds.filter((x) => x.position === "bottom" && x.id !== topAd?.id && x.id !== middleAd?.id);
  const bottomAd = pickWeightedAd(bottomPool, `${post.id}-bottom-${daySeed}`);

  const canonical = `${getSiteUrl().replace(/\/$/, "")}/firma/${resolvedFirmSlug}/blog/${postSlug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    datePublished: post.published_at,
    dateModified: post.published_at,
    image: post.cover_image_url ? [post.cover_image_url] : [],
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: String(firm?.name ?? postCompanyName ?? "") },
    publisher: {
      "@type": "Organization",
      name: String(firm?.name ?? postCompanyName ?? ""),
      logo: post.cover_image_url ? { "@type": "ImageObject", url: post.cover_image_url } : undefined,
    },
  };
  const faqSchema = post.faq_schema_json && typeof post.faq_schema_json === "object" ? post.faq_schema_json : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-10 mb-3 w-fit sm:top-20">
          <StickyBackButton fallbackHref={`/firma/${resolvedFirmSlug}`} />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/firma/${resolvedFirmSlug}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#0B3C5D]/10 bg-white p-3 shadow-sm">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#F3F6F8] ring-1 ring-[#0B3C5D]/10">
              {(firm?.logo_url || postCompanyLogo) ? (
                <Image
                  src={String(firm?.logo_url ?? postCompanyLogo)}
                  alt={`${String(firm?.name ?? postCompanyName ?? "Firma")} logosu`}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#1A1A1A]/55">Firma profili</p>
              <p className="truncate text-sm font-semibold text-[#0B3C5D]">{String(firm?.name ?? postCompanyName ?? "Firma")}</p>
            </div>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link href={`/firma/${resolvedFirmSlug}`} className="rounded-xl border border-[#0B3C5D]/20 bg-[#F7F9FB] px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]">
              Firma sayfası
            </Link>
            <FirmContactSheet
              firm={{
                slug: resolvedFirmSlug,
                name: String(firm?.name ?? postCompanyName ?? "Firma"),
                logoUrl: String(firm?.logo_url ?? postCompanyLogo ?? "") || null,
                firmType: String(firm?.firm_category ?? "") || null,
                foundedYear: typeof firm?.founded_year === "number" ? firm.founded_year : null,
                mainServices: Array.isArray(firm?.main_services) ? (firm.main_services as string[]) : [],
                expertises: expertiseLabels,
                countries: Array.isArray(firm?.countries) ? (firm.countries as string[]) : [],
                phone: String(firm?.phone ?? "") || null,
                whatsapp: String(firm?.whatsapp ?? "") || null,
                email: String(firm?.email ?? "") || null,
                website: String(firm?.website ?? "") || null,
                address: String(firm?.address ?? "") || null,
                workingHours: String(firm?.working_hours ?? "") || null,
              }}
            />
          </div>
        </div>

        <article className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
            {post.cover_image_url ? (
              <div className="relative aspect-1200/630 w-full">
                <Image
                  src={String(post.cover_image_url)}
                  alt={String(post.cover_image_alt || post.title)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="space-y-2 p-5">
              <div className="flex flex-wrap items-center gap-2">
                {category?.name ? (
                  <span className="rounded-full border border-[#0B3C5D]/10 bg-[#F4F7FA] px-2.5 py-1 text-xs font-semibold text-[#0B3C5D]">
                    {String(category.name)}
                  </span>
                ) : null}
                {post.published_at ? (
                  <span className="text-xs text-[#1A1A1A]/55">
                    Yayınlanma tarihi:{" "}
                    {new Date(String(post.published_at)).toLocaleString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : null}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">{String(post.title)}</h1>
              <p className="text-sm leading-relaxed text-[#1A1A1A]/75">{String(post.meta_description ?? post.summary ?? "")}</p>
            </div>
          </section>

          <BlogAdSlot ad={topAd} postId={String(post.id)} slot="top" />

          <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
            <div className="tiptap-public" dangerouslySetInnerHTML={{ __html: first }} />
          </section>

          <BlogAdSlot ad={middleAd} postId={String(post.id)} slot="middle" />

          {second ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
              <div className="tiptap-public" dangerouslySetInnerHTML={{ __html: second }} />
            </section>
          ) : null}

          {faqItems.length > 0 ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#0B3C5D]">Sıkça Sorulan Sorular</h2>
              <div className="mt-3 space-y-2">
                {faqItems.map((item, index) => (
                  <details key={`${item.question}-${index}`} className="rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] px-4 py-3">
                    <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">{item.question}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {tags.length > 0 ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/70">Etiketler</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#0B3C5D]/12 bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#0B3C5D]">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {ctaButtons.length > 0 ? <BlogCtaButtonsRenderer buttons={ctaButtons} /> : null}
          <section className="rounded-2xl border border-[#0B3C5D]/10 bg-[#0B3C5D] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold">Premium danışmanlık desteği alın.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/firma/${resolvedFirmSlug}`} className="rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A]">Firma sayfasına git</Link>
              <FirmContactSheet
                firm={{
                  slug: resolvedFirmSlug,
                  name: String(firm?.name ?? postCompanyName ?? "Firma"),
                  logoUrl: String(firm?.logo_url ?? postCompanyLogo ?? "") || null,
                  firmType: String(firm?.firm_category ?? "") || null,
                  foundedYear: typeof firm?.founded_year === "number" ? firm.founded_year : null,
                  mainServices: Array.isArray(firm?.main_services) ? (firm.main_services as string[]) : [],
                  expertises: expertiseLabels,
                  countries: Array.isArray(firm?.countries) ? (firm.countries as string[]) : [],
                  phone: String(firm?.phone ?? "") || null,
                  whatsapp: String(firm?.whatsapp ?? "") || null,
                  email: String(firm?.email ?? "") || null,
                  website: String(firm?.website ?? "") || null,
                  address: String(firm?.address ?? "") || null,
                  workingHours: String(firm?.working_hours ?? "") || null,
                }}
              />
            </div>
          </section>

          <BlogAdSlot ad={bottomAd} postId={String(post.id)} slot="bottom" />

          <RelatedPostsInfinite
            firmSlug={resolvedFirmSlug}
            currentId={String(post.id)}
            categoryId={post.category_id ? String(post.category_id) : null}
            tags={tags}
            countries={countries}
            initialItems={(initialRelated ?? []).map((item) => ({
              id: String(item.id),
              title: String(item.title ?? ""),
              slug: String(item.slug ?? ""),
              summary: String(item.summary ?? ""),
              coverImageUrl: item.cover_image_url ? String(item.cover_image_url) : null,
              publishedAt: item.published_at ? String(item.published_at) : null,
            }))}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

