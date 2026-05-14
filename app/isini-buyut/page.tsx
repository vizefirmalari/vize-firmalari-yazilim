import type { Metadata } from "next";

import { StorefrontHubListing } from "@/components/software-storefront/storefront-hub-listing";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { loadPublicStorefrontMarketCatalog } from "@/lib/data/software-storefront";
import { isSupabaseConfigured } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo/canonical";
import type { PublicStorefrontSortKey } from "@/lib/types/software-storefront";

export const revalidate = 300;

const SORTS: PublicStorefrontSortKey[] = ["featured", "title", "setup_asc", "setup_desc"];

export const metadata: Metadata = {
  title: "İşini Büyüt | Yazılım, Reklam ve Otomasyon Çözümleri",
  description:
    "Vize danışmanlık firmaları için reklam, web, yapay zeka, CRM, otomasyon ve içerik çözümleri. Tüm vitrin hizmetlerini tek katalogda keşfedin.",
  alternates: { canonical: absoluteUrl("/isini-buyut") },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function IsiniBuyutMarketPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const sortRaw = typeof sp.sort === "string" ? sp.sort : "featured";
  const sort = (SORTS.includes(sortRaw as PublicStorefrontSortKey) ? sortRaw : "featured") as PublicStorefrontSortKey;
  const cat = typeof sp.cat === "string" && sp.cat.length > 0 ? sp.cat : null;

  const supabase = createSupabasePublicClient();
  const catalog =
    supabase && isSupabaseConfigured()
      ? await loadPublicStorefrontMarketCatalog(supabase, { q, sort, categoryId: cat })
      : [];

  if (!catalog.length) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-2xl font-bold text-primary">İşini Büyüt</h1>
        <p className="mt-3 text-sm text-foreground/75">
          Vitrin hazırlanıyor veya filtrenize uygun sonuç yok. Filtreleri sıfırlayıp yeniden deneyin.
        </p>
      </div>
    );
  }

  return (
    <StorefrontHubListing
      basePath="/isini-buyut"
      heroEyebrow="Ana vitrin"
      heroTitle="İşini Büyüt"
      heroSubtitle="Yazılım, reklam, otomasyon, içerik ve operasyon çözümlerini tek ekranda kıyaslayın. Fiyatlar net; detay sayfaları SEO uyumlu; satın alma ve abonelik firma panelinizden yürür."
      catalog={catalog}
      q={q}
      sort={sort}
      cat={cat}
      showSubHubLinks
    />
  );
}
