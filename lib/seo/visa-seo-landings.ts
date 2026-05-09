import type { Metadata } from "next";
import { parseFirmFilters } from "@/lib/data/firms";
import type { FirmFilters } from "@/lib/types/firm";
import type { ListingCategoryLock } from "@/lib/firma/listing-category-lock";
import { normalizeSpecializationFilterToken } from "@/lib/firma/specialization-match";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { getExploreCategoryBySlug } from "@/lib/explore/explore-categories";
import { VISA_SEO_EDITORIAL_PARAGRAPHS } from "@/lib/seo/visa-seo-editorial";

export const VISA_SEO_LANDING_PATHS = [
  "/abd-vizesi",
  "/ingiltere-vizesi",
  "/schengen-vizesi",
  "/dubai-vizesi",
  "/yunanistan-golden-visa",
  "/kanada-vizesi",
  "/yurtdisi-egitim-danismanligi",
  "/nitelikli-isci-yerlestirme",
] as const;

export type VisaSeoLandingPath = (typeof VISA_SEO_LANDING_PATHS)[number];

/** Panel taxonomy ile aynı canonical slug; label eşleşmesi kırılgan olmasın diye kodda sabitlenir. */
export const YUNANISTAN_GOLDEN_VISA_TAXONOMY_SLUG = "yunanistan-golden-visa";

export function isVisaSeoLandingPath(path: string): path is VisaSeoLandingPath {
  return (VISA_SEO_LANDING_PATHS as readonly string[]).includes(path);
}

export type VisaSeoFaqItem = { question: string; answer: string };

type VisaSeoLandingRow = {
  path: VisaSeoLandingPath;
  title: string;
  metaDescription: string;
  h1: string;
  heroLead: string;
  faq: VisaSeoFaqItem[];
  /** Sunucu listesi; URL’den yalnızca `q` ve `sort` birleştirilir */
  lockExploreSlug?: string | null;
  lockMainServices?: string[];
  lockVisaTypes?: string[];
  /**
   * Ek uzmanlık taxonomy slug’ları (`custom_specializations`); `visaTypes` filtresi ile aynı kanal.
   * Keşfet slug’ından bağımsız; URL’deki `visaTypes` ile genişletilmez (kilit sıkı kalır).
   */
  lockSpecializationTaxonomySlugs?: string[];
};

export type LandingDef = VisaSeoLandingRow & {
  editorialParagraphs: string[];
};

