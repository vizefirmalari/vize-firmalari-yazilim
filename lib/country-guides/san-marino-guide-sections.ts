import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const SAN_MARINO_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "San Marino; İtalya toprakları içinde yer alan küçük ve bağımsız bir Avrupa devletidir. Avrupa Birliği üyesi olmamasına rağmen İtalya ile çok güçlü entegrasyona sahiptir. Bu nedenle giriş, oturum ve çalışma süreçleri büyük ölçüde İtalya ve Schengen sistemiyle bağlantılı ilerler.",
  "Düşük nüfus, yüksek güvenlik, küçük fakat istikrarlı ekonomi, vergi çerçevesi ve İtalya'ya yakın yaşam modeli nedeniyle yatırımcılar, küçük işletme sahipleri ve Avrupa'da alternatif yaşam modeli arayan kişiler tarafından sık araştırılır. Kesin eşikler ve başvuru formları yıllık değişebilir — San Marino resmî kaynakları ve İtalya konsolosluk bilgilerinden güncel doğrulayın.",
];

export const SAN_MARINO_SEO_KEYWORD_TAGS: string[] = [
  "san marino vize",
  "san marino oturum",
  "san marino schengen",
  "italya schengen san marino",
  "rimini san marino",
  "san marino çalışma izni",
  "san marino yatırımcı oturumu",
  "san marino şirket kurma",
  "san marino vatandaşlık",
  "mount titano residence",
];

