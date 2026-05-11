import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ARNAVUTLUK_GUIDE_SLIDES } from "@/lib/country-guides/arnavutluk-slides";
import {
  ARNAVUTLUK_GUIDE_INTRO_PARAGRAPHS,
  ARNAVUTLUK_GUIDE_SECTIONS,
  ARNAVUTLUK_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/arnavutluk-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function ArnavutlukCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal C/D vize ve e-Visa ile Unique Permit hattında gelir ve konut kanıtı önemlidir; geçerli Schengen/ABD/İngiltere izinleri vizesiz girişte koşullu olabilir. 2025–2026 work authorization ve dijital göçebe düzenlemelerini MFA, e-Visa portalı ve Visa Regime tablosundan güncel doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Arnavutluk Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Arnavutluk Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={ARNAVUTLUK_GUIDE_SLIDES}
      introParagraphs={ARNAVUTLUK_GUIDE_INTRO_PARAGRAPHS}
      sections={ARNAVUTLUK_GUIDE_SECTIONS}
      seoTags={ARNAVUTLUK_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="arnavutluk-firms-heading"
      firmsSectionTitle="Arnavutluk için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Arnavutluk</strong> için yönetim panelinde
          ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Arnavutluk seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
