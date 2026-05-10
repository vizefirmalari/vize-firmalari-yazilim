import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { SLOVENYA_GUIDE_SLIDES } from "@/lib/country-guides/slovenya-slides";
import {
  SLOVENYA_GUIDE_INTRO_PARAGRAPHS,
  SLOVENYA_GUIDE_SECTIONS,
  SLOVENYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/slovenya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function SlovenyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Slovenya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB ve Schengen üyeliği ile güvenli yaşam ve Ljubljana–Koper ekseninde lojistik avantaj bir arada; çalışmada single permit ve Employment Service onayı kritik adımdır. 2025–2026 göç güncellemelerini Entry and Residence ve Employment Service duyurularından doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Slovenya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Slovenya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={SLOVENYA_GUIDE_SLIDES}
      introParagraphs={SLOVENYA_GUIDE_INTRO_PARAGRAPHS}
      sections={SLOVENYA_GUIDE_SECTIONS}
      seoTags={SLOVENYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="slovenya-firms-heading"
      firmsSectionTitle="Slovenya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Slovenya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Slovenya seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
