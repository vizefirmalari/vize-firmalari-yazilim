import type { CountryGuideTopicKey } from "@/lib/country-guides/topics";
import { COUNTRY_GUIDE_TOPIC_KEYS } from "@/lib/country-guides/topics";

/** Bölge sırası sabit: Kuzey Amerika → … → Afrika */
export type CountryGuideRegionId =
  | "north_america"
  | "schengen"
  | "europe_non_schengen_uk"
  | "middle_east"
  | "asia"
  | "africa";

export type CountryGuideEntry = {
  slug: string;
  /** Türkçe görünen ad */
  nameTr: string;
  /** Bayrak (flagcdn ISO 3166-1 alpha-2) */
  iso2: string;
  /**
   * Ana sayfa `countries` CSV ile birebir eşleşmeli (`country-filter-catalog.json`).
   */
  firmCatalogCountryLabel: string;
  shortIntro: string;
  topics: CountryGuideTopicKey[];
  seoTitle: string;
  metaDescription: string;
};

export type CountryGuideRegion = {
  id: CountryGuideRegionId;
  title: string;
  description: string;
  seoIntro: string;
  countries: CountryGuideEntry[];
};

const ALL_TOPICS: CountryGuideTopicKey[] = [...COUNTRY_GUIDE_TOPIC_KEYS];

function entry(
  slug: string,
  nameTr: string,
  iso2: string,
  firmCatalogCountryLabel: string,
  shortIntro: string,
  seoTitle: string,
  metaDescription: string,
  topics: CountryGuideTopicKey[] = ALL_TOPICS
): CountryGuideEntry {
  return {
    slug,
    nameTr,
    iso2: iso2.toLowerCase(),
    firmCatalogCountryLabel,
    shortIntro,
    topics,
    seoTitle,
    metaDescription,
  };
}

/**
 * Tek kaynak: bölgesel ülke rehberi kataloğu.
 * Schengen üyeliği güncel AB/Schengen mantığına göre; İrlanda ve Kıbrıs Schengen dışı.
 */
