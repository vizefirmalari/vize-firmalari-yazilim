import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const MEKSIKA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Meksika; turistik vizeler, geçici oturum izinleri, çalışma vizeleri ve uzun süreli yaşam maliyetleri nedeniyle son yıllarda yoğun başvuru alan ülkelerden biri hâline gelmiştir. Özellikle uzaktan çalışanlar, yatırımcılar, emekliler ve Latin Amerika odaklı iş fırsatları arayan kişiler için dikkat çekmektedir.",
  "2026 itibarıyla Meksika göç çerçevesinde finansal yeterlilik kriterleri ve oturum ücretlerinde önemli güncellemeler gündemdedir. Kesin tutarlar, formlar ve konsolosluk şartları ülkeye ve döneme göre değiştiği için INM ve yetkili konsolosluk metinlerini esas alın.",
];

export const MEKSIKA_SEO_KEYWORD_TAGS: string[] = [
  "meksika vize",
  "meksika turistik vize",
  "inm meksika",
  "meksika geçici oturum",
  "residente temporal",
  "meksika çalışma izni",
  "fmm meksika",
];

export const MEKSIKA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize Koşulları",
    h2: "Meksika Turistik Giriş ve Genel Şartlar",
    lead:
      "Kısa süreli seyahatlerde ülke vatandaşlığına göre vizesiz giriş veya konsolosluk vizesi gündeme gelir; son karar sınırda verilir.",
    accordions: [
      {
        title: "Turistik vize (Visitor) ve tipik evraklar",
        paragraphs: [
          "Meksika’ya kısa süreli seyahatlerde bazı ülke vatandaşları vizesiz giriş yapabilirken, birçok ülke için konsolosluk başvurusu veya elektronik izin süreçleri gerekebilir. Güncel muafiyet listesi ve giriş kuralları resmî kaynaklardan doğrulanmalıdır.",
        ],
        bullets: [
          "Geçerli pasaport",
          "Seyahat amacının tutarlı anlatımı",
          "Finansal yeterlilik",
          "Dönüş veya çıkış niyeti",
          "Konaklama bilgileri",
          "Uçuş / güzergâh planı",
        ],
      },
      {
        title: "Kalış süresi ve sınır kararı",
        paragraphs: [
          "Turistik girişlerde genellikle maksimum 180 güne kadar kalış verilebileceği belirtilir; ancak verilen süre ve şartlar her girişte sınır görevlisi takdirine bağlıdır.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: ["Ziyaretçi statüsünde sık karşılaşılan riskleri net tutmak faydalıdır:"],
        bullets: [
          "Vize veya elektronik izin alınması tek başına kesin giriş garantisi vermez.",
          "2025–2026 döneminde özellikle uzun süreli kalış planlayan yabancılar için finansal sorgular ve dönüş niyeti kontrollerinin sıkılaştığı rapor edilmektedir.",
          "Turist statüsüyle maaşlı çalışma yasaktır.",
        ],
      },
    ],
  },
  {
    id: "calisma-vizeleri",
    tocLabel: "Çalışma Vizeleri",
    h2: "Çalışma Yetkisi ve INM Süreci",
    lead:
      "Yaygın model; geçici oturum statüsü ile çalışma yetkisinin birlikte düzenlenmesidir. Bireysel başvuru yerine işveren hattı baskındır.",
    accordions: [
      {
        title: "Temporary Resident Visa with Work Authorization",
        paragraphs: [
          "Meksika’daki en sık kullanılan çalışma çerçevelerinden biri budur. Resmî adlandırmaya örnek:",
        ],
        bullets: ["“Residente Temporal con permiso para trabajar”"],
      },
      {
        title: "Çalışma vizesi süreci (tipik adımlar)",
        paragraphs: ["Süreç kişi ve işe göre değişebilir; aşağıdaki sıra genel çerçevedir:"],
        bullets: [
          "İşveren bulunur: Meksika merkezli şirket gerekir.",
          "İşveren Instituto Nacional de Migración (INM) başvurusu yapar.",
          "NUT numarası oluşturulur; bu numara çalışma izni onayına ilişkin referanstır.",
          "Başvuru sahibi ülkesindeki Meksika konsolosluğunda görüşme / vize aşamasını tamamlar.",
          "Meksika’ya giriş sonrası genellikle 30 gün içinde INM işlemleriyle oturum kartı süreçleri tamamlanır.",
        ],
      },
      {
        title: "İşveren sponsorluğu",
        paragraphs: [
          "Meksika’da bireysel çalışma vizesi seçenekleri sınırlıdır. Çoğu durumda kayıtlı işveren, INM onayı ve şirket sponsorluğu zorunludur.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş Bulma",
    h2: "Meksika’da İş Bulma",
    lead:
      "Yabancı istihdamı; sektör, dil ve yasal statü ile sınırlıdır. İş ilanlarında sponsorluk sık görülmez.",
    accordions: [
      {
        title: "Öne çıkan sektörler",
        paragraphs: ["Yabancı çalışanların sık örtüştüğü alanlara örnekler:"],
        bullets: [
          "Turizm",
          "Çağrı merkezi",
          "Yazılım",
          "Uluslararası ticaret",
          "Otelcilik",
          "İngilizce öğretmenliği",
          "Üretim sanayi",
          "Lojistik",
        ],
      },
      {
        title: "Dikkat edilmesi gerekenler",
        paragraphs: ["İş ararken gerçekçi beklentiler oluşturmak dosya riskini azaltır:"],
        bullets: [
          "İspanyolca yerel iş piyasasında büyük avantaj sağlar.",
          "Maaşlar eyalet ve şehre göre değişir; Mexico City, Monterrey ve Guadalajara genelde daha yüksek ücret bandına örnek verilir.",
          "Sponsorlu iş ilanı nispeten azdır; birçok şirket yalnızca yasal statüsü net adayları değerlendirir.",
        ],
      },
    ],
  },
  {
    id: "oturum-gecici",
    tocLabel: "Geçici oturum",
    h2: "Temporary Residency (Geçici Oturum)",
    lead:
      "Uzun süreli yaşam için en yaygın modellerden biri geçici oturumdur; çalışma, yatırım, aile birleşimi, uzaktan gelir veya emeklilik gibi amaçlarla başvurulabilir.",
    accordions: [
      {
        title: "Kalış süresi ve uzatma",
        paragraphs: [
          "Başlangıçta genellikle bir yıllık süre verilebileceği belirtilir; ardından uygunluk halinde birkaç yıla kadar uzatma mümkün olabilir. Güncel süre ve yenileme şartları INM ve konsolosluk duyurularıyla doğrulanmalıdır.",
        ],
      },
      {
        title: "Finansal yeterlilik (2026 perspektifi)",
        paragraphs: [
          "2026 itibarıyla finansal yeterlilik eşikleri ve hesaplama yöntemleri güncellenmiş olabilir. Bazı konsolosluk uygulamalarında aylık düzenli gelir veya yüksek tasarruf bakiyesi talep edildiği örnekleri bulunur.",
        ],
        callout: {
          variant: "warning",
          text: "Yaygın paylaşılan referans örnekleri (ör. geçici oturum için yaklaşık 79.770 MXN aylık gelir veya yaklaşık 1,34 milyon MXN tasarruf gibi) dönem ve başkonsolosluk çizgisine göre değişir; başvurmadan önce güncel tablo ve döviz karşılığını resmî duyuruyla doğrulayın.",
        },
      },
    ],
  },
  {
    id: "oturum-kalici",
    tocLabel: "Kalıcı oturum",
    h2: "Permanent Residency (Kalıcı Oturum)",
    lead:
      "Kalıcı oturum; uzun süreli geçici oturum, aile bağı, yüksek finansal yeterlilik veya emeklilik gibi kategorilerle ilişkilendirilebilir.",
    accordions: [
      {
        title: "Kimler başvurabilir? (örnek başlıklar)",
        paragraphs: ["Uygunluk tamamen güncel kriterlere bağlıdır; tipik olarak tartışılan gruplar:"],
        bullets: [
          "Uzun süre geçici oturum statüsünde olanlar",
          "Aile bağı bulunanlar",
          "Yüksek finansal yeterliliği olanlar",
          "Emekliler",
          "Bazı yatırımcı profilleri",
        ],
      },
      {
        title: "Kalıcı oturumun avantajları (genel çerçeve)",
        paragraphs: ["PR statüsünün kapsamı güncel kart ve INM koşullarına göre şekillenir; sık vurgulanan başlıklar:"],
        bullets: [
          "Süresiz oturum (statü ve kart yenileme kurallarına tabi)",
          "Yenileme yükünün göreli olarak azalması",
          "Daha stabil göç statüsü",
          "Uzun süreli yaşam hakkı çerçevesi",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Meksika Vatandaşlığı",
    lead:
      "Vatandaşlık; uzun süreli yasal ikamet, entegrasyon ve dil sınavları gibi adımlarla ilerler.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Meksika vatandaşlığı genellikle uzun süreli yasal ikamet, topluma uyum, temel İspanyolca ve tarih/kültür bilgisi sınavı gibi başlıklar üzerinden değerlendirilir.",
          "Bazı aile bağları veya özel durumlar süreleri etkileyebilir; kesin şartlar için resmî başvuru kılavuzları kullanılmalıdır.",
        ],
      },
    ],
  },
  {
    id: "dijital-gocabe",
    tocLabel: "Dijital göçebe",
    h2: "Dijital Göçebe ve Uzaktan Çalışma",
    lead:
      "Resmî isimlendirmesiyle ayrı bir “Digital Nomad Visa” olmayabilir; ancak geçici oturum modelleri pratikte uzaktan çalışanlar tarafından kullanılabilir.",
    accordions: [
      {
        title: "Ne beklenmeli?",
        paragraphs: [
          "Meksika’da resmî adıyla tek tip dijital göçebe vizesi bulunmadığı ifade edilir. Uzaktan çalışanlar için uygunluk genellikle gelir kanıtı ve geçici oturum şartları üzerinden değerlendirilir.",
        ],
      },
    ],
  },
  {
    id: "ucretler-sinir",
    tocLabel: "Ücretler ve sınır",
    h2: "Ücretler, Politikalar ve Sınır Bölgesi",
    lead:
      "Göç ücretleri yıllık güncellenir; sınır geçişlerinde FMM ve statü kontrolleri önemlidir.",
    accordions: [
      {
        title: "2026 ücret ve politika notu",
        paragraphs: [
          "2026 yılında geçici ve kalıcı oturum ücretlerinde artışlar duyurulmuştur. Kesin tutarlar için INM ücret tabloları ve ödeme yönergeleri kontrol edilmelidir.",
        ],
      },
      {
        title: "Sınır bölgesi başvuruları (ABD–Meksika hattı)",
        paragraphs: [
          "Sınır bölgelerinden girişlerde FMM kayıtları, verilen kalış süreleri ve yasal statü kontrolleri daha sıkı uygulanmaya başlanmış olabilir.",
          "Sık giriş-çıkış yapan yolcuların ayrıntılı sorgulanabildiği rapor edilmektedir.",
        ],
      },
    ],
  },
  {
    id: "uyarilar-kaynaklar",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Kaynaklar",
    lead:
      "Dolandırıcılık riski yüksek bölgelerde “garanti” vaatlerine karşı temkinli olun.",
    accordions: [
      {
        title: "Sahte iş teklifleri ve riskli vaatler",
        paragraphs: ["Aşağıdaki ifadeler yüksek risk olarak değerlendirilmelidir:"],
        bullets: [
          "“Kesin oturum” veya “garantili çalışma vizesi”",
          "“Sponsorluk satışı”",
          "“Hızlı vatandaşlık”",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: [
          "Instituto Nacional de Migración (INM) göç işlemlerinin merkezi mercilerinden biridir. Konsolosluk uygulamaları ülkeye göre değişir.",
          "Şu alanları düzenli izlemek faydalıdır: geçici oturum şartları, finansal yeterlilik limitleri, çalışma izni prosedürleri, INM ücretleri, konsolosluk talimatları ve sınır politikaları.",
        ],
      },
      {
        title: "Meksika sistemi hakkında özet",
        paragraphs: [
          "Meksika göç sistemi; göreli olarak düşük yaşam maliyeti, uzun süreli oturum imkânı, uzaktan çalışma uygunluğu ve Latin Amerika erişimi nedeniyle popülerleşmiştir.",
          "Ancak 2026 itibarıyla finansal yeterlilik şartları, oturum ücretleri ve belge kontrollerinin önemli ölçüde sıkılaştığı ileri sürülmektedir. Kişisel dosyanızı planlarken güncel INM ve konsolosluk metinlerini temel alın.",
        ],
      },
    ],
  },
];
