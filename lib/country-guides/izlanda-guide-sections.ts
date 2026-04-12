import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Iceland” (12/09/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const IZLANDA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “İzlanda’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. İzlanda Schengen ve Avrupa Ekonomik Alanı üyesidir; para birimi İzlanda krónasıdır (ISK). Vinnumálastofnun ve EURES portalı; çoğu yerel ilanın İzlandaca olması; EURES ilanlarında İngilizce sürüm zorunluluğu; eures@vmst.is danışmanlığı; toplu iş sözleşmelerinin (ASÍ ve sektör anlaşmaları) 55/1980 sayılı Kanunla ilgili sektör ve bölgedeki tüm işçi ve işverenlere otomatik bağlayıcılığı; bir aydan uzun ve haftada sekiz saatten fazla çalışmada iki ay içinde yazılı iş sözleşmesi; Þjóðskrá’da ikamet ve sosyal güvenlik numarası; üç–altı ayı aşan kayıtsız kalışın hukuka aykırı olduğu; yasal ikamet kaydından sonra altı ay içinde otomatik sağlık sigortası ve E-104 ile hızlandırma; referans döneminde dört ayda kırk sekiz saati aşmayan ortalama haftalık süre ve gece çalışması kuralları; sendika üyeliğinin yaklaşık %85 olması; grev kararı için gizli oylama ve asgari %20 katılım şartı; 1 Eylül 2025’ten itibaren ICF tabanlı engellilik değerlendirmesi ve maaş sübvansiyonu başlıklarında kamu bilgisine dayanır.",
  "Ücretler, harçlar ve idari süreler güncellenebilir. Doğrulama için vinnumalastofnun.is, vmst.is, skra.is, island.is, sjukra.is, skatturinn.is ve utlendingastofnun.is kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const IZLANDA_SEO_KEYWORD_TAGS: string[] = [
  "izlanda vize",
  "izlanda schengen çalışma",
  "Vinnumálastofnun EURES Iceland",
  "eures@vmst.is",
  "Þjóðskrá Iceland registration",
  "Iceland collective agreement minimum wage",
  "Vinnustaðanámssjóður apprenticeship fund",
];

