import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Denmark” (01/09/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const DANIMARKA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Danimarka’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Yerel Jobcenter ve jobnet.dk, Workindenmark ve İngilizce iş bankası, başvuru ve mülakat pratiği, şirket stajı ile ücret sübvansiyonlu istihdam, meslekî eğitim (VET) ve çıraklık (laerepladsen.dk), konut arama ve büyük şehir fiyatları, folkeskole ve uluslararası okullar, AB/EEA ve İsviçre için oturum belgesi (SIRI), CPR ve vergi kartı, ICS birleşik hizmet, yazılı iş sözleşmesi ve toplu iş sözleşmesi modeli, ücretlendirme ve isteğe bağlı işsizlik sigortası (A‑kasse), çalışma süresi ve tatiller, ebeveyn izinleri, fesih ve funktionærloven ihbarı, vergi ve yaşam maliyeti, sarı sağlık kartı, eğitim yapısı ve engelli istihdamına ilişkin kamu bilgileri kaynak metne dayanır.",
  "Metinde geçen oranlar, tavanlar, süreler ve harçlar yayımlandıkları döneme bağlıdır; güncel bilgileri skat.dk, lifeindenmark.borger.dk, nyidanmark.dk ve star.dk üzerinden doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const DANIMARKA_SEO_KEYWORD_TAGS: string[] = [
  "danimarka vize",
  "danimarka schengen",
  "Workindenmark",
  "jobnet Danimarka",
  "SIRI EU residence document",
  "CPR numarası Danimarka",
  "Danimarka iş sözleşmesi",
  "A-kasse işsizlik sigortası",
  "Danimarka vergi skat",
];

