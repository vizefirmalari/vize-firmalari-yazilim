import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { PANAMA_GUIDE_SLIDES } from "@/lib/country-guides/panama-slides";
import {
  PANAMA_GUIDE_INTRO_PARAGRAPHS,
  PANAMA_GUIDE_SECTIONS,
  PANAMA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/panama-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function PanamaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika" ? "Kuzey Amerika — Panama" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Turistik giriş kuralları, çalışma izni ve yatırımcı oturum yollarına genel çerçeve sunar. Yatırım eşikleri, Friendly Nations listesi ve kanal bölgesi uygulamaları sık güncellenir; Servicio Nacional de Migración (SNM), Çalışma Bakanlığı ve konsolosluk duyurularını düzenli doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Panama Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Panama Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={PANAMA_GUIDE_SLIDES}
      introParagraphs={PANAMA_GUIDE_INTRO_PARAGRAPHS}
      sections={PANAMA_GUIDE_SECTIONS}
      seoTags={PANAMA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="panama-firms-heading"
      firmsSectionTitle="Panama için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Panama</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Panama seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
