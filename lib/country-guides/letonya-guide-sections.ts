import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Latvia” (01/07/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const LETONYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Letonya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. İş arama kanalları (kişisel ağ, basın/radyo, lisanslı ajanslar, internet ve NVA veri tabanı), başvuru ve mülakat pratiği, staj ve meslekî çıraklık (prakse.lv, LAK, iş temelli öğrenme), AB içi taşınma ve konut, NVA ve EURES danışmanlığı, ikamet ve sosyal güvenlik koordinasyonu, İş Kanunu ve Devlet İş Müfettişliği (VDI), ücret–vergi–SSK, çalışma süresi ve izinler, serbest meslek ve şirket kurma, sağlık ve eğitim sistemi ile engelli istihdamına ilişkin kamu bilgileri kaynak metne dayanır.",
  "Metinde geçen tutarlar (asgari ücret, kira aralıkları, vergi eşikleri, harçlar vb.) yayımlandıkları döneme bağlıdır; güncel rakamları VID, VSAA, CSP ve ilgili bakanlık sitelerinden doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const LETONYA_SEO_KEYWORD_TAGS: string[] = [
  "letonya vize",
  "letonya schengen",
  "NVA Letonya",
  "EURES Letonya",
  "PMLP ikamet Letonya",
  "Letonya İş Kanunu",
  "VID Letonya vergi",
  "Letonya asgari ücret 2025",
  "Rīga kira",
];

