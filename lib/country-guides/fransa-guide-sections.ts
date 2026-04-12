import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: France” (16/04/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const FRANSA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Fransa’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. France Travail (eski Pôle emploi), APEC, Cap Emploi ve CHEOPS ağı; geçici çalışma ve işe alma ajansları; şirket siteleri ve La Bonne Boîte; CV ve ön yazı biçimi; stajın tanımı, üçüncü ülke vatandaşları için Schengen ve uzun süreli vize ayrımı ve asgari staj saat ücreti; 5 Eylül 2018 sonrası çıraklık (alternance) reformu ve yaş–sözleşme yılına göre ücret oranları; AB/EEA ve İsviçre için üç aylık serbest dolaşım ve çalışan ikamet belgesi; üçüncü ülke vatandaşları için konsolosluk ve OFII; konut (PAP, leboncoin, FNAIM), “1 % logement” ve HLM; SMIC ve bordro unsurları; yıllık izin ve resmî tatiller; fesih ve Prud’hommes; vergi ve sosyal kesintiler; CPAM sağlık iadesi; zorunlu eğitim (3–16 yaş) ve Parcoursup; ulaşım ve bölgesel yapı; engelli tanıma (MDPH, RQTH), %6 işe alım yükümlülüğü ve Agefiph / FIPHFP destekleri kamu metnine dayanır.",
  "Metinde geçen tutarlar, oranlar ve süreler yayımlandıkları döneme bağlıdır; güncel bilgileri www.francetravail.fr, www.service-public.fr, www.ameli.fr ve www.diplomatie.gouv.fr üzerinden doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const FRANSA_SEO_KEYWORD_TAGS: string[] = [
  "fransa vize",
  "fransa schengen",
  "France Travail",
  "APEC Fransa",
  "Cap Emploi",
  "alternance Fransa",
  "SMIC 2025",
  "carte de séjour Fransa",
  "CPAM remboursement",
];

