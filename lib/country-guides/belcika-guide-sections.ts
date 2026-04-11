import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Belgium” (02/08/2024, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const BELCIKA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Belçika’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Belçika federal bir yapıdır; istihdam önlemleri bölgelere (Valoni, Flaman Bölgesi, Brüksel Başkent Bölgesi, Almanca konuşan topluluk) göre ayrışır. Schengen kısa süreli seyahat kuralları ile çalışma, oturum veya çalışma izni süreçleri birbirinden ayrı değerlendirilmelidir.",
  "Aşağıdaki tutarlar, yüzdeler ve tarihler kaynak sayfada açıkça geçtiği şekilde aktarılmıştır; mevzuat ve bölgesel düzenlemeler güncellenebilir. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const BELCIKA_SEO_KEYWORD_TAGS: string[] = [
  "belçika vize",
  "belçika schengen",
  "vdab iş arama",
  "forem belçika",
  "actiris brüksel",
  "belçika çalışma izni",
  "eures belçika",
  "belçika oturum",
  "belçika gmıı asgari ücret",
];

export const BELCIKA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Kamu istihdam servisleri ve diğer kanallar",
    lead: "Forem, VDAB, Actiris, ADG; Selor ve özel istihdam.",
    accordions: [
      {
        title: "Kamu istihdam servisleri",
        paragraphs: [
          "Kaynak metne göre Belçika’da iş bulmanın yollarından biri kamu istihdam servisleridir: Valoni için Forem, Flaman Bölgesi için VDAB, Brüksel Başkent Bölgesi için Actiris, Almanca konuşan topluluk için ADG.",
          "Diğer kuruluşlar arasında kamu sektörü işe alım hizmeti Selor; şirketler; geçici istihdam büroları; internet; LinkedIn, Facebook, Twitter, Instagram gibi sosyal ve mesleki ağlar ile basın sayılır.",
        ],
        bullets: [
          "Hafta sonu bazı gazetelerde hâlâ iş ilanı bölümü bulunduğu belirtilir.",
          "Flemenkçe ana gazeteler: De Morgen, De Standaard, Het Nieuwsblad, De Tijd, Het Laatste Nieuws.",
          "Fransızca ana gazeteler: La Dernière Heure, Le Soir, La Libre Belgique, La Meuse, L’Écho.",
          "Almanca ana gazete: GrenzEcho.",
          "Yerel ilan gazeteleri ve bölgesel gazeteler (ör. Vlan) kaynakta anılır.",
        ],
      },
      {
        title: "Gizli iş gücü piyasası ve çevrimiçi araçlar",
        paragraphs: [
          "Birçok pozisyonun ilan edilmeden dolduğu “gizli” iş piyasasına; şirket rehberleri, sosyal ağlar, gazeteler ve uzman dergiler aracılığıyla başvurulabileceği yazılır.",
          "Kaynak metinde örnek bağlantılar arasında Monster, Stepstone, Références, Jobijoba, Alterjob, Guide social, Socius, Jobat, Federgon ve Brüksel / AB çevresi iş siteleri sayılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru-cv-on-yazi",
    tocLabel: "Başvuru",
    h2: "Özgeçmiş ve ön yazı",
    lead: "İşverenlerin çoğunun önce CV’yi okuduğu; ayrımcılığı önlemek için kişisel veri sınırları.",
    accordions: [
      {
        title: "Özgeçmiş içeriği",
        paragraphs: [
          "CV’nin işverenin dikkatini çekecek şekilde okunaklı ve düzenli olması gerektiği; kişisel bilgilerde ad, adres, telefon (Belçika dışında yaşıyorsanız ülke kodu), e-posta bulunduğu belirtilir.",
          "İş veya işveren talep etmedikçe fotoğraf konulmaması; yaş, uyruk, medeni durum, cinsiyet gibi özel ayrıntıların ayrımcılığı önlemek için gerekmediği yazılır.",
          "Başlıkta başvurulan rol veya Belçika’daki iş unvanının kullanılması; deneyimin en son pozisyondan başlayarak, görevler, başarılar, proje ve şirket ölçeği (çalışan sayısı, ciro) ile anlatılması istenir.",
          "Yeni mezunların staj veya gönüllülük gibi deneyimleri ekleyebileceği; eğitimde en güncelden geriye doğru sıra, tez başlığı ve mümkünse notlar; ilana uygun ek eğitimler; beceri sertifikaları; ilgi alanları ve kişiselleştirilmiş düzen önerilir.",
        ],
        bullets: [
          "Dil becerilerinin ayrı bölümde ve Avrupa Dilleri Ortak Çerçevesi (CEFR) seviyeleriyle vurgulanması gerektiği; Valoni ve Brüksel’de Fransızca, Flaman Bölgesi ve Brüksel’de Flemenkçe, Almanca konuşan toplulukta Almancanın önemli olduğu belirtilir.",
          "CV’nin çevrimiçi yayınlanması ve LinkedIn profilinin CV ile tutarlı tutulması önerilir.",
        ],
      },
      {
        title: "Ön yazı ve spekülatif başvuru",
        paragraphs: [
          "Her başvuru için şirket ve ilana özel ayrı bir ön yazı yazılması; kişilik ve deneyimin anlatılması ve aynı diplomaya sahip diğer adaylardan farkın vurgulanması gerektiği yazılır.",
          "Spekülatif başvuruda ilan olmadığı için kariyer hedeflerinin net ve ikna edici kurulması ve neden o şirkete başvurulduğunun gerekçelendirilmesi; iyi ön yazı için tek tip kural olmadığı, işveren görüşünün değişebileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Bölgelere göre tanım ve koşullar",
    lead: "Üçüncü ülke uyruklular için çalışma izni ilkesi; tanınmış eğitim çerçevesinde ücretsiz staj.",
    accordions: [
      {
        title: "Tanım ve çalışma izni",
        paragraphs: [
          "Stajyerin, eğitiminin parçası olarak benzer koşullarda çalışarak deneyim kazanan kişi olarak tanımlandığı belirtilir.",
          "Yabancı uyruklunun staj için ilke olarak geçerli çalışma iznine ihtiyaç duyduğu; Avrupa Ekonomik Alanı (AB, Norveç, İzlanda, Lihtenştayn) ve İsviçre vatandaşları için bu şartın geçerli olmadığı yazılır.",
          "Bazı yabancı stajyerler için çalışma izni yükümlülüğünden muafiyet durumlarının bulunduğu ifade edilir.",
          "İstihdam politikasının bölgesel sorumlulukta olduğu; her bölgenin önlemleri geliştirip uyguladığı anlatılır.",
        ],
      },
      {
        title: "Bölgelere göre uygulama",
        paragraphs: [
          "Her bölgesel kamu istihdam servisinin (Actiris, Forem, VDAB, ADG) iş arayanlara staj ve çıraklık sözleşmeleri sunduğu; yalnızca Brüksel’de stajların Actiris, çıraklıkların bölgesel eğitim sağlayıcıları (Brussels-Formation ve VDAB) tarafından sunulduğu belirtilir.",
          "Brüksel Başkent Bölgesi’nde Actiris için stajın, becerilerin şirkette (Brüksel veya yurt dışında) uygulanması amacıyla genelde en fazla altı aylık dönem olduğu yazılır.",
          "Valoni’de resmî tek bir “staj” tanımının bulunmadığı; işyeri denemesinin çoğunlukla eğitim, meslek eğitimi veya işsizlerin iş bulunabilirliğini artıran politika ölçütleriyle bağlantılı pratik bir süreç sayıldığı ifade edilir.",
          "Flaman Bölgesi’nde eğitim sağlayıcıların program sonuna doğru staj biçimleri entegre edebildiği; bunun işverenin stajyerin eğitim ihtiyaçlarını bilmesini ve zaman ayırmasını gerektirdiği belirtilir.",
        ],
        bullets: [
          "Eurodyssey ile 30 yaş altı gençlerin (ağ üyesi bölgeden) Actiris aracılığıyla Brüksel’de altı aylık staj yapabileceği kaynakta belirtilir.",
          "Flaman Bölgesi’nde stajların yalnızca meslek eğitimi görenlere açık olduğu, ister Belçika ister yurt dışından olsunlar yazılır.",
        ],
      },
      {
        title: "Kalite çerçevesi ve çalışma koşulları",
        paragraphs: [
          "Brüksel’de Actiris’in profili staj teklifiyle eşleştirmek için bireysel destek verdiği; iş arayan–şirket–hizmet sağlayıcı anlaşmasının amaç ve görevleri açıkça belirlemesi gerektiği; mali destek veya yardımların deneyim kazandırmayı amaçladığı anlatılır.",
          "Valoni’de politikanın Avrupa Konseyi staj kalite çerçevesi önerisiyle uyumlu bölgesel düzeyde örgülendiği; Flaman Bölgesi’nde stajların staj kalite çerçevesi tavsiyeleriyle uyumlu olduğu belirtilir.",
          "Belçika mevzuatının yalnızca tanınmış eğitim çerçevesinde yürütülen ücretsiz stajlara izin verdiği ifade edilir.",
          "Staj anlaşmalarının istihdam sözleşmelerine dayandığı; stajyerlerin çalışanlarla aynı mevzuata tabi olduğu, iş kazası sigortası ve iş düzenlemesi örneği bulunduğu yazılır.",
        ],
      },
      {
        title: "Fırsatlar ve ücretlendirme",
        paragraphs: [
          "Brüksel’de Actiris sitesindeki iş ilanları sayfasında arama motoruna staj türü yazılarak ve Brüksel veya yurt dışı iş yeri filtresiyle filtreleme yapılabildiği belirtilir.",
          "Valoni’de Forem’in işverenleri potansiyel stajyerlerle buluşturduğu; Flaman Bölgesi’nde stajların meslek eğitiminin parçası olarak bu eğitim çerçevesinde düzenlendiği yazılır.",
          "Öğrenci stajlarında çoğu durumda ücret olmadığı; bazı şirketlerin ulaşım (toplu taşıma aboneliği) veya yemek masraflarını karşılayabildiği veya indirimli yemek sunduğu; bunun stajyer öğrenciyle pazarlıkla belirlenebildiği ifade edilir.",
          "Öğrenciye ücret ödenmesi halinde belgelerin imzalanması ve şirketin ödenen tutarı bildirmesi gerektiği belirtilir.",
          "İş arayanlar için her bölgede özel eğitim destek şemalarının bulunduğu kaynakta tekrarlanır.",
        ],
      },
    ],
  },
  {
    id: "ikili-ogrenme",
    tocLabel: "İkili öğrenme",
    h2: "Çıraklık ve işbaşı eğitim yolları",
    lead: "Onaylı eğitim kuruluşları, şirket içi öğrenme ve asgari ücret / yardım.",
    accordions: [
      {
        title: "Genel çerçeve",
        paragraphs: [
          "İkili eğitimin farklı mekanizmalar ve onaylı işletmeler aracılığıyla mümkün olduğu; süre ve erişim koşullarının sisteme bağlı değiştiği; tüm sektörlerde küçük veya büyük şirketlerin, ilgili iş için onaylı bir eğitim programı ve işletmeci olduğu sürece işbaşı eğitiminden yararlanabildiği belirtilir.",
          "Şirkette geçirilen süre boyunca çıraklara şirket tarafından atanan bir “tutor”un refakat ettiği; idari ve pedagojik formaliteler için eğitim işletmecisindeki muhatapların da bulunduğu yazılır.",
          "İkili eğitimin çıraklara resmî yeterlilik ve ücret / yardım; işverenlere güncel beceri ihtiyacını karşılama imkânı sağladığı; ikili eğitimdeki aylık ücret veya tazminatın yasal asgari tutarlara bağlı olduğu ve sektör ile mevcut yeterlilik düzeyine göre değişebildiği ifade edilir.",
        ],
      },
      {
        title: "Brüksel, Flaman Bölgesi ve Valoni örnekleri",
        paragraphs: [
          "Brüksel’de 15–25 yaş arası meslek eğitimindeki gençlerin haftada yaklaşık bir gün dersle birlikte şirkette işbaşı stajı birleştirebildiği; Fransızca “formation en alternance”, Flemenkçe “leerovereenkomst” olarak anıldığı belirtilir.",
          "Flaman Bölgesi’nde bireysel meslek eğitimi (IBO), mesleki uyum stajı (BIS), 15–25 yaş ve en az iki yıl ortaokul sonrası için “vocational training contract” ve CEFA üzerinden yollar kaynakta sayılır.",
          "Valoni’de IFAPME, CEFA, endüstri çıraklık sözleşmesi (belirli ortak komiteler: CP 323 emlak; CP 118 ve 220 gıda; CP 111 metal–mekanik–elektrik), on sekiz yaş üstü için IFAPME “Convention de stage”, yükseköğretimde “Convention d’alternance”, Forem / IFAPME / Yetkinlik Merkezi üzerinden işsizlere yönelik “Contrat de formation alternée” (3–12 ay) gibi başlıklardan bahsedilir.",
          "Olumlu değerlendirme halinde çıraklara işverenlere gönderilebilecek bir sertifika verildiği yazılır.",
        ],
      },
      {
        title: "Uygunluk ve üçüncü ülkeler",
        paragraphs: [
          "Her şemanın yaş şartlarına ek olarak; ikili eğitime kayıt için yabancı başvuranların oturma iznine, şemanın istediği denklikteki yeterliliğe ve cihaza özel diğer şartlara sahip olması gerektiği belirtilir.",
          "Yükseköğretimde ikili lisans için Belçika’da verilen CESS veya denkliği kabul edilen yabancı ortaöğretim bitirme belgesi; ikili yüksek lisans için lisans şartının programa bağlı olduğu ifade edilir.",
          "Valoni–Brüksel Federasyonu diploma denkliği için equivalences.cfwb.be adresine başvurulabileceği yazılır.",
          "IBO’nun işsiz Belçika ve AEA vatandaşlarına; BIS’in çalışma izni olan herkese açık olduğu belirtilir.",
        ],
      },
      {
        title: "Ücret ve destek (kaynak özetleri)",
        paragraphs: [
          "AB vatandaşlarının çalışma izni olmadan çalışabildiği; üç aydan uzun çalışmak için geçici oturum belgesi başvurusunun gerekli olduğu kaynakta belgium.be ve europa.eu “work abroad” sayfalarına atıf yapılır.",
          "Valoni’de öğrenciler için program süresinin yasal yaşa bağlı olarak iki veya üç yıl; işsizler için altı ay ile iki yıl arasında değişebildiği; çıraklığın sözleşme ve genel iş hukuku hükümlerine tabi olduğu; ücret ve yan hakların sözleşme, yaş ve sektöre göre değiştiği ve sysfal.be sitesine bakılması önerildiği yazılır.",
          "IBO sırasında çıraklık yardımı ve IBO tazminatının VDAB tarafından ödendiği; tutarın yardıma bağlı olduğu; ayrıca ulaşım ve gerektiğinde çocuk bakımı yardımı olduğu belirtilir.",
          "BIS sırasında stajyerin stajyerlik yardımı ve işverenden ulaşım masrafı iadesi aldığı; werk.belgie.be ve vdab.be adreslerine yönlendirme yapıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "tasinma-konut",
    tocLabel: "Taşınma ve konut",
    h2: "Konut arama, kira ve geçici barınma",
    lead: "Kira süresi, depozito ve emlakçı ücreti.",
    accordions: [
      {
        title: "Konut bulma",
        paragraphs: [
          "Belçika’da konut bulmanın nispeten kolay olduğu; kira sözleşmelerinin genelde bir ila üç yıl için yapıldığı ve çoğunlukla iki aylık kira tutarında depozito istendiği belirtilir.",
          "Kiracının emlakçı aracılığıyla kiralık ararken acente ücreti ödemek zorunda olmadığı; yalnızca ev sahibinin acente ücretini ödediği yazılır.",
          "Flemenkçe ve Fransızca bölgelerde “te huur / à louer” veya “te koop / à vendre” yazılı turuncu–siyah tabelaların kullanıldığı; gazete ve internet ilanlarının yanı sıra emlakçıların kullanılabileceği ifade edilir.",
        ],
      },
      {
        title: "Geçici konaklama",
        paragraphs: [
          "Otellerin nispeten pahalı olduğu; gençlik pansiyonları ve pansiyon tipi konaklamanın daha uygun alternatifler olduğu; yerel turizm bilgi merkezlerinden bilgi alınabileceği belirtilir.",
          "Yaz aylarında üniversite kentlerinde öğrenci yurtlarında oda kiralanabildiği; internet ve yerel gazetelerde ilan bulunabildiği; “Services – Kots” ve “Infor Jeunes” (25 yaşa kadar gençler) gibi merkezlerin yararlı bilgi verdiği yazılır.",
        ],
      },
      {
        title: "Konut Kiralama Yasası ve bölgeler",
        paragraphs: [
          "Kiralamanın Mesken Kiralama Yasası’na tabi olduğu; yasanın yalnızca kiracının asıl ikametgâhı olarak kullandığı ve ev sahibinin rızasıyla kiralanan meskenlere uygulandığı; kiracının gerçekten ana ikamet olarak işgal etmesi gerektiği belirtilir.",
          "28 Şubat 1991 öncesi süresiz kira sözleşmelerinin istisna sayıldığı; 1991 sonrası süresiz kira sözleşmesi yapılamadığı ve tüm kiraların süreli olduğu yazılır.",
          "Altıncı devlet reformundan sonra kira mevzuatının bölgelere devredildiği; Valoni, Brüksel Başkent Bölgesi ve Flaman Bölgesi konut portallarına bakılması önerildiği ifade edilir.",
          "Standart sürenin sözleşmede başka süre belirtilmemişse dokuz yıl; üç yıl veya daha kısa kısa süreli; dokuz yıldan uzun uzun süreli; kiracının ömrü boyunca süren “ömür boyu” kira seçeneklerinin bulunduğu belirtilir.",
          "Depozito sisteminin yasayla zorunlu kılınmadığı; yalnızca sözleşmede öngörülürse zorunlu olduğu; kiranın yanında kullanım giderleri veya gerçek masrafların ayrı gösterilmesi gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "ab-kayit",
    tocLabel: "AB kayıt ve varış",
    h2: "Bildirim, Annex 19 ve Annex 8",
    lead: "Kayıt numarası; banka ve sağlık için önkoşul.",
    accordions: [
      {
        title: "Kayıt ve ikamet belgeleri",
        paragraphs: [
          "Kayıt olunca banka hesabı açma, kamu istihdam servisine yazılma, sağlık sigortası fonuna kayıt, konut, internet veya enerji tedarikçileri gibi birçok adımda kullanılan ulusal kayıt numarası alındığı belirtilir.",
          "AB vatandaşının varışta varlığını belediyeye bildirmesinin uygun olduğu; ikamet yerindeki belediyeye varıştan itibaren on iş günü içinde bildirimde bulunulabileceği yazılır.",
          "Bildirimin ücretsiz “Déclaration de présence / notification of presence” (8 Ekim 1981 tarihli kraliyet kararnamesi Annex 3ter) verdiği; bunun oturma izni olmadığı ifade edilir.",
          "AEA uyruklularının üç aya kadar kalışta ilke olarak yalnızca varlık bildiriminin yeterli olduğu belirtilir.",
          "Üç aydan uzun kalmak isteyenlerin varıştan itibaren üç ay içinde belediyeye Annex 19 (kayıt sertifikası başvurusu) ile kayıt başvurusu yapması gerektiği yazılır.",
          "Annex 8 (kayıt sertifikası) için belediyeye belgeler sunulması gerektiği; Annex 19’da hangi belgelerin istendiğinin açıkça yazıldığı; tüm belgelerin başvurudan itibaren üç ay içinde tamamlanması gerektiği belirtilir.",
        ],
      },
      {
        title: "Varış öncesi ve sonrası kontrol listesi",
        paragraphs: [
          "Geçerli pasaport veya kimlik kartı; kalış süresinden bağımsız bazı ikamet formaliteleri; mesleki faaliyet için gerekli yetkilendirmeler; Belçika sosyal güvenlik katkı rejimi; Belçika sağlık fonuna katılım belgeleri ve acil durumlar için Avrupa Sağlık Sigortası Kartı hakkında önceden bilgi alınması önerilir.",
          "Belçika’da çalışıyorsanız vergilendirme, çifte vergilendirme anlaşması, çalışanlar için stopaj ve gelir beyanı yükümlülükleri; bankayı bilgilendirme; posta yönlendirme; ilk ay için geçici konut ve yeterli mali kaynak; elektrik ve gaz sözleşmelerinin güncellenmesi anlatılır.",
          "Banka hesabı için Belçika’da düzenlenmiş kimlik örneği, ikamet belgesi ve ulusal kayıt numarası gerektiği; yalnızca uluslararası pasaportla belirli koşullarda hesap açılabildiği; havale için IBAN ve BIC (SWIFT ile aynı) bilgisinin tercih edildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sozlesmeler",
    tocLabel: "İstihdam sözleşmeleri",
    h2: "3 Temmuz 1978 tarihli iş sözleşmeleri kanunu",
    lead: "Süre, hizmet hacmi ve özel sözleşmeler.",
    accordions: [
      {
        title: "Sözleşmenin unsurları ve geçerlilik",
        paragraphs: [
          "İstihdam sözleşmesinin işçinin ücret karşılığında işverenin otoritesi altında çalışmayı üstlendiği anlaşma olduğu; dört temel unsurun sözleşme, iş, ücret ve işveren otoritesi (bağımlılık ilişkisi) olduğu belirtilir.",
          "Bu unsurlar fiilen varsa sözleşmenin var olduğu; biri eksikse istihdam sözleşmesi olmadığı yazılır.",
          "Geçerlilik için belirli şartların ve bazı durumlarda yazılı şeklin zorunlu olduğu; ilke olarak yazılı olmamasının geçerliliği engellemediği; uygulamada işverenlerin kanıt sorunlarını önlemek için yazılı sözleşme kullandığı ifade edilir.",
          "Süreli sözleşme, belirli iş sözleşmesi, vekil sözleşme, yarı zamanlı, öğrenci, ev işleri, geçici işçilik gibi yazılı zorunluluğu olan sözleşmeler ile rekabet yasağı, öğrenme ve ticari temsilci komisyonu maddelerinin yazılı olması gerektiği sayılır.",
          "Deneme süresinin 1 Ocak 2014’ten itibaren ilke olarak kaldırıldığı; öğrenci ve geçici / geçici işçilik sözleşmelerinde sürdüğü belirtilir.",
        ],
      },
      {
        title: "Süre ve hizmet hacmine göre türler",
        paragraphs: [
          "Süresiz sözleşmede bitiş tarihi öngörülmediği; süreli sözleşmede belirli tarih veya bilinen bir olayın gerçekleşmesiyle sona erme öngörüldüğü yazılır.",
          "Tam zamanlı sözleşmenin şirketteki azami çalışma saatleri için yapıldığı; yarı zamanlının şirket normundan kısa süreler için yapıldığı belirtilir.",
          "Mevsimlik iş için tek tip düzenleme olmadığı; üretim zirvelerinde günlük sözleşmeyle günlük kayıt formunun tarım ve bahçecilikte istihdam sözleşmesinin yerini alabildiği; turizm ve konaklamada özel sözleşme türleri, flexi-job ve en fazla iki ardışık günlük sözlü yazı gerektirmeyen “casual” işçi kullanımının anlatıldığı kaynakta belgium.be ve VDAB bağlantılarına atıf vardır.",
        ],
      },
      {
        title: "Dil rejimi",
        paragraphs: [
          "Şirket ilişkilerinde kullanılacak dilin işyerinin bulunduğu belediyeye göre belirlendiği; Flemenkçe bölgede Flemenkçe, Fransızca bölgede Fransızca, Almanca bölgede Almanca belgelerin kullanılması gerektiği yazılır.",
          "İki dilli Brüksel Başkent Bölgesi’nde Flemenkçe personel için Flemenkçe, Fransızca personel için Fransızca belge düzenlenmesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-calisma-suresi",
    tocLabel: "Ücret ve çalışma süresi",
    h2: "GMMI, kesintiler ve haftalık süre",
    lead: "Kollektif sözleşmeler; yasal taban ve fazla mesai oranları.",
    accordions: [
      {
        title: "Ücretlendirme ve GMMI",
        paragraphs: [
          "Ücretlerin yasayla sabitlenmediği; çoğunlukla işveren sendikaları ile toplu iş sözleşmeleriyle belirlendiği; şirket veya sektör bazlı anlaşmaların tüm işçilere uygulandığı belirtilir.",
          "İstihdam sözleşmesinde brüt maaşın yazılması gerektiği; brüt tutardan sosyal güvenlik ve gelir vergisi kesintileri yapıldığı; net ücretin elde edildiği yazılır.",
          "Özel sektör çalışanları için sosyal güvenlik kesintisinin brüt maaşın yüzde 13,07’si olduğu; kesintilerin Belçika Ulusal Sosyal Güvenlik Ofisine (ONSS) ödendiği ve emeklilik, işsizlik, sağlık geri ödemesi ve çocuk yardımı gibi amaçlarla kullanıldığı belirtilir.",
          "Belirli bir ücret ölçeği yoksa işçilerin garantili aylık asgari gelire (GMMI) hak ettiği; GMMI’nin ücretin mutlak alt sınırı olduğu ve sektörlerarası toplu iş sözleşmesiyle belirlendiği yazılır.",
          "Tam zamanlı çalışan ve en az on sekiz yaşındaki tüm işçiler için brüt asgari ücretin Temmuz 2024’ten beri ayda 2.070,48 EUR olduğu; on sekiz yaş altı ve yirmi bir yaş altı öğrenciler için daha düşük tutarların yaşlarına göre geçerli olduğu ifade edilir.",
          "Ücretin en az ayda bir beyaz yakalılar için, ayda iki kez mavi yakalılar için ödenmesi gerektiği; ilgili dönemi izleyen dört iş günü sonuna kadar ödeme (topluluk sözleşmesi veya iş düzeniyle en fazla yedi iş gününe kadar uzayabildiği) belirtilir.",
        ],
      },
      {
        title: "Çalışma süresi, esneklik ve fazla mesai",
        paragraphs: [
          "Çalışma süresinin (işçinin işverenin emrinde olduğu zaman) günde sekiz saati ve yıllık ortalamada haftada otuz sekiz saati aşmaması gerektiği; yasal süre ve gece dışında Pazar ve resmî tatillerde çalışmanın ilke olarak yasak olduğu yazılır.",
          "Önceden izinle veya izinsiz muafiyetlerin mümkün olduğu; bazı durumlarda günlük on bir ve haftalık elli saate kadar uzatılabildiği; işverenin önceden izin talep etme sorumluluğunun bulunduğu belirtilir.",
          "Esnek çalışma saatleri ile esnek çalışma zamanının karıştırılmaması gerektiği; ikincisinin işe başlama ve bitiş saatlerinde daha fazla özgürlük sağladığı; esnek saatlerin toplu sözleşme veya iş düzeniyle belirlendiği ve normal süreyi aşabildiği (günde dokuz ve haftada kırk beş saati geçmeden) yazılır.",
          "Yasal süreyi aşan çalışmada telafi izni verilmesi gerektiği; fazla mesainin normal ücretin en az yüzde 150’si, Pazar veya resmî tatilde yüzde 200’si olarak ödendiği belirtilir.",
          "Pazar çalışmasının yasak olduğu; şirketin normal işinin başka güne kaydırılamadığı durumlar ile otel, sağlık gibi kuruluşlarda istisna bulunduğu; Pazar çalışanlarına izleyen altı gün içinde telafi izni verilmesi gerektiği yazılır.",
          "Gece çalışmasının sendikalarla toplu iş sözleşmesi gerektirdiği; otel, eğlence, gazete yayıncılığı, sağlık, önleyici sağlık ve hijyen, eczane, tarım, zanaat fırın ve pastaneler, eğitim ve konaklama gibi işlerde istisnaların sayıldığı belirtilir (kaynak metinde saat aralığı ifadesi okunaklılık sorunları içerdiğinden burada tekrarlanmamıştır).",
        ],
      },
      {
        title: "Öğrenci çalışması",
        paragraphs: [
          "Öğrenci istihdam sözleşmesi için tam zamanlı eğitimde kayıtlı ve en az on beş yaşında (tam zamanlı eğitim yükümlülüğü olmaması koşuluyla) veya on altı yaşında olunması gerektiği; sözleşmenin süreli yapılması gerektiği belirtilir.",
          "Öğrencinin tanımının tam veya (belirli şartlarla) yarı zamanlı orta, yüksek veya üniversite eğitiminde kayıtlı genç olduğu yazılır.",
          "AEA veya İsviçre’den gelen yabancı öğrencilerin Belçika’da ders almasalar bile Belçikalı öğrencilerle aynı hak ve yükümlülüklere sahip olduğu ifade edilir.",
          "Öğrencilerin azaltılmış sosyal güvenlik katkılarıyla yılda en fazla altı yüz saat çalışabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izin-tatil",
    tocLabel: "İzin ve tatiller",
    h2: "Yıllık izin, özel izinler ve resmî günler",
    lead: "Mavi yakalı / beyaz yakalı hesap farkları.",
    accordions: [
      {
        title: "Yıllık izin ve özel izinler",
        paragraphs: [
          "Tam zamanlı çalışanların genelde yılda dört hafta izin hakkı bulunduğu ve buna tatil ücreti (holiday pay) bağlandığı; mavi yakalı, beyaz yakalı, çırak, sanatçı ve memurlar için izin günü ve tatil ücreti hesabının farklı olduğu belirtilir.",
          "Önemli aile olayları, medeni yükümlülükler veya mahkeme için normal maaşlı izin hakkı bulunduğu yazılır.",
          "Mücbir sebeplerle işten uzak kalma hakkının; öngörülemeyen ve işçinin acil müdahalesini gerektiren olaylar için geçerli olduğu; örnek olarak aynı hanedeki kişinin kazası veya evin yangın gibi zarar görmesi sayıldığı belirtilir.",
          "Bu iznin takvim yılında on iş gününü aşmaması ve ücretsiz olduğu; işveren ve çalışanın aksini kararlaştırması hâlinde ücretli olabileceği ifade edilir.",
          "Kamu sektöründe kariyer arası, özel sektörde zaman kredisi ve tüm sektörlerde ebeveyn izni, palyatif bakım ve tıbbi yardım gibi tematik izin sistemlerinin bulunduğu; bu dönemlerde belirli koşullarda yardım alınabileceği yazılır.",
          "Özel sektörde eğitime devam etmek için ücretli eğitim izni hakkından bahsedilir.",
        ],
      },
      {
        title: "On ulusal resmî tatil",
        paragraphs: [
          "1 Ocak Yılbaşı; Paskalya Pazartesi; 1 Mayıs İşçi Bayramı; yükseliş (Paskalya’dan sonraki altıncı Perşembe); Beyaz Pazartesi (Paskalya’dan sonraki yedinci Pazartesi); 21 Temmuz Ulusal Bayram; 15 Ağustos Göğe Kabul; 1 Kasım Tüm Azizler; 11 Kasım Ateşkes; 25 Aralık Noel olarak listelenir.",
          "Federal kamu hizmetlerinin ayrıca 2 Kasım, 15 Kasım (Kral bayramı) ve 26 Aralık’ta kapalı olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "isten-ayrilma-emeklilik",
    tocLabel: "İş sonu ve emeklilik",
    h2: "İhbar, haklı fesih ve emeklilik yaşı",
    lead: "C4 formu; üç emeklilik sistemi.",
    accordions: [
      {
        title: "Fesih ve ihbar",
        paragraphs: [
          "Tarafların belirli koşullara uyarak sözleşmeyi her zaman sona erdirebildiği; ihbar süresine uyma, fesih tazminatı ödeme ve işverenin feshinin işten çıkarma, çalışanınkinin istifa olarak adlandırıldığı yazılır.",
          "Süresiz sözleşmede tarafların ihbar süresince çalışmaya devam (notice) veya tazminat karşılığında derhal fesih seçebildiği; ihbarın yazılı olması ve başlangıç ile süreyi belirtmesi gerektiği belirtilir.",
          "İhbar süresinin sözleşme başlangıcı (1 Ocak 2014 öncesi veya sonrası), feshi başlatan taraf (işveren veya çalışan) ve mavi yakalı / beyaz yakalı ayrımına bağlı olduğu yazılır.",
          "İş ilişkisi sonunda işverenin çeşitli sosyal belgeler ve sözleşmenin başlangıç ve bitiş tarihi ile işin niteliğini gösteren C4 formunu vermesi gerektiği belirtilir.",
          "Haklı fesih (good cause) ile bildirimsiz ve tazminatsız sona erdirmenin mümkün olduğu; ciddi ihlalin kanıtlanması ve prosedüre uyulmaması halinde feshin geçersiz sayılabileceği yazılır.",
        ],
      },
      {
        title: "Emeklilik",
        paragraphs: [
          "Üç ayrı emeklilik sisteminin çalışanlar, serbest meslek ve memurlar için var olduğu; katkı ve aylıkların her şemada farklı olduğu belirtilir.",
          "İlke olarak yasal emeklilik yaşının kırk beş yıllık kariyer için üç modelde de altmış beş olduğu; belirli koşullarda erken emekliliğin mümkün olduğu; yasal emeklilik yaşının 2025’te altmış altı, 2030’da altmış yedi olacağı yazılır.",
          "Serbest meslek için INASTI; memur veya çalışan kariyeri için federal emeklilik servisi (SFP); AB, Norveç, İzlanda, Lihtenştayn ve İsviçre dışında çalışıp ONSS’ye prim ödeyenler için denizaşırı sosyal güvenlik ofisinin (ONSS) sorumlu olduğu ifade edilir.",
          "Aylığın iş geçmişi, maaş ve aile durumu parametrelerine göre hesaplandığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendikalar ve grev",
    h2: "Örgütlenme özgürlüğü ve toplu iş barışı",
    lead: "FGTB, ACV, CSC ve CCT dönemi içi barış.",
    accordions: [
      {
        title: "Sendikalar",
        paragraphs: [
          "1831 anayasasından beri dernek kurma özgürlüğünün; sendika kurma, seçme, üye olmama ve ayrılma hakkını garanti ettiği; Belçika’da çalışanların yarısından fazlasının sendika üyesi olduğu belirtilir.",
          "Üç ana konfederasyonun FGTB, ACV (CGSLB), CSC olduğu; sendikaların Brüksel, Valoni ve Flaman gruplarına ayrıldığı yazılır.",
          "Sendikaların işsizlik ödeneği başvurularında yardım, iş–işsizlik hukuku, iş kazası anlaşmazlıkları için hukuk hizmeti ve aktif iş arama izleme çerçevesinde destek verdiği; genç işçiler için “genç sendika” programları bulunduğu belirtilir.",
        ],
      },
      {
        title: "Grev ve lokavt",
        paragraphs: [
          "Yasada “grev” tanımının bulunmadığı; grevin işten çekilme niyeti olmadan geçici iş durdurması ve genelde toplu nitelikte olduğu yazılır.",
          "Toplu iş sözleşmesi (CCT) imzalanırken tarafların anlaşma süresince hükümlere uyarak sosyal barışı garanti ettiği; anlaşmazlıkta önce uzlaşma yollarının tüketilmesi gerektiği belirtilir.",
          "Grev veya lokavt bildiriminin kayıtlı mektupla ortak komite başkanına veya işverene ya da lokavtta ilgili sendikalara yapılması ve bildirim süresine uyulması gerektiği; süre ve yöntemin genelde ortak komite prosedüründe tanımlandığı yazılır.",
          "Usule aykırı grev veya lokavtın temsilci işveren veya sendikalar tarafından desteklenmediği; gerçek grevin işin tamamen durması olduğu; yavaş çalışmanın (go-slow) gerçek grev sayılmayıp disiplin cezasına yol açabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "2024 gelir dilimleri (2023 mali yılı geliri)",
    lead: "İlerlemeli tarife ve vergi başlangıç muafiyeti.",
    accordions: [
      {
        title: "Gelir vergisi dilimleri (kaynak tablo)",
        paragraphs: [
          "Kaynak metinde 2024 için (2023 mali yılı geliri) tablo şu şekilde verilir: 15.200 EUR’a kadar yüzde 25; 15.200,01–26.830 EUR arası yüzde 40; 26.830–46.440 EUR arası yüzde 45; 46.440 EUR üzeri yüzde 50.",
          "Gelir türüne, vergilendirilebilir dönem giderlerine, emeklilik fonu katkıları gibi indirim unsurlarına göre çeşitli vergi indirimi ve ekleri öngörüldüğü; uzman danışmanlığın yararlı olacağı belirtilir.",
          "Belçika’da ikamet edenlerin haziran sonuna kadar vergi beyanı sunması gerektiği; yerel vergilerin yere göre değiştiği; “Tax-on-web” ile çevrimiçi beyan yapılabildiği yazılır.",
        ],
      },
      {
        title: "Yaşam maliyeti",
        paragraphs: [
          "Belçika’nın rahat bir yaşam standardı sunan ancak yaşam maliyetinin oldukça yüksek olduğu kabul edilen bir ülke sayıldığı; enerji ve konut gibi günlük tüketim fiyatlarının bölgeye ve şehir büyüklüğüne göre değiştiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Zorunlu sağlık sigortası ve okul sistemi",
    lead: "RIZIV / INAMI ve üç topluluk.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Sağlık hizmetinin tüm ikamet edenler arasında dayanışma ilkesine dayalı zorunlu sağlık sigortası üzerine kurulduğu; finansmanın gelire orantılı sosyal katkılardan geldiği ve sistemin ücretsiz olmadığı belirtilir.",
          "Sağlık hizmetinin tıbbi bağımsızlık ve sağlayıcı / kurum seçim özgürlüğü üzerine kurulduğu; ödemenin çoğunlukla geri ödeme esasına dayandığı yazılır.",
          "RIZIV/INAMI’nin bütçeyi sigorta fonlarına aktardığı; fonların zorunlu sigorta kapsamındaki sağlık harcamalarını ve uzun süreli hastalıkta ikame geliri ödediği; tüm ikamet edenlerin bir fon veya Hulpkas/Caisse Auxiliaire seçmek zorunda olduğu belirtilir.",
          "İsteğe bağlı tamamlayıcı sigortanın hastanede tek kişilik oda gibi kısmen veya hiç karşılanmayan hizmetler için alınabildiği yazılır.",
        ],
      },
      {
        title: "Eğitim ve zorunluluk (kaynakta iki anlatım)",
        paragraphs: [
          "“Okul bulma” bölümünde zorunlu eğitimin altı ile on sekiz yaş arasında on iki yıl sürdüğü; anaokulunun iki buçuk yaştan (Almanca konuşan toplulukta üç yıl) başlayabileceği; ilkokulun altı, ortaöğretimin on iki yaştan itibaren başladığı; tam zamanlı zorunluluğun on beş yaşına kadar olduğu ve on beşten sonra yarı zamanlı eğitime geçilebildiği yazılır.",
          "Kaynağın “Eğitim sistemi” başlığında zorunlu eğitimin beş ile on sekiz yaş arasında on üç yıl sürdüğü; anaokulunun iki buçuk yaştan (Almanca konuşan toplulukta üç yıl) mümkün olduğu; ilkokulun altı yıl, ortaöğretimin altı yıl ve on iki yaşta başladığı; ortaöğretimin genel, teknik, sanat ve meslek dört yolu olduğu belirtilir.",
          "Yükseköğretimin üniversite ve üniversite dışı eğitimden oluştuğu; Flaman Bölgesi için ond.vlaanderen.be, Valoni–Brüksel Federasyonu için enseignement.be, Almanca topluluk için ostbelgienbildung.be adreslerine atıf yapıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "ulasim",
    tocLabel: "Ulaşım",
    h2: "Havaalanları, tren ve toplu taşıma",
    lead: "Brüksel Ulusal Havaalanı Diabolo ek ücreti.",
    accordions: [
      {
        title: "Havaalanları ve tren",
        paragraphs: [
          "Uluslararası trafiği karşılayan havaalanlarının Brüksel-National (Zaventem), Charleroi (Brüksel Güney), Liège, Ostend ve Antwerp (Deurne) olduğu belirtilir.",
          "Brüksel Ulusal Havaalanı tren istasyonunda biniş öncesi tren bileti yanında “Diabolo” ek ücretinin ödenmesi gerektiği yazılır.",
          "Fransa ile TGV/Eurostar, Almanya ve Hollanda ile ICE/Eurostar, Birleşik Krallık ile bağlantıların bulunduğu; Paris CDG ve Amsterdam Schiphol’a Brüksel Midi’den yaklaşık bir buçuk saat süren doğrudan trenlerle ulaşılabildiği ifade edilir.",
        ],
      },
      {
        title: "Şehir içi ulaşım",
        paragraphs: [
          "Flaman Bölgesi’nde neredeyse tüm otobüs hatlarının De Lijn, Brüksel’de STIB, Valoni’de TEC tarafından işletildiği; biletlerin istasyonda, uygulamadan veya SMS ile alınmasının sürücüden almaktan uygun olduğu belirtilir.",
          "Antwerp, Brüksel, Charleroi ve Gent’te tram ve metro bulunduğu; Liège’de tram hattının 2024–2025’te devreye alınmasının planlandığı yazılır.",
          "Taksi ücretinin taksimetreyle belirlendiği; sokaktan el kol sallayarak durdurmanın yaygın olmadığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "siyasi-yapi",
    tocLabel: "Yönetim ve istihdam",
    h2: "Federal devlet ve dört kamu istihdam servisi",
    lead: "ONEM ve bölgeler.",
    accordions: [
      {
        title: "Siyasi yapı",
        paragraphs: [
          "Belçika’nın 1830’dan beri bağımsız federal devlet ve anayasal monarşi olduğu; temel seçim ilkelerinin anayasada yer aldığı ve oransal temsil ile evrensel oy kullanıldığı belirtilir.",
          "Diğer ülke uyruklularının (AB üyesi ve üçüncü ülkeler) belirli koşullarda belediye seçimlerinde oy kullanabildiği; AB dışı ikamet edenlerin 2006’dan beri belediye seçimlerinde oy kullanabildiği yazılır.",
          "Federal yasama seçimlerinin beş yılda bir, bölgesel ve Avrupa seçimlerinin beş yılda bir, belediye ve il seçimlerinin altı yılda bir yapıldığı belirtilir.",
          "Belçika’nın topluluklar ve bölgelerden oluşan federal devlet olduğu; yetkilerin yalnızca federal hükümet ve parlamentoda toplanmadığı; bölgeler ve toplulukların yetki alanlarında karar alabildiği yazılır.",
          "Üç resmî dilin Flemenkçe, Fransızca ve Almanca olduğu; üç topluluğun Flaman Topluluğu, Fransızca Topluluk (Valoni–Brüksel Federasyonu) ve Almanca konuşan topluluk olduğu belirtilir.",
          "On il ve beş yüz seksen bir belediye bulunduğu; federal düzeyde dışişleri, savunma, adalet, maliye ve sosyal güvenlik gibi alanların kaldığı; bölgelerin ve toplulukların yetki alanında yabancı ülkelerle ilişki kurabildiği yazılır.",
        ],
      },
      {
        title: "İş arayanlar için kurumlar",
        paragraphs: [
          "İş arayanlara dört kamu hizmetinin yardım ettiği: Brüksel Başkent Bölgesi Actiris, Valoni Forem, Flaman Bölgesi VDAB, Almanca topluluk ADG.",
          "Ulusal İş Ofisi’nin (ONEM / RVA–ONEM çift dilli sitesi) işsizlik ödeneği ve bazı istihdam önlemlerinden sorumlu olduğu belirtilir.",
        ],
      },
      {
        title: "Serbest meslek (kaynakta özetlenen adımlar)",
        paragraphs: [
          "Serbest mesleklinin birincil veya yan faaliyet olarak istihdam sözleşmesine tabi olmadan çalıştığı; ticaret, serbest meslekler, zanaat, tarım ve hayvancılık gibi faaliyetleri kapsadığı; zanaat hariç en az on sekiz yaşında olunması gerektiği; zanaatta veli izniyle on altı yaşın mümkün olduğu belirtilir.",
          "Kişisel hesaptan ayrı bir vadesiz işletme hesabı açılması; onaylı girişimcilik tek durak bürosuna kayıt olunması; ticaret veya zanaat sektöründe Crossroads Bank for Enterprises (CBE) kaydının yetkili tek durak bürolarında yapılması ve mesleği icra etme hakkını gösteren belgelerin (iş becerisi, düzenlenmiş mesleklerde mesleki yeterlilik, diploma, lisans vb.) sunulması gerektiği yazılır.",
          "Yetkili tek durak bürosuna kayıttan sonra KDV denetim ofisiyle KDV yükümlülüğünün kontrol edilmesi; gerçek kişilerin vergi ikametinin bulunduğu bölgedeki yetkili mercie, tüzel kişilerin merkezinin bulunduğu bölgedeki mercie başvurulması gerektiği; tek durak bürosunun ücret karşılığı bunu yapabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-destek",
    tocLabel: "Engelli istihdamı",
    h2: "Valoni, Flaman Bölgesi ve Brüksel önlemleri",
    lead: "Federal tanınma ve bölgesel hizmetler.",
    accordions: [
      {
        title: "Valoni (AViQ ve Forem)",
        paragraphs: [
          "Engelliliğe tek bir tanımın bulunmadığı; günlük yaşamda fiziksel, zihinsel, entelektüel veya duyusal engeller sonucu önemli sınırlamalar yaşayan kişinin engelli sayılabildiği özetlenir.",
          "Federal tanınma ve yardımların Sosyal Güvenlik federal kamu hizmeti Engelli Kişiler Genel Müdürlüğü’ne (DGPH) bağlı olduğu; Valoni’de bölgesel otoritenin AViQ olduğu belirtilir.",
          "“My handicap” çevrimiçi portalı üzerinden başvuru ve güncel tıbbi belgelerin eklenebildiği yazılır.",
          "İşverenlere yönelik entegrasyon priminin (Prime à l’intégration) bir yıl için maaş maliyetlerinin yüzde 25’ine kadar iade; çalışma koşullarını uyarlama için yüzde 45’e kadar telafi; mentorluk priminin (Prime au tutorat en entreprise) çeyrek dönemlik iki ödeme (örnek olarak her biri 750 EUR) olduğu belirtilir.",
          "İş arayanlara Forem danışmanlığı, iş yeri uyarlama yardımları ve mesleki uyum sözleşmeleri gibi desteklerden bahsedilir.",
        ],
      },
      {
        title: "Flaman Bölgesi (VDAB, VAPH) ve Brüksel",
        paragraphs: [
          "BM Engelli Hakları Sözleşmesi ile uyumlu federal tanımın uzun süreli engellerin engellerle etkileşimde topluma tam katılımı zorlaştırabileceği şeklinde özetlendiği yazılır.",
          "Federal tanınmanın gelir ikame aylığı, entegrasyon aylığı, artırılmış çocuk yardımı, otopark kartları ve bazı vergi indirimlerine kapı açtığı; Flaman Bölgesi’nde bakım ve kişisel yardım bütçeleri için VAPH’ın sorumlu olduğu belirtilir.",
          "VDAB’ın işe yerleştirme desteği, iş yeri uyarlama ve rehberlik sağladığı; ayrımcılık şikâyetleri için Unia’ya başvurulabileceği yazılır.",
          "Brüksel’de federal Handicap.belgium, bölgesel Handicap.brussels, Fransızca topluluk PHARE, Flaman topluluğu VAPH ve Actiris’in “Handicap et Emploi” hizmetinin anıldığı belirtilir.",
          "Actiris’in işverenlere Activa.Brussels “disability” önlemi ile maaş maliyeti indirimi ve engelli kişi işe alındığında mesleki uyum maliyetleri için tek seferlik 5.000 EUR “disability bonus” (Prime Handicap) sunduğu yazılır.",
          "PHARE’ın keşif stajı, mesleki uyum sözleşmesi, entegrasyon primi, mentorluk primi ve kapsayıcılık bilinçlendirme primi gibi işveren desteklerinden bahsedilir.",
        ],
      },
    ],
  },
];
