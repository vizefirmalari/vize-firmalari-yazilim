import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Hungary” (11/06/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const MACARISTAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Macaristan’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Macaristan tam Schengen üyesidir; para birimi forinttir (HUF). Nemzeti Foglalkoztatási Szolgálat (NFSZ), Sanal İşgücü Piyasası (VMP) ve eures.munka.hu; kayıtlı iş arayan olmaksızın da bölge istihdam ofislerine başvuru; Macarca (ve ilana göre İngilizce) CV ile belge suretleri; kağıt başvuruda el ile imzalı ön yazı; EURES’te staj başlığının ulusal düzeyde “uygulanamaz” notu; çift eğitim yeri ile çıraklık sözleşmesi (2019 meslekî eğitim kanunu); KSH ve MNB verileriyle konut fiyatları ve kira aralıkları; 90 gün sonra ikamet bildirimi ve OIF kayıt belgesi / ikamet kartı; tel çalışma ve basitleştirilmiş istihdam (EFO) ile 2025 günlük kamu harçları; 1 Ocak 2025 itibarıyla aylık asgari ücret HUF 296 400 ve garantili asgari ücret HUF 326 000; Mt. yazılı sözleşme ve zorunlu unsurlar; yıllık 250 saat fazla mesai + yazılı anlaşmayla 150 saat gönüllü fazla mesai; sendika üyeliği yaklaşık %9 ve toplu iş sözleşmesi pratiği; düz %15 gelir vergisi ve 25 yaş altı PIT muafiyeti; TAJ kartı ve NEAK sözleşmeli sağlık; e-vinyet ve Budapeşte otopark bölgeleri; değişen iş gücü için rehabilitasyon katkısı ve %5 kota başlıklarında kamu bilgisine dayanır.",
  "Oranlar, harçlar ve forint tutarları güncellenebilir. Doğrulama için nfsz.munka.hu, vmp.munka.hu, eures.munka.hu, oif.gov.hu, nav.gov.hu, neak.gov.hu ve ksh.hu kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const MACARISTAN_SEO_KEYWORD_TAGS: string[] = [
  "macaristan vize",
  "macaristan schengen çalışma",
  "NFSZ VMP Hungary",
  "OIF registration certificate EU Hungary",
  "Hungary minimum wage 2025 HUF 296400",
  "EFO simplified employment Hungary",
  "Mt 2012 Labour Code Hungary",
];

