import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { KUZEY_MAKEDONYA_GUIDE_SLIDES } from "@/lib/country-guides/kuzey-makedonya-slides";
import {
  KUZEY_MAKEDONYA_GUIDE_INTRO_PARAGRAPHS,
  KUZEY_MAKEDONYA_GUIDE_SECTIONS,
  KUZEY_MAKEDONYA_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/kuzey-makedonya-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function KuzeyMakedonyaCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Turist statüsünden çalışma veya uzun ikamete geçiş kural olarak mümkün değildir; D tipi ulusal vize ve oturum çizgisini baştan planlayın. 48 saatlik adres bildirimi, çalışma izni kotası ve asgari ücret rakamları sık güncellenir — İçişleri, Dışişleri, AVRM ve Ekonomi ve Çalışma Bakanlığı duyurularından doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Kuzey Makedonya Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Kuzey Makedonya Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={KUZEY_MAKEDONYA_GUIDE_SLIDES}
      introParagraphs={KUZEY_MAKEDONYA_GUIDE_INTRO_PARAGRAPHS}
      sections={KUZEY_MAKEDONYA_GUIDE_SECTIONS}
      seoTags={KUZEY_MAKEDONYA_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="kuzey-makedonya-firms-heading"
      firmsSectionTitle="Kuzey Makedonya için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Kuzey Makedonya</strong> için yönetim
          panelinde ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede
          güncel veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Kuzey Makedonya seçili olan,
          arama / listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
