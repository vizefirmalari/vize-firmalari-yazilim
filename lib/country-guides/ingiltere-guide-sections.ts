import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const INGILTERE_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Birleşik Krallık; yüksek maaşlı iş piyasası, dünya çapındaki üniversiteleri, finans merkezi konumu ve İngilizce dil avantajı nedeniyle dünyanın en yoğun göç alan ülkelerinden biridir. Brexit sonrası sistem puan bazlı göç modeline evrilmiş ve özellikle Skilled Worker vizesi üzerinden yabancı çalışan kabulü genişletilmiştir.",
  "2025–2026 döneminde maaş eşikleri, İngilizce şartları ve sponsor denetimleri sıkılaşmıştır. Ücretler, eşikler ve politika tasarıları (ör. ILR süresi tartışmaları) için UK Visas and Immigration (UKVI) ve ilgili resmî sayfaları düzenli doğrulayın; bu metin özet rehberdir, hukuki tavsiye değildir.",
];

export const INGILTERE_SEO_KEYWORD_TAGS: string[] = [
  "ingiltere vize",
  "skilled worker visa uk",
  "standard visitor visa",
  "uk eta",
  "certificate of sponsorship",
  "ilr indefinite leave to remain",
  "london work visa",
  "ukvi",
  "graduate visa uk",
];

