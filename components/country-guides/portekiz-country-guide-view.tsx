import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { PORTEKIZ_GUIDE_SLIDES } from "@/lib/country-guides/portekiz-slides";
import {
  PORTEKIZ_GUIDE_INTRO_PARAGRAPHS,
  PORTEKIZ_GUIDE_SECTIONS,
  PORTEKIZ_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/portekiz-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function PortekizCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Portekiz" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB ve Schengen üyeliği, Golden Visa ve D8 dijital göçebe hatları ile yoğun başvuru trafiği bir arada; 2026’da yatırım kategorileri ve vergi düzenlemeleri sık değişir. AIMA, ePortugal ve Portuguese Tax Authority üzerinden güncel şartları doğrulayın; Lizbon ve Porto kira gerçeğini erken planlayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Portekiz Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Portekiz Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={PORTEKIZ_GUIDE_SLIDES}
      introParagraphs={PORTEKIZ_GUIDE_INTRO_PARAGRAPHS}
      sections={PORTEKIZ_GUIDE_SECTIONS}
      seoTags={PORTEKIZ_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="portekiz-firms-heading"
      firmsSectionTitle="Portekiz için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Portekiz</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Portekiz seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
