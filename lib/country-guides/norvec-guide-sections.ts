import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const NORVEC_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Norveç; yüksek maaş seviyeleri, güçlü sosyal devlet, düşük işsizlik oranı, enerji sektörü ve yüksek yaşam kalitesi nedeniyle Avrupa’nın dikkat çeken çalışma ve oturum merkezlerinden biridir. Schengen Bölgesi üyesi olmasına rağmen Avrupa Birliği üyesi değildir; Avrupa Ekonomik Alanı (EEA/EØS) sisteminde kendi çalışma ve oturum mevzuatını uygulamaktadır. Özellikle mühendislik, enerji, yazılım, sağlık, denizcilik ve teknik uzmanlık alanlarında yabancı çalışan ihtiyacı devam etmektedir.",
  "2026 itibarıyla Norveç; yüksek nitelikli çalışan (skilled worker) residence permit süreçleri, dijital kamu hizmetleri ve sık güncellenen maaş eşikleriyle öne çıkmaktadır. Tüm kesin şartlar Norwegian Directorate of Immigration (UDI) ve Work in Norway (NAV) kaynaklarından güncel teyit edilmelidir.",
];

export const NORVEC_SEO_KEYWORD_TAGS: string[] = [
  "norveç vize",
  "norveç oturum izni",
  "norway skilled worker permit",
  "udi residence permit norway",
  "schengen norveç 90 gün",
  "oslo çalışma izni",
  "eea norveç çalışma",
  "norveç nav work",
];

