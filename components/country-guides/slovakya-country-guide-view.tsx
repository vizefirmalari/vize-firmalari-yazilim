import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { SLOVAKYA_GUIDE_SLIDES } from "@/lib/country-guides/slovakya-slides";
import {
  SLOVAKYA_GUIDE_INTRO_PARAGRAPHS,
  SLOVAKYA_GUIDE_SECTIONS,
  SLOVAKYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/slovakya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function SlovakyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Slovakya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB ve Schengen üyesi; otomotiv ve üretimde güçlü istihdam, Bratislava merkezli IT büyümesi ve geçici oturum + çalışma yetkilendirmesi birlikte yürür. Blue Card eşikleri ve Labour Office adımları sık güncellenir; Ministry of Interior ve EU Blue Card Slovakia duyurularından teyit alın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Slovakya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Slovakya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={SLOVAKYA_GUIDE_SLIDES}
      introParagraphs={SLOVAKYA_GUIDE_INTRO_PARAGRAPHS}
      sections={SLOVAKYA_GUIDE_SECTIONS}
      seoTags={SLOVAKYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="slovakya-firms-heading"
      firmsSectionTitle="Slovakya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Slovakya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Slovakya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
