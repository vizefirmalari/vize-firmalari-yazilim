import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const SLOVAKYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Slovakya; Schengen Bölgesi ve Avrupa Birliği üyesi olması, düşük yaşam maliyetleri, gelişen otomotiv ve üretim sektörü ile Orta Avrupa’daki stratejik konumu sayesinde son yıllarda dikkat çeken ülkelerdendir. Mühendislik, üretim, lojistik, yazılım ve teknik uzmanlık alanlarında yabancı çalışan ihtiyacı artmaktadır.",
  "2026 itibarıyla Slovakya; çalışma odaklı geçici oturum izni (temporary residence permit) sistemi, AB Blue Card modeli ve Schengen mobilitesi ile öne çıkmaktadır. Güncel başvuru koşulları ve maaş eşikleri için Slovak Ministry of Interior ve EU Blue Card Slovakia kaynaklarından teyit alın.",
];

export const SLOVAKYA_SEO_KEYWORD_TAGS: string[] = [
  "slovakya vize",
  "slovakya oturum izni",
  "slovakia blue card",
  "bratislava work permit",
  "schengen slovakia 90 gün",
  "temporary residence slovakia",
  "profesia slovakia",
  "slovakia work authorization",
];

export const SLOVAKYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize koşulları ve turistik giriş",
    h2: "Schengen, AB ve Kısa Süreli Kalış",
    lead:
      "Slovakya hem AB hem Schengen üyesidir; kısa süreli girişte Schengen kuralları, uzun süreli yaşamda Slovak göç mevzuatı uygulanır.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Slovakya Avrupa Birliği ve Schengen Bölgesi üyesidir. Bu nedenle kısa süreli seyahatlerde Schengen düzenleri; uzun süreli çalışma ve ikamette Slovak geçici oturum ve çalışma mevzuatı birlikte değerlendirilir.",
        ],
      },
      {
        title: "Genel giriş belgeleri",
        paragraphs: ["Başvurularda çoğu zaman talep edilen evraklar:"],
        bullets: [
          "Geçerli pasaport",
          "Finansal yeterlilik kanıtı",
          "Sağlık sigortası",
          "Konaklama bilgisi",
          "Seyahat amacı",
          "Dönüş planı (uygulanabildiği ölçüde)",
        ],
      },
      {
        title: "Turistik vize ve kalış",
        paragraphs: [
          "Kısa süreli girişlerde C tipi Schengen vizesi çerçevesi anlatılır.",
          "Genellikle 180 gün içinde en fazla 90 gün kalış hakkı Schengen uygulamasının tipik özetidir; vize etiketinizdeki süre esas alınır.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi garantisi değildir; son karar sınır görevlilerine aittir.",
          "Schengen ihlalleri giriş yasağı, vize reddi ve Schengen bilgi sistemine kayıt riskleri doğurabilir.",
        ],
      },
    ],
  },
  {
    id: "oturum-gecici-kalici",
    tocLabel: "Oturum (geçici ve kalıcı)",
    h2: "Temporary Residence, Permanent ve Uzun Dönem İkamet",
    lead:
      "Uzun süreli yaşam çoğunlukla temporary residence permit üzerinden yürür; süre ve kategori başvuru türüne göre değişir.",
    accordions: [
      {
        title: "Temporary Residence Permit — başlıca kategoriler",
        paragraphs: ["Slovakya’da uzun süreli yaşam genellikle geçici oturum izni üzerinden ilerler. Sık görülen başlıklar:"],
        bullets: [
          "Çalışma",
          "Eğitim",
          "İş kurma",
          "Aile birleşimi",
          "Araştırma faaliyetleri",
          "Blue Card",
          "Özel faaliyetler",
        ],
      },
      {
        title: "Genel residence şartları",
        paragraphs: ["Çoğu başvuruda değerlendirilen unsurlar:"],
        bullets: ["Temiz adli sicil", "Finansal yeterlilik", "Konut kanıtı", "Sağlık sigortası"],
      },
      {
        title: "Residence süresi",
        paragraphs: [
          "Temporary residence permit süreleri çoğu zaman 6 ay ile 5 yıl arasında değişebileceği şekilde anlatılır; kesin süreyi permit türü ve güncel düzenlemeler belirler.",
        ],
      },
      {
        title: "Permanent residence ve uzun dönem",
        paragraphs: [
          "Uzun süreli yasal ikamet sonrasında kalıcı ikamet (permanent residence), süresiz ikamet veya AB uzun dönem ikameti gibi statüler başvuruya konu olabilir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Slovak Vatandaşlığı ve Çifte Vatandaşlık",
    lead:
      "Uzun dönem hedef genellikle geçici oturumdan kalıcı ikamete ve ardından vatandaşlığa uzanan bir çerçevede planlanır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Slovak vatandaşlığı genellikle uzun süreli yasal ikamet, entegrasyon, temiz sicil ve dil yeterliliği unsurlarıyla ilişkilendirilir.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Slovak vatandaşlık sistemi bazı durumlarda çifte vatandaşlık konusunda sınırlamalar uygulayabilir; kişisel durum ve ülkeniz mevzuatını ayrı değerlendirin.",
        ],
      },
      {
        title: "Uzun dönem model",
        paragraphs: [
          "Temporary residence → permanent residence → vatandaşlık çizgisi tipik anlatımda sık kullanılır; her aşamanın şartları güncellenir.",
        ],
      },
    ],
  },
  {
    id: "calisma-bluecard",
    tocLabel: "Çalışma ve EU Blue Card",
    h2: "Work Permit, Labour Office ve Blue Card",
    lead:
      "Çalışma süreci çoğunlukla işveren sponsorluğu, çalışma yetkisi ve geçici oturum ile birlikte yürütülür.",
    accordions: [
      {
        title: "Genel çalışma süreci",
        paragraphs: ["Slovakya’da çoğunlukla izlenen hat:"],
        bullets: [
          "İşveren bulunur",
          "İş sözleşmesi hazırlanır",
          "İş pozisyonu Labour Office sistemine bildirilir",
          "Temporary residence başvurusu yapılır",
          "Residence card alınır",
        ],
      },
      {
        title: "EU Blue Card",
        paragraphs: [
          "Yüksek nitelikli çalışanlar için AB Blue Card çerçevesi uygulanır.",
          "Genellikle en az altı aylık iş sözleşmesi, yüksek nitelikli iş, diploma veya uzmanlık ve belirli bir maaş eşiği aranır.",
        ],
      },
      {
        title: "Maaş eşiği",
        paragraphs: [
          "Slovakya’da Blue Card için maaşın genellikle ortalama maaşın belirli bir katsayısı üzerinde olması beklendiği anlatılır; güncel rakamları resmî duyurulardan izleyin.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Otomotiv ve üretim",
          "Yazılım ve elektronik",
          "Lojistik",
          "Teknik destek ve mühendislik",
          "Sanayi ve kalite",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Otomotiv ve İş Arama Platformları",
    lead:
      "Bratislava, Košice, Žilina, Nitra ve Trnava başlıca merkezlerdir; otomotiv üretimi ülke ekonomisinin bel kemiğidir.",
    accordions: [
      {
        title: "Başlıca iş merkezleri",
        paragraphs: ["Öne çıkan şehirler:"],
        bullets: ["Bratislava", "Košice", "Žilina", "Nitra", "Trnava"],
      },
      {
        title: "Otomotiv sektörü",
        paragraphs: [
          "Slovakya Avrupa’nın yoğun otomotiv üretim merkezlerinden biri olarak anılır.",
          "Üretim, mühendislik, teknik bakım ve kalite kontrol alanlarında istihdam yüksek olabilir.",
        ],
      },
      {
        title: "Teknoloji sektörü",
        paragraphs: [
          "Bratislava başta olmak üzere yazılım, IT destek, outsourcing ve siber güvenlik alanlarında büyüme görülmektedir.",
        ],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["Profesia Slovakia", "Kariera Slovakia", "EURES Europe", "LinkedIn"],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "İngilizce teknoloji, uluslararası şirketler ve outsourcing ortamlarında avantaj sağlayabilir.",
          "Kamu, müşteri ilişkileri ve üretim yönetiminde Slovakça genellikle belirleyicidir.",
        ],
      },
    ],
  },
  {
    id: "yasam-gercekler",
    tocLabel: "Yaşam maliyeti ve gerçekler",
    h2: "Avantajlar, Zorluklar ve Günlük Yaşam",
    lead:
      "Düşük yaşam maliyeti ve AB–Schengen erişimi caziptir; yerel dil ve bürokrasi sürtünmesi planlama gerektirir.",
    accordions: [
      {
        title: "Avantajlar",
        paragraphs: ["Sık vurgulanan olumlu başlıklar:"],
        bullets: [
          "Düşük yaşam maliyeti",
          "AB ve Schengen erişimi",
          "Üretim ve sanayi istihdamı",
          "Merkezi Avrupa konumu",
          "Görece uygun kiralar",
        ],
      },
      {
        title: "Zorluklar",
        paragraphs: ["Gerçekçi zorluklar:"],
        bullets: [
          "Yerel dil bariyeri",
          "Küçük iş piyasası",
          "Bürokratik süreçler",
          "Residence permit işlemlerinin yavaş ilerleyebilmesi",
        ],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Riskler ve Güncel Takip (2026)",
    lead:
      "Sahte iş vaatleri, uzun süre yurt dışında kalma ve eksik evraklar ciddi risk oluşturur.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Slovakya işi”, “hazır work permit” veya “kesin oturum” vaatlerine güvenmeyin.",
          "Uzun süre ülke dışında kalmak permit iptali riskini artırabilir.",
          "Eksik veya yanlış belgeler residence reddine yol açabilir.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: ["Güncel mevzuat için temel referanslar:"],
        bullets: [
          "Slovak Ministry of Interior",
          "EU Blue Card Slovakia",
          "IOM Slovakia Migration Information Centre",
          "Employment Services Slovakia",
          "Profesia Slovakia (bağlam: iş piyasası)",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları izleyin:"],
        bullets: [
          "EU Blue Card maaş eşikleri",
          "Work permit sistemi",
          "Residence permit süreçleri",
          "Schengen uygulamaları",
          "İş gücü açığı listeleri",
          "Uzaktan çalışma mevzuatı",
          "Sosyal güvenlik düzenlemeleri",
        ],
      },
    ],
  },
];
