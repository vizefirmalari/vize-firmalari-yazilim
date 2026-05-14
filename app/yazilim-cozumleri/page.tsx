import type { Metadata } from "next";

import { StorefrontHubListing } from "@/components/software-storefront/storefront-hub-listing";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { loadPublicStorefrontCatalog } from "@/lib/data/software-storefront";
import { isSupabaseConfigured } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import type { PublicStorefrontSortKey } from "@/lib/types/software-storefront";

export const revalidate = 300;

const SORTS: PublicStorefrontSortKey[] = ["featured", "title", "setup_asc", "setup_desc"];

export const metadata: Metadata = {
  title: "Yazılım çözümleri",
  description: `Vize ve göç danışmanlığı firmaları için web, reklam, içerik ve premium yazılım çözümleri vitrini. ${SITE_BRAND_NAME}.`,
  alternates: { canonical: absoluteUrl("/yazilim-cozumleri") },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function YazilimCozumleriPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const sortRaw = typeof sp.sort === "string" ? sp.sort : "featured";
  const sort = (SORTS.includes(sortRaw as PublicStorefrontSortKey) ? sortRaw : "featured") as PublicStorefrontSortKey;
  const cat = typeof sp.cat === "string" && sp.cat.length > 0 ? sp.cat : null;

  const supabase = createSupabasePublicClient();
  const catalog =
    supabase && isSupabaseConfigured()
      ? await loadPublicStorefrontCatalog(supabase, { hub: "yazilim-cozumleri", q, sort, categoryId: cat })
      : [];

  if (!catalog.length) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-2xl font-bold text-primary">Yazılım çözümleri</h1>
        <p className="mt-3 text-sm text-foreground/65">
          Vitrin hazırlanıyor veya filtrenize uygun sonuç yok. Filtreleri sıfırlayıp yeniden deneyin.
        </p>
      </div>
    );
  }

  return (
    <StorefrontHubListing
      basePath="/yazilim-cozumleri"
      heroEyebrow="Yazılım vitrin"
      heroTitle="Yazılım çözümleri"
      heroSubtitle="Reklam, web, içerik ve premium sistemleri tek vitrinde keşfedin; detay sayfaları SEO odaklı açılır. Satın alma ve abonelik süreçleri firma panelinizden yürür."
      catalog={catalog}
      q={q}
      sort={sort}
      cat={cat}
    />
  );
}
