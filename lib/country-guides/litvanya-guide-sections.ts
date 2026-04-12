import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Lithuania” (10/04/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const LITVANYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Litvanya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Litvanya Avrupa Birliği ve Schengen üyesidir; para birimi avrodur (EUR). AB üyesi uyruklular ve aileleri, istihdam sözleşmesiyle çalışmak için ayrıca çalışma iznine ihtiyaç duymaz; ancak kamu görevi, kolluk ve belirli alanlarda Litvanya vatandaşlığı şartı bulunabilir. UŽT (İstihdam Hizmeti) ve eures.uzt.lt; özel istihdam bürolarının 2004 sonrası iş arayanlara ücretsiz hizmeti ve ihlallerde İdari Suçlar Kanunu 133. madde uyarınca para cezası; stajda en fazla altı ay ve haftada 20–40 saat; çıraklıkta işyerinde en az %70 pratik; MIGRIS üzerinden geçici veya kalıcı ikamet başvurusu; dört / iki ay inceleme süreleri; 2025 için asgari saatlik ücret ve gelir vergisi / SSI / zorunlu sağlık primi oranları; yıllık en fazla 180 saat fazla mesai; 1 Ocak 2023’ten itibaren üç yaşına kadar çocuğu olan bütçe kurumu çalışanları için haftada 32 saat seçeneği; engelli istihdamında ücret sübvansiyonu ve iş koçluğu başlıklarında kamu bilgisine dayanır.",
  "Asgari ücret, vergi oranları ve kira örnekleri güncellenebilir. Doğrulama için uzt.lt, migracija.lt, sodra.lt, vmi.lt, vlk.lt ve renkuosilietuva.lt kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const LITVANYA_SEO_KEYWORD_TAGS: string[] = [
  "litvanya vize",
  "litvanya schengen çalışma",
  "UŽT Lithuania employment",
  "eures.uzt.lt",
  "MIGRIS residence permit Lithuania",
  "Lithuania Labour Code Darbo kodeksas",
  "pameistryste.lt apprenticeship",
];

