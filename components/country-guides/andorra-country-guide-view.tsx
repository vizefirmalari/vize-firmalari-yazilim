import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ANDORRA_GUIDE_SLIDES } from "@/lib/country-guides/andorra-slides";
import {
  ANDORRA_GUIDE_INTRO_PARAGRAPHS,
  ANDORRA_GUIDE_SECTIONS,
  ANDORRA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/andorra-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function AndorraCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Andorra’da havaalanı yoktur; kara girişi fiilen Fransa veya İspanya Schengen alanı üzerinden yapılır. Andorra AB veya Schengen üyesi değildir; oturum kartı otomatik Schengen serbest dolaşımı vermez. Active ve passive residence şartları, kotlar ve finansal eşikler sık güncellenir — Govern d’Andorra ve resmî göç / yatırım duyurularından doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Andorra Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Andorra Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={ANDORRA_GUIDE_SLIDES}
      introParagraphs={ANDORRA_GUIDE_INTRO_PARAGRAPHS}
      sections={ANDORRA_GUIDE_SECTIONS}
      seoTags={ANDORRA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="andorra-firms-heading"
      firmsSectionTitle="Andorra için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Andorra</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Andorra seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
