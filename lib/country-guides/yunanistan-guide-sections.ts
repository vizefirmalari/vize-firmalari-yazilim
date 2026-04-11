import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Greece” — Türkçe özet ve yapılandırma. */
export const YUNANISTAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Yunanistan’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Schengen kısa süreli seyahat kuralları ile Yunanistan’da çalışma, staj veya mesleki eğitim için gerekli ulusal izin ve oturum süreçleri birbirinden ayrı değerlendirilmelidir; üçüncü ülke vatandaşları için Göç ve Mülteci Bakanlığı ile dış temsilciliklerin güncel metinleri esas alınmalıdır.",
  "DYPA (Kamu İstihdam Servisi), asgari ücret, çıraklık günlük ücreti ve kira örnekleri metinde belirli tarihlere bağlıdır; rakamlar ve mevzuat değişebilir. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const YUNANISTAN_SEO_KEYWORD_TAGS: string[] = [
  "yunanistan vize",
  "yunanistan schengen",
  "yunanistan çalışma",
  "dypa iş arama",
  "eures yunanistan",
  "yunanistan oturum",
  "atina kira",
];

export const YUNANISTAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-ve-kanallar",
    tocLabel: "İş bulma",
    h2: "DYPA, EURES ve diğer kanallar",
    lead: "Kamu istihdam ofisleri, özel istihdam büroları ve dijital ilan ekosistemi.",
    accordions: [
      {
        title: "DYPA ve KPA2",
        paragraphs: [
          "Kaynak metne göre istihdamın teşvikinden sorumlu ana kurum Kamu İstihdam Servisi (DYPA — eski adıyla OAED olarak da anılabilir); ülke genelinde 115 İstihdam Teşvik Merkezi (KPA2) ile Atina ve Selanik’te iki özel sosyal grup ofisi bulunduğu belirtilir.",
          "İşsizlerin iş arama, rehberlik ve nitelik artırıcı programlara başvuruda DYPA personeline yöneldiği; DYPA bünyesinde yabancı dil bilen ve özel eğitimli Yunanistan EURES danışmanlarının, AB / AEA / İsviçre’de iş arayanlara ve işveren ilanlarına köprü görevi gördüğü anlatılır.",
        ],
      },
      {
        title: "Özel bürolar ve dijital arama",
        paragraphs: [
          "Çalışan Bakanlığı tarafından yetkilendirilmiş özel istihdam acentelerinin aracılık yaptığı; çalışan için ücret talep edilmediği, maliyetin işveren tarafından karşılandığı ifade edilir.",
          "Gazeteler, sosyal medya (Facebook, LinkedIn, X), kamu ve özel iş sitelerinin yaygın olduğu; DYPA ve özel acentelerin iş arama motorları / portalları sunduğu; EURES’ün bu alanda gelişmiş motorlardan biri olarak anıldığı yazılır.",
        ],
        bullets: [
          "DYPA dijital iş arayan siciline kayıtlıların çevrimiçi CV yükleyebildiği; işverenin yalnızca mesleki/edebi profili görebildiği ve iletişimin yerel KPA2 iş danışmanı aracılığıyla kurulabildiği anlatılır.",
          "Yükseköğretim kurumlarının iş birliği ofisleri, belediye sosyal birimleri, kariyer fuarları ve şirket web siteleri ek kanallar olarak sayılır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "Özgeçmiş ve ön yazı",
    lead: "Kısa CV, işe özgü içerik, imzalı ön yazı ve Europass / DYPA şablonları.",
    accordions: [
      {
        title: "Özgeçmiş içeriği",
        paragraphs: [
          "Başvuruda genelde 1–2 sayfalık kısa bir CV eklendiği; içeriğin ilan ve işveren şartlarıyla uyumlu olması gerektiği belirtilir.",
          "Ad-soyad, adres, telefon ve e-posta; eğitim ve önceki işler (ünvan, işveren, tarihler, görevler); yabancı diller ve seviye; seminerler (düzenleyen kurum, süre); bilgisayar ve mesleki sertifikalar; başvuruya ilişkin ilgi alanları; çalışma grupları veya yayınlar gibi eklerin değerli sayıldığı özetlenir.",
          "Sonunda tanınmış iki–üç referansın (öğretmen, yönetici) iletişim bilgileriyle birlikte verilebileceği ifade edilir.",
        ],
      },
      {
        title: "Ön yazı ve formlar",
        paragraphs: [
          "CV’ye bir sayfayı geçmeyen, daktilo edilmiş ve imzalanmış bir ön yazı eşlik etmeli; niteliklerin işle bağlantısı kurulmalı, genel ifadelerden kaçınılmalıdır.",
          "Kurum başına farklı CV şablonu kullanılabildiği; yaygın olarak DYPA portalındaki şablon veya Avrupa Europass şablonunun tercih edildiği; birçok şirketin CV yerine kendi başvuru formunu kullandığı anlatılır.",
        ],
        callout: {
          variant: "info",
          text: "İşverenleri önceden araştırıp web sitelerinden bilgi toplayarak ön yazı ve mülakatta kullanmak; CV’yi e-postayla veya şahsen teslim etmek kaynakta önerilen pratikler arasındadır.",
        },
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Formal eğitime bağlı staj ve programlar",
    lead: "SAEK, yükseköğretim stajları, bakanlık çağrıları ve Erasmus+.",
    accordions: [
      {
        title: "Formal eğitim ve DYPA",
        paragraphs: [
          "Stajın teorik öğrenim ile iş hayatı arasında köprü olduğu; Yunanistan’da SAEK (yüksek meslek okulları) öğrencilerinin çalışmaları kapsamında staj zorunluluğu bulunduğu belirtilir.",
          "DYPA’nın ülke genelinde 30’dan fazla SAEK ile 2025–2026 için 35’ten fazla uzmanlık alanında iki yıllık eğitimi ve ardından işverende altı aylık stajı içeren yapıdan söz edilir.",
          "DYPA’nın zaman zaman tamamen sübvanse edilen süreli sözleşmeli iş deneyimi programları ilan ettiği; yaşam boyu öğrenme merkezleri (KDBM) ile dijital ve yeşil becerilere yönelik sübvansiyonlu eğitimlerden bahsedilir.",
        ],
      },
      {
        title: "Uygunluk ve Erasmus+",
        paragraphs: [
          "Bahsi geçen kurumlarda staja katılımın belirli bir eğitim seviyesine bağlı olmadığı; katılımcıların Yunan veya AB / AEA / İsviçre vatandaşı olduğu ifade edilir.",
          "AB, AEA ve İsviçre uyrukluların Erasmus+ ile Yunanistan’da staja mali destek alabileceği; başvurunun üniversitenin uluslararası ilişkiler veya Erasmus+ ofisinden yapılması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-dypa",
    tocLabel: "Mesleki çıraklık (DYPA)",
    h2: "İkili çıraklık sistemi ve ücret",
    lead: "İki yıl, dört dönem; işyeri + okul; asgari ücretin yüzde 80’i ve günlük net örnek tutar.",
    accordions: [
      {
        title: "Hukuki çerçeve ve kimler katılabilir?",
        paragraphs: [
          "Ana yürütücünün DYPA olduğu; 50 mesleki çıraklık okulu ve turizm-konaklama alanında yedi deneysel okuldan söz edilir.",
          "15–29 yaş arası ve en az ortaokulu tamamlamış gençlerin kaynakta hedef kitle olarak geçtiği; okul dışında işyerinde öğrenme programına işveren, öğrenci (veya reşit değilse veli) ve eğitim birimi arasında çıraklık sözleşmesiyle katılındığı anlatılır.",
          "Program süresince ücret, işveren sigortası ve genişletilmiş gelir kriterleriyle konaklama/yemek yardımı gibi hakların yürürlükteki hükümlere göre sağlanabildiği belirtilir.",
        ],
      },
      {
        title: "Eğitim düzeni ve ücret (örnek tarih)",
        paragraphs: [
          "İkili sistemde (iki yıl, dört dönem) kamu ve özel sektörde sabah ağırlıklı işyeri eğitimi ile akşam teorik ve laboratuvar derslerinin eş zamanlı yürüdüğü; deneysel okullarda kış aylarında okul, yaz aylarında (Mayıs–Ekim) işyeri deneyiminin turizm sezonuna göre ayarlandığı yazılır.",
          "Kaynak metne göre 1 Nisan 2025’ten itibaren öğrencinin tüm çıraklık boyunca günlük ücreti 31,44 EUR’dur. Bu tutar, vasıfsız işçi için asgari günlük ücretin yüzde 80’ine denk gelen 39,30 EUR üzerinden hesaplandığı belirtilir; tüm dönemler için aynı oranın geçerli olduğu ifade edilir.",
          "DYPA’nın öğrencinin aldığı günlük ücretin 25 EUR’sünü, kalanının ve sosyal sigorta payının işverence karşılandığı anlatılır. Çıraklık süresince tam sosyal güvenlik kapsamından bahsedilir.",
        ],
        bullets: [
          "2021–2027 AB fonları (ESF) ve ulusal kaynaklarla ortak finanse edildiği not edilir.",
          "Yılda yaklaşık 10.000 öğrencinin iki yıllık programlara dahil olduğu metinde yer alır.",
        ],
      },
      {
        title: "Dil şartı ve ilanlar",
        paragraphs: [
          "Programların tüm AB vatandaşlarına açık olduğu; en az B1 düzeyinde Yunanca bilgisinin gerekli olduğu vurgulanır.",
          "Bilgi için dypa.gov.gr/mathitia, okullardaki kariyer ofisleri ve AppIntern platformu (appintern.eu) — vergi kodu (taxisnet) ile kayıt — kaynakta anılır.",
        ],
      },
    ],
  },
  {
    id: "ab-oturum-ve-idari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "Giriş, üç aydan uzun kalış ve belgeler",
    lead: "AB / AEA / İsviçre için kimlik/pasaport, polis kaydı, AFM ve AMKA.",
    accordions: [
      {
        title: "Serbest dolaşım ve üç ay",
        paragraphs: [
          "AB üyesi, AEA veya İsviçre vatandaşlarının geçerli kimlik kartı veya pasaportla vizesiz girebildiği; iş gücü piyasasına erişim hakkının bulunduğu belirtilir.",
          "Üç aydan uzun kalmak isteyenlerin ikamet edilen bölgenin polis merkezine kayıt belgesi için başvurması gerektiği; istihdam veya yeterli gelir şartlarının sağlanması halinde beş yıllık oturum belgesi verilebildiği ve yenilenebildiği anlatılır.",
        ],
      },
      {
        title: "AFM, AMKA ve sağlık",
        paragraphs: [
          "Her ikamet edenin vergi dairesinden kişisel vergi numarası (AFM) ve KEP ve/veya birleşik sosyal güvenlik kurumundan (EFKA) sosyal güvenlik numarası (AMKA) alması gerektiği yazılır.",
          "Avrupa Sağlık Sigortası Kartı’nın (EHIC) tedavi masraflarını kolaylaştırdığı hatırlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut-ve-maliyet",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Kiralama, minimum süre ve şehir örnekleri",
    lead: "Üç yıllık kira sözleşmesi zorunluluğu ve 2025 çeyrek verilerine dayalı örnek kira tablosu.",
    accordions: [
      {
        title: "Kiralama pratiği",
        paragraphs: [
          "Eşyalı ve eşyasız konut bulunabildiği; duvar ilanlarında “ΕΝΟΙΚΙΑΖΕΤΑΙ” (Kiralık) ibaresinin kullanıldığı; gazete ve web sitelerinde “Enikiasi Akiniton” başlığıyla ilan verildiği belirtilir.",
          "Hukuka göre kira sözleşmesinin en az üç yıl sürmesi gerektiği; tarafların daha erken feshettiğini yazmış olsa bile asgari sürenin geçerli olduğu ifade edilir.",
          "Depozito ve ödemelerin çoğunlukla doğrudan mal sahibiyle düzenlendiği anlatılır.",
        ],
      },
      {
        title: "Örnek aylık kira (üç oda, kaynak metin)",
        paragraphs: [
          "Yunanistan Merkez Bankası’na atıfla 2025 birinci çeyrekte konut fiyatlarının bir önceki yıla göre ortalama yüzde 6,8 arttığı belirtilir.",
          "Metinde örnek olarak verilen aylık kira tutarları (yaklaşık): Atina merkez 1.037 EUR; Atina banliyö 882 EUR; Pire merkez 896 EUR; Pire banliyö 639,60 EUR; Selanik merkez 817,67 EUR; Selanik banliyö 639,41 EUR; Larissa 534 EUR; Girit Heraklion 891,67 EUR; Rodos 850 EUR; Patra 692,86 EUR.",
        ],
        callout: {
          variant: "warning",
          text: "Kira ve satın alma fiyatları bölgeye, daire özelliklerine ve piyasaya göre hızla değişir; tablolar yalnızca kaynak metindeki örnekleri yansıtır.",
        },
      },
    ],
  },
  {
    id: "calisma-kosullari-ozet",
    tocLabel: "Çalışma koşulları",
    h2: "Sözleşme türleri, asgari ücret ve çalışma süresi",
    lead: "4808/2021 ve ulusal toplu sözleşme çerçevesinde özet.",
    accordions: [
      {
        title: "Asgari ücret (örnek: 1 Mayıs 2025)",
        paragraphs: [
          "Kaynak metne göre 1 Mayıs 2025’ten itibaren tam zamanlı çalışanlar için aylık asgari brüt maaş 880 EUR; vasıflı işçiler için asgari günlük ücret 39,30 EUR olarak belirtilir.",
          "Ücretin çoğunlukla toplu iş sözleşmesiyle düzenlendiği; talep yüksek mesleklerde işverenin taban ücretin üzerinde ödeme yapabildiği anlatılır.",
        ],
      },
      {
        title: "Çalışma süresi ve fazla mesai",
        paragraphs: [
          "4808/2021’in 58. maddesine göre yasal haftalık sürenin beş günde 45 saat, altı günde 48 saat olduğu; 14 Şubat 1984 ulusal genel toplu iş sözleşmesi ve aynı kanunun 55. maddesiyle sözleşmeli sürenin çoğu işyerinde haftada 40 saat (beş günde günde 8 saat) olduğu özetlenir.",
          "Günlük çalışma dört saati aştığında en az 15 dakika, en çok 30 dakika mola; günde en az 11 saat dinlenme; haftada asgari 24 saat kesintisiz dinlenme (pazar dahil) gibi kurallardan bahsedilir.",
          "Sözleşmeli süreyi aşan ek çalışmanın yüzde 20 primle; yasal süreyi aşan fazla mesainin yüzde 40 primle ve yılda en çok 150 saat / günde en çok 3 saat sınırlarıyla ücretlendirildiği; usulsüz fazla mesai için yüzde 120’ye varan tazminat iddiasından söz edilir.",
        ],
      },
      {
        title: "Sezonluk çalışma ve üçüncü ülkeler",
        paragraphs: [
          "Turizm ve tarım gibi alanlarda mevsimlik istihdamın yaygın olduğu; AB mevzuatına göre boşlukların önce AB vatandaşlarıyla doldurulmasının tercih edildiği belirtilir.",
          "Üçüncü ülke vatandaşları için 4251/2014 Göç Kanunu ve iki yılda bir yayımlanan ortak bakanlar kararıyla sektör ve kontenjanların belirlendiği; sezonluk çalışmanın yılda en fazla altı ay sürebileceği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "saglik-ve-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "ESY, EFKA / EOPYY ve okul yapısı",
    lead: "Kamu sağlık sistemi ile zorunlu eğitim basamaklarına kısa giriş.",
    accordions: [
      {
        title: "Ulusal sağlık ve sigorta",
        paragraphs: [
          "1983’te kurulan Ulusal Sağlık Sisteminin (ESY) yerel sağlık merkezleri ve bölge hastaneleriyle hizmet verdiği; acil yardımın EKAB (166) üzerinden yürüdüğü belirtilir.",
          "Sosyal sigorta primleri işçi, işveren ve devlet katkılarıyla fonlandığı; e-EFKA ile EOPYY’nin sağlık hizmeti sunumunda rol aldığı özetlenir.",
          "Kişisel doktor modeli (4932/2022) ve sigortasız / savunmasız gruplar için 4368/2016 çerçevesinde kamu yapılarına erişimden kısaca bahsedilir.",
        ],
      },
      {
        title: "Eğitim özeti",
        paragraphs: [
          "Anaokulu ve kreşlerin belediyelere bağlı olduğu; zorunlu ilkokulun altı yıl sürdüğü; ortaokul (Gymnasio) ile dokuz yıllık zorunlu eğitimin tamamlandığı anlatılır.",
          "Lise (Lykeio) ve mesleki seçeneklerin zorunlu olmadığı; yükseköğretime genel ulusal sınavlarla geçildiği; Hellenic Open University için farklı usulden söz edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "KEPA, makul uyarlama ve destekler",
    lead: "BM sözleşmesi, 4443/2016 ve DYPA sübvansiyon programları.",
    accordions: [
      {
        title: "Tanınma ve haklar",
        paragraphs: [
          "Yunanistan’ın BM Engelli Hakları Sözleşmesi ile uyumlu tanımı benimsediği; 4443/2016 ile işe alımda eşitlik ve makul uyarlama yükümlülüğünün getirildiği belirtilir.",
          "Engelliliğin e-EFKA bünyesindeki KEPA sağlık kurulları tarafından sertifikalandığı; başvurunun çevrimiçi izlenebildiği anlatılır.",
        ],
      },
      {
        title: "İşveren ve çalışan destekleri",
        paragraphs: [
          "DYPA’nın savunmasız gruplardan 3.000 kişi için yaklaşık yüzde 75 ücret sübvansiyonu ve belediyeler için 1.000 engelli işsiz için benzer programlar ilan ettiği kaynakta örneklenir.",
          "İş engeli yaşanırsa önce işveren ve İK ile görüşülmesi; çözülmezse sendika, engelli örgütü veya Yunan Ombudsman’ına başvurulması önerilir.",
        ],
      },
    ],
  },
  {
    id: "resmi-kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama için bağlantılar",
    lead: "Kaynak metinde geçen kurumların güncel sayfaları.",
    accordions: [
      {
        title: "İstihdam ve eğitim",
        paragraphs: [
          "DYPA: dypa.gov.gr",
          "EURES: eures.europa.eu",
          "Europass: europass.europa.eu",
          "Eğitim Bakanlığı: minedu.gov.gr",
          "EOPPEP (yeterlilik): eoppep.gr",
          "Yunanistan belediyeler birliği (KEDKE): kedke.gr",
          "Özel istihdam ajansları listesi: Çalışma Bakanlığı sitesi ypergasias.gov.gr altındaki ilgili sayfa",
        ],
      },
    ],
  },
];
