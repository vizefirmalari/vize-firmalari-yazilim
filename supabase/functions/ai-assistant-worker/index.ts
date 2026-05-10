// supabase/functions/ai-assistant-worker/index.ts
//
// Bu dosya bir Supabase Edge Function (Deno runtime) kaynak kodudur.
// `tsconfig.json` exclude'una göre Next.js TS / build hattının dışındadır;
// `eslint.config.mjs` `supabase/functions/**` ignore'una alınmıştır.
//
// Aşağıdaki `// @ts-nocheck` direktifi yalnızca IDE TS server'ının açık dosya
// üzerinde çalıştırdığı inline kontrolleri susturmak içindir — Deno HTTP /
// `npm:` protokol importları ve global `Deno` ad alanı Next TS contextinde
// tanımlı değildir. Deno tarafında derleme hatasız çalışır.
// @ts-nocheck

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type JsonRecord = Record<string, unknown>;

type AssistantRequestRow = {
  id: string;
  session_id: string;
  user_id: string | null;
  anonymous_id: string | null;
  prompt: string;
  status: string;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: AssistantRequestRow;
  old_record?: JsonRecord | null;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OPENAI_MODEL = "gpt-4.1-mini";
const MAX_FIRM_MATCHES = 20;
const MIN_MATCH_SCORE = 0.18;
const FIRM_FETCH_LIMIT = 240;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const startedAt = Date.now();
  let requestId: string | null = null;

  try {
    const expectedSecret = getRequiredEnv("AI_ASSISTANT_WEBHOOK_SECRET");
    const incomingSecret = req.headers.get("x-webhook-secret");

    if (!incomingSecret || incomingSecret !== expectedSecret) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const serviceKey = resolveSupabaseSecretKey();
    const openaiKey = getRequiredEnv("OPENAI_API_KEY");

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: {
          "x-application-name": "vizefirmalari-ai-assistant-worker",
        },
      },
    });

    const payload = (await req.json()) as WebhookPayload;
    const record = payload.record;
    requestId = record?.id ?? null;

    if (!record?.id || !record.session_id || !record.prompt) {
      return json({ ok: true, skipped: "Invalid webhook payload" });
    }

    if (record.status !== "queued") {
      return json({ ok: true, skipped: "Request is not queued" });
    }

    await updateRequest(supabase, record.id, {
      status: "processing",
      started_at: new Date(startedAt).toISOString(),
      error: null,
    });

    await insertMessage(supabase, {
      session_id: record.session_id,
      request_id: record.id,
      role: "user",
      content: record.prompt,
      status: "completed",
      metadata: { source: "ai_assistant_request" },
    });

    const intentResult = await analyzeIntent(openaiKey, record.prompt);

    await updateRequest(supabase, record.id, {
      intent: intentResult.intent,
      normalized_query: intentResult.normalized_query,
      filters: intentResult.filters,
      model: OPENAI_MODEL,
      metadata: {
        ...(intentResult.metadata ?? {}),
        ai_stage: "intent_completed",
      },
    });

    const firmMatches = await findMatchingFirms(
      supabase,
      intentResult.filters,
      record.prompt,
    );

    if (firmMatches.length > 0) {
      await insertFirmMatches(supabase, record.id, firmMatches);
    }

    const answerResult = await createGroundedAnswer(openaiKey, {
      prompt: record.prompt,
      intent: intentResult.intent,
      filters: intentResult.filters,
      firm_count: firmMatches.length,
    });

    if (answerResult.sources.length > 0) {
      await insertSources(supabase, record.id, answerResult.sources);
    }

    await insertMessage(supabase, {
      session_id: record.session_id,
      request_id: record.id,
      role: "assistant",
      content: answerResult.answer,
      status: "completed",
      model: OPENAI_MODEL,
      metadata: {
        firm_count: firmMatches.length,
        source_count: answerResult.sources.length,
        official_source_count: answerResult.sources.filter((s) => s.is_official).length,
        mode: "official_web_search_plus_supabase_firms",
      },
    });

    await updateRequest(supabase, record.id, {
      status: "completed",
      completed_at: new Date().toISOString(),
      latency_ms: Date.now() - startedAt,
      tokens_input:
        intentResult.usage?.input_tokens ??
        answerResult.usage?.input_tokens ??
        null,
      tokens_output:
        intentResult.usage?.output_tokens ??
        answerResult.usage?.output_tokens ??
        null,
      metadata: {
        ai_stage: "completed",
        firm_count: firmMatches.length,
        source_count: answerResult.sources.length,
        // OpenAI yanıt şemasının kısa özeti — sources boş kaldığında hangi yola
        // düştüğünü (web_search_call_count, annotation_types, sample_domains)
        // tek bakışta görmeye yarar. `ai_assistant_requests.metadata` jsonb.
        web_search_debug: answerResult.debug,
      },
    });

    await updateSessionActivity(supabase, record.session_id);

    return json({
      ok: true,
      request_id: record.id,
      intent: intentResult.intent,
      firm_count: firmMatches.length,
      source_count: answerResult.sources.length,
    });
  } catch (error) {
    console.error("ai-assistant-worker error:", error);

    if (requestId) {
      try {
        const supabase = createClient(
          getRequiredEnv("SUPABASE_URL"),
          resolveSupabaseSecretKey(),
          { auth: { persistSession: false, autoRefreshToken: false } },
        );

        await updateRequest(supabase, requestId, {
          status: "failed",
          error: error instanceof Error ? error.message : String(error),
          completed_at: new Date().toISOString(),
        });
      } catch (innerError) {
        console.error("failed to mark request as failed:", innerError);
      }
    }

    return json(
      {
        error: "AI assistant worker failed",
        detail: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function resolveSupabaseSecretKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;

  const rawSecretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (!rawSecretKeys) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEYS");
  }

  const parsed = JSON.parse(rawSecretKeys) as Record<string, unknown>;

  const candidates = [
    parsed.service_role,
    parsed.serviceRole,
    parsed.service_role_key,
    parsed.secret,
    parsed.default,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.length > 20) {
      return candidate;
    }
  }

  for (const value of Object.values(parsed)) {
    if (typeof value === "string" && value.length > 20) {
      return value;
    }
  }

  throw new Error("Could not resolve a usable Supabase secret key");
}

async function updateRequest(
  supabase: ReturnType<typeof createClient>,
  id: string,
  patch: JsonRecord,
): Promise<void> {
  const { error } = await supabase
    .from("ai_assistant_requests")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(`updateRequest failed: ${error.message}`);
}

