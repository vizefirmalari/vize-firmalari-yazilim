import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { LUKSEMBURG_GUIDE_SLIDES } from "@/lib/country-guides/luksemburg-slides";
import {
  LUKSEMBURG_GUIDE_INTRO_PARAGRAPHS,
  LUKSEMBURG_GUIDE_SECTIONS,
  LUKSEMBURG_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/luksemburg-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function LuksemburgCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Lüksemburg" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Lüksemburg Schengen ve Euro alanındadır. ADEM JobBoard ve work-in-luxembourg.lu iş arama kanallarıdır; spekülatif başvuru büyük şirketlerde yaygındır ve çoğu pozisyonda Fransızca, Almanca, İngilizce ve Lüksemburgca kombinasyonu beklenir. 9 Haziran 2020 staj yasası zorunlu kısa stajlarda ücret istisnalarını; üçüncü ülke vatandaşları için staj süresi ve ücretliliğe göre oturum veya çalışma izni yükümlülüklerini düzenler. Çıraklıkta ADEM’e şahsen kayıt ve meslek odalarıyla sözleşme; konutta yüksek kira ve sınır belediyeleri; 1 Mart 2020’den beri ulusal toplu taşımanın ücretsiz olması; SSM ve otomatik endeks; Pazar %70 ve fazla mesaide telafi dinlenmesi önceliği; fesih ihbarında iki–dört–altı ay; grev öncesi ONC tutanağı başlıklarında EURES kamu metnine dayanır; güncel şartları adem.public.lu ve guichet.public.lu üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Lüksemburg Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Lüksemburg Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={LUKSEMBURG_GUIDE_SLIDES}
      introParagraphs={LUKSEMBURG_GUIDE_INTRO_PARAGRAPHS}
      sections={LUKSEMBURG_GUIDE_SECTIONS}
      seoTags={LUKSEMBURG_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="luksemburg-firms-heading"
      firmsSectionTitle="Lüksemburg için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Lüksemburg</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Lüksemburg seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
