import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Malta” (04/06/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const MALTA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Malta’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Malta’da iş arama, Jobsplus kaydı, staj ve çıraklık, ikamet belgeleri ile vergi ve sosyal güvenlik başlıkları kaynak metne dayanır.",
  "Metinde geçen tutarlar (örneğin haftalık asgari ücret 2025, ikramiyeler, vergi dilimleri, feribot ücretleri) kaynak sayfadaki döneme bağlıdır; yürürlük ve oranlar güncellenebilir. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const MALTA_SEO_KEYWORD_TAGS: string[] = [
  "malta vize",
  "malta schengen",
  "jobsplus malta",
  "eures malta",
  "malta çalışma",
  "identity malta residence card",
  "malta asgari ücret 2025",
  "mcast apprenticeship",
];

export const MALTA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "EURES Malta ve Jobsplus",
    lead: "Varış öncesi ve sonrası kayıt; iş danışmanı desteği.",
    accordions: [
      {
        title: "Henüz adaya gelmemiş iş arayanlar",
        paragraphs: [
          "Malta’ya henüz varmamış iş arayanların kişiselleştirilmiş rehberlik için EURES Malta ofisiyle iletişime geçebileceği; nasıl ve nerede iş aranacağı konusunda yardım alınabildiği belirtilir.",
        ],
      },
      {
        title: "Malta’da olanlar ve Jobsplus",
        paragraphs: [
          "Malta’ya varmış ve iş arayanların jobsplus.gov.mt sitesinden veya Jobsplus sitesinde yer alan adreslerdeki Jobcentre’lardan kamu istihdam servisine kayıt olabileceği yazılır.",
          "Jobcentre ziyaretinden önce randevu alınması gerektiği; telefon numaralarının da Jobsplus sitesinde bulunduğu belirtilir.",
          "EURES hizmetlerinin Jobsplus bünyesinde sunulduğu; iş ilanlarına Jobsplus ana sayfası veya EURES ana sayfasından erişilebildiği ifade edilir.",
          "Sitede sektör, iş türü ve bölgeye göre aranabilen çevrimiçi boş pozisyon veri tabanı ile işverenlerin iş arayan arayabileceği bir CV arama özelliği bulunduğu yazılır.",
          "Kişinin Jobsplus’a işsiz olarak kaydolması halinde İstihdam Danışmanı biçiminde kişiselleştirilmiş yardım verildiği belirtilir.",
        ],
        bullets: [
          "İş ilanlarının ticari dergilerde ve yerel gazetelerde de yayımlandığı; özel istihdam acentelerinin bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru",
    h2: "İngilizce CV ve ön yazı",
    lead: "Daktilo edilmiş başvuru; mülakat ve sağlık kontrolü.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "Tüm başvurularda İngilizce yazılmış bir özgeçmiş (CV) ve ön yazının bulunması; başvurunun daktilo edilmiş olması gerektiği belirtilir.",
          "CV’nin normalde iki sayfayı geçmemesi; standart Avrupa CV formatının kullanılmasının önerildiği; Europass sitesinden indirilebileceği yazılır.",
          "Sadelik, özlük ve kesinlik önerilir; CV’de kişisel bilgiler, eğitim, diller, diğer beceriler ve yetkinlik alanları, kariyer ve hobiler yer almalıdır.",
          "Ön yazının genelde birkaç paragrafı geçmemesi; işverene kariyer hedefleri, eğitim geçmişi, mesleki deneyim ve müsaitlik hakkında bilgi verdiği; ilana ilgi ve nitelik vurgusunun önemli olduğu belirtilir.",
        ],
      },
      {
        title: "Formlar, mülakat ve sağlık",
        paragraphs: [
          "Bazı işverenlerin başvuranların doldurması için kendi formlarını verdiği; formların standart veya önceki deneyim hakkında daha açık uçlu sorular içerebildiği yazılır.",
          "CV sonrası işverenin adayları mülakata çağırabildiği; bazen birden fazla mülakat veya role özel becerilerin değerlendirilmesi için ek ölçüm yapılabildiği belirtilir.",
          "Bazı durumlarda işe başlamadan önce tıbbi muayene istenebildiği; tanınmış bir sağlık profesyonelinin adayın standardı karşılayıp karşılamadığını ve işe uygun olup olmadığını belirten sağlık raporu verdiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "On iki haftayı aşmayan staj ve Jobsplus anlaşması",
    lead: "Konsey tavsiyesi; saat başına asgari ücrete göre yardım.",
    accordions: [
      {
        title: "Süre ve yazılı anlaşma",
        paragraphs: [
          "Staj kalite çerçevesi tavsiyesiyle uyumlu olarak Malta’da stajların on iki haftadan uzun sürmediği belirtilir.",
          "Stajın işveren, stajyer ve Jobsplus temsilcisi arasında yazılı anlaşmaya dayandığı yazılır.",
        ],
      },
      {
        title: "Yardım ve başvuru mercii",
        paragraphs: [
          "Katılımcıların Jobsplus tarafından ödenen ve ulusal asgari ücrete göre hesaplanan bir yardıma hak kettiği; katıldıkları her saat için hesaplandığı ifade edilir.",
          "Fırsatların, işveren duyurularının ve desteğin doğrudan Jobsplus Eğitim Departmanı üzerinden yürütüldüğü kaynakta tekrarlanır.",
        ],
      },
    ],
  },
  {
    id: "ciraklik",
    tocLabel: "Çıraklık",
    h2: "Bölüm 576 ve MCAST / ITS",
    lead: "Lisanslı MYO sağlayıcı ve kayıtlı sponsor; eğitim anlaşması.",
    accordions: [
      {
        title: "Hukuki çerçeve",
        paragraphs: [
          "Çıraklıkla ilgili başlıca yasal belge olarak “Chapter 576 - Work-based Learning and Apprenticeship Act” anılır.",
          "“Apprenticeships” teriminin; çırakların lisanslı mesleki eğitim ve öğretim (MYO) sağlayıcısında okul temelli öğrenme ile kayıtlı sponsorla iş temelli öğrenmeye katıldığı ve sonucun Bölüm 576 Ek 1’de özetlenen tanınmış bir mesleki yeterlilik veya ödül olduğu program anlamına geldiği belirtilir.",
          "Bölüm 576’ya göre eğitim ilişkisinin MYO sağlayıcısı, sponsor ve çırak arasında eğitim anlaşmasının imzalanmasıyla kurulduğu yazılır.",
          "Malta’da çıraklıkların Malta Sanat, Bilim ve Teknoloji Koleji (MCAST) ve Turizm Enstitüsü (ITS) tarafından sunulduğu; akademik programın iş temelli öğrenme bileşeniyle birleştirildiği ifade edilir.",
        ],
      },
      {
        title: "MCAST ve ITS",
        paragraphs: [
          "MCAST’ın çıraklık programına kayıt imkânı sunduğu; elli’den fazla çıraklık tabanlı kurs verdiği; Malta Yeterlilik Çerçevesi 3 ve 4. seviyelerinde farklı sektörlerde yaygın kurslar bulunduğu belirtilir.",
          "Çıraklara temel maaş ödendiği; işveren, öğrenci ve MYO sağlayıcı yükümlülüklerini içeren eğitim anlaşmasının tüm paydaşlarca imzalandığı yazılır.",
          "ITS’de öğrencilere okulda öğrendiklerini iş yerinde uygulama ve şirketlerle bağlantı kurarak mezuniyet sonrası iş tekliflerine giden yollar açma amacıyla çıraklık sunulduğu; öğrencilerin de temel maaş aldığı ifade edilir.",
        ],
      },
      {
        title: "Uygunluk, süre ve çalışma koşulları",
        paragraphs: [
          "Malta’da ikamet eden ve MCAST veya ITS’de çıraklık biçiminde kursa başvuran tüm AB/AEA/İsviçre uyruklularının, kontenjana bağlı olarak ilgili sektörde sponsorlu işe alım eğitimine uygun olduğu belirtilir.",
          "Çıraklıkların çerçeveye bağlı olarak tipik olarak bir ila üç yıl sürdüğü; işbaşı ve iş dışı eğitimden oluştuğu; programların MCAST/ITS enstitülerinde başlayıp ardından şirkette uygulamalı eğitimle sürdüğü yazılır.",
          "Çırakların İstihdam ve Sanayi İlişkileri Kanunu, uygulanıyorsa Gençlik (İstihdam) Tüzükleri ve Sosyal Güvenlik Kanunu kapsamında; deneme süresi, iş temelli öğrenme saatleri, fazla mesai, hayat pahalılığı artışı, iş sağlığı ve güvenliği, tatil ve hastalık izni, doğum–ebeveyn–acil aile izni, haftalık dinlenme gününe denk gelen resmî tatiller, düzenli aralıklarla ücret, yasal ikramiyeler ve sosyal güvenlik hakları gibi başlıklarda düzenlendiği belirtilir.",
          "Sponsorun fazla mesai için MYO sağlayıcısından gerekli yazılı onayı alması şartıyla çırakların fazla mesaiye uygunluğunun eğitim anlaşmasında belirlenebildiği ifade edilir.",
          "Çırakların akademik yıl başına değerlendirme dönemlerinde, MYO sağlayıcısının resmî programını sunduğu sürelerde kullanılmak üzere en fazla dört gün ücretsiz çalışma iznine hak kettiği yazılır.",
        ],
      },
      {
        title: "Fırsatlar ve iletişim",
        paragraphs: [
          "Çıraklık şemasında meslek kursuna kayıtlı tüm öğrencilerin endüstri sponsoruyla iş deneyimine uygun olduğu; endüstri ortaklarının MCAST tarafından kaydedildiği ve web portalında MCAST öğrencileri için boş pozisyon sunabildiği belirtilir.",
          "ITS çıraklık bilgisi için www.its.edu.mt adresine başvurulması önerilir.",
          "MCAST kayıtlı öğrencilere İş Temelli Öğrenme Departmanı ve kolej burs ofisinin destek verdiği; işverenlerin apprenticeships@mcast.edu.mt ve ITS sitesi üzerinden iletişim kurabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "ikamet-ab",
    tocLabel: "İkamet (AB)",
    h2: "Üç ay ve Residence card",
    lead: "Identity Malta Expatriates Unit; beş yıl geçerlilik.",
    accordions: [
      {
        title: "Giriş ve üç ay",
        paragraphs: [
          "Tüm AB vatandaşlarının serbest dolaşım ve oturma hakkına dayanarak Malta’da ikamet etme hakkı bulunduğu; Malta’da çalışanlarla kamu fonlarına yük olmadan yeterli mali desteği olan çalışmayanlar için de geçerli olduğu belirtilir.",
          "AB vatandaşlarının Malta’ya vizeyle girmek zorunda olmadığı; aile üyeleriyle birlikte varıştan itibaren üç ay boyunca oturma belgesi başvurusunda bulunma zorunluluğu olmadığı; ancak pasaport veya kimlik kartı bulundurma yükümlülüğü olduğu yazılır.",
        ],
      },
      {
        title: "Üç aydan uzun kalış",
        paragraphs: [
          "Malta’ya göçü düzenleyen hukuki aracın Göçmenlik Kanunu (Malta Kanunları Bölüm 217) olduğu belirtilir.",
          "Avrupalı bir vatandaşın üç aydan fazla kalmak istemesi halinde yasal haklarını kullanarak (öğrenim, çalışma veya geçim için yeterli kaynak) faaliyet göstermesi ve Identity Malta bünyesindeki Expatriates Unit’e Residence card başvurusu yapması gerektiği yazılır.",
          "Başvurunun normalde kişinin çalıştığı veya kendi geçimini sağladığının kanıtı gibi koşullarla kabul edildiği; Avrupa vatandaşları ve aile üyelerine verilen ikamet belgesinin beş yıl geçerli olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "varis-kontrol",
    tocLabel: "Varış kontrol listesi",
    h2: "Önce ve sonra resmî adımlar",
    lead: "Belgeler, Jobsplus ve sosyal güvenlik numarası.",
    accordions: [
      {
        title: "Varış öncesi",
        paragraphs: [
          "(Geçici) konut ayarlanması; ilk aylar için yeterli fon; eures.com.mt üzerinden Malta EURES ofisi ve www.jobsplus.gov.mt ile iş arama planlanması önerilir.",
          "Hazır bulundurulması gereken belgeler: geçerli pasaport veya seyahat belgesi (küçük çocuklar pasaportta kayıtlı olmalı); araç belgeleri (ehliyet vb.); diploma, iş geçmişi onayı, referanslar (gerekirse asıl ve çeviri); CV; çocukların okul belgeleri; Avrupa Sağlık Sigortası Kartı veya sağlık sigortası kanıtı; U1 veya U2 formu; evcil hayvan pasaportları; diğer kişisel belgeler (doğum, evlilik vb.); uluslararası arama (roaming) hizmetinin sipariş edilmesi kaynakta sayılır.",
        ],
      },
      {
        title: "İş bulunduktan sonra",
        paragraphs: [
          "Sözleşmeye sahip olunduktan sonra sosyal güvenlik numarası için www.socialsecurity.gov.mt üzerinden kayıt yapılması gerektiği belirtilir.",
          "İşverenin istihdamı yasal olarak kaydetmek için Jobsplus’a işe başlama formunu doldurup göndermesi gerektiği; form işlendiğinde onay mektubu alınacağı yazılır.",
          "Identity Malta’da (identita.gov.mt) Expatriates Unit üzerinden Residence Card için kayıt yapılması ve banka hesabı açılması önerilir.",
        ],
      },
      {
        title: "İş bulunmadan",
        paragraphs: [
          "İşsiz olarak Jobsplus’a kayıt olunabileceği; ek bilginin rehberin diğer bölümlerinde yer aldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-satin-alma",
    tocLabel: "Konut",
    h2: "Kira yasası, satın alma ve vergiler",
    lead: "Özel Mesken Kiraları Kanunu 2019; 2024 değişiklikleri.",
    accordions: [
      {
        title: "Kiralama (EURES “Moving” özeti)",
        paragraphs: [
          "Satılık ve kiralık ilanların yerel gazetelerde, emlakçılar ve siteleri veya sosyal medya sayfalarında yayımlandığı; mülkün büyüklüğü ve konuma göre arz ile fiyatların değiştiği belirtilir.",
          "Kira piyasasında son yıllarda arz ve talebin arttığı ve büyümenin sürmesinin beklendiği; geleneksel turistik bölgelerde kiralık stokunun daha yaygın ve kiraların daha yüksek olduğu yazılır.",
          "Kiranın tipik olarak bir ay önceden ödendiği ve ev sahibinin genelde bir aylık kira tutarında teminat isteyebileceği belirtilir.",
          "2020’de Özel Mesken Kiraları Kanunu’nun (Private Residential Leases Act, 2019) yürürlüğe girdiği; her özel kira sözleşmesinin Konut Otoritesi’ne kaydedilmesi ile kısa ve uzun süreli kiralar için asgari ve asgari üstü sürelerin belirlendiği özetlendiği yazılır.",
          "2024’te Bölüm 604’e değişiklikle Konut Otoritesi’ne kayıt süresinin uzatıldığı, mülkteki kişi sayısına ilişkin yeni sınırlar ve uyumsuzluk cezalarının getirildiği belirtilir.",
        ],
      },
      {
        title: "Satın alma maliyetleri (kaynak listesi)",
        paragraphs: [
          "Tapu vergisinin mülk değerinin yüzde 5’i olduğu ve iki aşamada ödendiği: ön satış (konvenju) imzasında yüzde 5’in yüzde 1’i; kesin satış senedinin yayınlanmasından sonra kalan yüzde 4’ün ödendiği yazılır.",
          "Avukatlık masraflarının satın alma fiyatının yaklaşık yüzde 1’i olduğu; ön satışta yüzde 33’ü, kesin senette yüzde 67’sinin ödendiği belirtilir.",
          "Mülk araştırması, yükümlülükler vb. için değişken tutarlar bulunduğu; gayrimenkul edinimi için hükümet izninin (AIP) 233 EUR olduğu ve Malta’da mülk edinmek isteyen her yabancı uyruklunun bu izni alması gerektiği ifade edilir.",
          "Kayıtlı emlak acentesi üzerinden bulunan mülkte komisyonun yalnızca satıcı tarafından ödendiği; özel acenti (broker) ile bulunursa alıcının özel acentiye yüzde 1 komisyon ödeyeceği yazılır.",
          "Malta’da en az beş yıl ikamet etmemiş tüm AB üyesi ülke vatandaşlarının (Maltalılar dahil) ikinci konut için satın alma iznine ihtiyaç duyduğu; AB dışı uyrukluların Malta’da mülk edinmek için gayrimenkul satın alma iznine ihtiyaç duyduğu belirtilir.",
        ],
      },
      {
        title: "Kira piyasası (örnek aylık tutarlar)",
        paragraphs: [
          "Emlak acentesi hizmet bedelinin bir aylık kira artı KDV’ye eşit olduğu ve kiracı ile ev sahibi arasında paylaşıldığı; kira sözleşmesinin tarafları koruyacak şekilde yazılı yapılması gerektiği yazılır.",
          "Üç yatak odalı daire için Sliema, St. Julian’s, Kappara, Swieqi: ortalama ayda 1.665 EUR; turistik olmayan bölgelerde ortalama 1.290 EUR.",
          "Bir yatak odalı daire için aynı turistik bölgelerde ortalama 981 EUR; turistik olmayan bölgelerde ortalama 815 EUR.",
          "2020 kira yasası sonrası tarafların bildirimsiz sözleşmeyi feshedemeyeceği; ev sahibinin sözleşme bitiminden üç ay önce yazılı bildirim vermesi gerektiği; kiracının da süreye bağlı yazılı bildirimle fesih bildirmesi gerektiği belirtilir.",
          "Kira artışının yılda en fazla yüzde 5 ve yılda birden fazla olamayacağı; yardımcı tesislerin aksi yazılmadıkça aylık kiranın üzerine ödendiği; ARMS şirketine doğrudan veya ev sahibine oransal ödenebildiği yazılır.",
          "Ev sahibinin envanter listesi sunması zorunluluğu ve listelenmemesi halinde sözleşmenin geçersiz sayılacağı; kiracının envanteri ev sahibiyle birlikte gözden geçirmesinin yararına olduğu ifade edilir.",
          "2024 değişikliğiyle Konut Otoritesi’ne kayıt süresinin otuz güne uzatıldığı; kayıtta mülkte yaşayabilecek kişi sayısının belirtilmesi gerektiği; bakanın mülkün olanaklarına göre azami kişi sayısı için tüzük çıkarabileceği; örneğin iki yatak ve en az bir banyoda en fazla dört kişi, üç yatakda en fazla altı kişi örneğinin verildiği; birlikte yaşayan ailelere bu doluluk sınırlarının uygulanmadığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "okul",
    tocLabel: "Okul",
    h2: "Devlet, mezhep ve özel seçenekler",
    lead: "Beş–on altı zorunlu eğitim; devlet okullarında ücretsiz öğretim.",
    accordions: [
      {
        title: "Kayıt ve okul türleri",
        paragraphs: [
          "Ebeveynlerin çocuklarını devlet, mezhep (faith) veya özel okullara gönderebileceği; birinci ve orta öğretim devlet okullarının Malta’nın ana bölgelerinde bulunduğu belirtilir.",
          "Devlet okuluna gidilecekse bunun ikamet edilen yerle aynı yerde olması gerektiği yazılır.",
          "Mezhep ve özel okullara talebin yüksek olduğu; mezhep okullarına kabulün kura ile belirlendiği; özel okullarda yerin aylar veya yıllar öncesinden ayırtılması gerekebildiği ifade edilir.",
          "Devlet okullarında öğretimin ücretsiz, özel okullarda ücret karşılığı olduğu; mezhep okullarının genelde öğretim maliyetinin bir kısmını karşılamak için yıllık bağış istediği belirtilir.",
        ],
      },
      {
        title: "Zorunluluk ve yapı",
        paragraphs: [
          "Eğitim sisteminin birincil (5–11 yaş), ortaöğretim (11–16 yaş) ve üçüncül düzeyden oluştuğu; eğitimin beş ile on altı yaş arasında zorunlu olduğu yazılır.",
          "Üç yaş altı çocuklar için birçok kreş bulunduğu; çalışan ebeveynler için hizmetin ücretsiz sunulduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-ve-tipler",
    tocLabel: "İstihdam sözleşmesi",
    h2: "Yazılı şartlar, deneme ve süreli iş",
    lead: "İşe alımdan sonra en geç yedi gün içinde yazılı özet.",
    accordions: [
      {
        title: "Sözleşmenin unsurları",
        paragraphs: [
          "Malta’da istihdamın her zaman —örtülü veya açık— bir iş sözleşmesi içerdiği; çalışanın belirli işi ücret karşılığında yapmayı kabul ettiği yazılır.",
          "İşe alımdan itibaren en geç yedi gün içinde çalışana verilecek yazılı bir özetle istihdam koşullarının gösterilmesi gerektiği belirtilir.",
          "Sözleşmenin süreli veya süresiz, tam veya yarı zamanlı olabileceği; koşulların dikkatle okunması gerektiği; işverenin sözleşmenin İngilizce ve/veya Maltaca kopyasını sağlaması gerektiği yazılır.",
          "Ödeme aralığının yasayla dört haftadan uzun olamayacağı; nakit, çek veya banka hesabına ödeme yapılabildiği belirtilir.",
        ],
      },
      {
        title: "Deneme süresi ve süreli sözleşmeler",
        paragraphs: [
          "Deneme süresinin iş ilişkisinin başında kararlaştırılması gerektiği; genelde altı ay sürdüğü; ancak ücretin ulusal asgari ücretin iki katını aştığı teknik, idari, yönetici ve müdür pozisyonlarında bir yıl sürebildiği; tarafların daha kısa süre üzerinde anlaşabileceği yazılır.",
          "Denemenin ilk ayında tarafların bildirimsiz feshedebildiği; bir ay sonra deneme boyunca bir haftalık bildirim verilmesi gerektiği belirtilir.",
          "Süreli ve geçici sözleşmelerin süre bitiminde fesih bildirimi olmadan sona erdiği yazılır.",
          "Süreli sözleşmenin süresi dolup işveren çalışanı tutarsa ve önceki sözleşmeden sonraki ilk on iki iş günü içinde yeni sözleşme verilmezse süresiz sözleşmeye geçildiğinin varsayıldığı ifade edilir.",
          "Süreli sözleşmenin objektif gerekçe olmadıkça altı aydan kısa olamayacağı; gerekçelerin sözleşmede kayıt altına alınması gerektiği belirtilir.",
          "Ardışık süreli sözleşmelerin mümkün olduğu; objektif gerekçe yoksa dört yıllık kesintisiz süreli istihdamdan sonra süresiz sözleşmeye otomatik dönüldüğü yazılır.",
          "Avrupa yönergelerinin tam benimsenmesinin, Maltese hukuka göre geçici istihdam sözleşmesinin belirli yıl sayısından (dört yılı aşmayacak şekilde) sonra süresiz sözleşmeye dönüştürülmesini gerektirdiği ifade edilir.",
        ],
      },
      {
        title: "Genç çalışanlar ve stajyerler",
        paragraphs: [
          "Genç işçinin on altı yaşını doldurmuş ve on sekiz yaşından küçük kişi olduğu; istihdama yalnızca on altı yaş üstülerin girebildiği belirtilir.",
          "Genç işçilerin günlük sekiz saat ve haftada kırk saat sınırına tabi olduğu; daha yaşlı işçiler için haftalık azami kırk sekiz saat olduğu yazılır.",
          "Teorik ve/veya uygulamalı eğitim, eğitim programı veya işyeri deneyimi şemasında geçirilen sürenin çalışma süresi sayıldığı belirtilir.",
          "Birden fazla işverende çalışıldığında gün ve saatlerin biriktiği ve sınırların aşılmaması gerektiği; işverenin başka işte çalışılıp çalışılmadığını araştırma yükümlülüğü ve çoklu işte genç kişinin diğer işverene saatleri bildirme sorumluluğu olduğu yazılır.",
          "Genç kişinin herhangi bir günde birden fazla işveren için toplam yasal günlük süreyi aşmadığı sürece aynı gün birden fazla işte çalışmasına izin verilebildiği belirtilir.",
          "Hiçbir gencin bir günün 22:00’si ile ertesi günün 06:00’si arasında çalıştırılamayacağı ifade edilir.",
          "Engelli işçilerin haklarının 2000 tarihli Eşit Fırsatlar (Engelli Kişiler) Kanunuyla korunduğu; işverenlerin engelli işçilere karşı ayrımcılık yapmasının yasak olduğu belirtilir.",
          "CRPD’nin engelli kişilere karşı ayrımcılığı ortadan kaldırmak için çalıştığı; engelli kişilere ve ailelerine tavsiye, bilgi ve destek verdiği yazılır.",
          "Stajlarda işverenin işe başlama formunu doldurması gerektiği; ücretsiz stajlarda da stajyer ve işveren arasında koşulları kapsayan bir sözleşme düzenlenmesinin önerildiği ifade edilir.",
        ],
      },
      {
        title: "Fazlalık istihdam ve yarı zamanlı",
        paragraphs: [
          "Uzmanlaşmış istihdam acentelerinden geçici personel kiralamanın arttığı; düşük beceri alanlarında da profesyonel sektörde de kullanıldığı; acentelerin işverene vergi, ulusal sigorta, tazminat ve iş gücü maliyetlerini karşılamak için ücret talep edebildiği belirtilir.",
          "Değişken programlı yarı zamanlı çalışanlar için haftalık çalışma saatinin, takvim yılının 1 Ocak’tan başlayan ardışık on üç haftalık dönemler üzerinden hesaplanan haftalık ortalama olduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "ucret-odeme",
    tocLabel: "Ücret ve bordro",
    h2: "2025 haftalık asgari ücret ve dört ikramiye",
    lead: "Saatlik / günlük ücret ve parça başı ödeme sıklığı.",
    accordions: [
      {
        title: "Ulusal asgari ücret (2025, haftalık)",
        paragraphs: [
          "On sekiz yaş ve üzeri için haftalık 221,78 EUR; on yedi yaş için 215,00 EUR; on altı yaş için 212,16 EUR olduğu belirtilir.",
          "Asgari ücretin öngörülmesine rağmen çoğu ücretin bu oranın üzerinde ödendiği yazılır.",
          "Birçok sektörde asgari ücretin Ücret Konseyi Emirleri veya belirli toplu sözleşmelerle düzenlendiği; bunların Maltalı ve yabancı işçilere aynı şekilde uygulandığı ifade edilir.",
        ],
      },
      {
        title: "İkramiye ve bordro (1 Ocak 2019’tan itibaren)",
        paragraphs: [
          "Tüm tam zamanlı çalışanlara hayat pahalılığına bağlı yıllık ücret artışı verildiği; asgari ücreti alanların ek ikramiyelere de hak ettiği belirtilir.",
          "İkramiyelerin yılda dört kez ödendiği: Mart 121,16 EUR; Haziran 135,10 EUR; Eylül 121,16 EUR; Aralık 135,10 EUR.",
          "Saatlik, günlük ve parça başı ücretlerin en az ayda iki kez ödendiği; maaşların en az dört haftada bir ödendiği yazılır.",
          "1 Ocak 2019’dan itibaren işverenin ücret veya ödeme gününden önce veya o gün çalışana ayrıntılı bordro vermesi gerektiği; bordroda işveren ve çalışan adı, işveren adresi, unvan, ödenen toplam ücret ve kırılımı, dönem, normal saatler (Pazar veya resmî tatilde normal programa dahilse), fazla mesai veya özel oranlı saatler, kullanılan yıllık izin saatleri ve kalan bakiye, temel ücret, prim ve kesintilerin kırılımı gibi kalemlerin bulunduğu listelenir.",
          "Bordro verilmezse işverenin şüpheden arındırıcı kanıt yükümlülüğü olduğu; aynı dönem için iki bordro varsa çalışan için daha elverişli olana öncelik verildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi",
    tocLabel: "Çalışma süresi",
    h2: "Kırk saat; kırk sekiz saat üst sınırı",
    lead: "Nisan 2004 yan mevzuat 452.87; gece çalışanı.",
    accordions: [
      {
        title: "Haftalık süre ve fazla mesai",
        paragraphs: [
          "Malta şirket ve kuruluşlarında çalışma haftasının kırk saat olduğu belirtilir.",
          "Maltese hukuka göre tüm sektörlerde azami haftalık çalışma süresinin kırk sekiz saat (kırk saat çalışma ve sekiz saat fazla mesai) olduğu; fazla mesainin ek ücretle ödenmesi gerektiği yazılır.",
          "İşverenin, çalışan yazılı onay vermedikçe haftada kırk sekiz saatin ortalamasını aşan çalışmaya zorlayamayacağı ifade edilir.",
          "Güncel çalışma saatlerinin sektöre göre değiştiği ve toplu sözleşmeler ile sektöre özel Ücret Düzenleme Emirleriyle yönetildiği belirtilir.",
        ],
      },
      {
        title: "Çalışma süresinin düzenlenmesi ve gece",
        paragraphs: [
          "Çalışma süresinin düzenlenmesinin dinlenme, mola, yıllık izin ve gece çalışması yasal sınırları içinde işverenin takdirinde olduğu yazılır.",
          "Nisan 2004’te yürürlüğe giren Yan Mevzuat 452.87’ye göre her çalışanın yirmi dört saatlik dönemde işveren için çalıştığı sürede en az on bir saat kesintisiz günlük dinlenmeye; altı saati aşan iş gününde en az on beş dakikalık molaya; yedi günlük dönemde on bir saatlik günlük dinlenmeye ek olarak en az yirmi dört saat kesintisiz haftalık dinlenmeye hak kettiği belirtilir.",
          "Ücretli yıllık iznin kırk saatlik hafta ve sekiz saatlik iş günü esasına göre dört hafta ve dört güne denk gelen saatlerle hesaplandığı; bu haktan en az dört haftalık kısmın nakdi karşılıkla değiştirilemeyeceği yazılır.",
          "Gece çalışanının normal çalışma saatlerinin herhangi bir yirmi dört saatlik dönemde ortalama sekiz saati aşmaması gerektiği; özel tehlike veya ağır fiziksel veya zihinsel yük içeren gece işinde gece çalışması yapılan herhangi bir yirmi dört saatlik dönemde sekiz saatten fazla çalıştırılamayacağı ifade edilir.",
          "Fazla mesainin normal çalışma süresinin üzerindeki saatler olduğu; yasal azami süreyi (yazılı onay olmadan haftalık ortalama kırk sekiz saat) aşmaması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izinler",
    tocLabel: "İzinler",
    h2: "2025 yıllık izin saatleri ve resmî tatiller",
    lead: "Doğum, ebeveyn ve acil aile izni.",
    accordions: [
      {
        title: "Yıllık izin ve resmî günler (2025)",
        paragraphs: [
          "Kırk saatlik tam zamanlı istihdamda çalışanların 2025 yılında 224 saat tatil iznine hak ettiği; bu iznin Cumartesi veya Pazar’a veya haftalık dinlenme gününe denk gelen ulusal veya resmî tatili içerdiği belirtilir.",
          "Ulusal ve resmî tatillerin on dört iş günü daha eklediği; 1 Ocak Yılbaşı; 10 Şubat Aziz Paulus’un Gemi Kazası Bayramı; 19 Mart Aziz Yusuf; 31 Mart Özgürlük Günü (ulusal); hareketli Paskalya Cuma; 1 Mayıs İşçi Bayramı; 7 Haziran Sette Giugno (ulusal); 29 Haziran Aziz Petrus ve Pavlus (L-Imnarja); 15 Ağustos Göğe Kabul; 8 Eylül Zaferin Meryem Ana Bayramı (ulusal); 21 Eylül Bağımsızlık Günü (ulusal); 8 Aralık Meryem Ana’nın Lutsuz Gebelliği; 13 Aralık Cumhuriyet Günü (ulusal); 25 Aralık Noel olarak listelendiği yazılır.",
          "Yarı zamanlı çalışanların kamu tatilleri, ücretli yıllık izin, hastalık, doğum, ölüm, evlilik ve sakatlık izni gibi tanınan istihdam koşullarından ve yasadan doğan diğer izinlerden orantılı yararlanma hakkı bulunduğu belirtilir.",
        ],
      },
      {
        title: "Doğum izni",
        paragraphs: [
          "Çalışanın kesintisiz on dört haftalık doğum iznine başvurabileceği; 2013’ten beri sürenin on sekiz haftaya çıkarıldığı; mümkün olduğunca doğumdan en az dört hafta önce işvereni bilgilendirme yükümlülüğü olduğu yazılır.",
          "Doğumdan sonraki altı haftalık izin hakkının doğumdan hemen sonra zorunlu kullanılması; beklenen doğumdan hemen önce dört haftanın —aksi kararlaştırılmadıkça— kullanılması; kalan sürenin çalışanın seçimiyle yukarıdaki dönemlerden hemen önce veya sonra kullanılabileceği belirtilir.",
          "Doğumdan önce izin kullanılamazsa kalan hakkın doğumdan sonra kullanılabileceği yazılır.",
          "Doğum izninde çalışanın işvereninden on dört hafta boyunca tam ücret almaya hak ettiği ifade edilir.",
        ],
      },
      {
        title: "Ebeveyn izni ve diğer",
        paragraphs: [
          "Kadın ve erkek işçilerin çocuğun doğumu, evlat edinme, koruyuculuk veya yasal velayeti halinde çocuğa bakmak için bireysel ebeveyn izni hakkı bulunduğu belirtilir.",
          "Ebeveyn izni süresinin çocuk sekiz yaşına kadar her ebeveyn için dört ay olduğu yazılır.",
          "2 Ağustos 2022 öncesi doğan çocuklar için bu iznin ücretsiz olduğu; 2 Ağustos 2022 sonrası doğanlar için iki ayın (sekiz hafta) Sosyal Güvenlik Kanunu’ndaki hastalık yardımı oranında ücretlendirildiği ve en az iki haftalık dilimlerle kullanılması gerektiği ifade edilir.",
          "Her ebeveyn için ödeme oranının çocuğun yaşına göre değiştiği: dört yaşından önce yüzde 50’si (dört hafta); dört–altı yaş arası yüzde 25’i (iki hafta); altı–sekiz yaş arası yüzde 25’i (iki hafta) olarak özetlendiği yazılır.",
          "Koruyucu ebeveynler için oranların benzer olduğu; ödemenin koruyucu başvuran başına yapıldığı ve çocuk başına değil belirtildiği ifade edilir.",
          "Aynı işverende en az on iki ay kesintisiz çalışma şartı bulunduğu; daha kısa sürenin anlaşmayla kabul edilebildiği; işverenin ebeveyn izni kaydı tutması ve çalışanın yazılı bilgi isteme hakkı olduğu belirtilir.",
          "Hastalık izninde işvereni mümkün olduğunca erken bilgilendirme ve doktor raporu gerektiği; yasaya veya toplu sözleşmeye göre hastalık süresince ücrete hak olunduğu; hak tükendiğinde işverenin ücret ödeme yükümlülüğünün kalktığı; Sosyal Güvenlik Departmanından hastalık yardımına başvurulabileceği yazılır.",
          "İşverenin yılda en fazla dört kez, takvim yılında kullanılan hastalık izni saatlerini yazılı olarak beş iş günü içinde vermesi gerektiği belirtilir.",
          "Her çalışana yılda ücretli en az on iki saat acil aile mazereti izni verilmesi zorunluluğu bulunduğu; bu saatlerin yıllık izin bakiyesinden düşüldüğü; işverenin her vaka için üst sınır koyabildiği ancak vaka başına en az bir saat olması gerektiği; çalışanın daha kısa süreyi kabul etmediği sürece istisna olmadığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "fesih",
    tocLabel: "İşten çıkarma",
    h2: "Bildirim süreleri ve iş mahkemesi",
    lead: "Fazlalık ve haksız fesih başvurusu.",
    accordions: [
      {
        title: "Haklı gerekçe ve bildirim",
        paragraphs: [
          "İşverenin geçerli gerekçelerle istihdamı sona erdirebildiği; gerekçelerin bireysel çalışan veya mali veya operasyonel zorluklar gibi toplu nitelikte olabileceği; ciddi kabahat nedeniyle de fesih mümkün olduğu belirtilir.",
          "İşten çıkarmada işverenin önceden bildirim vermesi gerektiği; aksi kararlaştırılmadıkça sürenin istihdam süresine bağlı olduğu yazılır.",
          "Çalışanın da istihdamı her zaman sona erdirebileceği; aksi kararlaştırılmadıkça bildirimin istihdam süresine göre bir ila on iki hafta arasında olduğu belirtilir.",
        ],
      },
      {
        title: "Süresiz sözleşmede bildirim tablosu",
        paragraphs: [
          "Bir aydan fazla altı aya kadar: bir hafta.",
          "Altı aydan fazla iki yıla kadar: iki hafta.",
          "İki yıldan fazla dört yıla kadar: dört hafta.",
          "Dört yıldan fazla yedi yıla kadar: sekiz hafta.",
          "Yedi yıldan fazla: sonraki her hizmet yılı için ek bir hafta, en fazla on iki haftaya kadar.",
          "Teknik, idari, yönetici veya müdür görevlerinde işveren ve çalışanın daha uzun süreler üzerinde anlaşabileceği yazılır.",
          "Bildirimin verildiği günü izleyen ilk iş gününden itibaren başladığı belirtilir.",
        ],
      },
      {
        title: "Başvuru mercileri ve Jobsplus formu",
        paragraphs: [
          "Haksız işten çıkarıldığını veya ayrımcılığa uğradığını düşünenlerin Sanayi ve İstihdam İlişkileri Departmanı’na, işyeri sendikasına başvurması veya davasını Sanayi Mahkemesi’ne taşımak için hukuki danışmanlık alması önerildiği yazılır.",
          "İstihdam sonunda çalışanın referans isteme hakkı bulunduğu; referansta istihdam süresi ve yapılan iş türünün belirtileceği belirtilir.",
          "İşverenin işten çıkarma nedenini de belirten bir formu Jobsplus’a gönderme yükümlülüğü olduğu; form işlendiğinde çalışan ve işverene bildirim gittiği; çalışanın fesih nedenine katılmadığında kısa süre içinde itiraz ve kanıt sunabileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve grev",
    h2: "İstihdam ve Sanayi İlişkileri Kanunu 2002",
    lead: "Uzlaşma ve Sanayi Mahkemesi.",
    accordions: [
      {
        title: "Temsil ve toplu çatışma",
        paragraphs: [
          "Ofis personeli, işçi veya stajyer dahil tüm çalışanların işyerinde sendika temsilciliği seçebileceği; sendikaların yetki, ayrıcalık ve yükümlülüklerinin İstihdam ve Sanayi İlişkileri Kanunuyla düzenlendiği belirtilir.",
          "Genel İşçi Sendikası (General Workers’ Union) ile “Union Ħaddiema Magħqudin”ın iki genel sendika olduğu; kayıtlı tüm sendika ve çalışan derneklerinin listesinin Trade Unions Siciline kayıtlı müdürden veya bağlantı üzerinden alınabileceği yazılır.",
        ],
      },
      {
        title: "Grev ve lokavt",
        paragraphs: [
          "2002 tarihli Kanunun bireysel istihdam koşulları ile toplu sanayi ilişkilerini düzenlediği; gönüllü ve zorunlu uyuşmazlık çözüm mekanizmalarını öngördüğü belirtilir.",
          "Uzlaşma hizmetlerinin iş uyuşmazlığında sendikalar ve işverenlere sunulduğu; uyuşmazlık nedenlerinin toplu sözleşme yorumu, müzakere, disiplin, sendika tanınması vb. olabildiği; uzlaştırıcının iki üçte birinden fazla vakada anlaşmaya varıldığı yazılır.",
          "Uzlaşmada anlaşma sağlanamazsa davanın Sanayi Mahkemesi’ne gönderilebildiği; mahkemenin bağlayıcı kararlar verdiği ve asgari on iki ay süreyle temyiz edilemediği belirtilir.",
          "Grev ve lokavtın örgütlenme özgürlüğünün ifadesi olarak yasaca tanındığı; bazı sektörlerde yasaklanabildiği; işçi ilişkileriyle ilgili ve barış yükümlülüğü gibi engelleyici yükümlülük olmadığında mümkün olduğu; grev süresince işverenin ücret ödemek zorunda olmadığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "KDV, gelir vergisi ve örnek giderler",
    lead: "Eurostat Ocak 2025 aylık asgari ücret karşılaştırması.",
    accordions: [
      {
        title: "KDV ve gelir vergisi (özet)",
        paragraphs: [
          "Çoğu mal ve satış veya ithalatta standart Katma Değer Vergisi oranının yüzde on sekiz olduğu belirtilir.",
          "Bireyler için vergi oranlarının yüzde sıfırdan otuz beşe kadar olduğu; gelir arttıkça artan ilerlemeli tarife uygulandığı; kurumlar vergisinin yüzde otuz beş sabit olduğu yazılır.",
          "İkamet ve alışkanlık kriterlerini karşılayanların Malta ve yurtdışı gelirinin vergilendirildiği; Malta’da çalışan yabancı ikametçinin yalnız Malta’da kazanılan ve Malta’ya gelen yabancı gelirlerinin vergilendirilebildiği belirtilir.",
          "İşverenin aylık brüt ücret üzerinden stopaj kesmesi gerektiği yazılır.",
        ],
      },
      {
        title: "Gelir vergisi tabloları (bekâr)",
        paragraphs: [
          "Vergilendirilebilir gelir 0–12.000: çarpan 0, indirim 0.",
          "12.001–16.000: çarpan 0,15, indirim 1.800.",
          "16.001–60.000: çarpan 0,25, indirim 3.400.",
          "60.001 ve üzeri: çarpan 0,35, indirim 9.400.",
          "Evli ve ebeveyn tabloları kaynak metinde ayrı ayrı verildiği belirtilir.",
        ],
      },
      {
        title: "Malta’da ikamet etmeyenler",
        paragraphs: [
          "Malta’da ikamet etmeyen ve Malta’da yüz seksen üç günden az kalan çalışanın genelde “Non-Resident” oranlarıyla vergilendirildiği; ancak iş sözleşmesinin on iki aylık dönemde altı aydan uzun sürdüğünü kanıtlarsa normal (ikametçi) tarifelerin uygulanabileceği; ilgili yılda istihdam yüz seksen üç günden kısa olsa da geçerli olabildiği yazılır.",
          "AB veya AEA’da ikamet etmeyen fakat Malta’da çalışan ve küresel gelirinin yüzde doksanından fazlasını Malta’da kazananların Gelir Vergisi Kanunu 56(1)(c) provisosu uyarınca ikametçi tarifelerine hak kılabildiği belirtilir.",
          "AB/AEA uyruklu olup Malta geliri küresel gelirin yüzde doksanına ulaşmayanların, 56(1)(c)(iv) uyarınca daha elverişli hesabı seçebileceği ifade edilir.",
          "İkamet etmeyen bireyler için: ilk 700 EUR üzerindeki her euro için 0 sent; sonraki 2.400 EUR için 20 sent; sonraki 4.700 EUR için 30 sent; kalan için 35 sent oranlarının kaynakta tablo halinde verildiği yazılır.",
        ],
      },
      {
        title: "Eurostat ve yaşam maliyeti örnekleri",
        paragraphs: [
          "Eurostat Ocak 2025 aylık asgari ücret karşılaştırmasında Malta’nın 961 EUR olarak listelendiği belirtilir.",
          "Dört kişilik ailenin kira hariç aylık yaşam için 2.817,50 EUR’ya ihtiyaç duyduğunun tahmin edildiği yazılır.",
          "Numbeo kaynaklı örnek fiyatların (restoran yemeği 15 EUR, iki kişi orta segment üçüncü 70 EUR, benzin litre Mayıs 2025’te 1,34 EUR vb.) Malta için listelendiği ve güncel fiyatların doğrulanması gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ulasim-saglik",
    tocLabel: "Ulaşım ve sağlık",
    h2: "Tallinja kartı, feribot ve kamu sağlığı",
    lead: "Trendolu veya metro yok; Gozo Channel ücretleri.",
    accordions: [
      {
        title: "Toplu taşıma ve ada bağlantısı",
        paragraphs: [
          "Malta’da trafiğin soldan aktığı; ada boyutuna göre araç sahipliğinin çok yüksek olduğu belirtilir.",
          "Otobüslerin yaklaşık 05:30–23:00 arası düzenli çalıştığı; bazı hatlarda gece servisi bulunduğu; otobüslerin hareket kısıtı olan yolculara erişilebilir olduğu yazılır.",
          "1 Ekim 2022’den itibaren kişiselleştirilmiş Tallinja Card tutanların ücretsiz toplu taşıma kullanabildiği; kart için Malta kimlik kartı, ikamet belgesi veya pasaport numarası, e-posta, doğum tarihi ve cep telefonu bilgisi verilerek kayıt olunabildiği; kart olmadan otobüste bilet alınabildiği belirtilir.",
          "Malta ve Gozo’da tram, tren veya metro olmadığı; taksi ve Sliema–Valletta–Üç Şehir arası deniz taksi hizmetinin bulunduğu yazılır.",
          "İki ada arasında çoğunlukla feribot kullanıldığı; Gozo Channel’un devlet şirketi olarak 1979’dan beri hizmet verdiği; yolculuğun hava koşullarına göre yirmi ila otuz dakika sürdüğü belirtilir.",
          "Yetişkin standart yolcu ücretinin 4,65 EUR; çocukların 1,15 EUR; Gozo ikametçileri için devlet destekli 1,15 EUR; altmış ve üzeri yaşlıların ücretsiz olduğu yazılır.",
          "Sürücü ve araç için standart ücretin 15,70 EUR; Gozo ikametçisi ve araç için 8,15 EUR olduğu belirtilir.",
          "Valletta ile Gozo Mġarr arasında hızlı feribotların yaklaşık kırk beş dakika sürdüğü; yetişkin için gidiş–dönüş standart fiyatın 7,50 EUR olduğu; çocuk, öğrenci, yaşlı ve Gozitanlar için farklı tarifelerin geçerli olduğu ifade edilir.",
        ],
      },
      {
        title: "Sağlık (özet)",
        paragraphs: [
          "Tıbbi bakım standardının yüksek olduğu; bölgesel sağlık merkezleri ve iki genel hastanede hizmetlerin modernleştirildiği belirtilir.",
          "Özel klinik ve hastanelerin bulunduğu; özel tedavi arayanlar için sağlık sigortasının önerildiği yazılır.",
          "Kamu vergileriyle finanse edilen kapsamlı sağlık hizmetinin tüm ikamet edenlere ücretsiz sunulduğu; düşük gelirli kişilerin Sosyal Güvenlik Departmanı tarafından gelir testine tabi tutulduğu ve uygunluk halinde ücretsiz ilaç kartı aldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yüzde 2 kota ve destek şemaları",
    lead: "CRPD, Jobsplus ve LSF.",
    accordions: [
      {
        title: "Tanım ve kayıtlar",
        paragraphs: [
          "Malta’nın engelliliği, çeşitli engellerle etkileşimde topluma eşit şekilde tam katılımı zorlaştırabilecek uzun süreli fiziksel, zihinsel, entelektüel veya duyusal engel olarak tanımladığı; bunun BM Engelli Hakları Sözleşmesiyle uyumlu olduğu belirtilir.",
          "Destek türüne göre bir veya daha fazla kuruma kayıt gerekebildiği; her kurumun kendi ölçütleriyle belirli hizmet ve yardımlara erişim sağladığı yazılır.",
          "Sosyal Güvenlik Departmanının engelli yardımına uygunları tıbbi kurul parametrelerine göre tuttuğu; Jobsplus’un istihdama uygun ancak rehberlik gerektiren engelli kişiler için kayıt tuttuğu; önce yerleştirme sağlık görevlisi sonra ergoterapist değerlendirmesi yapıldığı belirtilir.",
          "Engelli Kişilerin Hakları Komisyonu’nun (CRPD) Avrupa engelli kartı ve Mavi Rozet verdiği; başvurularda tıbbi engel doğrulaması ve CRPD profesyonellerince değerlendirme yapıldığı yazılır.",
        ],
      },
      {
        title: "İşveren ve çalışan destekleri (kaynak başlıkları)",
        paragraphs: [
          "Yirmiden fazla tam zamanlı çalışanı olan işverenlerin iş gücünün en az yüzde 2’sinin engelli kişilerden oluşmasını sağlaması gerektiği; uyumun Jobsplus sorumluluğunda olduğu ve Yasal Bildiri 156 (1995) ile değiştirilen Engellilerin İstihdamı Kanunu’nun dayanak olduğu belirtilir.",
          "Jobsplus’un engelli istihdamı için deneme çalışması, ücret sübvansiyonu, mali teşvikler ve ulusal sigorta muafiyeti gibi şirket destekleri verdiği; “bridging the gap” işe alışma dönemi şemasından bahsedildiği yazılır.",
          "CRPD işyeri erişilebilirliği vergi indirimi şeması ve Malta Enterprise Micro Invest programının engelli müşteri ve personel destek sistemlerine yatırım yapan işletmelere yardım ettiği belirtilir.",
          "Lino Spiteri Vakfı’nın (LSF) iş tasarımı, kapsayıcı işe alım ve sürdürülebilir roller için yerinde destek sağladığı yazılır.",
          "Aġenzija Sapport’un teçhizat ve bireyselleştirilmiş ulaşım için mali yardım veren güçlendirme şemasından ve kişisel bütçe reformu çalışmalarından bahsedilir.",
        ],
      },
      {
        title: "İletişim (kaynak metinde verilenler)",
        paragraphs: [
          "EURES Malta: eures.jobsplus@gov.mt ve jobsplus.gov.mt.",
          "Jobsplus: jobsplus@gov.mt.",
          "LSF: info@lsf.org.mt, telefon +356 22201761.",
          "CRPD: crpd.org.mt.",
        ],
      },
    ],
  },
];
