import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Austria” (05/03/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const AVUSTURYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Avusturya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Avusturya Kamu İstihdam Servisi (AMS, Arbeitsmarktservice) ile “alle jobs” ve eJob-Room arama motorları; Almanca başvuru ve çevrimiçi formlar; zorunlu ve gönüllü staj ile mevsimlik iş ve 2025 için geringfügig (marjinal) eşik 551,10 EUR; meslekî çıraklık (Lehre) ve yabancıların mesleğe girişinde AuslBG; kira ve Mietrechtsgesetz çerçevesi ile 2024 sonu itibarıyla ortalama kira + işletme gideri yaklaşık 9,9 EUR/m²; üç gün içinde Meldezettel ve AB/İsviçre için dört ayda ikamet belgesi (Anmeldebescheinigung); iş sözleşmesi türleri, kolektif sözleşme ve 14 maaş ödemesi, çalışma süresi ve 2025’te yürürlüğe giren tele çalışma yasası; vergi ve 2025 sosyal sigorta oranları; e-card sağlık sistemi; eğitimde dokuz yıllık zorunlu okul ve on sekiz yaşına kadar eğitim veya meslekî yükümlülük; otoyol vinyeti ve KlimaTicket; engelli tanıma (GdB), BEinstG ve 28 Haziran 2025’te yürürlüğe giren erişilebilirlik yasası (BaFG) başlıklarında kamu bilgisine dayanır.",
  "Ücretler, vergi tarifeleri ve idari süreçler güncellenebilir; doğrulama için ams.at, arbeiterkammer.at, oesterreich.gv.at, sozialversicherung.at ve bmf.gv.at kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const AVUSTURYA_SEO_KEYWORD_TAGS: string[] = [
  "avusturya vize",
  "avusturya schengen",
  "AMS Arbeitsmarktservice",
  "alle jobs Austria",
  "eJob-Room",
  "Anmeldebescheinigung Austria",
  "Mietrechtsgesetz Austria",
  "Geringfügigkeit 2025 Austria",
  "Lehre apprenticeship Austria",
];

