import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ROMANYA_GUIDE_SLIDES } from "@/lib/country-guides/romanya-slides";
import {
  ROMANYA_GUIDE_INTRO_PARAGRAPHS,
  ROMANYA_GUIDE_SECTIONS,
  ROMANYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/romanya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function RomanyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Romanya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB üyeliği ve Schengen entegrasyonu ile kısa süreli giriş kuralları güncellenmiştir; çalışmada work permit ve residence permit hatları birlikte yürür. Maaş–vergi dengesi ve Bükreş / Cluj kira bandını erken planlayın; Immigration Inspectorate ve MAE duyurularından teyit alın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Romanya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Romanya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={ROMANYA_GUIDE_SLIDES}
      introParagraphs={ROMANYA_GUIDE_INTRO_PARAGRAPHS}
      sections={ROMANYA_GUIDE_SECTIONS}
      seoTags={ROMANYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="romanya-firms-heading"
      firmsSectionTitle="Romanya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Romanya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Romanya seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
