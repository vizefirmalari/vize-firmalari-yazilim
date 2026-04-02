/** Wizard metin bankası — başlık, açıklama, ipucu, boş/hata/başarı */

/** Eski referanslar için (rapor / geriye dönük); giriş ekranında INTRO_FIRM_SCREEN kullanılır */
export const INTRO_COPY = {
  title: "Profesyonel başvuru akışı",
  lead: "Bilgileriniz düzenli şekilde toplanır; doğru yönlendirme ve daha hızlı geri dönüş için tasarlanmıştır.",
  bullets: [
    { title: "Güven", body: "Verileriniz yalnızca başvuru değerlendirmesi kapsamında işlenir." },
    { title: "Hız", body: "Adım adım ilerlersiniz; kritik sorular öne alınır." },
    { title: "Düzen", body: "Belgeler ve açıklamalar tek akışta toplanır." },
    { title: "Takip edilebilir süreç", body: "İlerlemeniz görünür; eksik kalan noktalar netleşir." },
    { title: "Gizlilik", body: "Paylaşımlarınız herkese açık değildir." },
    { title: "Doğru eşleşme", body: "Amaç ve hedef ülke netleştikçe danışmanlık daha isabetli olur." },
  ],
  privacyNote:
    "Bu başvuru yalnızca seçtiğiniz firma tarafından değerlendirilir; platform üzerinden kontrollü şekilde iletilir.",
  cta: "Başvuruya başla",
} as const;

/** Firma odaklı giriş (adım 0) — kartlar ve güven metni */
export const INTRO_FIRM_SCREEN = {
  cta: "Başvurumu oluştur",
  ctaHelper: "Ortalama süre: 2–3 dakika · Doğru ve eksiksiz bilgi, daha hızlı geri dönüş sağlar",
  trustFooter:
    "Bu başvuru yalnızca seçtiğiniz firma tarafından değerlendirilir. Platform, bilgilerinizi kontrollü şekilde iletir ve herkese açık paylaşım yapmaz.",
  featureCards: [
    {
      title: "Güvenli başvuru",
      body: "Yanıtlarınız yalnızca bu başvuru kapsamında işlenir; dağınık mesaj trafiği oluşturmazsınız.",
    },
    {
      title: "Hızlı değerlendirme",
      body: "Yapılandırılmış sorular, ekibin ön değerlendirmeyi kısaltmasına yardımcı olur.",
    },
    {
      title: "Tek akışta iletim",
      body: "Tüm bilgi ve isteğe bağlı belgeler tek kanaldan, düzenli biçimde iletilir.",
    },
    {
      title: "Gizli ve kontrollü",
      body: "Paylaşımlarınız herkese açık bir duyuru veya liste halinde görünmez.",
    },
    {
      title: "Takip edilebilir süreç",
      body: "Adımlar net olduğu için nerede olduğunuzu ve neyin eksik kaldığını görürsünüz.",
    },
    {
      title: "Daha doğru yönlendirme",
      body: "Amaç ve hedef netleştikçe size uygun danışmanlık yolu daha isabetli çizilir.",
    },
  ] as const,
} as const;

export function introFirmLeadParagraph(firmName: string): string {
  const name = firmName.trim() || "ilgili firma";
  return `Paylaşacağınız bilgiler, ${name} tarafından başvurunuzun daha hızlı ve daha doğru değerlendirilmesi için yapılandırılmış şekilde alınır.`;
}

export function introFirmHeadline(firmName: string): string {
  const name = firmName.trim() || "seçtiğiniz firma";
  return `Başvurunuz doğrudan ${name} ekibine iletilecek`;
}

export const STEP_COPY: Record<
  string,
  { title: string; description: string; hint: string; empty?: string; error?: string; success?: string }
> = {
  visa_type: {
    title: "Hangi vize türü size uygun?",
    description: "Doğru kategori, değerlendirmenin hızlanmasına yardımcı olur.",
    hint: "Emin değilseniz son seçeneği kullanın; danışman yönlendirmesiyle netleştiririz.",
  },
  region_country: {
    title: "Hedef bölge ve ülke",
    description:
      "Birden fazla bölge ve ülke seçebilirsiniz; önerilen ülkelerden işaretleyin veya arayın.",
    hint: "Henüz net değilseniz “Emin değilim” ile devam edebilirsiniz; kısa özet adımında detay verin.",
    empty: "Bölge seçildiğinde popüler ülkeler listelenir.",
  },
  summary_timeline: {
    title: "Durumunuzu kısaca özetleyin",
    description: "Gitmek istediğiniz ülkeyi, amacınızı ve mevcut durumu birkaç cümleyle yazın.",
    hint: "Örnekleri kullanabilir veya kendi cümlelerinizi yazabilirsiniz. Ne kadar net bilgi, o kadar hızlı değerlendirme.",
    empty: "Henüz özet eklemediniz.",
  },
  contact: {
    title: "İletişim ve kişisel bilgiler",
    description: "Size ulaşabilmemiz için iletişim bilgilerinizi girin.",
    hint: "WhatsApp isteğe bağlıdır; tercih ettiğiniz kanalı bir sonraki adımda işaretleyebilirsiniz.",
  },
  dynamic_questions: {
    title: "Vize türüne özel sorular",
    description: "Bu yanıtlar, firmanın size uygun yol haritası çıkarmasına yardımcı olur.",
    hint: "Bilmediğiniz alanları boş bırakabilirsiniz; mümkün olduğunca net yanıt verin.",
  },
  readiness: {
    title: "Hazırlık ve uygunluk",
    description: "Pasaport, önceki ret ve bütçe gibi konular geri dönüş hızını etkiler.",
    hint: "İletişim tercihinizi seçin; firma size en uygun kanaldan ulaşsın.",
  },
  files: {
    title: "Belgeleri yükleyin",
    description:
      "Birden fazla belge ekleyebilirsiniz (video hariç). Değerlendirme sürecini hızlandırır.",
    hint: "Pasaport, CV veya davet mektubu gibi dosyaları çoklu seçim veya sürükle-bırak ile ekleyin.",
    empty: "Henüz dosya eklemediniz; devam edebilirsiniz.",
  },
  approval: {
    title: "Onay ve gönderim",
    description: "Özeti kontrol edin ve onaylayın.",
    hint: "Onayladığınızda başvurunuz güvenli şekilde firmaya iletilir.",
  },
  success: {
    title: "Başvurunuz alındı",
    description: "Referans numaranızı not alın. Firma değerlendirme sonrası size dönüş sağlayabilir.",
    hint: "Eksiksiz bilgi süreci hızlandırır.",
  },
};

export const SUMMARY_TEMPLATES = [
  "Çalışmak için Almanya'ya gitmek istiyorum, pasaportum hazır, mesleğim kaynakçılık.",
  "Kanada öğrenci vizesi düşünüyorum, kabul mektubum henüz yok ama bütçe planım var.",
  "Eşim Almanya'da yaşıyor, aile birleşimi sürecimi başlatmak istiyorum.",
] as const;
