import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const BELARUS_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Belarus; Rusya ile yakın entegrasyonu, görece düşük yaşam maliyetleri, üretim ve teknik iş gücü ihtiyacı nedeniyle son yıllarda dikkat çeken Doğu Avrupa ülkelerindendir. Schengen Bölgesi üyesi değildir ve tamamen kendi ulusal göç sistemini uygular.",
  "2025–2026 döneminde work permit, temporary residence permit, Rusya–Belarus ortak vize sistemi ve migration registration kurallarında önemli değişiklikler yapılmıştır. Kesin şartlar ve sınır uygulamaları için Dışişleri Bakanlığı, e-Visa portalı ve Citizenship and Migration Department duyurularını güncel doğrulayın.",
];

export const BELARUS_SEO_KEYWORD_TAGS: string[] = [
  "belarus vize",
  "belarus evisa",
  "special work permit belarus",
  "temporary residence belarus",
  "minsk work visa",
  "russia belarus mutual visa",
  "migration registration belarus",
  "rabota belarus",
];

export const BELARUS_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Vize, e-Visa ve Rusya–Belarus Ortak Sistem",
    lead:
      "Belarus ne AB ne Schengen üyesidir; giriş ulusal vize veya muafiyet kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Belarus Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir.",
          "Schengen vizesi Belarus’ta geçerli değildir; Belarus kendi ulusal vize sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "Turistik vize",
          "Ticari vize",
          "Çalışma vizesi",
          "Öğrenci vizesi",
          "D tipi uzun süreli vize",
          "Transit vize",
        ],
      },
      {
        title: "E-vize sistemi",
        paragraphs: [
          "Belarus’un bazı kısa süreli girişlerde elektronik vize (e-Visa) uyguladığı anlatılır; uygun ülkeler ve süreler resmî portaldan doğrulanmalıdır.",
        ],
      },
      {
        title: "2026 Rusya–Belarus ortak vize sistemi",
        paragraphs: [
          "2025 sonrası dönemde Rusya ve Belarus arasında karşılıklı vize tanıma sisteminin uygulamaya alındığı raporlanmaktadır.",
          "Belirli durumlarda geçerli Rusya vizesinin Belarus erişiminde avantaj sağlayabildiği özetlenir; giriş noktası, kara sınırı ve vize kapsamı karmaşık olabilir — resmî açıklamaları takip edin.",
        ],
        callout: {
          variant: "warning",
          text: "Ortak sistemde geçerli vize türü ve giriş kapısı (ör. havaalanı / kara) için güncel MFA ve sınır duyurularını başvurudan önce kontrol edin.",
        },
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Temporary Residence ve Migration Registration",
    lead:
      "Temel residence çizgisi temporary residence permit (sojourn permit) ile yürütülür; kayıt zorunluluğu kritiktir.",
    accordions: [
      {
        title: "Temporary residence permit",
        paragraphs: [
          "Belarus’ta yabancıların temel residence sisteminin temporary residence permit (sojourn permit) üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Başlıca residence nedenleri",
        paragraphs: ["Sık görülen gerekçe başlıkları:"],
        bullets: [
          "Çalışma",
          "Eğitim",
          "Aile birleşimi",
          "Şirket faaliyetleri",
          "Uzun süreli ticari faaliyetler",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "D tipi uzun süreli vize alınır",
          "Belarus’a giriş yapılır",
          "Citizenship and Migration Department başvurusu yapılır",
          "Residence permit düzenlenir",
        ],
      },
      {
        title: "Migration registration",
        paragraphs: [
          "Uzun süreli kalan yabancıların adres kaydı ve migration registration işlemlerini yapmasının zorunlu olduğu vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun İkamet ve Kalıcı İkamet Öncesi",
    lead:
      "Vatandaşlık yolu uzun residence ve süreklilikle tanımlanır; çifte vatandaşlık sınırlı uygulanabilir.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Belarus vatandaşlığının genellikle uzun süreli residence, sürekli fiziksel bulunma, dil ve entegrasyon ile temiz sicil unsurlarıyla ilerlediği anlatılır.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Çifte vatandaşlık konusunun sınırlı ve karmaşık şekilde uygulanabildiği belirtilir.",
        ],
      },
      {
        title: "Uzun dönem residence",
        paragraphs: [
          "Vatandaşlık öncesinde çoğu zaman permanent residence gerektiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Special Work Permit ve Sponsor Uyumu",
    lead:
      "Çoğu yabancı çalışanda special work permit, sponsor işveren ve çalışma vizesi birlikte gereklidir.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanların çoğu için special work permit, sponsor işveren ve çalışma vizesi gerektiği anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İşveren permit başvurusu yapar",
          "Special work permit alınır",
          "D tipi çalışma vizesi alınır",
          "Belarus’a giriş yapılır",
          "Residence permit işlemleri tamamlanır",
        ],
      },
      {
        title: "Permit süreleri",
        paragraphs: [
          "Work permit’in çoğu zaman bir yıl geçerli olduğu; bazı yüksek nitelikli çalışanlar için iki yıla kadar uygulanabildiği özetlenir.",
        ],
      },
      {
        title: "2025–2026 yeni düzenlemeleri",
        paragraphs: [
          "2025 sonrası dönemde yabancı çalışan sponsorluğu, employer compliance ve temporary resident denetimlerinin arttığı raporlanmaktadır.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Üretim ve inşaat",
          "Lojistik ve tarım",
          "IT ve teknik bakım",
          "Kaynakçılık",
          "Depo operasyonları",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Dil",
    lead:
      "Minsk başlıca ekonomik merkezdir; Rusça iş piyasasında güçlü avantajdır.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca ekonomik merkezler:"],
        bullets: ["Minsk", "Gomel", "Brest", "Grodno", "Vitebsk"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Rabota Belarus", "Belmeta Jobs", "Praca Belarus"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla düşük maliyetli iş gücü talebinin sürdüğü, yabancı çalışan denetimlerinin arttığı ve Rusça bilgisinin büyük avantaj sağladığı özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "C Vizesi, e-Visa ve Havalimanı Muafiyetleri",
    lead:
      "Turistik girişte C tipi vize, e-Visa veya belirli ülkeler için vizesiz seçenekler anlatılır.",
    accordions: [
      {
        title: "Turistik giriş sistemi",
        paragraphs: [
          "Belarus’a turistik girişlerde kısa süreli C tipi vize, e-Visa veya belirli ülkeler için vizesiz giriş uygulanabildiği özetlenir.",
        ],
      },
      {
        title: "Havalimanı giriş sistemi",
        paragraphs: [
          "Bazı ülke vatandaşlarının Minsk National Airport üzerinden vizesiz kısa süreli giriş yapabildiği anlatılır; güncel ülke listesi ve süreleri resmî kaynaklardan doğrulayın.",
        ],
      },
      {
        title: "Kritik gerçek",
        paragraphs: [
          "Turistik vizenin çalışma hakkı vermediği ve residence hakkı sağlamadığı vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV ve Dil",
    lead:
      "Teknik ve deneyim odaklı CV kültürü yaygındır.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Belarus’ta teknik, deneyim odaklı ve detaylı CV’lerin yaygın olduğu anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: [
          "Rusça’nın iş piyasasında çok büyük avantaj sağladığı; İngilizcenin yalnızca bazı IT ve uluslararası şirketlerde yeterli olabildiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Mühendislik, üretim ve yazılım hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Mühendislik", "Üretim", "Yazılım", "Teknik bakım"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Teknik Meslek Eğitimi",
    lead:
      "Sanayi ve üretim odaklı güçlü meslekî eğitim altyapısı vardır.",
    accordions: [
      {
        title: "Teknik eğitim sistemi",
        paragraphs: [
          "Belarus’un sanayi, üretim ve teknik eğitim alanlarında güçlü meslekî eğitim altyapısına sahip olduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "AB Avantajı Yokluğu ve Kayıt",
    lead:
      "Belarus AB dışında olduğu için otomatik çalışma hakkı yoktur.",
    accordions: [
      {
        title: "AB avantajı yoktur",
        paragraphs: [
          "Belarus’un AB sistemi dışında olduğu için AB vatandaşlarının otomatik çalışma hakkına sahip olmadığı vurgulanır.",
        ],
      },
      {
        title: "Registration zorunluluğu",
        paragraphs: [
          "Uzun süre kalan yabancıların migration registration işlemlerini yapması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Yaşam Maliyeti ve Kiralama",
    lead:
      "Batı Avrupa’ya göre görece düşük yaşam maliyeti ve şehir bazlı kira farkları vardır.",
    accordions: [
      {
        title: "Görece düşük yaşam maliyeti",
        paragraphs: [
          "Belarus’un Batı Avrupa’ya göre daha düşük yaşam maliyetine sahip olduğu anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Minsk merkez stüdyo için yaklaşık 300–800 USD+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["Realt Belarus", "Kufar Real Estate"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Haklar ve Remote",
    lead:
      "Haftalık çalışma süresi ve remote düzen sektöre göre değişir.",
    accordions: [
      {
        title: "Standart çalışma sistemi",
        paragraphs: [
          "Genellikle haftalık 40 saat uygulandığı anlatılır.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal olarak korunan başlıklar:"],
        bullets: ["Maaş", "Sözleşme", "İş güvenliği"],
      },
      {
        title: "Remote çalışma",
        paragraphs: [
          "IT sektöründe uzaktan çalışma modellerinin bulunduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve Üniversiteler",
    lead:
      "Kamu ve özel sağlık birlikte çalışır; STEM eğitimi güçlüdür.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Kamu ve özel sağlık sisteminin birlikte çalıştığı anlatılır.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "Belarus’un mühendislik, matematik ve teknik eğitim alanlarında güçlü üniversitelere sahip olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "engelli-istihdam",
    tocLabel: "Engelli istihdamı",
    h2: "Yasal Koruma ve Destekler",
    lead:
      "Engelli bireylerin çalışma hakları yasal koruma altındadır.",
    accordions: [
      {
        title: "Yasal koruma",
        paragraphs: [
          "Engelli bireylerin çalışma haklarının yasal koruma altında olduğu anlatılır.",
        ],
      },
      {
        title: "Destek sistemleri",
        paragraphs: ["Uygulanabilen destek türlerine örnekler:"],
        bullets: ["Rehabilitasyon", "Sosyal destek", "İş uyarlamaları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Permit, Kayıt ve Ortak Vize Riskleri",
    lead:
      "Sahte danışmanlık ve eksik migration kaydı ciddi sonuç doğurur.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Belarus işi”, “hazır work permit” veya “otomatik residence” vaatlerinin riskli olduğu vurgulanır.",
          "Migration registration eksikliğinin para cezası, deport veya permit iptali riskine yol açabildiği anlatılır.",
          "2025 sonrası Rusya–Belarus ortak vize sistemi nedeniyle giriş noktaları, kara sınırı kuralları ve geçerli vize kapsamının karmaşık hâle gelebildiği belirtilir.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Belarus Ministry of Foreign Affairs",
          "Belarus eVisa Portal",
          "Citizenship and Migration Department Belarus",
          "Rabota Belarus",
          "Belarus Government Portal",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Work permit sistemi",
          "Temporary residence kuralları",
          "Migration registration prosedürleri",
          "Rusya–Belarus ortak vize sistemi",
          "Yabancı çalışan mevzuatı",
          "Sınır politikaları",
          "Temporary stay uzatma süreçleri",
        ],
      },
    ],
  },
];
