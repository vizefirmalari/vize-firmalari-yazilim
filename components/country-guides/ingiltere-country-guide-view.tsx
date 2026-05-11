import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { INGILTERE_GUIDE_SLIDES } from "@/lib/country-guides/ingiltere-slides";
import {
  INGILTERE_GUIDE_INTRO_PARAGRAPHS,
  INGILTERE_GUIDE_SECTIONS,
  INGILTERE_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/ingiltere-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IngiltereCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Schengen dışı UK vize sistemi; Skilled Worker, Standard Visitor ve ETA başlıklarında 2025–2026 sıkılaşmaları dikkate alın. Sponsor lisansı, CoS, maaş eşikleri ve ILR tartışmalarını UKVI ve Work in the UK kaynaklarından güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Birleşik Krallık (İngiltere) Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Birleşik Krallık (İngiltere) Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={INGILTERE_GUIDE_SLIDES}
      introParagraphs={INGILTERE_GUIDE_INTRO_PARAGRAPHS}
      sections={INGILTERE_GUIDE_SECTIONS}
      seoTags={INGILTERE_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="ingiltere-firms-heading"
      firmsSectionTitle="Birleşik Krallık (İngiltere) için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">İngiltere</strong> için yönetim panelinde
          ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İngiltere seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