export const INGILTERE_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Schengen Dışı Sistem, Başlıca Vizeler ve ETA",
    lead:
      "Birleşik Krallık ne Schengen ne AB üyesidir; giriş ve kalış UK vize ve izin kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Birleşik Krallık Schengen Bölgesi üyesi değildir ve Avrupa Birliği üyesi değildir.",
          "İngiltere vizesi Schengen’de geçerli değildir; Schengen vizesi ile Birleşik Krallık’a giriş yapılamaz.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En sık başvurulan çerçevelerin özeti:"],
        bullets: [
          "Standard Visitor Visa",
          "Skilled Worker Visa",
          "Student Visa",
          "Graduate Visa",
          "Global Talent Visa",
          "Innovator Founder Visa",
          "Family Visa",
        ],
      },
      {
        title: "ETA (Electronic Travel Authorisation)",
        paragraphs: [
          "Birçok ülke vatandaşı için ETA zorunlu hâle gelmiştir. 2026 itibarıyla ETA ücreti £20 olarak anlatılmaktadır ve tipik olarak 2 yıl geçerlilik söz konusudur; kimlerin kapsama girdiğini ve güncel ücreti UKVI duyurularından doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "oturum-ilr",
    tocLabel: "Oturum",
    h2: "Skilled Worker Üzerinden Oturum ve ILR",
    lead:
      "Uzun dönem yasal kalışta Skilled Worker hattı en yaygın çerçevedir; süreler ve ILR şartları resmî kılavuzla güncellenir.",
    accordions: [
      {
        title: "Skilled Worker üzerinden oturum",
        paragraphs: [
          "En yaygın residence çizgisi Skilled Worker Visa üzerinden ilerler; süre ve uzatma koşulları vize şartlarına ve sponsorluya bağlıdır.",
        ],
      },
      {
        title: "Genel süreç özeti",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "Sponsor lisanslı işveren bulunur",
          "Certificate of Sponsorship (CoS) alınır",
          "Skilled Worker başvurusu yapılır",
          "Birleşik Krallık’a giriş yapılır",
          "Uzun dönem residence süreci başlar",
        ],
      },
      {
        title: "ILR (Indefinite Leave to Remain)",
        paragraphs: [
          "Uzun süreli yasal residence sonrasında ILR (süresiz oturum) başvurusu yapılabileceği anlatılır; hangi vize yollarının ILR’ye sayıldığı ve süre hesapları UKVI tarafından belirlenir.",
        ],
      },
      {
        title: "2026 politika gündemi",
        paragraphs: [
          "Hükümetin ILR süresini 5 yıldan 10 yıla çıkarma yönünde tartışmalar yürüttüğü raporlanmaktadır; yürürlükteki kural ve geçişleri mutlaka resmî kaynaklardan takip edin.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Birleşik Krallık Vatandaşlığı",
    lead:
      "Vatandaşlık yolu genellikle uzun süreli yasal residence, ILR ve entegrasyon unsurlarıyla tanımlanır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Birleşik Krallık vatandaşlığı genellikle uzun süreli yasal residence, ILR statüsü, İngilizce yeterliliği ve Life in the UK testi gibi unsurlarla ilişkilendirilir.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Birleşik Krallık çifte vatandaşlığa izin vermektedir; ülkenizin vatandaşlık kurallarıyla birlikte değerlendirin.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Skilled Worker, Sponsor ve Sektörler",
    lead:
      "Temel çalışma modeli sponsor lisanslı işveren ve CoS üzerinden Skilled Worker Visa ile ilerler.",
    accordions: [
      {
        title: "Temel şartlar",
        paragraphs: ["Skilled Worker çizgisinde sık vurgulanan kriterler:"],
        bullets: [
          "Sponsor lisanslı işveren",
          "Certificate of Sponsorship",
          "İngilizce yeterliliği",
          "Maaş eşiği",
          "Uygun SOC kodu",
        ],
      },
      {
        title: "2026 maaş eşikleri",
        paragraphs: [
          "2025–2026 döneminde maaş eşiklerinin ciddi şekilde yükseltildiği ve bazı kategorilerde £41.700 seviyelerinin tartışıldığı raporlanmaktadır. Kesin tabloyu UKVI ve sponsor kılavuzlarından güncelleyin.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Yazılım ve yapay zekâ",
          "Finans",
          "Sağlık",
          "Mühendislik ve siber güvenlik",
          "Veri bilimi",
          "İnşaat",
          "Eğitim",
        ],
      },
      {
        title: "Sponsor sistemi",
        paragraphs: [
          "İşverenin sponsor lisansına sahip olması zorunludur; lisans iptali çalışanların vize statüsünü riske sokabilir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Piyasa Gerçeği",
    lead:
      "Londra ve bölgesel merkezler iş yoğunluğunu taşır; 2026’da politika sıkılaşması ve sponsor denetimi öne çıkar.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca iş merkezleri:"],
        bullets: ["Londra", "Manchester", "Birmingham", "Edinburgh", "Bristol", "Leeds"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Indeed UK", "LinkedIn UK", "Reed UK", "TotalJobs UK", "NHS Jobs"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla göç politikalarının sıkılaştığı, sponsor denetimlerinin arttığı ve bazı sektörlerde work visa sayılarının düştüğü anlatılmaktadır.",
        ],
      },
    ],
  },
  {
    id: "turistik-visitor",
    tocLabel: "Turistik vize",
    h2: "Standard Visitor Visa",
    lead:
      "Kısa süreli ziyaretlerin temel çerçevesi Standard Visitor Visa ile anlatılır.",
    accordions: [
      {
        title: "Kalış süresi ve kullanım",
        paragraphs: [
          "Genellikle en fazla altı aya kadar ziyaret hakkı verilebildiği anlatılır; kesin süre ve koşullar başvuru gerekçesine göre değişir.",
        ],
      },
      {
        title: "Başlıca kullanım alanları",
        paragraphs: ["Ziyaretçi vizesi kapsamında sık görülen amaçlar:"],
        bullets: ["Turizm", "İş görüşmeleri", "Kısa eğitimler", "Aile ziyareti", "Kısa iş etkinlikleri"],
      },
      {
        title: "Ücretler",
        paragraphs: [
          "2026 itibarıyla kısa süreli visitor vizesinin yaklaşık 190 USD civarında olduğu özetlenmektedir; güncel GBP/USD ve resmî ücret tablosunu UKVI’den doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV, Cover Letter ve Mülakat",
    lead:
      "İngiltere iş piyasasında kısa ve sonuç odaklı başvuru kültürü baskındır.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "İngiltere’de kısa, sonuç odaklı ve ölçülebilir başarı içeren CV’ler tercih edilmektedir.",
        ],
      },
      {
        title: "Cover letter",
        paragraphs: [
          "Birçok şirkette cover letter önem taşır; rol ve şirkete özel yazım beklenir.",
        ],
      },
      {
        title: "Mülakat sistemi",
        paragraphs: ["Özellikle teknoloji sektöründe yaygın formatlar:"],
        bullets: ["Teknik mülakat", "Behavioural interview", "Live coding"],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship ve Graduate Scheme",
    lead:
      "Finans, yazılım ve danışmanlıkta staj kültürü güçlüdür; büyük şirket graduate programları yaygındır.",
    accordions: [
      {
        title: "Internship alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Finans", "Yazılım", "Danışmanlık", "Medya", "Mühendislik"],
      },
      {
        title: "Graduate scheme sistemi",
        paragraphs: [
          "Birleşik Krallık’ta büyük şirketlerin graduate programları oldukça yaygındır; başvuru pencereleri ve vize uygunluğu rol bazında değişir.",
        ],
      },
    ],
  },
  {
    id: "ciraklik",
    tocLabel: "Mesleki çıraklık",
    h2: "Apprenticeship",
    lead:
      "Apprenticeship sistemi teknik işler, üretim, IT ve finans gibi alanlarda güçlüdür.",
    accordions: [
      {
        title: "Apprenticeship özeti",
        paragraphs: [
          "Birleşik Krallık güçlü apprenticeship altyapısına sahiptir; program türü, ücret ve vize uygunluğu için resmî apprenticeship ve UKVI kaynaklarına bakın.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "Brexit Sonrası ve EU Settlement Scheme",
    lead:
      "AB vatandaşları için serbest dolaşım Brexit ile sona ermiştir; mevcut kayıtlar belirli statülerle yönetilmiştir.",
    accordions: [
      {
        title: "Brexit sonrası değişim",
        paragraphs: [
          "Brexit sonrası AB vatandaşları için önceki serbest dolaşım düzeni sona ermiştir; yeni giriş ve kalış UK kurallarına tabidir.",
        ],
      },
      {
        title: "EU Settlement Scheme",
        paragraphs: [
          "Eski residence sahiplerinin belirli statüler alabildiği EU Settlement Scheme çerçevesi anlatılır; yeni başvurular için son tarihler ve istisnaları resmî kaynaklardan doğrulayın.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Kira Seviyeleri ve Platformlar",
    lead:
      "Özellikle Londra’da kira seviyeleri çok yüksektir; arama platformları ile güncel ilanları takip edin.",
    accordions: [
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Londra merkez stüdyo için yaklaşık £1600–£3200+ bandının konuşulduğu özetlenmektedir; mahalle ve konuta göre fark büyüktür.",
        ],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["Rightmove UK", "Zoopla UK", "SpareRoom UK"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Hybrid ve Çalışan Hakları",
    lead:
      "Standart haftalık süre ve hybrid kültür sektöre göre değişir; temel haklar yasal çerçeveyle korunur.",
    accordions: [
      {
        title: "Standart çalışma süresi",
        paragraphs: [
          "Genellikle haftalık 37,5–40 saat bandının yaygın olduğu anlatılır; sözleşme ve sektör farklarını kontrol edin.",
        ],
      },
      {
        title: "Hybrid çalışma",
        paragraphs: [
          "Remote ve hybrid çalışma kültürü birçok sektörde yaygındır; sponsor ve vize şartları ile uyumlu olup olmadığını işveren HR ile netleştirin.",
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
    h2: "NHS ve Üniversite Ekosistemi",
    lead:
      "Yasal resident statüde NHS erişimi anlatılır; yükseköğretim markaları küresel rekabet taşır.",
    accordions: [
      {
        title: "NHS sistemi",
        paragraphs: [
          "Yasal resident kişilerin NHS üzerinden sağlık hizmeti alabildiği özetlenir; immigration health surcharge ve kayıt adımlarını başvuru türünüze göre doğrulayın.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "Birleşik Krallık Oxford, Cambridge, Imperial ve UCL gibi dünya çapında üniversitelere ev sahipliği yapar; öğrenci vizesi ve ücret politikaları kurum bazında değişir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Equality Act ve Destekler",
    lead:
      "Engelli bireylerin çalışma hakları Equality Act kapsamında korunur.",
    accordions: [
      {
        title: "Yasal koruma",
        paragraphs: [
          "Engelli bireylerin çalışma haklarının Equality Act kapsamında korunduğu anlatılır.",
        ],
      },
      {
        title: "Destek sistemleri",
        paragraphs: ["Uygulanabilen destek türlerine örnekler:"],
        bullets: ["Workplace adjustments", "Disability support", "Employment assistance programları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Riskler ve Güvenilir Bilgi",
    lead:
      "Sahte sponsor ve belge hataları ciddi sonuç doğurur; güncellemeleri UKVI ve ilgili kurumlardan izleyin.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "2025–2026 döneminde sahte sponsor, sahte CoS ve fake payroll sponsorship vakalarının arttığı raporlanmaktadır.",
          "Sponsor lisansı iptal edilen işveren çalışanların vize statüsünü riske sokabilir.",
          "2026 itibarıyla bazı vize kategorilerinde B2 İngilizce seviyesi uygulamalarının gündemde olduğu anlatılmaktadır.",
        ],
        callout: {
          variant: "warning",
          text: "“Garantili iş”, “hazır sponsor” veya “kesin ILR” vaatlerine karşı temkinli olun; yalnızca resmî sponsor ve belgelerle ilerleyin.",
        },
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve konular:"],
        bullets: [
          "UK Visas and Immigration (UKVI)",
          "Skilled Worker Visa ve Standard Visitor Visa sayfaları",
          "Work in the UK",
          "NHS UK",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Skilled Worker maaş eşikleri",
          "Sponsor lisans kuralları",
          "ETA sistemi",
          "İngilizce yeterlilik şartları",
          "ILR süreçleri",
          "Göç politikaları ve sponsor denetimleri",
        ],
      },
    ],
  },
];
