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
      "Vize Firmaları hakkında: vize danışmanlık firmaları listeleme, vize firması karşılaştırma ve vize rehberi. Aracı platform; vize başvurusu danışmanlığı sunmaz. Şeffaf ve karşılaştırılabilir bilgi, bilinçli karar; Edirne merkezli iletişim.",
    heading: "Hakkımızda",
    body: "Vize Firmaları yalnızca aracı platformdur; şeffaf ve karşılaştırılabilir bilgilerle kullanıcıların bilinçli karar vermesine yardımcı olur. Firma hizmetleri ve sonuçlar listelenen işyerlerine aittir.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  "kurumsal-site": {
    path: "/kurumsal-site",
    title: "Kurumsal Site",
    description:
      "Vize Firmaları kurumsal: vize danışmanlık platformu, vize firmaları listesi ve vize karşılaştırma sistemi. Misyon, vizyon, değerler; aracı model ve güven odaklı vize başvuru rehberi yaklaşımı.",
    heading: "Kurumsal Site",
    body: "Tarafsız ve karşılaştırılabilir bilgiler; kullanıcıların bilinçli karar vermesine yardımcı olur. Vize Firmaları yalnızca aracı platformdur.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  kariyer: {
    path: "/kariyer",
    title: "Kariyer",
    description:
      "Vize Firmaları kariyer: yenilikçi platformda dijital ürün geliştirme, dinamik ve gelişime açık yapı. Başvuru ve iletişim; Edirne merkezli aracı listeleme teknolojisi ekibi.",
    heading: "Kariyer",
    body: "Büyüyen bir dijital platformda yeteneklerinizi konuşturun. Açık pozisyon olmasa da özgeçmiş gönderebilirsiniz.",
    changeFrequency: "monthly",
    priority: 0.55,
  },
  iletisim: {
    path: "/iletisim",
    title: "İletişim",
    description:
      "Vize Firmaları iletişim: teknik destek, hesap ve platform soruları için e-posta. Aracı platform; vize danışmanlığı sunmaz — vize hizmeti için firmalarla doğrudan iletişime geçin. iletisim@vizefirmalari.com",
    heading: "İletişim",
    body: "Platform yalnızca listeleme sunar; mesleki hizmette platform hizmet sağlamaz. Doğru kanal: site sorunları bize, vize işlemleri seçtiğiniz firmaya.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  "firma-sikayet": {
    path: "/firma-sikayet",
    title: "Firma Şikayet Et",
    description:
      "Vize Firmaları firma bildirimi: yayınlanmış firma ile ilgili durumları platform yönetimine iletin; kontrollü inceleme ve profesyonel değerlendirme kanalı.",
    heading: "Firma Şikayet Et",
    body: "Form platform yönetimine iletilir; firma karalamak değil, kayıtlı inceleme için ölçülü bildirim sağlar.",
    changeFrequency: "monthly",
    priority: 0.55,
  },
  "is-ortagimiz-olun": {
    path: "/is-ortagimiz-olun",
    title: "İş Ortağımız Olun",
    description:
      "Vize danışmanlık firmaları için Vize Firmaları: görünürlük, hedefli trafik, profesyonel profil ve doğrudan müşteri iletişimi. Aracı listeleme platformu; firma kaydı ve iş birliği fırsatları.",
    heading: "İş Ortağımız Olun",
    body: "Görünürlüğünüzü artırın; vize arayan kullanıcılarla buluşun. Platform yalnızca aracıdır — müşteri ilişkisini siz yönetirsiniz.",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  "uye-is-yerimiz-olun": {
    path: "/uye-is-yerimiz-olun",
    title: "Üye İş Yerimiz Olun",
    description:
      "Vize Firmalarına üye iş yeri olun: profil oluşturun, görünürlük ve doğrudan kullanıcı iletişimi. Müşteri edinimi kanalı; aracı platform, danışmanlık sunmaz.",
    heading: "Üye İş Yerimiz Olun",
    body: "Vize danışmanlık firmaları için kayıt, profesyonel sayfa ve talep akışı. Vize Firmaları yalnızca aracı platformdur.",
    changeFrequency: "monthly",
    priority: 0.73,
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
      "Vize Firmaları kullanım koşulları: vize danışmanlık platformu ve vize firmaları listeleme hizmetinin kapsamı, kullanıcı ve üye işyeri yükümlülükleri, sorumluluk sınırları.",
    heading: "Kullanım Koşulları",
    body: "Bu sayfa, Vize Firmaları platformunun kullanımına ilişkin genel kuralları açıklar. Hizmeti kullanmaya devam ederek bu koşulları kabul etmiş sayılırsınız. Güncellemeler yayımlandığında burada duyurulur.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "kullanici-sozlesmesi": {
    path: "/kullanici-sozlesmesi",
    title: "Kullanıcı Sözleşmesi",
    description:
      "Vize Firmaları kullanıcı sözleşmesi: aracı platform, misafir ve üye kullanıcı, üye işyeri; yükümlülükler, yasaklar, içerik feragatı, firma ilişkisinden muafiyet, sorumluluk sınırı, fikri mülkiyet, Türk hukuku ve yetki.",
    heading: "Kullanıcı Sözleşmesi",
    body: "Platform hizmet sağlayıcı değildir; kullanıcı kendi sorumluluğunda hareket eder. Taraflar arası ilişkiden Platform sorumlu değildir; doğrudan ve dolaylı zararlar hariç tutulur.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "bilgi-toplumu-hizmetleri": {
    path: "/bilgi-toplumu-hizmetleri",
    title: "Bilgi Toplumu Hizmetleri",
    description:
      "5651 sayılı Kanun ve elektronik ticaret mevzuatı çerçevesinde Vize Firmaları: platform kimliği, iletişim, bilgi toplumu hizmetlerinin kapsamı, aracı rol, üçüncü taraf firmalar ve sorumluluk ayrımı.",
    heading: "Bilgi Toplumu Hizmetleri",
    body: "Vize Firmaları yalnızca aracı platformdur; listeleme ve karşılaştırma sunar, vize danışmanlığı veya başvuru işlemi yürütmez. Resmi iletişim ve şeffaflık bilgileri bu sayfada yer alır.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "cerez-politikasi": {
    path: "/cerez-politikasi",
    title: "Çerez Politikası",
    description:
      "KVKK uyumlu çerez politikası: zorunlu, analitik, fonksiyonel ve olası pazarlama çerezleri; açık rıza ve meşru menfaat; üçüncü taraf çerezler; kullanıcı tercihleri ve tarayıcı yönetimi. Vize Firmaları aracı listeleme platformudur.",
    heading: "Çerez Politikası",
    body: "6698 sayılı KVKK çerçevesinde çerez türleri, hukuki dayanaklar, üçüncü taraf çerezler ve kullanıcı kontrolü şeffaf biçimde açıklanır; çerezler vize danışmanlığı için kullanılmaz.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "aydinlatma-metni": {
    path: "/aydinlatma-metni",
    title: "Aydınlatma Metni",
    description:
      "6698 sayılı KVKK kapsamında Vize Firmaları aydınlatma metni: işlenen veriler, amaçlar, hukuki sebepler, aktarım, saklama, KVKK md. 11 hakları ve başvuru.",
    heading: "Aydınlatma Metni",
    body: "Kişisel verilerinizin hangi amaçlarla ve hangi hukuki sebeple işlendiği, aktarıldığı ve haklarınızın neler olduğu bu aydınlatma metninde özetlenir.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "veri-guvenligi-politikasi": {
    path: "/veri-guvenligi-politikasi",
    title: "Veri Güvenliği Politikası",
    description:
      "6698 sayılı KVKK uyumlu veri güvenliği: gizlilik, bütünlük, erişilebilirlik; teknik ve idari tedbirler; erişim kontrolü; ihlal yönetimi; üçüncü taraf altyapı; kullanıcı ve aracı platform sınırları.",
    heading: "Veri Güvenliği Politikası",
    body: "Vize Firmaları makul teknik ve idari tedbirlerle veri güvenliğini hedefler; mutlak güvenlik garanti edilemez. Aracı platform, kullanıcı–firma dış kanallarındaki veri alışverişini kontrol etmez.",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  "kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi": {
    path: "/kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi",
    title:
      "Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik Politikası",
    description:
      "6698 sayılı KVKK uyumlu gizlilik politikası: veri kategorileri, amaçlar, hukuki sebepler, aktarım, saklama, güvenlik, çerezler, KVKK md. 11 hakları ve aracı platform sınırları.",
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
      "Vize Firmaları S.S.S. ve işlem rehberi: vize danışmanlık firmalarını karşılaştırma, vize başvuru sürecinde dikkat edilecekler, platformun aracı rolü ve sık sorulan sorular.",
    heading: "S.S.S. ve İşlem Rehberi",
    body: "Firmaları nasıl karşılaştıracağınız, profil bilgilerini nasıl okuyacağınız ve başvuru sürecine nasıl başlayacağınız gibi konularda sık sorulan sorular ve adım adım özet bilgiler bu sayfada yer alır.",
    changeFrequency: "weekly",
    priority: 0.68,
  },
  "mesafeli-satis-sozlesmesi": {
    path: "/mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "Vize Firmaları mesafeli satış sözleşmesi: dijital platform hizmetleri, ücret ve teslim, cayma hakkı, iade koşulları ve aracı platformun sorumluluk sınırları.",
    heading: "Mesafeli Satış Sözleşmesi",
    body: "Elektronik ortamda sunulan hizmet veya ürünler için geçerli mesafeli satış sözleşmesi hükümleri burada yayımlanır. Sipariş ve ödeme öncesi okumanız önerilir.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  "sorumluluk-reddi-beyani": {
    path: "/sorumluluk-reddi-beyani",
    title: "Sorumluluk Reddi Beyanı",
    description:
      "Vize Firmaları sorumluluk reddi beyanı: aracı platform, garanti vermeme, taraflar arası ilişkiden muafiyet, zarar ve risklerin kullanıcıda kalması.",
    heading: "Sorumluluk Reddi Beyanı",
    body: "Platformda sunulan bilgiler genel bilgilendirme amaçlıdır. Vize kararları resmi makamlara aittir; listelenen firmaların hizmetleri kendi sorumluluğundadır. Platform, üçüncü taraf firmaların eylemlerinden doğrudan sorumlu tutulamaz.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  "hizmet-kosullari": {
    path: "/hizmet-kosullari",
    title: "Hizmet Koşulları",
    description:
      "Vize Firmaları hizmet koşulları: aracı vize danışmanlık platformu kapsamı, ücretsiz ve ücretli özellikler, ödeme ile sorumluluk ilişkisi ve tarafların yükümlülükleri.",
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
