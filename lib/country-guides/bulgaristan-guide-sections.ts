import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Bulgaria” (05/03/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const BULGARISTAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Bulgaristan’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. İstihdam Ajansı ile 106 yerel iş bürosu kaydı; Göç Müdürlüğünden adres belgesi veya kısa süreli kalışta barındıran beyanı / otel kartı; jobs.bg, karieri.bg, zaplata.bg gibi özel portallar ve EURES iş ilanları; İş Kanunu’ndaki staj (traineeship) sözleşmesi (6–12 ay, mentor, ücret asgari ücretin altına inemez); kamu idaresinde ücretsiz öğrenci stajı (staj.government.bg; güncel yönetmelikte 5–20 iş günü); Kariyer Başlangıcı ve Genç İstihdamı+ (Youth Employment+); işyerinde eğitim ve meslek edinme sözleşmeleri; AB/EEA için üç ay kimlikle kalış ve uzun süreli ikamet izni; çalışma izni gerekmemesi; yazılı iş sözleşmesi zorunluluğu, altı aya kadar deneme süresi ve tarımda günlük mevsimlik sözleşme (114a); 1 Ocak 2025 itibarıyla aylık asgari ücret BGN 1 077 ve saatlik BGN 6,49; gelir vergisinde doğal kişiler için %10 düz oran örneği; uzaktan çalışma; yıllık izin ve doğum izni süreleri; 2025 emeklilik yaşı örnekleri; NZOK katkı payları; eğitimde dört yaşından itibaren zorunlu okul öncesi; engelli kotası ve Engelliler Ajansı başlıklarında kamu bilgisine dayanır.",
  "Kur ve ücretler güncellenebilir; EUR 1 ≈ BGN 1,95583 (metindeki sabit) resmî kurla değişir. Doğrulama için az.government.bg, mvr.bg, nap.bg, nhif.bg ve mon.bg kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const BULGARISTAN_SEO_KEYWORD_TAGS: string[] = [
  "bulgaristan vize",
  "bulgaristan schengen",
  "Employment Agency Bulgaria AZ",
  "jobs.bg Bulgaria",
  "LNCh Bulgaria GP registration",
  "Bulgaristan asgari ücret 2025",
  "İş Kanunu Bulgaristan Labour Code",
];

