/** Akış (/akis) içerik kategorileri — SEO landing + hub eşlemesi tek kaynak. */

export type FeedCategory = {
  title: string;
  slug: string;
  /** Kategori sayfasında kullanılacak ana metin (~meta description’a yakın bilgilendirici) */
  description: string;
  keywords: string[];
  group?: string;
};

/** Route + eşleme için genişletilmiş tanım (`matchers` DB’ye yazılmaz). */
export type FeedCategoryDef = FeedCategory & {
  matchers: readonly string[];
};

/** Hub’da “ilk tüketen” sıra — dar/geçiş kalemleri yukarıda; blog yazısı yalnızca bir blokta kullanılabilir. */
export const FEED_CATEGORY_HUB_PRIORITY_SLUGS: readonly string[] = [
  "yunanistan-golden-visa",
  "dubai-vizesi",
  "abd-gocmen-vizesi",
  "erasmus-basvuru",
  "golden-visa-yatirimci-oturumu",
  "schengen-vizesi",
  "calisma-vizesi",
  "ogrenci-vizesi",
  "turistik-vize",
  "aile-birlesimi",
  "oturum-izni",
  "iltica-uluslararasi-koruma",
  "goc-uluslararasi-koruma",
  "calisma-oturum-izni",
  "vize-reddi",
  "vize-basvuru-rehberi",
  "yurtdisi-is-ilanlari",
  "maas-ve-yasam-maliyeti",
  "ulke-rehberleri",
  "evrak-hazirlama",
  "randevu-surecleri",
  "konsolosluk-islemleri",
  "dil-sartlari",
  "saglik-sigortasi",
  "pasaport-islemleri",
  "gocmenlik-surecleri",
  "yurtdisi-calisma-oturum",
  "vize-seyahat-rehberi",
  "yurtdisi-saglik-kariyeri",
  "yurtdisi-egitim",
  "genel-bilgilendirme",
];