export const AVUSTURYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-ams",
    tocLabel: "İş bulma",
    h2: "AMS, alle jobs ve eJob-Room",
    lead: "Resmî istihdam servisi ve birleşik iş arama motoru merkezdedir; şirket siteleri, gazeteler ve özel ajanslar tamamlayıcıdır.",
    accordions: [
      {
        title: "İlan kanalları ve EURES",
        paragraphs: [
          "Boş pozisyonların AMS, şirket web siteleri, günlük gazeteler (basılı ve çevrimiçi), özel istihdam ve seçme yerleştirme şirketleri ile internet iş panolarında duyurulabildiği; tanıdık ağı ve komşuluk çevresinin de işe yönlendirmede rol oynadığı yazılır.",
          "EURES danışmanlarının AB/EEA ülkeleri ve İsviçre’deki istihdam servislerinde başka ülkede iş arayanlara yardım ettiği belirtilir.",
          "Yönetici kadrolarının çoğu zaman doğrudan veya seçme yerleştirme şirketi üzerinden diğer firmalardan çekildiği; çoğu durumda yine de şirketle doğrudan iletişim kurulması gerektiği ifade edilir.",
        ],
      },
      {
        title: "alle jobs ve eJob-Room",
        paragraphs: [
          "“alle jobs” arama motorunun AMS’e bildirilen ilanların yanı sıra eJob-Room, internetteki şirket ve kurum ilanları, federal ve eyalet kamu ilanları ile seçilmiş Federal İş Ajansı (Almanya) ilanlarını kapsadığı yazılır.",
          "eJob-Room’un AMS’in öz-servis iş panosu olduğu; AMS’e kayıtlı olmayanların da kullanabildiği ancak kayıtlı olmanın arama sonuçlarını kaydetme, kişisel posta kutusu ve “Job Alarm” gibi özellikler için önerildiği belirtilir.",
          "Avusturya’da ikamet adresi olmadan da eJob-Room’a kayıt olunabildiği; “alle jobs” uygulaması ve AMS Job App ile yakın çevre araması ve bildirimlerin mümkün olduğu ifade edilir.",
        ],
      },
      {
        title: "Spekülatif başvuru ve AMS kaynakları",
        paragraphs: [
          "İlan olmasa bile şirkete doğrudan başvurunun (spekülatif / talep dışı başvuru) yaygın olduğu yazılır.",
          "İlanları okuma, çevrimiçi başvuru ve mülakat için AMS ve Arbeiterkammer bağlantılarının referans olarak verildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-almanca",
    tocLabel: "Başvuru",
    h2: "Almanca evrak, Europass ve mülakat",
    lead: "İlan dili farklı istenmedikçe başvuruların Almanca olması beklenir; çevrimiçi formlar ve e-posta yaygındır.",
    accordions: [
      {
        title: "Başvuru paketi",
        paragraphs: [
          "Ön yazı, CV veya Europass CV, referans mektupları, diploma ve mesleki sertifikaların suretleri, kurs katılım belgeleri, beceri profilleri, mümkünse başvuru fotoğrafının tam pakete dahil edilebildiği yazılır.",
          "Şirketteki muhatap kişinin (ör. İK) doğru unvanla hitap edilmesi, ilana veya önceki telefon görüşmesine atıf ve güçlü yönlerin kısa vurgulanması önerilir.",
        ],
      },
      {
        title: "Video başvuru ve CV biçimi",
        paragraphs: [
          "Video başvurunun iyi hazırlandığında mülakat davetini artırabileceği; kapsam ve gönderim için AMS rehberine bakılması gerektiği belirtilir.",
          "CV’nin tercihen bir, en fazla iki A4 sayfasında; iş ve eğitim bölümlerinin kronolojik tutarlılıkla düzenlenmesi gerektiği yazılır.",
        ],
      },
      {
        title: "Mülakat",
        paragraphs: [
          "Telefon, e-posta veya yüz yüze randevuda CV, sertifikalar ve önceki iş belgelerinin yanınızda bulunması; bazı durumlarda çevrimiçi mülakatın da yapılabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "staj-marjinal",
    tocLabel: "Staj (Praktikum)",
    h2: "Zorunlu, gönüllü, mezuniyet sonrası ve sosyal sigorta",
    lead: "Sözleşmenin gerçekte staj mı yoksa iş ilişkisi mi olduğu içeriğe göre değerlendirilir; 2025 marjinal eşiği 551,10 EUR/ay olarak geçer.",
    accordions: [
      {
        title: "Zorunlu staj ve sözleşme türü",
        paragraphs: [
          "Okul veya üniversite müfredatı gereği yapılan zorunlu stajın yıl boyu da yapılabildiği; sözleşmenin çıraklık mı iş ilişkisi mi olduğunun adına değil içeriğe göre belirlendiği yazılır.",
          "Öğrenme amacı dışında geniş talimat ve şirket süreçlerine entegrasyon varsa bunun fiilen iş ilişkisi sayılabileceği ve kolektif sözleşmeye göre ücrete (13. ve 14. ay dahil) tabi olabileceği belirtilir.",
          "Otel ve restoranlarda ticari meslek yüksek okulları stajlarının çoğu iş ilişkisi çerçevesinde mümkün olduğu ve ücretin ilgili kolektif sözleşmedeki çıraklık yılı gelirine bağlandığı ifade edilir.",
        ],
      },
      {
        title: "Sigorta ve marjinal eşik (2025)",
        paragraphs: [
          "Ücretsiz zorunlu stajda kaza sigortasının öğrenci kaza sigortası kapsamında sağlandığı; ücretli zorunlu stajda ASVG kapsamında zorunlu sigorta ve işveren kaydının gerektiği yazılır.",
          "Ücret marjinal eşiği (2025: 551,10 EUR/ay) aştığında sağlık, kaza ve emeklilik sigortasının; altında yalnızca kaza sigortasının zorunlu olduğu belirtilir.",
          "Gönüllü stajın çoğunlukla çıraklık niteliğinde değerlendirildiği ve kişisel bağımlılık ile iş yapma yükümlülüğü olmaması gerektiği; gönüllüler için yalnızca kaza sigortasının zorunlu olduğu ifade edilir.",
          "Mevsimlik tatil işlerinin ve üniversite sonrası “staj” adı altındaki bazı düzenlemelerin fiilen iş sözleşmesi sayılabileceği ve kolektif sözleşme ile iş hukukuna tabi olduğu yazılır.",
        ],
      },
      {
        title: "AB/EEA stajcıları ve gençler",
        paragraphs: [
          "AB/EEA stajcılarının Yabancıların İstihdamı Yasası’na (AuslBG) tabi olmadığı; Avusturyalı stajcılarla aynı çerçevede değerlendirildikleri belirtilir.",
          "On sekiz yaşından önceki stajcılar için Kinder- und Jugendlichen-Beschäftigungsgesetz (KJBG) ile gece, parça başı ve tehlikeli işlerde kısıtlamalar olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-lehre",
    tocLabel: "Çıraklık (Lehre)",
    h2: "İkili meslek eğitimi ve yabancı erişimi",
    lead: "Yüzlerce çıraklık mesleği federal mevzuata bağlıdır; yazılı sözleşme ve meslek okulu zorunludur.",
    accordions: [
      {
        title: "Yasal çerçeve ve süre",
        paragraphs: [
          "Berufsausbildungsgesetz (BAG) ve meslek başına eğitim yönetmeliklerinin bağlayıcı olduğu; çıraklığın şirket ile meslek okulunda ikili (dual) yürüdüğü yazılır.",
          "Başlangıç için en az on beş yaş ve zorunlu okulun bitmiş olması gerektiği; birçok şirketin daha yaşlı çırak da kabul ettiği belirtilir.",
          "Çıraklık süresinin mesleğe göre iki ila dört yıl arasında değiştiği; yazılı çıraklık sözleşmesinin dört nüsha olarak imzalanması ve on sekiz yaş altı için veli imzasının zorunlu olduğu ifade edilir.",
        ],
      },
      {
        title: "AuslBG ve AB vatandaşları",
        paragraphs: [
          "Çıraklık mesleklerinin AuslBG kapsamında olduğu; serbest piyasaya erişimi olmayan üçüncü ülke vatandaşları için işverenin izin veya ikametten kaynaklanan yetkinin gerekli olduğu yazılır.",
          "AB/EEA ve İsviçre vatandaşlarının ek izin olmadan eğitime başlayabildiği belirtilir.",
        ],
      },
      {
        title: "Gelir ve haklar",
        paragraphs: [
          "Çıraklık gelirinin sektör kolektif sözleşmesine ve çıraklık yılına bağlı olduğu; sağlık, kaza, işsizlik ve emeklilik sigortası ile beş haftalık izin hakkının bulunduğu ifade edilir.",
          "Açık çıraklık yerlerinin şirket siteleri, eJob-Room ve lehrlingsportal.at üzerinden aranabileceği; WKO Lehrbetriebsübersicht ile eğitim veren işletmelerin listelenebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut-kisa",
    tocLabel: "Taşınma ve konut",
    h2: "Mal ve sermaye serbestisi, kira ve danışmanlık",
    lead: "AB içi mal ve sermaye dolaşımı özetlenir; kira piyasasında eyalet farkları ve hukuki danışmanlık vurgulanır.",
    accordions: [
      {
        title: "Konut arama ve ortalama maliyet",
        paragraphs: [
          "Gazeteler, emlakçılar (ör. herold.at), internet siteleri, belediyeler ve kooperatif konutların kaynak olabildiği yazılır.",
          "2024 sonu itibarıyla birincil kiralık konutlarda kira ve işletme giderleri dahil ortalamanın yaklaşık 9,9 EUR/m² olduğu; Burgenland ve Kärnten’in daha uygun, Salzburg’un daha pahalı uçlardan sayıldığı belirtilir.",
          "Net kiranın yaklaşık %25’i civarında işletme gideri (su, atık, temizlik, ısıtma payı vb.) ve ayrıca enerji faturalarının hesaba katılması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Kira hukuku ve emlakçı komisyonu",
        paragraphs: [
          "Mietrechtsgesetz kapsamındaki dairelerde süreli (çoğunlukla en az üç yıl) veya süresiz sözleşme yapılabildiği yazılır.",
          "Kira teklifinin (Mietangebot) kabul edilirse bağlayıcı olabileceği; “rezervasyon” adı altında gizli teklif riskine karşı dikkatli olunması gerektiği belirtilir.",
          "1 Temmuz 2023’ten itibaren kiralarda “sipariş ilkesi” (Bestellerprinzip) ile komisyonun çoğunlukla siparişi veren tarafça (genelde ev sahibi) ödendiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "meldeamt-eu",
    tocLabel: "Kayıt ve ikamet (AB)",
    h2: "Meldezettel ve Anmeldebescheinigung",
    lead: "Üç gün içinde ikamet bildirimi zorunludur; üç aydan uzun kalışta ekonomik yeterlilik ve sağlık sigortası ispatı gerekir.",
    accordions: [
      {
        title: "İkamet kaydı (Meldeamt)",
        paragraphs: [
          "Avusturya’ya taşınmadan sonra üç gün içinde ilgili Meldeservice’e başvurulması gerektiği; çocukların da kayıt altına alındığı yazılır.",
          "Başvurunun belediye veya şehirde Magistrat üzerinden yapılabildiği; Viyana’da ilçe ofislerinin yetkili olduğu belirtilir.",
          "Form, pasaport ve barındıran kişinin imzası ile kayıt onayı alınabildiği; oesterreich.gv.at üzerinden dijital Meldewesen seçeneğinin bulunduğu ifade edilir.",
        ],
      },
      {
        title: "AB/EEA ve İsviçre — üç ay ve dört ay",
        paragraphs: [
          "AB/EEA ve İsviçre vatandaşlarının vize ve ikamet izni olmadan girip yerleşebildiği; üç aya kadar geçerli kimlik veya pasaport yeterli olduğu yazılır.",
          "Daha uzun süre için kendini ve aile fertlerini geçindirme, istihdam veya eğitim ve sağlık sigortası ile güvenli geçim kaynağının kanıtlanması gerektiği; gelişten sonra dört ay içinde yetkili makama başvurularak Anmeldebescheinigung alınması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "varis-kontrol",
    tocLabel: "Varış kontrol listesi",
    h2: "Önce ve sonra — belgeler ve pratik adımlar",
    lead: "İş arayanlar için U1/U2, e-card ve okul belgeleri; varış sonrası banka, vergi ve AMS kaydı sıralanır.",
    accordions: [
      {
        title: "Gitmeden önce",
        paragraphs: [
          "AMS ülke portreleri ve EURES sayfalarından piyasa araştırması yapılması; pasaport, doğum/evlilik belgeleri, taşınabilir belgeler (U2 işsizlik aktarımı, U1 prim süreleri), Avrupa Sağlık Kartı veya eşdeğer koruma, araç evrakları, diploma ve iş belgelerinin Almanca veya İngilizce tercümesi, çocuk okul belgelerinin önerildiği yazılır.",
          "Menşe ülkede adres ve okul bildirimi, konaklama veya otel, ilk aylar için nakit planı, Avusturya’da sağlık ve kaza sigortası ve evcil hayvan pasaportu hatırlatılır.",
        ],
      },
      {
        title: "Varıştan sonra",
        paragraphs: [
          "Banka hesabı, araç tescili, vergi dairesi ve aile yardımları kaydı, doğalgaz-elektrik-telefon ve ORF katkı payı; en az bir dönem kalacak çocuklar için zorunlu okul kaydı yazılır.",
          "İşe başlandığında işverenin sosyal sigorta kaydı ve e-card gönderimi; marjinal ve yeni serbest meslek sahipleri için ayrı başvuru yolları belirtilir.",
          "İş arayanların AMS bölge ofisine U1/U2 sürelerine uygun kayıt yapmaları ve resmî kontrol listelerine bakmaları önerilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-tipleri",
    tocLabel: "İstihdam türleri",
    h2: "Tam/yarı zamanlı, marjinal, serbest ve Leiharbeit",
    lead: "Marjinal eşik ve yeni serbest meslek (Neue Selbständige) için SVS bildirimi ayrı ele alınır.",
    accordions: [
      {
        title: "Yaygın sözleşme biçimleri",
        paragraphs: [
          "On beş yaşından önce çocukların çalıştırılamadığı; yarı zamanlıların tam zamanlı ile aynı sigorta ve çoğu hukuki koruma altında olduğu yazılır.",
          "Turizm ve inşaat gibi sektorlerde mevsimlik ve süreli sözleşmelerin yaygın olduğu; serbest hizmet (freier Dienstvertrag) ve Werkvertrag kullanımının arttığı belirtilir.",
          "Marjinal istihdamda (2025: 551,10 EUR/ay ve altı) kaza sigortasının zorunlu, sağlık ve emekliliğin gönüllü olduğu; işverenin sağlık kurumuna bildirim yükümlülüğü olduğu ifade edilir.",
          "Yeni serbest meslek gruplarının (ör. yazar, çevirmen) SVS’e bildirim ve mesleğe göre gelir eşiklerine göre prim ödediği yazılır.",
        ],
      },
      {
        title: "Au pair ve Leiharbeit",
        paragraphs: [
          "Au pair istihdamının Hausgehilfen- und Hausangestelltengesetz ve asgari ücretle düzenlendiği; AB/EEA au pair’lerin Avusturyalılarla aynı haklara sahip olduğu; üçüncü ülkelerde AMS bildirimi gerekebileceği belirtilir.",
          "Geçici işçi işverenliğinin (Arbeitskräfteüberlassungsgesetz) özel kurallara ve tam sigortaya tabi olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih",
    tocLabel: "Sözleşme ve fesih",
    h2: "Dienstzettel, ihbar ve deneme süresi",
    lead: "Yazılı olmayan iş ilişkisinde de Dienstzettel zorunludur; çıraklıkta yazılı sözleşme şarttır.",
    accordions: [
      {
        title: "Sözleşme ve değişiklikler",
        paragraphs: [
          "İş sözleşmesinin yazılı, sözlü veya fiilen başlayıp ücret ödenmesiyle kurulabildiği; çıraklıkta yazılı zorunluluğun sürdüğü yazılır.",
          "Çalışmaya başlar başlamaz Dienstzettel verilmesi; işyeri, ücret, çalışma süresi ve süreli işte bitiş tarihinin yer alması gerektiği belirtilir.",
          "Sözleşme değişikliklerinin mevcut yasa ve kolektif sözleşmeden daha elverişsiz olamayacağı ifade edilir.",
        ],
      },
      {
        title: "Fesih türleri",
        paragraphs: [
          "Süresiz sözleşmede ihbarın sözlü, yazılı veya zımnen yapılabildiği; ihbar sürelerinin sözleşme, işyeri anlaşması, Angestelltengesetz veya ABGB’den kaynaklanabileceği yazılır.",
          "İşverenin haklı sebeple derhal feshi (Entlassung) ile çalışanın ağır ihmalde istifasının (Kündigung) anında sonuç doğurduğu; haksız feshin mahkemede itiraz edilebildiği belirtilir.",
          "Deneme süresinin genelde bir ay, çıraklıkta üç ay olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-calisma-izin",
    tocLabel: "Ücret, süre ve izin",
    h2: "Kolektif sözleşme, 14 ödeme ve tele çalışma (2025)",
    lead: "Yasal asgari ücret yok; sektör anlaşmaları belirleyicidir. Normal süre 8/40 saat; fazla mesai primi veya telafi izni.",
    accordions: [
      {
        title: "Ücretlendirme",
        paragraphs: [
          "Ücretin iş tanımına uygun ödenmesi; masraf ödeneğinin ücret sayılmadığı; izin, hastalık ve resmî tatillerde de ödeme yükümlülüğü olduğu yazılır.",
          "Kolektif sözleşme ve işyeri anlaşmalarının ücret, çalışma süresi ve Noel ile tatil ikramiyelerini (13. ve 14. ay) düzenleyebildiği; yasal genel asgari ücret olmadığı belirtilir.",
          "Brüt-net hesap için Arbeiterkammer hesaplayıcılarının kullanılabildiği ifade edilir.",
        ],
      },
      {
        title: "Çalışma süresi, fazla mesai ve tele çalışma",
        paragraphs: [
          "Arbeitszeitgesetz kapsamında normal günlük sekiz ve haftalık kırk saat; birçok sektörde kolektif sözleşmeyle kısaltılmış sürelerin bulunduğu yazılır.",
          "Günlük en fazla on iki saat, haftada altmış saat ve on yedi haftalık referans döneminde haftalık ortalama kırk sekiz saat üst sınırının geçerli olduğu belirtilir.",
          "Altı saat ve üzeri iş gününde en az otuz dakika ücretsiz mola; gün sonunda on bir saat, hafta sonunda otuz altı saat dinlenme haklarının olduğu ifade edilir.",
          "Fazla çalışma (Mehrarbeit) ile normal süreyi aşan mesai (Überstunden) arasındaki farkın prim veya telafi ile düzenlendiği; Ocak 2025’te yürürlüğe giren tele çalışma yasasının ev dışı mekânları da kapsadığı ve yazılı anlaşma gerektirdiği yazılır.",
        ],
      },
      {
        title: "Yıllık izin ve aile",
        paragraphs: [
          "Çalışan ve çıraklar için çalışma yılı başına en az beş hafta (yirmi beş iş günü) ücretli yıllık izin; ilk yılın ilk altı ayında oransal hak olduğu belirtilir.",
          "Hastalıkta devam eden ücret (Entgeltfortzahlung) ve ardından sağlık sigortasından günlük ödeme; doğum öncesi ve sonrası sekizer hafta mutasyon izni ve ebeveyn izni/kısmi zaman düzenlemeleri özetlenir.",
        ],
      },
    ],
  },
  {
    id: "vergi-sosyal",
    tocLabel: "Vergi ve sosyal güvence",
    h2: "Gelir vergisi, KDV ve 2025 prim oranları",
    lead: "İstihdam gelirinde kaynakta kesinti; çift vergilendirme anlaşmaları mevcuttur.",
    accordions: [
      {
        title: "Gelir ve istihdam vergisi",
        paragraphs: [
          "2023’te tam zamanlı çalışanların ortalama yıllık brüt gelirinin 35 314 EUR ve medyan netin 26 497 EUR civarında olduğu; cinsiyet ve yarı zamanlılık etkilerinin istatistiklerde ayrıştırıldığı yazılır.",
          "Gelir vergisinin kademeli tarifeye tabi olduğu; maaş vergisinin işverence kesilip yıllık beyan veya çalışan veranlagung ile nihaileştiği belirtilir.",
          "KDV’nin çoğu mal ve hizmette %20, bazı kalemlerde %10 veya %13 olduğu; tüzel kişilerde kurumlar vergisinin %23 olduğu ifade edilir.",
        ],
      },
      {
        title: "2025 sosyal sigorta oranları (özet)",
        paragraphs: [
          "Çalışan ve serbest hizmet için sağlık %7,65; kaza %1,10; işsizlik %5,9; emeklilik %18,50; yeni serbest meslek (GSVG) sağlıkta %6,80 ve emeklilikte %18,50; işveren kaza primini tek başına ödediği yazılır.",
          "Çalışan ve serbest hizmet için Arbeiterkammer kesintisinin brütün %0,5’i olduğu; çalışanların konut teşvik fonuna ek %0,5 ödediği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-maliyet",
    tocLabel: "Yaşam maliyeti",
    h2: "Tüketim yapısı ve güncel fiyat ipuçları",
    lead: "2019 tüketici anketi payları ile 2025 gösterge fiyatları birlikte okunmalıdır.",
    accordions: [
      {
        title: "Harcama dağılımı ve enerji",
        paragraphs: [
          "2019 tüketici anketine göre yetişkin başına harcamada konut ve enerjinin yaklaşık %24,4; ulaşımın %13,9; boş zamanın %13,4; gıdanın %12,1 pay aldığı yazılır.",
          "2025 için süt, ekmek, akaryakıt, elektrik kWh ve sinema bileti gibi gösterge fiyat aralıklarının yönlendirici olduğu; enerji ve konut maliyetlerinin AB ortalamasına göre yüksek kalabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-e-kart",
    tocLabel: "Sağlık sistemi",
    h2: "e-card, aile hekimi ve acil numaralar",
    lead: "Kamu sağlığı güçlüdür; özel doktor oranı artmaktadır.",
    accordions: [
      {
        title: "Bakım zinciri ve katkı payları",
        paragraphs: [
          "Sigortalıların muayene, tarama ve doğum öncesi hizmetlere erişebildiği; maliyetin sağlık sigortası veya menşe ülke sigortası tarafından karşılandığı yazılır.",
          "e-card’ın Avrupa Sağlık Kartı işlevi de gördüğü; reçeteli ilaçlarda 2025 için yaklaşık 7,55 EUR reçete katkı payı ve hastanede günlük hastane katkısı (eyalete göre değişen, örnek metinde 2024 için ortalama 15 EUR/gün ve en fazla 28 gün) olduğu belirtilir.",
          "İlk başvurunun çoğunlukla aile hekimi üzerinden yapıldığı; uzman ve diş için randevu gerektiği ifade edilir.",
        ],
      },
      {
        title: "Acil ve erişilebilirlik",
        paragraphs: [
          "Ambulans 144, sağlık danışma hattı 1450, mesai dışı hekim 141, itfaiye 122, polis 133, eczane hattı 1455 ve 112’nin hatırlatıldığı yazılır.",
          "İşitme engelliler için Relay-Service ve DEC 112 uygulamasına atıf yapılır.",
        ],
      },
    ],
  },
  {
    id: "egitim-kultur",
    tocLabel: "Eğitim ve kültür",
    h2: "Dokuz yıllık okul, Lehre ve Matura",
    lead: "On sekiz yaşına kadar eğitim veya meslekî yükümlülük devam eder.",
    accordions: [
      {
        title: "Okul sistemi",
        paragraphs: [
          "Altı yaşında başlayan dokuz yıl zorunlu okul; on yaştan itibaren Mittelschule veya AHS seçenekleri olduğu yazılır.",
          "Ana dili Almanca olmayan öğrenciler için okulda Almanca desteği ve çok dilli yaklaşımların bulunduğu belirtilir.",
          "Çıraklık, meslek okulları, Matura ve üniversiteye giriş yollarının (Berufsreifeprüfung, Studienberechtigungsprüfung) özetlendiği ifade edilir.",
        ],
      },
      {
        title: "Boş zaman",
        paragraphs: [
          "Hafta sonu gezileri, sinema-tiyatro, spor kulüpleri ve batı eyaletlerde kayak kültürünün güçlü olduğu; yerel dernek ve gönüllü itfaiye geleneğinin yaşatıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "ulasim",
    tocLabel: "Ulaşım",
    h2: "Otoyol vinyeti, bölgesel tarifeler ve KlimaTicket",
    lead: "Otoyolda vinyet zorunludur; şehir içi bilet çoğu zaman araçta satılmaz.",
    accordions: [
      {
        title: "Karayolu ve demiryolu",
        paragraphs: [
          "Otoyol kullanımında fiziksel veya dijital Autobahnvignette zorunluluğu; postane, Trafik ve sınırda satın alınabildiği yazılır.",
          "Bölgesel farklılıkla tek yön şehir içi biletin 2024’te yaklaşık 1–2,90 EUR aralığında olduğu; birçok hat biletsiz veya geçersiz bilet için yüksek ceza kestiği belirtilir.",
          "KlimaTicket Austria ile belirli kapsamda yıllık toplu taşıma ve tren kullanımının mümkün olduğu; ÖBB ve eyalet taşıma birliklerinin ayrı bilet kanalları olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "GdB, BEinstG ve erişilebilirlik yasası",
    lead: "İşveren teşvikleri ve kota sistemi SMS ve AMS üzerinden yürütülür.",
    accordions: [
      {
        title: "Tanınma ve haklar",
        paragraphs: [
          "Uzun süreli engelin, engellerle etkileşimde toplumsal katılımı kısıtlayabileceği tanımının kullanıldığı; “begünstigte/r Behinderte/r” statüsü için en az %50 GdB gerektiği yazılır.",
          "Başvurunun Sozialministeriumservice üzerinden yapıldığı; işten çıkarma koruması, işyeri uyarlama ve vergi indirimleri gibi faydaların özetlendiği belirtilir.",
        ],
      },
      {
        title: "İşveren desteği ve erişilebilirlik",
        paragraphs: [
          "Yirmi beş ve üzeri çalışanı olan işverenler için kota ve denkleştirme kesintisi mantığının; AMS, SMS ve NEBA iş danışmanlığının rolü ifade edilir.",
          "28 Haziran 2025’te yürürlüğe giren Barrierefreiheitsgesetz’in belirli ürün ve hizmetler için erişilebilirlik yükümlülüğü getirdiği; dört yüzden fazla çalışanı olan şirketlerde erişilebilirlik görevlisi atanması gerekebileceği yazılır.",
        ],
      },
    ],
  },
];
