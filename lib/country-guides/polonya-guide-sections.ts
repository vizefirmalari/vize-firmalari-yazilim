import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Poland” (16/12/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const POLONYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Polonya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. İş arama kanalları (ePraca, EURES, OHP), KRAZ kayıtlı ajanslar, başvuru belgeleri ve KVKK onayı, staj ve mezun stajı, genç işçi çıraklığı ve İş Fonu destekleri, konut türleri ve 2025 çeyrek verileri, ikamet kaydı ve PESEL, İş Kanunu (uzaktan çalışma, deneme süresi, süreli sözleşme sınırları), asgari ücret ve çalışma süresi, izinler ve fesih, sendika–grev, gelir vergisi (PIT), NFZ sağlık sistemi ve eğitim yapısı başlıkları kaynak metne dayanır.",
  "Metinde geçen tutarlar (asgari ücret, kira ortalamaları, m² fiyatları, konut yardımı gelir sınırları, PIT eşikleri vb.) yayımlandıkları döneme bağlıdır; güncel rakamları GUS (İstatistik Ofisi), Ministerstwo Rodziny i Polski, ZUS, NFZ ve belediye kararlarından doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const POLONYA_SEO_KEYWORD_TAGS: string[] = [
  "polonya vize",
  "polonya schengen",
  "ePraca Polonya",
  "KRAZ istihdam ajansı",
  "PESEL Polonya",
  "Polonya İş Kanunu",
  "NFZ sağlık sigortası",
  "Polonya asgari ücret 2025",
  "ZUS sosyal sigorta",
];