const LANDINGS: Record<VisaSeoLandingPath, VisaSeoLandingRow> = {
  "/abd-vizesi": {
    path: "/abd-vizesi",
    title: "ABD Vizesi Danışmanlık Firmaları",
    metaDescription:
      "ABD vizesi ve Amerika başvuru süreçlerinde danışmanlık veren firmaları karşılaştırın. Kurumsallık skoru, hype puanı ve iletişim bilgileri tek ekranda.",
    h1: "ABD Vizesi Danışmanlık Firmaları",
    heroLead:
      "Amerika Birleşik Devletleri vize ve başvuru süreçlerinde destek sunan yayınlanmış firmaları filtreleyin, profillerini inceleyin ve doğrudan iletişime geçin.",
    lockExploreSlug: "abd-vizesi",
    faq: [
      {
        question: "ABD vizesi için danışmanlık firması seçerken nelere bakmalıyım?",
        answer:
          "Kurumsallık skoru, uzmanlık alanları, hizmet kapsamı ve iletişim kanallarını karşılaştırın. Platform yalnızca aracıdır; nihai sözleşme ve danışmanlık firmayla sizin aranızdadır.",
      },
      {
        question: "Listelenen firmalar platform tarafından onaylanmış mıdır?",
        answer:
          "Yalnızca yayınlanmış (published) firma kayıtları listelenir. Kurumsallık skoru ve profil alanları şeffaf karşılaştırma için sunulur.",
      },
      {
        question: "Filtreler ABD dışındaki firmaları da gösterebilir mi?",
        answer:
          "Sol paneldeki filtreleri değiştirdiğinizde liste güncellenir. Bu sayfa varsayılan olarak ABD vizesi odaklı keşfet eşlemesiyle açılır.",
      },
      {
        question: "Ücret ve komisyon platforma mı ödenir?",
        answer:
          "Hayır. Vize Firmaları aracı listeleme sunar; müşteri–firma arasındaki ücretlendirme ve sözleşme firmaya aittir.",
      },
      {
        question: "Arama kutusu bu sayfada nasıl çalışır?",
        answer:
          "Üst arama, mevcut liste filtrelerinizi koruyarak ana sayfa sonuçlarına yönlendirir; firma adı veya hedef ülke ile arama yapabilirsiniz.",
      },
    ],
  },
  "/ingiltere-vizesi": {
    path: "/ingiltere-vizesi",
    title: "İngiltere Vizesi Danışmanlık Firmaları",
    metaDescription:
      "İngiltere ve UK vize süreçlerinde danışmanlık veren firmaları keşfedin. Karşılaştırılabilir profiller, kurumsallık skoru ve güven odaklı vitrin.",
    h1: "İngiltere Vizesi Danışmanlık Firmaları",
    heroLead:
      "İngiltere vizesi, ziyaret ve başvuru süreçlerinde destek sunan firmaları tek yerde görün; filtrelerle daraltın ve profil üzerinden iletişime geçin.",
    lockExploreSlug: "ingiltere-vizesi",
    faq: [
      {
        question: "İngiltere vizesi için hangi firma profiline güvenebilirim?",
        answer:
          "Kurumsallık skoru, doğrulanmış ofis ve uzmanlık bayrakları gibi alanları inceleyin. Platform tavsiye vermez; bilgileri karşılaştırmanızı sağlar.",
      },
      {
        question: "Schengen ile İngiltere vizesi aynı mıdır?",
        answer:
          "Hayır. İngiltere ayrı bir başvuru sistemine sahiptir. Bu koleksiyon İngiltere odaklı eşleşen firmaları listeler.",
      },
      {
        question: "Randevu ve evrak desteği sunuluyor mu?",
        answer:
          "Firma kartlarındaki hizmet ve ana hizmet etiketlerinden destek kapsamını görebilirsiniz. Detay için firmayla iletişime geçin.",
      },
      {
        question: "Filtreleri değiştirdiğimde sayfa SEO adresi değişir mi?",
        answer:
          "Liste aynı sayfa üzerinde güncellenir; paylaşım için kanonik URL sabit kalır. Paylaşılabilir detaylı filtreler için arama parametreleri kullanılabilir.",
      },
      {
        question: "Platform vize başvurusu yapar mı?",
        answer:
          "Hayır. Vize Firmaları yalnızca aracı vitrin ve iletişim kanalı sağlar; başvuru ve danışmanlık firmaya aittir.",
      },
    ],
  },
  "/schengen-vizesi": {
    path: "/schengen-vizesi",
    title: "Schengen Vizesi Danışmanlık Firmaları",
    metaDescription:
      "Schengen vizesi ve Avrupa seyahat başvurularında danışmanlık veren firmaları listeleyin. Şeffaf skorlar ve filtrelerle hızlı karşılaştırma.",
    h1: "Schengen Vizesi Danışmanlık Firmaları",
    heroLead:
      "Schengen bölgesi ve Avrupa seyahat vizelerinde destek sunan firmaları bulun; ülke, şehir ve uzmanlık filtreleriyle listeyi daraltın.",
    lockExploreSlug: "schengen-vizesi",
    faq: [
      {
        question: "Schengen vizesi hangi ülkeleri kapsar?",
        answer:
          "Schengen üyesi ülkelerde kısa süreli seyahat için ortak vize alanı anlamına gelir. Firma kapsamı kartlarda ülke ve bölge etiketleriyle görünür.",
      },
      {
        question: "Turistik ve iş seyahati ayrı mı filtrelenir?",
        answer:
          "Sol panelde vize türü ve ana hizmet etiketleriyle niyetinize uygun firmaları seçebilirsiniz.",
      },
      {
        question: "Kurumsallık skoru neyi ifade eder?",
        answer:
          "Kayıtlı kurumsal ve güven sinyallerinin özetidir; yüksek skor daha zengin doğrulanmış bilgi anlamına gelebilir; mutlak garanti değildir.",
      },
      {
        question: "Birden fazla Schengen ülkesi seçebilir miyim?",
        answer:
          "Evet. Ülke ve bölge filtreleri mevcut liste motoru ile uyumludur.",
      },
      {
        question: "Danışmanlık ücreti platformda görünür mü?",
        answer:
          "Ücret bilgisi firmaya özgüdür; platform genel ücret ilan etmez. İletişim için firma profilini kullanın.",
      },
    ],
  },
  "/dubai-vizesi": {
    path: "/dubai-vizesi",
    title: "Dubai Vizesi Danışmanlık Firmaları",
    metaDescription:
      "Dubai ve BAE vize süreçlerinde danışmanlık veren firmaları keşfedin. Karşılaştırılabilir profiller ve doğrudan iletişim.",
    h1: "Dubai Vizesi Danışmanlık Firmaları",
    heroLead:
      "Dubai ve Birleşik Arap Emirlikleri odaklı vize danışmanlığı sunan firmaları listeleyin; kapsama ve hizmetlere göre filtreleyin.",
    lockExploreSlug: "dubai-vizesi",
    faq: [
      {
        question: "Dubai vizesi için hangi belgeler gerekir?",
        answer:
          "Belge listesi vize türüne göre değişir. Profilde hizmet ve süreç etiketlerini inceleyin; kesin liste için firmadan teyit alın.",
      },
      {
        question: "BAE kapsamı Dubai ile sınırlı mıdır?",
        answer:
          "Koleksiyon BAE ve Dubai odaklı eşleşen firmaları içerir; firma kartlarındaki ülke ve bölge alanlarını kontrol edin.",
      },
      {
        question: "Ofis konumu filtresi nasıl kullanılır?",
        answer:
          "Türkiye’deki fiziksel ofis şehrine göre firmaları daraltmak için sol paneldeki ofis konumu alanını kullanın.",
      },
      {
        question: "Hype puanı ne anlama gelir?",
        answer:
          "Platformdaki etkileşim ve vitrin sinyallerinin bir özetidir; kurumsallık skoru ile birlikte değerlendirin.",
      },
      {
        question: "Mesajlaşma tüm firmalarda açık mıdır?",
        answer:
          "Panel üyeliği ve ayarlara bağlıdır. Profilde mesajlaşma durumunu kontrol edin.",
      },
    ],
  },
  "/yunanistan-golden-visa": {
    path: "/yunanistan-golden-visa",
    title: "Yunanistan Golden Visa Danışmanlığı ve Oturum Süreçleri",
    metaDescription:
      "Golden Visa (yatırıma dayalı oturum) ile Yunanistan vize ve başvuru süreçlerinde danışmanlık veren firmaları listeleyin. Golden Visa vurgulu profiller, filtreler ve doğrudan iletişim.",
    h1: "Yunanistan Golden Visa Danışmanlık Firmaları",
    heroLead:
      "Golden Visa programı ile Yunanistan’da yatırıma dayalı oturum ve ilgili vize süreçlerinde destek sunan danışmanlık firmalarını burada bulun; turistik başvurulardan farklı belge ve süreç beklentileri için profilleri karşılaştırın.",
    lockSpecializationTaxonomySlugs: [YUNANISTAN_GOLDEN_VISA_TAXONOMY_SLUG],
    faq: [
      {
        question: "Golden Visa ile turistik vize aynı mıdır?",
        answer:
          "Hayır. Golden Visa genellikle yatırıma dayalı oturum programlarını ifade eder. Bu sayfa yalnızca panelde “Yunanistan Golden Visa” ek uzmanlığı tanımlı danışmanlık firmalarını listeler; genel Yunanistan vizesi keşfet eşlemesiyle karıştırılmaz.",
      },
      {
        question: "Yatırım tutarı bilgisi platformda var mıdır?",
        answer:
          "Program koşulları resmi mevzuata göre değişebilir. Güncel tutar ve süreç için firmadan ve resmi kaynaklardan doğrulama alın.",
      },
      {
        question: "Listeyi sadece oturum hizmeti verenlere nasıl daraltırım?",
        answer:
          "Sol panelde ana hizmet ve vize türü filtrelerini kullanın; oturum ve danışmanlık etiketlerini seçebilirsiniz.",
      },
      {
        question: "Schengen ile Yunanistan ilişkisi nedir?",
        answer:
          "Yunanistan Schengen üyesidir; başvuru türünüze göre farklı süreçler uygulanabilir. Firma açıklamalarını dikkatle okuyun.",
      },
      {
        question: "Platform hukuki danışmanlık verir mi?",
        answer:
          "Hayır. Hukuki ve yatırım kararları için lisanslı danışmanlık firması ile çalışın.",
      },
    ],
  },
  "/kanada-vizesi": {
    path: "/kanada-vizesi",
    title: "Kanada Vizesi Danışmanlık Firmaları",
    metaDescription:
      "Kanada vize, çalışma ve oturum süreçlerinde danışmanlık veren firmaları listeleyin. Kurumsallık skoru ve filtrelerle güvenli karşılaştırma.",
    h1: "Kanada Vizesi Danışmanlık Firmaları",
    heroLead:
      "Kanada vizesi ve ilgili başvuru süreçlerinde hizmet veren firmaları bulun; kapsam ve uzmanlık alanlarına göre filtreleyin.",
    lockExploreSlug: "kanada-vizesi",
    faq: [
      {
        question: "Kanada vizesi için hangi danışmanlık türleri listelenir?",
        answer:
          "Kayıtlı hizmet ve ülke kapsamına göre eşleşen firmalar gösterilir. Kart üzerindeki etiketleri ve açıklamayı inceleyin.",
      },
      {
        question: "Express Entry danışmanlığı bu listede yer alır mı?",
        answer:
          "Firma hizmet metinlerinde geçen süreçler eşleşmeye dahildir. Arama kutusu ve filtrelerle daraltabilirsiniz.",
      },
      {
        question: "Kurumsallık skoru düşük firmalar neden listede olabilir?",
        answer:
          "Skor eksik beyan anlamına gelebilir; her zaman profil detayını ve iletişimi birlikte değerlendirin.",
      },
      {
        question: "İki ülkeye birden hizmet veren firmalar görünür mü?",
        answer:
          "Evet. Kanada kapsamı olan firmalar bu koleksiyonda yer alabilir; diğer ülkeler kartta listelenebilir.",
      },
      {
        question: "Başvuru sonucu platform garantisi verir mi?",
        answer:
          "Hayır. Sonuçlar konsolosluk ve başvuru dosyasına bağlıdır; platform aracı listeleme sunar.",
      },
    ],
  },
  "/yurtdisi-egitim-danismanligi": {
    path: "/yurtdisi-egitim-danismanligi",
    title: "Yurtdışı Eğitim Danışmanlığı Veren Firmalar",
    metaDescription:
      "Yurtdışı eğitim ve okul başvurularında danışmanlık veren firmaları bulun. Karşılaştırılabilir profiller ve şeffaf filtreler.",
    h1: "Yurtdışı Eğitim Danışmanlığı Veren Firmalar",
    heroLead:
      "Yurtdışı eğitim danışmanlığı sunan firmaları ana hizmet filtresiyle listeleyin; öğrenci vizesi ve ilgili süreçlerde destek arayın.",
    lockMainServices: ["Yurtdışı Eğitim Danışmanlığı"],
    faq: [
      {
        question: "Yurtdışı eğitim danışmanlığı hangi hizmetleri kapsar?",
        answer:
          "Okul seçimi, başvuru dosyası ve vize süreçlerine destek gibi hizmetler firmaya göre değişir. Profildeki ana hizmet ve açıklamaları okuyun.",
      },
      {
        question: "Öğrenci vizesi ile aynı filtre mi?",
        answer:
          "Bu sayfa ana hizmet etiketi üzerinden eşleşir. Öğrenci vizesi uzmanlığı için sol paneldeki vize türü filtresini ekleyebilirsiniz.",
      },
      {
        question: "Üniversite kabul mektubu hizmeti sunulur mu?",
        answer:
          "Firma hizmet listesinde yer alıyorsa kartlarda görünebilir. Kesin kapsam için firmayla teyit edin.",
      },
      {
        question: "Dil okulu başvuruları dahil midir?",
        answer:
          "Firma hizmet metinlerinde geçen eğitim danışmanlığı kapsamına bağlıdır; arama ve filtrelerle daraltın.",
      },
      {
        question: "Platform eğitim kurumu mudur?",
        answer:
          "Hayır. Vize Firmaları aracı listeleme ve iletişim altyapısı sunar.",
      },
    ],
  },
  "/nitelikli-isci-yerlestirme": {
    path: "/nitelikli-isci-yerlestirme",
    title: "Nitelikli İşçi Yerleştirme ve Çalışma Vizesi Danışmanlığı",
    metaDescription:
      "Çalışma vizesi ve nitelikli işçi yerleştirme süreçlerinde danışmanlık veren firmaları listeleyin. Uzmanlık filtresi ile hızlı eşleşme.",
    h1: "Nitelikli İşçi Yerleştirme Danışmanlık Firmaları",
    heroLead:
      "Çalışma vizesi ve istihdam odaklı danışmanlık sunan firmaları uzmanlık filtresiyle bulun; kurumsallık skoru ile karşılaştırın.",
    lockVisaTypes: ["work_visa_support"],
    faq: [
      {
        question: "Nitelikli işçi yerleştirme danışmanlığı nedir?",
        answer:
          "Yurtdışında işe yerleştirme ve çalışma izni süreçlerinde firmaların sunduğu danışmanlık hizmetlerini kapsar. Kapsam firmaya göre değişir.",
      },
      {
        question: "İşveren sponsorluğu süreçleri dahil midir?",
        answer:
          "Firma profillerinde anılan hizmetler listelenir. Hukuki ve işveren yükümlülükleri için uzman firma ile çalışın.",
      },
      {
        question: "Bu liste yalnızca belirli ülkeleri mi gösterir?",
        answer:
          "Varsayılan filtre çalışma vizesi uzmanlığıdır; ülke ve diğer filtreleri sol panelden ekleyebilirsiniz.",
      },
      {
        question: "İşe alım garantisi verilir mi?",
        answer:
          "Platform veya listelenen firmalar işe alım garantisi sunmaz; süreç danışmanlığı ve başvuru desteği firmaya özgüdür.",
      },
      {
        question: "Veri güvenliği nasıl sağlanır?",
        answer:
          "Kişisel verileriniz platform politikalarına tabidir; hassas belgeleri yalnızca güvendiğiniz kanallarla paylaşın.",
      },
    ],
  },
};

