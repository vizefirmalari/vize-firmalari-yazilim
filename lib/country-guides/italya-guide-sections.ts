import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Italy” (İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const ITALYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “İtalya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama motorları için düzenlenmiş bir özetidir. Schengen kısa süreli seyahat kuralları ile İtalya’da çalışma, staj veya çıraklık için gerekli ulusal izin ve oturum süreçleri ayrı hukuki çerçevelere dayanır; üçüncü ülke vatandaşları için İçişleri Bakanlığı, polis (Questura) ve dış temsilciliklerin güncel metinleri esas alınmalıdır.",
  "Metinde geçen tutarlar (örneğin staj yardımı tabanı, kira ortalamaları, vergi dilimleri) kaynak sayfadaki döneme bağlıdır; bölgesel farklar ve yasal güncellemeler nedeniyle rakamlar değişebilir. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const ITALYA_SEO_KEYWORD_TAGS: string[] = [
  "italya vize",
  "italya schengen",
  "italya çalışma",
  "spid italya",
  "cliclavoro",
  "cpi italya iş bulma",
  "eures italya",
  "italya oturum",
  "questura permesso",
];

export const ITALYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Kamu istihdamı, clicLavoro ve doğrudan başvuru",
    lead: "SPID, CPI (Centro per l’impiego), EURES ve şirket veri tabanları.",
    accordions: [
      {
        title: "Kamu hizmeti ve dijital kimlik (SPID)",
        paragraphs: [
          "Kamu istihdam hizmetini kullanmak isteyenlerin dijital kimlik (SPID) oluşturması ve ikametine en yakın İstihdam Merkezi’nde (CPI) rehberlik, aktif iş arama, uzman rehberlik ve engelli işe yerleştirme gibi kamu hizmetlerinden yararlanma iradesini beyan etmesi gerektiği anlatılır.",
          "Çalışma Bakanlığı’nın clicLavoro.gov.it portalında tüm İtalya için iş ilanlarının yayımlandığı; iş dünyası ve kariyer haberlerinin de bulunduğu; başvuru için özgeçmiş yüklenmesi gerektiği belirtilir.",
        ],
        bullets: [
          "Her CPI’de faaliyet gösteren EURES servisinin, Avrupa Ekonomik Alanı’ndaki boş pozisyonlar ve diğer ülkelerde yaşam–çalışma koşulları hakkında bilgi verdiği yazılır.",
          "Avrupa Birliği vatandaşlarının, İtalyan vatandaşlarına ayrılmış faaliyetler dışında, çalışan veya serbest meslek statüsünde iş izni almadan işe girebildiği ve eşit muamele ilkesinden yararlandığı ifade edilir.",
        ],
      },
      {
        title: "Doğrudan şirket başvurusu ve diğer kanallar",
        paragraphs: [
          "Kendi başına iş arayanlar için en iyi yöntemin şirket web sitesi üzerinden özgeçmiş göndererek doğrudan iletişim kurmak olduğu; hem ilk işini arayanlar hem de iş değiştirenler için geçerli olduğu belirtilir.",
          "Orta ve büyük ölçekli şirketlerin önce çevrimiçi başvuranların özgeçmişlerini tuttuğu veri tabanlarına baktığı; İK yöneticilerinin hem yurt içi hem yurt dışı ilanlar için uygun profilleri bu havuzdan seçtiği anlatılır.",
          "Pagine Gialle, Guida Monaci, Kompass, ticaret odası siteleri ve özellikle LinkedIn gibi araçların hedef şirket bulmak için kullanılabildiği; bölgesel ve ulusal gazete ve dergilerin de ilan kaynağı olduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "Özgeçmiş, ön yazı ve kişisel veri onayı",
    lead: "İlanlı ve spekülatif başvuru; Europass ve 196/2003 sayılı kişisel veri düzenlemesi.",
    accordions: [
      {
        title: "Başvuru biçimi",
        paragraphs: [
          "Belirli bir ilana başvuruda sürecin genelde ilan metninde tarif edildiği; spekülatif başvuruda ise şirket sitelerindeki “bizimle çalışın” bölümündeki çevrimiçi talimatlara uyulması gerektiği belirtilir.",
          "Güncel ve ilana uyarlanmış bir CV ile e-posta veya faks yoluyla gönderilecek motivasyon / ön yazının başvuruyu kişiselleştirmesi ve adayın güçlü yönleri ile hedeflerini anlatması beklendiği yazılır.",
        ],
      },
      {
        title: "CV, fotoğraf ve veri işleme",
        paragraphs: [
          "İnternette sayısız CV hazırlama sitesi bulunduğu; ek hizmet ve iş ilanı veri tabanı için Europass (europa.eu/europass/it) kaydının kullanılabileceği ifade edilir.",
          "Şirketlere sunulan CV’lerde 2003 tarihli 196 sayılı Yasal Kararname uyarınca kişisel verilerin işlenmesine ilişkin açık rızanın bulunması gerektiği; aksi talep edilmedikçe fotoğraf, asıl diploma veya referans belgesi eklemenin gerekmediği belirtilir.",
          "İstihdam merkezlerinin CV ve ön yazı konusunda danışmanlık verdiği; clicLavoro’da yararlı bilgiler bulunduğu; bazı yerel işletmelerde İK veya personel müdürüne şahsen CV bırakmanın iyi sonuç verebileceği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar (tirocinio)",
    h2: "Müfredat içi ve dışı staj; Mayıs 2017 ulusal çerçeve",
    lead: "Bölgesel yetki, üç taraf, mentor ve asgari yardım eşiği.",
    accordions: [
      {
        title: "Tanım ve taraflar",
        paragraphs: [
          "İtalya’da yasal olarak birden fazla staj tipi tanımlandığı; “müfredat içi” stajların resmî eğitim programının parçası olduğu; “müfredat dışı” stajların ise mesleki beceri, iş bulunabilirlik ve CV zenginleştirmesi için aktif politika ölçütü olarak düzenlendiği belirtilir.",
          "Stajyerin iş sözleşmesi imzalamadığı ve çalışan sayılmadığı; müfredat dışı stajlarda bölgeler ve özerk illerin yetkili olduğu; devlet–bölge anlaşmasıyla Mayıs 2017’de kabul edilen ulusal yönergelerin ortak ilkeleri bölgesel mevzuata taşıdığı yazılır.",
          "Stajın en az üç tarafı olduğu anlatılır: “staj sponsoru” (istihdam servisleri, üniversiteler, okullar, akredite eğitim kurumları, işe yerleştirme acenteleri vb.), “ev sahibi kuruluş” ve stajyer. Müfredat dışı stajın sponsor ile ev sahibi arasında “iş birliği anlaşması” ile başlatıldığı belirtilir.",
        ],
        bullets: [
          "Stajyerin iş kazalarına karşı sigortalanması zorunludur.",
          "Müfredat dışı stajın başlamasından en az 24 saat önce zorunlu elektronik bildirimin (denetim mercileri ve Çalışma Bakanlığı, INPS vb.) gönderilmesi gerektiği yazılır.",
          "Hem sponsor hem ev sahibi kuruluşun stajyer için bir “mentor” ataması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Başlıca müfredat dışı kategoriler ve yaşam koşulları",
        paragraphs: [
          "Diploma / belge sahiplerine yönelik rehberlik stajı: diplomadan sonra 12 ay içinde; en fazla altı ay.",
          "İşgücüne giriş veya yeniden giriş stajı: işsizler ve işgücü dışındakiler için; en fazla 12 ay.",
          "Belirli hedef gruplara (dezavantajlı gruplar, engelli kişiler, sığınmacılar vb.) yönelik rehberlik veya işe giriş stajı: 12–24 aya kadar.",
          "“Buona Scuola” ile lise öğrencilerine şirket stajının zorunlu hale getirildiği; 2025 Bütçe Kanunu ile ortaokul bitirme sınavına oturabilmek için PCTO (çapraz beceri yolları) biçiminde zorunlu tutulduğu kaynakta belirtilir.",
        ],
        bullets: [
          "Ulusal kalite çerçevesinin AB Staj Kalite Çerçevesi ile uyumlu olduğu; müfredat dışı stajlarda bölgesel mevzuata rağmen ulusal yönergede asgari aylık yardım eşiğinin 300 EUR olarak tanımlandığı yazılır.",
          "Kaza ve sağlık sigortası; bireysel eğitim planında haftalık çalışma süresi ile tarafların hak ve yükümlülükleri; sağlık ve doğum izni nedeniyle askıya alma gibi düzenlemelerden bahsedilir.",
        ],
      },
      {
        title: "Uygunluk ve fırsatlar",
        paragraphs: [
          "Genel kural olarak stajların tüm AEA vatandaşlarına açık olduğu; ancak bölgesel düzenlemeler, eğitim yolları veya işsizlik gibi özel statülere bağlı ek şartlar bulunabileceği belirtilir.",
          "Yaş, işsizlik durumu ve alan gibi koşulların staj tipine ve bölgeye göre değiştiği; müfredat içi stajlarda çoğunlukla üniversite veya meslek kursuna kayıtlı olma şartı olduğu ifade edilir.",
          "Fırsatların bölgesel siteler ve bölgesel istihdam bilgi sistemlerinde duyurulduğu; ulusal düzeyde Çalışma ve Sosyal Politikalar Bakanlığı ile clicLavoro’nun staj sayfalarına başvurulması önerilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik",
    tocLabel: "Çıraklık (apprendistato)",
    h2: "15 Haziran 2015 tarihli 81 sayılı Yasal Kararname",
    lead: "Üç seviye çıraklık, mevsimlik tür, mentorlar ve süre–ücret özeti.",
    accordions: [
      {
        title: "Hukuki çerçeve ve türler",
        paragraphs: [
          "Çıraklık sözleşmesinin gençlerin mesleki eğitimi ve istihdamını destekleyen süresiz bir iş sözleşmesi olduğu; işverenin ücret ödemenin yanı sıra rol için gerekli mesleki eğitimi sağlamakla yükümlü olduğu; çırakın da eğitim programına katılmakla yükümlü olduğu belirtilir.",
          "Üç çıraklık düzeyi anlatılır: birinci düzey (meslek yeterliliği, lise diploması, yüksek teknik uzmanlık sertifikası); ikinci düzey (mesleki çıraklık — sözleşmeye özgü mesleki yeterlilik); üçüncü düzey (yükseköğretim, araştırma ve düzenlenmiş mesleklere giriş stajları dahil).",
          "Turizm ve tarım gibi mevsimsel sektörlerde “mevsimlik çıraklık” sözleşmesinin kullanıldığı; eğitimin kısaltılabildiği ve birden fazla sezon için yenilenebildiği; sektörel toplu iş sözleşmelerinin kullanımı düzenlediği yazılır.",
        ],
      },
      {
        title: "Eğitim, ücret ve süre",
        paragraphs: [
          "Çıraklıkta eğitimin okul / eğitim merkezi / üniversitede (dış eğitim) ile şirkette (iş içi eğitim) bölündüğü; birinci ve üçüncü düzeyde çift mentor (kurum ve şirket) sisteminin işlediği anlatılır.",
          "Aynı görevleri yapan diğer işçilere göre çırak ücretinin daha düşük olabileceği; ulusal toplu iş sözleşmesindeki kategoriden en fazla iki kademe aşağı veya hizmet süresine göre yüzde ölçeğinin kullanılabileceği; ücretin parça başı veya prim esasına dayanamayacağı belirtilir.",
          "Kaynak metinde birinci düzey için yıllık ücret aralığının reşit olmayanlar için yaklaşık 2.000 EUR, yetişkinler için 3.000 EUR; ikinci düzey mesleki çıraklıkta yaklaşık görev ücretinin yüzde 60’ı ile yıllar içinde yüzde 100’e çıkış örnekleri verildiği yazılır.",
          "Çıraklık süresinin türe, sektör ve bölgesel mevzuata göre üç yıla (zanaatkarlıkta beş yıla) kadar uzayabildiği; asgari sürenin altı ay; sözleşmeli eğitim süresinin eğitim programının süresiyle sınırlı olduğu ifade edilir.",
        ],
        bullets: [
          "2022 bütçe düzenlemeleriyle belirli koşullarda işsizlik / mobilite yardımı alanların mesleki çıraklığa her yaşta alınabildiği; işveren teşvikleri (örneğin belirli dönemlerde katkı indirimleri) için ulusal mevzuata atıf yapıldığı kaynakta özetlenir.",
        ],
      },
      {
        title: "Adaylar ve işverenler için pratik",
        paragraphs: [
          "İstihdam sözleşmesi olduğu için çıraklığın AEA uyruklularına açık olduğu; ancak ortaöğretim ve yükseköğretim şemalarında özel erişim kuralları bulunabileceği belirtilir.",
          "Fırsatlar için clicLavoro ve bölgesel sitelerin yanı sıra Avrupa Sosyal Fonu ile finanse edilen bölgesel programların incelenmesi önerilir.",
        ],
      },
    ],
  },
  {
    id: "tasinma-ve-oturum",
    tocLabel: "Taşınma ve oturum",
    h2: "Mal ve sermaye serbestisi; konut, okul, araç ve kayıt",
    lead: "AB vatandaşı Anagrafe kaydı; üçüncü ülke Questura ve 8 iş günü.",
    accordions: [
      {
        title: "Konut ve okul",
        paragraphs: [
          "Gayrimenkul piyasasının bölgeye göre fiyat ve arz açısından güçlü farklılık gösterdiği; tarihi merkez ve turistik bölgelerde kiraların daha yüksek olduğu; 2025 ilk çeyrekte iki odalı daire için ortalama yaklaşık 850 EUR örneğinin verildiği; daha uygun seçeneklerin çevre semtlerde bulunabildiği belirtilir.",
          "Immobiliare.it gibi siteler, emlak acenteleri, üniversite panoları ve sosyal ağ gruplarının arama kanalı olduğu; serbest piyasada kiraların yüksek olabileceği; “canone concordato” (tavanlı kira) sözleşmelerinin hem kiracı hem mal sahibi için vergi avantajı sağlayabildiği yazılır.",
          "Uzun süreli kira sözleşmelerinin dört yılda bir yenilendiği ve Gelir İdaresi’ne RLI formu ile kaydın (2024 güncellemesi) yapılması gerektiği ifade edilir.",
          "Okul aramak için İtalya Eğitim ve Özerklik Bakanlığı’nın Scuola in Chiaro portalı; üniversite için UniversItaly; kreş için belediye ve PagineBianche / PagineGialle gibi kaynakların kullanılabileceği anlatılır.",
        ],
      },
      {
        title: "AB ve üçüncü ülke vatandaşları",
        paragraphs: [
          "AB vatandaşlarının üç ayı aşmadan özel yükümlülük olmadan kalabildiği; 90 günden uzun süreler için ikamet belediyesinde nüfus müdürlüğüne (Anagrafe) kayıt zorunluluğu bulunduğu belirtilir.",
          "Kayıt için geçerli kimlik, yeterli gelir kanıtı, kira sözleşmesi veya tapu sureti ve sağlık sigortası (sağlık kartı veya özel sigorta) gerektiği; kayıt sonrası ikamet belgesi verildiği yazılır.",
          "Üçüncü ülke uyrukluların İtalya’ya girişten sonra seyahat nedenine göre sekiz iş günü içinde oturma izni başvurusu yapması gerektiği; yetkili postanelerdeki “Sportello Amico” veya doğrudan Questura seçeneklerinden söz edilir.",
        ],
        bullets: [
          "Çalışma, serbest meslek, aile birleşimi, insani koruma gibi yaygın izin türleri; pasaport, gerekiyorsa giriş vizesi, damga vergisi ve harç gibi belgelerden bahsedilir.",
        ],
      },
      {
        title: "Varış öncesi ve sonrası kontrol listesi",
        paragraphs: [
          "Gidiş öncesi geçerli kimlik veya pasaport ile Avrupa Sağlık Sigortası Kartı; sosyal güvenlik aktarımı için kurumlarla görüşme; vergi dairesi ve yerel mercilere bildirim önerilir.",
          "Varışta çalışma veya sosyal yardım için ikamet kaydı, vergi kimlik numarası (Codice fiscale), bölgesel sağlık otoritesinde aile hekimi seçimi ve ulusal sağlık sistemine kayıt; banka hesabı için vergi numarası ve kimlik; operatörlerden telefon ve internet hatları anlatılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-hukuku-ozet",
    tocLabel: "Çalışma hukuku özeti",
    h2: "Sözleşme türleri, ücret, süre ve vergi",
    lead: "Süresiz ve süreli iş, arGe, serbest meslek ve “ara sıra hizmet” tavanları.",
    accordions: [
      {
        title: "İşe alım bildirimi ve sözleşme unsurları",
        paragraphs: [
          "Özel sektörde doğrudan istihdam sisteminin geçerli olduğu; işe alımdan en geç bir gün önce zorunlu elektronik bildirimin (CO) şirket merkezinin bulunduğu bölgedeki iş merkezine gönderilmesi gerektiğinin; bildirimin denetim, INPS ve INAIL mercileri tarafından da tanındığı belirtilir.",
          "Sözleşmenin yazılı olması; tarafların kimliği, işin yeri, ücret, deneme süresi, fesih bildirimi ve süre gibi temel unsurların yer alması gerektiği yazılır.",
        ],
      },
      {
        title: "Başlıca sözleşme türleri (özet)",
        paragraphs: [
          "Çalışma yaşı için genel kuralın en az 16 ve en az on yıl zorunlu eğitimi tamamlamış olmak olduğu; 15 yaşında mesleki yeterlilik çıraklığı istisnasından bahsedilir.",
          "Süresiz ve süreli tam zamanlı sözleşmeler; süreli sözleşmenin genelde 12 ayı aşmaması veya geçici ve nesnel ihtiyaçlarla 24 aya kadar uzayabilmesi; 31 Aralık 2025’e kadar bazı uzatma senaryolarının mevzuatta açıklandığı özetlenir.",
          "Çıraklık, tedarik şirketi (user) ile çalışma, ihtiyaç oldukça çağrı (400 gün / üç yıl sınırı; turizm ve eğlence istisnaları), serbest meslek sözleşmeleri ve mikro işletmeler ile kamu için sınırlı “ara sıra hizmet” (yıllık 5.000 EUR net ve kullanıcı başına 2.500 EUR, yılda en fazla 280 saat) gibi düzenlemelerden söz edilir.",
        ],
      },
      {
        title: "Ücret, bordro ve IRPEF (2025)",
        paragraphs: [
          "Anayasa’nın 36. maddesine göre ücretin işin niceliği ve niteliğiyle orantılı ve insanca yaşam için yeterli olması gerektiği; ancak tüm çalışanlara tek tip yasal asgari ücret garantisi bulunmadığı; pratikte ulusal toplu iş sözleşmelerinin (CCNL) taban ücret belirlemede referans olduğu belirtilir.",
          "Brüt ücretten işveren ve çalışan sosyal güvenlik paylarının düşülmesi; vergi matrahı ve net ödeme; aile yardımları gibi bazı kalemlerin ücret ve prim dışı bırakılabildiği özetlenir.",
          "2025’ten itibaren gelir vergisi (IRPEF) dilimlerinin 28.000 EUR’a kadar yüzde 23; 28.001–50.000 EUR arası yüzde 35; 50.000 EUR üzeri yüzde 43 olarak teyit edildiği; istihdam gelirine ilişkin indirimlerin artırıldığı ve vergi başlangıç eşiğinin 8.500 EUR’a çıkarıldığı yazılır.",
        ],
      },
      {
        title: "Çalışma süresi, uzaktan çalışma ve izinler",
        paragraphs: [
          "Haftalık çalışma süresinin genelde 40 saat olduğu; toplu iş sözleşmesiyle daha kısa sürelerin öngörülebildiği; referans haftanın esnek seçilebildiği; haftalık üst sınırın fazla mesai dahil 48 saat olduğu ve dört aylık referans döneminde dengeleme yapılabildiği belirtilir.",
          "Her yedi günde en az 24 saat kesintisiz dinlenme ve günlük en az 11 saat dinlenme; yılda en az dört haftalık ücretli yıllık izin ve bunun parasal karşılığıyla değiştirilememesi (istisna: iş ilişkisinin sonu) anlatılır.",
          "Fazla mesainin toplu iş sözleşmesiyle düzenlendiği ve haftalık sürenin yüzde 25’ini aşmaması gerektiği; fazla mesai ücretinin tam saatlik ücretin yüzde 15 fazlası olduğu yazılır.",
          "Gece çalışmasının bireysel sözleşmede ve toplu iş sözleşmesinde tanımlandığı; gece diliminin en az yedi saatlik kesintisiz süre içinde gece yarısı ile 05:00 arasını kapsaması gerektiği belirtilir.",
          "2017 tarihli 81 sayılı Kanunla uzaktan çalışmanın hedef ve aşama bazlı düzenlenebilen, gönüllü ve araç destekli bir iş örgütlenmesi olarak tanımlandığı; uzaktan çalışanların mesleki kaza ve hastalıkta eşit korunması ve 2017’den itibaren Çalışma Bakanlığı portalında bireysel anlaşmaların bildirilebildiği ifade edilir.",
          "Doğum izninin zorunlu beş aylık çerçevesi (doğumdan iki ay önce ve üç ay sonra); babalar için zorunlu on günlük babalık izni; 2025’ten itibaren ebeveynlerin çocuğun altıncı yaşına kadar üç ayı yüzde 80 ücretli alabildiği ve toplamda her iki ebeveyn arasında on aya kadar (şartlarla on bir ay) düzenlendiği kaynakta özetlenir.",
        ],
      },
    ],
  },
  {
    id: "is-sonu-ve-temsil",
    tocLabel: "İş sonu ve temsil",
    h2: "Haksız fesih, ihbar ve sendika",
    lead: "İtibarlı gerekçe, haklı fesih, tazminat aralıkları ve grev hakkı.",
    accordions: [
      {
        title: "Fesih ve yargı",
        paragraphs: [
          "Deneme süresi sonrası fesih nedenlerinin objektif veya öznel haklı gerekçe, haklı fesih, toplu işten çıkarma veya çalışanın haklı fesihi gibi başlıklarda sınıflandırıldığı belirtilir.",
          "İşverenin usule uygun bildirim yükümlülüğü; çalışanın 60 gün içinde itiraz ve 180 gün içinde iş mahkemesi veya uzlaşma başvurusu zorunluluğu anlatılır.",
          "Haksız veya usulsüz fesihte tazminat aralıkları (örneğin altı–36 ay veya iki–12 ay brüt ücret) ve ayrımcı fesihte işe iade gibi sonuçlardan bahsedilir.",
          "Taraflardan birinin ihbar süresine uymaması halinde karşı tarafa ihbar süresine denk tazminat ödeme yükümlülüğü yazılır.",
        ],
      },
      {
        title: "Sendikalar ve grev",
        paragraphs: [
          "CGIL, CISL ve UIL başta olmak üzere konfederasyonların ve sektörel sendikaların ulusal toplu iş sözleşmelerini imzaladığı; üyelik zorunlu olmadığı belirtilir.",
          "15’ten fazla çalışanı olan işyerlerinde birleşik işyeri sendika temsilciliği (RSU) seçiminden ve en az yüzde 5 oy alan örgütlerin dahil olabileceğinden bahsedilir.",
          "Anayasa’nın 40. maddesine dayanan grev hakkının yasalar çerçevesinde kullanıldığı; yasadışı (sendikasız) grevde işten çıkarmanın geçersiz sayılabileceği; grev saatleri için ücret kesintisi ve işverenin kilit (lockout) uygulamasının sendika haklarına aykırı olmaması şartıyla mümkün olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-maliyet",
    tocLabel: "Yaşam, sağlık ve maliyet",
    h2: "SSN, sağlık kartı ve yaşam giderleri",
    lead: "Tessera sanitaria, EHIC ve 2024 enflasyon örnekleri.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Yasal olarak İtalya’da ikamet eden İtalyan ve yabancı uyrukluların ulusal sağlık hizmetine (SSN) erişim hakkı bulunduğu; yetişkinler için aile hekimi, 14 yaşına kadar çocuklar için çocuk doktoru seçilebildiği belirtilir.",
          "Ücretsiz SSN kaydı sonrası verilen sağlık kartının (tessera sanitaria) reçete, laboratuvar ve uzman randevularında ibraz edildiği; kartın arka yüzünün Avrupa Sağlık Sigortası Kartı (EHIC) işlevi gördüğü yazılır.",
          "AB vatandaşlarının EHIC ile acil tedaviye erişebildiği ifade edilir.",
        ],
      },
      {
        title: "Yaşam maliyeti ve vergi (özet)",
        paragraphs: [
          "2024’te tüketici fiyatlarının ortalama yüzde 1,0 arttığı; çekirdek enflasyonun yüzde 2,0 olduğu; kira artış hızının yüksek kaldığı ve metrekare başına ortalama kira örneklerinin kuzeyde daha yüksek olduğu belirtilir.",
          "Han gelirinin yüzde 70’ten fazlasının günlük giderlere gittiği; ortalama hane gelirinin AB ortalamasının altında olduğu ifade edilir.",
          "KDV (IVA) standart oranının yüzde 22; gıda ve tarım ürünleri için yüzde 4, bazı gıdalarda yüzde 5 gibi indirimli oranlardan bahsedilir.",
        ],
      },
      {
        title: "Ulaşım ve dijital hizmetler",
        paragraphs: [
          "Şehir içi ve şehirler arası ulaşımda otomobil, motosiklet, otobüs, tren (Trenitalia, Italo ve bölgesel şirketler) ve uçak seçeneklerinden; yüksek hızlı hatların uzun mesafede rekabetçi olduğundan söz edilir.",
          "SPID’nin kamu ve bazı özel dijital hizmetlere tek kimlik bilgisiyle erişim sağladığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "68/1999 hedefli yerleştirme ve destekler",
    lead: "Birleşik tanım, makul uyarlama ve bölgesel hizmetler.",
    accordions: [
      {
        title: "Tanım ve işveren destekleri",
        paragraphs: [
          "İtalya’nın engelliliği BM Engelli Hakları Sözleşmesi ile uyumlu birleşik ulusal tanıma geçtiği; uzun süreli fiziksel, zihinsel, entelektüel, nörogelişimsel veya duyusal engelin, engellerle etkileşimde yaşam alanlarında eşit katılımı zorlaştırabileceği durumlarda engellilik sayıldığı belirtilir.",
          "68/1999 sayılı Kanun kapsamında hedefli işe yerleştirme, makul uyarlama, ücret sübvansiyonu ve kişiye özel projeler gibi işveren desteklerinden bahsedilir.",
        ],
      },
      {
        title: "Çalışan destekleri ve iletişim",
        paragraphs: [
          "Kamu istihdam merkezleri, belediye engelli büroları ve sivil toplum örgütlerinin başvuru noktası olduğu; ulaşım indirimleri ve erişilebilir şehir programları gibi günlük yaşam önlemlerine değinildiği yazılır.",
        ],
      },
    ],
  },
];
