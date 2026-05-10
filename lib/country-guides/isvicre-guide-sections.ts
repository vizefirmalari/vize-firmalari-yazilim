import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const ISVICRE_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "İsviçre; yüksek ücret, düşük işsizlik, finans ve teknoloji ekosistemi ile çekici bir çalışma piyasası sunar. Schengen Bölgesi içinde olmakla birlikte Avrupa Birliği üyesi değildir: kısa süreli seyahatte Schengen kuralları; çalışma izinleri, kota ve uzun süreli oturumda ise İsviçre’nin ulusal göç mevzuatı ve kanton uygulamaları geçerlidir. Kesin prosedür ve kota bilgileri için State Secretariat for Migration (SEM) ve ilgili kanton mercilerinden güncel teyit alınmalıdır.",
  "2026 itibarıyla yüksek nitelikli çalışanlar, finans ve sağlık teknolojileri gibi alanlarda talebin sürdüğü; permit sınıfları (L/B/C), maaş eşikleri ve uzaktan çalışma vergisi gibi başlıkların sık güncellendiği bildirilmektedir.",
];

export const ISVICRE_SEO_KEYWORD_TAGS: string[] = [
  "isviçre vize",
  "isviçre çalışma izni",
  "swiss L permit B permit",
  "zürih iş izni",
  "schengen isviçre 90 gün",
  "sem migration switzerland",
];

