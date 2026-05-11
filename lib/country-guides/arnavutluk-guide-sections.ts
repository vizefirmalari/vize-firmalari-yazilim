import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const ARNAVUTLUK_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Arnavutluk; düşük yaşam maliyetleri, Adriyatik kıyıları, Avrupa’ya yakın konumu, gelişen dijital göçebe sistemi ve esnek residence politikaları nedeniyle son yıllarda dikkat çeken Balkan ülkelerinden biri hâline gelmiştir. Schengen Bölgesi üyesi değildir ancak Avrupa ile yoğun entegrasyon süreci içindedir.",
  "2025–2026 döneminde dijital göçebe “Unique Permit” sistemi, uzun süreli D tipi vizeler, residence permit süreçleri ve yabancı çalışan mevzuatında önemli değişiklikler yapılmıştır. Kesin şartlar, vizesiz giriş muafiyetleri ve ücretleri Albanian Ministry of Foreign Affairs, e-Visa portalı ve Visa Regime for Foreign Citizens duyurularından güncel doğrulayın.",
];

export const ARNAVUTLUK_SEO_KEYWORD_TAGS: string[] = [
  "arnavutluk vize",
  "albania unique permit",
  "albania digital nomad",
  "albania e visa",
  "tirana residence permit",
  "albania d vizesi",
  "schengen visa albania entry",
  "work permit albania",
];

