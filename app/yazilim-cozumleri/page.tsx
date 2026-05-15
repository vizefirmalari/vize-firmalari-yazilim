import type { Metadata } from "next";

import { ServiceVitrinMarket } from "@/components/service-vitrin/service-vitrin-market";
import { SERVICE_STOREFRONT_PUBLIC_BASE } from "@/lib/constants/service-storefront";
import {
  loadPublishedServiceStorefrontCategories,
  loadPublishedServiceStorefrontList,
  loadServiceStorefrontCardImages,
  loadServiceStorefrontFeaturePreviewLines,
  type ServiceStorefrontSortKey,
} from "@/lib/data/service-storefront-public";
import { isSupabaseConfigured } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const revalidate = 300;

const SORTS: ServiceStorefrontSortKey[] = ["featured", "title", "setup_asc", "setup_desc"];

export const metadata: Metadata = {
  title: "Yazılım çözümleri",
  description: `Kurulum ve abonelik modeliyle sunulan yazılım, otomasyon ve büyüme çözümleri — ${SITE_BRAND_NAME} B2B vitrin.`,
  alternates: { canonical: absoluteUrl(SERVICE_STOREFRONT_PUBLIC_BASE) },
  openGraph: {
    title: `Yazılım çözümleri | ${SITE_BRAND_NAME}`,
    description: `Kurulum ve abonelik modeliyle sunulan yazılım, otomasyon ve büyüme çözümleri — ${SITE_BRAND_NAME} B2B vitrin.`,
    url: absoluteUrl(SERVICE_STOREFRONT_PUBLIC_BASE),
    siteName: SITE_BRAND_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function YazilimCozumleriPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const sortRaw = typeof sp.sort === "string" ? sp.sort : "featured";
  const sort = (SORTS.includes(sortRaw as ServiceStorefrontSortKey) ? sortRaw : "featured") as ServiceStorefrontSortKey;
  const category = typeof sp.category === "string" && sp.category.trim() ? sp.category.trim() : null;

  const supabase = createSupabasePublicClient();
  const configured = Boolean(supabase && isSupabaseConfigured());

  const [items, categories] = configured
    ? await Promise.all([
        loadPublishedServiceStorefrontList(supabase!, { q, category, sort }),
        loadPublishedServiceStorefrontCategories(supabase!),
      ])
    : [[], []];

  const ids = items.map((i) => i.id);
  const [cardImages, previewLines] = configured && ids.length
    ? await Promise.all([
        loadServiceStorefrontCardImages(supabase!, ids),
        loadServiceStorefrontFeaturePreviewLines(supabase!, ids, 4),
      ])
    : [{}, {}];

  return (
    <ServiceVitrinMarket
      items={items}
      categories={categories}
      cardImages={cardImages}
      previewLines={previewLines}
      q={q}
      category={category}
      sort={sort}
    />
  );
}
