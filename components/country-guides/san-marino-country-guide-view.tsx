import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { SAN_MARINO_GUIDE_SLIDES } from "@/lib/country-guides/san-marino-slides";
import {
  SAN_MARINO_GUIDE_INTRO_PARAGRAPHS,
  SAN_MARINO_GUIDE_SECTIONS,
  SAN_MARINO_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/san-marino-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function SanMarinoCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "San Marino AB üyesi ve resmî Schengen üyesi değildir; İtalya ile açık sınır pratiği nedeniyle çoğu üçüncü ülke vatandaşı için ulaşım fiilen İtalya Schengen giriş hakkı üzerinden yürür. Oturum ve çalışma dosyaları kontrollüdür; tutarlar ve formlar değişebilir — San Marino resmî portalları ve İtalya vize bilgilerinden güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="San Marino Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="San Marino Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={SAN_MARINO_GUIDE_SLIDES}
      introParagraphs={SAN_MARINO_GUIDE_INTRO_PARAGRAPHS}
      sections={SAN_MARINO_GUIDE_SECTIONS}
      seoTags={SAN_MARINO_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="san-marino-firms-heading"
      firmsSectionTitle="San Marino için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">San Marino</strong> için yönetim panelinde
          ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında San Marino seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
