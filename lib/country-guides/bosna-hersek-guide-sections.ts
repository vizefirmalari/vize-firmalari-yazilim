import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const BOSNA_HERSEK_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Bosna-Hersek; Balkanlar’daki stratejik konumu, düşük yaşam maliyetleri, Avrupa’ya yakınlığı ve büyüyen yabancı iş gücü ihtiyacı nedeniyle son yıllarda dikkat çeken ülkelerden biri hâline gelmiştir. Schengen Bölgesi üyesi değildir ancak Avrupa ile yoğun ekonomik entegrasyon içindedir.",
  "2025–2026 döneminde work permit kotası, temporary residence permit sistemi, yabancı çalışan politikaları ve dijital başvuru altyapılarında önemli güncellemeler yapılmıştır. Kesin kota, formlar ve adres kaydı süreleri için Service for Foreigners’ Affairs, Dışişleri Bakanlığı ve Employment Agency duyurularını güncel doğrulayın.",
];

export const BOSNA_HERSEK_SEO_KEYWORD_TAGS: string[] = [
  "bosna hersek vize",
  "bosna hersek work permit",
  "temporary residence bosnia",
  "sarajevo work visa",
  "bosnia employment service permit",
  "bosna hersek d vizesi",
  "address registration bosnia foreigners",
  "mostar vize",
];

