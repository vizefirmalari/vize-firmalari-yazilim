import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { KARADAG_GUIDE_SLIDES } from "@/lib/country-guides/karadag-slides";
import {
  KARADAG_GUIDE_INTRO_PARAGRAPHS,
  KARADAG_GUIDE_SECTIONS,
  KARADAG_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/karadag-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function KaradagCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Privremeni boravak, company director ve Digital Nomad hatlarında gelir kaynağı ve adres kaydı ayrı değerlendirilir; nomad permit yerel işverende çalışmayı kapsamaz ve PR süresine her zaman tam sayılmayabilir. Türkiye vatandaşları vizesiz rejim değişiklikleri için güncel MFA ve Interior duyurularını doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Karadağ Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Karadağ Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={KARADAG_GUIDE_SLIDES}
      introParagraphs={KARADAG_GUIDE_INTRO_PARAGRAPHS}
      sections={KARADAG_GUIDE_SECTIONS}
      seoTags={KARADAG_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="karadag-firms-heading"
      firmsSectionTitle="Karadağ için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Karadağ</strong> için yönetim panelinde ülke
          olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Karadağ seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
