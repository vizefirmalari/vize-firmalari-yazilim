/**
 * Kamuya açık, indekslenebilir statik sayfalar — sitemap + metadata tek kaynak.
 * İçerik metinleri kısa ve benzersiz tutulur (ince içerik riski azaltılır).
 */
export type PublicDocumentPageDef = {
  /** URL path, örn. /hakkimizda */
  path: string;
  /** metadata.title — şablonsuz kısa başlık */
  title: string;
  description: string;
  /** H1 */
  heading: string;
  /** Ana paragraf */
  body: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

export const PUBLIC_DOCUMENT_PAGES = {
  hakkimizda: {
    path: "/hakkimizda",
    title: "Hakkımızda",
    description:
      "Vize Firmaları; vize danışmanlık firmalarını karşılaştırmanıza yardımcı olan bağımsız bir bilgi ve listeleme platformudur.",
    heading: "Hakkımızda",
    body: "Vize Firmaları, başvuru süreçlerinde doğru danışmanlık firmasını bulmanızı kolaylaştırmak için kurulmuştur. Platform üzerinde yer alan firmaların bilgileri, yönetim doğrulaması ve firma beyanları doğrultusunda sunulur; resmi bir devlet kurumu değiliz.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  iletisim: {
    path: "/iletisim",
    title: "İletişim",
    description:
      "Vize Firmaları platformu ile iletişim kurun; öneri, iş birliği ve destek talepleri için iletişim kanallarımız.",
    heading: "İletişim",
    body: "Platform ile ilgili sorularınız, önerileriniz veya iş birliği talepleriniz için iletişim formu veya e-posta üzerinden bize ulaşabilirsiniz. Firma başvuruları ve liste görünürlüğü için sitedeki ilgili akışları kullanın.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  "yardim-merkezi": {
    path: "/yardim-merkezi",
    title: "Yardım Merkezi",
    description:
      "Vize Firmaları yardım merkezi — platformu kullanma, listeleme ve güvenilir bilgi için rehber.",
    heading: "Yardım Merkezi",
    body: "Platformda firma arama, filtreleme ve profil inceleme adımları hakkında sık sorulan sorular ve kısa rehber içerikleri bu bölümde toplanır. Detaylı işlem adımları için S.S.S. ve İşlem Rehberi sayfasına göz atabilirsiniz.",
    changeFrequency: "weekly",
    priority: 0.72,
  },
  "kullanim-kosullari": {
    path: "/kullanim-kosullari",
    title: "Kullanım Koşulları",
    description:
      "Vize Firmaları web sitesi ve hizmetlerinin kullanımına ilişkin koşullar ve kurallar.",
    heading: "Kullanım Koşulları",
    body: "Bu sayfa, Vize Firmaları platformunun kullanımına ilişkin genel kuralları açıklar. Hizmeti kullanmaya devam ederek bu koşulları kabul etmiş sayılırsınız. Güncellemeler yayımlandığında burada duyurulur.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "cerez-politikasi": {
    path: "/cerez-politikasi",
    title: "Çerez Politikası",
    description:
      "Vize Firmaları çerez kullanımı, tercihler ve üçüncü taraf çerezler hakkında bilgilendirme.",
    heading: "Çerez Politikası",
    body: "Sitemizde deneyimi iyileştirmek, trafiği ölçmek ve tercihlerinizi hatırlamak için çerezler kullanılabilir. Hangi çerezlerin kullanıldığı ve nasıl yönetebileceğiniz bu politika kapsamında açıklanır.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "aydinlatma-metni": {
    path: "/aydinlatma-metni",
    title: "Aydınlatma Metni",
    description:
      "6698 sayılı KVKK kapsamında Vize Firmaları veri sorumlusu aydınlatma metni.",
    heading: "Aydınlatma Metni",
    body: "Kişisel verilerinizin hangi amaçlarla ve hangi hukuki sebeple işlendiği, aktarıldığı ve haklarınızın neler olduğu bu aydınlatma metninde özetlenir.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi": {
    path: "/kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi",
    title:
      "Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik Politikası",
    description:
      "Vize Firmaları kişisel verilerin korunması, işlenmesi ve gizlilik politikası.",
    heading:
      "Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik Politikası",
    body: "Platformda toplanan kişisel verilerin işlenme ilkeleri, saklama süreleri, güvenlik önlemleri ve kullanıcı hakları bu politika ile şeffaf biçimde duyurulur.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "sss-ve-islem-rehberi": {
    path: "/sss-ve-islem-rehberi",
    title: "S.S.S. ve İşlem Rehberi",
    description:
      "Vize Firmaları sık sorulan sorular ve platform üzerinden işlem rehberi.",
    heading: "S.S.S. ve İşlem Rehberi",
    body: "Firmaları nasıl karşılaştıracağınız, profil bilgilerini nasıl okuyacağınız ve başvuru sürecine nasıl başlayacağınız gibi konularda sık sorulan sorular ve adım adım özet bilgiler bu sayfada yer alır.",
    changeFrequency: "weekly",
    priority: 0.68,
  },
  "mesafeli-satis-sozlesmesi": {
    path: "/mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "Vize Firmaları mesafeli satış sözleşmesi metni ve tüketici bilgilendirmesi.",
    heading: "Mesafeli Satış Sözleşmesi",
    body: "Elektronik ortamda sunulan hizmet veya ürünler için geçerli mesafeli satış sözleşmesi hükümleri burada yayımlanır. Sipariş ve ödeme öncesi okumanız önerilir.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  "sorumluluk-reddi-beyani": {
    path: "/sorumluluk-reddi-beyani",
    title: "Sorumluluk Reddi Beyanı",
    description:
      "Vize Firmaları sorumluluk reddi beyanı — platform ve listelenen firmalar hakkında hukuki sınırlar.",
    heading: "Sorumluluk Reddi Beyanı",
    body: "Platformda sunulan bilgiler genel bilgilendirme amaçlıdır. Vize kararları resmi makamlara aittir; listelenen firmaların hizmetleri kendi sorumluluğundadır. Platform, üçüncü taraf firmaların eylemlerinden doğrudan sorumlu tutulamaz.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  "hizmet-kosullari": {
    path: "/hizmet-kosullari",
    title: "Hizmet Koşulları",
    description:
      "Vize Firmaları platform hizmet koşulları ve kapsam sınırları.",
    heading: "Hizmet Koşulları",
    body: "Platformun sağladığı listeleme, karşılaştırma ve bilgilendirme hizmetlerinin kapsamı, sınırları ve kullanım kuralları bu metinde düzenlenir.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "iade-ve-geri-odeme-politikasi": {
    path: "/iade-ve-geri-odeme-politikasi",
    title: "İade ve Geri Ödeme Politikası",
    description:
      "Vize Firmaları iade, iptal ve geri ödeme koşulları hakkında bilgilendirme.",
    heading: "İade ve Geri Ödeme Politikası",
    body: "Ücretli hizmet veya ürün sunulduğu durumlarda iptal, iade ve geri ödeme süreçleri bu politika ile kullanıcılara duyurulur. Her teklif için geçerli özel şartlar varsa ayrıca belirtilir.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
} as const satisfies Record<string, PublicDocumentPageDef>;

export type PublicDocumentPageKey = keyof typeof PUBLIC_DOCUMENT_PAGES;

export function listPublicDocumentPages(): PublicDocumentPageDef[] {
  return Object.values(PUBLIC_DOCUMENT_PAGES);
}
