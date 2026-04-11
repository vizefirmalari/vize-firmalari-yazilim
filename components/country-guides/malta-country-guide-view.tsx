import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { MALTA_GUIDE_SLIDES } from "@/lib/country-guides/malta-slides";
import {
  MALTA_GUIDE_INTRO_PARAGRAPHS,
  MALTA_GUIDE_SECTIONS,
  MALTA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/malta-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function MaltaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Malta" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Malta’da kamu istihdam servisi Jobsplus’tur; EURES Malta ofisi ve jobsplus.gov.mt üzerinden iş arama ve kayıt mümkündür. Bu rehber; başvuru biçimi, en fazla on iki haftalık staj çerçevesi, MCAST ve ITS çıraklıkları, AB ikamet kartı, kira–satın alma, asgari ücret ve vergi özetlerinde EURES kaynağına dayanır; güncel mevzuat için resmî siteleri doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Malta Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Malta Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={MALTA_GUIDE_SLIDES}
      introParagraphs={MALTA_GUIDE_INTRO_PARAGRAPHS}
      sections={MALTA_GUIDE_SECTIONS}
      seoTags={MALTA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="malta-firms-heading"
      firmsSectionTitle="Malta için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Malta</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Malta seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