export const IZLANDA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-eures",
    tocLabel: "İş bulma",
    h2: "Vinnumálastofnun, EURES ve İzlandaca ilanlar",
    lead: "Taşınmadan önce sektör siteleri ve belgeler hazır olmalıdır.",
    accordions: [
      {
        title: "Resmî kanallar ve dil",
        paragraphs: [
          "Ana iş ve medya sitelerinin, hedef sektördeki işletmelerin sayfalarının ve CV ile gerekli belgelerin taşınmadan önce incelenmesi gerektiği yazılır.",
          "Çoğu işverenin ilanları İzlandaca verdiği; EURES’te yayımlanan ilanlarda İngilizce metnin ön koşul olduğu belirtilir.",
          "EURES portalının Vinnumálastofnun’dan gelen ilanları ve özellikle EEA genelinde işe almak isteyen işverenlerin işaretlediği ilanları listelediği; İzlanda işgücü piyasası ve yaşam koşulları bilgisinin de portalda bulunduğu ifade edilir.",
          "EURES danışmanına eures@vmst.is e-postasıyla ulaşılabildiği yazılır.",
        ],
      },
      {
        title: "Ajans, basın ve sosyal ağ",
        paragraphs: [
          "Çeşitli işe yerleştirme bürolarına ücretsiz kayıt olunabildiği; asıl bürolar listesinin Vinnumálastofnun “Employment agencies” sayfasında yer aldığı belirtilir.",
          "Morgunblaðið (mbl.is) ve kırsal gazetelerde ilan bulunabildiği; Facebook ve LinkedIn’de iş, employment ve vacancies anahtar kelimeleriyle grupların taranabileceği ifade edilir.",
          "İşletmelerin çoğunun ilanları kendi sitelerinde ve sosyal medyada verdiği; tanıdık ağının iş aramada sonuç getirebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru-europass",
    tocLabel: "Başvuru",
    h2: "CV, örtük yazı ve elektronik formlar",
    lead: "Gerçekçi hedef ve titiz belge hazırlığı önerilir.",
    accordions: [
      {
        title: "Europass ve başvuru kuralları",
        paragraphs: [
          "Kısa ve bilgilendirici CV ile örtük yazının öneminin vurgulandığı; başvuruya CV ekleme pratiğinin yaygın olduğu yazılır.",
          "Europass ile CV ve örtük yazı hazırlanabileceği ve becerilerin standart biçimde sunulabileceği belirtilir.",
          "İşletmelerin web sitelerinde elektronik başvuru formlarının giderek arttığı; CV ve örtük yazının yüklenebildiği ifade edilir.",
          "Başvuru yöntemi ve zorunlu ekler konusunda ilandaki talimatlara uyulması gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "staj-ciraklik",
    tocLabel: "Staj ve çıraklık",
    h2: "Öğrenimle bağlantılı staj ve meslek lisesi çıraklığı",
    lead: "Üniversite düzeyinde genel çıraklık çerçevesi yoktur; meslek okulunda izin ve sözleşme zorunludur.",
    accordions: [
      {
        title: "Staj kültürü ve ücret tabanı",
        paragraphs: [
          "Stajların çoğunlukla ders programının parçası olduğu; mezuniyet sonrası ayrı staj geleneğinin sınırlı olduğu yazılır.",
          "Şirketlerin stajyer almasının kendi inisiyatifine bağlı olduğu belirtilir.",
          "Stajyerin en az ilgili toplu iş sözleşmesindeki asgari ücreti alması gerektiği; farklı anlaşmalar için sendika ve federasyon bilgisinin yönlendirildiği ifade edilir.",
        ],
      },
      {
        title: "Meslekî çıraklık ve fonlar",
        paragraphs: [
          "Ortaöğretim meslekî çıraklık çerçevesinin 92/2008 sayılı Ortaokul Kanunu ve 840/2011 sayılı yönetmelikle düzenlendiği; başvuru yaşının on altı olduğu yazılır.",
          "Usta diplomasıyla biten geleneksel çıraklığın tipik olarak dört yıl sürdüğü; okul ve işyeri kombinasyonunun sektöre göre değiştiği belirtilir.",
          "Çırak almak isteyen şirketin özel izin başvurusu yapması ve sektör komitesinin koşulları sağlayanlara lisans vermesi gerektiği; Reykjavík Teknik Okulu’nun (en.tskoli.is) geniş program yelpazesi sunduğu ifade edilir.",
          "Vinnustaðanámssjóður’un (RANNÍS) ortaokul müfredatındaki işyeri öğrenimi ve çıraklığa hibe verdiği yazılır.",
          "Üniversite düzeyinde stajların çoğunlukla üniversite–şirket ikili anlaşmalarına dayandığı ve sürenin değişken olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "konut-skrá",
    tocLabel: "Konut ve kayıt",
    h2: "Kira piyasası ve Þjóðskrá",
    lead: "Talep arzı aşar; Reykjavik merkezi en pahalı bölgedir.",
    accordions: [
      {
        title: "Kiralama ve geçici konaklama",
        paragraphs: [
          "Taşınmadan önce konut ayarlamanın önerildiği; her zaman mümkün olmadığında misafirhane, hostel veya Airbnb ile başlanabileceği yazılır.",
          "Bireysel, şirket, kiralama şirketi ve belediye kanallarının kullanıldığı; sosyal medya gruplarında “rent” veya “housing” anahtar kelimeleriyle arama yapılabildiği belirtilir.",
          "Kiralama acentelerinin bireylere de açık olduğu ifade edilir.",
        ],
      },
      {
        title: "Ulusal kayıt ve haklar",
        paragraphs: [
          "Þjóðskrá (skra.is) üzerinden taşınan kişilerin kayıt prosedürlerinin izlenmesi gerektiği yazılır.",
          "EEA dışından gelenler için oturum izninin Útlendingastofnun’dan alınması gerektiği belirtilir.",
          "Üç–altı ayı aşan süreyle ulusal deftere kayıt olmadan kalmak yasadışı sayıldığı; kamu hizmetlerinin çoğunlukla kayıtlı ikamete bağlı olduğu ve önce domisil kaydı yapılmasının önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "okul-aile",
    tocLabel: "Okul",
    h2: "Kreş, on yıllık zorunlu okul ve ortaokul",
    lead: "Kreş ücreti belediye ve ebeveyn payıyla bölüşülür.",
    accordions: [
      {
        title: "Kreş ve zorunlu okul",
        paragraphs: [
          "Bir–altı yaş kreşlerinin belediye veya özel işletildiği; çocuk sosyal güvenlik numarası alınır alınmaz veya doğumdan hemen sonra başvurulabildiği yazılır.",
          "Altı–on altı yaş arası on yıl zorunlu eğitimin belediye okullarında yürüdüğü; özel okulların da bulunduğu belirtilir.",
          "Müfredat ve başvuru formlarının belediye sitelerinde olduğu ifade edilir.",
        ],
      },
      {
        title: "Ortaöğretim ve bağlantılar",
        paragraphs: [
          "Ortaöğretim kurumlarının devlet tarafından işletildiği; Menntamálastofnun (mms.is) ve menntagatt.is kaynaklarının anıldığı yazılır.",
          "Çok kültürlü bilgi merkezi mcc.is üzerinden eğitim özetlerine gidilebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "gelis-kontrol-listesi",
    tocLabel: "Varış öncesi ve sonrası",
    h2: "Belgeler, E-104 ve ilk adımlar",
    lead: "Geçerli kimlik planlanan sürenin en az üç ay ötesine uzanmalıdır.",
    accordions: [
      {
        title: "Getirilecekler",
        paragraphs: [
          "Diploma ve meslek belgelerinin İngilizce ve/veya İzlandaca çevrilmesinin faydalı olduğu yazılır.",
          "Son ikamet ülkesinden genel sağlık sigortası dönemini doğrulayan E-104 sertifikasının; yasal ikamet kaydıyla birlikte sunulduğunda sağlık güvencesinin hemen başlayabildiği; aksi halde kayıttan altı ay sonra otomatik başladığı belirtilir.",
          "Avrupa Sağlık Sigorta Kartı, ilk maaşa kadar geçim ve depozito için yeterli nakit ve olası işsizlikte U1 belgesinin anıldığı ifade edilir.",
        ],
      },
      {
        title: "Varışta yapılacaklar",
        paragraphs: [
          "İş ve/veya konut varsa derhal Þjóðskrá’da sosyal güvenlik numarası ve yasal ikamet başvurusunun yapılması gerektiği yazılır.",
          "İş arama bilgisi için yine Vinnumálastofnun / eures@vmst.is hatırlatıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "Toplu sözleşme üstünlüğü ve yazılı sözleşme",
    lead: "Sektör anlaşmaları kanunen asgari şart oluşturur; kişisel sözleşme daha düşük olamaz.",
    accordions: [
      {
        title: "Genel ilkeler",
        paragraphs: [
          "On sekiz yaşından küçükler için İş Müfettişliği izni ve gece yasağı gibi özel koruma kurallarının bulunduğu yazılır.",
          "İşe başlangıçta sözlü veya yazılı ilişkinin mümkün olduğu; ancak bir aydan uzun ve haftada sekiz saatten fazla çalışmada işe başlamadan itibaren en geç iki ay içinde imzalı yazılı sözleşme düzenlenmesi gerektiği belirtilir.",
          "Süresiz veya süreli tam zamanlı istihdamın yaygın olduğu; yarı zamanlı çalışan sayısının da belirli olduğu ifade edilir.",
          "Mevsimlik çalışan için özel yasal tanım olmadığı; ücret ve diğer şartların toplu anlaşmalarla asgariye bağlandığı ve anlaşmaların 55/1980 kanunu uyarınca ilgili sektör ve bölgede otomatik bağlayıcı olduğu yazılır.",
        ],
      },
      {
        title: "Sözleşme zorunlu içerikleri",
        paragraphs: [
          "Tarafların adları ve sosyal güvenlik numaraları, işyeri adresi, unvan veya işin kısa tanımı, ilk iş günü, süreli ise süre, ebeveyn izni hakkı, ihbar süreleri, maaş ve ödeme dönemleri, normal günlük/haftalık süre, emeklilik fonu ve uygulanan toplu iş sözleşmesi ile sendika referansının sözleşmede yer alması gerektiği belirtilir.",
          "Toplu anlaşmaya aykırı sözleşme hükümlerinin geçersiz sayıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-bordro",
    tocLabel: "Ücret ve bordro",
    h2: "Sektör asgari ücreti ve maaş dökümü",
    lead: "Ücretler banka hesabına yatırılır; çoğunlukla ay sonunu izleyen ilk iş günü ödenir.",
    accordions: [
      {
        title: "Toplu pazarlık ve kontrol",
        paragraphs: [
          "Ücret ve çalışma koşullarının sosyal taraflarca toplu anlaşmalarla belirlendiği; bireysel sözleşmenin anlaşmadaki asgariyi aşağı çekemeyeceği yazılır.",
          "On dört yaş ve üzeri için asgari ücret oranlarının sektör anlaşmalarında tanımlandığı; ayrıntı için ilgili sendika veya federasyona başvurulması gerektiği belirtilir.",
          "Yazılı maaş dökümünün zorunlu olduğu; işçilerin temsilcileri aracılığıyla kesintilerin doğruluğunu kontrol ettirebildiği ifade edilir.",
        ],
      },
      {
        title: "Bordroda asgari bilgiler",
        paragraphs: [
          "İşveren adı–adresi ve çalışan adı, ödeme dönemi veya iş, brüt kalemler (gündüz, fazla mesai vb.), saatlik oran ve çalışılan saat, vergi ve fon kesintileri, izin ücreti, ikramiye ve primler ile net ödenen tutarın dökümde gösterilmesi gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi",
    tocLabel: "Çalışma süresi",
    h2: "Dört aylık referans, gece ve fazla mesai",
    lead: "Yedi günlük dönemde ortalama kırk sekiz saati aşan süre fazla mesai sayılır.",
    accordions: [
      {
        title: "Dinlenme ve mola",
        paragraphs: [
          "Yirmi dört saatte en az on bir saat kesintisiz dinlenme; mümkünse 23.00–06.00 aralığında verilmesi; altı saati aşan her iş gününde en az on beş dakika ara verilmesi gerektiği yazılır.",
          "Kahve ve yemek molalarının ara sayıldığı; öğle arasının sektöre göre otuz–altmış dakika ve ücretsiz olduğu belirtilir.",
          "Gece çalışanının düzenli olarak 23.00–06.00 arasında üç saatten fazla çalışması halinde tanımlandığı; işverenin gece çalışanının yirmi dört saatte sekiz saati aşmaması için gerekli düzeni kurması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Fazla mesai ve vardiya",
        paragraphs: [
          "Tam zamanlı gündüz işinin toplu anlaşmaya göre genelde haftada kırk saat ve ayda 173,33 saat olduğu; bu sınırları aşan çalışmanın yüzde oranlarıyla ödendiği yazılır.",
          "Fazla mesai ücretinin aylık gündüz maaşının saatlik %1,0385’i kadar asgari ek ödeme olarak hesaplandığı belirtilir.",
          "Vardiya eklerinin en az %33 (hafta içi 17.00–24.00) ve %45 (gece ve hafta sonu) örnekleriyle anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "izinler-fesih",
    tocLabel: "İzin ve fesih",
    h2: "Yıllık izin, ebeveynlik ve ihbar",
    lead: "Her çalışan izin ve izin ödeneği hakkına sahiptir; asgari yıllık izin yirmi dört iş günüdür.",
    accordions: [
      {
        title: "İzin ve resmî tatiller",
        paragraphs: [
          "Her çalışılan ay için önceki izin yılında en az iki iş günü izin hakkı doğduğu; yılda asgari yirmi dört iş günü olduğu yazılır.",
          "Maaş ödemelerinde en az %10,17 izin ödeneği biriktirilmesi şartının asgari yıllık izni garanti ettiği belirtilir.",
          "İzin döneminin 2 Mayıs–15 Eylül arasında ve en az on dört günün yaz tatilinde kullanılmasının işveren–çalışan görüşmesiyle planlandığı ifade edilir.",
          "Resmî ve “major holiday” tatillerinde çalışmanın fazla mesai ile ödendiği; büyük tatillerde ek zamların eklendiği yazılır.",
        ],
      },
      {
        title: "Hastalık, ebeveynlik ve fesih",
        paragraphs: [
          "Hastalık hakkının toplu anlaşmaya göre değiştiği; asgirin her çalışılan ay için iki gün olduğu ve aynı işverende süre uzadıkça arttığı belirtilir.",
          "On üç yaş altı çocuk hastalığında ebeveyne on iki ayda on iki gün izin verildiği yazılır.",
          "Her ebeveyne altı ay analık/babalık izni ve toplamda on iki ay hakkı; dört aya kadar ücretsiz ebeveyn iznine sekiz yaşına kadar devam olunduğu ifade edilir.",
          "Belirsiz süreli sözleşmelerde ihbarla fesihde toplu anlaşmaya dayalı neden serbestliği; hamilelik, analık/babalık izni ve işyeri sendika temsilcisi için koruma istisnalarının anıldığı yazılır.",
          "İhbarın yazılı olması ve sürenin ay (veya hafta) sonundan başlaması gerektiği; bir haftadan altı aya kadar değişen sürelerin hizmet süresine bağlı olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve grev",
    h2: "Yüksek örgütlenme ve grev oylaması",
    lead: "Toplu anlaşma tüm çalışanları korur; üyelik şart değildir.",
    accordions: [
      {
        title: "Temsil ve toplu sözleşme",
        paragraphs: [
          "Sendika üyeliğinin ilgili meslek ve bölgedeki kurallara göre herkese açık olduğu; cinsiyet veya uyruk gerekçesiyle reddedilemeyeceği yazılır.",
          "Üyelik oranının yaklaşık %85 olduğu ve sendikaların ücret müzakerecisinin yanı sıra üyelere mali yardım ve İzlandaca kurs hibesi sağlayabildiği belirtilir.",
          "İşyeri temsilcisinin şikâyetleri topladığı ve geçerli bulursa işverene ilettiği ifade edilir.",
        ],
      },
      {
        title: "Grev ve lokavt",
        paragraphs: [
          "Son yıllarda grevlerin olağanüstü sık görüldüğü; kamuda özel sektöre göre daha yaygın olduğu yazılır.",
          "İmzalanmış toplu anlaşma süresince anlaşma koşullarına uyulduğu sürece grev hakkından feragat edildiği; yeni müzakerede grev kararının gizli oylama ile en az %20 katılım ve çoğunlukla alınması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-saglik",
    tocLabel: "Vergi ve sağlık",
    h2: "Skatturinn ve Sjúkratryggingar",
    lead: "Vergi yükümlülüğü için Skatturinn rehberleri kullanılmalıdır.",
    accordions: [
      {
        title: "Sağlık hizmetleri",
        paragraphs: [
          "Sağlık merkezlerinin ülke geneline yayıldığı; başkentte mahalle kaydı zorunlu olduğu yazılır.",
          "Mesai dışı nöbetin başkentte Læknavaktin ve kırsalda sağlık merkezlerinde yürüdüğü; gece ve hafta sonu ücretlerinin daha yüksek olduğu belirtilir.",
          "Acil numaranın 112 olduğu; reçeteli ilaçların eczaneden ve adım adı maliyet paylaşımı sistemiyle sübvansiyonlandığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-ulasim",
    tocLabel: "Yaşam ve ulaşım",
    h2: "Demiryolu yok; Keflavík ve iç hat uçuşları",
    lead: "Otoyol 1’de tek şerit köprüler ve stabilize yollar yaygındır.",
    accordions: [
      {
        title: "Siyasi yapı",
        paragraphs: [
          "17 Haziran 1944’ten beri cumhuriyet ve yazılı anayasa ile parlamentoya dayalı hükümet olduğu; cumhurbaşkanının dört yılda bir doğrudan seçildiği yazılır.",
          "Althingi’nin altmış üç üyeli yasama olduğu; yürütmenin başbakan ve bakanlarda toplandığı belirtilir.",
        ],
      },
      {
        title: "Ulaşım ağı",
        paragraphs: [
          "Ülkede demiryolu bulunmadığı; Keflavík uluslararası havalimanının Reykjavík’e yaklaşık kırk dakika mesafede olduğu; Icelandair ve Play hatlarının anıldığı yazılır.",
          "Akureyri yakınında Vaðlaheiðargöng tüneli dışında genelde ücretli otoyol olmadığı; iç hat uçuşlarının pahalı, otobüs hatlarının yaygın olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "serbest-meslek",
    tocLabel: "Serbest meslek",
    h2: "Şirket türleri ve posting.is",
    lead: "EEA’da ikamet eden serbest hizmet sağlayıcı üç ay ücretsiz kalabilir.",
    accordions: [
      {
        title: "Şirket kuruluşu",
        paragraphs: [
          "Bireysel işletme, en az ISK 500 000 sermayeli özel limited şirket (ehf), daha büyük yapılar için sf ve ortaklıkların anıldığı yazılır.",
          "Önce vergi dairesinde iş kaydı ve vergi rehberliği alınması gerektiği belirtilir.",
        ],
      },
      {
        title: "Geçici görevlendirme",
        paragraphs: [
          "Kısa süreli görevlendirilen çalışanların İş Sağlığı ve Güvenliği İdaresi’ne bildirilmesi gerektiği; posting.is üzerinden ayrıntı bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "AMS, faaliyet ödeneği ve ICF",
    lead: "1 Eylül 2025’ten itibaren değerlendirme WHO ICF çerçevesine dayanır.",
    accordions: [
      {
        title: "İş müdürlüğü destekleri",
        paragraphs: [
          "Vinnumálastofnun’un engelli ve azalmış iş gücüne sahip iş arayanlara özel danışmanlık ve “Atvinna með stuðningi” destekli istihdam hizmeti verdiği yazılır.",
          "İşverene sabit oranda maaş ve yan gider telafisi sağlayan sözleşmelerin yönetildiği; 1 Eylül 2025’ten itibaren kısmi engelli iş arayanlar için Faaliyet Ödeneği’nin ajans tarafından yürütüleceği belirtilir.",
        ],
      },
      {
        title: "Tryggingastofnun ve işveren sübvansiyonu",
        paragraphs: [
          "Resmî engellilik değerlendirmesinin Tryggingastofnun (TR) tarafından yapıldığı; tıbbi belge ve işlev kapasitesi incelemesi gerektiği yazılır.",
          "İş gücü yeteneği %0–25 ve %26–50 aralıklarına göre tam ve kısmi maluliyet aylığı haklarının tanımlandığı belirtilir.",
          "İşverenlerin engelli istihdamında ilk iki yıla kadar maaşın %75’ine varan geri ödeme alabildiği ve sonraki yıllarda oranın kademeli düştüğü ifade edilir.",
        ],
      },
    ],
  },
];
