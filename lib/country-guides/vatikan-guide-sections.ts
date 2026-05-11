import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const VATIKAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Vatikan, dünyanın en küçük bağımsız devleti ve Katolik Kilisesi'nin merkezidir. Klasik anlamda bir göç ülkesi değildir; giriş, ziyaret, çalışma ve oturum süreçleri büyük ölçüde İtalya ve Roma üzerinden yürür. Bu nedenle Vatikan'a ilişkin vize ve giriş kuralları pratikte Schengen ve İtalya sistemiyle bağlantılıdır.",
  "Klasik göçmenlik veya yatırımcı oturumu programları, golden visa veya kitlesel yabancı residence hatları bulunmaz; vatandaşlık son derece sınırlı ve görev temellidir. Bilet, müze rezervasyonu ve güvenlik uygulamaları sık güncellenir — Vatikan Şehir Devleti portalları, Holy See duyuruları ve İtalya Schengen bilgilerinden güncel doğrulayın.",
];

export const VATIKAN_SEO_KEYWORD_TAGS: string[] = [
  "vatikan vize",
  "vatican city visit",
  "vatikan turistik ziyaret",
  "italya schengen vatikan",
  "st peter basilica tickets",
  "vatikan müzeleri giriş",
  "holy see",
  "vatikan vatandaşlığı",
  "swiss guard vatican",
  "roma vatikan gezi",
];

