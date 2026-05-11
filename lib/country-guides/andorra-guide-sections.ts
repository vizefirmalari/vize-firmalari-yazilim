import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const ANDORRA_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Andorra; Fransa ile İspanya arasında, Pireneler’de yer alan küçük yüzölçümüne rağmen yüksek kişi başı gelir, düşük kurumlar vergisi ve güvenli yaşam çerçevesiyle girişimciler, yatırımcılar ve uzaktan çalışan profesyoneller için sık araştırılan bir prensliktir.",
  "Ülkenin fiilen kara ile erişilmesi ve uluslararası havaalanının bulunmaması, çoğu ziyaretçi ve aday mukim için önce Schengen alanına hukuken geçer şekilde girmeyi zorunlu kılar. Active residence ve passive residence hatları, fiziksel kalış ve vergi sonuçları açısından katıdır; tutarlar ve kotalar yıllık değişebilir — resmî Andorra hükümeti ve göç bilgi portallarından güncel doğrulayın.",
];

export const ANDORRA_SEO_KEYWORD_TAGS: string[] = [
  "andorra vize",
  "andorra active residence",
  "andorra passive residence",
  "schengen transit andorra",
  "andorra la vella residence",
  "andorra company formation",
  "andorra immigration 2026",
  "andorra tax residence",
];

