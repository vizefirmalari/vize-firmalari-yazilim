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
        "Express Entry, çalışma izni ve kalıcı oturum süreçlerine genel bakış.",
        "Kanada vize ve oturum rehberi | Vize Firmaları",
        "Kanada için vize koşulları, çalışma, oturum ve vatandaşlık rehber girişi; platform üzerinden ülkeye hizmet veren firmaları keşfedin."
      ),
      entry(
        "meksika",
        "Meksika",
        "mx",
        "Meksika",
        "Turistik ve geçici çalışma vizeleri ile sınır bölgesi başvurularına giriş.",
        "Meksika vize rehberi | Vize Firmaları",
        "Meksika için vize ve oturum süreçlerine ülke bazlı rehber girişi; ileride detaylı içerik ve firma listeleriyle genişletilebilir."
      ),
      entry(
        "panama",
        "Panama",
        "pa",
        "Panama",
        "Kanal bölgesi çalışma ve yatırımcı vizeleri ile turistik giriş kurallarına giriş.",
        "Panama vize rehberi | Vize Firmaları",
        "Panama için vize, oturum ve çalışma süreçlerine rehber girişi."
      ),
      entry(
        "kostarika",
        "Kosta Rika",
        "cr",
        "Kostarika",
        "Turistik ve uzun süreli oturum seçeneklerine giriş.",
        "Kosta Rika vize rehberi | Vize Firmaları",
        "Kosta Rika için turistik vize ve oturum rehberi girişi."
      ),
      entry(
        "dominik-cumhuriyeti",
        "Dominik Cumhuriyeti",
        "do",
        "Dominik Cumhuriyeti",
        "Turistik ve aile birleşimi vizeleri ile oturum yollarına giriş.",
        "Dominik Cumhuriyeti vize rehberi | Vize Firmaları",
        "Dominik Cumhuriyeti için vize ve çalışma rehberi girişi."
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
      entry("avusturya", "Avusturya", "at", "Avusturya", "Turistik ve ulusal D tipi süreçlere genel bakış.", "Avusturya vize rehberi | Vize Firmaları", "Avusturya Schengen ve oturum başlıklarına ülke rehberi girişi."),
      entry(
        "belcika",
        "Belçika",
        "be",
        "Belçika",
        "Schengen ve çalışma izni süreçlerine giriş.",
        "Belçika Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "VDAB, Forem, Actiris ve ADG çerçevesinde iş arama, staj ve ikili öğrenme, ikamet kaydı ve çalışma koşullarında EURES kaynaklı özet; resmî bilgileri belgium.be ve bölge mercilerinden doğrulayın."
      ),
      entry("bulgaristan", "Bulgaristan", "bg", "Bulgaristan", "Güncel Schengen üyeliği ile başvuru mantığına giriş.", "Bulgaristan vize rehberi | Vize Firmaları", "Bulgaristan Schengen ve ulusal vize başlıkları."),
      entry("cekya", "Çekya", "cz", "Çekya", "Turistik ve çalışma vizeleri ile oturuma giriş.", "Çekya vize rehberi | Vize Firmaları", "Çekya Schengen başvuruları ve çalışma rehberi."),
      entry(
        "danimarka",
        "Danimarka",
        "dk",
        "Danimarka",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Danimarka Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Jobcenter ve jobnet.dk, Workindenmark ile İngilizce iş arama, SIRI AB oturum belgesi ve CPR, toplu sözleşme modeli ve NemKonto bordro, isteğe bağlı A‑kasse, skat.dk vergi ve yüksek yaşam maliyeti ile sarı kart sağlık sistemi özetleriyle EURES kaynaklı rehber; güncel bilgileri lifeindenmark.borger.dk ve nyidanmark.dk üzerinden doğrulayın."
      ),
      entry("estonya", "Estonya", "ee", "Estonya", "Dijital oturum ve Schengen başvurularına giriş.", "Estonya vize rehberi | Vize Firmaları", "Estonya Schengen ve çalışma rehberi."),
      entry("finlandiya", "Finlandiya", "fi", "Finlandiya", "Turistik ve çalışma vizeleri ile oturuma giriş.", "Finlandiya vize rehberi | Vize Firmaları", "Finlandiya Schengen başvuruları."),
      entry("fransa", "Fransa", "fr", "Fransa", "Schengen, ulusal uzun süreli vizeler ve oturum başlıklarına giriş.", "Fransa vize rehberi | Vize Firmaları", "Fransa için turistik ve çalışma vizesi rehberi girişi."),
      entry("hirvatistan", "Hırvatistan", "hr", "Hırvatistan", "Schengen üyesi; turistik ve çalışma süreçlerine giriş.", "Hırvatistan vize rehberi | Vize Firmaları", "Hırvatistan Schengen başvuruları ve oturum."),
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
      entry("isvicre", "İsviçre", "ch", "İsviçre", "Schengen üyesi; ulusal çalışma izinleri ile birlikte değerlendirme.", "İsviçre vize rehberi | Vize Firmaları", "İsviçre Schengen ve çalışma izni girişi."),
      entry(
        "italya",
        "İtalya",
        "it",
        "İtalya",
        "Schengen ve ulusal D tipi süreçlere giriş.",
        "İtalya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "SPID ve CPI ile iş arama, clicLavoro, staj ve çıraklık çerçevesi, konut ve vergi özetleriyle EURES kaynaklı rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry("izlanda", "İzlanda", "is", "İzlanda", "Schengen ve çalışma izni süreçlerine giriş.", "İzlanda vize rehberi | Vize Firmaları", "İzlanda Schengen başvuruları."),
      entry(
        "letonya",
        "Letonya",
        "lv",
        "Letonya",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Letonya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "NVA ve EURES ile iş arama, lisanslı işe yerleştirme, yazılı iş sözleşmesi ve ücret ödeme sıklığı, PMLP ikamet kaydı, kira hukuku ve yaşam maliyeti, asgari ücret ve VID vergi özetleri, VDI iş hukuku ve VMNVD sağlık sistemi özetleriyle EURES kaynaklı rehber; güncel bilgileri pmlp.gov.lv ve vid.gov.lv üzerinden doğrulayın."
      ),
      entry("liechtenstein", "Liechtenstein", "li", "Liechtenstein", "İsviçre ile bağlantılı Schengen başvurularına giriş.", "Liechtenstein vize rehberi | Vize Firmaları", "Liechtenstein Schengen giriş rehberi."),
      entry("litvanya", "Litvanya", "lt", "Litvanya", "Schengen ve çalışma izni süreçlerine giriş.", "Litvanya vize rehberi | Vize Firmaları", "Litvanya Schengen rehberi."),
      entry("luksemburg", "Lüksemburg", "lu", "Lüksemburg", "Schengen ve çalışma süreçlerine giriş.", "Lüksemburg vize rehberi | Vize Firmaları", "Lüksemburg vize ve oturum girişi."),
      entry("macaristan", "Macaristan", "hu", "Macaristan", "Schengen ve ulusal çalışma izinlerine giriş.", "Macaristan vize rehberi | Vize Firmaları", "Macaristan Schengen başvuruları."),
      entry(
        "malta",
        "Malta",
        "mt",
        "Malta",
        "Schengen ve yatırım temelli oturuma giriş.",
        "Malta Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "Jobsplus ve EURES Malta ile iş arama, staj ve MCAST/ITS çıraklığı, Identity Malta ikamet kartı, kira–satın alma, asgari ücret ve vergi özetleriyle EURES kaynaklı rehber; Schengen ve oturum için resmî bilgileri doğrulayın."
      ),
      entry("norvec", "Norveç", "no", "Norveç", "Schengen üyesi; çalışma izni süreçlerine giriş.", "Norveç vize rehberi | Vize Firmaları", "Norveç Schengen ve çalışma rehberi."),
      entry(
        "polonya",
        "Polonya",
        "pl",
        "Polonya",
        "Schengen, çalışma ve oturum süreçlerine giriş.",
        "Polonya Vize ve Oturum Rehberi 2026 | Schengen, Çalışma ve İkamet",
        "ePraca ve EURES ile iş arama, KRAZ kayıtlı istihdam büroları, İş Kanunu ve uzaktan çalışma, PESEL ve voyvoda ikamet kaydı, asgari ücret ve ZUS, NFZ sağlık güvencesi özetleriyle EURES kaynaklı rehber; güncel bilgileri gov.pl ve praca.gov.pl üzerinden doğrulayın."
      ),
      entry("portekiz", "Portekiz", "pt", "Portekiz", "Schengen ve Golden Visa süreçlerine giriş.", "Portekiz vize rehberi | Vize Firmaları", "Portekiz turistik ve oturum rehberi."),
      entry("romanya", "Romanya", "ro", "Romanya", "Güncel Schengen üyeliği ile başvuru mantığına giriş.", "Romanya vize rehberi | Vize Firmaları", "Romanya Schengen ve çalışma rehberi."),
      entry("slovakya", "Slovakya", "sk", "Slovakya", "Schengen ve çalışma süreçlerine giriş.", "Slovakya vize rehberi | Vize Firmaları", "Slovakya Schengen rehberi."),
      entry("slovenya", "Slovenya", "si", "Slovenya", "Schengen ve çalışma iznine giriş.", "Slovenya vize rehberi | Vize Firmaları", "Slovenya vize rehberi."),
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
      entry("ingiltere", "Birleşik Krallık (İngiltere)", "gb", "İngiltere", "Ziyaret, çalışma ve öğrenci vizeleri ile Skilled Worker süreçlerine giriş.", "İngiltere vize rehberi | Vize Firmaları", "İngiltere için vize koşulları, çalışma ve oturum rehberi girişi."),
      entry("irlanda", "İrlanda", "ie", "İrlanda", "Schengen dışı; çalışma ve oturum süreçlerine giriş.", "İrlanda vize rehberi | Vize Firmaları", "İrlanda için çalışma vizesi ve oturum rehberi."),
      entry("kibris", "Kıbrıs (Rum Kesimi)", "cy", "Kıbrıs", "Schengen dışı AB üyesi; giriş ve oturum kurallarına giriş.", "Kıbrıs vize rehberi | Vize Firmaları", "Kıbrıs için vize ve oturum süreçlerine rehber girişi."),
      entry("ukrayna", "Ukrayna", "ua", "Ukrayna", "Geçici koruma ve ulusal vizelere giriş.", "Ukrayna vize rehberi | Vize Firmaları", "Ukrayna için vize ve oturum başlıkları."),
      entry("rusya", "Rusya", "ru", "Rusya", "Turistik, ticari ve çalışma vizeleri ile oturum süreçlerine giriş.", "Rusya vize rehberi | Vize Firmaları", "Rusya için vize koşulları, çalışma ve oturum rehberi girişi."),
      entry("belarus", "Belarus", "by", "Belarus", "Ulusal vize ve sınır politikalarına giriş.", "Belarus vize rehberi | Vize Firmaları", "Belarus için vize süreçleri."),
      entry("moldova", "Moldova", "md", "Moldova", "Avrupa kökenli ulusal vize süreçlerine giriş.", "Moldova vize rehberi | Vize Firmaları", "Moldova vize rehberi."),
      entry("arnavutluk", "Arnavutluk", "al", "Arnavutluk", "Turistik ve çalışma vizelerine giriş.", "Arnavutluk vize rehberi | Vize Firmaları", "Arnavutluk için vize rehberi."),
      entry("bosna-hersek", "Bosna-Hersek", "ba", "Bosna-Hersek", "Turistik ve çalışma süreçlerine giriş.", "Bosna-Hersek vize rehberi | Vize Firmaları", "Bosna-Hersek vize rehberi."),
      entry("karadag", "Karadağ", "me", "Karadağ", "Turistik ve yatırım temelli oturuma giriş.", "Karadağ vize rehberi | Vize Firmaları", "Karadağ vize ve oturum rehberi."),
      entry("kuzey-makedonya", "Kuzey Makedonya", "mk", "Kuzey Makedonya", "Ulusal vize süreçlerine giriş.", "Kuzey Makedonya vize rehberi | Vize Firmaları", "Kuzey Makedonya vize rehberi."),
      entry("sirbistan", "Sırbistan", "rs", "Sırbistan", "Batı Balkan vizeleri, çalışma izni ve oturum süreçlerine giriş.", "Sırbistan vize rehberi | Vize Firmaları", "Sırbistan için vize, çalışma ve oturum rehberi girişi."),
      entry("andorra", "Andorra", "ad", "Andorra", "Fransa ve İspanya üzerinden erişim kurallarına giriş.", "Andorra vize rehberi | Vize Firmaları", "Andorra için Schengen transit ve giriş mantığı."),
      entry("monako", "Monako", "mc", "Monako", "Fransa Schengen alanı ile ilişkili giriş kurallarına giriş.", "Monako vize rehberi | Vize Firmaları", "Monako giriş ve vize mantığı."),
      entry("san-marino", "San Marino", "sm", "San Marino", "İtalya üzerinden erişim kurallarına giriş.", "San Marino vize rehberi | Vize Firmaları", "San Marino için pratik giriş bilgisi."),
      entry("vatikan", "Vatikan", "va", "Vatikan", "İtalya ve Roma üzerinden ziyaret kurallarına giriş.", "Vatikan ziyaret rehberi | Vize Firmaları", "Vatikan Şehir Devleti için erişim ve ziyaret başlıkları."),
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
      entry("senegal", "Senegal", "sn", "Senegal", "Turistik ve iş vizeleri ile ECOWAS bölgesi transitine giriş.", "Senegal vize rehberi | Vize Firmaları", "Senegal vize ve çalışma rehberi."),
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