/** Panel taxonomy slug’larını filtre token’ına normalize eder (trim, case, format). */
export function normalizedVisaLandingTaxonomySlugs(
  slugs: string[] | undefined
): string[] {
  if (!slugs?.length) return [];
  const out: string[] = [];
  for (const raw of slugs) {
    const n = normalizeSpecializationFilterToken(raw);
    if (n) out.push(n);
  }
  return [...new Set(out)];
}

/** SEO vitrin `FirmsListing` kilidi; taxonomy kilidi keşfetten önceliklidir. */
export function visaSeoLandingListingCategoryLock(cfg: {
  lockExploreSlug?: string | null;
  lockMainServices?: string[];
  lockVisaTypes?: string[];
  lockSpecializationTaxonomySlugs?: string[];
}): ListingCategoryLock | null {
  const tax = normalizedVisaLandingTaxonomySlugs(cfg.lockSpecializationTaxonomySlugs);
  if (tax.length) return { visaTypes: tax };
  if (cfg.lockExploreSlug != null) return { exploreSlug: cfg.lockExploreSlug };
  if (cfg.lockMainServices?.length) return { mainServices: [...cfg.lockMainServices] };
  if (cfg.lockVisaTypes?.length) return { visaTypes: [...cfg.lockVisaTypes] };
  return null;
}

