import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { CEKYA_GUIDE_SLIDES } from "@/lib/country-guides/cekya-slides";
import {
  CEKYA_GUIDE_INTRO_PARAGRAPHS,
  CEKYA_GUIDE_SECTIONS,
  CEKYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/cekya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function CekyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Çekya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Çekya Schengen üyesidir; para birimi Çek korunasıdır (CZK). AB/EEA vatandaşları çalışma izni olmadan istihdam edilebilir; otuz günden uzun kalışta kayıt isteğe bağlı, üç aydan uzun sürelerde geçici ikamet belgesi alınabilir. Bu rehber; EURES ve Úřad práce, lisanslı ve ücretsiz iş aracılığı, Çekçe başvuru kültürü, yasal çerçevesi sınırlı staj, okul ağırlıklı IVET ve vergi teşvikleri, Prag–Brno kira gerçeği, OAMP ve yabancı polis kaydı, DPP/DPÇ, İş Kanunu zorunlu maddeleri, 2025 asgari ücret ve bordro kesintileri, uzaktan çalışma, izinler, sendika–grev pratiği, gelir vergisi ve KDV, sağlık sigortası, e-otoyol vignette ve engelli kota sistemi başlıklarında EURES kamu metnine dayanır; güncel bilgileri mpsv.cz, uradprace.cz ve mvcr.cz üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Çekya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Çekya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={CEKYA_GUIDE_SLIDES}
      introParagraphs={CEKYA_GUIDE_INTRO_PARAGRAPHS}
      sections={CEKYA_GUIDE_SECTIONS}
      seoTags={CEKYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="cekya-firms-heading"
      firmsSectionTitle="Çekya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Çekya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Çekya seçili olan, arama / listelerde göster ve firma
          sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
