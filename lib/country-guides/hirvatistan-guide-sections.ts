import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Croatia” (17/03/2026, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const HIRVATISTAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Hırvatistan’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Hırvat İstihdam Kurumu (HZZ) Burza rada, özel iş portalları ve geçici iş ajansları; kronolojik CV ve başvuru biçimi; HZZ önlemleri kapsamında staj (pripravništvo) ve genç işsizlere destek; zanaat ve meslekî eğitim (naukovanje, JMO modeli, HOK); kira ve metrekare fiyatları; anaokulu ve e-okul kayıtları; AEA/İsviçre için üç aylık kalış ve geçici ikamet kaydı ile OIB; üçüncü ülke vatandaşları için kısa, geçici, uzun süreli ve kalıcı oturum türleri; yazılı iş sözleşmesi, deneme süresi ve mevsimlik tarım çalışması (günlük kupon); 2026 asgari brüt ücret, çalışma süresi ve yıllık izin; fesih ve ihbar; vergi, KDV ve tüketici fiyat endeksi; zorunlu sağlık sigortası (HZZO) kademeleri; ulaşım omurgası ve engelli istihdamı (%3 açık piyasa) başlıklarında kamu bilgisine dayanır.",
  "Metindeki ücretler, ücretlendirme süreleri ve bürokratik süreçler güncellenebilir; doğrulama için hzz.hr, mup.gov.hr, mvep.gov.hr, porezna-uprava.hr ve hzzo.hr kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const HIRVATISTAN_SEO_KEYWORD_TAGS: string[] = [
  "hırvatistan vize",
  "hırvatistan schengen",
  "HZZ Hrvatski zavod za zapošljavanje",
  "Burza rada",
  "OIB Hırvatistan",
  "privremeni boravak",
  "Hırvatistan asgari ücret 2026",
  "HZZO zdravstveno",
];

