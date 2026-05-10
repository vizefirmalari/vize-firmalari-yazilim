import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const ROMANYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Romanya; düşük yaşam maliyetleri, gelişen teknoloji sektörü, Avrupa Birliği üyeliği ve 2025 sonrası hızlanan Schengen entegrasyon süreci nedeniyle son yıllarda dikkat çeken ülkeler arasındadır. Yazılım geliştiriciler, çağrı merkezi çalışanları, mühendisler, lojistik personeli ve öğrenciler için önemli fırsatlar sunmaktadır.",
  "2026 itibarıyla Romanya’nın Schengen sistemine entegrasyonu; çalışma, turistik giriş ve residence permit süreçlerinde önemli değişikliklere yol açmıştır. Kesin kurallar için Romanian Immigration Inspectorate ve Ministry of Foreign Affairs güncel duyurularını esas alın.",
];

export const ROMANYA_SEO_KEYWORD_TAGS: string[] = [
  "romanya vize",
  "romanya oturum izni",
  "romania work permit",
  "schengen romanya 2026",
  "bükreş çalışma izni",
  "cluj it iş ilanı",
  "romanya residence permit",
  "romanian immigration",
];

export const ROMANYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize koşulları ve turistik giriş",
    h2: "Schengen, AB ve Kısa Süreli Kalış",
    lead:
      "Romanya AB üyesidir ve Schengen sistemine entegre olmuştur; kısa süreli girişte Schengen düzenleri esastır.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Romanya Avrupa Birliği üyesidir ve Schengen sistemine entegre edilmiştir. Kısa süreli seyahatte Schengen kuralları; uzun süreli çalışma ve oturmada ulusal work permit ve residence permit çerçeveleri birlikte uygulanır.",
        ],
      },
      {
        title: "Genel giriş belgeleri",
        paragraphs: ["Başvurularda çoğu zaman talep edilen evraklar:"],
        bullets: [
          "Geçerli pasaport",
          "Finansal yeterlilik",
          "Sağlık sigortası",
          "Konaklama bilgisi",
          "Seyahat amacı",
        ],
      },
      {
        title: "Turistik vize ve kalış",
        paragraphs: [
          "Kısa süreli girişlerde C tipi Schengen vizesi çerçevesi anlatılır.",
          "Genellikle 180 gün içinde en fazla 90 gün kalış Schengen pratiğinin tipik özetidir.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Romanya’nın Schengen sistemine tam entegrasyonu giriş süreçlerini önemli ölçüde değiştirmiştir; eski bilgilere güvenmeyin.",
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi anlamına gelmez; son karar sınır görevlilerine aittir.",
        ],
      },
    ],
  },
  {
    id: "calisma-is",
    tocLabel: "Çalışma vizeleri",
    h2: "Work Authorization, Uzun Süreli Vize ve Residence Permit",
    lead:
      "Çalışma süreci iş yetkilendirmesi, uzun süreli kalış vizesi ve residence permit adımlarıyla ilerler.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: ["Tipik akışın özeti (meslek ve ülkeye göre değişir):"],
        bullets: [
          "İşveren bulunur",
          "İşveren çalışma izni / work authorization başvurusu yapar",
          "Uzun süreli çalışma vizesi alınır",
          "Romanya’ya giriş yapılır",
          "Residence permit süreci tamamlanır",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın sık görüldüğü alanlar:"],
        bullets: [
          "Yazılım ve teknik destek",
          "Çağrı merkezi",
          "Lojistik",
          "Üretim ve otomotiv",
          "İnşaat ve sağlık",
        ],
      },
      {
        title: "Yatırımcı ve girişim hatları",
        paragraphs: [
          "Yatırım veya şirket kuruluşu temelli oturum hatları AB ve ulusal mevzuata bağlıdır; sermaye, istihdam yaratma ve sektör kriterleri başvuru türüne göre değişir.",
          "Güncel yatırım eşiklerini ve uygun kategorileri yalnızca resmî göç ve ticaret kaynaklarından doğrulayın.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili AB işi”, “hazır work permit” veya “kesin residence” vaatlerine güvenmeyin.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma süreci",
    h2: "Şehirler, Platformlar ve Teknoloji Merkezleri",
    lead:
      "Bükreş, Cluj-Napoca, Timișoara, Iași ve Brașov başlıca iş merkezleridir; outsourcing ve IT büyümesi belirgindir.",
    accordions: [
      {
        title: "Başlıca iş merkezleri",
        paragraphs: ["Öne çıkan kentler:"],
        bullets: ["Bükreş", "Cluj-Napoca", "Timișoara", "Iași", "Brașov"],
      },
      {
        title: "Teknoloji sektörü",
        paragraphs: [
          "Romanya Doğu Avrupa’nın önemli teknoloji merkezlerinden biri olarak anılır.",
          "Outsourcing, yazılım geliştirme, teknik destek ve siber güvenlik alanlarında büyüme kaydedilmiştir.",
        ],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["eJobs Romania", "BestJobs Romania", "Hipo Romania", "LinkedIn"],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "İngilizce teknoloji sektöründe avantaj sağlar.",
          "Kamu, müşteri ilişkileri ve sağlık alanlarında Romence çoğu zaman belirleyicidir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru, staj ve işyerinde eğitim",
    h2: "CV, Staj ve Hybrid Çalışma",
    lead:
      "Avrupa tipi sade CV; Erasmus+ ve şirket içi teknik eğitim yaygındır.",
    accordions: [
      {
        title: "CV ve motivasyon",
        paragraphs: [
          "Avrupa standartlarında sade, teknik ve ölçülebilir deneyim içeren CV’ler tercih edilir.",
          "Motivasyon mektubu özellikle uluslararası şirketlerde önemlidir.",
        ],
      },
      {
        title: "Staj (traineeship)",
        paragraphs: [
          "Staj alanları arasında yazılım, mühendislik, otomotiv, finans ve outsourcing öne çıkar.",
          "Romanya Erasmus+ ağında aktif ülkelerdendir.",
        ],
      },
      {
        title: "İşyerinde eğitim ve hybrid",
        paragraphs: [
          "Şirket içi eğitim teknoloji ve üretim sektörlerinde yaygındır.",
          "Remote ve hybrid çalışma modeli teknoloji sektöründe yaygınlaşmıştır.",
        ],
      },
    ],
  },
  {
    id: "oturum-vatandaslik",
    tocLabel: "Oturum ve vatandaşlık",
    h2: "Geçici Oturum, Kalıcı İkamet ve Vatandaşlık",
    lead:
      "Uzun süreli yaşamda residence permit temel yapı taşıdır; AB içi mobilite ve vatandaşlık yolu uzun vadeli planlamanın parçasıdır.",
    accordions: [
      {
        title: "Temporary residence",
        paragraphs: [
          "Çalışma, aile, eğitim veya yatırım gibi başlıklar altında geçici oturum izni süreçleri yürütülür; başvuru türüne göre belge seti değişir.",
        ],
      },
      {
        title: "AB avantajı",
        paragraphs: [
          "Romanya residence permit sistemi uzun vadede AB mobilitesi, Schengen erişimi ve uygun şartlarda vatandaşlık yolu ile ilişkilendirilebilir.",
          "AB vatandaşları çalışma ve ikamet prosedürlerinde genellikle daha hafif çerçevelerde değerlendirilir.",
        ],
      },
      {
        title: "Vatandaşlık",
        paragraphs: [
          "Romanya vatandaşlığı genellikle uzun süreli yasal ikamet, dil yeterliliği, entegrasyon ve temiz sicil unsurlarıyla ilişkilendirilir.",
          "Romanya bazı durumlarda çifte vatandaşlığa izin verebilir; ülkenizin mevzuatını da kontrol edin.",
        ],
      },
    ],
  },
  {
    id: "konut-ab",
    tocLabel: "Konut ve AB ikameti",
    h2: "Kira Seviyeleri ve Göç Çerçevesi",
    lead:
      "Batı Avrupa’ya göre görece düşük kira bandı cazip olsa da Bükreş’te fiyatlar artış gösterebilir.",
    accordions: [
      {
        title: "Konut ve kira",
        paragraphs: [
          "Batı Avrupa’ya kıyasla kira seviyeleri genellikle daha düşüktür.",
          "2026 itibarıyla örnek band olarak Bükreş merkez stüdyo için yaklaşık 450–950 EUR aralığı sık anlatılır; güncel ilanlar piyasaya göre değişir.",
        ],
        bullets: ["Imobiliare.ro", "Storia.ro"],
      },
      {
        title: "AB ikameti ve aile",
        paragraphs: [
          "Residence permit ile uzun vadeli ikamet ve aile birleşimi başlıkları ulusal mevzuata ve permit türüne bağlıdır.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış kontrol listesi",
    h2: "İlk Adımlar ve Kayıtlar",
    lead:
      "Varış sonrası ikamet, vergi numarası ve sağlık kaydı birlikte planlanmalıdır.",
    accordions: [
      {
        title: "İlk yapılması gerekenler",
        paragraphs: ["Öncelik sırası bireysel duruma göre değişir; tipik başlıklar:"],
        bullets: [
          "Residence permit süreçleri",
          "Vergi ve kimlik numarası ile ilgili kayıtlar (başvuru profiline göre)",
          "Banka hesabı",
          "Sağlık sistemi kaydı",
          "Adres kaydı",
          "Telefon hattı",
        ],
      },
      {
        title: "Dijital ve idari işlemler",
        paragraphs: [
          "Resmî portal ve konsolosluk duyurularında kayıt adımları güncellenebilir; süreleri profesyonel destekle teyit etmek faydalı olabilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "İş Sözleşmesi, Deneme ve Fesih",
    lead:
      "Romanya iş hukuku çalışma süresi, maaş, izin ve iş güvenliği alanlarını kapsar.",
    accordions: [
      {
        title: "Sözleşme içerikleri",
        paragraphs: ["Yazılı sözleşmede sık yer alan başlıklar:"],
        bullets: ["Maaş", "Çalışma süresi", "İzin hakları", "Deneme süresi", "Fesih koşulları"],
      },
      {
        title: "Deneme süresi ve fesih",
        paragraphs: [
          "Deneme süresi pozisyona ve sözleşmeye göre değişir.",
          "Fesih süreçleri belirli hukuki kurallara bağlıdır.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Temel koruma alanları:"],
        bullets: ["Fazla mesai koruması", "Ayrımcılık yasağı", "İş güvenliği", "İzin hakları"],
      },
    ],
  },
  {
    id: "vergi-izin-saat",
    tocLabel: "Ücret, vergi ve çalışma süresi",
    h2: "Vergi, Sosyal Güvenlik, 40 Saat ve İzinler",
    lead:
      "Gelir vergisi oranları görece düşük kabul edilebilir; maaş ve yaşam maliyeti birlikte değerlendirilmelidir.",
    accordions: [
      {
        title: "Ücret ve vergi",
        paragraphs: [
          "Romanya Avrupa’nın görece düşük gelir vergisi uygulayan ülkelerinden biri olarak anılır.",
          "Maaş seviyeleri Batı Avrupa’ya göre daha düşük olsa da yaşam maliyeti de genellikle daha düşüktür.",
        ],
      },
      {
        title: "Sosyal güvenlik",
        paragraphs: [
          "Çalışanlar sosyal güvenlik katkısı yapar; işveren ve çalışan payları sözleşme ve statüye bağlıdır.",
        ],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Genellikle haftalık 40 saat tam zamanlı çerçeve anlatılır.",
          "Teknoloji sektöründe remote çalışma yaygınlaşmıştır.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Yıllık ücretli izinde genellikle asgari 20 iş günü bandı sık vurgulanır; kollektif sözleşme ve işveren politikası fark yaratabilir.",
        ],
        bullets: ["Hastalık izni", "Ebeveyn izni", "Eğitim izinleri"],
      },
    ],
  },
  {
    id: "emeklilik-sendika-meslek",
    tocLabel: "Fesih, emeklilik, denetim ve meslekî eğitim",
    h2: "Emeklilik, Denetim, Sendika ve Teknik Eğitim",
    lead:
      "Sosyal güvenlikle emeklilik; sanayi ve kamuda sendikal yapı belirgindir.",
    accordions: [
      {
        title: "Emeklilik ve denetim",
        paragraphs: [
          "Romanya sosyal güvenlik sistemi çalışanları kapsar.",
          "Çalışma koşulları devlet kurumları tarafından denetlenir.",
        ],
      },
      {
        title: "Sendika ve toplu sözleşme",
        paragraphs: [
          "Sendikalar özellikle sanayi ve kamu sektörlerinde etkilidir.",
          "Bazı sektörlerde maaş ve çalışma şartları toplu sözleşmelerle belirlenir.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "Romanya mühendislik, teknik eğitim ve IT eğitimi alanlarında güçlü altyapıya sahiptir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam maliyeti, sağlık ve ulaşım",
    h2: "Maliyet, Sağlık, Eğitim, Kültür ve Ulaşım",
    lead:
      "Yaşam maliyeti Batı Avrupa’ya göre düşük seviyelerde olabilir; kamu–özel sağlık birlikte çalışır.",
    accordions: [
      {
        title: "Yaşam maliyeti ve sağlık",
        paragraphs: [
          "Genel yaşam maliyeti Batı Avrupa’ya göre daha düşük seviyelerde görülebilir.",
          "Kamu ve özel sağlık sistemi birlikte çalışmaktadır; sigorta ve kayıt koşullarını güncel düzenlemelerle doğrulayın.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Üniversite sistemi AB standartlarına entegredir.",
          "Toplum genellikle sosyal, aile odaklı ve geleneksel olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Bükreş başta olmak üzere büyük şehirlerde toplu taşıma gelişmiştir.",
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
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Riskler ve Güncel Takip (2026)",
    lead:
      "Sahte iş teklifleri, kayıt dışı çalışma ve Schengen hakkında eski bilgiler ciddi risktir.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili AB işi”, “hazır work permit” veya “kesin residence” vaatlerinden kaçının.",
          "Bazı sektörlerde kayıt dışı çalışma teklifleri görülebilir; yalnızca yasal sözleşme ve izin hatlarıyla ilerleyin.",
          "Romanya’nın Schengen entegrasyonu hakkında dolaşan yanlış veya eski bilgilere güvenmeyin.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: ["Güncel mevzuat ve iş ilanları için temel referanslar:"],
        bullets: [
          "Romanian Immigration Inspectorate",
          "Romanian Ministry of Foreign Affairs",
          "eJobs Romania (bağlam: iş piyasası)",
          "Romanian Labour Inspection",
          "Romanian Tax Authority",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları izleyin:"],
        bullets: [
          "Schengen uygulamaları ve sınır süreçleri",
          "Work permit sistemi",
          "Residence permit süreçleri",
          "Vergi düzenlemeleri",
          "Uzaktan çalışma politikaları",
          "Sosyal güvenlik sistemi",
          "Göç mevzuatı",
        ],
      },
    ],
  },
];