export const ISVICRE_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-turistik",
    tocLabel: "Vize ve turistik giriş",
    h2: "Schengen ve Kısa Süreli Kalış",
    lead:
      "İsviçre Schengen üyesidir ancak AB üyesi değildir; kısa süreli girişte Schengen çerçevesi, uzun süreli çalışma ve oturumda ulusal düzen uygulanır.",
    accordions: [
      {
        title: "İki katmanlı sistem",
        paragraphs: [
          "Kısa süreli turistik ve iş seyahatlerinde Schengen kuralları; uzun süreli çalışma ve ikamette İsviçre göç sisteminin (kanton + federal süreç) devreye girdiği anlatılır.",
        ],
      },
      {
        title: "Genel başvuru belgeleri",
        paragraphs: ["Çoğu başvuruda talep edilen evrakların özeti:"],
        bullets: [
          "Geçerli pasaport",
          "Finansal yeterlilik",
          "Seyahat sağlık sigortası",
          "Konaklama bilgileri",
          "Seyahat amacı",
          "Dönüş planı",
        ],
      },
      {
        title: "Turistik vize ve kalış süresi",
        paragraphs: [
          "Kısa süreli Schengen vizesi genellikle C tipi ile ilişkilendirilir.",
          "180 gün içinde en fazla 90 gün kalış, Schengen düzeninin tipik çerçevesidir; kişisel duruma göre damga süreleri değişebilir.",
        ],
      },
      {
        title: "Kritik gerçekler",
        paragraphs: [
          "Geçerli vize veya giriş hakkı tek başına kesin sınır girişi garantisi değildir.",
          "Yüksek yaşam maliyeti, yasa dışı çalışma riski ve uzun süreli kalış şüphesi nedeniyle finansal ve amaç kontrolleri sıkı uygulanabilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-permit",
    tocLabel: "Çalışma ve permit",
    h2: "L / B / C İzinleri ve Kota",
    lead:
      "Çalışma düzeni kota, işveren başvurusu ve nitelik çerçevesinde yürür; federal onay ve kanton değerlendirmesi birlikte düşünülmelidir.",
    accordions: [
      {
        title: "Temel permit türleri (özet)",
        paragraphs: [
          "Yaygın anlatımda L kısa süreli çalışma; B uzun süreli çalışma ve residence izni; C ise uzun süreli ikamete yakın kalıcı statü ile ilişkilendirilir. Kesin süre ve şartlar SEM ve kanton duyurularına bağlıdır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Tipik çalışma hattı adımları:"],
        bullets: [
          "İsviçre işvereni ve iş teklifi",
          "İşveren başvurusu / ön onay süreçleri",
          "Kanton değerlendirmesi",
          "Federal düzeyde onay",
          "Vize ve permit işlemlerinin tamamlanması",
        ],
      },
      {
        title: "Kota sistemi",
        paragraphs: [
          "AB/EEA dışı ülke vatandaşları için yıllık çalışma kotası uygulandığı sık vurgulanır; meslek ve işveren profiline göre farklılaşır.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili İsviçre işi”, “hazır work permit” veya “kesin oturum” vaatlerine güvenmeyin; tüm süreç resmî kanallarla ve işveren dosyasıyla doğrulanmalıdır.",
        },
      },
      {
        title: "Yoğun sektör örnekleri",
        paragraphs: ["Sık anılan istihdam alanlarından bazıları:"],
        bullets: [
          "Finans ve bankacılık",
          "Yazılım ve yapay zekâ",
          "İlaç ve biyoteknoloji",
          "Mühendislik ve precision manufacturing",
          "Sağlık",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Diller",
    lead:
      "Zürih, Cenevre, Basel, Lozan ve Bern başlıca iş merkezleridir; dil beklentisi role göre değişir.",
    accordions: [
      {
        title: "İş merkezleri",
        paragraphs: ["Yüksek hacimli profesyonel işgücü için sık anılan şehirler:"],
        bullets: ["Zürih", "Cenevre", "Basel", "Lozan", "Bern"],
      },
      {
        title: "İş arama platformları",
        paragraphs: ["Başvuruların yoğunlaştığı örnek kanallar:"],
        bullets: ["SwissDevJobs", "Jobs.ch", "LinkedIn Switzerland", "Work.swiss"],
      },
      {
        title: "Dil gerçeği",
        paragraphs: [
          "Almanca, Fransızca ve İtalyanca bölgesel olarak önemlidir; teknoloji ve finasta İngilizce yeterli olabilir.",
          "Yerel müşteri, kamu veya sağlık temasında yerel dil büyük avantaj sağlar.",
        ],
      },
    ],
  },
  {
    id: "basvuru-staj",
    tocLabel: "Başvuru ve staj",
    h2: "CV, Staj ve Meslekî Eğitim",
    lead:
      "Profesyonel ve teknik ayrıntılı özgeçmiş; finans ve araştırma ağı ile staj hatları güçlüdür.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "Somut başarılar, sertifikalar, proje deneyimi ve uzmanlık alanları net gösterilmelidir.",
          "İsviçre işverenleri güvenilirlik, uzun vadeli plan ve teknik derinliğe dikkat eder.",
        ],
      },
      {
        title: "Staj ve araştırma",
        paragraphs: [
          "Finans, ilaç, yapay zekâ, mühendislik ve araştırma merkezlerinde uluslararası staj imkânları bulunabilir.",
          "ETH Zürih ve EPFL gibi kurumlar küresel araştırma ekosisteminin parçasıdır.",
        ],
      },
      {
        title: "İşyerinde eğitim ve apprenticeship",
        paragraphs: [
          "Sürekli teknik sertifikasyon, iş güvenliği ve profesyonel gelişim iş kültürünün parçasıdır.",
          "Dual / apprenticeship modeli güçlüdür; meslekî yeterlilik kültürü derindir.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut",
    h2: "Kira ve İlan Siteleri",
    lead:
      "Zürih ve Cenevre en yüksek kira bandında yer alır; brüt maaş yüksek olsa da konut bütçesi erken planlanmalıdır.",
    accordions: [
      {
        title: "Kira referansları",
        paragraphs: [
          "2026 için Zürih merkezde tek kişilik stüdyo kira bandının üçüncü taraf sitelerde yaklaşık 1600–3000 CHF ve üzeri görülebildiği rapor edilir; güncel ilanlar Homegate ve ImmoScout24 üzerinden takip edilmelidir.",
        ],
      },
      {
        title: "İlan platformları",
        paragraphs: ["Arama için yaygın örnekler:"],
        bullets: ["Homegate Switzerland", "ImmoScout24 Switzerland"],
      },
    ],
  },
  {
    id: "ab-ikamet",
    tocLabel: "AB ve ikamet",
    h2: "AB / EFTA ve Üçüncü Ülkeler",
    lead:
      "İsviçre AB üyesi değildir ancak Schengen üyesidir ve AB ile serbest dolaşım anlaşmaları çerçevesinde farklı haklar tanımlanır.",
    accordions: [
      {
        title: "Temel ayrım",
        paragraphs: [
          "AB/EFTA vatandaşları için permit süreçleri genellikle üçüncü ülke vatandaşlarına kıyasla daha kolay anlatılır.",
          "Üçüncü ülke vatandaşları kota ve sıkı başvuru incelemeleri ile karşılaşabilir.",
        ],
      },
      {
        title: "Yatırımcı ve özel programlar",
        paragraphs: [
          "Yüksek nitelikli veya yatırım / şirket kurulumu çizgileri SEM ve kanton düzeyinde ayrı kurallara tabidir; danışmanlıkta resmî kaynak esas alınmalıdır.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış listesi",
    h2: "İlk Adımlar ve Zorunlu Sigorta",
    lead:
      "Kanton ve belediye kayıtları ile zorunlu sağlık sigortası kritik adımlardır.",
    accordions: [
      {
        title: "Varış kontrol listesi",
        paragraphs: ["İlk dönemde sıraya alınan işlemlerin özeti:"],
        bullets: [
          "Permit kaydı",
          "Belediye (Gemeinde) kaydı",
          "Sağlık sigortası",
          "Banka hesabı",
          "Vergi kaydı",
          "Telefon hattı",
          "Toplu taşıma kartı",
        ],
      },
      {
        title: "Sağlık sigortası zorunluluğu",
        paragraphs: [
          "İsviçre’de temel sağlık sigortası yasal zorunluluktur; primler yaş, kanton ve pakete göre değişir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih",
    tocLabel: "İş sözleşmesi",
    h2: "İstihdam, Deneme ve Fesih",
    lead:
      "İş hukuku kanton ve federal düzeyde birlikte şekillenir; bazı iş piyasaları diğer AB ülkelerine kıyasla daha esnek kabul edilir.",
    accordions: [
      {
        title: "Sözleşme içeriği",
        paragraphs: ["Sözleşmelerde sık geçen başlıklar:"],
        bullets: ["Maaş", "Çalışma süresi", "Bonus", "Deneme süresi", "Fesih şartları", "Rekabet / gizlilik hükümleri"],
      },
      {
        title: "Deneme süresi",
        paragraphs: ["Birçok sözleşmede deneme süresi genellikle bir ila üç ay arasında uygulanabildiği belirtilir; sektörel kolektif anlaşmaları kontrol edin."],
      },
      {
        title: "Fesih ve haklar",
        paragraphs: [
          "Fesih ekonomik, performans veya organizasyonel değişiklik gerekçeleriyle yürütülebilir; ihbar süreleri kıdeme bağlıdır.",
          "Ayrımcılık ve iş güvenliği konusunda yasal koruma mevcuttur.",
        ],
      },
    ],
  },
  {
    id: "vergi-calisma-izin",
    tocLabel: "Vergi ve çalışma",
    h2: "Vergi, Süre ve İzinler",
    lead:
      "Federal, kantonal ve belediye vergileri birlikte düşünülür; kanton seçimi net vergi yükünü ciddi değiştirir.",
    accordions: [
      {
        title: "Vergi yapısı",
        paragraphs: [
          "Gelir vergisi federal, kantonal ve belediye düzeyinde kesilebilir; oranlar kantona ve gelir dilimine göre belirgin farklılık gösterir.",
          "Yüksek brüt gelirlerde marjinal oranlar önemli ölçüde yükselebilir.",
        ],
      },
      {
        title: "Çalışma süresi ve uzaktan çalışma",
        paragraphs: [
          "Haftalık çalışma süresi genellikle 40–45 saat bandında anlatılır; sektör ve kolektif sözleşmeye göre değişir.",
          "Teknoloji ve finansta hibrit / uzaktan çalışma yaygındır; vergi ve sosyal güvenlik boyutu sınır ötesi rollerde ayrıca değerlendirilmelidir.",
        ],
      },
      {
        title: "İzinler",
        paragraphs: [
          "Çoğu sektörde yıllık ücretli izin için en az dört hafta düzeyinden söz edilir.",
        ],
        bullets: ["Hastalık izni", "Doğum ve babalık izni", "Ebeveyn ve eğitim izinleri"],
      },
    ],
  },
  {
    id: "emeklilik-denetim-sendika",
    tocLabel: "Emeklilik ve sendika",
    h2: "Emeklilik, Denetim ve Toplu Sözleşmeler",
    lead:
      "Çok katmanlı emeklilik sistemi; kantonal iş müfettişleri çalışma koşullarını izler.",
    accordions: [
      {
        title: "Emeklilik",
        paragraphs: [
          "İsviçre; işveren / çalışan katkılı emeklilik sütunları ile çok katmanlı bir model kullanır.",
        ],
      },
      {
        title: "Denetim",
        paragraphs: ["İş güvenliği ve çalışma koşulları kantonal otoriteler tarafından denetlenir."],
      },
      {
        title: "Sendika ve toplu sözleşmeler",
        paragraphs: [
          "Sendika yapısı Almanya ile aynı yoğunlukta olmasa da özellikle sanayi, ulaşım, kamu ve üretimde toplu iş sözleşmeleri maaş ve çalışma düzenini şekillendirir.",
        ],
      },
      {
        title: "Meslekî eğitim kültürü",
        paragraphs: [
          "Uygulamalı teknik uzmanlık ve apprenticeship geleneği global referans olarak gösterilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-kultur",
    tocLabel: "Yaşam ve sağlık",
    h2: "Maliyet, Sağlık, Kültür ve Ulaşım",
    lead:
      "Yaşam maliyeti dünya sıralamasında üst dilimdedir; sağlık sistemi güçlü ancak primleri yüksektir.",
    accordions: [
      {
        title: "Yaşam maliyeti",
        paragraphs: [
          "Kira, gıda, enerji ve ulaşım brüt maaşı hızla eritebilir; bütçe CHF üzerinden yapılmalıdır.",
        ],
      },
      {
        title: "Sağlık",
        paragraphs: [
          "Temel sigorta kapsamında sağlık hizmetleri kalitelidir; prim ve katılım payları yüksek olabilir.",
        ],
      },
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Üniversiteler uluslararası sıralamalarda üst sıralardadır.",
          "Toplum genellikle düzenli, dakik, disiplinli ve özel hayata saygılı olarak tanımlanır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: ["Toplu taşıma ağı yoğun ve dakik kabul edilir; bölgesel geçerlilik kuralları kantona göre değişir."],
      },
      {
        title: "Engelli istihdamı",
        paragraphs: [
          "Engelli bireylerin istihdamı yasal güvence altındadır.",
        ],
        bullets: ["İş uyarlamaları", "Sosyal destekler", "Rehabilitasyon hizmetleri"],
      },
    ],
  },
  {
    id: "uyari-kaynak",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Takip",
    lead:
      "Kanton farklılıklarını hafife almayın; göç ve vergi kurallarını SEM ve federal kaynaklardan izleyin.",
    accordions: [
      {
        title: "Sahte ve agresif vaatler",
        paragraphs: [
          "“Garantili iş”, “hazır permit” veya kesin oturum iddiaları yüksek risktedir.",
        ],
      },
      {
        title: "Maliyet ve karmaşıklık",
        paragraphs: [
          "Yüksek maaş tek başına yeterli değildir; vergi, konut, sigorta ve günlük harcama birlikte planlanmalıdır.",
          "Permit prosedürleri kanton bazında farklılık gösterebilir.",
        ],
      },
      {
        title: "Resmî takip listesi",
        paragraphs: ["Güncel kriterler için örnek kurumlar:"],
        bullets: [
          "Swiss State Secretariat for Migration (SEM)",
          "Work.swiss",
          "Swiss Government Portal (admin.ch)",
          "Swiss Federal Tax Administration",
          "Sağlık ve sigorta bilgi kaynakları",
        ],
      },
      {
        title: "2026’da sık güncellenen konular",
        paragraphs: ["Özellikle şu alanları düzenli kontrol edin:"],
        bullets: [
          "Çalışma kotası ve permit kategorileri",
          "Maaş eşikleri ve nitelikli çalışan programları",
          "Uzaktan çalışma vergisi ve sosyal güvenlik",
          "Sağlık sigortası primleri",
          "Göç politikası duyuruları",
        ],
      },
    ],
  },
];
