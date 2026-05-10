import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const KOSTARIKA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Kosta Rika; siyasi istikrar, doğa odaklı yaşam, nispeten düşük suç oranı, sağlık sistemi ve uzun süreli oturum programları nedeniyle Latin Amerika’nın öne çıkan göç destinasyonlarından biridir. Özellikle emekliler, uzaktan çalışanlar, yatırımcılar ve çevrim içi gelir elde eden kişiler için ilgi yüksektir.",
  "2026 itibarıyla Dijital Göçebe statüsü, yatırımcı oturumları ve residency başvurularında gelir kanıtı ile belge doğrulamaları sıkılaşmaktadır. Kesin şartlar için Dirección General de Migración ve Extranjería (migracion.go.cr) ile güncel duyuruları esas alın.",
];

export const KOSTARIKA_SEO_KEYWORD_TAGS: string[] = [
  "kosta rika vize",
  "costa rica digital nomad",
  "kosta rika oturum",
  "pensionado rentista",
  "inversionista costa rica",
  "kosta rika çalışma izni",
];

export const KOSTARIKA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize Koşulları",
    h2: "Genel Giriş ve Turistik Kalış",
    lead:
      "Giriş kuralları milliyete göre değişir; bazı ülkeler vizesiz giriş, konsolosluk vizesi veya üçüncü ülke vizeleriyle kolaylaştırılmış geçiş kullanabilir.",
    accordions: [
      {
        title: "Giriş modelleri",
        paragraphs: [
          "Bazı ülke vatandaşları vizesiz giriş, elektronik izin veya konsolosluk vizesi ile seyahat edebilir; geçerli ABD, Schengen veya Kanada vizeleri üzerinden sınırlı kapsamlı kolaylıklar anlatılabilir. Güncel muafiyet ve belge listesi için resmî göç ve konsolosluk bilgilerini kontrol edin.",
        ],
      },
      {
        title: "Genel giriş şartları",
        paragraphs: ["Çoğu durumda talep edilen başlıkların özeti:"],
        bullets: [
          "Geçerli pasaport",
          "Dönüş veya çıkış bileti",
          "Finansal yeterlilik",
          "Konaklama bilgisi",
          "Seyahat amacının tutarlı anlatımı",
          "Bazı durumlarda aşı veya sağlık belgeleri",
        ],
      },
      {
        title: "Kalış süresi (turistik)",
        paragraphs: [
          "Turistik girişlerde çoğu yabancı için tipik olarak 30, 90 veya 180 güne kadar kalış verilebileceği belirtilir; süre ve şartlar her girişte sınır görevlisinin takdirine bağlıdır.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş izni tek başına kesin giriş garantisi vermez; ülkeye giriş reddedilebilir.",
          "2025–2026 döneminde uzun süre kalanlar, uzaktan çalışan profiline benzeyen seyahatler ve sık giriş-çıkış yapanlar için finansal ve amaç odaklı sorguların arttığı rapor edilmektedir.",
          "Turistik statüde yerel maaşlı çalışma yasal risk oluşturabilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-vizeleri",
    tocLabel: "Çalışma Vizeleri",
    h2: "Çalışma İzni Sistemi",
    lead:
      "Yabancı istihdamı yerel iş gücünün korunması hedefiyle sıkı değerlendirmeye tabidir.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: ["Tipik başvuru hattı şu adımlarla özetlenir:"],
        bullets: [
          "Kosta Rika merkezli işveren bulunur",
          "İş sözleşmesi hazırlanır",
          "Göçmenlik başvurusu yapılır",
          "Çalışma izni değerlendirilir",
          "Residency kartı / yetkili belgeler tamamlanır",
        ],
      },
      {
        title: "Yaygın çalışma alanları",
        paragraphs: ["Sektörel örnekler (piyasa ve ilan sitelerine göre değişir):"],
        bullets: [
          "Turizm",
          "Otelcilik",
          "Yazılım",
          "Çağrı merkezleri",
          "Eğitim",
          "İngilizce öğretmenliği",
          "Tarım",
          "Uluslararası hizmet sektörü",
        ],
      },
      {
        title: "Önemli gerçekler",
        paragraphs: [
          "Bazı işlerde yerel çalışan önceliği korunur.",
          "Uluslararası şirketlerde İngilizce kullanılabilse de yerel piyasada İspanyolca büyük avantaj sağlar.",
          "Sponsorlu iş ilanı sınırlıdır; çoğu işveren mevcut yasal statüsü olan adayları önceliklendirir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş Bulma",
    h2: "İş Bulma, Sektörler ve Dijital Göçebe",
    lead:
      "Turizm ve hizmet ekonomisi yabancı profesyoneller için iş hacmi oluşturur; uzaktan gelir ve Dijital Göçebe programı ayrı bir göç hattıdır.",
    accordions: [
      {
        title: "En aktif sektörler",
        paragraphs: ["Yabancı istihdamı veya uluslararası operasyonlarla örtüşen alanlar:"],
        bullets: [
          "Turizm ve ekoturizm",
          "Çağrı merkezi",
          "Yazılım",
          "Uluslararası şirket operasyonları",
          "Medikal hizmetler",
          "Eğitim",
          "Tarım ihracatı",
        ],
      },
      {
        title: "Serbest ve uzaktan çalışma bağlamı",
        paragraphs: [
          "Kosta Rika; uzaktan çalışanlar, dijital göçebeler ve çevrim içi gelir sahipleri için popüler bir üs olarak anılır; statü ve vergi yükümlülükleri seçilen programa göre ayrı değerlendirilmelidir.",
        ],
      },
      {
        title: "Digital Nomad Visa — temel şartlar",
        paragraphs: [
          "Kosta Rika resmî dijital göçebe çerçevesi sunan ülkeler arasında gösterilir. Başvurularda tipik olarak yurt dışı kaynaklı gelir, düzenli aylık gelir kanıtı, sağlık sigortası ve uzaktan çalışma kanıtı talep edildiği anlatılır.",
        ],
        callout: {
          variant: "warning",
          text: "2026 itibarıyla çoğu kaynakta bireysel başvurular için yaklaşık 3.000 USD / ay veya aile başvurularında yaklaşık 4.000 USD / ay gelir eşiği örnek verilir; kesin tutar ve tanım için güncel resmî program metnini (Visit Costa Rica ve migracion.go.cr) doğrulayın.",
        },
      },
      {
        title: "Dijital göçebe statüsünün avantajları (genel)",
        paragraphs: [
          "Program açıklamalarında vergi kolaylıkları, uzun süreli kalış, araç ithalatı ve banka hesabı süreçlerinde kolaylık gibi başlıklar anlatılır; kapsam güncel yönetmelikle sınırlıdır.",
        ],
      },
    ],
  },
  {
    id: "yatirimci",
    tocLabel: "Yatırımcı Vizeleri",
    h2: "Inversionista Residency (Yatırımcı Oturum)",
    lead:
      "Yatırımcı oturumu; belirli yatırım kanıtı ile residency yolunu açabilir; tutarlar ve kabul edilen varlık türleri mevzuatla güncellenir.",
    accordions: [
      {
        title: "Genel yatırım alanları",
        paragraphs: ["Sık tartışılan sektör örnekleri:"],
        bullets: ["Gayrimenkul", "Turizm yatırımları", "Tarım", "Şirket yatırımları", "Yerel işletmeler"],
      },
      {
        title: "Minimum yatırım (referans)",
        paragraphs: [
          "Son yıllarda minimum eşiğin yaklaşık 150.000 USD çevresinde uygulandığı paylaşılmaktadır.",
        ],
        callout: {
          variant: "info",
          text: "Eşik ve uygun yatırım türleri resmî duyurularla değişebilir; onay ve tapu süreçlerini migracion.go.cr ve profesyonel hukuk danışmanlığı ile doğrulayın.",
        },
      },
    ],
  },
  {
    id: "oturum-pr",
    tocLabel: "Oturum (PR)",
    h2: "Geçici ve Kalıcı Oturum",
    lead:
      "Pensionado, Rentista ve Inversionista gibi kategoriler uzun süreli yaşam modellerini tanımlar; Digital Nomad ayrı bir çerçevedir.",
    accordions: [
      {
        title: "Temporary Residency — ana kategoriler",
        paragraphs: ["Yaygın başlıklar (güncel şartlar resmî kılavuza bağlıdır):"],
        bullets: [
          "Pensionado — emekliler",
          "Rentista — düzenli pasif gelir",
          "Inversionista — yatırımcılar",
          "Digital Nomad — uzaktan çalışanlar",
        ],
      },
      {
        title: "Permanent Residency",
        paragraphs: [
          "Bazı durumlarda birkaç yıl geçici oturum sonrası kalıcı oturuma geçilebildiği anlatılır; başvuru kriterleri dosyaya ve programa göre değişir.",
        ],
        bullets: [
          "Süresiz yaşam çerçevesi (kart yenileme kurallarına tabi olabilir)",
          "Güçlü yasal statü",
          "Çalışma esnekliği (programa göre)",
          "Uzun vadeli yerleşim avantajı",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Kosta Rika Vatandaşlığı",
    lead:
      "Vatandaşlık uzun süreli yasal ikamet ve entegrasyon ile bağlantılıdır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Başvurular genellikle uzun süreli yasal ikamet, fiziksel bulunma, entegrasyon, temiz sicil ve temel İspanyolca gibi başlıklar üzerinden değerlendirilir.",
        ],
      },
      {
        title: "Tipik süre beklentisi",
        paragraphs: [
          "Çoğu yabancı için yaklaşık yedi yıl residency sonrası vatandaşlık başvurusunun mümkün olabildiği ifade edilir.",
        ],
        callout: {
          variant: "info",
          text: "Süre ve istisnalar vatandaşlık kanunu ve bireysel duruma göre değişir; hukuk danışmanlığı ve resmî kaynak şarttır.",
        },
      },
    ],
  },
  {
    id: "ucretler-politikalar",
    tocLabel: "Ücretler ve politikalar",
    h2: "Ücretler ve 2026 Politika Ortamı",
    lead:
      "Residency ve göç başvurularında harçlar ile yan hizmet maliyetleri birlikte düşünülmelidir.",
    accordions: [
      {
        title: "2026 perspektifi",
        paragraphs: [
          "Residency başvuru ücretleri, belge doğrulamaları, finansal incelemeler, gelir kanıtları ve banka hareket analizlerinin sıkılaştığı ileri sürülmektedir.",
        ],
      },
      {
        title: "Ek maliyet kalemleri",
        paragraphs: ["Başvuru paketinde örnek giderler:"],
        bullets: [
          "Noter işlemleri ve apostil",
          "Tercüme",
          "Göçmenlik harçları",
          "Sağlık sigortaları",
          "Avukat ücretleri",
        ],
      },
    ],
  },
  {
    id: "uyarilar-kaynaklar",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Kaynaklar",
    lead:
      "Yüksek talep gören göç programlarında aşırı vaat ve belirsiz gayrimenkul işlemleri risk taşır.",
    accordions: [
      {
        title: "Sahte veya abartılı vaatler",
        paragraphs: ["Şu ifadelerde temkinli olun:"],
        bullets: [
          "“Garantili oturum” veya “kesin vatandaşlık”",
          "“Yatırımsız residency”",
          "“Vergisiz yaşam garantisi”",
        ],
      },
      {
        title: "Gayrimenkul yatırımları",
        paragraphs: [
          "Bazı bölgelerde tapu, imar veya çevresel izin sorunları rapor edilmiştir; satın alma öncesi yerel hukuk ve kadastro incelemesi önemlidir.",
        ],
      },
      {
        title: "Uzaktan çalışma ve yerel faaliyet",
        paragraphs: [
          "Digital Nomad statüsü avantajlı olsa da yerel maaş, kayıt dışı ticari faaliyet veya turist statüsünde çalışma göç ve cezai risk oluşturabilir.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: [
          "Dirección General de Migración y Extranjería (migracion.go.cr), Visit Costa Rica turizm ve dijital göçebe bilgileri, CINDE (yatırım ve iş ortamı) gibi kaynaklar düzenli güncellenir.",
          "Özellikle Digital Nomad şartları, residency kategorileri, gelir eşikleri, çalışma izinleri, yatırım eşikleri, turistik giriş kuralları ve sağlık sigortası beklentileri için resmî duyuruları takip edin.",
        ],
      },
      {
        title: "Özet",
        paragraphs: [
          "Kosta Rika; uzaktan çalışanlar, emekliler, doğa odaklı yaşam arayanlar, yatırımcılar ve çevrim içi gelir sahipleri için güçlü bir uzun süreli yaşam merkezi olarak konumlanır. Bununla birlikte 2026 itibarıyla finansal kontroller, gelir doğrulamaları ve residency denetimlerinin sıkılaştığı öne sürülmektedir.",
        ],
      },
    ],
  },
];
