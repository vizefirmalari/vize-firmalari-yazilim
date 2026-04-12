import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Czechia” (08/05/2025, İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const CEKYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Çekya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama için düzenlenmiş bir özetidir. EURES ve Çek İş Kurumu (Úřad práce) veri tabanları; lisanslı özel istihdam büroları ve ücretsiz aracılık; jobs.cz, profesia.cz gibi portallar; Çekçe CV ve örtük iş başvurusu kültürü; yasal çerçevesi henüz tamamlanmamış staj (sözleşme ile 50–300 saat, bir–dört ay); Almanya/Avusturya tarzı çift sistem yerine okul merkezli IVET ve učňovská příprava ile işyeri anlaşmaları ve gelir vergisi indirimleri; Sreality ve Bezrealitky ile konut; AB vatandaşları için otuz günden uzun kalışta isteğe bağlı kayıt ve üç aydan uzun sürelerde geçici ikamet belgesi; üçüncü ülkeler için yabancı polis kaydı ve OAMP; DPP/DPČ yan sözleşmeleri; İş Kanunu (262/2006) yazılı sözleşme ve üç zorunlu unsuru; 2025 asgari ücret CZK 20 800/ay ve CZK 124,40/saat; bordro zorunluluğu ve çalışan kesintileri; uzaktan çalışma; yıllık izin ve doğum–ebeveyn–babalık izinleri; asgari %4 engelli istihdam kotası; koruna (CZK) ve KDV oranları başlıklarında kamu bilgisine dayanır.",
  "Ücretler, kur ve idari süreçler güncellenebilir. Doğrulama için mpsv.cz, uradprace.cz, mvcr.cz/cizinci, portal.gov.cz ve financnisprava.gov.cz kaynaklarını kullanın. Bu metin hukuki veya mali danışmanlık yerine geçmez.",
];

export const CEKYA_SEO_KEYWORD_TAGS: string[] = [
  "çekya vize",
  "çekya schengen",
  "Úřad práce Czechia",
  "jobs.cz",
  "OAMP Czechia residence",
  "Çekya asgari ücret 2025",
  "DPP DPČ Czechia",
];

