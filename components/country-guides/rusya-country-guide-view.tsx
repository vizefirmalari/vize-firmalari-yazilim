import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { RUSYA_GUIDE_SLIDES } from "@/lib/country-guides/rusya-slides";
import {
  RUSYA_GUIDE_INTRO_PARAGRAPHS,
  RUSYA_GUIDE_SECTIONS,
  RUSYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/rusya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function RusyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal vize ve RVP–VNZh hattında work permit + migration registration zorunluluğu öne çıkar; 2026 skilled visa duyurularını ve kota/biyometri şartlarını resmî kaynaklardan güncel doğrulayın. Ödeme ve yaptırım risklerini operasyon planına dahil edin.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Rusya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Rusya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={RUSYA_GUIDE_SLIDES}
      introParagraphs={RUSYA_GUIDE_INTRO_PARAGRAPHS}
      sections={RUSYA_GUIDE_SECTIONS}
      seoTags={RUSYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="rusya-firms-heading"
      firmsSectionTitle="Rusya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Rusya</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Rusya seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