async function updateSessionActivity(
  supabase: ReturnType<typeof createClient>,
  sessionId: string,
): Promise<void> {
  const { error } = await supabase
    .from("ai_assistant_sessions")
    .update({
      last_activity_at: new Date().toISOString(),
      last_message_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  if (error) throw new Error(`updateSessionActivity failed: ${error.message}`);
}

async function insertMessage(
  supabase: ReturnType<typeof createClient>,
  message: JsonRecord,
): Promise<void> {
  const { error } = await supabase
    .from("ai_assistant_messages")
    .insert(message);

  if (error) throw new Error(`insertMessage failed: ${error.message}`);
}

async function insertSources(
  supabase: ReturnType<typeof createClient>,
  requestId: string,
  sources: Array<{
    url: string;
    domain: string | null;
    title: string | null;
    snippet: string | null;
    source_kind: string;
    is_official: boolean;
    rank: number;
  }>,
): Promise<void> {
  const rows = sources.map((source) => ({
    request_id: requestId,
    url: source.url,
    domain: source.domain,
    title: source.title,
    snippet: source.snippet,
    source_kind: source.source_kind,
    is_official: source.is_official,
    rank: source.rank,
    metadata: {},
  }));

  const { error } = await supabase
    .from("ai_assistant_sources")
    .upsert(rows, { onConflict: "request_id,url" });

  if (error) throw new Error(`insertSources failed: ${error.message}`);
}

async function insertFirmMatches(
  supabase: ReturnType<typeof createClient>,
  requestId: string,
  firms: Array<{ id: string; rank: number; match_score: number; reason: string }>,
): Promise<void> {
  const rows = firms.map((firm) => ({
    request_id: requestId,
    firm_id: firm.id,
    rank: firm.rank,
    match_score: firm.match_score,
    match_reason: firm.reason,
    matched_filters: {},
  }));

  const { error } = await supabase
    .from("ai_assistant_firm_matches")
    .upsert(rows, { onConflict: "request_id,firm_id" });

  if (error) throw new Error(`insertFirmMatches failed: ${error.message}`);
}

async function analyzeIntent(
  openaiKey: string,
  prompt: string,
): Promise<{
  intent: string;
  normalized_query: string;
  filters: JsonRecord;
  metadata?: JsonRecord;
  usage?: { input_tokens?: number; output_tokens?: number };
}> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        {
          role: "system",
          content:
            "Sen VizeFirmalari.com için güvenli bir niyet analiz motorusun. Firma, puan, kaynak, ülke veya hizmet uydurmazsın. Sadece kullanıcının vize/göç/eğitim/yurtdışı süreci niyetini JSON olarak sınıflandırırsın.",
        },
        {
          role: "user",
          content: `Kullanıcı sorgusu: ${prompt}

Sadece geçerli JSON döndür:
{
  "intent": "firm_search | visa_info | country_info | education | migration | golden_visa | rejection_appeal | unknown",
  "normalized_query": "kısa normalize Türkçe sorgu",
  "filters": {
    "countries": [],
    "regions": [],
    "visaTypes": [],
    "expertises": [],
    "firmTypes": [],
    "mainServices": [],
    "city": null,
    "serviceModel": null,
    "needsFirmMatch": true
  },
  "confidence": 0.0
}`,
        },
      ],
      text: { format: { type: "json_object" } },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI intent failed: ${await response.text()}`);
  }

  const data = await response.json();
  const text = extractResponseText(data);
  const parsed = JSON.parse(text);

  return {
    intent: safeString(parsed.intent, "unknown"),
    normalized_query: safeString(parsed.normalized_query, prompt),
    filters: isObject(parsed.filters) ? parsed.filters : {},
    metadata: {
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : null,
    },
    usage: data.usage,
  };
}

async function createGroundedAnswer(
  openaiKey: string,
  input: {
    prompt: string;
    intent: string;
    filters: JsonRecord;
    firm_count: number;
  },
): Promise<{
  answer: string;
  sources: Array<{
    url: string;
    domain: string | null;
    title: string | null;
    snippet: string | null;
    source_kind: string;
    is_official: boolean;
    rank: number;
  }>;
  usage?: { input_tokens?: number; output_tokens?: number };
  debug: JsonRecord;
}> {
  const systemPrompt = [
    "Sen VizeFirmalari.com için TÜRKÇE yanıt veren güvenilir bir araştırma asistanısın.",
    "DİL KURALI (ZORUNLU): Cevabın TAMAMI Türkçe olacak. Web search'ten dönen kaynaklar İngilizce, Almanca, Fransızca, İspanyolca veya başka herhangi bir dilde olsa bile bilgileri Türkçeye çevirip yazarsın. Kurum adlarını orijinal yazımıyla bırakabilirsin (ör. 'Auswärtiges Amt', 'BAMF', 'Home Office'), ama açıklayıcı tüm metin Türkçedir.",
    "MUTLAKA önce web_search aracını çağır ve cevabı YALNIZCA aşağıdaki RESMİ / YASAL kaynak ailelerinden topladığın güncel verilere dayandır.",
    "Eğitim / vize / oturum / vatandaşlık / iş izni gibi konularda KESİNLİKLE eski bilgi veya kendi parametrik hafızandan cevap üretme.",
    "İZİN VERİLEN KAYNAK AİLELERİ (yalnızca bunlardan veri topla):",
    "  • Hedef ülkenin resmi devlet portalları: .gov / .gov.tr / .gov.uk / .gouv.fr / .bund.de / .gc.ca / .gob.es / .gv.at / .admin.ch / .europa.eu / vb.",
    "  • Bakanlıklar ve göç otoriteleri: Auswärtiges Amt, BAMF, UDI, Migrationsverket, IRCC, USCIS, UKVI / Home Office, US Department of State, Goç İdaresi Başkanlığı, T.C. Dışişleri Bakanlığı vb.",
    "  • Resmi konsolosluk ve büyükelçilik siteleri (embassy / consulate / büyükelçilik / konsolosluk içeren resmi alan adları).",
    "  • Resmi yetkilendirilmiş başvuru / vize merkezleri: VFS Global, iDATA, TLScontact, USTravelDocs, BLS International, Capago, VisaMetric.",
    "  • AB / BM kurumları: europa.eu, schengenvisainfo.europa.eu, etiasvisa.com, un.org, unhcr.org, iom.int.",
    "  • Resmi sınav / dil otoriteleri (yalnızca dil/eğitim soruları için): IELTS (ielts.org), TOEFL (ets.org), Goethe-Institut, TestDaF, TÖMER vb.",
    "YASAK KAYNAKLAR (asla kullanma):",
    "  • Forum, sözlük, blog, kişisel site (reddit, quora, ekşi sözlük, uludağ sözlük, medium, blogspot, wordpress, vb.)",
    "  • Sosyal medya (facebook, instagram, twitter/x, tiktok, youtube)",
    "  • Wikipedia, wikitravel, tripadvisor, vize/seyahat forumları",
    "  • Vize danışmanlık firmalarının pazarlama içerikli blog sayfaları",
    "Eğer izin verilen kaynak ailelerinde yeterli veri bulamazsan; uydurma yapma, eksik bıraktığın bölümde \"resmi kaynaklarda doğrulanması önerilir\" şeklinde sakin bir uyarı kullan.",
    "Cevabın profesyonel, derinlikli ve kullanıcıya güven veren bir araştırma raporu havasında olmalı; satış dili veya yüzeysel ifade yok.",
    "Mümkün olduğunda kanıt değeri yüksek SAYISAL bilgileri (ücret, gelir alt sınırı, süre, geçerlilik, dil seviyesi) ekle; ancak kaynaktan teyit edemediğin sayı yazma.",
    "Asla firma adı, marka adı veya site URL'si yazma — firma kartları arayüzde ayrı gösterilir.",
    "Asla kaynak linki / URL yazma — kaynaklar arayüzde ayrı kart olarak gösterilir.",
    "Hukuki kesinlik dili kullanma; vize / oturum / işlem sonucu için garanti verme.",
    "Cevap her zaman aşağıda istenen Markdown başlık yapısıyla bölünür.",
  ].join(" ");

  const userPrompt = `Kullanıcının sorusu: ${input.prompt}

YAPMAN GEREKENLER (sırayla):
1) ÖNCE web_search aracını çağır. Aramanı YALNIZCA aşağıdaki resmi / yasal kaynak ailelerinden topla:
   • Hedef ülkenin RESMİ devlet portalları (.gov, .gov.tr, .gov.uk, .gouv.fr, .bund.de, .gc.ca, .gob.es, .gv.at, .admin.ch, .europa.eu, vb.)
   • Konsolosluk / büyükelçilik resmi siteleri
   • Bakanlıklar ve göç otoriteleri (Auswärtiges Amt, BAMF, UDI, Migrationsverket, IRCC, USCIS, UKVI / Home Office, US State Department, T.C. Dışişleri / Göç İdaresi, vb.)
   • Resmi yetkilendirilmiş başvuru merkezleri (VFS Global, iDATA, TLScontact, USTravelDocs, BLS, Capago, VisaMetric)
   • AB / BM kurumları (europa.eu, schengenvisainfo.europa.eu, etiasvisa.com, unhcr.org, iom.int)
2) Forum, blog, sözlük, sosyal medya, Wikipedia, TripAdvisor ve danışmanlık firma blogu kaynaklarına ASLA girme.
3) Yukarıdaki ailelerden EN AZ 2-3 farklı kaynak gez; tek bir kaynağa bağımlı kalma.
4) SONRA topladığın bilgilerle aşağıdaki Markdown formatında profesyonel bir araştırma kartı yaz. Resmi kaynakta teyit edemediğin bilgiyi yazma; eksik bıraktığın yerde "resmi kaynaklarda doğrulanması önerilir" şeklinde sakin bir uyarı kullan.

Cevap formatı (başlıkları aynen kullan, sırayı değiştirme):

# [Konuya özel kısa başlık]

## 🧭 Kısa Bilgi
3-4 cümlelik özet. Konunun kim için olduğunu, hangi kategoride yer aldığını ve genel çerçevesini anlat. Mümkünse vize sınıfı / kategori adını (örn. "Schengen C tipi", "D tipi ulusal vize", "Çalışma vizesi - Mavi Kart") belirt.

## 📌 Başvuru Süreci
- Sürecin temel adımları (3-5 madde)
- Hangi resmi kurum / başvuru merkezi üzerinden ilerlediği (kurum adı yaz, URL yazma)
- Tahmini işlem süresi (gün / hafta) — sayısal bilgiyi resmi kaynaktan teyit ettiğinde yaz
- Randevu, biyometri, mülakat gibi temel aşamalar varsa belirt

## 📄 Gerekli Belgeler
- Genel belge kategorileri (3-5 madde)
- Konuya özel ek belgeler (iş sözleşmesi, kabul mektubu, mali kanıt, sigorta, dil sertifikası vb.)
- Resmi liste değişkenliği için "genellikle" / "başvuru türüne göre" ifadelerini kullan

