import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ITALYA_GUIDE_SLIDES } from "@/lib/country-guides/italya-slides";
import {
  ITALYA_GUIDE_INTRO_PARAGRAPHS,
  ITALYA_GUIDE_SECTIONS,
  ITALYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/italya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function ItalyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — İtalya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "İtalya’ya yönelik Schengen kısa süreli ziyaret ile ulusal çalışma, staj, çıraklık ve oturum süreçleri farklı belge ve mercilere tabidir. Bu rehber; SPID ve kamu istihdam merkezleri (CPI), clicLavoro, EURES, staj–çıraklık çerçevesi, konut ve vergi özetleri ile çalışma–yaşam başlıklarında yapılandırılmış bir yol haritası sunar; kesin kararlar için İçişleri, Çalışma Bakanlığı ve bölgesel kaynakları güncel tutun.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İtalya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İtalya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={ITALYA_GUIDE_SLIDES}
      introParagraphs={ITALYA_GUIDE_INTRO_PARAGRAPHS}
      sections={ITALYA_GUIDE_SECTIONS}
      seoTags={ITALYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="italya-firms-heading"
      firmsSectionTitle="İtalya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">İtalya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İtalya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
