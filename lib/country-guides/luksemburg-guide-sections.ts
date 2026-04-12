import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Luxembourg” (06/06/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const LUKSEMBURG_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Lüksemburg’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Lüksemburg Schengen ve Euro alanındadır. ADEM (Agence pour le développement de l’emploi) JobBoard ile kayıtlı iş arayan ve işveren eşleşmesi; work-in-luxembourg.lu sektör platformu; spekülatif başvurunun yaygınlığı; 9 Haziran 2020 staj yasası (zorunlu stajda dört haftaya kadar ücretsizlik, sonrasında ücret türüne göre ödeme); üçüncü ülkeliler için ücretli/ücretsiz staj süresine göre oturum veya çalışma izni; çıraklıkta ADEM mesleki rehberlik kaydı ve işverenlere ücretin %27–40’ına varan destek; belediyede üç aydan uzun kalışta varış bildirimi ve doksan gün içinde kayıt; 1 Mart 2020’den beri ulusal toplu taşımanın ücretsiz olması; sosyal asgari ücret (SSM) ve endeksleme; haftada kırk saat, Pazar %70, fazla mesaide %40 ek veya telafi dinlenme önceliği; yılda en az yirmi altı iş günü ücretli izin; fesih ihbarında hizmet süresine göre iki–dört–altı ay; grev öncesi Ulusal Arabuluculuk Ofisi (ONC) zorunluluğu; engelli çalışan statüsü için ADEM tıbbi komisyon ve dahil etme yardımcısı saatleri başlıklarında kamu bilgisine dayanır.",
  "Kira ortalamaları, SSM rakamları ve vergi oranları güncellenebilir. Doğrulama için adem.public.lu, guichet.public.lu, gouvernement.lu, legilux.public.lu ve cns.lu kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const LUKSEMBURG_SEO_KEYWORD_TAGS: string[] = [
  "lüksemburg vize",
  "lüksemburg schengen çalışma",
  "ADEM Luxembourg employment",
  "work-in-luxembourg.lu",
  "guichet.public.lu residence Luxembourg",
  "SSM salaire social minimum Luxembourg",
  "Luxembourg free public transport 2020",
];