export const HIRVATISTAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "HZZ, Burza rada ve özel portallar",
    lead: "Kamu ilanlarından şirket sitelerine ve geçici iş ajanslarına kadar geniş kanal yelpazesi.",
    accordions: [
      {
        title: "İlan kaynakları",
        paragraphs: [
          "İşverenlerin boş kadroları Hırvat İstihdam Kurumu (HZZ) sitesinde, özel iş arama portallarında ve şirketlerin kendi sitelerinde yayımladığı; ilan panoları, günlük gazeteler, meslekî dergiler ve odaların web sitelerinde de ilan bulunabildiği yazılır.",
          "Kamu sektörü kadrolarının Resmî Gazete (Narodne novine) ve merkezi istihdam sistemi (selekcija.gov.hr) üzerinden duyurulabildiği belirtilir.",
          "Küçük yerleşimlerde özel işverenlerin radyo ilanı kullanabildiği ifade edilir.",
          "Büyük işverenlerin kendi sitelerinde çevrimiçi başvuru formları ile aday havuzu oluşturabildiği; küçük işverenlerin özel kanal ve tavsiye ile aday aradığı yazılır.",
        ],
      },
      {
        title: "Geçici işe yerleştirme ajansları",
        paragraphs: [
          "Ara sıra ve geçici istihdam ajanslarının aday veri tabanı sunduğu; çalışanın sözleşmeyi ajansla imzalayıp ajansın geçici ihtiyaç duyan işverene personel sağladığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru",
    h2: "CV, belgeler ve mülakat",
    lead: "İlan başına talimatlar bağlayıcıdır; Hırvatça CV yaygın beklentidir.",
    accordions: [
      {
        title: "CV ve belgeler",
        paragraphs: [
          "Başvuru biçiminin her ilanda açıklandığı; CV’nin kronolojik düzenlenmesi ve kişisel veriler, eğitim, ek bilgi ve beceriler ile iş deneyimini içermesi gerektiği yazılır.",
          "CV’nin bilgisayarda yazılması ve aksi istenmedikçe Hırvatça olmasının beklendiği; fotoğrafın zorunlu olmadığı ancak pasaport fotoğrafı eklenebildiği belirtilir.",
          "Kamu işverenlerinin formlara ek olarak CV, diploma ve sınav belgeleri, sabıka kaydı olmadığına dair belge, uyruk ve ikamet kanıtı gibi evraklar isteyebildiği ifade edilir.",
          "Özel sektörde çoğu zaman e-posta ile CV ve mesleki sınav sertifikalarının gönderildiği; bazen yalnızca işveren sitesindeki çevrimiçi başvurunun kabul edildiği; küçük işletmelerde telefonla başvurunun yeterli olabildiği yazılır.",
        ],
      },
      {
        title: "Mülakat ve ayrımcılık yasağı",
        paragraphs: [
          "Açık başvuruların genelde olumlu karşılandığı; ilanda belirtilmeyen kanalla (e-posta yerine telefon gibi) başvurunun uygun olmayabildiği belirtilir.",
          "Mülakat öncesi işveren faaliyeti, işyeri yapısı ve giyim kodu hakkında araştırma yapılması; geç kalma ve dağınık görünümün elenmeye yol açabildiği ifade edilir.",
          "Aday seçimi ve sözleşme imzasında işverenin iş ilişkisiyle doğrudan bağlantısı olmayan bilgileri (medeni durum, hamilelik, din, milliyet vb.) isteyemeyeceği yazılır.",
        ],
      },
      {
        title: "Yardımcı bağlantılar",
        paragraphs: [
          "europass.hr, HZZ’nin ön yazı ve CV rehberi, e-usmjeravanje.hzz.hr mülakat hazırlığı ve CISOK kariyer danışmanlığı sayfalarının kullanılabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj-hzz",
    tocLabel: "Staj (pripravništvo)",
    h2: "İşgücü Piyasası Kanunu ve HZZ önlemleri",
    lead: "Resmî “staj” tanımı tek cümlede değil; aktif istihdam politikası ölçütleriyle çerçevelenir.",
    accordions: [
      {
        title: "Amaç ve süre",
        paragraphs: [
          "Hırvatistan’da stajın; İşgücü Piyasası Kanunu ve İş Kanunu çerçevesindeki kategorilerle tanımlandığı; aktif istihdam önlemlerinin işgücü rekabetini artırmayı hedeflediği yazılır.",
          "HZZ’nin uyguladığı staj ve genç işsiz desteğinin; mesleğinde ilk kez istihdam edilen veya yirmi dokuz yaş altı ve HZZ işsiz kaydında olanlar için ücret ve giderlerin eş finansmanını içerdiği belirtilir.",
          "Stajın genelde bir yılı geçmemesi; meslek sınavı için kanunda aksi öngörülmedikçe eş finansmanın yirmi dört aydan uzun süremeyeceği ifade edilir.",
        ],
      },
      {
        title: "Uygunluk",
        paragraphs: [
          "AEA üyesi ülkelerin vatandaşlarının Hırvat vatandaşlarıyla aynı koşullarda programa katılabildiği; Hırvatistan’da ikamet yerinin beyan edilmesi ve Hırvat işgücü piyasasına serbest erişimin gerekli olduğu yazılır.",
          "Üçüncü ülke vatandaşlarının; İçişleri Bakanlığı’ndan uzun süreli veya kalıcı oturum verilmişse aktif istihdam önlemlerinden yararlanabildiği (İşgücü Piyasası Kanunu md. 15) belirtilir.",
        ],
      },
      {
        title: "Kaynaklar",
        paragraphs: [
          "Önlem ayrıntılarının mjere.hzz.hr ve 2026 destek duyurusu için mjere.hzz.hr/mjere/potpore-za-pripravnistvo-i-mlade-2026 adresinde bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "naukovanje",
    tocLabel: "Çıraklık ve meslekî eğitim",
    h2: "Zanaat kanunu, JMO ve HOK",
    lead: "On beş yaşında meslekî eğitime giriş; zanaat atölyelerinde lisans ve usta çırak sözleşmesi zorunludur.",
    accordions: [
      {
        title: "Çerçeve",
        paragraphs: [
          "Zanaat Kanunu ve Meslekî Eğitim Kanunu’nun meslek okulları, eğitim süreleri ve yeterlilikleri düzenlediği yazılır.",
          "Meslek okullarının teknik, sağlık, ekonomi, ticaret, tarım vb. alanlarda dört veya beş yıl; sanayi ve zanaat okullarında üç yıl programların bulunduğu; bir–iki yıllık basit meslek programlarının daha düşük yeterlilik verdiği belirtilir.",
          "Zanaat programlarında Jedinstveni model obrazovanja (JMO) ile teorinin okulda, pratiğin çoğunlukla işletmede yürütüldüğü; çırak kabul eden işletmenin HOK’tan izin veya lisans alması ve yazılı çıraklık sözleşmesi imzalaması gerektiği ifade edilir.",
          "Çıraklık sonunda çırağın ustalık sınavına girebildiği ve genel dersleri tamamlayanların final sınavı ile ortaöğretim diploması alabildiği yazılır.",
        ],
      },
      {
        title: "AB vatandaşları ve yurtdışından çırak",
        paragraphs: [
          "AB vatandaşlarının Meslekî Eğitim Kanunu uyarınca Hırvat vatandaşlarıyla aynı meslekî eğitim ve çıraklık hakkına sahip olduğu ve VET kurumlarına aynı koşullarda kayıt olunabildiği belirtilir.",
          "Yurtdışından çıraklık için işverenlerin AB hareketlilik ajansı ampeu.hr ve Erasmus+ programlarıyla iletişim kurabileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-okul",
    tocLabel: "Konut ve okul",
    h2: "Kira, metrekare ve e-kayıt",
    lead: "Adriyatik turizm merkezleri ve Zagreb’de fiyatlar ülke içi ortalamadan yüksektir.",
    accordions: [
      {
        title: "Konut",
        paragraphs: [
          "Kira veya satın alma aramasının web, basın ve emlakçılar üzerinden yoğun şekilde yürütüldüğü; kira depozitosunun çoğu zaman bir aylık kira olduğu ve çıkışta iade edildiği yazılır.",
          "Emlakçı komisyonunun kiralamada genelde bir aylık kiraya, satın almada yaklaşık mülk fiyatının %3’üne denk gelebildiği belirtilir.",
          "Örnek ortalama aylık kira rakamlarının Zagreb için yaklaşık 923 EUR, Split 904, Rijeka 763, Osijek 487 olduğu; faturanın kira bedeline dahil olmayabildiği ve yardımcı giderlerin ortalama aylık 120–240 EUR bandında değişebildiği ifade edilir.",
          "2025 ikinci yarısında yeni daire için ortalama metrekare fiyatının yaklaşık 2.861 EUR/m² olduğu; doğu ve kırsalda 1.500 EUR/m² altına inilebildiği, kıyıda 3.000–4.000 EUR/m² ve Dubrovnik’te daha yüksek seviyeler görülebildiği yazılır.",
        ],
      },
      {
        title: "Okul kayıtları",
        paragraphs: [
          "Anaokulu başvurularının genelde Nisan–Mayıs duyurusunda; 31 Ağustos’a kadar bir yaşını doldurmuş çocukların uygun olduğu belirtilir.",
          "İlkokul kaydının yerel yönetim duyurusunda (genelde Şubat) ve ulusal bilgi sistemi üzerinden (osnovneadmin.e-upisi.hr) yapılabildiği yazılır.",
          "Ortaokula srednje.e-upisi.hr üzerinden başvurulduğu; üniversiteye kamu ihale şartlarında en geç 1 Mayıs’ta ilanla başvurulduğu ve AB öğrencilerinin Hırvat vatandaşlarıyla eşit haklara sahip olduğu; askeri veya polis eğitimi gibi ulusal güvenlik programlarında kısıtlama olabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-oib",
    tocLabel: "İkamet ve OIB",
    h2: "AEA/İsviçre ve üç aydan uzun kalış",
    lead: "Geçici ikamet kaydı poliste; OIB vergi dairesi veya ikamet sırasında düzenlenir.",
    accordions: [
      {
        title: "AEA ve İsviçre",
        paragraphs: [
          "AEA üyesi veya İsviçre vatandaşının geçerli seyahat belgesi veya kimlik kartı ile üç aya kadar kalabildiği; üç aydan uzun kalışlarda ikamet yerindeki polis idaresine veya karakola geçici ikamet kaydı yaptırılması ve derhal kayıt belgesi alınması gerektiği yazılır.",
          "Kayıtta kişisel kimlik numarası (OIB) verildiği; ikamet öncesi de OIB’in vergi idaresinden talep edilebildiği belirtilir.",
          "Kesintisiz beş yıl yasal kalıştan sonra kalıcı oturum hakkının kullanılabildiği ifade edilir.",
        ],
      },
      {
        title: "Üçüncü ülke vatandaşları (özet)",
        paragraphs: [
          "Kısa süreli kalışın (Schengen üyesi ülkeler toplamında her 180 günde en fazla doksan gün), geçici oturumun (en fazla iki yıl), uzun süreli ve kalıcı oturum izinlerinin bulunduğu yazılır.",
          "Geçici oturumun aile birleşimi, eğitim, çalışma, dijital göçebe, gönderilen işçi ve benzeri amaçlarla verilebildiği; başvurunun çoğu zaman yurtdışındaki diplomatik temsilcilikte, vizesiz girişte ise polis idaresinde yapılabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "varis-pratik",
    tocLabel: "Varış pratikleri",
    h2: "OIB, vergi kartı ve banka",
    lead: "Euro para birimi; kart ödemesi yaygındır.",
    accordions: [
      {
        title: "Üç aydan sonra",
        paragraphs: [
          "Üç aydan uzun kalınacaksa üç aylık sürenin bitiminden itibaren en geç sekiz gün içinde geçici ikametin kaydettirilmesi gerektiği; polisin derhal belge verdiği yazılır.",
          "Çalışmaya başlamadan önce ikamet yerindeki vergi idaresinden “porezna kartica” talep edilmesi ve işe başlarken işverene teslim edilmesi gerektiği belirtilir.",
          "OIB’in kurumlarla iletişim, ödeme, telekom ve işe giriş için zorunlu olduğu ifade edilir.",
        ],
      },
      {
        title: "Yanınızda getirin",
        paragraphs: [
          "Kimlik, ehliyet, diplomalar, yeminli tercüme ihtiyacı, Avrupa Sağlık Kartı ve sosyal güvenlik aktarım belgelerinin (ör. işsizlik için AB formları) bulundurulması önerilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-tipleri",
    tocLabel: "İstihdam türleri",
    h2: "Belirsiz süreli, süreli ve mevsimlik",
    lead: "Yazılı sözleşme yoksa belirsiz süreli kabul edilir; deneme en fazla altı ay.",
    accordions: [
      {
        title: "Genel kurallar",
        paragraphs: [
          "İstihdamın çoğu tam zamanlı belirsiz süreli olduğu; belirli iş veya süre için süreli sözleşmenin kullanılabildiği yazılır.",
          "Deneme süresinin en fazla altı ay olabildiği; tam zamanlı oranına kadar birden fazla işverenle sözleşme yapılabildiği, aşan saatler için yazılı rıza ile başka işverende haftada en fazla sekiz saat veya yılda yüz seksen saat çalışılabildiği belirtilir.",
          "On beş yaşını doldurmuş küçüklerin zorunlu ilkokul dışında veli izniyle çalışabildiği; güvenlik, sağlık ve ahlaka aykırı işlerde istihdamın yasak olduğu ifade edilir.",
        ],
      },
      {
        title: "Uzaktan çalışma ve mevsimlik",
        paragraphs: [
          "İş Kanunu’nun ayrı iş yeri ve tele çalışmayı tanıdığı; mevsimlik işin turizm, tarım ve gıda gibi dallarda yoğunlaştığı yazılır.",
          "Tarımda mevsimlik “günlük kupon” rejimi ile işsiz, emekli veya iş arayanların yılda en fazla doksan gün ve kesintisiz olmadan çalışabildiği; günlük ücretin bakanlıkça yıllık belirlendiği belirtilir.",
        ],
      },
      {
        title: "Serbest meslek ve ajans",
        paragraphs: [
          "Serbest meslek ve zanaatın liberal meslekler, tarım ve ormancılık faaliyetlerini kapsadığı; geçici işçilikte çalışanın ajansla sözleşme imzalayıp aynı iş için kullanıcıyla en fazla üç yıl (istisnai olarak daha uzun) görevlendirme yapılabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-calisma-izin",
    tocLabel: "Ücret ve çalışma süresi",
    h2: "Asgari ücret 2026, izin ve tatiller",
    lead: "Tam zamanlı günde sekiz saat, haftada kırk saat; fazla mesai aylık otuz iki saat sınırı.",
    accordions: [
      {
        title: "Asgari ücret ve ödeme",
        paragraphs: [
          "Tam zamanlı çalışana ödenmesi gereken en düşük aylık brüt ücretin yılda bir belirlendiği ve 2026 için 1.050 EUR brüt olduğu yazılır.",
          "Ücretin çoğu zaman net üzerinden anlaşıldığı; maaşın iş tamamlandıktan sonra aylık, nakit veya genelde bankaya, takip eden ayın on beşine kadar ödenmesi gerektiği belirtilir.",
          "Zor çalışma koşulları, fazla mesai, gece ve resmî tatillerde artırımlı ücretin ödenebildiği; yıllık hizmet başına %0,5 zam, ulaşım ve yemek yardımları ile primler için vergisiz tavanların uygulanabildiği ifade edilir.",
        ],
      },
      {
        title: "Çalışma süresi ve izin",
        paragraphs: [
          "Günde en az altı saat çalışanların en az otuz dakika ücretli mola hakkına sahip olduğu; günlük dinlenmenin on iki saat (iki vardiya mevsimlikte sekiz saat, telafi dinlenmesi ile) ve haftalık dinlenmenin yirmi dört saat olduğu yazılır.",
          "Fazla mesainin haklı nedenle talep edilebildiği; bireysel çalışan başına ayda otuz iki saat veya yılda yüz seksen saati geçmemesi gerektiği; hamile, küçük çocuklu veya yarı zamanlı çalışanların yazılı rızası olmadan fazla mesaiye tabi tutulamayabildiği belirtilir.",
          "Takvim yılı başına en az dört hafta (zor koşullarda veya reşit olmayanlarda beş hafta) ücretli yıllık iznin, işe başlamadan altı ay sonra kullanılabildiği; çoğu işverenin otuz iş gününe kadar izin tanıyabildiği ifade edilir.",
        ],
      },
      {
        title: "Resmî tatiller (örnek 2026)",
        paragraphs: [
          "1 Ocak, 6 Ocak, Paskalya ve Paskalya pazartesi (2026’da 5–6 Nisan), 1 Mayıs, 30 Mayıs devlet bayramı, 2026 Corpus Christi (4 Haziran), 22 Haziran, 5 Ağustos, 15 Ağustos, 1 Kasım, 18 Kasım anma günleri, 25–26 Aralık gibi günlerin kamusal tatil ve çalışılmayan gün sayıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "fesih-emeklilik",
    tocLabel: "Fesih ve emeklilik",
    h2: "İhbar, olağanüstü fesih ve emeklilik yaşı",
    lead: "Fesih yazılı olmalı; işveren on beş gün içinde sigorta çıkış belgelerini sağlamalıdır.",
    accordions: [
      {
        title: "Fesih türleri",
        paragraphs: [
          "Belirli süreli sözleşmenin süre bitiminde sona erdiği; işçi veya işverenin ihbar süresiyle veya anlaşmalı fesih ile sözleşmeyi bitirebildiği yazılır.",
          "İşverenin iş ekonomik veya kişisel gerekçe, disiplin veya deneme süresinde yetersizlik gibi haklı nedenle ihbarlı fesih kullanabildiği; ihbar süresinin iki hafta ile dört ay arasında ilişki süresine göre değiştiği belirtilir.",
          "Olağanüstü feshin özellikle ağır sözleşme ihlali durumunda ihbar olmadan mümkün olduğu; tarafların tazminat talep edebildiği ifade edilir.",
        ],
      },
      {
        title: "Emeklilik (özet)",
        paragraphs: [
          "Yaşlılık emekliliğinin en az on beş yıl primle altmış beş yaşta kazanıldığı; erken emekliliğin altmış yaş ve otuz beş yıl hizmetle mümkün olduğu; kadınlar için 2020–2030 geçiş döneminde daha elverişli yaşların uygulanıp 1 Ocak 2030’dan itibaren kadın ve erkek şartlarının eşitleneceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve grev",
    h2: "İş konseyi ve uzlaştırma",
    lead: "Sendika kurmak için en az on reşit gerekir; üyelik aidiyesi brüt maaştan kesilir.",
    accordions: [
      {
        title: "Temsil ve toplu iş uyuşmazlığı",
        paragraphs: [
          "İşçilerin sendika kurma ve üye olma hakkına sahip olduğu; sendikaların toplu iş sözleşmesi müzakere edebildiği, üyeleri iş uyuşmazlıklarında temsil edebildiği ve ücretsiz hukuki danışmanlık verebildiği yazılır.",
          "On bir ve üzeri çalışanı olan işyerlerinde iş konseyinin çalışan çıkarlarını koruyabildiği belirtilir.",
          "Grevin işverene gerekçe, yer ve başlangıç zamanı bildirilerek duyurulması ve uzlaştırma bitmeden başlatılamaması gerektiği; işverenin grev yanıtı olarak sekiz gün geçmeden lokavt başlatamayacağı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "KDV, gelir vergisi ve TÜFE",
    lead: "Genel KDV %25; düşük oranlar %13 ve %5.",
    accordions: [
      {
        title: "Vergi ve ücret kesintileri",
        paragraphs: [
          "Yıllık gelir vergisi oranlarının yerel yönetimlerce %15–33 aralığında belirlendiği; emeklilik sigortası priminin %20 ve sağlık sigortası katkısının %16,5 (işveren sorumluluğu) olduğu yazılır.",
          "İşsizlik ve iş kazası sigortalarının devlet bütçesinden karşılandığı belirtilir.",
        ],
      },
      {
        title: "Tüketici fiyatları",
        paragraphs: [
          "Ocak 2026’da tüketici fiyat endeksinin bir önceki yıla göre yaklaşık %3,4 arttığına dair ilk tahminin yayımlandığı; gıda fiyatlarının mevsim ve satış kanalına göre değiştiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "saglik",
    tocLabel: "Sağlık sistemi",
    h2: "HZZO ve üç kademeli bakım",
    lead: "Acil çağrı 112; AEA gezginleri EHIC ile gerekli tedaviye erişir.",
    accordions: [
      {
        title: "Zorunlu sigorta kapsamı",
        paragraphs: [
          "Birincil düzeyin aile hekimi, diş hekimi ve çocuk doktorunda; ikincil düzeyin uzman ve hastanede; üçüncül düzeyin en karmaşık hizmetlerde olduğu yazılır.",
          "Hastaneye sevkin aile hekimi veya acil hekim tarafından yapıldığı; acil durumda sevk olmadan müdahalenin mümkün olduğu belirtilir.",
          "Reçeteli ve reçetesiz ilaçların eczaneden temin edildiği; temel ilaç listesinde katılım payı uygulanabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "egitim-kultur-ulasim",
    tocLabel: "Eğitim, kültür ve ulaşım",
    h2: "Bologna, kahve kültürü ve koridorlar",
    lead: "Otoyol ve limanlar; Pan-Avrupa koridorları V, VII ve X Hırvatistan’dan geçer.",
    accordions: [
      {
        title: "Eğitim ve kültür",
        paragraphs: [
          "Altı aylıktan ilkokula kadar kreş ve anaokulunun eğitim sisteminin parçası olduğu; sekiz yıllık zorunlu ilkokulun altı–on beş yaş arası tüm ikamet eden çocuklar için geçerli olduğu yazılır.",
          "Yükseköğretimin Bologna üç kademeli yapısına uyduğu; üniversite ve uygulamalı bilim yüksekokullarının program türlerini belirlediği belirtilir.",
          "Boş zamanın dernekler, deniz ve dağ gezileri, festivaller ve güçlü kahve kültürü ile şekillendiği ifade edilir.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Otoyol, demiryolu, ulusal limanlar, nehir yolları ve Zagreb, Dubrovnik, Split, Zadar, Pula, Rijeka, Osijek vb. havaalanlarının ulaşım ağını oluşturduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yüzde üç kotası ve ZOSI",
    lead: "Yirmi ve üzeri çalışanda %3 engelli istihdamı veya destekli istihdam yolları.",
    accordions: [
      {
        title: "Haklar ve değerlendirme",
        paragraphs: [
          "BM Engelli Hakları Sözleşmesi tanımının ulusal mevzuatta kullanıldığı; uzman değerlendirme ve meslekî rehabilitasyonun ZOSI (Zavod za vještačenje…) üzerinden yürütülebildiği yazılır.",
          "Açık piyasada veya korumalı atölyelerde istihdamın mümkün olduğu; kamuda eşit şartlarda engelli adaylara öncelik tanınabildiği belirtilir.",
        ],
      },
      {
        title: "İşveren destekleri",
        paragraphs: [
          "HZZ’nin engelli işsizlere yönelik daha yüksek aylık tutarlarla yirmi dört aya kadar sübvansiyon, kamu işleri programı ve work+ gibi önlemler sunduğu; uyarlama maliyetlerinin eş finansmanına ilişkin bilgilerin ZOSI ve HZZ sitelerinde bulunduğu ifade edilir.",
        ],
      },
    ],
  },
];
