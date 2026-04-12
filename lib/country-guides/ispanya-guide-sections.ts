import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Spain” (29/09/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const ISPANYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “İspanya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. SEPE ve özerk topluluk istihdam servisleri, staj ve çift öğrenme, NIE/empadronamiento, 2023 iş hukuku reformu, asgari ücret (SMI) ve vergi başlıkları kaynak metne dayanır.",
  "Metinde geçen tutarlar (örneğin 2024 SMI, IPREM tabanlı staj yardımı, vergi istisnaları) yayımlandıkları döneme bağlıdır; güncel mevzuat ve oranlar değişebilir. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const ISPANYA_SEO_KEYWORD_TAGS: string[] = [
  "ispanya vize",
  "ispanya schengen",
  "SEPE iş arama",
  "EURES İspanya",
  "NIE İspanya",
  "İspanya asgari ücret 2024",
  "İspanya çift öğrenme FCT",
  "empleate",
];

export const ISPANYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "İspanyolca ve SEPE ağı",
    lead: "Devlet ve bölgesel istihdam ofisleri, ETT ve dijital kanallar.",
    accordions: [
      {
        title: "Genel çerçeve",
        paragraphs: [
          "İspanya’da çalışmak için İspanyolca bilgisinin temel olduğu vurgulanır; EURES dışında başlıca arama kanallarının kamu istihdam servisleri, özel aracılar ve dijital platformlar olduğu belirtilir.",
        ],
      },
      {
        title: "Kamu istihdam servisleri (SEPE ve özerk topluluklar)",
        paragraphs: [
          "İspanya Devlet İstihdam Kurumu (SEPE) ile özerk toplulukların istihdam servislerinin ülke genelinde istihdam ofisi ağı işlettiği yazılır.",
          "Kayıt için on altı yaş üstü, geçerli kimlik veya pasaport ile adres bilgisinin gerektiği; kişisel ve mesleki veriler için diploma, sözleşme vb. belgelerin istenebildiği belirtilir.",
          "Ofis adreslerinin sepe.es üzerinden ve ulusal istihdam sistemi (sistemanacionalempleo.es) bağlantılarıyla özerk topluluk servislerine ulaşılabildiği; boş pozisyonlar, eğitim kursları ve rehberlerin bu sitelerde yayımlandığı ifade edilir.",
          "SEPE sitesinden erişilen “Empléate” sanal iş ajansından bahsedilir.",
        ],
      },
      {
        title: "Aracı kuruluşlar ve ETT",
        paragraphs: [
          "İşgücü idaresince yetkilendirilmiş kâr amacı gütmeyen yerleştirme ajansları ile insan kaynakları firmalarının gazete ve sosyal ağlarda ilan verdiği yazılır.",
          "Geçici istihdam ajanslarının (ETT) işçiyi doğrudan işe alıp kullanıcı şirkete devrettiği; geçici iş arayanlar için özellikle yararlı olduğu belirtilir.",
        ],
      },
      {
        title: "Medya, internet ve networking",
        paragraphs: [
          "Ulusal, bölgesel ve yerel gazetelerde günlük iş ilanları olduğu; çoğunun pazar günü sayfalarında yoğunlaştığı; televizyon ve radyoda istihdama ayrılmış programlar bulunduğu; RTVE 2’de hafta içi 09:30’da “Aquí hay trabajo” örneğinin verildiği yazılır.",
          "Şirketlerin web sitelerinde “Recursos Humanos”, “Empleo” veya “Trabaja con nosotros” bölümlerinde ilan açtığı; uygulama ve sosyal ağların hızla genişlediği belirtilir.",
          "Kişisel ağ ve tavsiyelerin iş bulmada çok işe yaradığı; profesyonel forumların aktif arama stratejilerinde önem kazandığı ifade edilir.",
        ],
      },
      {
        title: "Kamu sektörü işleri",
        paragraphs: [
          "Kamu istihdamı için özerk bölgeler ve illerin resmî gazetelerinde (BOE ve benzeri) açılan yarışma ilanlarının izlenmesi gerektiği; “Portal del Ciudadano” üzerinden de bilgi alınabildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru-secim",
    tocLabel: "Başvuru ve seçim",
    h2: "İspanyolca CV, ön yazı ve değerlendirme",
    lead: "A4, bilgisayar çıktısı; mülakat ve psikometrik testler.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "İyi bir CV ve ön yazının sektörel başvuru veya ilana yanıtta kritik olduğu; işverenle ilk temasın bu belgelerle kurulduğu belirtilir.",
          "Adayların yaklaşık yüzde yetmiş beş’inin mülakat öncesi CV’ye dayalı elendiği istatistiğine yer verildiği yazılır.",
          "Bazı şirketlerin başvuru formu kullandığı; yaygın uygulamanın bilgisayarda hazırlanmış İspanyolca CV ve ön yazı olduğu; aksi belirtilmedikçe A4 format ve resmî dil önerildiği ifade edilir.",
          "İlana yanıtta ilanın dikkatle okunması, şirket ihtiyaçlarına göre CV’den vurgu seçilmesi; kendi girişimli başvuruda şirket hakkında araştırma ve ilgi gerekçesi oluşturulması gerektiği belirtilir.",
          "Tek tip CV şablonu olmadığı; teklife ve kariyere göre bölüm sırasının değiştirilebildiği; kronolojik artan/azalan, işlevsel ve Avrupa (AB başvuruları için) modellerin anıldığı yazılır.",
          "İpuçları: bilgisayarda düzenli düzen; ideal olarak iki A4 sayfa; fotoğraf zorunlu değil; nitelik fotokopilerinin genelde mülakatta getirilmesi; sade cümleler ve aşırı kısaltmadan kaçınılması önerilir.",
          "Europass CV’nin özellikle başka bir AB ülkesinde iş ararken alternatif format olduğu; 22 Avrupa dilinde sunulabildiği belirtilir.",
        ],
      },
      {
        title: "Seçim süreci",
        paragraphs: [
          "Seçimin çoğunlukla mülakata dayandığı; bazen psikometrik veya işe özgü testlerin kullanıldığı yazılır.",
          "Şirket faaliyeti, adayın katkısı ve mülakatın tek veya çok görüşmecili yapılabileceği ifade edilir.",
          "İspanya’da şirketlerin yaklaşık yüzde yetmiş beş’inin psikometrik test kullandığı; yetenek ve kişilik testleri olarak ikiye ayrıldığı belirtilir.",
          "Mesleki bilgiyi ölçen sınav, anket, rol yapma gibi işe özgü testlerin; grup dinamikleri oturumlarının ve bir–iki gün süren değerlendirme merkezi (assessment centre) yönteminin giderek yaygınlaştığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Dört tip staj ve ücret tabanları",
    lead: "Akademik dış staj, ücretsiz genç staj, istihdam stajı, kamu programları.",
    accordions: [
      {
        title: "Tanım ve türler",
        paragraphs: [
          "Stajın sınırlı süreli uygulamalı deneyim ve eğitim/öğretim bileşeni içerdiği; CV veya müfredata resmî biçimde yansıtılabildiği; sürenin birkaç haftadan altı aya veya bazı durumlarda bir–iki yıla kadar uzayabildiği belirtilir.",
          "Üniversite öğrencileri için müfredat dışı/dahil akademik dış stajların üniversite–şirket anlaşmalarına tabi olduğu yazılır.",
          "On sekiz–yirmi beş yaş arası, istihdam ofisine kayıtlı, resmî üniversite veya orta/yüksek MYO veya mesleki yeterlilik belgesine sahip, aynı alanda üç aydan fazla (akademik staj hariç) iş deneyimi olmayan gençler için ücret ödenmeyen stajların şirket ile kamu istihdam servisi ortaklık anlaşmasıyla yürütüldüğü (örnek olarak Kanarya Adaları’nda Cataliza) ifade edilir.",
          "İstihdam stajı sözleşmesinin mesleki deneyim kazanmak için olduğu; sosyal güvenlik kaydı ve sonrası işsizlik koruması sağladığı belirtilir.",
          "Kamu istihdam–eğitim programları olarak meslek okulları, ticaret okulları ve istihdam atölyelerinin genç ve yirmi beş üstü gruplara yönelik eğitim ve şirkette deneyim sunduğu; Maliye ve özerk topluluklar ile Avrupa Sosyal Fonu katkısından bahsedilir.",
        ],
      },
      {
        title: "Kalite çerçevesi ve hukuk",
        paragraphs: [
          "Akademik dış stajların 11 Temmuz 2014 tarihli Kraliyet Kararnamesi 592/2014 ile düzenlendiği yazılır.",
          "Ücret ödenmeyen şirket stajlarının 31 Ekim 2011 tarihli Kraliyet Kararnamesi 1543/2011 ile düzenlendiği belirtilir.",
        ],
      },
      {
        title: "Ücret ve yardımlar (kaynak rakamlar)",
        paragraphs: [
          "Akademik dış stajların burs veya çalışma hibesi alabileceği (zorunlu olmadığı) yazılır.",
          "Ücret ödenmeyen stajlarda katılımcıya şirketten en az güncel aylık IPREM’in yüzde sekseni kadar destek hibesi verildiği; metinde bu tutarın 600 EUR olarak verildiği belirtilir (IPREM güncellenir).",
          "İş deneyimi kazanımı için eğitim sözleşmesinde ücretin toplu iş sözleşmesindeki stajyer ücreti kadar olması gerektiği; aksi halde çift öğrenme sözleşmesi veya asgari ücret (SMI) tabanının gerçek çalışma oranında uygulanamayacağının altının çizildiği; sözleşme bitiminde süre, görev ve ana işlerin yazılı sertifikayla teyit edilmesi gerektiği ifade edilir.",
          "Kaynak metinde yıllık asgari ücretin 1.134 EUR (brüt, on dört ödeme) olarak anıldığı ve staj ücret tabanıyla ilişkilendirildiği yazılır.",
          "Çift öğrenme sözleşmesinde ücretin toplu iş sözleşmesine göre belirlendiği; aksi halde meslek grubu ücretinin birinci yılda yüzde altmışı, ikinci yılda yüzde yetmişinin gerçek çalışma oranında alt sınır oluşturduğu belirtilir.",
        ],
      },
      {
        title: "Fırsatlar ve hareketlilik",
        paragraphs: [
          "EURES İspanya ağı, özerk topluluk kamu istihdam servisleri, akademik kurumlar ve meslek odalarının adreslendiği yazılır.",
          "AEA’de altı ay ve üzeri staj sözleşmesi nedeniyle mülakat, dil kursu veya yer değişikliği için mali yardım (mobility grants) ve Erasmus+ programından bahsedilir.",
        ],
      },
    ],
  },
  {
    id: "cift-ogrenme",
    tocLabel: "Çift öğrenme",
    h2: "FCT, mesleki yeterlilik ve 2022 düzenlemesi",
    lead: "Eğitim sisteminde zorunlu işyeri modülleri; çift meslek eğitimi.",
    accordions: [
      {
        title: "İlk ve sürekli mesleki eğitim",
        paragraphs: [
          "Eğitim sistemindeki meslek kurslarının gerçek üretim ortamında zorunlu işyeri eğitimi modülü (FCT) içerdiği; istihdam amaçlı meslek eğitiminde mesleki yeterlilik belgesi için yine zorunlu işyeri modülü bulunduğu; bunların “iş” değil zorunlu öğrenme deneyimi olduğu ve yeterli süreyle doğrulanabildiği yazılır.",
          "Temel meslek eğitiminin on beş–on yedi yaş aralığına yönelik iki akademik yıl ve yaklaşık üç yüz saat FCT içerdiği (RD 127/2014); orta ve yüksek seviye iki yıllık programlarda yaklaşık dört yüz saat FCT (RD 1147/2011) olduğu belirtilir.",
          "Sürekli meslek eğitiminde mesleki yeterlilik belgelerinin (RD 34/2008) üç seviyesinin her birinde işyeri pratiği bulunduğu; belgelerin SEPE ve yetkili bölge organlarınca resmî olarak tüm İspanya’da geçerli olduğu ifade edilir.",
        ],
      },
      {
        title: "Organik Kanun 3/2022 ve yoğun çift model",
        paragraphs: [
          "31 Mart 2022 tarihli Organik Kanun 3’ün, C ve D (ve uygunsa E) düzeyindeki meslek sertifikası, diploma veya uzmanlık yollarının genel veya yoğun çift çerçevede sunulmasını öngördüğü yazılır.",
          "Yoğun şemanın; toplam eğitim süresinin yüzde otuz beşinden fazlasının şirkette veya eşdeğer kuruluşta geçmesi, öğrenme çıktılarının yüzde otuzundan fazlasında şirket katılımı ve şirketle eğitim sözleşmesi bulunması özellikleriyle tanımlandığı belirtilir.",
        ],
      },
      {
        title: "Nerede bilgi bulunur",
        paragraphs: [
          "todofp.es, özerk eğitim bakanlıkları, eğitim merkezleri; SEPE ve bölgesel istihdam siteleri; EURES İspanya staj sayfası (sepe.es içindeki pratikler bağlantısı) kaynakta listelenir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-nie",
    tocLabel: "İkamet ve NIE",
    h2: "AB/AEA/İsviçre vatandaşları için kayıt",
    lead: "Üç ay, iş arama, yabancılar sicili ve empadronamiento.",
    accordions: [
      {
        title: "Giriş ve üç ay",
        paragraphs: [
          "AB, AEA veya İsviçre vatandaşlarının İspanya’ya geçerli kimlik veya pasaportla girebildiği; iş veya serbest meslek kurmak veya iş aramak için üç ay kalabildiği belirtilir.",
          "Üç ay sonunda iş bulunmamış olsa bile iş aramaya devam koşuluyla daha uzun kalınabileceği ifade edilir.",
          "Ailenin AB dışı uyruklu üyelerinin üç aydan fazla birlikte kalmada AB vatandaşı akrabaya bağlı ikamet kartı başvurusu yapması gerektiği yazılır.",
        ],
      },
      {
        title: "NIE ve yabancılar sicili",
        paragraphs: [
          "Varıştan sonra üç ay içinde Oficina de Extranjeros veya karakolda Merkezi Yabancılar Sicili’ne kayıt olunması; geçerli pasaport/kimlik ve harç ödemesiyle NIE içeren kayıt belgesi alındığı belirtilir.",
          "Ekonomik, mesleki veya sosyal çıkarları olan her yabancının benzersiz NIE’ye ihtiyaç duyduğu; sicile yazılınca otomatik verildiği veya ayrı başvuru yapılabildiği yazılır.",
          "İsviçre veya AEA dışı uyrukluların ikamet iznine ihtiyaç duyduğu; ayrıntı için köken ülkesindeki İspanya elçiliği veya İstihdam ve Sosyal Güvenlik Bakanlığı göç genel sekreterliği portalına başvurulması önerilir.",
        ],
      },
      {
        title: "Belediye ve sosyal güvenlik",
        paragraphs: [
          "Yerel ikametin Ayuntamiento’da kira sözleşmesi veya elektrik/su faturası ile teyit edildiği yazılır.",
          "İlk kez İspanya’da çalışacakların sosyal güvenlik üyelik numarası alması gerektiği; TA-1 formu ve kimlikle sosyal güvenlik dairesine gidildiğinde kart verildiği; sağlık merkezinde doktor atanması için bu kartın ibraz edildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "varis-kontrol",
    tocLabel: "Varış kontrol listesi",
    h2: "Belgeler ve iş kabulü öncesi kontroller",
    lead: "U formları, sağlık kartı ve sözleşme şartları.",
    accordions: [
      {
        title: "İş görüşmesine veya iş aramaya gitmeden önce",
        paragraphs: [
          "Geçerli AB/AEA pasaportu veya kimlik kartı; İspanyolca CV (birkaç nüsha veya güncellenebilir elektronik format), ön yazılar ve önceki iş referansları ile akademik belgeler gerektiği yazılır.",
          "Ülkenizdeki sosyal güvenlik kurumundan Avrupa Sağlık Kartı; iş ve prim süresini göstermek için U1–U4 formları ve/veya işsizlik hakkını İspanya’ya devretmek isteyenler için U7–U10 formları; devrin en fazla üç ay (altı aya uzatılabilir) olduğu ve SEPE bağlantısıyla ayrıntı verildiği belirtilir.",
          "Doğum belgesi fotokopisi ve “aile cüzdanı” (uzun doğum kaydı); gerekiyorsa yeminli tercüme; ehliyet vb. diğer izinler ifade edilir.",
        ],
      },
      {
        title: "İşi kabul etmeden önce",
        paragraphs: [
          "Geçerli kimlik/pasaport; iş sözleşmesi şartlarının (seyahat ve konaklama masraflarının kimde olduğu) anlaşılması; ücret ödeme yöntemi ve sıklığı; konut; sağlık güvencesi; ilk maaş veya dönüşe kadar yeterli nakit konularının kontrol edilmesi önerilir.",
        ],
      },
      {
        title: "Ülkeye dönmeden önce",
        paragraphs: [
          "İstihdam ofisinden U1 formu ile İspanya sosyal güvenlik primlerinin belgelenmesi; sözleşme ve bordroların saklanması; vergi dairesinde vergi durumunun kapatılması gerektiği yazılır.",
          "Belgelerin işlenmesinin zaman alabileceği ve mümkün olduğunca erken başvurulması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut",
    h2: "Kira, alım ve 2022–2025 konut planı",
    lead: "Idealista; beş veya yedi yıllık yenileme; tapu önü noter.",
    accordions: [
      {
        title: "Kiralama",
        paragraphs: [
          "İdealista, Milanuncios gibi sitelerin araştırılması; Konut Bakanlığı’nın kiracı–ev sahibi hakları, örnek sözleşmeler ve referans kira değerleri hakkında geniş bilgi verdiği yazılır.",
          "Sözlü sözleşmenin geçerli olduğu ancak yazılı düzenlemenin önerildiği; tarafların adı, konut tanımı, süre, kira ve diğer maddelerin yazılması gerektiği belirtilir.",
          "Süre gösterilmezse bir yıllık kabul edildiği; gerçek kişi kiracıda beş yıldan az, tüzel kişide yedi yıldan az başlangıç süresi kararlaştırılmışsa yıllık zorunlu yenilemeyle bu sürelere ulaşılana kadar uzatıldığı; kiracının süre veya yıllık yenileme tarihlerinden en az otuz gün önce yazılı bildirimde bulunmazsa yenilemenin devam ettiği ifade edilir.",
          "Genelde bir aylık depozito; “stresli konut piyasarı” bölgelerinde başlangıç kirasının tavanlanabileceği; kiranın genelde aylık ve TÜFE veya İNE’nin konut kira referans endeksi (IRAV) ile güncellendiği; 24 Mayıs 2023 tarihli Konut Hakkı Kanunu 12/2023’ün yürürlüğe girdiği belirtilir.",
          "Katalonya, Bask Ülkesi, Valencia, Balear ve Kanarya ile Madrid’de kiraların daha yüksek olduğu; şehir merkezinin çevreye göre pahalı olduğu yazılır.",
        ],
      },
      {
        title: "Satın alma ve plan",
        paragraphs: [
          "Satın almada işlemin noter huzurunda yapılması; bankalardan mortgage ve masraf bilgisi alınması gerektiği belirtilir.",
          "2022–2025 Konut Planı’nın konut satın alma desteği ve gençler ile altmış beş üstü için kira yardımları da dahil yenileme ve enerji verimliliğine vurgu yaptığı; Konut ve Şehir Gündemi Bakanlığı sitesinde yayımlandığı yazılır.",
          "Kaynak metinde ülke ortalaması yaklaşık 1.941 EUR/m² konut fiyatı verildiği; bölgeler arasında büyük fark olduğu ve yarı yıllık bülten yayımlayan değerleme şirketi verilerine bakılması gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "okul",
    tocLabel: "Okullar",
    h2: "Kamu, devlet destekli özel ve özel",
    lead: "Kayıt dönemleri ve okul günü modelleri.",
    accordions: [
      {
        title: "Okul türleri ve ücretler",
        paragraphs: [
          "Üç tip kurum olduğu: kamu (özerk topluluklara bağlı, zorunlu eğitim ücretsiz); devlet destekli özel (çoğu zorunlu eğitim ücretsiz, malzeme/kıyafet için düşük ücret); tam özel (aylık yaklaşık 300 EUR’dan 600 EUR üzerine kadar değişen ücretler) belirtilir.",
        ],
      },
      {
        title: "Gün ve takvim",
        paragraphs: [
          "Okul gününün kesintisiz (örneğin 08:30–15:00) veya öğle aralıklı (09:00–12:30 ve 15:00–17:00 gibi) olabildiği; ilkokullarda çoğunlukla bölünmüş, ortaokullarda çoğunlukla kesintisiz olduğu yazılır.",
          "Zorunlu kademeler için başvuruların mart–nisan’da başladığı; eylülde ek başvuru dönemi olduğu; zorunlu eğitimde okul değişiminin geçerli gerekçeyle yıl boyu kabul edilebildiği belirtilir.",
          "Ders yılının eylülde başlayıp haziranda bittiği; tatillerin Noel, Paskalya ve yaz etrafında döndüğü ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesmeler-2023",
    tocLabel: "Sözleşmeler (2023 reformu)",
    h2: "Sürekli, geçici ve eğitim sözleşmeleri",
    lead: "İş ve hizmet sözleşmesinin kalkması; HORECA ve tarım.",
    accordions: [
      {
        title: "Sözleşme türleri (özet)",
        paragraphs: [
          "Asgari çalışma yaşının on altı; on sekiz altı için veli izni gerektiği; on sekiz altıların gece, fazla mesai veya sağlığa zararlı koşullarda çalışamayacağı belirtilir.",
          "Sözleşmenin yazılı veya sözlü olabildiği; eğitim sözleşmeleri dışında tam veya yarı zamanlı yapılabildiği yazılır.",
          "2023 iş hukuku reformundan sonra sürekli iş sözleşmesi; inşaat sektörü sürekli sözleşmesi; geçici sözleşme; iş ve hizmet sözleşmesinin kalkması; üretim koşullarına bağlı sözleşme; işçi ikame sözleşmesi; kesikli süreli sözleşme; çift öğrenme ve staj sözleşmesi gibi başlıkların listelendiği belirtilir.",
        ],
      },
      {
        title: "Sürekli ve inşaat",
        paragraphs: [
          "Süresiz sözleşmenin ardışık sözleşmeler ve sürekli çalışana dönüş için yirmi dört ay içinde on sekiz ay sınırı içerdiği yazılır.",
          "İnşaat sürekli sözleşmesinde iş bitiminde işverenin beş gün içinde yazılı yeniden yerleşim teklifi yapma yükümlülüğü; teklifin reddi, eyalette yetersiz nitelik veya şantiye olmaması hallerinde fesih gerekçeleri sayılır.",
        ],
      },
      {
        title: "Geçici ve kesikli süreli",
        paragraphs: [
          "Üretim koşullarına bağlı geçici sözleşmede sürenin altı ayı geçmemesi; sektör anlaşmasıyla bir yıla uzayabildiği yazılır.",
          "İkame sözleşmesinde vekilin izinli çalışandan en fazla on beş gün önce işe başlayabildiği belirtilir.",
          "Kesikli süreli sözleşmenin mevsimlik ve ETT kullanımı için uygun olduğu; süreli veya süresiz olabildiği; sürekli işçiyle aynı haklara ve kıdem tazminatına hak kıldığı ifade edilir.",
        ],
      },
      {
        title: "Eğitim sözleşmeleri",
        paragraphs: [
          "Çift öğrenme ile iş deneyimi sözleşmelerinin sosyal güvenlik teminatı, doğum/evlat edinme/geçici iş göremezlik sürelerinde askı, sektörel toplu iş sözleşmesi, bireysel eğitim planı ve eğitime özgü ikramiyeler içerdiği yazılır.",
          "Çift öğrenmede sürenin en az üç en çok yirmi dört ay; birinci yılda fiili çalışma süresinin azami iş gününün yüzde altmış beşini, ikinci yılda yüzde seksen beşini aşamayacağı; telafi ücreti olmadığı ve olağanüstü hal dışında fazla mesai yasağı bulunduğu belirtilir.",
          "İş deneyimi sözleşmesinin üniversite, yüksek lisans, MYO veya eşdeğer resmî yeterlilik sahiplerine yöneldiği; sürenin en az altı en çok bir yıl ve aynı veya farklı işletmede tam veya yarı zamanlı olabildiği; fazla mesai olmadığı, ek saatlerin mümkün olduğu ve ücretin toplu iş sözleşmesinde tanımlandığı ifade edilir.",
        ],
      },
      {
        title: "HORECA, tarım ve CONECTA",
        paragraphs: [
          "Turizm sektörünün 2023’te GSYH’nin yaklaşık yüzde 12,8’ini oluşturduğu; faaliyetin çoğunlukla mevsimsel olduğu; anakara İspanya’da Paskalya–eylül/ekim, Kanarya’da sezonun daha uzun olduğu yazılır.",
          "Çalışanların çoğunlukla geçici, “kalıcı mevsimlik” veya belirli proje/hizmet sözleşmeleriyle işe alındığı; sözleşme modelleri için SEPE bağlantısının verildiği belirtilir.",
          "GSYH içinde tarımın 2022’de yüzde 2,34 olduğu; Endülüs, Murcia, Valencia ve Extremadura’da güçlü gelenekler bulunduğu; mevsimlik işlerin genelde “günlük” sözleşmelerle yapıldığı yazılır.",
          "Dışişleri Bakanlığı’nın uluslararası seyahat koşulları için 060 (yurt dışından +34 911252122) yardım hattı sunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-belgeleri",
    tocLabel: "Sözleşme belgeleri ve deneme",
    h2: "Yazılı bilgi ve contrat@ bildirimi",
    lead: "Nitelikli teknisyen için altı ay deneme; diğerleri iki ay.",
    accordions: [
      {
        title: "Yazılı zorunluluklar",
        paragraphs: [
          "Sözlü sözleşmenin yaygın olmadığı; üretim koşullarına bağlı dört haftadan kısa geçici işler dışında tüm sözleşmelerin yazılı olması ve işçiye şirket ve işçiyi tanımlayan bilgi, işyeri adresi, başlangıç ve bitiş tarihleri, meslek grubu ve görev, ücret ve ödeme sıklığı, çalışma saatleri, yıllık izin, fesih ihbar süreleri, uygulanan toplu iş sözleşmesi gibi bilgilerin verilmesi gerektiği yazılır.",
          "İmzadan sonra işverenin sözleşme içeriğini ve uzatmaları kamu istihdam servislerine elektronik olarak “contrat@” uygulamasıyla bildirmesi gerektiği belirtilir.",
        ],
      },
      {
        title: "Deneme süresi ve değişiklikler",
        paragraphs: [
          "Deneme süresinin sözleşmede kararlaştırıldığı; nitelikli teknisyenler için en fazla altı ay, diğer tüm işçiler için en fazla iki ay olduğu yazılır.",
          "Denemede tarafların herhangi bir nedenle ihbar veya tazminat ödemeden feshedebildiği; denemenin kıdeme sayıldığı ve bu dönemde diğer işçilerle aynı hak ve yükümlülüklerin geçerli olduğu belirtilir.",
          "Çalışma koşullarında işlevsel veya coğrafi mobilite ve önemli değişikliklerin yasal prosedüre tabi olduğu; işçinin görevlendirmeyi veya önemli değişikliği kabul etmemesi halinde yılda yirmi gün ücreti kadar tazminat hakkı doğduğu; böyle durumlarda derhal sendika temsilcilerine başvurulması önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-smi",
    tocLabel: "Ücret ve SMI",
    h2: "2024 asgari ücret ve FOGASA",
    lead: "On dört ödeme; günlük ve saatlik oranlar.",
    accordions: [
      {
        title: "Ulusal asgari ücret (2024)",
        paragraphs: [
          "Hükümetin her yıl ulusal asgari ücreti (SMI) belirlediği; tarım, sanayi veya hizmet fark etmeksizin cinsiyet veya sözleşme türü ayrımı yapılamayacağı; daha düşük ücretin yasadışı olduğu yazılır.",
          "2024 için brüt aylık 1.134 EUR (on dört ödeme) olduğu; mevsimlik veya günlük işlerde brüt 37,80 EUR/gün, günlük “casual” işlerde 53,71 EUR/gün ve ev çalışanları için 8,87 EUR/saat rakamlarının verildiği belirtilir.",
          "Bu tutarların yürürlükteki zam ve tazminatlarla artırıldığı; toplu iş sözleşmesi veya şirket anlaşmalarının her zaman daha yüksek asgari ücret koyabileceği ifade edilir.",
        ],
      },
      {
        title: "Bordro ve garanti",
        paragraphs: [
          "Ücretin genelde aylık ve asla daha uzun dönem için ödenmediği; bordroda şirket ve işçi bilgileri, ücret, sosyal güvenlik ve gelir vergisi (IRPF) kesintilerinin açıkça gösterilmesi gerektiği yazılır.",
          "İşverenin yasal kesintileri yapıp aktardığı; IRPF kesintisinin ücret ve aile durumuna göre değiştiği; işçinin işverene güncel bilgi vermesi gerektiği belirtilir.",
          "İşçi sosyal güvenlik priminin yaklaşık yüzde 6,35 olduğu ifade edilir.",
          "FOGASA’nın bağımsız bir organ olarak işçi ücreti ve fesih tazminatı garantisi verdiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi",
    tocLabel: "Çalışma süresi",
    h2: "Haftalık kırk saat ve fazla mesai tavanı",
    lead: "Dinlenme, gece ve on sekiz yaş altı.",
    accordions: [
      {
        title: "Normal süre ve dinlenme",
        paragraphs: [
          "Haftalık sürenin toplu iş sözleşmesinde veya sözleşmede belirlendiği; yıllık ortalamada normal çalışmanın kırk saati geçemeyeceği yazılır.",
          "Günlük çalışmanın genelde dokuz saati (on sekiz yaş altı için sekiz saat) aşamayacağı; altı saatten uzun günde en az on beş dakika (on sekiz yaş altı otuz dakika) ara verilmesi gerektiği belirtilir.",
          "İki iş günü arasında en az on iki saat; haftada en az bir buçuk kesintisiz gün dinlenme (çoğunlukla pazar tamamı ve cumartesi öğleden sonra veya pazartesi sabahı) olduğu yazılır.",
          "On sekiz yaş altı için iki kesintisiz gün dinlenme ve gece çalışması yasağı bulunduğu ifade edilir.",
          "Ailevi nedenlerle kısmi süre, cinsel şiddet veya terör mağduru için azaltılmış iş günü gibi yasal istisnaların anıldığı belirtilir.",
        ],
      },
      {
        title: "Fazla mesai",
        paragraphs: [
          "Fazla mesainin normal sürenin üzerindeki saatler olduğu; toplu iş veya bireysel sözleşmede veya kaza/olağanüstü zararı önlemede aksi kararlaştırılmadıkça gönüllü olduğu yazılır.",
          "Gece fazla mesainin yasak olduğu; on sekiz yaş altı için de yasak bulunduğu; telafi dinlenmesi veya ücretle ödenebildiği belirtilir.",
          "Yılda en fazla seksen saat fazla mesai yapılabildiği; şirket standart saatinden az çalışanın tavanının orantılı düştüğü ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "izinler",
    tocLabel: "İzinler",
    h2: "Yıllık izin, ücretli izinler ve doğum izni",
    lead: "Haziran 2023 iş–yaşam dengesi güncellemeleri.",
    accordions: [
      {
        title: "Yıllık izin ve resmî tatiller",
        paragraphs: [
          "Yıllık iznin toplu iş veya sözleşmede belirlendiği; hiçbir durumda otuz takvim gününden az olamayacağı ve nakitle değiştirilemeyeceği yazılır.",
          "Takvimin mümkün olduğunca tarafların anlaşmasıyla belirlendiği belirtilir.",
          "Yılda on dört resmî tatil olduğu; ikisinin yerel tatil olduğu; Noel, Yılbaşı, 1 Mayıs ve 12 Ekim’in ulusal tatil sayıldığı; pazar’a denk gelen tatillerin ertesi pazartesiye kaydırıldığı ifade edilir.",
        ],
      },
      {
        title: "Ücretli izinler (Haziran 2023 sonrası özet)",
        paragraphs: [
          "Evlenme veya evlilik dışı ortaklık kurma için on beş takvim günü; birinci derece akrabanın ölümü, ciddi kaza veya hastalık veya hastanede yatış için beş gün; taşınma için bir gün; doğum öncesi testler ve evlat edinme/eğitim için gerektiği kadar süre; erken doğumda yatan bebek için iş günü başına bir saat; dokuz aydan küçük bebeği emzirme için günde bir saat veya gün başı/sonu yarım saat (anne veya baba); on iki yaşından küçük çocuk veya engelli kişinin vasisi için sekizte bir ile yarım arası işgünü kısaltması; kamusal ve kişisel yükümlülükler; sendika temsil görevleri için yasal veya TİS süresi kadar izin verildiği yazılır.",
          "Hak kullanımda önceden bildirim ve gerekçelendirme gerektiği belirtilir.",
        ],
      },
      {
        title: "Ücretsiz izin, hastalık, doğum ve ayrılma",
        paragraphs: [
          "Ücretsiz iznin yalnızca bireysel veya toplu anlaşmayla düzenlendiği; kanunda genel çerçeve olmadığı yazılır.",
          "Hastalık izninde geçici iş göremezlikte en az gelirin yüzde altmışının ödendiği; işverenin geçici ödemeyi yapıp sosyal güvenlikten rücu ettiği; on sekiz aya kadar sürebildiği ve sonra durumun gözden geçirileceği belirtilir.",
          "Doğum izninin kesintisiz on altı hafta (çoklu doğumda ikinci çocuktan itibaren her çocuk için iki hafta ek) olduğu; altı haftanın doğumdan hemen sonra zorunlu kullanımına dikkat çekildiği; her iki ebeveyn çalışıyorsa babanın da izin payı kullanabildiği yazılır.",
          "2019’dan itibaren doğumda diğer ebeveyne biyolojik anneyle aynı süre verildiği; ilk dört haftanın doğumdan hemen sonra zorunlu olduğu belirtilir.",
          "Evlat edinme veya koruyuculukta her ebeveyne on altı hafta verildiği ifade edilir.",
          "İşten ayrılmanın kamu görevi veya il sendikası düzeyinde zorunlu, gönüllü (en az bir yıl çalışma, dört ay–beş yıl), aile bakımı (çocuk başına en çok üç yıl; bakıma muhtaç akraba için iki yıl, TİS ile uzatılabilir) ve anlaşmalı türler olarak düzenlendiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "fesih",
    tocLabel: "İşin sonu",
    h2: "Finiquito, uzlaşma ve mahkeme",
    lead: "Süreli sözleşmelerde 2015 sonrası kıdem hesabı.",
    accordions: [
      {
        title: "Belgeler ve fesih nedenleri",
        paragraphs: [
          "İlişkinin sonunda işverenin şirket belgesi, prim belgeleri ve ödenecek kalemleri gösteren “finiquito” vermesi gerektiği yazılır.",
          "Fesheden tarafın sözleşme veya TİS’teki ihbara uyması gerektiği; tarafların anlaşması, sözleşmede yazılı nedenler, süre dolması, istifa, ölüm veya maluliyet, mücbir sebep, bireysel veya toplu işten çıkarma, cinsel şiddet mağduru işçinin zorunlu istifası, işveren ihlaliyle işçinin talebi gibi fesih nedenlerinin sayıldığı belirtilir.",
          "İkame ve eğitim sözleşmeleri dışında süreli sözleşmelerde Ocak 2015’ten itibaren yılda on iki günlük ücret üzerinden hizmet süresi başına tazminat olduğu ifade edilir.",
        ],
      },
      {
        title: "Uzlaşma ve dava",
        paragraphs: [
          "İşveren feshinde işçinin itirazı halinde önce uzlaşma başvurusunun zorunlu olduğu; fesih tarihinden itibaren cumartesi, pazar ve resmî tatiller hariç yirmi iş günü içinde başvurulması gerektiği yazılır.",
          "Uzlaşmada işe iade veya tazminat anlaşması sağlanabileceği; anlaşma çıkmazsa iş mahkemesine gidilebildiği belirtilir.",
        ],
      },
      {
        title: "Emeklilik (özet)",
        paragraphs: [
          "Genel kural olarak emeklilik yaşının altmış yedi veya sisteme otuz sekiz yıl altı ay prim ödenmişse altmış beş olduğu; 2013’ten itibaren kademeli uygulandığı yazılır.",
          "En az on beş yıl primle emeklilik maaşı hakkı doğduğu; tutarın prim yıllarına bağlı olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve grev",
    h2: "Kollektif eylem ve asgari hizmet",
    lead: "Grevde sözleşme askıda; ücret yok.",
    accordions: [
      {
        title: "Temsil ve toplu pazarlık",
        paragraphs: [
          "Asker ve yargı mensupları dışında herkesin sendikaya üye olabildiği; sendikaların ücret ve çalışma koşulları üzerinden toplu pazarlık yürüttüğü yazılır.",
          "On–elli işçi arasında işyeri temsilcisi, elli ve üzerinde işyeri komitelerinin koordinasyonla çalıştığı belirtilir.",
        ],
      },
      {
        title: "Grev ve lokavt",
        paragraphs: [
          "Anayasa’nın işçi ve işverenin kolektif çatışma hakkını tanıdığı; grevin koşulları iyileştirmek veya memnuniyetsizlik bildirmek için işin toplu durdurulması olduğu yazılır.",
          "Grev hakkının kullanımının iş sözleşmesini sona erdirmediği; grevde bulunanların cezalandırılamayacağı ve yerlerine başka işçi konamayacağı; grev istemeyenlerin çalışma özgürlüğünün korunması ve güvenlik/bakım için asgari hizmet zorunluluğu bulunduğu belirtilir.",
          "Lokavtın işverenin grev veya düzensizlikte risk halinde işyerini kapatması olduğu ifade edilir.",
          "Grev ve lokavtta sözleşmenin askıda sayıldığı; ücret ödenmediği; sosyal güvenliğin özel rejimle sürdüğü; grev sırasında başlayan kısa süreli iş göremezlik veya işsizlik yardımına hak olmadığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "vergi",
    tocLabel: "Vergi ve maaş ortalamaları",
    h2: "IRPF, KDV ve kurumlar vergisi",
    lead: "2023 ortalama maaş; tek işverenden 22.000 EUR eşiği.",
    accordions: [
      {
        title: "Gelir ve istihdam vergisi",
        paragraphs: [
          "2023’te ortalama yıllık brüt maaşın 26.556 EUR (aylık 2.113 EUR, on iki ödeme) olduğu; bölge, sektör ve meslek düzeyine göre farklılık bulunduğu yazılır.",
          "Aylık bordrodan sosyal güvenlik ve diğer kesintilerin yaklaşık yüzde 6–7; IRPF’nin aile durumu, ücret ve sözleşme tipi ile ikamet bölgesine göre değiştiği belirtilir.",
          "Bir yıldan kısa geçici sözleşmeler ile iş deneyimi sözleşmelerinde stopajın yüzde 2 olduğu yazılır.",
          "Vergi mukimi olmayan AB ülkesi sakinleri için gelir vergisinin yüzde 19; AB dışı için yüzde 24 olduğu ifade edilir.",
          "IRPF’nin takvim yılı gelirine göre kademeli olduğu; tek gelir kaynağı ve işverenden yıllık 22.000 EUR’a kadar beyan yükümlülüğünün başlamayabildiği; beyanın ertesi yıl mayıs–haziran’da yapılması ve gecikme cezası riski bulunduğu belirtilir.",
          "Takvim yılında yüz seksen üç veya daha fazla gün İspanya’da yaşayanların genelde dünya genelindeki geliri beyan etmesi gerektiği; ikamet belirlemede aile ve ekonomik bağların da dikkate alındığı; emin olunamıyorsa danışmanlık önerildiği yazılır.",
          "İspanya’da yüz seksen üç günden az çalışıp başka AEA ülkesine gidenlerin, form 215, yeni ülke ikamet belgesi ve yapılan kesintilerin belgesiyle dört yıl içinde kısmi iade talep edebildiği ifade edilir.",
        ],
      },
      {
        title: "Kurumlar, KDV ve yerel vergiler",
        paragraphs: [
          "Kurumlar vergisinin genelde yüzde 25 olduğu; özel oranların bulunduğu yazılır.",
          "KDV’nin mal ve hizmet arzı ile ithalatta yüzde 21 standart; bazı ürün ve hizmetlerde yüzde 4 veya 10 indirimli oran ve muafiyetler bulunduğu belirtilir.",
          "Gayrimenkul alımı ve ipotek gibi işlemlerde özel vergi ve harçların yanı sıra tüketim ürünlerine özel tüketim vergilerinin anıldığı; belediyelerin emlak ve araç vergisi gibi yerel vergiler koyduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-maliyeti",
    tocLabel: "Yaşam maliyeti",
    h2: "TÜFE ve örnek fiyatlar",
    lead: "2024 TÜFE yüzde 2,8; harcama kırılımı.",
    accordions: [
      {
        title: "Genel tablo",
        paragraphs: [
          "Yaşam standardının kabul edilebilir olduğu; son yıllardaki krizlerin ekonomi ve bazı kamu hizmetlerini etkilediği yazılır.",
          "Sağlık ve eğitimin evrensel veya düşük maliyetle erişilebilir olduğu belirtilir.",
          "2024 tüketici fiyat endeksinin yüzde 2,8 olduğu; haneharcamanın yüzde 31,7’sinin konut ve yakıt, yüzde 16,3’ünün gıda ve alkolsüz içecekler, yüzde 11,6’sının ulaşım olduğu ifade edilir.",
        ],
      },
      {
        title: "Örnek fiyatlar (kaynak listesi)",
        paragraphs: [
          "Ekmek 1–1,40 EUR; süt (litre) 0,80–1,30 EUR; on iki yumurta 2,80–3,50 EUR; elma kg 2 EUR; domates kg 2–3,50 EUR; şampuan 3–5 EUR; deodorant 2–3 EUR; etek veya pantolon 30–60 EUR; sinema bileti 7–9 EUR; kahve 1,50–1,80 EUR; bira 2,70–3,50 EUR; hamburger 3–8 EUR; uygun fiyatlı öğle menüsü 14 EUR’dan; tek biniş otobüs/metro 1,50 EUR; on binişlik bilet 12,20 EUR; benzin/dizel litre 1,30–1,50 EUR aralığında verildiği yazılır (bölgeye göre değişir).",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "SNS ve üniversite maliyetleri",
    lead: "Özel sigorta oranı; bölgesel diller.",
    accordions: [
      {
        title: "Kamu ve özel sağlık",
        paragraphs: [
          "Hizmetlerin sosyal güvenlik sistemine bağlı kamu hastaneleri, özel hastaneler ve birinci basamak sağlık merkezleri üzerinden sunulduğu yazılır.",
          "İspanya’da sağlık hizmetinin evrensel ve ücretsiz olduğu; finansmanın primlerle sağlandığı ve özerk bölgelerce yönetildiği; nüfusun yüzde doksanından fazlasının bu sistemi kullandığı belirtilir.",
          "Çalışan ve serbest meslek sahiplerinin kayıt ve prim ödemesi zorunlu olduğu; sağlık kartı için yerel merkeze başvurulduğu yazılır.",
          "Uzman için aile hekimi sevkı; acilde en yakın servise gidilmesi veya 112 ile ambulans çağrılması önerilir.",
          "Reçeteli ilaçlarda hastanın katkı payı ödediği; mesai dışı eczane düzeninin bulunduğu belirtilir.",
          "Sosyal güvenlik dışındaki AB vatandaşlarının geçici ziyarette kendi ülkelerinden Avrupa Sağlık Kartı ile yararlanabildiği ifade edilir.",
          "2023’te özel sağlık sigortalı oranının yüzde 25’e yükseldiği; yaklaşık kırk yaşında aylık 30–55 EUR aralığında örnek prim verildiği yazılır.",
        ],
      },
      {
        title: "Eğitim sistemi (özet)",
        paragraphs: [
          "Okul öncesi ve anaokulu (0–6 yaş, ikinci üç yıllık dönem ücretsiz yaygın); ilkokul (6–12 zorunlu ve kamu/destekli özelde ücretsiz); zorunlu ortaöğretim ESO (12–16); baccalaureate veya orta seviye MYO seçenekleri; yüksek MYO ve üniversite (lisans, yüksek lisans, doktora) kademelerinin anıldığı belirtilir.",
          "Kamu üniversite ücretinin özerk hükümetlerce belirlendiği ve toplam maliyetin yaklaşık yüzde 25’inin öğrencide kaldığı; özel ücretlerin düzenlenmediği ve çok daha yüksek olduğu yazılır.",
          "Galiçya, Katalonya veya Bask Ülkesi’nde bazı derslerin bölgesel dilde verilebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "devlet-yonetimi",
    tocLabel: "Devlet ve SEPE",
    h2: "Parlamenter monarşi ve on yedi özerk topluluk",
    lead: "İstihdam politikası merkez–bölge koordinasyonu.",
    accordions: [
      {
        title: "Siyasi yapı",
        paragraphs: [
          "İspanya’nın parlamentar monarşi olduğu; Kralın devlet başı, hükümetin ise iç ve dış politikayı anayasa ve yasalara göre belirlediği yazılır.",
          "Cortes Generales’in Kongre ve Senato’dan oluştuğu; dört yılda bir genel seçimlerin yapıldığı; on sekiz yaş üstü vatandaşların oy kullanabildiği belirtilir.",
          "On yedi özerk topluluk ve iki özerk şehir (Ceuta, Melilla) bulunduğu; her topluluğun kendi hükümeti ve parlamentosu olduğu yazılır.",
          "İş ve sosyal güvenlik hukukunun tek ve ülke çapında olduğu; uygulamanın özerk topluluklara bırakıldığı ifade edilir.",
        ],
      },
      {
        title: "Ulusal istihdam sistemi",
        paragraphs: [
          "Ulusal istihdam sisteminin yapı, önlem ve eylemlerden oluştuğu; uygulamanın bölgesel koşullara göre merkeziyetçi olmadan yürütüldüğü; SEPE ile özerk istihdam servislerinin temel direkler olduğu ve paydaşlarca koordinasyon sağlandığı belirtilir.",
          "SEPE’nin işsizlik yardımlarını yönettiği, istihdam politikası programlarını geliştirdiği ve bölgesel ağı koordine ettiği; özerk servislerin işsiz veya çalışan kişi ve işletmelere destek yetkisi taşıdığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "ulasim-kultur",
    tocLabel: "Ulaşım ve kültür",
    h2: "Karayolu, hava ve sosyal yaşam",
    lead: "2024’te üç yüz milyon+ havalimanı yolcusu.",
    accordions: [
      {
        title: "Ulaşım",
        paragraphs: [
          "Otoyol ve ana yolların en yüksek hız sınırının 120 km/s, ulusal yolların 90 km/s olduğu; hiyerarşik karayolu ağının tüm köylere ulaştığı yazılır.",
          "2024’te İspanya havalimanlarından üç yüz milyondan fazla yolcu geçtiği; en büyüklerinin Madrid-Barajas ve Barselona olduğu; şehirlerarası hava köprüsünün yılda 2,5 milyondan fazla yolcu taşıdığı belirtilir.",
          "Büyük şehirlerde metronun genelde 06:00–01:30 arası çalıştığı; banliyö, bölgesel ve yüksek hızlı tren (AVE) ağının ülkeyi sardığı yazılır.",
        ],
      },
      {
        title: "Günlük yaşam ve kültür",
        paragraphs: [
          "Ailenin ve arkadaşlıkların sosyal yaşamda merkezde olduğu; selamlaşmada samimi dil ve fiziksel temasın yaygın olduğu; konuşurken araya girme alışkanlığının kaba sayılmadığı yazılır.",
          "Öğle yemeğinin 13:30–15:30, akşamın 21:00–23:00 aralığında olduğu; hafta sonu dışarıda yemek kültürünün güçlü olduğu belirtilir.",
          "Gece hayatının canlı olduğu; geleneksel festivallerin dini kökenlere dayandığı ve alışverişin popüler olduğu; mağazaların genelde 10:00–20:00 arası açık olduğu ifade edilir.",
        ],
      },
      {
        title: "Özel hayat istatistikleri (2023)",
        paragraphs: [
          "Kadın başına doğurganlık oranının 1,12 ile Avrupa’nın en düşüklerinden olduğu; erkeklerde beklenen yaşam 81,1, kadınlarda 86,34 yıl olduğu yazılır.",
          "İlk evlilik yaşının kadınlarda 34,88, erkeklerde 36,94 olduğu; dini nikâhların azalıp medeni nikâhların çoğaldığı; eşcinsel çiftlerin 2005’ten beri evlenip evlat edinebildiği belirtilir.",
          "Boşanmaların evlilik dağılımının yüzde 95,8’ini oluşturduğu; velayetin yüzde 48,4’ünde ortak modelin anneye üstünlükten ilk kez geçtiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yüzde 33 tanıma ve yüzde 2 kota",
    lead: "Bölge değerlendirme merkezleri ve SEPE teşvikleri.",
    accordions: [
      {
        title: "Tanım ve başvuru",
        paragraphs: [
          "İspanya’nın BM Engelli Hakları Sözleşmesiyle uyumlu standart tanım kullandığı; kalıcı engelin engellerle etkileşimde topluma tam katılımı zorlaştırabileceği yazılır.",
          "Özerk topluluğun engelli değerlendirme ve rehberlik merkezinden randevu alınması; Ceuta ve Melilla’da IMSERSO’nun süreç yürüttüğü belirtilir.",
          "Kimlik, tıbbi ve sosyal hizmet raporları ve varsa yabancı kararların getirilmesi; çok disiplinli değerlendirme sonrası yüzde 33 ve üzeri engel derecesinin çoğu istihdam önlemi için eşik olduğu yazılır.",
        ],
      },
      {
        title: "İşveren destekleri",
        paragraphs: [
          "Elli ve üzeri çalışanı olan kamu ve özel işverenlerin en az yüzde 2’sinin tanınmış engeli yüzde 33 ve üzeri çalışanlardan oluşması gerektiği belirtilir.",
          "İşe alım teşvikleri, işyeri uyarlama hibeleri, destekli istihdam ve özel istihdam merkezlerinden bahsedilir.",
          "Kamu kadrolarında engelli kişiler için en az yüzde 7 rezervasyon (koşullara ve sınav başarısına bağlı) olduğu yazılır.",
        ],
      },
      {
        title: "Günlük yaşam ipuçları",
        paragraphs: [
          "Renfe “Tarjeta Dorada” ile demiryolunda indirim örneği; şehirlerde indirimli kart ve refakatçı düzenlemelerinin yerel otorite sitelerinden doğrulanması gerektiği belirtilir.",
          "Konut aramada erişilebilirlik filtreleri ve engelli örgütlerinin derlediği ilan sitelerinin kaynakta anıldığı ifade edilir.",
        ],
      },
    ],
  },
];
