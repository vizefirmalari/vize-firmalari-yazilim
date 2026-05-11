import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const IRLANDA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "İrlanda; Avrupa’nın güçlü teknoloji merkezlerinden biri hâline gelmiş, yüksek maaşlı iş piyasası, İngilizce dil avantajı ve çok uluslu şirket yoğunluğu sayesinde son yıllarda ciddi göç alan ülkelerdendir. Google, Meta, Apple, Microsoft, Amazon ve TikTok gibi büyük teknoloji şirketlerinin Avrupa operasyonlarının önemli bölümü İrlanda’dadır.",
  "Schengen Bölgesi üyesi değildir ancak Avrupa Birliği üyesidir. 2025–2026 döneminde çalışma permit maaş eşikleri, vatandaşlık kriterleri ve residence süreçlerinde önemli güncellemeler yapılmıştır. Kesin tablolar ve başvuru şartları için Irish Immigration Service, Department of Enterprise, Trade and Employment (employment permit) ve resmî vize sayfalarını düzenli doğrulayın.",
];

export const IRLANDA_SEO_KEYWORD_TAGS: string[] = [
  "irlanda vize",
  "critical skills employment permit ireland",
  "stamp 4 ireland",
  "long stay d visa ireland",
  "dublin work permit",
  "irish immigration service",
  "general employment permit ireland",
  "ireland reckonable residence",
];

