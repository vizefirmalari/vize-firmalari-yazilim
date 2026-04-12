import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { HOLLANDA_GUIDE_SLIDES } from "@/lib/country-guides/hollanda-slides";
import {
  HOLLANDA_GUIDE_INTRO_PARAGRAPHS,
  HOLLANDA_GUIDE_SECTIONS,
  HOLLANDA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/hollanda-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function HollandaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Hollanda" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Hollanda’da boş pozisyonların çoğu gayriresmî doldurulur; UWV kaydı zorunlu değildir, werk.nl ve CAO’lar iş arama ve ücretin merkezindedir. Bu rehber; başvuru kültürü, traineeship ve MBO/HBO staj yolları, belediye kaydı ve BSN, Randstad konutu, WAB ve sağlık sigortası özetlerinde EURES kaynağına dayanır; güncel mevzuat için rijksoverheid.nl ve uwv.nl doğrulaması yapın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Hollanda Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Hollanda Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={HOLLANDA_GUIDE_SLIDES}
      introParagraphs={HOLLANDA_GUIDE_INTRO_PARAGRAPHS}
      sections={HOLLANDA_GUIDE_SECTIONS}
      seoTags={HOLLANDA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="hollanda-firms-heading"
      firmsSectionTitle="Hollanda için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Hollanda</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Hollanda seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
