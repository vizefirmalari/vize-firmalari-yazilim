import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

export const SIRBISTAN_GUIDE_INTRO_PARAGRAPHS: string[] = [
  "Sırbistan; Batı Balkanlar’da şirket kurulumunun görece hızlı olması, vergi ve yaşam maliyeti dengesi, Belgrad merkezli iş piyasası ve uzun dönem oturum hatları nedeniyle Türk vatandaşları ve bölgesel yatırımcılar için sık araştırılan bir ülkedir. Schengen üyesi değildir; kısa giriş rejimi ile çalışma ve oturum izinleri ayrı hukuki katmanlardır.",
  "2024 sonrası dönemde çalışma izni ile geçici oturumun tek belge altında birleştirildiği Single Permit modeli ve Welcome to Serbia portalı üzerinden dijital başvuru akışı öne çıkmaktadır. Kesin belge listesi, süre ve ücretler için Sırbistan Dışişleri, oturum otoritesi ve portal duyurularını güncel doğrulayın; bu metin özet ve planlama amaçlıdır.",
];

export const SIRBISTAN_SEO_KEYWORD_TAGS: string[] = [
  "sırbistan vize",
  "serbia single permit",
  "welcome to serbia",
  "belgrade temporary residence",
  "serbia work permit",
  "doo serbia company",
  "turkey visa free serbia 90 days",
  "serbia residence permit property",
];

