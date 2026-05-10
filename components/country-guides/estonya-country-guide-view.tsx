import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { ESTONYA_GUIDE_SLIDES } from "@/lib/country-guides/estonya-slides";
import {
  ESTONYA_GUIDE_INTRO_PARAGRAPHS,
  ESTONYA_GUIDE_SECTIONS,
  ESTONYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/estonya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function EstonyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker =
    region?.title === "Schengen Bölgesi" ? "Schengen Bölgesi — Estonya" : (region?.title ?? "Ülke rehberi");
  const heroLead =
    "Dijital devlet hizmetleri, Schengen çerçevesi ve Tallinn merkezli teknoloji ekosistemi için iş arama, geçici oturum, vergi ve çalışma koşullarına giriş sunar. Tutarlar ve başvuru şartları sık değişir; politsei.ee, emta.ee, workinestonia.com ve e-estonia.com üzerinden güncel teyit alın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Estonya İş ve Yaşam Rehberi"
      heroKicker={heroKicker}
      h1="Estonya İş ve Yaşam Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={ESTONYA_GUIDE_SLIDES}
      introParagraphs={ESTONYA_GUIDE_INTRO_PARAGRAPHS}
      sections={ESTONYA_GUIDE_SECTIONS}
      seoTags={ESTONYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="estonya-firms-heading"
      firmsSectionTitle="Estonya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen Bölgesi</strong> kataloğundaki{" "}
          <strong className="font-semibold text-foreground/80">Estonya</strong> için yönetim panelinde ülke olarak
          tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Estonya seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
