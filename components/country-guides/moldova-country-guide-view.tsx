import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { MOLDOVA_GUIDE_SLIDES } from "@/lib/country-guides/moldova-slides";
import {
  MOLDOVA_GUIDE_INTRO_PARAGRAPHS,
  MOLDOVA_GUIDE_SECTIONS,
  MOLDOVA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/moldova-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function MoldovaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal C/D vize, National Employment Agency onaylı work permit ve residence card hattında gelir–konut kanıtı ile employer compliance sıkılaşmıştır. Dijital göçebe programı ve AB adaylığı düzenlemelerini MFA, eVisa Moldova ve General Inspectorate for Migration duyurularından güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Moldova Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Moldova Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={MOLDOVA_GUIDE_SLIDES}
      introParagraphs={MOLDOVA_GUIDE_INTRO_PARAGRAPHS}
      sections={MOLDOVA_GUIDE_SECTIONS}
      seoTags={MOLDOVA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="moldova-firms-heading"
      firmsSectionTitle="Moldova için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Moldova</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Moldova seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
