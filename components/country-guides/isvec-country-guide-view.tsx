import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ISVEC_GUIDE_SLIDES } from "@/lib/country-guides/isvec-slides";
import {
  ISVEC_GUIDE_INTRO_PARAGRAPHS,
  ISVEC_GUIDE_SECTIONS,
  ISVEC_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/isvec-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IsvecCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — İsveç" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "İsveç’te iş arama çoğunlukla proaktiftir; Platsbanken ve Arbetsförmedlingen merkezdedir, ilanlarda sendika temsilcisi iletişimi sık görülür. Bu rehber; kişisel mektup ve meritförteckning (CV), LAS ve deneme süresi, kolektif sözleşmeler, personnummer / samordningsnummer, vergi eşikleri ve 1177 sağlık hattı özetlerinde EURES kamu metnine dayanır; güncel mevzuat için Skatteverket, Migrationsverket ve Arbetsförmedlingen doğrulaması yapın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İsveç Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İsveç Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={ISVEC_GUIDE_SLIDES}
      introParagraphs={ISVEC_GUIDE_INTRO_PARAGRAPHS}
      sections={ISVEC_GUIDE_SECTIONS}
      seoTags={ISVEC_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="isvec-firms-heading"
      firmsSectionTitle="İsveç için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">İsveç</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İsveç seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
