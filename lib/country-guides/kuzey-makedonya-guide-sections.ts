import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const KUZEY_MAKEDONYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Kuzey Makedonya; Balkanlar’ın merkezinde, AB aday ülke statüsü, göç ve istihdam politikalarındaki dönüşüm ve Ohri gibi UNESCO alanlarıyla hem yaşam hem çalışma açısından ilgi çeken bir hedef ülkedir. Schengen üyesi değildir; kısa ve uzun süreli kalışlar ulusal vize, ikamet ve çalışma izni çerçevesinde ayrı ayrı değerlendirilir.",
  "2019’da yürürlüğe giren Yabancılar Kanunu çizgisinde oturum, adres kaydı ve sınır politikaları şekillenmektedir. Kotası, harçları, formları ve asgari ücret tutarlarını MFA konsoloslukları, İçişleri (Sınır İşleri ve Göç), AVRM ve Ekonomi ve Çalışma Bakanlığı resmî duyurularından güncel doğrulayın; bu sayfa özet ve planlama amaçlıdır, hukuki danışmanlık yerine geçmez.",
];

export const KUZEY_MAKEDONYA_SEO_KEYWORD_TAGS: string[] = [
  "kuzey makedonya vize",
  "north macedonia d visa",
  "skopje work permit",
  "mvr north macedonia residence",
  "avrm employment agency",
  "ohrid digital nomad",
  "turkey visa free north macedonia 90 days",
  "north macedonia article 8 citizenship",
];

