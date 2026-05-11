import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const KARADAG_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Karadağ; Adriyatik kıyıları, düşük yaşam maliyetleri, yatırım ve şirket kurulumuna dayalı residence modelleri, dijital göçebe sistemi ve Avrupa Birliği aday ülke statüsü nedeniyle son yıllarda Balkanlar’daki en dikkat çeken göç merkezlerinden biri hâline gelmiştir. Schengen Bölgesi üyesi değildir ancak Avrupa ile yoğun entegrasyon içindedir.",
  "2025–2026 döneminde dijital göçebe residence sistemi, yabancı çalışan permitleri, temporary residence süreçleri ve sınır politikalarında önemli değişiklikler yapılmıştır. Özellikle Türkiye vatandaşlarına yönelik vizesiz rejimde geçici askıya alma dönemleri yaşanabildiği için giriş kurallarını Government of Montenegro – Visas ve Ministry of Interior duyurularından güncel doğrulayın.",
];

export const KARADAG_SEO_KEYWORD_TAGS: string[] = [
  "karadağ vize",
  "montenegro digital nomad",
  "privremeni boravak",
  "montenegro temporary residence",
  "podgorica residence",
  "montenegro work permit",
  "turkey visa free montenegro",
  "invest in montenegro",
];

export const KARADAG_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Giriş, C/D ve Yabancı İzin Avantajları",
    lead:
      "Karadağ ne AB ne Schengen üyesidir; çalışma ve uzun kalış kendi residence ve permit sistemine tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Karadağ Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir ve kendi ulusal göç sistemini uygular.",
          "Schengen vizesi Karadağ’da otomatik çalışma hakkı vermez; Karadağ kendi ulusal giriş ve residence sistemini uygular.",
        ],
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "C tipi kısa süreli vize",
          "D tipi uzun süreli vize",
          "Çalışma temelli residence",
          "Dijital göçebe residence",
          "Şirket kurulumuna bağlı residence",
          "Aile birleşimi",
          "Eğitim residence sistemi",
        ],
      },
      {
        title: "Türkiye vatandaşları için kritik değişiklik",
        paragraphs: [
          "2025 sonrasında Karadağ’ın Türkiye vatandaşlarına yönelik vizesiz rejimi geçici olarak askıya aldığı dönemler yaşanmıştır.",
          "Bu nedenle güncel giriş kurallarının mutlaka resmî kaynaklardan kontrol edilmesi gerektiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Seyahatten önce MFA / konsolosluk ve sınır polisi duyurularını tekrar okuyun; kısa süreli muafiyetler hızlı değişebilir.",
        },
      },
      {
        title: "Schengen / ABD / İngiltere residence avantajı",
        paragraphs: [
          "Geçerli Schengen residence permit, ABD residence, İngiltere residence veya Kanada / Japonya residence sahiplerinin belirli koşullarda Karadağ’a kısa süreli vizesiz giriş avantajı elde edebildiği anlatılır.",
        ],
        callout: {
          variant: "info",
          text: "Avantaj ülke vatandaşlığı, ikamet kartı türü ve kalış süresine göre değişir; resmî vize rejimi tablosunu doğrulayın.",
        },
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Privremeni Boravak, Şirket ve Dijital Göçebe",
    lead:
      "Temel çizgi Privremeni boravak (temporary residence permit) ile yürür; dijital göçebe ve şirket müdürü modelleri ayrı kural setlerine sahiptir.",
    accordions: [
      {
        title: "Temporary residence sistemi",
        paragraphs: [
          "Karadağ’daki temel residence sisteminin Privremeni boravak (temporary residence permit) üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Başlıca residence nedenleri",
        paragraphs: ["Sık görülen gerekçe başlıkları:"],
        bullets: [
          "Çalışma",
          "Şirket kurma",
          "Gayrimenkul",
          "Dijital göçebelik",
          "Eğitim",
          "Aile birleşimi",
          "Finansal bağımsız yaşam",
        ],
      },
      {
        title: "Residence süresi",
        paragraphs: [
          "Temporary residence’ın çoğu durumda bir yıl olarak düzenlendiği anlatılır.",
          "Dijital göçebe residence sisteminin iki yıla kadar verilebildiği özetlenir.",
        ],
      },
      {
        title: "Şirket kurarak residence",
        paragraphs: [
          "Karadağ’da küçük ölçekli şirket kuran yabancıların company director residence üzerinden oturum alabildiği anlatılır; bu modelin Balkanlar’da yaygın olduğu belirtilir.",
        ],
      },
      {
        title: "Gayrimenkul ile residence",
        paragraphs: [
          "Gayrimenkul sahibi olmanın otomatik vatandaşlık sağlamadığı; ancak residence başvurularında avantaj sağlayabildiği özetlenir.",
        ],
      },
      {
        title: "Digital Nomad Residence Permit",
        paragraphs: [
          "Karadağ’ın en dikkat çeken sistemlerinden birinin Digital Nomad Residence Permit olduğu anlatılır.",
        ],
      },
      {
        title: "Digital nomad temel şartları",
        paragraphs: ["Başlıca şartlar olarak belirtilenler:"],
        bullets: [
          "Yabancı şirket için çalışma",
          "Uzaktan çalışma modeli",
          "Karadağ dışından gelir",
          "Sağlık sigortası",
          "Sabıka kaydı",
          "Konut kanıtı",
        ],
      },
      {
        title: "Dijital göçebe permit süresi",
        paragraphs: [
          "Permitin maksimum iki yıl olarak verilebildiği ve ek iki yıl uzatılabildiği anlatılır.",
        ],
      },
      {
        title: "Kritik dijital göçebe kuralı",
        paragraphs: [
          "Digital nomad permit sahiplerinin Karadağ’daki yerel şirketler için çalışamadığı; gelirin yurtdışından gelmesi gerektiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Yerel işverenle çalışmak farklı work permit ve residence kategorisi gerektirir; nomad statüsüyle karıştırılmamalıdır.",
        },
      },
      {
        title: "Başvuru süresi",
        paragraphs: [
          "Dijital göçebe permit başvurularının çoğu zaman yaklaşık kırk gün içinde sonuçlanabildiği özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun Residence, PR ve Yatırımcı Programı",
    lead:
      "Vatandaşlık uzun yasal residence ve entegrasyonla tanımlanır; eski yatırımcı vatandaşlık programı büyük ölçüde kapanmıştır.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Karadağ vatandaşlığının genellikle uzun süreli yasal residence, permanent residence, fiziksel bulunma ve entegrasyon üzerinden ilerlediği anlatılır.",
        ],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Genellikle beş yıl ve üzeri yasal residence sonrası permanent residence yolunun açılabildiği özetlenir.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Karadağ’da çifte vatandaşlığın sınırlı şekilde uygulanabildiği belirtilir.",
        ],
      },
      {
        title: "Citizenship by investment",
        paragraphs: [
          "Karadağ’ın eski yatırımcı vatandaşlık programının büyük ölçüde sona erdirildiği anlatılır.",
          "2026 itibarıyla klasik yatırım residence modellerinin devam ettiği; otomatik vatandaşlık sisteminin ise oldukça sınırlanmış olduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Authorization ve Temporary Residence",
    lead:
      "Çoğu yabancı çalışanda işveren sponsorluğu, work authorization ve temporary residence birlikte gereklidir.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanların çoğu için employer sponsorship, work authorization ve temporary residence gerektiği anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İş sözleşmesi hazırlanır",
          "Work authorization alınır",
          "D tipi giriş süreci tamamlanır",
          "Temporary residence permit alınır",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Turizm",
          "İnşaat",
          "Gayrimenkul",
          "IT",
          "Lojistik",
          "Denizcilik",
          "Otelcilik",
          "Hizmet sektörü",
        ],
      },
      {
        title: "Dijital ekonomi büyümesi",
        paragraphs: [
          "Karadağ’ın özellikle uzaktan çalışanlar, freelancerlar ve IT uzmanları için Balkanlar’daki en hızlı büyüyen residence merkezlerinden biri olmaya çalıştığı özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler ve Platformlar",
    lead:
      "Podgorica idari merkezdir; Budva ve Kotor turizm ve yabancı talep yoğunluğu taşır.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca ekonomik merkezler:"],
        bullets: ["Podgorica", "Budva", "Kotor", "Tivat", "Bar"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Zaposli.me", "Prekoveze.me", "LinkedIn"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla turizm sektörünün büyüdüğü, yabancı yatırımın arttığı ve IT ile remote çalışma kültürünün geliştiği özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "C Vizesi ve Kısa Kalış",
    lead:
      "Kısa süreli girişlerde C tipi vize uygulanır; turistik giriş çalışma veya uzun dönem residence sağlamaz.",
    accordions: [
      {
        title: "Kısa süreli giriş sistemi",
        paragraphs: [
          "Kısa süreli girişlerde C tipi kısa süreli vizenin uygulandığı anlatılır.",
        ],
      },
      {
        title: "Kalış süresi",
        paragraphs: [
          "Çoğu durumda yüz seksen gün içinde maksimum doksan gün kuralının uygulanabildiği özetlenir.",
        ],
      },
      {
        title: "Kritik gerçek",
        paragraphs: [
          "Turistik girişin çalışma hakkı vermediği ve uzun dönem residence hakkı sağlamadığı vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "is-basvurusu",
    tocLabel: "İş başvurusu",
    h2: "CV ve Dil",
    lead:
      "Sade, Avrupa standartlarına yakın ve deneyim odaklı CV’ler tercih edilir.",
    accordions: [
      {
        title: "CV sistemi",
        paragraphs: [
          "Karadağ’da sade, Avrupa standartlarına yakın ve deneyim odaklı CV’lerin tercih edildiği anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: ["Başlıca kullanılan dillere örnekler:"],
        bullets: ["Karadağca", "Sırpça", "İngilizce (turizm ve IT alanlarında)"],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Turizm, yazılım ve denizcilik hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Turizm", "Yazılım", "Otelcilik", "Denizcilik", "Dijital pazarlama"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Uygulamalı Meslek Eğitimi",
    lead:
      "Turizm, teknik işler ve denizcilikte işyeri eğitimi modelleri bulunur.",
    accordions: [
      {
        title: "Mesleki çıraklık (DYPA benzeri sistemler)",
        paragraphs: [
          "Karadağ’da turizm, teknik işler, hizmet sektörü ve denizcilik alanlarında uygulamalı eğitim modellerinin bulunduğu anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "AB Adaylığı ve Kayıt",
    lead:
      "AB üyeliği yoktur; bazı residence süreçlerinde farklı uygulamalar olabilir.",
    accordions: [
      {
        title: "AB avantajı",
        paragraphs: [
          "Karadağ’ın AB üyesi olmadığı; ancak AB vatandaşlarının bazı residence süreçlerinde avantaj yaşayabildiği anlatılır.",
        ],
      },
      {
        title: "Registration sistemi",
        paragraphs: [
          "Uzun süre kalan yabancıların adres kaydı ve residence card işlemlerini yapması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Yaşam Maliyeti ve Kıyı Primi",
    lead:
      "Batı Avrupa’ya göre görece düşük maliyet; Budva ve Kotor’da kıyı primi yüksektir.",
    accordions: [
      {
        title: "Yaşam maliyeti avantajı",
        paragraphs: [
          "Karadağ’ın Batı Avrupa’ya göre görece düşük maliyetli bir ülke olduğu anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Podgorica merkez stüdyo için yaklaşık 350–900 EUR+ ve Budva kıyı bölgesi için yaklaşık 500–1400 EUR+ bandlarının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["Realitica Montenegro", "Patuljak Nekretnine"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Remote ve Haklar",
    lead:
      "Haftalık çalışma süresi ve remote altyapı sektöre göre değişir.",
    accordions: [
      {
        title: "Standart çalışma sistemi",
        paragraphs: [
          "Genellikle haftalık kırk saat uygulandığı anlatılır.",
        ],
      },
      {
        title: "Remote çalışma",
        paragraphs: [
          "Karadağ’ın özellikle remote çalışanlar, freelancerlar ve dijital göçebeler için altyapı geliştirdiği özetlenir.",
        ],
      },
      {
        title: "Çalışan hakları",
        paragraphs: ["Yasal olarak korunan başlıklar:"],
        bullets: ["Maaş", "Sözleşme", "İzin", "İş güvenliği"],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Kamu–Özel Sağlık ve Eğitim",
    lead:
      "Residence başvurularında sağlık sigortası çoğu zaman zorunludur.",
    accordions: [
      {
        title: "Sağlık sistemi",
        paragraphs: [
          "Kamu ve özel sağlık sisteminin birlikte çalıştığı anlatılır.",
          "Residence başvurularında sağlık sigortasının çoğu zaman zorunlu olduğu vurgulanır.",
        ],
      },
      {
        title: "Eğitim sistemi",
        paragraphs: [
          "Karadağ’ın özellikle turizm, denizcilik, teknik eğitim ve bilişim alanlarında geliştiği özetlenir.",
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
        bullets: ["Rehabilitasyon", "Sosyal destek", "İş uyarlamaları", "Kamu destekli istihdam programları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Nomad Kuralları ve PR Hesabı",
    lead:
      "Garantili oturum vaatlerinden kaçının; dijital göçebe süresi kalıcı ikamet hesabına her zaman tam dahil olmayabilir.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Karadağ oturumu”, “hazır permit” veya “kesin AB geçişi” vaatlerinin riskli olduğu vurgulanır.",
          "Bazı dönemlerde digital nomad residence süresinin permanent residence hesabına tam olarak dahil edilmeyebildiği anlatılır.",
          "Digital nomad başvurularında düzenli yabancı gelir, banka hareketleri ve sözleşmelerin yakından incelendiği belirtilir.",
          "Digital nomad permit ile Karadağ’daki yerel şirketlerde çalışmanın yasak olduğu tekrar vurgulanır.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Government of Montenegro – Visas",
          "Montenegro Digital Nomads Portal",
          "Montenegro Ministry of Interior",
          "Invest in Montenegro",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Digital Nomad Residence sistemi",
          "Temporary residence süreçleri",
          "Work permit kuralları",
          "Türkiye vatandaşlarına yönelik vize uygulamaları",
          "Residence card düzenlemeleri",
          "Yabancı çalışan mevzuatı",
          "Sınır politikaları",
        ],
      },
    ],
  },
];
