import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { BULGARISTAN_GUIDE_SLIDES } from "@/lib/country-guides/bulgaristan-slides";
import {
  BULGARISTAN_GUIDE_INTRO_PARAGRAPHS,
  BULGARISTAN_GUIDE_SECTIONS,
  BULGARISTAN_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/bulgaristan-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function BulgaristanCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Bulgaristan" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Bulgaristan Schengen üyesidir; AB/EEA ve İsviçre vatandaşları geçerli kimlikle üç aya kadar kalabilir, daha uzun sürelerde Göç Müdürlüğü’nden uzun süreli ikamet için belge seti sunar ve çalışma iznine ihtiyaç duymaz. Bu rehber; İstihdam Ajansı ve 106 iş bürosu kaydı, adres belgesi ve iş arama portalları, Europass başvuru, İş Kanunu staj sözleşmesi ve kamu staj portalı, işyerinde eğitim, Sofya ve sahil şehirlerinde kira–satın alma örnekleri, lev ve euro alanı dışı para birimi, NAP ve NZOK pratikleri, 2025 asgari ücret ve vergi örneği, uzaktan çalışma, izin ve emeklilik, sendika–grev çerçevesi, meslekî eğitim ve engelli istihdamı başlıklarında EURES kamu metnine dayanır; güncel bilgileri az.government.bg, mvr.bg ve nap.bg üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Bulgaristan Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Bulgaristan Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={BULGARISTAN_GUIDE_SLIDES}
      introParagraphs={BULGARISTAN_GUIDE_INTRO_PARAGRAPHS}
      sections={BULGARISTAN_GUIDE_SECTIONS}
      seoTags={BULGARISTAN_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="bulgaristan-firms-heading"
      firmsSectionTitle="Bulgaristan için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Bulgaristan</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Bulgaristan seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