export const NORVEC_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize koşulları ve turistik giriş",
    h2: "Schengen, EEA ve Genel Giriş Belgeleri",
    lead:
      "Norveç Schengen üyesidir; AB üyesi değildir; EEA/EØS çerçevesinde ulusal çalışma ve oturum kuralları yürürlüktedir.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Norveç Schengen Bölgesi üyesidir; Avrupa Birliği üyesi değildir; Avrupa Ekonomik Alanı (EEA/EWR — Norveççede EØS) sistemine dahildir. Kısa süreli girişte Schengen düzenleri; uzun süreli çalışma ve oturmada Norveç ulusal permit sistemi ve UDI süreçleri esastır.",
        ],
      },
      {
        title: "Genel giriş ve başvuru belgeleri",
        paragraphs: ["Başvurularda çoğu zaman talep edilen evrakların özeti:"],
        bullets: [
          "Geçerli pasaport",
          "Finansal yeterlilik",
          "Sağlık sigortası",
          "Konaklama bilgisi",
          "Seyahat amacı",
          "Dönüş planı (uygulanabildiği ölçüde)",
        ],
      },
      {
        title: "Turistik vize ve kalış",
        paragraphs: [
          "Kısa süreli girişlerde C tipi Schengen vizesi ile ilişkilendirilen düzenlemeler anlatılır.",
          "Genellikle 180 gün içinde en fazla 90 gün kalış çerçevesi Schengen pratiğinin tipik özetidir; vize etiketinizdeki süre ve koşullar bireysel olarak geçerlidir.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi garantisi değildir; son karar sınır görevlilerine aittir.",
          "Norveç yüksek yaşam maliyetine sahip olduğu için finansal yeterlilik ciddi biçimde değerlendirme konusudur.",
        ],
      },
    ],
  },
  {
    id: "calisma-oturum",
    tocLabel: "Çalışma vizeleri ve oturum",
    h2: "Skilled Worker ve Residence Permit (UDI)",
    lead:
      "Norveç’in en yaygın çalışma–oturum hattı nitelikli çalışan residence permit’idir; süreç UDI üzerinden yürür.",
    accordions: [
      {
        title: "Skilled Worker Residence Permit",
        paragraphs: [
          "Norveç’te çalışmak için birçok senaryoda işveren temelli residence permit (skilled worker çizgisi) öne çıkar; meslek niteliği, maaş seviyesi ve diploma / deneyim uyumu değerlendirilir.",
        ],
        bullets: [
          "Norveç işvereninden iş teklifi",
          "Uygun maaş seviyesi (güncel eşikler UDI)",
          "Meslek yeterliliği ve eğitim–diploma uyumu",
          "İş sözleşmesi",
          "UDI başvurusu ve değerlendirme",
          "Onay sonrası giriş ve kayıtlar",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["Sık talep gören alanlara yönelik özet:"],
        bullets: [
          "Petrol ve gaz, yenilenebilir enerji",
          "Yazılım, yapay zekâ, teknoloji",
          "Denizcilik, balıkçılık teknolojileri",
          "Sağlık, mühendislik, inşaat",
        ],
      },
      {
        title: "Yatırımcı ve girişim hatları",
        paragraphs: [
          "Kendi işinizi kurma, yatırım veya girişim temelli izin türleri UDI’da ayrı başlıklarda tanımlanır; sermaye, iş planı ve Norveç ekonomisine katkı gibi kriterler başvuru türüne göre değişir.",
          "Güncel şartlar ve başvuru paketi için yalnızca resmî UDI kılavuzları ve duyuruları esas alınmalıdır.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili Norveç işi”, “hazır permit” veya “kesin residence” vaatlerine güvenmeyin; tüm kararlar UDI incelemesine bağlıdır.",
        },
      },
      {
        title: "Vatandaşlık (genel çerçeve)",
        paragraphs: [
          "Vatandaşlık başvuruları uzun süreli yasal ikamet, dil ve toplum bilgisi gibi şartlarla bağlantılıdır; süre ve testler sık güncellenir; kesin tabloyu UDI ve ilgili kamu sayfalarından doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma süreci",
    h2: "Sektörler, Platformlar ve Dil",
    lead:
      "Enerji, mühendislik, teknoloji, denizcılık ve sağlık güçlü iş piyasası alanlarıdır; ülke küçük nüfuslu olduğundan rekabet sektöre göre değişir.",
    accordions: [
      {
        title: "En güçlü sektörler",
        paragraphs: ["Özellikle öne çıkan alanlar:"],
        bullets: ["Enerji", "Mühendislik", "Teknoloji", "Denizcılık", "Sağlık"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada sık kullanılan kanallar:"],
        bullets: ["Work in Norway (NAV)", "Finn.no Jobs", "LinkedIn", "EURES Europe"],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "İngilizce teknoloji ve mühendislik sektöründe avantaj sağlayabilir.",
          "Ancak sağlık, kamu, müşteri ilişkileri ve eğitim gibi alanlarda Norveççe çoğu zaman belirleyicidir.",
          "Norveç küçük bir iş piyasasıdır; Almanya kadar geniş bir havuz beklenmemelidir; fakat uzman açığı belirli mesleklerde yüksektir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru, staj ve işyerinde eğitim",
    h2: "CV, Motivasyon, Staj ve Hybrid Çalışma",
    lead:
      "Norveç işverenleri sade, teknik ve ölçülebilir CV’leri; motivasyonda takım uyumu ve güvenilirliği önemser.",
    accordions: [
      {
        title: "CV ve başvuru",
        paragraphs: ["Norveç’te tercih edilen profil özetleri:"],
        bullets: [
          "Sade ve teknik odaklı",
          "Dürüst ve ölçülebilir deneyim",
          "Başarıların net ifadesi",
        ],
      },
      {
        title: "Motivasyon mektubu",
        paragraphs: [
          "İşverenler özellikle takım uyumu, güvenilirlik ve uzun vadeli çalışma isteği gibi konulara dikkat eder.",
        ],
      },
      {
        title: "Staj (traineeship)",
        paragraphs: [
          "Uluslararası staj olanakları enerji, mühendislik, teknoloji ve araştırma alanlarında öne çıkar.",
          "Norveç üniversiteleri ve araştırma merkezleri Avrupa projeleriyle bağlantılıdır.",
        ],
      },
      {
        title: "İşyerinde eğitim ve hybrid çalışma",
        paragraphs: [
          "Norveç iş kültüründe teknik eğitim, iş güvenliği, dijital yetkinlik ve ekip içi gelişim önem taşır.",
          "Özellikle teknoloji sektöründe hybrid ve uzaktan çalışma yaygındır.",
        ],
      },
    ],
  },
  {
    id: "konut-eea",
    tocLabel: "Konut, AB ikameti ve göç",
    h2: "Kira Gerçeği, EØS ve Üçüncü Ülkeler",
    lead:
      "Oslo ve büyük şehirlerde kiralar çok yüksektir; EØS vatandaşları ile üçüncü ülke vatandaşlarının çalışma ve oturum yolları farklıdır.",
    accordions: [
      {
        title: "Konut ve kira",
        paragraphs: [
          "Oslo başta olmak üzere büyük şehirlerde kira seviyeleri çok yüksektir.",
          "2026 itibarıyla yalnızca örnek bir aralık olarak Oslo merkez stüdyo için yaklaşık 1.300–2.300 EUR eşdeğeri bandı literatürde sık anlatılır; güncel rakamlar Finn ve piyasa koşullarına göre değişir.",
        ],
        bullets: ["Finn Real Estate", "Hybel.no"],
      },
      {
        title: "EEA sistemi ve AB ikameti",
        paragraphs: [
          "Norveç AB üyesi değil ancak EEA/EØS sistemine dahildir.",
          "EØS vatandaşları için çalışma ve kayıt süreçleri üçüncü ülke vatandaşlarına kıyasla genelde daha basit çerçevelerde anlatılır.",
          "AB dışı ülkelerden gelenlerde permit süreçleri daha kontrollü ve belge ağırlıklı ilerleyebilir.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış kontrol listesi",
    h2: "İlk Adımlar ve Dijital Kamu",
    lead:
      "Norveç dijital kamu hizmetlerinde ileri ülkeler arasındadır; varış sonrası kayıtlar disiplinle tamamlanmalıdır.",
    accordions: [
      {
        title: "İlk yapılması gerekenler",
        paragraphs: ["Varış sonrası öncelik sırası bireysel duruma göre değişir; tipik başlıklar:"],
        bullets: [
          "Residence permit kartı / kayıt",
          "Vergi numarası",
          "Banka hesabı",
          "Adres kaydı",
          "Sağlık sistemi kaydı",
          "Telefon hattı",
        ],
      },
      {
        title: "Dijital devlet",
        paragraphs: [
          "ID-porten benzeri dijital girişler ve çevrimiçi kamu hizmetleri günlük hayatta yaygındır; güvenlik ve gizlilik için resmî uygulama ve portal yönergelerine uyun.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-haklar",
    tocLabel: "İstihdam, sözleşme ve haklar",
    h2: "İş Sözleşmesi, Deneme ve İşten Çıkarma",
    lead:
      "Norveç iş hukuku güçlü çalışan koruması ve sendikal gelenekle bilinir.",
    accordions: [
      {
        title: "Sözleşme içerikleri",
        paragraphs: ["Yazılı sözleşmede aşağıdaki başlıkların bulunması beklenir:"],
        bullets: ["Maaş", "Çalışma süresi", "Deneme süresi", "İzin hakları", "Fesih şartları"],
      },
      {
        title: "Deneme süresi",
        paragraphs: [
          "Deneme süreleri iş ve sözleşme türüne göre değişir; tipik üst sınırlar için çoğu kaynak yaklaşık altı aya kadar uygulamalardan bahseder — kesin süreyi iş sözleşmeniz ve güncel İş Kanunu çerçevesi belirler.",
        ],
      },
      {
        title: "Fesih ve çalışan hakları",
        paragraphs: [
          "İşten çıkarma süreçleri sıkı kurallara bağlıdır.",
          "İş güvenliği, fazla mesai koruması, ayrımcılık yasağı ve sendikal haklar güçlü şekilde korunur.",
        ],
      },
    ],
  },
  {
    id: "vergi-saat-izin",
    tocLabel: "Ücret, vergi ve çalışma süresi",
    h2: "Maaş, Vergi, Haftalık Süre ve İzinler",
    lead:
      "Yüksek maaşlar yüksek vergi ve sosyal kesintilerle birlikte düşünülmelidir.",
    accordions: [
      {
        title: "Ücret ve vergi",
        paragraphs: [
          "Norveç Avrupa’nın yüksek maaşlı ülkeleri arasındadır.",
          "Gelir vergileri ve sosyal kesintiler ücret dilimine göre yüksek seviyelere çıkabilir.",
        ],
        bullets: ["Gelir vergisi", "Sosyal güvenlik", "Emeklilik katkıları"],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Standart tam zamanlı haftalık süre genellikle 37,5–40 saat bandında anlatılır.",
          "Uzaktan ve hybrid çalışma özellikle teknoloji sektöründe yaygındır.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Yıllık ücretli izinlerde çalışanların çoğu için asgari 25 iş günü bandı sık vurgulanır (kollektif sözleşme ve işveren politikasına göre üstü olabilir).",
        ],
        bullets: ["Hastalık izni", "Ebeveyn izni", "Eğitim izinleri", "Babalık izni"],
      },
    ],
  },
  {
    id: "emeklilik-denetim-sendika-meslek",
    tocLabel: "Fesih, emeklilik, denetim ve meslekî eğitim",
    h2: "Emeklilik, Denetim, Sendika ve Eğitim",
    lead:
      "Güçlü sosyal güvenlik, sık iş denetimi ve toplu sözleşme kültürü istihdamın tamamlayıcı yüzüdür.",
    accordions: [
      {
        title: "Emeklilik ve denetim",
        paragraphs: [
          "Norveç güçlü sosyal güvenlik ve emeklilik sistemine sahiptir.",
          "Çalışma koşulları devlet kurumları tarafından sıkı denetlenir.",
        ],
      },
      {
        title: "Sendika ve toplu iş uyuşmazlığı",
        paragraphs: [
          "Norveç Avrupa’nın en güçlü sendikal sistemlerinden birine sahiptir.",
          "Birçok sektörde maaş ve çalışma şartları toplu sözleşmelerle belirlenir.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "Teknik uzmanlık, apprenticeship ve meslekî eğitim altyapısı güçlüdür.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam maliyeti, sağlık, eğitim ve ulaşım",
    h2: "Maliyet, Sağlık, Eğitim, Kültür ve Ulaşım",
    lead:
      "Yaşam maliyeti çok yüksektir; hizmet kalitesi ve düzen genelde yüksek kabul edilir.",
    accordions: [
      {
        title: "Yaşam maliyeti ve sağlık",
        paragraphs: [
          "Norveç Avrupa’nın en pahalı ülkelerinden biridir.",
          "Yasal resident statüsündeki kişiler genel sağlık sistemine erişim çerçevesinde değerlendirilir; kayıt ve sigorta adımlarını süresinde tamamlayın.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Eğitim sistemi yüksek kaliteyle bilinir.",
          "Toplum genellikle sakin, bireysel, güven odaklı ve çevre duyarlı olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Oslo başta olmak üzere büyük şehirlerde toplu taşıma altyapısı gelişmiştir.",
        ],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin istihdam hakları güçlü yasal güvence altındadır.",
        ],
        bullets: ["İş uyarlamaları", "Sosyal destekler", "Rehabilitasyon programları"],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Uyarılar, 2026 Güncellemeleri ve Takip Listesi",
    lead:
      "Sahte iş ve permit vaatleri ile yaşam maliyeti gerçeği birlikte değerlendirilmelidir; mevzuat sık değişir.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Norveç işi”, “hazır permit”, “kesin residence” gibi vaatler yüksek risktir.",
          "Maaşlar yüksek olsa da kira, market, ulaşım, restoran ve enerji giderleri de çok yüksektir.",
          "Uzun kış ve düşük gün ışığı süreleri bazı yabancılar için uyum zorluğu yaratabilir.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: ["Güncel kriterler için temel kurumlar:"],
        bullets: [
          "Norwegian Directorate of Immigration (UDI)",
          "Work in Norway (NAV)",
          "Norwegian Labour Inspection Authority",
          "Norwegian Tax Administration",
          "Helse Norge (Health Norway)",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları resmî sitelerden izleyin:"],
        bullets: [
          "Skilled worker permit sistemi",
          "Maaş eşikleri",
          "Vergi düzenlemeleri",
          "Uzaktan çalışma politikaları",
          "Enerji sektörü istihdamı",
          "Residence permit süreçleri",
          "Sosyal güvenlik uygulamaları",
        ],
      },
    ],
  },
];
