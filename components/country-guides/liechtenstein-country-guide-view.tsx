import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { LIECHTENSTEIN_GUIDE_SLIDES } from "@/lib/country-guides/liechtenstein-slides";
import {
  LIECHTENSTEIN_GUIDE_INTRO_PARAGRAPHS,
  LIECHTENSTEIN_GUIDE_SECTIONS,
  LIECHTENSTEIN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/liechtenstein-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function LiechtensteinCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi"
      ? "Schengen Bölgesi — Liechtenstein"
      : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Schengen ve EEA çerçevesinde kısa süreli giriş; çalışma ve oturumda sıkı kota ve permit sistemi. Göç ve pasaport dairesi ile Liechtenstein Jobs kaynaklarından güncel teyit alın; çoğu giriş fiilen İsviçre bağlantılı rotalarla yapılır.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Liechtenstein Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Liechtenstein Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={LIECHTENSTEIN_GUIDE_SLIDES}
      introParagraphs={LIECHTENSTEIN_GUIDE_INTRO_PARAGRAPHS}
      sections={LIECHTENSTEIN_GUIDE_SECTIONS}
      seoTags={LIECHTENSTEIN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="liechtenstein-firms-heading"
      firmsSectionTitle="Liechtenstein için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Liechtenstein</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Liechtenstein seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
