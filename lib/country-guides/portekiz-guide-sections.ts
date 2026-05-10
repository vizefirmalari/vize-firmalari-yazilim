import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const PORTEKIZ_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Portekiz; Schengen erişimi, yüksek yaşam kalitesi, görece düşük Batı Avrupa yaşam maliyetleri, dijital göçebe sistemi ve yatırımcı odaklı oturum programları nedeniyle Avrupa’nın yoğun göç alan ülkelerinden biri hâline gelmiştir. Uzaktan çalışanlar, teknoloji profesyonelleri, yatırımcılar, emekliler ve startup kurucuları için özellikle caziptir.",
  "2026 itibarıyla Golden Visa, dijital göçebe oturumları ve çalışma temelli residence permit süreçlerinde yeni düzenlemeler ile daha sıkı finansal incelemeler uygulanmaktadır. Kesin şartlar ve güncel yatırım kategorileri için AIMA, ePortugal ve Portuguese Tax Authority kaynaklarından teyit alınmalıdır.",
];

export const PORTEKIZ_SEO_KEYWORD_TAGS: string[] = [
  "portekiz vize",
  "portekiz oturum izni",
  "portugal d8 digital nomad",
  "golden visa portugal 2026",
  "lisbon residence permit",
  "schengen portekiz 90 gün",
  "portekiz nhr",
  "aima portugal",
];

