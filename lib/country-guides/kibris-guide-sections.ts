import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Cyprus” (11/03/2026, İngilizce kamu metni) — Kıbrıs Cumhuriyeti yönetimindeki alanlara ilişkin özet. */
export const KIBRIS_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Kıbrıs’ta yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Kıbrıs Cumhuriyeti Schengen üyesi değildir; para birimi avrodur. Kamu İstihdam Hizmeti (PES) çevrimiçi kayıt ve bölge iş müdürlükleri; işsiz kaydında Kıbrıs’ta ikamet şartı ve Kıbrıs operatörlü telefon; EURES Kıbrıs’ta yalnızca sistemdeki ilan numarasıyla CV kabulü; HRDA ve AB Sosyal Fonu ile altı aya kadar staj katılım ödeneği; Yeni Modern Çıraklık (NMA) ve Yunanca teorik eğitim; asgari ücret kararnamesi (işe giriş EUR 979, altı ay sonra EUR 1 988); yazılı iş şartı bildirimi; deneme süresi 26 hafta; GHS sağlık katkıları; gelir vergisi dilimleri ve KDV; sol trafik ve otoyol ücreti olmaması; 1974 sonrası fiilî kontrol alanı ve AB müktesebatı askıya alınmış bölge uyarısı metinde açıkça yer alır.",
  "Ücretler, katkı oranları ve idari formlar güncellenebilir. Doğrulama için mlsi.gov.cy, pescps.dl.mlsi.gov.cy, eures.gov.cy, moi.gov.cy/crmd, gesy.org.cy ve mof.gov.cy/tax kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const KIBRIS_SEO_KEYWORD_TAGS: string[] = [
  "kıbrıs vize",
  "kıbrıs rum kesimi çalışma",
  "PES Cyprus unemployed registration",
  "EURES Cyprus vacancy number CV",
  "GESY Cyprus contribution",
  "Cyprus minimum wage 979 1988 EUR",
  "CRMD Cyprus EU registration four months",
];

