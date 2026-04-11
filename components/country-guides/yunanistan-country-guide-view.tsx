import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { YUNANISTAN_GUIDE_SLIDES } from "@/lib/country-guides/yunanistan-slides";
import {
  YUNANISTAN_GUIDE_INTRO_PARAGRAPHS,
  YUNANISTAN_GUIDE_SECTIONS,
  YUNANISTAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/yunanistan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function YunanistanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Yunanistan" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Yunanistan’a yönelik Schengen kısa süreli ziyaret ile ulusal çalışma, mesleki çıraklık ve oturum süreçleri farklı belge ve mercilere tabidir. Bu rehber; DYPA üzerinden iş arama, başvuru kültürü, staj, DYPA ikili çıraklığı, AB vatandaşı kayıtları ve çalışma–yaşam çerçevesine odaklanan özet bir yol haritası sunar; güncel kurallar için dışişleri, göç ve istihdam kaynaklarını birlikte takip edin.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Yunanistan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Yunanistan Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={YUNANISTAN_GUIDE_SLIDES}
      introParagraphs={YUNANISTAN_GUIDE_INTRO_PARAGRAPHS}
      sections={YUNANISTAN_GUIDE_SECTIONS}
      seoTags={YUNANISTAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="yunanistan-firms-heading"
      firmsSectionTitle="Yunanistan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Yunanistan</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Yunanistan seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
