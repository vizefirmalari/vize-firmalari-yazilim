import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { POLONYA_GUIDE_SLIDES } from "@/lib/country-guides/polonya-slides";
import {
  POLONYA_GUIDE_INTRO_PARAGRAPHS,
  POLONYA_GUIDE_SECTIONS,
  POLONYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/polonya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function PolonyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Polonya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB ve EFTA vatandaşları Polonya’da Polonyalılarla aynı şartlarda çalışmak için ayrıca çalışma izni almak zorunda değildir; ilanlar ePraca, EURES ve KRAZ kayıtlı ajanslar üzerinden yürür. Bu rehber; CV ve örtük onay metni, mezun stajı (stypendium absolwenckie), genç işçi çıraklığı, ikamet kaydı ve PESEL, İş Kanunu, uzaktan çalışma, asgari ücret ve ZUS kesintileri, NFZ sağlık güvencesi özetlerinde EURES kamu metnine dayanır; güncel mevzuat için gov.pl, praca.gov.pl ve ZUS doğrulaması yapın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Polonya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Polonya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={POLONYA_GUIDE_SLIDES}
      introParagraphs={POLONYA_GUIDE_INTRO_PARAGRAPHS}
      sections={POLONYA_GUIDE_SECTIONS}
      seoTags={POLONYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="polonya-firms-heading"
      firmsSectionTitle="Polonya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Polonya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Polonya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
