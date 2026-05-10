import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const KANADA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Kanada; çalışma, eğitim, yatırım ve kalıcı oturum odaklı göç sistemleriyle dünyanın en yoğun başvuru alan ülkelerinden biridir. Sistem büyük ölçüde puanlama, meslek ihtiyacı, dil yeterliliği ve finansal yeterlilik üzerine kuruludur.",
  "Özellikle 2026 itibarıyla Express Entry çerçevesinde kategori bazlı davetler, iş gücü öncelikleri ve geçici çalışanların kalıcı oturuma geçişine ilişkin politika güncellemeleri sık gündeme gelmektedir. Kesin tarih, kota, ücret ve şartlar için Immigration, Refugees and Citizenship Canada (IRCC) resmî duyurularını esas alın.",
];

export const KANADA_SEO_KEYWORD_TAGS: string[] = [
  "kanada vize",
  "kanada visitor visa trv",
  "express entry",
  "kanada çalışma izni",
  "lmia kanada",
  "kanada pr",
  "pnp kanada",
  "celpip ielts kanada",
];

export const KANADA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize Koşulları",
    h2: "Kanada Vize Koşulları ve TRV",
    lead:
      "Kısa süreli seyahatlerde çoğu yabancı uyruklu için geçici ikamet statüsü ve gerekliyse Geçici İkametçi Vizesi (TRV) süreçleri öne çıkar.",
    accordions: [
      {
        title: "Turistik ve aile ziyareti (Visitor / TRV çerçevesi)",
        paragraphs: [
          "Kanada’ya kısa süreli seyahatler için (çoğu durumda) “Temporary Resident Visa (TRV)” veya muafiyet kapsamındaki eTA (Electronic Travel Authorization) gibi giriş belgeleri gündeme gelir. Ülkeniz, pasaport türünüz ve amacınıza göre hangi belgenin gerekli olduğunu IRCC “Find out if you need a visa” akışıyla doğrulamalısınız.",
        ],
      },
      {
        title: "Temel şartlar (tipik başvuru paketi)",
        paragraphs: ["Çoğu ziyaretçi başvurusunda aşağıdaki başlıklar değerlendirilir:"],
        bullets: [
          "Geçerli pasaport ve kimlik dokümanları",
          "Finansal yeterlilik kanıtı",
          "Seyahat amacının tutarlı anlatımı",
          "Kanada’dan ayrılma niyeti (geçici kalış)",
          "Konaklama ve seyahat planına dair makul bilgi",
          "Biyometri (istenen ülkeler / kişiler için)",
          "Bazı durumlarda sağlık muayenesi",
        ],
      },
      {
        title: "Kritik noktalar",
        paragraphs: ["Ziyaretçi statüsünde sık yapılan yanılgıları netleştirmek faydalıdır:"],
        bullets: [
          "Vize onayı tek başına giriş garantisi değildir; son kararı sınır görevlileri verir.",
          "Gelir düzeni ve banka hareketlerinin başvuru anlatımıyla uyumu önemlidir.",
          "Sahte veya yanıltıcı belge ciddi ret, giriş yasağı ve ilerideki başvurular için risk oluşturabilir.",
        ],
      },
    ],
  },
  {
    id: "calisma-vizeleri",
    tocLabel: "Çalışma Vizeleri",
    h2: "Kanada Çalışma İzni ve İşveren Süreçleri",
    lead:
      "Çalışma izinleri açık (open) veya işverene bağlı (employer-specific) modellerle yürür; LMIA ihtiyacı iş ve programa göre değişir.",
    accordions: [
      {
        title: "Açık çalışma izni (Open Work Permit)",
        paragraphs: [
          "Belirli durumlarda işverene bağlı olmadan çalışma hakkı tanınır. Kimlerin uygun olduğu tam liste ve güncel pilotlar IRCC rehberlerinde yer alır; aşağıdakiler tipik örneklerdir:",
        ],
        bullets: [
          "Eş sponsorluğu sürecinde olanlar (program şartlarına bağlı)",
          "Mezuniyet sonrası çalışma izni (PGWP vb. uygunluk şartlarıyla)",
          "Bazı geçici kamu politikaları (public policy) kapsamındakiler",
          "Bazı kalıcı oturum başvuru aşamalarındakiler (statü ve şartlara bağlı)",
        ],
      },
      {
        title: "İşverene bağlı çalışma izni — genel süreç",
        paragraphs: ["En yaygın rota şu adımlarla özetlenir:"],
        bullets: [
          "Kanada işvereni ve uygun iş teklifi",
          "Gerekliyse LMIA (Labour Market Impact Assessment) veya LMIA muafiyeti",
          "Çalışma izni başvurusu ve biyometri / sağlık gibi ek talepler",
        ],
      },
      {
        title: "Sık talep gören alanlar",
        paragraphs: [
          "NOC/TEER sınıflandırması ve eyalet programlarına göre talep sürekli değişir; güncel liste için federal ve eyalet duyurularını izleyin. Örnek sektör başlıkları:",
        ],
        bullets: [
          "Sağlık",
          "Yazılım ve teknoloji",
          "Mühendislik",
          "İnşaat",
          "Taşımacılık",
          "Eğitim",
          "Tarım",
          "Teknik meslekler",
        ],
      },
      {
        title: "2026 perspektifi (Express Entry ile bağlantı)",
        paragraphs: [
          "Kanada, iş gücü açığı ve ekonomik önceliklere göre kategori bazlı Express Entry davetlerini ve program kotalarını güncelleyebilir. CRS eşikleri ve hedef kategoriler dönemsel olarak değiştiği için davet geçmişi ve güncel fırsat bildirimlerini düzenli izlemek önemlidir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş Bulma",
    h2: "Kanada’da İş Bulma Süreci",
    lead:
      "İş arama stratejiniz; çalışma izni türünüz, meslek kodunuz (NOC/TEER) ve hedef eyalet programlarıyla uyumlu olmalıdır.",
    accordions: [
      {
        title: "Yaygın yöntemler",
        paragraphs: ["İş bulma kanalları hedef eyaletinize ve meslek kodunuza göre değişir; aşağıdakiler yaygın başlangıç noktalarıdır:"],
        bullets: [
          "LinkedIn ve doğrudan işveren başvuruları",
          "Kanada merkezli kariyer portalları ve eyalet istihdam siteleri",
          "İşveren sponsorluğu ve LMIA gerektiren roller",
          "Provincial Nominee Program (PNP)",
          "Kırsal ve bölgesel programlar",
          "Atlantic Immigration Program",
        ],
      },
      {
        title: "Önemli gerçekler",
        paragraphs: [
          "Kanada içi çalışma deneyimi, dil skorları ve uygun NOC/TEER hizalaması Express Entry ve PNP puanlamasında belirleyici olabilir.",
          "IELTS General Training veya CELPIP gibi onaylı dil testleri çoğu ekonomik göç programında temel gerekliliklerdendir.",
          "Başvurular TEER/NOC sınıflandırmasına göre değerlendirilir; yanlış meslek kodu seçimi dosyayı zayıflatır.",
        ],
      },
    ],
  },
  {
    id: "express-entry",
    tocLabel: "Express Entry",
    h2: "Express Entry Sistemi",
    lead:
      "Express Entry; uygun adayların federal ekonomik göç programlarına girdiği çevrimiçi sistemdir. Aday havuzunda yer almak, davet almak anlamına gelmez.",
    accordions: [
      {
        title: "Ana federal programlar",
        paragraphs: ["Express Entry havuzuna şu federal programlar üzerinden uygunluk değerlendirmesi yapılabilir:"],
        bullets: [
          "Federal Skilled Worker Program",
          "Canadian Experience Class",
          "Federal Skilled Trades Program",
        ],
      },
      {
        title: "CRS ve davetler",
        paragraphs: [
          "Comprehensive Ranking System (CRS) puanınız; yaş, eğitim, dil, Kanada deneyimi ve diğer faktörlere göre hesaplanır. Davetler (ITA) dönemsel kesim skorları ve hedef kategorilerle açıklanır; geçmiş davetler geleceği garanti etmez.",
        ],
      },
      {
        title: "2026 güncel gündem (özet)",
        paragraphs: [
          "Hükümet ve IRCC; CRS yapısı, kategori bazlı seçimler, hedef meslekler ve deneyim süreleri gibi parametreleri dönemsel olarak güncelleyebilir. Örneğin bazı kategorilerde minimum Kanada deneyimi süresine ilişkin beklentiler artırılabilir; STEM, sağlık, eğitim ve teknik meslekler sık önceliklendirilen başlıklar arasındadır.",
        ],
        callout: {
          variant: "info",
          text: "Kesim skorları, kota tabloları ve kategori davetleri için IRCC “Express Entry rounds of invitations” ve güncel haber bültenlerini takip edin.",
        },
      },
    ],
  },
  {
    id: "oturum-pr",
    tocLabel: "Oturum (PR)",
    h2: "Kalıcı Oturum (Permanent Residence)",
    lead:
      "PR; Kanada’da geniş çalışma, eğitim ve sağlık erişimi sağlayan kalıcı statüdür; vatandaşlık ile aynı değildir.",
    accordions: [
      {
        title: "Ana yollar",
        paragraphs: ["Kalıcı oturum başlıkları kişisel profilinize göre birleştirilebilir; tipik federal ve bölgesel rotalar:"],
        bullets: [
          "Express Entry (federal ekonomik programlar)",
          "Provincial Nominee Program (PNP) — eyalet adaylığı ek puan veya doğrudan PR yolları",
          "Atlantic Immigration Program — Atlantik eyaletleri odaklı işveren destekli yollar",
          "Rural / bölgesel pilotlar — küçük topluluk ve iş gücü ihtiyaçları",
          "Aile sponsorluğu — Kanada vatandaşı veya PR sponsor olabilir (program şartlarına tabi)",
        ],
      },
      {
        title: "Geçici çalışanın PR’a geçişi (TR → PR)",
        paragraphs: [
          "Geçici çalışanlar için uygun iş deneyimi, dil ve eğitim; Express Entry veya PNP ile birleştiğinde PR yolunu güçlendirir. Hükümet dönemsel olarak geçici statüden PR’a özel hedefler ve pilotlar duyurabilir; sayılar ve kriterler resmî metinlerle sınırlıdır.",
        ],
        callout: {
          variant: "warning",
          text: "“33.000 kişi” gibi sayısal hedefler veya tarihler yalnızca IRCC / federal bütçe veya program kılavuzlarında netleştiğinde esas alınmalıdır; buradaki çerçeve genel bilgilendirme amaçlıdır.",
        },
      },
      {
        title: "“Green Card” ile karşılaştırma",
        paragraphs: [
          "Kanada’da ABD’deki Green Card’ın birebir aynı isimde bir karşılığı yoktur; ancak Permanent Residence (PR) statüsü uzun vadede benzer iş ve yaşam hakları sunar.",
        ],
        bullets: [
          "PR sahipleri genel olarak sınırsız süreyle yaşayıp çalışabilir ve kamu sağlık sigortasına eyalet kuralları çerçevesinde erişebilir.",
          "Oy kullanma ve bazı güvenlik hassasiyeti olan roller gibi vatandaşlığa özgü ayrımlar bulunur.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Kanada Vatandaşlığı",
    lead:
      "Vatandaşlık; PR sonrası ikamet, vergi ve suç sicili gibi şartlarla birlikte fiziksel bulunma ve test gerekliliklerine bağlıdır.",
    accordions: [
      {
        title: "Genel çerçeve",
        paragraphs: [
          "Başvuru öncesi belirli süre Kanada’da fiilen bulunma, gelir beyanı yükümlülükleri, dil yeterliliği (kanıtlanabilir seviye) ve vatandaşlık bilgi testi tipik başlıklardır.",
        ],
        callout: {
          variant: "info",
          text: "Kesin süreler, ücretler ve muafiyetler için IRCC “Citizenship” bölümünü ve güncel formları kontrol edin.",
        },
      },
    ],
  },
  {
    id: "yatirimci",
    tocLabel: "Yatırımcı",
    h2: "Yatırımcı ve Girişim Programları",
    lead:
      "Federal düzeyde bazı yatırımcı programları sınırlanmış veya kapatılmış olabilir; yollar çoğunlukla eyalet girişimci akışları ve Start-up gibi hedefli programlar üzerinden şekillenir.",
    accordions: [
      {
        title: "Güncel yaklaşım",
        paragraphs: [
          "Start-up Visa ve eyalet düzeyinde girişim / yatırımcı kategorileri; iş planı, mektup desteği, likidite ve deneyim şartlarıyla birlikte değerlendirilir.",
          "Program kotası, işlem süresi ve uygun iş sektörleri IRCC ve eyalet duyurularına göre değişebilir; 2026 itibarıyla Start-up Visa özelinde kısıtlama veya yönerge güncellemeleri için resmî duyuruları izleyin.",
        ],
      },
    ],
  },
  {
    id: "ucretler-politikalar",
    tocLabel: "Ücretler ve politikalar",
    h2: "Ücretler ve Güncel Politikalar",
    lead: "Göç ve vatandaşlık ücretleri yılda bir veya daha sık güncellenebilir.",
    accordions: [
      {
        title: "2026 notu",
        paragraphs: [
          "Kalıcı oturum başvuruları, vatandaşlık ve bazı geçici statü ücretleri dönemsel artışlara tabi olabilir. Başvurudan önce IRCC “Fees” ve ilgili form sayfalarında güncel CAD tutarını doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "uyarilar-kaynaklar",
    tocLabel: "Uyarılar ve kaynaklar",
    h2: "Kritik Uyarılar ve Resmî Kaynaklar",
    lead:
      "Dolandırıcılık riskleri ve hızla değişen kurallar nedeniyle her zaman resmî kanıtı esas alın.",
    accordions: [
      {
        title: "Sahte iş teklidi ve kötü niyetli vaatler",
        paragraphs: ["Aşağıdaki söylemler yüksek risk işareti olarak değerlendirilmelidir:"],
        bullets: [
          "“Kesin vize garantisi” veya “kesin oturum” vaadi",
          "“Parayla iş sponsorluğu” önerisi",
          "“CRS yükseltme garantisi” gibi ölçülemeyen beyanlar",
        ],
      },
      {
        title: "Resmî kaynak: IRCC",
        paragraphs: [
          "En güvenilir başlangıç noktası Immigration, Refugees and Citizenship Canada (IRCC) portalıdır. Özellikle Express Entry davet geçmişi, çalışma izni politikaları, PR program güncellemeleri, public policy duyuruları ve ücret değişiklikleri burada yayımlanır.",
        ],
      },
      {
        title: "Kanada göç sisteminin özeti (2026 perspektifi)",
        paragraphs: [
          "Kanada artık yalnızca “başvuran” değil; dil bilen, mesleği ekonomik önceliklerle uyumlu, Kanada deneyimi veya işveren desteği olan ve uyum potansiyeli gösteren adayları önceliklendirmektedir. Sistem odağı sağlık, STEM, eğitim, teknik meslekler ve kırsal iş gücü ihtiyaçları gibi başlıklarda yoğunlaşabilir; güncel hedefler için federal ve eyalet duyurularını birlikte okuyun.",
        ],
      },
    ],
  },
];
