import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ALMANYA_GUIDE_SLIDES } from "@/lib/country-guides/almanya-slides";
import {
  ALMANYA_GUIDE_INTRO_PARAGRAPHS,
  ALMANYA_GUIDE_SECTIONS,
  ALMANYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/almanya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function AlmanyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Almanya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Almanya’ya yönelik Schengen kısa süreli ziyaret ile ulusal çalışma izni, mesleki eğitim, oturum ve aile birleşimi süreçleri farklı belge ve mercilere tabidir. Bu rehber; iş arama, başvuru kültürü, staj, ikili çıraklık, taşınma pratikleri ve çalışma-yaşam çerçevesine odaklanan özet bir yol haritası sunar; kesin kararlar için dışişleri, göç idaresi ve istihdam ajansı kaynaklarını güncel tutun.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Almanya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Almanya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={ALMANYA_GUIDE_SLIDES}
      introParagraphs={ALMANYA_GUIDE_INTRO_PARAGRAPHS}
      sections={ALMANYA_GUIDE_SECTIONS}
      seoTags={ALMANYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="almanya-firms-heading"
      firmsSectionTitle="Almanya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Almanya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Almanya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