const DEFS_BUILDER = [
  def(
    {
      title: "Schengen Vizesi",
      slug: "schengen-vizesi",
      description:
        "Schengen vizesi süreleri, başvuru adımları, randevu, evrak düzeni ve ret sonrası strateji gibi kritik başlıklarda güncel rehber yazıları.",
      keywords: ["schengen", "schengen vizesi", "schengen bölgesi", "AVR vizesi"],
      group: "Vize türleri",
    },
    ["schengen", "schengen vizesi", "schengen area"]
  ),
  def(
    {
      title: "Çalışma Vizesi",
      slug: "calisma-vizesi",
      description:
        "Yurt dışında çalışma vizesine hazırlık, iş teklifi, sponsorluk, süreler ve sık yapılan hatalar için pratik yazılar.",
      keywords: ["çalışma vizesi", "iş vizesi", "work visa", "employment visa"],
      group: "Vize türleri",
    },
    ["çalışma vizesi", "calisma vizesi", "iş vizesi", "is vizesi", "work visa", "employment visa"]
  ),
  def(
    {
      title: "Öğrenci Vizesi",
      slug: "ogrenci-vizesi",
      description:
        "Üniversite, dil okulu ve staj rotalarında öğrenci vizesi başvurusu için evraklar, süre ve mülakat süreçlerine ilişkin rehberler.",
      keywords: ["öğrenci vizesi", "student visa", "study visa"],
      group: "Vize türleri",
    },
    ["öğrenci vizesi", "ogrenci vizesi", "student visa", "study visa"]
  ),
  def(
    {
      title: "Turistik Vize",
      slug: "turistik-vize",
      description:
        "Kısa süreli seyahat ve turistik vize başvurularında sık görülen ret nedenleri, evrak eksikleri ve başvuru stratejileri.",
      keywords: ["turistik vize", "seyahat vizesi", "tourist visa"],
      group: "Vize türleri",
    },
    ["turistik vize", "turistik", "tourist visa", "seyahat vizesi"]
  ),
  def(
    {
      title: "Aile Birleşimi",
      slug: "aile-birlesimi",
      description:
        "Aile birleşimi kapsamında destekleyici evraklar, süre yönetimi ve başvuru adımlarını özetleyen güncel içerikler.",
      keywords: ["aile birleşimi", "family reunion"],
      group: "Vize türleri",
    },
    ["aile birleşimi", "aile birlesimi", "family reunion", "family reunification"]
  ),
  def(
    {
      title: "Oturum İzni",
      slug: "oturum-izni",
      description:
        "Yurt dışında oturum/ikamet izni başvurusunda gereken temel ilkeler ve ülkeye göre değişen kritik nüansların özeti.",
      keywords: ["oturum izni", "ikamet izni", "residence permit"],
      group: "Vize ve oturum",
    },
    ["oturum izni", "residence permit", "ikamet izni"]
  ),
  def(
    {
      title: "Vize Reddi",
      slug: "vize-reddi",
      description:
        "Vize ret kararlarını doğru çerçeveden okumak, itiraz/ikinci başvuru stratejileri ve sık yapılan evrak hataları.",
      keywords: ["vize reddi", "ret kararı", "visa refusal"],
      group: "Başvuru ve süreç",
    },
    ["vize reddi", "visa refusal", "red kararı"]
  ),
  def(
    {
      title: "Vize Başvuru Rehberi",
      slug: "vize-basvuru-rehberi",
      description:
        "Formlar, fotoğraf, randevu, ödeme ve süre aksiyonlarını sırayla yönetmek için sistematik başvuru rehberleri.",
      keywords: ["vize başvurusu", "başvuru rehberi", "vfs", "online başvuru"],
      group: "Başvuru ve süreç",
    },
    ["başvuru rehberi", "basvuru rehberi", "vize başvuru süreci", "vize basvuru sureci"]
  ),
  def(
    {
      title: "Yurtdışı İş İlanları",
      slug: "yurtdisi-is-ilanlari",
      description:
        "Yurt dışı iş süreçlerinin vize başvurusuyla nasıl uyumlu ilerlemesi gerektiğine dikkat çeken özet yazılar.",
      keywords: ["yurtdışı iş ilanı", "iş bulma", "yurt dışı kariyer"],
      group: "Kariyer ve yaşam",
    },
    ["yurtdışı iş ilanı", "yurt disi is ilani", "yurtdışı iş ilanları", "yurt disi is ilanları", "iş ilanı yurtdışı", "is ilani yurt disi"]
  ),
  def(
    {
      title: "Maaş ve Yaşam Maliyeti",
      slug: "maas-ve-yasam-maliyeti",
      description:
        "Hedef ülkede bütçe planı, yaşam maliyeti ve hukuki uyum gerektiren dönemleri kurgulayan pratik yazılar.",
      keywords: ["maaş", "yaşam maliyeti", "cost of living"],
      group: "Kariyer ve yaşam",
    },
    ["maaş ve yaşam", "maas ve yasam", "yaşam maliyeti", "yasam maliyeti", "cost of living"]
  ),
  def(
    {
      title: "Ülke Rehberleri",
      slug: "ulke-rehberleri",
      description:
        "Belirli ülkeler için vize türleri, süre uzatma ve sık görülen ihtiyaçların derlendiği rehber nitelikli yazılar.",
      keywords: ["ülke rehberi", "country guide", "ülkeye göre vize"],
      group: "Rehber ve keşif",
    },
    ["ülke rehberi", "ulke rehberi", "ülke rehberleri", "ulke rehberleri", "country guide"]
  ),
  def(
    {
      title: "Evrak Hazırlama",
      slug: "evrak-hazirlama",
      description:
        "Banka dekontundan davetiyeye dek evrak doğruluğunu artıracak liste ve sıra önerileri içeren yazılar.",
      keywords: ["evrak listesi", "belge düzeni", "sponsor yazısı"],
      group: "Başvuru ve süreç",
    },
    ["evrak hazırlama", "evrak hazirlama", "belge listesi", "evrak listesi"]
  ),
  def(
    {
      title: "Randevu Süreçleri",
      slug: "randevu-surecleri",
      description:
        "Konsolosluk ve merkezi merkezi randevu sistemlerinde gecikmeyi azaltmak için temel doğrular.",
      keywords: ["randevu", "vfs randevu", "konsolosluk randevu"],
      group: "Başvuru ve süreç",
    },
    ["randevu süreci", "randevu sureci", "vfs randevu", "konsolosluk randevu"]
  ),
  def(
    {
      title: "Konsolosluk İşlemleri",
      slug: "konsolosluk-islemleri",
      description:
        "Kurye tesliminden pasaport teslim süreçlerine kadar konsolosluk tarafında beklenti yönetimi yapan yazılar.",
      keywords: ["konsolosluk", "büyükelçilik", "embassy"],
      group: "Başvuru ve süreç",
    },
    ["konsolosluk", "konsolosluk işlemi", "konsolosluk islemi", "embassy"]
  ),
  def(
    {
      title: "Dil Şartları",
      slug: "dil-sartlari",
      description:
        "IELTS / TOEFL gibi sınav gereksinimleri ve başvuru evrakında dil şartının nasıl ispatlanacağına dair notlar.",
      keywords: ["dil şartı", "IELTS", "TOEFL"],
      group: "Başvuru ve süreç",
    },
    ["dil şartı", "dil sarti", "ielts", "toefl", "dil yeterliliği", "dil yeterliligi"]
  ),
  def(
    {
      title: "Sağlık Sigortası",
      slug: "saglik-sigortasi",
      description:
        "Seyahat ve göç süreçlerinde sağlık sigortası kapsamı, süre uyumu ve belge gereksinimleri üzerine derlemeler.",
      keywords: ["seyahat sağlık sigortası", "travel health insurance"],
      group: "Başvuru ve süreç",
    },
    ["sağlık sigortası", "saglik sigortasi", "seyahat sağlık", "travel health insurance"]
  ),
  def(
    {
      title: "Pasaport İşlemleri",
      slug: "pasaport-islemleri",
      description:
        "Pasaport geçerliliği ve sayfa uygunluğu gibi sık atlama yapılan ama kritik hususların özetlendiği yazılar.",
      keywords: ["pasaport süresi", "pasaport güncelleme"],
      group: "Başvuru ve süreç",
    },
    ["pasaport işlemi", "pasaport islemi", "pasaport süreci"]
  ),
  def(
    {
      title: "Göçmenlik Süreçleri",
      slug: "gocmenlik-surecleri",
      description:
        "Uzun vadeli ikamette göçmenlik/daimi oturma adımlarını ve evrak zamanlamalarını düzenleyen özet yazılar.",
      keywords: ["göçmenlik süreci", "immigration process"],
      group: "Vize ve oturum",
    },
    ["göçmenlik süreci", "gocmenlik sureci", "immigration process"]
  ),
  def(
    {
      title: "Yurtdışı Eğitim",
      slug: "yurtdisi-egitim",
      description:
        "Üniversite ve alternatif rotalarda zamanlama, vize uyumu ve bütçe planlaması gibi kritik tema başlıkları.",
      keywords: ["yurtdışı eğitim", "study abroad"],
      group: "Kariyer ve yaşam",
    },
    ["yurtdışı eğitim", "yurt disi egitim", "study abroad", "yurtdışı okuma"]
  ),
  def(
    {
      title: "Genel Bilgilendirme",
      slug: "genel-bilgilendirme",
      description:
        "Platformda sık görülen kavramları ve süreç iskeletini anlatan yönlendirici ama bağlam gerektiren genel yazılar.",
      keywords: ["genel bilgilendirme", "süreç özeti"],
      group: "Rehber ve keşif",
    },
    ["genel bilgilendirme", "genel bilgi", "genel olarak"]
  ),
  def(
    {
      title: "Çalışma & Oturum İzni",
      slug: "calisma-oturum-izni",
      description:
        "Çalışma izni ile oturum sürekliliğinin birlikte yönetilmesinde kritik tarihler ve sık tuzakların özeti.",
      keywords: ["çalışma ve oturum", "work permit", "combined permit"],
      group: "Vize ve oturum",
    },
    ["çalışma ve oturum", "calisma ve oturum", "çalışma & oturum", "work and residence"]
  ),
  def(
    {
      title: "ABD Göçmen Vizesi",
      slug: "abd-gocmen-vizesi",
      description:
        "ABD tarafında göçmen/yerleşik statüye yaklaşırken sık kullanılan kavramlar ve başvuru hattına dikkat çeken yazılar.",
      keywords: ["green card", "ABD göçmen", "employment based"],
      group: "Özel programlar",
    },
    ["abd göçmen", "abd gocmen", "us immigrant", "green card", "amerika göçmen", "amerika gocmen"]
  ),
  def(
    {
      title: "Vize & Seyahat Rehberi",
      slug: "vize-seyahat-rehberi",
      description:
        "Uçuş, sigorta ve sınır geçişi gibi süreçlerde vizenin bağlayıcı etkisini doğru bağlamında sunan yazılar.",
      keywords: ["vize ve seyahat", "seyahat rehberi", "visa travel"],
      group: "Rehber ve keşif",
    },
    ["vize ve seyahat rehberi", "visa travel guide", "seyahat rehberi"]
  ),
  def(
    {
      title: "Yurtdışı Çalışma & Oturum",
      slug: "yurtdisi-calisma-oturum",
      description:
        "İş arama, işe başlama süreleri ile oturum izni gereksinimlerinin paralel düşünülmesini anlatan rehberler.",
      keywords: ["yurt dışı çalışma", "oturum uyumu"],
      group: "Kariyer ve yaşam",
    },
    ["yurtdışı çalışma ve oturum", "yurt disi calisma ve oturum", "yurtdışı çalışma", "overseas work residence"]
  ),
  def(
    {
      title: "Göç & Uluslararası Koruma",
      slug: "goc-uluslararasi-koruma",
      description:
        "İltica ile koruma süreçlerinin hukuki çerçevesinin okunması ve başvuru yol haritasına dikkat çeken özet yazılar.",
      keywords: ["göç süreçleri", "uluslararası koruma"],
      group: "Koruma ve hukuk",
    },
    ["göç ve uluslararası koruma", "goc ve uluslararasi koruma", "migration protection"]
  ),
  def(
    {
      title: "Golden Visa & Yatırımcı Oturumu",
      slug: "golden-visa-yatirimci-oturumu",
      description:
        "Golden visa/yatırımcı ikameti modellerinin risk ve zamanlama perspektifinden ele alındığı rehber nitelikli yazılar.",
      keywords: ["golden visa", "yatırımcı ikameti", "investor residence"],
      group: "Özel programlar",
    },
    ["golden visa", "yatırımcı oturumu", "yatirimci oturumu", "investor visa", "investor residence"]
  ),
  def(
    {
      title: "Erasmus Başvuru",
      slug: "erasmus-basvuru",
      description:
        "Erasmus ve benzeri değişim programlarında evrak sırası ile vizenin paralel işletilmesi üzerine notlar.",
      keywords: ["erasmus", "değişim programı"],
      group: "Özel programlar",
    },
    ["erasmus", "erasmus başvuru", "erasmus basvuru"]
  ),
  def(
    {
      title: "Yunanistan Golden Visa",
      slug: "yunanistan-golden-visa",
      description:
        "Yunanistan yatırımcı ikameti hattına özel gereksinimler ve sık yanlış anlaşılan başlıkların derlendiği yazılar.",
      keywords: ["Yunanistan golden visa", "Greece golden visa"],
      group: "Özel programlar",
    },
    ["yunanistan golden visa", "yunanistan golden", "greece golden visa"]
  ),
  def(
    {
      title: "Dubai Vizesi",
      slug: "dubai-vizesi",
      description:
        "Birleşik Arap Emirlikleri vizelerinin kısa süreli ve ticari bağlamlarında sık gereken doğruları özetleyen içerikler.",
      keywords: ["Dubai vizesi", "UAE vizesi", "BAE vizesi"],
      group: "Özel programlar",
    },
    ["dubai vizesi", "dubai visa", "bae vizesi", "uae vizesi"]
  ),
  def(
    {
      title: "İltica ve Uluslararası Koruma",
      slug: "iltica-uluslararasi-koruma",
      description:
        "Başvuru disiplinine ve zamanlamaya ilişkin genel doğruları vurgulayan, kişisel durum gerektiren bilgilendirici yazılar.",
      keywords: ["iltica süreci", "uluslararası koruma başvurusu"],
      group: "Koruma ve hukuk",
    },
    ["iltica", "iltica başvuru", "iltica basvuru", "asylum", "uluslararası koruma", "uluslararas koruma"]
  ),
  def(
    {
      title: "Yurtdışı Sağlık Kariyeri",
      slug: "yurtdisi-saglik-kariyeri",
      description:
        "Sağlık mesleklerinin yurt dışı yerleşim/düzenlemeler ile uyumunun ele alındığı pratik yazılar.",
      keywords: ["yurtdışı sağlık kariyeri", "healthcare abroad"],
      group: "Kariyer ve yaşam",
    },
    ["yurtdışı sağlık kariyeri", "yurt disi saglik kariyeri", "healthcare careers abroad"]
  ),
] satisfies FeedCategoryDef[];

function def(base: FeedCategory, matchers: readonly string[]): FeedCategoryDef {
  return { ...base, matchers };
}

/**
 * Tüm yayın kategorileri (`/akis/[slug]` SEO landing’leri + üst kategori navigasyonu).
 * Sıra: haber sitesi üst bar ile uyumlu sabit liste; yeni kategori eklendiğinde buraya ve gerekirse hub önceliğine eklenir.
 */
export const FEED_CATEGORY_DEFS: readonly FeedCategoryDef[] = DEFS_BUILDER;

const BY_SLUG = new Map<string, FeedCategoryDef>(FEED_CATEGORY_DEFS.map((c) => [c.slug, c]));

export function getFeedCategoryBySlug(slug: string): FeedCategoryDef | null {
  if (!slug || typeof slug !== "string") return null;
  return BY_SLUG.get(slug.trim().toLowerCase()) ?? null;
}

export function listFeedCategorySlugs(): string[] {
  return FEED_CATEGORY_DEFS.map((c) => c.slug);
}

export function slugIsValidAkisFeedCategory(slug: string): boolean {
  return getFeedCategoryBySlug(slug) !== null;
}
