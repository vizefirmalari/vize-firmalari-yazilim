/**
 * Akıllı Asistan — `createGroundedAnswer` system + user prompt referansı.
 *
 * Bu modül Edge Function'a otomatik import EDİLMEZ; `ai-assistant-worker/index.ts`
 * `createGroundedAnswer` içinde aynı prompt yapısı INLINE tutulur (tek dosya
 * deploy kolaylığı). Bu dosya tutarlılık ve geliştirici referansı içindir; cevap
 * formatını / sistem talimatını değiştirmek isteyen yalnızca bu dosyaya da
 * paralel güncelleme yapsa yeter.
 *
 * Tasarım kararları:
 *  - Cevap düz paragraf değil; sabit Markdown iskeletiyle bölünür → mobil kart
 *    içinde belirgin başlıklar, kısa paragraf/listeler.
 *  - Firma adı yasak → firma kartları `ai_assistant_firm_matches` üzerinden gelir.
 *  - URL / kaynak linki AI tarafından metne yazılmaz → kaynaklar
 *    `ai_assistant_sources` tablosundan ayrı kart olarak gösterilir.
 *  - Hukuki kesinlik / garanti dili yasak; resmi bilgi değişebilir uyarısı zorunlu.
 *  - 220-340 kelime aralığı — mobil için ideal yoğunluk.
 */

export type GroundedSourceLite = {
  title?: string | null;
  domain?: string | null;
  url?: string | null;
  is_official?: boolean | null;
};

export const GROUNDED_ANSWER_SYSTEM_PROMPT = [
  "Sen VizeFirmalari.com için Türkçe yanıt veren güvenilir bir araştırma asistanısın.",
  "Resmi/güvenilir kaynaklara dayalı genel bilgi üretirsin; bilmediğin yerde iddia uydurmazsın.",
  "Cevap, kullanıcının güven duymasını sağlayacak şekilde yapılandırılmış olmalı.",
  "Bilgi verici ama satış dili gibi olmamalı. Gerektiğinde kısa kontrol listeleri kullan.",
  "Belirsiz konularda \"bilgiler değişebilir, resmi kaynaklardan kontrol edilmelidir\" uyarısını kısa ve sakin bir dille yap.",
  "Asla firma adı, marka adı veya site URL'si yazma — firma kartları arayüzde ayrı gösterilir.",
  "Asla kaynak linki / URL yazma — kaynaklar arayüzde ayrı kart olarak gösterilir.",
  "Hukuki kesinlik dili kullanma; vize/oturum/işlem sonucu için garanti verme.",
  "Cevap her zaman aşağıda istenen Markdown başlık yapısıyla bölünür.",
].join(" ");

function summarizeSourcesForPrompt(
  sources: ReadonlyArray<GroundedSourceLite>,
  max = 8
): string {
  if (!sources.length) return "(Bu istek için arama kaynağı bulunamadı.)";
  const lines: string[] = [];
  for (const s of sources.slice(0, max)) {
    const title = (s.title ?? "").toString().trim();
    const domain = (s.domain ?? "").toString().trim();
    const tag = s.is_official ? " [resmi]" : "";
    if (title && domain) lines.push(`- ${title} — ${domain}${tag}`);
    else if (domain) lines.push(`- ${domain}${tag}`);
    else if (title) lines.push(`- ${title}${tag}`);
  }
  return lines.length ? lines.join("\n") : "(Kaynak başlığı çıkarılamadı.)";
}

/**
 * Modelin görmesi gereken talimat + kullanıcı sorusu + kaynak özeti.
 *
 * Önemli: `index.ts` içindeki INLINE versiyon ile aynı yapıyı korur. Tek
 * fark: bu sürüm `sources` özetini de bağlam olarak iletir (model bağlamı
 * kalibre etsin diye); inline sürüm sources görmeden çalışır çünkü web_search
 * tool'u modeli zaten besler.
 */
export function buildGroundedAnswerUserPrompt(
  userQuery: string,
  sources: ReadonlyArray<GroundedSourceLite> = []
): string {
  const safeQuery = (userQuery ?? "").toString().trim().slice(0, 500);
  const sourceList = summarizeSourcesForPrompt(sources);

  return [
    `Kullanıcının sorusu: ${safeQuery || "(boş)"}`,
    "",
    "Aşağıdaki kaynaklar arama sonucu olarak sağlanmıştır (yalnızca bağlamı",
    "kalibre etmek için; bu metinde URL veya kaynak adı geçmesin):",
    sourceList,
    "",
    "Cevabın AŞAĞIDAKİ Markdown formatında olmalı (başlıkları aynen kullan,",
    "sırayı değiştirme):",
    "",
    "# [Konuya özel kısa başlık]",
    "",
    "## 🧭 Kısa Bilgi",
    "2-3 net cümlelik kısa açıklama.",
    "",
    "## 📌 Başvuru Süreci",
    "- Sürecin genel akışı",
    "- Başvurunun hangi kurum / kanal mantığıyla ilerlediği",
    "- Ülkeye veya başvuru türüne göre değişebileceği",
    "",
    "## 📄 Gerekli Belgeler",
    "- Genel belge kategorileri",
    "- \"Genellikle\" ifadesini kullan",
    "- Kesin liste gibi davranma",
    "",
    "## ⚠️ Dikkat Edilmesi Gerekenler",
    "- Vize / oturum / izin sonucu için garanti yoktur",
    "- Resmi mevzuat ve konsolosluk koşulları değişebilir; başvurudan önce ilgili",
    "  konsolosluk veya resmi otorite sayfası kontrol edilmelidir",
    "- Konuya özel kısa bir uyarı",
    "",
    "## ✅ Ne Yapabilirsiniz?",
    "- Kullanıcıya bir sonraki mantıklı adımı söyle",
    "- Örn: \"Aşağıdaki firmalar arasından bu alanda hizmet verenleri inceleyebilirsiniz.\"",
    "- Firma adı veya marka adı yazma",
    "",
    "KESİN KURALLAR:",
    "- Türkçe ve sade yaz.",
    "- 220-340 kelime aralığında ol.",
    "- Mobilde okunabilir kısa paragraflar kullan.",
    "- Her başlığın altında en fazla 3-4 madde olsun.",
    "- Liste için `- ` (tire + boşluk) kullan.",
    "- Firma adı / marka adı / URL / kaynak linki yazma.",
    "- \"kesinlikle\", \"garanti\", \"kesin\" gibi kesinlik bildiren ifadelerden kaçın;",
    "  \"genellikle\", \"çoğu durumda\" gibi tedbirli dil kullan.",
    "- Doğrudan # başlığı ile başla; gereksiz uzun giriş yapma.",
  ].join("\n");
}
