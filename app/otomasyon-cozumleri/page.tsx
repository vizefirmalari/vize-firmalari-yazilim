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
  title: "Otomasyon çözümleri",
  description: `WhatsApp ve web botları, otomasyon hatları ve entegrasyon çözümleri — ${SITE_BRAND_NAME} B2B vitrin.`,
  alternates: { canonical: absoluteUrl("/otomasyon-cozumleri") },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function OtomasyonCozumleriPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const sortRaw = typeof sp.sort === "string" ? sp.sort : "featured";
  const sort = (SORTS.includes(sortRaw as PublicStorefrontSortKey) ? sortRaw : "featured") as PublicStorefrontSortKey;
  const cat = typeof sp.cat === "string" && sp.cat.length > 0 ? sp.cat : null;

  const supabase = createSupabasePublicClient();
  const catalog =
    supabase && isSupabaseConfigured()
      ? await loadPublicStorefrontCatalog(supabase, { hub: "otomasyon-cozumleri", q, sort, categoryId: cat })
      : [];

  if (!catalog.length) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-2xl font-bold text-primary">Otomasyon çözümleri</h1>
        <p className="mt-3 text-sm text-foreground/65">
          Vitrin hazırlanıyor veya filtrenize uygun sonuç yok. Filtreleri sıfırlayıp yeniden deneyin.
        </p>
      </div>
    );
  }

  return (
    <StorefrontHubListing
      basePath="/otomasyon-cozumleri"
      heroEyebrow="Otomasyon vitrin"
      heroTitle="Otomasyon çözümleri"
      heroSubtitle="Yapay zekâ karşılama, mesaj otomasyonları ve entegrasyon katmanları. Detay sayfaları için kanonik URL yapısı /yazilim-cozumleri altında birleştirilmiştir."
      catalog={catalog}
      q={q}
      sort={sort}
      cat={cat}
    />
  );
}
