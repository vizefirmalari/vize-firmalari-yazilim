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
import { BlogTagsSection } from "@/components/blog/blog-tags-section";
import { RelatedPostsInfinite } from "@/components/blog/related-posts-infinite";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";
import { splitBodyForMiddleAd } from "@/lib/blog/split-body-for-middle-ad";
import { pickWeightedAd, type BlogAdRow } from "@/lib/blog/ads";
import { getSiteUrl } from "@/lib/env";
import { resolveFirmBlogPostOgImage, resolveToAbsoluteImageUrl } from "@/lib/seo/blog-og-image";
import { formatPublishedAtDisplayTr } from "@/lib/datetime/parse-instant";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";

type Props = {
  params: Promise<{ slug: string; postSlug: string }>;
};

type FaqItem = {
  id?: string;
  question: string;
  answer: string;
  cta_buttons?: unknown;
};
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
  updated_at: string | null;
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

const blogTiptapBodyClass =
  "tiptap-public min-w-0 max-w-full overflow-x-hidden wrap-anywhere max-md:[&_p]:text-[15px] max-md:[&_p]:leading-[1.65] max-md:[&_p+_p]:!mt-2.5 max-md:[&_h2]:!text-[1.1rem] max-md:[&_h2]:!leading-tight max-md:[&_h2]:!my-2 max-md:[&_h3]:!text-[1.02rem] max-md:[&_h3]:!leading-snug max-md:[&_h3]:!mt-1.5 max-md:[&_h3]:!mb-0.5 max-md:[&_ol]:!my-1.5 max-md:[&_ul]:!my-1.5 max-md:[&_li]:!text-[15px] max-md:[&_li]:!leading-[1.5] max-md:[&_hr.vf-blog-divider]:!my-3";

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