export const COUNTRY_GUIDE_REGIONS: CountryGuideRegion[] = [
  {
    id: "north_america",
    title: "Kuzey Amerika",
    description:
      "ABD, Kanada, Orta Amerika ve Karayip ülkelerine yönelik vize, çalışma, eğitim ve oturum rehberlerini inceleyin.",
    seoIntro:
      "Kuzey Amerika hedefli başvurularda turistik ve çalışma vizeleri, oturum süreçleri ve ülkeye özel koşullar için ülke rehberlerine giriş yapın.",
    countries: [
      entry(
        "amerika",
        "Amerika",
        "us",
        "Amerika",
        "Turistik, çalışma ve yatırımcı vizeleri ile Green Card süreçlerine giriş.",
        "Amerika Vize ve Oturum Rehberi 2026 | Çalışma, Green Card ve Başvuru Süreci",
        "ABD vize, çalışma, Green Card ve oturum süreçlerini adım adım öğrenin. Amerika’ya gitmek için gerekli şartlar ve başvuru rehberi."
      ),
      entry(
        "kanada",
        "Kanada",
        "ca",
        "Kanada",
        "Express Entry, TRV, çalışma izni ve PR (kalıcı oturum) ile yapılandırılmış yoğun bir göç sistemine giriş.",
        "Kanada Vize ve Oturum Rehberi 2026 | Express Entry, TRV ve Çalışma İzni",
        "Kanada TRV, çalışma izni, Express Entry, PNP ve kalıcı oturum süreçleri; güncel şartları IRCC ile doğrulayın. Platformda Kanada’ya hizmet veren firmaları keşfedin."
      ),
      entry(
        "meksika",
        "Meksika",
        "mx",
        "Meksika",
        "INM süreçleri, turistik giriş, geçici / kalıcı oturum ve çalışma yetkisine giriş.",
        "Meksika Vize ve Oturum Rehberi 2026 | INM, TR ve Çalışma İzni",
        "Meksika turistik vize, FMM, geçici oturum, kalıcı oturum ve INM çalışma süreçleri; güncel ücret ve tutarları resmî kaynakla doğrulayın. Platformda Meksika’ya hizmet veren firmaları keşfedin."
      ),
      entry(
        "panama",
        "Panama",
        "pa",
        "Panama",
        "Qualified Investor, Friendly Nations, SEM ve kanal bölgesi çalışma izinlerine giriş.",
        "Panama Vize ve Oturum Rehberi 2026 | Yatırımcı, Friendly Nations ve PR",
        "Panama turistik giriş, çalışma izni, yatırımcı ve kalıcı oturum süreçleri; güncel eşikleri SNM ve resmî duyurularla doğrulayın. Platformda Panama’ya hizmet veren firmaları keşfedin."
      ),
      entry(
        "kostarika",
        "Kosta Rika",
        "cr",
        "Kostarika",
        "Digital Nomad, Pensionado/Rentista ve Inversionista residency yollarına giriş.",
        "Kosta Rika Vize ve Oturum Rehberi 2026 | Digital Nomad ve Residency",
        "Kosta Rika turistik giriş, çalışma izni, dijital göçebe ve yatırımcı oturum süreçleri; güncel şartları migracion.go.cr ile doğrulayın. Platformda Kosta Rika’ya hizmet veren firmaları keşfedin."
      ),
      entry(
        "dominik-cumhuriyeti",
        "Dominik Cumhuriyeti",
        "do",
        "Dominik Cumhuriyeti",
        "Yatırımcı ve aile birleşimi residency, Pensionado ve turistik girişe giriş.",
        "Dominik Cumhuriyeti Vize ve Oturum Rehberi 2026 | Residency ve E-Ticket",
        "Dominik Cumhuriyeti çalışma izni, yatırımcı oturum ve aile birleşimi süreçleri; E-Ticket ve güncel şartları migracion.gob.do ile doğrulayın. Platformda Dominik Cumhuriyeti’ne hizmet veren firmaları keşfedin."
      ),
    ],
  },
  {
    id: "schengen",
    title: "Schengen Bölgesi",
    description:
      "Schengen ülkeleri için turistik, çalışma, eğitim ve kısa süreli başvuru süreçlerini tek katalog altında keşfedin.",
    seoIntro:
      "Bulgaristan, Hırvatistan ve Romanya dahil güncel Schengen üyesi ülkeler; ortak Schengen kuralları ile ulusal istisnalara dair rehber girişleri.",
    countries: [
      entry(
        "almanya",
        "Almanya",
        "de",
        "Almanya",
        "Çalışma, aile birleşimi ve turistik Schengen başvurularına giriş.",
        "Almanya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Almanya’da iş arama, başvuru kültürü, staj, mesleki eğitim, taşınma ve çalışma-yaşam başlıklarında EURES kaynaklı özet rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "avusturya",
        "Avusturya",
        "at",
        "Avusturya",
        "AMS ve alle jobs ile iş arama, Mietrecht ve Meldeamt, marjinal eşik ve Lehre başlıklarında EURES özetine giriş.",
        "Avusturya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Avusturya’da iş arama, başvuru kültürü, staj, çıraklık, taşınma, kira ve kayıt, çalışma-yaşam ve vergi-sağlık başlıklarında EURES kaynaklı özet rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "belcika",
        "Belçika",
        "be",
        "Belçika",
        "Schengen ve çalışma izni süreçlerine giriş.",
        "Belçika Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "VDAB, Forem, Actiris ve ADG çerçevesinde iş arama, staj ve ikili öğrenme, ikamet kaydı ve çalışma koşullarında EURES kaynaklı özet; resmî bilgileri belgium.be ve bölge mercilerinden doğrulayın."
      ),
      entry(
        "bulgaristan",
        "Bulgaristan",
        "bg",
        "Bulgaristan",
        "İstihdam Ajansı kaydı, staj ve işyerinde eğitim, NZOK ve NAP pratikleriyle EURES özetine giriş.",
        "Bulgaristan Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Bulgaristan’da iş arama, başvuru, staj, işyerinde eğitim, konut, AB ikameti, çalışma koşulları ve sağlık başlıklarında EURES kaynaklı özet rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "cekya",
        "Çekya",
        "cz",
        "Çekya",
        "Úřad práce, DPP/DPČ, koruna ve OAMP kayıtlarıyla EURES özetine giriş.",
        "Çekya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Çekya’da iş arama, başvuru, staj, meslekî eğitim, konut, ikamet, çalışma koşulları ve vergi–sağlık başlıklarında EURES kaynaklı özet rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "danimarka",
        "Danimarka",
        "dk",
        "Danimarka",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Danimarka Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Jobcenter ve jobnet.dk, Workindenmark ile İngilizce iş arama, SIRI AB oturum belgesi ve CPR, toplu sözleşme modeli ve NemKonto bordro, isteğe bağlı A‑kasse, skat.dk vergi ve yüksek yaşam maliyeti ile sarı kart sağlık sistemi özetleriyle EURES kaynaklı rehber; güncel bilgileri lifeindenmark.borger.dk ve nyidanmark.dk üzerinden doğrulayın."
      ),
      entry(
        "estonya",
        "Estonya",
        "ee",
        "Estonya",
        "E-devlet, Tallinn iş piyasası ve geçici oturuma giriş.",
        "Estonya İş ve Yaşam Rehberi 2026 | Schengen, Oturum ve Blue Card",
        "Estonya’da iş arama, residence permit, dijital göçebe ve startup yolları, vergi (emta.ee) ve sağlık (tervisekassa.ee) başlıklarında özet; güncel şartları politsei.ee ve Work in Estonia üzerinden doğrulayın."
      ),
      entry(
        "finlandiya",
        "Finlandiya",
        "fi",
        "Finlandiya",
        "Migri oturum izni, Specialist ve startup yollarına giriş.",
        "Finlandiya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve Helsinki",
        "Finlandiya’da Schengen C vizesi, çalışma residence permit, Blue Card, Kela ve vergi (vero.fi) başlıklarında özet; maaş eşikleri ve startup şartları migri.fi ile güncel teyit edilmelidir."
      ),
      entry(
        "fransa",
        "Fransa",
        "fr",
        "Fransa",
        "France Travail, APEC ve Cap Emploi ile iş arama; alternance ve staj; SMIC ve bordro; préfecture ikamet; CPAM sağlık ve eğitim başlıklarına giriş.",
        "Fransa Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "EURES “Fransa’da yaşam ve çalışma koşulları” özetine dayanır: France Travail ve uluslararası iş arama, CV ve ön yazı, staj ve vize ayrımı, çıraklık ücret tabloları, konut ve okul kaydı, AB/EEA ikamet kartı ve üçüncü ülke yolları, iş sözleşmeleri ve SMIC, izinler, vergi, sağlık ve engelli istihdamı; güncel bilgileri service-public.fr ve francetravail.fr üzerinden doğrulayın."
      ),
      entry(
        "hirvatistan",
        "Hırvatistan",
        "hr",
        "Hırvatistan",
        "HZZ Burza rada, OIB, geçici oturum, asgari ücret ve Adriyatik bölgesinde konut fiyatları başlıklarına giriş.",
        "Hırvatistan Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "EURES “Hırvatistan’da yaşam ve çalışma koşulları” özetine dayanır: istihdam hizmeti ve iş portalları, staj ve meslekî eğitim, kira ve eğitim kayıtları, AEA ikamet kaydı ve üçüncü ülke oturum türleri, iş sözleşmesi ve mevsimlik çalışma, 2026 asgari ücret, izinler ve vergi, HZZO sağlık ve engelli istihdamı; güncel bilgileri hzz.hr ve mup.gov.hr üzerinden doğrulayın."
      ),
      entry(
        "hollanda",
        "Hollanda",
        "nl",
        "Hollanda",
        "Schengen ve yüksek nitelikli çalışan vizelerine giriş.",
        "Hollanda Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "UWV ve werk.nl ile iş arama, Hollandaca başvuru ve traineeship/MBO–HBO staj yolları, BSN ve belediye kaydı, Randstad konutu, WAB ve zorunlu sağlık sigortası özetleriyle EURES kaynaklı rehber; resmî bilgileri rijksoverheid.nl ve uwv.nl üzerinden doğrulayın."
      ),
      entry(
        "ispanya",
        "İspanya",
        "es",
        "İspanya",
        "Turistik, Altın Vize ve çalışma süreçlerine giriş.",
        "İspanya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "SEPE ve özerk topluluk istihdam servisleri, staj ve çift öğrenme (FCT), NIE ve empadronamiento, 2023 iş hukuku reformu ile SMI ve vergi özetleriyle EURES kaynaklı rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "isvec",
        "İsveç",
        "se",
        "İsveç",
        "Schengen, çalışma izni ve oturum süreçlerine giriş.",
        "İsveç Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Platsbanken ve Arbetsförmedlingen ile iş arama, LAS ve kolektif sözleşmeler, personnummer, vergi ve 1177 sağlık hattı özetleriyle EURES kaynaklı rehber; güncel mevzuatı Skatteverket, Migrationsverket ve arbetsformedlingen.se üzerinden doğrulayın."
      ),
      entry(
        "isvicre",
        "İsviçre",
        "ch",
        "İsviçre",
        "L/B/C permit, kota ve kanton bazlı göçe giriş.",
        "İsviçre Vize ve Oturum Rehberi 2026 | Schengen, Permit ve Zürih",
        "İsviçre’de Schengen C vizesi, çalışma izinleri, kotolar ve yüksek yaşam maliyeti; SEM ve kanton mercileriyle güncel doğrulama. Platformda İsviçre için hizmet veren firmaları keşfedin."
      ),
      entry(
        "italya",
        "İtalya",
        "it",
        "İtalya",
        "Schengen ve ulusal D tipi süreçlere giriş.",
        "İtalya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "SPID ve CPI ile iş arama, clicLavoro, staj ve çıraklık çerçevesi, konut ve vergi özetleriyle EURES kaynaklı rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "izlanda",
        "İzlanda",
        "is",
        "İzlanda",
        "Vinnumálastofnun, EURES, toplu sözleşmeler, Þjóðskrá kaydı ve ISK tabanlı yaşam maliyeti özetine giriş.",
        "İzlanda Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "EURES “İzlanda’da yaşam ve çalışma koşulları” özetine dayanır: iş arama ve İzlandaca ilanlar, Europass, staj ve meslekî çıraklık, konut ve okul, Þjóðskrá ile ikamet ve sağlık (E-104), toplu anlaşma üstünlüğü ve yazılı sözleşme, ücret–bordro, çalışma süresi ve izinler, sendika ve grev oylaması, vergi ve sağlık sistemi, ulaşım, serbest meslek ve posting.is, ICF ile engelli istihdamı ve maaş sübvansiyonu; güncel bilgileri vmst.is, skra.is ve island.is üzerinden doğrulayın."
      ),
      entry(
        "letonya",
        "Letonya",
        "lv",
        "Letonya",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Letonya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "NVA ve EURES ile iş arama, lisanslı işe yerleştirme, yazılı iş sözleşmesi ve ücret ödeme sıklığı, PMLP ikamet kaydı, kira hukuku ve yaşam maliyeti, asgari ücret ve VID vergi özetleri, VDI iş hukuku ve VMNVD sağlık sistemi özetleriyle EURES kaynaklı rehber; güncel bilgileri pmlp.gov.lv ve vid.gov.lv üzerinden doğrulayın."
      ),
      entry(
        "liechtenstein",
        "Liechtenstein",
        "li",
        "Liechtenstein",
        "EEA, sıkı kota ve İsviçre entegrasyonuyla göçe giriş.",
        "Liechtenstein Vize ve Oturum Rehberi 2026 | Schengen, EEA ve Vaduz",
        "Liechtenstein’da Schengen kısa süreli giriş, kotası yüksek çalışma ve residence permit, cross-border commuter düzeni; Migration Office ve resmî duyurularla güncel doğrulama. Panelde ülke olarak Liechtenstein seçili firmalar bu sayfada listelenir."
      ),
      entry(
        "litvanya",
        "Litvanya",
        "lt",
        "Litvanya",
        "UŽT, EURES, MIGRIS ikamet, İş Kanunu sözleşme türleri ve EUR tabanlı ücret–vergi özetine giriş.",
        "Litvanya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "EURES “Litvanya’da yaşam ve çalışma koşulları” özetine dayanır: AB serbest dolaşımı ve istisnai kamu meslekleri, UŽT ile iş arama ve ücretsiz özel aracılık, CV ve Europass, staj ve çıraklık geri ödemeleri, konut ve okul e-başvurusu, MIGRIS ve oturum izinleri, sözleşme türleri ve çocuk işçiliği sınırları, ücret ve bordro, çalışma süresi ve izinler, sendika–işyeri konseyi ve grev bildirimi, 2025 vergi oranları, sağlık sigortası, yaşam maliyeti ve e-vinyet, engelli istihdam destekleri; güncel bilgileri migracija.lt ve uzt.lt üzerinden doğrulayın."
      ),
      entry(
        "luksemburg",
        "Lüksemburg",
        "lu",
        "Lüksemburg",
        "ADEM, çok dillilik, SSM, ücretsiz toplu taşıma ve guichet.public.lu yerleşim bildirimine giriş.",
        "Lüksemburg Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "EURES “Lüksemburg’da yaşam ve çalışma koşulları” özetine dayanır: ADEM ve sektör portalları, spekülatif başvuru ve dil beklentisi, 2020 staj ve üçüncü ülke izinleri, ADEM çıraklığı ve meslek odaları, konut ve sınır bölgeleri, çok dilli okul ve zorunluluk süresi, AB belediye bildirimi ve üçüncü ülke prosedürleri, CDI/CDD ve deneme, SSM ile endeksleme, çalışma süresi ve izinler, fesih ve ONC öncesi grev, vergi ve KDV, CNS sağlığı, ücretsiz ulaşım, ADEM engelli istihdamı; güncel bilgileri guichet.public.lu ve adem.public.lu üzerinden doğrulayın."
      ),
      entry(
        "macaristan",
        "Macaristan",
        "hu",
        "Macaristan",
        "NFSZ, VMP, OIF kaydı ve forint tabanlı ücret–vergi özetine giriş.",
        "Macaristan Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Macaristan’da iş arama, başvuru, çift eğitim çıraklığı, konut ve okul, Schengen ikamet bildirimi, EFO ve asgari ücret, Mt. çalışma süreleri, vergi–TAJ ve ulaşım başlıklarında EURES kaynaklı özet rehber; güncel şartları resmî kaynaklardan doğrulayın."
      ),
      entry(
        "malta",
        "Malta",
        "mt",
        "Malta",
        "Schengen ve yatırım temelli oturuma giriş.",
        "Malta Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Jobsplus ve EURES Malta ile iş arama, staj ve MCAST/ITS çıraklığı, Identity Malta ikamet kartı, kira–satın alma, asgari ücret ve vergi özetleriyle EURES kaynaklı rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "norvec",
        "Norveç",
        "no",
        "Norveç",
        "EEA/EØS, UDI skilled worker, NAV iş piyasası ve yüksek yaşam maliyeti özetine giriş.",
        "Norveç Vize ve Oturum Rehberi 2026 | Schengen, Skilled Worker ve UDI",
        "UDI residence permit ve Work in Norway (NAV) ile iş arama, Finn hybel konut bandı, Norveççe–İngilizce dil gerçeği, deneme süresi ve toplu sözleşme kültürü, vergi ve yıllık izin özeti; Schengen C vizesi ve 90/180 kalış çerçevesi. Güncel şartları udi.no ve Skatteetaten kaynaklarından doğrulayın."
      ),
      entry(
        "polonya",
        "Polonya",
        "pl",
        "Polonya",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Polonya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "ePraca ve EURES ile iş arama, KRAZ kayıtlı istihdam büroları, İş Kanunu ve uzaktan çalışma, PESEL ve voyvoda ikamet kaydı, asgari ücret ve ZUS, NFZ sağlık güvencesi özetleriyle EURES kaynaklı rehber; güncel bilgileri gov.pl ve praca.gov.pl üzerinden doğrulayın."
      ),
      entry(
        "portekiz",
        "Portekiz",
        "pt",
        "Portekiz",
        "Golden Visa, D8 dijital göçebe, çalışma izni ve AB ikameti özetine giriş.",
        "Portekiz Vize ve Oturum Rehberi 2026 | Schengen, Golden Visa ve D8",
        "Lizbon–Porto iş piyasası, IEFP ve startup ekosistemi, Golden Visa ve konut modeli değişiklikleri, D8 dijital göçebe, NIF ve residence permit, NHR sonrası vergi düzenlemeleri ve kira bandı özeti. Güncel yatırım kategorilerini AIMA ve ePortugal üzerinden doğrulayın."
      ),
      entry(
        "romanya",
        "Romanya",
        "ro",
        "Romanya",
        "Schengen entegrasyonu, work permit ve düşük yaşam maliyeti özetine giriş.",
        "Romanya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Bükreş–Cluj IT ve outsourcing iş piyasası, eJobs ve BestJobs kanalları, work authorization ve residence permit akışı, Bükreş stüdyo kira bandı, görece düşük gelir vergisi ve 40 saat çalışma özeti. Schengen giriş kuralları ve göç mevzuatını Romanian Immigration Inspectorate ve MAE üzerinden doğrulayın."
      ),
      entry(
        "slovakya",
        "Slovakya",
        "sk",
        "Slovakya",
        "Schengen, Blue Card ve otomotiv / üretim istihdam özetine giriş.",
        "Slovakya Vize ve Oturum Rehberi 2026 | Schengen, Blue Card ve İkamet",
        "Bratislava–Košice iş merkezleri, Profesia ve Kariera ile iş arama, work authorization ve temporary residence, AB Blue Card maaş eşikleri, Schengen 90/180 kuralı ve düşük yaşam maliyeti özeti. Güncel şartları Slovak Ministry of Interior ve Employment Services üzerinden doğrulayın."
      ),
      entry(
        "slovenya",
        "Slovenya",
        "si",
        "Slovenya",
        "Single permit, Blue Card ve Schengen özetine giriş.",
        "Slovenya Vize ve Oturum Rehberi 2026 | Schengen, Single Permit ve İkamet",
        "Ljubljana–Koper lojistik ve IT iş piyasası, Employment Service ve Mojedelo ile iş arama, single residence and work permit, D tipi ulusal vize, AB Blue Card ve Ljubljana kira bandı özeti. Güncel şartları Entry and Residence Slovenia ve konsolosluk duyurularından doğrulayın."
      ),
      entry(
        "yunanistan",
        "Yunanistan",
        "gr",
        "Yunanistan",
        "Schengen ve ulusal süreçlere giriş.",
        "Yunanistan Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "DYPA ile iş arama, başvuru kültürü, staj, mesleki çıraklık, konut ve çalışma koşullarında EURES kaynaklı özet; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
    ],
  },
  {
    id: "europe_non_schengen_uk",
    title: "Schengen Dışı Avrupa ve Birleşik Krallık",
    description:
      "İngiltere, İrlanda ve Schengen dışında kalan Avrupa ülkelerine yönelik rehberleri ayrı olarak inceleyin.",
    seoIntro:
      "İrlanda ve Kıbrıs (Rum Kesimi) Schengen üyesi değildir; Birleşik Krallık ve Batı Balkan ülkeleri için ayrı vize ve oturum mantığı geçerlidir.",
    countries: [
      entry(
        "ingiltere",
        "Birleşik Krallık (İngiltere)",
        "gb",
        "İngiltere",
        "Skilled Worker, Standard Visitor ve ETA özetine giriş.",
        "Birleşik Krallık (İngiltere) Vize ve Oturum Rehberi 2026 | Skilled Worker, ILR, ETA",
        "Brexit sonrası puan bazlı göç, sponsor ve CoS, Skilled Worker maaş eşikleri, Standard Visitor, Graduate Visa, ILR tartışmaları ve Londra kira bandı özeti. Ücret ve şartları UKVI ve NHS kaynaklarından doğrulayın."
      ),
      entry(
        "irlanda",
        "İrlanda",
        "ie",
        "İrlanda",
        "Critical Skills, Stamp sistemi ve Schengen dışı AB vize özetine giriş.",
        "İrlanda Vize ve Oturum Rehberi 2026 | Critical Skills, Stamp 4 ve Dublin",
        "AB üyesi Schengen dışı ulusal vize, CSEP ve General Employment Permit maaş eşikleri, Stamp 1–4, reckonable residence ve Dublin kira bandı özeti. Şartları Irish Immigration Service ve employment permit duyurularından doğrulayın."
      ),
      entry(
        "kibris",
        "Kıbrıs (Rum Kesimi)",
        "cy",
        "Kıbrıs",
        "PES, GHS, avro ve CRMD kaydıyla EURES özetine giriş.",
        "Kıbrıs Vize ve Oturum Rehberi 2026 | AB, Çalışma ve İkamet",
        "Kıbrıs Cumhuriyeti’nde iş arama, başvuru, staj, çıraklık, konut, ikamet, çalışma koşulları, asgari ücret, GHS ve vergi başlıklarında EURES kaynaklı özet rehber; Schengen dışı giriş ve oturum için resmî bilgileri doğrulayın."
      ),
      entry(
        "ukrayna",
        "Ukrayna",
        "ua",
        "Ukrayna",
        "TRP, work permit ve ulusal C/D vize özetine giriş.",
        "Ukrayna Vize ve Oturum Rehberi 2026 | TRP, Work Permit ve Kiev",
        "Schengen dışı ulusal göç, temporary residence permit, işveren work permit, D vize, savaş dönemi uzatma ve sıkılaşan kontroller; Kyiv kira bandı ve güvenlik uyarıları özeti. State Migration Service ve MFA duyurularından doğrulayın."
      ),
      entry(
        "rusya",
        "Rusya",
        "ru",
        "Rusya",
        "RVP, VNZh, work permit ve e-Visa özetine giriş.",
        "Rusya Vize ve Oturum Rehberi 2026 | RVP, Work Permit ve Moskova",
        "Ulusal vize ve göç, TRP (RVP), kalıcı ikamet (VNZh), work permit ve migration registration; skilled visa duyuruları ve Moskova kira bandı özeti. MFA, e-Visa portalı ve içişleri duyurularından doğrulayın."
      ),
      entry(
        "belarus",
        "Belarus",
        "by",
        "Belarus",
        "Schengen dışı ulusal vize, e-Visa, special work permit ve temporary residence özetine giriş.",
        "Belarus Vize ve Oturum Rehberi 2026 | Work Permit, Minsk ve Rusya–Belarus Ortak Vize",
        "Schengen dışı ulusal göç, special work permit ve sponsor işveren, temporary residence (sojourn permit), migration registration ve 2025–2026 Rusya–Belarus ortak vize sistemi; Minsk kira bandı ve Rabota Belarus iş arama özeti. MFA, e-Visa portalı ve Citizenship and Migration Department duyurularından doğrulayın."
      ),
      entry(
        "moldova",
        "Moldova",
        "md",
        "Moldova",
        "AB adaylığı, residence card ve work permit ile ulusal vize süreçlerine giriş.",
        "Moldova Vize ve Oturum Rehberi 2026 | Residence Card, Work Permit ve Chișinău",
        "Schengen dışı ulusal göç, D tipi vize, residence card ve temporary residence, National Employment Agency work permit, dijital göçebe residence ve 2026 göç yasalarında sıkılaşan gelir–konut kanıtı; Chișinău kira bandı ve Rabota Moldova iş arama özeti. MFA, eVisa Moldova ve General Inspectorate for Migration duyurularından doğrulayın."
      ),
      entry(
        "arnavutluk",
        "Arnavutluk",
        "al",
        "Arnavutluk",
        "e-Visa, D tipi vize, Unique Permit ve dijital göçebe residence özetine giriş.",
        "Arnavutluk Vize ve Oturum Rehberi 2026 | Unique Permit, e-Visa ve Tiran",
        "Schengen dışı ulusal göç, e-Visa, D tipi vize ve residence permit; dijital göçebe Unique Permit, Schengen/ABD/İngiltere izniyle koşullu vizesiz giriş ve work authorization özeti. Tiran kira bandı ve Njoftime / Dua Pune iş arama kanalları. MFA, e-Visa portalı ve Visa Regime for Foreign Citizens duyurularından doğrulayın."
      ),
      entry(
        "bosna-hersek",
        "Bosna-Hersek",
        "ba",
        "Bosna-Hersek",
        "Work permit kotası, temporary residence ve adres kaydı ile ulusal vize süreçlerine giriş.",
        "Bosna-Hersek Vize ve Oturum Rehberi 2026 | Work Permit, Saraybosna ve TRP",
        "Schengen dışı ulusal göç, C/D vize, Employment Agency work permit ve 2026 kota (7.427 toplam); temporary residence, adres kaydı ve permanent residence yolu. Saraybosna kira bandı ve MojPosao iş arama özeti. Service for Foreigners’ Affairs, MFA ve eVisa duyurularından doğrulayın."
      ),
      entry(
        "karadag",
        "Karadağ",
        "me",
        "Karadağ",
        "Digital Nomad, company director ve Privremeni boravak ile yatırım temelli oturuma giriş.",
        "Karadağ Vize ve Oturum Rehberi 2026 | Digital Nomad, Podgorica ve Kotor",
        "Schengen dışı ulusal göç, Privremeni boravak, Digital Nomad Residence (2+2 yıl), şirket müdürü residence, work authorization ve gayrimenkul destekli başvurular; eski yatırımcı vatandaşlık programının kapanması. Podgorica ve Budva kira bandı, Türkiye vatandaşları vizesiz rejim değişiklikleri uyarısı. Government of Montenegro – Visas ve Ministry of Interior duyurularından doğrulayın."
      ),
      entry(
        "kuzey-makedonya",
        "Kuzey Makedonya",
        "mk",
        "Kuzey Makedonya",
        "C/D vize, D tipi zorunluluğu, oturum, çalışma izni kotası, AVRM, asgari ücret ve diaspora vatandaşlık hattına giriş.",
        "Kuzey Makedonya Vize ve Oturum Rehberi 2026 | Üsküp, Ohri ve Çalışma İzni",
        "Schengen dışı ulusal göç: C ve D tipi vize, kırk sekiz saat adres kaydı, geçici ve kalıcı oturum, AB/EEA ve Schengen ikametli üçüncü ülke girişleri, Vatandaşlık Kanunu (diaspora ve yatırım hatları), AVRM çalışma izni kotası ve asgari ücret; FZO sağlık ve ilköğretim entegrasyonu. Ohri kira sezonsallığı ve Üsküp yaşam maliyeti özeti. MFA, MVR, AVRM ve Ekonomi ve Çalışma Bakanlığı duyurularından doğrulayın."
      ),
      entry(
        "sirbistan",
        "Sırbistan",
        "rs",
        "Sırbistan",
        "Single Permit, D tipi vize, DOO şirket ve gayrimenkul temelli geçici oturuma giriş.",
        "Sırbistan Vize ve Oturum Rehberi 2026 | Single Permit, Belgrad ve Welcome to Serbia",
        "Batı Balkan ulusal göç: kısa süreli vizesiz giriş (Türkiye için 90/180), D tipi vize, 2024 sonrası Single Permit ile çalışma ve geçici oturum birleşik belge, Welcome to Serbia portalı; DOO şirket ve konut temelli oturum, Belgrad–Novi Sad yaşam özeti. MFA, portal ve T.C. Dışişleri seyahat uyarılarından doğrulayın."
      ),
      entry(
        "andorra",
        "Andorra",
        "ad",
        "Andorra",
        "Active / passive residence, Schengen transit, 183 gün kuralı ve yatırım eşiklerine giriş.",
        "Andorra Vize ve Oturum Rehberi 2026 | Active Residence, Passive ve Schengen Transit",
        "Pireneler prensliği: kara girişi ve Schengen transit, active residence (çalışma / şirket, yılda 183+ gün), passive residence (yılda 90+ gün, yatırım ve AFA depozito özetleri), 2026 kota sıkılaşması, dijital profesyonel modeller, konut krizi ve vatandaşlık kısıtları. Govern d’Andorra ve resmî göç bilgilerinden doğrulayın."
      ),
      entry(
        "monako",
        "Monako",
        "mc",
        "Monako",
        "Carte de Séjour, Fransa Schengen girişi, çalışma izni ve banka–konut şartlarına giriş.",
        "Monako Vize ve Oturum Rehberi 2026 | Carte de Séjour, France-Visas ve Monte Carlo",
        "Fransa ile bağlantılı Schengen girişi, Carte de Séjour, çalışma ve şirket sahibi oturumu, finansal yeterlilik ve Monako bankası mevduat özetleri, konut zorunluluğu, vergi çerçevesi ve dar iş piyasası. Mon Service Public Monaco ve France-Visas duyurularından doğrulayın."
      ),
      entry(
        "san-marino",
        "San Marino",
        "sm",
        "San Marino",
        "İtalya Schengen girişi, turistik kalış, çalışma izni, şirket ve yatırımcı oturumu, konut ve vatandaşlık hattına giriş.",
        "San Marino Vize ve Oturum Rehberi 2026 | İtalya Schengen, Rimini ve Residence",
        "Mikro devlet: AB ve resmî Schengen üyesi değil; İtalya ile açık sınır pratiği ve kara yolu erişimi (Bologna, Rimini). Türk vatandaşları için fiilen İtalya Schengen; kısa kalış, çalışma izni, şirket sahibi ve yatırımcı oturumu, konut sıkıntısı, fiili ikamet ve vergi şeffaflığı. 2025–2026 sıkılaşma özetleri. Resmî portallar ve Italy Visa bilgilerinden doğrulayın."
      ),
      entry(
        "vatikan",
        "Vatikan",
        "va",
        "Vatikan",
        "Roma ve İtalya Schengen girişi, turistik ziyaret, görev temelli residence, Swiss Guard ve vatandaşlık özetine giriş.",
        "Vatikan Vize ve Oturum Rehberi 2026 | Roma, Schengen ve Holy See",
        "Enklav devlet: AB ve resmî Schengen üyesi değil; fiilen İtalya ve Schengen erişimi. Türk ziyaretçiler için İtalya Schengen; müze ve bazilika ziyareti, görev dışı kitlesel oturum ve yatırımcı programı yokluğu, vatandaşlığın görev temelli özel rejimi, Swiss Guard ve Roma'da ikamet pratiği. Decreto Flussi ve Schengen kontrolleri dolaylı etkiler. Resmî Vatikan portalları ve İtalya vize bilgilerinden doğrulayın."
      ),
    ],
  },
  {
    id: "middle_east",
    title: "Orta Doğu",
    description:
      "BAE, Katar, Suudi Arabistan ve diğer Orta Doğu ülkelerine yönelik vize ve oturum rehberlerini keşfedin.",
    seoIntro:
      "Körfez ülkelerinde çalışma izni, aile birleşimi ve turistik vizelere dair ülke bazlı rehber girişleri.",
    countries: [
      entry("birlesik-arap-emirlikleri", "Birleşik Arap Emirlikleri", "ae", "Birleşik Arap Emirlikleri", "Dubai ve Abu Dabi odaklı çalışma ve oturum vizelerine giriş.", "BAE vize rehberi | Vize Firmaları", "Birleşik Arap Emirlikleri için vize ve oturum rehberi."),
      entry("suudi-arabistan", "Suudi Arabistan", "sa", "Suudi Arabistan", "Turistik ve çalışma vizeleri ile oturuma giriş.", "Suudi Arabistan vize rehberi | Vize Firmaları", "Suudi Arabistan vize ve çalışma rehberi."),
      entry("katar", "Katar", "qa", "Katar", "Çalışma izni ve aile süreçlerine giriş.", "Katar vize rehberi | Vize Firmaları", "Katar için vize ve oturum rehberi."),
      entry("kuveyt", "Kuveyt", "kw", "Kuveyt", "Çalışma ve aile birleşimi süreçlerine giriş.", "Kuveyt vize rehberi | Vize Firmaları", "Kuveyt vize rehberi."),
      entry("bahreyn", "Bahreyn", "bh", "Bahreyn", "Çalışma ve ziyaret vizelerine giriş.", "Bahreyn vize rehberi | Vize Firmaları", "Bahreyn vize rehberi."),
      entry("umman", "Umman", "om", "Umman", "Turistik ve çalışma vizelerine giriş.", "Umman vize rehberi | Vize Firmaları", "Umman vize rehberi."),
      entry("urdun", "Ürdün", "jo", "Ürdün", "Turistik ve çalışma süreçlerine giriş.", "Ürdün vize rehberi | Vize Firmaları", "Ürdün vize rehberi."),
      entry("israil", "İsrail", "il", "İsrail", "B-2 turistik, çalışma ve oturum süreçlerine giriş.", "İsrail vize rehberi | Vize Firmaları", "İsrail için vize koşulları, çalışma ve oturum rehberi girişi."),
      entry("lubnan", "Lübnan", "lb", "Lübnan", "Turistik ve aile vizeleri ile çalışma izinlerine giriş.", "Lübnan vize rehberi | Vize Firmaları", "Lübnan için vize ve oturum rehberi girişi."),
      entry("irak", "Irak", "iq", "Irak", "Bölgesel güvenlik ve vize politikalarına giriş.", "Irak vize rehberi | Vize Firmaları", "Irak için vize bilgisi girişi."),
      entry("iran", "İran", "ir", "İran", "Turistik ve ticari vizelere giriş.", "İran vize rehberi | Vize Firmaları", "İran vize rehberi."),
      entry("filistin", "Filistin", "ps", "Filistin", "Seyahat ve statüye dair genel bilgilendirme girişi.", "Filistin seyahat rehberi | Vize Firmaları", "Filistin toprakları için seyahat ve vize başlıkları."),
      entry("yemen", "Yemen", "ye", "Yemen", "Güncel seyahat uyarıları ve vize mantığına giriş.", "Yemen seyahat rehberi | Vize Firmaları", "Yemen için seyahat ve vize bilgisi."),
    ],
  },
  {
    id: "asia",
    title: "Asya",
    description:
      "Asya ülkeleri için turistik, çalışma, eğitim ve uzun dönem başvuru süreçlerine ait rehberleri inceleyin.",
    seoIntro:
      "Uzak Doğu ve Orta Asya’da çalışma izinleri, turistik vizeler ve oturum yollarına dair ülke bazlı rehber girişleri.",
    countries: [
      entry("turkiye", "Türkiye", "tr", "Türkiye", "Çalışma izni, oturum ve vatandaşlık süreçlerine giriş.", "Türkiye vize ve oturum rehberi | Vize Firmaları", "Türkiye için çalışma, oturum ve vatandaşlık rehberi girişi."),
      entry("gurcistan", "Gürcistan", "ge", "Gürcistan", "Kafkasya: turistik, çalışma ve oturum vizeleri ile vatandaşlık yollarına giriş.", "Gürcistan vize rehberi | Vize Firmaları", "Gürcistan için vize koşulları, çalışma, oturum ve iş bulma rehberi girişi."),
      entry("cin", "Çin", "cn", "Çin", "Turistik ve ticari vizeler ile çalışma iznine giriş.", "Çin vize rehberi | Vize Firmaları", "Çin için vize ve çalışma rehberi."),
      entry("japonya", "Japonya", "jp", "Japonya", "Turistik ve çalışma vizeleri ile oturuma giriş.", "Japonya vize rehberi | Vize Firmaları", "Japonya vize rehberi."),
      entry("guney-kore", "Güney Kore", "kr", "Güney Kore", "K-ETA, turistik ve çalışma vizelerine giriş.", "Güney Kore vize rehberi | Vize Firmaları", "Güney Kore vize ve çalışma rehberi."),
      entry("hindistan", "Hindistan", "in", "Hindistan", "e-Visa ve ulusal vizelere giriş.", "Hindistan vize rehberi | Vize Firmaları", "Hindistan turistik ve çalışma vizesi."),
      entry("singapur", "Singapur", "sg", "Singapur", "Turistik ve çalışma vizelerine giriş.", "Singapur vize rehberi | Vize Firmaları", "Singapur vize rehberi."),
      entry("malezya", "Malezya", "my", "Malezya", "MM2H ve çalışma izinlerine giriş.", "Malezya vize rehberi | Vize Firmaları", "Malezya oturum ve vize rehberi."),
      entry("tayland", "Tayland", "th", "Tayland", "Turistik ve uzun dönem vizelere giriş.", "Tayland vize rehberi | Vize Firmaları", "Tayland vize rehberi."),
      entry("vietnam", "Vietnam", "vn", "Vietnam", "e-Visa ve turistik süreçlere giriş.", "Vietnam vize rehberi | Vize Firmaları", "Vietnam vize rehberi."),
      entry("filipinler", "Filipinler", "ph", "Filipinler", "Turistik ve çalışma vizelerine giriş.", "Filipinler vize rehberi | Vize Firmaları", "Filipinler vize rehberi."),
      entry("endonezya", "Endonezya", "id", "Endonezya", "B211 ve çalışma izinlerine giriş.", "Endonezya vize rehberi | Vize Firmaları", "Endonezya vize rehberi."),
      entry("pakistan", "Pakistan", "pk", "Pakistan", "Turistik ve aile vizelerine giriş.", "Pakistan vize rehberi | Vize Firmaları", "Pakistan vize rehberi."),
      entry("kazakistan", "Kazakistan", "kz", "Kazakistan", "Vizesiz süre ve çalışma iznine giriş.", "Kazakistan vize rehberi | Vize Firmaları", "Kazakistan vize rehberi."),
      entry("ozbekistan", "Özbekistan", "uz", "Özbekistan", "Turistik e-Visa ve çalışma süreçlerine giriş.", "Özbekistan vize rehberi | Vize Firmaları", "Özbekistan vize rehberi."),
      entry("azerbaycan", "Azerbaycan", "az", "Azerbaycan", "Turistik ve çalışma vizelerine giriş.", "Azerbaycan vize rehberi | Vize Firmaları", "Azerbaycan vize rehberi."),
      entry("ermenistan", "Ermenistan", "am", "Ermenistan", "Bölgesel giriş kurallarına giriş.", "Ermenistan vize rehberi | Vize Firmaları", "Ermenistan vize rehberi."),
      entry("banglades", "Bangladeş", "bd", "Bangladeş", "Turistik ve çalışma vizelerine giriş.", "Bangladeş vize rehberi | Vize Firmaları", "Bangladeş için vize ve çalışma rehberi."),
      entry("mogolistan", "Moğolistan", "mn", "Moğolistan", "Turistik ve çalışma süreçlerine giriş.", "Moğolistan vize rehberi | Vize Firmaları", "Moğolistan vize rehberi."),
      entry("nepal", "Nepal", "np", "Nepal", "Turistik ve dağcılık vizeleri ile çalışma iznine giriş.", "Nepal vize rehberi | Vize Firmaları", "Nepal için vize ve çalışma rehberi girişi."),
      entry("sri-lanka", "Sri Lanka", "lk", "Sri Lanka", "ETA / e-Visa ve çalışma süreçlerine giriş.", "Sri Lanka vize rehberi | Vize Firmaları", "Sri Lanka turistik ve çalışma vizesi rehberi."),
    ],
  },
  {
    id: "africa",
    title: "Afrika",
    description:
      "Afrika ülkeleri için bölgesel vize ve çalışma rehberlerini keşfedin; içerik genişledikçe alt bölgeler eklenebilir.",
    seoIntro:
      "Kuzey Afrika’dan Güney Afrika’ya turistik vizeler, çalışma izinleri ve oturum başlıklarına ülke bazlı giriş.",
    countries: [
      entry("guney-afrika", "Güney Afrika", "za", "Güney Afrika", "Turistik ve çalışma vizelerine giriş.", "Güney Afrika vize rehberi | Vize Firmaları", "Güney Afrika vize rehberi."),
      entry("misir", "Mısır", "eg", "Mısır", "Turistik ve oturum süreçlerine giriş.", "Mısır vize rehberi | Vize Firmaları", "Mısır vize rehberi."),
      entry(
        "fas",
        "Fas",
        "ma",
        "Fas",
        "Kazablanka, Rabat ve turistik merkezler; Marakeş ve çöl bölgeleri dahil vize ve oturum süreçlerine giriş.",
        "Fas vize rehberi | Vize Firmaları",
        "Fas için turistik vize, çalışma ve oturum rehberi; Marakeş odaklı şehir içerikleri ileride genişletilebilir."
      ),
      entry("nijerya", "Nijerya", "ng", "Nijerya", "Turistik ve çalışma süreçlerine giriş.", "Nijerya vize rehberi | Vize Firmaları", "Nijerya vize rehberi."),
      entry("kenya", "Kenya", "ke", "Kenya", "eTA ve çalışma izinlerine giriş.", "Kenya vize rehberi | Vize Firmaları", "Kenya vize rehberi."),
      entry("cezayir", "Cezayir", "dz", "Cezayir", "Turistik ve çalışma vizelerine giriş.", "Cezayir vize rehberi | Vize Firmaları", "Cezayir vize rehberi."),
      entry("tunus", "Tunus", "tn", "Tunus", "Turistik vizelere giriş.", "Tunus vize rehberi | Vize Firmaları", "Tunus vize rehberi."),
      entry("gana", "Gana", "gh", "Gana", "Turistik ve çalışma süreçlerine giriş.", "Gana vize rehberi | Vize Firmaları", "Gana vize rehberi."),
      entry("etiyopya", "Etiyopya", "et", "Etiyopya", "e-Visa ve seyahat kurallarına giriş.", "Etiyopya vize rehberi | Vize Firmaları", "Etiyopya vize rehberi."),
      entry("tanzanya", "Tanzanya", "tz", "Tanzanya", "Turistik ve çalışma vizeleri ile Kilimanjaro bölgesi seyahatine giriş.", "Tanzanya vize rehberi | Vize Firmaları", "Tanzanya için vize ve çalışma rehberi girişi."),
      entry(
        "senegal",
        "Senegal",
        "sn",
        "Senegal",
        "Turistik ve iş vizeleri ile ECOWAS bölgesi transitine giriş.",
        "Senegal vize rehberi | Vize Firmaları",
        "Senegal turistik ve iş vizeleri ile ECOWAS transit süreçlerine rehber girişi; oturum içerikleri genişliyor. Firmaları ülke filtresiyle platformda listeleyin."
      ),
      entry("uganda", "Uganda", "ug", "Uganda", "Turistik ve çalışma izinlerine giriş.", "Uganda vize rehberi | Vize Firmaları", "Uganda için vize ve çalışma rehberi girişi."),
    ],
  },
];

const slugToEntry = new Map<string, CountryGuideEntry>();
const slugToRegionId = new Map<string, CountryGuideRegionId>();

for (const region of COUNTRY_GUIDE_REGIONS) {
  for (const c of region.countries) {
    if (slugToEntry.has(c.slug)) {
      throw new Error(`Yinelenen ülke rehberi slug: ${c.slug}`);
    }
    slugToEntry.set(c.slug, c);
    slugToRegionId.set(c.slug, region.id);
  }
}

export function listCountryGuideSlugs(): string[] {
  return [...slugToEntry.keys()].sort();
}

export function getCountryGuideBySlug(slug: string): CountryGuideEntry | null {
  return slugToEntry.get(slug) ?? null;
}

export function getCountryGuideRegionForSlug(slug: string): CountryGuideRegion | null {
  const id = slugToRegionId.get(slug);
  if (!id) return null;
  return COUNTRY_GUIDE_REGIONS.find((r) => r.id === id) ?? null;
}

export const COUNTRY_GUIDE_CATALOG_BASE_PATH = "/ulkelere-gore-vize-rehberi";

export function countryGuideDetailHref(slug: string): string {
  return `${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${slug}`;
}

/** Ana sayfa firma listesinde ülkeye göre filtre — etiket birebir `firmCatalogCountryLabel` olmalı */
export function countryGuideFirmsListingHref(countryLabel: string): string {
  const p = new URLSearchParams();
  p.set("countries", countryLabel);
  return `/?${p.toString()}#firmalar`;
}