export const BOSNA_HERSEK_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Vize, C/D ve Türkiye Vatandaşları",
    lead:
      "Bosna-Hersek ne AB ne Schengen üyesidir; çalışma ve uzun kalış ayrı izin ve residence gerektirir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Bosna-Hersek Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir.",
          "Schengen vizesi Bosna-Hersek’te otomatik çalışma hakkı vermez; Bosna-Hersek kendi ulusal vize sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "C tipi kısa süreli vize",
          "D tipi uzun süreli vize",
          "Çalışma vizesi",
          "Eğitim vizesi",
          "Ticari vize",
          "Aile birleşimi vizesi",
        ],
      },
      {
        title: "Türkiye vatandaşları için durum",
        paragraphs: [
          "Türkiye Cumhuriyeti vatandaşlarının belirli sürelerle vizesiz giriş avantajına sahip olabildiği anlatılır.",
          "Çalışma, residence ve uzun süreli kalış için ayrıca izin alınması gerektiği vurgulanır.",
        ],
      },
      {
        title: "90/180 gün kuralı",
        paragraphs: [
          "Kısa süreli kalışlarda çoğu zaman yüz seksen gün içinde maksimum doksan gün kuralının uygulanabildiği özetlenir; vatandaşlık ve muafiyet durumuna göre değişir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Temporary Residence ve Adres Kaydı",
    lead:
      "Uzun süreli yaşam çoğunlukla temporary residence permit ile yürür; adres kaydı zorunludur.",
    accordions: [
      {
        title: "Temporary residence permit sistemi",
        paragraphs: [
          "Bosna-Hersek’te uzun süreli yaşamın çoğunlukla temporary residence permit üzerinden ilerlediği anlatılır.",
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
          "Finansal bağımsız yaşam",
          "Gayrimenkul bağlantısı",
          "İnsani nedenler",
        ],
      },
      {
        title: "Residence süresi",
        paragraphs: [
          "Temporary residence’ın çoğu durumda bir yıl olarak düzenlendiği ve yenilenebildiği anlatılır.",
        ],
      },
      {
        title: "Başvuru sistemi",
        paragraphs: [
          "İlk residence başvurusunun çoğu zaman ülke dışından Bosna-Hersek konsolosluğu üzerinden başlatıldığı; bazı durumlarda ülke içinde başvuru yapılabildiği özetlenir.",
        ],
      },
      {
        title: "Gerekli belgeler",
        paragraphs: ["Başlıca belge başlıkları:"],
        bullets: [
          "Pasaport",
          "Konut kanıtı",
          "Sağlık sigortası",
          "Finansal yeterlilik",
          "Sabıka kaydı",
          "Çalışma sözleşmesi / eğitim kabulü",
        ],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Uzun süreli yasal residence sonrası permanent residence başvurusu yapılabildiği anlatılır.",
          "Genellikle beş yıl kesintisiz yasal kalış arandığı özetlenir.",
        ],
      },
      {
        title: "Address registration zorunluluğu",
        paragraphs: [
          "Bosna-Hersek’te yabancıların adres kaydı yaptırmasının zorunlu olduğu belirtilir.",
          "Özellikle özel konutta kalan yabancıların kısa süre içinde kayıt yaptırması gerektiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Kayıt gecikmesi para cezası, permit sorunu veya residence reddi riskine yol açabilir.",
        },
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "TRP → PR → Vatandaşlık",
    lead:
      "Vatandaşlık yolu temporary ve permanent residence ile tanımlanır; çifte vatandaşlık anlaşmalara bağlıdır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Bosna-Hersek vatandaşlığının genellikle temporary residence, permanent residence, fiziksel bulunma, entegrasyon ve temiz sicil unsurlarıyla ilerlediği anlatılır.",
        ],
      },
      {
        title: "Vatandaşlık yolu",
        paragraphs: [
          "Tipik sürecin temporary residence → permanent residence → citizenship şeklinde ilerlediği özetlenir.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Çifte vatandaşlığın bazı ülkelerle yapılan anlaşmalara göre değişebildiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Permit, Employment Service ve 2026 Kota",
    lead:
      "Çoğu yabancı çalışanda işveren sponsorluğu, work permit ve residence birlikte gereklidir.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Bosna-Hersek’te yabancı çalışanların çoğu için work permit, employer sponsorship ve residence permit gerektiği anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İşveren permit başvurusu yapar",
          "Employment Service onayı alınır",
          "D tipi vize alınır",
          "Temporary residence başvurusu yapılır",
          "Residence card düzenlenir",
        ],
      },
      {
        title: "Work permit süresi",
        paragraphs: [
          "Work permit’in çoğu zaman maksimum bir yıl geçerli olduğu anlatılır.",
        ],
      },
      {
        title: "2026 work permit kotası",
        paragraphs: [
          "2026 için Bosna-Hersek’te toplam 7.427 work permit kotasının açıklandığı raporlanmaktadır.",
        ],
      },
      {
        title: "Kota dağılımı",
        paragraphs: [
          "2026 kotasında 5.077 yeni çalışma izni ve 2.350 uzatma izninin planlandığı özetlenmektedir.",
        ],
        callout: {
          variant: "info",
          text: "Kota ve sektör dağılımı yıllık kararnamelerle güncellenir; Employment Agency resmî duyurusunu takip edin.",
        },
      },
      {
        title: "En fazla permit verilen sektörler",
        paragraphs: ["Başlıca sektörlere örnekler:"],
        bullets: ["İnşaat", "Üretim", "Otelcilik", "Hizmet sektörü", "Turizm", "Lojistik"],
      },
      {
        title: "Kota dışı çalışanlar",
        paragraphs: [
          "Bazı kategorilerin work permit kotası dışında değerlendirilebildiği anlatılır; örnek gruplar:",
        ],
        bullets: [
          "Yüksek eğitimli uzmanlar",
          "Doktora mezunları",
          "Uluslararası anlaşmalı çalışanlar",
          "Belirli akademik pozisyonlar",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler ve İş Arama Kanalları",
    lead:
      "Saraybosna başlıca ekonomik merkezdir; inşaat ve hizmet sektöründe iş gücü açığı raporlanmaktadır.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca ekonomik merkezler:"],
        bullets: ["Saraybosna", "Banja Luka", "Mostar", "Tuzla", "Zenica"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["MojPosao Bosnia", "Posao Bosnia", "LinkedIn"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2025–2026 döneminde yabancı iş gücü ihtiyacının büyüdüğü, permit sayılarının arttığı ve özellikle inşaat ile hizmet sektörlerinde iş açığı oluştuğu özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "C Vizesi ve Kısa Kalış",
    lead:
      "Turistik girişlerde C tipi kısa süreli vize uygulanır; turistik vize çalışma veya residence sağlamaz.",
    accordions: [
      {
        title: "Kısa süreli giriş sistemi",
        paragraphs: [
          "Turistik girişlerde C tipi kısa süreli vizenin uygulandığı anlatılır.",
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
      "Sade, deneyim odaklı ve Avrupa standartlarına yakın CV’ler tercih edilir.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Bosna-Hersek’te sade, deneyim odaklı ve Avrupa standartlarına yakın CV’lerin tercih edildiği anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: ["Başlıca kullanılan dillere örnekler:"],
        bullets: [
          "Boşnakça",
          "Sırpça",
          "Hırvatça",
          "İngilizce (turizm, IT ve uluslararası şirketlerde avantaj)",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Turizm, mühendislik ve lojistik hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Turizm", "Mühendislik", "Yazılım", "Üretim", "Lojistik"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Teknik ve İşyeri Eğitimi",
    lead:
      "Meslek liseleri ve işyeri uygulamalı modeller inşaat ve sanayide önemlidir.",
    accordions: [
      {
        title: "Mesleki çıraklık (DYPA benzeri sistemler)",
        paragraphs: [
          "Bosna-Hersek’te teknik eğitim, meslek liseleri ve işyeri uygulamalı eğitim modellerinin bulunduğu anlatılır.",
          "Özellikle inşaat, sanayi ve teknik bakım alanlarında meslekî eğitimin önemli olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "AB Avantajı ve Kayıt",
    lead:
      "AB üyeliği olmadığı için otomatik çalışma hakkı yoktur; uzun kalışta kayıt zorunludur.",
    accordions: [
      {
        title: "AB avantajı sınırlıdır",
        paragraphs: [
          "Bosna-Hersek AB üyesi olmadığı için AB vatandaşlarının otomatik çalışma hakkına sahip olmadığı vurgulanır.",
        ],
      },
      {
        title: "Registration sistemi",
        paragraphs: [
          "Uzun süre kalan yabancıların adres kaydı, migration kayıtları ve residence işlemlerini tamamlaması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Yaşam Maliyeti ve Kiralama",
    lead:
      "Batı Avrupa’ya göre görece düşük yaşam maliyeti ve başkentte kira bandı vardır.",
    accordions: [
      {
        title: "Görece düşük yaşam maliyeti",
        paragraphs: [
          "Bosna-Hersek’in Batı Avrupa’ya göre daha düşük yaşam maliyetine sahip olduğu anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Saraybosna merkez stüdyo için yaklaşık 300–850 EUR+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["OLX Bosnia Real Estate", "Nekretnine Bosnia"],
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
          "Genellikle haftalık kırk saat uygulandığı anlatılır.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal olarak korunan başlıklar:"],
        bullets: ["Maaş", "Sözleşme", "İzin", "İş güvenliği"],
      },
      {
        title: "Remote çalışma",
        paragraphs: [
          "IT ve hizmet sektörlerinde uzaktan çalışmanın yaygınlaştığı özetlenir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve Eğitim",
    lead:
      "Residence süreçlerinde sağlık sigortası çoğu zaman zorunludur; teknik ve sağlık eğitimi güçlenmektedir.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Kamu ve özel sağlık sisteminin birlikte çalıştığı anlatılır.",
          "Residence süreçlerinde sağlık sigortasının çoğu zaman zorunlu olduğu vurgulanır.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "Bosna-Hersek’in mühendislik, teknik eğitim, sağlık ve turizm alanlarında bölgesel eğitim merkezlerinden biri olmaya çalıştığı özetlenir.",
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
        bullets: ["Sosyal destek", "İş uyarlamaları", "Rehabilitasyon", "Kamu destekli istihdam programları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Permit, İşveren ve Adres Kaydı",
    lead:
      "Sahte danışmanlık ve eksik adres kaydı ciddi sonuç doğurur; çalışma izni işverene bağlıdır.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Bosna işi”, “hazır work permit” veya “kesin residence” vaatlerinin riskli olduğu vurgulanır.",
          "Çalışma izinlerinin çoğu zaman belirli işveren ve belirli pozisyon ile bağlantılı olduğu; iş değişikliğinin yeni süreç gerektirebildiği anlatılır.",
          "Adres kaydı yapılmamasının para cezası, permit problemi veya residence reddi riskine yol açabildiği belirtilir.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Service for Foreigners’ Affairs Bosnia and Herzegovina",
          "Ministry of Civil Affairs Bosnia and Herzegovina",
          "Ministry of Foreign Affairs Bosnia and Herzegovina",
          "Employment Agency of Bosnia and Herzegovina",
          "Bosnia and Herzegovina eVisa Information",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Work permit kotası",
          "Temporary residence sistemi",
          "Online residence başvuruları",
          "Yabancı çalışan mevzuatı",
          "Address registration kuralları",
          "D tipi vize süreçleri",
          "Labour shortage politikaları",
        ],
      },
    ],
  },
];