## ⚠️ Dikkat Edilmesi Gerekenler
- Vize / oturum / izin sonucu için GARANTİ yoktur
- Vize ücreti, gelir alt sınırı, dil seviyesi (örn. A2, B1), sigorta limiti gibi sayısal kritik koşullar (yalnızca resmi kaynakta gördüklerini)
- Resmi mevzuat ve konsolosluk koşulları değişebilir; başvurudan önce ilgili konsolosluk veya resmi otorite sayfası kontrol edilmelidir

## ✅ Ne Yapabilirsiniz?
- Bir sonraki mantıklı adım (resmi başvuru sayfasını kontrol etme, randevu açılış takibi, belge ön hazırlığı gibi)
- "Aşağıdaki firmalar arasından bu alanda hizmet verenleri inceleyebilirsiniz." benzeri bir kapanış cümlesi
- Firma adı veya marka adı yazma

KESİN KURALLAR:
- Türkçe ve profesyonel yaz. Cümleler net, açıklayıcı, kısa olsun.
- 280-400 kelime aralığında ol — yüzeysel olma, ama yoruluncaya kadar uzatma.
- Mobilde okunabilir kısa paragraflar ve madde işaretleri kullan.
- Her başlık altında 3-5 madde; tek başına paragraf gerekiyorsa 2-3 cümleyi geçme.
- Liste için \`- \` (tire + boşluk) kullan.
- Firma adı / marka adı / URL / kaynak linki YAZMA.
- "kesinlikle", "garanti", "şüphesiz", "mutlaka olur" gibi kesinlik bildiren ifadelerden kaçın; "genellikle", "çoğu durumda", "resmi kaynaklara göre" gibi tedbirli dil kullan.
- Doğrudan # başlığı ile başla; gereksiz uzun giriş yapma.
- Sayısal bilgi YAZARKEN sadece web_search ile teyit ettiğin değerleri kullan; kanıtlanamayan rakam yazma.

Bağlam (gizli, yanıtta görünmesin):
- Niyet: ${input.intent}
- Sistemde eşleşen firma sayısı: ${input.firm_count}`;

  /**
   * OpenAI Responses API — Web Search aracı (model'e göre koşullu).
   *
   * Tüm modellerde GÜVENLE çalışan parametreler:
   *  - type: "web_search"
   *  - search_context_size: "high"   (cevabın resmi kaynak yoğunluğu yüksek)
   *  - user_location: TR             (Türkiye'den başvuru bağlamı)
   *
   * SADECE gpt-5.x ailesinde desteklenen yeni denetimler:
   *  - filters.blocked_domains       (forum / sosyal medya / sözlük blokla)
   *  - include: web_search_call.action.sources  (modelin gezdiği TAM URL listesi)
   *
   * Bilinen kısıtlama: gpt-4.1-mini gibi eski modellerde `filters` /
   * `include=web_search_call.action.sources` parametreleri 400 döndürür.
   * `isGpt5Family` flag'i bu özellikleri yalnızca uygun modelde açar.
   *
   * tool_choice: "auto" — model gerek görmezse aramayı atlayabilir; sistem
   *                       prompt "mutlaka web_search kullan" diyerek yönlendirir.
   */
  const isGpt5Family = /^gpt-5/i.test(OPENAI_MODEL);

  const webSearchTool: JsonRecord = {
    type: "web_search",
    search_context_size: "high",
    user_location: {
      type: "approximate",
      country: "TR",
    },
  };

  if (isGpt5Family) {
    webSearchTool.filters = {
      blocked_domains: [
        "reddit.com",
        "quora.com",
        "wikipedia.org",
        "eksisozluk.com",
        "instagram.com",
        "facebook.com",
        "x.com",
        "twitter.com",
        "tiktok.com",
        "pinterest.com",
        "blogspot.com",
        "wordpress.com",
      ],
    };
  }

  /**
   * `tool_choice: { type: "web_search" }` → modeli web aramasına ZORLAR.
   *
   * Aksi halde gpt-4.1-mini gibi modeller "auto" modunda çoğu zaman aramayı
   * atlayıp kendi parametrik hafızasından cevaplar; sonuçta ai_assistant_sources
   * tablosu boş kalır ve UI'da kaynak kartları görünmez. Bu satır cevap kalitesini
   * ve "gerçek zamanlı resmi kaynak" güvencesini garanti eder.
   *
   * OpenAI dokümantasyonu: "Use tool_choice: 'required' or a specific web search
   * tool choice when search must run."
   */
  const requestBody: JsonRecord = {
    model: OPENAI_MODEL,
    tools: [webSearchTool],
    tool_choice: { type: "web_search" },
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };

  if (isGpt5Family) {
    requestBody.include = ["web_search_call.action.sources"];
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`OpenAI answer failed: ${await response.text()}`);
  }

  const data = await response.json();
  const answer = extractResponseText(data);
  const sources = extractSources(data);
  const debug = buildSourcesDebugSnapshot(data, sources.length);

  // Edge Function logs üzerinden takip için bir özet bas. Hiç kaynak çıkmadıysa
  // burada görmek (output_types, web_search_call_count, annotation_count, vs.)
  // OpenAI yanıt şemasının hangi yola düştüğünü hızlıca anlamayı sağlar.
  if (sources.length === 0) {
    console.warn(
      "[ai-assistant-worker] web_search returned no sources",
      JSON.stringify(debug)
    );
  } else {
    console.log(
      `[ai-assistant-worker] web_search sources=${sources.length}`,
      JSON.stringify(debug)
    );
  }

  return {
    answer: answer || fallbackAnswer(input.prompt, input.firm_count),
    sources,
    usage: data.usage,
    debug,
  };
}

/**
 * OpenAI Responses API yanıt şemasının kısa bir özetini çıkarır. Edge Function
 * log'una ve `ai_assistant_requests.metadata.web_search_debug` alanına yazılır
 * (tabloda zaten `metadata jsonb` var). Hiç kaynak çıkmadığı senaryolarda
 * "model arama yaptı mı?", "annotation üretildi mi?" gibi soruları cevaplar.
 */
function buildSourcesDebugSnapshot(
  data: unknown,
  resolvedSourceCount: number
): JsonRecord {
  const d = (data ?? {}) as JsonRecord;
  const outputArr = Array.isArray((d as JsonRecord).output)
    ? ((d as JsonRecord).output as unknown[])
    : [];

  const outputTypes: string[] = [];
  let webSearchCallCount = 0;
  let webSearchResultCount = 0;
  let messageCount = 0;
  let annotationCount = 0;
  const annotationTypes = new Set<string>();
  const sampleDomains = new Set<string>();

  for (const raw of outputArr) {
    const item = (raw ?? {}) as JsonRecord;
    const t = typeof item.type === "string" ? item.type : "";
    if (t) outputTypes.push(t);

    if (t === "web_search_call") {
      webSearchCallCount += 1;
      const results = Array.isArray(item.results) ? item.results : [];
      const action = (item.action ?? {}) as JsonRecord;
      const actionResults = Array.isArray(action.results) ? action.results : [];
      const actionSources = Array.isArray(action.sources) ? action.sources : [];
      webSearchResultCount += results.length + actionResults.length + actionSources.length;
      for (const candidate of [...results, ...actionResults, ...actionSources]) {
        const url = (candidate as JsonRecord)?.url;
        if (typeof url === "string") {
          try {
            sampleDomains.add(new URL(url).hostname.replace(/^www\./, ""));
          } catch {
            /** non-URL ignore */
          }
        }
      }
    }

    if (t === "message") {
      messageCount += 1;
      const content = Array.isArray(item.content) ? item.content : [];
      for (const c of content) {
        const annotations = Array.isArray((c as JsonRecord)?.annotations)
          ? ((c as JsonRecord).annotations as unknown[])
          : [];
        for (const a of annotations) {
          annotationCount += 1;
          const at = (a as JsonRecord)?.type;
          if (typeof at === "string") annotationTypes.add(at);
          const url = (a as JsonRecord)?.url;
          if (typeof url === "string") {
            try {
              sampleDomains.add(new URL(url).hostname.replace(/^www\./, ""));
            } catch {
              /** non-URL ignore */
            }
          }
        }
      }
    }
  }

  return {
    resolved_source_count: resolvedSourceCount,
    output_types: outputTypes,
    web_search_call_count: webSearchCallCount,
    web_search_result_count: webSearchResultCount,
    message_count: messageCount,
    annotation_count: annotationCount,
    annotation_types: [...annotationTypes],
    sample_domains: [...sampleDomains].slice(0, 12),
  };
}