async function getPublishedPostBySlug(
  dataClient: DbClient,
  postSlug: string
) {
  const selectVariants = [
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,cta_buttons,related_countries,faq_items,faq_schema_json,category_id,company_slug,company_name,company_logo_url",
    // Backward-compatible fallback for environments missing newer blog columns.
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,cta_buttons,related_countries,faq_items,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,cta_buttons,related_countries,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,cta_buttons,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,related_countries,faq_items,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,related_countries,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,category_id,company_slug,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,category_id,company_name,company_logo_url",
    "id,firm_id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,updated_at,tags,category_id,company_name",
  ] as const;

  for (const selectCols of selectVariants) {
    const postsTable = dataClient.from("firm_blog_posts") as any;
    const primary = await postsTable
      .select(selectCols)
      .eq("slug", postSlug)
      .eq("status", "published")
      .not("published_at", "is", null)
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
      .not("published_at", "is", null)
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
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (finalTry.data as PostRow | null) ?? null;
}

function buildBlogDescriptionFallback(post: PostRow, firmName: string | null): string {
  const fromMeta = String(post.meta_description ?? "").trim();
  if (fromMeta) return fromMeta;
  const fromSummary = String(post.summary ?? "").trim();
  if (fromSummary) return fromSummary;
  const title = String(post.title ?? "").trim();
  const cleanFirmName = String(firmName ?? "").trim();
  if (title && cleanFirmName) {
    return `${title} yazısı: ${cleanFirmName} için güncel vize başvuru adımları ve önemli detaylar.`;
  }
  if (title) {
    return `${title} yazısında güncel vize başvuru adımları ve önemli detaylar yer alır.`;
  }
  return "Vize başvuru süreçleri ve önemli adımlar hakkında güncel bilgilendirme yazısı.";
}

export async function generateMetadata({ params }: Props) {
  const { slug, postSlug } = await params;
  const supabase = await createSupabaseServerClient();
  const service = createSupabaseServiceRoleClient();
  const dataClient = service ?? supabase;
  if (!dataClient) return {};
  const db = dataClient;
  const post = await getPublishedPostBySlug(db, postSlug);
  if (!post?.id) {
    return {
      title: "Yazı bulunamadı",
      robots: { index: false, follow: false },
    };
  }
  let resolvedSlug = String((post as { company_slug?: string | null }).company_slug ?? slug);
  let firmName: string | null = String((post as { company_name?: string | null }).company_name ?? "").trim() || null;
  if (!resolvedSlug && post.firm_id) {
    const { data: firm } = await db
      .from("firms")
      .select("slug,name,status,is_indexable,firm_page_enabled")
      .eq("id", String(post.firm_id))
      .maybeSingle();
    const isPublicFirm =
      firm?.status === "published" &&
      firm?.is_indexable !== false &&
      firm?.firm_page_enabled !== false;
    if (!isPublicFirm) {
      return {
        title: "Yazı bulunamadı",
        robots: { index: false, follow: false },
      };
    }
    resolvedSlug = String(firm?.slug ?? slug);
    firmName = String(firm?.name ?? "").trim() || firmName;
  }

  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const canonical = `${siteUrl}/firma/${resolvedSlug}/blog/${postSlug}`;
  const og = resolveFirmBlogPostOgImage({
    coverImageUrl: post.cover_image_url,
    coverImageAlt: post.cover_image_alt,
    title: String(post.title ?? ""),
  });
  const desc = buildBlogDescriptionFallback(post, firmName);
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: String(post.title),
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: String(post.title),
      description: desc,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.published_at ?? undefined,
      images: [
        {
          url: og.url,
          width: og.width,
          height: og.height,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(post.title),
      description: desc,
      images: [
        {
          url: og.url,
          width: og.width,
          height: og.height,
          alt: og.alt,
        },
      ],
    },
    robots: { index: true, follow: true },
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
        .select("id,slug,name,logo_url,whatsapp,phone,email,website,address,working_hours,main_services,countries,founded_year,firm_category,status,is_indexable,firm_page_enabled,schengen_expert,usa_visa_expert,student_visa_support,work_visa_support,tourist_visa_support,business_visa_support,family_reunion_support,appeal_support")
        .eq("id", String(post.firm_id))
        .maybeSingle()
    : { data: null };

  const isPublicFirm =
    firm?.status === "published" &&
    firm?.is_indexable !== false &&
    firm?.firm_page_enabled !== false;
  if (!isPublicFirm) {
    notFound();
  }

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

  const { data: sameFirmPosts } = await db
    .from("firm_blog_posts")
    .select("id,title,slug,published_at")
    .eq("status", "published")
    .not("published_at", "is", null)
    .eq("firm_id", String(post.firm_id ?? ""))
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
  const shareOg = resolveFirmBlogPostOgImage({
    coverImageUrl: post.cover_image_url,
    coverImageAlt: post.cover_image_alt,
    title: String(post.title ?? ""),
  });
  const publisherLogoUrl =
    resolveToAbsoluteImageUrl(firm?.logo_url != null ? String(firm.logo_url) : null) ??
    resolveToAbsoluteImageUrl(postCompanyLogo != null ? String(postCompanyLogo) : null);
  const desc = buildBlogDescriptionFallback(post, String(firm?.name ?? postCompanyName ?? "") || null);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: desc,
    datePublished: post.published_at,
    dateModified: post.published_at ?? post.updated_at ?? post.published_at,
    image: [shareOg.url],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    author: { "@type": "Organization", name: String(firm?.name ?? postCompanyName ?? SITE_BRAND_NAME) },
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      logo: publisherLogoUrl
        ? { "@type": "ImageObject", url: publisherLogoUrl }
        : undefined,
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
      <main className="mx-auto min-w-0 w-full max-w-5xl overflow-x-clip wrap-anywhere pt-0 pb-24 max-md:px-0 md:px-6 md:pt-4 md:pb-14 lg:px-8">
        {/** Mobil: max-w-screen-sm + px-4 — geri, firma, blog aynı hizaya */}
        <div className="mx-auto w-full min-w-0 max-w-screen-sm px-4 md:max-w-none md:px-0">
        {/** Geri: mobilde sticky, dikey: top-64 + pt-0; hizalar üstteki max-w-screen-sm sütununda */}
        <div
          className="mx-auto w-full max-w-full max-md:sticky max-md:top-[64px] max-md:z-40 max-md:bg-transparent
            max-md:pt-0 max-md:pb-2 max-md:mb-2
            md:static md:z-10 md:mb-3 md:px-0 md:py-0"
        >
          <StickyBackButton fallbackHref={`/firma/${resolvedFirmSlug}`} />
        </div>

        <div className="mt-0 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 mb-3 md:mb-4">
          <Link
            href={`/firma/${resolvedFirmSlug}`}
            className="flex min-w-0 max-w-full items-center gap-2.5 max-md:rounded-lg sm:gap-3 rounded-xl border border-[#0B3C5D]/10 bg-white p-2.5 sm:p-3 shadow-sm"
          >
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
          <div className="flex min-w-0 max-w-full flex-wrap gap-1.5 sm:gap-2 max-md:gap-2">
            <Link
              href={`/firma/${resolvedFirmSlug}`}
              className="max-md:rounded-lg rounded-xl border border-[#0B3C5D]/20 bg-[#F7F9FB] px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]"
            >
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

        <article className="mt-0 min-w-0 w-full max-w-full space-y-5 max-md:space-y-3 max-md:mt-0">
          <section className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm max-md:shadow-[0_1px_8px_rgba(11,60,93,0.05)] sm:shadow-sm">
            {post.cover_image_url ? (
              <div className="flex w-full min-w-0 max-w-full items-center justify-center overflow-x-hidden px-3 pt-3 sm:px-4 sm:pt-4 max-md:px-2.5 max-md:pt-2.5">
                <Image
                  src={String(post.cover_image_url)}
                  alt={String(post.cover_image_alt || post.title)}
                  width={1200}
                  height={630}
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="h-auto w-full max-w-full min-h-0 object-contain max-md:max-h-[min(40vh,280px)]"
                />
              </div>
            ) : null}
            <div className="min-w-0 max-w-full space-y-1.5 p-5 sm:space-y-2 max-md:space-y-1.5 max-md:p-3.5">
              <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5 sm:gap-2">
                {category?.name ? (
                  <span className="rounded-full border border-[#0B3C5D]/10 bg-[#F4F7FA] px-2.5 py-1 text-xs font-semibold text-[#0B3C5D] max-md:px-2 max-md:py-0.5 max-md:text-[11px]">
                    {String(category.name)}
                  </span>
                ) : null}
                {post.published_at ? (
                  <span className="min-w-0 wrap-anywhere text-xs text-[#1A1A1A]/55 max-md:text-[11px]">
                    Yayınlanma tarihi: {formatPublishedAtDisplayTr(String(post.published_at))}
                  </span>
                ) : null}
              </div>
              <h1 className="font-bold leading-tight tracking-tight text-[#0B3C5D] max-md:text-[22px] md:text-3xl">
                {String(post.title)}
              </h1>
              <p className="text-sm leading-relaxed text-[#1A1A1A]/75 max-md:text-[15px] max-md:leading-[1.55]">
                {String(post.meta_description ?? post.summary ?? "")}
              </p>
            </div>
          </section>

          <BlogAdSlot ad={topAd} postId={String(post.id)} slot="top" />

          <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
            <div className={blogTiptapBodyClass} dangerouslySetInnerHTML={{ __html: first }} />
          </section>

          <BlogAdSlot ad={middleAd} postId={String(post.id)} slot="middle" />

          {second ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
              <div className={blogTiptapBodyClass} dangerouslySetInnerHTML={{ __html: second }} />
            </section>
          ) : null}

          {faqItems.length > 0 ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
              <h2 className="text-lg font-semibold text-[#0B3C5D] max-md:text-base">Sıkça Sorulan Sorular</h2>
              <div className="mt-3 max-md:mt-2.5 space-y-2 max-md:space-y-1.5">
                {faqItems.map((item, index) => {
                  const faqKey = item.id ? String(item.id) : `${item.question}-${index}`;
                  const faqCtas = normalizeBlogCtaButtons(item.cta_buttons);
                  return (
                    <details key={faqKey} className="rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] px-4 py-3 max-md:px-3 max-md:py-2.5">
                      <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D] max-md:text-[13px]">
                        {item.question}
                      </summary>
                      <div
                        className={`${blogTiptapBodyClass} mt-2 text-sm leading-relaxed text-[#1A1A1A]/75 max-md:mt-1.5`}
                        dangerouslySetInnerHTML={{ __html: String(item.answer ?? "") }}
                      />
                      {faqCtas.length > 0 ? (
                        <div className="mt-3">
                          <BlogCtaButtonsRenderer buttons={faqCtas} />
                        </div>
                      ) : null}
                    </details>
                  );
                })}
              </div>
            </section>
          ) : null}

          {tags.length > 0 ? (
            <BlogTagsSection tags={tags} />
          ) : null}

          {Array.isArray(sameFirmPosts) && sameFirmPosts.length > 0 ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-[#0B3C5D] sm:text-lg">
                  Aynı firmanın diğer blog yazıları
                </h2>
                <Link
                  href={`/firma/${resolvedFirmSlug}`}
                  className="text-xs font-semibold text-[#328CC1] hover:underline sm:text-sm"
                >
                  Firma profiline dön
                </Link>
              </div>
              <ul className="mt-3 space-y-2">
                {sameFirmPosts.map((item) => (
                  <li key={String(item.id)}>
                    <Link
                      href={`/firma/${resolvedFirmSlug}/blog/${String(item.slug ?? "")}`}
                      className="text-sm font-semibold text-[#0B3C5D] hover:text-[#328CC1] hover:underline"
                    >
                      {String(item.title ?? "")}
                    </Link>
                    {item.published_at ? (
                      <p className="mt-0.5 text-xs text-[#1A1A1A]/60">
                        {formatPublishedAtDisplayTr(String(item.published_at))}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {(countries.length > 0 || tags.length > 0) ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
              <h2 className="text-base font-semibold text-[#0B3C5D] sm:text-lg">
                İlgili içerik bağlantıları
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {countries.slice(0, 6).map((country) => (
                  <Link
                    key={`country-${country}`}
                    href={`/arama?q=${encodeURIComponent(country)}`}
                    className="inline-flex items-center rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]"
                  >
                    {country} için firmaları incele
                  </Link>
                ))}
                {tags.slice(0, 6).map((tag) => (
                  <Link
                    key={`tag-${tag}`}
                    href={`/arama?q=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]"
                  >
                    {tag} hizmeti için firmaları incele
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {ctaButtons.length > 0 ? <BlogCtaButtonsRenderer buttons={ctaButtons} /> : null}
          <section className="rounded-2xl border border-[#0B3C5D]/10 bg-[#0B3C5D] p-5 text-white shadow-sm max-md:rounded-2xl max-md:p-4 max-md:shadow-sm">
            <p className="text-sm font-semibold max-md:text-[13px]">Premium danışmanlık desteği alın.</p>
            <div className="mt-3 max-md:mt-2.5 flex flex-wrap gap-2 max-md:gap-1.5">
              <Link
                href={`/firma/${resolvedFirmSlug}`}
                className="max-md:rounded-lg rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A] max-md:px-3 max-md:py-1.5 max-md:text-[13px]"
              >
                Firma sayfasına git
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