export const DANIMARKA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Jobcenter, jobnet.dk ve Workindenmark",
    lead: "Kayıt olmadan yerel Jobcenter’dan ücretsiz yönlendirme; uluslararası adaylar için Workindenmark tamamlayıcıdır.",
    accordions: [
      {
        title: "Jobcenter ve jobnet.dk",
        paragraphs: [
          "Danimarka’da iş ararken kayıt olmadan ve ücretsiz olarak yerel Jobcenter’da danışmanlık ve yerel fırsatlara genel bakış alınabildiği yazılır.",
          "Ülke genelinde doksan dört merkez bulunduğu; doksan sekiz belediyenin neredeyse tamamında temsil olunduğu; bazı belediyelerin ortak Jobcenter kullandığı belirtilir.",
          "Jobcenter’ların kişisel iş aramayı kolaylaştıran rehberlik ve araç kullanımına yardım sunduğu ifade edilir.",
          "jobnet.dk sitesinin tüm ülkedeki iş arayanlar ve işverenler için çevrimiçi hizmet olduğu; CV kaydı, iş ajanı atanması ve geniş veri tabanında ilan aranmasının mümkün olduğu yazılır.",
          "Yerel Jobcenter’ın jobnet.dk ve workindenmark.dk üzerinden bulunabileceği belirtilir.",
        ],
      },
      {
        title: "Workindenmark",
        paragraphs: [
          "Workindenmark’ın Danimarka şirketleri ve uluslararası çalışanlar için kamu istihdam hizmeti olduğu; Odense’de merkez ve workindenmark.dk portalından oluştuğu; ülke çapındaki Jobcenter hizmetine ek olduğu yazılır.",
          "Yüksek nitelikli aday ihtiyacı olan sektör ve şirketlere hedefli işe alım desteği verildiği; iş arayan ve her tür şirkete Danimarka’da çalışma veya uluslararası iş gücü işe alma konusunda hizmet sunulduğu belirtilir.",
          "Portalda İngilizce iş ilanı araması, iş ajanı kurma ve vergi, maaş, sağlık güvencesi, kayıt belgeleri, oturum ve çalışma izinleri ile Danimarka’da yaşam hakkında İngilizce bilgilerin bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Sınır ve bölgesel kaynaklar",
        paragraphs: [
          "Danimarka–Almanya sınır işçileri için EURES Kompas (eures-kompas.eu) ve Öresund bölgesi için oresunddirekt.com gibi sitelerin anıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru ve mülakat",
    h2: "Tek sayfa başvuru, CV ve seçme süreci",
    lead: "İlanlı başvuru, istemsiz başvuru, veri tabanı ve ağ dört ana yoldur.",
    accordions: [
      {
        title: "Başvuru biçimleri ve içerik",
        paragraphs: [
          "İlanlı başvuru, ilgi duyulan şirkete istemsiz başvuru, CV’nin veri tabanına yüklenmesi ve kişisel ağ üzerinden başvurunun ana yollar olduğu yazılır.",
          "Başvurunun en fazla bir net ve okunaklı A4 sayfasını doldurmaması gerektiği; her zaman CV eklendiği; iş deneyimi, eğitim, kurslar, uzmanlık ve hobilerin anlatıldığı belirtilir.",
          "İlgili diploma, kurs sertifikaları ve önceki işveren tavsiyelerinin eklenmesinin önerildiği ifade edilir.",
          "Başvuru metninin motivasyonu ve adayın neden en uygun kişi olduğuna dair izlenim vermesi beklendiği yazılır.",
        ],
      },
      {
        title: "Süreç ve mülakat",
        paragraphs: [
          "Şirketin başvuruyu aldığına dair genelde onay gönderdiği; kesin yanıtın başvuru süresi sonrasında ve mülakat çağrısıyla gelebildiği belirtilir.",
          "Birçok meslekte kişilik testleri dâhil farklı seçim araçları kullanıldığı; çoğu zaman birden fazla mülakat turunun olduğu ifade edilir.",
          "Workindenmark’tan her zaman danışmanlık alınabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "staj-ve-meslek-egitimi",
    tocLabel: "Staj ve meslekî eğitim",
    h2: "Şirket stajı, ücret sübvansiyonu ve VET çıraklığı",
    lead: "Yerel Jobcenter uygulamaları yönetir; VET iki yollu ve 106 uzmanlık içerir.",
    accordions: [
      {
        title: "İki tür süreli staj (işsizlik politikası)",
        paragraphs: [
          "İşsizlerin olağan bir iş bulma olasılığını artırmak için iki süreli staj türünün bulunduğu: şirkette staj yerleştirmesi ve ücret sübvansiyonlu istihdam olduğu yazılır.",
          "Şirket stajının iş hedeflerini netleştirmeye veya normal ücret ve koşullarda iş bulmada zorlananlar için kullanıldığı; sürenin önceki deneyime göre dört–on üç hafta olabildiği; bazı gruplara daha uzun staj teklif edilebildiği belirtilir.",
          "Ücret sübvansiyonlu istihdamın meslekî, sosyal veya dil yeterliliklerini eğitmek veya piyasada tutmak amacı taşıyabildiği; tipik sürenin üç aya kadar uzayabildiği ve en fazla altı aya çıkabildiği ifade edilir.",
          "Danimarka vatandaşlarının Aktif İstihdam Çabaları Kanunu’ndaki hedef gruba (işsizlik veya nakdi yardım alanlar vb.) girmeleri ve koşulları sağlamaları halinde uygun olduğu; diğer EEA ülkesi vatandaşlarına da aynı çerçevenin geçtiği yazılır.",
          "Entegrasyon programına katılan yabancıların Entegrasyon Kanunu’na göre de staj veya sübvansiyonlu istihdam alabildiği; kanun kapsamı dışında kalan ancak “kendi geçimini sağlayan” tanımına uyan işsizlerin de uygunluk halinde teklif alabildiği belirtilir.",
        ],
      },
      {
        title: "Kalite ve işveren yükümlülükleri",
        paragraphs: [
          "Düzenlemelerin yerel Jobcenter tarafından yönetildiği ve içeriğin bireysel ihtiyaca uyarlandığı yazılır.",
          "Ücret sübvansiyonlu istihdamın ilgili şirkette ek istihdam yaratması gerektiği; her iki türde de olağan çalışanlar ile stajyer/sübvansiyonlu personel sayısı arasında makul oranın belgelendirilmesi gerektiği belirtilir.",
          "İşveren ve çalışan temsilcisinin imzasıyla oranın kanıtlanması ve temsilcinin süreçte yer aldığını ve hedeflere inanıp inanmadığını beyan etmesi gerektiği; kamu ve özel işyerlerinde kuralların biraz farklılaşabildiği ifade edilir.",
        ],
      },
      {
        title: "Çıraklık ve VET (Erhvervsuddannelse)",
        paragraphs: [
          "Çıraklık programlarının Meslekî Eğitim ve Öğretim Kanunu’na dayalı tüm VET programlarına dâhil olduğu yazılır.",
          "VET’nin okul temelli teori ile şirkette çıraklık veya staj şeklinde pratik eğitimi dönüşümlü sürdüren iki yollu yapı olduğu; yüz altı farklı uzmanlık bulunduğu; öğrencinin devlet veya işveren maaşı ile finanse edilebildiği belirtilir.",
          "Diğer EEA ülkesinden başvuranların yalnızca iki yollu programa katılarak bu eğitime erişebildiği; öğrenci ile işveren arasında tüm eğitim süresini kapsayan anlaşma gerektiği ifade edilir.",
          "Eğitim sırasında maaşın yaşa ve programa göre ayarlandığı; çıraklık ilanlarının laerepladsen.dk üzerinden aranabildiği ve VET kurumlarının staj yerleştirmede yükümlü olduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut-okul",
    tocLabel: "Taşınma, konut ve okul",
    h2: "İnternet ile konut, folkeskole ve uluslararası seçenekler",
    lead: "Kopenhag, Odense, Aarhus ve Aalborg çevresinde fiyatlar belirgin şekilde yükselebilir.",
    accordions: [
      {
        title: "Konut arama",
        paragraphs: [
          "Çalışanların çoğunun özellikle kısa süre için kiralık konut seçtiği; süre ve bütçeye göre mülk veya pay sahibi olmanın da mümkün olduğu; lifeindenmark.borger.dk üzerinden taşınma bilgisi bulunabildiği yazılır.",
          "Büyük şehirlerde uygun konut bulmanın zaman alabildiği ve erken başlanması gerektiği; Kopenhag, Odense, Aarhus ve Aalborg çevresinde fiyatların ülkenin geri kalanına göre belirgin biçimde yüksek olabildiği belirtilir.",
          "İnternetin Danimarka’da konut aramanın en kullanışlı yolu olduğu; ücretsiz ve ücretli portallarda süre, konum, fiyat ve büyüklüğe göre arama ve e‑posta uyarı profili oluşturulabildiği ifade edilir.",
          "Özel kiralama birliklerinin uluslararası çalışanlara kısa veya uzun dönem kiralık sunduğu; ev sahibinin yurt dışına atanması gibi dönemlerde boşalan konutların kullanıldığı yazılır.",
          "Satın alma için emlakçının bilgi ve gösterim sağladığı; büyük işyerlerinin taşınma şirketleri ile anlaşması olabildiği belirtilir.",
        ],
      },
      {
        title: "Okul ve çocuk bakımı",
        paragraphs: [
          "Danimarka’da ikamet eden çocuklara on yıl zorunlu eğitimin (folkeskole) ücretsiz olduğu ve giriş şartı bulunmadığı yazılır.",
          "Kamu eğitiminin vergilerle finanse edildiği; altı–on yaş arası çocuklu ailelerin folkeregister’e kayıt sonrası okul bilgisinin otomatik gönderildiği belirtilir.",
          "Taşınmak istenen belediyenin okul yönetimine danışılabildiği; yabancı dil sunumları hakkında bilgi alınabildiği ifade edilir.",
          "Veli katkılı özel ve uluslararası okulların bulunduğu; çocuk ve eğitim bakanlığı sitesinde uluslararası temel okulların listelendiği yazılır.",
          "On altı yaş üstü ve yurtdışında ortaöğretimini bitirmiş çocukların Danimarka’da üst ortaöğretime hak kazanabileceği; kayıt prosedürü için kurumla doğrudan iletişim gerektiği belirtilir.",
          "Uluslararası IB programlı liselerin yabancı öğrencilere yönelik olduğu; özet listelerin bakanlık sitesinde yer aldığı ifade edilir.",
          "Her iki ebeveynin de çalışmasının yaygın olduğu; belediyelerin kreş, okul öncesi ve okul sonrası bakım hizmeti sunduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "ikamet-cpr",
    tocLabel: "İkamet ve kayıt",
    h2: "AB/EEA hakları, SIRI ve CPR",
    lead: "Üç aydan uzun kalışta AB oturum belgesi, adres ve vergi işlemleri.",
    accordions: [
      {
        title: "Uyruk ve genel ilkeler",
        paragraphs: [
          "İşe gidip gelme veya yabancı şirketten görevlendirme gibi özel durumların bulunduğu; Kuzey ülkeleri, AB/EEA ve üçüncü ülke vatandaşları için kuralların ayrıldığı yazılır.",
          "AB/EEA veya İsviçre vatandaşının oturum izni başvurusu yapmadan Danimarka’da yaşayıp çalışma hakkına sahip olduğu belirtilir.",
        ],
      },
      {
        title: "Üç aydan uzun kalış",
        paragraphs: [
          "Üç aydan uzun kalınacaksa AB oturum belgesi (EU residence document) alınması, adres ve vergi durumunun yetkililere düzgün bildirilmesi gerektiği yazılır.",
          "Belgenin dijital başvuru ve SIRI’da şahsen görünme ile alınabildiği; sürecin nyidanmark.dk’da anlatıldığı ve önceden randevu alınması gerektiği belirtilir.",
          "Kopenhag, Aalborg, Aarhus veya Odense’deki International Citizen Service (ICS) çatısı altında SIRI ve yerel makamların tek çatıda yardım sunduğu ifade edilir.",
        ],
      },
      {
        title: "Varış öncesi ve sonrası pratikler",
        paragraphs: [
          "Pasaport, iş sözleşmesi, gerekiyorsa oturum/çalışma izni, İngilizce veya Danca CV, Danca/İngilizce/Norveç/İsveççe diplomalar (yükseköğretim ve Bilim Bakanlığı’nda değerlendirme için ek dillere izin), tavsiye mektupları, fotoğraf, Avrupa Sağlık Kartı, nüfus kayıt örnekleri ve Danimarka’daki adres kanıtının yanınıza alınması önerildiği yazılır.",
          "İşsizlik sigortasının gönüllü olduğu; A‑kasse üyeliği isteniyorsa memleketteki sigorta hakkının kesilmesinden sonra en geç sekiz hafta içinde kayıt yapılması gerektiği; star.dk’da tüm A‑kasse özetinin bulunduğu belirtilir.",
          "Düzenlenmiş mesleklerde çalışmadan önce yetkilendirme veya yabancı yeterliliğin onaylanması gerektiği; ara sıra hizmet için genelde daha hızlı kayıt prosedürünün olduğu ifade edilir.",
          "Yurtdışı plakalı aracın Danimarka’da yeniden tescil ve SKAT tescil ücreti gerektirdiği; Motorstyrelsen ve lifeindenmark kaynaklarına atıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "On sekiz yaş, yazılı belge ve toplu sözleşme modeli",
    lead: "Tam zamanlı tipik hafta otuz yedi saat ve beş hafta yıllık izin.",
    accordions: [
      {
        title: "Yaş ve sözleşme şekilleri",
        paragraphs: [
          "On sekiz yaşından önce iş sözleşmesinin hukuken bağlayıcı olamayacağı; on üç–on beş yaş arası istihdamda veli bilgilendirmesi, çalışma süreleri ve güvenlik önlemleri gibi özel kurallar bulunduğu yazılır.",
          "Bir aydan uzun ve haftada sekiz saati aşan istihdamda işverenin işe başlamadan bir ay içinde yazılı istihdam kanıtı vermesi gerektiği; yine de kısa yazılı anlaşma istemenin çıkar için iyi olduğu belirtilir.",
          "En yaygın biçimin tam zamanlı çalışan olduğu; çoğu durumda haftanın otuz yedi saat ve yılda beş hafta ücretli izinle ilişkilendirildiği ifade edilir.",
          "Yarı zamanlı, geçici iş ve proje çalışması gibi süreli biçimlerin sözleşmede önceden belirlendiği yazılır.",
          "Serbest meslek ve danışmanlıkta işverenin izin, hastalık veya doğum izni yükümlülüğü üstlenmediği; ekipman ve ofisin çoğu zaman serbest çalışana ait olduğu belirtilir.",
          "Öğrencilerin yan işte tam çalışanla aynı haklara sahip olduğu fakat haftada yaklaşık on–yirmi saat ve saatlik ücretle çalıştığı; eğitim kapsamında öğrenci veya staj pozisyonunun mümkün olduğu ifade edilir.",
          "Yabancı şirketten Danimarka’ya görevlilerin Görevlendirilen İşçiler Kanunu kapsamında hak ve yükümlülüklere tabi olduğu ve yasal kalış dayanağını sağlaması gerektiği yazılır.",
        ],
      },
      {
        title: "Toplu sözleşme ve asgari yasalar",
        paragraphs: [
          "Ücret ve çalışma koşullarının çoğunlukla sendika ile işveren kuruluşları arasında gönüllü toplu sözleşmelerle veya bireysel pazarlıkla belirlendiği; bunların kanunla ayrıntılı düzenlenmediği; ancak Tatil Kanunu, İstihdam Kanıtı Kanunu, Eşit Muamele Kanunu ve hastalık/doğum günlük ödeneği kanunu gibi asgari çerçeveler bulunduğu belirtilir.",
        ],
      },
      {
        title: "Yazılı iş sözleşmesi içeriği",
        paragraphs: [
          "Haftada sekiz saati aşan ve bir aydan uzun süren her çalışan için iş sözleşmesi verilmesinin yasal zorunluluk olduğu; toplu sözleşme kapsamı olsa da olmasa da geçerli olduğu yazılır.",
          "Sözleşmede iş alanı, istihdam biçimi, kararlaştırılan çalışma saatleri ve somut iş yeri gibi bilgilerin yer alması gerektiği; rekabet yasağı ve müşteri yükümlülüklerinin bazen eklenebildiği belirtilir.",
          "Koşullar toplu sözleşmeye bağlıysa sözleşmede buna atıf yapıldığı; uluslararası çalışanların da Danimarka iş piyasasındaki düzenlemelere tabi olduğu ifade edilir.",
          "İşveren ve çalışanın ihbar sürelerinin sözleşmede yazılması gerektiği; çoğu zaman toplu sözleşme veya Ücretli Çalışanlar Kanunu (funktionærloven) koşullarını izlediği yazılır.",
          "Yönetim hakkı çerçevesinde önemsiz değişiklikler yapılabildiği; görev, ücret, çalışma saati veya yer gibi esaslı değişikliklerde ihbar süresi kadar ön bildirim verilmesi ve çalışanın yeni koşulları kabul veya fesih seçeneğinin bulunduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ayrimcilik-ve-resit-olmayanlar",
    tocLabel: "Ayrımcılık ve reşit olmayanlar",
    h2: "forskelsbehandlingloven ve çalışma saatleri üst sınırları",
    lead: "Cinsiyet eşitliği ve İnsan Hakları Enstitüsü danışmanlığı.",
    accordions: [
      {
        title: "Ayrımcılık yasağı",
        paragraphs: [
          "Ayrımcılıktan Korunma Kanunu’nun ırk, renk, din, siyasi görüş, cinsel yönelim, yaş, engellilik veya sosyal/etnik köken gerekçeleriyle iş piyasasında ayrımcılığı yasakladığı yazılır.",
          "Eşit Fırsatlar Kanunu’nun cinsiyet ayrımcılığını yasakladığı ve kadın–erkek eşitliğini teşvik ettiği; kadın işgücü katılımının görece yüksek olduğu belirtilir.",
          "Ulusal köken nedeniyle serbest dolaşım hakkının ihlali durumunda star.dk üzerinden AB yönergesi iletişim noktasına başvurulabileceği ifade edilir.",
        ],
      },
      {
        title: "On üç–on yedi yaş çalışma özeti",
        paragraphs: [
          "On üç–on dört yaşta zorunlu okul günlerinde günde en fazla iki saat, okulsuz günlerde yedi saat; okul haftalarında haftalık on iki saat, tatillerde otuz beş saat üst sınırının bulunduğu yazılır.",
          "Zorunlu eğitime devam eden on beş–on yedi yaşların okul olmayan günlerde günde sekiz saat; okul haftalarında haftada on iki, tatilde kırk saate kadar çalışabildiği belirtilir.",
          "Zorunlu eğitimi bitirmiş on beş–on yedi yaşların yetişkinlerle aynı işte olağan sürelere tabi olabildiği fakat günde sekiz ve haftada kırk saati aşmaması gerektiği; günlük sekiz saat bölünmemesi ve dört buçuk saati aşan iş gününde en az otuz dakika mola hakkı bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "serbest-is",
    tocLabel: "Serbest meslek ve şirket",
    h2: "Virk, CVR ve RUT",
    lead: "AB vatandaşı bağımsız iş kurup yürütmek için kalabilir.",
    accordions: [
      {
        title: "Kuruluş ve CVR",
        paragraphs: [
          "AB vatandaşının Danimarka’da bağımsız iş kurma ve yürütme hakkına sahip olduğu yazılır.",
          "Yeni şirketlerin şirket sözleşmesi imzalandıktan sonra iki hafta içinde Virk üzerinden dijital tescil edilmesi gerektiği; aynı anda KDV ve diğer vergi kayıtlarının yapılabildiği belirtilir.",
          "Gıda sektörü gibi alanlarda Veteriner ve Gıda İdaresi’ne ek kayıt veya yetki gerekebildiği ifade edilir.",
          "Tüm işletmelerin CVR numarasına ihtiyaç duyduğu; numaranın kamu ve özel tarafla iletişimde kullanıldığı yazılır.",
          "Bölgesel Business Hub’larda ücretsiz kuruluş yardımı alınabildiği; virksomhedsguiden.dk’da tipik sorulara yanıt bulunabildiği belirtilir.",
        ],
      },
      {
        title: "Uluslararası hizmet sunumu (RUT)",
        paragraphs: [
          "Yabancı işletmenin Danimarka’da iş yapması halinde Yabancı Hizmet Sağlayıcılar Sicili’ne (RUT) kayıt yükümlülüğü bulunduğu; ayrıntıların workplacedenmark.dk ve virk.dk üzerinde anlatıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-bordro",
    tocLabel: "Ücret ve bordro",
    h2: "Yasal asgari ücret yok; NemKonto ve bordro zorunluluğu",
    lead: "Çoğu sosyal ve sağlık primi vergi kanalıyla tahsil edilir.",
    accordions: [
      {
        title: "Ücretlendirme ve toplu sözleşme",
        paragraphs: [
          "Danimarka’da yasal genel asgari ücret bulunmadığı; ücret ve koşulların kural olarak toplu sözleşme veya bireysel anlaşmayla belirlendiği yazılır.",
          "Sektör için taban ücretin anlaşmada yazılabildiği; sendikaların yıllık ücret istatistiklerinin müzakere için referans olduğu belirtilir.",
          "Aylık, günlük, saatlik ve parça başı ücret sistemlerinin yaygın olduğu; satış işinde provizyon ve bazı sektörlerde performans primi düzenlemelerinin bulunduğu ifade edilir.",
          "Kıdem veya yeterlilik zamlarının çoğu zaman pazarlık konusu olabildiği; toplu sözleşmelerin ek emeklilik düzenlemelerini ve fazla mesai, Pazar, akşam ve gece eklerini kapsadığı yazılır.",
        ],
      },
      {
        title: "Ödeme ve bordro",
        paragraphs: [
          "Saatlik, günlük ve parça ücretlerin kural olarak ayda bir veya iki kez; aylık ücretin ise geriye dönük aylık ödendiği; ödemelerin çoğu zaman NemKonto’ya yapıldığı belirtilir.",
          "İşverenin gelir vergisi ve istihdam kesintilerini düştükten sonra ücreti ödediği; tatil katkısı ve emeklilik birikimine ayrılan kısımları da yönettiği ifade edilir.",
          "Bordronun yasal zorunluluk olduğu ve işveren adı, adres, CVR, çalışan CPR, dönem, brüt, ATP payı, PAYE vergisi, piyasa katkısı, net ödeme, vergi kartı türü ve yıl içi A‑geliri ile kesilen vergi toplamlarını içermesi gerektiği yazılır.",
          "İşsizlik sigortasının isteğe bağlı olduğu ve otomatik olmadığı; A‑kasse üyeliği ile güvence sağlanabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi-izin",
    tocLabel: "Çalışma süresi ve izinler",
    h2: "Otuz yedi saat, AB çerçevesi ve beş hafta tatil",
    lead: "Fazla mesai toplu sözleşmeye veya sözleşmeye göre izin veya ücretle dengelenir.",
    accordions: [
      {
        title: "Günlük düzen ve AB üst sınırları",
        paragraphs: [
          "Normal çalışma saatlerinin anlaşma ile belirlendiği ve çoğu alanda haftada otuz yedi saat olduğu; genelde pazartesi–cuma altı–on sekiz arası çalışıldığı; öğle arasının çoğu zaman otuz dakika olduğu yazılır.",
          "On sekiz yaş üstü için AB Çalışma Süresi Yönergesi çerçevesinde günde en az on bir saat kesintisiz dinlenme, altı saati aşan günde mola, haftada bir kez yirmi dört saat izin (günlük dinlenmeden hemen sonra), ortalama kırk sekiz saatlik hafta ve gece vardiyasında yirmi dört saatte ortalama sekiz saat üst sınırının bulunduğu belirtilir.",
          "Çiftlik ve vardiya işi gibi durumlarda toplu sözleşmelerle bu kurallardan sapılabildiği ifade edilir.",
          "Fazla mesainin bazı işlerde olağan olduğu; telafi izni veya ücretle ödenmesinin sözleşmede açıkça yazılması gerektiği yazılır.",
        ],
      },
      {
        title: "Resmî tatiller ve yıllık izin",
        paragraphs: [
          "Resmî tatillerin Danimarka Kilisesi’nin tanıdığı günler olduğu; yılbaşı, Büyük Perşembe, Cuma, Paskalya, İsa’nın göğe çıkışı, Hamsin ve ertesi gün, Noel ve kutlama ertesi gibi günlerin sayıldığı belirtilir.",
          "Anayasa Günü (beş Haziran), Noel arifesi ve yılbaşı arifesi gibi resmî olmayan tatillerde çoğu kişinin izinli olduğu; işyeri ve toplu sözleşmenin karar verdiği ifade edilir.",
          "Çalışanın yılda işverenden beş hafta ücretli tatil hakkı kazandığı; hakkın maaşla birlikte ödenen tatil veya tatil ikramiyesi şeklinde ya da tatil ödeneği olarak kullanılabildiği yazılır.",
          "Beş haftalık ücretli hakkın oluşmaması halinde yine de beş hafta tatilin bulunduğu fakat ücretsiz olabildiği belirtilir.",
          "Her ay istihdam için iki buçuk sekiz günlük izin kazanıldığı; iznin on iki ay içinde kullanılabildiği ve toplam on altı aylık kullanım penceresinin bulunduğu ifade edilir.",
          "Bir Mayıs–30 Eylül arasında üç haftalık kesintisiz ana tatil (principal leave) alma hakkının olduğu yazılır.",
        ],
      },
      {
        title: "Doğum ve ebeveyn izinleri (özet)",
        paragraphs: [
          "Doğum öncesi dört hafta ve sonrası on hafta annenin hakkı olduğu; babanın doğumdan sonraki on hafta içinde iki hafta babalık izni kullanması gerektiği belirtilir.",
          "Yeni düzenlemelerle her ebeveynin ilke olarak yirmi dört hafta ebeveyn iznine sahip olduğu; bunun on bir haftasının ayrıldığı (ikisi doğumdan hemen sonra, dokuzu çocuk bir yaşına kadar) ve yirmi altı haftanın ebeveynler arasında serbestçe paylaşılabildiği ifade edilir.",
          "Şartları sağlayanların toplam kırk sekiz hafta ebeveyn izni ve dört hafta gebelik izni boyunca günlük yardım alabildiği; Udbetaling Danmark’tan danışmanlık istenebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "fesih-sendika",
    tocLabel: "Fesih, sendika ve grev",
    h2: "Geçerli gerekçe, ihbar ve Danimarka modeli",
    lead: "İflas halinde LG ve ATP güvencesi.",
    accordions: [
      {
        title: "Fesih ve uyarı",
        paragraphs: [
          "İşverenin işten çıkarmada uygun olmama, iş birliği sorunları veya şirketin gerektirdiği ekonomik gerekçeler gibi ciddi bir nedene ihtiyaç duyduğu yazılır.",
          "Performanstan memnuniyetsizlikte genelde bir veya birkaç uyarı verildiği belirtilir.",
          "funktionærloven kapsamındaki çalışanın kendi feshinde bir ay ihbar; işverenin ihbarının hizmet süresine göre bir–altı ay aralığında olduğu ve üç aya kadar deneme veya en fazla bir aylık geçici görevde ihbar istisnalarının bulunduğu ifade edilir.",
          "Feshin yazılı olmasa da hukuken bağlayıcı olabildiği; kanıt için yazılı fesih istenmesinin önerildiği yazılır.",
          "İşveren iflasında LG (Lønmodtagernes Garantifond) ve ATP yönetiminin ücret, tatil ücreti ve emeklilik gibi alacakları güvence altına alabildiği belirtilir.",
        ],
      },
      {
        title: "Örgütlenme ve toplu iş uyuşmazlığı",
        paragraphs: [
          "Belirli bir sendikaya üye veya üye olmama nedeniyle işten çıkarılamayacağı ve belirli sendika üyeliği zorunlu kılınamayacağı yazılır.",
          "Danimarka iş piyasasının büyük ölçüde yasalarla değil tarafların gönüllü anlaşmalarıyla düzenlendiği; çalışanların yaklaşık yüzde altmış beşinin sendika üyesi olduğu; sektöre göre farklılık bulunduğu belirtilir.",
          "Anlaşma süresince genel grev yasağı (no-strike) hükmünün uygulanabildiği; anlaşma yenilenemediğinde veya anlaşmasız işyerlerinde grev hakkının doğabildiği ifade edilir.",
          "Sendikaların toplu sözleşme için çatışma, blokaj ve dayanışma eylemleri başlatabildiği; uygunluk şartlarının iş hukuku uygulamasına dayandığı ve iş mahkemesinin hızlı karar verebildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "skat.dk, KDV ve konut payı",
    lead: "Tüketici fiyatları AB ortalamasının üzerinde; refah hizmetleri vergi ile finanse edilir.",
    accordions: [
      {
        title: "Gelir vergisi ve tavan",
        paragraphs: [
          "Danimarka’da çalışanların ilk günden itibaren vergi ödediği; mevsimlik ve zanaatkar gibi geçici çalışanlar için de geçerli olduğu yazılır.",
          "Yüksek vergi yükünün geniş refah sistemiyle ilişkilendirildiği; okul, kreş, huzurevi, ücretsiz eğitim ve hastane gibi hizmetlerin başka ülkelerde sigorta primleriyle karşılandığının anıldığı belirtilir.",
          "Verginin gelir ve belediyeye göre değiştiği; kişisel gelir üzerindeki vergi ve kesintiler için iki bin yirmi üçte yüzde elli iki buçuk yedi tavanının bulunduğu ifade edilir.",
          "İş gelirinin yüzde sekizinin işgücü piyasası katkısı (arbejdsmarkedsbidrag) olarak ödendiği yazılır.",
          "Kişisel muafiyet, istihdam indirimi ve iş indirimi gibi kalemlerin bulunduğu; iki bin yirmi üçte istihdam vergi indiriminin yüzde on buçuk altı ve üst sınırının kırk beş bin altı yüz DKK; iş indiriminin belirli gelir eşiğinin üzerindeki gelirin yüzde dört buçuğu ve en fazla iki bin yedi yüz DKK olabildiği belirtilir.",
          "Sosyal katkıların ulusal gelir vergisine dâhil edildiği ve ayrı sosyal prim ödemesi bulunmadığı ifade edilir.",
          "Mal ve çoğu hizmette yüzde yirmi beş KDV uygulandığı yazılır.",
          "Konut sahibi için arazi ve bina değer vergisi ile emlak değer vergisinin (örnek oranlar ve eşiklerin kaynakta verildiği) alındığı belirtilir.",
          "Yurtdışından işe alınan araştırmacı ve yüksek gelirli gruplar için en fazla seksen dört ay boyunca brüt maaşın yüzde otuz iki seksen dörde kadar düz vergi seçeneğinin bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Hanehalkı gider yapısı",
        paragraphs: [
          "Tüketici fiyat düzeyinin AB‑27 ortalamasının yüzde kırk üç üzerinde olduğu ve Danimarka’nın AB içinde en pahalı ülkeler arasında yer aldığı yazılır.",
          "Tipik ailenin gider dağılımında konut, elektrik ve ısınmanın yaklaşık otuz dokuz; gıda ve giyimin on yedi; ulaşım ve iletişimin on altı; boş zaman ve kültürün on beş; diğerinin on üç yüzde pay aldığı kaynakta özetlenir.",
        ],
      },
    ],
  },
  {
    id: "konut-detay",
    tocLabel: "Kira ve satın alma",
    h2: "Depozito, yazılı sözleşme ve konut yardımı",
    lead: "kvikbolig.dk ve belediye rehberlikleri.",
    accordions: [
      {
        title: "Kiralama",
        paragraphs: [
          "Ev sahibinin çoğu zaman depozito ve peşin olarak üç aya kadar kira isteyebildiği; depozitonun çoğu zaman üç aylık kira tutarına denk geldiği ve tahliye masrafları için güvence olduğu yazılır.",
          "Yazılı kira sözleşmesinin zorunlu olmadığı fakat koşulların kanıtı için şiddetle önerildiği; depozito, peşin ödemeler, aylık kira, ısıtma/su/elektrik, evcil hayvan kuralları, ihbar süresi ve süre sınırı gibi maddelerin yazılması gerektiği belirtilir.",
          "Standart sözleşme örneğinin İçişleri ve Sağlık Bakanlığı sitesinde (Danca) bulunabildiği ifade edilir.",
          "Kiracının şartları sağlaması halinde Udbetaling Danmark üzerinden konut yardımı alınabildiği yazılır.",
        ],
      },
      {
        title: "Satın alma",
        paragraphs: [
          "Mülk veya kooperatif konut alımında genelde emlakçı kullanıldığı; kooperatifte pay alıp kullanım hakkı elde edildiği belirtilir.",
          "Alıcı çıkarlarını korumak için mülk avukatı ile çalışılmasının önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "saglik",
    tocLabel: "Sağlık",
    h2: "Sarı kart ve aile hekimi",
    lead: "Kayıt sonrası otomatik genel sağlık sigortası.",
    accordions: [
      {
        title: "Kayıt ve ilk başvuru",
        paragraphs: [
          "Danimarka’da yerleşik ikamet eden herkesin folkeregister’e yazılması ve Danimarka sağlık sigortasına hak kazanması gerektiği yazılır.",
          "Belediyede kayıt sonrası genel sağlık sigortasına otomatik dâhil olunduğu; sarı sağlık kartının gönderildiği ve doktor, uzman, eczane ve hastane gibi hizmetlerde gösterilmesi gerektiği belirtilir.",
          "Kayıtta birinci basamak doktor (GP) seçilmesi gerektiği; hastalıkta önce GP ile iletişim kurulmasının önerildiği ifade edilir.",
          "Mesai dışı sağlık hattı ve ciddi durumlarda yüz on iki ile ambulans çağrılabildiği yazılır.",
          "Reçeteli ilaçta katılım payı ve diş/hekim gibi hizmetlerde kısmi sübvansiyon bulunduğu; Sygeforsikring Danmark gibi özel tamamlayıcı sigortanın mümkün olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "egitim-kultur-ulasim",
    tocLabel: "Eğitim, kültür ve ulaşım",
    h2: "EQF, folkeskole sonrası yollar ve bisiklet",
    lead: "Danca bilgisi avantaj; büyük şirketlerde İngilizce yaygın.",
    accordions: [
      {
        title: "Eğitim yapısı (özet)",
        paragraphs: [
          "Eğitimin vergilerle çoğunlukla ücretsiz olduğu; uluslararası çalışanlardan eşdeğer diplomanın ve dil şartlarının beklenebildiği yazılır.",
          "Tüm seviyelerin Avrupa Yeterlilik Çerçevesi (EQF) ile uyumlu olduğu belirtilir.",
          "On yıllık folkeskole, isteğe bağlı onuncu sınıf, efterskole, STX/HF/HHX/HTX gibi üst ortaöğretim yolları ve meslekî eğitim ile meslek akademisi, meslek lisansı ve üniversite kademelerinin kaynakta özetlendiği ifade edilir.",
        ],
      },
      {
        title: "Kültür ve günlük yaşam",
        paragraphs: [
          "Danimarkalıların çoğunlukla informal ve “sen” (du) hitabıyla konuştuğu; İngilizce bilgisinin yaygın olduğu; büyük şirketlerde çalışma dilinin İngilizce olabildiği yazılır.",
          "Derneklerin sosyal ve kültürel yaşamın merkezinde olduğu; futbol, hentbol, yüzme, yelken ve bisikletin popüler olduğu belirtilir.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "DSB’nin ulusal demiryolundan, bölgelerin ve belediyelerin yerel ulaşımdan sorumlu olduğu; Büyük Kopenhag’ta S‑tog ve metro bulunduğu yazılır.",
          "Yedi bir bin kilometre yol ağının çoğunlukla belediyelere ait olduğu; Storebælt köprüsü geçiş ücretli olduğu; adalar arası feribot hizmetinin yaygın olduğu belirtilir.",
          "Rejseplanen, Kopenhag Havaalanı ve DSB uluslararası tren bağlantıları için kaynak olarak anılır.",
        ],
      },
    ],
  },
  {
    id: "ozel-hayat-engellilik",
    tocLabel: "Özel hayat ve engelli istihdamı",
    h2: "Doğum kaydı, evlilik ve makul uyarlama",
    lead: "Belediye Jobcenter engelli istihdamında merkezî iletişim noktasıdır.",
    accordions: [
      {
        title: "Doğum, isim ve evlilik",
        paragraphs: [
          "Doğumun hastanede ebeler ve doktorlarla ücretsiz gerçekleştirilebildiği; doğum bildiriminin belediyeye yapılması ve çocuğa CPR numarası verildiği yazılır.",
          "Altı ay içinde ad verilmesi gerektiği; borger.dk üzerinden veya vaftiz yoluyla isim bildiriminin yapılabildiği belirtilir.",
          "Belediye salonunda medeni veya kilisede dini evlilik seçeneklerinin bulunduğu; borger.dk üzerinden dijital evlilik beyanı ve yabancılar için ek belge gereksinimlerinin olduğu ifade edilir.",
        ],
      },
      {
        title: "Engelli tanımı ve destekler",
        paragraphs: [
          "Danimarka’nın engelliği BM Engelli Hakları Sözleşmesi ile uyumlu tanımladığı; çevresel engellerle birleşince topluma katılımı sınırlayan uzun süreli yetersizlik olarak özetlendiği yazılır.",
          "Genel bir engelli sertifikası yerine hizmet başına tıbbi değerlendirme veya resmî karar verildiği belirtilir.",
          "İşverenlere ücret sübvansiyonu, esnek iş (flexjob), kişisel yardım, işaretçi ve işe yerleştirme desteklerinin sunulabildiği; ayrıntıların STAR ve Workindenmark’ta bulunduğu ifade edilir.",
          "İşverenin makul uyarlama sağlaması ve yalnızca engellilik nedeniyle feshin hukuka aykırı olduğu yazılır.",
        ],
      },
    ],
  },
];