export const CEKYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "is-bulma-eures",
    tocLabel: "İş bulma",
    h2: "EURES, Úřad práce ve özel bürolar",
    lead: "İş aracılığı ücretli olamaz; lisanslı ajans listesi Çalışma Bakanlığı’ndadır.",
    accordions: [
      {
        title: "Resmî ve uluslararası kanallar",
        paragraphs: [
          "EURES üzerinden Çek İş Kurumu verilerine erişilebildiği ve My EURES hesabı açılabildiği yazılır.",
          "Çalışma ve Sosyal İşler Bakanlığı sitesindeki Çek EURES bağlantısıyla diğer AB/EEA ve İsviçre işverenlerinin ilanlarına filtreyle bakılabildiği belirtilir.",
          "Úřad práce’ün boş kadro veri tabanı, meslek seçimi danışmanlığı ve yeniden eğitim bilgisi sunduğu ifade edilir.",
        ],
      },
      {
        title: "Özel ajans, medya ve doğrudan başvuru",
        paragraphs: [
          "Özel istihdam ajansının Çalışma Bakanlığı portalındaki lisans listesinde yer aldığının kontrol edilmesi gerektiği; ajansların hizmet ücreti alamayacağı yazılır.",
          "jobs.cz, jenprace.cz, prace.cz, pracezarohem.cz ve profesia.cz gibi sitelerin yanı sıra gazete ilanları ve sosyal ağların kullanıldığı belirtilir.",
          "Kırsal mevsimlik veya günlük işlerde işverenle yüz yüze görüşmenin CV’den daha etkili olabildiği; çoğu işverenin aktif Çekçe istediği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "basvuru-cv",
    tocLabel: "Başvuru",
    h2: "Yapılandırılmış CV, ön yazı ve seçme",
    lead: "Büyük şirketler bazen ön yazı yerine önceden basılı anket kullanır.",
    accordions: [
      {
        title: "CV ve ön yazı",
        paragraphs: [
          "Kişisel veriler, eğitim, iş deneyimi, diller, bilgisayar, ehliyet ve kurslar ile referansların yapılandırılmış CV’de toplanması gerektiği yazılır.",
          "Ön yazının kısa ve ilana odaklı olması; başvuru gerekçesi ve katkının net anlatılması beklendiği belirtilir.",
          "Dil tercihini önceden işverenden sormak mümkün olduğu ifade edilir.",
        ],
      },
      {
        title: "Seçme ve mülakat",
        paragraphs: [
          "Mülakatta CV ve belge suretlerinin portfolyo olarak götürülmesi; Çekya’da seçme ortamının resmî kabul gördüğü ve uygun giyimin önemli olduğu yazılır.",
          "Bazı durumlarda psikolojik test uygulanabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "staj-cerceve",
    tocLabel: "Staj",
    h2: "Ulusal yasal tanım yok; sözleşme ve mentor",
    lead: "Çekya’da kalıcı ikameti olan diğer AEA uyrukluları da başvurabilir.",
    accordions: [
      {
        title: "Uygulama ve süre",
        paragraphs: [
          "Resmî “staj” tanımı veya ulusal çerçeve yasasının bulunmadığı; özel şirketlerde yönetim, mühendislik, inşaat veya hizmet alanlarında düzenlendiği yazılır.",
          "Başvurunun yalnızca ilgili eğitim alanıyla örtüşen alanlarda yapılabildiği; onaylı şirketlerde bir–dört ay veya yaklaşık 50–300 saat sürdüğü belirtilir.",
          "Sonunda başarıların belgelendiği sertifika verildiği ifade edilir.",
        ],
      },
      {
        title: "İlan ve kalite",
        paragraphs: [
          "mladiinfo.cz bağlantıları ve arama motorlarıyla fırsat aranabildiği; birleşik ilan platformu olmadığı yazılır.",
          "Staj sözleşmesinin asgari eğitim içeriği standartları koyduğu; özel mevzuatın hazırlandığı belirtilir.",
        ],
      },
    ],
  },
  {
    id: "mesleki-egitim-ivet",
    tocLabel: "Meslekî eğitim (IVET)",
    h2: "Okul ağırlıklı sistem ve işyeri pratiği",
    lead: "Almanya tarzı çift sözleşme yok; pratik öğretim okul–işyeri anlaşmasıyla yürür.",
    accordions: [
      {
        title: "Okul Yasası ve pratik payı",
        paragraphs: [
          "Dokuz yıl zorunlu öğretimden sonra çoğu öğrencinin on beş yaşında meslek eğitimine başladığı yazılır.",
          "Teorik ve pratik bileşenin birlikte olduğu; pratiğin okul atölyesi veya gerçek işyerinde yapılabildiği belirtilir.",
          "Çıraklık sertifikasına (ISCED 353) giden üç yıllık programlarda genel eğitimin yaklaşık %30, pratik öğretimin en az %36–46 aralığında olduğu ifade edilir.",
          "Haftalık döngülerde bir hafta okul bir hafta işyeri modelinin yaygın olduğu yazılır.",
        ],
      },
      {
        title: "Maturita programları ve vergi teşvikleri",
        paragraphs: [
          "Maturita sınavlı dört yıllık meslek liselerinde (ISCED 354) pratik payının programa göre %3–37 arasında değiştiği; çerçeve programa göre asgari dört haftalık staj ve çoğu programda altı–sekiz haftalık bloklar olduğu belirtilir.",
          "Gelir Vergisi Kanunu’na (586/1992) 1 Ocak 2014’ten itibaren işyeri anlaşmalarıyla verilen burs ve saatlik pratik indirimleri ile eğitim varlığı amortisman ek indirimlerinin tanındığı ifade edilir.",
        ],
      },
      {
        title: "Ücret ve burslar",
        paragraphs: [
          "Gelir getiren üretken faaliyetlerde öğrenciye ödenen ücretin asgari ücretin en az %30’u olması gerektiği yazılır.",
          "Bölgesel otoritelerin çekicilik için burs verebildiği; üç yıllık program boyunca toplamda yaklaşık EUR 1 000 düzeyinde destek örneklerinin anıldığı belirtilir.",
          "Kamu IVET’in ücretsiz olduğu; diğer AEA uyrukluları için MSMT ile iletişim önerildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "konut-kira",
    tocLabel: "Konut",
    h2: "Sreality, depozito ve dolandırıcılık riski",
    lead: "Prag ve Brno’da talep yüksek; stüdyo kira bandı metinde örneklendirilir.",
    accordions: [
      {
        title: "Arama ve maliyet",
        paragraphs: [
          "Sreality.cz, Bezrealitky.cz ve Reality.iDNES.cz gibi portalların; ajans, gazete ve sosyal medya gruplarının kullanıldığı yazılır.",
          "Prag’da stüdyo kirasının yaklaşık CZK 18 000–22 000/ay; Ostrava ve Ústí nad Labem gibi bölgelerde kabaca yarı fiyat seviyelerine inebildiği belirtilir.",
          "Bir–üç aylık depozito standardının yaygın olduğu; satın almada hukuki inceleme ve daha uzun süreç gerektiği ifade edilir.",
        ],
      },
      {
        title: "Güvenlik",
        paragraphs: [
          "Tapu sicilinde mülk sahibi kontrolü, sahte ilanlara dikkat ve sözleşme olmadan ön ödeme göndermeme uyarılarının yapıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "okul-basvuru",
    tocLabel: "Okul bulma",
    h2: "Belediye kayıtları ve lise uzmanlığı",
    lead: "Anaokulu ve ilkokulda ikamet alanı hakkı vardır.",
    accordions: [
      {
        title: "Kaynaklar",
        paragraphs: [
          "Belediye sitelerinin yerel anaokulu ve okulları listelediği; ortaokul sonrası için Infoabsolvent.cz ve Atlasskolstvi.cz kullanılabildiği yazılır.",
          "Üniversite program özetinin vysokeskoly.cz üzerinden aranabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "ikamet-police-oamp",
    tocLabel: "İkamet ve kayıt",
    h2: "AB isteğe bağlı kayıt; üçüncü ülkeler ve OAMP",
    lead: "AB vatandaşları otuz günden uzun kalışta kayıt isteğe bağlıdır; üç aydan fazla için geçici ikamet belgesi alınabilir.",
    accordions: [
      {
        title: "AB ve üçüncü ülkeler",
        paragraphs: [
          "Üçüncü ülke vatandaşlarının barındıran üç iş günü içinde yabancılar polisine kayıt yaptırması veya konaklama sağlayıcısının bunu yapması gerektiği yazılır.",
          "Doksan günden uzun kalışta uzun süreli ikamet veya doksan günden uzun vize için başvurunun çoğunlukla yurtdışındaki Çek elçiliğinde veya OAMP şubelerinde yapılabildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "varis-checklist",
    tocLabel: "Varış kontrol listesi",
    h2: "Belgeler, EHIC, banka ve nostrifikasyon",
    lead: "CZK ≈ EUR 22–26 bandı; her yerde kart kabulü yoktur.",
    accordions: [
      {
        title: "Öncelikli adımlar",
        paragraphs: [
          "Pasaport, kimlik, doğum ve diploma belgelerinin Çekçe yeminli çeviri ve tasdikle hazırlanmasının önerildiği yazılır.",
          "AB vatandaşları için EHIC; çalışmaya başlamadan ticari sağlık sigortasının mantıklı olduğu; üçüncü ülkeler için zorunlu özel sağlık sigortası (ör. PVZP, AXA) gerekebildiği belirtilir.",
          "Bazı bankalarda (Air Bank, ČSOB, Moneta) varış öncesi hesap açılışı mümkün olduğu; varışta pasaport ve ikinci kimlik gerektiği ifade edilir.",
          "Üçüncü ülke vatandaşlarının çalışma iznine, AB’lilerin ise izne ihtiyaç duymadığı yazılır.",
          "Diploma nostrifikasyonu için narodnikvalifikace.cz ve Çekçe kurs için cestina-pro-cizince.cz atıfları yapılır.",
        ],
      },
    ],
  },
  {
    id: "istihdam-tipleri",
    tocLabel: "İstihdam türleri",
    h2: "DPP, DPČ ve uzaktan çalışma",
    lead: "DPP’de aynı işverende yılda en fazla 300 saat sınırı vardır.",
    accordions: [
      {
        title: "Sözleşme çeşitleri",
        paragraphs: [
          "On beş yaş ve zorunlu okul bitişi sonrası çalışmanın genel kural olduğu; sanat veya hafif mevsimlik işlerde on beş altı için sıkı istisnalar bulunduğu yazılır.",
          "Belirsiz süreli, süreli, yarı zamanlı ve öğrenci–ebeveyn için yaygın parça zamanlı düzenlemelerin bulunduğu belirtilir.",
          "İş kapsamı dışı iş görme (DPP) ve iş faaliyeti (DPČ) anlaşmalarının yan iş ve geçici işlerde çok kullanıldığı; yabancıların saat sınırları, kayıt ve sigorta yükümlülüklerini takip etmesi gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "sozlesme-fesih",
    tocLabel: "İş sözleşmesi ve fesih",
    h2: "İş Kanunu maddesi 34 ve yazılı fesih",
    lead: "Üç temel unsur olmadan sözleşme geçersizdir; sözlü sözleşme yasal olsa da işveren yazılı zorunluluğa uymalıdır.",
    accordions: [
      {
        title: "Zorunlu unsurlar ve değişiklik",
        paragraphs: [
          "Sözleşmede işin türü, işyeri yeri (birden fazla olabilir) ve işe başlama gününün bulunması gerektiği; bunların olmaması halinde sözleşmenin geçersiz olduğu yazılır.",
          "Esaslı değişikliklerin yazılı ve çift taraflı mutabakat gerektirdiği; işverenin tek taraflı esas değiştiremeyeceği belirtilir.",
        ],
      },
      {
        title: "Fesih yolları",
        paragraphs: [
          "Anlaşmalı fesih, ihbar (genelde iki ay ve takip eden ayın ilk gününde başlar), ciddi ihlalde derhal fesih, deneme süresinde gerekçesiz fesih ve süreli sözleşmenin bitişi seçeneklerinin bulunduğu yazılır.",
          "İşverenin yalnızca kanunda sayılan gerekçelerle ihbarda bulunabildiği; tüm fesihlerin yazılı olması ve karşı tarafa örnek verilmesi gerektiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "ucret-calisma-izin",
    tocLabel: "Ücret, çalışma süresi ve izin",
    h2: "2025 asgari ücret, bordro ve uzaktan çalışma",
    lead: "Haftada kırk saat tam zamanlı norm; fazla mesai yılda 150 saate kadar zorunlu.",
    accordions: [
      {
        title: "Asgari ücret ve bordro",
        paragraphs: [
          "1 Ocak–31 Aralık 2025 için kırk saatlik haftada aylık asgari ücretin CZK 20 800 ve saatlik ücretin CZK 124,40 olduğu; kolektif sözleşmeye göre farklılık olabildiği yazılır.",
          "Çalışandan genel olarak sosyal sigorta %6,5, sağlık %4,5 ve gelir vergisi %15 kesildiği; işverenin bu tutanları ödeyip bordro düzenlemek zorunda olduğu belirtilir.",
        ],
      },
      {
        title: "Çalışma süresi, fazla mesai ve uzaktan",
        paragraphs: [
          "Günlük normal en fazla sekiz saat; haftalık kırk saat (bazı sektörlerde 37,5 veya 38,75 saat) olduğu yazılır.",
          "Altı saati aşan vardiyada en az otuz dakika yemek molası; vardiyalar arası en az on bir saat dinlenme olduğu belirtilir.",
          "Haftada en fazla sekiz saat ve yılda 150 saat zorunlu fazla mesai; ücretine %25 ek veya telafi izni verilebildiği ifade edilir.",
          "Gece 22.00–06.00; uzaktan çalışanın işyerindeki çalışanla aynı haklara sahip olduğu ve çalışma süresinin bireysel sözleşme ve iç yönetmelikle uyumlu olması gerektiği yazılır.",
        ],
      },
      {
        title: "Yıllık izin ve aile",
        paragraphs: [
          "Tam zamanlıda takvim yılı başına dört hafta (yirmi iş günü) izin; altmış iş günü sonrası tam hak; kısmi çalışmada oransal olduğu yazılır.",
          "Doğum izninin yirmi sekiz hafta (çoğul doğumda otuz yedi hafta) olduğu; son iki yılda en az iki yüz yetmiş gün çalışmış annenin doğum ödeneği alabildiği belirtilir.",
          "Ebeveyn izninin doğum izninden sonra dört yaşına kadar uzayabildiği; işverenin üç yaşına kadar vermek zorunda olduğu ifade edilir.",
          "Babaya veya kayıtlı ebeveyne on dört günlük babalık izni verildiği yazılır.",
        ],
      },
    ],
  },
  {
    id: "sendika-grev",
    tocLabel: "Sendika ve anlaşmazlık",
    h2: "CMKOS, iş müfettişliği ve uyarı grevi",
    lead: "Sendika üyeliği düşük; çoğunlukla sektör bazlı örgütlenir.",
    accordions: [
      {
        title: "Temsil ve grev",
        paragraphs: [
          "Sendika yoksa işyeri konseyi veya iş güvenliği temsilcisinin danışma rolü oynayabildiği yazılır.",
          "İşçi talepleri davalarda çözülür; bölge iş müfettişliğine başvurulabildiği belirtilir.",
          "Grevlerin çoğunlukla kısa uyarı niteliğinde olduğu; grev süresince ücret ödenmediği ve yasadışı ilan edilirse sonuç riski bulunduğu ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "vergi-maliyet",
    tocLabel: "Vergi ve yaşam maliyeti",
    h2: "Gelir dilimi, KDV ve günlük harcama",
    lead: "Yıllık yaklaşık CZK 1,58 milyon üstü gelirde vergi oranı %23’e çıkar.",
    accordions: [
      {
        title: "Gelir vergisi ve KDV",
        paragraphs: [
          "İstihdam gelirinde yaklaşık CZK 1,58 milyon/yıl eşiğine kadar %15, üzerinde %23 oranının geçerli olduğu yazılır.",
          "İşverenin sosyal ve sağlık sigortası için ek prim ödediği belirtilir.",
          "KDV’nin standart %21; gıda, konaklama ve bazı hizmetlerde %12 indirimli oran olduğu; eğitim ve sağlık gibi alanlarda muafiyetler bulunduğu ifade edilir.",
        ],
      },
      {
        title: "2025 gösterge fiyatları",
        paragraphs: [
          "Ekmek, süt, yumurta, tavuk, pizza ve benzin litre fiyatı gibi Q1 2025 örnek aralıklarının metinde verildiği; tipik hanehalkı elektrik ve internet giderlerinin anıldığı yazılır.",
        ],
      },
    ],
  },
  {
    id: "saglik-sistem",
    tocLabel: "Sağlık sistemi",
    h2: "Pratisyen hekim, 155 ve gece acil ücreti",
    lead: "Zorunlu kamu sigortası yerleşikler ve ülkede işvereni bulunanlar içindir.",
    accordions: [
      {
        title: "Bakım ve sigorta",
        paragraphs: [
          "Anlaşmalı birinci basamak doktor seçiminin önemli olduğu; gerektiğinde uzmana yönlendirme yapılabildiği yazılır.",
          "Mesai dışı acil serviste CZK 90 düzenleyici ücret alındığı belirtilir.",
          "AB içinde tek ülkede sigortalı olunması gerektiği; gönderi (S1 vb.) ile başka ülkeden atanın menşe ülkede sigortalı kaldığı ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "egitim-kultur-ulasim",
    tocLabel: "Eğitim, kültür ve ulaşım",
    h2: "MSMT, edálnice ve Prag havalimanı",
    lead: "Kamuda Çekçe öğretim genelde ücretsizdir; son okul öncesi yıl zorunludur.",
    accordions: [
      {
        title: "Eğitim özeti",
        paragraphs: [
          "Üç–altı yaş arası okul öncesi ve dokuz yıl zorunlu temel öğretimin bulunduğu; maturita ve çıraklık sertifikası yollarının ayrıldığı yazılır.",
        ],
      },
      {
        title: "Kültür ve ulaşım",
        paragraphs: [
          "Kaleler, milli parklar ve kaplıca geleneğinin güçlü olduğu; Prag’da otuz dakikalık biletin yaklaşık CZK 30 olduğu belirtilir.",
          "2025 için bir günlükten yıllığa kadar elektronik otoyol vignette fiyatlarının CZK 210–2 440 aralığında verildiği; üç buçuk ton altı binek araçlar için zorunlu olduğu; elektrik ve hidrojenli araç muafiyetinin anıldığı ifade edilir.",
          "idos.cz sefer sorgusu ve PRG havalimanına atıf yapılır.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yüzde 4 kota ve ÚP ČR destekleri",
    lead: "Yirmi beşten fazla çalışanı olan işverenler kota veya alternatif yükümlülüklerle bağlanır.",
    accordions: [
      {
        title: "Haklar ve başvuru",
        paragraphs: [
          "ÇSSZ’nin emeklilik, İş Kurumu’nun engelli kartı ve istihdam desteği kararlarında rol oynadığı yazılır.",
          "Ücret sübvansiyonu, işyeri uyarlama ve vergi indirimlerinin bölgesel ÚP şubelerinden başvurulabildiği belirtilir.",
          "ZTP/ZTP/P kartı ile tren indirimleri ve rehber köpek düzenlemelerine atıf yapılır.",
          "Ücretsiz danışma hattı 800 77 99 00 ve callcentrum@uradprace.cz bilgisinin verildiği ifade edilir.",
        ],
      },
    ],
  },
];
