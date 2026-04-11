import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { BELCIKA_GUIDE_SLIDES } from "@/lib/country-guides/belcika-slides";
import {
  BELCIKA_GUIDE_INTRO_PARAGRAPHS,
  BELCIKA_GUIDE_SECTIONS,
  BELCIKA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/belcika-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function BelcikaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Belçika" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Belçika’da istihdam politikası bölgeseldir; kamu iş kurumu Valoni’de Forem, Flaman Bölgesi’nde VDAB, Brüksel Başkent Bölgesi’nde Actiris, Almanca konuşan toplulukta ADG’dur. Bu rehber; iş arama kanalları, CV–ön yazı ilkeleri, bölgesel staj ve ikili öğrenme, ikamet bildirimi, sözleşme ve çalışma süreleri ile ücret–vergi özetlerinde EURES kaynağına dayanır; güncel merci ve formlar için belgium.be ve bölge sitelerini doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Belçika Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Belçika Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={BELCIKA_GUIDE_SLIDES}
      introParagraphs={BELCIKA_GUIDE_INTRO_PARAGRAPHS}
      sections={BELCIKA_GUIDE_SECTIONS}
      seoTags={BELCIKA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="belcika-firms-heading"
      firmsSectionTitle="Belçika için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Belçika</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Belçika seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