export const LITVANYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-uzt",
    tocLabel: "İş bulma",
    h2: "UŽT, EURES ve özel bürolar",
    lead: "İstihdam Hizmeti ücretsizdir; özel aracılık iş arayan için ücret alınamaz.",
    accordions: [
      {
        title: "Resmî ve özel kanallar",
        paragraphs: [
          "AB üyesi uyrukluların ve aile fertlerinin istihdam sözleşmesiyle çalışmak için çalışma iznine ihtiyaç duymadığı; Litvanyalılarla aynı koşullarda işe başvurabileceği yazılır.",
          "Kamu görevi, kolluk ve bazı alanlarda Litvanya Cumhuriyeti vatandaşlığı gerekebildiği belirtilir.",
          "İşveren ve iş arayanların önce İstihdam Hizmeti’ni (uzt.lt, eures.uzt.lt) kullanabildiği; hizmetin ücretsiz olduğu ifade edilir.",
          "Özel istihdam ajanslarının ülkenin sözleşmeyi onaylamasından sonra iş arayanlardan ücret alamayacağı; usulsüzlüklerin İdari Suçlar Kanunu 133. maddeye göre cezalandırıldığı ve şikâyet için polise başvurulabileceği yazılır.",
          "İlanların basın, ulusal gazete ve yerel basında; internette ve büyük şirketlerin insan kaynakları veri tabanlarında yer aldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-cv",
    tocLabel: "Başvuru",
    h2: "CV, örtük yazı ve mülakat",
    lead: "Manuel işlerde çoğu zaman CV veya yalnızca mülakat yeterli olabilir.",
    accordions: [
      {
        title: "İçerik ve Europass",
        paragraphs: [
          "CV ve örtük yazı, testler ve işveren mülakatının tipik başvuru adımları olduğu yazılır.",
          "CV’de kişisel veriler, iletişim, deneyim, eğitim, beceriler, hobiler ve referansların bulunması; dilbilgisi hatalarından kaçınılması gerektiği belirtilir.",
          "Örtük yazının tek A4 sayfada; işe ve şirkete ilgi, uygunluk ve katkı vaadinin ikna edici biçimde anlatılması gerektiği; CV’yi tekrarlamak yerine derinleştirmek gerektiği ifade edilir.",
          "Europass CV’nin Litvanya’da yaygınlaştığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "staj-traineeship",
    tocLabel: "Staj",
    h2: "Programlı veya ad hoc staj; süre ve burs",
    lead: "En fazla altı ay; haftada en az yirmi, en fazla kırk saat.",
    accordions: [
      {
        title: "Tanım ve sigorta",
        paragraphs: [
          "Konuyla ilgili, sanatsal, yaratıcı, öğrenim, akademik veya zihinsel stajların resmî programla veya bireysel olarak düzenlenebildiği yazılır.",
          "Üniversite, araştırma merkezi, işletme, bakanlık ve STK’ların staj verebildiği; devlet, fon veya ev sahibi kuruluşça finanse edilebildiği belirtilir.",
          "Öğrenci, mezun, uzman, sanatçı ve araştırmacıların başvurabildiği; EEA’da Litvanya’da ikamet eden uygun kişilerin kapsamda olduğu ifade edilir.",
          "Şirket–stajyer anlaşmasının Devlet Sosyal Sigorta Fonu Kurulu’na bildirilmesi gerektiği yazılır.",
          "Meslekî eğitim, uygulama veya meslekî rehabilitasyon katılımcılarının iş kazası ve meslek hastalığı sigortasıyla korunduğu belirtilir.",
        ],
      },
      {
        title: "İşsizler için ücretsiz deneyim stajı",
        paragraphs: [
          "Yetişkin eğitimiyle kazanılan yeterlilikleri altı ay üst üste kullanmamış işsizlere yönelik ücretsiz deneyim stajının; UŽT, işletme ve kişi arasında en fazla altı aylık üçlü anlaşmayla düzenlendiği yazılır.",
          "Bursun, işsizin tercihine göre hükümetin onayladığı aylık asgari ücretin 0,39 katı veya işsizlik ödeneği kurallarına göre belirlenebildiği; devamsızlıkta orantılı kesinti yapıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-pameistryste",
    tocLabel: "Çıraklık",
    h2: "İşyerinde %70, kurumda %20–30",
    lead: "Çıraklık istihdam sözleşmesi ve meslek eğitimi sözleşmesi birlikte yürür.",
    accordions: [
      {
        title: "Yasal çerçeve ve süre",
        paragraphs: [
          "Çıraklığın meslekî eğitimin işyerinde yürütülen kısmı olduğu; kurumda %20–30, işyerinde en az %70 süre ayrıldığı yazılır.",
          "İşverenin ücret, yıllık izin ve diğer sözleşme yükümlülüklerini yerine getirmesi gerektiği; yaş sınırı olmadığı; ortaklık sözleşmesinde işverenin tüm eğitimden sorumlu olabildiği belirtilir.",
          "Haftalık toplam çalışma ve öğrenme süresinin on sekiz yaşından küçükler hariç kırk sekiz saati aşmaması gerektiği ifade edilir.",
        ],
      },
      {
        title: "Üçlü / ikili anlaşma ve geri ödeme",
        paragraphs: [
          "UŽT’nin meslekî eğitimi finanse ettiği üçlü anlaşmada işverenin en az altı ay süreyle nitelikli kişiyi istihdam etmesi beklentisinin yer aldığı yazılır.",
          "İşverenlere, çıraklık istihdam sözleşmesindeki ücretin hükümetin onayladığı aylık asgari ücretin 1,5 katını aşmayan kısmının %70’i ve zorunlu sosyal sigorta primlerinin geri ödenebildiği belirtilir.",
          "Atanan uzmanın koordinasyon süresi için ek geri ödeme üst sınırının olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-goc",
    tocLabel: "Konut ve göç",
    h2: "Kira, satın alma ve MIGRIS",
    lead: "Sözleşmeler için emlakçı, avukat veya noter desteği önerilir.",
    accordions: [
      {
        title: "Barınma arama",
        paragraphs: [
          "Otel, oda kiralama, daire veya müstakil ev kiralama veya satın alma seçeneklerinin bulunduğu yazılır.",
          "İlanların uzman siteler, genel portallar veya kişisel ağ üzerinden yürütülebildiği belirtilir.",
        ],
      },
      {
        title: "İkamet ve vize",
        paragraphs: [
          "Geçici veya kalıcı ikamet için Litvanya mevzuatındaki prosedürün izlenmesi gerektiği yazılır.",
          "Üçüncü ülke vatandaşlarına geçici ve kalıcı ikamet izni türlerinin; başvuruların genelde yurtdışındaki elçilik veya Litvanya’da ilgili polis migrasyon birimine yapıldığı belirtilir.",
          "Bir yıldan kısa kalış için ulusal vize; mevsimlik çalışma izniyle doksan günden uzun süre için ulusal vize seçeneklerinin anıldığı ifade edilir.",
          "Geçici ikametin çoğunlukla iki yıl, yüksek nitelikli çalışanlarda üç yıl süreyle verildiği ve yenilenebildiği; başvuru sırasında çok girişli ulusal vize talep edilebildiği yazılır.",
          "Kalıcı ikamet belgesinin beş yıl için verildiği ve sonunda yenilendiği belirtilir.",
          "MIGRIS üzerinden başvurunun genel usulde dört ay, acil usulde iki ay içinde sonuçlandırılması gerektiği ifade edilir.",
          "AB vatandaşlarının ilk varıştan itibaren üç ay vizesiz kalabildiği; altı aylık dönemde üç aydan uzun kalanların kalış hakkını belgeleyen sertifika alması gerektiği; EFTA ülkeleri vatandaşlarının benzer hükümlere tabi olduğu yazılır.",
        ],
      },
    ],
  },
  {
    id: "okul-kayit",
    tocLabel: "Okul kaydı",
    h2: "E-başvuru ve yabancı diploma",
    lead: "Birinci sınıf, okul değişimi veya progymnasium–gymnasium geçişinde elektronik başvuru zorunludur.",
    accordions: [
      {
        title: "Başvuru sistemi",
        paragraphs: [
          "Velilerin çevrimiçi başvuru yaptığı; tamamlandığında başvurunun seçilen okullara iletildiği yazılır.",
          "Belediyede ikamet adresine göre atanmış okul seçimde yoksa sistemin ek okul önerebildiği belirtilir.",
          "Evden başvuru imkânı olmayanların herhangi bir okula giderek bilgisayar kullanabildiği ifade edilir.",
        ],
      },
      {
        title: "Yurtdışından gelen öğrenciler",
        paragraphs: [
          "Yabancı ülkede eğitim belgesi olanların genel prosedürle kabul edilebildiği; belge yoksa seviye tespit sınavının yapılabildiği yazılır.",
          "Litvanyaca yetersiz olanların tam zamanlı başlamadan önce telafi sınıfı veya gezici telafi grubuna yönlendirilebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "varis-listesi",
    tocLabel: "Varış listesi",
    h2: "Belgeler ve ilk adımlar",
    lead: "Pasaport veya kimlik en az altı ay geçerli olmalıdır.",
    accordions: [
      {
        title: "Getirilecekler ve öneriler",
        paragraphs: [
          "Tercihen Litvanyaca CV, diploma suretleri ve çevirileri, önceki işveren referansları, Avrupa Sağlık Sigorta Kartı, evlilik ve çocuk doğum belgelerinin çevirilerinin önerildiği yazılır.",
          "Altı aydan uzun yurtdışına çıkışta ülkedeki göç makamına bildirim yapılması; temel Litvanyaca becerisi; ilk günler için konaklama ve yakınlara adres bildirimi hatırlatıldığı belirtilir.",
        ],
      },
      {
        title: "Varışta",
        paragraphs: [
          "Uzun süreli konut aranması; yerel UŽT şubesine gidilmesi; Litvanya dili kursuna yazılınması ve düzenli iletişim önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-tipleri",
    tocLabel: "İstihdam türleri",
    h2: "İş Kanunu sözleşme çeşitleri",
    lead: "Tür üzerinde anlaşma yoksa sözleşme süresiz sayılır.",
    accordions: [
      {
        title: "Sözleşme modelleri",
        paragraphs: [
          "Süresiz, süreli, proje bazlı, işyeri paylaşımlı, çoklu işverenli, geçici işçi işvereni, çıraklık ve mevsimlik sözleşmelerin Kanunda sayıldığı yazılır.",
          "Süreli sözleşmenin aynı iş için en fazla iki yıl (geçici olarak devamsız çalışanın yerine olmak gibi istisnalar hariç), farklı işler için beş yıla kadar uzayabildiği belirtilir.",
          "Geçici işçi işvereni sözleşmesinin en fazla üç yıl sürebildiği ifade edilir.",
        ],
      },
      {
        title: "Çocuk işçiliği sınırları",
        paragraphs: [
          "On dört yaşında çalışma tabanının bulunduğu; on dört–on altı yaşta yalnızca hafif işlere, ebeveyn izni, doktor uygunluk raporu ve okul izniyle izin verildiği yazılır.",
          "On sekiz yaşından küçüklerin ağır, toksik veya gece 20.00–06.00 arası riskli işlerde çalıştırılamayacağı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "is-sozlesmesi",
    tocLabel: "İş sözleşmesi",
    h2: "Yazılı sözleşme ve deneme süresi",
    lead: "Standart modele uygun iki nüsha imzalanır.",
    accordions: [
      {
        title: "Zorunlu hususlar ve deneme",
        paragraphs: [
          "Doğal kişinin yaptığı her işin yazılı iş sözleşmesine dayanması gerektiği; telif eser sözleşmesi istisnasının bulunduğu yazılır.",
          "İş yeri, görevler, ücret sistemi ve ödeme usulü gibi zorunlu şartların kararlaştırıldığı belirtilir.",
          "Karşılıklı anlaşmayla en fazla üç aylık deneme süresi konulabildiği; kanunda öngörülen hallerde altı aya kadar uzatılabildiği ifade edilir.",
          "Denemede işverenin üç gün önceden yazılı bildirimle ve tazminatsız fesih hakkının olduğu; ancak gerekçe ve ispat yükümlülüğünün işverende kaldığı yazılır.",
        ],
      },
      {
        title: "Ücret değişikliği ve ihbar",
        paragraphs: [
          "İşverenin çalışana yazılı rızası olmadan ücreti yalnızca kanun, hükümet kararı veya toplu sözleşmeyle değiştirebildiği; aksi halde ücret düşüşü için yazılı onay gerektiği belirtilir.",
          "İşverenin yazılı olarak en az iki ay önceden bildirimle fesih hakkının bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-asgari",
    tocLabel: "Ücret",
    h2: "Eşit ücret ve bordro",
    lead: "Hükümet üçlü konsey teklifiyle asgari saatlik ve aylık ücreti belirler.",
    accordions: [
      {
        title: "Ödeme ve bordro",
        paragraphs: [
          "Ücret Kanunu uyarınca hükümetin belirlediği asgari saatlik ücretin (metinde saatlik 6,35 EUR) ve asgari aylık ücretin (metinde 1.038 EUR) altında ücret ödenemeyeceği; asgari aylık ücretin yalnızca bedenî iş için uygulanabildiği belirtilir; güncel tutarlar resmî kararnamelerle değişir.",
          "Aynı veya eşit değerdeki iş için kadın ve erkeğe eşit ücret ödenmesi gerektiği yazılır.",
          "Ücretin çoğunlukla ayda iki kez (avans ve asıl ödeme) yatırıldığı; çalışanın yazılı talebiyle aylık tek ödemeye geçilebildiği belirtilir.",
          "Her ay en az bir kez hesaplanan, ödenen ve kesilen tutarlar ile çalışılan saatlerin yazılı veya elektronik olarak bildirilmesi gerektiği ifade edilir.",
          "Resmî tatillerde veya hafta tatilinde normal vardiya dışı çalışmanın en az iki katı veya tercihe göre ilave izin günü ile telafi edilmesi gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-suresi",
    tocLabel: "Çalışma süresi",
    h2: "Kırk saat, kırk sekiz saat ortalama, fazla mesai tavanı",
    lead: "Fazla mesai yılda en fazla yüz seksen saat; toplu sözleşmede artırılabilir.",
    accordions: [
      {
        title: "Günlük ve haftalık sınırlar",
        paragraphs: [
          "Standart haftalık çalışmanın kırk saat olduğu; yedi günde ortalama kırk sekiz saati aşan sürenin fazla mesai sayıldığı yazılır.",
          "Bir vardiyada öğle arası hariç on iki saati ve yedi günde altmış saati aşan çalışmanın mümkün olmadığı belirtilir.",
          "Yedi ardışık günde en fazla altı iş günü olması gerektiği ifade edilir.",
          "Fazla mesainin çalışan rızasıyla yapılabildiği; kamu yararı, felaket önleme veya toplu sözleşmede öngörülen hallerde istisna bulunduğu yazılır.",
          "Bütçe kurumlarında üç yaşına kadar çocuğu olan çalışanlar için 1 Ocak 2023’ten itibaren haftada otuz iki saatlik azaltılmış hafta hakkının tanındığı belirtilir.",
        ],
      },
      {
        title: "Dinlenme",
        paragraphs: [
          "En az beş saat çalışmadan sonra otuz dakika ile iki saat arası öğle arası verilmesi gerektiği yazılır.",
          "Vardiyalar arasında en az on bir saat kesintisiz dinlenme ve yedi günde en az otuz beş saat kesintisiz haftalık dinlenme şartlarının bulunduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izinler-fesih",
    tocLabel: "İzin ve fesih",
    h2: "Yıllık izin, doğum ve ebeveynlik",
    lead: "Haftada beş iş günü düzeninde en az yirmi iş günü yıllık izin.",
    accordions: [
      {
        title: "İzinler",
        paragraphs: [
          "Haftada altı iş gününde en az yirmi dört iş günü yıllık izin verildiği; resmî tatillerin izin süresine dahil edilmediği yazılır.",
          "Yıllık iznin en az bir parçasının on veya on iki iş gününden kısa olamayacağı belirtilir.",
          "Doğum öncesi yetmiş ve sonrası elli altı takvim günü analık izninin; komplikasyon veya çoğul doğumda sonrası yetmiş güne çıkabildiği ifade edilir.",
          "Doğumdan sonra çocuk bir yaşına kadar otuz takvim günü babalık izninin iki parça bölünebildiği yazılır.",
          "Çocuk üç yaşına kadar bakım izninin aile seçimine göre anne, baba, büyükanne veya bakımı üstlenen diğer akranlara verilebildiği belirtilir.",
        ],
      },
      {
        title: "Fesih korumaları",
        paragraphs: [
          "Hamilelik ve çocuk dört aylık olana kadar sözleşmenin yalnızca çalışanın talebi, deneme süresi, tarafların iradesi dışı veya süreli sözleşmenin bitimiyle sona erdirilebildiği yazılır.",
          "Üç yaşından küçük çocuğa bakan ve kusuru olmayan çalışanın ve analık/babalık ile bakım iznindeki çalışanın işverenin takdirine bağlı feshinin yasak olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "temsil-grev",
    tocLabel: "Temsil ve grev",
    h2: "Sendika, işyeri konseyi ve uyarı grevi",
    lead: "Toplu pazarlık ve toplu iş uyuşmazlığı başlatma yetkisi sendikalara aittir.",
    accordions: [
      {
        title: "Temsil organları",
        paragraphs: [
          "Sendika, işyeri konseyi ve çalışan vekilinin çalışan temsilcisi sayıldığı yazılır.",
          "Ortalama çalışan sayısı yirmi ve üzeri işyerlerinde aktif sendika üyeliği toplam çalışanın üçte birinden az değilse işverenin işyeri konseyi kurması gerektiği; yirmiden az çalışanda genel kurulda seçilen üç yıllık vekilin yetki kullanabildiği belirtilir.",
        ],
      },
      {
        title: "İş uyuşmazlığı ve grev bildirimi",
        paragraphs: [
          "Bireysel iş uyuşmazlıklarının bölgesel İş Müfettişliği altındaki komisyonlarda veya mahkemede görüldüğü; başvuru süresinin hak ihlalinin öğrenilmesinden itibaren üç ay olduğu yazılır.",
          "İşyeri düzeyinde grev için sendika üyelerinin en az dörtte birinin onayının gerektiği; uyarı grevi için en az üç, fiilî grev için beş iş günü önceden yazılı bildirim; hayati hizmetlerde on iş günü bildiriminin öngörüldüğü belirtilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-saglik",
    tocLabel: "Vergi ve sağlık",
    h2: "VMI, SODRA ve VLK",
    lead: "2025 çalışan vergileri metinde özetlenmiştir; güncel oranları vmi.lt üzerinden doğrulayın.",
    accordions: [
      {
        title: "Gelir ve primler",
        paragraphs: [
          "Devlet sosyal sigortası priminin yüzde on dokuz buçuk; ortalama ücretin altmış katını aşmayan gelirde gelir vergisinin yüzde yirmi, aşan kısımda yüzde otuz iki; zorunlu sağlık sigortası priminin yüzde altı doksan sekiz olarak anıldığı yazılır.",
          "Her yıl önceki yıla ilişkin gelir beyanının en geç 2 Mayıs’a kadar yapılması gerektiği belirtilir.",
        ],
      },
      {
        title: "Sağlık güvencesi",
        paragraphs: [
          "Zorunlu sağlık sigortası primi ödeyen veya adına ödenen kişilerin THIF ile sözleşmeli kurumlarda çoğu hizmetten ücretsiz yararlanabildiği yazılır.",
          "Acil servislerin yirmi dört saat açık olduğu ve acil çağrı numarasının 112 olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-ulasim",
    tocLabel: "Yaşam ve ulaşım",
    h2: "Euro, kira örnekleri ve e-vinyet",
    lead: "Ücretlendirilen otoyol kesimlerinde e-vinyet zorunludur.",
    accordions: [
      {
        title: "Siyasi yapı",
        paragraphs: [
          "Litvanya’nın çok partili parlamenter demokrasi olduğu; Seimas’ın dört yıllık yasama yetkisine sahip olduğu ve başkanın beş yıllık seçildiği yazılır.",
        ],
      },
      {
        title: "Yaşam maliyeti ve ulaşım",
        paragraphs: [
          "2023 hane başına aylık ortalama kullanılabilir gelir ve gıda ile konut harcama oranlarının istatistiklerle verildiği belirtilir.",
          "Vilnius, Kaunas, Klaipėda ve Šiauliai için tek ve iki odalı daire kira aralıklarının örnek olarak anıldığı ifade edilir.",
          "A1–A18 ücretli kesimlerde otobüs, kamyon ve özel araçlar için elektronik vinyet zorunluluğu ve bilginin keliumokestis.lt adresinde olduğu yazılır.",
          "Vilnius, Kaunas, Palanga ve Šiauliai havalimanları ile ltglink.lt tren ve autobusubilietai.lt otobüs hatlarının anıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Ücret sübvansiyonu ve iş uyarlama hibesi",
    lead: "Çalışma gücü ve özel ihtiyaç değerlendirmesi hakları açar.",
    accordions: [
      {
        title: "Tanıma ve destek",
        paragraphs: [
          "Engelliliğin uzun süreli engellerle topluma eşit katılımı sınırlayabilecek durumları kapsadığı; değerlendirme sürecinin çalışma kapasitesi ve özel ihtiyaç incelemesini içerdiği yazılır.",
          "İşverenlere ücret sübvansiyonu, iş koçluğu maliyeti ve işyeri uyarlama hibesi başvurularının e-devlet kapısı üzerinden yapılabildiği belirtilir.",
          "Çalışanlara kariyer danışmanlığı, kişiselleştirilmiş destek ve destekli istihdam hizmetlerinin kamu istihdam servisinden sunulduğu ifade edilir.",
        ],
      },
    ],
  },
];
