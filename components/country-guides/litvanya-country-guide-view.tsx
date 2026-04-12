import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { LITVANYA_GUIDE_SLIDES } from "@/lib/country-guides/litvanya-slides";
import {
  LITVANYA_GUIDE_INTRO_PARAGRAPHS,
  LITVANYA_GUIDE_SECTIONS,
  LITVANYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/litvanya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function LitvanyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Litvanya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Litvanya Avrupa Birliği ve Schengen üyesidir; para birimi avrodur (EUR). AB uyrukluları istihdam sözleşmesiyle çoğu özel sektör işinde çalışma iznine ihtiyaç duymaz; kamu ve kolluk gibi alanlarda ise vatandaşlık şartı bulunabilir. UŽT ve eures.uzt.lt ücretsiz istihdam hizmeti sunar; özel istihdam büroları iş arayandan ücret alamaz. Staj en fazla altı ay ve haftada 20–40 saat; çıraklıkta işyerinde en az %70 uygulama ve ücret geri ödeme destekleri; MIGRIS ile ikamet başvurusu; İş Kanunu’nda yazılı sözleşme, deneme süresi, yıllık en fazla 180 saat fazla mesai ve üç yaşına kadar çocuğu olan bütçe kurumu çalışanları için haftada 32 saat seçeneği başlıklarında EURES kamu metnine dayanır; güncel şartları uzt.lt, migracija.lt, sodra.lt ve vmi.lt üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Litvanya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Litvanya Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={LITVANYA_GUIDE_SLIDES}
      introParagraphs={LITVANYA_GUIDE_INTRO_PARAGRAPHS}
      sections={LITVANYA_GUIDE_SECTIONS}
      seoTags={LITVANYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="litvanya-firms-heading"
      firmsSectionTitle="Litvanya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Litvanya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Litvanya seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
