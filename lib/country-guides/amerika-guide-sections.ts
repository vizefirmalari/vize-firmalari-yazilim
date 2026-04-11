import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Rehber gövdesi üstü — kullanıcı kaynağına sadık giriş paragrafları */
export const AMERIKA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu rehber, “Amerika vize ve oturum rehberi” giriş sayfasında hedeflenen kapsamı (turistik, çalışma ve yatırımcı vizeleri; Green Card/oturum ve vatandaşlık süreçlerine giriş; ayrıca iş bulma başlıkları) temel alarak yapılandırılmıştır.",
  "ABD göç ve vize süreçleri; hangi amaçla gideceğinize (ziyaret, çalışma, yatırım, aile birleşimi vb.), nereden başvurduğunuza ve dosyanıza özgü risk/faktörlere göre ciddi biçimde değişir. Ayrıca kurallar ve ücretler zaman içinde güncellenir; bu nedenle burada anlatılan çerçeveyi, resmi kaynaklardan doğrulama alışkanlığıyla birlikte düşünmek gerekir.",
];

export const AMERIKA_SEO_KEYWORD_TAGS: string[] = [
  "amerika vize",
  "abd çalışma vizesi",
  "green card",
  "amerika iş bulma",
  "abd oturum izni",
  "amerika göçmenlik",
];