function stripVisaListingTitleSuffix(raw: string): string {
  return raw
    .trim()
    .replace(/\s+Danışmanlık Firmaları\s*$/i, "")
    .replace(/\s+Veren Firmalar\s*$/i, "")
    .trim();
}

/**
 * Liste / rail başlıklarında kullanılacak kısa odak etiketi — önce `lockMainServices`,
 * ardından `h1` / `title` sonek temizliği, son çare keşfet `label` (yapılandırma kaynaklı).
 */
export function visaSeoLandingListingFocusLabel(cfg: LandingDef): string {
  const fromServices = cfg.lockMainServices?.[0]?.trim();
  if (fromServices) return fromServices;
  const fromH1 = stripVisaListingTitleSuffix(cfg.h1 ?? "");
  if (fromH1) return fromH1;
  const fromTitle = stripVisaListingTitleSuffix(cfg.title ?? "");
  if (fromTitle) return fromTitle;
  if (cfg.lockExploreSlug) {
    const cat = getExploreCategoryBySlug(cfg.lockExploreSlug);
    if (cat?.label?.trim()) return cat.label.trim();
  }
  return (cfg.title || cfg.h1 || "Liste").trim();
}

export function getVisaSeoLanding(path: string): LandingDef | null {
  if (!isVisaSeoLandingPath(path)) return null;
  return {
    ...LANDINGS[path],
    editorialParagraphs: VISA_SEO_EDITORIAL_PARAGRAPHS[path],
  };
}