export const POLONYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "EURES, ePraca ve KRAZ",
    lead: "AB/EFTA vatandaşları için çalışma izni gerekmez; ilanlar kamu ve özel kanallarda yoğunlaşır.",
    accordions: [
      {
        title: "Haklar ve ana kanallar",
        paragraphs: [
          "Avrupa Birliği veya EFTA üye ülkesi vatandaşlarının Polonya’da Polonyalılarla aynı şartlarda çalışmak için ayrıca çalışma izni almak zorunda olmadığı yazılır.",
          "İş aramanın doğrudan işverenle temas, CV ve ön yazı ile seçilen işverenlere gönderim veya EURES ağı, bölge istihdam servislerinin ePraca (oferty.praca.gov.pl) ilanları, Ochotnicze Hufce Pracy (OHP) ve istihdam ajansları üzerinden yürütülebildiği belirtilir.",
          "Avrupa İş Gücü Hareketliliği Portalı’nda Polonya’daki kamu istihdam servisi ve OHP ilanlarının da yer aldığı ifade edilir.",
        ],
      },
      {
        title: "İstihdam ajansları ve KRAZ",
        paragraphs: [
          "Polonya’da yasal faaliyet için istihdam ajanslarının Krajowy Rejestr Agencji Zatrudnienia (KRAZ) kaydına girilmesi gerektiği; kayıtlı olmayanların işe yönlendirme veya geçici iş için ücret talep etmesinin yasaklandığı (yurtdışı işe sevk için gerçek masraflar dışında) yazılır.",
          "KRAZ’ta kayıtlı iş portalı ve ajansların stor.praca.gov.pl üzerinden sorgulanabildiği; yabancı girişimcilerin de benzer yükümlülüklere tabi olabildiği belirtilir.",
          "İşverenlerin ilanları basın, internet, kayıtlı ofis ve sosyal medya ile yayınladığı; ulusal ve yerel gazetelerde iş sütunlarının yaygın olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru",
    h2: "CV, ön yazı ve kişisel veri onayı",
    lead: "Beyaz A4; altında el yazısı ile KVKK/GDPR onay metni.",
    accordions: [
      {
        title: "CV içeriği",
        paragraphs: [
          "İlanlarda genelde ad–soyad, adres, telefon, e‑posta; mesleki deneyim, eğitim, nitelikler ve ek becerilerin istendiği yazılır.",
          "CV’nin mümkün olduğunca öz, bir veya en fazla iki A4 sayfa olması gerektiği belirtilir.",
        ],
      },
      {
        title: "Kişisel veri ve ön yazı",
        paragraphs: [
          "CV altında, kaynak metinde aynen verilen ifadeyle, 10 Mayıs 2018 Kişisel Verilerin Korunması Kanunu ve GDPR’a atıflı el ile imzalı işe alım süreci için kişisel veri işleme rızasının bulunması gerektiği yazılır.",
          "Ön yazının ilanı seçme gerekçesini açıkladığı; yaklaşık bir A4 ve el ile imzalı olabileceği belirtilir.",
          "Başvurunun ilanda belirtilen şekilde (şahsen, posta, elektronik, işverenin IT aracı) yapılması gerektiği ifade edilir.",
          "Örnek şablonların Kamu İstihdam Hizmetleri Platformu (psz.praca.gov.pl) ve Europass üzerinde bulunabileceği yazılır.",
        ],
      },
      {
        title: "Seçim ve mülakat",
        paragraphs: [
          "İşverenin önce belgelere göre ön eleme yaptığı; ardından mülakat ve gerektiğinde bilgi testi uygulayabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj-ve-ciraklik",
    tocLabel: "Staj ve çıraklık",
    h2: "İşsiz aktivasyonu, üniversite stajı, mezun stajı",
    lead: "Tek tanım yok; yasal çerçeve işsizlik, eğitim ve serbest piyasaya göre ayrılır.",
    accordions: [
      {
        title: "Staj türleri (özet)",
        paragraphs: [
          "Polonya’da mesleki staj ve profesyonel staj için tek tip tanım bulunmadığı; işsiz kayıtlı kişilerin mesleki aktivasyonu, meslek okulu öğrencileri (belirli aşamalar hariç), yükseköğretim zorunlu stajları, doktora okulları, düzenlenmiş meslekler için zorunlu staj, işverenin serbest piyasadaki stajları ve belirli öğrenci stajlarının ayrı ayrı düzenlendiği yazılır.",
          "Üniversite pratik profilinde lisans ve tezli yüksek lisans için en az altı ay; ikinci kademe için en az üç ay staj öngörülebildiği; tıp, eczacılık, mimarlık gibi standart istisnaların bulunduğu belirtilir.",
        ],
      },
      {
        title: "İşsize yönelik staj",
        paragraphs: [
          "Bölge valisi (starosta) adına ilçe istihdam servisinin işverenle anlaşma imzaladığı; staj programının yetkinliklere uygun olması ve sonunda işveren görüşü ile katılım belgesi verildiği yazılır.",
          "Bu tür stajda kişinin istihdam edilmiş sayılmadığı; bursun işsizlik ödeneğinin yüzde yüz yirmisi düzeyinde olabildiği ifade edilir.",
        ],
      },
      {
        title: "Mezun stajı (stypendium absolwenckie)",
        paragraphs: [
          "Sivil hukuk sözleşmesine dayandığı; ortaokul veya sekiz yıllık ilkokul bitirmiş ve başlangıçta otuz yaşını doldurmamış veya lise bitirmiş ve on sekiz yaşını doldurmamış kişiler için düzenlendiği yazılır.",
          "Sözleşmenin üç aydan uzun olamayacağı; aynı işverenle aynı süre kullanıldıktan sonra yenilenemeyeceği; günlük en fazla sekiz saat ve haftada ortalama kırk saat ile on bir saat günlük ve otuz beş saat haftalık kesintisiz dinlenme hakkının bulunduğu belirtilir.",
          "Ücretli olması zorunlu olmadığı; ücretli ise asgari ücretin iki katını aşamayacağı ve bu ödemeler için zorunlu prim yükümlülüğü bulunmadığı ifade edilir.",
        ],
      },
      {
        title: "Genç işçi çıraklığı",
        paragraphs: [
          "Çıraklık için iş sözleşmesinin meslekî ve işe özgü eğitimi kapsadığı; meslekî eğitimin otuz altı aya kadar uzayabildiği ve belirli koşullarda on iki aya kadar uzatılabildiği yazılır.",
          "Ücret oranlarının ulusal ekonomideki ortalama aylık ücretin belirli yüzdelerine (ör. birinci yıl en az yüzde sekiz) bağlandığı; işverenin ücret ve primlerinin OHP ile anlaşma halinde İş Fonu’ndan iade alınabildiği belirtilir.",
          "Eğitim maliyeti katkılarının (ör. otuz altı aylık meslekî eğitim için üst sınırlar ve endeksleme) belediye veya ilçe başvurularıyla yönetildiği kaynakta rakamlarla anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut",
    tocLabel: "Taşınma ve konut",
    h2: "AB içi özet, satın alma ve kira piyasası",
    lead: "AB/EFTA uyruklularına konutta ayrımcılık yok; noter tapu şartı.",
    accordions: [
      {
        title: "Mal ve sermaye",
        paragraphs: [
          "AB tek piyasasında malların serbest dolaşımı ve karşılıklı tanınma; sermayenin geniş ölçüde serbestçe hareket etmesi gibi genel ilkeler kaynakta özetlenir.",
        ],
      },
      {
        title: "Satın alma ve emlakçı",
        paragraphs: [
          "Birincil ve ikincil piyasada daire bulunabildiği; emlakçı komisyonunun çoğu zaman fiyatın yaklaşık yüzde iki–üçü olduğu; öncesinde acenta sözleşmesi ve mesleki sorumluluk sigortasının netleştirilmesi gerektiği yazılır.",
          "Yatırımın yasallığı, imar, tapu sicili ve KRS üzerinden yatırımcı güvenilirliği kontrollerinin önemli olduğu; her türlü gayrimenkul satışında noter senedi zorunluluğunun bulunduğu belirtilir.",
        ],
      },
      {
        title: "Kiralama türleri",
        paragraphs: [
          "Standart kira, ara sıra kira (on yıla kadar, noter taahhütlü tahliye) ve kurumsal kira (girişimci kiralayıcı, süre sınırlı, yazılı şekil şartı) arasında farklar anlatılır.",
          "Depozitonun genelde bir aylık kira; yasal üst sınırın on iki aya kadar kira tutarı olduğu; fatura dışı yakıt–elektrik–su giderlerinin çoğu zaman kiraya dahil olmadığı yazılır.",
        ],
      },
      {
        title: "Fiyat ve kira (kaynak rakamlar)",
        paragraphs: [
          "İlk çeyrek iki bin yirmi beşte birincil piyasanın bir önceki yıla göre yaklaşık yüzde dokuz buçuk; ikincil piyasanın yüzde sekiz buçuk arttığı belirtilir.",
          "Varşova, Kraków, Gdańsk, Wrocław gibi şehirlerde m² işlem fiyatlarının ülke ortalamasının üzerinde olduğu; Varşova ortalama aylık kira rakamının iki bin yirmi beş ilk çeyreğinde kaynakta verildiği ve şehirler arası farkın büyük olduğu ifade edilir.",
        ],
      },
      {
        title: "Konut yardımı eşikleri",
        paragraphs: [
          "Gelir testine bağlı konut yardımı için tek kişilik hanede son üç ay ortalamasının belirli PLN sınırını; çok kişili hanede kişi başı sınırı aşmaması gerektiği yazılır.",
          "Belediye meclisinin eşikleri artırabileceği; başvurunun sosyal hizmet veya belediyeye yapılabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "okul-kayit",
    tocLabel: "Okul ve kayıt",
    h2: "Bölgeleştirme, yabancı dil desteği, ücretler",
    lead: "Kamu okullarında eğitim ücretsiz; okul öncesi beş saat garantisi.",
    accordions: [
      {
        title: "Kamu eğitimi ve bölge okulu",
        paragraphs: [
          "İlkokulda bölgeleştirmenin geçerli olduğu; kayıt alanı bilgisinin okul veya belediye eğitim biriminden alınabildiği yazılır.",
          "Yabancı veya Polonyaca yetersiz öğrenciye haftada en az iki saat ek ücretsiz Polonyaca ve telafi etkinlikleri ile ana dilde yardımcı personel hakkının bulunduğu belirtilir.",
        ],
      },
      {
        title: "Okul öncesi ve ücretler",
        paragraphs: [
          "Kamu anaokulunda belediye tarafından belirlenen sürede (günde en az beş saat) ücretsiz eğitim ve bakım garantisi bulunduğu; üç–beş yaş arası fazla süre ve yemek için ücret alınabildiği; fazla saat ücretinin belediye kararıyla üst sınırının yasada belirlendiği ifade edilir.",
          "On sekiz yaşına kadar kamu okullarında eğitimin ücretsiz olduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "ikamet-pesel",
    tocLabel: "İkamet ve PESEL",
    h2: "Üç ay; otuzuncu güne kadar kayıt ve voyvoda",
    lead: "İş arayan için ek süre ve aile kartı kuralları.",
    accordions: [
      {
        title: "Giriş ve üç aya kadar kalış",
        paragraphs: [
          "AB/EFTA uyruklularının geçerli seyahat veya kimlik belgesiyle sınırdan giriş yapabildiği; üç aya kadar ikamet kaydı şartı olmadan kalınabildiği yazılır.",
        ],
      },
      {
        title: "Üç aydan fazla",
        paragraphs: [
          "Çalışan, yeterli geçim kaynağı ve sigortası olan, öğrenci, Polonyalı eş veya iş arayan (varıştan en geç üç ay on dört gün içinde istihdam servisine kayıt ve aktif arama) gibi hallerin sayıldığı belirtilir.",
          "Üç aydan uzun kalışta ikamet kaydının yapılması zorunluluğu; AB vatandaşı olmayan aile üyesi için oturma kartı gerekebildiği ifade edilir.",
          "Kaydın ikamet edilen taşınmazın bağlı olduğu belediyede yazılı başvuru ile yapıldığı; geçerli kimlik, aile üyesi için AB aile kartı veya eşdeğeri, kalış kanıtı ve taşınmaza ilişkin belgelerin sunulduğu; kayıt ücretsiz olduğu ve bu süreçte PESEL verildiği yazılır.",
        ],
      },
      {
        title: "Kalıcı ikamet ve pratik adımlar",
        paragraphs: [
          "Beş yıl kesintisiz yasal kalış sonrası kalıcı ikamet hakkının doğabildiği; yılda toplam altı aydan fazla ayrılmama ve istisnai haller için on iki aya kadar uzama kurallarının bulunduğu belirtilir.",
          "Varış sonrası banka hesabı, vergi dairesinden NIP, aile hekimi seçimi ve çocuklar için kreş/okul planlaması kaynak kontrol listesinde sayılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-sozlesme-uzaktan",
    tocLabel: "İstihdam ve uzaktan çalışma",
    h2: "İş sözleşmesi, vekalet, geçici iş",
    lead: "Uzaktan çalışma anlaşması veya talimat; özel durumlarda bağlayıcı talep.",
    accordions: [
      {
        title: "İstihdam biçimleri",
        paragraphs: [
          "Temel unsurun iş sözleşmesi olduğu; vekalet sözleşmesi ve belirli iş sözleşmesi gibi sivil hukuk sözleşmelerinin İş Kanunu dışında kalabildiği yazılır.",
          "Geçici işçilik ajansı modelinde kullanıcı işveren nezdinde geçici işin tanımlandığı; uzaktan çalışmanın işyeri veya ev adresinde mesafe iletişimiyle yapılan iş olarak tanımlandığı belirtilir.",
        ],
      },
      {
        title: "Uzaktan çalışma kuralları (özet)",
        paragraphs: [
          "İşe girişte veya çalışma sırasında anlaşma ile uzaktan çalışmanın belirlenebildiği; acil durum, salgın veya işyerinin geçici olarak kullanılamaması gibi hallerde işverenin talimatla uzaktan çalıştırabildiği ve bunu en az iki gün önceden geri çekebildiği yazılır.",
          "İşçinin güvenli istasyon beyanı, araç gereç ve bağlantı masrafları, eğitim ve işyerine dönüş talebi ile hamile, küçük çocuklu veya bakım yükü olan çalışanlara yönelik bağlayıcı talep hakkının özetlendiği belirtilir.",
          "Yılda yirmi dört gün “ara sıra uzaktan çalışma” imkânının işçi talebine bağlı olduğu ifade edilir.",
        ],
      },
      {
        title: "Deneme ve süreli sözleşme",
        paragraphs: [
          "On sekiz yaş altı genel kuralda istihdam yasağı ve istisnaların bulunduğu; deneme süresinin amaç ve süreye göre bir–iki ay ve tür gereği bir kez bir aya kadar uzatılabildiği yazılır.",
          "Aynı taraflar arasında süreli sözleşmelerin toplam süresinin otuz üç ayı ve sayısının üçü aşması halinde süresiz sayılacağı; değiştirme veya fesih bildiriminin yazılı olması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-asgari-calisma",
    tocLabel: "Ücret ve çalışma süresi",
    h2: "Asgari ücret, ZUS ve fazla mesai",
    lead: "Ücret sistemi toplu sözleşme, yönetmelik veya bireysel sözleşme.",
    accordions: [
      {
        title: "Asgari ücret ve saatlik taban",
        paragraphs: [
          "Sosyal Diyalog Konseyi çerçevesinde yıllık belirlendiği; bir Ocak iki bin yirmi beş itibarıyla brüt asgari ücretin kaynakta verilen PLN tutarına yaklaşan rakamda olduğu; iki bin yirmi altı için taslak düzenlemede daha yüksek brüt tutar öngörülebildiği yazılır.",
          "Kısmi sürede oransal düşüş ve belirli unsurların asgariye dahil–hariç ayrımının bulunduğu belirtilir.",
          "Belirli vekalet ve hizmet sözleşmelerinde saatlik asgari ücret tabanının (ör. iki bin yirmi beş için kaynakta verilen PLN değeri) uygulandığı; bağımsız çalışan vekillerde saatlik tabanın işlemediği ifade edilir.",
        ],
      },
      {
        title: "ZUS ve bordro",
        paragraphs: [
          "İstihdam ilişkisinde emeklilik, malullük, hastalık ve iş kazası primlerinin işveren ve çalışan paylarıyla hesaplandığı; işverenin ayrıca İş Fonu ve Garanti İşçi Hakları Fonu yükümlülükleri taşıyabildiği yazılır.",
          "Sağlık sigortası priminin yüzde dokuz olduğu ve gelir vergisi avansının kesildiği belirtilir.",
        ],
      },
      {
        title: "Çalışma süresi ve fazla mesai",
        paragraphs: [
          "Günde sekiz saat ve beş günlük haftada ortalama kırk saat üst sınırının, uzlaşma dönemiyle birlikte düzenlendiği yazılır.",
          "İşverenin özel ihtiyaçlarla yılda çalışan başına yüz elli saati aşmaması gereken fazla mesai öngörebildiği; Pazar ve resmî tatillerde ticaret kısıtlamalarının sektörel istisnaları bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "izin-fesih-sendika",
    tocLabel: "İzin, fesih ve toplu iş hukuku",
    h2: "Yıllık izin, ebeveyn izinleri, ihbar ve grev",
    lead: "Doğum izni süreleri çocuk sayısına göre uzar.",
    accordions: [
      {
        title: "Yıllık ve diğer izinler",
        paragraphs: [
          "On yıldan az çalışanda yirmi, en az on yılda yirmi altı iş günü yıllık izin hakkı bulunduğu; ebeveyn izinleri, babalık izni, bakıcı izni ve güç majör nedeniyle ücretli olmayan kısa izinlerin kaynakta listelendiği yazılır.",
        ],
      },
      {
        title: "Fesih ve ihbar",
        paragraphs: [
          "Karşılıklı anlaşma, ihbarlı veya ihbarsız fesih ile süre sonu sona erme yollarının bulunduğu; ihbar sürelerinin hizmet süresine ve deneme sözleşmesinin uzunluğuna bağlandığı belirtilir.",
          "Gebelik ve doğum izni gibi dönemlerde işverenin feshinin kısıtlandığı ifade edilir.",
        ],
      },
      {
        title: "Sendika ve grev",
        paragraphs: [
          "Sendika kurma ve üye olma özgürlüğünün geniş olduğu; üyelik veya sendika faaliyeti nedeniyle ayrımcılığın yasak olduğu yazılır.",
          "İki bin yirmi ikide sendika üyesi sayısının yaklaşık bir buçuk milyon olduğu; iş uyuşmazlığında müzakere, arabuluculuk, isteğe bağlı hakemlik ve grev aşamalarının bulunduğu; grev süresinde ücret ödenmediği; lokavtın yasada öngörülmediği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "serbest-meslek",
    tocLabel: "Serbest meslek ve şirket",
    h2: "CEIDG, KRS ve temsilci",
    lead: "AB uyrukluları Polonyalılarla aynı şartlarda faaliyet açabilir.",
    accordions: [
      {
        title: "Kayıt ve formlar",
        paragraphs: [
          "Doğal kişinin CEIDG’ye elektronik veya belediye aracılığıyla başvurabildiği; başvurunun REGON, NIP ve vergilendirme seçimini içerdiği yazılır.",
          "Şirket türleri (ör. sp. z o.o., SA, PSA) ve asgari sermaye gerekliliklerinin kaynakta özetlendiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-pit",
    tocLabel: "Gelir vergisi (PIT)",
    h2: "Kademeli tarife ve maliyet indirimleri",
    lead: "İstihdam gelirinde yıllık ve aylık temel gider kalemleri.",
    accordions: [
      {
        title: "Tarife ve beyan",
        paragraphs: [
          "Genel kuralda iki kademeli oran ve tek eşik üzerinden vergi indiriminin uygulandığı yazılır.",
          "İstihdam gelirinde yıllık ve aylık temel gider tutarlarının kaynakta PLN olarak verildiği; beyanın Şubat–Nisan aralığında yapılabildiği belirtilir.",
          "Eşlerin birlikte vergilendirilmesi ve tek ebeveyn indirimi seçeneklerinin bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Diğer rejimler (özet)",
        paragraphs: [
          "Serbest meslekte düz yüzde on dokuz, kayıtlı gelir üzerinden lump-sum, kira gelirinde oranlı lump-sum ve sermaye gelirlerinde ayrı beyan formlarından kısaca bahsedilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-nfz",
    tocLabel: "Sağlık (NFZ)",
    h2: "Zorunlu sigorta, eWUŚ ve IKP",
    lead: "Anlaşmalı kurumlar NFZ logosu ile işaretlenir.",
    accordions: [
      {
        title: "Kimler yararlanır",
        paragraphs: [
          "Çalışan, vekalet ve belirli sivil sözleşmelerle çalışanlar, işletenler, öğrenci ve işsizler gibi grupların zorunlu sağlık sigortası kapsamında olduğu yazılır.",
          "Geçici kalışta EHIC ile gerekli tedavilerin eşit şartlarla sağlandığı; başka ülkede sigortalı olup Polonya’da ikamet edenlerin S1 belgesiyle bölge NFZ’den hak doğrulaması yapabildiği belirtilir.",
        ],
      },
      {
        title: "Hizmet erişimi",
        paragraphs: [
          "NFZ ile anlaşmalı sağlayıcılarda eWUŚ ile anlık hak kontrolü yapılabildiği; aile hekimi seçimi ve çoğu uzman için sevk gerektiği yazılır.",
          "E‑reçete, e‑sevk ve İnternet Hastası Hesabı (IKP) ile dijital hizmetlerin yaygınlaştığı; acil çağrı numarasının 112 olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "egitim-yuksekogretim",
    tocLabel: "Eğitim ve yükseköğretim",
    h2: "Matura, POL-on ve AB öğrencisi ücreti",
    lead: "Kamu üniversitesinde tam zamanlı Lehçe programında AB/EFTA için öğrenim ücreti alınmaz.",
    accordions: [
      {
        title: "Matura ve yabancı aday",
        paragraphs: [
          "Zorunlu dersler ve ek yazılı sınavın yanı sıra mesleki diploma sahiplerine ek sınav muafiyetlerinin bulunduğu; iki bin yirmi üç formülü ve önceki formüllerin geçiş takviminin kaynakta ayrıntılandığı yazılır.",
          "Lehçe yetersizliğinde sınavların uyarlanabileceği belirtilir.",
        ],
      },
      {
        title: "Üniversite ve doktora",
        paragraphs: [
          "AB ve EFTA uyruklularının ve aile üyelerinin kamu üniversitesinde tam zamanlı Lehçe öğretiminde öğrenim ücreti ödemediği; yabancı dilde programlarda ücret alınabildiği yazılır.",
          "Doktora okullarında burs istisnaları ve NAWA ile burs olanaklarından kısaca bahsedilir.",
        ],
      },
    ],
  },
  {
    id: "devlet-kultur-ulasim",
    tocLabel: "Devlet, kültür ve ulaşım",
    h2: "Sejm–Senato, yerel yönetim ve şehir içi ulaşım",
    lead: "Şehirler arası bilet ve PKP Intercity.",
    accordions: [
      {
        title: "Siyasi yapı",
        paragraphs: [
          "Parlamenter cumhuriyet, çift meclisli parlament, dört yıllık seçimler ve yüzde beş / yüzde sekiz seçim eşiklerinin anıldığı yazılır.",
          "On altı voyvodalık ve belediye–ilçe yerel yönetim katmanlarının iş ve konut politikalarına etkisi belirtilir.",
        ],
      },
      {
        title: "Ulaşım ve kültür",
        paragraphs: [
          "Otobüs, tramvay, Varşova metrosu ve şehir bisikleti sistemlerinin şehre göre değiştiği; biletlerin şehirler arası geçerli olmadığı yazılır.",
          "Demiryolunda EIP/EIC, IC/TLK ve bölgesel tren ayrımı ile erken satın alma indirimlerinden bahsedilir.",
          "UNESCO alanları ve müze ağının turizm ve yaşam kalitesi için önemli olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "PFRON, sübvansiyon ve süre kısaltması",
    lead: "Orta ve ağır engelde günlük yedi saat / haftada otuz beş saat.",
    accordions: [
      {
        title: "Tanı ve haklar",
        paragraphs: [
          "Engelliliğin yerel veya voyvodalık değerlendirme kurullarınca derecelendirildiği; kart veya sertifikanın desteklere kapı araladığı yazılır.",
          "İş Kanunu’nda orta veya ağır engelli için günlük yedi saat ve haftada otuz beş saat üst sınırı ile gece ve fazla mesai yasağının istisnaları bulunduğu; ücretin sabit aylıkta düşürülmemesi gerektiği belirtilir.",
        ],
      },
      {
        title: "İşveren destekleri",
        paragraphs: [
          "İş istasyonu uyarlama, kişisel yardım, eğitim giderleri ve aylık ücret sübvansiyonlarının PFRON ve starosta süreçleriyle yönetilebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "mesleki-nitelik-ab",
    tocLabel: "Meslekî nitelikler ve AB",
    h2: "EQF, Europass ve düzenlenmiş meslekler",
    lead: "Üye ülkeler meslekleri farklı düzenler.",
    accordions: [
      {
        title: "Şeffaflık araçları",
        paragraphs: [
          "Düzenlenmiş meslekler için AB veri tabanı ve uyarlama süresi ihtimalinin bulunduğu; Europass ve NARIC ağının tanındığı yazılır.",
        ],
      },
      {
        title: "Erasmus+ ve meslekî eğitim",
        paragraphs: [
          "AB’nin meslekî eğitim kalitesi ve CoVE merkezleri politikalarının kaynakta özetlendiği ifade edilir.",
        ],
      },
    ],
  },
];
