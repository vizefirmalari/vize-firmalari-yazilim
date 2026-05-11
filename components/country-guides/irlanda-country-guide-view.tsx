import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { IRLANDA_GUIDE_SLIDES } from "@/lib/country-guides/irlanda-slides";
import {
  IRLANDA_GUIDE_INTRO_PARAGRAPHS,
  IRLANDA_GUIDE_SECTIONS,
  IRLANDA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/irlanda-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IrlandaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "AB üyesi fakat Schengen dışı ulusal vize; Critical Skills ve Stamp 4 hattı yoğun göç için kritik. 2025–2026 maaş eşikleri ve vatandaşlık sıkılaşmalarını Irish Immigration Service ve employment permit duyurularından güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İrlanda Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İrlanda Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={IRLANDA_GUIDE_SLIDES}
      introParagraphs={IRLANDA_GUIDE_INTRO_PARAGRAPHS}
      sections={IRLANDA_GUIDE_SECTIONS}
      seoTags={IRLANDA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="irlanda-firms-heading"
      firmsSectionTitle="İrlanda için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">İrlanda</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İrlanda seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