export const KIBRIS_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-pes",
    tocLabel: "İş bulma",
    h2: "EURES, PES ve özel istihdam büroları",
    lead: "İşsiz kaydı için Kıbrıs’ta ikamet gerekir; kayıt tamamlanması görevlinin aramasıyla olur.",
    accordions: [
      {
        title: "Kamu istihdam hizmeti ve çevrimiçi süreç",
        paragraphs: [
          "Yurtdışından iş ararken EURES portalının ana kanal olarak önerildiği; adadayken bölge iş müdürlüklerine gidilerek bilgi, rehberlik ve yerleştirme alınabildiği yazılır.",
          "İlk ziyarette pasaport veya kimlik gösterilmesi; Kıbrıs’ta ikamet etmeyenlerin işsiz olarak kayıt olamayacağı belirtilir.",
          "Yeni işsiz kaydı ve kaydın kapatılmasının yüz yüze zorunluluğu olmadığı; Kamu İstihdam Hizmeti çevrimiçi platformu (pescps.dl.mlsi.gov.cy) üzerinden yapılabildiği ifade edilir.",
          "Kaydın, başvurunun verdiği numaradan İş Bakanlığı görevlisinin aramasıyla tamamlandığı; numaranın Kıbrıs merkezli bir operatörden kayıtlı olması gerektiği vurgulanır.",
        ],
      },
      {
        title: "Özel bürolar, basın ve doğrudan başvuru",
        paragraphs: [
          "Yurtdışından işçi arayanlara odaklanan özel istihdam bürolarının bulunduğu; CV’lerin web üzerinden bırakılabildiği yazılır.",
          "Kıbrıs İnsan Kaynakları Yönetimi Derneği ve Kıbrıs Ticaret ve Sanayi Odası’nın büro bilgisi için kaynak olabildiği; resmî Web Portal ve güncellenmiş eures.gov.cy adresinin kullanıldığı belirtilir.",
          "Belirli uzmanlıklar için işverene doğrudan yaklaşımın da değerli olabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-cv",
    tocLabel: "Başvuru",
    h2: "CV, ön yazı ve seçme süreci",
    lead: "EURES Kıbrıs, sistemdeki boş kadro numarası olmadan CV kabul etmez.",
    accordions: [
      {
        title: "Europass ve başvuru dosyası",
        paragraphs: [
          "Başvuruların kamu istihdam hizmetiyle birlikte CV ve ön yazıyla işverene veya iş müdürlüğü / EURES danışmanına iletilebildiği yazılır.",
          "Kıbrıs’taki tüm EURES ilanlarında CV’nin nasıl sunulacağının belirtildiği; e-postada ilanın referans numarasının mutlaka yer alması gerektiği; numarasız CV’lerin kabul edilmediği ifade edilir.",
          "Standart tek CV formatı olmadığı; Europass CV’nin iş dünyasında hızla yayıldığı ve özen, yazım hatasızlık ve yetkinliklerin dengeli anlatımının beklendiği belirtilir.",
        ],
      },
      {
        title: "Mülakat ve değerlendirme",
        paragraphs: [
          "İlan, son başvuru tarihi, CV ön elemesi ve ardından adayın iki–üç mülakat turuna çağrılabildiği yazılır.",
          "Yazılı sınav veya değerlendirme merkezi uygulamalarının kullanılabildiği; adayın sektör ve Kıbrıs piyasası bilgisiyle güçlü yönlerini sunması beklendiği belirtilir.",
          "Yunanca bilmeyenler için mülakatların çoğunlukla İngilizce yürütüldüğü; ortak başka bir dil varsa onun kullanılabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "staj-hrda",
    tocLabel: "Staj",
    h2: "Ulusal tanım yok; HRDA ve AB fonları",
    lead: "İşletme stajları son yıllarda yaygın aktif işgücü piyasası önlemlerinden biri olarak anılır.",
    accordions: [
      {
        title: "HRDA ve katılım ödeneği",
        paragraphs: [
          "Şirket stajları için ulusal yasal süre tanımı veya şirket/ kurumdaki pratik eğitim süresine dair tek bir kanun bulunmadığı yazılır.",
          "Programların Çalışma ve Sosyal Sigorta Bakanlığı’na bağlı İnsan Kaynakları Geliştirme İdaresi (HRDA) tarafından yürütüldüğü ve AB Sosyal Fonu ile finanse edildiği belirtilir.",
          "Ortaöğretim veya yükseköğretim mezunları ve diğer savunmasız işsiz gruplarını da kapsayabildiği; şirket veya kamu/özel kuruluşta altı aya kadar sürebildiği ve haftalık EUR 125 “katılım ödeneği” verildiği ifade edilir.",
        ],
      },
      {
        title: "Erasmus+, Eurodyssey ve uygunluk",
        paragraphs: [
          "Erasmus+ kapsamında öğrenci, yeni mezun, öğretmen ve eğitmen hareketliliği ile Learning Agreement ve hak/yükümlülük prosedürlerinin Avrupa Komisyonu kurallarına tabi olduğu yazılır.",
          "Bakanlığın Eurodyssey değişim programına katıldığı; detayların eurodyssey.aer.eu üzerinde bulunduğu belirtilir.",
          "Aktif işgücü önlemlerinde genelde PES’e kayıtlı ve müsait iş arayan olunması; çoğu şemada 18–35 yaş ve iş deneyimi koşullarına bağlı uygunluk olduğu; katılımcıların Kıbrıs Cumhuriyeti’nin kontrolündeki alanlarda yasal ikamet eden ve ada işgücü piyasasına serbest erişim hakkı olan kişiler olması gerektiği ifade edilir.",
        ],
      },
      {
        title: "İlan ve sosyal sigorta",
        paragraphs: [
          "Tüm staj fırsatlarını toplayan tek bir site olmadığı; HRDA ve erasmusplus.cy sitelerinin kullanıldığı yazılır.",
          "Avrupa staj kalite çerçevesine uyum zorunluluğu ve şema bazlı şartların HRDA’da ayrıntılandığı belirtilir.",
          "Ödeme AB fonu veya Erasmus gibi araçlardan geliyorsa stajyer için sosyal sigorta ödemesinin her zaman zorunlu olmayabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-nma",
    tocLabel: "Çıraklık",
    h2: "Yeni Modern Çıraklık (NMA)",
    lead: "Teorik kısım Yunancadır; AB vatandaşlarının katılımı için Yunanca öğrenmek gerekir.",
    accordions: [
      {
        title: "Hedef kitle ve yapı",
        paragraphs: [
          "NMA’nın AB Sosyal Fonu ve hükümet ortak finansmanıyla Eğitim ve Kültür Bakanlığı’nca yürütüldüğü; formal eğitimden erken ayrılan gençlere alternatif yol ve piyasa ihtiyacına yönelik olduğu yazılır.",
          "On dört–yirmi bir yaş aralığında hazırlık ve çekirdek olmak üzere iki seviye olduğu; zorunlu eğitim dışı olduğu ve ücretsiz olduğu belirtilir.",
          "Hazırlık seviyesinin on dört–on altı yaş arası erken okul terklerine mesleki önizleme sağladığı; çekirdek seviyeye geçiş için zorunlu eğitimin veya hazırlık çıraklığının tamamlanması gerektiği ifade edilir.",
          "İş bulmanın başlangıç ön şartı olmadığı; okulun işveren bulma sorumluluğu taşıdığı, öğrencinin özellikle aile işletmesinde kendisinin de bulabildiği yazılır.",
        ],
      },
      {
        title: "Ücret, süre ve ilan",
        paragraphs: [
          "Çekirdek çıraklığın üç yıl sürdüğü; okul ve işletmede birlikte eğitim verildiği ve işletmedeki eğitimin okul ve işletme eğitmenlerinin planıyla izlendiği belirtilir.",
          "Asgari çıraklık ücreti yasası olmadığı; staja benzer şekilde haftalık ortalama EUR 125 (günlük EUR 25) ödeme örneklerinin anıldığı ifade edilir.",
          "İşverenlere şirket içi eğitmen maaşının yaklaşık %10’u ve okul saatleri için ücret telafisi ile çırak için işveren sosyal sigorta katkılarının kapsandığı yazılır.",
          "Fırsatların sınırlı olduğu; careercy.com bağlantısı ve EURES / Hedeflenen Hareketlilik Planları ile yurtdışına duyurunun mümkün olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "tasinma-konut-ikamet",
    tocLabel: "Taşınma",
    h2: "Konut, okul ve AB ikamet kaydı",
    lead: "Üç aydan uzun kalışta geçerli kimlik/pasaport, istihdam veya yeterli kaynak ve sigorta şartları aranır.",
    accordions: [
      {
        title: "Kira, satın alma ve okul",
        paragraphs: [
          "Konut aramada yerel basın (Yunanca ve İngilizce) ve sitelerin yanı sıra emlakçıların kullanıldığı yazılır.",
          "Metrekare başına satın alma ve kira aralıklarının bölgeye göre değiştiği; elektrik, su ve iklimlendirme maliyetlerinin kiraya dahil olmayabildiği belirtilir.",
          "AB uyrukluları ve ailedeki üçüncü ülke vatandaşlarının devlet okullarında Kıbrıslılarla aynı koşullarda eğitime hak kıldığı; okul bulmak için Eğitim, Kültür, Spor ve Gençlik Bakanlığı ile iletişim önerildiği ifade edilir.",
        ],
      },
      {
        title: "AB vatandaşlarının kaydı ve kontrol listesi",
        paragraphs: [
          "Üç aydan uzun kalmak için geçerli kimlik/pasaport; adada ücretli veya ücretsiz istihdam veya kayıtlı eğitim; veya kendisi ve ailesi için tam sağlık sigortası ve sosyal yardıma muhtaç olmayacak yeterli mali kaynak gerektiği yazılır.",
          "AB vatandaşları ve aynı zamanda AB vatandaşı olan aile üyelerinin varıştan dört ay içinde Sivil Nüfus ve Göç Dairesi’ne kayıt olması gerektiği; AB vatandaşının ailesindeki üçüncü ülke uyruklularının dört ay içinde “AB vatandaşının aile üyesi” ikamet izni başvurusunda bulunması gerektiği belirtilir.",
          "EURES Kıbrıs’ın “Know before you Go” broşürünün taşınmadan önce okunması için eures.gov.cy üzerinde PDF olarak yönlendirildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "istihdam-turleri",
    tocLabel: "İstihdam türleri",
    h2: "Süresiz, süreli, yarı zamanlı ve mevsimlik",
    lead: "Aynı işverende otuz ayı aşan süreli sözleşmelerde süresiz sayılma kuralı vardır.",
    accordions: [
      {
        title: "Yarı zamanlı ve süreli iş",
        paragraphs: [
          "Asgari çalışma yaşı on beş olarak geçer.",
          "Belirsiz süreli sözleşmenin en yaygın tür olduğu; turizm ve tarımda süreli istihdamın yoğun olduğu yazılır.",
          "Yarı zamanlı çalışanlara özel kanunun eş muamele ve tam zamanlıya orantılı haklar sağladığı belirtilir.",
          "Süreli işçinin, nesnel gerekçe olmadıkça, belirsiz süreli muadiline göre daha olumsuz muamele görmemesi gerektiği; aynı işverenle süreli sözleşmelerin otuz ayı aşması halinde sözleşmenin tüm amaçlar için belirsiz süreli sayılacağı, işverenin nesnel gerekçeyle süreli ihtiyacını kanıtlaması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Uzaktan çalışma, geçici iş ve mevsimlik",
        paragraphs: [
          "Evden uzaktan çalışmanın henüz yaygın olmadığı; geçici iş ajansı uygulamasının sınırlı olduğu yazılır.",
          "Hizmet sunumu çerçevesinde gönderilen işçiler için asgari koşulların adadaki mevzuat ve toplu sözleşmelerle aynı olması gerektiği belirtilir.",
          "Mevsimlik işçi için ayrı bir statü yasası olmadığı; turizmde çoğunlukla özel sözleşmelerle Nisan–Kasım arası çalışıldığı ve genelde zorunlu olmayan toplu sözleşmelere uyulduğu; sözleşme hukukunun öncelikli olduğu ve Çalışma Süresinin Düzenlenmesi Kanunu’ndaki dinlenme, izin ve azami haftalık sürelerin yine de uyulması gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-ucret",
    tocLabel: "Sözleşme ve ücret",
    h2: "Yazılı şartlar, asgari ücret ve bordro",
    lead: "İş sözleşmesi zorunlu değildir; ana şartların yazılı belgeyle verilmesi zorunludur.",
    accordions: [
      {
        title: "Yazılı bilgilendirme ve değişiklikler",
        paragraphs: [
          "İş sözleşmesinin zorunlu olmadığı; ancak işin yeri, şirket merkezi, görevler, başlama ve varsa bitiş tarihi, ücretli izin, ücret, yan ödemeler ve çalışma gün/saatleri gibi ana unsurları içeren yazılı anlaşmanın yasal zorunluluk olduğu yazılır.",
          "Toplu sözleşmelerin çoğunlukla iki yıl sürdüğü; işverenin değişiklikleri bir ay içinde bildirmesi ve çalışanı önceden görüşmeye davet etmesi gerektiği; koşulları kötüleştiren tek taraflı değişiklikte çalışanın zorunlu istifa iddiasıyla Endüstri Uyuşmazlıkları Mahkemesi’ne gidebildiği belirtilir.",
          "Birleşme veya devralmada çalışanlara önceden bilgi verilmesi ve yeni işverenin en az bir yıl aynı şartları sürdürmesi gerektiği ifade edilir.",
        ],
      },
      {
        title: "Asgari ücret ve ödeme yöntemi",
        paragraphs: [
          "2009 Asgari Ücret Kararnamesi’nin tüm meslekler için yasal taban oluşturduğu; işe girişte asgari ücretin EUR 979, aynı işverende altı ay kesintisiz hizmetten sonra EUR 1 988’e yükseldiği yazılır.",
          "Kamu İstihdam Hizmeti’nin kararnamedeki ücretin altındaki ilanları kabul etmediği belirtilir.",
          "Bordroda çalışan bilgisi, brüt, kesintiler ve net ücretin yer alması gerektiği; ödemenin çoğunlukla çek ve bordro veya banka havalesi ve yalnızca bordro ile yapılabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi",
    tocLabel: "Çalışma süresi",
    h2: "Haftalık süre, fazla mesai ve gece",
    lead: "Çoğu işyerinde haftalık süre toplu sözleşmeyle 38–40 saat aralığındadır.",
    accordions: [
      {
        title: "Dinlenme ve azami süre",
        paragraphs: [
          "Ofis ve işletmelerde çoğunlukla 08.00–17.30 ve 13.00–14.30 öğle arası çalışıldığı; çarşamba öğleden sonra serbest gün geleneğinin sık olduğu yazılır.",
          "2013’ten beri mağazaların pazar günü de açık olabildiği; yazın isteğe bağlı siesta uygulamasının sürdüğü belirtilir.",
          "Yirmi dört saatte en az on bir saat kesintisiz dinlenme ve haftada en az otuz beş saat kesintisiz haftalık dinlenme; fazla mesai dahil azami haftanın kırk sekiz saat olamayacağı; gece çalışmasının 23.00–06.00 arası ve yirmi dört saatte sekiz saati geçmemesi gerektiği ifade edilir.",
        ],
      },
      {
        title: "İstisnalar ve iletişim",
        paragraphs: [
          "Günlük çalışma altı saati aştığında on beş dakika mola hakkı olduğu; mağaza personeli, ofis çalışanları, şoförler ve otel–eğlence çalışanları için özel mevzuat bulunduğu yazılır.",
          "İstisnaların toplu sözleşmede açıkça kararlaştırılması gerektiği; açıklama için İş İlişkileri Genel Müdürlüğü’ne başvurulabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izinler-fesih",
    tocLabel: "İzin ve fesih",
    h2: "Yıllık izin, doğum ve deneme süresi",
    lead: "Deneme süresi yirmi altı haftadır; bu sürede ihbar şartsız fesih mümkündür.",
    accordions: [
      {
        title: "Yıllık izin ve resmî tatiller",
        paragraphs: [
          "Beş günlük haftada yılda yirmi iş günü, altı günlük haftada yirmi dört iş günü ücretli izin verildiği; sözleşme veya toplu sözleşmeyle daha fazla gün tanınabildiği yazılır.",
          "Resmî tatillerin yılda on dört–on yedi gün aralığında değiştiği; detayların İş İlişkileri Genel Müdürlüğü’nden alınabileceği belirtilir.",
        ],
      },
      {
        title: "Analık, ebeveynlik ve fesih sonrası haklar",
        paragraphs: [
          "İlk ve ikinci çocukta yirmi iki, üçüncü ve sonraki her çocukta yirmi altı haftalık analık iznine dokuz haftanın beklenen doğumdan iki hafta öncesine denk gelecek şekilde ayrılması gerektiği yazılır.",
          "Altı aydan fazla çalışmış ebeveyne doğum veya evlat edinmeden sonra çocuğa bakım için on üç haftaya kadar ebeveyn izni verildiği; doğumdan itibaren on altı hafta içinde iki haftalık babalık izni ve ödeneği olduğu belirtilir.",
          "Deneme sonrası işveren feshinde tazminatın hizmet süresine bağlı olduğu; aynı işverende yılda on beş haftadan fazla mevsimlik çalışmanın süreklilik sayılabildiği ifade edilir.",
          "Toplu işten çıkarma eşikleri (ör. yirmi bir–doksan dokuz çalışanda on kişi birlikte çıkarma) ve önceden danışma ve bakanlığa bildirim yükümlülükleri anılır.",
        ],
      },
    ],
  },
  {
    id: "sendika-uyusmazlik",
    tocLabel: "Sendika ve uyuşmazlık",
    h2: "Gönüllü örgütlenme ve arabuluculuk",
    lead: "Grevler nadir; uyuşmazlıklar çoğunlukla Bakanlık arabuluculuğuyla çözülür.",
    accordions: [
      {
        title: "Toplu pazarlık ve temsil",
        paragraphs: [
          "Endüstri ilişkilerinin işveren kuruluşları ve sendikaların gönüllü düzenlemesine dayandığı; sendika üyeliği nedeniyle işten çıkarmanın yasak olduğu yazılır.",
          "SEK, PEO, DEOK, PASYDY ve bankacılar birliği ETYK gibi büyük sendikaların; OEB ve KEBE gibi işveren örgütlerinin anıldığı belirtilir.",
          "Toplu sözleşmelerin genelde üç yılda bir yenilendiği ve çoğunlukla sektör bazında kurulduğu ifade edilir.",
        ],
      },
      {
        title: "Uyuşmazlık çözümü",
        paragraphs: [
          "Endüstri İlişkileri Kanunu’nun hak uyuşmazlıkları (mevcut toplu sözleşmenin yorumlanması) ve menfaat uyuşmazlıkları (yenileme pazarlığı) aşamalarını doğrudan görüşme, bakanlık arabuluculuğu ve gerekirse tahkim veya kamu soruşturmasıyla düzenlediği yazılır.",
          "Grevlerin sık olmadığı; çoğu anlaşmazlığın arabuluculukla sonuçlandığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-ghs",
    tocLabel: "Vergi ve GHS",
    h2: "Gelir vergisi dilimleri, KDV ve Genel Sağlık Sistemi",
    lead: "Yerleşik sayılanlar dünya genelinden gelen geliri de beyan eder; eşler ayrı beyanname verir.",
    accordions: [
      {
        title: "Gelir vergisi ve KDV",
        paragraphs: [
          "Yerleşik vergi mükellefinin vergi yılında yüz seksen üç günden fazla Kıbrıs’ta yaşaması durumunda yurt içi ve yurt dışı gelirinin vergilendirildiği yazılır.",
          "Kişisel gelir dilimlerinin EUR 22 000’e kadar %0, sonrası kademeli %20–35 aralığında olduğu; meslek kurulu aidatı, hayır, sosyal sigorta ve emeklilik gibi indirim kalemlerinin dikkate alındığı belirtilir.",
          "Yurt dışında kazanılmış emeklilik gelirinin %5 oranında vergilendirildiği; yılda ilk EUR 3 420’nin muaf olduğu ve kişisel durum için Vergi Dairesi’ne danışılması gerektiği ifade edilir.",
          "KDV’nin sıfır, %5, %9 ve standart %19 oranlarıyla ürün ve hizmet türüne göre değiştiği; 1 Mayıs 2004 sonrası ruhsatlı konut teslimlerinde %19 uygulandığı yazılır.",
        ],
      },
      {
        title: "GHS katkıları ve yararlanıcılar",
        paragraphs: [
          "Haziran 2019’da tüm adada yaşayan ve çalışanlar için Genel Sağlık Sistemi’nin (GHS) kurulduğu; kişisel doktor, uzman, ilaç, test, yatış ve acil hizmetleri kapsadığı belirtilir.",
          "Yararlanıcıların Kıbrıs Cumhuriyeti’nin kontrolündeki alanda ikamet etmesi ve yasal statüye göre listelendiği; kayıt ve kişisel doktor seçiminin çevrimiçü veya muayenehane ziyaretiyle yapılabildiği yazılır.",
          "Çalışan %2,65, işveren %2,90, devlet %4,70; serbest meslek %4,00; emekli ve pasif gelir %2,65 oranlarının anıldığı ifade edilir.",
          "Uzmana, eczaneye veya teste sembolik katılım ücretleri; kişisel doktor ve yatışın ücretsiz olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-ulasim",
    tocLabel: "Yaşam ve ulaşım",
    h2: "Euro, eğitim, ulaşım ve siyasi çerçeve",
    lead: "Sol şerit trafik; otoyol ücreti yok; Larnaka ve Baf uluslararası havalimanları.",
    accordions: [
      {
        title: "Siyasi yapı ve dil",
        paragraphs: [
          "Başkanlık sistemi, beş yıllık doğrudan seçilmiş cumhurbaşkanı ve cumhurbaşkanınca atanan bakanlar kurulu olduğu; yasama gücünün milletvekillerinde toplandığı yazılır.",
          "Resmî dillerin Yunanca ve Türkçe olduğu; çoğu kişinin İngilizce de konuştuğu belirtilir.",
          "2008’den beri paranın avro olduğu; 1974 işgali ve toprakların yaklaşık %36,2’sinin fiilî kontrol dışında kalması nedeniyle AB müktesebatının o bölgede askıda olduğunun AB katılım antlaşmasında yer aldığı ifade edilir.",
        ],
      },
      {
        title: "Ulaşım ve yaşam maliyeti",
        paragraphs: [
          "Kısa mesafeler ve yüksek araç sahipliği nedeniyle toplu taşımanın sınırlı kaldığı; son yıllarda ağın modernleştiği yazılır.",
          "Sol trafik, sağ direksiyonlu araçlar, otoyol gişesi olmaması, Larnaka ve Baf havalimanları ile Limasol ve Larnaka deniz limanları ve dört marina (Limasol’da iki, Larnaka, Latsi) bilgisinin anıldığı belirtilir.",
          "Yaşam maliyetinin maaş–fiyat dengesiyle birlikte yüksek sayılabildiği; akaryakıt artışlarının genel fiyatları etkilediği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "DSID, kota ve işe alım destekleri",
    lead: "Kamu sektöründe engelli adaylara öncelikli %10 kota uygulanır.",
    accordions: [
      {
        title: "Tanınma ve işveren desteği",
        paragraphs: [
          "BM Engelli Hakları Sözleşmesi’nin onaylandığı ve engellilik tanımının uzun süreli engellerle topluma eşit katılımı sınırlayan durumları kapsadığı yazılır.",
          "Sosyal Refah Bakan Yardımcılığı’na bağlı Engelli Kişilerin Sosyal Dâhil Edilmesi Dairesi’nin (DSID) WHO ICF temelli değerlendirme merkezleri işlettiği ve resmî raporla yardımların açıldığı belirtilir.",
          "Özel sektörde engelli istihdamında iki yıla kadar maaş sübvansiyonu, makul düzenleme ve teknik ekipman yükümlülükleri ile kamuda özel ekipman mali yardımının anıldığı ifade edilir.",
        ],
      },
      {
        title: "Çalışan destekleri ve günlük yaşam",
        paragraphs: [
          "Engellilik Kanunu’nun (127(I)/2000) işyeri ayrımcılığını yasakladığı; PES’in engelli kişilere bireysel danışmanlık sunduğu yazılır.",
          "Avrupa engelli kartı sahiplerine ve gerektiğinde refakatçiye toplu taşımanın ücretsiz olduğu; iş, eğitim veya sağlık için aylık EUR 75 veya EUR 150 mobilite ödeneği olduğu belirtilir.",
          "Asgari gelir engelli ödeneği alanların aylık EUR 512’ye kadar çalışma gelirinin ödeneği etkilemediği ifade edilir.",
        ],
      },
    ],
  },
];
