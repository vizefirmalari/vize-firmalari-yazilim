import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { MEKSIKA_GUIDE_SLIDES } from "@/lib/country-guides/meksika-slides";
import {
  MEKSIKA_GUIDE_INTRO_PARAGRAPHS,
  MEKSIKA_GUIDE_SECTIONS,
  MEKSIKA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/meksika-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function MeksikaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika" ? "Kuzey Amerika — Meksika" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Turistik girişler, INM süreçleri ve geçici / kalıcı oturum yollarına genel çerçeve sunar. Ücretler, gelir eşikleri ve sınır uygulamaları sık güncellendiği için Instituto Nacional de Migración (INM) ve konsolosluk duyurularını düzenli doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Meksika Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Meksika Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={MEKSIKA_GUIDE_SLIDES}
      introParagraphs={MEKSIKA_GUIDE_INTRO_PARAGRAPHS}
      sections={MEKSIKA_GUIDE_SECTIONS}
      seoTags={MEKSIKA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="meksika-firms-heading"
      firmsSectionTitle="Meksika için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Meksika</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Meksika seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