export const PORTEKIZ_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize koşulları ve turistik giriş",
    h2: "Schengen, AB ve Kısa Süreli Kalış",
    lead:
      "Portekiz hem Schengen hem AB üyesidir; kısa süreli seyahatte Schengen düzenleri ve ulusal kontroller birlikte ele alınır.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Portekiz Schengen Bölgesi üyesidir ve Avrupa Birliği üyesidir. Uzun süreli çalışma, yatırım ve oturumda Portekiz’in kendi residence permit ve vize politikaları ile AB serbest dolaşım kuralları birlikte değerlendirilir.",
        ],
      },
      {
        title: "Genel giriş belgeleri",
        paragraphs: ["Çoğu başvuruda sık talep edilen evraklar:"],
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
          "Kısa süreli girişlerde C tipi Schengen vizesi çerçevesi anlatılır.",
          "Genellikle 180 gün içinde en fazla 90 gün kalış hakkı Schengen pratiğinin tipik özetidir; vize etiketinizdeki süre ve koşullar esas alınır.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi anlamına gelmez; son karar sınır görevlilerine aittir.",
          "Schengen ihlalleri giriş yasağı, vize reddi ve Schengen kaydı riskleri doğurabilir; kalış sürelerini ve damga kurallarını titiz izleyin.",
        ],
      },
    ],
  },
  {
    id: "calisma-is",
    tocLabel: "Çalışma vizeleri",
    h2: "Residence Permit for Work ve İşveren Sponsorluğu",
    lead:
      "Çalışma sistemi çoğu senaryoda işveren sponsorluğu, iş sözleşmesi ve residence permit ile ilerler.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: ["Tipik akışın özeti (bireysel duruma göre değişir):"],
        bullets: [
          "İşveren bulunur",
          "İş sözleşmesi hazırlanır",
          "Uygun vize / başvuru adımları yürütülür",
          "Portekiz’e giriş ve kayıtlar tamamlanır",
          "Residence permit süreci finalize edilir",
        ],
      },
      {
        title: "Yoğun sektörler",
        paragraphs: ["İstihdamın sık anıldığı alanlar:"],
        bullets: [
          "Yazılım ve dijital hizmetler",
          "Turizm",
          "Çağrı merkezi",
          "Sağlık",
          "İnşaat ve lojistik",
          "Startup ekosistemi",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma süreci",
    h2: "Şehirler, Platformlar ve Teknoloji Ekosistemi",
    lead:
      "Lizbon ve Porto başlıca iş merkezleridir; startup ve Web Summit etkisi teknoloji sektörünü büyütmüştür.",
    accordions: [
      {
        title: "Başlıca iş merkezleri",
        paragraphs: ["Öne çıkan kentler:"],
        bullets: ["Lizbon", "Porto", "Braga"],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["IEFP Portugal", "Net-Empregos", "Landing.jobs", "LinkedIn"],
      },
      {
        title: "Teknoloji sektörü",
        paragraphs: [
          "Portekiz son yıllarda Avrupa startup merkezlerinden biri olarak anılır.",
          "Web Summit etkisi, dijital göçebe akışı ve yabancı startup yatırımları sektör büyümesine katkı sağlamıştır.",
        ],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "İngilizce teknoloji ve turizm sektöründe avantaj sağlar.",
          "Müşteri ilişkileri, kamu ve sağlık alanlarında Portekizce genellikle belirleyicidir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru, staj ve işyerinde eğitim",
    h2: "CV, Staj ve Hybrid Çalışma Kültürü",
    lead:
      "Avrupa standartlarına uygun CV ve net motivasyon; Erasmus+ ve uluslararası şirket kültürü yaygındır.",
    accordions: [
      {
        title: "CV ve başvuru",
        paragraphs: [
          "Portekiz’de Avrupa standartlarına uygun, okunaklı ve gerçeklere dayalı CV tercih edilir.",
        ],
      },
      {
        title: "Motivasyon mektubu",
        paragraphs: [
          "Özellikle uluslararası şirketlerde takım uyumu, teknik yetkinlik ve uzun vadeli plan önem taşır.",
        ],
      },
      {
        title: "Staj (traineeship)",
        paragraphs: [
          "Uluslararası staj sisteminde teknoloji, turizm, mühendislik ve uluslararası şirketler öne çıkar.",
          "Portekiz Erasmus+ ağında aktif ülkelerdendir.",
        ],
      },
      {
        title: "İşyerinde eğitim",
        paragraphs: [
          "Teknoloji ve uluslararası şirketlerde hybrid çalışma, dijital eğitim ve teknik sertifikasyon yaygındır.",
        ],
      },
    ],
  },
  {
    id: "golden-d8",
    tocLabel: "Yatırımcı vizeleri ve dijital göçebe",
    h2: "Golden Visa ve D8 Digital Nomad",
    lead:
      "Golden Visa tamamen kapanmamış olsa da klasik konut odaklı model büyük ölçüde değişmiştir; D8 uzaktan gelir odaklı popüler bir çizgidir.",
    accordions: [
      {
        title: "Golden Visa güncel gerçeği",
        paragraphs: [
          "Portekiz Golden Visa sistemi tamamen kapanmamıştır ancak önemli değişiklikler yapılmıştır.",
          "Klasik konut gayrimenkul yatırımı modeli büyük ölçüde kaldırılmış veya kısıtlanmıştır; güncel uygun yatırım alanları resmî AIMA / yasal metinlerden doğrulanmalıdır.",
        ],
        callout: {
          variant: "warning",
          text: "“Gayrimenkulle otomatik vatandaşlık”, “kesin Golden Visa” veya “vergisiz yaşam garantisi” vaatlerine güvenmeyin.",
        },
      },
      {
        title: "Güncel uygun yatırım alanları (özet)",
        paragraphs: [
          "Literatürde sık anılan başlıklar; kesin listeyi güncel düzenlemelerle teyit edin:",
        ],
        bullets: [
          "Yatırım fonları",
          "Bilimsel araştırma",
          "Kültürel yatırım",
          "Şirket yatırımı ve iş oluşturma",
        ],
      },
      {
        title: "Golden Visa ile ilişkilendirilen avantajlar (genel)",
        paragraphs: [
          "Program kapsamı ve haklar bireysel başvuru türüne göre değişir; aşağıdakiler çerçeve olarak anılır:",
        ],
        bullets: ["Schengen erişimi", "AB ikamet yolu", "Vatandaşlık potansiyeli (şartlar sağlandığında)", "Düşük fiziksel bulunma beklentisi (kategoriye göre)"],
      },
      {
        title: "D8 Digital Nomad",
        paragraphs: [
          "Portekiz Avrupa’daki en popüler dijital göçebe sistemlerinden biridir.",
          "Uzaktan çalışanlar, freelancerlar ve online gelir sahipleri başvuru kapsamında değerlendirilebilir.",
        ],
        bullets: ["Düzenli gelir kanıtı", "Konaklama", "Sağlık sigortası", "Yurt dışı gelir modeli"],
      },
    ],
  },
  {
    id: "oturum-vatandaslik",
    tocLabel: "Oturum ve vatandaşlık",
    h2: "Geçici Oturum, Daimi İkamet ve Vatandaşlık",
    lead:
      "Uzun süreli yaşamda temporary residence permit temel yapı taşıdır; ardından kalıcı ikamet ve vatandaşlık yolları değerlendirilebilir.",
    accordions: [
      {
        title: "Temporary Residence Permit — başlıca kategoriler",
        paragraphs: ["Uzun süreli yaşam için anılan temel hatlar:"],
        bullets: ["Çalışma", "Startup", "Dijital göçebe", "Aile birleşimi", "Yatırımcı", "Eğitim"],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Uzun süreli yasal ikamet ve şartların sağlanması hâlinde kalıcı ikamet başvurusu yapılabileceği anlatılır; süre ve koşullar permit türüne göre değişir.",
        ],
      },
      {
        title: "Vatandaşlık",
        paragraphs: [
          "Portekiz vatandaşlığı genellikle belirli süre yasal ikamet, dil yeterliliği ve temiz sicil gibi unsurlarla ilişkilendirilir; süre ve testler sık güncellenir.",
          "Portekiz çifte vatandaşlığa izin veren ülkeler arasında sayılır; ülkenizin mevzuatını da kontrol edin.",
        ],
      },
    ],
  },
  {
    id: "konut-ab-aile",
    tocLabel: "Konut, AB ikameti ve aile",
    h2: "Kira Krizi, AB Mobilitesi ve Aile Birleşimi",
    lead:
      "Lizbon ve Porto’da kira baskısı yüksektir; residence permit uzun vadede AB mobilitesi ve vatandaşlık yolunu ilişkilendirebilir.",
    accordions: [
      {
        title: "Konut ve kira",
        paragraphs: [
          "Lizbon ve Porto’da son yıllarda ciddi kira artışları kaydedilmiştir.",
          "2026 itibarıyla yalnızca örnek band olarak Lizbon merkez stüdyo için yaklaşık 1.100–2.200 EUR aralığı sık anlatılır; güncel ilanlar piyasaya göre değişir.",
        ],
        bullets: ["Idealista Portugal", "Imovirtual"],
      },
      {
        title: "AB avantajı ve aile birleşimi",
        paragraphs: [
          "Portekiz residence permit sistemi uzun vadede AB içi mobilite, Schengen erişimi ve uygun şartlarda vatandaşlık yolu ile ilişkilendirilebilir.",
          "Aile üyeleri belirli koşullarla residence permit başvurusunda değerlendirilebilir; mesele hukuki olarak permit türüne bağlıdır.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış kontrol listesi",
    h2: "NIF, Banka ve Kamu Kayıtları",
    lead:
      "Portekiz’de birçok işlem için NIF (vergi numarası) ve sıralı kayıtlar gereklidir.",
    accordions: [
      {
        title: "İlk yapılması gerekenler",
        paragraphs: ["Varış sonrası öncelikler bireysel duruma göre değişir:"],
        bullets: [
          "NIF numarası",
          "Banka hesabı",
          "Residence permit süreçleri",
          "Sağlık kaydı",
          "Belediye kaydı",
          "Telefon hattı",
        ],
      },
      {
        title: "NIF sistemi",
        paragraphs: [
          "Portekiz’de kira, istihdam, vergi ve çok sayıda idari işlem için NIF gerekebilir; edinim yollarını ePortugal ve güncel rehberlerden doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "İş Sözleşmesi, Deneme ve Fesih",
    lead:
      "Portekiz iş hukuku çalışan koruması içerir; fesih prosedürlere tabidir.",
    accordions: [
      {
        title: "Sözleşme içerikleri",
        paragraphs: ["Sözleşmede sık yer alan başlıklar:"],
        bullets: ["Maaş", "Çalışma süresi", "İzin hakları", "Deneme süresi", "Fesih koşulları"],
      },
      {
        title: "İşten çıkarma ve çalışan hakları",
        paragraphs: [
          "Fesih süreçleri belirli hukuki prosedürlere bağlıdır.",
          "Fazla mesai koruması, ayrımcılık yasağı ve izin hakları yasal güvence altındadır.",
        ],
      },
    ],
  },
  {
    id: "vergi-izin-saat",
    tocLabel: "Ücret, vergi ve çalışma süresi",
    h2: "Vergi, NHR Değişiklikleri, 40 Saat ve İzinler",
    lead:
      "Progresif gelir vergisi ve sosyal güvenlik primleri maaşı netleştirir; NHR rejimi önemli ölçüde değişmiştir.",
    accordions: [
      {
        title: "Vergi sistemi ve NHR",
        paragraphs: [
          "Portekiz progresif gelir vergisi sistemi uygular.",
          "Eski NHR vergi modeli önemli ölçüde değişmiş veya sınırlandırılmıştır; güncel istisna ve oranları Portuguese Tax Authority duyurularından izleyin.",
        ],
      },
      {
        title: "Sosyal güvenlik",
        paragraphs: [
          "Çalışanlar sosyal güvenlik sistemine katkı yapar; işveren ve çalışan payları sözleşme ve statüye bağlıdır.",
        ],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Genellikle haftalık 40 saat tam zamanlı çerçeve anlatılır.",
          "Portekiz Avrupa’nın popüler remote work merkezlerindendir.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Yıllık ücretli izinde genellikle asgari 22 iş günü bandı sık vurgulanır; kollektif sözleşme ve işveren politikası üstünü etkileyebilir.",
        ],
        bullets: ["Hastalık izni", "Doğum izni", "Eğitim izinleri", "Ebeveyn izinleri"],
      },
    ],
  },
  {
    id: "emeklilik-sendika-meslek",
    tocLabel: "Fesih, emeklilik, denetim ve meslekî eğitim",
    h2: "Emeklilik, Denetim, Sendika ve Meslekî Eğitim",
    lead:
      "Sosyal güvenlik kapsamlıdır; sendikalar kamu ve sanayide görünürlük taşır.",
    accordions: [
      {
        title: "Emeklilik ve denetim",
        paragraphs: [
          "Portekiz sosyal güvenlik sistemi kapsamlı yapı olarak anlatılır.",
          "Çalışma koşulları devlet kurumları tarafından denetlenebilir.",
        ],
      },
      {
        title: "Sendika ve toplu iş uyuşmazlığı",
        paragraphs: [
          "Sendikalar özellikle kamu ve sanayi sektörlerinde etkilidir.",
          "Bazı sektörlerde maaş ve çalışma şartları toplu iş sözleşmeleriyle belirlenir.",
        ],
      },
      {
        title: "Meslekî eğitim",
        paragraphs: [
          "Portekiz teknik eğitim, meslekî sertifikasyon ve yaşam boyu eğitimde AB programlarına entegredir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam maliyeti, sağlık ve ulaşım",
    h2: "Maliyet, Sağlık, Eğitim, Kültür ve Ulaşım",
    lead:
      "Batı Avrupa ortalamasına göre bazı kalemlerde görece uygunluk görülebilir; büyük şehirlerde kira baskısı yüksektir.",
    accordions: [
      {
        title: "Yaşam maliyeti ve sağlık",
        paragraphs: [
          "Genel yaşam maliyeti Batı Avrupa’ya kıyasla bazı alanlarda daha düşük sunabildiği anlatılır; kira ve büyük şehirlerdeki maliyetler dikkatle planlanmalıdır.",
          "Yasal resident kişiler kamu sağlık sisteminden yararlanma çerçevesinde değerlendirilir.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Üniversite sistemi AB standartlarına entegredir.",
          "Toplum genellikle sosyal, sıcak, aile odaklı ve rahat yaşam kültürüyle tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Lizbon ve Porto’da toplu taşıma sistemleri gelişmiştir.",
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
    h2: "Uyarılar ve Güncel Takip (2026)",
    lead:
      "Yanlış Golden Visa beklentileri, kira krizi ve vergi planlaması riskleri birlikte yönetilmelidir.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Gayrimenkulle otomatik vatandaşlık”, “kesin Golden Visa” veya “vergisiz yaşam garantisi” vaatlerinden kaçının.",
          "Lizbon ve Porto’da konut maliyetleri ciddi biçimde yükselmiştir.",
          "Dijital göçebeler, freelancerlar ve yatırımcılar için vergi planlaması profesyonel destek gerektirebilir.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: ["Güncel politika ve başvuru için temel kurumlar:"],
        bullets: ["AIMA Portugal", "ePortugal", "IEFP Portugal", "Portuguese Tax Authority", "SNS Portugal Health System"],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları izleyin:"],
        bullets: [
          "Golden Visa sistemi",
          "Dijital göçebe vizesi",
          "Residence permit süreçleri",
          "Vergi düzenlemeleri",
          "Kira politikaları",
          "Çalışma izinleri",
          "Vatandaşlık süreçleri",
        ],
      },
    ],
  },
];
