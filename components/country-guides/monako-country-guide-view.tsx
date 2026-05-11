import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { MONAKO_GUIDE_SLIDES } from "@/lib/country-guides/monako-slides";
import {
  MONAKO_GUIDE_INTRO_PARAGRAPHS,
  MONAKO_GUIDE_SECTIONS,
  MONAKO_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/monako-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function MonakoCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Monako AB üyesi ve resmi Schengen üyesi değildir; fiilen Fransa ile özel düzenlemeler ve Schengen giriş pratiği üzerinden yürür. Carte de Séjour, banka ve konut ispatı ile fiziksel ikamet beklentisi birlikte değerlendirilir. Tutarlar ve formlar sık değişir — Mon Service Public Monaco, France-Visas ve Residents Section güncel duyurularından doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Monako Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Monako Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={MONAKO_GUIDE_SLIDES}
      introParagraphs={MONAKO_GUIDE_INTRO_PARAGRAPHS}
      sections={MONAKO_GUIDE_SECTIONS}
      seoTags={MONAKO_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="monako-firms-heading"
      firmsSectionTitle="Monako için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Monako</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Monako seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