export function mergeVisaLandingServerFilters(
  path: VisaSeoLandingPath,
  sp: Record<string, string | string[] | undefined>
): FirmFilters {
  const fromUrl = parseFirmFilters(sp);
  const cfg = LANDINGS[path];
  const taxonomyLocked = normalizedVisaLandingTaxonomySlugs(cfg.lockSpecializationTaxonomySlugs);
  const lockedServiceOrVisa =
    Boolean(cfg.lockMainServices?.length) ||
    Boolean(cfg.lockVisaTypes?.length) ||
    Boolean(taxonomyLocked.length);
  const exploreFocusSlug =
    cfg.lockExploreSlug !== undefined
      ? cfg.lockExploreSlug
      : lockedServiceOrVisa
        ? null
        : fromUrl.exploreFocusSlug;

  const hasStrictVisaLock =
    Boolean(cfg.lockVisaTypes?.length) || Boolean(taxonomyLocked.length);
  const visaTypes = hasStrictVisaLock
    ? [...new Set([...(cfg.lockVisaTypes ?? []), ...taxonomyLocked])]
    : fromUrl.visaTypes;

  return {
    ...fromUrl,
    q: fromUrl.q,
    countries: fromUrl.countries,
    regions: fromUrl.regions,
    visaTypes,
    expertise: fromUrl.expertise,
    cities: fromUrl.cities,
    mainServices: cfg.lockMainServices ?? fromUrl.mainServices,
    firmTypes: fromUrl.firmTypes,
    exploreFocusSlug,
    sort: fromUrl.sort,
  };
}

export async function buildVisaSeoMetadata(
  path: VisaSeoLandingPath,
  _sp: Record<string, string | string[] | undefined>
): Promise<Metadata> {
  const cfg = LANDINGS[path];
  const canonical = absoluteUrl(path);
  const img = resolveDefaultSiteShareImage();
  const title = cfg.title;
  const description = cfg.metaDescription.slice(0, 160);
  const ogTitle = `${SITE_BRAND_NAME} — ${title}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [img.url],
    },
    robots: { index: true, follow: true },
  };
}