export const ANDORRA_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Schengen Transit, Kara Girişi ve Andorra’nın Statüsü",
    lead:
      "Andorra Avrupa Birliği ve Schengen üyesi değildir; ancak kara sınırı büyük ölçüde Fransa ve İspanya ile bağlantılıdır. Pratikte çoğu üçüncü ülke vatandaşı için Schengen giriş hakkı veya vizesi ulaşım için kritiktir.",
    accordions: [
      {
        title: "Andorra Schengen üyesi mi?",
        paragraphs: [
          "Andorra ne AB ne Schengen tam üyesidir.",
          "Buna karşılık sınır pratiği komşu Schengen devletleriyle iç içedir; Schengen kuralları ulaşım ve transit açısından fiilen belirleyici olabilir.",
          "Andorra’da düzenlenen oturum izni otomatik olarak Schengen bölgesinde serbest dolaşım hakkı doğurmaz.",
        ],
      },
      {
        title: "Ulaşım ve havaalanı",
        paragraphs: [
          "Andorra’da uluslararası ticari havaalanı bulunmadığı; girişin çoğunlukla İspanya (ör. Barselona) veya Fransa (ör. Toulouse) ekseninde kara yoluyla yapıldığı özetlenir.",
        ],
        callout: {
          variant: "warning",
          text: "Türk vatandaşları için tipik senaryo: önce Schengen alanına geçerli Schengen vizesi veya muafiyetle girmek, ardından kara ile Andorra’ya geçmektir. Rotanızı konsolosluk ve havayolu bagaj kurallarıyla birlikte planlayın.",
        },
      },
    ],
  },
  {
    id: "active-residence",
    tocLabel: "Active residence",
    h2: "Çalışmalı Oturum (Active Residence)",
    lead:
      "Çalışanlar, şirket sahipleri, girişimciler ve dijital profesyoneller için ana modeldir. Genelde Andorra’da çalışma veya şirket kurma ile bağlanır; yıllık fiziksel kalış şartı ve vergi mukimliği açısından önemlidir.",
    accordions: [
      {
        title: "Temel şartlar",
        paragraphs: [
          "Yerel iş sözleşmesi veya aktif şirket yönetimi üzerinden dosya açılabildiği; göçmenlik ve ekonomi bakanlığı çizgisinde onay süreçlerinin yürüdüğü anlatılır.",
        ],
      },
      {
        title: "Minimum kalış (yüz seksen üç gün)",
        paragraphs: [
          "Active residence sahiplerinin genellikle takvim yılında en az yüz seksen üç gün Andorra’da bulunması beklendiği; bunun vergi mukimliği ve dosya yenilemesi için de referans alındığı özetlenir.",
        ],
        callout: {
          variant: "info",
          text: "Kesin gün sayımı ve istisnalar resmî rehberde güncellenir; seyahat günlüğünüzü ve adres kaydınızı düzenli tutun.",
        },
      },
      {
        title: "2026 kota ve sıkılaşma",
        paragraphs: [
          "Kamuoyuna yansıyan özetlerde çalışma ve aktif oturum kotasının daraltıldığı, yeni izin sayılarının sınırlandırıldığı aktarılmaktadır — güncel kota tablosunu Andorra hükümeti ve göç duyurularından teyit edin.",
        ],
        callout: {
          variant: "warning",
          text: "Çalışma temelli başvurularda erken dosya hazırlığı ve işveren taahhüdü kritik hale gelmiştir.",
        },
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "İşveren Sponsorluğu ve Çalışma Onayı",
    lead:
      "Yerel işveren yanında çalışacak yabancıların çoğu iş sözleşmesi, sponsorluk ve göçmenlik onayı üçlüsüyle ilerler.",
    accordions: [
      {
        title: "Sık istenen belgeler",
        paragraphs: ["Dosyalarda yaygın olarak geçen evraklar (liste tamamlayıcı olabilir):"],
        bullets: [
          "Pasaport",
          "İş sözleşmesi",
          "Adli sicil kaydı",
          "Sağlık raporu ve sigorta",
          "Konaklama veya adres bilgisi",
          "Finansal yeterlilik kanıtı",
        ],
      },
      {
        title: "Kayıt dışı risk",
        paragraphs: [
          "İzinsiz çalışmanın para cezası, oturum iptali ve sınır aşamasında sorun doğurabildiği vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "sirket-oturum",
    tocLabel: "Şirket kurulumu",
    h2: "Şirket Kurarak Oturum ve Gerçek Faaliyet",
    lead:
      "Danışmanlık, yazılım, dijital hizmet ve yatırım şirketleri üzerinden başvurular yoğundur. İdare gerçek yönetim ve faaliyet göstermeyi bekler; kağıt üzeri şirket modelleri risklidir.",
    accordions: [
      {
        title: "Şirket ve yönetim rolü",
        paragraphs: [
          "Başvuru sahibinin hissedar ve yönetimde aktif rol alması beklendiği; bazı özet kaynaklarda minimum yüzde on ile yüzde otuz dört bandında hisse şartından söz edildiği belirtilir — güncel sermaye ve hisse kurallarını resmî metinle doğrulayın.",
        ],
      },
      {
        title: "Faaliyet ispatı",
        paragraphs: [
          "Gelir, fatura, banka hareketleri ve ofis veya faaliyet adresi ile işin Andorra ekonomisine bağlandığının gösterilmesi gerekir.",
        ],
        callout: {
          variant: "warning",
          text: "Pasif faaliyet göstermeyen şirket dosyaları ret veya kara liste riski taşır.",
        },
      },
    ],
  },
  {
    id: "passive-residence",
    tocLabel: "Passive residence",
    h2: "Pasif Oturum ve Yatırım / Gelir Şartları",
    lead:
      "Yatırımcılar, yüksek gelirli bireyler, emekliler ve uluslararası geliri olan uzaktan çalışanlar için kullanılan hat anlatılır. Yerel maaşlı çalışma hakkı vermez; finansal ve kalış şartları ayrıdır.",
    accordions: [
      {
        title: "Minimum kalış (doksan gün)",
        paragraphs: [
          "Passive residence kapsamında yılda en az doksan gün Andorra’da bulunulması gerektiği genel çerçevede bilinir — güncel süre ve istisnaları resmî kılavuzdan okuyun.",
        ],
      },
      {
        title: "Finansal eşikler ve yatırım",
        paragraphs: [
          "2025–2026 döneminde yatırım ve finansal yeterlilik eşiklerinin yükseltildiği ve kontrollerin sıkılaştığı yönünde kamuoyu özetleri dolaşmaktadır.",
          "Bazı ikincil kaynaklarda bir milyon Euro üstü toplam yatırım veya sekiz yüz bin Euro bandında uygun yatırım kalemlerinden söz edilmektedir; rakamlar reformlarla değişebilir.",
        ],
        callout: {
          variant: "warning",
          text: "Euro tutarları, depozito ve devlet katkısı kalemlerini yalnızca Govern d’Andorra ve yetkili danışmanlık ile kesinleştirin.",
        },
      },
      {
        title: "AFA depozito ve katkılar",
        paragraphs: [
          "Başvuru sahiplerinden ana dosya için on binlerce Euro düzeyinde depozito veya katkı talep edilebildiği; bağımlılar için ek kalemlerin eklenebildiği özetlenir.",
          "Bazı 2026 düzenleme özetlerinde bu ödemelerin bir kısmının geri ödemesiz hale geldiği yönünde yorumlar bulunmaktadır — sözleşme ve resmî tarifeyi mutlaka inceleyin.",
        ],
      },
    ],
  },
  {
    id: "dijital-profesyonel",
    tocLabel: "Dijital göçebe",
    h2: "Uzaktan Çalışan ve Uluslararası Gelir Modelleri",
    lead:
      "Andorra son yıllarda dijital profesyoneller, içerik üreticileri ve uluslararası gelir elde eden danışmanlar için özel çerçeveler geliştirmektedir; hangi residence türüne bağlanacağı dosyaya göre ayrılır.",
    accordions: [
      {
        title: "Hedef kitle",
        paragraphs: [
          "Gelirin büyük bölümünün Andorra dışından elde edilmesi ve vergilendirme ile sosyal güvenlik uyumunun planlanması gerektiği vurgulanır.",
        ],
      },
      {
        title: "Active ile passive ayrımı",
        paragraphs: [
          "Passive residence ile yerel maaşlı istihdamın karıştırılmaması; çalışma niyeti varsa active hat veya uygun çalışma izni çizgisinin seçilmesi gerektiği belirtilir.",
        ],
        callout: {
          variant: "warning",
          text: "Passive residence ile Andorra işvereninde maaşlı çalışmaya başlamak sık yapılan ve ciddi sonuç doğuran hatadır.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Dar Piyasa ve Öne Çıkan Sektörler",
    lead:
      "Nüfus küçük olduğundan iş ilanı sayısı sınırlıdır; turizm, otelcilik, kayak merkezleri, perakende, finans ve dijital hizmetler öne çıkar.",
    accordions: [
      {
        title: "Sektör özeti",
        paragraphs: ["Yoğun talep gören başlıklar:"],
        bullets: [
          "Turizm ve kayak merkezleri",
          "Otel ve restoran",
          "Perakende",
          "Finans ve profesyonel hizmetler",
          "Dijital ve danışmanlık",
        ],
      },
      {
        title: "Maaş ve yaşam dengesi",
        paragraphs: [
          "Maaş bantlarının bölgeye göre yüksek olabildiği; konut ve kira maliyetlerinin son yıllarda hızla arttığı ve bütçe planlamasında ilk kalemi oluşturduğu özetlenir.",
        ],
      },
    ],
  },
  {
    id: "konut-yasam",
    tocLabel: "Konut ve yaşam",
    h2: "Andorra la Vella, Escaldes ve Kira Piyasası",
    lead:
      "Andorra la Vella ve Escaldes-Engordany talebin en yoğun olduğu bölgelerdir. Arz kısıtı ve yabancı yoğunluğu kira baskısını artırmıştır.",
    accordions: [
      {
        title: "Konut erişimi",
        paragraphs: [
          "2025–2026 döneminde konut erişiminin ülkedeki en görünür sorunlardan biri hâline geldiği kamuoyunda sık tekrarlanır.",
        ],
      },
      {
        title: "Arama pratiği",
        paragraphs: [
          "Yerel emlak ofisleri, referans ağları ve uzun süreli sözleşmelerde depozito şartlarının dikkatle okunması önerilir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim",
    h2: "Sigorta, Okullar ve Çok Dillilik",
    lead:
      "Çoğu oturum türünde özel sağlık sigortası zorunludur; süreklilik kontrolleri sıkıdır. Eğitimde Fransız, İspanyol ve Andorra sistemleri yan yana bulunur.",
    accordions: [
      {
        title: "Sağlık",
        paragraphs: [
          "Poliçe kesintisizliği ve kapsam limitlerinin dosya ve yenileme aşamalarında denetlendiği belirtilir.",
        ],
      },
      {
        title: "Eğitim",
        paragraphs: [
          "Devlet ve özel okulların yanı sıra uluslararası program sunan özel kurumların bulunduğu; eğitim yoluyla oturum planının erken danışmanlık gerektirdiği özetlenir.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Uzun Süre, Entegrasyon ve Çifte Vatandaşlık",
    lead:
      "Andorra vatandaşlığı Avrupa’da en kısıtlayıcı süreçlerden biri olarak anlatılır. Bazı özet kaynaklarda yaklaşık yirmi yıllık yasal yaşam, sürekli ikamet ve önceki vatandaşlıktan çıkış gibi unsurlardan söz edilir — güncel kanunu mutlaka okuyun.",
    accordions: [
      {
        title: "Çifte vatandaşlık",
        paragraphs: [
          "Andorra’nın çifte vatandaşlığı geniş biçimde kabul etmediği; vatandaşlık kararının kişisel duruma göre çok dikkatli değerlendirilmesi gerektiği vurgulanır.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Ziyaret ve Schengen Bağı",
    lead:
      "Andorra’ya turistik veya kısa ticari ziyaret planlayanların kara geçişinde Schengen statüsünü taşıması gerekir; Andorra içi kalış süresi Schengen yüz seksen / doksan gün hesabını etkileyebileceği yönünde pratik uyarılar bulunur — rotanızı Schengen konsolosluklarıyla netleştirin.",
    accordions: [
      {
        title: "Planlama",
        paragraphs: [
          "Barselona ve Toulouse hatlarında kara sınırı geçişlerinde pasaport kontrolü ve Schengen damga pratiğini göz önünde bulundurun.",
        ],
      },
    ],
  },
  {
    id: "guncellemeler-hatalar",
    tocLabel: "2025–2026 ve sık hatalar",
    h2: "Reform Özeti ve Başvuru Tuzakları",
    lead:
      "Son dönemde yatırım eşikleri, residence kotası, sigorta denetimleri ve dijital başvuru kanalları sık güncellenmektedir.",
    accordions: [
      {
        title: "Kritik değişiklik başlıkları",
        paragraphs: ["Özetlenen gündem maddeleri:"],
        bullets: [
          "Yatırım ve finansal yeterlilik eşiklerinde artış",
          "Aktif residence kotasında daralma",
          "Sağlık sigortası kontrollerinde sıkılaşma",
          "Dijital başvuru ve belge sisteminin genişlemesi",
          "Yabancı yatırım incelemelerinde derinleşme",
        ],
      },
      {
        title: "Sık yapılan hatalar",
        paragraphs: ["Ret, iptal veya vergi riski doğurabilecek davranışlar:"],
        bullets: [
          "Schengen hakkı olmadan giriş planlamak",
          "Passive residence ile yerel maaşlı çalışmaya başlamak",
          "Yetersiz finansal belge",
          "Gerçek faaliyet göstermeyen şirket kurmak",
          "Sigorta sürekliliğini bozmak",
          "Fiziksel kalış şartını ihlal etmek",
        ],
      },
    ],
  },
  {
    id: "kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama ve İngilizce Arama",
    lead:
      "Aşağıdaki başlıklar arama motorunda resmî sayfalara ulaşmak için kullanılabilir; URL’ler değişebilir.",
    accordions: [
      {
        title: "Andorra resmî çizgi",
        paragraphs: ["Başlangıç noktaları:"],
        bullets: [
          "Govern d’Andorra — hükümet portalı",
          "Citizen information / welcome and residency bilgi sayfaları",
          "Active residence ve immigration quota güncellemeleri",
        ],
      },
      {
        title: "Türkiye ve transit",
        paragraphs: [
          "T.C. Dışişleri Bakanlığı’nın seyahat ve güvenlik uyarıları ile Schengen başvuru merkezi süreçleri ulaşım planının parçasıdır.",
        ],
        callout: {
          variant: "info",
          text: "Euro tutarları, depozito ve kota rakamlarını yalnızca resmî duyuru veya Andorra’da yetkili profesyonel danışmanlık ile kilitleyin.",
        },
      },
    ],
  },
];