export const IRLANDA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "AB Üyeliği, Schengen Dışı ve Ulusal Vize Sistemi",
    lead:
      "İrlanda AB üyesidir; Schengen üyesi değildir ve kendi ulusal vize sistemini uygular.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "İrlanda Avrupa Birliği üyesidir; Schengen Bölgesi üyesi değildir.",
          "Schengen vizesi ile İrlanda’ya giriş yapılamaz; İrlanda kendi ulusal vize sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "Short Stay C Visa",
          "Long Stay D Visa",
          "Employment Visa",
          "Student Visa",
          "Join Family Visa",
          "Critical Skills Employment Permit",
          "General Employment Permit",
        ],
      },
      {
        title: "Türkiye vatandaşları için durum",
        paragraphs: [
          "Türkiye Cumhuriyeti pasaport sahiplerinin İrlanda’ya giriş için vize almak zorunda olduğu anlatılır.",
          "Yeşil pasaportun da çoğu durumda vizeden muaf olmadığı özetlenir; kişisel durum için güncel muafiyet listesini resmî kaynaklardan doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Residence, Stamp Sistemi ve Long Term Residency",
    lead:
      "Uzun süreli residence çalışma permiti, eğitim veya aile birleşimi hatlarıyla birleşir; Stamp kategorileri pratikte merkezi rol oynar.",
    accordions: [
      {
        title: "Residence sistemi",
        paragraphs: [
          "İrlanda’da uzun süreli residence büyük ölçüde çalışma permiti, eğitim veya aile birleşimi üzerinden ilerlemektedir.",
        ],
      },
      {
        title: "Stamp sistemi",
        paragraphs: ["İrlanda residence sistemi Stamp kategorileri üzerinden çalışır. Başlıca örnekler:"],
        bullets: [
          "Stamp 1 — Çalışma",
          "Stamp 1G — Mezun çalışma hakkı",
          "Stamp 2 — Öğrenci",
          "Stamp 4 — Uzun dönem residence / daha serbest çalışma hakkı",
        ],
      },
      {
        title: "Long Term Residency",
        paragraphs: [
          "Genellikle 60 ay (5 yıl) yasal residence sonrasında uzun dönem residence başvurusu yapılabileceği anlatılır; hangi stamp’lerin sayıldığı ve istisnalar resmî kılavuzda güncellenir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Reckonable Residence ve 2026 Gündemi",
    lead:
      "Vatandaşlık yolu süreklilik ve iyi karakter unsurlarıyla tanımlanır; tüm residence türleri hesaba tam sayılmayabilir.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "İrlanda vatandaşlığı çoğunlukla beş yıl reckonable residence, sürekli yasal ikamet, iyi karakter ve residence kayıt sürekliliği üzerinden ilerlemektedir.",
        ],
      },
      {
        title: "Kritik detay",
        paragraphs: [
          "Bazı residence türlerinin vatandaşlık hesabında tam sayılmayabileceği anlatılır.",
          "Özellikle bazı öğrenci izinleri ve geçici izinler reckonable residence kapsamında farklı değerlendirilebilir.",
        ],
      },
      {
        title: "2026 değişiklikleri",
        paragraphs: [
          "2025–2026 döneminde vatandaşlık kriterlerini sıkılaştırmaya yönelik yeni düzenlemelerin gündeme geldiği raporlanmaktadır; yürürlükteki metni Citizens Information ve resmî duyurulardan takip edin.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: ["İrlanda çifte vatandaşlığa izin vermektedir."],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Critical Skills, General Permit ve Süreç",
    lead:
      "Critical Skills Employment Permit (CSEP) yüksek nitelikli çalışanlar için en güçlü çerçevelerden biri olarak anlatılır.",
    accordions: [
      {
        title: "Critical Skills Employment Permit",
        paragraphs: [
          "İrlanda’nın en güçlü çalışma sistemlerinden biri Critical Skills Employment Permit (CSEP) olarak kabul edilmektedir.",
        ],
      },
      {
        title: "Kimler için uygundur?",
        paragraphs: ["Başlıca uygun alanlara örnekler:"],
        bullets: [
          "Yazılım geliştirme",
          "Yapay zekâ",
          "Siber güvenlik",
          "Veri bilimi",
          "Sağlık",
          "Mühendislik",
          "Finans teknolojileri",
        ],
      },
      {
        title: "2026 maaş eşikleri",
        paragraphs: [
          "2026 itibarıyla Critical Skills için minimum maaş eşiğinin yaklaşık €40.904, General Employment Permit için yaklaşık €36.605 olarak güncellendiği özetlenmektedir; resmî tabloda yıllık revizyonları doğrulayın.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "Sponsor işveren bulunur",
          "İş sözleşmesi hazırlanır",
          "Employment permit başvurusu yapılır",
          "Long Stay D Visa alınır",
          "İrlanda’ya giriş yapılır",
          "Residence kaydı yapılır",
        ],
      },
      {
        title: "İş gücü açığı olan alanlar",
        paragraphs: ["Öne çıkan sektör örnekleri:"],
        bullets: [
          "Yazılım ve bulut teknolojileri",
          "Hemşirelik ve doktorluk",
          "Veri mühendisliği",
          "Finans",
          "İnşaat",
          "Farmasötik üretim",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Piyasa",
    lead:
      "Dublin teknoloji yoğunluğunun merkezidir; Cork, Galway ve Limerick bölgesel güç oluşturur.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca iş merkezleri:"],
        bullets: ["Dublin", "Cork", "Galway", "Limerick"],
      },
      {
        title: "Teknoloji merkezi",
        paragraphs: [
          "Dublin’in Avrupa’nın en büyük teknoloji merkezlerinden biri hâline geldiği ve birçok küresel şirketin Avrupa merkezinin İrlanda’da olduğu anlatılır.",
        ],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Jobs Ireland", "IrishJobs", "Indeed Ireland", "LinkedIn"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla sponsor denetimlerinin arttığı, permit süreçlerinin sıkılaştığı ve maaş eşiklerinin yükseldiği özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-visitor",
    tocLabel: "Turistik vize",
    h2: "Short Stay C Visa",
    lead:
      "Kısa süreli ziyaretler Short Stay C Visa çerçevesinde değerlendirilir.",
    accordions: [
      {
        title: "Kalış süresi",
        paragraphs: [
          "Genellikle en fazla 90 güne kadar kalış hakkı verilebildiği anlatılır; vize etiketindeki süre ve şartlar esas alınır.",
        ],
      },
      {
        title: "Kritik detay",
        paragraphs: [
          "İrlanda turist vizesinin çalışma hakkı vermediği ve residence hakkı sağlamadığı vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV, Cover Letter ve Teknik Mülakat",
    lead:
      "İrlanda iş piyasasında kısa ve ölçülebilir başvuru kültürü baskındır.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "İrlanda’da kısa, sonuç odaklı ve ölçülebilir başarı içeren CV’ler tercih edilmektedir.",
        ],
      },
      {
        title: "Cover letter",
        paragraphs: [
          "Özellikle teknoloji ve kurumsal şirketlerde cover letter önem taşır.",
        ],
      },
      {
        title: "Teknik mülakatlar",
        paragraphs: ["IT sektöründe yaygın formatlar:"],
        bullets: ["Live coding", "System design", "Behavioural interview"],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship ve Graduate Programları",
    lead:
      "Teknoloji, finans ve ilaç sanayinde staj kültürü güçlüdür.",
    accordions: [
      {
        title: "Internship sistemi",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Teknoloji", "Finans", "İlaç sanayi", "Veri analizi"],
      },
      {
        title: "Graduate programları",
        paragraphs: [
          "Çok uluslu şirketlerde graduate scheme programlarının yaygın olduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ciraklik",
    tocLabel: "Mesleki çıraklık",
    h2: "Apprenticeship",
    lead:
      "Teknik apprenticeship programları elektrikten IT’ye kadar çeşitli alanlarda bulunur.",
    accordions: [
      {
        title: "Apprenticeship sistemi",
        paragraphs: [
          "İrlanda’da teknik apprenticeship sisteminin bulunduğu ve başlıca alanların elektrik, üretim, mekanik, IT ve mühendislik olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "EEA Avantajı ve Non-EEA Permit Zorunluluğu",
    lead:
      "AB/EEA vatandaşları kayıt ve çalışma kolaylıklarından yararlanır; Non-EEA için permit sistemi zorunludur.",
    accordions: [
      {
        title: "AB vatandaşları avantajlıdır",
        paragraphs: [
          "AB/EEA vatandaşlarının daha kolay çalışma, residence ve kayıt süreçlerinden yararlanabildiği anlatılır.",
        ],
      },
      {
        title: "Non-EEA vatandaşları",
        paragraphs: [
          "Non-EEA vatandaşları için permit sisteminin zorunlu olduğu vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Konut Krizi ve Kiralama Platformları",
    lead:
      "Özellikle Dublin’de konut arzı kısıtlıdır; kira baskısı yüksektir.",
    accordions: [
      {
        title: "Konut krizi",
        paragraphs: [
          "İrlanda’nın özellikle Dublin’de ciddi konut krizi yaşadığı anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Dublin merkez stüdyo için yaklaşık €1700–€3200+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["Daft Ireland", "Rent.ie"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Hybrid ve Haklar",
    lead:
      "Haftalık çalışma süresi ve hybrid düzen sektöre göre değişir; temel çalışan hakları yasayla korunur.",
    accordions: [
      {
        title: "Standart çalışma süresi",
        paragraphs: [
          "Genellikle haftalık 39–40 saat bandının uygulandığı anlatılır.",
        ],
      },
      {
        title: "Hybrid çalışma",
        paragraphs: [
          "Remote ve hybrid çalışma modelinin özellikle teknoloji sektöründe yaygın olduğu özetlenir.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal koruma altında sayılan başlıklar:"],
        bullets: ["Minimum wage", "Fazla mesai koruması", "Ayrımcılık yasağı", "Tatil hakları"],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve Üniversiteler",
    lead:
      "Kamu ve özel sağlık birlikte çalışır; yükseköğretim markaları güçlüdür.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "İrlanda’da kamu ve özel sağlık sisteminin birlikte çalıştığı ve özel sağlık sigortasının yaygın olduğu anlatılır.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "İrlanda’nın Trinity College Dublin, University College Dublin ve University of Galway gibi önemli üniversitelere sahip olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Equality Legislation ve Destekler",
    lead:
      "Engelli bireylerin çalışma hakları equality legislation kapsamında korunur.",
    accordions: [
      {
        title: "Yasal koruma",
        paragraphs: [
          "Engelli bireylerin çalışma haklarının equality legislation kapsamında korunduğu anlatılır.",
        ],
      },
      {
        title: "Destek sistemleri",
        paragraphs: ["Uygulanabilen destek türlerine örnekler:"],
        bullets: ["Workplace adjustments", "Employment supports", "Disability assistance programları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Riskler ve Güvenilir Bilgi",
    lead:
      "Sahte sponsor ve konut zorluğu ciddi riskler oluşturur; residence sürekliliği uzun vadeli başvuruları etkiler.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "Fake sponsor, sahte iş teklifi ve sahte permit danışmanlığı vakalarının arttığı raporlanmaktadır.",
          "Dublin başta olmak üzere konut bulmanın ciddi şekilde zorlaştığı anlatılır.",
          "Residence kayıtlarındaki boşlukların citizenship ve long term residency başvurularını etkileyebileceği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Yalnızca lisanslı işveren ve resmî başvuru kanallarıyla ilerleyin; “garantili permit” vaatlerinden kaçının.",
        },
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Irish Immigration Service",
          "Critical Skills Employment Permit (DETE)",
          "Jobs Ireland",
          "Citizens Information Ireland",
          "Visas for Ireland",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Critical Skills maaş eşikleri",
          "Employment permit sistemi",
          "Citizenship kuralları",
          "Long term residency şartları",
          "Sponsor denetimleri",
          "Konut politikaları",
          "Göç mevzuatı",
        ],
      },
    ],
  },
];
