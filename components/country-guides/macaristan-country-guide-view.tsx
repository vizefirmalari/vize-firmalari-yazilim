import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { MACARISTAN_GUIDE_SLIDES } from "@/lib/country-guides/macaristan-slides";
import {
  MACARISTAN_GUIDE_INTRO_PARAGRAPHS,
  MACARISTAN_GUIDE_SECTIONS,
  MACARISTAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/macaristan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function MacaristanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Macaristan" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Macaristan tam Schengen üyesidir; para birimi forinttir (HUF). AB/EEA ve İsviçre uyrukluları geçerli kimlik veya pasaportla vizesiz giriş yapabilir; üç aydan uzun yasal kalış için istihdam, kayıtlı öğrenim veya kendiniz ve aileniz için yeterli kaynak ve tam sağlık güvencesi şartlarından biri ve OIF’e kayıt belgesi veya ikamet kartı başvurusu gerekir. Bu rehber; NFSZ ve VMP, ücretsiz kamu/özel aracılık, Macarca CV ve imzalı ön yazı, çift eğitim çıraklık sözleşmesi, KSH konut istatistikleri, kreş zorunluluğu, tel çalışma ve EFO günlük harçları, 2025 asgari ücret ve garantili asgari ücret, Mt. yazılı sözleşme, fazla mesai tavanları, sendika ve iş mahkemesi, düz %15 PIT ve TAJ, e-vinyet ve engelli kota/rehabilitasyon katkısı başlıklarında EURES kamu metnine dayanır; güncel bilgileri nfsz.munka.hu, oif.gov.hu ve nav.gov.hu üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Macaristan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Macaristan Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={MACARISTAN_GUIDE_SLIDES}
      introParagraphs={MACARISTAN_GUIDE_INTRO_PARAGRAPHS}
      sections={MACARISTAN_GUIDE_SECTIONS}
      seoTags={MACARISTAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="macaristan-firms-heading"
      firmsSectionTitle="Macaristan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Macaristan</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Macaristan seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
