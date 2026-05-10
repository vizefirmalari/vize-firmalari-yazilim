import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const ESTONYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Estonya; dijital devlet altyapısı, düşük bürokrasi algısı ve teknoloji odaklı ekonomisiyle yazılım, mühendislik ve uzaktan çalışan profiller için sık tercih edilen bir AB / Schengen ülkesidir. İş arama, oturum ve vergi süreçleri büyük ölçüde çevrim içi yürütülebilir; güncel şartlar için Estonya Polisi ve Sınır Güvenliği (politsei.ee), Vergi ve Gümrük Kurulu (emta.ee) ile Work in Estonia kaynakları doğrulanmalıdır.",
  "2026 itibarıyla teknoloji, siber güvenlik, fintech ve yapay zekâ alanlarında yabancı uzman talebinin sürdüğü bildirilmektedir. Kesin maaş eşikleri, oturum kategorileri ve startup / dijital göçebe kriterleri sık güncellenir; resmî duyuruları düzenli izleyin.",
];

export const ESTONYA_SEO_KEYWORD_TAGS: string[] = [
  "estonya çalışma",
  "estonya oturum izni",
  "tallinn iş ilanı",
  "estonia digital nomad visa",
  "estonya blue card",
  "e-estonia residence permit",
];

export const ESTONYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş Bulma",
    h2: "Sektörler ve İş Arama",
    lead:
      "Nüfus göre küçük fakat dijital sektör yoğun bir piyasada uzman talebi yüksektir; başvuru kanalları çoğunlukla İngilizce.",
    accordions: [
      {
        title: "Öne çıkan sektörler",
        paragraphs: ["Yabancı çalışanlar için sık anılan alanların özeti:"],
        bullets: [
          "Yazılım geliştirme",
          "Yapay zekâ",
          "Siber güvenlik",
          "Veri bilimi",
          "Fintech",
          "Blockchain",
          "SaaS",
          "Oyun geliştirme",
          "Dijital hizmetler",
          "Lojistik",
        ],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların birleştiği tipik kaynaklar:"],
        bullets: [
          "Work in Estonia (workinestonia.com)",
          "CV Keskus",
          "CV Online Estonia",
          "LinkedIn",
          "Startup Estonia ağı",
        ],
      },
      {
        title: "İngilizce ile çalışma",
        paragraphs: [
          "Teknoloji ve uluslararası şirketlerde İngilizce iş dili yaygındır; startup, scale-up ve uzaktan ekiplerde İngilizce ağırlıklı roller sık görülür.",
        ],
      },
      {
        title: "Küçük iş piyasası gerçeği",
        paragraphs: [
          "Almanya veya Hollanda ile aynı ölçekte ilan hacmi beklenmemelidir. Buna karşılık dijital yoğunluk ve yatırım ekosistemi nedeniyle belirli nişlerde uzman açığı bildirilmektedir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru ve Staj",
    h2: "İşe Alım, CV ve Staj",
    lead:
      "Çok aşamalı seçim süreçleri ve Avrupa formatına yakın özgeçmiş beklentisi yaygındır.",
    accordions: [
      {
        title: "Genel işe alım süreci",
        paragraphs: ["Tipik adımlar şöyle özetlenir:"],
        bullets: [
          "CV ve motivasyon mektubu",
          "Online görüşme",
          "Teknik değerlendirme",
          "Referans kontrolü",
          "İş teklifi",
          "Çalışma izni / residence permit süreçleri",
        ],
      },
      {
        title: "CV beklentisi",
        paragraphs: [
          "Genellikle kısa, teknik yetkinlik odaklı, sade ve ölçülebilir sonuç içeren özgeçmişler tercih edilir.",
        ],
      },
      {
        title: "Motivasyon mektubu",
        paragraphs: [
          "Özellikle startup ve teknoloji şirketlerinde neden Estonya, neden ilgili şirket ve hangi problemde katkı sağlanacağı net anlatılmalıdır.",
        ],
      },
      {
        title: "Staj (traineeship)",
        paragraphs: [
          "Teknoloji, mühendislik, startup ve dijital ürün geliştirme alanlarında staj imkânları bulunabilir (studyinestonia.ee ve ilgili program sayfalarından doğrulayın).",
        ],
      },
      {
        title: "Erasmus+ ve ücretli staj",
        paragraphs: [
          "Birçok şirket Erasmus+ ve AB programları kapsamında stajyer kabul edebilir. Ücretli veya ücretsiz staj şirket politikasına göre değişir; teknoloji şirketlerinde ücretli staj daha sık rapor edilir.",
        ],
      },
      {
        title: "İşyerinde eğitim ve onboarding",
        paragraphs: [
          "Dijital onboarding yaygındır; Slack, Notion, Jira, GitHub ve Confluence benzeri araçlar yoğun kullanılır.",
        ],
        bullets: [
          "Bulut, güvenlik, yapay zekâ, DevOps ve yazılım mimarisi gibi konularda şirket içi eğitim sunulabilir.",
        ],
      },
    ],
  },
  {
    id: "konut-maliyet",
    tocLabel: "Konut ve Maliyet",
    h2: "Konut ve Yaşam Maliyeti",
    lead:
      "Tallinn kira seviyeleri ülke ortalamasının üzerindedir; kış aylarında enerji kalemleri bütçeyi etkiler.",
    accordions: [
      {
        title: "Tallinn ve kira seviyeleri",
        paragraphs: [
          "Teknoloji çalışanlarının yoğunluğu nedeniyle Tallinn özellikle merkez bölgelerde pahalılaşmıştır. 2026 için tek başına yaşayanlar açısından şehir merkezinde stüdyo daireler için yaklaşık 700–1300 EUR bandından bahsedilebileceği üçüncü taraf maliyet sitelerinde (ör. numbeo.com) görülebilir; güncel medyan için ilan sitelerini esas alın.",
        ],
      },
      {
        title: "Kiralama platformları",
        paragraphs: ["İlan takibi için yaygın kullanılan örnekler:"],
        bullets: ["KV.ee", "City24 Estonia"],
      },
      {
        title: "Dikkat edilmesi gerekenler",
        paragraphs: ["Sözleşmede şu kalemler ayrı ayrı netleştirilmelidir:"],
        bullets: ["Depozito", "Aidat ve utility ücretleri", "İnternet paketi", "Kış aylarında ısıtma / enerji giderleri"],
      },
      {
        title: "Genel yaşam maliyeti",
        paragraphs: [
          "Tallinn birçok batı Avrupa başkentine göre daha uygun kabul edilse de son yıllarda maliyet artışları bildirilmektedir. Kişisel harcama profiline göre bütçe çalışması yapılmalıdır.",
        ],
      },
    ],
  },
  {
    id: "ikamet-schengen",
    tocLabel: "İkamet ve AB",
    h2: "Geçici Oturum ve Blue Card",
    lead:
      "Uzun süreli yaşam için residence permit kategorileri; AB Blue Card yüksek nitelikli çalışanlar için ayrı çerçevedir.",
    accordions: [
      {
        title: "Temporary Residence Permit — başlıca kategoriler",
        paragraphs: ["politsei.ee üzerinden yürütülen sistemde sık anılan gerekçelerden bazıları:"],
        bullets: [
          "Çalışma",
          "Startup",
          "Eğitim",
          "Aile birleşimi",
          "İş kurma",
          "Dijital göçebe",
        ],
        callout: {
          variant: "warning",
          text: "Kategori şartları, biyometri ve belge listeleri sık güncellenir; onay ve süre sınır gözetimine bağlıdır.",
        },
      },
      {
        title: "AB Blue Card",
        paragraphs: [
          "Yüksek nitelikli istihdam için AB çerçevesinde uygulanan Blue Card; maaş eşikleri ve meslek uyumu üye ülke mevzuatına göre değişir (europa.eu üzerinden genel prensipleri doğrulayın).",
        ],
      },
      {
        title: "Kalıcı oturum",
        paragraphs: [
          "Uzun süreli yasal ikamet şartları sağlandıktan sonra kalıcı oturuma başvuru yolları değerlendirilebilir; süre ve fizikî bulunma koşulları dosyaya göre değişir.",
        ],
      },
    ],
  },
  {
    id: "varis-dijital",
    tocLabel: "Varış ve E‑Devlet",
    h2: "İlk Adımlar ve Dijital Devlet",
    lead:
      "e-Estonia çerçevesinde banka, vergi ve çoğu devlet işlemi çevrim içi yürütülebilir.",
    accordions: [
      {
        title: "Varış kontrol listesi",
        paragraphs: ["İlk aşamada sıraya alınması gereken başlıkların özeti:"],
        bullets: [
          "Oturum kartı işlemleri",
          "Adres kaydı",
          "Banka hesabı",
          "Vergi numarası",
          "Sağlık sistemi kaydı",
          "Dijital kimlik doğrulama",
          "Telefon hattı",
          "Ulaşım kartı",
        ],
      },
      {
        title: "Dijital devlet altyapısı",
        paragraphs: [
          "e-Government, dijital imza, online vergi ve çevrim içi şirket yönetimi araçları Estonya’nın güçlü yönleri arasında gösterilir (e-estonia.com ve ilgili kurum sitelerinden doğrulayın).",
        ],
      },
    ],
  },
  {
    id: "sozlesme-haklar",
    tocLabel: "İş Sözleşmesi",
    h2: "İstihdam, Sözleşme ve Fesih",
    lead:
      "İş ilişkileri Employment Contracts Act çerçevesinde düzenlenir (riigiteataja.ee metinlerini esas alın).",
    accordions: [
      {
        title: "Sözleşmede yer alan ana unsurlar",
        paragraphs: ["Tipik sözleşmelerde şu başlıklar bulunur:"],
        bullets: [
          "Ücret",
          "Görev tanımı",
          "Çalışma saati ve uzaktan çalışma koşulları",
          "Fesih şartları",
          "Deneme süresi",
        ],
      },
      {
        title: "Deneme süresi",
        paragraphs: ["Çoğu işte deneme süresi maksimum dört aya kadar uygulanabildiği belirtilir; kesin süre sözleşme ve ilgili kanun düzenlemesiyle bağlıdır."],
      },
      {
        title: "Fesih ve bildirim",
        paragraphs: [
          "İşveren performans, ekonomik gerekçe, şirket küçülmesi veya disiplin gibi nedenlerle fesih yapabilir. Bildirim süreleri kıdeme ve sözleşme tipine göre değişir.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Çalışanların ücret, izin, fazla mesai ve ayrımcılık karşısında korunma gibi yasal güvenceleri bulunduğu ifade edilir."],
      },
    ],
  },
  {
    id: "vergi-calisma-izin",
    tocLabel: "Vergi ve Çalışma",
    h2: "Vergi, Ücret, Süre ve İzinler",
    lead:
      "Düz gelir vergisi modeli ve dijital beyan sistemleri; haftalık çalışma süresi ve ücretli yıllık izin kuralları işveren sözleşmesiyle birlikte okunmalıdır.",
    accordions: [
      {
        title: "Gelir vergisi ve kesintiler",
        paragraphs: [
          "Estonya düz oranlı gelir vergisi ile bilinir; bordroda gelir vergisi, sosyal güvenlik, işsizlik ve emeklilik katkıları gibi kesintiler yer alabilir (emta.ee güncel tablolar ve araçlar).",
        ],
      },
      {
        title: "Dijital vergi yönetimi",
        paragraphs: [
          "Vergi ile ilgili işlemlerin büyük bölümünün online yapılabildiği; ülkenin dijital vergi deneyiminin güçlü olduğu sık vurgulanır.",
        ],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Standart tam zamanlı çalışma genellikle haftada 40 saat olarak anlatılır (tooelu.ee ve iş sözleşmesi). Hybrid ve asenkron çalışma teknoloji şirketlerinde yaygındır.",
        ],
      },
      {
        title: "Yıllık ve diğer izinler",
        paragraphs: ["Yıllık ücretli izin için genellikle en az 28 gün bandından söz edilir (tooelu.ee doğrulaması)."],
        bullets: ["Hastalık izni", "Doğum izni", "Babalık izni", "Eğitim izni"],
      },
    ],
  },
  {
    id: "denetim-emeklilik",
    tocLabel: "Denetim ve Eğitim",
    h2: "Denetim, Emeklilik ve Meslekî Eğitim",
    lead:
      "İş güvenliği denetimleri, çok katmanlı emeklilik yapısı ve güçlü teknik eğitim geleneği birlikte değerlendirilir.",
    accordions: [
      {
        title: "Emeklilik",
        paragraphs: [
          "Çok katmanlı emeklilik sistemi uygulandığı belirtilir; kişisel durum için emta.ee ve sosyal güvenlik kaynakları incelenmelidir.",
        ],
      },
      {
        title: "İş denetimi ve güvenlik",
        paragraphs: [
          "Çalışma koşulları Labour Inspectorate (ti.ee) tarafından denetlenebilir. İşverenler güvenli çalışma ortamı, ergonomi ve psikososyal riskler konusunda yükümlülük taşır.",
        ],
      },
      {
        title: "Sendika ve uyuşmazlık",
        paragraphs: [
          "Sendika yoğunluğu bazı AB ülkelerine kıyasla daha düşük görülse de toplu iş sözleşmeleri mevcuttur. Uyuşmazlıklar labour dispute committees ve mahkeme yollarıyla çözülebilir.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "Bilgi teknolojileri, mühendislik ve dijital okuryazarlık alanlarında güçlü meslekî ve yaşam boyu öğrenme kültürü rapor edilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-kultur",
    tocLabel: "Sağlık ve Toplum",
    h2: "Sağlık, Eğitim, Ulaşım ve Erişilebilir İstihdam",
    lead:
      "Yasal çalışan statüsü sağlık sigortası kapsamı için önemlidir; toplum genel olarak düzenli ve bireyci olarak tanımlanır.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Yasal çalışanlar genellikle Estonian Health Insurance Fund (tervisekassa.ee) kapsamına girebildiği belirtilir. Özel sağlık hizmetleri de yaygın kullanılır.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Eğitim sistemi dijital modelleriyle öne çıkar. Toplum genellikle sakin, bireysel, kurallı ve dijital odaklı olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Tallinn’de toplu taşıma gelişmiştir; bazı kayıtlı sakinler için ücretsiz veya indirimli ulaşım avantajları anlatılabilir.",
        ],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin istihdamı yasal olarak korunur; bazı programlarda işveren teşvikleri, iş uyarlamaları ve destek hizmetleri (tootukassa.ee kaynaklı bilgilerle doğrulanmalıdır) sunulabilir.",
        ],
      },
    ],
  },
  {
    id: "uyarilar-kaynak",
    tocLabel: "Uyarılar ve Kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Takip",
    lead:
      "Garanti vaatleri ve agresif vergi planlamasından kaçının; kurum sitelerinden güncel şartları izleyin.",
    accordions: [
      {
        title: "Dolandırıcılık ve abartılı vaatler",
        paragraphs: [
          "“Garantili çalışma vizesi”, “hazır startup oturumu” veya “kesin residency” gibi ifadeler risk taşır; resmî başvuru yolları ve şirket meşruiyeti mutlaka doğrulanmalıdır.",
        ],
      },
      {
        title: "Vergi ve uluslararası yükümlülükler",
        paragraphs: [
          "Şirket yapısı ile bireysel vergi durumu farklıdır. Uzaktan çalışanlar için vergi ikameti, çifte vergilendirme ve AB yükümlülükleri profesyonel destekle değerlendirilmelidir.",
        ],
      },
      {
        title: "Takip edilmesi gereken kurumlar",
        paragraphs: ["Güncel kriter ve ücretler için örnek resmî kaynaklar:"],
        bullets: [
          "Work in Estonia",
          "Estonian Police and Border Guard Board (politsei.ee)",
          "Estonian Tax and Customs Board (emta.ee)",
          "Labour Inspectorate Estonia (ti.ee)",
          "E-Estonia",
          "Estonian Health Insurance Fund (tervisekassa.ee)",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıklar sık revize edilir:"],
        bullets: [
          "Dijital göçebe ve startup vizesi kriterleri",
          "Maaş eşikleri ve residence permit süreçleri",
          "Uzaktan çalışma ve vergi düzenlemeleri",
          "İş hukuku güncellemeleri",
        ],
      },
    ],
  },
];
