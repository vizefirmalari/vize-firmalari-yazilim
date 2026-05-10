import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { FINLANDIYA_GUIDE_SLIDES } from "@/lib/country-guides/finlandiya-slides";
import {
  FINLANDIYA_GUIDE_INTRO_PARAGRAPHS,
  FINLANDIYA_GUIDE_SECTIONS,
  FINLANDIYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/finlandiya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function FinlandiyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Finlandiya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Schengen kısa süreli giriş kuralları ile Migri çalışma ve oturum izni süreçlerine genel çerçeve sunar. Specialist ve startup hatları, Kela ve vero.fi yükümlülükleri sık güncellenir; resmî duyuruları migri.fi, workinfinland.fi ve vero.fi üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Finlandiya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Finlandiya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={FINLANDIYA_GUIDE_SLIDES}
      introParagraphs={FINLANDIYA_GUIDE_INTRO_PARAGRAPHS}
      sections={FINLANDIYA_GUIDE_SECTIONS}
      seoTags={FINLANDIYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="finlandiya-firms-heading"
      firmsSectionTitle="Finlandiya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Finlandiya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Finlandiya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
