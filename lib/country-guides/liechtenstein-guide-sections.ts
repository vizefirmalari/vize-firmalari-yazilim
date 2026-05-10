import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const LIECHTENSTEIN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Liechtenstein; kişi başına gelir ve yaşam standardı açısından öne çıkan, İsviçre ile derin ekonomik entegrasyonu bulunan bir mikro devlettir. Schengen üyesi olmakla birlikte Avrupa Birliği üyesi değildir; Avrupa Ekonomik Alanı (EAA/EEA) çerçevesinde özel bir göç ve çalışma modeli uygulanır. Birçok yolcu ve çalışan fiilen İsviçre üzerinden ülkeye giriş yapar; permit ve kota kurallarını resmî göç kaynaklarından güncel doğrulayın.",
  "2026 itibarıyla çalışma ve oturum izinleri sıkı yıllık kota ve kontrollü başvuru hatlarıyla yönetilmektedir. Komşu ülkelerde ikamet edip Liechtenstein’da çalışanlar için vergi ve sosyal güvenlik planlaması ayrı ele alınmalıdır.",
];

export const LIECHTENSTEIN_SEO_KEYWORD_TAGS: string[] = [
  "liechtenstein vize",
  "liechtenstein çalışma izni",
  "vaduz oturum",
  "eea liechtenstein permit",
  "schengen liechtenstein 90 gün",
  "cross border commuter liechtenstein",
];

