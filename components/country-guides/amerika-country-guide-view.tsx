import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { AMERIKA_GUIDE_SLIDES } from "@/lib/country-guides/amerika-slides";
import {
  AMERIKA_GUIDE_INTRO_PARAGRAPHS,
  AMERIKA_GUIDE_SECTIONS,
  AMERIKA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/amerika-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function AmerikaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika" ? "Kuzey Amerika — Amerika" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Amerika Birleşik Devletleri’ne yönelik turistik, çalışma ve yatırımcı vize süreçleri ile Green Card ve vatandaşlık başlıklarında güvenilir bir çerçeve sunar. Ücretler ve politikalar zamanla değiştiği için bilgileri resmî kaynaklarla güncel tutmanız gerekir.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Amerika Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Amerika Vize ve Oturum Rehberi"
      heroLead={heroLead}
      slides={AMERIKA_GUIDE_SLIDES}
      introParagraphs={AMERIKA_GUIDE_INTRO_PARAGRAPHS}
      sections={AMERIKA_GUIDE_SECTIONS}
      seoTags={AMERIKA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="amerika-firms-heading"
      firmsSectionTitle="Amerika için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Amerika</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel veritabanından
          çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Amerika seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