/**
 * AI cevabı boş geldiğinde UI'ın "tek paragraf" hissi vermemesi için aynı
 * markdown iskeletini dolduran güvenli fallback.
 */
function fallbackAnswer(prompt: string, firmCount: number): string {
  const safe = (prompt ?? "").toString().trim().slice(0, 120) || "bu konu";
  return `# ${safe}

## 🧭 Kısa Bilgi
Bu konu için genel bir araştırma başlatıldı. Aşağıdaki bilgiler genel niteliktedir; her başvuru kişisel duruma ve hedef ülkenin güncel mevzuatına göre değişebilir.

## 📌 Başvuru Süreci
- Başvurular genellikle ilgili konsolosluk veya yetkili başvuru merkezi üzerinden ilerler.
- Süreç, başvuru türüne ve kişisel duruma göre farklı adımlar içerebilir.
- Randevu, evrak hazırlığı ve değerlendirme aşamaları çoğu durumda standart bir akış izler.

## 📄 Gerekli Belgeler
- Genellikle pasaport, başvuru formu, fotoğraf ve seyahat / amaç belgeleri istenir.
- Ek olarak finansal belge, davet veya kabul yazısı talep edilebilir.
- Kesin liste ülkeye ve başvuru türüne göre değişir.

## ⚠️ Dikkat Edilmesi Gerekenler
- Vize / oturum / izin sonucu için garanti yoktur.
- Resmi mevzuat ve konsolosluk koşulları değişebilir; başvurudan önce ilgili konsolosluk veya resmi otorite sayfası kontrol edilmelidir.
- Aşağıdaki kaynak kartları (varsa) güncel bilgi için kullanılabilir.

## ✅ Ne Yapabilirsiniz?
- Aşağıdaki firmalar arasından bu alanda hizmet verenleri inceleyebilirsiniz.
- Sistemde eşleşen firma sayısı: ${firmCount}.`;
}

