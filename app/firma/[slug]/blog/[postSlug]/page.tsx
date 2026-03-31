import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyBackButton } from "@/components/blog/sticky-back-button";
import { BlogAdSlot } from "@/components/blog/blog-ad-slot";
import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";
import { RelatedPostsInfinite } from "@/components/blog/related-posts-infinite";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";
import { pickWeightedAd, type BlogAdRow } from "@/lib/blog/ads";
import { getFirmBySlug } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";

type Props = {
  params: Promise<{ slug: string; postSlug: string }>;
};

type FaqItem = { question: string; answer: string };

const getActiveBlogAds = unstable_cache(
  async () => {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return [] as BlogAdRow[];
    const { data } = await supabase
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

export async function generateMetadata({ params }: Props) {
  const { slug, postSlug } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return {};
  const firm = await getFirmBySlug(slug);
  if (!firm) return {};

  const { data: post } = await supabase
    .from("firm_blog_posts")
    .select("title,meta_description,cover_image_url")
    .eq("firm_id", firm.id)
    .eq("slug", postSlug)
    .eq("status", "published")
    .maybeSingle();
  if (!post) return {};

  const canonical = `${getSiteUrl().replace(/\/$/, "")}/firma/${slug}/blog/${postSlug}`;
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
  if (!supabase) notFound();

  const firm = await getFirmBySlug(slug);
  if (!firm) notFound();

  const { data: post } = await supabase
    .from("firm_blog_posts")
    .select("id,title,slug,summary,meta_description,cover_image_url,cover_image_alt,body_rich,published_at,tags,cta_buttons,related_countries,faq_items,faq_schema_json,category_id")
    .eq("firm_id", firm.id)
    .eq("slug", postSlug)
    .eq("status", "published")
    .maybeSingle();
  if (!post) notFound();

  const { data: category } = post.category_id
    ? await supabase.from("blog_categories").select("name").eq("id", String(post.category_id)).maybeSingle()
    : { data: null };

  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];
  const countries = Array.isArray(post.related_countries) ? (post.related_countries as string[]) : [];
  const faqItems = Array.isArray(post.faq_items) ? (post.faq_items as FaqItem[]) : [];
  const ctaButtons = normalizeBlogCtaButtons(post.cta_buttons ?? []);
  const { first, second } = splitBodyForMiddleAd(String(post.body_rich ?? ""));

  const { data: initialRelated } = await supabase
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

  const canonical = `${getSiteUrl().replace(/\/$/, "")}/firma/${slug}/blog/${postSlug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    datePublished: post.published_at,
    dateModified: post.published_at,
    image: post.cover_image_url ? [post.cover_image_url] : [],
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: firm.name },
    publisher: {
      "@type": "Organization",
      name: firm.name,
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
          <StickyBackButton fallbackHref={`/firma/${slug}`} />
        </div>

        <Link href={`/firma/${slug}`} className="mb-4 flex items-center gap-3 rounded-xl border border-[#0B3C5D]/10 bg-white p-3 shadow-sm">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[#F3F6F8]">
            {firm.logo_url ? <Image src={firm.logo_url} alt={`${firm.name} logosu`} fill className="object-contain" sizes="40px" /> : null}
          </div>
          <div>
            <p className="text-xs text-[#1A1A1A]/55">Firma profili</p>
            <p className="text-sm font-semibold text-[#0B3C5D]">{firm.name}</p>
          </div>
        </Link>

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

          {ctaButtons.length > 0 ? (
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/60">Hızlı aksiyon</p>
              <BlogCtaButtonsRenderer buttons={ctaButtons.slice(0, 2)} />
            </section>
          ) : null}

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

          {ctaButtons.length > 0 ? <BlogCtaButtonsRenderer buttons={ctaButtons} /> : null}
          <section className="rounded-2xl border border-[#0B3C5D]/10 bg-[#0B3C5D] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold">Premium danışmanlık desteği alın.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/firma/${slug}#basvuru`} className="rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A]">Premium CTA</Link>
              {firm.whatsapp ? (
                <a href={`https://wa.me/${String(firm.whatsapp).replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                  WhatsApp CTA
                </a>
              ) : null}
            </div>
          </section>

          <BlogAdSlot ad={bottomAd} postId={String(post.id)} slot="bottom" />

          <RelatedPostsInfinite
            firmSlug={slug}
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

