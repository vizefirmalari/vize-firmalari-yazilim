/**
 * Akıllı Asistan — `createGroundedAnswer` user prompt'u.
 *
 * Mevcut Edge Function (`ai-assistant-worker/index.ts`) bu modülden import eder:
 *
 * ```ts
 * import { buildGroundedAnswerUserPrompt } from "./grounded-prompt.ts";
 * const userPrompt = buildGroundedAnswerUserPrompt(userQuery, sources);
 * ```
 *
 * Tasarım kararları:
 *  - Cevap düz paragraf değil; sabit markdown başlıklarıyla bölünür → mobilde kart
 *    içinde okunaklı, UI tarafı `## Heading` görür ve belirgin başlık olarak render eder.
 *  - Firma adı yasak → firma kartları `ai_assistant_firm_matches` üzerinden gelir.
 *  - URL / kaynak linki AI tarafından metne yazılmaz → kaynaklar `ai_assistant_sources`
 *    tablosundan ayrı kart olarak gösterilir.
 *  - Hukuki kesinlik / vize garantisi dili yasak; resmi bilgi değişebilir uyarısı zorunlu.
 *  - Çıktı 180-260 kelime aralığında — mobil kart için ideal yoğunluk.
 *
 * Dosya `supabase/functions/ai-assistant-worker/` altında; Next.js build'i
 * `tsconfig.json` -> `exclude` ile bu klasörü atladığı için Deno import yolu
 * (".ts" uzantısı) sorun çıkarmaz.
 */

export type GroundedSourceLite = {
  title?: string | null;
  domain?: string | null;
  url?: string | null;
  is_official?: boolean | null;
};

export const GROUNDED_ANSWER_SYSTEM_PROMPT = [
  "Sen vizefirmalari.com için Türkçe yanıt veren bir araştırma asistanısın.",
  "Sadece sağlanan kaynaklara ve genel olarak teyit edilebilir, herkesçe bilinen kamu",
  "bilgisine dayan. Belirsiz olduğun konuda iddia üretme.",
  "Asla firma adı, marka adı veya site URL'si yazma.",
  "Asla kaynak linki / URL yazma — kaynaklar arayüzde ayrı bölümde gösteriliyor.",
  "Hukuki kesinlik dili kullanma; vize/oturum/işlem sonucu için garanti verme.",
  "Resmi mevzuatın ve konsolosluk kurallarının değişebileceğini kullanıcıya hatırlat.",
  "Cevabın yapısı her zaman aşağıda istenen markdown başlıklarıyla bölünür.",
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
 */
export function buildGroundedAnswerUserPrompt(
  userQuery: string,
  sources: ReadonlyArray<GroundedSourceLite>
): string {
  const safeQuery = (userQuery ?? "").toString().trim().slice(0, 500);
  const sourceList = summarizeSourcesForPrompt(sources);

  return [
    `Kullanıcının sorusu: ${safeQuery || "(boş)"}`,
    "",
    "Aşağıdaki kaynaklar arama sonucu olarak sağlanmıştır (yalnızca bağlamı kalibre",
    "etmek için; bu metinde URL veya kaynak adı geçmesin):",
    sourceList,
    "",
    "Aşağıdaki kurallara TAMAMEN uy:",
    "- Türkçe ve sade yaz.",
    "- 180-260 kelime aralığında ol.",
    "- Yalnızca aşağıdaki dört markdown başlığını bu sırayla kullan; başka başlık ekleme:",
    "  ## Kısa Bilgi",
    "  ## Başvuru Süreci",
    "  ## Gerekli Belgeler",
    "  ## Dikkat Edilmesi Gerekenler",
    "- Her başlık altında 2-4 cümlelik kısa paragraf veya 2-4 maddelik kısa liste kullan.",
    "- Liste kullanırken `- ` (tire + boşluk) ile başla.",
    "- Firma adı, marka adı yazma; tavsiye edilen firmalar arayüzde ayrı listelenir.",
    "- URL, link veya kaynak adı yazma; kaynaklar arayüzde ayrı kart olarak gösterilir.",
    "- ‘kesinlikle’, ‘garanti’ gibi kesinlik bildiren ifadelerden kaçın.",
    "- ## Dikkat Edilmesi Gerekenler bölümünde mutlaka şunu içeren bir uyarı yer alsın:",
    "  resmi mevzuat ve konsolosluk koşulları değişebilir; başvurudan önce ilgili",
    "  konsolosluk veya resmi otorite sayfası kontrol edilmelidir.",
    "- Vize / oturum / izin sonucu için garanti vermediğini güvenli bir dille belirt.",
    "- Gereksiz uzun giriş yapma; doğrudan ## Kısa Bilgi başlığı ile başla.",
  ].join("\n");
}
