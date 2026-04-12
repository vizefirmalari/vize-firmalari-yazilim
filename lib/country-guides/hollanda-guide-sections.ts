import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Netherlands” (25/04/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const HOLLANDA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Hollanda’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. UWV, iş arama kanalları, Hollandaca başvuru kültürü, staj ve mesleki öğrenme (MBO BOL/BBL, HBO/WO çift yol), belediye kaydı ve BSN, konut piyasası ve sağlık sigortası başlıkları kaynak metne dayanır.",
  "Metinde geçen tutarlar (örneğin 2024–2025 asgari saatlik ücret, kira yardımı gelir sınırları, “starter grant” ödemesi) yayımlandıkları döneme bağlıdır; güncel rakamları resmî sitelerden doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const HOLLANDA_SEO_KEYWORD_TAGS: string[] = [
  "hollanda vize",
  "hollanda schengen",
  "UWV iş arama",
  "werk.nl",
  "BSN Hollanda",
  "Hollanda asgari ücret saatlik",
  "Hollanda sağlık sigortası zorunlu",
  "Randstad konut",
];

export const HOLLANDA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Ağ, UWV ve ajanslar",
    lead: "Boş pozisyonların çoğu gayriresmî doldurulur; Cumartesi gazeteleri ve werk.nl.",
    accordions: [
      {
        title: "Genel resim",
        paragraphs: [
          "Hollanda’da iş bulma yollarının çeşitli olduğu; tüm boş pozisyonların yüzde altmışından fazlasının gayriresmî yollarla doldurulduğu yazılır.",
          "İyi bir ağın iş bulma şansını artırdığı; UWV, istihdam ve seçme ajansları, ikinci görevlendirme (secondment), ilanlar, internet, iş fuarları ve EURES etkinliklerinin yaygın kanallar olduğu belirtilir.",
        ],
      },
      {
        title: "UWV (İşçi Sigortaları Uygulama Kurumu kamu istihdam servisi)",
        paragraphs: [
          "UWV’nin iş arayanlara destek verdiği; UWV’ye kaydın zorunlu olmadığı ifade edilir.",
          "Çevrimiçi başvuruların ve EURES ile UWV CV veri tabanlarının standart olduğu; işverenlerin veri tabanından aday çektiği yazılır.",
          "Hollandaca bilenlerin werk.nl kullanabileceği; LinkedIn gibi sosyal medyanın da norm haline geldiği belirtilir.",
        ],
      },
      {
        title: "İstihdam ajansları ve ikinci görevlendirme",
        paragraphs: [
          "Hollanda’da çok sayıda uzman istihdam ajansı ile seçme ve yerleştirme ajanslarının (headhunter dahil) bulunduğu yazılır.",
          "Bu ajansların adayları önce psikolojik teste veya değerlendirme merkezine almasının olağan olduğu; geçici işin yanı sıra özellikle BT ve diğer uzmanlarda ikinci görevlendirmenin arttığı belirtilir.",
        ],
      },
      {
        title: "Gazete ve internet",
        paragraphs: [
          "Boş pozisyonlar için ulusal gazetelerin taranması önerilir; en çok ilanın Cumartesi sayfalarında olduğu yazılır.",
          "NRC Handelsblad’ın yönetici pozisyonları; De Volkskrant’ın kamu sektörü, akademi ve sağlık meslekleri; De Telegraaf ve Algemeen Dagblad’ın ticari ilanlar için anıldığı belirtilir.",
          "Bölgesel gazetelerin de listelendiği ifade edilir.",
        ],
      },
      {
        title: "İş fuarları ve EURES",
        paragraphs: [
          "İş fuarlarının, özellikle “speed date” formatının giderek yaygınlaştığı; UWV, ajanslar, kolej ve üniversiteler ile Avrupa Çevrimiçi İş Günü (European Online Job Day) düzenleyicilerinden bahsedilir.",
          "Tarım ve bahçecilik mevsimlik işler için seasonalwork.nl adresinin verildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru",
    h2: "Hollandaca, motivasyon ve on dört gün kuralı",
    lead: "Yazılı başvuru Hollanda’da yazılı olmayan kurallarla şekillenir.",
    accordions: [
      {
        title: "Süreç ve kanallar",
        paragraphs: [
          "İş türüne göre prosedürün değiştiği; tarım ve düşük vasıf işlerde işverenlerin çoğu zaman şahsen ziyareti olumlu karşıladığı yazılır.",
          "Yurtdışından başvuruların çoğunlukla yazılı yapıldığı; nitelikli ve çok nitelikli düzeyde ön yazı ve CV’nin standart olduğu belirtilir.",
          "Şirketi önceden aramanın olağan olduğu; ancak net sorular hazırlanması gerektiği ifade edilir.",
          "Hollandalı işverenlerin genelde hızlı döndüğü; on dört gün sonra haber yoksa telefonla takip edilmesi gerektiği yazılır.",
          "Sosyal medyanın ilginç şirketleri izlemek için yararlı olduğu; başvuruda ise işverenin aday hakkında araştırma yapabileceği ve sosyal medyanın kariyeri olumlu veya olumsuz etkileyebileceği uyarısı verilir.",
        ],
      },
      {
        title: "Ön yazı ve CV",
        paragraphs: [
          "Ön yazının Hollandaca olmasının (aksi belirtilmedikçe) daha çok takdir edildiği; tek A4 sayfaya daktilo edilmiş, kısa ve öz ama profesyonel metin önerildiği yazılır.",
          "Yapı olarak önce başvuru gerekçesi, sonra uygunluk ve motivasyon (Hollandalı işverenler için en önemli seçim ölçütlerinden biri), son olarak mülakat davetiyle kapanış önerildiği belirtilir.",
          "CV’nin öz ve profesyonel, çoğunlukla en fazla iki A4 sayfa ve pozisyona göre uyarlanmış olması gerektiği; kişisel bilgiler, eğitim (başlangıç/bitiş ve derece), iş deneyimi (son işten geriye, işveren adı ve görevler), hobiler ve gönüllü çalışma sırasının kaynakta listelendiği ifade edilir.",
          "Referans ve diploma fotokopilerinin genelde eklenmediği; mülakatta yanlarında getirilebileceği yazılır.",
          "Kıdemli adaylar için daha kısa ve betimleyici “résumé” kullanımının arttığı; başta aranan iş türü, öznel vurgu ve tam tarih yerine uygunluğu destekleyen rakamlar içerebildiği belirtilir.",
          "Büyük işverenlerde ve çevrimiçi başvurularda başvuru formlarının kullanıldığı ifade edilir.",
          "Europass CV’nin işverenler arasında henüz yaygın bilinmediği; özellikle kendi girişimli başvurularda geleneksel Hollanda CV’sinin önerildiği; örnek için werk.nl adresinin verildiği yazılır.",
        ],
      },
      {
        title: "Mülakat ve kendi girişimli başvuru",
        paragraphs: [
          "Mülakatta motivasyonun merkezde olduğu; güçlü ve zayıf yönlerin örneklerle açıklanmasının takdir edildiği yazılır.",
          "Genelde bir veya iki görüşmecinin bulunduğu; iki–üç mülakat turunun yaygın olduğu; sonunda soru sorma fırsatı verildiği ve önceden düşünülmesi gerektiği belirtilir.",
          "Uygunsa Skype mülakatının mümkün olduğu ifade edilir.",
          "Kendi girişimli başvurunun çok yaygın olduğu; hedefli ve kendi girişimli başvurularda da önce telefonla temas kurulabileceği; şirket bilgisi için Ticaret Odası (KvK), elçilik/konsolosluk ve şirket web sitesinin kullanılabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "staj-traineeship",
    tocLabel: "Traineeship (yönetici stajı)",
    h2: "Ücretli, işgücüne dahil ve öğrenme hedefleri",
    lead: "Bir–üç yıl; erken ayrılışta eğitim maliyeti maddeleri.",
    accordions: [
      {
        title: "Tanım ve nitelikler",
        paragraphs: [
          "Hollanda’da “traineeship” için tek resmî tanım olmadığı; devlet veya büyük kuruluşların yetenekli gençlere piyasaya erişim veya iç yönetim kariyeri için programlar kurduğu yazılır.",
          "Traineeship’in ücretli, üretken ve işgücünün parçası olan; iş başında öğrenmeye odaklı; genelde üniversite veya MYO sonrası kariyer gelişimi için bir–üç yıllık çerçeve ve belirli öğrenme hedefleri içerdiği belirtilir.",
          "Boş pozisyon veya iç başvuru ile yer alınabildiği; denetim, sabit süre ve öğrenme hedeflerinin ortak olduğu ifade edilir.",
        ],
      },
      {
        title: "Koşullar ve sözleşme",
        paragraphs: [
          "Traineeship’lerin de diğer işler gibi iş hukukuna tabi olduğu; normal istihdam sözleşmesi ve ücret gerektirdiği yazılır.",
          "Eğitim programı içerdiği için şirketten erken ayrılışta veya kısa süre sonra ücret talep edilebileceği; sözleşmede şüphe halinde iş hukuku avukatına danışılması önerildiği belirtilir.",
        ],
      },
      {
        title: "Kalite ve destek",
        paragraphs: [
          "İyi bir traineeship’in net kariyer perspektifi, ücretli işgücüne dahil olma, yapılandırılmış eğitim ve koçluk içermesi gerektiği yazılır.",
          "Fırsatların büyük kuruluş siteleri, traineeshipsoverzicht.nl, traineeshipplaza.nl ve werk.nl üzerinden aranabileceği belirtilir.",
          "Yerel belediyeye kayıt, resmî belgelerin tercümesi, eğitim süresi sigortası, maaş için BSN ve asgari ücreti aşanlarda zorunlu sağlık sigortası gibi bireysel hazırlıkların listelendiği ifade edilir.",
          "TMS (Targeted Mobility Schemes) ve Starterbeurs (yeni girişçi hibresi) ile FNV Jong gençlik hizmet noktasından bahsedilir.",
        ],
      },
    ],
  },
  {
    id: "leerwerk-mbo-hbo",
    tocLabel: "Staj ve çıraklık (MBO/HBO/WO)",
    h2: "BOL, BBL ve çift eğitim",
    lead: "SBB akreditasyonu; okul dışı stajda öğrenme hedefi merkezde.",
    accordions: [
      {
        title: "MBO: BOL ve BBL",
        paragraphs: [
          "Hollanda’da stajların (apprenticeship/traineeship) çoğunlukla eğitim sisteminin parçası ve çoğu zaman zorunlu mesleki eğitim unsuru olduğu yazılır.",
          "Okul temelli yol (BOL) ile şirket üzerinden birden çok stajın çoğunlukla zorunlu ve çoğu zaman ücretli olduğu; iş temelli yol (BBL) ile haftada bir gün teori, diğer günler işyerinde çalışıp maaş kazanıldığı belirtilir.",
        ],
      },
      {
        title: "HBO ve WO",
        paragraphs: [
          "HBO’da “dual education” ile teorik günler ve maaşlı işin birleştiği; birçok programda zorunlu stajın çoğu zaman ücretli olduğu yazılır.",
          "Üniversitelerde (WO) lisans ve yüksek lisansa bağlı isteğe bağlı stajların bazen ücretli olabildiği ifade edilir.",
        ],
      },
      {
        title: "Uygunluk ve kalite",
        paragraphs: [
          "AEA ülkeleri vatandaşlarının diğer AEA ülkelerinde çalışıp okuyabildiği; AEA dışı için farklı kuralların geçerli olduğu belirtilir.",
          "Diploma denkliği için IDW (internationale diplomawaardering) ve okulun ek sınav/mülakat/kanıt dil şartları isteyebileceği yazılır.",
          "MBO için iyi Hollandaca; HBO/WO’da programa göre Hollandaca veya İngilizce gerektiği ifade edilir.",
          "SBB’nin BOL/BBL için şirket akreditasyonu, faaliyet–müfredat uyumu, denetim ve okul–işyeri iletişimi gibi yasal gereklilikleri belirlediği; Hollanda Eğitim Müfettişliği’nin denetim yaptığı belirtilir.",
          "leerbanenmarkt.nl bağlantısının verildiği yazılır.",
        ],
      },
      {
        title: "Ücret ve Starterbeurs",
        paragraphs: [
          "Okul stajında öğrencilere genelde ayda 250–350 EUR arası ücret verildiği; şirketin bunu zorunlu tutmadığı yazılır.",
          "Çıraklıkta (işyeri sözleşmesi) ücretin asgari ücrete ve sektör CAO’suna dayandığı belirtilir.",
          "On sekiz–yirmi yedi yaş arası mezunlar için haftada 32 saat altı ay deneyim ve aylık 700 EUR yerel yönetim ödemesi içeren “starter grant” (startersbeurs.nu) şemasından bahsedilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-bsn",
    tocLabel: "İkamet ve BSN",
    h2: "Belediye kaydı ve RNI",
    lead: "Dört aydan kısa kalış veya BSN için telefon randevusu.",
    accordions: [
      {
        title: "Kayıt prosedürü",
        paragraphs: [
          "AB/AEA/İsviçre vatandaşının Hollanda’ya gelmesi halinde ikamet edilen belediyede (gemeente) kayıt olunması gerektiği yazılır.",
          "Dört aydan kısa kalınacaksa veya BSN gerekiyorsa, kayıt dışı kişi (RNI) kaydı için belirli belediyelerle telefon randevusu alınabildiği belirtilir.",
          "İkamet için geçerli pasaport, geçim kaynağı ve sağlık sigortası belgesinin gerekli olduğu; AB Antlaşması kapsamında çalışma, eğitim, ekonomik pasiflik veya AB vatandaşı aile üyesi olarak kalış nedenlerinin sayıldığı ifade edilir.",
          "Dört aydan kısa sürede ikamet belgesi zorunlu olmasa da vergi ve banka gibi kurumlar için Göç ve Vatandaşlık Servisi’nden (IND) kayıt beyanı alınmasının yararlı olabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "varis-pdu",
    tocLabel: "Varış ve PDU formları",
    h2: "İşsizlik hakkını taşıma ve UWV kaydı",
    lead: "PDU2 ile en fazla üç ay; ihracat başlangıcından sonra yedi gün içinde UWV.",
    accordions: [
      {
        title: "Taşınmadan önce",
        paragraphs: [
          "Geçici konut, ilk aylar için yeterli kaynak, geçerli AB pasaportu/kimlik kartı, Avrupa Sağlık Kartı ve gönderilen işçi için A1 formu; yeni ülke hakkında genel bilgi gerektiği yazılır.",
          "Mümkünse PDU1 ve/veya PDU2 formlarından bahsedilir.",
        ],
      },
      {
        title: "PDU2 ve UWV",
        paragraphs: [
          "İşsizlik ödeneği alırken Hollanda’da iş aramak için bu hakkın en fazla üç ay taşınabildiği; taşınmadan önce menşe ülkedeki yardım kurumundan PDU2 talep edilmesi gerektiği belirtilir.",
          "PDU2 onaylandıktan sonra ihracat döneminin başlangıç tarihinden itibaren yedi gün içinde UWV’ye iş arayan olarak kayıt olunması gerektiği; ayrıntıların uwv.nl’de olduğu ifade edilir.",
        ],
      },
      {
        title: "PDU1 ve sınır ötesi",
        paragraphs: [
          "Hollanda’da çalışıp işsiz kalan ve daha önce AB/AEA/İsviçre’de de çalışmış olanların Hollanda işsizlik yardımı başvurusunda PDU1’e ihtiyaç duyabileceği; mümkünse Hollanda’ya gelmeden önce talep edilmesi önerildiği yazılır.",
          "Almanya veya Belçika’da yaşayıp Hollanda’da günlük çalışanlar için iki ülke hukukunun geçerli olduğu; Grensinfopunten (GIP), sınır ötesi EURES danışmanları (ör. ZAV, VDAB, Forem, Actiris, UWV) kaynakta anıldığı belirtilir.",
        ],
      },
      {
        title: "Varıştan hemen sonra",
        paragraphs: [
          "İkamet belediyesine kayıt; BSN için belediyeye başvuru; banka hesabı açılması ve işsizlik ihracatı varsa UWV’ye kayıt yapılması listelenir.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut",
    h2: "Randstad sıkışıklığı ve puan sistemi",
    lead: "Ocak 2025 göstergeleri ve yüzde 2 devralma vergisi.",
    accordions: [
      {
        title: "Kiralama ve sosyal konut",
        paragraphs: [
          "Konut bulmanın her zaman kolay olmadığı; özellikle Amsterdam, Lahey, Rotterdam ve Utrecht çevresindeki Randstad’da ve Leiden, Groningen, Maastricht gibi üniversite şehirlerinde uygun fiyatlı konutun kıt olduğu yazılır.",
          "Konut talebinin yüksek, uygun arzın azaldığı belirtilir.",
          "Kira genelde temel kira ve hizmet giderlerinden oluştuğu; konut başına azami kiranın puan sistemiyle belirlendiği; özel sektör ve sosyal konut kooperatifleri (housing corporations) yoluyla konut bulunduğu ifade edilir.",
          "Randstad’da özel sektör kiralarının diğer bölgelere göre yüksek ve çoğu zaman gaz, su ve aydınlatma gibi hizmet bedellerini kapsamadığı yazılır.",
          "Kooperatiflerin ortalama kira artışı için azami standart ve önceki yıl enflasyonuna bağlı tavan uyguladığı; hizmet giderleri avanslarının yıllık hesapla kapatıldığı belirtilir.",
        ],
      },
      {
        title: "Satın alma (kaynak rakamlar)",
        paragraphs: [
          "Emlakçı siteleri, gazete ilanları ve yüz yüze emlak ofisleriyle arama yapılabildiği yazılır.",
          "İpoteklerin çoğunlukla otuz yıl için yapıldığı; faiz gideri vergi indirimi hakkı bulunduğu; yeni olmayan konutta yüzde iki devralma vergisi ödendiği belirtilir.",
          "Ocak 2025’te satın alınacak konutun ortalama fiyatının 520.000 EUR’yu aştığı; en düşük fiyatların Doğu Groningen ve Limburg’da, batı ve merkezde çok daha yüksek olduğu yazılır.",
          "Daire ortalamasının 488.000 EUR ulusal ortamda verildiği ve arz kıtlığı nedeniyle sürekli arttığı; 2025’te konut fiyatlarının yüzde 9,2 arttığının belirtildiği; COVID sonrası uzaktan çalışmanın büyük şehir dışına göçü ve orada fiyat artışını hızlandırabileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "is-sozlesmeleri",
    tocLabel: "İstihdam türleri ve WAB",
    h2: "Esnek sözleşmeler ve mevsimlik iş",
    lead: "Sokak sanatçısı; mevsimlik tarımda SNF konutu.",
    accordions: [
      {
        title: "WAB ve esneklik",
        paragraphs: [
          "Son yıllarda esnek sözleşmelerin (“flexworkers”) belirgin şekilde arttığı; geçici, günlük veya çağrı üzerine sözleşmelerin yaygın olduğu yazılır.",
          "Geçici istihdamın deneyim kazanmak için kabul gördüğü; deneyimin Hollanda’da son derece önemli sayıldığı belirtilir.",
          "Dengeli İşgücü Piyasası Yasası (WAB) ile kalıcı ve esnek sözleşmeler arasındaki farkın kapatılmaya çalışıldığı; çağrı ve bordrolu işçilere daha fazla güvenlik ve kalıcı sözleşmenin işveren için daha cazip hale getirildiği ifade edilir.",
        ],
      },
      {
        title: "Sokak sanatçısı ve mevsimlik iş",
        paragraphs: [
          "Sokak sanatçısı kategorisinin müzik, tiyatro, pandomim, sirk ve portre çizimi alanlarında hizmet verenleri kapsadığı; bu faaliyetler için çalışma iznine gerek olmadığı yazılır.",
          "Kısa süreli kalışta AB vatandaşının sürekli geçerli pasaport, kimlik veya AB sürücü belgesiyle kendini tanıtabilmesi; geçim ve sağlık/kaza sigortası bulundurması gerektiği; bazı belediyelerde ücret karşılığı izin istenebildiği belirtilir.",
          "Sokak sanatçısının da vergi beyanı yapması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Mevsimlik iş ve SNF",
        paragraphs: [
          "Mevsimlik işin belirli dönemlerde ek çalışma olduğu; mevsim sonunda otomatik bittiği; tarım, turizm ve otelcilikte yaygın olduğu yazılır.",
          "İklim veya doğal koşullar gereği en fazla dokuz ay sürdüğü; tatil çalışanlarının da mevsimlik sayıldığı belirtilir.",
          "AB/AEA/İsviçre pasaport veya kimliği ile çalışma ve kalışın kanıtlanabildiği; işverenin mevsimlik işçiye sabit saat garantisi vermediği; CAO varsa mevsimlik kurallarının orada tanımlanması gerektiği ifade edilir.",
          "Tarımda işverenin SNF (esnek konut standartları vakfı) kalite işaretine uygun konaklama sunması gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-detay",
    tocLabel: "İş sözleşmesi",
    h2: "Sözlü geçerli; yazılı önerilir",
    lead: "Kalıcı ve geçici; deneme süresi ve yüzde sekiz tatil parası.",
    accordions: [
      {
        title: "Sözlü ve yazılı",
        paragraphs: [
          "Sözlü iş sözleşmesinin hukuken geçerli olduğu; ancak önemli şartların yazıya dökülmesinin önerildiği yazılır.",
          "Kalıcı ve geçici sözleşme arasındaki başlıca farkın süre olduğu; birçok koşulun altı ay veya bir yıllık geçici sözleşmeyle başladığı belirtilir.",
        ],
      },
      {
        title: "Yazılı olarak netleştirilmesi gerekenler",
        paragraphs: [
          "İşçi ve işveren adı ve adresi; çalışma yeri veya mobil çalışma; görev; işe giriş ve (geçici ise) bitiş tarihi; günlük/haftalık saat; ücret ve ödeme sıklığı; deneme süresi; en az yüzde sekiz tatil ikramiyesi (brüt yıllık ücret üzerinden); izin günü sayısı; ihbar süreleri; varsa emeklilik planı ve rekabet yasağı; uygulanan CAO atfı kaynakta sayılır.",
          "CAO’nun iş koşullarına atıf yapılabildiği; işverenin işe başladıktan sonra bir ay içinde bilgi vermesi ve sözleşmenin tercihen anlaşılır dilde yazılması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Değişiklikler",
        paragraphs: [
          "Sözleşme değişikliklerinin yazılı kayda bağlanması gerektiği; çalışma süresini ayarlama yasası (Waa) gibi düzenlemelerin rijksoverheid.nl üzerinden bulunabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "ucret-minimumloon",
    tocLabel: "Ücret ve asgari ücret",
    h2: "2024’ten itibaren saatlik asgari ücret",
    lead: "CAO ile sektörel ücretler; bordro zorunluluğu.",
    accordions: [
      {
        title: "Asgari ücret ve CAO",
        paragraphs: [
          "Yirmi bir yaş ve üzeri için yasal asgari ücret; yirmi bir altı için ayrı gençlik asgari ücreti bulunduğu yazılır.",
          "1 Ocak 2024’ten itibaren yasal asgari ücretin saatlik olarak tanımlandığı; ayrı günlük/haftalık/aylık yasal asgari tabanların artık olmadığı belirtilir.",
          "Yirmi bir yaş üstü için 1 Ocak’tan itibaren brüt saatlik asgari ücretin 14,06 EUR olduğu ve temmuzda gözden geçirileceğinin kaynakta belirtildiği yazılır (güncel rakam government.nl / SZW).",
          "Sektör CAO’larının yasal seviyenin üstünde veya eşinde ücret belirlediği; ücretin çoğunlukla brüt üzerinden anlaşıldığı ve netin bankaya yatırıldığı ifade edilir.",
          "Ödeme sıklığının genelde aylık, dört haftada bir veya haftalık olabildiği belirtilir.",
        ],
      },
      {
        title: "Bordro içeriği",
        paragraphs: [
          "Bordroda brüt ücret, kalemlerin dökümü, vergi ve prim kesintileri, uygulanan asgari gençlik/yetişkin ücret ve asgari tatil ikramiyesi, işveren ve çalışan adı, dönem ve sözleşmeye göre çalışılacak saat sayısının bulunması gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-saat",
    tocLabel: "Çalışma süresi",
    h2: "Arbeidstijdenwet (ATW)",
    lead: "Günde en fazla dokuz saat; haftada kırk beş saat tavan.",
    accordions: [
      {
        title: "Temel sınırlar",
        paragraphs: [
          "Kanunen günde dokuz saatden ve haftada kırk beş saatten fazla çalışılamayacağı; ortalama haftanın otuz altı ile kırk saat arasında olduğu; çoğunlukla beş günlük iş haftası bulunduğu yazılır.",
          "Arbeidstijdenwet ve Arbeidstijdenbesluit ile azami süre, minimum dinlenme, gece çalışması, molalar, fazla mesai ve nöbet hizmetlerinin düzenlendiği; ulaştırma sektörü için ayrı kararname bulunduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izin",
    tocLabel: "İzin ve resmî tatiller",
    h2: "İş ve Bakım Yasası (Wet arbeid en zorg)",
    lead: "Yıllık izin: haftalık çalışma günü sayısının dört katı; yüzde sekiz tatil parası.",
    accordions: [
      {
        title: "Yıllık izin ve vakantiegeld",
        paragraphs: [
          "Ücretli yıllık iznin asgari olarak haftada kaç gün çalışılıyorsa yılda en az dört katı kadar gün olduğu yazılır.",
          "Çoğu CAO’nun asgariyi aştığı; tam zamanlı için genelde yirmi–otuz gün aralığı verildiği belirtilir.",
          "Ücret düzeyinden bağımsız en az yüzde sekiz tatil ikramiyesi (vakantiegeld) hakkı bulunduğu; fazla mesai ücreti üzerinden de hesaplanması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Wazo ve tatiller",
        paragraphs: [
          "Wet arbeid en zorg kapsamında on güne kadar ücretli bakıcı izni, doğum izni, eş için doğuma bağlı iki iş günü ve ebeveyn izninde esneklik, her iki evlat edinen için evlat edinme izni gibi başlıkların düzenlendiği yazılır.",
          "Resmî tatiller arasında Yılbaşı, Büyük Cuma, Paskalya, Kralın Günü (27 Nisan; Pazar’a denk gelirse 26 Nisan), beş yılda bir kutlanan Özgürlük Günü (5 Mayıs), İsa’nın Göğe Çıkışı, Pentikost, Noel (25–26 Aralık) sayıldığı belirtilir.",
          "5 Aralık Aziz Nicholas gününde bazı işyerlerinin erken kapandığı; güneyde Şubat–Mart karnavalında okul ve kurumların birkaç gün tatil edilebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "fesih",
    tocLabel: "İşin sonu",
    h2: "UWV, mahkeme ve geçiş tazminatı",
    lead: "Geçici sözleşmede bir ay önceden yazılı bilgilendirme.",
    accordions: [
      {
        title: "Fesih yolları",
        paragraphs: [
          "Süre dolması, işçi veya işveren ihbarı, karşılıklı anlaşma, mahkeme kararı veya işçinin ölümüyle sözleşmenin sona erebildiği yazılır.",
          "İhbarın genelde ay sonundan itibaren geçerli olduğu; CAO veya sözleşmede farklı tarih kararlaştırılabildiği; deneme veya ciddi sebep (ör. hırsızlık) halinde derhal fesih istisnalarının bulunduğu belirtilir.",
        ],
      },
      {
        title: "Kalıcı sözleşme ve UWV",
        paragraphs: [
          "İşverenin ekonomik gerekçeyle veya uzun süreli iş göremezlikte tek başına işten çıkaramadığı; ekonomik toplu işten çıkarma ve uzun süreli iş göremezlikte UWV’ye başvurulması gerektiği yazılır.",
          "Diğer fesih nedenlerinin bölge mahkemesine gittiği belirtilir.",
          "İki yıl veya daha uzun süre çalışanların veya uzatılmayan geçici sözleşmede hak kazananların geçiş tazminatı (transitievergoeding) alabileceği; rijksoverheid.nl üzerinde “transitievergoeding” aramasıyla bilgi bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Geçici sözleşme ve ihbar yükümlülüğü",
        paragraphs: [
          "Geçici sözleşmede işverenin uzatma kararını en az bir ay önce yazılı bildirmesi gerektiği; altı ay ve üzeri ardışık sözleşmeler için de benzer bildirim yükümlülüğünün bulunduğu yazılır.",
        ],
      },
      {
        title: "İşyeri konseyi",
        paragraphs: [
          "Elli ve daha fazla çalışanı olan şirketlerde işyeri konseyinin (ondernemingsraad) zorunlu olduğu; çalışanlar için politika etkisi ve işveren için destek oluşturma aracı olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve grev",
    h2: "FNV, CNV ve VCP",
    lead: "Toplam yaklaşık 1,5 milyon üye; grevler nadir ama artıyor.",
    accordions: [
      {
        title: "Üyelik ve toplu pazarlık",
        paragraphs: [
          "Çalışan veya işsiz herkesin sendikaya üye olabileceği; üyeliğin yaygın kabul gördüğü; bazı sektörlerde işverenin doğrudan teşvik etmediği yazılır.",
          "Sendikaların web üzerinden üyelik aldığı; neredeyse her sektörde sendika ve öğrenciler için bile sendika bulunduğu; aidatın sendikaya göre değiştiği belirtilir.",
          "Sendikaların CAO müzakere ettiği, vergi ve işten çıkarma hukuki danışmanlığı ücretsiz sunduğu ifade edilir.",
          "Yaklaşık 1,5 milyon üye ile FNV, CNV ve VCP’nin ana sendikalar olduğu; MKB Nederland gibi güçlü işveren örgütlerinin bulunduğu yazılır.",
          "Hükümet ile altı büyük işçi ve altı büyük işveren örgütünün İş Vakfı (Stichting van de Arbeid) çatısında danışma yürüttüğü belirtilir.",
        ],
      },
      {
        title: "Uyuşmazlık ve grev",
        paragraphs: [
          "Yönetim kararı birçok çalışanı etkiliyorsa işyeri konseyine veya sendikaya başvurulabileceği; bireysel konuda sendika üyeliği veya iş hukuku bürosu ve bazen hukuk masası veya mahkeme yolu önerildiği yazılır.",
          "Sendikaların grev çağrısı yapma özgürlüğü bulunduğu; grevin istisnai ve giderek arttığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi",
    tocLabel: "Vergi",
    h2: "Kutu (box) sistemi ve yerel vergiler",
    lead: "İşveren kaynakta kesinti yapar.",
    accordions: [
      {
        title: "Gelir vergisi kutuları",
        paragraphs: [
          "İşçi ücretinden işverenin gelir vergisi ve sosyal güvenlik kesintisini kesip Belastingdienst’e aktardığı; bunun gelir vergisi için avans mahsup olduğu yazılır.",
          "Üç kutu sisteminden bahsedilir: Kutu I istihdam ve konut, Kutu II önemli ortaklık geliri, Kutu III tasarruf ve yatırım; kutular arasında gelirin mahsup edilemediği belirtilir.",
          "Kutu I oranının kademeli ve iki dilimli sabit oranlı yapıda olduğu ifade edilir.",
        ],
      },
      {
        title: "Taşıt ve belediye vergileri",
        paragraphs: [
          "Motorlu taşıt vergisinin araç ağırlığı ve yakıt tipine; hafifçe eyalete göre değişebildiği; Belastingdienst sitesinde hesaplama programı bulunduğu yazılır.",
          "Belediye vergilerinin emlak, işe gidiş, turist, park, köpek, reklam, kanalizasyon ve çöp toplama gibi kalemleri içerebildiği; belediye ana sayfası veya Postbus 51 (rijksoverheid.nl) üzerinden bilgi alınabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-maliyeti",
    tocLabel: "Yaşam maliyeti",
    h2: "Şehir ve bölge farkı",
    lead: "Amsterdam en pahalı; kuzey ve doğu daha uygun.",
    accordions: [
      {
        title: "Genel tablo ve örnek fiyatlar",
        paragraphs: [
          "Hollanda’nın diğer AB ülkelerine göre nispeten pahalı olduğu; şehir ve kırsal, batı Randstad ile kuzey ve doğu arasında net fiyat farkı bulunduğu yazılır.",
          "Enerji ve dünya gelişmelerinin mal ve hizmet fiyatlarına yansıdığı belirtilir.",
          "Kaynak metinde örnek olarak ekmek 2,50 EUR, kahve 3,25 EUR, patates–kroket 6,50 EUR, sinema 12,50 EUR, kısa otobüs 2,60 EUR, benzin litre (Euro 95/E10) 2,00 EUR, orta segment araç kiralama 65 EUR, restoran iki çeşit menü 28,50 EUR rakamlarının verildiği; fiyatların dükkân ve bölgeye göre değiştiği ifade edilir.",
          "Pazarların dükkândan ucuz olduğu; “kringloopwinkel” ikinci el dükkanlarının bulunduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "kira-yardimi",
    tocLabel: "Kira ve kira yardımı",
    h2: "Huurcommissie ve toeslagen",
    lead: "Bekleme listeleri ve depozito.",
    accordions: [
      {
        title: "Sosyal sektör ve Huurcommissie",
        paragraphs: [
          "Kiralık konutun özellikle sosyal sektörde az olduğu; kooperatife kayıt olunup bekleme listesine girildiği yazılır.",
          "Teklif edilen konutun sınırlı koşullar dışında reddedilemeyeceği; düzenli iletişimin önemli olduğu belirtilir.",
          "Kira sözleşmesinde genelde bir aylık depozito istendiği ve fesih için en az bir ay ihbarın geçerli olduğu ifade edilir.",
          "Kiranın makul olup olmadığının Huurcommissie ile kontrol edilebileceği; İçişleri ve Konut bakanlığı (VROM) sitelerinde adreslerin bulunduğu yazılır.",
        ],
      },
      {
        title: "Huurtoeslag (kira yardımı)",
        paragraphs: [
          "Kira nispeten yüksekse Belastingdienst üzerinden kira yardımı başvurusu yapılabildiği; koşulların belastingdienst.nl’de “toeslagen” aramasıyla bulunduğu belirtilir.",
        ],
      },
      {
        title: "Satın alma",
        paragraphs: [
          "Faiz gideri indirimi nedeniyle konut satın almanın cazip olabildiği; emlakçı ve funda.nl gibi sitelerin kullanıldığı yazılır.",
          "Komisyonun pazarlığa açık olduğu; çoğu ilanda alıcı masraflarının (küçük harflerle “koper kosten”) fiyata dahil olmadığı; yeni konutta fiyatın genelde her şey dahil olduğu belirtilir.",
          "Satın alma senedinin noter tarafından düzenlendiği; Eigen Huis derneğinin danışmanlık verdiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "saglik",
    tocLabel: "Sağlık sigortası",
    h2: "Zorunlu temel paket ve eigen risico",
    lead: "zorgtoeslag gelir sınırları (kaynak metin).",
    accordions: [
      {
        title: "Zorunluluk ve temel sigorta",
        paragraphs: [
          "Hollanda’da yaşayan ve/veya çalışan herkesin zorunlu sağlık sigortası yaptırması gerektiği; on sekiz yaş üstü her aile üyesi için özel sağlayıcılar aracılığıyla genel temel paket bulunduğu yazılır.",
          "Aylık primin her yıl kasımda ertesi yıl (1 Ocak) için belirlendiği; sağlayıcıya göre değiştiği belirtilir.",
        ],
      },
      {
        title: "Zorgtoeslag ve katkı payı",
        paragraphs: [
          "Düşük gelirlilerin zorgtoeslag (sağlık primi indirimi) hakkı olabildiği; bekarlarda yıllık 37.719 EUR veya daha az, birlikte yaşayanlarda 50.206 EUR veya daha az gelir eşiklerinin kaynak metinde verildiği; güncel tutar ve koşulların belastingdienst.nl’de olduğu yazılır.",
          "Yıllık zorunlu muafiyetin (eigen risico) 385 EUR olduğu ve yıllık artırılabildiği; bu tutarın önce ödenmesi gerektiği, örneğin ilaç veya hastane uzmanı ziyaretinde; aile hekimi ziyaretinin ücretsiz olduğu belirtilir.",
          "Uzman veya hastane için aile hekimi sevkının zorunlu olduğu; diş hekimi ve büyük hastanelerin acil servisi istisnası olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "egitim",
    tocLabel: "Eğitim",
    h2: "Beş–on altı zorunlu okula devam",
    lead: "Kennisnet ve DUO.",
    accordions: [
      {
        title: "Okula başlama ve zorunluluk",
        paragraphs: [
          "Beş–on altı yaş grubunun yasayla okula devamının zorunlu olduğu; uzun süre Hollanda’da kalan tüm çocuklar için geçerli olduğu yazılır.",
          "Çocuğun doğum gününü izleyen ayın ilk gününden en geç okula başlaması gerektiği; çoğu çocuğun dört yaşında başladığı ve bir yıl uyum süreci yaşadığı belirtilir.",
          "Dört yaşında kayıt olunsa da zorunlu eğitim yasası dört yaşında veli ve okul anlaşması olmadan devreye girmediği ifade edilir.",
        ],
      },
      {
        title: "İkinci derece ve ücretler",
        paragraphs: [
          "İlkokul sekizinci sınıftan sonra genel ortaöğretim veya mesleğe hazırlık ortaokuluna geçildiği; on sekiz yaştan itibaren harç ödendiği; yüksek öğrenimde öğrenci kredilerinin çok yaygın olduğu yazılır.",
          "Tatillerin dışında okuldan alıkonmanın yerel makam iznine bağlı olduğu belirtilir.",
          "On altıncı yaşını bitirdiği öğretim yılı sonuna kadar tam zamanlı devam zorunluluğu; ardından haftada en az iki gün eğitim kurumuna devam yükümlülüğü veya MYO ile pratik sözleşme kombinasyonunun bulunduğu; on yedinci yaş sonrası okulu bırakanların kısmi yükümlülükten muaf olabileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "devlet-kultur",
    tocLabel: "Devlet ve günlük yaşam",
    h2: "Anayasal monarşi ve ulaşım",
    lead: "NS, OV-chipkaart ve bisiklet.",
    accordions: [
      {
        title: "Siyasi ve yargı sistemi",
        paragraphs: [
          "Hollanda’nın anayasal monarşi ve parlamentar demokrasi olduğu; 1814 Anayasası’nın temel hakları ve yasama çerçevesini belirlediği yazılır.",
          "Dört yılda bir 150 sandalyeli Temsilciler Meclisi seçimleri; 75 üyeli Senatonun il meclisleri tarafından seçildiği belirtilir.",
          "Yerel seçimlerin dört yılda bir yapıldığı; jüri sisteminin olmadığı; bölge mahkemesi, hukuk mahkemesi ve beş istinaf mahkemesinden oluşan yapıdan bahsedilir.",
        ],
      },
      {
        title: "Kültür ve ulaşım",
        paragraphs: [
          "On yedinci yüzyıl ressamlarından günümüz moda ve DJ kültürüne uzanan sanat takvimi için holland.com’un anıldığı yazılır.",
          "Ülkenin beşte birinin su olduğu; su sporları, futbol, bisiklet ve kışın buz pateninin popüler olduğu belirtilir.",
          "Ulaşımda tıkanıklığın arttığı; çok az yolda otomat ücreti alındığı; NS.nl’den tren bilet fiyatlarının bakılabildiği; özel tren işletmecilerinin de bulunduğu ifade edilir.",
          "OV-chipkaart ile tüm taşımacılarda seyahat edildiği; aktarmada her işletmede ayrı check-in/out yapılması gerektiği yazılır.",
          "Bisikletin özellikle büyük şehirlerde ana ulaşım araçlarından biri olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "UWV, belediye ve WIA",
    lead: "CRPD uyumu; işyeri uyarlama desteği.",
    accordions: [
      {
        title: "Tanım ve başvuru",
        paragraphs: [
          "Hollanda tanımının BM Engelli Hakları Sözleşmesi ile uyumlu olduğu; uzun süreli engelin engellerle etkileşimde topluma eşit katılımı zorlaştırabileceği yazılır.",
          "Tanı ve desteğin devlet, belediye ve UWV süreçleriyle yürüdüğü; tıbbi değerlendirmenin destek öncesi yapılabildiği belirtilir.",
          "Katılım Yasası, İş Gücüne Göre Gelir Yasası (WIA) ve Engellilik veya Kronik Hastalık Nedeniyle Eşit Muamele Yasası (Wgbh/cz) kaynakta anılır.",
        ],
      },
      {
        title: "İşveren ve çalışan destekleri",
        paragraphs: [
          "Engelli işçi istihdamında ücret sübvansiyonu, işyeri uyarlama giderlerinin karşılanması ve iş koçluğu için UWV ve belediye başvurularının mümkün olduğu yazılır.",
          "İşverenin güvenli ve erişilebilir çalışma ortamı sağlama yükümlülüğü; makul maliyetlerde UWV veya belediyenin uyarlama masrafını karşılayabileceği belirtilir.",
          "WIA kapsamında yardımlar, işyeri düzenlemeleri ve iş koçluğunun anıldığı ifade edilir.",
          "Wgbh/cz’nin ayrımcılığı yasakladığı ve makul uyarlama zorunluluğu getirdiği; engellilikle ilgili haksız feshin iptal edilebileceği yazılır.",
        ],
      },
      {
        title: "Günlük yaşam",
        paragraphs: [
          "Kamu taşımada refakatçinin ücretsiz seyahat edebildiği OV-Begeleiderskaart gibi indirimlerden; Wmo kapsamında bölgesel taksi indirimlerinden bahsedilir.",
          "Uygun konut için belediye aciliyet beyanı veya kooperatif önceliği ile uzman kuruluş tavsiyelerinin anıldığı belirtilir.",
          "Breda, Amsterdam, Haarlem, Arnhem ve Nijmegen bölgesinin erişilebilirlik örnekleriyle anıldığı; Avrupa Komisyonu Access City Award sayfasına atıf yapıldığı ifade edilir.",
        ],
      },
    ],
  },
];