export const AMERIKA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize Koşulları",
    h2: "Amerika Vize Koşulları",
    lead: "ABD sisteminde geçici ve kalıcı yolların ayrımı, başvuru iskelesi ve ücret çerçevesine giriş.",
    accordions: [
      {
        title: "Nonimmigrant ve immigrant ayrımı",
        paragraphs: [
          "ABD sisteminde en temel ayrım şudur: Göçmen olmayan vize (nonimmigrant) geçici kalış içindir (turistik/iş ziyareti, geçici çalışma vb.); göçmen vizesi (immigrant) ise kalıcı yerleşim (Green Card’a giden yol) için kullanılır. Ziyaretçi vizeleri (B-1/B-2) bu “geçici” kategoridedir.",
        ],
      },
      {
        title: "Vize, tek başına giriş garantisi değildir",
        paragraphs: [
          "Bir vize, tek başına “ABD’ye giriş garantisi” değildir. Vize; sadece sınır kapısında (havaalanı/liman/kara sınırı) giriş izni isteme hakkı verir. Girişe izin verilmesi ve kalış süresinin ne olacağı, sınırdaki görevli kurum tarafından belirlenir.",
        ],
      },
      {
        title: "Visa Waiver Program (VWP)",
        paragraphs: [
          "Kimlerin vizeye ihtiyaç duyduğunu anlamak için sık kullanılan referanslardan biri Visa Waiver Program (VWP) listeleridir. VWP yalnızca belirli ülke vatandaşlarına (ve ek şartlara) 90 güne kadar vizesiz kısa ziyaret imkânı sağlar. Listede olmayan ülke vatandaşları (çoğu durumda) vizeye tabidir; bu liste düzenli güncellenir.",
        ],
      },
      {
        title: "Başvuru iskelesi (çoğu nonimmigrant vize)",
        paragraphs: [
          "Başvurunun “iskele” adımları çoğu nonimmigrant vize için benzerdir:",
        ],
        bullets: [
          "DS-160 formunun online doldurulması (geçici seyahat vizelerinin temel formu).",
          "Vize ücretinin ödenmesi (kategoriye göre).",
          "Randevu ve mülakat (bazı yenilemelerde mülakat muafiyeti/waiver mümkün olabilir; uygulama ülke ve döneme göre değişebilir).",
          "Fotoğraf standartlarına uyum (yanlış fotoğraf dosyayı yavaşlatabilir).",
        ],
      },
      {
        title: "Ücret tablosu (Nisan 2026 itibarıyla resmî tablo özeti)",
        paragraphs: [
          "Ücret tarafında, Nisan 2026 itibarıyla resmî ücret tablosunda:",
        ],
        bullets: [
          "B gibi “petition gerektirmeyen” birçok nonimmigrant kategori için başvuru ücreti 185 USD,",
          "H/L/O/P/Q/R gibi “petition-based” kategoriler için 205 USD,",
          "E (treaty trader/investor) kategorileri için 315 USD olarak listelenmektedir.",
        ],
        callout: {
          variant: "info",
          text: "Bazı ülke vatandaşları için, vize basımı aşamasında ayrıca reciprocity/issuance fee denen ek ücret(ler) olabilir; bu ücretler ülke ve vize türüne göre değişir ve resmî “reciprocity” tablolarında gösterilir. Türkiye sayfası da “issuance fee” kavramını ve mantığını açıklar.",
        },
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik Vize",
    h2: "ABD Turistik Vize",
    lead: "B-1/B-2 çerçevesinde izin verilen faaliyetler, 214(b) ret mantığı ve I-94 kaydı.",
    accordions: [
      {
        title: "B-1 / B-2 ne anlama gelir?",
        paragraphs: [
          "ABD “turistik vize” denince pratikte en sık B-2 (turizm/ziyaret) veya B-1/B-2 (iş + turizm birlikte) konuşulur. Resmî tanım; B-1’in iş amaçlı geçici ziyaret, B-2’nin turizm/ziyaret/tedavi gibi amaçlar için geçici ziyaret olduğunu belirtir ve hangi aktivitelerin uygun olup olmadığına örnekler verir.",
        ],
      },
      {
        title: "İzin verilen ve verilmeyen faaliyetler",
        paragraphs: [
          "Ziyaretçi vizesinde izin verilen ve verilmeyen faaliyetler ayrımı kritiktir:",
        ],
        bullets: [
          "Ziyaretçi vizesiyle konferans/iş görüşmesi/kontrat müzakeresi gibi bazı iş ziyareti aktiviteleri mümkün olabilir.",
          "Ancak ziyaretçi vizesiyle çalışma (employment) yapılamaz; bu, resmî olarak açık biçimde “izin verilmez” diye listelenir.",
        ],
      },
      {
        title: "214(b) ve geçici niyet",
        paragraphs: [
          "Başvuru hazırlığında iki konu çok belirleyicidir:",
          "Birincisi, 214(b) / göçmenlik niyeti varsayımı. Ziyaretçi dahil birçok nonimmigrant vizede, başvuranın “geçici” niyetini yeterince gösterememesi 214(b) kapsamında ret sebebi olabilir. Resmî “Visa Denials” sayfası, 214(b) kapsamındaki retlerin mantığını doğrudan açıklar.",
        ],
      },
      {
        title: "Vize geçerliliği ile kalış süresi (I-94)",
        paragraphs: [
          "İkincisi, vize geçerlilik tarihi ile kalış süresi ayrımı. Vizenin pasaport üzerindeki bitiş tarihi, ABD içinde ne kadar kalabileceğinizi göstermez. Girişte kalış süresi; sınırdaki görevli tarafından belirlenir ve I-94 kaydı/admission stamp üzerindeki “admit-until” tarihi (veya statüye göre “D/S”) esas alınır. Bu ayrımı anlatan resmî açıklama “What the Visa Expiration Date Means” sayfasında ayrıntılıdır.",
          "I-94 kaydı günümüzde çoğu yolcu için elektronik olarak tutulur; CBP’nin I-94 sitesi üzerinden son giriş/çıkış geçmişi görülebilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-vizeleri",
    tocLabel: "Çalışma Vizeleri",
    h2: "ABD Çalışma Vizeleri",
    lead: "Geçici çalışma yolları ile kalıcı göçmenlik dilimleri; petition mantığı ve güncel politika riski.",
    accordions: [
      {
        title: "İki düzlem: geçici çalışma ve kalıcı göç",
        paragraphs: [
          "ABD’de “çalışma” iki farklı düzlemde düşünülmelidir:",
        ],
        bullets: [
          "Geçici çalışma vizeleri/statüleri (H/L/O gibi nonimmigrant kategoriler),",
          "Kalıcı çalışma temelli göç (employment-based immigrant visas; EB-1/EB-2/EB-3/EB-5 gibi).",
        ],
      },
      {
        title: "Petition-based geçici istihdam",
        paragraphs: [
          "Geçici çalışma tarafında, ABD Dışişleri Bakanlığı istihdam vizelerini (H, L, O, P, Q vb.) “petition-based temporary employment” olarak gruplar; çoğu kategoride işverenin önce ABD içinde ilgili “petition” sürecini tamamlaması gerekir ve ardından konsolosluk aşamasına geçilir.",
        ],
      },
      {
        title: "Kategori özetleri (resmî çerçeve)",
        paragraphs: ["Kategori mantığına örnek olarak resmî özetlerde şu çerçeve öne çıkar:"],
        bullets: [
          "H-1B: “specialty occupation” (en az lisans veya eşdeğeri) gibi şartları olan bir geçici çalışma yolu olarak tanımlanır.",
          "H-2A / H-2B: geçici/seasonal tarım ve tarım dışı işçilik için tanımlanır ve belirli ülke vatandaşlığı kısıtları bulunabilir.",
          "L-1: çok uluslu şirketlerde “intra-company transfer” mantığıyla; son üç yılda en az 1 yıl yabancı ofiste çalışma gibi koşulları vurgulanır.",
          "O-1: bilim, sanat, eğitim, iş dünyası veya sporda “extraordinary ability” temelli bir yol olarak özetlenir.",
        ],
      },
      {
        title: "H-1B kota ve sezon takvimi",
        paragraphs: [
          "H-1B özelinde “güncel süreç” tarafında, resmî ABD Çalışma Bakanlığı sayfası yıllık kota mantığını (65.000 + ileri derece muafiyeti kapsamında ek 20.000) açıklar.",
          "Ayrıca FY 2027 sezonu için, elektronik kayıt ve seçim sürecine dair tarihleri ABD Vatandaşlık ve Göçmenlik Hizmetleri (USCIS) duyurularında görmek mümkündür (ör. Mart 2026 duyuruları).",
        ],
      },
      {
        title: "Güncel politika riski (örnek resmî duyuru)",
        paragraphs: [
          "Çalışma vizelerinde “güncel politika” riski de vardır. Örneğin, 21 Eylül 2025’te güncellenen resmî bir duyuru; 19 Eylül 2025 tarihli bir başkanlık bildirisine atıfla, belirli yeni H-1B başvuruları için vize basımı/girişte ek koşullar getirildiğini belirtir (metinde 100.000 USD ödeme şartı yer alır). Bu tür duyurular, doğrudan planlamayı etkileyebileceği için, başvuru döneminde mutlaka resmî metin üzerinden kontrol edilmelidir.",
        ],
        callout: {
          variant: "warning",
          text: "Politika ve ücretler değişebilir; nihai doğrulama her zaman güncel resmî duyuru ve form talimatlarıyla yapılmalıdır.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş Bulma Süreci",
    h2: "Amerika’da İş Bulma",
    lead: "İş arayışını göçmenlik uyumu ve dolandırıcılık riskleriyle birlikte ele almak.",
    accordions: [
      {
        title: "Vize–iş uyumu",
        paragraphs: [
          "ABD’de çalışma hedefi varsa, “iş bulma” süreci yalnızca kariyer planlaması değil, aynı zamanda göçmenlik uyumu konusudur: iş teklifinin size uygun bir vize/statü yolunu gerçekten açıp açmadığını anlamadan adım atmak; zaman, para ve ret riski doğurabilir.",
        ],
      },
      {
        title: "Üçlü kontrol listesi",
        paragraphs: ["Pratikte güvenli yaklaşım şu üç kontrolü birlikte yapmak olur:"],
        bullets: [
          "Birinci kontrol: Vize kategorisi-iş ilişkisi. “Çalışma” gerektiren bir rol için genellikle ziyaretçi vizesi uygun değildir; ziyaretçi vizesi altında “employment” yapılamayacağı resmen belirtilmiştir.",
          "İkinci kontrol: Dolandırıcılık ve sahte vaatler. ABD vize sisteminde “garanti vize”, “hızlı vize” gibi vaatlere karşı resmî dolandırıcılık uyarıları özellikle DV (Green Card çekilişi) alanında belirgindir; resmî uyarı sayfası, sahte e-posta ve mektuplarla ücret talep edilmesine dikkat çeker.",
          "Üçüncü kontrol: İşçi hakları ve korumalar. Geçici işçi kategorilerinde, ABD’nin Türkçe yayımladığı “Rights and Protections for Temporary Workers” içeriği; ücret, güvenlik, taciz/sömürüden korunma gibi başlıklarda haklar ve yardım kanalları hakkında resmi bilgilendirme sunar.",
        ],
      },
    ],
  },
  {
    id: "yatirimci-vizeleri",
    tocLabel: "Yatırımcı Vizeleri",
    h2: "Yatırımcı Vizeleri (E-2 ve EB-5)",
    lead: "Geçici yatırımcı yolu ile göçmen yatırımcı dilimi; ücret ve asgari tutarların resmî doğrulanması.",
    accordions: [
      {
        title: "E-2 ve EB-5 farkı",
        paragraphs: [
          "“Yatırımcı vizesi” başlığı, genellikle E-2 (treaty investor) gibi geçici seçenekler ile EB-5 (immigrant investor) gibi doğrudan Green Card’a giden seçenekleri birlikte kapsar. Bu ikisi amaç ve sonuç bakımından farklıdır: E-2 çoğu zaman “geçici statü + uzatma/yenileme” mantığıyla ilerlerken, EB-5 doğrudan göçmenlik (kalıcı oturum) kategorisidir.",
        ],
      },
      {
        title: "E-2 için kritik öğeler",
        paragraphs: [
          "E-2 tarafında iki kritik öğe vardır:",
        ],
        bullets: [
          "Ücret: E kategorisi başvuru ücreti resmî tabloda 315 USD olarak listelenir.",
          "Uygun ülke vatandaşlığı: E-2 “treaty country” vatandaşlarına açıktır. Resmî “Treaty Countries” listesinin içinde Turkey satırları E-2’yi içerir (E-2 için anlaşma tarihi de listelenir).",
        ],
      },
      {
        title: "EB-5 limitleri ve asgari yatırım",
        paragraphs: [
          "EB-5 tarafı ise, çalışma temelli göçün “E5/EB-5” yatırımcı dilimidir ve ayrıca yıllık sayısal limitlere tabidir. Dışişleri Bakanlığı, EB-5’in dünya genelindeki employment-based limitin belirli bir yüzdesiyle sınırlı olduğunu ve bazı yıllarda “unreserved category” limitinin dolabildiğini ayrıca duyurur.",
          "En çok sorulan konu olan asgari yatırım tutarı için, resmî kaynaklarda “hangi tarihten sonra hangi tutar” ayrımı önemlidir. USCIS’in EB-5 sınıflandırma özetinde, 15 Mart 2022 sonrası için 1.050.000 USD ve TEA/infrastructure gibi alanlar için 800.000 USD seviyeleri açık biçimde listelenir; daha önceki dönemler için daha düşük eşikler ayrıca gösterilir.",
          "Buna karşılık bazı konsolosluk odaklı sayfalarda eski tutarların kalmış olabildiği görülür; bu nedenle yatırım kararı gibi yüksek maliyetli adımlar öncesi, USCIS’in güncel eşik tablosu ve ilgili resmî duyurularla doğrulama kritik olur.",
        ],
        callout: {
          variant: "warning",
          text: "Yatırım tutarları ve kategori limitleri zamanla değişebilir; karar öncesi USCIS ve ilgili resmî kanallardan güncel tabloyu doğrulayın.",
        },
      },
    ],
  },
  {
    id: "oturum-green-card",
    tocLabel: "Oturum (Green Card)",
    h2: "Green Card Süreci",
    lead: "Consular processing, adjustment of status, NVC ve Visa Bulletin mantığı.",
    accordions: [
      {
        title: "İki ana başvuru konumu",
        paragraphs: [
          "Green Card (lawful permanent residence) iki ana “başvuru konumu” ile ilerler:",
        ],
        bullets: [
          "ABD dışındaysanız genellikle consular processing (konsolosluk üzerinden göçmen vizesi),",
          "ABD içindeyseniz uygun şartlarda adjustment of status (I-485).",
        ],
      },
      {
        title: "NVC ve göçmen vizesi adımları",
        paragraphs: [
          "Göçmen vizesiyle (consular processing) ilerleyen senaryolarda, National Visa Center (NVC) dosyanın evrak/ücret toplanması ve mülakata hazırlanması aşamalarında merkezi rol oynar; Dışişleri Bakanlığı “Immigrant Visa Process” adımlarını bu mantıkla yayınlar.",
        ],
        bullets: [
          "Petition (ör. aile için I-130, iş için I-140) onayı,",
          "DS-260 göçmen vizesi başvurusu ve sivil belgelerin toplanması,",
          "Mülakat (ülkeye göre işlem yapan temsilcilikte),",
          "Vize basımı ve giriş sonrası kalıcı ikamet statüsünün başlaması.",
        ],
      },
      {
        title: "Priority date ve Visa Bulletin",
        paragraphs: [
          "Kotalı kategorilerde “ne zaman sıra gelir?” sorusunun dili priority date ve Visa Bulletin üzerinden konuşulur. Dışişleri Bakanlığı Visa Bulletin’i her ay yayınlar; hem “Final Action Dates” hem “Dates for Filing” tabloları, başvuru zamanlamasını etkiler.",
          "USCIS de, ABD içinden adjustment of status yapılacaksa hangi tabloların kullanılacağını ay bazında duyurur.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "ABD Vatandaşlık Şartları",
    lead: "Naturalization (N-400) çerçevesi, süre şartları ve yükümlülükler.",
    accordions: [
      {
        title: "Genel yol: Green Card sonrası N-400",
        paragraphs: [
          "Vatandaşlığa giden “standart” yol, genellikle önce Green Card, sonra naturalization başvurusu (N-400) mantığıdır. USCIS’in N-400 sayfası ve “5 yıllık Green Card sahibi” rehberi, genel çerçeveyi (süre, belge mantığı, temel uygunluk) açıklar.",
        ],
      },
      {
        title: "Temel şart kümeleri",
        paragraphs: ["En kritik şart kümeleri içinde:"],
        bullets: [
          "Continuous residence ve physical presence (genel kuralda 5 yıllık çerçevede; bazı özel durumlarda farklılaşabilir),",
          "Dil ve vatandaşlık bilgisi (test),",
          "“Good moral character” gibi uygunluk kontrolleri bulunur (dosyaya göre değişen detaylar olabilir).",
        ],
      },
      {
        title: "Green Card’lıyken yükümlülükler",
        paragraphs: [
          "Vatandaşlık planlamasında ayrıca “Green Card’lıyken yükümlülükler” konusu önemlidir. Örneğin ABD’de adres değişikliklerinin bildirimi gibi kurallar, resmî USCIS sayfalarında “10 gün içinde bildirim” şeklinde özetlenir.",
        ],
      },
    ],
  },
  {
    id: "ucretler-ve-guncel-politikalar",
    tocLabel: "Ücretler ve Güncel Politikalar",
    h2: "Ücretler ve güncel politika notları",
    lead: "Başvuru ücretleri ile politika değişimlerinin dosya üzerindeki etkisini birlikte izleyin.",
    accordions: [
      {
        title: "Ücret özetleri",
        paragraphs: [
          "Nonimmigrant başvuru ücretleri kategoriye göre değişir; bu rehberde vize koşulları bölümünde Nisan 2026 itibarıyla 185 / 205 / 315 USD çerçevesi özetlenmiştir.",
          "Ek olarak reciprocity/issuance fee ülke ve vize türüne göre değişebilir.",
        ],
      },
      {
        title: "Güncel politikalar ve H-1B örneği",
        paragraphs: [
          "Çalışma vizeleri başlığında, güncellenen başkanlık bildirileri ve buna bağlı vize basımı/giriş koşulları gibi değişiklikler doğrudan planlamayı etkileyebilir.",
          "H-1B tarafında yıllık seçim ve kayıt tarihleri USCIS duyurularıyla güncellenir; dosyanızı planlarken ilgili resmî duyuruları takip edin.",
        ],
      },
    ],
  },
  {
    id: "kritik-uyarilar",
    tocLabel: "Kritik Uyarılar",
    h2: "Kritik Uyarılar",
    lead: "Başvuru güvenliği ve doğru vize türü seçimi.",
    accordions: [
      {
        title: "Vize garanti değildir",
        paragraphs: [
          "Vize onayı veya sınırda kabul, önceki benzer başvurular veya danışmanlık vaatleri nedeniyle garanti edilmez; her dosya kendi içinde değerlendirilir.",
        ],
      },
      {
        title: "Dolandırıcılık ve yanlış vize türü",
        paragraphs: [
          "“Garanti vize” ve benzeri vaatlere karşı resmî uyarıları özellikle DV çekilişi gibi alanlarda dikkate alın.",
          "Yanlış vize türüyle giriş/çalışma niyeti, hem ret hem de ileride uyum sorunları riskini artırır; amacınızı netleştirip uygun statü yolunu seçin.",
        ],
        callout: {
          variant: "warning",
          text: "Karmaşık dosyalarda profesyonel danışmanlık faydalı olabilir; yine de nihai sorumluluk ve beyanlar başvurana aittir.",
        },
      },
    ],
  },
  {
    id: "resmi-kaynaklar",
    tocLabel: "Resmî kaynakları izleme",
    h2: "Güncel resmî kaynaklar ve izleme noktaları",
    lead: "ABD vize ve oturum süreçlerinde güncel kalmak düzenli kontrol gerektirir. Aşağıdaki başlıklar, değişiklikleri yakalamanız için resmî kaynak türlerini hatırlatır (tam URL yerine konu başlıkları).",
    accordions: [
      {
        title: "İzlemeniz önerilen resmî başlıklar",
        paragraphs: [
          "ABD vize/oturum süreçlerinde “güncel kalmak”, bir defalık araştırma değil düzenli kontrol gerektirir. Aşağıdaki resmî sayfa türleri, değişiklikleri en erken yakaladığınız yerlerdir:",
        ],
        bullets: [
          "Nonimmigrant vizeler (DS-160, ücretler, foto standardı, ret gerekçeleri).",
          "“Vize ≠ kalış süresi” ve I-94 mantığı.",
          "Mülakat bekleme süreleri.",
          "Göçmen vizesi adımları (DS-260, evrak süreci, NVC).",
          "Visa Bulletin ve ay bazlı dosyalama tabloları.",
          "DV (Green Card çekilişi) için resmi giriş/statü kontrolü ve dolandırıcılık uyarıları; ayrıca Mart 2026’da Federal Register’da yayımlanan “pasaport bilgisi + pasaport sayfası yükleme” gibi yeni güvenlik şartları ve DV-2027 uygulaması.",
          "Başvuruların Türkiye’den yürütülmesi açısından, Türkiye için resmî “visa issuing posts” listeleri; Ankara ve İstanbul gibi işlem noktalarını ülke bazında gösterir (hangi vize türünün nerede işlendiği ayrıntısı dönemsel olarak değişebildiği için, güncel post sayfası kontrolü önemlidir).",
        ],
        callout: {
          variant: "info",
          text: "Bu sayfa hukuki danışmanlık değildir; kişisel durumunuz için resmî talimatları ve güncel duyuruları esas alın.",
        },
      },
    ],
  },
];
