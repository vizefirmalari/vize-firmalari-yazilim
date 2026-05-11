import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const MOLDOVA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Moldova; Avrupa Birliği aday ülke statüsü, görece düşük yaşam maliyetleri, gelişen dijital göçebe politikaları ve Doğu Avrupa–AB geçiş hattındaki stratejik konumu nedeniyle son yıllarda dikkat çeken ülkelerden biri hâline gelmiştir. Schengen Bölgesi üyesi değildir ancak Avrupa’ya entegrasyon sürecini hızlandırmaktadır.",
  "2025–2026 döneminde residence card sistemi, yabancı çalışan mevzuatı, dijital göçebe düzenlemeleri ve work permit süreçlerinde önemli değişiklikler yapılmıştır. Kesin şartlar, ücretler ve belge listeleri için Moldova Dışişleri Bakanlığı, Göç Genel Müdürlüğü ve eVisa portalı duyurularını güncel doğrulayın.",
];

export const MOLDOVA_SEO_KEYWORD_TAGS: string[] = [
  "moldova vize",
  "moldova residence card",
  "moldova work permit",
  "digital nomad moldova",
  "chisinau vize",
  "moldova d vizesi",
  "national employment agency moldova",
  "evisa moldova",
];

export const MOLDOVA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Vize, C/D Tipleri ve Dijital Göçebe Çerçeve",
    lead:
      "Moldova ne AB ne Schengen üyesidir; giriş ve uzun kalış ulusal vize ve residence kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Moldova Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir; AB aday ülkesidir.",
          "Schengen vizesi Moldova’da otomatik geçerli değildir; Moldova kendi ulusal vize sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "C tipi kısa süreli vize",
          "D tipi uzun süreli vize",
          "Çalışma vizesi",
          "Eğitim vizesi",
          "Aile birleşimi vizesi",
          "Dijital göçebe residence sistemi",
        ],
      },
      {
        title: "D tipi uzun süreli vize",
        paragraphs: [
          "Uzun süreli residence için çoğu durumda D tipi ulusal vize gerektiği anlatılır.",
        ],
      },
      {
        title: "2026 residence card sistemi",
        paragraphs: [
          "2026 itibarıyla Moldova’nın klasik permit modelinden “Residence Card” sistemine geçiş sürecini hızlandırdığı raporlanmaktadır.",
        ],
        callout: {
          variant: "info",
          text: "Geçiş döneminde başvuru formları, biyometri ve süreler değişebilir; General Inspectorate for Migration güncel rehberini takip edin.",
        },
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Temporary Residence ve Residence Card",
    lead:
      "Temel çizgi temporary residence right ve residence card ile yürütülür; 2026 göç yasalarında gelir ve konut kanıtı sıkılaşmıştır.",
    accordions: [
      {
        title: "Temporary residence sistemi",
        paragraphs: [
          "Moldova’da yabancıların temel residence sisteminin temporary residence right ve residence card üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Başlıca residence nedenleri",
        paragraphs: ["Sık görülen gerekçe başlıkları:"],
        bullets: [
          "Çalışma",
          "Eğitim",
          "Şirket faaliyetleri",
          "Dijital göçebelik",
          "Aile birleşimi",
          "Yatırım",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "D tipi vize alınır",
          "Moldova’ya giriş yapılır",
          "Migration authority başvurusu yapılır",
          "Residence card düzenlenir",
        ],
      },
      {
        title: "2026 yeni göç yasaları",
        paragraphs: [
          "2026 döneminde yabancıların gelir kanıtı, konut kanıtı ve employer compliance kurallarının sıkılaştığı raporlanmaktadır.",
        ],
      },
      {
        title: "Residence şartları",
        paragraphs: ["Çoğu başvuruda talep edilen başlıklar:"],
        bullets: ["Sağlık sigortası", "Sabıka kaydı", "Konut kanıtı", "Finansal yeterlilik"],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun Residence, Entegrasyon ve Tanınma Yolları",
    lead:
      "Vatandaşlık uzun yasal residence ve entegrasyonla tanımlanır; tanınma / yeniden kazanma yolları sınırlı gruplara açıktır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Moldova vatandaşlığının genellikle uzun süreli yasal residence, entegrasyon, sürekli fiziksel bulunma ve temiz sicil unsurlarıyla ilerlediği anlatılır.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Moldova’nın belirli durumlarda çifte vatandaşlığa izin verebildiği belirtilir; kişisel durum için resmî danışmanlık gerekir.",
        ],
      },
      {
        title: "Citizenship by recognition",
        paragraphs: [
          "Bazı eski Moldova vatandaşları ve soy bağı olan kişiler için recognition / regain citizenship yollarının bulunduğu özetlenir.",
        ],
      },
      {
        title: "İşlem süreleri",
        paragraphs: [
          "Vatandaşlık süreçlerinin yaklaşık dokuz–on iki ay ve üzeri sürebildiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Permit, National Employment Agency ve Dijital Göçebe",
    lead:
      "Çoğu yabancı çalışanda work permit, işveren sponsorluğu ve residence card birlikte gereklidir.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanların çoğu için work permit, employer sponsorship ve temporary residence gerektiği anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "Employer work authorization başvurusu yapar",
          "National Employment Agency onayı alınır",
          "D tipi çalışma vizesi alınır",
          "Residence card başvurusu yapılır",
        ],
      },
      {
        title: "Gerekli belgeler",
        paragraphs: ["Başlıca belge başlıkları:"],
        bullets: [
          "İş sözleşmesi",
          "Diploma / yeterlilik belgeleri",
          "Sabıka kaydı",
          "Sağlık raporu",
          "Konut kanıtı",
          "Finansal belgeler",
        ],
      },
      {
        title: "İşlem süreleri",
        paragraphs: [
          "Work permit ve residence süreçlerinin çoğu zaman bir–iki ay sürebildiği özetlenmektedir.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "IT",
          "Tarım",
          "Lojistik",
          "İnşaat",
          "Üretim",
          "Outsourcing",
          "Teknik destek",
        ],
      },
      {
        title: "Dijital göçebe sistemi",
        paragraphs: [
          "Moldova’nın 2025 sonrası Digital Nomad residence sistemini geliştirmeye başladığı anlatılır.",
        ],
      },
      {
        title: "Dijital göçebe şartları",
        paragraphs: ["Başlıca şartlar olarak belirtilenler:"],
        bullets: [
          "Yabancı şirket için uzaktan çalışma",
          "Yüksek gelir kanıtı",
          "Sağlık sigortası",
          "Sabıka kaydı",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Sektör Trendleri",
    lead:
      "Kişinev başlıca ekonomik merkezdir; outsourcing ve IT yatırımları öne çıkar.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca ekonomik merkezler:"],
        bullets: ["Chișinău", "Bălți", "Tiraspol", "Cahul"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Rabota Moldova", "Delucru Moldova", "LinkedIn"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla düşük yaşam maliyeti avantajının, büyüyen outsourcing sektörünün ve IT ile dijital hizmet yatırımlarının öne çıktığı özetlenmektedir.",
        ],
        callout: {
          variant: "warning",
          text: "Tiraspol ve çevresi farklı idari yapı altındadır; iş ve ikamet kuralları Kişinev merkezli düzenlemelerden farklılık gösterebilir.",
        },
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "C Vizesi ve Kısa Kalış",
    lead:
      "Kısa süreli girişlerde C tipi vize uygulanır; turistik vize çalışma veya residence hakkı vermez.",
    accordions: [
      {
        title: "Kısa süreli giriş sistemi",
        paragraphs: ["Kısa süreli girişlerde C tipi vizenin uygulandığı anlatılır."],
      },
      {
        title: "Kalış süresi",
        paragraphs: [
          "Genellikle yüz seksen gün içinde maksimum doksan gün bandının uygulanabildiği özetlenir; ülke ve muafiyet durumuna göre değişir.",
        ],
      },
      {
        title: "Kritik gerçek",
        paragraphs: [
          "Turistik vizenin çalışma hakkı vermediği ve residence hakkı sağlamadığı vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV ve Dil",
    lead:
      "Sade, Avrupa standartlarına yakın ve deneyim odaklı CV’ler tercih edilir.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Moldova’da sade, Avrupa standartlarına yakın ve deneyim odaklı CV’lerin tercih edildiği anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: ["Başlıca kullanılan dillere örnekler:"],
        bullets: ["Romence", "Rusça", "İngilizce (özellikle IT sektöründe)"],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Yazılım, outsourcing ve mühendislik hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Yazılım", "Outsourcing", "Finans", "Mühendislik", "Tarım teknolojileri"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Teknik Meslek Eğitimi",
    lead:
      "Teknik eğitim, tarım teknolojileri ve mühendislik altyapısı güçlüdür.",
    accordions: [
      {
        title: "Teknik eğitim sistemi",
        paragraphs: [
          "Moldova’nın teknik eğitim, tarım teknolojileri ve mühendislik alanlarında meslekî eğitim sistemine sahip olduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "Aday Ülke Etkisi ve Kayıt",
    lead:
      "AB üyeliği olmadığı için otomatik çalışma hakkı yoktur; bazı residence süreçlerinde farklı uygulamalar anlatılabilir.",
    accordions: [
      {
        title: "AB aday ülke etkisi",
        paragraphs: [
          "AB vatandaşlarının bazı residence süreçlerinde avantaj yaşayabildiği belirtilir; kesin muafiyet ve süreler için resmî kaynak doğrulanmalıdır.",
        ],
      },
      {
        title: "Residence kayıt sistemi",
        paragraphs: [
          "Doksan günden uzun kalan yabancıların residence hakkı ve residence card alması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Yaşam Maliyeti ve Kiralama",
    lead:
      "Avrupa ölçeğinde görece düşük yaşam maliyeti ve şehir bazlı kira farkları vardır.",
    accordions: [
      {
        title: "Görece düşük yaşam maliyeti",
        paragraphs: [
          "Moldova’nın Avrupa’nın en düşük yaşam maliyetli ülkelerinden biri olarak görüldüğü anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Chișinău merkez stüdyo için yaklaşık 250–700 EUR+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["999.md Real Estate", "Acces Imobil Moldova"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Remote ve Çalışan Hakları",
    lead:
      "Haftalık çalışma süresi ve remote düzen sektöre göre değişir.",
    accordions: [
      {
        title: "Standart çalışma sistemi",
        paragraphs: [
          "Genellikle haftalık kırk saat uygulandığı anlatılır.",
        ],
      },
      {
        title: "Uzaktan çalışma",
        paragraphs: [
          "IT ve outsourcing sektöründe remote çalışmanın yaygınlaştığı özetlenir.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal olarak korunan başlıklar:"],
        bullets: ["Maaş", "Sözleşme", "İzin", "İş güvenliği"],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve STEM",
    lead:
      "Kamu ve özel sağlık birlikte çalışır; teknik eğitim ve bilişim güçlenmektedir.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Kamu ve özel sağlık sisteminin birlikte çalıştığı anlatılır.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "Moldova’nın özellikle teknik eğitim, mühendislik ve bilişim alanlarında geliştiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yasal Koruma ve Destekler",
    lead:
      "Engelli bireylerin çalışma hakları yasal koruma altındadır.",
    accordions: [
      {
        title: "Yasal koruma",
        paragraphs: [
          "Engelli bireylerin çalışma haklarının yasal koruma altında olduğu anlatılır.",
        ],
      },
      {
        title: "Destek sistemleri",
        paragraphs: ["Uygulanabilen destek türlerine örnekler:"],
        bullets: ["Rehabilitasyon", "Sosyal destek", "İş uyarlamaları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Sahte Vaatler ve Residence Card Geçişi",
    lead:
      "Garantili residence ve otomatik AB geçişi vaatlerinden kaçının; 2026 belge ve süre değişikliklerini takip edin.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Moldova residence”, “hazır work permit” veya “otomatik AB geçişi” vaatlerinin riskli olduğu vurgulanır.",
          "2026 itibarıyla yeni residence card sistemine geçiş nedeniyle işlem süreleri, belge talepleri ve biyometrik işlemlerin değişebildiği anlatılır.",
          "Yeni residence düzenlemelerinde yeterli gelir, konut kanıtı ve sağlık sigortasının daha sıkı denetlendiği belirtilir.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Moldova Ministry of Foreign Affairs",
          "General Inspectorate for Migration Moldova",
          "Invest Moldova Agency",
          "National Employment Agency Moldova",
          "eVisa Moldova",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Residence Card sistemi",
          "Work permit süreçleri",
          "Dijital göçebe residence modeli",
          "Yabancı çalışan mevzuatı",
          "Migration registration kuralları",
          "D tipi vize süreçleri",
          "AB entegrasyon düzenlemeleri",
        ],
      },
    ],
  },
];