export const LUKSEMBURG_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-adem",
    tocLabel: "İş bulma",
    h2: "ADEM, JobBoard ve sektör portalları",
    lead: "Kayıtlı iş arayan profilleri anonim olarak işverenlere açılabilir.",
    accordions: [
      {
        title: "Resmî ve ticari kanallar",
        paragraphs: [
          "ADEM’in JobBoard çevrimiçi hizmetiyle kayıtlı iş arayanların anonim profillerinin veri tabanında yayımlandığı ve şirketlerin anonim ilanlarına erişilebildiği yazılır.",
          "Metinde ADEM web sitesinde ilanların henüz tam olarak görünmediği; work-in-luxembourg.lu kariyer platformunun seçili sektörlerde ilan topladığı belirtilir.",
          "Luxemburger Wort cumartesi eki, monster.lu, jobs.lu, jobfinder.lu, optioncarriere.lu, paperjam, medination, moovijob gibi ticari sitelerin ve büyük şirket / ajans sitelerinin anıldığı ifade edilir.",
          "Geçici istihdam için FEDIL FES listesinin kullanılabildiği; ajansa şahsen veya postayla CV, fotoğraf ve kimlik fotokopisi ile kayıt yapılabildiği yazılır.",
        ],
      },
      {
        title: "Spekülatif başvuru",
        paragraphs: [
          "Büyük şirketlere, özellikle genç mezunlar tarafından, ilan olmadan başvurunun yaygın olduğu ve insan kaynakları veri tabanına düşme fırsatı verdiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-dil",
    tocLabel: "Başvuru ve diller",
    h2: "Örtük yazı, CV ve çok dillilik",
    lead: "İlandaki dilde el yazısı mektup; spekülatifte Fransızca veya çok uluslu şirkette İngilizce.",
    accordions: [
      {
        title: "Örtük yazı ve CV",
        paragraphs: [
          "Başvurunun örtük yazı ve CV içermesi gerektiği yazılır.",
          "Örtük yazının eşlik mektubu değil; kişisel, net, ilgili ve belirli pozisyona bağlı olması; adayın şirket ihtiyacını anladığını ve motivasyonunu göstermesi gerektiği belirtilir.",
          "CV’de genelde profesyonel fotoğraf bulunduğu; bir–iki sayfada eğitim, deneyim, beceriler, dil ve bildiği kadarıyla doğru beyan edilen yeterliliklerin yer alması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Dil beklentisi",
        paragraphs: [
          "Üç resmî dil (Lüksemburgca, Fransızca, Almanca) ve Avrupa merkezi konumu nedeniyle çoğu işte birden fazla dilin önemli olduğu yazılır.",
          "Fransızca, İngilizce, Almanca ve Lüksemburgca’nın sektöre göre zorunlu veya çok değerli olduğu; Flemenkçe, İtalyanca, İspanyolca ve Portekizce’nin artı puan sayılabildiği belirtilir.",
          "İş bulma şansı için en az iki dil ve bunlardan en az birinin resmî dillerden biri olmasının önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "staj-2020",
    tocLabel: "Staj",
    h2: "9 Haziran 2020 staj çerçevesi",
    lead: "Zorunlu stajda dört haftaya kadar ücret ödenmeyebilir; süre ve tür ücrete etki eder.",
    accordions: [
      {
        title: "Sözleşme ve ücret",
        paragraphs: [
          "Stajın genelde staj sözleşmesi veya anlaşmasıyla yapıldığı; zorunlu ders bileşeni ile gönüllü deneyim arasında ayrım yapıldığı yazılır.",
          "Zorunlu stajın en fazla dört hafta sürmesi halinde maaş zorunluluğu olmadığı; dört haftadan uzunsa staj türüne göre ücret verilmesi gerektiği; eğitim kurumunun ücret yasağı koyması halinde istisna bulunduğu belirtilir.",
          "Anlaşmada ücretli veya ücretsiz çerçevenin; ücretsiz konaklama, yemek veya harçlık gibi maddi avantajların yazılabildiği ifade edilir.",
          "Ücretli stajın sözleşmeyle düzenlendiği ve işe benzetildiği yazılır.",
        ],
      },
      {
        title: "Üçüncü ülke vatandaşları",
        paragraphs: [
          "Üç aydan kısa ücretsiz staj için stajyer oturumundan ziyade kısa kalış koşullarının yeterli olabildiği; üç aydan uzun ücretsiz stajda Lüksemburg’a gelmeden önce geçici stajyer ikamet belgesi gerektiği belirtilir.",
          "Başka AB ülkesinde yasal ikameti olup Lüksemburg’da ikamet etmeden ücretsiz staj yapanın özel izin gerektirmediği; Lüksemburg’da ikamet ederek ücretsiz stajda aynı kuralın geçerli olduğu ifade edilir.",
          "Öğrenci oturumuyla zorunlu ücretsiz stajın program kapsamında ve izin süresince yeni staj belgesi gerektirmeden yapılabildiği yazılır.",
          "Üç aydan kısa ücretli gönüllü stajda çalışma izni; üç aydan uzun ücretli stajda ikamet öncesi maaşlı çalışan geçici ikamet belgesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-adem",
    tocLabel: "Çıraklık",
    h2: "ADEM mesleki rehberlik ve çift merkez",
    lead: "Başlangıç çıraklığı en az on beş yaş ve zorunlu okul sonrası; yetişkin için on sekiz yaş ve CCSS şartları.",
    accordions: [
      {
        title: "Diploma yolları",
        paragraphs: [
          "CCP, DAP ve DT diplomalarının meslekî yeterlilik ve teorik–pratik denge açısından farklılaştığı yazılır.",
          "Sınır ötesi çıraklıkta (TRF) Lüksemburg işyeri ile komşu ülke okulunun birleştiği ve yabancı diplomanın Lüksemburg tarafından otomatik tanınabildiği belirtilir.",
        ],
      },
      {
        title: "Kayıt ve destek",
        paragraphs: [
          "Kaydın şahsen ADEM mesleki rehberlik servisinde yapıldığı; Lüksemburg şehri, Esch-sur-Alzette ve Diekirch ofislerinin anıldığı yazılır.",
          "Şirketlerin çıraklık teklifini formla bildirdiği ve meslek odalarıyla uygunluk kontrolünün yürütüldüğü belirtilir.",
          "Çıraklara ödenek ve işverenlere çırak ücretinin %27–40’ı aralığında mali yardım verildiği; yetişkin çırakta başlangıç çıraklığı ile yetişkin asgari ücret farkının istihdam fonundan telafi edilebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-sinir",
    tocLabel: "Konut",
    h2: "Yüksek kira ve sınır bölgeleri",
    lead: "Depozito genelde en fazla üç aylık kira tutarını aşamaz.",
    accordions: [
      {
        title: "Piyasa ve bölge",
        paragraphs: [
          "Gazete ilanları, portallar ve emlakçı ile arama yapılabildiği yazılır.",
          "CBRE 2023 örneğinde ortalama daire kirasının yaklaşık 1.500 EUR ve ortalama yüzeyin 85 m² olduğu; Lüksemburg şehrinde kiraların özellikle yüksek, kuzey (Ettelbrück ötesi) ve güney (Esch/Alzette) ile merkezi olmayan yerlerde nispeten daha düşük olabildiği belirtilir.",
          "Şehir merkezi ve çevre belediyelerde satın alma fiyatlarının metrekare başına çok yüksek seyredebildiği; kuzeyde bazı belediyelerde daha düşük olduğu ifade edilir.",
          "Yoğun trafik nedeniyle toplu taşıma erişiminin konut seçiminde önceden kontrol edilmesinin önerildiği yazılır.",
          "Almanya, Fransa veya Belçika sınırında daha ucuz konut ve sınır ötesi işçi statüsünün değerlendirilebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "okul-zorunlu",
    tocLabel: "Okul",
    h2: "Çok dilli sistem ve zorunluluk",
    lead: "2026/2027 eğitim yılı başında zorunlu okul on sekiz yaşına çıkar.",
    accordions: [
      {
        title: "Genel yapı",
        paragraphs: [
          "Anayasaya göre çoğu okulun devlete ait ve ücretsiz olduğu; özel ve uluslararası okulların da bulunduğu yazılır.",
          "Dört–on altı yaş arası zorunlu eğitimin 2026/2027’den itibaren on sekize uzayacağı; on altı ve üzeri çalışmak isteyenlerin sözleşme süresince zorunluluktan muafiyet başvurusu yapabileceği belirtilir.",
          "Belediye okuluna kayıt için yerel yönetime aile kitabı, doğum belgesi ve varsa son karne ile gidilmesi gerektiği; ortaöğretimde bazı istisnaların bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "yerlesim-ab",
    tocLabel: "Yerleşim bildirimi",
    h2: "AB ve üçüncü ülkeler",
    lead: "Üç aydan uzun kalan AB uyrukluları belediyede bildirim yapar.",
    accordions: [
      {
        title: "AB ve muadil ülkeler",
        paragraphs: [
          "Üç aya kadar tatil, ziyaret veya iş seyahati için özel prosedür olmadan geçerli kimlik veya pasaport yeterli olduğu yazılır.",
          "Üç aydan uzun kalmak için çalışma, yeterli kaynak ve sağlık güvencesi veya onaylı kurumda öğrenim şartlarından birinin sağlanması gerektiği belirtilir.",
          "İzlanda, Lihtenştayn, Norveç ve İsviçre’nin AB ile muadil sayıldığı ifade edilir.",
          "Üç aydan fazla kalacakların ikamet ettikleri belediyede varış bildirimi yapması; ardından taşınma izni için ikamet belgesi talep edebildiği yazılır.",
          "Belgelerin Almanca, Fransızca veya İngilizce değilse onaylı çevirmen çevirisi gerekebildiği belirtilir.",
          "Varıştan sonra doksan gün içinde kayıt veya AB vatandaşının üçüncü ülke uyruklu aile üyesi için oturum başvurusunun tamamlanması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Üçüncü ülkeler",
        paragraphs: [
          "AB ailesi dışındaki üçüncü ülke vatandaşlarının varıştan itibaren üç gün içinde belediyeye bildirim yapması gerektiği; otelde konaklama fişi doldurulduysa üç aydan kısa kalışta istisna olabildiği yazılır.",
          "Üç aydan uzun kalacakların sınır ötesinden önce alınmış oturum izni ve pasaport ile belediyeye başvurması; doksan gün içinde Dışişleri göç müdürlüğünden izin türüne uygun oturum belgesi istenmesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-turleri",
    tocLabel: "İstihdam türleri",
    h2: "Beyaz–mavi yaka ayrımı kalktı; telework anlaşması",
    lead: "1 Ocak 2009’dan beri özel sektörde tek “çalışan” statüsü.",
    accordions: [
      {
        title: "Esnek ve özel biçimler",
        paragraphs: [
          "Geçici işçi işvereni, telework, tam ve yarı zamanlı, çıraklık, serbest meslek, aralıklı sanatçı, mevsimlik ve öğrenci işinin (yirmi yedi yaş altı, okul tatilinde yılda en fazla iki ay) anıldığı yazılır.",
          "Mevsimlik sözleşmenin on iki ayda on aydan fazla süremeyeceği; otel–lokanta–kafe sektöründe çalışma ve ücretli izin için özel hükümler bulunduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-cdi-cdd",
    tocLabel: "İş sözleşmesi",
    h2: "CDI, CDD ve deneme",
    lead: "Yazılı sözleşme en geç işe başlama günü imzalanır.",
    accordions: [
      {
        title: "Süresiz ve süreli",
        paragraphs: [
          "Süresiz sözleşmenin (CDI) yaygın olduğu; yazılı olmaması halinde sözleşmenin her türlü delille ve çoğunlukla süresiz sayılabildiği yazılır.",
          "Sözleşmede tarafların kimliği, işe başlama tarihi, iş yeri, işin niteliği, normal çalışma süresi, temel ücret ve ekleri, deneme süresi, ücretli izin ve ihbar süreleri gibi asgari bilgilerin bulunması gerektiği belirtilir.",
          "Süreli sözleşmenin (CDD) süresinin yenilemeler dahil yirmi dört ayı; mevsimlikte on ayı aşamayacağı; en fazla iki kez ve yalnız ilk sözleşmede yenileme şartı varsa yenilenebildiği ifade edilir.",
        ],
      },
      {
        title: "Deneme süresi feshi",
        paragraphs: [
          "Deneme süresinin iki hafta ile altı ay arasında olabildiği; bu sürede tarafların ciddi sebep olmadıkça haftalık süreye göre bir günlük ihbarla (aylık ise ay başına dört gün, en az on beş en fazla yirmi dört gün) feshedebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "ucret-ssm",
    tocLabel: "Ücret ve SSM",
    h2: "Sosyal asgari ücret ve endeks",
    lead: "Maaş ve emeklilikler tüketici fiyatlarına göre otomatik endekslenir.",
    accordions: [
      {
        title: "Sınıflandırma ve net cazibe",
        paragraphs: [
          "On beş–on altı yaşta SSM’nin %75’i, on yedi yaşta %80’i, on sekiz ve üzeri niteliksiz işçide %100’ü, resmî meslek diplomasıyla nitelikli işçide %120’si ödenebildiği yazılır.",
          "Metinde Ocak 2024 itibarıyla on sekiz yaş üstü niteliksiz işçi için brüt aylık SSM’nin kayan ücret ölçeği endeksi üzerinden yaklaşık 2.571 EUR; Ocak 2025 itibarıyla nitelikli işçi için yaklaşık 3.085–3.165 EUR bandının anıldığı belirtilir; güncel rakamlar resmî duyurularla değişir.",
          "On yıllık deneyimle DAP eşdeğeri yeterlilik ispatının nitelikli oran için alternatif olabildiği ifade edilir.",
          "Brüt ve net tanımı ile vergi ve sosyal kesintilerin aylık kaynakta stopaj edildiği; sosyal primlerin komşu ülkelere göre nispeten düşük olduğu ve net gelirin cazip olabildiği yazılır.",
        ],
      },
      {
        title: "2024 çalışan prim örnekleri",
        paragraphs: [
          "Hastalık–doğum, emeklilik, iş kazası, bağımlılık ve meslek sağlığı kalemlerinde çalışan ve işveren paylarının tabloda verildiği; maksimum prim matrahının SSM’nin beş katı ile sınırlandığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-izin",
    tocLabel: "Çalışma süresi ve izin",
    h2: "Kırk saat, Pazar ve fazla mesai",
    lead: "Fazla mesai telafi dinlenmesi öncelikli; aksi halde %40 ek ücret.",
    accordions: [
      {
        title: "Süre ve dinlenme",
        paragraphs: [
          "Yasal haftalık sürenin kırk saat, günlüğün sekiz saat olduğu; iş gününün on saati aşamayacağı; istisnai hallerde on iki saate kadar vardiya mümkün olduğu yazılır.",
          "Yedi günde kırk sekiz saati aşan çalışmanın yasak olduğu; dört haftalık referansla kırk saat ortalamasının aşılmaması gerektiği belirtilir.",
          "Yirmi dört saatte on bir saat kesintisiz dinlenme ve haftada kırk dört saat kesintisiz dinlenme şartlarının bulunduğu ifade edilir.",
          "Pazar çalışmasının çoğu sektörde yasak veya İş ve Maden Müfettişliği iznine tabi olduğu; Pazar ek ücretinin %70 olduğu yazılır.",
          "Gece çalışmasının 22.00–06.00 arası sayıldığı; toplu sözleşmede asgari %15 ek öngörülebildiği belirtilir.",
          "Resmî tatilde çalışmada saatlik ücrete %100 ek; tatil Pazar’a denk gelirse %70 ek kümülasyonunun mümkün olduğu ifade edilir.",
        ],
      },
      {
        title: "Yıllık ve özel izinler",
        paragraphs: [
          "Asgari yıllık ücretli iznin yılda yirmi altı iş günü olduğu; üç ay kesintisiz çalışma sonrası hak doğduğu ve takvim yılı içinde kullanılması gerektiği yazılır.",
          "Doğum izninin doğumdan önce sekiz ve sonra on iki hafta; evlat edinmede sekiz veya on iki hafta; babalık izninin doğumdan sonra bir yaşına kadar on takvim günü olabildiği belirtilir.",
          "Çocuk yaşına göre değişen aile izni günleri ve altı yaşına kadar ebeveyn izni modellerinin (tam, yarım veya parçalı) anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "fesih-ihbar",
    tocLabel: "Fesih",
    h2: "Gerçek ve ciddi sebep; ihbar süreleri",
    lead: "Yüz elli çalışandan fazla işletmede ön mülakat zorunluluğu.",
    accordions: [
      {
        title: "İşveren feshi",
        paragraphs: [
          "Feshin çalışanın yeterliliği, davranışı veya işletme ihtiyacına bağlı gerçek ve ciddi gerekçeye dayanması gerektiği yazılır.",
          "İhbar sürelerinin hizmet süresine göre iki, dört veya altı ay olduğu; ciddi kusurda derhal fesih imkânının bulunduğu belirtilir.",
          "İşçinin süresiz sözleşmede ihbarının işverenin yarısı sürede (bir–üç ay) sona erdirilebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "temsil-grev",
    tocLabel: "Sendika ve grev",
    h2: "ONC öncesi zorunlu uzlaşma",
    lead: "Anayasa sendika özgürlüğünü güvence altına alır.",
    accordions: [
      {
        title: "Sosyal diyalog",
        paragraphs: [
          "Özel sektörde LCGB ve OGB-L gibi konfederasyonların toplu sözleşme ve ücretsiz hukuki yardım alanlarında faaliyet gösterdiği yazılır.",
          "Meslek odalarının mevzuat öncesi danışma rolünün bulunduğu; işveren ve çalışanların ilgili odaya üye olma zorunluluğunun ticaret, zanaat veya tarıma göre değiştiği belirtilir.",
        ],
      },
      {
        title: "Grev öncesi prosedür",
        paragraphs: [
          "Grev ve lokavtın özel kanunda ayrıntılı düzenlenmediği; taraflardan ilkinin uyuşmazlığı Ulusal Arabuluculuk Ofisi’ne (ONC) götürmesi gerektiği yazılır.",
          "ONC’nin uzlaşma olasılığını tüketmeden ve “uzlaşmazlık tutanağı” alınmadan grev veya lokavt hareketine gidilmemesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-kdv",
    tocLabel: "Vergi ve yaşam",
    h2: "KDV kademeleri ve gelir vergisi",
    lead: "2006’dan beri servet vergisi yok.",
    accordions: [
      {
        title: "Tüketim ve gelir",
        paragraphs: [
          "Süper indirimli %3, indirimli %8, ara %14 ve standart %17 KDV oranlarının örnek ürünlerle anıldığı yazılır.",
          "Gelir vergisinin sıfırdan %42’ye kadar kademeli olduğu ve İstihdam Fonu için %7–9 aralığında ek kesintinin eklenebildiği belirtilir.",
          "Eurostat’a göre tüketici fiyatlarının AB ortalamasının üzerinde seyredebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-ulasim",
    tocLabel: "Sağlık ve ulaşım",
    h2: "CNS ve ücretsiz toplu taşıma",
    lead: "1 Mart 2020’den beri devletin finanse ettiği ulusal toplu taşıma ücretsiz (birinci sınıf tren hariç).",
    accordions: [
      {
        title: "Sağlık",
        paragraphs: [
          "Meslek faaliyeti yürütenlerin (ve ailesinin) CNS’ye otomatik bağlandığı; masrafların %80–100 arası geri ödenebildiği yazılır.",
          "Uzman merkezlere komşu ülkelerden erişimin sık kullanıldığı belirtilir.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "CFL trenleri, Luxair ve RGTR otobüslerinin ana bağlantılar olduğu; TGV Est ile Paris bağlantısının anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-adem",
    tocLabel: "Engelli istihdamı",
    h2: "ADEM tıbbi komisyon ve dahil etme yardımcısı",
    lead: "Statü tanınırsa ayrılmış ilanlar ve işyeri uyarlama desteği mümkün.",
    accordions: [
      {
        title: "Başvuru ve işveren desteği",
        paragraphs: [
          "Engelli çalışan statüsünün ADEM Tıbbi Komisyon başvurusu ve kayıtlı posta ile karar tebliğine dayandığı yazılır.",
          "İşverenlere ücret, eğitim, işyeri uyarlama ve belirli koşullarda işveren sosyal payı için mali yardım verilebildiği; ücret maliyetine en az %30 katkının uzman değerlendirmesiyle artırılabildiği belirtilir.",
          "Dahil etme yardımcısı programında İstihdam Fonu’nun sözleşme süresine göre yüz elli, iki yüz yirmi beş veya üç yüz saati karşıladığı ifade edilir.",
          "Statülü çalışanlara yılda altı ek ücretli izin günü ve ödenek haklarının anıldığı yazılır.",
        ],
      },
    ],
  },
];
