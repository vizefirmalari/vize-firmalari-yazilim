import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

/** Kaynak: EURES “Living and working conditions: Germany” (İngilizce kamu metni) — Türkçe özet ve yapılandırma. */
export const ALMANYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bu sayfa, Avrupa İş Bulma Servisleri Ağı (EURES) kapsamında yayımlanan “Almanya’da yaşam ve çalışma koşulları” içeriğinin Türkçe, yapılandırılmış ve arama motorları için düzenlenmiş bir özetidir. Schengen kısa süreli seyahat kuralları ile Almanya’da çalışma, staj veya mesleki eğitim için gerekli ulusal izin ve vize süreçleri ayrı hukuki çerçevelere dayanır; kişisel durumunuza göre Federal Dışişleri, Federal İçişleri ve Göç, Federal İstihdam Ajansı ile eyalet göç idarelerinin güncel metinlerini birlikte değerlendirmeniz gerekir.",
  "Aşağıdaki rakamlar (örneğin asgari ücret, sosyal sigorta tavanları, eğitim ücreti) metinde açıkça belirtildiği şekilde kaynak sayfadaki döneme bağlıdır; yürürlük ve tutarlar zamanla güncellenir. Bu metin hukuki danışmanlık yerine geçmez.",
];

export const ALMANYA_SEO_KEYWORD_TAGS: string[] = [
  "almanya vize",
  "almanya çalışma izni",
  "schengen almanya",
  "almanya iş bulma",
  "make it in germany",
  "almanya oturum",
  "eures almanya",
];

