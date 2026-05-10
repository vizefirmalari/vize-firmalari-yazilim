import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const SLOVENYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Slovenya; Schengen ve Avrupa Birliği üyeliği, güvenli yaşam yapısı, merkezi Avrupa konumu ve gelişen teknoloji–lojistik–üretim ekonomisi nedeniyle son yıllarda dikkat çeken ülkelerdendir. Mühendislik, üretim, lojistik, yazılım ve hizmet sektörlerinde yabancı çalışan ihtiyacı artmaktadır.",
  "2025–2026 döneminde göç mevzuatındaki değişikliklerle yüksek nitelikli çalışanlar ve yabancı iş gücü için permit süreçleri hızlandırılmıştır. Kesin şartlar için Entry and Residence Slovenia, Employment Service of Slovenia ve güncel konsolosluk duyurularını esas alın.",
];

export const SLOVENYA_SEO_KEYWORD_TAGS: string[] = [
  "slovenya vize",
  "slovenya oturum izni",
  "slovenia single permit",
  "eu blue card slovenia",
  "ljubljana work permit",
  "schengen slovenia 90 gün",
  "mojedelo slovenia",
  "employment service slovenia",
];

export const SLOVENYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize koşulları ve turistik giriş",
    h2: "Schengen, AB ve Kısa–Uzun Süreli Giriş",
    lead:
      "Slovenya AB ve Schengen üyesidir; kısa süreli seyahatte Schengen kuralları, uzun süreli kalışta ulusal vize ve permit süreçleri devreye girer.",
    accordions: [
      {
        title: "Statü özeti",
        paragraphs: [
          "Slovenya Avrupa Birliği ve Schengen Bölgesi üyesidir. Kısa süreli girişlerde Schengen düzenleri; çalışma ve uzun süreli ikamette Slovenya göç ve istihdam mevzuatı birlikte uygulanır.",
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
          "Dönüş planı (uygulanabildiği ölçüde)",
        ],
      },
      {
        title: "Turistik vize (C tipi)",
        paragraphs: [
          "Kısa süreli girişlerde C tipi Schengen vizesi çerçevesi anlatılır.",
          "Genellikle 180 gün içinde en fazla 90 gün kalış hakkı Schengen pratiğinin tipik özetidir.",
        ],
      },
      {
        title: "D tipi ulusal vize",
        paragraphs: [
          "Uzun süreli giriş senaryolarında D tipi ulusal vize kullanılabileceği anlatılır; başvuru profiline göre single permit ve ikamet hatlarıyla birleştirilir.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize tek başına kesin sınır girişi garantisi değildir.",
          "Schengen ihlalleri giriş yasağı ve kayıt riskleri doğurabilir.",
        ],
      },
    ],
  },
  {
    id: "oturum-single-permit",
    tocLabel: "Oturum ve single permit",
    h2: "Single Residence and Work Permit",
    lead:
      "Çalışma ve uzun süreli yaşam büyük ölçüde single permit sistemi ile tek çatı altında yürütülür.",
    accordions: [
      {
        title: "Single permit nedir?",
        paragraphs: [
          "Bu sistem oturum izni ile çalışma izni süreçlerini tek permit altında birleştirdiği için anlatılır; kesin kapsam başvuru türüne göre değişir.",
        ],
      },
      {
        title: "İlk permit süresi",
        paragraphs: [
          "İlk permit çoğu durumda iş sözleşmesi süresi kadar ve maksimum iki yıla kadar düzenlenebileceği şekilde özetlenir.",
        ],
      },
      {
        title: "Permit uzatma",
        paragraphs: [
          "İlk uzatmaların çoğu zaman maksimum üç yıla kadar verilebildiği anlatılır; güncel süreleri resmî kaynaklardan doğrulayın.",
        ],
      },
      {
        title: "Kalıcı ve uzun dönem ikamet",
        paragraphs: [
          "Uzun süreli yasal ikamet sonrasında permanent residence veya AB uzun süreli ikamet (EU long-term residence) yolları değerlendirilebilir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Sloven Vatandaşlığı ve Çifte Vatandaşlık",
    lead:
      "Vatandaşlık genellikle uzun ikamet, entegrasyon ve dil yeterliliği ile ilişkilendirilir.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Sloven vatandaşlığı genellikle uzun süreli yasal ikamet, entegrasyon, dil yeterliliği ve temiz sicil unsurlarıyla ilerlemektedir.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Bazı durumlarda çifte vatandaşlık mümkün olabilmektedir; kişisel durum ve ülkeniz mevzuatını birlikte değerlendirin.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma ve EU Blue Card",
    h2: "İşveren Sponsorluğu, İş Gücü Piyasası ve Blue Card",
    lead:
      "Yabancı çalışan sistemi işveren sponsorluğu, iş gücü piyasası değerlendirmesi ve single permit ile ilerler.",
    accordions: [
      {
        title: "Genel çalışma süreci",
        paragraphs: ["Sık anlatılan adımların özeti:"],
        bullets: [
          "İşveren bulunur",
          "İş sözleşmesi hazırlanır",
          "Single permit başvurusu yapılır",
          "Employment Service onayı alınır",
          "Residence card düzenlenir",
        ],
      },
      {
        title: "EU Blue Card",
        paragraphs: [
          "Yüksek nitelikli çalışanlar için AB Blue Card çerçevesi uygulanır; diploma, sözleşme süresi ve maaş eşiği gibi kriterler güncel düzenlemeye bağlıdır.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın sık görüldüğü alanlara örnekler:"],
        bullets: [
          "Lojistik ve yazılım",
          "Üretim ve mühendislik",
          "Otomotiv yan sanayi",
          "Turizm, sağlık ve inşaat",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Dil",
    lead:
      "Ljubljana başta olmak üzere birkaç merkez iş ve lojistik yoğunlaşmasını taşır.",
    accordions: [
      {
        title: "Başlıca iş merkezleri",
        paragraphs: ["Öne çıkan kentler:"],
        bullets: ["Ljubljana", "Maribor", "Celje", "Koper", "Novo Mesto"],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["Employment Service of Slovenia", "Mojedelo", "EURES Europe", "LinkedIn"],
      },
      {
        title: "İş piyasası özeti",
        paragraphs: [
          "Slovenya özellikle lojistik, teknik üretim, mühendislik, IT ve turizm alanlarında yabancı çalışan kabule açık profiller çizer.",
        ],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "İngilizce teknoloji ve uluslararası şirketlerde avantaj sağlayabilir.",
          "Müşteri ilişkileri, kamu ve sağlık alanlarında Slovence güçlü avantajdır.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj-egitim",
    tocLabel: "Başvuru, staj ve işyerinde eğitim",
    h2: "Başvuru Kanalları, Belgeler ve Eğitim",
    lead:
      "Başvurular konsolosluk, temsilcilik veya Slovenya’daki idari birimler üzerinden yürütülebilir.",
    accordions: [
      {
        title: "Başvuru noktaları",
        paragraphs: [
          "Başvurular Sloven konsoloslukları ve diplomatik temsilcilikler ile Slovenya’daki administrative units üzerinden yapılabileceği anlatılır.",
        ],
      },
      {
        title: "Sık istenen belgeler",
        paragraphs: ["Çoğu durumda talep edilen evrak örnekleri:"],
        bullets: [
          "İş sözleşmesi",
          "Pasaport ve biyometri",
          "Sağlık sigortası",
          "Sabıka kaydı",
          "Finansal kanıt",
          "Konut bilgisi",
        ],
      },
      {
        title: "Staj (traineeship)",
        paragraphs: [
          "Staj alanları arasında mühendislik, lojistik, IT, üretim ve araştırma öne çıkar.",
          "Slovenya Erasmus+ sisteminde aktif ülkelerdendir.",
        ],
      },
      {
        title: "İşyerinde eğitim ve hybrid",
        paragraphs: [
          "Sanayi, üretim, teknik bakım ve lojistikte şirket içi eğitim önemlidir.",
          "IT ve teknoloji sektöründe hybrid çalışma yaygınlaşmaktadır.",
        ],
      },
    ],
  },
  {
    id: "konut-ab-varis",
    tocLabel: "Konut, AB ikameti ve varış",
    h2: "Kira, AB Mobilitesi ve İlk Kayıtlar",
    lead:
      "Yaşam maliyeti Batı Avrupa’ya göre genelde daha uygundur; Ljubljana kira bandı dikkatle planlanmalıdır.",
    accordions: [
      {
        title: "Konut ve kira",
        paragraphs: [
          "Yaşam maliyeti Batı Avrupa’ya göre daha düşük seviyelerde görülebilir.",
          "2026 itibarıyla örnek band olarak Ljubljana merkez stüdyo için yaklaşık 650–1.300 EUR aralığı sık anlatılır.",
        ],
        bullets: ["nepremicnine.si", "bolha.com"],
      },
      {
        title: "AB ikameti",
        paragraphs: [
          "Sloven residence permit sistemi Schengen erişimi, AB içi mobilite ve uygun şartlarda vatandaşlık yolu ile ilişkilendirilebilir.",
          "AB/EEA vatandaşları residence işlemlerinde genellikle daha hafif prosedürlerle anılır.",
        ],
      },
      {
        title: "Varış kontrol listesi",
        paragraphs: ["Varış sonrası tipik başlıklar:"],
        bullets: [
          "Residence card",
          "Vergi numarası",
          "Sağlık sigortası",
          "Adres kaydı",
          "Banka hesabı",
          "Telefon hattı",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "Sözleşme, Deneme ve Fesih",
    lead:
      "Sloven iş hukuku çalışan koruması içerir; fesih prosedürlere bağlıdır.",
    accordions: [
      {
        title: "Sözleşme içerikleri",
        paragraphs: ["Yazılı sözleşmede sık yer alan başlıklar:"],
        bullets: ["Maaş", "Çalışma süresi", "Deneme süresi", "İzin hakları", "Fesih şartları"],
      },
      {
        title: "Fesih ve çalışan hakları",
        paragraphs: [
          "Fesih süreçleri belirli yasal prosedürlere bağlıdır.",
        ],
        bullets: ["İş güvenliği", "Fazla mesai koruması", "Ayrımcılık yasağı", "İzin hakları"],
      },
    ],
  },
  {
    id: "vergi-izin-emeklilik",
    tocLabel: "Ücret, vergi, izin ve emeklilik",
    h2: "Vergi, Çalışma Süresi, İzin ve Sosyal Güvenlik",
    lead:
      "Gelir vergisi ve sosyal güvenlik katkıları net ücreti belirler; haftalık süre ve uzaktan çalışma sektöre göre değişir.",
    accordions: [
      {
        title: "Ücret ve vergi",
        paragraphs: [
          "Slovenya gelir vergisi, sosyal güvenlik ve sağlık katkısı uygular.",
          "Brüt maaş Batı Avrupa’dan düşük görünse de yaşam maliyeti de genelde daha düşüktür.",
        ],
      },
      {
        title: "Çalışma süresi ve remote çalışma",
        paragraphs: [
          "Genellikle haftalık 40 saat tam zamanlı çerçeve anlatılır.",
          "Teknoloji sektöründe remote ve hybrid çalışma yaygınlaşmaktadır.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Çalışanlar genellikle ücretli yıllık izin hakkına sahiptir; sektör ve toplu sözleşme fark yaratabilir.",
        ],
        bullets: ["Hastalık izni", "Ebeveyn izinleri", "Eğitim izinleri"],
      },
      {
        title: "Emeklilik ve denetim",
        paragraphs: [
          "Slovenya sosyal güvenlik temelli emeklilik sistemi uygular.",
          "Çalışma koşulları devlet kurumları tarafından denetlenebilir.",
        ],
      },
      {
        title: "Sendika ve meslekî eğitim",
        paragraphs: [
          "Sendikalar özellikle sanayi ve kamu sektörlerinde etkilidir; bazı sektörlerde toplu iş sözleşmeleri maaş ve çalışma şartlarını belirler.",
          "Slovenya mühendislik, teknik üretim, lojistik ve sanayi teknolojilerinde güçlü eğitim altyapısına sahiptir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam, sağlık ve kültür",
    h2: "Maliyet, Sağlık, Eğitim, Kültür ve Ulaşım",
    lead:
      "Yaşam maliyeti orta Avrupa bandında; toplum genelde düzenli ve doğa odaklı tanımlanır.",
    accordions: [
      {
        title: "Yaşam maliyeti ve sağlık",
        paragraphs: [
          "Yaşam maliyeti orta Avrupa ortalamasında kabul edilebilir.",
          "Resident kişiler Sloven kamu sağlık sisteminden yararlanma çerçevesinde değerlendirilir.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Slovenya AB eğitim sistemine entegredir.",
          "Toplum genellikle düzenli, güvenli, doğa odaklı ve sakin olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Ljubljana başta olmak üzere ulaşım altyapısı gelişmiştir.",
        ],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin çalışma hakları yasal güvence altındadır.",
        ],
        bullets: ["İş uyarlamaları", "Rehabilitasyon programları", "Sosyal destekler"],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Riskler ve Güncel Takip (2026)",
    lead:
      "Sahte iş vaatleri, permit şartlarının ihlali ve eksik tercüme belgeleri ciddi risk taşır.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Slovenya işi”, “hazır permit” veya “kesin residence” vaatlerine güvenmeyin.",
          "Permit şartlarının kaybedilmesi ikamet iptaline yol açabilir.",
          "Eksik tercüme veya apostil eksiklikleri süreçleri ciddi şekilde uzatabilir.",
        ],
      },
      {
        title: "Resmî kaynakları izleme",
        paragraphs: ["Güncel politika ve başvurular için örnek kaynaklar:"],
        bullets: [
          "Government of Slovenia – Foreign Workers",
          "Employment Service of Slovenia",
          "Entry and Residence Slovenia",
          "I Feel Slovenia",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Özellikle şu başlıkları izleyin:"],
        bullets: [
          "Single permit sistemi",
          "EU Blue Card süreçleri",
          "Dijital göçebe sistemi",
          "Work permit hızlandırmaları",
          "Residence permit süreleri",
          "Schengen uygulamaları",
          "Sosyal güvenlik düzenlemeleri",
        ],
      },
    ],
  },
];