export const MACARISTAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-nfsz",
    tocLabel: "İş bulma",
    h2: "NFSZ, VMP ve yetkili aracılık",
    lead: "Kamu ve özel istihdam hizmetleri iş arayana ücret alamaz.",
    accordions: [
      {
        title: "Kamu ağı ve ilanlar",
        paragraphs: [
          "İstihdam hizmetinin Budapeşte ve ilçe hükümet ofisleri idari birimleri ile kayıtlı özel istihdam büroları tarafından sunulabildiği; aracılık ücretinin iş arayana yansıtılamayacağı yazılır.",
          "Yalnızca kayıtlı iş arayanların değil, herkesin yerel istihdam servislerine veya özel bürolara başvurabileceği belirtilir.",
          "Bilgilerin nfsz.munka.hu üzerinden; güncel boş kadroların Virtuális Munkaerőpiac Portál (vmp.munka.hu) üzerinden listelendiği; işverenlerin ilanını VMP’ye koyabildiği ifade edilir.",
          "EURES Macaristan bağlantısının da nfsz.munka.hu üzerinden erişilebildiği yazılır.",
        ],
      },
      {
        title: "Diğer kanallar",
        paragraphs: [
          "İş portalları, işe alım etkinlikleri, broşürler, LinkedIn ve Facebook gibi sosyal ağlar ile mesleki ağın iş aramada yardımcı olabildiği belirtilir.",
          "İşgücü trendleri ve sektör notları için Központi Statisztikai Hivatal (KSH) ve munkaugyiszemle.hu kaynaklarının anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-cv",
    tocLabel: "Başvuru",
    h2: "Macarca CV, ön yazı ve dijital iz",
    lead: "Nitelik ve dil sınav belgelerinin suretleri eklenmelidir.",
    accordions: [
      {
        title: "CV ve ön yazı biçimi",
        paragraphs: [
          "CV’nin Macarca ve ilana bağlı olarak İngilizce de hazırlanması gerektiği; elektronik veya basılı sunumun ilan şartına uygun olması beklendiği yazılır.",
          "CV’nin bir–iki sayfayı geçmemesi; kişisel veri ve iletişim, eğitim ve kurslar (ters kronoloji), işyerleri ve deneyim, BT becerileri, diller, ehliyet, diğer yetkinlikler ve hobilerin yer alması gerektiği belirtilir.",
          "Ön yazının ilanı duyma kanalını, başvurulan pozisyonu, ilgili yetkinlikleri ve hedefleri anlatması; bir sayfayı aşmaması; kağıt başvuruda el ile imzalanması gerektiği; CV ile tutarlı ve ilan beklentilerine yanıt verir olması vurgulanır.",
        ],
      },
      {
        title: "Referans ve ön eleme",
        paragraphs: [
          "Referans veren kişilerden izin alınması ve iletişim bilgilerinin doğruluğunun kontrol edilmesi gerektiği yazılır.",
          "İşverenlerin arka plan araştırması ve sosyal medya profillerini inceleyebildiği; dijital görünürlüğe dikkat edilmesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "mesleki-ciraklik",
    tocLabel: "Meslekî eğitim",
    h2: "Staj çerçevesi ve çift sistem çıraklık",
    lead: "Çıraklık sözleşmesi öğrenci ile çift eğitim yerini bağlar; Mt. çekinceyle uygulanır.",
    accordions: [
      {
        title: "EURES “staj” notu",
        paragraphs: [
          "EURES kamu sayfasında Macaristan için “traineeships” başlığının tanım, uygunluk, kalite çerçevesi ve aday/işveren alt başlıklarında “uygulanamaz / bilgi yok” ibareleriyle doldurulduğu yazılır.",
        ],
        callout: {
          variant: "info",
          text: "Uluslararası staj arayanlar için bu bölüm boş bırakılmıştır; pratik dönemler çoğunlukla meslekî eğitim ve çıraklık sözleşmesi kapsamında düzenlenir.",
        },
      },
      {
        title: "Çıraklık sözleşmesi ve odalar",
        paragraphs: [
          "Macaristan’daki meslekî eğitim kurumunda veya yetişkin eğitiminde kayıtlı öğrencilerin, çıraklık sözleşmesiyle çift eğitim yerinde meslekî eğitime katılabildiği yazılır.",
          "Sözleşmenin öğrencinin programa katılım şartlarını kabul etmesi ve çift eğitim yerinin öğrenciyi programa istihdam etmesi ile destekleri sağlamayı üstlendiği; öğrencinin yaptığı iş için ücret alma hakkı bulunduğu belirtilir.",
          "Ücretin, yılın ilk günündeki zorunlu aylık asgari ücretin yüzdesi olarak kanunla belirlendiği; akademik yıl sonrası temmuz–ağustosta, seçilen meslekteki nitelikli çalışanla benzer ek ödeme haklarının anıldığı ifade edilir.",
          "Meslekî eğitim kurumlarıyla birlikte ekonomi odalarının (mkik.hu, nak.hu) yeterlilik testi, çift eğitim yeri tescili ve denetimde rol oynadığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "konut-ksh",
    tocLabel: "Konut",
    h2: "KSH verileri ve kira aralıkları",
    lead: "Budapeşte ile bölge arasında metrekare ve konut tipi fiyatları ayrışır.",
    accordions: [
      {
        title: "Satılık ve metrekare",
        paragraphs: [
          "Emlakçı, broşür, siteler ve sosyal medya gruplarının aramada kullanıldığı yazılır.",
          "2025 başlarında yaklaşık 7 200 yeni konuttan 2 400’ü için detaylı veri bulunduğu; ülke genelinde yeni konut başına ortalama fiyatın yaklaşık HUF 61,2 milyon olduğu ve m² başına ortalamanın yaklaşık HUF 1,04 milyon çevresinde olduğu belirtilir.",
          "Budapeşte’de 2024’ün ilk üç çeyreğinde yeni konut ortalamasının yaklaşık HUF 75 milyon olduğu; Siófok’ta m² fiyatının Budapeşte seviyesini aştığı (yaklaşık HUF 1,35 milyon); Győr, Kecskemét ve Nyíregyháza için örnek m² fiyatlarının sırasıyla yaklaşık HUF 860 000, 780 000 ve 660 000 olduğu ifade edilir.",
          "2024 üçüncü çeyrekte ikinci el konut satış ortalamasının yaklaşık HUF 28,1 milyon ve m² ortalamasının yaklaşık HUF 472 000 olduğu; Budapeşte’de ikinci el daire ortalamasının yaklaşık HUF 46,8 milyon ve m²’nin yaklaşık HUF 915 000 olduğu yazılır.",
        ],
      },
      {
        title: "Kira ve sözleşme",
        paragraphs: [
          "Küçük dairelerde (50–70 m²) kamu hariç aylık kiraların tipik olarak yaklaşık HUF 170 000–220 000 aralığında olduğu; bölgeye göre geniş sapma olabildiği belirtilir.",
          "Sosyal medya ilanlarının takip edilmesi; mülkiyet değişiminde kısa sürede taşınma riskine karşı hazırlıklı olunması gerektiği ifade edilir.",
          "Aidat, ortak giderler ve sayaç okumaları (düz tarife mi ayrı sayaç mı) konusunda netlik ve devir anında son endeks kayıtlarının yazılı alındığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "okul-aile",
    tocLabel: "Okul",
    h2: "Kreş, ilkokul ve sınavlı seçim",
    lead: "Üç yaşından itibaren kreş zorunluluğu vardır; muafiyet sınırlıdır.",
    accordions: [
      {
        title: "Kademeler ve kayıt",
        paragraphs: [
          "Taşınmadan önce yerleşim bölgesindeki kurum türleri ve boş kontenjanların araştırılması; önceki okuldan karne, değerlendirme ve sağlık belgelerinin getirilmesi gerektiği yazılır.",
          "Kreş (3–6 yaş), sekiz yıllık ilkokul, ortaokul (4, 6 veya 8 sınıflı gimnazyum, meslekî ortaokul, teknik okul) ve yükseköğretim yapısının özetlendiği belirtilir.",
          "Dört sınıflı ortaokul ve ilkokulda bölgesel kayıt önceliğinin sürdüğü; altı ve sekiz sınıflı gimnazyumlarda yalnızca giriş sınavına dayalı yerleşim olduğu ifade edilir.",
        ],
      },
      {
        title: "AB aileleri ve maliyet",
        paragraphs: [
          "AB vatandaşı çocuklarının Macar çocuklarla aynı haklara sahip olduğu; tam zamanlı öğrenci kimliği, devlet destekli eğitim ve burslara erişimin mümkün olduğu yazılır.",
          "Almanca, Slovakça, Rumence ve Hırvatça gibi yabancı veya azınlık dili programlarının çeşitli yerlerde sunulduğu belirtilir.",
          "Öğrenim giderleri ve ücretsiz/indirimli ders kitabı ile sübvansiyonlu yemek oranlarının metinde verildiği örnek tutarların güncel teyit için oktatas.hu ve KSH’ye bakılması gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-oif",
    tocLabel: "İkamet",
    h2: "Schengen girişi, 90 gün ve OIF bildirimi",
    lead: "Üç aydan uzun kalmak için istihdam, öğrenim veya kaynak + sigorta şartlarından biri aranır.",
    accordions: [
      {
        title: "AB/EEA ve İsviçre",
        paragraphs: [
          "Macaristan’ın tam Schengen üyesi olduğu; AB, EEA ve İsviçre uyruklularının geçerli pasaport veya kimlikle vizesiz en fazla üç aya kadar kalabildiği yazılır.",
          "13 Aralık 1957 Paris anlaşması uyarınca bazı ülkelerde pasaport/kimlik süresinin girişten en fazla bir yıl önce dolmuş olmasına rağmen doksan güne kadar girişe izin verilebildiği notunun anıldığı belirtilir.",
          "İlk 90 günde ayrı kayıt zorunluluğu olmadığı; geçerli belgeyle kalışın yasal sayıldığı ifade edilir.",
        ],
      },
      {
        title: "Üç aydan fazla ve adres kartı",
        paragraphs: [
          "Doksan günden fazla kalmak için istihdam veya serbest meslek, Macaristan’da kayıtlı öğrenim veya kendisi ve ailesi için yeterli kaynak ve tam sağlık güvencesi şartlarından en az birinin sağlanması gerektiği yazılır.",
          "AB vatandaşlarının kayıt belgesi (registration certificate), AB dışı aile üyelerinin beş yıla kadar ikamet kartı başvurusunda bulunması gerektiği belirtilir.",
          "İkamet hakkı tanındıktan sonra resmî adres kartının otomatik düzenlendiği; adres değişikliklerinin belediye veya belge ofisine bildirilmesi gerektiği ifade edilir.",
          "Vize dışı konularda İçişleri Bakanlığı ve OIF (oif.gov.hu); vize politikasında Dışişleri ve Ticaret Bakanlığı’nın yetkili olduğu; KKM konsoloslukları ve eures.munka.hu “hazaterok” sayfalarının kaynak gösterildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "istihdam-atipik",
    tocLabel: "İstihdam türleri",
    h2: "Tel çalışma, geçici işçilik ve EFO",
    lead: "Basitleştirilmiş istihdam (EFO) tarım, turizm, günlük iş ve figüran için hafif idari yük sunar.",
    accordions: [
      {
        title: "Standart ve atipik ilişkiler",
        paragraphs: [
          "Genel kuralın on altı yaşında istihdam; okul tatillerinde on beş yaş ve özel sanat/spor koşulları istisnaları olduğu yazılır.",
          "Karşılıklı anlaşma olmadıkça süresiz ve tam zamanlı işin varsayılan olduğu; yarı zamanlı, süreli, tel çalışma, parça başı ev işi, geçici işçi ajansı ve koruyucu ebeveyn istihdamı gibi atipik biçimlerin düzenlendiği belirtilir.",
          "Pandemi sonrası tel ve hibrit çalışmanın sözleşmelerde sık yer aldığı ifade edilir.",
        ],
      },
      {
        title: "EFO ve mevsimlik tarım",
        paragraphs: [
          "EFO’nun tarım ve turizm mevsimlik işi, günlük iş ve film figüranı için kullanılabildiği; bildirimle hukuki ilişkinin başladığı ve 185 hat, e-bildirim veya EFO uygulamasıyla kayıt yapılabildiği yazılır.",
          "1 Şubat 2025’ten itibaren günlük kamu harçlarının tarım–turizm mevsimlik için HUF 2 200, günlük iş için HUF 4 400, figüran için HUF 8 700 örnekleriyle anıldığı; günlük net tavanların ve muaf tutarların asgari ücrete bağlandığı belirtilir.",
          "1 Ocak 2025’ten itibaren zorunlu aylık asgari ücretin HUF 296 400 ve meslekî nitelik için garantili asgari ücretin HUF 326 000 olduğu ifade edilir.",
          "Mevsimlik kapsamında üçüncü ülke vatandaşlarının yalnızca tarım mevsimlik işinde istihdam edilebildiği ve kaçak çalışmanın tarımda yaygın risk olarak belirtildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-ucret",
    tocLabel: "Sözleşme ve ücret",
    h2: "Yazılı iş sözleşmesi ve bordro",
    lead: "EFO’da yazılı zorunluluk istisnası; diğer durumlarda işveren yazılı düzenlemekle yükümlüdür.",
    accordions: [
      {
        title: "Sözleşme içeriği ve bilgilendirme",
        paragraphs: [
          "İstihdamın her zaman iş sözleşmesiyle kurulduğu ve sözleşmenin yazılı olması gerektiği; yazılı yükümlülüğün işverende olduğu yazılır.",
          "Zorunlu unsurların görev tanımı, iş yeri ve temel ücret olduğu; işe başlamadan en geç on beş gün içinde günlük çalışma saati, diğer ücret unsurları, ödeme tarihi, yıllık izin hesabı, ihbar süreleri ve işveren sıfatı taşıyan kişi bilgisinin verilmesi gerektiği belirtilir.",
          "EFO’da kayıt yükümlülüğü sağlandıkça yazılı sözleşme zorunluluğunun bulunmadığı; şablon sözleşme kullanılırsa yazılılık beklendiği ifade edilir.",
        ],
      },
      {
        title: "Ödeme ve kesintiler",
        paragraphs: [
          "Ücretin hesaplara işlenmesi ve tek ödemede aylık olarak ödenmesi kuralının geçerli olduğu; ayrı düzenlenebildiği yazılır.",
          "Bordronun brüt, vergi ve sosyal güvenlik kesintileri ile neti göstermesi gerektiği; çalışandan yalnızca kanun, icra kararı veya rıza ile kesinti yapılabildiği belirtilir.",
          "Çalışan tarafından brüt gelirden %18,5 sosyal güvenlik ve düz %15 gelir vergisi kesildiği; 1 Ocak 2022’den beri yirmi beş yaş altıların belirli tavan altı gelirde PIT’ten muaf tutulduğu; işverenin %13 refah katkı payı ve yirmi beşten fazla çalışanı olan işverenlerde ortalama engelli istihdamı %5’in altındaysa rehabilitasyon katkısı yükümlülüğü anıldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-izin",
    tocLabel: "Çalışma süresi ve izin",
    h2: "Fazla mesai, dinlenme ve yıllık izin",
    lead: "Pazar çalışması genelde %50 zamlıdır; gece 22.00–06.00 arasıdır.",
    accordions: [
      {
        title: "Günlük ve haftalık sınırlar",
        paragraphs: [
          "Çalışma süresinin işe hazırlık ve bitiş işlerini kapsadığı; ev–iş yolculuğunun çalışma süresi sayılmadığı yazılır.",
          "Tam zamanlı günlük sekiz saat; nöbet türü veya işveren akrabası için günlük en fazla on iki saat üst sınırı örnekleri anıldığı belirtilir.",
          "Günlük veya haftalık çalışmanın sırasıyla on iki veya kırk sekiz saati aşamayacağı; nöbet işlerinde daha yüksek üst sınırların mümkün olduğu ifade edilir.",
          "2025’te takvim yılında en fazla 250 saat fazla mesai ve yazılı anlaşmayla ek 150 saat gönüllü fazla mesai sipariş edilebildiği yazılır.",
        ],
      },
      {
        title: "Dinlenme ve izin hakları",
        paragraphs: [
          "Altı saati aşan günde en az yirmi dakika mola; günler arası en az on bir saat dinlenme; haftada iki dinlenme günü veya ayda bir Pazar içeren kırk sekiz saat kesintisiz haftalık dinlenme periyodu kurallarının anıldığı belirtilir.",
          "Temel yıllık iznin yirmi iş günü olduğu; yaşa bağlı ek izin basamaklarının Mt.’de listelendiği; analık, ebeveynlik ve hastalık izni koşullarının ayrıntılı olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "fesih",
    tocLabel: "Fesih",
    h2: "Deneme, ihbar ve kıdem",
    lead: "İşveren feshinde gerekçe doğru, makul ve açık olmalıdır.",
    accordions: [
      {
        title: "Bildirim ve yasaklı dönemler",
        paragraphs: [
          "Deneme süresinin en fazla üç ay veya toplu iş sözleşmesinde altı ay olabildiği yazılır.",
          "Fesih bildiriminin yazılı olması ve işverenin gerekçe göstermesi gerektiği; gerekçenin doğru, makul ve açık olma şartının Avrupa Adalet Divanı içtihatlarıyla bağlandığı belirtilir.",
          "İhbar süresinin en az otuz gün ve hizmet süresine göre doksan güne kadar uzayabildiği; tarafların altı aya kadar daha uzun sürede anlaşabildiği ifade edilir.",
        ],
      },
      {
        title: "Hemen fesih ve kıdem tazminatı",
        paragraphs: [
          "Ağır sözleşme ihlali veya ilişkinin sürdürülemeyeceği davranışta derhal fesih hakkının on beş gün / bir yıl içinde kullanılması gerektiği yazılır.",
          "En az üç yıl hizmet ve belirli şartlarda ihbarla feshte kıdem tazminatı ödenebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-uyusmazlik",
    tocLabel: "Sendika ve uyuşmazlık",
    h2: "İş mahkemesi ve grev çerçevesi",
    lead: "Sendika üyeliği yaklaşık %9 civarında; toplu görüşme kültürü güçlüdür.",
    accordions: [
      {
        title: "Temsil ve toplu sözleşme",
        paragraphs: [
          "Sendika ve işyeri temsilciliği kurmanın serbest olduğu; on beş çalışanın üzerinde işyeri temsilcisi, ellinin üzerinde iş konseyi seçiminin gündeme gelebildiği yazılır.",
          "MaSZSZ, LIGA, SZEF gibi konfederasyon üye sayılarının metinde verildiği; iş konseyi federasyonunun (MOSZ) üye ve toplu sözleşme sayılarına dair örneklerin anıldığı belirtilir.",
        ],
      },
      {
        title: "İş hukuku uyuşmazlığı ve grev",
        paragraphs: [
          "İş uyuşmazlıklarının iş mahkemesinde görüldüğü; çoğu hak talebinde üç yıllık zamanaşımı bulunduğu; bazı işveren işlemlerinde otuz günlük süre olduğu yazılır.",
          "Grev çağrısının toplu uyuşmazlıkta yedi günlük uzlaşma başarısızlığından sonra mümkün olduğu; hayati hizmetlerde yeterli hizmet düzeyi anlaşması veya mahkeme kararı şartının anıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-saglik",
    tocLabel: "Vergi ve sağlık",
    h2: "Düz PIT, KDV ve TAJ",
    lead: "Kişisel gelir vergisi oranı gelir diliminden bağımsız %15’tir; çocuk ve gençlik indirimleri uygulanır.",
    accordions: [
      {
        title: "Gelir vergisi ve KDV",
        paragraphs: [
          "Konsolide vergi matrahının çocuk vergi indirimi, ilk evlilik kredisi ve otuz yaş altı anneler için ek indirimlerle düşürülebildiği yazılır.",
          "KDV oranlarının %27, %18 ve %5 olarak ürün ve hizmete göre değiştiği; finansal hizmetlerde muafiyet örneklerinin anıldığı belirtilir.",
          "Yerel vergilerin bina, arazi, komün, turizm ve işyeri vergisi gibi kalemleri kapsadığı ifade edilir.",
        ],
      },
      {
        title: "NEAK ve TAJ",
        paragraphs: [
          "Sözleşmeli sağlık kuruluşlarında NEAK anlaşması kapsamındaki bakımın genelde ücretsiz olduğu; fazla kapasiteden ücret alınabildiği yazılır.",
          "Sigortalıların TAJ kartıyla haklarını kanıtladığı; AB geçici ziyaretçilerinin acil bakım için EHIC sunabildiği belirtilir.",
          "Sigortalı olmayanların aylık sağlık hizmeti katkısıyla sisteme erişebildiği; tutarın yıllık TÜFE ile güncellendiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-ulasim",
    tocLabel: "Yaşam ve ulaşım",
    h2: "Siyasi yapı, kültür ve e-vinyet",
    lead: "Budapeşte Ferenc Liszt Havalimanı yolcu trafiği yüksektir; taksi ücreti resmî tarifeye bağlıdır.",
    accordions: [
      {
        title: "Yönetim ve medya",
        paragraphs: [
          "1989’dan beri çok partili cumhuriyet; dört yılda bir genel ve yerel seçimler; mecliste %5 barajı ve hükümet kurma sürecinin özetlendiği yazılır.",
          "Hukuk sisteminin kıta Avrupası geleneğine uygun hiyerarşi ve anayasa yargısıyla düzenlendiği belirtilir.",
        ],
      },
      {
        title: "Ulaşım maliyetleri",
        paragraphs: [
          "Otoyol ve seçilmiş devlet yollarında e-vinyet ve 3,5 tondan ağır araçlarda mesafe bazlı ücretlendirme olduğu yazılır.",
          "Budapeşte’de A–D otopark bölgelerinde saatlik ücret örneklerinin (HUF 600–200) anıldığı; BKK tek bilet örnek fiyatının metinde verildiği ve güncel teyit için bkk.hu önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Kota ve rehabilitasyon katkısı",
    lead: "Yirmi beşten fazla çalışanı olan işveren ortalama engelli istihdamını %5’in altına düşürürse yıllık katkı öder.",
    accordions: [
      {
        title: "Değişen iş gücü ve destekler",
        paragraphs: [
          "1998/XXVI. kanunda birleşik engellilik tanımının; istihdamda “değişen iş gücü” kavramının sağlık kurulu raporuyla belirlendiği yazılır.",
          "Eşit muamele kanununun işe alım ve fesih aşamalarında ayrımcılığı yasakladığı; Mt.’de ek yıllık izin ve makul düzenleme beklentilerinin anıldığı belirtilir.",
        ],
      },
      {
        title: "İşveren yükümlülüğü ve muafiyet",
        paragraphs: [
          "Eksik engelli istihdamı başına rehabilitasyon katkısının dokuz kat asgari ücret tutarında (2025 için metinde verilen çarpım örneği) hesaplandığı yazılır.",
          "Sosyal katkı vergisi indirimleri, ücret sübvansiyonu ve bariyersiz işyeri kamu desteği çağrılarının kormányhivatal rehabilitasyon birimleri ve NFSZ üzerinden yürütüldüğü ifade edilir.",
        ],
      },
    ],
  },
];
