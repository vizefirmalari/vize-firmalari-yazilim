import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { KIBRIS_GUIDE_SLIDES } from "@/lib/country-guides/kibris-slides";
import {
  KIBRIS_GUIDE_INTRO_PARAGRAPHS,
  KIBRIS_GUIDE_SECTIONS,
  KIBRIS_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/kibris-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function KibrisCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.id === "europe_non_schengen_uk"
      ? "Schengen dışı AB — Kıbrıs (Rum Kesimi)"
      : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Kıbrıs Cumhuriyeti Schengen üyesi değildir; para birimi avrodur (EUR). AB/EEA vatandaşları serbest dolaşım hakkıyla çalışabilir; üç aydan uzun kalışta istihdam, eğitim veya yeterli kaynak ve tam sağlık güvencesi şartları ve dört ay içinde Sivil Nüfus ve Göç Dairesi kaydı gerekir. Bu rehber; PES çevrimiçi işsiz kaydı ve Kıbrıs telefon şartı, EURES’te ilan numaralı CV zorunluluğu, HRDA staj ödeneği, Yunanca teorik eğitimli NMA çıraklığı, kira/m² göstergeleri, GHS katkı oranları, asgari ücret basamakları, deneme süresi ve tazminat, toplu işten çıkarma eşikleri, gelir vergisi dilimleri ve KDV, sol trafik ve havalimanları ile DSID engelli istihdam destekleri başlıklarında EURES kamu metnine dayanır; güncel bilgileri mlsi.gov.cy, eures.gov.cy, moi.gov.cy/crmd ve gesy.org.cy üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Kıbrıs Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Kıbrıs Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={KIBRIS_GUIDE_SLIDES}
      introParagraphs={KIBRIS_GUIDE_INTRO_PARAGRAPHS}
      sections={KIBRIS_GUIDE_SECTIONS}
      seoTags={KIBRIS_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="kibris-firms-heading"
      firmsSectionTitle="Kıbrıs için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          bölümündeki{" "}
          <strong className="font-semibold text-foreground/80">Kıbrıs</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Kıbrıs seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