export const BULGARISTAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-ajans",
    tocLabel: "İş bulma",
    h2: "İstihdam Ajansı, 106 iş bürosu ve özel portallar",
    lead: "Bulgaristan’da kayıtlı aracılık ücretsizdir; adres kanıtı ve diploma çevirisi önemlidir.",
    accordions: [
      {
        title: "Resmî kanallar ve kayıt",
        paragraphs: [
          "İş arayanların EURES portalı ile İstihdam Ajansı sitesindeki Elektronik Kariyer Günleri bölümünü kullanabildiği; yaklaşan kariyer etkinlikleri hakkında ajans sitesinden bilgi alınabildiği yazılır.",
          "Bulgaristan’a geldikten sonra AB/EEA ve İsviçre vatandaşlarının kimlik belgesi, standart başvuru formu ve İçişleri bölge müdürlüğü yerel polisindeki Göç Müdürlüğünden alınan ikamet adresi belgesiyle 106 yerel iş bürosuna kayıt olabildiği belirtilir.",
          "Üç aydan kısa süreli kalışta adresin, barındıran kişinin yazılı beyanı veya adresli otel kartı ile de kanıtlanabildiği; eğitim, iş tecrübesi ve meslek ruhsatı belgelerinin çıkış ülkesinde tasdik gerektirebildiği ifade edilir.",
          "Danışmanlık ve aracılık hizmetlerinin kayıtlı iş arayanlara sunulduğu; +359 2 980 87 19 bilgi hattı ve az.government.bg adresinin referans verildiği yazılır.",
          "Kaydın yeminli posta operatörü veya güvenli elektronik teslimat ile de yapılabildiği; yasal özel ve geçici iş ajanslarının ajans sitesinde listelendiği (yalnızca Bulgarca) belirtilir.",
        ],
      },
      {
        title: "Özel portallar ve EURES danışmanları",
        paragraphs: [
          "jobs.bg, karieri.bg, zaplata.bg, jobtiger.bg ve rabota.bg gibi portalların yaygın kullanıldığı; özellikle IT ve dış kaynak (BPO) şirketlerinin kendi sitelerinde ilan verdiği yazılır.",
          "Bulgar EURES danışmanlarının İngilizce, Almanca, İspanyolca veya Fransızca bilgi verebildiği; iş aracılık hizmetlerinin Bulgar hukukuna göre ücretsiz olduğu belirtilir.",
          "EURES portalındaki Bulgaristan ilanlarında başvurunun çoğunlukla ilandaki e-postaya doğrudan gönderildiği; iş bürosuna kayıtlı adayların büro ilanı için işverene götürülecek referans mektubu alabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-europass",
    tocLabel: "Başvuru",
    h2: "Europass CV, ön yazı ve tasdikli çeviri",
    lead: "Belgeler önceden hazırlanmalı; onay sonrası ek evrak istenebilir.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "İyi bir CV hazırlanması ve Europass formatının önerildiği; çoğu işverenin ilgi göstermek için kısa ön yazı istediği yazılır.",
          "İlk değerlendirmeden sonra ek bilgi ve belge talep edilebildiği; eğitim ve yeterlilik belgelerinin ile önceki işveren referanslarının düzgün çevrilmiş ve tasdik edilmiş olmasının faydalı olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj-genclik",
    tocLabel: "Staj (traineeship)",
    h2: "İş Kanunu staj sözleşmesi, Career Start ve kamu stajı",
    lead: "Resmî tanım 29 yaşa kadar, meslekte tecrübesiz mezunları kapsar; ücret asgari ücretin altına inemez.",
    accordions: [
      {
        title: "İş Kanunu kapsamındaki staj",
        paragraphs: [
          "Stajın, işveren veya mentor gözetiminde meslek veya branşta pratik beceri kazanmak için yapılan iş performansı olduğu; 29 yaşına kadar, orta veya yükseköğretim mezunu ve ilgili alanda iş tecrübesi olmayanlarla sözleşme kurulabildiği yazılır.",
          "Sözleşmenin edinilen yeterliliğe uygun pozisyonda, mentor adı ve görevi, en az altı en fazla on iki ay süre ve diğer çalışma koşullarını içermesi gerektiği belirtilir.",
          "Aynı kişiyle aynı işverende yalnızca bir kez staj sözleşmesi yapılabildiği; süre sonunda kalacaksa standart iş sözleşmesine geçilmesi gerektiği ifade edilir.",
          "Staj süresince İş Kanunu’na göre ücret ödendiği ve bunun ülke asgari ücretinin altında olamayacağı; devlet destekli yerleştirmelerde ücretin önleme/programa göre belirlendiği yazılır.",
        ],
      },
      {
        title: "Kamu idaresi ve özel yaz stajları",
        paragraphs: [
          "Kamu idaresinde ücretsiz öğrenci stajına ilişkin yönetmelikte staj süresinin beş ile yirmi iş günü arasında olduğu, ücret ödenmediği ve her stajyer için mentor ve bireysel plan bulunduğu belirtilir (Aralık 2023 güncellemesi sonrası metin).",
          "Özel şirketlerdeki kısa yaz dönemi pratiklerinin çoğu zaman ücretsiz ve öğrenci odaklı olduğu; tekliflerin dağınık olduğu ve tek havuz kurumu olmadığı ifade edilir.",
          "Kariyer Başlangıcı (Career Start) programında kamu idarelerinin, iş bürosuna kayıtlı gençleri on iki aylık iş sözleşmesi ve maaşla işe alabildiği yazılır.",
          "İnsan Kaynakları Geliştirme Programı ve Genç İstihdamı+ (Youth Employment+) ile desteklenen önlemlerin ajans ve esf.bg üzerinden duyurulduğu belirtilir.",
          "Üniversite öğrencilerinin kamu stajı başvurularının merkezî olarak toplandığı çevrimiçi platformun staj.government.bg olduğu ifade edilir.",
        ],
      },
      {
        title: "Uygunluk ve dil",
        paragraphs: [
          "Koşulları sağlayan AB/EEA ve İsviçre vatandaşlarının Bulgar işvereniyle staj iş sözleşmesi yapabildiği; neredeyse her durumda Bulgarca yeterliliğinin beklendiği yazılır.",
          "Yabancı ülkede alınan diplomanın yasal Bulgarca çevirisiyle ibraz edilmesi gerektiği; ikamet adresinin belediye tarafından verilen güncel (geçici) adres belgesiyle kanıtlanması gerektiği belirtilir.",
        ],
      },
      {
        title: "Sosyal sigorta ve NAP bildirimi",
        paragraphs: [
          "Staj iş sözleşmesinin standart iş sözleşmesiyle aynı hukuki etkiye sahip olduğu; asgari ücrete göre maaş, prim ve vergi yükümlülükleri bulunduğu; işverenin sözleşmeyi Ulusal Gelir İdaresi’ne (NAP) üç gün içinde bildirmesi ve feshte yedi gün içinde haber vermesi gerektiği yazılır.",
          "Kamu idaresindeki ücretsiz üniversite stajının hizmet süresi veya prim süresi olarak sayılmadığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ise-yerinde-egitim",
    tocLabel: "İşyerinde eğitim",
    h2: "Meslek kazanma ve ikili meslek eğitimi",
    lead: "İşyeri eğitimi süresi genelde altı ayı aşmaz; ücret asgari ücretin en az %90’ıdır.",
    accordions: [
      {
        title: "İşyerinde eğitim ve meslek edinme sözleşmesi",
        paragraphs: [
          "İşverenin çalışanı belirli meslekte iş başında yetiştirmeyi, çalışanın da gerekli bilgi ve becerileri öğrenmeyi üstlendiği sözleşme türlerinin İş Kanunu’nda düzenlendiği yazılır.",
          "Meslek edinmek üzere eğitim kurumuna kabul edilen kişiyle yapılan sözleşmede işverenin geçim ve eğitim sonrası belirlenen sürede (en fazla altı yıl) istihdam yükümlülüğü bulunabildiği belirtilir.",
          "İşyeri eğitiminde sürenin altı ayı aşmaması; Mesleki Eğitim Yasası’na göre ikili düzenlemelerde müfredata bağlı istisna olduğu; eğitim bitiminden sonra işverende çalışma taahhüdünün üç yılı geçemeyeceği ifade edilir.",
          "Eğitim sırasında ücretin yapılan işe bağlı olduğu ve asgari ücretin en az yüzde doksanından az olamayacağı; ikili sistemdeki öğrencilerin tüm eğitim süresince ücret aldığı yazılır.",
        ],
      },
      {
        title: "Uygunluk ve ilan yerleri",
        paragraphs: [
          "AB/EEA ve İsviçre gençlerinin ulusal önlemlere ve İKG Programı projelerine katılımında hukuki engel olmadığı; iş bürosu kaydı ve adres belgesi şartlarının stajla aynı olduğu belirtilir.",
          "Üniversite kariyer merkezleri, staj.government.bg ve özel iş sitelerinin yanı sıra yerel iş büroları ve az.government.bg üzerinden destekli ilanların bulunabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-kira",
    tocLabel: "Konut",
    h2: "Kira ve satın alma — şehir farkları",
    lead: "Sofya ve büyük sahil şehirlerde kira ve metrekare fiyatları küçük kasabalara göre çok daha yüksektir.",
    accordions: [
      {
        title: "Kiralama",
        paragraphs: [
          "Eşyalı, yarı eşyalı veya boş daire ile ev sahibi yanında oda kiralama seçeneklerinin bulunduğu yazılır.",
          "Metinde verilen örnek aralıklarda iki yatak odalı daire kira bedellerinin Sofya’da yaklaşık EUR 533, Varna’da EUR 362, Plovdiv’de EUR 319, Burgas’ta EUR 317 civarında listelenebildiği; metrekare başına kira örneklerinin Sofya’da EUR 9–10 bandında olduğu belirtilir.",
          "Kiranın çoğunlukla nakit veya banka havalesi ile ayın belirli gününde ödendiği; su, elektrik ve ısınmanın çoğu zaman kiraya dahil olmadığı ifade edilir.",
        ],
      },
      {
        title: "Satın alma ve aracılık",
        paragraphs: [
          "Alım satımda kimlik, mülkiyet ve rehin durumu belgelerinin noter önünde işlemle tapu dosyasına işlendiği yazılır.",
          "İki yatak odalı daire metrekare alım fiyatı örneklerinin Sofya’da yaklaşık EUR 1 758, Varna’da EUR 1 323, Plovdiv’de EUR 1 166, Burgas’ta EUR 1 249 gibi listelenebildiği belirtilir.",
          "Ulusal Emlakçılar Birliği sitesi ve ajans ücreti uygulamalarına atıf yapılır.",
        ],
      },
    ],
  },
  {
    id: "ab-ikamet-goç",
    tocLabel: "AB ikameti ve göç",
    h2: "Göç Müdürlüğü ve uzun süreli izin",
    lead: "AB vatandaşları üç ay kimlikle kalır; sonrasında uzun süreli ikamet izni için belge seti gerekir.",
    accordions: [
      {
        title: "İçişleri ve izin türleri",
        paragraphs: [
          "Göç Müdürlüğünün AB vatandaşları ve aile üyelerine yönelik hizmetleri AB vatandaşlarının ve ailelerinin Bulgaristan’a giriş, kalış ve çıkışı kanununa tabi yürüttüğü yazılır.",
          "Geçerli kimlik veya pasaportla üç aya kadar kalınabildiği; daha uzun süre için çalışan, serbest meslek, öğrenci veya aile üyesi kategorilerine göre belge ve şartların yerine getirilmesi gerektiği belirtilir.",
          "Beş yıl kesintisiz yasal uzun süreli ikamet sonrası sürekli ikamet başvurusu yapılabildiği ifade edilir.",
          "AB/EEA ve İsviçre vatandaşlarının çalışma iznine ihtiyaç duymadığı; +359 (2) 982 4808 ve migration@mvr.bg iletişim bilgilerinin verildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış kontrol listesi",
    h2: "Lev, EHIC, işsiz kaydı ve aile hekimi",
    lead: "Bulgaristan henüz euro alanında değildir; banka ve konaklama önceden planlanmalıdır.",
    accordions: [
      {
        title: "Para, konut ve okul",
        paragraphs: [
          "Para biriminin lev (BGN) olduğu ve EUR 1 = BGN 1,95583 sabitinin metinde referans alındığı; dövizin banka ve döviz bürolarında değiştirilebildiği yazılır.",
          "Çocukların Bulgar okuluna girmesi için gerekli belgelerin varıştan önce kontrol edilmesi gerektiği belirtilir.",
          "Evcil hayvan için BFSA web sitesine atıf yapılır.",
        ],
      },
      {
        title: "İş arayan ve sağlık",
        paragraphs: [
          "İş sözleşmesi olmadan gelenlerin yerleşim kayıtlı oldukları yerdeki iş bürosuna elektronik, şahsen veya posta ile kayıt olabildiği yazılır.",
          "Tıbbi acil durumlarda EHIC’nin ücretsiz veya uygun maliyetle yardım için önemli olduğu; acil merkezlerin (EMC) rolü belirtilir.",
          "Bölge pratisyen hekimi seçmek için Göç Müdürlüğünden yabancı kimlik numarası (LNCh) alınıp Ulusal Sağlık Sigortası Fonu’ndan (NZOK) form doldurulması gerektiği ifade edilir.",
          "Serbest meslek ve zanaatkarların NAP, BULSTAT ve ilgili oda kayıtlarını kontrol etmesi gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "istihdam-sozlesme",
    tocLabel: "İstihdam ve sözleşme",
    h2: "Yaş sınırı, deneme süresi ve mevsimlik tarım",
    lead: "Yazılı iş sözleşmesi zorunludur; asıl işe ek sözleşmelerde toplam süre sınırları vardır.",
    accordions: [
      {
        title: "Genel kurallar",
        paragraphs: [
          "Çalışmak için asgari yaşın on altı olduğu; on beş–on altı yaş arası istisnai hafif işler için ek şartlar bulunduğu yazılır.",
          "On sekiz yaş altı için işe başlamadan sağlık raporu ve her vaka için İş Müfettişliği belgesi gerektiği belirtilir.",
          "Belirsiz veya süreli sözleşme, tam veya yarı zamanlı çalışma ve en fazla altı aylık deneme süresi düzenlendiği; denemede işverenin ihbar öncesi fesih hakkı olduğu ifade edilir.",
          "Uzaktan veya evden ürün/hizmet üretimine ilişkin maddelerin sözleşmede yer alabildiği; geçici iş işletmesiyle de sözleşme kurulabildiği yazılır.",
          "Tam iş gününün sekiz saat ve haftanın kırk saat olduğu; vardiya ve gece çalışmasının mümkün olduğu belirtilir.",
        ],
      },
      {
        title: "Ek iş ve mevsimlik tarım",
        paragraphs: [
          "Asıl iş dışında ek sözleşmelerde toplam çalışma süresinin haftada kırk sekiz saati geçemeyeceği; on sekiz yaş altında kırk saat üst sınırı olduğu yazılır.",
          "On sekiz yaş üstü için kırk sekiz saati aşmanın yazılı rıza ile mümkün olduğu belirtilir.",
          "İş Kanunu’nun 114a maddesi kapsamında tarımda günlük mevsimlik sözleşmenin takvim yılında doksan güne kadar, ücretin iş günü sonunda makbuz karşılığı ödenebildiği ve İş Müfettişliği onay şablonuna tabi olduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih-detay",
    tocLabel: "Sözleşme detayı ve fesih",
    h2: "NAP bildirimi, ihbar ve disiplin",
    lead: "Süreli sözleşme süresi dolunca uzarsa ve işveren itiraz etmezse belirsiz süreye dönüşebilir.",
    accordions: [
      {
        title: "Sözleşme içeriği ve değişiklik",
        paragraphs: [
          "Sözleşmenin işe başlamadan yazılı olarak kurulması ve işyeri, unvan, işin niteliği, başlangıç ve süre, ücret ve çalışma süresi gibi unsurları içermesi gerektiği yazılır.",
          "İşverenin NAP bölge müdürlüğüne bildirim ve çalışana imzalı sözleşme ile NAP bildirim suretinin üç gün içinde verilmesi zorunluluğu belirtilir.",
          "Süreli sözleşmenin süresi bittikten sonra beş veya daha fazla gün çalışmanın devamı halinde, işveren yazılı itiraz etmediyse ve pozisyon devam ediyorsa belirsiz süreli sayılabildiği ifade edilir.",
          "Çalışma şartlarındaki değişikliklerin etkin olmasından itibaren bir ay içinde yazılı bildirilmesi gerektiği yazılır.",
        ],
      },
      {
        title: "Fesih ve ihbar",
        paragraphs: [
          "Deneme süresinde, lehine olan tarafın ihbar öncesi fesih hakkı bulunduğu; süre bitiminde sözleşmenin tamamlandığı varsayımıyla devam edildiği belirtilir.",
          "Belirsiz süreli sözleşmelerde genel ihbarın otuz gün, süreli sözleşmelerde üç ay olduğu; ihbar süresinin kalan sözleşme süresini aşamayacağı ifade edilir.",
          "Karşılıklı anlaşma, işin bitmesi, vekalet edenin dönmesi gibi hallerde ihbarsız fesih örnekleri yazılır.",
          "Disiplin nedenleriyle derhal fesih için İş Kanunu madde 190’da örnek ihlaller listelendiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-vergi",
    tocLabel: "Ücret ve vergi",
    h2: "2025 asgari ücret, düz gelir vergisi ve örnek net",
    lead: "Doğal kişi gelir vergisi genelde %10; brüt örnekte kesintiler yaklaşık olarak hesaplanır.",
    accordions: [
      {
        title: "Asgari ücret ve eşit ücret",
        paragraphs: [
          "1 Ocak 2025’ten itibaren aylık asgari ücretin BGN 1 077 ve saatlik asgari ücretin BGN 6,49 olduğu; tam iş gününün sekiz saat ve haftanın beş iş günü olduğu yazılır.",
          "Sosyal sigorta tabanlarının ana ekonomik faaliyet ve meslek grupları için ayrı ayrı belirlendiği; Ulusal Sosyal Güvenlik Enstitüsü (NOİ) tablolarına bakılması gerektiği belirtilir.",
          "Brüt maaştan kesintiler sonrası kalan matrahın yüzde onunun gelir vergisi olarak ödendiği; örnek olarak brüt BGN 2 000’in kabaca EUR 1 000’e denk geldiği ve netin yaklaşık BGN 1 550 olabildiği ifade edilir.",
          "Gece ve fazla mesai için sözleşmede Bakanlar Kurulu alt sınırlarından düşük olmayan oranların uygulandığı; resmî tatilde yüzde yüzden az olmayan zam yazılır.",
        ],
      },
      {
        title: "Yerel ve yabancı vergi mükellefi",
        paragraphs: [
          "Yerel doğal kişinin kalıcı ikamet veya on iki ayda yüz seksen üç günden fazla bulunma veya hayati menfaat merkezinin Bulgaristan’da olmasıyla tanımlandığı yazılır.",
          "Yerel mükelleflerin yurt içi ve yurt dışı gelirinden, yabancıların yalnızca Bulgaristan kaynaklı gelirden vergilendirildiği belirtilir.",
          "Bulgaristan’da yapılan iş veya hizmet gelirinin Bulgaristan kaynağı sayıldığı ifade edilir.",
        ],
      },
      {
        title: "Kurumlar ve KDV",
        paragraphs: [
          "Tüzel kişilerde kurumlar vergisinin yüzde on olduğu; esnaf ve şahıs şirketlerinde vergilendirmenin farklı hesaplanabildiği yazılır.",
          "KDV’nin standart oranının yüzde yirmi; otel konaklaması (organize seyahat parçası), kitap ve bebek ürünleri gibi kalemlerde yüzde dokuz indirimli oran bulunduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-uzaktan",
    tocLabel: "Çalışma süresi ve uzaktan çalışma",
    h2: "Haftalık kırk saat, toplu uzatma ve uzaktan iş",
    lead: "Uzaktan çalışanda işyerindeki çalışanla aynı iş örgütlenmesi ve iş sağlığı ilkeleri geçerlidir.",
    accordions: [
      {
        title: "Süre, fazla mesai ve dinlenme",
        paragraphs: [
          "Normal haftalık sürenin kırk saati geçemeyeceği; günlük sekiz saat üst sınırının yazılı emirle belli günlerde on saate çıkarılıp diğer günlerde telafi edilebildiği; yılda altmış güne kadar uzatma uygulanabildiği yazılır.",
          "Fazla çalışmada günlük on iki saatlik ve haftalık kırk sekiz saatlik dinlenme sürelerinin korunması gerektiği belirtilir.",
          "Vardiya düzeninin iç yönetmelikle belirlendiği; toplu hesaplamada vardiyanın on iki saati, haftanın ellis altı saati geçemeyeceği ifade edilir.",
          "Gece çalışmasının çoğunlukla 22.00–06.00 arası tanımlandığı; on altı yaş altı için 20.00–06.00 olduğu yazılır.",
          "Yemek arasının en az otuz dakika, günler arası kesintisiz dinlenmenin on iki saat ve beş günlük haftada haftalık dinlenmenin en az kırk sekiz saat (toplama rejiminde en az otuz altı saat) olduğu belirtilir.",
        ],
      },
      {
        title: "Uzaktan çalışma",
        paragraphs: [
          "Uzaktan çalışmanın bilgi teknolojisi ile işveren yerleşkesinden taşınan iş örgütlenmesi olduğu; çalışanın ev veya seçtiği dış mekânda belirli bir çalışma alanı göstermesi gerektiği yazılır.",
          "Uzaktan çalışanın işyerindeki meslektaşıyla aynı iş örgütlenmesi ve iş sağlığı haklarına sahip olduğu; çalışma süresinin bireysel sözleşme, toplu sözleşme ve iç yönetmelikle uyumlu olması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "izin-annelik",
    tocLabel: "İzinler",
    h2: "Yıllık izin, hastalık ve doğum",
    lead: "Asgari yıllık ücretli izin yirmi iş günüdür; resmî tatil listesi genişletilmiştir.",
    accordions: [
      {
        title: "Yıllık izin ve resmî tatiller",
        paragraphs: [
          "Her çalışanın en az yirmi iş günü ücretli yıllık izne hak kıldığı; toplu sözleşmelerle artırılabildiği yazılır.",
          "İlk işinde dört ay çalışmadan izin kullanılamayacağı; sözleşme erken biterse kullanılmayan izin için tazminat ödenebildiği belirtilir.",
          "On sekiz yaş altı ve yedi yaşından küçük çocuğu olan annelerin yazın izin kullanımının önceliklendirildiği ifade edilir.",
          "Yılbaşı, Ulusal Kurtuluş Günü, İşçi Bayramı, Aziz Yorgi ve Ordu Günü, Kiril–Metodiy ve alfabe günü, birleşme ve bağımsızlık günleri, Noel arifesi ve Noel günleri ile Paskalya tarihlerinin resmî tatil olarak sayıldığı; hafta sonuna denk gelenlerde telafi tatili uygulandığı yazılır.",
        ],
      },
      {
        title: "Hastalık, doğum ve ebeveyn",
        paragraphs: [
          "Sağlık otoritesi onaylı geçici iş göremezlik izinlerinde parasal tazminat haklarının bulunduğu belirtilir.",
          "Doğum izninin çocuk başına dört yüz on gün olduğu; doğumdan önce kırk beş günün zorunlu olduğu; evli veya aynı hanede yaşayan babanın hastane çıkışından itibaren on beş günlük izne hak kıldığı yazılır.",
          "Çocuk altı aylıktan sonra annenin rızasıyla babanın kalan süreyi kullanabildiği; ek ebeveyn izni ve öğrenci sınav izinleri gibi diğer türlerin İş Kanunu’nda düzenlendiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "fesih-emeklilik-giti",
    tocLabel: "Fesih, emeklilik ve denetim",
    h2: "2025 emeklilik yaşı ve Genel İş Müfettişliği",
    lead: "Emeklilik yaşı ve prim süreleri cinsiyet ve doğum yılına göre kademelidir.",
    accordions: [
      {
        title: "Emeklilik (2025 örneği)",
        paragraphs: [
          "Metinde belirtildiği üzere kadınların altmış iki yaş dört ay ve otuz altı yıl sekiz ay sigortalı çalışma ile, erkeklerin altmış dört yaş sekiz ay ve otuz dokuz yıl sekiz ay ile emekliliğe hak kazanabildiği; şartları sağlamayanların altmış yedi yaşında en az on beş yıllık sigortalı çalışma ile emekliliğe hak kılabildiği yazılır.",
          "NOİ sitesinde miras ve engelli emeklilikleri gibi diğer hallerin anlatıldığı belirtilir.",
        ],
      },
      {
        title: "Genel İş Müfettişliği (GIT)",
        paragraphs: [
          "Kurumun iş mevzuatına uyumu, iş sağlığı ve güvenliği ile istihdamın teşvik kanununa ilişkin denetim ve teknik danışmanlık verdiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve toplu iş uyuşmazlığı",
    h2: "KNSB, Podkrepa ve grev bildirimi",
    lead: "Sembolik grev işi durdurmaz; asıl grev en az yedi gün önceden yazılı bildirim ister.",
    accordions: [
      {
        title: "Örgütlenme ve grev",
        paragraphs: [
          "İşçilerin sendika kurma ve üyelik özgürlüğüne sahip olduğu; işyerinde temsilcilerin işverenle görüşme ve işyerlerine erişim hakkı bulunduğu yazılır.",
          "Ulusal düzeyde temsil için sendikaların Belirli kriterleri sağlaması ve Bakanlar Kurulu’ndan dört yıllık tanınma alması gerektiği; KNSB ve Podkrepa’nın yaygın konfederasyonlar olduğu belirtilir.",
          "Toplu iş uyuşmazlığında önce müzakere, ardından arabuluculuk ve gönüllü tahkim seçeneklerinin bulunduğu; talepler karşılanmazsa sembolik grev (iş durdurmadan protesto) ve son çare olarak iş durdurmalı grev yapılabildiği yazılır.",
          "Grev kararının çoğunlukla alındığı ve en az yedi gün önce süre ve liderlik organının yazılı bildirilmesi gerektiği; bir saati geçmeyen uyarı grevinin önceden haber gerektirmediği ifade edilir.",
          "Yasal grev süresince işverenin grevi engellemek için işletmeyi kapatamayacağı ve grevdeki işçilerin yerine aynı amaçla yeni işçi alamayacağı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "mesleki-egitim-navet",
    tocLabel: "Meslekî eğitim",
    h2: "NAVET, ikili sistem ve HRDC",
    lead: "Yetişkin meslek eğitimi lisanslı merkezlerde; ikili sistem okul ile işyerini birleştirir.",
    accordions: [
      {
        title: "Kurumsal çerçeve",
        paragraphs: [
          "Meslekî eğitimin hem formal hem informal yollarla sürdüğü; NAVET sitesinde onaylı meslek eğitim merkezleri kaydının bulunduğu yazılır.",
          "Yeni Mesleki Eğitim ve Öğretim Yasası ile ikili sistemin teoriyi okulda pratiği işyerinde birleştirdiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "yasam-maliyet-saglik",
    tocLabel: "Yaşam maliyeti ve sağlık",
    h2: "Hane geliri, NZOK katkı payı ve özel sektör",
    lead: "2024 son çeyrek hane başına brüt gelir örnekleri ile 2025 yakıt ve elektrik fiyatları metinde özetlenir.",
    accordions: [
      {
        title: "Tüketim ve gelir (NSI)",
        paragraphs: [
          "2024 dördüncü çeyrek verilerine göre hane başına ortalama brüt gelirin yaklaşık BGN 5 728, kişi başı aylık ortalamanın yaklaşık BGN 2 874 olduğu; ana gelir kaynağının ücret ve maaşlar olduğu yazılır.",
          "Gıda ve alkolsüz içecekler ile konut, su, elektrik ve yakıtın tüketimde büyük pay aldığı belirtilir.",
        ],
      },
      {
        title: "Ocak 2025 gösterge fiyatları",
        paragraphs: [
          "Benzin A95H ve motorin litre fiyatlarının metinde yaklaşık BGN 2,55 ve BGN 2,58 civarında verildiği; LPG’nin yaklaşık BGN 1,29 olduğu; elektrik gündüz/gece kWh fiyatlarının sırasıyla yaklaşık BGN 0,29 ve BGN 0,17 ve yıllık ortalama yaklaşık yüzde 8,5 artıştan söz edildiği yazılır.",
          "Gaz tüketicileri için MWh başına ortalama artışın yaklaşık yüzde sekiz ve fiyatın 157,62 BGN/MWh düzeyinde anıldığı belirtilir.",
        ],
      },
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Sağlık sisteminin Sağlık Bakanlığı tarafından yönetildiği; primlerin çoğu iş sözleşmeli çalışanda işveren tarafından kesildiği, serbest meslek sahiplerinin kendi ödediği yazılır.",
          "Sigortalıların NZOK ile sözleşmeli kurumlardan yararlanabildiği; aile hekimi ziyaretinde BGN 2,90, yatışta günde BGN 5,80 ve yılda en fazla on gün kullanıcı payı alındığı; çocuklar, hamileler ve muaf kategorilerin ücretlerden muaf tutulabildiği belirtilir.",
          "Sigortasızların hizmet ve tedavi bedelini tam ödediği; özel muayenehanelerde sigorta olsa bile ücretin doğrudan alındığı ifade edilir.",
          "Acil durumda 112 aranması gerektiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "egitim-kultur-ulasim",
    tocLabel: "Eğitim, kültür ve ulaşım",
    h2: "Zorunlu okul, ücretsiz devlet okulu ve ulaşım ağı",
    lead: "2023/24’ten itibaren dört yaşında zorunlu okul öncesi başlar; kamu kreş ve anaokullarında ücret kalkmıştır.",
    accordions: [
      {
        title: "Okul ve üniversite",
        paragraphs: [
          "Altı ile on altı yaş arası dokuz yıl zorunlu eğitimin bulunduğu; dört yaşından itibaren okul öncesi zorunluluğun 2023/24 öğretim yılından geçerli olduğu yazılır.",
          "Bulgaristan’da kazançlı çalışan AB/EEA ve İsviçre vatandaşlarının çocuklarının devlet okulunun ücretsiz olduğu belirtilir.",
          "Üniversiteye giriş sınavı ve taksitli harç yapısının bulunduğu; mon.bg ve ri.mon.bg kayıtlarına atıf yapılır.",
        ],
      },
      {
        title: "Kültür ve ulaşım",
        paragraphs: [
          "Rila Manastırı, Nesebar ve Kazanlak gibi UNESCO alanlarının turizm için önemli olduğu; kapalı alanlarda sigaranın tamamen yasaklandığı yazılır.",
          "Sofya metrosu ve toplu taşıma biletinin metinde BGN 1,60 olarak geçtiği; BDZ tren ve şehirlerarası otobüs sitelerine atıf yapıldığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Tanınma, kota ve Ajans",
    lead: "Yüzde elli ve üzeri engelde yıllık izin en az yirmi altı iş günüdür.",
    accordions: [
      {
        title: "Haklar ve işveren desteği",
        paragraphs: [
          "Engelli tanımının BM Engelli Hakları Sözleşmesi ile uyumlu olduğu; bölgesel veya ulusal tıbbi komisyon kararının resmî kanıt olduğu yazılır.",
          "Elli ve üzeri engelli çalışanların yıllık izninin en az yirmi altı iş günü olabildiği belirtilir.",
          "Elli ve üzeri çalışanı olan işverenlerin kota veya özel fona katkı yükümlülüğü bulunduğu; ücret sübvansiyonu, işyeri uyarlama ve vergi indirimlerinin mevcut olduğu ifade edilir.",
        ],
      },
      {
        title: "İletişim",
        paragraphs: [
          "Çalışma ve Sosyal Politika Bakanlığı, Engelliler Ajansı, İstihdam Ajansı ve ayrımcılığa karşı komisyonun başvuru noktaları olduğu yazılır.",
        ],
      },
    ],
  },
];