export const LIECHTENSTEIN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize ve turistik giriş",
    h2: "Schengen, EEA ve Giriş Belgeleri",
    lead:
      "Liechtenstein Schengen ve EEA sistemine bağlıdır; kısa süreli seyahatte Schengen düzenleri geçerlidir.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Ülke Schengen Bölgesi üyesidir; Avrupa Birliği üyesi değildir; Avrupa Ekonomik Alanı’na (EEA) dahildir. Uzun süreli çalışma ve oturumda ulusal kota ve permit çerçevesi uygulanır.",
        ],
      },
      {
        title: "Genel başvuru belgeleri",
        paragraphs: ["Kısa süreli giriş başvurularında sık istenen evraklar:"],
        bullets: [
          "Geçerli pasaport",
          "Finansal yeterlilik",
          "Sağlık sigortası",
          "Konaklama bilgileri",
          "Seyahat amacı",
          "Dönüş planı (uygulanabilir olduğu ölçüde)",
        ],
      },
      {
        title: "Turistik kalış",
        paragraphs: [
          "C tipi Schengen vizesi düzenlenen yolcular için genellikle 180 gün içinde en fazla 90 gün kalış çerçevesi anlatılır.",
        ],
      },
      {
        title: "İsviçre entegrasyonu ve sınır",
        paragraphs: [
          "Girişler fiilen çoğu zaman İsviçre üzerinden gerçekleşir; rota ve belge seti bireysel duruma göre değişir.",
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi garantisi değildir; son karar sınır otoritelerine aittir.",
        ],
      },
    ],
  },
  {
    id: "calisma-permit",
    tocLabel: "Çalışma izinleri",
    h2: "Kota ve Permit Türleri",
    lead:
      "Liechtenstein kontrollü bir çalışma izni sistemine sahiptir; kotolar her yıl sınırlıdır.",
    accordions: [
      {
        title: "Kota gerçeği",
        paragraphs: [
          "Her yıl sınırlı sayıda residence permit ve çalışma izni verildiği; başvuruların bekleme listesi ve önceliklendirme ile yönetilebileceği sık vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili iş”, “hazır work permit” veya “kesin residence” vaatlerine güvenmeyin; tüm süreçler resmî kota ve inceleme ile bağlıdır.",
        },
      },
      {
        title: "Başlıca permit türleri (özet)",
        paragraphs: [
          "Short-term permit kısa süreli çalışma; residence permit uzun süreli çalışma ve yaşam için anlatılır.",
          "Cross-border commuter permit; İsviçre veya Avusturya’da ikamet edip günlük gidip gelen çalışanlara yönelik düzenlemeler kapsamında değerlendirilir.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Tipik adımların özeti:"],
        bullets: [
          "İşveren ve uygun iş teklifi",
          "Permit başvurusu",
          "Kota değerlendirmesi",
          "Göç ve ekonomi makamlarının incelemesi",
          "Residence / work permit onayı",
        ],
      },
      {
        title: "Yoğun sektörler",
        paragraphs: ["Küçük fakat yüksek katma değerli işgücü ihtiyacının sık anıldığı alanlar:"],
        bullets: [
          "Finans ve bankacılık",
          "Precision manufacturing",
          "Mühendislik ve yazılım",
          "Fintech",
          "Hukuk ve trust hizmetleri",
          "Endüstriyel üretim",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Piyasa, Platformlar ve Dil",
    lead:
      "Yerel iş piyasası küçüktür; birçok profesyonel komşu ülkelerden sınır ötesi çalışır.",
    accordions: [
      {
        title: "Küçük ama yoğun piyasa",
        paragraphs: [
          "Kişi başına düşen iş ve gelir yoğunluğu yüksektir; çoğu çalışan İsviçre, Avusturya veya Almanya bağlantılı rollerde bulunur.",
        ],
      },
      {
        title: "İş arama kanalları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kaynaklar:"],
        bullets: ["Liechtenstein Jobs", "AMS Austria", "LinkedIn", "İsviçre iş portalları"],
      },
      {
        title: "Dil",
        paragraphs: [
          "Almanca iş günlük hayatında merkezi yerdedir. İngilizce finans ve teknoloji ekiplerinde avantaj sağlar; ancak çoğu rolda Almanca yeterliliği kritik kabul edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru ve staj",
    h2: "CV, Staj ve İşyeri Eğitimi",
    lead:
      "Alman / İsviçre tarzı profesyonel özgeçmiş ve disiplinli iş kültürü beklentisi yaygındır.",
    accordions: [
      {
        title: "CV beklentisi",
        paragraphs: [
          "Teknik uzmanlık, sertifikalar, güvenilirlik ve uzun vadeli plan net biçimde anlatılmalıdır.",
          "Almanca seviyesi birçok pozisyon için belirleyici olabilir.",
        ],
      },
      {
        title: "Staj",
        paragraphs: [
          "Finans, sanayi, mühendislik ve teknoloji alanlarında stajlar bulunabilir.",
          "Birçok aday İsviçre ve Avusturya üniversite ve araştırma ağları üzerinden staj ve iş bağlantısı kurar.",
        ],
      },
      {
        title: "İşyerinde eğitim",
        paragraphs: [
          "Yüksek kalite üretim, mühendislik ve finansal uzmanlık odaklı kültür hakimdir.",
          "Profesyonel sertifikasyon ve sürekli teknik gelişim önemlidir.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut",
    h2: "Sınırlı Arz ve Sınır Ötesi Yaşam",
    lead:
      "Konut arzı çok sınırlıdır; kiralar İsviçre seviyelerine yaklaşabilir.",
    accordions: [
      {
        title: "Piyasa gerçeği",
        paragraphs: [
          "2026 için kira seviyelerinin İsviçre ile benzer banda yayıldığı varsayılmalıdır; güncel ilanlarla teyit edin.",
        ],
      },
      {
        title: "Komşu ülkede yaşam",
        paragraphs: [
          "Birçok çalışan İsviçre veya Avusturya tarafında ikamet edip Liechtenstein’da çalışır; vergi ve commuter permit koşullarını birlikte değerlendirin.",
        ],
      },
    ],
  },
  {
    id: "eea-goc",
    tocLabel: "EEA ve göç",
    h2: "EEA Avantajı ve Üçüncü Ülkeler",
    lead:
      "EEA/EFTA vatandaşları permit süreçlerinde farklı kolaylıklarla anılır; üçüncü ülke vatandaşları daha düşük kota ile karşılaşabilir.",
    accordions: [
      {
        title: "EEA / AB dışı ayrımı",
        paragraphs: [
          "EEA/EFTA uyrukları daha elverişli çerçevelerden yararlanabilir.",
          "Üçüncü ülke vatandaşları sıkı kota ve ek incelemelere tabi tutulabilir.",
        ],
      },
      {
        title: "Yatırım ve özel statüler",
        paragraphs: [
          "Yüksek nitelikli roller veya yatırım temelli hatlar sınırlı kontenjanla yönetilir; hukuki ve vergi yapısı uzman desteği gerektirir.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış listesi",
    h2: "İlk Adımlar",
    lead: "Permit, belediye ve sağlık sigortası adımları birbirine bağlıdır.",
    accordions: [
      {
        title: "Kontrol listesi",
        paragraphs: ["İlk dönemde sıraya alınan işlemlerin özeti:"],
        bullets: [
          "Permit kaydı",
          "Belediye kaydı",
          "Sağlık sigortası",
          "Vergi kaydı",
          "Banka hesabı",
          "Telefon hattı",
        ],
      },
      {
        title: "Zorunlu sigorta",
        paragraphs: [
          "Temel sağlık sigortası yasal zorunluluktur; primler plan ve aile yapısına göre değişir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih",
    tocLabel: "İş sözleşmesi",
    h2: "İstihdam ve Fesih",
    lead:
      "Sözleşmeler İsviçre ve Alman hukuk kültürüne benzer unsurlar taşıyabilir.",
    accordions: [
      {
        title: "Sözleşme içeriği",
        paragraphs: ["Tipik unsurlar:"],
        bullets: ["Maaş", "Çalışma süresi", "Deneme süresi", "Fesih şartları", "Bonus ve yan haklar (rol bazında)"],
      },
      {
        title: "İş kültürü ve fesih",
        paragraphs: [
          "İş ortamı genellikle disiplinli, kalite odaklı ve dakik olarak tanımlanır.",
          "Fesih düzeni İsviçre / Alman modellerine yakın unsurlar içerebilir; ihbar ve tazminat kuralı sözleşme ve mevzuatla belirlenir.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal güvenceler arasında sık anılanlar:"],
        bullets: ["İş güvenliği", "Ayrımcılık koruması", "Maaş hakkı"],
      },
    ],
  },
  {
    id: "vergi-calisma-izin",
    tocLabel: "Vergi ve çalışma",
    h2: "Ücret, Vergi ve İzinler",
    lead:
      "Brüt maaş yüksek olsa da komşu ülkede ikamet edenler için sınır ötesi vergi planlaması kritiktir.",
    accordions: [
      {
        title: "Ücret ve vergi",
        paragraphs: [
          "Liechtenstein Avrupa’nın en yüksek gelir seviyelerinden biridir.",
          "Vergi rejimi genellikle bölgesel karşılaştırmalarda rekabetçi kabul edilse de kişisel durum ve ikamet yeri sonucu belirler.",
        ],
      },
      {
        title: "Sınır ötesi vergi",
        paragraphs: [
          "İsviçre veya Avusturya’da yaşayıp Liechtenstein’da çalışanlar için çifte anlaşmalar, vergi ikameti ve sosyal güvenlik koordinasyonu profesyonelce değerlendirilmelidir.",
        ],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Haftalık çalışma genellikle 40–42 saat bandında anlatılır.",
          "Finans ve teknolojide hibrit modeller yaygınlaşmaktadır; uzaktan çalışmada vergi ve sigorta kuralları ayrıca ele alınmalıdır.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: ["Ücretli yıllık izin için genellikle en az dört–beş hafta bandından söz edilir."],
        bullets: ["Hastalık izni", "Doğum izni", "Eğitim izinleri"],
      },
    ],
  },
  {
    id: "emeklilik-denetim-sendika",
    tocLabel: "Emeklilik ve denetim",
    h2: "Sosyal Güvenlik ve Uyuşmazlık",
    lead:
      "Güçlü sosyal güvenlik mimarisi; sendika yapısı komşu ülkelere göre daha küçük ancak sektörel olarak etkilidir.",
    accordions: [
      {
        title: "Emeklilik ve denetim",
        paragraphs: [
          "Çok katmanlı emeklilik ve sosyal güvenlik bileşenleri mevcuttur.",
          "Çalışma koşulları resmi denetimlere tabidir.",
        ],
      },
      {
        title: "Sendika ve uyuşmazlık",
        paragraphs: [
          "Sendikalar tüm sektörlerde İsviçre / Avusturya ölçeğinde olmasa da belirli alanlarda görünürlük taşır.",
          "İş uyuşmazlıkları iş mahkemeleri ve arabuluculuk süreçleriyle çözülebilir.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "İsviçre benzeri dual eğitim ve apprenticeship geleneği vardır.",
          "Mühendislik, üretim ve finansal hizmetlerde teknik uzmanlık yüksek değer görür.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam ve toplum",
    h2: "Maliyet, Sağlık, Kültür ve Ulaşım",
    lead:
      "Yaşam maliyeti çok yüksektir; toplum düzenli ve yüksek güven odaklı tanımlanır.",
    accordions: [
      {
        title: "Yaşam maliyeti ve sağlık",
        paragraphs: [
          "Liechtenstein Avrupa’nın en pahalı bölgelerinden biridir.",
          "Sağlık sistemi kaliteli kabul edilir; temel sigorta zorunludur.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Küçük ölçeğe rağmen kaliteli eğitim kurumları mevcuttur.",
          "Toplum genellikle muhafazakâr, düzenli ve yüksek güven odaklı olarak anlatılır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Ülke küçük olduğundan ulaşım büyük ölçüde otobüs ve İsviçre demiryolu / bölgesel bağlantılar üzerinden sağlanır.",
        ],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin çalışma hakları yasal güvence altındadır.",
        ],
        bullets: ["İş uyarlamaları", "Sosyal destekler", "Rehabilitasyon programları"],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Güncel Takip",
    lead:
      "Kota ve konut kısıtları birlikte değerlendirilmelidir; resmî duyurular sık değişir.",
    accordions: [
      {
        title: "Sistem sınırlılığı",
        paragraphs: [
          "Oturum ve çalışma permitleri Avrupa’nın en kısıtlı sistemlerinden biridir.",
          "Konut bulmak zordur; erken ve esnek planlama gerekir.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Güncel kriterler için örnek kurumlar:"],
        bullets: [
          "Migration and Passport Office Liechtenstein",
          "Liechtenstein National Administration",
          "Liechtenstein Jobs",
          "EEA Information Liechtenstein",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıklar izlenmelidir:"],
        bullets: [
          "Permit kotası ve çalışma izinleri",
          "Sınır ötesi çalışma düzenlemeleri",
          "Vergi ve sağlık sigortası primleri",
          "Residence permit süreçleri",
        ],
      },
    ],
  },
];