export const ARNAVUTLUK_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Ulusal Vize, e-Visa ve Geçerli Yabancı İzin Avantajı",
    lead:
      "Arnavutluk ne AB ne Schengen üyesidir; giriş ulusal vize, e-Visa veya özel muafiyet kurallarına tabidir.",
    accordions: [
      {
        title: "Schengen sistemi geçerli değildir",
        paragraphs: [
          "Arnavutluk Avrupa Birliği üyesi değildir; Schengen Bölgesi üyesi değildir ve kendi ulusal vize sistemini uygular.",
          "Schengen vizesi Arnavutluk vizesi yerine otomatik geçmez; Arnavutluk kendi giriş kurallarını uygular.",
        ],
      },
      {
        title: "Schengen / ABD / İngiltere oturum kartı avantajı",
        paragraphs: [
          "Geçerli ve daha önce kullanılmış Schengen vizesi, ABD vizesi, İngiltere residence kartı veya Schengen residence permit sahiplerinin belirli şartlarla Arnavutluk’a vizesiz giriş yapabildiği anlatılır.",
        ],
        callout: {
          variant: "warning",
          text: "Muafiyet ülke vatandaşlığı, vize türü, tek/çok giriş ve kalış süresine göre değişir; seyahatten önce resmî “Visa Regime for Foreign Citizens” tablosunu doğrulayın.",
        },
      },
      {
        title: "Başlıca vize türleri",
        paragraphs: ["En yaygın başvuru çerçevelerinin özeti:"],
        bullets: [
          "C tipi kısa süreli vize",
          "D tipi uzun süreli vize",
          "Çalışma vizesi",
          "Eğitim vizesi",
          "Dijital göçebe “Unique Permit”",
          "Aile birleşimi residence sistemi",
        ],
      },
      {
        title: "e-Visa sistemi",
        paragraphs: [
          "Arnavutluk’un resmi e-Visa sistemi kullandığı ve başvuruların çevrim içi yapılabildiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Residence Permit ve Unique Permit",
    lead:
      "Uzun süreli yaşamda çoğu hat D tipi vize ve ardından residence permit ile ilerler; Unique Permit residence, çalışma ve dijital göçebeyi kapsayabilir.",
    accordions: [
      {
        title: "Residence permit sistemi",
        paragraphs: [
          "Uzun süreli yaşam için çoğu durumda D tipi vize ve ardından residence permit gerektiği anlatılır.",
        ],
      },
      {
        title: "Unique Permit sistemi",
        paragraphs: [
          "Arnavutluk’un son yıllarda “Unique Permit” sistemini geliştirdiği belirtilir.",
          "Bu sistemin residence, çalışma ve dijital göçebe yaşamı için kullanılabildiği özetlenir.",
        ],
      },
      {
        title: "Dijital göçebe sistemi",
        paragraphs: [
          "Arnavutluk’un Avrupa’daki en dikkat çeken dijital göçebe sistemlerinden birini oluşturmaya çalıştığı anlatılır.",
        ],
      },
      {
        title: "Başlıca şartlar",
        paragraphs: ["Dijital göçebe ve benzeri başvurularda sık geçen başlıklar:"],
        bullets: ["Yabancı gelir", "Uzaktan çalışma", "Sağlık sigortası", "Konut kanıtı"],
      },
      {
        title: "Permit süresi",
        paragraphs: [
          "İlk digital nomad permit’in çoğu zaman bir yıl olarak düzenlendiği ve yenilenebildiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun Residence ve Kalıcı İkamet",
    lead:
      "Vatandaşlık uzun yasal residence ve entegrasyonla tanımlanır; çifte vatandaşlık sınırlı durumlarda mümkündür.",
    accordions: [
      {
        title: "Genel süreç",
        paragraphs: [
          "Arnavutluk vatandaşlığının genellikle uzun süreli yasal residence, fiziksel bulunma, entegrasyon ve temiz sicil unsurlarıyla ilerlediği anlatılır.",
        ],
      },
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Belirli durumlarda çifte vatandaşlığın mümkün olabildiği belirtilir.",
        ],
      },
      {
        title: "Permanent residence",
        paragraphs: [
          "Uzun süreli yasal ikamet sonrası permanent residence başvurusu yapılabildiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Work Authorization ve Residence",
    lead:
      "Çoğu yabancı çalışanda işveren sponsorluğu, work authorization ve residence permit birlikte gereklidir.",
    accordions: [
      {
        title: "Work permit sistemi",
        paragraphs: [
          "Yabancı çalışanların çoğu için employer sponsorship, work authorization ve residence permit gerektiği anlatılır.",
        ],
      },
      {
        title: "Genel süreç",
        paragraphs: ["Sık anlatılan adımlar:"],
        bullets: [
          "İşveren bulunur",
          "İş sözleşmesi hazırlanır",
          "D tipi çalışma vizesi alınır",
          "Residence permit başvurusu yapılır",
          "Çalışma kaydı tamamlanır",
        ],
      },
      {
        title: "Başlıca sektörler",
        paragraphs: ["İstihdamın yoğun olduğu alanlara örnekler:"],
        bullets: [
          "Turizm ve otelcilik",
          "İnşaat",
          "IT",
          "Lojistik",
          "Çağrı merkezi",
          "Gayrimenkul",
          "Dijital hizmetler",
        ],
      },
      {
        title: "Dijital göçebe avantajı",
        paragraphs: [
          "Uzaktan çalışanlar için düşük yaşam maliyeti, görece düşük vergi baskısı ve Adriyatik kıyı yaşamının önemli avantaj olarak görüldüğü özetlenir.",
        ],
        callout: {
          variant: "info",
          text: "Vergi ve sosyal güvenlik yükümlülükleri ülke içi gelir ve ikamet statüsüne göre değişir; uzman danışmanlık önerilir.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Şehirler, Platformlar ve Sektör Trendleri",
    lead:
      "Tiran başlıca ekonomik merkezdir; IT, turizm ve remote work hatlarında büyüme öne çıkar.",
    accordions: [
      {
        title: "En güçlü şehirler",
        paragraphs: ["Başlıca ekonomik merkezler:"],
        bullets: ["Tiran", "Durrës", "Vlorë", "Shkodër"],
      },
      {
        title: "Başlıca platformlar",
        paragraphs: ["İş aramada kullanılan örnek kanallar:"],
        bullets: ["Njoftime Albania", "Dua Pune Albania", "LinkedIn"],
      },
      {
        title: "İş piyasası gerçeği",
        paragraphs: [
          "2026 itibarıyla IT, turizm, remote work ve dijital hizmetler alanlarında büyüme görüldüğü özetlenmektedir.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "C Vizesi, Kalış Süreleri ve Türkiye Vatandaşları",
    lead:
      "Kısa süreli girişlerde C tipi vize uygulanır; Türkiye vatandaşları için vizesiz avantajlar anlatılır.",
    accordions: [
      {
        title: "C tipi kısa süreli giriş",
        paragraphs: [
          "Kısa süreli girişlerde C tipi kısa süreli vizenin uygulandığı anlatılır.",
        ],
      },
      {
        title: "Kalış süresi",
        paragraphs: [
          "Genellikle yüz seksen gün içinde maksimum doksan gün bandının uygulanabildiği özetlenir; muafiyetlerde farklı olabilir.",
        ],
      },
      {
        title: "Türkiye vatandaşları",
        paragraphs: [
          "Türkiye Cumhuriyeti vatandaşlarının belirli sürelerle vizesiz giriş avantajına sahip olabildiği anlatılır; güncel süre ve koşullar için MFA ve sınır duyurularını doğrulayın.",
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
          "Arnavutluk’ta sade, Avrupa standartlarına yakın ve deneyim odaklı CV’lerin tercih edildiği anlatılır.",
        ],
      },
      {
        title: "Dil konusu",
        paragraphs: ["Başlıca kullanılan dillere örnekler:"],
        bullets: [
          "Arnavutça",
          "İngilizce (özellikle turizm ve IT alanlarında)",
          "İtalyanca (bazı sektörlerde avantaj)",
        ],
      },
    ],
  },
  {
    id: "stajlar",
    tocLabel: "Stajlar",
    h2: "Internship Alanları",
    lead:
      "Turizm, yazılım ve dijital pazarlama hatlarında staj fırsatları anlatılır.",
    accordions: [
      {
        title: "Staj alanları",
        paragraphs: ["Başlıca alanlara örnekler:"],
        bullets: ["Turizm", "Yazılım", "Dijital pazarlama", "Otelcilik", "Hizmet sektörü"],
      },
    ],
  },
  {
    id: "ciraklik-teknik",
    tocLabel: "Mesleki çıraklık",
    h2: "Teknik Meslek Eğitimi",
    lead:
      "Turizm, inşaat ve hizmet sektöründe meslekî eğitim geliştirilmektedir.",
    accordions: [
      {
        title: "Teknik eğitim sistemi",
        paragraphs: [
          "Arnavutluk’un turizm, inşaat, teknik işler ve hizmet sektörü alanlarında meslekî eğitim sistemini geliştirdiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "ab-vatandaslari",
    tocLabel: "AB vatandaşları ve kayıt",
    h2: "Entegrasyon Etkisi ve Kayıt",
    lead:
      "AB vatandaşları bazı residence süreçlerinde farklı uygulamalar görebilir; uzun kalışta kayıt zorunludur.",
    accordions: [
      {
        title: "Avrupa entegrasyonu etkisi",
        paragraphs: [
          "AB vatandaşlarının bazı residence süreçlerinde avantaj yaşayabildiği belirtilir; kesin muafiyetler resmî kaynaklardan doğrulanmalıdır.",
        ],
      },
      {
        title: "Registration sistemi",
        paragraphs: [
          "Uzun süre kalan yabancıların adres kaydı ve residence permit işlemlerini yapması gerektiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "konut",
    tocLabel: "Konut ve örnek kiralar",
    h2: "Yaşam Maliyeti ve Kiralama",
    lead:
      "Avrupa ölçeğinde görece düşük maliyet ve kıyı şehirlerinde talep artışı vardır.",
    accordions: [
      {
        title: "Düşük yaşam maliyeti avantajı",
        paragraphs: [
          "Arnavutluk’un Avrupa’nın görece düşük maliyetli ülkelerinden biri olduğu anlatılır.",
        ],
      },
      {
        title: "Ortalama kiralar",
        paragraphs: [
          "2026 itibarıyla Tiran merkez stüdyo için yaklaşık 350–900 EUR+ bandının konuşulduğu özetlenmektedir.",
        ],
      },
      {
        title: "Konut platformları",
        paragraphs: ["Kiralık aramada kullanılan örnek siteler:"],
        bullets: ["MerrJep Albania", "Njoftime Real Estate"],
      },
    ],
  },
  {
    id: "calisma-kosullari",
    tocLabel: "Çalışma koşulları",
    h2: "Süre, Remote ve Çalışan Hakları",
    lead:
      "Haftalık çalışma süresi ve remote kültürü sektöre göre değişir.",
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
          "Dijital göçebe sistemi nedeniyle uzaktan çalışma kültürünün hızla büyüdüğü özetlenir.",
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
      "Kamu ve özel sağlık birlikte çalışır; turizm ve bilişimde eğitim gelişmektedir.",
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
          "Arnavutluk’un özellikle turizm, teknik eğitim ve bilişim alanlarında gelişim gösterdiği özetlenir.",
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
        bullets: ["Sosyal destek", "Rehabilitasyon", "İş uyarlamaları"],
      },
    ],
  },
  {
    id: "uyari-kaynaklar",
    tocLabel: "Kritik uyarılar ve resmî kaynaklar",
    h2: "Sahte Vaatler ve Hızlı Değişen Düzenlemeler",
    lead:
      "Garantili oturum ve otomatik AB geçişi vaatlerinden kaçının; Schengen dışı olduğunu netleştirin.",
    accordions: [
      {
        title: "Kritik uyarılar",
        paragraphs: [
          "“Garantili Arnavutluk oturumu”, “hazır permit” veya “otomatik AB geçişi” vaatlerinin riskli olduğu vurgulanır.",
          "Arnavutluk’un Schengen içinde olmadığı ve bu konunun sık yanlış anlaşıldığı belirtilir.",
          "2025–2026 döneminde dijital göçebe sistemi, Unique Permit ve residence card süreçlerinin hızlı değişebildiği anlatılır.",
        ],
      },
      {
        title: "Resmî kaynaklar",
        paragraphs: ["Takip edilmesi gereken temel kurum ve siteler:"],
        bullets: [
          "Albanian Ministry of Foreign Affairs",
          "Albania e-Visa Portal",
          "Visa Regime for Foreign Citizens",
          "Invest in Albania",
        ],
      },
      {
        title: "2026’da sık güncellenen alanlar",
        paragraphs: ["Politika ve ücretlerde sık revizyon görülen başlıklar:"],
        bullets: [
          "Unique Permit sistemi",
          "Dijital göçebe residence modeli",
          "Work permit süreçleri",
          "Residence permit süreleri",
          "e-Visa uygulamaları",
          "Sınır politikaları",
          "Uzaktan çalışma residence düzenlemeleri",
        ],
      },
    ],
  },
];
