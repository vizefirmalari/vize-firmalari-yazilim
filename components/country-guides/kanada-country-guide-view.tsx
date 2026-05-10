import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { KANADA_GUIDE_SLIDES } from "@/lib/country-guides/kanada-slides";
import {
  KANADA_GUIDE_INTRO_PARAGRAPHS,
  KANADA_GUIDE_SECTIONS,
  KANADA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/kanada-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function KanadaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika" ? "Kuzey Amerika — Kanada" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "TRV ve eTA girişleri, çalışma izinleri (LMIA / muafiyet), Express Entry ve eyalet adaylıkları (PNP) ile kalıcı oturum yollarına genel çerçeve sunar. Ücretler, CRS kesimleri ve program kuralları sık güncellendiği için IRCC resmî kaynaklarını düzenli doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Kanada Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Kanada Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={KANADA_GUIDE_SLIDES}
      introParagraphs={KANADA_GUIDE_INTRO_PARAGRAPHS}
      sections={KANADA_GUIDE_SECTIONS}
      seoTags={KANADA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="kanada-firms-heading"
      firmsSectionTitle="Kanada için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Kanada</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Kanada seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
