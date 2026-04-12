import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { LETONYA_GUIDE_SLIDES } from "@/lib/country-guides/letonya-slides";
import {
  LETONYA_GUIDE_INTRO_PARAGRAPHS,
  LETONYA_GUIDE_SECTIONS,
  LETONYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/letonya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function LetonyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Letonya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "AB/EEA ve İsviçre uyrukluları Letonya’da çalışmak için ayrıca çalışma izni almak zorunda değildir; işveren çalışanı Gelir İdaresi (VID) nezdinde bildirir. Bu rehber; Devlet İstihdam Ajansı (NVA) ve EURES, lisanslı işe yerleştirme, yazılı iş sözleşmesi ve ücret ödeme sıklığı, asgari ücret ve vergi–SSK özetleri, PMLP ikamet kaydı, konut kirası ve Taşınmaz Kiralama Kanunu, İş Kanunu (VDI), sağlık (VMNVD) ve eğitim başlıklarında EURES kamu metnine dayanır; güncel mevzuat için nva.gov.lv, pmlp.gov.lv ve vid.gov.lv doğrulaması yapın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Letonya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Letonya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={LETONYA_GUIDE_SLIDES}
      introParagraphs={LETONYA_GUIDE_INTRO_PARAGRAPHS}
      sections={LETONYA_GUIDE_SECTIONS}
      seoTags={LETONYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="letonya-firms-heading"
      firmsSectionTitle="Letonya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Letonya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Letonya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
