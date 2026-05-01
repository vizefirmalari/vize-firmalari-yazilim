import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AkisCategoryBreadcrumbs } from "@/components/feed/akis-category-breadcrumbs";
import { AkisCategoryJsonLd } from "@/components/feed/akis-category-jsonld";
import { FeedCategoryNav } from "@/components/feed/FeedCategoryNav";
import { FeedPortalCard } from "@/components/feed/FeedPortalCard";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getAkisCategoryLandingPosts } from "@/lib/feed/akis-category-data";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function canonicalAkisCategoryUrl(slug: string): string {
  return `${getSiteUrl().replace(/\/$/, "")}/akis/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const raw = decodeURIComponent(String((await params).categorySlug ?? "")).trim().toLowerCase();
  if (!SLUG_REGEX.test(raw)) notFound();

  const bundle = await getAkisCategoryLandingPosts(raw);
  if (!bundle) notFound();

  const { def, posts } = bundle;
  const canonical = canonicalAkisCategoryUrl(def.slug);
  const indexed = posts.length > 0;
  const pageTitle = `${def.title} Rehberleri ve Güncel Yazılar | Vize Firmaları`;
  const description = `${def.title} hakkında güncel rehberler, vize süreçleri, başvuru adımları ve dikkat edilmesi gerekenleri Vize Firmaları akışında inceleyin.`;

  return {
    title: pageTitle,
    description,
    keywords: def.keywords.slice(0, 32),
    alternates: { canonical },
    robots: indexed ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: "Vize Firmaları",
      type: "website",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export default async function AkisCategoryLandingPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const raw = decodeURIComponent(String((await params).categorySlug ?? "")).trim().toLowerCase();
  if (!SLUG_REGEX.test(raw)) notFound();

  const bundle = await getAkisCategoryLandingPosts(raw);
  if (!bundle) notFound();

  const { def, posts } = bundle;
  const canonicalUrl = canonicalAkisCategoryUrl(def.slug);

  return (
    <>
      <SiteHeader />
      <div className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <FeedCategoryNav activeSlug={def.slug} />
        </div>
      </div>
      <AkisCategoryJsonLd
        categoryTitle={def.title}
        canonicalUrl={canonicalUrl}
        posts={posts.map((p) => ({ title: p.title, target_url: p.target_url }))}
      />
      <main className="min-h-[50vh] px-3 py-6 sm:px-4">
        <div className="mx-auto w-full max-w-7xl">
          <AkisCategoryBreadcrumbs categoryTitle={def.title} />

          <header className="mb-8">
            <h1 className="text-xl font-bold text-[#111827] sm:text-2xl">
              <span>{def.title}</span>{" "}
              <span className="font-semibold text-[#6b7280]">rehberleri</span>
            </h1>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-relaxed text-[#4b5563] sm:text-[15px]">{def.description}</p>
              <p className="shrink-0 text-[13px] font-semibold text-[#0B3C5D]">
                {posts.length === 0
                  ? "Henüz eşleşen yazı yok"
                  : `${posts.length} güncel yazı`}
              </p>
            </div>
          </header>

          {!posts.length ? (
            <div className="mt-10 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-10 text-center">
              <p className="text-sm font-semibold text-[#111827]">
                Bu başlıkta henüz yayımda yazı görünmüyor.
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Benzer güncel içeriklere göz atmak için aşağıdaki konulara veya genel akışa dönebilirsiniz.
              </p>
              <Link
                href="/akis"
                className="mt-6 inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] shadow-sm hover:bg-[#f9fafb]"
              >
                Tüm akışa dön
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-4 pb-14 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
              {posts.map((p) => (
                <FeedPortalCard key={p.id} post={p} categoryLabel={def.title} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
