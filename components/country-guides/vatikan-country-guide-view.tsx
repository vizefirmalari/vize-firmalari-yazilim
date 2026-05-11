import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { VATIKAN_GUIDE_SLIDES } from "@/lib/country-guides/vatikan-slides";
import {
  VATIKAN_GUIDE_INTRO_PARAGRAPHS,
  VATIKAN_GUIDE_SECTIONS,
  VATIKAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/vatikan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function VatikanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Vatikan klasik göç veya yatırımcı oturumu sunan bir ülke değildir; ziyaret ve kısa süreli erişim İtalya Schengen çerçevesinde, uzun süreli yaşam ise neredeyse daima Roma ve İtalya residence modelleri üzerinden planlanır. Müze ve bazilika kuralları sık güncellenir — Vatikan Şehir Devleti, Holy See ve Italy Visa kaynaklarından güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Vatikan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Vatikan Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={VATIKAN_GUIDE_SLIDES}
      introParagraphs={VATIKAN_GUIDE_INTRO_PARAGRAPHS}
      sections={VATIKAN_GUIDE_SECTIONS}
      seoTags={VATIKAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="vatikan-firms-heading"
      firmsSectionTitle="Vatikan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Vatikan</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Vatikan seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
