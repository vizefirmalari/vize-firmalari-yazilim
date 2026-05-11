import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { SIRBISTAN_GUIDE_SLIDES } from "@/lib/country-guides/sirbistan-slides";
import {
  SIRBISTAN_GUIDE_INTRO_PARAGRAPHS,
  SIRBISTAN_GUIDE_SECTIONS,
  SIRBISTAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/sirbistan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function SirbistanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Vizesiz kısa giriş çalışma veya uzun ikamet hakkı vermez. 2024 sonrası çalışma izni ile geçici oturum çoğu senaryoda Single Permit çatısında birleşir; başvurular Welcome to Serbia portalı ve ilgili kurum süreçleriyle dijitalleşmektedir. Formlar, ücretler ve sektör şartları değişebilir — MFA, İçişleri / oturum otoritesi ve T.C. Dışişleri seyahat uyarılarını güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Sırbistan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Sırbistan Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={SIRBISTAN_GUIDE_SLIDES}
      introParagraphs={SIRBISTAN_GUIDE_INTRO_PARAGRAPHS}
      sections={SIRBISTAN_GUIDE_SECTIONS}
      seoTags={SIRBISTAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="sirbistan-firms-heading"
      firmsSectionTitle="Sırbistan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Sırbistan</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Sırbistan seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
