import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ISPANYA_GUIDE_SLIDES } from "@/lib/country-guides/ispanya-slides";
import {
  ISPANYA_GUIDE_INTRO_PARAGRAPHS,
  ISPANYA_GUIDE_SECTIONS,
  ISPANYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/ispanya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IspanyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — İspanya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "İspanya’da iş aramada İspanyolca belirleyicidir; SEPE ve on yedi özerk topluluğun kamu istihdam servisleri, Empléate ve ETT’ler ana kanallardır. Bu rehber; başvuru ve seçim süreçleri, staj ve çift öğrenme (FCT), NIE ve empadronamiento, 2023 iş sözleşmesi reformu, SMI ve vergi özetlerinde EURES kaynağına dayanır; güncel mevzuat için resmî siteleri doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İspanya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İspanya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={ISPANYA_GUIDE_SLIDES}
      introParagraphs={ISPANYA_GUIDE_INTRO_PARAGRAPHS}
      sections={ISPANYA_GUIDE_SECTIONS}
      seoTags={ISPANYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="ispanya-firms-heading"
      firmsSectionTitle="İspanya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">İspanya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İspanya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
