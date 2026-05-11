import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { BELARUS_GUIDE_SLIDES } from "@/lib/country-guides/belarus-slides";
import {
  BELARUS_GUIDE_INTRO_PARAGRAPHS,
  BELARUS_GUIDE_SECTIONS,
  BELARUS_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/belarus-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function BelarusCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal vize ve special work permit hattında sponsor ve migration registration zorunludur; Rusya–Belarus ortak vize kapsamı giriş noktasına göre değişir. 2025–2026 employer compliance ve denetim artışlarını MFA ve Citizenship and Migration Department duyurularından güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Belarus Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Belarus Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={BELARUS_GUIDE_SLIDES}
      introParagraphs={BELARUS_GUIDE_INTRO_PARAGRAPHS}
      sections={BELARUS_GUIDE_SECTIONS}
      seoTags={BELARUS_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="belarus-firms-heading"
      firmsSectionTitle="Belarus için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Belarus</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Belarus seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
