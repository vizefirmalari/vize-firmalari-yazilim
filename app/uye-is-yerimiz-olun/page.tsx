import { UyeIsYerimizOlunPage } from "@/components/content/uye-is-yerimiz-olun-page";
import { loadServiceStorefrontMembershipPromo } from "@/lib/data/service-storefront-membership-promo";
import { isSupabaseConfigured } from "@/lib/env";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const metadata = buildPublicDocumentMetadata("uye-is-yerimiz-olun");
export const revalidate = 300;

type PageProps = {
  searchParams: Promise<{ odeme?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  let promoServices: Awaited<ReturnType<typeof loadServiceStorefrontMembershipPromo>> = [];

  if (isSupabaseConfigured()) {
    const supabase = createSupabasePublicClient();
    if (supabase) {
      promoServices = await loadServiceStorefrontMembershipPromo(supabase);
    }
  }

  return (
    <UyeIsYerimizOlunPage
      scrollToFormOnPayment={sp.odeme === "basarili"}
      promoServices={promoServices}
    />
  );
}
