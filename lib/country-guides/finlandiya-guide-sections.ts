import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const FINLANDIYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Finlandiya; güçlü sosyal devlet, yüksek yaşam standardı, kaliteli eğitim ve teknoloji odaklı ekonomisiyle yazılım, mühendislik, sağlık ve araştırma alanlarında yabancı talebi gören bir Schengen / AB ülkesidir. Kısa süreli girişlerde Schengen kuralları; uzun süreli yaşamda Finlandiya’nın ulusal oturum ve çalışma izni sistemi geçerlidir. Kesin şartlar için Finnish Immigration Service (migri.fi) ve konsolosluk duyuruları esas alınmalıdır.",
  "2026 itibarıyla çalışma temelli oturum izinleri, yüksek nitelikli çalışan (Specialist) ve startup residence permit gibi hatların sık güncellendiği; maaş eşiklerinin, vergi düzenlemelerinin ve sosyal güvenlik koşullarının birlikte takip edilmesi gerektiği belirtilmektedir.",
];

export const FINLANDIYA_SEO_KEYWORD_TAGS: string[] = [
  "finlandiya vize",
  "finlandiya oturum izni",
  "helsinki çalışma izni",
  "finland schengen 90 gün",
  "migri residence permit",
  "finlandiya specialist permit",
];