export const KUZEY_MAKEDONYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "C ve D Tipi Ulusal Vize, Muafiyetler ve Schengen Bağlamı",
    lead:
      "Kısa kalışlar C tipi; doksan günden uzun yasal ikamet hedefleri D tipi ulusal vize ile başlar. Schengen vizesi Kuzey Makedonya’da otomatik çalışma veya uzun ikamet hakkı vermez.",
    accordions: [
      {
        title: "Schengen sistemi ayrıdır",
        paragraphs: [
          "Kuzey Makedonya Schengen Bölgesi üyesi değildir; giriş ve ikamet kuralları ulusal mevzuata dayanır.",
          "AB müktesebatına uyum hedefleri (ör. sınır güvenliği, veri sistemleri) uzun vadede uygulamayı etkileyebilir; güncel giriş tablosunu Dışişleri ve konsolosluklar üzerinden doğrulayın.",
        ],
      },
      {
        title: "C tipi kısa süreli vize",
        paragraphs: [
          "Turizm, kısa ticari temas, kültürel etkinlik veya aile ziyareti gibi amaçlarla, yüz seksen günlük referans dönem içinde toplam doksan günü aşmayan kalışlar bu başlık altında ele alınır.",
          "Sınır makamları seyahat amacı, konaklama, dönüş ve mali yeterlilik belgelerini talep edebilir; muafiyet olsa bile giriş garantisi anlamına gelmez.",
        ],
      },
      {
        title: "Türkiye vatandaşları ve muafiyet",
        paragraphs: [
          "Türkiye Cumhuriyeti vatandaşlarının (diplomatik, hizmet, hususi ve umuma mahsus pasaportlar dahil) birçok kısa süreli seyahatte vizeden muaf tutulduğu özetlenir; yüz seksen gün içinde doksan gün sınırı ve sınırda belge kontrolü geçerlidir.",
        ],
        callout: {
          variant: "warning",
          text: "Muafiyet rejimi ve pasaport türleri değişebilir; seyahat öncesi MFA ve konsolosluk duyurusunu mutlaka okuyun.",
        },
      },
      {
        title: "D tipi uzun süreli (ulusal) vize",
        paragraphs: [
          "Çalışma, uzun süreli eğitim, araştırma, aile birleşimi veya uzun tedavi gibi doksan günü aşan kalışlarda D tipi ulusal vize zorunluluğu vurgulanır.",
          "Kural olarak turist statüsüyle (vizesiz veya C ile) ülkeye girip sonra çalışma veya uzun oturum statüsüne geçiş (statü değişikliği) mümkün sayılmaz; süreç D ile planlanmalıdır.",
          "Başvurular çoğunlukla seyahatten en geç on beş gün önce, en erken altı ay önce açılabilir; harç ve evrak listesi yaş ve duruma göre değişir (yetişkin / çocuk ayrımı gibi). Belgelerde apostil ve yeminli tercüme beklentisi yaygındır.",
        ],
      },
      {
        title: "ETIAS / EES notu",
        paragraphs: [
          "ETIAS ve EES gibi AB giriş-çıkış sistemleri doğrudan Schengen alanına yöneliktir; Kuzey Makedonya vatandaşlarının Schengen seyahatlerini ve aday ülke olarak ulusal sınır veri uyumunu etkileyebileceği genel çerçevede bilinir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Yabancılar Kanunu, Geçici / Kalıcı İkamet ve Adres Kaydı",
    lead:
      "Geçici oturum izni D tipi giriş ve dayanak belgelere bağlanır; kalıcı oturum süreklilik ve mali istikrar şartlarıyla talep edilir. Kısa süreli girişlerde emniyet kaydı kritiktir.",
    accordions: [
      {
        title: "Kırk sekiz saatlik adres bildirimi",
        paragraphs: [
          "Yabancıların varıştan itibaren kırk sekiz saat içinde yerel kolluk birimine adres bildiriminde bulunması zorunlu tutulur.",
          "Otel ve lisanslı tesislerde konaklamada kayıtların merkezi sistemlerle otomatik aktarıldığı; özel kiralık daire veya tanıdık yanında kalışta ev sahibi veya malik ile birlikte karakola başvurulması gerektiği özetlenir.",
          "Adres değişikliklerinin de güncellenmesi gerekir; ihlallerin idari para cezası ve ilerideki başvurulara yansıma riski taşıdığı belirtilir.",
        ],
        callout: {
          variant: "warning",
          text: "Pasaport veya kimlik belgesini yanınızda bulundurun; kontrol taleplerine hazırlıklı olun.",
        },
      },
      {
        title: "Geçici oturum izni",
        paragraphs: [
          "D tipi vize ile giriş sonrası başvurular İçişleri’ne bağlı Sınır İşleri ve Göç Departmanı çizgisinde yürütülür; Üsküp’te merkezi ofis ve bölge birimleri kullanılır.",
          "Geçici izin süresi dayanakla uyumlu olmak üzere çoğunlukla bir yıl olarak düzenlenir; bitişten önce (örneğin en az otuz gün kala) yenileme planı yapılmalıdır.",
          "Pasaport, kira sözleşmesi, banka dökümü, çalışma izni veya öğrenci belgesi gibi gerekçeye özgü evraklar talep edilir.",
        ],
      },
      {
        title: "Kalıcı oturum ve vergi mukimi notu",
        paragraphs: [
          "Geçici oturumla kesintisiz yasal ikamet, kendi geçimini sürdürebilme, uygun konut ve sağlık güvencesi gibi şartlarla kalıcı oturuma geçiş çerçevesi özetlenir; kesintisiz süre eşiği mevzuatta netlenir ve güncel metinden doğrulanmalıdır.",
          "Bir takvim yılında yüz seksen üç günden fazla ikamet eden yabancıların vergi mukimi sayılabileceği ve küresel gelirlerin (çifte vergilendirme anlaşmaları saklı) değerlendirilebileceği genel hatırlatma yapılır.",
        ],
      },
      {
        title: "Evlilik yoluyla oturum",
        paragraphs: [
          "Kuzey Makedonya vatandaşıyla yasal evlilik ve ortak yaşamın ispatı üzerinden geçici ve ardından kalıcı oturuma doğru süreç işletilir; vatandaşlık için ayrı süre ve şartlar vardır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları",
    h2: "AB / AEA ve Schengen İkametli Üçüncü Ülke Vatandaşları",
    lead:
      "AB ve AEA vatandaşları kimlik kartı ile kısa girişte daha hafif rejime tabidir; uzun kalışta bildirim temelli kayıt çizgisi özetlenir. Schengen’de ikamet eden üçüncü ülke vatandaşları için ayrı kısa süreli giriş kuralı bulunur.",
    accordions: [
      {
        title: "AB ve AEA vatandaşları",
        paragraphs: [
          "AB ve AEA üyesi ülkelerin vatandaşlarının geçerli ulusal kimlik kartı ile vizesiz giriş yapabildiği özetlenir.",
          "Üç aydan uzun kalışlarda karmaşık D vizesi yerine ikamet kaydının resmî makamlara bildirilmesiyle yürüyen daha sade bir çerçeve anlatılır.",
          "Kamu memurluğu ve belirli stratejik görevlerde vatandaşlık şartı gibi istisnaların sürdüğü belirtilir.",
        ],
      },
      {
        title: "Schengen veya AB ülkesinde ikametli üçüncü ülke vatandaşları",
        paragraphs: [
          "Geçerli pasaportla birlikte Schengen veya AB üyesi bir ülkede düzenlenmiş geçerli ikamet kartının ibrazıyla, yüz seksen günlük dönemde toplam doksan gün ve giriş başına on beş gün sınırına riayet eden kısa süreli vizesiz giriş imkânından söz edilir; ayrıntılar resmî tabloda güncellenir.",
        ],
        callout: {
          variant: "info",
          text: "İkamet kartı türü ve uyruk kombinasyonu giriş hakkını değiştirir; seyahat öncesi güncel vize rejimi tablosunu doğrulayın.",
        },
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Kan Bağı, Doğal Yolla Vatandaşlık ve Yatırım Çerçevesi",
    lead:
      "Vatandaşlık Kanunu kan bağı, doğumla sınırlı haller, doğallaşma ve uluslararası anlaşmalar başlıklarını kapsar. Çifte vatandaşlığa izin diaspora ve yatırımcı açısından caziptir; yatırım yolu son derece takdiridir.",
    accordions: [
      {
        title: "Genel ilkeler",
        paragraphs: [
          "Mevzuatın ağırlığının kan bağı (jus sanguinis) üzerinde olduğu; çifte vatandaşlığın geniş biçimde mümkün olduğu özetlenir.",
        ],
      },
      {
        title: "Madde 8 ve diaspora hattı",
        paragraphs: [
          "Tarihsel olarak ülkeden göç etmiş kişiler ve birinci nesil soyundan gelenler için ikamet veya dil şartı aranmayan hızlandırılmış bir hat anlatılır.",
          "Arşiv belgeleriyle göçün ispatı, Kiril–Latin isim uyumsuzlukları, apostil ve Makedonca yeminli tercüme yükü ve şahsen başvuru beklentisi pratikte en zorlayıcı aşamalardır.",
        ],
        callout: {
          variant: "warning",
          text: "Soybağı dosyaları uzun sürebilir; nüfus ve arşiv araştırması için uzman desteği sık tercih edilir.",
        },
      },
      {
        title: "Ebeveyn vatandaşlığı ve bildirim süreleri",
        paragraphs: [
          "Her iki ebeveynin vatandaş olduğu doğumlarda işlemlerin daha sade olduğu; tek ebeveyn vatandaşlığında yurt dışı doğumlarda bildirim süreleri ve yaş sınırlarının (ör. on sekiz / yirmi üç) kritik olduğu özetlenir — güncel madde metnini mutlaka okuyun.",
        ],
      },
      {
        title: "Yatırım yolu (CBI) ve doğallaşma",
        paragraphs: [
          "“Özel ulusal çıkar” çerçevesinde fon veya istihdam yaratan reel yatırım hatları anlatılır; dil ve ikamet süresi şartının bu yolda aranmadığı genel bilgi olarak verilir.",
          "Başvurularda CV, fon menşei ispatı (AML), sabıka ve sözleşmeler talep edilir; komisyonların takdir yetkisi yüksek, süreler uzun ve onay oranının düşük olabildiği vurgulanır.",
          "AB ilerleme raporlarında altın pasaport tarzı programlara yönelik eleştirilerin programın geleceğini etkileyebileceği hatırlatılır.",
        ],
      },
      {
        title: "Doğallaşma (naturalization)",
        paragraphs: [
          "Kalıcı oturum sonrası uzun süreli yasal ikamet, Makedonca yeterliliği ve diğer şartlarla doğallaşma yolu özetlenir; süre eşikleri reformlarla değişebilir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Çalışma İzni, Kota ve Ücret / Prim Çerçevesi",
    lead:
      "Yasal çalışma için D tipi vize, oturum izni ve çalışma izni birlikte yönetilir; izin süresi oturumu aşamaz. Kota ve asgari ücret rakamları yıllık güncellenir.",
    accordions: [
      {
        title: "Çalışma izni ve AVRM",
        paragraphs: [
          "Çalışma izni süreçlerinin İstihdam Kurumu (AVRM) koordinasyonunda yürüdüğü; başvurunun işveren sponsorluğunda yapıldığı anlatılır.",
          "Kamuoyuna yansıyan özetlerde yıllık yabancı işçi kotasının on bin civarında toplandığı ve sektörel dağılımın (çoğunlukla inşaat, tekstil, sanayi ve hizmet; proje uzmanı; sezonluk tarım ve turizm gibi) ayrı kalemlere bölündüğü aktarılır — kesin kota ve tarih için Ekonomi ve Çalışma Bakanlığı / hükümet kararını doğrulayın.",
        ],
      },
      {
        title: "Harç ve süre uyumu",
        paragraphs: [
          "Çalışma izni başvurularının devlet harcı açısından ücretsiz veya çok düşük maliyetli kabul edildiği yönünde pratik bilgiler paylaşılır; güncel ücret tablosunu AVRM duyurusundan teyit edin.",
          "Çalışma izni süresinin oturum iznini geçemeyeceği ve yenilemelerin eşzamanlı planlanması gerektiği vurgulanır.",
        ],
      },
      {
        title: "Asgari ücret ve bordro kesintileri",
        paragraphs: [
          "Asgari ücretin her yıl Mart civarında enflasyon ve ortalama ücret artışına bağlı formülle belirlendiği anlatılır.",
          "Kamuoyuna yansıyan 2026 özetlerinde brüt yaklaşık otuz sekiz bin beş yüz yedi MKD ve buna bağlı net bandın dört yüz Euro civarı ölçeklendiği iletilir; kesin rakamlar resmî ilanla doğrulanmalıdır.",
          "Emeklilik, sağlık, işsizlik ve iş kazası primlerinin toplamda brüt ücret üzerinden yaklaşık yüzde yirmi sekiz oranında çalışan payı olarak kesildiği, işveren ek priminin olmadığı yönündeki özet dikkate alınmalıdır — mevzuat değişirse tablo güncellenir.",
        ],
      },
      {
        title: "Sektörler ve toplumsal bağlam",
        paragraphs: [
          "IT ve yazılımın ortalama ücretlerde üst bantta, turizm ve perakendenin asgari ücrete yakın kaldığı genel piyasa tasviri yapılır.",
          "Sendikaların asgari ücret talepleri ve hükümetin bütçe / KOBİ maliyeti gerekçeleriyle karşılık verdiği dönemsel tartışmaların işçi–işveren müzakere forumlarına taşındığı özetlenir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "AVRM Portalı ve Aktif İstihdam Önlemleri",
    lead:
      "Resmî iş arama ve işveren eşleştirmesinde AVRM merkezdır; sübvansiyon, gençlik garantisi ve mesleki eğitim hatları bir arada yürütülür.",
    accordions: [
      {
        title: "e-İstihdam ve kayıt",
        paragraphs: [
          "İş arayanların AVRM veri tabanına aktif iş arayan olarak kaydolması ve bireysel istihdam planı ile danışmanlık sürecinin işletildiği anlatılır.",
        ],
      },
      {
        title: "Aktif önlemler",
        paragraphs: ["Öne çıkan kamusal program başlıkları özetlenir:"],
        bullets: [
          "İstihdam sübvansiyonu (işverene teşvik)",
          "Kendi işini kurma ve kredi / hibe destekleri",
          "Bilinen işverenle eğitim ve IT beceri programları",
          "Gençlik garantisi (NEET hedefli)",
        ],
      },
      {
        title: "Şehir seçimi",
        paragraphs: [
          "Üsküp’ün idari ve iş fırsatları açısından öne çıktığı; Bitola (Manastır), Štip (İştip) gibi şehirlerin daha düşük yaşam maliyeti sunduğu; Ohri’nin turizm sezonuna bağlı dalgalanma yaşadığı genel çerçevede bilinir.",
        ],
      },
    ],
  },
  {
    id: "staj-vet",
    tocLabel: "Staj ve meslekî eğitim",
    h2: "Staj Programları, RVET ve Mesleki Mükemmeliyet Merkezleri",
    lead:
      "Genç işsizliği baskısı mesleki eğitimi modernize etmeyi zorunlu kılmıştır; AVRM staj desteği ve uluslararası staj girişimleri paralel yürür.",
    accordions: [
      {
        title: "Üniversite ve meslek okulu çıkışlı staj",
        paragraphs: [
          "İş öncesi ilk iş deneyimi olarak staj programlarında ödeneklerin kamu kaynağından karşılanabildiği ve işveren maliyet riskinin düşürüldüğü özetlenir.",
        ],
      },
      {
        title: "Bölgesel meslekî eğitim ve CoVE dönüşümü",
        paragraphs: [
          "Bölgesel meslekî eğitim merkezlerinin iş dünyası ile hizalanmış müfredat ve “mesleki mükemmeliyet merkezi” (CoVE) vizyonuyla güçlendirildiği anlatılır.",
        ],
      },
      {
        title: "Uluslararası staj girişimleri",
        paragraphs: [
          "Üsküp merkezli sivil inisiyatiflerin konaklama, sigorta, mentörlük ve dil desteği paketleriyle yabancı stajyerleri ağırlayabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "2026 Reformu: Kota, Özel Fon ve Teşvikler",
    lead:
      "Engelli istihdamında cezadan katkıya geçiş ve kademeli kotalar işveren yükünü yeniden tanımlar; denetim sıklığı artar.",
    accordions: [
      {
        title: "Kademeli kota",
        paragraphs: [
          "Sekiz ile yirmi beş çalışanı olan işletmeler için en az bir engelli istihdamı; yirmi beşin üzerindeki işletmelerde yaklaşık yüzde dört oranı gibi özetlenen kademeler anlatılır; eğitim ve bakım alanında yumuşatılmış oranların bulunduğu belirtilir.",
          "Kota takibinin yıllık yerine üçer aylık dönemlerle sıkılaştığı ve ağır engellilik hallerinde çifte sayım gibi pozitif ayrımcılık kurallarının işlediği özetlenir.",
        ],
      },
      {
        title: "Özel Engelli Fonu (SDF)",
        paragraphs: [
          "Kotayı dolduramayan işverenlerin para cezası yerine devletin yönettiği Özel Engelli Fonu’na hedeflenen katkı ödediği ve bu kaynağın doğrudan desteklere aktarıldığı anlatılır.",
          "Engelli çalışana asgari ücretin üzerinde ücret ödenmesinin kota sayımı için şart koşulabildiği vurgulanır.",
        ],
      },
      {
        title: "Hibeler ve makul düzenleme",
        paragraphs: [
          "Kalıcı istihdamda onlarca aylık brüt maaş dengi geri ödemesiz hibelerin (ör. tekerlekli sandalye veya tam görme engeli gibi hallerde daha yüksek band) işverene sunulabildiği özetlenir; fiziksel uyarlama ve ekipman alımlarını da kapsayabilir.",
          "Makul düzenleme talebini maliyet gerekçesiyle reddetmenin ayrımcılık riski taşıdığı hatırlatılır.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "FZO, Özel Sigorta ve İlköğretim Entegrasyonu",
    lead:
      "Uzun süreli yasal ikamette kamu sağlık güvencesi primlerle bağlanır; D vizesi aşamasında uluslararası poliçe zorunluluğu sık görülür. Çocukların ilköğretim hakkı mevzuatta güçlendirilmiştir.",
    accordions: [
      {
        title: "Sağlık Sigortası Fonu (FZO / HIFM)",
        paragraphs: [
          "Prim gelirleriyle finanse edilen kamu sağlık sistemine kayıtlı uzun dönem mukimlerin erişebildiği anlatılır.",
          "İşsizlikte fon üzerinden özel sigortalılık başvurusu ihtiyacı özetlenir.",
          "Türkiye, Karadağ, Sırbistan gibi ülkelerle ikili sosyal güvenlik anlaşmalarının acil durumlarda formlarla (ülkeye özgü kodlar) kolaylık sağlayabildiği belirtilir.",
        ],
      },
      {
        title: "Özel sağlık ve D vizesi",
        paragraphs: [
          "Kamu hastanelerinde bekleme ve teknoloji sınırları nedeniyle yabancıların özel poliçelerle tamamlayıcı hizmet aldığı; D tipi başvuruda uluslararası geçerli sağlık sigortasının arandığı vurgulanır.",
        ],
      },
      {
        title: "İlköğretim ve azınlık dilleri",
        paragraphs: [
          "2019 sonrası ilköğretim reformunun kapsayıcılık ve ayrımcılık yasağına dayandığı; yabancı veya vatansız çocukların oturum statüsünden bağımsız ücretsiz ilköğretim hakkına kavuştuğu özetlenir.",
          "Boşnak, Türk, Sırp, Roman ve Ulah toplulukları için anadil ve kültür dersleri veya yeterli mevcutla özel sınıf düzenlemelerinin yasal zemininin güçlendirildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "konut-yasam",
    tocLabel: "Konut ve yaşam",
    h2: "Kira Bantları, Ohri Sezonsallığı ve Altyapı",
    lead:
      "Üsküp en yüksek kira bandını taşır; Ohri turizm sezonunda kısa kiralamaya kaydıyla uzun dönem kira piyasası zorlaşır. İnternet maliyeti düşük, hava kalitesi kışın bölgesel risk oluşturur.",
    accordions: [
      {
        title: "Şehirlere göre kira özetleri",
        paragraphs: [
          "Üsküp merkez stüdyo ve üç odalı daireler için iki yüz otuz–iki yüz seksen Euro ile üç yüz altmış–üç yüz seksen Euro gibi kamuoyunda paylaşılan bantlar özetlenir; merkez dışı daha düşük seyreder.",
          "Bitola ve Štip’te daha uygun bantların görüldüğü; Ohri’de kış aylarında iki yüz–iki yüz elli Euro bandına inen kiraların yaz sezonunda yedi yüz Euro üzerine çıkabildiği ve kısa süreli kiralama baskısı nedeniyle uzun dönem sözleşme zorluğu yaşandığı anlatılır.",
        ],
      },
      {
        title: "Yaşam maliyeti ve faturalar",
        paragraphs: [
          "Bekâr uzaktan çalışan için sekiz yüz–bin üç yüz yetmiş iki ABD Doları, dört kişilik aile için yaklaşık bin iki yüz doksan sekiz Dolar gibi geniş bantların literatürde dolaştığı belirtilir; kişisel tüketim alışkanlığına göre değişir.",
          "Seksen beş metrekare dairede su, elektrik ve ısıtma dahil yaklaşık yüz–yüz yirmi Dolar faturalar; sınırsız internetin on yedi Dolar bandında olduğu özetlenir.",
        ],
      },
      {
        title: "Çevre ve kentsel risk",
        paragraphs: [
          "Ohri’de plansız yapılaşma, kısa kiralama ekonomisi ve kışın düşük kaliteli yakıt kullanımının hava kirliliğini artırabildiği; kış aylarında solunum için dikkat edilmesi gerektiği uyarısı yapılır.",
        ],
        callout: {
          variant: "warning",
          text: "Konut sözleşmesinde sezonluk tahliye veya kısa kiralama maddelerini özellikle Ohri’de dikkatle okuyun.",
        },
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Süreli Seyahat ve Sınır Pratiği",
    lead:
      "Turistik ve benzeri kısa amaçlar C tipi veya muafiyet rejimiyle yürür; sınırda belge ve süre disiplinine uyulmalıdır.",
    accordions: [
      {
        title: "Doksan / yüz seksen gün disiplini",
        paragraphs: [
          "Kısa süreli kalışlarda referans dönem içinde toplam doksan günlük sınırın aşılmaması gerektiği tekrarlanır.",
        ],
      },
      {
        title: "Sınırda hazırlık",
        paragraphs: [
          "Otel veya davetiye, dönüş planı, yeterli nakit veya kart limiti gibi mali yeterlilik kanıtlarının hazır bulundurulması önerilir.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV, Dil ve Maaş Pazarlığı",
    lead:
      "Resmî kanal AVRM iken LinkedIn ve sektör ağları yan kanaldır. Makedonca ve Arnavutça yanında İngilizce ve Türkçe pratikte iş görür.",
    accordions: [
      {
        title: "Başvuru belgeleri",
        paragraphs: [
          "Avrupa formatlı CV, referans mektupları ve diploma denklik süreçlerinin işveren beklentisine göre hazırlanması önerilir.",
        ],
      },
      {
        title: "Dil ve kültür",
        paragraphs: [
          "Üsküp ve Ohri’de İngilizce kullanımının yaygın olduğu; yerel yönetim ve müşteri temasında Makedonca veya Arnavutça bilmenin avantaj sağladığı özetlenir.",
        ],
      },
      {
        title: "Maaş görüşmesi",
        paragraphs: [
          "Brüt–net ayrımı ve yüzde yirmi sekiz sosyal güvenlik kesintisi çerçevesinde net elinize geçeceği tutarı hesaplayarak pazarlık yapın.",
        ],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Uyarı ve kaynaklar",
    h2: "Resmî Makamlar ve Güncellik Uyarısı",
    lead:
      "AB adaylık süreci ve iç siyasi gündem mevzuatı hızla değiştirebilir; kritik rakamları ve formları yalnızca resmî kaynakla kilitleyin.",
    accordions: [
      {
        title: "Başlıca kurumlar",
        paragraphs: ["Yetki alanlarının özeti:"],
        bullets: [
          "İçişleri Bakanlığı (MVR): adres kaydı, oturum, sınır dışı, vatandaşlık güvenlik süreçleri",
          "Dışişleri Bakanlığı (MFA): vize politikası ve konsolosluk hattı",
          "İstihdam Kurumu (AVRM): çalışma izni, staj ve engelli fonu operasyonları",
          "Sağlık Sigortası Fonu (FZO / HIFM): prim ve sağlık güvencesi",
          "Ekonomi ve Çalışma Bakanlığı: asgari ücret ilanı ve iş hukuku üst politika",
        ],
      },
      {
        title: "Bu rehberin sınırları",
        paragraphs: [
          "Metin genel çerçeve ve planlama amaçlıdır; kişisel durumunuz için güncel mevzuat metni veya baro / danışman görüşü şarttır.",
        ],
        callout: {
          variant: "info",
          text: "Konsolosluk randevu müsaitliği, belge listesi ve kota sayıları sık değişir; başvurudan hemen önce kontrol edin.",
        },
      },
    ],
  },
];
