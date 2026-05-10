import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { NORVEC_GUIDE_SLIDES } from "@/lib/country-guides/norvec-slides";
import {
  NORVEC_GUIDE_INTRO_PARAGRAPHS,
  NORVEC_GUIDE_SECTIONS,
  NORVEC_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/norvec-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function NorvecCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Norveç" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Schengen kısa süreli giriş; üçüncü ülke vatandaşları için UDI skilled worker residence permit süreçleri, NAV ve Work in Norway kaynakları ile yüksek yaşam maliyeti birlikte planlanmalıdır. Maaş eşikleri ve vergi düzenlemeleri sık güncellenir; udi.no ve nav.no üzerindeki resmî duyuruları düzenli doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Norveç Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Norveç Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={NORVEC_GUIDE_SLIDES}
      introParagraphs={NORVEC_GUIDE_INTRO_PARAGRAPHS}
      sections={NORVEC_GUIDE_SECTIONS}
      seoTags={NORVEC_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="norvec-firms-heading"
      firmsSectionTitle="Norveç için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Norveç</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Norveç seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
