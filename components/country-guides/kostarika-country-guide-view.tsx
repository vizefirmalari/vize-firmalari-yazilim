import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { KOSTARIKA_GUIDE_SLIDES } from "@/lib/country-guides/kostarika-slides";
import {
  KOSTARIKA_GUIDE_INTRO_PARAGRAPHS,
  KOSTARIKA_GUIDE_SECTIONS,
  KOSTARIKA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/kostarika-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function KostarikaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Kuzey Amerika"
      ? "Kuzey Amerika — Kosta Rika"
      : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Turistik giriş, çalışma izni, Digital Nomad, yatırımcı ve emekli odaklı residency yollarına genel çerçeve sunar. Gelir eşikleri ve belge talepleri sık güncellenir; Dirección General de Migración ve Visit Costa Rica kaynaklarını düzenli doğrulayın (migracion.go.cr).";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Kosta Rika Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Kosta Rika Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={KOSTARIKA_GUIDE_SLIDES}
      introParagraphs={KOSTARIKA_GUIDE_INTRO_PARAGRAPHS}
      sections={KOSTARIKA_GUIDE_SECTIONS}
      seoTags={KOSTARIKA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="kostarika-firms-heading"
      firmsSectionTitle="Kosta Rika için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Kuzey Amerika</strong> bölgesindeki{" "}
          <strong className="font-semibold text-foreground/80">Kosta Rika</strong> için yönetim
          panelinde ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük
          ayarları her yüklemede güncel veritabanından çekilir. Liste; yayındaki kayıtlar arasından
          ülke alanında Kosta Rika seçili olan, arama / listelerde göster ve firma sayfası açık
          profilleri içerir.
        </>
      }
    />
  );
}
