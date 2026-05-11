import type { CountryGuideEntry, CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import type { FirmRow } from "@/lib/types/firm";
import { CountryGuidePremiumView } from "@/components/country-guides/country-guide-premium-view";
import { BOSNA_HERSEK_GUIDE_SLIDES } from "@/lib/country-guides/bosna-hersek-slides";
import {
  BOSNA_HERSEK_GUIDE_INTRO_PARAGRAPHS,
  BOSNA_HERSEK_GUIDE_SECTIONS,
  BOSNA_HERSEK_SEO_KEYWORD_TAGS,
} from "@/lib/country-guides/bosna-hersek-guide-sections";

type Props = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
};

export function BosnaHersekCountryGuideView({ entry, region, firms }: Props) {
  const heroKicker = region?.title ?? "Ülke rehberi";
  const heroLead =
    "Ulusal C/D vize ve Employment Agency onaylı work permit hattında 2026 kota ve sektör tavanları güncellenir; temporary residence ve adres kaydı birlikte yürütülmelidir. İş değişikliği yeni permit süreci doğurabilir — Service for Foreigners’ Affairs ve eVisa bilgilerini resmî kanallardan doğrulayın.";

  return (
    <CountryGuidePremiumView
      entry={entry}
      region={region}
      firms={firms}
      jsonLdHeadline="Bosna-Hersek Vize ve Oturum Rehberi"
      heroKicker={heroKicker}
      h1="Bosna-Hersek Vize ve Oturum Rehberi (2026 güncel)"
      heroLead={heroLead}
      slides={BOSNA_HERSEK_GUIDE_SLIDES}
      introParagraphs={BOSNA_HERSEK_GUIDE_INTRO_PARAGRAPHS}
      sections={BOSNA_HERSEK_GUIDE_SECTIONS}
      seoTags={BOSNA_HERSEK_SEO_KEYWORD_TAGS}
      firmsSectionHeadingId="bosna-hersek-firms-heading"
      firmsSectionTitle="Bosna-Hersek için hizmet veren firmalar"
      firmsSectionDescription={
        <>
          <strong className="font-semibold text-foreground/80">Schengen dışı Avrupa ve Birleşik Krallık</strong>{" "}
          kataloğundaki <strong className="font-semibold text-foreground/80">Bosna-Hersek</strong> için yönetim panelinde
          ülke olarak tanımlanan firmalar burada listelenir; yayın durumu ve görünürlük ayarları her yüklemede güncel
          veritabanından çekilir. Liste; yayındaki kayıtlar arasından ülke alanında Bosna-Hersek seçili olan, arama /
          listelerde göster ve firma sayfası açık profilleri içerir.
        </>
      }
    />
  );
}