export const VATIKAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "AB, Schengen ve İtalya Üzerinden Fiilen Schengen Erişimi",
    lead:
      "Vatikan Avrupa Birliği üyesi değildir ve resmî Schengen üyesi listesinde yer almaz. Roma'nın içinde yer alması, İtalya ile açık sınır pratiği ve girişlerin İtalya üzerinden gerçekleşmesi nedeniyle fiilen Schengen erişim sistemiyle bağlantılı kabul edilir.",
    accordions: [
      {
        title: "Türk vatandaşları için giriş",
        paragraphs: [
          "Türk vatandaşları Vatikan'a doğrudan değil, önce İtalya üzerinden giriş yapar.",
          "Genellikle geçerli İtalya Schengen vizesi veya uygun Schengen giriş hakkı gereklidir.",
          "Vatikan'a özel ayrı bir turistik vize sistemi bulunmaz.",
        ],
        callout: {
          variant: "warning",
          text: "Schengen hakkı olmadan yalnızca Vatikan ziyareti planlamayın; giriş Roma ve İtalya sınır kontrolleriyle birlikte değerlendirilir.",
        },
      },
      {
        title: "Neden İtalya dosyası ön planda?",
        paragraphs: [
          "Ziyaretçi akışı, müze ve bazilika güvenliği İtalyan makamlarıyla koordinasyon içinde yürütülür; uzun süreli ikamet beklentisi çoğunlukla İtalya residence modelleri üzerinden ele alınır.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik ziyaret",
    h2: "Aziz Petrus Meydanı, Müzeler ve Bazilika",
    lead:
      "Vatikan'a giriş Aziz Petrus Meydanı, Vatikan Müzeleri ve Bazilika ekseninde yoğunlaşır. Kısa süreli ziyaretler İtalya Schengen kuralları kapsamında değerlendirilir.",
    accordions: [
      {
        title: "Turistik ziyaretin hukuki sınırları",
        paragraphs: [
          "Turistik ziyaret çalışma hakkı vermez, residence hakkı oluşturmaz ve vatandaşlık sürecine temel oluşturmaz.",
        ],
      },
      {
        title: "Pratik planlama",
        paragraphs: [
          "Yoğun dönemlerde müze ve bazilika için ön rezervasyon, güvenlik sırası ve kıyafet kurallarının takibi önerilir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Vatikan'da Oturum: Son Derece Sınırlı Model",
    lead:
      "Klasik anlamda \"Vatikan'a taşınayım ve oturum alayım\" modeli bulunmaz. Residence sistemi genellikle resmi görev, kilise görevi, diplomatik hizmet veya Vatikan bağlantılı çalışma temelinde yürür.",
    accordions: [
      {
        title: "Kimler için anlamlı?",
        paragraphs: [
          "Dış dünyadan kitlesel başvuru hatları yerine kurum içi atama ve görevlendirme mantığının geçerli olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Vatikan Vatandaşlığı: Görev ve Statü Temelli",
    lead:
      "Vatikan vatandaşlığı dünyadaki en özel sistemlerden biridir. Genellikle kardinaller, Vatikan diplomatları, Vatikan görevlileri, İsviçre Muhafızları ve resmî dini görevliler gibi statülerle ilişkilendirilir.",
    accordions: [
      {
        title: "Doğumla vatandaşlık",
        paragraphs: [
          "Genellikle doğumla otomatik vatandaşlık verilmez; çoğunlukla görev ve statüye bağlıdır.",
          "Bir kişi Vatikan'daki görevini kaybettiğinde vatandaşlığını da kaybedebileceği anlatılır; bu yönüyle sıra dışı bir rejim olarak öne çıkar.",
        ],
      },
      {
        title: "Yatırım yolu",
        paragraphs: [
          "Vatikan yatırım karşılığı vatandaşlık veya oturum veren ülkelerden biri değildir.",
        ],
        callout: {
          variant: "info",
          text: "Vatikan vatandaşlığını ticari veya yatırım vaadiyle sunan içeriklere itibar etmeyin; yalnızca resmî bilgi kanallarını kullanın.",
        },
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Dar ve Kontrollü İş Alanları",
    lead:
      "Vatikan'da çalışanların büyük bölümü din görevlileri, güvenlik personeli, diplomatik personel, idari çalışanlar ile müze ve kültürel miras çalışanları gibi alanlarda görev yapar. İş piyasası çok küçük ve çok kontrollüdür.",
    accordions: [
      {
        title: "İsviçre Muhafızları (Swiss Guard)",
        paragraphs: [
          "Vatikan güvenliğinden sorumlu en bilinen birimlerden biridir.",
          "Özel seçim süreçlerinden geçer; adayların İsviçre vatandaşı olması gerekir.",
        ],
      },
      {
        title: "Başvuru akışı",
        paragraphs: [
          "Süreçler genellikle Vatikan resmî kurumları, Holy See bağlantılı yapılar ve dini organizasyonlar üzerinden ilerir; klasik iş ilanı göç modeli çok sınırlıdır.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Dışarıdan İş Bulma Beklentisi",
    lead:
      "Dışarıdan yabancı çalışan kabulü oldukça düşüktür. Başlıca alanlar din hizmetleri, müze hizmetleri, arşiv ve akademik çalışmalar, güvenlik, diplomatik hizmetler ve teknik destektir.",
    accordions: [
      {
        title: "Gerçekçi çerçeve",
        paragraphs: [
          "Çoğu uzmanın ikamet ve kariyer planını Roma ve İtalya hukuku üzerinden kurması gerekir; Vatikan görevi istisnai bir senaryo olarak değerlendirilmelidir.",
        ],
      },
    ],
  },
  {
    id: "sirket-yatirim",
    tocLabel: "Şirket ve yatırım",
    h2: "Ticari Göç ve Golden Visa Yokluğu",
    lead:
      "Vatikan ticari göç veya şirket kurma temelli residence sistemi sunmaz. Startup oturumu, yatırımcı residence modeli veya golden visa benzeri standart hatlar bulunmamaktadır.",
    accordions: [
      {
        title: "İtalya alternatifi",
        paragraphs: [
          "Girişimcilik veya yatırım temelli ikamet arayan profiller için çözüm yolu neredeyse daima İtalya mevzuatı ve quota duyurularıdır.",
        ],
      },
    ],
  },
  {
    id: "yasam-konut",
    tocLabel: "Yaşam ve konut",
    h2: "Yaşam Modeli ve Konut Tahsisi",
    lead:
      "Vatikan tam anlamıyla klasik bir yaşam ülkesi değildir: çok küçük, kapalı, yüksek güvenlikli ve dini ile idari merkez odaklı bir yapıdadır. Birçok Vatikan çalışanı Roma'da yaşar ve günlük giriş çıkış yapar.",
    accordions: [
      {
        title: "Konut",
        paragraphs: [
          "Vatikan içinde konut alanı son derece sınırlıdır.",
          "Residence hakkı bulunan kişilerin önemli kısmının görev nedeniyle özel tahsisli alanlarda kaldığı özetlenir.",
          "Yabancıların serbest biçimde kira ile Vatikan içinde yaşaması pratikte mümkün değildir.",
        ],
      },
    ],
  },
  {
    id: "egitim-saglik",
    tocLabel: "Eğitim ve sağlık",
    h2: "Papalık Üniversiteleri ve Sağlık Çerçevesi",
    lead:
      "Vatikan ilahiyat, dini eğitim, arşiv, tarih ve felsefe alanlarında küresel öneme sahip kurumlara ev sahipliği yapar. Pontifical Gregorian University gibi Papalık üniversiteleri öne çıkar.",
    accordions: [
      {
        title: "Sağlık",
        paragraphs: [
          "Vatikan çalışanları için kurum içi ve özel sağlık yapıları bulunmaktadır.",
          "Yabancı ziyaretçiler İtalya ve Schengen sağlık kurallarına tabidir; seyahat sigortası ve Schengen vize şartlarını İtalya vize bilgileriyle birlikte kontrol edin.",
        ],
      },
    ],
  },
  {
    id: "italya-baglanti",
    tocLabel: "İtalya bağlantısı",
    h2: "Uzun Süreli Bulunma İçin İtalya Residence",
    lead:
      "Vatikan'a ilişkin en kritik nokta, göç, yaşam ve giriş süreçlerinin büyük ölçüde İtalya sistemiyle bağlantılı olmasıdır. Uzun süreli bulunmak isteyen kişiler için İtalya residence modelleri çoğu zaman daha önemlidir.",
    accordions: [
      {
        title: "Stratejik planlama",
        paragraphs: [
          "Çalışma izni, aile birleşimi, öğrenci veya seçici oturum hatları İtalya bakanlık ve konsolosluk duyuruları üzerinden takip edilmelidir.",
        ],
      },
    ],
  },
  {
    id: "guncel-2026",
    tocLabel: "2025–2026",
    h2: "İtalya ve Schengen Gelişmelerinin Dolaylı Etkisi",
    lead:
      "Son dönemde Schengen giriş kontrollerinin arttığı, İtalya göç sisteminde kota düzenlemelerinin gündeme geldiği, çalışma izinlerinde Decreto Flussi çerçevesinin genişletildiği ve İtalya residence denetimlerinin sıkılaştığı yönünde özetler paylaşılmaktadır. Bu gelişmeler Vatikan erişimini de dolaylı olarak etkileyebilir.",
    accordions: [
      {
        title: "Doğrulama",
        paragraphs: [
          "Kota tabloları, işveren bildirimleri ve vize randevu süreleri yıllık güncellenir — İtalya İçişleri Bakanlığı ve İtalya vize portalı duyurularından teyit edin.",
        ],
        callout: {
          variant: "info",
          text: "Bu bölüm genel kamuoyu özetidir; kişisel dosyanızı yalnızca güncel resmî metin ve danışmanlıkla kilitleyin.",
        },
      },
    ],
  },
  {
    id: "sik-hatalar",
    tocLabel: "Sık hatalar",
    h2: "Yanlış Beklenti ve Süreç Riskleri",
    lead:
      "Aşağıdaki varsayımlar yanlış beklenti ve süreç hatalarına yol açabilir.",
    accordions: [
      {
        title: "Özet liste",
        paragraphs: ["Sık yapılan hatalar:"],
        bullets: [
          "Vatikan'ı bağımsız göç ülkesi sanmak",
          "Schengen olmadan giriş planlamak",
          "Vatikan vatandaşlığını yatırım yoluyla alınabilir sanmak",
          "Vatikan'da serbest residence sistemi olduğunu düşünmek",
          "Turistik ziyaret ile çalışma hakkını karıştırmak",
        ],
      },
    ],
  },
  {
    id: "kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama ve Başlangıç Adresleri",
    lead:
      "Aşağıdaki anahtar ifadeler resmî sitelere ulaşmak için arama motorunda kullanılabilir; URL yapıları zamanla değişebilir.",
    accordions: [
      {
        title: "Uluslararası eksen",
        paragraphs: ["İlk kontrol listesi:"],
        bullets: [
          "Vatican City State Official Portal",
          "Holy See Official Website",
          "Population and Citizenship Information",
          "Italy Visa Information Portal",
          "France Schengen Visa Information",
        ],
      },
      {
        title: "Türkiye",
        paragraphs: [
          "Schengen vize başvurusu ve seyahat uyarıları için T.C. Dışişleri ile İtalya konsolosluk bölgenizi birlikte değerlendirin.",
        ],
      },
    ],
  },
];
