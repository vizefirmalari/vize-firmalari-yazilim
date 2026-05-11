import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const RUSYA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Rusya; geniş iş gücü piyasası, enerji–mühendislik sektörü, teknoloji alanındaki dönüşümü ve yabancı uzmanlara yönelik göç programları nedeniyle dikkat çeken ülkelerdendir. 2025–2026 döneminde çalışma vizeleri, temporary residence permit (TRP), permanent residence süreçleri ve yeni “skilled visa” modellerinde önemli değişiklikler yapılmıştır.",
  "Rusya Schengen Bölgesi üyesi değildir ve tamamen kendi ulusal vize–göç sistemini uygular. Jeopolitik yaptırımlar, ödeme kanalları ve banka erişimi hızlı değişebilir; başvuru öncesi resmî konsolosluk, MFA ve içişleri/migration duyurularını güncel doğrulayın. Bu metin özet rehberdir, hukuki tavsiye değildir.",
];

export const RUSYA_SEO_KEYWORD_TAGS: string[] = [
  "rusya vize",
  "rvp trp russia",
  "russia work permit",
  "vnzh permanent residence russia",
  "russian evisa",
  "migration registration russia",
  "moscow work visa",
  "skilled visa russia",
];

export const RUSYA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Vize, e-Visa ve Biyometri",
    lead:
      "Rusya ne AB ne Schengen üyesidir; giriş ve kalış ulusal vize ve izin kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Rusya Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir.",
          "Schengen vizesi ile Rusya’ya giriş yapılamaz; Rusya kendi ulusal vize sistemini uygular.",
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
          "İnsani amaçlı vize",
          "Özel davet vizesi",
          "D tipi uzun süreli residence süreçleri",
        ],
      },
      {
        title: "Elektronik vize sistemi",
        paragraphs: [
          "Rusya’nın bazı ülkeler için e-Visa uyguladığı ve başvuruların çoğu zaman çevrim içi yapılabildiği anlatılır; uygun ülke listesi ve süreleri resmî portaldan doğrulayın.",
        ],
      },
      {
        title: "Biyometrik kayıt zorunluluğu",
        paragraphs: [
          "Uzun süreli kalan yabancılar için parmak izi, biyometrik fotoğraf ve migration registration zorunlu hâle geldiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "RVP (TRP), VNZh ve Bölgesel Kota",
    lead:
      "Temel residence çizgisi Temporary Residence Permit (RVP / TRP) ile başlar; kalıcı ikamet ayrı başvurudur.",
    accordions: [
      {
        title: "Temporary Residence Permit (TRP / RVP)",
        paragraphs: [
          "Rusya’daki temel residence sisteminin Temporary Residence Permit (RVP / TRP) üzerinden başladığı anlatılır.",
        ],
      },
      {
        title: "TRP süresi",
        paragraphs: [
          "TRP’nin çoğu durumda üç yıl geçerli olduğu özetlenir; vize etiketi ve kayıt şartları profil bazında değişir.",
        ],
      },
      {
        title: "TRP şartları",
        paragraphs: ["Başlıca gerekliliklere örnekler:"],
        bullets: [
          "Göç kaydı",
          "Sağlık raporları",
          "Sabıka kaydı",
          "Dil / tarih bilgisi (bazı kategorilerde)",
          "Bölgesel kota sistemi",
        ],
      },
      {
        title: "Kota sistemi",
        paragraphs: [
          "Bazı başvuruların yıllık residence kotasına tabi olduğu; bazı kategorilerin kota dışı değerlendirilebildiği anlatılır.",
        ],
      },
      {
        title: "Permanent Residence Permit (VNZh)",
        paragraphs: [
          "TRP sonrasında Permanent Residence Permit başvurusu yapılabileceği özetlenir.",
        ],
      },
      {
        title: "2026 residence değişiklikleri",
        paragraphs: [
          "2025–2026 döneminde residence uzatma, migration registration ve temporary stay extension kurallarında yeni düzenlemeler yapıldığı raporlanmaktadır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "İkamet Sürekliliği ve Basitleştirilmiş Yollar",
    lead:
      "Vatandaşlık yolu TRP ve VNZh ile uzun süreli fiziksel bulunmaya bağlanır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Rusya vatandaşlığının genellikle temporary residence, permanent residence, uzun süreli fiziksel bulunma ve dil yeterliliği üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Basitleştirilmiş vatandaşlık yolları",
        paragraphs: [
          "Bazı kategorilerde Rus vatandaşı aile bağı, yatırım, yüksek nitelikli uzmanlık veya eski Sovyet bağlantılarının avantaj sağlayabildiği özetlenir; güncel kanun metni esas alınmalıdır.",
        ],
      },
      {
        title: "Fiziksel bulunma şartı",
        paragraphs: [
          "Vatandaşlık için çoğu zaman uzun süreli fiziksel ikamet arandığı vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Permit, Davetiye ve Skilled Visa",
    lead:
      "Çoğu yabancı çalışanda work permit, sponsor işveren ve çalışma vizesi birlikte zorunludur.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanlar için çoğu durumda work permit, sponsor işveren ve çalışma vizesinin zorunlu olduğu anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İşveren permit başvurusu yapar",
          "Davetiye düzenlenir",
          "Çalışma vizesi alınır",
          "Rusya’ya giriş yapılır",
          "Migration registration yapılır",
        ],
      },
      {
        title: "2026 skilled visa sistemi",
        paragraphs: [
          "2026 itibarıyla yeni Skilled Visa Route sisteminin duyurulduğu; amacın yüksek nitelikli uzman çekmek ve residence süreçlerini hızlandırmak olarak açıklandığı özetlenir — kapsamı resmî duyurulardan doğrulayın.",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Petrol ve gaz",
          "İnşaat",
          "IT",
          "Siber güvenlik ve yapay zekâ",
          "Savunma teknolojileri",
          "Tarım ve üretim",
          "Lojistik",
        ],
      },
      {
        title: "Permit düşüşleri",
        paragraphs: [
          "2026 başında migrant work permit sayılarında düşüş rapor edildiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler ve Platformlar",
    lead:
      "Moskova ve St. Petersburg başta olmak üzere bölgesel merkezler iş yoğunluğu taşır.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca iş merkezleri:"],
        bullets: ["Moskova", "St. Petersburg", "Kazan", "Novosibirsk", "Yekaterinburg"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["HeadHunter Russia", "SuperJob Russia", "Rabota Russia"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla bazı sektörlerde yabancı uzman açığı bulunduğu, migration denetimlerinin arttığı ve permit sisteminin daha kontrollü hâle geldiği özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Davetiye ve Kalış",
    lead:
      "Turistik girişte davetiye, otel rezervasyonu ve seyahat amacı istenebildiği anlatılır.",
    accordions: [
      {
        title: "Turistik vize sistemi",
        paragraphs: [
          "Rusya’ya turistik giriş için davetiye, otel rezervasyonu ve seyahat amacının istenebildiği özetlenir.",
        ],
      },
      {
        title: "Kalış süresi",
        paragraphs: [
          "Kalış süresinin vize türüne göre değiştiği belirtilir.",
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
      "Teknik ve deneyim odaklı CV kültürü yaygındır; Rusça yerel işverenlerde avantajdır.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Rusya’da teknik odaklı, detaylı ve deneyim merkezli CV’lerin yaygın olduğu anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: [
          "Uluslararası şirketlerde İngilizce kullanılabildiği; kamu, yerel şirketler ve teknik yönetimde Rusça’nın ciddi avantaj sağladığı özetlenir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Mühendislik, enerji ve IT hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Mühendislik", "Enerji", "IT", "Araştırma", "Dil eğitimi"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Teknik Meslek Eğitimi",
    lead:
      "Ağır sanayi ve mühendislik odaklı güçlü meslekî eğitim altyapısı vardır.",
    accordions: [
      {
        title: "Teknik eğitim sistemi",
        paragraphs: [
          "Rusya’nın mühendislik, ağır sanayi ve teknik üretim alanlarında güçlü meslekî eğitim altyapısına sahip olduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "AB Avantajı ve Migration Registration",
    lead:
      "Rusya AB/Schengen dışında olduğu için AB vatandaşlarına otomatik çalışma hakkı yoktur.",
    accordions: [
      {
        title: "AB avantajı yoktur",
        paragraphs: [
          "Rusya’nın Schengen/AB sistemi dışında olduğu için AB vatandaşlarının otomatik çalışma hakkına sahip olmadığı vurgulanır.",
        ],
      },
      {
        title: "Migration registration",
        paragraphs: [
          "Yabancıların migration registration yapmasının zorunlu olduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Şehir Bazlı Piyasa",
    lead:
      "Konut piyasası şehirlere göre büyük farklılık gösterir.",
    accordions: [
      {
        title: "Konut piyasası",
        paragraphs: [
          "Şehirlere göre büyük farklılıklar görüldüğü anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Moskova merkez stüdyo için yaklaşık 700–1800 USD+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["Cian Russia", "Avito Real Estate"],
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
        bullets: ["Maaş hakkı", "Sözleşme hakkı", "İş güvenliği"],
      },
      {
        title: "Remote çalışma",
        paragraphs: [
          "IT sektöründe remote çalışmanın yaygınlaştığı özetlenir.",
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
          "Rusya’nın mühendislik, matematik, fizik ve tıp alanlarında güçlü üniversitelere sahip olduğu özetlenir.",
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
    h2: "Jeopolitik, Davetiye ve Kayıt Riskleri",
    lead:
      "Yaptırımlar ve ödeme engelleri operasyonel risktir; sahte davetiye ve eksik migration kaydı ciddi sonuç doğurur.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "2026 itibarıyla yaptırımlar, finansal transfer sorunları, banka erişimleri ve uluslararası ödeme sistemlerinin önemli risk oluşturduğu anlatılır.",
          "“Garantili Rusya işi”, “hazır permit” veya “otomatik residence” vaatlerinin riskli olduğu vurgulanır.",
          "Migration registration zorunluluğunun kayıt eksikliğinde ciddi para cezası ve deport riskine yol açabildiği belirtilir.",
        ],
        callout: {
          variant: "warning",
          text: "Seyahat, bankacılık ve yaptırım listelerini başvurudan önce güncel resmî ve konsolosluk bilgileriyle doğrulayın.",
        },
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Russian eVisa Portal",
          "Ministry of Internal Affairs Russia",
          "HeadHunter Russia",
          "Russian Government Portal",
          "Ministry of Foreign Affairs Russia",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Skilled Visa sistemi",
          "Work permit düzenlemeleri",
          "Residence permit uzatmaları",
          "Migration registration kuralları",
          "Temporary stay süreleri",
          "Yabancı çalışan mevzuatı",
          "Vatandaşlık süreçleri",
        ],
      },
    ],
  },
];
