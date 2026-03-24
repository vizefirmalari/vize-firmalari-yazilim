import { HomepageSettingsForm } from "@/components/admin/homepage-settings-form";
import { getPublishedFirmsForPicker } from "@/lib/data/admin-homepage";
import type { HomepageSettingsRow } from "@/lib/data/public-cms";
import { getHomepageSettings } from "@/lib/data/public-cms";

export const metadata = {
  title: "Ana sayfa içeriği",
  robots: { index: false, follow: false },
};

const empty: HomepageSettingsRow = {
  hero_title: null,
  hero_subtitle: null,
  hero_cta_text: null,
  hero_cta_link: null,
  featured_section_title: null,
  announcement_text: null,
  promo_banner_html: null,
  seo_title: null,
  meta_description: null,
  featured_firm_ids: [],
};

export default async function AdminHomepagePage() {
  const raw = await getHomepageSettings();
  const initial = raw ?? empty;
  const firms = await getPublishedFirmsForPicker();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Ana sayfa içeriği
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Hero, öne çıkan sıra (sürükle-bırak), duyuru ve SEO alanları.
        </p>
      </div>
      <HomepageSettingsForm initial={initial} firms={firms} />
    </div>
  );
}
