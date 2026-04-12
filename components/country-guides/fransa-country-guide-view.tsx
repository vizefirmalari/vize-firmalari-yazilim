import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { FRANSA_GUIDE_SLIDES } from "@/lib/country-guides/fransa-slides";
import {
  FRANSA_GUIDE_INTRO_PARAGRAPHS,
  FRANSA_GUIDE_SECTIONS,
  FRANSA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/fransa-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function FransaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Fransa" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB/EEA ve İsviçre vatandaşları Fransa’da üç aya kadar serbestçe kalabilir; çalışan veya serbest meslek statüsünde beş yıllık ikamet kartı için préfecture’ya başvuru yapılır. Bu rehber; France Travail, APEC, Cap Emploi ve EURES ile iş arama, CV ve ön yazı, staj ve vize bağlantısı, alternance sözleşmesi ve CFA, SMIC ve bordro, yıllık izin ve resmî tatiller, CDI/CDD ve fesih, kaynakta kesilen vergi, CPAM sağlık iadesi, üç–on altı yaş zorunlu eğitim, bölgesel ulaşım ve engelli istihdamı (MDPH, RQTH, Agefiph) başlıklarında EURES kamu metnine dayanır; güncel bilgileri service-public.fr ve francetravail.fr üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Fransa Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Fransa Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={FRANSA_GUIDE_SLIDES}
      introParagraphs={FRANSA_GUIDE_INTRO_PARAGRAPHS}
      sections={FRANSA_GUIDE_SECTIONS}
      seoTags={FRANSA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="fransa-firms-heading"
      firmsSectionTitle="Fransa için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Fransa</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Fransa seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
