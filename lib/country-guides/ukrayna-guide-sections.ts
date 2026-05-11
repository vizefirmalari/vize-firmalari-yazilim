import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const UKRAYNA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Ukrayna; savaş, geçici koruma uygulamaları, yeniden yapılanma süreci ve değişen göç mevzuatı nedeniyle Avrupa’daki en dinamik göç ve residence sistemlerinden birine dönüşmüştür. 2025–2026 döneminde temporary residence permit, çalışma izinleri, savaş dönemi uzatma düzenlemeleri ve yabancı çalışan mevzuatında önemli değişiklikler yapılmıştır.",
  "Ukrayna Schengen Bölgesi üyesi değildir ve kendi ulusal göç sistemini uygular. Güvenlik, sınır ve seyahat kuralları hızlı değişebilir; başvuru öncesi State Migration Service, Dışişleri Bakanlığı ve resmî seyahat bilgilendirmelerini mutlaka güncel doğrulayın. Bu metin özet rehberdir, hukuki tavsiye değildir.",
];

export const UKRAYNA_SEO_KEYWORD_TAGS: string[] = [
  "ukrayna vize",
  "temporary residence permit ukraine",
  "ukraine work permit",
  "d visa ukraine",
  "state migration service ukraine",
  "kyiv residence permit",
  "visit ukraine",
  "ukraine c visa",
];