export const SIRBISTAN_GUIDE_SECTIONS: GuideSectionBlock[] = [
  {
    id: "vize-kosullari",
    tocLabel: "Vize koşulları",
    h2: "Kısa Giriş, D Tipi Vize ve Üçlü Çerçeve",
    lead:
      "Sistem genelde kısa süreli giriş (çoğu Türk vatandaşı için vizesiz), D tipi uzun süreli vize ve geçici oturum ile çalışma izninin (Single Permit ile birleşik) yönetimi olarak düşünülür.",
    accordions: [
      {
        title: "Schengen ile ilişki",
        paragraphs: [
          "Sırbistan Avrupa Birliği ve Schengen Bölgesi üyesi değildir; giriş ve kalış kuralları ulusal mevzuata dayanır.",
          "Schengen vizesi veya ikamet kartı Sırbistan’da otomatik çalışma veya kalıcı statü vermez; tablo ve muafiyetleri MFA vize rejimi ile kontrol edin.",
        ],
      },
      {
        title: "Üç temel yapı",
        paragraphs: ["Pratikte sık kullanılan üç hat:"],
        bullets: [
          "Kısa süreli giriş (çoğu Türk vatandaşı için vizesiz, yüz seksen gün içinde doksan güne kadar)",
          "D tipi uzun süreli ulusal vize (uzun kalış, çalışma, eğitim, şirket yönetimi, aile birleşimi vb.)",
          "Geçici oturum ve çalışma izni — 2024 sonrası çoğu çalışan senaryosunda Single Permit ile tek belge",
        ],
      },
      {
        title: "Türkiye vatandaşları — vizesiz kısa kalış",
        paragraphs: [
          "Türkiye Cumhuriyeti vatandaşlarının yüz seksen günlük referans dönem içinde toplam doksan güne kadar vizesiz giriş yapabildiği; turistik, kısa iş görüşmesi veya ziyaret amaçlı kullanılabildiği özetlenir.",
          "Bu rejimin maaşlı çalışma, yerel işverenle fiili istihdam veya resmî uzun süreli ikamet hakkı vermediği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "Sınırda seyahat amacı ve dönüş planı sorulabilir; vizesiz giriş garanti değildir — güncel MFA ve T.C. Dışişleri seyahat bilgisini okuyun.",
        },
      },
    ],
  },
  {
    id: "d-vize-single-permit",
    tocLabel: "D vize ve Single Permit",
    h2: "D Tipi Vize, Single Permit ve Welcome to Serbia",
    lead:
      "Uzun süreli kalış ve çalışma çoğu senaryoda önce D tipi vize veya uygun giriş hattı, ardından oturum ve izin başvurusu ile ilerler. Single Permit; çalışma izni ile geçici oturumu tek çatıda toplar.",
    accordions: [
      {
        title: "D tipi uzun süreli vize",
        paragraphs: [
          "D tipi vizenin uzun süreli kalış, çalışma, şirket yönetimi, eğitim ve aile birleşimi gibi amaçlarla kullanıldığı; birçok dosyada önce D alınıp sonra geçici oturum sürecine geçildiği anlatılır.",
        ],
      },
      {
        title: "Single Permit (tek izin)",
        paragraphs: [
          "2024 sonrası yürürlüğe giren düzenlemelerle çalışma izni ile geçici oturum izninin tek belge altında birleştirildiği, dijital başvuru ve elektronik takip imkânının güçlendiği özetlenir.",
          "Başvuruların büyük ölçüde Welcome to Serbia portalı üzerinden yürütüldüğü belirtilir; arayüz ve zorunlu adımlar güncellenebilir.",
        ],
        callout: {
          variant: "info",
          text: "Portal dışında konsolosluk veya işveren tarafı ek evrak talepleri olabilir; dosya türüne göre süre değişir.",
        },
      },
      {
        title: "Tipik çalışma süreci özeti",
        paragraphs: ["Sık anlatılan akış (kişiye göre değişir):"],
        bullets: [
          "İş teklifi veya işveren taahhüdü",
          "İşveren davetiyesi / sözleşme ve destek evrakları",
          "D tipi vize veya uygun giriş statüsü",
          "Single Permit ve bağlı oturum kartı süreçleri",
        ],
      },
    ],
  },
  {
    id: "calisma",
    tocLabel: "Çalışma",
    h2: "Çalışma İzni Türleri, Belgeler ve Sektör Pratiği",
    lead:
      "Standart istihdam, kendi şirketi üzerinden faaliyet, şirket kurarak oturum ve secondment (geçici görevlendirme) başlıca modellerdir. Evrak listesi sektöre göre sıkılaşabilir.",
    accordions: [
      {
        title: "Genellikle talep edilen belgeler",
        paragraphs: ["Çalışma ve Single Permit dosyalarında sık geçen kalemler:"],
        bullets: [
          "Pasaport",
          "İş sözleşmesi veya işveren taahhüdü",
          "Diploma ve mesleki sertifikalar",
          "Sağlık sigortası",
          "Adli sicil kaydı",
          "Adres kaydı veya konut kanıtı",
          "Finansal yeterlilik",
          "İşveren şirket evrakları",
        ],
      },
      {
        title: "Sektörel ekler",
        paragraphs: [
          "Sağlık, mühendislik, ulaştırma veya regüle mesleklerde mesleki lisans, teknik yeterlilik belgesi veya deneyim kanıtı istenebildiği özetlenir.",
        ],
      },
      {
        title: "Çalışma modelleri",
        paragraphs: ["Yaygın istihdam çerçeveleri:"],
        bullets: [
          "Standart çalışan — yerel işveren yanında",
          "Self-employment — kendi şirketi veya serbest meslek hattı",
          "Şirket kurarak oturum — DOO vb. üzerinden faaliyet ve oturum",
          "Secondment — yabancı şirket çalışanının Sırbistan’a geçici görevlendirilmesi",
        ],
      },
    ],
  },
  {
    id: "sirket-gayrimenkul",
    tocLabel: "Şirket ve gayrimenkul",
    h2: "DOO ile Oturum ve Konut Üzerinden Geçici Oturum",
    lead:
      "Limited şirket (DOO) kurulumu, vergi kaydı, banka hesabı ve faaliyet adresi ile şirket sahibi veya yöneticinin geçici oturum ve çalışma hattına geçebildiği anlatılır. Gayrimenkul satın almak tek başına otomatik statü vermez ancak geçici oturum gerekçesi olabilir.",
    accordions: [
      {
        title: "DOO ve operasyonel kurulum",
        paragraphs: [
          "Genellikle DOO kuruluşu, vergi numarası (PIB), banka hesabı ve gerçek veya hukuka uygun faaliyet adresi ile sürecin yürüdüğü özetlenir.",
          "Şirket sahibinin veya yöneticinin geçici oturum, çalışma hakkı ve bankacılık erişimi için dosya hazırlayabildiği belirtilir.",
        ],
      },
      {
        title: "Gayrimenkul ile geçici oturum",
        paragraphs: [
          "Konut satın alımı veya mülk sahipliğinin geçici oturum başvurusunda gerekçe olarak kullanılabildiği anlatılır.",
          "Mevzuatta herkes için tek tip minimum yatırım eşiği zorunlu olmayabilir; buna karşılık gerçek kullanım, adres kaydı ve finansal sürdürülebilirlik idare tarafından ayrıntılı incelenir.",
        ],
        callout: {
          variant: "warning",
          text: "“Sadece tapu alıp oturum garantisi” beklentisi risklidir; gelir, vergi ve ikamet ispatı bütünsel değerlendirilir.",
        },
      },
    ],
  },
  {
    id: "oturum",
    tocLabel: "Oturum",
    h2: "Geçici ve Kalıcı Oturum Şartları",
    lead:
      "Geçici oturum süreleri dosya türüne göre genelde bir yıl, bazı hallerde üç yıla kadar uzayabildiği anlatılır. Kalıcı oturum uzun süreli yasal ikamet ve uyum şartlarına bağlıdır.",
    accordions: [
      {
        title: "Geçici oturum",
        paragraphs: [
          "İlk onayların çoğunlukla bir yıllık çerçevede verildiği; uygun gerekçelerde üç yıllık uzatılmış sürelerin görülebildiği özetlenir.",
          "Adres kaydı, vergi beyanı ve sözleşme ile uyumun yenilemelerde kritik olduğu vurgulanır.",
        ],
      },
      {
        title: "Kalıcı oturum",
        paragraphs: [
          "Uzun süreli kesintisiz yasal ikamet, vergi uyumu, düzenli adres kaydı ve sabit gelir gösterimi gibi unsurların değerlendirildiği anlatılır.",
        ],
      },
    ],
  },
  {
    id: "vatandaslik",
    tocLabel: "Vatandaşlık",
    h2: "Doğallaşma ve Uzun Süreli Yaşam",
    lead:
      "Sırbistan vatandaşlığı genelde uzun süreli yasal ikamet, entegrasyon ve dil uyumu ekseninde değerlendirilir. Bazı özet kaynaklarda yaklaşık sekiz yıllık yasal yaşam sonrası başvuru hattından söz edilir — kesin süre ve istisnaları güncel kanun metninden doğrulayın.",
    accordions: [
      {
        title: "Genel çerçeve",
        paragraphs: [
          "Vatandaşlık başvurularının sürekli ikamet, vergi ve toplumsal uyum dosyası üzerinden ilerdiği; dil sınavı veya entegrasyon şartlarının başvuru türüne göre değişebildiği belirtilir.",
        ],
        callout: {
          variant: "info",
          text: "Süre eşikleri ve muafiyetler kişisel duruma göre değişir; avukat veya resmî rehberlik şarttır.",
        },
      },
    ],
  },
  {
    id: "is-bulma",
    tocLabel: "İş bulma",
    h2: "Belgrad, Novi Sad, Niş ve Sektör Talebi",
    lead:
      "Yazılım, inşaat, lojistik, otelcilik, çağrı merkezi ve üretim hatlarında yabancı iş gücü talebi bulunur. Belgrad yabancı çalışan yoğunluğu ve maaş bantları açısından öne çıkar.",
    accordions: [
      {
        title: "Talep gören alanlar",
        paragraphs: ["Sık öne çıkan sektörler:"],
        bullets: [
          "Yazılım ve IT hizmetleri",
          "İnşaat ve teknik işler",
          "Lojistik ve üretim",
          "Otel, restoran ve çağrı merkezi",
          "Mühendislik ve saha operasyonları",
        ],
      },
      {
        title: "Şehir seçimi",
        paragraphs: [
          "Belgrad’ın en güçlü iş piyasası ve görece yüksek yaşam maliyeti sunduğu; Novi Sad ve Niş’in denge alternatifleri olduğu özetlenir.",
        ],
      },
      {
        title: "Başvuru kanalları",
        paragraphs: ["Yaygın arama yöntemleri:"],
        bullets: [
          "LinkedIn ve uluslararası işe alım şirketleri",
          "Balkan kariyer portalları ve yerel şirket kariyer sayfaları",
          "İşveren sponsorlu Single Permit süreci",
        ],
      },
    ],
  },
  {
    id: "staj-egitim",
    tocLabel: "Staj ve eğitim",
    h2: "Üniversite, Staj ve Öğrenci Oturumu",
    lead:
      "Üniversite stajları, değişim programları ve özel şirket stajları mümkündür. Uzun süreli eğitimde öğrenci oturumu, sağlık sigortası ve finansal yeterlilik dosyası gerekir.",
    accordions: [
      {
        title: "Staj ve değişim",
        paragraphs: [
          "Üniversite iş birliği stajları ile Erasmus benzeri değişimlerin yanı sıra özel sektör staj sözleşmelerinin bulunduğu anlatılır.",
        ],
      },
      {
        title: "Öğrenci oturumu",
        paragraphs: [
          "Uzun süreli eğitimde kabul mektubu, konut, sigorta ve yaşam masrafı kanıtının oturum dosyasında toplandığı özetlenir.",
        ],
      },
    ],
  },
  {
    id: "saglik-egitim",
    tocLabel: "Sağlık ve eğitim sistemi",
    h2: "Sigorta, Devlet ve Özel Üniversiteler",
    lead:
      "Uzun süreli oturumlarda sağlık sigortası veya kayıtlı güvence çoğu zaman zorunludur. Ülkede devlet ve özel üniversiteler ile İngilizce programlar mevcuttur.",
    accordions: [
      {
        title: "Sağlık güvencesi",
        paragraphs: [
          "Geçici oturum ve çalışma dosyalarında özel sağlık poliçesi veya sistemde kayıtlı güvence beklentisinin yaygın olduğu; acil durumlar için poliçe kapsamının okunması gerektiği vurgulanır.",
        ],
      },
      {
        title: "Yükseköğretim",
        paragraphs: [
          "Devlet ve özel üniversitelerde İngilizce programların yabancı öğrenci çektiği; eğitim yoluyla oturum modelinin planlı yürütülmesi gerektiği belirtilir.",
        ],
      },
    ],
  },
  {
    id: "konut-yasam",
    tocLabel: "Konut ve yaşam",
    h2: "Kira Bantları ve Günlük Giderler",
    lead:
      "Belgrad Balkan ortalamasına göre daha yüksek kira ve hizmet maliyeti sunar; Novi Sad ve Niş görece uygun alternatiflerdir. Enerji ve market giderleri birçok Batı Avrupa şehrine göre düşük kabul edilir.",
    accordions: [
      {
        title: "Konut piyasası",
        paragraphs: [
          "Merkezî semtlerde kira baskısının Belgrad’da en yüksek olduğu; sözleşmede depozito ve fesih şartlarının dikkatle incelenmesi gerektiği özetlenir.",
        ],
      },
      {
        title: "Yaşam maliyeti",
        paragraphs: [
          "Ulaşım, market ve yeme-içme harcamalarının komşu AB ülkelerine göre genelde daha düşük seyrettiği; buna karşılık döviz kuru dalgalanmalarının bütçeyi etkilediği hatırlatılır.",
        ],
      },
    ],
  },
  {
    id: "turistik-vize",
    tocLabel: "Turistik vize",
    h2: "Kısa Süreli Ziyaret ve Sınır Pratiği",
    lead:
      "Türk vatandaşları için vizesiz kısa kalış turistik ve sınırlı ticari temas içindir; çalışma veya uzun ikamet bu hat üzerinden yürütülmez.",
    accordions: [
      {
        title: "Doksan / yüz seksen gün disiplini",
        paragraphs: [
          "Referans dönem içinde toplam doksan günlük sınırın aşılmaması ve sınır görevlilerinin ek belge isteyebileceği unutulmamalıdır.",
        ],
      },
    ],
  },
  {
    id: "calisma-uyum",
    tocLabel: "Çalışma uyumu ve riskler",
    h2: "Kayıt, Vergi ve Kayıt Dışı Çalışma Sonuçları",
    lead:
      "Yabancı çalışan kaydı, sosyal güvenlik ve vergi bildirimi düzenli yürütülmelidir. Kayıt dışı çalışma ret, para cezası, giriş yasağı ve oturum iptali riski taşır.",
    accordions: [
      {
        title: "Uyum yükümlülükleri",
        paragraphs: [
          "İşveren ve çalışanın bordro, PIB üzerinden beyan ve adres güncellemelerini zamanında yapması beklenir.",
        ],
      },
      {
        title: "Kayıt dışı çalışma",
        paragraphs: [
          "Turistik girişle maaşlı faaliyet veya izinsiz serbest meslek yürütmenin idari ve cezai sonuç doğurabildiği vurgulanır.",
        ],
        callout: {
          variant: "warning",
          text: "İşe başlamadan önce Single Permit veya yetkili istisnai hat tamamlanmalıdır.",
        },
      },
    ],
  },
  {
    id: "guncellemeler-hatalar",
    tocLabel: "2025–2026 ve sık hatalar",
    h2: "Dijitalleşme ve Başvuru Tuzakları",
    lead:
      "Yeni dönemde online başvuru, tek izin modeli ve elektronik belge yönetimi öne çıkmaktadır. Aşağıdaki hatalar ret veya yaptırıma yol açabilir.",
    accordions: [
      {
        title: "2025–2026 vurguları",
        paragraphs: [
          "Süreçlerin dijitalleşmesi, portal üzerinden takip ve onay hatlarının güçlenmeye devam ettiği; 2025 itibarıyla ek dijital giriş veya onay araçlarının geliştirilmekte olduğu genel çerçevede bilinir.",
        ],
      },
      {
        title: "En sık yapılan hatalar",
        paragraphs: ["Başvuru ve yaşam pratiğinde kaçınılması gerekenler:"],
        bullets: [
          "Turistik girişle çalışmaya başlamak",
          "Eksik veya gecikmiş adres kaydı",
          "Apostil veya legalizasyon eksikliği",
          "Sahte veya pasif şirket modeli",
          "Vergi kaydı açmadan faaliyet",
          "Eksik sağlık sigortası veya gelir beyanı",
        ],
      },
    ],
  },
  {
    id: "kaynaklar",
    tocLabel: "Resmî kaynaklar",
    h2: "Doğrulama ve Seyahat Bilgisi",
    lead:
      "Aşağıdaki kaynaklar güncel tablo, portal ve seyahat uyarıları için başlangıç noktasıdır; İngilizce resmî başlıklar arama motorunda doğrudan eşleşme sağlar.",
    accordions: [
      {
        title: "Sırbistan ve başvuru portalı",
        paragraphs: ["İlk başvurulacak adresler (resmî siteler):"],
        bullets: [
          "Serbia MFA — visa requirements",
          "Welcome to Serbia — residence and permit başvuruları",
          "Temporary residence / Single Permit bilgi sayfaları (İçişleri ve ilgili idari birim duyuruları)",
        ],
      },
      {
        title: "Türkiye Cumhuriyeti vatandaşları",
        paragraphs: [
          "T.C. Dışişleri Bakanlığı’nın Sırbistan seyahat ve güvenlik düzenlemeleri sayfası seyahat öncesi mutlaka okunmalıdır.",
        ],
        callout: {
          variant: "info",
          text: "Linkler zamanla değişebilir; site içi arama ile “Serbia visa”, “Welcome to Serbia”, “Single Permit” anahtar kelimelerini kullanın.",
        },
      },
    ],
  },
];