export const FINLANDIYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize ve turistik giriş",
    h2: "Schengen ve Turistik Kalış",
    lead:
      "Finlandiya Schengen Bölgesi üyesidir; kısa süreli seyahatlerde Schengen çerçevesi ve Finlandiya ulusal düzenlemeleri birlikte uygulanır.",
    accordions: [
      {
        title: "Schengen ve AB sistemi",
        paragraphs: [
          "Kısa süreli girişlerde Schengen kuralları; uzun süreli oturum ve çalışma için Finlandiya’nın residence permit sistemi yürürlükte kalır (migri.fi ile teyit).",
        ],
      },
      {
        title: "Genel başvuru / giriş belgeleri",
        paragraphs: ["Çoğu başvuruda talep edilen evrakların özeti:"],
        bullets: [
          "Geçerli pasaport",
          "Seyahat sağlık sigortası",
          "Finansal yeterlilik",
          "Konaklama bilgileri",
          "Seyahat amacı",
          "Dönüş planı",
        ],
      },
      {
        title: "Turistik vize ve kalış süresi",
        paragraphs: [
          "Kısa süreli Schengen vizesi genellikle C tipi kategorisiyle ilişkilendirilir (finlandabroad.fi ve güncel vize rehberleri).",
          "180 gün içinde en fazla 90 gün kalış hakkı Schengen düzeninin tipik çerçevesidir; ülke bazlı detayları resmî kaynaklardan doğrulayın.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi anlamına gelmez; son karar sınır görevlisine aittir.",
          "Finansal yeterlilik özellikle uzun süreli kalış, sık giriş-çıkış veya uzaktan çalışma senaryolarında daha sıkı incelenebilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-oturum",
    tocLabel: "Çalışma ve oturum",
    h2: "Çalışma İzni, Specialist ve Blue Card",
    lead:
      "Çalışma için çoğu senaryoda oturum izni (residence permit) temelli düzenleme ve TE Services / Migri süreçleri uygulanır.",
    accordions: [
      {
        title: "Residence permit for employment",
        paragraphs: [
          "Finlandiya’da istihdam için birçok durumda önce uygun residence permit başvurusu ve ardından migration sürecinin tamamlanması gerektiği anlatılır (migri.fi).",
        ],
        bullets: [
          "Finlandiya işvereni / iş ilişkisi",
          "İş sözleşmesi",
          "Residence permit başvurusu",
          "İş ve ekonomi kurumu değerlendirmesi",
          "Göçmenlik kararı",
        ],
      },
      {
        title: "Yoğun sektör örnekleri",
        paragraphs: ["Sık talep gören alanlara dair özet (workinfinland.fi ve sektör raporları):"],
        bullets: [
          "Yazılım ve yapay zekâ",
          "Oyun sektörü",
          "Sağlık ve hemşirelik",
          "Mühendislik ve üretim",
          "Eğitim ve lojistik",
        ],
      },
      {
        title: "Specialist permit",
        paragraphs: [
          "Yüksek nitelikli çalışanlar için başvuru ve işleme süreçlerinin hızlandırılabildiği bir çerçeve anlatılır; güncel meslek ve maaş kriterleri migri.fi üzerinden kontrol edilmelidir.",
        ],
      },
      {
        title: "AB Blue Card",
        paragraphs: [
          "Yüksek ücretli uzman roller için AB Blue Card kriterleri devreye girebilir; eşikler ve meslek uyumu üye ülke düzenlemesine göre değişir (europa.eu genel çerçeve).",
        ],
      },
      {
        title: "Startup ve yatırım çizgisi",
        paragraphs: [
          "Startup residence permit ve ilgili iş planı / finansman şartları Finlandiya göç politikasında aktif başlıklardır; 2026 güncellemelerini Migri duyurularından izleyin.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili çalışma vizesi” veya “hazır startup oturumu” vaatlerine güvenmeyin; tüm süreçleri resmî kanallardan doğrulayın.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Sektörler ve Başvuru Kanalları",
    lead:
      "Teknoloji, CleanTech ve sağlık teknolojileri güçlü profillere açık; Helsinki ve büyük şehirlerde rekabet yüksektir.",
    accordions: [
      {
        title: "Güçlü sektörler",
        paragraphs: ["Business Finland ve sektör raporlarında öne çıkan başlıklar:"],
        bullets: [
          "Yazılım geliştirme",
          "Mobil oyun",
          "Telekomünikasyon",
          "CleanTech",
          "Sağlık teknolojileri",
          "Yapay zekâ ve eğitim teknolojileri",
        ],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["Work in Finland", "TE Services Finland", "LinkedIn", "Academic Work Finland"],
      },
      {
        title: "İngilizce ve Fince",
        paragraphs: [
          "Teknoloji ve uluslararası şirketlerde İngilizce yaygındır; sağlık, kamu ve müşteri temaslı rollerde Fince genellikle güçlü avantaj sağlar.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru ve staj",
    h2: "CV, Staj ve İşyerinde Eğitim",
    lead:
      "Sade, ölçülebilir ve teknik odaklı özgeçmiş; işyerinde sürekli eğitim ve hybrid çalışma kültürü yaygındır.",
    accordions: [
      {
        title: "CV beklentisi",
        paragraphs: [
          "Net iş deneyimi, ölçülebilir başarı, sade tasarım ve gerçek teknik yetkinlik ön plandadır.",
        ],
      },
      {
        title: "Motivasyon mektubu",
        paragraphs: [
          "Finlandiya işverenleri sıkça şirket kültürü uyumu, ekip çalışması ve uzun vadeli plan gibi başlıkları değerlendirir.",
        ],
      },
      {
        title: "Staj ve Erasmus+",
        paragraphs: [
          "Teknoloji, mühendislik ve araştırma iş birlikleri üzerinden staj olanakları bulunabilir (studyinfinland.fi ile program detayları).",
          "AB destekli Erasmus+ stajları yaygındır.",
        ],
      },
      {
        title: "İşyerinde eğitim ve çalışma biçimi",
        paragraphs: [
          "Teknik eğitim, iş güvenliği ve dijital yetkinlik işyeri gelişiminin parçasıdır.",
          "Teknoloji sektöründe remote, hybrid ve asenkron çalışma modelleri sık kullanılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut",
    h2: "Kira ve İlan Kaynakları",
    lead:
      "Helsinki ve çevresi ülke içinde en yüksek kira bandında yer alır; bütçe planı şehir seçimine göre yapılmalıdır.",
    accordions: [
      {
        title: "Helsinki ve kira referansları",
        paragraphs: [
          "2026 için merkezde tek kişilik stüdyo dairelerde üçüncü taraf maliyet sitelerinde (ör. numbeo.com) yaklaşık 850–1600 EUR bandından söz edilebilir; kesin rakamlar ilan sitelerinden günlük takip edilmelidir.",
        ],
      },
      {
        title: "İlan siteleri",
        paragraphs: ["Kira aramalarında yaygın kullanılan örnekler:"],
        bullets: ["Oikotie", "Vuokraovi"],
      },
    ],
  },
  {
    id: "ikamet-varis",
    tocLabel: "Oturum ve varış",
    h2: "İkamet Türleri, Kalıcı Oturum ve İlk Adımlar",
    lead:
      "Uzun süreli yaşam residence permit ile yürür; kalıcı oturum ayrı şartlarla talep edilir.",
    accordions: [
      {
        title: "Residence permit kategorileri",
        paragraphs: ["migri.fi kapsamında sık anılan gerekçelerden bazıları:"],
        bullets: ["Çalışma", "Eğitim", "Startup", "Aile birleşimi", "Araştırmacı", "Yüksek nitelikli uzman"],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Uzun süreli yasal ikamet ve entegrasyon şartları sağlandıktan sonra kalıcı oturuma başvuru yolları açılabilir; süre ve dil / gelir koşulları bireysel dosyaya göre değişir.",
        ],
      },
      {
        title: "Varış kontrol listesi",
        paragraphs: ["İlk haftalarda sıraya alınması gereken işlemlerin özeti:"],
        bullets: [
          "Residence permit kartı",
          "Adres kaydı",
          "Vergi numarası",
          "Banka hesabı",
          "Kela kaydı",
          "Sağlık sistemi kaydı",
          "Telefon hattı",
          "Ulaşım kartı",
        ],
      },
      {
        title: "Dijital kamu hizmetleri",
        paragraphs: [
          "Finlandiya dijital hizmet sunumunda öne çıkar; suomi.fi ve ilgili kurum portallarından süreçleri yürütmek mümkündür.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih",
    tocLabel: "İş sözleşmesi",
    h2: "Employment Contracts Act ve Fesih",
    lead:
      "İş ilişkileri geniş ölçüde Employment Contracts Act ile düzenlenir (finlex.fi metinleri).",
    accordions: [
      {
        title: "Sözleşme içeriği",
        paragraphs: ["Sözleşmelerde genellikle yer alan başlıklar:"],
        bullets: ["Ücret", "Görev tanımı", "Çalışma süresi", "Uzaktan çalışma", "Fesih şartları", "Deneme süresi"],
      },
      {
        title: "Deneme süresi",
        paragraphs: [
          "Birçok işte deneme süresi en fazla altı aya kadar uygulanabildiği belirtilir; sözleşme ve kolektif düzenlemeleri birlikte okuyun.",
        ],
      },
      {
        title: "Fesih ve çalışan hakları",
        paragraphs: [
          "Fesih ekonomik neden, performans veya organizasyonel değişiklik gibi gerekçelerle yürütülebilir.",
          "Fazla mesai koruması, ayrımcılık yasağı, iş güvenliği ve sendikal haklar güçlü biçimde korunur.",
        ],
      },
    ],
  },
  {
    id: "vergi-calisma-izin",
    tocLabel: "Vergi ve çalışma",
    h2: "Vergi, Süre ve İzinler",
    lead:
      "Progressive vergi yapısı; yüksek gelir dilimlerinde oranlar belirgin şekilde artabilir (vero.fi).",
    accordions: [
      {
        title: "Vergi ve kesintiler",
        paragraphs: ["Bordroda tipik kesinti kalemleri:"],
        bullets: ["Gelir vergisi", "Sosyal güvenlik", "Emeklilik katkıları", "İşsizlik sigortası"],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Tam zamanlı çalışma genellikle haftada 37,5–40 saat bandında anlatılır (tyosuojelu.fi ve iş sözleşmesi).",
          "Hybrid ve uzaktan çalışma, özellikle beyaz yaka ve teknoloji ekiplerinde yaygındır.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Ücretli yıllık izin hakkı tipik bir çalışma koşuludur (tyosuojelu.fi doğrulaması).",
        ],
        bullets: ["Hastalık izni", "Doğum ve babalık izni", "Ebeveyn izni", "Eğitim izinleri"],
      },
    ],
  },
  {
    id: "sosyal-denetim-sendika",
    tocLabel: "Sosyal güvenlik ve denetim",
    h2: "Emeklilik, Denetim, Sendika ve Meslekî Eğitim",
    lead:
      "Güçlü sosyal güvenlik ve yüksek sendika yoğunluğu ücret ve çalışma koşullarını toplu sözleşmelerle şekillendirebilir.",
    accordions: [
      {
        title: "Emeklilik ve sosyal güvenlik",
        paragraphs: [
          "Finlandiya çok katmanlı ve güçlü bir sosyal güvenlik mimarisi sunar; kişisel haklar Kela ve vergi kayıtlarıyla ilişkilidir.",
        ],
      },
      {
        title: "İş denetimleri",
        paragraphs: [
          "Çalışma koşulları ve iş güvenliği tyosuojelu.fi çerçevesinde sıkı biçimde izlenir.",
        ],
      },
      {
        title: "Sendika ve toplu sözleşmeler",
        paragraphs: [
          "Finlandiya yüksek sendika üyeliği ve toplu iş sözleşmeleriyle ücretleri ve yan hakları sektör bazında belirleyen bir model kullanır.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "Uygulamalı öğrenme, meslek yüksekokulları ve yaşam boyu eğitim kültürü güçlüdür; teknik yeterlilikler işgücü piyasasında sürekli güncellenir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam ve sağlık",
    h2: "Maliyet, Sağlık, Kültür ve Ulaşım",
    lead:
      "Yüksek gelir ile yüksek yaşam maliyeti birlikte düşünülmelidir; sağlıkta Kela merkezli sistem önemlidir.",
    accordions: [
      {
        title: "Yaşam maliyeti",
        paragraphs: [
          "Finlandiya Avrupa’nın pahalı ülkelerinden kabul edilir; kira, restoran, enerji ve ulaşım bütçeyi belirgin etkiler.",
        ],
      },
      {
        title: "Sağlık ve Kela",
        paragraphs: [
          "Yasal çalışanlar ve ikameti olan kişiler sağlık hizmetlerine Kela ve kamu sistemi kanallarıyla erişebilir (kela.fi güncel koşullar).",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Eğitim sistemi uluslararası ölçekte güçlü itibar taşır.",
          "Toplum genellikle sakin, bireysel, kurallı ve güven odaklı olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Helsinki’de toplu taşıma ağı gelişmiştir; bilet ve bölge kuralları için hsl.fi kaynaklarını kullanın.",
        ],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin çalışma hakları yasal güvence altındadır.",
        ],
        bullets: ["İşveren teşvikleri", "İş uyarlamaları", "Rehabilitasyon ve eğitim destekleri"],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Takip",
    lead:
      "Garanti vaatlerinden kaçının; maliyet, iklim ve vergi yükümlülüklerini gerçekçi planlayın.",
    accordions: [
      {
        title: "Dolandırıcılık ve abartılı vaatler",
        paragraphs: [
          "“Garantili çalışma vizesi”, “hazır iş sözleşmesi” veya “kesin residence permit” ifadeleri yüksek risktedir.",
        ],
      },
      {
        title: "Maliyet ve iklim gerçeği",
        paragraphs: [
          "Yüksek brüt maaş vergi ve yaşam giderleriyle birlikte değerlendirilmelidir.",
          "Uzun kış ve düşük güneş ışığı bazı yabancılar için adaptasyon zorluğu yaratabilir.",
        ],
      },
      {
        title: "Takip edilmesi gereken kurumlar",
        paragraphs: ["Güncel politika ve ücretler için:"],
        bullets: [
          "Finnish Immigration Service (Migri) — migri.fi",
          "Work in Finland",
          "Finnish Tax Administration — vero.fi",
          "Occupational Safety and Health Finland — tyosuojelu.fi",
          "Kela",
          "Study in Finland",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları düzenli kontrol edin:"],
        bullets: [
          "Çalışma oturum izinleri ve maaş eşikleri",
          "Startup residence permit",
          "Uzaktan çalışma politikaları",
          "Vergi ve sosyal güvenlik şartları",
          "İş hukuku ve toplu sözleşme çerçevesi",
        ],
      },
    ],
  },
];