export const ALMANYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "giris-ve-hukuki-cerceve",
    tocLabel: "Giriş ve hukuki çerçeve",
    h2: "AB vatandaşlığı, üçüncü ülkeler ve nitelikli göç",
    lead: "Serbest dolaşım, üçüncü ülke vatandaşları için oturum belgeleri ve 1 Kasım 2023’ten itibaren yürürlükte anılan Fachkräfteeinwanderungsgesetz 2.0 çerçevesine kısa giriş.",
    accordions: [
      {
        title: "AB / AEA / İsviçre vatandaşları",
        paragraphs: [
          "Kaynak metne göre, Avrupa Birliği üyesi ülkelerin vatandaşları iş izni kısıtlamasına tabi olmadan çalışan statüsünde serbest dolaşım hakkından yararlanır; Avrupa Ekonomik Alanı (AEA: İzlanda, Lihtenştayn, Norveç) ve İsviçre vatandaşları için de benzer çerçeve anlatılır.",
          "Başka bir AB üyesinde geçerli oturum kartına sahip aile üyeleri, metinde belirtildiği üzere belirli durumlarda Almanya’ya girişte vizeden muaf tutulabilir (2004/38/EC serbest dolaşım yönergesi bağlamında anlatım).",
        ],
      },
      {
        title: "Üçüncü ülke vatandaşları ve oturum belgeleri",
        paragraphs: [
          "AB, AEA veya İsviçre dışındaki ülkelerin vatandaşlarının Almanya’da istihdam amacıyla kalabilmesi için kaynakta vize, oturum izni, AB Mavi Kartı, yerleşim izni veya AB kalıcı oturumu gibi oturum belgelerinden en az birinin bulunması gerektiği belirtilir.",
          "Aile birleşimi ve ülkeye özel muafiyetler için Federal Yabancılar ve Göç Dairesi (BAMF) ile dış temsilciliklere başvurulması önerilir.",
        ],
      },
      {
        title: "Nitelikli Göç Yasası (Fachkräfteeinwanderungsgesetz 2.0) — öz",
        paragraphs: [
          "Metne göre kanun 1 Kasım 2023’ten itibaren yürürlüktedir ve üçüncü ülke vatandaşı nitelikli çalışanların Almanya iş gücü piyasasına erişimini genişletmeyi hedefler. Yabancı mesleki eğitimin tanınması halinde, metinde ifade edildiği gibi “darboğaz meslekleri” ile sınırlama kalkmış olup eşdeğer yeterlilik ve bağlayıcı iş teklifi oturum belgesi değerlendirmesinde belirleyicidir.",
          "Federal İstihdam Ajansı’nın (BA) istihdam koşullarının yerli çalışanlarla karşılaştırılabilirliğini incelemesi sürdürülür; metinde, öncelik kontrolünün (Vorrangprüfung) nitelikli meslekler için artık uygulanmadığı belirtilir.",
        ],
        bullets: [
          "Mesleki tanınma veya iş / eğitim yeri aramak için sınırlı süreli vize imkânından söz edilir.",
          "Hızlandırılmış nitelikli işçi sürecinde (accelerated skilled worker process) yerel göç idaresi onayı sonrasında, metinde belirtildiği gibi yabancı temsilcilikte randevu üç hafta ve vizenin bir sonraki üç hafta içinde verilmesi hedeflenir; işveren ek işlem ücreti olarak 411 EUR öder.",
        ],
      },
      {
        title: "Merkezi Hizmet: ZSBA",
        paragraphs: [
          "Federal İstihdam Ajansı bünyesindeki Zentrale Servicestelle Berufsanerkennung (ZSBA), Bonn’daki ZAV ile birlikte yürütülür ve yabancı uyruklulara mesleki tanınma süreci ile oturum konularında rehberlik ettiği, belge hazırlığında destek verdiği ve gerektiğinde eğitim yollarına yönlendirme yaptığı anlatılır.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Almanya’da iş arama kanalları",
    lead: "Federal hükümetin “Make it in Germany” portalı, Federal İstihdam Ajansı iş arama motoru, EURES ve spekülatif başvurular.",
    accordions: [
      {
        title: "Resmî portallar ve danışmanlık",
        paragraphs: [
          "Almanya’da çalışmak isteyenler için Federal Hükümet’in “Make it in Germany” (make-it-in-germany.com) sitesinde; yurtdışından gelen nitelikli işgücüne yönelik “Quick-Check” aracı, iş bulma rehberi ve Almanya’da yaşam bilgilerinin bulunduğu belirtilir. İçeriklerin Almanca yanı sıra İngilizce, İspanyolca, Fransızca ve en az on beş başka dilde sunulduğu ifade edilir.",
          "Federal İstihdam Ajansı’nın iş portalı (arbeitsagentur.de/jobsuche) hem Almanca hem İngilizce ilan içerdiği; EURES’ün EURES bölgesinden iş arayanlara yönelik ilanlar ve başvuran profili oluşturma imkânı sunduğu anlatılır.",
        ],
      },
      {
        title: "Diğer yöntemler",
        paragraphs: [
          "Şirketlerin günlük gazetelerde, özel iş sitelerinde ve kendi web sitelerinde ilan verdiği; LinkedIn, XING ve sektörel ağlarda profil yayınlayarak doğrudan işveren ilgisinin çekilebileceği belirtilir.",
          "Almanya’da “spekülatif başvuru” (iş ilanı olmadan özgeçmiş gönderme) yaygın bir yöntem olarak anlatılır. Özel istihdam büroları alternatif olabilir; ücretlendirme önceden sorulmalıdır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "Ön yazı, özgeçmiş ve dijital başvuru",
    lead: "Almanya’da yazılı başvurunun tipik bileşenleri ve e-posta ile tek PDF sınırı.",
    accordions: [
      {
        title: "Başvuru dosyası",
        paragraphs: [
          "Kaynak metne göre klasik başvuru; ön yazı, fotoğraflı özgeçmiş (CV), diploma ve iş tecrübesini gösteren belgelerin suretleri ve gerekiyorsa iş örneklerinden oluşur.",
          "Ön yazının tek yüz A4’ü geçmemesi; işi neden istediğiniz, ilanın size neden uyduğu ve Almanya’da çalışma gerekçenizin kısaca anlatılması; sonunda “Mit freundlichen Grüßen” ile kapanış ve mülakat daveti beklentisi ifade edilmesi önerilir.",
        ],
      },
      {
        title: "Özgeçmiş ve fotoğraf",
        paragraphs: [
          "Özgeçmişin tablo biçiminde, en fazla iki sayfa ve ters kronolojik (en güncel bilgi önce) olması; iletişim, iş geçmişi, okul ve mesleki eğitim, dil becerileri (ana dil / ileri / akıcı vb.), dijital beceriler ve gönüllülük gibi alanların ayrılması istenir.",
          "Özgeçmişin imzalanıp tarihlenmesi ve mümkünse Europass formatının (europass.europa.eu) kullanılması tavsiye edilir. Almanya’da başvuru fotoğrafının nötr fonla hâlâ yaygın olduğu belirtilir.",
        ],
      },
      {
        title: "E-posta ve çevrimiçi formlar",
        paragraphs: [
          "Giderek daha çok işverenin yalnızca e-posta veya şirket içi çevrimiçi form kabul ettiği; e-postada ön yazı, CV, belgeler ve fotoğrafın tek bir PDF’te toplanıp ek olarak gönderilmesinin iyi bir uygulama olduğu anlatılır.",
          "Dosya boyutunun 2 MB’ı aşmaması gerektiği açıkça yazılır. Çevrimiçi formda belgelerin ayrı PDF’ler olarak yüklenebileceği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar (traineeship)",
    h2: "Staj türleri, ücret ve sosyal güvenlik",
    lead: "Zorunlu ve gönüllü staj ayrımı; asgari ücret ve sigorta muafiyetleri kaynak metinde ayrıntılı anlatılır — burada özet çerçeve.",
    accordions: [
      {
        title: "Kimler için hangi kurallar?",
        paragraphs: [
          "AB ve AEA vatandaşlarının Almanya’da stajlara serbestçe erişebildiği; diğer ülkeler için stajın esasen istihdam sayılması nedeniyle özel kurallar bulunduğu ve Federal Dışişleri sitesinde çok dilli açıklamalar yer aldığı belirtilir.",
          "İletişim ve günlük yaşam için genelde en az temel düzeyde Almanca beklentisi olduğu ifade edilir.",
        ],
      },
      {
        title: "Asgari ücret ve staj sözleşmesi",
        paragraphs: [
          "16 Ağustos 2014’ten beri yürürlükte olan Asgari Ücret Yasası’na (Mindestlohngesetz) göre belirli istisnalar dışında ücretli stajların asgari ücrete tabi olduğu anlatılır.",
          "Üniversite veya mesleki eğitim yönetmeliği gereği zorunlu stajlarda öğrenci statüsünün korunduğu; staj sözleşmesinde süre, ücret, öğrenilecek görevler ve hedeflerin yazılması gerektiği belirtilir.",
        ],
        bullets: [
          "Zorunlu stajlar: çoğu durumda asgari ücret yasası dışında; ücret işveren takdirindedir.",
          "Zorunlu olmayan staj: üç aydan uzun sürerse asgari ücret uygulanır; üç aya kadar olan gönüllü stajlarda asgari ücret zorunluluğu olmayabilir.",
        ],
        callout: {
          variant: "warning",
          text: "Sosyal sigorta (sağlık, bakım, emeklilik, işsizlik) stajın türü, süresi ve ücrete göre değişir. Öğrenci statüsü ile yarı zamanlı sınırlar (örneğin haftada 20 saat) BAföG ve vergi muafiyetleriyle ilişkilidir; gelir eşiklerini aşmamak için kaynak metindeki rakamları güncel tablolarla doğrulayın.",
        },
      },
    ],
  },
  {
    id: "ciraklik-ve-mesleki-egitim",
    tocLabel: "Çıraklık (dual apprenticeship)",
    h2: "İkili mesleki eğitim (Berufsausbildung)",
    lead: "BBiG çerçevesinde işyeri + meslek okulu, süre, asgari çıraklık ücreti ve dil şartı.",
    accordions: [
      {
        title: "Dual sistem ve süre",
        paragraphs: [
          "İkili çıraklık genelde 2 ila 3,5 yıl sürer; eğitimin işyerinde pratik, meslek okulunda teorik bileşenlerden oluştuğu ve okul günlerinde işyerinde çalışılmadığı anlatılır.",
          "Eğitim şirketi ile çırak arasında çıraklık sözleşmesi yapılır; meslek okuluna kayıt ve devam zorunludur. Mesleklerin eyalet ve sosyal taraflarla sürekli güncellendiği vurgulanır.",
        ],
      },
      {
        title: "Asgari çıraklık ücreti (örnek yıllar)",
        paragraphs: [
          "BBiG ile 1 Ocak 2020 sonrası sözleşmeler için asgari çıraklık ücreti (Mindestausbildungsvergütung) getirildiği belirtilir. Metinde 2024’e başlayan çıraklar için birinci yıl en az 649 EUR; 2025’e başlayanlar için birinci yıl 682 EUR ve sonraki yıllar için yüzde 18 / 35 / 40 artışlı tablo verildiği ifade edilir.",
          "Toplu iş sözleşmesi uygulayan işletmelerde, taban ücretin toplu sözleşme çırak ücretinden yüksek olması halinde toplu sözleşme oranının geçebileceği not edilir.",
        ],
      },
      {
        title: "Dil ve vize",
        paragraphs: [
          "AB, Lihtenştayn, İzlanda, Norveç veya İsviçre vatandaşlarının mesleki eğitime vizesiz başlayabildiği; diğer ülkelerin vatandaşlarının Almanya’daki elçilikten vize alması gerektiği yazılır.",
          "Eğitime başlangıçta en az Ortak Avrupa Dili Çerçevesi (CEFR) B1 Almanca, tercihen B2; hemşirelik gibi alanlarda bazı eyaletlerin eğitim sonunda B2 isteyebileceği belirtilir.",
        ],
      },
      {
        title: "İlanlar ve mali destek",
        paragraphs: [
          "Çıraklık ilanlarının Federal İstihdam Ajansı portalında “Angebotsart” filtresiyle, IHK ve ZDH borsalarında ve şirket sitelerinde yayımlandığı anlatılır.",
          "Berufsausbildungsbeihilfe (BAB) ve assistierte Ausbildung (AsA) gibi desteklerin şartlara bağlı olduğu; 1 Ağustos 2019’dan itibaren yürürlükteki yasayla Almanya’da yaşayan yabancıların da BAB ve AsA’dan yararlanabildiği ifade edilir.",
        ],
      },
    ],
  },
  {
    id: "tasinma-ve-yasam",
    tocLabel: "Taşınma ve günlük yaşam",
    h2: "Konut, ikamet kaydı ve ulaşım",
    lead: "Konut piyasası belgeleri, kira depozitosu ve “Almanya’da ilk günler” pratikleri.",
    accordions: [
      {
        title: "Konut arama",
        paragraphs: [
          "Kaynakta genelde başvuru formu, kimlik, son üç maaş bordrosu, kira borcu olmadığına dair belge ve kredi notu (ör. SCHUFA) istendiği; mutfağın çoğu zaman boş kiralandığı uyarısının yapıldığı belirtilir.",
          "Kira depozitosunun çoğunlukla iki ila üç aylık net kira tutarında olduğu ve sözleşme sonunda itiraz yoksa iade edildiği anlatılır. Teslim tutanağı (handover log) ile önceki hasarların belgelenmesi önerilir.",
        ],
      },
      {
        title: "İkamet kaydı ve banka",
        paragraphs: [
          "Almanya’ya taşındıktan kısa süre sonra ikamet edilen belediyenin Einwohnermeldeamt / Bürgeramt’ında adres kaydı yapılması gerektiği; bazı şehirlerde randevuların çevrimiçi alınabildiği yazılır.",
          "Kalıcı adres olmadan banka hesabı açılamayacağı; enerji, telefon ve internet aboneliklerinin ayrı ayrı kurulması gerektiği belirtilir. Kamu yayıncısı katkı payı (Rundfunkbeitrag) ve kilise vergisi gibi Almanya’ya özgü kalemlerden söz edilir.",
        ],
      },
      {
        title: "Ulaşım",
        paragraphs: [
          "Deutschlandticket’in 1 Mayıs 2023’ten itibaren ülke genelinde yerel ve bölgesel toplu taşımayı (RE/RB dahil) sabit aylık ücretle kullanım imkânı sunduğu; abonelikle iptal edilebilir olduğu ve metinde belirtilen dönem için aylık 58 EUR olduğu yazılır (ücret güncellenebilir).",
        ],
      },
    ],
  },
  {
    id: "calisma-kosullari-ozet",
    tocLabel: "Çalışma koşulları (özet)",
    h2: "İstihdam biçimleri, ücret ve çalışma süresi",
    lead: "Kaynak metinde özetlenen asgari ücret, mini-job, kısmi süre ve bildirim süreleri.",
    accordions: [
      {
        title: "Asgari ücret ve mini-job (örnek tarih)",
        paragraphs: [
          "1 Ocak 2025 itibarıyla yasal brüt saatlik asgari ücretin 12,82 EUR olduğu belirtilir. “Mini-job” için genelde aylık 556 EUR’a kadar ücret sınırı ve yılda en fazla üç ay veya 70 iş günü kısa süreli istihdam seçeneğinden söz edilir.",
          "Mini-job’da sağlık, bakım ve işsizlik sigortasının genelde zorunlu olmadığı; emeklilik sigortasından muafiyetin talep edilebileceği; saatlik ücret asgari ücrete eşitlenirse ayda yaklaşık 43 saate kadar çalışılabileceği örneklenir.",
        ],
      },
      {
        title: "Çalışma süresi ve izin",
        paragraphs: [
          "Arbeitszeitgesetz kapsamında günlük çalışmanın genelde en fazla sekiz, en çok on saat olabildiği; altı saatten sonra en az 30 dakika, dokuz saatten sonra 45 dakika mola ve gün sonrası en az on bir saat dinlenme zorunluluğu olduğu özetlenir.",
          "Yıllık ücretli izin için federal kanunda asgari 24 iş günü; toplu sözleşmelerde çoğunlukla 30 iş günü olduğu belirtilir.",
        ],
      },
      {
        title: "İş sözleşmesi ve fesih",
        paragraphs: [
          "Süresiz sözleşmenin sözlü yapılabildiği; süreli sözleşmede bitiş tarihinin yazılı olmazsa süresiz sayılacağı; çıraklık sözleşmesinin yazılı şartına bağlı olduğu ifade edilir.",
          "Nachweisgesetz uyarınca yazılı sözleşme yoksa ana çalışma koşullarının işe başlamadan itibaren bir ay içinde yazılı olarak verilmesi gerektiği anlatılır.",
        ],
        bullets: [
          "Deneme süresinde iki haftalık kısa bildirim.",
          "Bürgerliches Gesetzbuch (BGB) §622’ye göre işveren bildirim sürelerinin hizmet süresine göre uzadığı (ör. iki yıl sonra bir ayla ay sonuna kadar) tabloda özetlenir.",
        ],
      },
    ],
  },
  {
    id: "yasam-saglik-egitim",
    tocLabel: "Yaşam: sağlık, eğitim, vergi",
    h2: "Sosyal güvenlik ve günlük yaşam maliyeti",
        lead: "Kaynak metindeki sağlık sigortası, eğitim yapısı ve hanehalkı harcama dağılımına kısa giriş.",
    accordions: [
      {
        title: "Sağlık sigortası",
        paragraphs: [
          "Çalışanların iş sözleşmesiyle birlikte yasal sağlık sigortasına (GKV) girmesi gerektiği; primlerin brüt maaşa göre işveren ve çalışan arasında paylaşıldığı ve tavan tutarlarının (Beitragsbemessungsgrenze) yıllık güncellendiği belirtilir.",
          "2025 için örnek olarak sağlık ve bakım sigortası tavanının aylık 5.512,50 EUR; emeklilik ve işsizlik için aylık 8.050 EUR (yıllık 96.600 EUR) olduğu metinde yazılıdır.",
          "Acil tıbbi yardım için 112; mesai dışı hekim için 116117 numaralarının kullanılabileceği ifade edilir.",
        ],
      },
      {
        title: "Eğitim özeti",
        paragraphs: [
          "Okul öncesi tesislerin (KiTa) eyaletlere göre ücretlendirildiği; 1 Ağustos 2019’dan itibaren belirli sosyal yardım alan ailelerin KiTa ücretinden muaf olabileceği anlatılır.",
          "Zorunlu ilkokuldan sonra Hauptschule, Realschule veya Gymnasium seçeneklerinin veli ve okul görüşmesiyle şekillendiği; mesleki ikili eğitimin okul sonrası başlayabildiği özetlenir.",
        ],
      },
      {
        title: "Gelir ve yaşam maliyeti",
        paragraphs: [
          "Kaynakta 2024 için tam zamanlı çalışanların ortalama brüt maaşı ve sektörel farklılıklardan; gelir vergisinin kademeli olduğundan ve KDV oranlarının (ör. standart %19, indirimli %7) anlatıldığından söz edilir.",
          "2022 hanhalkı bütçe anketine göre ortalama aylık tüketim dağılımı örneklenir; konut ve enerji payının yüksek, gıda payının diğer AB ülkelerine göre nispeten düşük uçta olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Tanınma, haklar ve destek",
    lead: "SGB IX tanımı, ağır engelli statüsü ve işveren / çalışan destekleri.",
    accordions: [
      {
        title: "Tanınma süreci",
        paragraphs: [
          "Almanya’da engelliliğin; fiziksel, zihinsel, entelektüel veya duyusal bir yetersizliğin, toplumsal engellerle birlikte altı aydan fazla eşit katılımı engellemesi durumunda söz konusu olduğu Birleşmiş Milletler Engelli Hakları Sözleşmesi ve SGB IX §2(1) ile ilişkilendirilir.",
          "Engellilik derecesi (GdB) en az 50 olanlara “ağır engelli” statüsü verildiği; başvurunun eyaletteki Versorgungsamt’a tıbbi belgelerle yapıldığı anlatılır.",
        ],
      },
      {
        title: "İşyerinde koruma ve destek",
        paragraphs: [
          "Ağır engelli çalışanların işten çıkarılmasında işverenin önce İntegrationsamt onayı alması gerektiği; onaysız fesihlerin geçersiz sayılabileceği belirtilir.",
          "Federal İstihdam Ajansı, İntegrationsämter, EUTB danışmanlığı ve EURES Targeted Mobility Scheme (TMS) ile seyahat, dil kursu ve tanınma masraflarına yönelik mali destekten söz edilir.",
        ],
      },
    ],
  },
  {
    id: "resmi-kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama için bağlantılar",
    lead: "Aşağıdaki adresler kaynak metinde geçen kurumların güncel bilgi sayfalarına gider.",
    accordions: [
      {
        title: "Federal ve AB düzeyi",
        paragraphs: [
          "Make it in Germany: make-it-in-germany.com",
          "Federal İstihdam Ajansı (iş arama, yurtdışından başvuranlar, tanınma): arbeitsagentur.de",
          "EURES: eures.europa.eu",
          "Federal Dışişleri (vize ve oturum genel bakış): auswaertiges-amt.de",
          "Federal Yabancılar ve Göç (BAMF): bamf.de",
          "AB vatandaşları eşit muamele ofisi: eu-gleichbehandlungsstelle.de",
          "Europass: europass.europa.eu",
        ],
      },
    ],
  },
];