function extractResponseText(data: any): string {
  if (typeof data.output_text === "string") return data.output_text;

  const chunks: string[] = [];

  for (const item of data.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
      if (content.type === "text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

/**
 * OpenAI Responses API farklı yayın versiyonlarında web kaynaklarını farklı yerlerde
 * yayınlıyor. Bu fonksiyon defensive: model çıktısına URL/halüsinasyon parse'i YAPMAZ;
 * yalnızca yapılandırılmış annotation/sonuç yollarını gezer.
 *
 * Yakalanan yollar:
 *  - data.output[].type === "web_search_call" → results[] / action.results[] / search_results[]
 *  - data.output[].content[].annotations[] → type "url_citation" | "url" | "citation"
 *  - data.url_citations / data.citations / data.web_search_results (üst düzey)
 */
function extractSources(data: any): Array<{
  url: string;
  domain: string | null;
  title: string | null;
  snippet: string | null;
  source_kind: string;
  is_official: boolean;
  rank: number;
}> {
  type Source = {
    url: string;
    domain: string | null;
    title: string | null;
    snippet: string | null;
    source_kind: string;
    is_official: boolean;
    rank: number;
  };

  const urls = new Map<string, Source>();
  let rank = 1;

  const addUrl = (raw: any) => {
    if (!raw) return;
    const candidate =
      typeof raw === "string"
        ? raw
        : raw.url ?? raw.href ?? raw.link ?? null;
    if (!candidate || typeof candidate !== "string") return;
    if (!/^https?:\/\//i.test(candidate)) return;

    let url = candidate.trim();
    try { url = new URL(url).toString(); } catch { return; }

    const key = url.replace(/[#].*$/, "").replace(/\/$/, "");
    if (urls.has(key)) return;

    const domain = getDomain(url);
    const isOfficial = isOfficialDomain(domain);
    urls.set(key, {
      url,
      domain,
      title: safeNullableString(raw?.title ?? raw?.name ?? raw?.heading),
      snippet: safeNullableString(raw?.snippet ?? raw?.text ?? raw?.excerpt),
      source_kind: classifySource(domain, isOfficial),
      is_official: isOfficial,
      rank: rank++,
    });
  };

  const visitArray = (arr: unknown) => {
    if (!Array.isArray(arr)) return;
    for (const item of arr) addUrl(item);
  };

  for (const item of data?.output ?? []) {
    // 1) Web search call sonuçları (eski + yeni şemalar)
    //    Yeni `web_search` aracı: include=["web_search_call.action.sources"]
    //    isteği ile `action.sources[]` (kapsamlı liste) ve `action.results[]`
    //    (kısa liste) ayrı yollarda gelebilir; ikisini de tarıyoruz.
    if (item?.type === "web_search_call") {
      visitArray(item?.results);
      visitArray(item?.action?.results);
      visitArray(item?.action?.sources);
      visitArray(item?.search_results);
      visitArray(item?.sources);
    }

    // 2) message içindeki annotation'lar — inline citation listesi
    //    OpenAI Responses API farklı modellerde farklı annotation type adları
    //    kullanabiliyor (`url_citation`, `url`, `citation`, `web_url`,
    //    `web_search_result`, `web_citation`, `link`...). Type bazlı whitelist
    //    yerine "URL benzeri bir alanı varsa kabul et" davranışı daha sağlam.
    for (const content of item?.content ?? []) {
      for (const annotation of content?.annotations ?? []) {
        const candidateUrl =
          annotation?.url ??
          annotation?.uri ??
          annotation?.href ??
          annotation?.link ??
          annotation?.source?.url;
        if (typeof candidateUrl !== "string") continue;
        addUrl({
          url: candidateUrl,
          title:
            annotation?.title ??
            annotation?.text ??
            annotation?.source?.title ??
            null,
          snippet:
            annotation?.snippet ??
            annotation?.quote ??
            annotation?.source?.snippet ??
            null,
        });
      }
    }
  }

  // 3) Üst düzey citation alanları (bazı şemalarda burada toplanır)
  visitArray(data?.url_citations);
  visitArray(data?.citations);
  visitArray(data?.web_search_results);
  visitArray(data?.sources);
  visitArray(data?.tool_results);

  // ────────────────────────────────────────────────────────────────────────
  //  POST-FILTER: Resmi / yasal kaynak şartı
  //  ────────────────────────────────────────────────────────────────────────
  //  Kullanıcı kuralı: Vize / oturum / vatandaşlık gibi konularda yanıt yalnız
  //  bakanlık, konsolosluk, resmi devlet portalı, AB / BM organları ve resmi
  //  başvuru merkezlerinden üretilmeli. Forum, blog, sözlük, sosyal medya ve
  //  kişisel kaynaklar hiçbir koşulda gösterilmemeli.
  //
  //  Strateji (kaynak boş kalmasın diye 3 kademe):
  //    1) Blacklist domain'leri (forum/blog/sosyal medya) tamamen elenir.
  //    2) Önce gerçek resmi (government/embassy/academic) kaynaklar alınır.
  //    3) Hâlâ ≥3 kaynağa ulaşılamadıysa "official_org" (VFS, iDATA,
  //       TLScontact gibi resmi başvuru merkezleri) eklenerek 8'e tamamlanır.
  //    4) Yine boş kalırsa kalan güvenilir kaynaklara izin verilir; ama
  //       blacklist asla atlatılmaz.
  // ────────────────────────────────────────────────────────────────────────
  const all = [...urls.values()];
  const allowed = all.filter((s) => !isUntrustedDomain(s.domain));

  const officialFirst = allowed.filter((s) => s.is_official);
  const applicationCenters = allowed.filter(
    (s) => !s.is_official && s.source_kind === "application_center",
  );
  const remainder = allowed.filter(
    (s) => !s.is_official && s.source_kind !== "application_center",
  );

  let curated: Source[] = [];
  if (officialFirst.length >= 3) {
    curated = officialFirst.slice(0, 8);
  } else {
    curated = [...officialFirst, ...applicationCenters];
    if (curated.length < 3) curated = [...curated, ...remainder];
    curated = curated.slice(0, 8);
  }

  // Rank'leri filter sonrası 1'den itibaren yeniden numaralandır (UI sıralı görünsün).
  curated = curated.map((s, idx) => ({ ...s, rank: idx + 1 }));

  // En fazla 8 kaynak ham veri olarak iletilir; UI tarafı 6 ile sınırlar.
  return curated;
}

/* ──────────────────────────────────────────────────────────────────────────
 *  AI ASSISTANT — INTENT/CLUSTER TABANLI FİRMA EŞLEŞME ALGORİTMASI
 *  ──────────────────────────────────────────────────────────────────────────
 *  Felsefe: "Yunanistan Golden Visa" gibi ÖZEL niyetlerde sadece gerçekten
 *  ilgili firmaları (Golden Visa / yatırım göçü / gayrimenkul / vatandaşlık)
 *  öne çıkar; genel "Vize Hizmeti" sinyali tek başına eşleşmeye yetmesin.
 *
 *  Akış:
 *    1) prompt + intent.filters üzerinden bir IntentCluster tespit et
 *    2) cluster.strictSignals varsa firma alanlarında EN AZ BİR sinyali şart
 *       koş (yoksa firmayı eler)
 *    3) Yeni scoring (strict +0.45, country +0.18, region +0.12,
 *       service/expertise exact +0.25, tag +0.18, boolean expertise +0.15,
 *       corp +0.10, hype +0.03) — clamp [0,1]
 *    4) Sıralama: special relevance desc → corporateness desc → hype desc → name asc
 *    5) İlk MAX_FIRM_MATCHES (20) sonucu döndür
 * ──────────────────────────────────────────────────────────────────────────
 */

type IntentClusterKey =
  | "visa-services"
  | "migration-residence"
  | "citizenship-golden-visa"
  | "study-abroad"
  | "international-career"
  | "company-investment"
  | "legal-official"
  | "tourism-travel"
  | "consular-operations";

type ClusterDefinition = {
  key: IntentClusterKey;
  aliases: string[];
  relatedExpertise: string[];
  relatedServices: string[];
  relatedOperations: string[];
  relatedTags: string[];
  /** Bu cluster için zorunlu sinyaller. Boşsa cluster yumuşak (eleme yok). */
  strictSignals: string[];
  /** Yumuşak sinyaller — skoru artırır ama strict yerine geçmez. */
  softSignals: string[];
  /** Cluster için ülke önerileri (yardımcı). */
  recommendedCountries: string[];
};

const INTENT_CLUSTERS: ClusterDefinition[] = [
  {
    key: "visa-services",
    aliases: [
      "vize", "vize hizmeti", "schengen", "abd vizesi", "kanada vizesi",
      "ingiltere vizesi", "dubai vizesi", "turistik vize", "iş vizesi",
    ],
    relatedExpertise: [
      "Schengen Vizesi", "ABD Vizesi", "Turistik Vize", "İş / Ticari Vize",
      "Öğrenci Vizesi", "Çalışma Vizesi", "Kanada Vizesi", "İngiltere Vizesi",
      "Dubai Vizesi", "E-Vize", "Transit Vizesi", "Fuar Vizesi",
      "Konferans Vizesi", "Ziyaret Vizesi",
    ],
    relatedServices: [
      "Vize Hizmeti", "İngiltere Vizesi", "E-Vize", "Transit Vizesi",
      "Fuar Vizesi", "Konferans Vizesi", "Ziyaret Vizesi",
    ],
    relatedOperations: [
      "Başvuru Süreç Yönetimi", "Dosya Hizmeti", "Randevu Hizmeti",
      "Evrak / Danışmanlık",
    ],
    relatedTags: [
      "Schengen", "ABD Vizesi", "İngiltere Vizesi", "Kanada Vizesi",
      "Dubai Vizesi", "Turistik Vize",
    ],
    strictSignals: [],
    softSignals: ["vize", "konsolosluk", "başvuru"],
    recommendedCountries: [
      "ABD", "İngiltere", "Kanada", "Almanya", "Fransa", "Hollanda",
      "Yunanistan", "İtalya", "Dubai", "BAE",
    ],
  },
  {
    key: "migration-residence",
    aliases: ["oturum", "ikamet", "göç", "aile birleşimi", "çalışma izni", "d tipi vize"],
    relatedExpertise: ["Aile Birleşimi", "Çalışma Vizesi", "Nitelikli İşçi Göçü"],
    relatedServices: [
      "Oturum", "Oturum Hizmetleri", "Çalışma İzni",
      "Uzun Dönemli / D Tipi Vizeler", "Aile Birleşimi Oturumu",
      "Evlilik Oturumu", "Emeklilik Oturumu", "Soy Bağları Oturumu",
      "Göç ve Entegrasyon Danışmanlığı", "İş / Şirket Temsilcilik Oturumu",
    ],
    relatedOperations: [],
    relatedTags: ["Oturum", "Aile Birleşimi", "Nitelikli İşçi Göçü", "Çalışma İzni"],
    strictSignals: [
      "oturum", "ikamet", "göç", "çalışma izni", "aile birleşimi",
      "uzun dönemli", "d tipi vize",
    ],
    softSignals: ["yerleşim", "entegrasyon", "evlilik oturumu", "emeklilik oturumu"],
    recommendedCountries: [
      "Almanya", "Kanada", "İngiltere", "Avustralya", "Hollanda",
      "Portekiz", "İspanya", "BAE",
    ],
  },
  {
    key: "citizenship-golden-visa",
    aliases: [
      "golden visa", "yunanistan golden visa", "yatırım yoluyla oturum",
      "yatırım yoluyla vatandaşlık", "vatandaşlık", "gayrimenkul",
      "yatırım göçü",
    ],
    relatedExpertise: [
      "Golden Visa", "Yunanistan Golden Visa", "Yatırım Yoluyla Vatandaşlık",
      "Yatırım Yoluyla Oturum", "Soy Bağı ile Vatandaşlık",
      "Vatandaşlık Hizmetleri",
    ],
    relatedServices: [
      "Golden Visa", "Yunanistan Golden Visa", "Yatırım Yoluyla Vatandaşlık",
      "Yatırım Yoluyla Oturum", "Soy Bağı ile Vatandaşlık",
      "Vatandaşlık Hizmetleri", "Vatandaşlık", "Yatırım Göçü Danışmanlığı",
      "Gayrimenkul Danışmanlığı", "Emlak Danışmanlığı",
    ],
    relatedOperations: [],
    relatedTags: [
      "Golden Visa", "Yunanistan Golden Visa", "Yatırım Yoluyla Oturum",
      "Yatırım Göçü", "Vatandaşlık", "Gayrimenkul Danışmanlığı",
    ],
    strictSignals: [
      "golden visa", "yunanistan golden visa", "yatırım yoluyla oturum",
      "yatırım yoluyla vatandaşlık", "vatandaşlık", "gayrimenkul",
      "yatırım göçü", "soy bağı",
    ],
    softSignals: ["şirket kurulumu", "emlak", "yatırım danışmanlığı", "yatırım"],
    recommendedCountries: [
      "Yunanistan", "Portekiz", "İspanya", "Malta", "Karadağ", "Dominika",
      "St. Kitts ve Nevis", "Türkiye", "BAE",
    ],
  },
  {
    key: "study-abroad",
    aliases: ["yurtdışı eğitim", "öğrenci", "erasmus", "dil okulu", "almanya eğitim"],
    relatedExpertise: ["Öğrenci Vizesi", "Eğitim Vizesi", "Erasmus Vizesi"],
    relatedServices: [
      "Yurtdışı Eğitim Danışmanlığı", "Almanya Eğitim Danışmanlığı",
      "Dil Sınav Merkezi", "Dil Sertifikasyon Hizmeti",
      "Konaklama Danışmanlığı",
    ],
    relatedOperations: [],
    relatedTags: ["Öğrenci Vizesi", "Erasmus Vizesi", "Almanya Eğitimi", "Dil Okulu"],
    strictSignals: [
      "öğrenci", "eğitim", "erasmus", "dil okulu",
      "dil sertifikasyon", "okul kabul",
    ],
    softSignals: ["üniversite", "akademik", "konaklama"],
    recommendedCountries: [
      "Almanya", "İngiltere", "Kanada", "ABD", "Avustralya", "Polonya",
      "Hollanda", "İrlanda",
    ],
  },
  {
    key: "international-career",
    aliases: [
      "çalışma", "çalışma vizesi", "işçi", "nitelikli işçi", "freelancer",
      "startup", "sağlık çalışanı", "tır şoförü", "kariyer",
    ],
    relatedExpertise: [
      "Çalışma Vizesi", "Freelancer Vizesi", "Startup Vizesi",
      "Girişimci Vizesi", "Tır Şoförü Vizesi",
    ],
    relatedServices: [
      "Çalışma Vizesi", "Çalışma İzni", "Freelancer Vizesi", "Startup Vizesi",
      "Girişimci Vizesi", "Nitelikli İşçi Yerleştirme",
      "Nitelikli İşçi Göçü", "Sağlık Çalışanı Yerleştirme",
      "Sağlık Sektörü İş Yerleştirme", "Uluslararası Kariyer Danışmanlığı",
      "Tır Şoförü Vizesi",
    ],
    relatedOperations: [],
    relatedTags: [
      "Çalışma Vizesi", "Nitelikli İşçi Yerleştirme",
      "Sağlık Çalışanı Yerleştirme", "Tır Şoförü", "Freelancer", "Startup",
    ],
    strictSignals: [
      "çalışma vizesi", "çalışma izni", "işçi", "freelancer", "startup",
      "girişimci", "sağlık çalışanı", "tır şoförü",
      "iş yerleştirme", "kariyer",
    ],
    softSignals: ["iş gücü", "uzman", "mavi yaka"],
    recommendedCountries: [
      "Almanya", "Kanada", "İngiltere", "Avustralya", "Hollanda",
      "Dubai", "BAE", "Katar", "Suudi Arabistan",
    ],
  },
  {
    key: "company-investment",
    aliases: ["şirket kurulumu", "yatırım", "iş kurma", "ticari yapılanma", "startup"],
    relatedExpertise: ["İş / Ticari Vize", "Girişimci Vizesi", "Startup Vizesi"],
    relatedServices: [
      "Şirket Kurulumu", "İş Kurma Danışmanlığı", "İş Geliştirme Danışmanlığı",
      "Yatırım Danışmanlığı", "Hibe ve Teşvik Danışmanlığı", "İş / Ticari Vize",
      "İş / Şirket Temsilcilik Oturumu", "Girişimci Vizesi", "Startup Vizesi",
    ],
    relatedOperations: [],
    relatedTags: ["Şirket Kurulumu", "Yatırım Danışmanlığı", "Startup", "Girişimci"],
    strictSignals: [
      "şirket kurulumu", "şirket kur", "iş kurma", "yatırım", "startup",
      "girişimci", "ticari", "yatırım danışmanlığı", "iş geliştirme",
    ],
    softSignals: ["offshore", "ortaklık", "vergi"],
    recommendedCountries: [
      "Dubai", "BAE", "İngiltere", "Almanya", "Amerika", "Kanada",
      "Hollanda", "Estonya", "Portekiz",
    ],
  },
  {
    key: "legal-official",
    aliases: ["red", "itiraz", "hukuki", "avukat", "denklik", "tercüme"],
    relatedExpertise: [
      "İtiraz / Red Sonrası", "Soy Bağı ile Vatandaşlık",
      "Vatandaşlık Hizmetleri",
    ],
    relatedServices: [
      "Hukuki Danışmanlık", "Göçmenlik Hukuku", "Avukat Desteği",
      "Yeminli Tercüman", "Tercüme", "Mesleki Denklik", "Konsolosluk Yazıları",
      "Ön Onay İşlemleri", "Soy Bağı ile Vatandaşlık", "Vatandaşlık Hizmetleri",
    ],
    relatedOperations: ["Konsolosluk Yazıları", "Ön Onay İşlemleri"],
    relatedTags: ["İtiraz / Red Sonrası", "Hukuki Danışmanlık", "Tercüme", "Mesleki Denklik"],
    strictSignals: [
      "red", "itiraz", "hukuki", "avukat", "denklik",
      "göçmenlik hukuku", "tercüme", "yeminli tercüman",
    ],
    softSignals: ["mahkeme", "ret", "reddedildi"],
    recommendedCountries: ["Almanya", "İngiltere", "Kanada", "ABD", "Hollanda"],
  },
  {
    key: "tourism-travel",
    aliases: ["turistik", "tur", "tatil", "otel", "uçak bileti", "seyahat sigortası"],
    relatedExpertise: ["Turistik Vize"],
    relatedServices: [
      "Turistik Vize", "Otobüslü Avrupa Turları", "Balkan Turları",
      "Gemi Turları", "Kültür Turları", "Asya Turları", "Vizesiz Turlar",
      "Yurtiçi ve Yurtdışı Tur Programları", "Otel Tatilleri",
      "Kişiye Özel Tatil Hizmetleri", "Uçak Bileti", "Transfer Hizmetleri",
      "Seyahat Sağlık Sigortası", "Rezervasyon Hizmeti",
      "Konaklama Danışmanlığı",
    ],
    relatedOperations: [],
    relatedTags: ["Turistik Vize", "Balkan Turları", "Uçak Bileti", "Transfer Hizmetleri"],
    strictSignals: [
      "turistik", "tur", "tatil", "uçak bileti", "otel", "konaklama",
      "seyahat", "transfer",
    ],
    softSignals: ["balayı", "gezi", "kültür"],
    recommendedCountries: [
      "Yunanistan", "İtalya", "Fransa", "Dubai", "BAE", "Mısır", "Tayland",
    ],
  },
  {
    key: "consular-operations",
    aliases: ["randevu", "evrak", "dosya", "başvuru takibi", "konsolosluk", "pasaport"],
    relatedExpertise: [],
    relatedServices: [
      "Başvuru Süreç Yönetimi", "Dosya Hizmeti", "Randevu Hizmeti",
      "Konsolosluk İşlemleri", "Konsolosluk Yazıları", "Ön Onay İşlemleri",
      "Pasaport", "Evrak / Danışmanlık", "Rezervasyon Hizmeti", "Tercüme",
      "Yeminli Tercüman",
    ],
    relatedOperations: [
      "Başvuru Süreç Yönetimi", "Dosya Hizmeti", "Randevu Hizmeti",
      "Konsolosluk İşlemleri", "Konsolosluk Yazıları", "Ön Onay İşlemleri",
      "Pasaport", "Evrak / Danışmanlık",
    ],
    relatedTags: ["Randevu Hizmeti", "Evrak / Danışmanlık", "Dosya Hizmeti", "Pasaport"],
    strictSignals: [
      "randevu", "evrak", "dosya", "konsolosluk", "pasaport",
      "başvuru takibi", "ön onay",
    ],
    softSignals: ["onay", "vize başvuru merkezi"],
    recommendedCountries: [
      "Almanya", "İngiltere", "ABD", "Kanada", "Fransa", "İtalya", "Hollanda",
    ],
  },
];

const VISA_SERVICES_FALLBACK = INTENT_CLUSTERS.find((c) => c.key === "visa-services")!;

/** Türkçe normalize: lower + diakritik temizleme + harf-dışı karakterleri boşluğa indirir. */
function normTr(value: string): string {
  return String(value ?? "")
    .toLocaleLowerCase("tr")
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of values) {
    if (typeof v !== "string") continue;
    const trimmed = v.trim();
    if (!trimmed) continue;
    const key = normTr(trimmed);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

/** Firma satırından eşleşme için tüm sinyal metnini (tek normalize blob) üretir. */
function firmSignalBlob(firm: any): string {
  const parts: string[] = [];
  for (const field of [
    firm.countries, firm.services, firm.main_services, firm.sub_services,
    firm.tags, firm.visa_regions,
  ]) {
    for (const item of toStringArray(field)) parts.push(item);
  }
  if (typeof firm.firm_category === "string") parts.push(firm.firm_category);
  if (Array.isArray(firm.firm_category)) {
    for (const c of firm.firm_category) {
      if (typeof c === "string") parts.push(c);
    }
  }
  if (typeof firm.name === "string") parts.push(firm.name);
  return parts.map(normTr).filter(Boolean).join(" | ");
}

function blobIncludesAny(blob: string, needles: string[]): string[] {
  const hits: string[] = [];
  for (const needle of needles) {
    const n = normTr(needle);
    if (!n) continue;
    if (blob.includes(n)) hits.push(needle);
  }
  return hits;
}

/** Cluster tespit: prompt + filters üzerinden en iyi eşleşeni döndürür. */
function detectIntentCluster(
  prompt: string,
  filters: JsonRecord,
): ClusterDefinition {
  const promptN = normTr(prompt);
  const filterText = [
    ...toStringArray((filters as any).visaTypes),
    ...toStringArray((filters as any).expertises),
    ...toStringArray((filters as any).mainServices),
  ].map(normTr).join(" ");
  const haystack = `${promptN} ${filterText}`.trim();

  const directOrder: IntentClusterKey[] = [
    "citizenship-golden-visa",
    "international-career",
    "study-abroad",
    "migration-residence",
    "legal-official",
    "tourism-travel",
    "company-investment",
    "consular-operations",
    "visa-services",
  ];

  for (const key of directOrder) {
    const cluster = INTENT_CLUSTERS.find((c) => c.key === key);
    if (!cluster) continue;
    if (cluster.strictSignals.length === 0) continue;
    for (const sig of cluster.strictSignals) {
      const sN = normTr(sig);
      if (sN && haystack.includes(sN)) return cluster;
    }
  }

  // alias / soft fallback
  let bestCluster: ClusterDefinition | null = null;
  let bestHits = 0;
  for (const cluster of INTENT_CLUSTERS) {
    let hits = 0;
    for (const alias of cluster.aliases) {
      if (haystack.includes(normTr(alias))) hits += 1;
    }
    for (const sig of cluster.softSignals) {
      if (haystack.includes(normTr(sig))) hits += 1;
    }
    if (hits > bestHits) {
      bestHits = hits;
      bestCluster = cluster;
    }
  }

  return bestCluster ?? VISA_SERVICES_FALLBACK;
}

async function findMatchingFirms(
  supabase: ReturnType<typeof createClient>,
  filters: JsonRecord,
  prompt: string,
): Promise<Array<{ id: string; rank: number; match_score: number; reason: string }>> {
  const cluster = detectIntentCluster(prompt, filters);

  const countries = uniqueStrings(toStringArray((filters as any).countries));
  const regions = uniqueStrings(toStringArray((filters as any).regions));
  const promptCountrySignals = extractCountrySignals(prompt, cluster);
  const allCountries = uniqueStrings([...countries, ...promptCountrySignals]);

  // Hizmet/uzmanlık adayları cluster + filters birlikte gelir.
  const filterServiceTerms = uniqueStrings([
    ...toStringArray((filters as any).visaTypes),
    ...toStringArray((filters as any).expertises),
    ...toStringArray((filters as any).mainServices),
  ]);
  const clusterServiceTerms = uniqueStrings([
    ...cluster.relatedExpertise,
    ...cluster.relatedServices,
    ...cluster.relatedOperations,
  ]);
  const allServiceTerms = uniqueStrings([
    ...filterServiceTerms,
    ...clusterServiceTerms,
  ]);
  const tagTerms = uniqueStrings(cluster.relatedTags);

  const { data, error } = await supabase
    .from("firms")
    .select(`
      id,
      name,
      countries,
      services,
      main_services,
      sub_services,
      tags,
      visa_regions,
      firm_category,
      corporateness_score,
      hype_score,
      schengen_expert,
      usa_visa_expert,
      student_visa_support,
      work_visa_support,
      tourist_visa_support,
      business_visa_support,
      family_reunion_support,
      appeal_support,
      status,
      show_in_search,
      firm_page_enabled,
      show_on_card
    `)
    .eq("status", "published")
    .eq("show_in_search", true)
    .eq("firm_page_enabled", true)
    .eq("show_on_card", true)
    .limit(FIRM_FETCH_LIMIT);

  if (error) {
    console.error("findMatchingFirms failed:", error.message);
    return [];
  }

  const rows = data ?? [];

  const evaluated = rows
    .map((firm: any) => evaluateFirmAgainstCluster(firm, {
      cluster,
      countries: allCountries,
      regions,
      promptN: normTr(prompt),
      filterServiceTerms,
      clusterServiceTerms,
      allServiceTerms,
      tagTerms,
    }))
    .filter((entry) => entry !== null) as EvaluatedFirm[];

  evaluated.sort(compareEvaluatedFirms);

  return evaluated
    .slice(0, MAX_FIRM_MATCHES)
    .map((entry, index) => ({
      id: entry.firm.id,
      rank: index + 1,
      match_score: entry.score,
      reason: entry.reason,
    }));
}

type EvaluatedFirm = {
  firm: any;
  score: number;
  reason: string;
};

type EvalContext = {
  cluster: ClusterDefinition;
  countries: string[];
  regions: string[];
  promptN: string;
  filterServiceTerms: string[];
  clusterServiceTerms: string[];
  allServiceTerms: string[];
  tagTerms: string[];
};

function evaluateFirmAgainstCluster(firm: any, ctx: EvalContext): EvaluatedFirm | null {
  const blob = firmSignalBlob(firm);
  if (!blob) return null;

  // 1) STRICT FILTER: cluster.strictSignals varsa, firma EN AZ BİR sinyali taşımalı.
  let strictSignalHits: string[] = [];
  if (ctx.cluster.strictSignals.length > 0) {
    strictSignalHits = blobIncludesAny(blob, ctx.cluster.strictSignals);

    // citizenship-golden-visa için ek koruma:
    //   * "Vize Hizmeti" tek başına asla yeterli değil → zaten strictSignals içinde değil
    //   * Sadece "yunanistan" (ülke) tek başına yeterli değil → blob'da ülke geçse bile
    //     strict signal aranır.
    if (strictSignalHits.length === 0) return null;
  }

  // 2) SCORE
  const breakdown: string[] = [];
  let score = 0;

  if (strictSignalHits.length > 0) {
    score += 0.45;
    breakdown.push(`niyet sinyali (${strictSignalHits[0]})`);
  }

  // Ülke eşleşmesi
  const countryActual = toStringArray(firm.countries).map(normTr);
  const countryExact = ctx.countries.filter((c) =>
    countryActual.some((a) => a === normTr(c) || a.includes(normTr(c)) || normTr(c).includes(a))
  );
  if (countryExact.length > 0) {
    score += 0.18;
    breakdown.push("ülke eşleşmesi");
  }

  // Bölge eşleşmesi
  const regionActual = toStringArray(firm.visa_regions).map(normTr);
  const regionExact = ctx.regions.filter((r) =>
    regionActual.some((a) => a === normTr(r) || a.includes(normTr(r)))
  );
  if (regionExact.length > 0 || (
    ctx.countries.length > 0 &&
    regionActual.some((a) => ctx.countries.some((c) => a.includes(normTr(c))))
  )) {
    score += 0.12;
    if (!breakdown.includes("ülke eşleşmesi")) breakdown.push("bölge eşleşmesi");
  }

  // Hizmet / uzmanlık (services + main_services + sub_services)
  const serviceFields: string[][] = [
    toStringArray(firm.services).map(normTr),
    toStringArray(firm.main_services).map(normTr),
    toStringArray(firm.sub_services).map(normTr),
  ];

  const wantedServices = ctx.allServiceTerms.map(normTr).filter(Boolean);
  const serviceExact = wantedServices.some((w) =>
    serviceFields.some((arr) => arr.some((a) => a === w))
  );
  const servicePartial = !serviceExact && wantedServices.some((w) =>
    serviceFields.some((arr) => arr.some((a) => a.includes(w) || w.includes(a)))
  );
  if (serviceExact) {
    score += 0.25;
    breakdown.push("hizmet eşleşmesi");
  } else if (servicePartial) {
    score += 0.12;
    breakdown.push("hizmet benzerliği");
  }

  // Tag eşleşmesi
  const tagsActual = toStringArray(firm.tags).map(normTr);
  const wantedTags = ctx.tagTerms.map(normTr).filter(Boolean);
  const tagExact = wantedTags.some((w) => tagsActual.some((a) => a === w));
  const tagPartial = !tagExact && wantedTags.some((w) =>
    tagsActual.some((a) => a.includes(w) || w.includes(a))
  );
  if (tagExact) {
    score += 0.18;
    breakdown.push("etiket eşleşmesi");
  } else if (tagPartial) {
    score += 0.09;
  }

  // Boolean uzmanlık alanları (cluster bağlamında)
  const booleanScore = booleanExpertiseForCluster(firm, ctx);
  if (booleanScore > 0) {
    score += 0.15 * booleanScore;
    breakdown.push("uzmanlık alanı");
  }

  // Corporateness (kurumsallık)
  const corp = Number(firm.corporateness_score);
  if (Number.isFinite(corp) && corp > 0) {
    score += Math.min(corp / 100, 1) * 0.10;
  }

  // Hype score
  const hype = Number(firm.hype_score);
  if (Number.isFinite(hype) && hype > 0) {
    score += Math.min(hype / 1000, 1) * 0.03;
  }

  // GOLDEN VISA özel kuralı: "Vize Hizmeti" tek başına skor üretmesin.
  // Eğer cluster citizenship-golden-visa ise ve strict sinyal YOKSA evaluate'a girmedi zaten.
  // Ek olarak "Yunanistan" + sadece "Vize Hizmeti" durumunu ele almak için:
  if (
    ctx.cluster.key === "citizenship-golden-visa" &&
    strictSignalHits.length === 0
  ) {
    return null;
  }

  score = Math.max(0, Math.min(1, score));
  if (score < MIN_MATCH_SCORE) return null;

  const reason = breakdown.length > 0
    ? `Sistem verisinde ${breakdown.slice(0, 3).join(", ")} bulundu.`
    : "Sistem verisinde genel uygunluk bulundu.";

  return {
    firm,
    score: Number(score.toFixed(4)),
    reason,
  };
}

/** Cluster bağlamında boolean uzmanlık alanlarını puanlar (0..1). */
function booleanExpertiseForCluster(firm: any, ctx: EvalContext): number {
  const k = ctx.cluster.key;
  let hits = 0;
  let possible = 0;

  const checkPair = (flag: unknown, ok: boolean) => {
    if (ok) {
      possible += 1;
      if (flag === true) hits += 1;
    }
  };

  if (k === "visa-services" || k === "tourism-travel") {
    checkPair(firm.schengen_expert, /schengen|avrupa/.test(ctx.promptN));
    checkPair(firm.usa_visa_expert, /amerika|abd|usa/.test(ctx.promptN));
    checkPair(firm.tourist_visa_support, /turist|tatil|tur|seyahat/.test(ctx.promptN));
    checkPair(firm.business_visa_support, /ticari|iş|business/.test(ctx.promptN));
  }

  if (k === "study-abroad") {
    checkPair(firm.student_visa_support, true);
  }

  if (k === "international-career" || k === "migration-residence") {
    checkPair(firm.work_visa_support, true);
    checkPair(firm.family_reunion_support, /aile|birle|reunification/.test(ctx.promptN));
  }

  if (k === "legal-official") {
    checkPair(firm.appeal_support, true);
  }

  if (possible === 0) return 0;
  return hits / possible;
}

/** Prompt içinden tanınmış ülke/şehir adlarını yakalar. */
function extractCountrySignals(prompt: string, cluster: ClusterDefinition): string[] {
  const promptN = normTr(prompt);
  const out: string[] = [];
  for (const c of cluster.recommendedCountries) {
    const cN = normTr(c);
    if (!cN) continue;
    if (promptN.includes(cN)) out.push(c);
  }
  // Genel ülke isimleri (kısa liste — promptta varsa countries'e iliştir)
  const COMMON = [
    "Almanya", "Fransa", "İtalya", "Hollanda", "Belçika", "Avusturya",
    "Yunanistan", "Portekiz", "İspanya", "Malta", "Karadağ", "İngiltere",
    "Kanada", "ABD", "Amerika", "Avustralya", "Polonya", "İrlanda",
    "Dubai", "BAE", "Katar", "Suudi Arabistan", "Türkiye",
  ];
  for (const c of COMMON) {
    if (promptN.includes(normTr(c))) out.push(c);
  }
  return uniqueStrings(out);
}

/**
 * Sıralama:
 *   1) match_score (özel relevans) desc
 *   2) corporateness_score desc
 *   3) hype_score desc
 *   4) name asc
 */
function compareEvaluatedFirms(a: EvaluatedFirm, b: EvaluatedFirm): number {
  let d = b.score - a.score;
  if (Math.abs(d) > 0.0001) return d > 0 ? 1 : -1;

  const corpA = Number(a.firm.corporateness_score) || 0;
  const corpB = Number(b.firm.corporateness_score) || 0;
  d = corpB - corpA;
  if (d !== 0) return d;

  const hypeA = Number(a.firm.hype_score) || 0;
  const hypeB = Number(b.firm.hype_score) || 0;
  d = hypeB - hypeA;
  if (d !== 0) return d;

  const nameA = String(a.firm.name ?? "").toLocaleLowerCase("tr-TR");
  const nameB = String(b.firm.name ?? "").toLocaleLowerCase("tr-TR");
  return nameA.localeCompare(nameB, "tr");
}

function safeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function safeNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isObject(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Bir domain'in "resmi devlet / kurumsal otorite" olup olmadığını söyler.
 * Liste; dünya çapında bilinen gov TLD'leri, AB / Schengen / BM kurumları ve
 * önde gelen göç otoritelerinin (BAMF, UDI, IRCC, USCIS, UKVI, gov.tr ailesi)
 * domain'lerini kapsayacak şekilde geniş tutulmuştur.
 *
 * Burada VFS/iDATA/TLScontact gibi başvuru merkezleri "official" sayılmaz —
 * `isOfficialApplicationCenter` ile ayrı bir tier'da değerlendirilirler.
 */
function isOfficialDomain(domain: string | null): boolean {
  if (!domain) return false;
  const d = domain.toLowerCase();

  // 1) Generic government / academic TLD pattern'leri (suffix-aware).
  const govSuffixes = [
    // ABD, Türkiye ve klasik gov uzantıları
    ".gov", ".gov.tr", ".gov.uk", ".gov.au", ".gov.in", ".gov.sg", ".gov.za",
    ".gov.br", ".gov.mx", ".gov.ar", ".gov.it", ".gov.pl", ".gov.ie",
    ".gov.gr", ".gov.cn", ".gov.hk", ".gov.tw", ".gov.my", ".gov.ph",
    ".gov.kr", ".gov.eg", ".gov.sa", ".gov.qa", ".gov.kw", ".gov.bh",
    ".gov.om", ".gov.az", ".gov.ge", ".gov.al", ".gov.ba", ".gov.mk",
    ".gov.rs", ".gov.me", ".gov.si", ".gov.hr", ".gov.lt", ".gov.lv",
    ".gov.ee", ".gov.ru", ".gov.ua", ".gov.by", ".gov.kz", ".gov.uz",
    // Avrupa ve diğer ulusal varyantlar
    ".gouv.fr", ".gob.es", ".gob.mx", ".gob.ar", ".gob.cl",
    ".bund.de", ".admin.ch", ".gv.at", ".belgium.be", ".overheid.nl",
    ".regeringen.se", ".regeringen.dk", ".regjeringen.no", ".valtioneuvosto.fi",
    ".gc.ca", ".canada.ca", ".alberta.ca", ".ontario.ca",
    // AB / uluslararası kurumlar
    ".europa.eu", ".consilium.europa.eu", ".schengenvisainfo.europa.eu",
    ".un.org", ".unhcr.org", ".iom.int", ".who.int", ".oecd.org",
    ".coe.int", ".nato.int", ".worldbank.org",
    // Akademik (resmi üniversite / araştırma)
    ".edu", ".ac.uk", ".ac.jp", ".ac.kr", ".edu.au", ".edu.sg",
    ".edu.tr", ".ac.tr",
  ];
  if (govSuffixes.some((suffix) => d.endsWith(suffix) || d.includes(suffix + "/"))) {
    return true;
  }

  // 2) Konsolosluk / büyükelçilik / dışişleri benzeri net resmi domain anahtarları.
  const officialKeywords = [
    "embassy", "consulate", "konsolos", "buyukelcilik", "buyukelci",
    "mfa.", "auswaertiges-amt", "auswartiges-amt",
    "bamf.de", "udi.no", "migrationsverket.se", "ircc", "uscis", "ukvi",
    "homeoffice.gov.uk", "dhs.gov", "state.gov", "schengenvisainfo",
    "etiasvisa.com",
  ];
  if (officialKeywords.some((kw) => d.includes(kw))) return true;

  return false;
}

/**
 * Resmi otoriteler tarafından yetkilendirilmiş başvuru / vize merkezleri.
 * Devlet sayfası kadar otoriter olmasalar da "yasal kaynak" sayılırlar.
 */
function isOfficialApplicationCenter(domain: string | null): boolean {
  if (!domain) return false;
  const d = domain.toLowerCase();
  return [
    "vfsglobal.com", "vfsglobal.",
    "idata.com.tr",
    "tlscontact.com",
    "ustraveldocs.com",
    "blsinternational.com", "blsspainvisa", "blsindia",
    "capago.eu",
    "visametric.com",
    "gerryvisa.com",
    "almaviva-visa", "almavivavisaservices",
  ].some((pattern) => d.includes(pattern));
}

/**
 * AI cevabında ASLA kullanılmaması gereken "kişisel görüş / forum / blog /
 * sözlük" türü kaynaklar. Worker bunları post-process aşamasında atar; bu
 * sayede gpt-4.1-mini gibi `filters.blocked_domains` parametresini
 * desteklemeyen modellerde de güvenli sınırı koruyabiliriz.
 */
function isUntrustedDomain(domain: string | null): boolean {
  if (!domain) return false;
  const d = domain.toLowerCase();
  return [
    "reddit.com", "quora.com", "wikipedia.org", "wikitravel.org",
    "tripadvisor.", "ekşisözlük", "eksisozluk.com", "uludagsozluk.com",
    "medium.com", "blogspot.", "wordpress.com", "wix.com", "tumblr.com",
    "facebook.com", "instagram.com", "twitter.com", "x.com", "tiktok.com",
    "youtube.com", "youtu.be",
    "donanimhaber.com/forum", "shiftdelete.net/forum",
    "yandex.", "baidu.",
  ].some((pattern) => d.includes(pattern));
}

function classifySource(domain: string | null, isOfficial: boolean): string {
  if (!domain) return "web";
  const d = domain.toLowerCase();

  if (isOfficial && (d.includes("embassy") || d.includes("consulate") || d.includes("konsolos"))) {
    return "embassy";
  }
  if (isOfficial && (d.includes(".edu") || d.includes(".ac."))) return "academic";
  if (isOfficial) return "government";

  if (isOfficialApplicationCenter(d)) return "application_center";

  return "web";
}
