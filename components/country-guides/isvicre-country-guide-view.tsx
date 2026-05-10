import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ISVICRE_GUIDE_SLIDES } from "@/lib/country-guides/isvicre-slides";
import {
  ISVICRE_GUIDE_INTRO_PARAGRAPHS,
  ISVICRE_GUIDE_SECTIONS,
  ISVICRE_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/isvicre-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IsvicreCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — İsviçre" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Schengen kısa süreli giriş ile L/B/C permit ve kota temelli çalışma süreçlerine genel çerçeve sunar. İsviçre AB üyesi değildir; kanton vergisi ve permit kuralları yerel olarak değişir. SEM, admin.ch ve federal vergi kaynaklarından güncel teyit alın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İsviçre Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İsviçre Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={ISVICRE_GUIDE_SLIDES}
      introParagraphs={ISVICRE_GUIDE_INTRO_PARAGRAPHS}
      sections={ISVICRE_GUIDE_SECTIONS}
      seoTags={ISVICRE_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="isvicre-firms-heading"
      firmsSectionTitle="İsviçre için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">İsviçre</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İsviçre seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
