import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { AVUSTURYA_GUIDE_SLIDES } from "@/lib/country-guides/avusturya-slides";
import {
  AVUSTURYA_GUIDE_INTRO_PARAGRAPHS,
  AVUSTURYA_GUIDE_SECTIONS,
  AVUSTURYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/avusturya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function AvusturyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Avusturya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Avusturya Schengen üyesidir; AB/EEA ve İsviçre vatandaşları geçerli kimlikle üç aya kadar kalabilir, daha uzun sürelerde geçim, sigorta ve istihdam/eğitim ispatı ile dört ay içinde Anmeldebescheinigung alınır. Bu rehber; AMS ve alle jobs / eJob-Room ile iş arama, Almanca başvuru ve spekülatif başvuru, staj ve 2025 marjinal eşik (551,10 EUR), ikili çıraklık (Lehre) ve AuslBG, Mietrecht ve kira ortalamaları, üç günlük Meldezettel, istihdam türleri ve 14 maaş pratiği, çalışma süresi ile 2025 tele çalışma yasası, vergi ve sosyal prim oranları, e-card sağlık sistemi, dokuz yıllık zorunlu okul, vinyet ve KlimaTicket, engelli istihdamı ve BaFG başlıklarında EURES kamu metnine dayanır; güncel bilgileri ams.at, oesterreich.gv.at ve arbeiterkammer.at üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Avusturya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Avusturya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={AVUSTURYA_GUIDE_SLIDES}
      introParagraphs={AVUSTURYA_GUIDE_INTRO_PARAGRAPHS}
      sections={AVUSTURYA_GUIDE_SECTIONS}
      seoTags={AVUSTURYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="avusturya-firms-heading"
      firmsSectionTitle="Avusturya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Avusturya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Avusturya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
