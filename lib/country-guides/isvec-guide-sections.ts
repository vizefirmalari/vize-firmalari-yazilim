import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Sweden” (05/05/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const ISVEC_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “İsveç’te yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. Arbetsförmedlingen ve Platsbanken, başvuru kültürü, traineeship ve çıraklık / yüksek meslekî eğitim (HVET) yolları, ikamet hakkı ve kimlik numaraları, konut, LAS (iş koruması), çalışma süresi ve izinler, vergi ve sağlık sistemi başlıkları kaynak metne dayanır.",
  "Metinde geçen tutarlar ve eşikler (örneğin 2023 ortalama ücret, 2025 vergi tabanları, kira / konut fiyatları, hasta ücreti tavanları) yayımlandıkları döneme bağlıdır; güncel rakamları Skatteverket, Försäkringskassan, Hyresgästföreningen ve ilgili kurum sitelerinden doğrulayın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const ISVEC_SEO_KEYWORD_TAGS: string[] = [
  "isveç vize",
  "isveç schengen",
  "Platsbanken",
  "Arbetsförmedlingen",
  "personnummer İsveç",
  "LAS İsveç iş hukuku",
  "İsveç kolektif sözleşme",
  "1177 İsveç sağlık",
  "Skatteverket vergi",
];

export const ISVEC_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Platsbanken, internet ve proaktif arama",
    lead: "İlanların çoğu İsveççe; doğrudan işveren ve spekülatif başvuru yaygın.",
    accordions: [
      {
        title: "Kanallar ve beklenti",
        paragraphs: [
          "İsveç’te iş ararken çok proaktif olunması beklendiği; en yaygın yolun internet üzerinden ilan takibi olduğu yazılır.",
          "Kamu istihdam servisi Arbetsförmedlingen’in iş bankası Platsbanken’de ülke geneli ve yurtdışı ilanların bulunduğu; konum ve meslek ile arama yapılabildiği; çoğu ilanda işveren bilgilerinin verilerek doğrudan iletişimin mümkün olduğu belirtilir.",
          "İlanların çoğunlukla İsveççe olması nedeniyle işverenlerin adayların en azından bir miktar İsveççe bildiğini varsaydığı; Platsbanken’e bakmak için iş arayan kaydının zorunlu olmadığı; ilanların EURES portalına da aktarıldığı ifade edilir.",
        ],
      },
      {
        title: "Sendika temsilcisi ve diğer kaynaklar",
        paragraphs: [
          "İş ilanlarında genelde maaş ve diğer konularda soru sorulabilecek sendika temsilcisinin iletişim bilgisinin verildiği yazılır.",
          "Arbetsförmedlingen hizmetlerinin çok dilli bilgisinin arbetsformedlingen.se üzerinde bulunduğu; özel istihdam / seçme şirketleri, şirket web siteleri, EURES (ilan + Europass ile CV) ve LinkedIn / Facebook gibi sosyal medyanın da kullanıldığı belirtilir.",
          "Dışarı hiç ilan verilmeyen pozisyonların çok olduğu; beğenilen işverene kendi girişimli başvurunun yaygın ve olumlu karşılandığı; sektörel şirket listelerinin internet veri tabanlarında bulunabileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-mulakat",
    tocLabel: "Başvuru ve mülakat",
    h2: "Kişisel mektup, meritförteckning ve Play",
    lead: "Kısa ön yazı; CV ters kronolojik; mülakatta güçlü–zayıf yönler.",
    accordions: [
      {
        title: "Başvuru belgeleri",
        paragraphs: [
          "Çoğu durumda kişisel mektuba CV (meritförteckning) eklendiği; şirketlerin pozisyonları yalnızca kendi sitelerinde duyurabildiği; ilanda nasıl başvurulacağının ve şartların dikkatle okunması gerektiği yazılır.",
          "Tercih / önerilen niteliklerin her zaman zorunlu olmadığı; Arbetsförmedlingen’in CV, mülakat ve başvuru üzerine İngilizce dahil webinarlar düzenlediği; güncel ve kayıtlı yayınların Play sitesinde bulunduğu belirtilir.",
          "Başvurunun işe uyarlanması ve önemli noktaların vurgulanması gerektiği; kişisel mektubun çok kısa (en fazla bir A4), hangi işe başvurulduğunun net ve neden uygun aday olunduğunun anlatılması gerektiği; tarih ve detayların CV’de bırakılması önerildiği ifade edilir.",
        ],
      },
      {
        title: "CV içeriği ve Europass",
        paragraphs: [
          "CV’nin bir–iki sayfa olması; kişisel bilgiler, eğitim, iş deneyimi (görev ve işveren), sorumluluklar, ehliyet, bilgisayar becerileri, diller, hobiler; referansların talep üzerine verilebileceği ve referansın hangi işlere başvurulduğundan haberdar tutulması gerektiği yazılır.",
          "Eğitim ve iş deneyiminin tarihli ve en yeniden eskiye sıralanması; büyük şirketlerin çoğu zaman başvuru alındı bilgisi ve geri dönüş süresi ipucu verdiği; ses çıkmazsa işverenle iletişime geçilmesinin olağan olduğu belirtilir.",
          "Europass’ın ücretsiz CV ve belge şablonları için kullanılabileceği ifade edilir.",
        ],
      },
      {
        title: "Mülakat",
        paragraphs: [
          "Şirket hakkında önceden araştırma yapılması; eğitim, önceki işler, hobiler, güçlü ve zayıf yönlerin işe etkisi, aile durumu gibi soruların sık geldiği; sonunda adayın da soru sormasının beklendiği yazılır.",
          "Belgelerin mülakata götürülmesi; personel yetkilisi yanında sendika temsilcisi veya gelecekteki iş arkadaşının da katılabildiği; ikinci veya üçüncü mülakat ile çeşitli testlerin iş türüne göre mümkün olduğu belirtilir.",
        ],
      },
      {
        title: "İşyerinde İsveççe",
        paragraphs: [
          "Çoğu işte İsveççe okuma ve anlama gerektiği; IT, mühendislik, turizm ve mevsimlik işlerde istisnaların bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "traineeship",
    tocLabel: "Traineeship",
    h2: "Genç mezunlar ve on iki aydan uzun süre",
    lead: "Çoğunlukla üniversite + iki–üç yıldan az deneyim; tam zamanlı istihdam hedefi.",
    accordions: [
      {
        title: "Tanım ve uygunluk",
        paragraphs: [
          "Traineeship türlerinin çeşitli olduğu; İsveç’te programların çoğunlukla üniversite mezunu ve en fazla iki–üç yıl iş deneyimi olan gençlere yöneldiği; sürenin çoğu zaman en az on iki ay olduğu yazılır.",
          "Trainee’lerin farklı departmanlarda zaman geçirdiği ve süre sonunda genelde tam zamanlı istihdamın garanti edildiği (son aşamada netleşeceği) belirtilir.",
          "İsveç’te oturma hakkı bulunan AB/AEA vatandaşlarının da traineeship’e başvurabileceği ifade edilir.",
        ],
      },
      {
        title: "Uygulama ve fırsatlar",
        paragraphs: [
          "Trainee olarak çoğu zaman şirket, kamu kurumu veya örgütte tam zamanlı çalışıldığı; yaygın istihdamın kalıcı, proje bazlı istihdamın ise bazı durumlarda mümkün olduğu yazılır.",
          "traineeguiden.se, graduateland, LinkedIn ve Platsbanken gibi sitelerin fırsat aramak için anıldığı; Targeted Mobility Scheme kapsamında EURES’ten mali destek sorulabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik-hvet",
    tocLabel: "Çıraklık ve HVET",
    h2: "Lise, yetişkin eğitimi ve hantverksprogramları",
    lead: "Okul Yasası çerçevesi; HVET için meslekî sözleşme ve deneyim şartı.",
    accordions: [
      {
        title: "Meslek lisesi ve yetişkin çıraklığı",
        paragraphs: [
          "Çıraklığın üst ortaöğretimde, belediye yetişkin eğitiminde ve yüksek meslekî eğitimde (HVET) bulunduğu; uyarlama programları ve özel eğitim yollarının da mevcut olduğu yazılır.",
          "HVET’e kabul için üst ortaöğretimin tamamlanması, başvurulan meslekte en az altı ay deneyim ve eğitimden sorumlu olacak İsveçli bir usta / meslek elemanı ile çıraklık sözleşmesi gerektiği; öğrenci statüsünün program boyunca sürdüğü belirtilir.",
          "HVET çıraklığı sunan iki sağlayıcının (ör. Hantverkslärling, Hantverksakademin) beşte birinin genel eğitim (işletme, pazarlama vb.) içerdiği; yıllık kontenjanın sınırlı olduğu ve çok başvuruda seçim yapıldığı ifade edilir.",
        ],
      },
      {
        title: "Finansman",
        paragraphs: [
          "Üst ortaöğretim ve yetişkin eğitimindeki çıraklık eğitiminin öğrenci mali yardımına uygun olabildiği; CSN sitesinde başvuru ve koşulların anlatıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "tasima-konut-okul",
    tocLabel: "Taşınma, konut ve okul",
    h2: "AB içi dolaşım, konut siteleri ve Utbildningsguiden",
    lead: "Büyük şehirlerde kira baskısı; Blocket, Hemnet, Booli.",
    accordions: [
      {
        title: "Mal ve sermaye (özet)",
        paragraphs: [
          "AB tek piyasasında malların serbest dolaşımı ve karşılıklı tanınma ilkesi; sermayenin AB içinde yatırım ve hesap açılımı gibi işlemlerde geniş özgürlüğü; istisnaların çoğunlukla vergi, denetim ve kamu düzeni ile ilişkili olduğu kaynakta özetlenir.",
        ],
      },
      {
        title: "Konut",
        paragraphs: [
          "Konut maliyetinin standart ve bölgeye göre değiştiği; büyük şehirlerde konut bulmanın zor ve fiyatların ülke ortalamasının üzerinde olduğu yazılır.",
          "Büyük şehirlerde satılık konut seçeneğinin kiralığa göre daha fazla, kira stresinin yüksek olduğu; blocket.se gibi sitelerin yanı sıra yerel ve bölgesel mülk sahipleri ile belediye konut birimlerinin kullanılabildiği belirtilir.",
          "Satın alma için Hemnet ve Booli gibi sitelerin anıldığı ifade edilir.",
        ],
      },
      {
        title: "Okul ve eğitim rehberleri",
        paragraphs: [
          "Skolverket’in Utbildningsguiden’inin okul öncesinden üst ortaöğretim ve yetişkin eğitimine kadar kapsamlı bilgi verdiği; başvuru, karşılaştırma araçları ve kreş / okul sonrası kulüp konularının burada toplandığı yazılır.",
          "Altı–on altı yaş zorunlu ilkokulun ücretsiz olduğu; devletin çocuk bakımının büyük kısmını üstlendiği; veli gelirine bağlı ücret üst sınırı bulunduğu belirtilir.",
          "Üst ortaöğretimin gönüllü olduğu fakat on altı–on dokuz yaş grubunda yüksek devam oranı bulunduğu; yetişkinler için belediye eğitimi, üniversite bilgisi (UHR, studera.nu, antagning.se), yrkeshogskolan.se ve folkhögskola.nu kaynakta anılır.",
        ],
      },
      {
        title: "Sürücü belgesi ve araç (AB çerçevesi)",
        paragraphs: [
          "AB sürücü belgesi modeli ve sürelerin uyumlu hale getirildiği; belgenin genelde ikamet edilen ülkede yenilenmesi gerektiği; kalıcı taşınmada aracın yeni ülkede tescil ve vergi kurallarına tabi olabileceği yazılır.",
          "Zorunlu sorumluluk sigortasının AB genelinde geçerliliği hakkında kaynakta genel bilgi verildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-numara",
    tocLabel: "İkamet ve kimlik numarası",
    h2: "Üç aydan fazla AB/EEA hakkı; personnummer",
    lead: "Skatteverket bildirimi; Migrationsverket üçüncü ülke ailesi.",
    accordions: [
      {
        title: "Üç aya kadar ve üç aydan fazla",
        paragraphs: [
          "AB/AEA vatandaşlarının geçerli kimlik veya pasaportla üç aya kadar başka ülkede ek şart olmadan kalabildiği; aile üyeleri için de ilgili kuralların bulunduğu yazılır.",
          "Üç aydan fazla için İsveç Yabancılar Yasası’na göre “ikamet hakkı” koşullarının sağlanması gerektiği; çalışan, iş arayan (gerçek iş bulma olasılığı), öğrenci (yeterli gelir beyanı ve kapsamlı sağlık sigortası) veya kendi geçimini ve sigortasını karşılayan kişi kategorilerinin sayıldığı belirtilir.",
          "Koşullar sağlanmazsa oturma izninin gerekli olduğu; AB/AEA vatandaşının aile üyesi olan üçüncü ülke vatandaşları için istisnaların bulunduğu ifade edilir.",
          "Nordik vatandaşlarının İsveç’te serbestçe yerleşebildiği ve oturma iznine ihtiyaç duymadığı yazılır.",
        ],
      },
      {
        title: "Personnummer ve samordningsnummer",
        paragraphs: [
          "Nüfus kaydına yazılanlara kişisel kimlik numarası (personnummer); kayıtlı olmayanlara koordinasyon numarası (samordningsnummer) verilebildiği; kimliğin çoğu zaman bizzat doğrulanması gerektiği belirtilir.",
          "En az bir yıl kalmak ve çalışmak planlanıyorsa Skatteverket’e taşınmanın bildirilmesi; kayıt onaylanırsa personnummer alındığı; bu numaranın birçok kamu ve özel işlemde gerekli olduğu ifade edilir.",
        ],
      },
      {
        title: "Varış öncesi ve sonrası kontrol listesi",
        paragraphs: [
          "İsveç’e gelmeden okul, sosyal sigorta, konut vb. konularda araştırma yapılması; İsveççe öğrenmenin iş bulmada sık gerektiği yazılır.",
          "Pasaport / kimlik, CV ve belgeler (tercihen İsveççe çeviri), aile durumu belgeleri, ikamet hakkını kanıtlayan evraklar; iş aramak için EURES ve Platsbanken gibi kanalların kullanılması belirtilir.",
          "Menşe ülkede işsizlik hakkı varsa U2 sertifikası ile sınırlı süre yerinde iş aramanın mümkün olabileceği; bu durumda İsveç’e varıştan sonra yedi gün içinde Arbetsförmedlingen’e kayıt olunması gerektiği ifade edilir.",
          "Varışta Skatteverket (nüfus kaydı / vergi mükellefi), gerektiğinde Migrationsverket (AB dışı aile üyesi), yardım talebi için Försäkringskassan başvurularının listelendiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "calisma-hukuku",
    tocLabel: "Çalışma hukuku",
    h2: "LAS, kolektif sözleşmeler ve istihdam türleri",
    lead: "Yasal çerçeve + toplu iş sözleşmesi; asgari ücret yasası yok.",
    accordions: [
      {
        title: "Sistem ve istihdam türleri",
        paragraphs: [
          "İş hukukunun genel çerçeve olduğu; işveren ve çalışan örgütlerinin kolektif sözleşmelerle ücret ve koşulları genişlettiği; çoğu zaman kolektif sözleşme şartlarının yasadan daha iyi ama asla daha kötü olamayacağı yazılır.",
          "Sendikaların piyasada güçlü konumda olduğu ve sektör koşulları hakkında bilgi verebildiği belirtilir.",
          "İstihdamın İş Koruması Yasası (LAS, 1982:80) ile düzenlendiği; süresiz veya belirli süreli pozisyonların atanma mektubunda açık olması gerektiği ifade edilir.",
          "Kanunun altı aya kadar deneme süresine izin verdiği; deneme süresinde objektif gerekçe olmadan sona erdirilebildiği; deneme bitiminde işe devam edilmezse pozisyonun kalıcı hale geldiği yazılır.",
          "İstihdam ofislerinin diğer işverenlerle aynı sözleşme türlerini kullandığı; yarı zamanlı çalışmanın özel bir rejim olmadığı ve ilke olarak tam zamanlı ile aynı hak ve yükümlülüklerin geçerli olduğu belirtilir.",
        ],
      },
      {
        title: "Mevsimlik iş",
        paragraphs: [
          "Mevsimlik işin tarım, ormancılık ve turizm gibi sektörlerde yaygın olduğu; LAS kapsamında normal istihdam sayıldığı; ayrıntıların sektör kolektif sözleşmelerinde olduğu yazılır.",
          "AB/AEA ve İsviçre dışı vatandaşların mevsimlik iş için oturma iznine; doksan günden uzun çalışmada hem oturma hem çalışma iznine ihtiyaç duyulabileceği; Migrationsverket sitesinde ayrıntı bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Sözleşme ve fesih",
        paragraphs: [
          "İş sözleşmesinin sözlü veya yazılı olabildiği; yazılı teyit istenmesinin önerildiği yazılır.",
          "Çalışanın talebi halinde işverenin bir ay içinde yazılı olarak işin yeri, görev, süreklilik, ihbar, ücret, çalışma saati, yıllık izin, kolektif sözleşme ve yurtdışında bir aydan fazla çalışma koşullarını bildirmesi gerektiği; değişikliklerde bir ay önceden haber verilmesi gerektiği belirtilir.",
          "Çalışanın istifa edebildiği ve ihbar süresinin genelde bir veya daha fazla ay olduğu; işverenin süresiz sözleşmeyi yalnızca objektif gerekçeyle (kişisel veya iş eksikliği) feshedebildiği; sendikadan yardım için üyelik şartı bulunduğu ifade edilir.",
          "Geçici sözleşmenin bitiş tarihinde kendiliğinden sona erdiği; ciddi kusurda derhal işten çıkarmanın mümkün olduğu; deneme süresinin karşılıklı on dört gün ihbarla veya süre dolunca sonlandırılabildiği yazılır.",
        ],
      },
      {
        title: "Özel gruplar ve serbest meslek",
        paragraphs: [
          "Engellilik gibi çeşitli zeminlerde ayrımcılığın yasaklandığı; Discrimination Ombudsman (DO) yetkisinin bulunduğu belirtilir.",
          "On altı yaşından önce iş sözleşmesi kurulamayacağı; zorunlu okul bitene kadar çalışılamayacağı; on üçten itibaren sağlık ve eğitimi bozmayan hafif işlerin mümkün olduğu ifade edilir.",
          "Kendi işini kurmak için Tillväxtverket, Almi, Verksamt.se ve belediye näringslivskontor kaynakta anılır.",
        ],
      },
    ],
  },
  {
    id: "ucret-calisma-izin",
    tocLabel: "Ücret, süre ve izinler",
    h2: "Bireysel ücret pazarlığı; yıllık ve ebeveyn izni",
    lead: "Haftada en fazla kırk saat; fazla mesai üst sınırları.",
    accordions: [
      {
        title: "Ücret ve vergi kesintisi",
        paragraphs: [
          "Yasal asgari ücret olmadığı; bazı kolektif sözleşmelerde asgari ücretin tanımlandığı yazılır.",
          "Kolektif anlaşmalı işlerde ücretin çoğu zaman saatlik ve anlaşmaya bağlı olduğu; geniş kesimde bireysel başlangıç maaşı pazarlığının beklendiği; sendika üyelerinin pazarlıkta yardım alabildiği belirtilir.",
          "İşverenin kaynakta gelir vergisi stopajı ve sosyal sigorta primlerini aylık ödediği; çalışanın brüt maaş ve kesintileri gösteren yazılı bordro alma hakkı bulunduğu ifade edilir.",
        ],
      },
      {
        title: "Çalışma süresi ve fazla mesai",
        paragraphs: [
          "Normal haftalık çalışmanın en fazla kırk saat olduğu yazılır.",
          "Fazla mesainin dört haftalık dönemde kırk sekiz veya bir ayda elli saatle sınırlanabildiği; on iki ayda toplam iki yüz saati aşmaması gerektiği belirtilir.",
          "Haftalık dinlenmenin hafta sonuna planlanması gerektiği; vardiya, perakende, turizm ve kamu hizmetleri gibi birçok istisnanın bulunduğu; çoğu kolektif sözleşmede çalışma saatine özel kurallar olduğu ifade edilir.",
        ],
      },
      {
        title: "Yıllık izin, ebeveyn izni ve resmî tatiller",
        paragraphs: [
          "Her çalışanın yılda en az yirmi beş iş günü (beş hafta) ücretli izin hakkı bulunduğu; anlaşmalarla daha fazla gün verilebildiği; yeni çalışanlara iznin peşin verilebildiği yazılır.",
          "Haziran–Ağustos arasında en az dört hafta kesintisiz izin hakkının bulunduğu (anlaşma ile değişebileceği); hastalık ve ebeveyn iznindeyken de yıllık izin hakkının sürdüğü belirtilir.",
          "Ebeveynlerin çocuk on iki yaşına veya ilkokul beşinci sınıf bitene kadar ebeveyn izni alma hakkının bulunduğu; farklı kuralların 2014 öncesi doğumlarda geçerli olabildiği; işverene en az iki ay önceden bildirim; hamileliğin son altmış gününden itibaren iznin başlayabildiği ifade edilir.",
          "Diğer ebeveynin doğumda on gün ücretli izin hakkı; çocuk hastalığında geçici ebeveyn yardımı ile izin; kamu tatilleri listesinde Yılbaşı, Epifani, Büyük Cuma, Paskalya Pazartesi, 1 Mayıs, İsa’nın Göğe Çıkışı, 6 Haziran Ulusal Gün, Orta Yaz, Tüm Azizler, Noel ve İkinci Gün’ün sayıldığı yazılır.",
        ],
      },
      {
        title: "Emeklilik ve işsizlik",
        paragraphs: [
          "Sabit emeklilik yaşı olmadığı; altmış beş yaşında emekliliğin yaygın olduğu; altmış üçten itibaren emeklilik maaşı çekilebildiği; altmış dokuzu aşan çalışanın objektif gerekçe olmadan işten çıkarılabildiği belirtilir.",
          "İşsizlik tazminatı için İsveç’te belirli süre çalışılmış olması ve işsizlik sigorta fonuna üyelik gerektiği; üye değilse çok sınırlı ödeme yapıldığı; Arbetsförmedlingen’e iş arayan kaydı ve aktif arama şartının bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendikalar ve toplu iş uyuşmazlığı",
    h2: "LO, TCO, SACO ve endüstriyel barış",
    lead: "Üyelik oranı yüksek; anlaşmalı işyerlerinde grev yasağı.",
    accordions: [
      {
        title: "Yapı ve roller",
        paragraphs: [
          "Sendika üyeliğinin geleneksel olarak çok yüksek olduğu; kadın ve erkek oranlarının birbirine yakın olduğu yazılır.",
          "Sendikaların bilgilendirme ve müzakere konusunda geniş yetkileri bulunduğu; ücret ve diğer koşulların görüşüldüğü; yardım için üyelik gerektiği belirtilir.",
          "LO (mavi yaka), TCO (beyaz yaka) ve SACO (yükseköğrenimli) merkez örgütleri ve bunlara bağlı sektör sendikalarının iletişim noktası olduğu ifade edilir.",
        ],
      },
      {
        title: "Grev ve toplu anlaşma",
        paragraphs: [
          "Pazarlık kültürünün sosyal taraflar arasında kolektif anlaşmalarla yürüdüğü; yasaların asgari standart olduğu; kolektif anlaşma imzalamış işveren ile çalışan arasında endüstriyel barış yükümlülüğü bulunduğu ve bu durumda grev ve lokavtın yasak olduğu yazılır.",
          "Anlaşma yoksa toplu iş eylemine başvurulabildiği; uluslararası karşılaştırmalarda İsveç’te uyuşmazlık düzeyinin düşük olduğu belirtilir.",
          "Sendikaya üye olma veya yasal grevde bulunma nedeniyle cezalandırılamayacağı; hukuki süreçlerde sendikanın üyelerine destek verebildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-gelir",
    tocLabel: "Gelir ve vergi",
    h2: "Ortalama ücret, KDV ve SINK",
    lead: "2023 ortalama brüt; 2025 gelir vergisi eşikleri kaynakta.",
    accordions: [
      {
        title: "Ücret farkları",
        paragraphs: [
          "Tüm meslekler için iki bin yirmi üçte ortalama aylık brüt ücretin yaklaşık otuz dokuz bin dokuz yüz İsveç kronu olduğu; özel sektörün kamuya göre genelde daha yüksek ücret verdiğinin; mesleğe göre geniş yelpaze bulunduğu yazılır.",
          "En yüksek ortalama brütün bankacılık, finans ve sigortada; en düşükünün “diğer bakım personeli” grubunda olduğu kaynakta rakamlarla verilir.",
          "Kadınların ortalama olarak erkeklerin yüzde doksanı kadar kazandığı; farkın kısmen meslek, sektör, nitelik ve çalışma saatine dağıldığı belirtilir.",
        ],
      },
      {
        title: "Gelir vergisi, KDV ve SINK",
        paragraphs: [
          "Doğrudan vergilerde belediye ve devlet gelir vergisinin; dolaylılarda KDV ve alkollü / tütünlü ürün özel vergilerinin öne çıktığı yazılır.",
          "KDV’nin çoğu mal ve hizmette yüzde yirmi beş; gıdada yüzde on iki; yolcu taşımacılığında yüzde altı oranlarının bulunduğu belirtilir.",
          "Doğal kişilerin yıllık geliri belirli eşiğin (kaynakta iki bin yirmi beş için yirmi dört bin sekiz yüz yetmiş üç SEK) altındaysa gelir vergisinin alınmadığı; vergilenebilir gelir yılda altı yüz yirmi beş bin sekiz yüz SEK’yi aştığında fazlasına yüzde yirmi devlet gelir vergisi uygulandığı ifade edilir.",
          "Sosyal sigorta primlerinin işveren katkısıyla ödendiği ve maaştan ek kesinti olmadığı; işsizlik, hastalık ve emeklilik gelirlerinden de gelir vergisi alındığı yazılır.",
          "Yıllık beyanın genelde yaklaşık iki Mayıs civarında Skatteverket’e verildiği; yurtdışında oturup İsveç’te altı aydan az kalanların istihdam gelirinde yüzde yirmi beş kesintiyle SINK (özel gelir vergisi) uygulanabildiği ve bu durumda beyan gerekmeyebileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-konut-saglik",
    tocLabel: "Yaşam, konut ve sağlık",
    h2: "Kira, bostadsrätt ve bölgesel hasta ücreti",
    lead: "Konsumentverket; 1177 ve yıllık üst tavanlar.",
    accordions: [
      {
        title: "Yaşam maliyeti (tek kişi)",
        paragraphs: [
          "Swedbank hesaplamasına göre tek kişi için konut kirası hariç aylık temel yaşam maliyetinin iki bin yirmi beşte yaklaşık on üç bin doksan SEK olduğu; tatil, gözlük, bilgisayar gibi kalemlerin dışarıda bırakıldığı yazılır.",
          "Tüketici hakları ve bütçe için Konsumentverket sitesinin anıldığı belirtilir.",
        ],
      },
      {
        title: "Kiralama ve bostadsrätt",
        paragraphs: [
          "Kiralık daire bulmanın belediyeden belediyeye çok değiştiği; kentsel alanlarda kiralık oranın düşük ve kiraların ülke ortalamasının üzerinde olduğu yazılır.",
          "Yetmiş metrekarelik daire için iki bin yirmi beşte ortalama kira rakamının Hyresgästföreningen kaynağında verildiği; beyaz eşya, ısıtma ve suyun çoğu zaman kiraya dahil olduğu belirtilir.",
          "Müstakil ev ortalama satış fiyatı ile Stockholm’un ulusal ortalamadan yaklaşık yüzde altmış daha yüksek olduğu; bostadsrätt (kooperatif daire) metrekare fiyatının ve büyük şehirlerdeki sapmanın kaynakta rakamlarla anıldığı ifade edilir.",
          "Konut kredisi faizinin vergiden düşülebildiği yazılır.",
        ],
      },
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "İsveç’te oturan herkesin ulusal sağlık sigortası kapsamında olduğu; sağlık hizmetlerinin bölge / il belediyeleri ve belediyeler tarafından yürütüldüğü; diş yardımlarının Försäkringskassan üzerinden yönetildiği yazılır.",
          "Doktor ve hastane masraflarının büyük ölçüde karşılandığı; muayene için hasta ücreti alındığı; iki bin yirmi üçte yüz ila dört yüz SEK aralığı ve ayakta tedavi için yıllık üst tavanın kaynakta verildiği belirtilir.",
          "Özel hekimlerin tümünün bölge ile anlaşmalı olmayabileceği; anlaşmasız ziyaretin çok daha pahalı olabileceği ifade edilir.",
          "Reçeteli ilaçlarda indirim ve yıllık üst tavan; on sekiz yaş altı reçeteli ilaçların ücretsiz olduğu; acil durumda 112’nin ülke genelinde geçerli olduğu yazılır.",
        ],
      },
      {
        title: "Eğitim özeti",
        paragraphs: [
          "On yıl zorunlu ilkokul ve isteğe bağlı üç yıl üst ortaöğretim yapısı; çoğu öğrencinin üst ortaöğretime devam ettiği belirtilir.",
          "Üniversitelerin çoğunun devlet işletmesi olduğu; AB/AEA ve İsviçre vatandaşları için ders ücreti alınmadığı (kayıt ücreti ve kitap maliyeti hariç); CSN ile burs ve kredi imkânının bulunduğu yazılır.",
          "Yetişkin eğitiminde SFI (yabancılar için İsveççe) ve meslekî yolların mümkün olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "kultur-ulasim-devlet",
    tocLabel: "Kültür, ulaşım ve devlet",
    h2: "Riksdag, allemansrätten ve trängselskatt",
    lead: "Düz hiyerarşi ve “du” kültürü; toplu taşımada indirim kartları.",
    accordions: [
      {
        title: "Siyasi sistem",
        paragraphs: [
          "İsveç’in anayasal monarşi ve parlamentar hükümet olduğu; kraliçe / kralın başlıca temsil işlevi gördüğü; gücün Riksdag ve hükümette olduğu yazılır.",
          "Riksdag’ın dört yılda bir doğrudan seçildiği; iki bin yirmi iki–yirmi altı döneminde sekiz partinin parlamentoda oturduğu; seçmen katılımının iki bin yirmi iki seçiminde yaklaşık yüzde seksen dört olduğu belirtilir.",
          "Hükümetin Riksdag tarafından seçilen başbakan öncülüğünde kurulduğu; dört temel yasadan (Rejim Şartı, Basın Özgürlüğü, İfade Özgürlüğü, Veraset) bahsedildiği ifade edilir.",
        ],
      },
      {
        title: "Günlük yaşam ve kültür",
        paragraphs: [
          "Geleneksel olarak Hristiyan kökenli bayramların ve mevsim geleneklerinin önemli olduğu; bugün daha çok laik bir toplum olarak tanımlandığı yazılır.",
          "allemansrätten ile orman ve araziye erişim kültürünün vurgulandığı; futbol, hokey, kayak, golf gibi sporların popüler olduğu belirtilir.",
          "İşyerlerinde genelde düz hiyerarşi, sorumluluk ve inisiyatif beklentisi ve “du” ile isimle hitabın yönetim–çalışan ilişkisini de etkilediği ifade edilir.",
          "Cinsiyet eşitliği çabasının toplumda önemli bir yer tuttuğu yazılır.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Yolların iyi olduğu; hava, tren ve otobüs ağının genişlediği; çoğu bölgede otobüs veya trenle ulaşımın mümkün olduğu yazılır.",
          "Stockholm ve Göteborg’da trängselskatt (sıkışıklık ücreti) uygulandığı; Öresund ve Svinesund köprüleri gibi ücretli geçitlerin bulunduğu belirtilir.",
          "Trenlerin tekerlekli sandalye erişimine uygun olabildiği; bilet fiyatının satın alma zamanı ve mesafeye göre değiştiği; internetten erken alımın çoğu zaman daha ucuz olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "mesleki-egitim-ab",
    tocLabel: "Meslekî eğitim ve AB çerçevesi",
    h2: "Diploma tanınması, Europass ve EQF",
    lead: "Eurofound kalite ölçütleri; Erasmus+ ve Cedefop atfı.",
    accordions: [
      {
        title: "Niteliklerin şeffaflığı",
        paragraphs: [
          "AB’de meslekî niteliklerin karşılıklı tanınması ihtiyacının düzenlenmiş meslekler ve düzenlenmemiş meslekler ayrımıyla ele alındığı; Europass araç seti ve Avrupa Nitelikler Çerçevesi’nin (EQF) anıldığı yazılır.",
          "Eurofound’un iş ve istihdam kalitesi ölçütleri (sağlık, iş–yaşam dengesi, beceri gelişimi) ve Komisyonun iş sağlığı ve güvenliği stratejilerinin kaynakta özetlendiği belirtilir.",
        ],
      },
      {
        title: "Programlar",
        paragraphs: [
          "Erasmus+ ve meslekî mükemmeliyet merkezleri (CoVE) ile yetişkin öğrenmesi ve ömür boyu öğrenme politikalarının AB gündeminde olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı ve destek",
    h2: "Arbetsförmedlingen, lönebidrag ve SIUS",
    lead: "İşe uyarlama ve Samhall korumalı istihdam.",
    accordions: [
      {
        title: "Tanım ve değerlendirme",
        paragraphs: [
          "İstihdam alanında engelliliğin Arbetsförmedlingen tarafından iş kapasitesinin fonksiyonel kaybına bağlı azalması olarak tanımlandığı; özel programlara erişimi belirlediği yazılır.",
          "Tek bir “engelli sertifikası” otoritesi olmadığı; tıbbi değerlendirme, Försäkringskassan değerlendirmesi ve iş gücü piyasası değerlendirmesinin farklı amaçlarla kullanılabildiği belirtilir.",
        ],
      },
      {
        title: "İşveren destekleri",
        paragraphs: [
          "Üç tür lönebidrag (gelişim, istihdam, istihdam güvenliği), yardımcı teknoloji alımına kadar destek, kişisel yardım maliyetleri ve SIUS danışmanlarının en az bir yıl iş başı eğitim ve izleme sunduğu yazılır.",
          "İş kapasitesi ciddi şekilde kısıtlı kişiler için kamu veya Samhall gibi korumalı istihdam seçeneklerinden bahsedildiği ifade edilir.",
        ],
      },
      {
        title: "Çalışan ve günlük yaşam",
        paragraphs: [
          "Kişiye uygun iş eşleştirme, ücret destekleri, işyeri uyarlama ve kişisel yardım kombinasyonlarının mümkün olduğu yazılır.",
          "Färdtjänst gibi indirimli veya özel ulaşım başvurularının bölgeye göre değiştiği; erişilebilir konut ve şehir programlarına atıf yapıldığı belirtilir.",
        ],
      },
    ],
  },
];