export const UKRAYNA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Schengen Dışı Ulusal Vize ve Savaş Dönemi Düzenlemeleri",
    lead:
      "Ukrayna ne AB ne Schengen üyesidir; giriş ve kalış ulusal vize ve izin kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Ukrayna Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir.",
          "Schengen vizesi Ukrayna’da geçerli değildir; Ukrayna kendi ulusal vize sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "C tipi kısa süreli vize",
          "D tipi uzun süreli vize",
          "Çalışma temelli D vizesi",
          "Eğitim vizesi",
          "Aile birleşimi vizesi",
          "Gönüllülük ve insani faaliyet vizeleri",
        ],
      },
      {
        title: "D tipi vize",
        paragraphs: [
          "Uzun süreli residence için çoğu durumda D tipi ulusal vize gerektiği anlatılır; vize etiketi ve süreler başvuru profiline göre değişir.",
        ],
      },
      {
        title: "Kritik savaş dönemi düzenlemeleri",
        paragraphs: [
          "2026 itibarıyla savaş nedeniyle uzatılmış residence ve permit süreçlerinin kademeli olarak yeniden sıkılaştırıldığı raporlanmaktadır; güncel istisna ve uzatma metinlerini resmî kaynaklardan takip edin.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Temporary Residence Permit (TRP) ve Kalıcı İkamet",
    lead:
      "Yabancıların temel residence çizgisi Temporary Residence Permit (TRP) üzerinden işler; süre ve yenileme kritiktir.",
    accordions: [
      {
        title: "Temporary Residence Permit (TRP)",
        paragraphs: [
          "Ukrayna’da yabancıların temel residence sisteminin Temporary Residence Permit (TRP) üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Başlıca residence nedenleri",
        paragraphs: ["Sık görülen gerekçe başlıkları:"],
        bullets: [
          "Çalışma",
          "Eğitim",
          "Evlilik",
          "Şirket kurma",
          "Gönüllülük faaliyetleri",
          "Dinî faaliyetler",
          "Aile birleşimi",
        ],
      },
      {
        title: "Başvuru süreci",
        paragraphs: ["Genellikle anlatılan adımların özeti:"],
        bullets: [
          "D tipi vize alınması",
          "Ukrayna’ya giriş",
          "15 iş günü içinde residence başvurusu",
          "State Migration Service işlemleri",
        ],
      },
      {
        title: "2026 residence değişiklikleri",
        paragraphs: [
          "2026 itibarıyla süresi dolmuş temporary permitlerle kalışın ciddi risk oluşturduğu ve eski savaş dönemi esnekliklerinin büyük ölçüde azaltıldığı özetlenmektedir.",
        ],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Belirli koşullarda permanent residence permit alınabildiği anlatılır.",
          "Bazı kategoriler için göç kotası, uzun süreli residence, yatırım veya aile bağının önemli olduğu vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun İkamet, Dil ve Süreklilik",
    lead:
      "Vatandaşlık yolu uzun residence ve entegrasyonla tanımlanır; çifte vatandaşlık mevzuatı değişkendir.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Ukrayna vatandaşlığının genellikle uzun süreli residence, dil yeterliliği, entegrasyon ve yasal ikamet unsurlarıyla ilerlediği anlatılır.",
        ],
      },
      {
        title: "Çifte vatandaşlık konusu",
        paragraphs: [
          "Ukrayna’da çifte vatandaşlık konusunun uzun süredir tartışmalı olduğu ve mevzuatın zaman zaman değişiklik gösterebildiği belirtilir.",
        ],
      },
      {
        title: "Süreklilik şartı",
        paragraphs: [
          "Uzun dönem residence hesaplamalarında ülkede fiziksel bulunma süresinin önemli olduğu vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Permit ve Ücret Kategorileri",
    lead:
      "Yabancı çalışanların çoğunda resmî work permit zorunludur; işveren başvurusu tipik akıştır.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanların çoğu için resmî work permit zorunlu olduğu anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İşveren work permit başvurusu yapar",
          "Permit alınır",
          "D tipi vize alınır",
          "Temporary residence başvurusu yapılır",
        ],
      },
      {
        title: "2026 permit ücretleri",
        paragraphs: [
          "Permit ücretlerinin süreye göre değiştiği ve örneğin altı aya kadar, bir yıl, iki yıl üstü veya üç yıl gibi kategorilere göre farklı devlet harçlarının uygulanabildiği özetlenir; güncel tarife tablosunu resmî kaynaklardan doğrulayın.",
        ],
      },
      {
        title: "İş gücü alanları",
        paragraphs: ["Talebin yoğun olduğu alanlara örnekler:"],
        bullets: [
          "IT",
          "İnşaat ve yeniden yapılanma projeleri",
          "Lojistik",
          "İnsani yardım",
          "Tarım ve üretim",
          "Güvenlik teknolojileri",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Piyasa ve Platformlar",
    lead:
      "Kyiv, Lviv, Odesa ve Dnipro başlıca merkezlerdir; savaş koşulları ekonomik dağılımı değişken kılar.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: [
          "Başlıca ekonomik merkezler Kyiv, Lviv, Odesa ve Dnipro olarak anlatılır; savaş nedeniyle ekonomik dağılımın değişkenlik gösterebildiği eklenir.",
        ],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla iş piyasasının savaş koşullarından etkilendiği, yeniden yapılanma odaklı büyüdüğü ve yabancı uzman ihtiyacının belirli alanlarda sürdüğü özetlenmektedir.",
        ],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Work.ua", "Rabota.ua", "Visit Ukraine"],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Süreli Giriş ve Güvenlik",
    lead:
      "Kısa süreli girişlerde C tipi ulusal giriş sistemi uygulanabildiği anlatılır.",
    accordions: [
      {
        title: "Kısa süreli giriş",
        paragraphs: [
          "Kısa süreli girişlerde C tipi ulusal giriş sisteminin uygulanabildiği özetlenir.",
        ],
      },
      {
        title: "Kritik gerçek",
        paragraphs: [
          "Savaş dönemi nedeniyle güvenlik durumları, giriş prosedürleri ve sınır politikalarının hızlı şekilde değişebildiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Seyahat öncesi güvenlik uyarıları, hava sahası, sınır kapıları ve sigorta şartlarını güncel resmî kaynaklardan kontrol edin.",
        },
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV ve Teknik Sektörler",
    lead:
      "Uluslararası şirketlerde İngilizce CV yaygındır; IT ve yeniden yapılanma alanlarında uzman talebi anlatılır.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Uluslararası şirketlerde İngilizce CV’nin yaygın kullanıldığı anlatılır.",
        ],
      },
      {
        title: "Teknik sektörler",
        paragraphs: [
          "Özellikle yazılım, siber güvenlik ve yeniden yapılanma mühendisliği alanlarında yabancı uzman ihtiyacının bulunduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Teknoloji, insani yardım ve uluslararası STK hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Teknoloji", "İnsani yardım", "Mühendislik", "Medya", "Uluslararası STK’lar"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "İşyeri Eğitimi ve Teknik Modeller",
    lead:
      "Bazı teknik sektörlerde işyeri eğitimi ve apprenticeship benzeri modeller uygulanabildiği anlatılır.",
    accordions: [
      {
        title: "Teknik eğitim",
        paragraphs: [
          "Bazı teknik sektörlerde işyeri eğitimi ve teknik apprenticeship benzeri modellerin uygulanabildiği özetlenir; program adı ve vize uygunluğu rol bazında değişir.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "Avantajlar ve Migration Kaydı",
    lead:
      "Bazı residence ve giriş süreçlerinde AB vatandaşlarının daha avantajlı olabildiği anlatılır.",
    accordions: [
      {
        title: "AB vatandaşları avantajı",
        paragraphs: [
          "Bazı residence ve giriş süreçlerinde AB vatandaşlarının daha avantajlı olabildiği özetlenir; kişisel durum için resmî metin esas alınmalıdır.",
        ],
      },
      {
        title: "Kayıt sistemi",
        paragraphs: [
          "Residence alan yabancıların adres kaydı ve migration service kaydı yapması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Değişken Piyasa ve Kiralama Siteleri",
    lead:
      "Savaş nedeniyle konut piyasası şehirlere göre ciddi farklılık gösterir.",
    accordions: [
      {
        title: "Değişken konut piyasası",
        paragraphs: [
          "Savaş nedeniyle konut piyasasının şehirlere göre ciddi değişiklik gösterdiği anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Kyiv merkez stüdyo için yaklaşık 350–900 USD+ gibi geniş aralıkların görülebildiği özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["LUN Ukraine", "OLX Ukraine Real Estate"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Haklar ve Uzaktan Çalışma",
    lead:
      "Çalışma koşulları savaş nedeniyle dönemsel değişiklik gösterebilir; temel haklar yasayla korunur.",
    accordions: [
      {
        title: "Standart çalışma sistemi",
        paragraphs: [
          "Çalışma koşullarının savaş nedeniyle dönemsel değişiklikler gösterebildiği anlatılır.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal olarak korunan başlıklar:"],
        bullets: ["Maaş hakkı", "İş güvenliği", "Sözleşme hakları"],
      },
      {
        title: "Uzaktan çalışma",
        paragraphs: [
          "IT sektöründe remote çalışmanın yaygınlığını koruduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve Üniversiteler",
    lead:
      "Kamu ve özel sağlık birlikte çalışır; mühendislik ve tıp eğitimi güçlü üniversitelerle ilişkilendirilir.",
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
          "Ukrayna’nın özellikle mühendislik, tıp ve teknik eğitim alanlarında güçlü üniversitelere sahip olduğu özetlenir.",
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
        bullets: ["İş uyarlamaları", "Sosyal destekler", "Rehabilitasyon hizmetleri"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Güvenilir Bilgi ve Permit Riskleri",
    lead:
      "Güvenlik ve sahte danışmanlık riskleri yüksektir; permit yenilemeleri kritik önem taşır.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "Savaş nedeniyle güvenlik durumu, bölgesel riskler, ulaşım ve elektrik altyapısının değişkenlik gösterebildiği anlatılır.",
          "“Garantili Ukrayna residence”, “hazır permit” veya “otomatik vatandaşlık” vaatlerinin riskli olduğu vurgulanır.",
          "2026 itibarıyla süresi dolmuş permitlerle kalışın ciddi risk oluşturduğu tekrarlanır.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "State Migration Service of Ukraine",
          "Visit Ukraine Today",
          "Ministry of Foreign Affairs of Ukraine",
          "Work.ua",
          "Ukrainian Government Portal",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Temporary residence permit kuralları",
          "Work permit ücretleri",
          "D tipi vize süreçleri",
          "Savaş dönemi göç düzenlemeleri",
          "Residence uzatma prosedürleri",
          "Yabancı çalışan mevzuatı",
          "Güvenlik ve seyahat politikaları",
        ],
      },
    ],
  },
];
