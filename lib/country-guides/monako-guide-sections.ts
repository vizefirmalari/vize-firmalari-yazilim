import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const MONAKO_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Monako; düşük kişisel gelir vergisi çerçevesi, yüksek yaşam standardı, finans ve güvenlik odaklı prestijiyle yatırımcı ve yüksek gelirli yabancılar tarafından sık araştırılan bir prensliktir. Kara alanı son derece sınırlıdır; emlak ve hizmet maliyetleri küresel üst bantta yer alır.",
  "Giriş ve uzun süreli ikamet büyük ölçüde Fransa Schengen sistemi ve Fransız göç prosedürleriyle iç içedir. Carte de Séjour süreçleri konut, banka ve finansal yeterlilik dosyası üzerinden sıkı denetime tabidir — Mon Service Public Monaco, France-Visas ve Residents Section bilgilerini güncel doğrulayın.",
];

export const MONAKO_SEO_KEYWORD_TAGS: string[] = [
  "monako vize",
  "monaco carte de sejour",
  "france visas monaco",
  "monaco residence permit",
  "monaco work permit",
  "schengen monaco entry",
  "monaco bank deposit residence",
  "monte carlo residence",
];

export const MONAKO_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Schengen, Fransa Bağlantısı ve Monako Statüsü",
    lead:
      "Monako Avrupa Birliği üyesi değildir ve resmi Schengen üyesi listesinde yer almaz; ancak Fransa ile özel düzenlemeler nedeniyle Schengen giriş pratiği ve Fransız göç kuralları fiilen belirleyicidir.",
    accordions: [
      {
        title: "Schengen ve Fransa ekseni",
        paragraphs: [
          "Çoğu üçüncü ülke vatandaşı için Monako yolculuğu önce Fransa Schengen alanına geçerli vize veya giriş hakkıyla girmeyi gerektirir.",
          "Uzun süreli oturum ve çalışma dosyalarında Fransa üzerinden yürütülen adımlar Monako residence başvurusuyla birleştirilir.",
        ],
        callout: {
          variant: "warning",
          text: "Schengen hakkı olmadan kara veya hava üzerinden erişim planlamayın; rotayı France-Visas ve konsoloslukla netleştirin.",
        },
      },
      {
        title: "Monako özel durumu",
        paragraphs: [
          "Prenslik kendi kamu düzenini ve oturum politikasını işletir; buna karşılık sınır ve kısa süreli kalış mantığında Schengen rejimi ile uyum aranır.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Süreli Kalış ve Schengen Doksan Gün",
    lead:
      "Doksan güne kadar kısa süreli kalışlar Schengen kuralları çerçevesinde değerlendirilir. Turistik giriş çalışma, uzun ikamet veya vergi mukimliği doğurmaz.",
    accordions: [
      {
        title: "Pratik sınırlar",
        paragraphs: [
          "Kısa süreli ziyaretçilerin Monako içinde ücretli istihdam veya şirket yönetimi yürütmemesi gerekir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Carte de Séjour ve Oturum Türleri",
    lead:
      "On altı yaş üstü ve yılda üç aydan fazla Monako'da kalmayı planlayanlar için oturum kartı zorunluluğu vurgulanır. Süreç Residents Section ve ilgili kamu hizmetleri çizgisinde yürür.",
    accordions: [
      {
        title: "Temel başlıklar",
        paragraphs: ["Sık görülen oturum modelleri:"],
        bullets: [
          "Çalışma temelli oturum",
          "Şirket sahibi oturumu",
          "Finansal bağımsızlık oturumu",
          "Aile birleşimi",
          "Öğrenci oturumu",
        ],
      },
      {
        title: "Carte de Séjour",
        paragraphs: [
          "Uzun süreli ikamet izninin yerel adıyla bu kart üzerinden yönetildiği; yenileme ve adres güncellemelerinin düzenli takip edilmesi gerektiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "İşveren Onayı, Çalışma İzni ve Fransa Üzerinden Akış",
    lead:
      "Yabancı istihdam kontrollüdür. İş teklifi sonrası işveren çalışma izni sürecini başlatır; uzun süreli giriş adımları Fransa hattında tamamlanır ve Monako residence başvurusu yapılır.",
    accordions: [
      {
        title: "Genellikle talep edilen belgeler",
        paragraphs: ["Çalışma ve oturum dosyasında sık geçen evraklar:"],
        bullets: [
          "Pasaport",
          "İş sözleşmesi",
          "Sabıka kaydı",
          "Sağlık sigortası",
          "Konaklama kanıtı",
          "Finansal belgeler",
        ],
      },
      {
        title: "Fransa'dan günlük geçiş",
        paragraphs: [
          "Birçok çalışanın ikametini Fransız Rivierası'nda tutup Monako'ya günlük giriş çıkış yaptığı bilinir; bu model vergi ve oturum kuralları açısından ayrı planlanmalıdır.",
        ],
      },
    ],
  },
  {
    id: "sirket-finans-konut",
    tocLabel: "Şirket, banka ve konut",
    h2: "Şirket Kurulumu, Mevduat ve Konut Zorunluluğu",
    lead:
      "Şirket kurulumu mümkündür; sermaye, faiz alanı ve uyumluluk incelemesi ağırdır. Oturumda Monako bankasında mevduat, sürdürülebilir gelir ve güçlü finansal profil beklenir. Mülk veya uzun süreli kira sözleşmesi neredeyse zorunlu kabul edilir.",
    accordions: [
      {
        title: "Sektör odağı",
        paragraphs: [
          "Finans, danışmanlık, yatırım yönetimi, lüks hizmetler ve teknoloji alanlarının şirket ve istihdam dosyalarında öne çıktığı özetlenir.",
        ],
      },
      {
        title: "Banka ve mevduat",
        paragraphs: [
          "Bazı ikincil kaynaklarda beş yüz bin Euro ve üzeri banka depozitosundan söz edilmektedir; tutarlar politika ile değişir.",
        ],
        callout: {
          variant: "warning",
          text: "Mevduat eşiğini yalnızca seçtiğiniz Monako bankası ve güncel göç rehberi ile kesinleştirin; AML incelemeleri ağırlaşmaktadır.",
        },
      },
      {
        title: "Konut piyasası",
        paragraphs: [
          "Konut arzının son derece kısıtlı ve fiyatların dünya üst diliminde olduğu; kira ve alım süreçlerinde profesyonel destek ve erken aramanın şart olduğu belirtilir.",
        ],
      },
    ],
  },
  {
    id: "residence-surec",
    tocLabel: "Residence süreci",
    h2: "Başvuru Adımları ve Residents Section",
    lead:
      "Tipik akış: konut temini, Monako banka hesabı, finansal yeterlilik, Fransa üzerinden uzun süreli giriş işlemleri, Residents Section görüşmesi ve Carte de Séjour düzenlenmesi olarak özetlenir.",
    accordions: [
      {
        title: "Sıralı planlama",
        paragraphs: [
          "Evrakların apostil, tercüme ve banka uyumluluk formatlarında tutarlı olması beklenir.",
        ],
      },
    ],
  },
  {
    id: "fiziksel-vergi",
    tocLabel: "Fiziksel ikamet ve vergi",
    h2: "Gerçek Yaşam İspatı ve Gelir Vergisi Politikası",
    lead:
      "Monako gerçek ikamet bekleyen ülkelerdendir. Bazı kart türlerinde yılda en az üç ay; bazı senaryolarda yüz seksen üç güne yakın fiili yaşam beklentisi anlatılır. Elektrik, banka hareketleri ve günlük yaşam kanıtları incelenebilir.",
    accordions: [
      {
        title: "Fiziksel iz",
        paragraphs: [
          "Yenileme dönemlerinde oturumun fiilen kullanılıp kullanılmadığının sorgulanabildiği vurgulanır.",
        ],
      },
      {
        title: "Kişisel gelir vergisi",
        paragraphs: [
          "Monako'nun kişisel gelir vergisinin bulunmamasıyla bilindiği; bunun yatırımcı ve yüksek gelirli profiller için cazibe oluşturduğu özetlenir.",
        ],
      },
      {
        title: "Fransız vatandaşları",
        paragraphs: [
          "Fransız vatandaşları için özel vergi düzenlemeleri bulunduğu; çifte bağlantılı dosyalarda Fransız mevzuatının ayrıca ele alınması gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Dar Piyasa ve Lüks Hizmet Sektörleri",
    lead:
      "Nüfus ve alan küçük olduğundan iş ilanı sayısı sınırlıdır. Finans, bankacılık, lüks perakende, otelcilik, yat yönetimi, concierge, gayrimenkul ve gastronomi öne çıkar.",
    accordions: [
      {
        title: "Başvuru kanalları",
        paragraphs: ["Yaygın arama yöntemleri:"],
        bullets: [
          "Monako merkezli şirket kariyer sayfaları",
          "LinkedIn ve uluslararası headhunter ağları",
          "Fransa Rivierası işe alım kanalları",
        ],
      },
    ],
  },
  {
    id: "egitim-saglik",
    tocLabel: "Eğitim ve sağlık",
    h2: "Öğrenci Statüsü ve Özel Sağlık Sigortası",
    lead:
      "Özel üniversite ve işletme okulları ile lüks sektör eğitimleri bulunur. Öğrenci statüsünde uzun süreli giriş ve residence gerekir. Oturum dosyalarında kapsamlı özel sağlık sigortası kritiktir.",
    accordions: [
      {
        title: "Öğrenci",
        paragraphs: [
          "Kabul mektubu, konut ve finansal yeterlilik ile öğrenci oturumunun planlanması gerektiği anlatılır.",
        ],
      },
      {
        title: "Sağlık",
        paragraphs: [
          "Poliçe kapsamı ve sürekliliğinin denetlendiği; eksik sigortanın ret veya yenileme riski doğurduğu vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun Süre, Güvenlik ve Golden Visa Yokluğu",
    lead:
      "Monako vatandaşlığı son derece seçici kabul edilir. Uzun süreli ikamet, entegrasyon ve yüksek güvenlik incelemesi ile devlet onayı beklenir. Klasik golden visa ile doğrudan vatandaşlık modeli bulunmaz.",
    accordions: [
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Başvuruların sıkı değerlendirildiği; önceki vatandaşlık statülerinin ayrıntılı incelenebildiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "yasam-gercegi",
    tocLabel: "Yaşam maliyeti",
    h2: "Ultra Yüksek Maliyet ve Konut Kısıtı",
    lead:
      "Monako ultra güvenli ve prestijli olmakla birlikte kira ve yaşam giderleri Avrupa'nın en üst bandındadır; orta gelir profili için uygun olmayabilir.",
    accordions: [
      {
        title: "Bütçe planı",
        paragraphs: [
          "Konut, okul, sigorta ve hizmet kalemlerinin tek tek modellenmesi önerilir.",
        ],
      },
    ],
  },
  {
    id: "guncellemeler-hatalar",
    tocLabel: "2025–2026 ve sık hatalar",
    h2: "Denetimler ve Başvuru Riskleri",
    lead:
      "Son dönemde residence denetimleri, finansal yeterlilik ve banka uyumluluğu, fiziksel yaşam ispatı ve kara para aklama kontrollerinin güçlendiği yönünde özetler paylaşılmaktadır.",
    accordions: [
      {
        title: "Sık yapılan hatalar",
        paragraphs: ["Ret, banka sorunu veya yenileme riski doğurabilecek davranışlar:"],
        bullets: [
          "Schengen hakkı olmadan giriş planlamak",
          "Finansal yeterliliği hafife almak",
          "Gerçek konut göstermemek veya sahte kira sözleşmesi",
          "Fiilen yaşamadan kart yenilemek",
          "Vergi ve banka uyumluluğunu ihmal etmek",
        ],
      },
    ],
  },
  {
    id: "kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Monako ve Fransa Doğrulama",
    lead:
      "Aşağıdaki anahtar kelimeler resmî sitelere ulaşmak için kullanılabilir; bağlantılar zamanla değişebilir.",
    accordions: [
      {
        title: "Başlangıç adresleri",
        paragraphs: ["İlk kontrol listesi:"],
        bullets: [
          "Mon Service Public Monaco",
          "France-Visas Monaco bilgi sayfaları",
          "Visiting Monaco ziyaretçi bilgisi",
          "Monaco residency / immigration rehberleri (İngilizce arama)",
        ],
      },
      {
        title: "Türkiye",
        paragraphs: [
          "T.C. Dışişleri seyahat uyarıları ve Schengen vize başvurusu Fransa konsolosluk bölgesi üzerinden planlanmalıdır.",
        ],
        callout: {
          variant: "info",
          text: "Mevduat tutarı, kira eşiği ve işveren formlarını yalnızca güncel resmî PDF veya danışmanlık ile kilitleyin.",
        },
      },
    ],
  },
];
