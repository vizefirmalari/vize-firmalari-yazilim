import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { IZLANDA_GUIDE_SLIDES } from "@/lib/country-guides/izlanda-slides";
import {
  IZLANDA_GUIDE_INTRO_PARAGRAPHS,
  IZLANDA_GUIDE_SECTIONS,
  IZLANDA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/izlanda-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function IzlandaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — İzlanda" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "İzlanda Schengen ve Avrupa Ekonomik Alanı üyesidir; para birimi İzlanda krónasıdır (ISK). Vinnumálastofnun ve EURES portalı iş ilanlarını toplar; çoğu yerel ilan İzlandaca olsa da EURES ilanlarında İngilizce metin zorunludur ve eures@vmst.is üzerinden danışmanlık alınabilir. Sektör toplu iş sözleşmeleri 55/1980 sayılı Kanunla ilgili sektör ve bölgede otomatik bağlayıcıdır; bir aydan uzun ve haftada sekiz saatten fazla çalışmada iki ay içinde yazılı iş sözleşmesi gerekir. Þjóðskrá’da ikamet ve sosyal güvenlik numarası; üç–altı ayı aşan kayıtsız kalışın hukuka aykırı olduğu; E-104 ile sağlık güvencesinin hızlanması; kira talebinin arzı aşması; demiryolu olmaması ve Keflavík uluslararası havalimanı; 1 Eylül 2025’ten itibaren ICF tabanlı engellilik değerlendirmesi ve işveren maaş sübvansiyonu başlıklarında EURES kamu metnine dayanır; güncel şartları vinnumalastofnun.is, skra.is, island.is ve utlendingastofnun.is üzerinden doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="İzlanda Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="İzlanda Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={IZLANDA_GUIDE_SLIDES}
      introParagraphs={IZLANDA_GUIDE_INTRO_PARAGRAPHS}
      sections={IZLANDA_GUIDE_SECTIONS}
      seoTags={IZLANDA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="izlanda-firms-heading"
      firmsSectionTitle="İzlanda için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">İzlanda</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında İzlanda seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
