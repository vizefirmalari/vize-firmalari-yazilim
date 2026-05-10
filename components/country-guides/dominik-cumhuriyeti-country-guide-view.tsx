import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { DOMINIK_CUMHURIYETI_GUIDE_SLIDES } from "@/lib/country-guides/dominik-cumhuriyeti-slides";
import {
  DOMINIK_CUMHURIYETI_GUIDE_INTRO_PARAGRAPHS,
  DOMINIK_CUMHURIYETI_GUIDE_SECTIONS,
  DOMINIK_CUMHURIYETI_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/dominik-cumhuriyeti-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function DominikCumhuriyetiCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika"
      ? "Kuzey Amerika — Dominik Cumhuriyeti"
      : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Turistik giriş (E-Ticket), çalışma vizesi, yatırımcı ve aile birleşimi residency yollarına genel çerçeve sunar. Tutarlar ve belge listeleri sık güncellenir; migracion.gob.do ve mirex.gob.do üzerinden doğrulama alın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Dominik Cumhuriyeti Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Dominik Cumhuriyeti Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={DOMINIK_CUMHURIYETI_GUIDE_SLIDES}
      introParagraphs={DOMINIK_CUMHURIYETI_GUIDE_INTRO_PARAGRAPHS}
      sections={DOMINIK_CUMHURIYETI_GUIDE_SECTIONS}
      seoTags={DOMINIK_CUMHURIYETI_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="dominik-cumhuriyeti-firms-heading"
      firmsSectionTitle="Dominik Cumhuriyeti için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Dominik Cumhuriyeti</strong> için
          yönetim panelinde ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve
          görünürlük ayarları her yüklemede güncel veritabanından çekilir. Liste; yayındaki kayıtlar
          arasından ülke alanında Dominik Cumhuriyeti seçili olan, arama / listelerde göster ve
          firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