export const SAN_MARINO_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "AB, Schengen ve İtalya Üzerinden Erişim",
    lead:
      "San Marino ne Avrupa Birliği üyesidir ne de resmî Schengen üyesi listesinde yer alır. Buna karşılık İtalya ile açık sınır düzenine sahiptir; fiilen Schengen erişim modeliyle bağlantılıdır ve ülkeye girişler çoğunlukla İtalya üzerinden gerçekleşir.",
    accordions: [
      {
        title: "Türk vatandaşları için pratik sonuç",
        paragraphs: [
          "Türk vatandaşları açısından pratikte önce İtalya Schengen giriş hakkı veya uygun vize gerekliliği sık vurgulanır.",
          "Rotanızı İtalya Schengen vizesi, giriş damgası ve sınır pratiği açısından konsolosluk ile netleştirin.",
        ],
        callout: {
          variant: "warning",
          text: "Schengen hakkı olmadan San Marino'ya ulaşım planlamayın; kara yolu erişimi İtalya üzerinden geçer.",
        },
      },
      {
        title: "Neden İtalya ekseni?",
        paragraphs: [
          "Ülkenin havaalanı bulunmaması ve bağımsız sınır kontrol sisteminin sınırlı olması, Bologna, Rimini ve diğer İtalya kara bağlantılarının öne çıktığı anlatılır.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Süreli Giriş ve Schengen Kullanımı",
    lead:
      "Türk vatandaşları çoğunlukla İtalya Schengen vizesi ile bölgeye girer ve San Marino'ya kara yoluyla devam eder. Kısa süreli turistik giriş çalışma hakkı vermez, uzun süreli oturum oluşturmaz ve vergi mukimliği sağlamaz.",
    accordions: [
      {
        title: "Kısa kalışın sınırları",
        paragraphs: [
          "Turistik statüde ücretli istihdam, şirket yönetimi veya uzun süreli ikamet iddiası taşıyan davranışlardan kaçınılması gerekir.",
        ],
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "San Marino Oturum Modelleri",
    lead:
      "San Marino oturum sistemi kontrollü kabul edilir. Başvurular konut, finans ve fiili yaşam unsurlarıyla birlikte değerlendirilir.",
    accordions: [
      {
        title: "Başlıca residence türleri",
        paragraphs: ["Sık anılan oturum modelleri özetle şunlardır:"],
        bullets: [
          "Çalışma temelli oturum",
          "Şirket sahibi oturumu",
          "Yatırımcı oturumu",
          "Aile birleşimi",
          "Emeklilik / finansal bağımsızlık oturumu",
        ],
      },
      {
        title: "Genel beklenti",
        paragraphs: [
          "Ülke yüksek gelir grubuna yönelik kontrollü residence uygulayan mikro devletler arasında anlatılır; evrak ve kaynak ispatı ağırlaşabilmektedir.",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Çalışma İzni ve Süreç Akışı",
    lead:
      "Yabancı çalışan sistemi küçük iş piyasası nedeniyle sınırlıdır. Tipik akış: iş teklifi, işverenin başlatması, çalışma izni değerlendirmesi, oturum başvurusu ve residence kartı düzenlenmesi olarak özetlenir.",
    accordions: [
      {
        title: "Genellikle talep edilen belgeler",
        paragraphs: ["Dosyada sık geçen evraklar şunlar olabilir:"],
        bullets: [
          "Pasaport",
          "İş sözleşmesi",
          "Sabıka kaydı",
          "Sağlık sigortası",
          "Konaklama kanıtı",
          "Finansal belgeler",
          "Mesleki yeterlilik belgeleri",
        ],
      },
      {
        title: "İtalya'dan günlük geçiş",
        paragraphs: [
          "Birçok çalışanın İtalya'dan günlük giriş çıkış yaptığı bilinir; bu model vergi, sosyal güvenlik ve oturum statüsü açısından ayrı planlanmalıdır.",
        ],
      },
    ],
  },
  {
    id: "sirket",
    tocLabel: "Şirket",
    h2: "Şirket Kurarak Oturum ve Gerçek Faaliyet",
    lead:
      "San Marino özellikle küçük ölçekli şirketler ve uluslararası danışmanlık faaliyetleri için araştırılan ülkelerden biridir. Danışmanlık, yazılım, finansal hizmetler, ticaret ve dijital işler öne çıkar; ancak gerçek ekonomik faaliyet beklentisi yüksektir.",
    accordions: [
      {
        title: "Kağıt şirket riski",
        paragraphs: [
          "Yalnızca kağıt üzerinde şirket kurulmasının yeterli görülmeyebileceği; banka ve göç denetimlerinde faaliyet, ciro ve ofis izinin sorgulanabildiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Şirket kurulumunu oturum ve banka uyumluluğu ile birlikte profesyonel danışmanlıkla planlayın.",
        },
      },
    ],
  },
  {
    id: "yatirim-konut",
    tocLabel: "Yatırım ve konut",
    h2: "Yatırımcı Oturum, Konut ve Fiili İkamet",
    lead:
      "Bazı residence modellerinde düzenli gelir, yüksek finansal yeterlilik, banka varlığı ve konut kanıtı aranmaktadır. Ülke küçük olduğundan konut piyasası sınırlıdır; merkez bölgelerde uygun konut bulmak zor olabilir.",
    accordions: [
      {
        title: "Konut ispatı",
        paragraphs: [
          "Kira kontratı veya mülk sahipliği başvurularda önemli rol oynar.",
        ],
      },
      {
        title: "Fiziksel kalış",
        paragraphs: [
          "Bazı residence türlerinde San Marino'da gerçek yaşam beklentisi olduğu; adres kaydı, günlük yaşam, banka hareketleri ve fiili ikamet unsurlarının incelenebildiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "vergi",
    tocLabel: "Vergi",
    h2: "Vergi Çerçevesi ve Şeffaflık",
    lead:
      "San Marino geçmişte vergi avantajlı mikro devlet olarak bilinse de son yıllarda uluslararası şeffaflık ve finans denetimleri ciddi şekilde artmıştır. Banka incelemeleri, gelir kaynakları ve uluslararası uyumluluk kritik önemdedir.",
    accordions: [
      {
        title: "2025–2026 dönemi özetleri",
        paragraphs: [
          "Kamuoyuna yansıyan özetlerde finansal denetimlerin arttığı, residence süreçlerinin sıkılaştığı, banka uyumluluk ve kara para aklama kontrollerinin güçlendiği ve gerçek ekonomik faaliyet beklentisinin yükseldiği aktarılmaktadır.",
        ],
        callout: {
          variant: "info",
          text: "Vergi ve ikamet sonuçlarını yalnızca güncel resmî mevzuat ve mali danışmanlıkla kesinleştirin.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Dar İş Piyasası ve Sektörler",
    lead:
      "San Marino küçük bir iş piyasasına sahiptir. Turizm, bankacılık, finans, perakende, restoran ve otelcilik, danışmanlık ve ticaret yoğun sektörler arasında sayılır.",
    accordions: [
      {
        title: "Başvuru kanalları",
        paragraphs: ["Yaygın arama yöntemleri:"],
        bullets: [
          "Yerel şirket siteleri",
          "İtalya bağlantılı işe alım ağları",
          "LinkedIn",
          "Uluslararası danışmanlık firmaları",
        ],
      },
      {
        title: "Yabancı istihdam",
        paragraphs: [
          "Yerel iş gücü önceliği nedeniyle yabancı çalışan alımının sınırlı olabileceği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "egitim-saglik",
    tocLabel: "Eğitim ve sağlık",
    h2: "Eğitim, Üniversite ve Sağlık Güvencesi",
    lead:
      "Küçük ölçekli eğitim sistemi, bazı uluslararası iş birlikleri ve İtalya bağlantılı akademik yapı bulunmaktadır. Birçok öğrenci İtalya üniversiteleriyle bağlantılı modeller kullanır.",
    accordions: [
      {
        title: "Sağlık",
        paragraphs: [
          "Uzun süreli residence başvurularında sağlık sigortası, özel sağlık kapsamı ve düzenli sağlık güvencesi çoğunlukla zorunlu kabul edilir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Vatandaşlık ve Çifte Vatandaşlık",
    lead:
      "San Marino vatandaşlığı Avrupa'daki en zor vatandaşlık sistemlerinden biri olarak anlatılır. Genellikle uzun yıllar yasal ikamet, entegrasyon, temiz sicil ve ekonomik sürdürülebilirlik gerekir. Bazı özetlerde on yıldan uzun ikamet sürelerinden söz edilmektedir.",
    accordions: [
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Vatandaşlık süreçlerinin kontrollü yürütüldüğü; çifte vatandaşlık ve özel durumların ayrı değerlendirmeye tabi tutulabildiği özetlenir.",
        ],
        callout: {
          variant: "info",
          text: "Vatandaşlık süreleri ve istisnaları yalnızca San Marino resmî duyurularından doğrulayın.",
        },
      },
    ],
  },
  {
    id: "yasam-gercegi",
    tocLabel: "Yaşam",
    h2: "San Marino'da Yaşamın Gerçekleri",
    lead:
      "Ülke güvenli, sakin, küçük nüfuslu ve kontrollü göç sistemine sahiptir. Buna karşılık iş piyasası küçüktür, residence süreçleri sanıldığı kadar kolay olmayabilir ve finansal yeterlilik belirleyici rol oynar.",
    accordions: [
      {
        title: "Kimler için uygun?",
        paragraphs: [
          "Kitlesel göçten çok yüksek gelirli veya özel yaşam modeli arayan profiller tarafından tercih edildiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "guncel-hatalar",
    tocLabel: "Sık hatalar",
    h2: "En Sık Yapılan Hatalar ve Sonuçları",
    lead:
      "Aşağıdaki davranışlar residence reddi, banka hesabı problemi, yenileme reddi veya giriş sorunları doğurabilir.",
    accordions: [
      {
        title: "Risk listesi",
        paragraphs: ["Özet riskler:"],
        bullets: [
          "Schengen olmadan giriş planlamak",
          "Turistik girişle çalışmaya başlamak",
          "Gerçek residence göstermemek",
          "Yetersiz finansal belge sunmak",
          "Kağıt üzerinde şirket kurmak",
          "Vergi ve banka uyumluluğunu ihmal etmek",
        ],
      },
    ],
  },
  {
    id: "kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama ve Resmî Başlangıç Noktaları",
    lead:
      "Aşağıdaki anahtar ifadeler resmî sitelere ulaşmak için arama motorunda kullanılabilir; URL'ler zamanla değişebilir.",
    accordions: [
      {
        title: "San Marino ve İtalya ekseni",
        paragraphs: ["İlk kontrol listesi:"],
        bullets: [
          "San Marino Government Portal",
          "San Marino Residency Information",
          "San Marino Immigration Office",
          "Italy Visa Information",
          "San Marino Tourism & Entry Info",
        ],
      },
      {
        title: "Türkiye",
        paragraphs: [
          "Schengen vize başvurusu ve seyahat uyarıları için T.C. Dışişleri ve İtalya konsolosluk bölgesi bilgileri birlikte değerlendirilmelidir.",
        ],
      },
    ],
  },
];
