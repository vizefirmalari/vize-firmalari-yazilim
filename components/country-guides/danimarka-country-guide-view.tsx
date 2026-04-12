import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { DANIMARKA_GUIDE_SLIDES } from "@/lib/country-guides/danimarka-slides";
import {
  DANIMARKA_GUIDE_INTRO_PARAGRAPHS,
  DANIMARKA_GUIDE_SECTIONS,
  DANIMARKA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/danimarka-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function DanimarkaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Danimarka" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB/EEA ve İsviçre vatandaşları Danimarka’da çalışmak için önceden oturum izni başvurusu yapmak zorunda değildir; üç aydan uzun kalışlarda AB oturum belgesi, CPR numarası ve vergi kartı düzenlenir. Bu rehber; Jobcenter ve jobnet.dk, Workindenmark İngilizce iş bankası, tek sayfa başvuru ve CV, şirket stajı ile ücret sübvansiyonlu istihdam, VET ve laerepladsen.dk, SIRI ve ICS, yazılı iş sözleşmesi ve Danimarka toplu pazarlık modeli, NemKonto ve isteğe bağlı A‑kasse, tatil ve ebeveyn izinleri, skat.dk vergi özeti ve sarı sağlık kartı başlıklarında EURES kamu metnine dayanır; güncel bilgileri nyidanmark.dk ve borger.dk üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Danimarka Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Danimarka Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={DANIMARKA_GUIDE_SLIDES}
      introParagraphs={DANIMARKA_GUIDE_INTRO_PARAGRAPHS}
      sections={DANIMARKA_GUIDE_SECTIONS}
      seoTags={DANIMARKA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="danimarka-firms-heading"
      firmsSectionTitle="Danimarka için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Danimarka</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Danimarka seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