export const LETONYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "NVA, EURES ve lisanslı ajanslar",
    lead: "Letonca çoğu işyerinde belirleyici; Rusça veya İngilizce/Almanca/İskandinav dilleri yararlı olabilir.",
    accordions: [
      {
        title: "Ana kanallar ve dil",
        paragraphs: [
          "İş bulmanın kişisel temaslar, gazete ve radyo ilanları, istihdam ajansları, büro ve internet üzerinden yürütülebildiği; internetin arama seçeneklerini genişlettiği yazılır.",
          "Letonya’da iş bulmak için yeterli Letonca bilgisinin çoğu zaman gerekli olduğu; Letoncanın resmî dil olduğu ve kamu kurumları ile çoğu işyerinde kullanıldığı belirtilir.",
          "İş aramada Rusça ve bazı durumlarda İngilizce, Almanca veya İskandinav dillerinin yararlı olabileceği ifade edilir.",
        ],
      },
      {
        title: "Devlet İstihdam Ajansı (NVA)",
        paragraphs: [
          "NVA’nın refah bakanlığına bağlı, işsizliği azaltma ve işsiz/iş arayanlara destek politikalarını uygulayan kurum olduğu; iş ilanları, danışmanlık, mesleki uygunluk ve yeniden eğitim ile işsizlik ödeneği başvurularında kayıt ve “işsiz” statüsünün gerekebildiği yazılır.",
          "NVA veri tabanındaki ilanların ve çevrimiçi CV yükleme bölümünün çoğunlukla yalnızca Letonca olduğu; portalın nva.gov.lv adresinde “CV ve ilanlar” bölümünde bulunduğu belirtilir.",
        ],
      },
      {
        title: "EURES ve özel işe yerleştirme",
        paragraphs: [
          "EURES portalının (eures.europa.eu) Letonya dâhil AB/EEA fırsatları hakkında geniş bilgi sunduğu; NVA EURES danışmanlarından ücretsiz bireysel danışmanlık alınabildiği; Letonya’daki EURES bilgisinin nva.gov.lv/eures üzerinde İngilizce ve Letonca yayımlandığı yazılır.",
          "İşe yerleştirme hizmetlerinin yalnızca NVA’dan lisans almış şirketlerce verilebildiği; lisanslı özel büroların listesinin NVA sitesinde “Lisanslı özel işe yerleştirme ajansları” bölümünde bulunduğu belirtilir.",
          "Gemilerde işe yerleştirmenin Ulaştırma Bakanlığı lisansına tabi olduğu; Denizcilik İdaresi (lja.lv) sitesinde Denizci İşe Alım ve Yerleştirme kaydının bulunduğu ifade edilir.",
        ],
      },
      {
        title: "İş kurma ve serbest faaliyet girişi",
        paragraphs: [
          "Serbest meslek veya şirket kurma konusunda Gelir İdaresi (vid.gov.lv), Ticaret Sicili (ur.gov.lv) ve Avrupa Komisyonu “Your Europe — Business” kaynaklarına başvurulabileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    tocLabel: "Başvuru ve mülakat",
    h2: "CV, ön yazı ve yazılı sözleşme",
    lead: "İlan şartlarını karşılayan başvurular tercih edilir; CV iki sayfayı aşmamalıdır.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "İşverenlerin çoğunlukla e‑posta ile CV veya telefonla iletişim istediği; ilandaki tüm şartları karşılayan adayların tercih edildiği yazılır.",
          "CV’de mesleki deneyim, yeterlilik ve becerilerin anlatılması ve ilgili yetkinliklerin öne çıkarılması gerektiği; bilgi, dil ve sunumun doğruluğunun önem taşıdığı belirtilir.",
          "En önemli bilgilerin belirgin olması ve CV’nin iki sayfadan uzun olmaması gerektiği ifade edilir.",
          "Üst düzey pozisyonlarda çoğu zaman motivasyon veya ön yazının da istendiği; ön yazının inandırıcı olması ve işverenin işini ve pazarını anlamayı göstermesi beklendiği yazılır.",
          "CV’de fotoğrafın isteğe bağlı olduğu; müşteriyle temaslı işlerde bazı işverenlerin fotoğraf isteyebildiği belirtilir.",
        ],
      },
      {
        title: "Mülakat ve ayrımcılık yasağı",
        paragraphs: [
          "Şirketlerin mülakat ve kişilik/psikolojik testler ile uygulama becerisi ölçümleri yaptığı; kişisel ve mesleki niteliklere önem verildiği; dürüstlük ve gelişim alanlarını açıklamanın beklendiği yazılır.",
          "Küçük işletmelerde mülakatın patron veya amir tarafından; büyüklerde insan kaynakları uzmanı dâhil panel ile yapılabildiği belirtilir.",
          "Zamanında gelmenin önemli olduğu; iş türüne göre kıyafet seçiminin yapılması gerektiği; banka veya kamu gibi kurumlarda iş kıyafetinin uygun olduğu ifade edilir.",
          "Mülakatta el sıkışmanın kabul edilebilir olduğu; ancak işveren elini uzatmadan önce beklenmesi gerektiği yazılır.",
          "Mülakatların genelde resmî olduğu; şirket ve pozisyon hakkında önceden hazırlanılması beklendiği; adayın henüz yanıtlanmamış sorular sorabileceği belirtilir.",
          "Yaş, medeni durum veya fiziksel özellikler gibi ayrımcı soruların yasak olduğu; ırk, etnik köken, din, engellilik, yaş, cinsel yönelim, cinsiyet, dil ve siyasi görüş gibi gerekçelerle ayrımcılığın yasaklandığı ifade edilir.",
          "Sonuçların çoğu zaman mülakattan iki hafta içinde bildirildiği; bazı firmaların hiç dönüş yapmayabildiği ve bu durumda telefonla sorulabileceği yazılır.",
        ],
      },
      {
        title: "İş sözleşmesinin başlangıcı",
        paragraphs: [
          "İmzadan önce ücret, ödeme sıklığı, çalışma saatleri ve fazla mesai, deneme süresi ve yan hakların görüşülmesi gerektiği; Letonya’da iş sözleşmesinin yazılı yapıldığı; ücretlerin çoğu zaman ayda iki kez ödendiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj-ciraklik",
    tocLabel: "Staj ve çıraklık",
    h2: "prakse.lv, meslekî eğitim ve zanaat çıraklığı",
    lead: "Resmî “staj” tanımı meslekî program dışında genel istihdamla aynı hukuki çerçeveye girer.",
    accordions: [
      {
        title: "Staj ve yurtdışı fırsatlar",
        paragraphs: [
          "Meslekî eğitimin parçası olan uygulamanın “meslekî eğitim programının pratik bölümü” olarak tanımlandığı; bunun dışındaki stajların hukuken olağan istihdam ilişkisinden farklı sayılmadığı yazılır.",
          "Yükseköğretimde yurtdışı stajının ERASMUS+ kapsamında mümkün olduğu; meslekî gelişim ve informal eğitimin çeşitli kurumlarca verildiği belirtilir.",
          "NVA’nın Avrupa Sosyal Fonu kaynaklı ücretsiz meslek kursları ve destekli iş başı eğitimi önlemleri sunduğu; EEA uyruklularının göç dairesinde ikamet kaydı ve kişisel kod aldıktan sonra eğitim programları kapsamında staj yapabildiği ifade edilir.",
          "İşsiz olarak NVA’ya kayıtlı EEA uyruklularının da meslekî eğitim desteklerinden yararlanabildiği; özel informal eğitimde uygunluk kriterlerinin sağlayıcıya göre değiştiği; pratikte çoğu eğitim için Letonca gerekebildiği yazılır.",
        ],
      },
      {
        title: "Staj fırsatları ve rehberlik",
        paragraphs: [
          "Staj ilanlarının başlıca prakse.lv veri tabanında toplandığı; EURES (eures@nva.gov.lv), Devlet Eğitim Geliştirme Ajansı (viaa.gov.lv), Letonya İşverenler Konfederasyonu (lddk.lv) ve yükseköğretim kurumlarının ek kaynak olduğu belirtilir.",
        ],
      },
      {
        title: "Zanaat çıraklığı (apprenticeship)",
        paragraphs: [
          "Zanaat çırakının zanaat şirketi veya eğitim kurumuna katılıp meslek öğrenmek için eğitim sözleşmesi imzaladığı; on beş yaş ve üzeri olunabildiği; eğitimin zanaat eğitim ve sınav programlarına göre yürüdüğü yazılır.",
          "Çıraklığın Zanaatlar Kanunu (likumi.lv) ile düzenlendiği; programın okul ve işletmede öğrenmeyi birleştirdiği, sürenin meslek birliklerince belirlenebildiği ve ortalama yaklaşık üç yıl olduğu; ikinci yıldan itibaren çoğu zaman ücret ödenebildiği belirtilir.",
          "Kalfalık ve usta sınavlarının Letonya Zanaatlar Odası (lak.lv) çerçevesinde düzenlendiği; Meslekî Eğitim Kanunu kapsamında piyasa ihtiyacına uyum için “iş temelli öğrenme” modelinin geliştirildiği ifade edilir.",
        ],
      },
      {
        title: "İşverenler için kısa not",
        paragraphs: [
          "Staj ve çıraklık ilanlarının prakse.lv, erasmusintern.org ve NVA CV–ilan portalı (cvvp.nva.gov.lv) üzerinden yayımlanabildiği; destek için lak.lv ile temas edilebileceği yazılır.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut",
    tocLabel: "Taşınma ve konut",
    h2: "İlan siteleri, kira sözleşmesi ve harçlar",
    lead: "Kısa süre için otel/hostel; kalıcı konut için yazılı kira ve ücret üst sınırları.",
    accordions: [
      {
        title: "Konut arama",
        paragraphs: [
          "Varışta kısa süreli konaklama için otel ve pansiyonların kullanılabildiği; uzun süreli kira için basın, internet (ör. ss.com, reklama.lv, city24.lv) ve emlak acentelerinin (ör. incity, niss, arcoreal, kivi, latio, ober-haus, rentinriga) yanı sıra 1188.lv “Gayrimenkul” bölümünün kaynak gösterildiği yazılır.",
          "Belediye konutunun çoğunlukla küçük kasaba ve köylerde bulunabildiği belirtilir.",
        ],
      },
      {
        title: "Kira hukuku ve rakamlar",
        paragraphs: [
          "Kira sözleşmesinin yazılı olması ve fiyat, süre, kullanım, onarım, evcil hayvan gibi unsurları kapsaması gerektiği; süresiz sözleşmelerin yasak olduğu ve sözleşmenin en fazla on yıla kadar yapılabildiği; depozitonun en fazla iki aylık kira tutarına kadar olabildiği; ilişkilerin Taşınmaz Kiralama Kanunu ile düzenlendiği yazılır.",
          "Başkentte daire kirasının genelde aylık iki yüz elli–altı yüz elli avro aralığında olduğu; fiyata çoğu zaman yakıt, elektrik, gaz, internet ve telefon giderlerinin dahil olmadığı; konum ve duruma göre değiştiği belirtilir.",
          "Diğer şehirlerde kiraların Rīga’dan düşük olduğu fakat çoğu zaman aylık yüz otuz avronun altına inmediği; kiracıdan bir–üç ay peşin ödeme istenebildiği ifade edilir.",
        ],
      },
      {
        title: "Mal ve sermaye (AB çerçevesi)",
        paragraphs: [
          "AB tek piyasasında malların serbest dolaşımı ve karşılıklı tanınma ile sermayenin geniş ölçüde serbestçe hareket etmesi gibi genel ilkelerin kaynakta özetlendiği; istisnai düzenlemelerin kamu sağlığı, çevre ve vergi denetimi gibi alanlarda kalabildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "okul-cocuk",
    tocLabel: "Okul ve çocuk bakımı",
    h2: "Kreş, zorunlu temel eğitim ve yükseköğretim",
    lead: "Devlet ve belediye okullarında öğretim dili Letoncadır; yabancı diploma için AIC değerlendirmesi.",
    accordions: [
      {
        title: "Kreş ve okul kaydı",
        paragraphs: [
          "Kreş sınıflarının çoğu zaman belediye tarafından sağlandığı; büyük şehirlerde kontenjanın sınırlı olabildiği; eğitim görevlisinin belgeler sonrası bekleme listesine kayıt açtığı yazılır.",
          "Okul çağı çocukları için belediye sınırlarında okul yerinin sağlandığı; okul ve boş kontenjan bilgisinin şehir/belediye eğitim kurullarından alınabildiği belirtilir.",
          "Temel eğitimin dokuz yıl zorunlu olduğu; genel ortaöğretimin zorunlu olmadığı; meslekî ortaöğretim ve gece/uzaktan okul seçeneklerinin bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Yükseköğretim ve diploma tanıma",
        paragraphs: [
          "Üniversiteye yerleşmenin çoğunlukla yarışma ile olduğu; devlet kontenjanının sınırlı olduğu; özel kurumlarda ücret ve sözleşme gerekebildiği yazılır.",
          "Yabancı ülkede alınan diplomaların Letonya’da devam için Akademik Bilgi Merkezi’nde (aic.lv) değerlendirilebildiği; eğitim fırsatlarının niid.lv ve izm.gov.lv üzerinden araştırılabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-sosyal",
    tocLabel: "İkamet ve sosyal güvenlik",
    h2: "PMLP kaydı, VID ve Avrupa formları",
    lead: "Üç aydan uzun kalışta ikamet kaydı; iş arayan için altı aya kadar esnek süre.",
    accordions: [
      {
        title: "Giriş ve çalışma hakkı (AB/EEA/CH)",
        paragraphs: [
          "AB/EEA veya İsviçre vatandaşlarının ve aile üyelerinin başka bir AB/EEA ülkesinde verilmiş geçerli oturma belgesiyle geçerli seyahat belgesi bulunduğunda Letonya’ya giriş yapabildiği yazılır.",
          "AB/EEA/İsviçre uyruklularının Letonya’da çalışmak için ayrıca çalışma iznine ihtiyaç duymadığı ve işgücü piyasasına serbestçe erişebildiği; işverenin her çalışanı Gelir İdaresi’ne (VID) bildirmesi gerektiği belirtilir.",
        ],
      },
      {
        title: "Üç aydan uzun kalış ve adres bildirimi",
        paragraphs: [
          "Üç aydan uzun kalmak isteyenlerin Nüfus ve Göç İşleri Dairesi’ne (PMLP) başvurup ikamet kayıt belgesi alması gerektiği yazılır.",
          "İşe başlamak üzere gelen kişinin iş bulma olasılığı varsa yılda altı ay veya daha uzun süre ikamet kaydı olmadan kalınabildiği belirtilir.",
          "İkamet değişikliğinin taşınmadan sonra bir ay içinde bildirilmesi gerektiği; yerel makam veya latvija.lv üzerinden elektronik “ikamet beyanı” ile kayıt yapılabildiği; ikamet kayıt veya kalıcı oturma belgesi alan AB/EEA vatandaşlarının adreslerini PMLP’ye bildirmesi gerektiği ifade edilir.",
          "Letonya’da kesintisiz beş yıl ikamet eden AB/EEA vatandaşının kalıcı oturma belgesi talep edebildiği; AB dışı uyrukluların beş yıl sonra “AB uzun dönem sakini” statüsüne başvurabileceği kaynakta anılır.",
        ],
      },
      {
        title: "Sosyal güvenlik ve sağlık hazırlığı",
        paragraphs: [
          "U2 işsizlik ödeneği taşıma ve U1 sigorta süreleri birleştirme formlarının memleket yetkilisinden alınabileceği; Letonya’da koordinasyon görevinin Sosyal Sigorta Ajansı’na (vsaa.gov.lv) ait olduğu yazılır.",
          "Avrupa Sağlık Sigortası Kartı’nın (EHIC) acil müdahale ve zorunlu tedavi kapsamında yardımcı olduğu; Letonya’da çalışmaya başlayanların EHIC’i Ulusal Sağlık Hizmeti’nden (vmnvd.gov.lv) ücretsiz talep edebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "Yazılı sözleşme, deneme ve esnek çalışma",
    lead: "Çoğu işveren klasik tam zamanlı istihdamı tercih eder; uzaktan çalışma giderek yaygınlaşır.",
    accordions: [
      {
        title: "İşe başlama yaşı ve sözleşme türleri",
        paragraphs: [
          "On beş yaşında çalışmaya başlanabildiği; on üç yaşında veli yazılı izniyle okula engel olmayan hafif işler için istisnalar bulunduğu yazılır.",
          "Çalışmaya başlamadan önce yazılı iş sözleşmesi yapılması gerektiği; sözleşmenin iş ve ücret üzerinde anlaşma sağlandığı anda kurulmuş sayıldığı belirtilir.",
          "Birden fazla işverenle sözleşme yapılabildiği; toplu iş sözleşmesi veya bireysel sözleşmede aksinin yazılmadığı sürece bunun mümkün olduğu ifade edilir.",
          "Sözleşmelerin çoğunlukla süresiz yapıldığı; mevsimlik, belirli süreli proje veya tesadüfi iş gibi gerekçelerle süreli sözleşmenin mümkün olduğu yazılır.",
          "Süreli sözleşmenin tüm uzatmalar dâhil beş yılı ve mevsimlik işte on ayı aşamayacağı; süre bitiminde tarafların fesih talep etmemesi halinde sözleşmenin süresiz sayılabildiği belirtilir.",
        ],
      },
      {
        title: "Deneme süresi ve uzaktan çalışma",
        paragraphs: [
          "Deneme süresinin sözleşmede yazılmazsa bulunmadığı kabul edildiği; deneme süresinin üç ayı aşamayacağı; on sekiz yaş altına deneme konulamayacağı yazılır.",
          "Yarı zamanlı, sözleşmeli ve süreli sözleşmelerde esnekliğin arttığı; uzaktan çalışmanın son yıllarda yaygınlaştığı ve aile ve sosyal yaşla uyumu kolaylaştırdığı belirtilir.",
        ],
      },
      {
        title: "Sözleşmede bulunması gerekenler",
        paragraphs: [
          "Sözleşmenin iki nüsha olarak düzenlendiği; çalışanın ve işverenin kimlik/adres ve işe başlama tarihi, süreli ise bitiş koşulları, iş yeri, görev tanımı, ücret ve ödeme zamanı, günlük/haftalık çalışma süresi, yıllık ücretli izin, fesih ihbarı ve toplu iş sözleşmesine atıf gibi unsurları içermesi gerektiği yazılır.",
          "Ek hususların yazılabildiği fakat çalışanın yasal durumunu zayıflatamayacağı; değişikliklerin yazılı karşılıklı anlaşma ile yapılması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-vergi",
    tocLabel: "Ücret, vergi ve SSK",
    h2: "Asgari ücret, gelir vergisi ve primler",
    lead: "Bordro ve serbest meslek yükümlülükleri farklıdır.",
    accordions: [
      {
        title: "Ücret düzeyleri ve ödeme",
        paragraphs: [
          "Özel sektörde ücretin işe başlamadan anlaşıldığı; en yüksek ücretlerin finans, bilişim ve üretim yönetimi gibi alanlarda olduğu; bölgesel farkların Rīga ve çevresinde yüksek, doğudaki Latgale’de daha düşük olduğu yazılır.",
          "İki bin yirmi üçte ortalama brüt aylık ücretin bin altı yüz seksen beş avro; netin bin iki yüz yirmi bir avro olduğu; iki bin yirmi dört brüt ortalamasının da bin altı yüz seksen beş avro olarak anıldığı belirtilir.",
          "Bir Ocak iki bin yirmi beş itibarıyla asgari aylık ücretin standart tam zamanlı kırk saatlik çalışmada en az yedi yüz kırk avro olması gerektiği; saatlik tabanın ilgili ay çalışma saatine göre hesaplandığı ifade edilir.",
          "İşverenin çalışanlar için sosyal sigorta primi ödemek zorunda olduğu; ücretlerin çoğu zaman ayda en az iki kez ödendiği; ödeme sırasında bordronun verilmesi ve kalemlerin talep halinde açıklanması gerektiği yazılır.",
        ],
      },
      {
        title: "Gelir vergisi ve bağlı kesintiler",
        paragraphs: [
          "Yıllık gelir vergisinin kademeli olduğu; yıllık yüz beş bin üç yüz avroya kadar kısmın yüzde yirmi beş buçuk, üstünün yüzde otuz üç ve yıllık gelir iki yüz bin avroyu aşarsa ek yüzde üç oranının uygulanabildiği yazılır.",
          "İki bin yirmi beşte aylık vergiden muaf asgari tutarın beş yüz on avro; bakmakla yükümlü olunan kişi başı indirimin ayda iki yüz elli avro (yılda üç bin avro) olduğu belirtilir.",
          "Toplam gelirin yüzde yetmiş beşinden fazlasını Letonya’da kazanan AB/EEA sakininin de yıllık vergisiz gelir ve bakıma bağlı indirimlerden yararlanabildiği ifade edilir.",
          "Sosyal sigorta prim oranının yüzde otuz dört buçuk dokuz olduğu; bunun yüzde yirmi üç buçuk dokuzunun işveren, yüzde on buçuğunun çalışan payı olduğu yazılır.",
        ],
      },
      {
        title: "KDV ve taşınmaz vergisi (özet)",
        paragraphs: [
          "Katma değer vergisinin standart oranının yüzde yirmi bir; indirimli oranların on iki, beş ve sıfır olduğu; taşınmaz vergisinin arsa ve yapı değerine göre kademeli tarifelerle alındığı kaynakta özetlenir.",
        ],
      },
      {
        title: "Serbest meslek ve şahıs şirketi",
        paragraphs: [
          "Serbest meslek için VID’ye vergi mükellefi olarak kayıt ve faaliyet türü beyanı; gayrimenkul sahibinden iş yeri onayı; KDV mükellefi olunabileceği yazılır.",
          "Serbest meslekçinin gelire göre zorunlu sosyal katkı (VSAOI) ödediği; çeyrek bazında hesaplandığı; standart oranın yüzde otuz bir buçuk yedi olduğu; aylık gelir asgari ücretin altındaysa yalnızca emeklilik sigortası için gelirin yüzde onunun ödenebildiği belirtilir.",
          "Şahıs tacir ve şirket kurulumunda Kurumlar Sicili’ne (ur.gov.lv) kayıt; lisans gerektiren faaliyetlerde önce izin alınması gerektiği; mikro işletme vergisi seçeneğinin bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi-izin",
    tocLabel: "Çalışma süresi ve izinler",
    h2: "Normal süre, fazla mesai ve resmî tatiller",
    lead: "Haftalık dinlenme ve gece çalışması için ek ücret oranları yasada öngörülür.",
    accordions: [
      {
        title: "Günlük ve haftalık süre",
        paragraphs: [
          "Normal iş gününün sekiz saati; haftalık çalışmanın kırk saati aşmaması gerektiği; beş günlük haftanın esas olduğu; işin niteliği gerektirirse altı günlük haftaya geçilebildiği ve bu durumda günlük sürenin yedi saati geçemeyeceği yazılır.",
          "Fazla mesainin yazılı anlaşma ile mümkün olduğu; fazla mesai ve tatilde çalışmada saatlik veya günlük ücretin en az yüzde yüz oranında prim verilmesi gerektiği belirtilir.",
          "Gece çalışmasının akşam on ile sabah altı arasında sayıldığı; gece işinde en az yüzde elli prim uygulanması gerektiği ifade edilir.",
          "Altı saati aşan iş gününde mola hakkı bulunduğu; molanın iş başlangıcından en fazla dört saat sonra verilmesi ve toplamda en az otuz dakika olması gerektiği; on beş dakikalık parçalara bölünebildiği yazılır.",
        ],
      },
      {
        title: "Yıllık izin ve aile izinleri",
        paragraphs: [
          "Her çalışanın en az dört takvim haftası ücretli yıllık izin hakkına sahip olduğu; resmî tatillerin bu süreye dahil edilmediği; iznin yıllık plan veya anlaşma ile verildiği ve bir dilimin en az iki kesintisiz hafta olması gerektiği belirtilir.",
          "İlk yılda altı ay kesintisiz çalışma sonrası tam yıllık izin talep edilebildiği; çocuk ve riskli iş gibi hallerde ek izin günleri tanınabildiği ifade edilir.",
          "Doğum öncesi ve sonrası izin sürelerinin haftalık tıbbi kayıt ve sağlık durumuna göre değişebildiği; doğum sonrası işverenin bakım izni verdiği; babalık izninin on takvim günü ve doğumdan sonra altı ay içinde kullanılabildiği yazılır.",
          "Çocuk bakım izninin on sekiz ay sürebildiği ve çocuk sekiz yaşına kadar talep edilebildiği; bakım izninde geçen sürenin hizmet süresine sayıldığı belirtilir.",
        ],
      },
      {
        title: "Resmî tatiller (özet)",
        paragraphs: [
          "Yılbaşı, Paskalya dönemi, Bir Mayıs, Anayasa Meclisi ve İşçi Bayramı, Bağımsızlık ilanı, Anneler Günü, Hamsin Bayramı, Yaz gündönümü (yirmi üç–yirmi dört Haziran), Letonya Şarkı ve Dans Festivali kapanış günü, Cumhuriyet ilanı, Noel arifesi ve Noel günleri ile yılbaşı arifesi gibi tarihlerin resmî tatil olarak anıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "fesih-sendika-grev",
    tocLabel: "Fesih, sendika ve grev",
    h2: "İhbar süreleri ve yasaklı fesih halleri",
    lead: "İş uyuşmazlıkları komisyon ve mahkeme aşamalarından geçer.",
    accordions: [
      {
        title: "Fesih yolları",
        paragraphs: [
          "İş ilişkisinin yalnızca İş Kanunu’nda öngörülen hallerde sona erdirilebildiği; karşılıklı yazılı anlaşma, süreli sözleşmenin bitimi, ihbar veya derhal fesih gibi yolların bulunduğu yazılır.",
          "Çalışanın bir takvim ay önceden yazılı ihbar ile feshedebildiği; toplu iş sözleşmesinde veya sözleşmede daha kısa süre öngörülebildiği belirtilir.",
          "Deneme süresinde tarafların üç günlük yazılı ihbar hakkına sahip olduğu; işverenin feshinin yalnızca davranış, yetenek veya örgütsel/teknik gerekçelere dayanabileceği; ihbar süresinin gerekçeye göre sıfır, on gün veya bir ay olabildiği ifade edilir.",
          "Gebelik, doğum sonrası bir yıl ve emzirme süresince veya sendika üyesinde önceden sendika onayı olmadan fesih yasağının bulunduğu; haksız feshte bir ay içinde mahkemeye başvurulabildiği ve ispat yükünün işverende olduğu yazılır.",
        ],
      },
      {
        title: "Sendika ve grev",
        paragraphs: [
          "Çalışanların sendika kurma ve üye olma özgürlüğüne sahip olduğu; sendika üyesinin sendika onayı olmadan işten çıkarılamayacağı istisnaları dışında korunduğu belirtilir.",
          "Grev hakkının ekonomik ve mesleki çıkarları korumak için kullanılabildiği; yargıç, savcı, polis, itfaiye, sınır muhafızı, güvenlik ve cezaevi personeli ile silahlı kuvvet mensuplarının greve çıkamayacağı; yasadışı grevde yasal korumanın olmayabileceği ifade edilir.",
        ],
      },
      {
        title: "Devlet İş Müfettişliği (VDI)",
        paragraphs: [
          "VDI’nin iş mevzuatına uyumu denetlediği; çalışma koşulları, ücret ve sözleşmeler konusunda inceleme yaptığı; işçi sağlığı ve güvenliği için ulusal temas noktası görevi gördüğü yazılır.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "VMNVD, aile hekimi ve e‑veselība",
    lead: "Devletle sözleşmeli kurumlarda katılım payı; acil yardım 113 ve 112.",
    accordions: [
      {
        title: "Sağlık güvencesi ve birinci basamak",
        paragraphs: [
          "Letonya’da istihdam veya serbest meslek nedeniyle ikamet eden AB/EEA vatandaşları ve ailesinin ve kalıcı oturma izni bulunanların devlet fonlu sağlık hizmetlerinden yararlanabildiği; diğer ikamet edenlerin ücretli hizmet veya fiyat listesine tabi olabildiği yazılır.",
          "Acil tıbbi yardım için yüz on üç veya yüz on iki aranabildiği; acil olmayan durumlarda aile hekimi veya mesai dışı GP danışma hattının (+371 66016001) kullanılabildiği belirtilir.",
          "Her sakinin bir aile hekimine kayıt olabildiği; kaydın ücretsiz olduğu ve e‑sağlık portalı (eveseliba.gov.lv) üzerinden randevu ve reçete bilgilerinin yönetilebildiği ifade edilir.",
        ],
      },
      {
        title: "Eğitim dili ve not sistemi",
        paragraphs: [
          "Devlet ve belediye okullarında öğretim dilinin Letonca olduğu; özel okul ve azınlık programlarında başka dilde eğitim mümkün olduğu; aynı zamanda Letonca öğrenme ve devlet dili sınavı yükümlülüklerinin bulunduğu yazılır.",
          "On puanlı not sisteminin ve ilkokul ilk sınıflarda harf düzeyeli değerlendirmenin kullanıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-ulasim",
    tocLabel: "Yaşam maliyeti ve ulaşım",
    h2: "Gıda, yakıt ve şehir içi ulaşım",
    lead: "Maaşın önemli kısmı kira ve faturalara gider; Baltık kıyısı ve kültür etkinlikleri güçlüdür.",
    accordions: [
      {
        title: "Yaşam maliyeti özeti",
        paragraphs: [
          "Hanehalkının gelirinin yaklaşık otuz–kırk yüzdesinin kira ve yardımcı giderlere gittiği; bazı ürün gruplarında fiyatların Avrupa ortalamasından düşük olabildiği yazılır.",
          "İki bin yirmi beş başında örnek gıda ve hizmet fiyatlarının (et, süt, ekmek, akaryakıt, kahve, sinema, yüzme havuzu) kaynakta rakamlarla verildiği belirtilir.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Otoyol ağının komşu ülkelerle bağlantılı olduğu; şehirler arası otobüs ve tren hatlarının bulunduğu; Rīga havaalanının şehir merkezine yaklaşık on kilometre uzakta olduğu ve otobüs veya taksi ile ulaşılabildiği yazılır.",
          "Rīga’da tramvay, otobüs ve troleybüs için elektronik bilet ve mobil uygulama kullanılabildiği; ücretsiz bilgi hattının +371 20361862 ve rigassatiksme.lv olduğu ifade edilir.",
        ],
      },
      {
        title: "Kültür ve turizm",
        paragraphs: [
          "Letonya’nın Baltık kıyısı, Gauja Millî Parkı ve UNESCO mirası Vecrīga gibi çekim noktalarına sahip olduğu; tiyatro, yaz şarkı ve dans festivalleri ile buz pateni ve basketbol gibi sporların popüler olduğu kaynakta özetlenir.",
        ],
      },
    ],
  },
  {
    id: "engellilik-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "NVA destekleri ve Apeirons haritası",
    lead: "İşverenlere ücret sübvansiyonu ve iş yeri uyarlama bütçesi.",
    accordions: [
      {
        title: "Tanınma ve destekler",
        paragraphs: [
          "Engelliğin resmî prosedürlerle belirlendiği ve sertifikanın hizmet ve haklara erişimi sağladığı yazılır.",
          "İşverenlere engelli çalışanlar için ücret sübvansiyonu; iş yeri uyarlama giderlerinde NVA’nın bin avroya kadar katkısı ve meslek terapisti danışmanlığı sunulabildiği belirtilir.",
          "Çalışanlara mentorluk, meslekî rehabilitasyon, işaret dili tercümesi ve sübvansiyonlu iş deneyimi gibi imkânların bulunduğu ifade edilir.",
        ],
      },
      {
        title: "İletişim ve günlük yaşam",
        paragraphs: [
          "NVA’nın (nva.gov.lv/en) iş arayan ve işveren için ana iletişim noktası olduğu; Apeirons’un erişilebilirlik haritası ve danışmanlık sunduğu; çok şiddetli ve şiddetli engelli grupları ile on sekiz yaş altı engelliler ve refakatçilerin yerel ve şehirlerarası toplu taşımada ücretsiz yararlanabildiği yazılır.",
        ],
      },
    ],
  },
];
