import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { HIRVATISTAN_GUIDE_SLIDES } from "@/lib/country-guides/hirvatistan-slides";
import {
  HIRVATISTAN_GUIDE_INTRO_PARAGRAPHS,
  HIRVATISTAN_GUIDE_SECTIONS,
  HIRVATISTAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/hirvatistan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function HirvatistanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Hırvatistan" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Hırvatistan Schengen üyesidir; AEA ve İsviçre vatandaşları geçerli kimlikle üç aya kadar kalabilir, üç aydan uzun sürelerde poliste geçici ikamet kaydı ve OIB alınır. Bu rehber; HZZ Burza rada ve özel iş portalları, Hırvatça CV ve başvuru, HZZ staj ve genç işsiz destekleri, zanaat ve meslekî eğitim (HOK, JMO), kıyı ve iç bölge kira–metrekare farkları, e-okul kayıtları, üçüncü ülke oturum türleri, yazılı iş sözleşmesi ve mevsimlik tarım rejimi, 2026 asgari brüt ücret, çalışma süresi ve resmî tatiller, vergi ve KDV, HZZO sağlık sistemi, ulaşım omurgası ve %3 engelli istihdamı başlıklarında EURES kamu metnine dayanır; güncel bilgileri hzz.hr, mup.gov.hr ve mvep.gov.hr üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Hırvatistan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Hırvatistan Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={HIRVATISTAN_GUIDE_SLIDES}
      introParagraphs={HIRVATISTAN_GUIDE_INTRO_PARAGRAPHS}
      sections={HIRVATISTAN_GUIDE_SECTIONS}
      seoTags={HIRVATISTAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="hirvatistan-firms-heading"
      firmsSectionTitle="Hırvatistan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Hırvatistan</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Hırvatistan seçili olan, arama / listelerde göster
          ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
