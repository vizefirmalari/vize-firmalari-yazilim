import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { UKRAYNA_GUIDE_SLIDES } from "@/lib/country-guides/ukrayna-slides";
import {
  UKRAYNA_GUIDE_INTRO_PARAGRAPHS,
  UKRAYNA_GUIDE_SECTIONS,
  UKRAYNA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/ukrayna-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function UkraynaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal vize ve TRP çizgisinde work permit zorunluluğu öne çıkar; 2026’da süresi dolmuş izinlerle kalış riski artmıştır. State Migration Service ve güncel seyahat uyarılarını başvurudan önce mutlaka doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Ukrayna Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Ukrayna Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={UKRAYNA_GUIDE_SLIDES}
      introParagraphs={UKRAYNA_GUIDE_INTRO_PARAGRAPHS}
      sections={UKRAYNA_GUIDE_SECTIONS}
      seoTags={UKRAYNA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="ukrayna-firms-heading"
      firmsSectionTitle="Ukrayna için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Ukrayna</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Ukrayna seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