export const FRANSA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "France Travail, APEC, Cap Emploi ve EURES",
    lead: "Kamu istihdam hizmeti, yönetici profilleri ve engelli istihdamına özel ağ birlikte çalışır.",
    accordions: [
      {
        title: "EURES ve France Travail",
        paragraphs: [
          "Fransa’daki EURES ağının France Travail ile birlikte APEC ve CHEOPS–Cap Emploi aracılığıyla uluslararası mobilite danışmanları sunduğu belirtilir.",
          "Genel portal: eures.europa.eu (Fransızca giriş eures.europa.eu/index_fr).",
          "francetravail.fr üzerinden yurtdışından “kullanıcı alanı” ile aday profili oluşturulup ilan aranabildiği; Fransa’ya vardıktan sonra “m’inscrire (demandeur d’emploi)” ile iş arayan kaydı ve bölgeye en yakın ajanslardan birine bağlanılabildiği yazılır; yaklaşık sekiz yüz seksen ajansın bulunduğu ifade edilir.",
          "France Travail’a 3949 numarasından ulaşılabildiği; yurtdışından +33 1 77 86 39 49 aranabildiği belirtilir.",
        ],
      },
      {
        title: "APEC, Cap Emploi ve özel kanallar",
        paragraphs: [
          "APEC’in (Association pour l’emploi des cadres) yönetici ve genç mezunlara yönelik istihdam desteği verdiği; www.apec.fr adresinin anıldığı yazılır.",
          "CHEOPS–Cap Emploi ağının cheops-ops.org üzerinden duyurulduğu; geçici iş ve özel istihdam bürolarının adaydan ücret almayıp hizmeti işverene faturaladığı; prismemploi.eu ve cadremploi.fr kaynaklarının listelendiği belirtilir.",
          "Şirket sitelerindeki “İK / Kariyer” bölümleri ile labonneboite.francetravail.fr aracının iş aramada kullanılabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru belgeleri",
    h2: "CV, ön yazı ve çevrimiçi araçlar",
    lead: "İki sayfayı geçmeyen CV ve tek sayfalık ön yazı; işveren hakkında ön araştırma önerilir.",
    accordions: [
      {
        title: "İşveren araştırması ve CV",
        paragraphs: [
          "İlanlı veya ilansız başvuruda işverenin sektörü, değerleri, çalışan sayısı ve mümkünse iletişim kişisinin öğrenilmesinin önerildiği; web, pagesjaunes.fr ve ülkenizdeki Fransız Ticaret Odası (cci.fr) kaynaklarının kullanılabildiği yazılır.",
          "CV’nin en fazla iki sayfa olması; medeni durum, yaş ve AEA uyruklular için uyruğun isteğe bağlı olduğu; unvan satırında güçlü yönlerin vurgulanabildiği; deneyim ve eğitim bölümlerinin kronolojik, beceri bazlı veya karma düzenlenebildiği belirtilir.",
          "Ana dil, Fransızca için okuma–yazma–konuşma seviyelerinin net yazılması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Ön yazı ve dijital hizmetler",
        paragraphs: [
          "Ön yazının genelde bir sayfayı geçmemesi, yazım veya e-posta ile gönderilmesi ve şirkete özgü motivasyon ile uyum göstermesi beklendiği yazılır.",
          "Üst sol: ad soyad, adres, uluslararası kodlu telefon ve e-posta; üst sağ: gönderim yeri ve tarih; altında alıcı adresi; konu satırında ilan referansının yer alması önerilir.",
          "emploi-store.fr ve francetravail.fr/candidat/vos-recherches.html bölümlerinin çevrimiçi hizmetler için anıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj",
    tocLabel: "Staj (stage)",
    h2: "Tanım, uygunluk ve ücretlendirme",
    lead: "Üçüncü ülke uyrukluları için süreye göre Schengen veya uzun süreli vize ayrımı dikkate alınmalıdır.",
    accordions: [
      {
        title: "Tanım ve uygunluk",
        paragraphs: [
          "Stajın, öğrencinin veya çırak adayının mesleki becerilerini eğitim kurumunun hedefleriyle uyumlu biçimde işyerinde geliştirmesini amaçlayan geçici yerleşim olduğu yazılır.",
          "CAP, bac pro ve BTS gibi meslekî eğitimde; üniversite veya meslekî eğitimde müfredat içi bir–üç ay veya sonrası altı aya kadar stajların bulunduğu; Erasmus+ gibi AB programlarıyla yabancı öğrenci stajlarının da sayıldığı belirtilir.",
          "Tüm kategorilerde yürürlükteki mevzuata uyulması gerektiği ifade edilir.",
          "AB vatandaşlarına stajların açık olduğu; üçüncü ülke uyrukluların üç aydan kısa staj için Schengen, üç aydan uzun için uzun süreli vizeye ihtiyaç duyabileceği yazılır.",
        ],
      },
      {
        title: "Kalite kuralları ve ücret",
        paragraphs: [
          "Stajın devamsızlık, askı veya işten çıkarma yerine geçmemesi; sürekli bir işin düzenli yükünü üstlenmemesi; mevsimlik iş veya geçici iş artışını “staj” adıyla gerekçelendirmekten kaçınılması gerektiği belirtilir.",
          "Müfredat dışı stajların yasak olduğu; eğitim programının öğrenci veya çırak başına akademik yılda en az iki yüz saat teorik/pratik içermesi gerektiği yazılır.",
          "Bir akademik yılda stajın altı ayı (farklı dönemlere bölünmüş olsa bile en fazla dokuz yüz yirmi dört saat) aşmaması ve iki staj dönemi arasında önceki staj süresinin üçte biri kadar “soğuma” süresinin işverence korunması gerektiği ifade edilir.",
          "Stajyer, eğitim kurumu, işyeri, staj eğitmeni ve işyeri mentoru arasında anlaşmanın zorunlu olduğu ve stajın içeriğinin sözleşmede yazılması gerektiği belirtilir.",
          "Aynı okul veya üniversite yılında iki aydan (yedi saatlik günle kırk dört gün) uzun süren stajlarda asgari ücretin uygulanması; staj saati başına brüt asgari tutarın 1 Ocak 2023’ten beri saatte 4,05 EUR olduğu; fiilen çalışılan süreye göre hesaplandığı; üç yüz dokuz saatin altında ücret zorunluluğu olmayabildiği yazılır.",
        ],
      },
      {
        title: "Kaynaklar ve ilan siteleri",
        paragraphs: [
          "service-public.fr ve legifrance.gouv.fr üzerinden mevzuat; Campus France, Erasmus+ Fransa ve april-international gibi sitelerin yol gösterici bilgi sunduğu; cidj.com, letudiant.fr ve directetudiant.com gibi portalların staj ilanları için anıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "alternance",
    tocLabel: "Çıraklık (alternance)",
    h2: "Sözleşme, CFA ve ücret tablosu",
    lead: "16–30 yaş (istisnalar hariç); RNCP’deki meslekî yeterliliklere yönelik iş–okul dönüşümü.",
    accordions: [
      {
        title: "Çerçeve ve süre",
        paragraphs: [
          "5 Eylül 2018 tarihli kanunun alternansa öncelik verdiği; piyasanın eğitim kurumlarına açılması ve sözleşme başına kamu finansmanı sağlandığı yazılır.",
          "Yaş üst sınırının yirmi altıdan otuza çıkarıldığı; yirmi dokuz yaş üstülerin de programa girebildiği; yirmi altı yaş üstülerin asgari ücretle ücretlendirilmesi gerektiği belirtilir.",
          "Çıraklık sözleşmesinin kamu veya özel işverenle imzalanıp oda (chambre consulaire) ve DDETS’e kaydedilmesi ve onay sonrası çırakın CFA’da ve işyerinde dönüşümlü öğrenen çalışan sayılması gerektiği ifade edilir.",
          "Sürenin bir aydan üç yıla kadar değişebildiği; engelli, girişimci veya kurtarma bağlamı gibi özel durumlarda yaş sınırı olmayabildiği yazılır.",
        ],
      },
      {
        title: "Ücret oranları (özet tablo)",
        paragraphs: [
          "Ücretin sözleşme kıdemi, yaş ve programa göre SMIC’e oranlandığı belirtilir: birinci yıl için on sekiz yaş altı %27, 18–20 arası %43, 21–25 arası %53, yirmi altı ve üzeri %100; ikinci yıl için sırasıyla %39, %51, %61, %100; üçüncü yıl için %55, %67, %78 ve %100 oranlarının anıldığı yazılır.",
          "İlanların francetravail.fr, alternance.emploi.gouv.fr ve franceapprentissage.fr ile şirket sitelerinde bulunabildiği; alternance-professionnelle.fr ve stewdy.com gibi sayfaların mali yardımlar için listelendiği ifade edilir.",
          "Özel sektörde işverenlere sosyal prim muafiyeti, hibe, büyük şirketlerde indirimli çıraklık vergisi ve vergi indirimi gibi desteklerin şirket büyüklüğü ve bölgeye göre değiştiği belirtilir.",
        ],
      },
      {
        title: "Üçüncü ülke uyruklular",
        paragraphs: [
          "AB vatandaşları ve AEA uyruklularının alternansa serbestçe başvurabildiği; üçüncü ülke uyrukluların geçerli oturum ve çalışma iznine ihtiyaç duyduğu ve başvurunun çoğu zaman işveren tarafından yapıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut-okul",
    tocLabel: "Taşınma, konut ve okul",
    h2: "İlanlar, emlakçı ve zorunlu eğitim kaydı",
    lead: "Paris bölgesi ile kıyı ve büyük şehirler arasında kira farkı belirgindir.",
    accordions: [
      {
        title: "Konut arama",
        paragraphs: [
          "PAP.fr, avendrealouer.fr ve leboncoin.fr gibi sitelerin ilan ve kiralama tavsiyeleri için kullanılabildiği; emlakçıların komisyonunun genelde bir aylık kiraya denk geldiği; ondan fazla çalışanı olan şirketlerin “%1 logement” katkısıyla avantajlı kiralık stoka erişebildiği yazılır.",
          "HLM başvurularının belediye veya préfecture üzerinden yürütülebildiği belirtilir.",
          "Mobiville uygulamasının (candidat.francetravail.fr/mobiville) şehir seçimi, ana işverenler ve ilanlar için kullanılabildiği; FNAIM ve notaires.fr’nin fiyat araştırması için anıldığı ifade edilir.",
        ],
      },
      {
        title: "Okul kaydı",
        paragraphs: [
          "Çocuğun ilköğretime kaydı için belediyeye gidilmesi; aile kayıt defteri, kimlik veya doğum belgesi örneği, ikamet belgesi ve zorunlu aşı kayıtlarının istenebildiği yazılır.",
          "Belediyenin okul atama belgesi verdikten sonra okul müdürüne başvurulması gerektiği; haziran sonuna kadar kayıt ilkesinin yürütülebildiği; aynı okulda kalındığı sürece her yıl yenileme zorunluluğu olmayabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet",
    tocLabel: "İkamet ve serbest dolaşım",
    h2: "AB/EEA ve üçüncü ülke yolları",
    lead: "Üç ay serbest kalış; çalışan için beş yıllık ikamet kartı başvurusu préfecture’da.",
    accordions: [
      {
        title: "AB/EEA ve İsviçre",
        paragraphs: [
          "Üye veya AEA ülkesi ile İsviçre vatandaşlarının turizm, staj veya kısa süreli iş dahil üç aya kadar Fransa’da serbestçe kalabildiği; yakın aile üyelerinin eşlik edebildiği; bu hakkın sınırlanabildiği yazılır.",
          "Çalışan veya serbest meslek statüsünde bulunanların ilk beş yıl için ikamet kartı (carte de séjour) talep edebildiği; başvurunun ikamet edilen préfecture’da yapılması ve eksiksiz dosyada makbuz verildiği belirtilir.",
        ],
      },
      {
        title: "Üçüncü ülke uyruklular",
        paragraphs: [
          "Bilgi için konsolosluk veya yaşanılan ülkedeki Fransız konsolosluğuna başvurulması gerektiği yazılır.",
          "Başka bir AB ülkesinde uzun süreli oturanların doğrudan Fransız iş piyasasına erişemediği; üç ay sonra yeterli gelir ve sağlık sigortasıyla “ziyaretçi” ikametine geçilebildiği ve bunun çalışmaya izin vermediği; statü değişikliğinin sonraki adım olabildiği belirtilir.",
          "service-public.fr, ofii.fr ve diplomatie.gouv.fr adreslerinin resmî başvuru ve entegrasyon bilgileri için anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "varis-listesi",
    tocLabel: "Varış öncesi ve sonrası",
    h2: "Belgeler ve pratik adımlar",
    lead: "U1/U2 formları, banka ve Fransızca hazırlığı.",
    accordions: [
      {
        title: "Yola çıkmadan",
        paragraphs: [
          "Kimlik veya pasaport, çalışma izni gerekiyorsa belge, doğum veya aile kaydı, Avrupa Sağlık Kartı, ehliyet, diplomaların yeminli Fransızca çevirisi, CV ve referans mektuplarının dijital ortamda bulundurulması önerilir.",
          "Sağlık, emeklilik, aile yardımları ve vergi dairelerine çıkış bildirimi yapılması; kira depozitosu ve abonelikler için yeterli nakit planlanması; banka hesabının Fransa’da açılmasının kolay olabileceği yazılır.",
          "Fransızca geliştirmek için Alliance Française (alliancefr.org); işsizlik aktarımı için U2, Fransa’da iş bulunduysa sürelerin birleştirilmesi için U1 formunun ülkenizdeki kamu istihdam servisinden istenmesi belirtilir.",
        ],
      },
      {
        title: "Varışta",
        paragraphs: [
          "Fransa’daki konsolosluğa kayıt olunması; kiralık konutta zorunlu konut sigortası yaptırılması; araç varsa vergi ve trafik sigortası yükümlülüklerinin hatırlatıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-ucret",
    tocLabel: "Sözleşme ve ücret",
    h2: "CDI, CDD, SMIC ve bordro",
    lead: "On altı yaş altı istihdam sıkı istisnalara tabidir; bordroda zorunlu unsurlar listelenir.",
    accordions: [
      {
        title: "Sözleşme türleri",
        paragraphs: [
          "Asgari çalışma yaşının on altı olduğu; aile işletmesi, tatil dönemi hafif işleri, alternans, eğlence ve mankenlik gibi kanunda öngörülen istisnaların bulunduğu yazılır.",
          "Kalıcı (CDI) ve süreli (CDD) sözleşmelerin ana türler olduğu; CDD’nin devamsızlık, dalgalanma veya mevsimlik iş gibi kanuni hallerde ve genelde on sekiz aya kadar kullanılabildiği; %10 ihbar tazminatı niteliğinde “güvencesizlik primi”nin ödenebildiği belirtilir.",
          "Geçici işçilik, “contrat d’extra”, nöbet çağrı sözleşmesi, “CDD senior”, “CDI intérimaire”, CUI ve “contrat adultes-relais” gibi özel rejimlerin mevcut olduğu ifade edilir.",
        ],
      },
      {
        title: "SMIC ve bordro (2025 özeti)",
        paragraphs: [
          "SMIC’in yasal asgari ücret olduğu; toplu iş sözleşmelerinin daha yüksek taban getirebildiği ancak SMIC’in altına inilemeyeceği yazılır.",
          "2025’te haftalık otuz beş saat veya aylık yüz elli bir buçuk saat üzerinden brüt aylık SMIC’in 1.801,80 EUR; saatlik brütün 11,88 EUR olduğu belirtilir.",
          "Brüt–net farkının yaklaşık %23 civarında olabildiği; sosyal güvenlik primleri ile kaynakta kesilen verginin (prélèvement à la source) bordroda yer alması gerektiği ifade edilir.",
          "Bordroda işveren ve çalışan bilgileri, URSSAF ve tamamlayıcı emeklilik, uygulanan toplu sözleşme, normal ve fazla mesai saatleri, primler, kesintiler, masraf iadeleri, ödeme tarihi ve “bordroyu süresiz saklayın” uyarısının bulunması gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-izin",
    tocLabel: "Çalışma süresi ve izinler",
    h2: "Yıllık izin, doğum ve resmî tatiller",
    lead: "Haziran–Mayıs referans döneminde ay başına iki buçuk iş günü izin hakkı birikir.",
    accordions: [
      {
        title: "Ücretli izin ve diğer izinler",
        paragraphs: [
          "Referans dönemde en az bir ay çalışıldıktan sonra ayda iki buçuk iş günü ücretli izin biriktiği; yılda beş haftaya denk geldiği; tarihlerin anlaşma veya işveren kararıyla belirlendiği; 1 Mayıs–31 Ekim arasında izin kullanım imkânının korunması gerektiği yazılır.",
          "İş kazası veya meslek hastalığı dışı hastalık, doğum (tek çocuk için on altı hafta), babalık veya çocukla ilgili izinler, evlilik veya ölüm gibi aile olayları için bir–yedi gün arası izinlerin bulunduğu belirtilir.",
          "İş Kanunu’nda listelenen resmî tatillerin: 1 Ocak, Paskalya pazartesi, 1 Mayıs, 8 Mayıs, İsa’nın göğe çıkışı, Hamsin pazartesi, 14 Temmuz, 15 Ağustos, Tüm Azizler, 11 Kasım ve 25 Aralık olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "fesih-temsil",
    tocLabel: "Fesih ve iş hukuku uyuşmazlığı",
    h2: "İstifa, fesih ve Prud’hommes",
    lead: "Süreli sözleşmede yenileme sınırları toplu sözleşme veya bakan onaylı çerçeveye bağlıdır.",
    accordions: [
      {
        title: "Sözleşme sonu",
        paragraphs: [
          "İstifanın ihbar süresine uyularak yapılabildiği; yazılı ve tercihen iadeli taahhütlü mektupla tarih ispatının önerildiği yazılır.",
          "Anlaşmalı fesih ve kişisel veya ekonomik gerekçeli işten çıkarma prosedürlerinin ayrı ayrı düzenlendiği; toplu ekonomik fesihlerin anlaşma ile sınırlandığı belirtilir.",
          "Emeklilik yaşının doğum yılına göre kademeli olarak altmış ikiden altmış dörde çıkarıldığı; altmış iki–yetmiş yaş arasında ayrılabildiği; en yüksek emeklilik için prim çeyreklerinin (örneğin 1957 doğumlular için yüz altmış yedi, 1973 sonrası için yüz yetmiş iki) anıldığı ifade edilir.",
        ],
      },
      {
        title: "Sendikalar ve grev",
        paragraphs: [
          "CFDT, CGT, CGT-FO, CFE-CGC ve CFTC’nin ulusal düzeyde temsilci sayılabildiği; işveren tarafında MEDEF ve CGPME’nin anıldığı yazılır.",
          "On bir çalışanı aşan şirketlerde 2020’den beri CSE’nin eski temsil organlarının yerini aldığı belirtilir.",
          "Anayasa ile güvence altına alınan grev hakkının en az iki kişinin koordineli iş durdurması olduğu; sözleşmenin askıya alındığı ancak sona ermediği; grev süresince ücretin kesilebildiği; kamuda beş iş günü öncesi bildirim zorunluluğu bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "Gelir vergisi, KDV ve harcama yapısı",
    lead: "Bölgeye göre özellikle konut maliyeti değişir; enflasyon verileri döneme bağlıdır.",
    accordions: [
      {
        title: "Temel vergiler",
        paragraphs: [
          "Gelir vergisinin kaynakta kesildiği; hane geliri, hane halkı yapısı ve indirimlere göre hesaplandığı; yıllık beyanın impots.gouv.fr üzerinden yapıldığı yazılır.",
          "Mal sahipleri için emlak vergisi; ikinci konutlar için konut vergisinin anıldığı; 1,3 milyon EUR üzeri gayrimenkul için IFI’nin yabancı uyruklu oturganlar için yurtdışı varlıkları da kapsayabildiği belirtilir.",
          "CSG ve CRDS oranlarının (örnek olarak %9,2 CSG’nin kısmının gelir vergisinden düşülebildiği ve %0,5 CRDS) sosyal finansmana aktarıldığı; standart KDV’nin metropol Fransa’da %20 olduğu; gıdada indirimli oranların bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Hanehalkı bütçesi (örnek)",
        paragraphs: [
          "INSEE 2017 aile bütçesi anketine göre ana harcama kalemlerinin ulaştırma, konut ve gıda olduğu; kültür ve dinlenmenin daha düşük paya sahip olduğu yazılır.",
          "Ukrayna savaşı sonrası enflasyonun Avrupa ortalamasının altında seyredebildiği; Haziran 2023’te yıllık %4,5 civarı örneğinin verildiği belirtilir (güncel oranlar için INSEE).",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "CPAM, hastane ve okul sistemi",
    lead: "Üç yaşında zorunlu okula başlama; devlet okulları laik ve ücretsizdir.",
    accordions: [
      {
        title: "Sağlık",
        paragraphs: [
          "Doktor veya diş hekimi seçmeden önce “conventionné” statüsünün ve ücret tarifesinin ameli.fr üzerinden kontrol edilmesi gerektiği yazılır.",
          "Anlaşmalı ücret üzerinden CPAM’ın yaklaşık %70 iade ettiği; örnek olarak aile hekimi ziyaretinde anlaşmalı ücretin 25 EUR, iadenin 16,10 EUR olduğu ve katılım paylarının eklenabildiği belirtilir.",
          "Reçeteli ilaçların eczanede satıldığı; hastanelerin kamu ve özel karması olduğu ifade edilir.",
        ],
      },
      {
        title: "Eğitim yapısı",
        paragraphs: [
          "Üç–on altı yaş arası eğitimin zorunlu olduğu; devlet okullarının ücretsiz ve laik olduğu; devletle sözleşmeli özel okulların müfredata uymak zorunda olduğu yazılır.",
          "İlkokul (CP–CM2), ortaokul (collège, altıncı–dokuzuncu sınıf) ve lise (seconde–terminale); meslekî liselerin CAP, BEP veya bac pro verdiği belirtilir.",
          "Üniversite ve IUT/BTS ile LMD (lisans üç yıl, yüksek lisans beş yıl, doktora sekiz yıl) çerçevesinin anıldığı; yabancı adaylar için Parcoursup veya ön kabul zorunluluğunun vurgulandığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ulasim-idare",
    tocLabel: "Ulaşım ve idari yapı",
    h2: "Bölgeler, TGV ve yerel ağlar",
    lead: "On sekiz bölge ve yüz bir departman; service-public.fr merkezî rehberdir.",
    accordions: [
      {
        title: "Ulaşım",
        paragraphs: [
          "Otoyol ağının çoğunlukla ücretli olduğu; otoyol hız sınırının çoğu yerde 130 km/s olduğu yazılır.",
          "Yaklaşık yirmi dokuz bin km demiryolu ve TGV ile şehirler arası kısa süreler (örnek Paris–Lyon iki saat, Paris–Lille bir saat) verildiği; bilet fiyatının dönem ve satın alma zamanına bağlı olduğu belirtilir.",
          "Paris ve Île-de-France için ratp.fr; Lyon, Marsilya, Bordeaux, Nantes, Toulouse ve Nice için ilgili toplu taşıma sitelerinin listelendiği ifade edilir.",
        ],
      },
      {
        title: "Yönetim",
        paragraphs: [
          "Cumhurbaşkanı, hükümet ve iki meclis (Ulusal Meclis ve Senato) ile anayasa denetiminin anıldığı yazılır.",
          "On sekiz bölge (metropol ve denizaşırı), yüz bir departman, arrondissement, kanton ve belediye (commune) yapısının özetlendiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı ve destek",
    h2: "MDPH, RQTH ve Agefiph",
    lead: "Yirmi ve üzeri çalışanı olan şirketlerde %6 işe alım veya katkı yükümlülüğü.",
    accordions: [
      {
        title: "Tanınma ve haklar",
        paragraphs: [
          "Engelliğin; fiziksel, duyusal, zihinsel, bilişsel veya psikolojik bozukluk sonucu kalıcı faaliyet kısıtı olarak tanımlandığı; MDPH üzerinden başvurunun CDAPH kararıyla sonuçlandığı ve RQTH onayı verilebildiği yazılır.",
          "İşyerinde makul uyarlama, Agefiph (özel sektör) ve FIPHFP (kamu) teşvikleri, AAH ve PCH gibi gelir desteklerinin ve CMI kartının ulaşım kolaylıkları sağlayabildiği belirtilir.",
        ],
      },
      {
        title: "İşveren yükümlülükleri",
        paragraphs: [
          "Yirmi ve üzeri çalışanda engelli işçi oranı %6’nın altındaysa AGEFIPH’e oransal katkı veya alternatif anlaşmaların devreye girebildiği yazılır.",
          "Cap Emploi’nun işverene aracılık ve ön eleme desteği verdiği; Mon parcours handicap ve MDPH en ligne portallarının güncel prosedürler için anıldığı ifade edilir.",
        ],
      },
    ],
  },
];
