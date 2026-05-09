"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import { AiFirmMatchesStrip } from "@/components/ai-assistant/ai-firm-matches-strip";
import { AiSourcesList } from "@/components/ai-assistant/ai-sources-list";
import type {
  AiAssistantFirmMatchDTO,
  AiAssistantMessageDTO,
  AiAssistantPollResponse,
  AiAssistantRequestDTO,
  AiAssistantSourceDTO,
  AiAssistantStartResponse,
} from "@/lib/ai-assistant/types";

const SUGGESTION_CHIPS = [
  "Schengen vizesi",
  "Almanya çalışma vizesi",
  "İngiltere öğrenci vizesi",
  "Yunanistan Golden Visa",
] as const;

const TRUST_CHIPS = [
  "Gerçek Zamanlı",
  "Resmi Kaynaklar",
  "Onaylı Firmalar",
] as const;

const PROMPT_PLACEHOLDER = "Herhangi bir şey sor";

const POLL_INTERVAL_MS = 2000;
/** Aktif istek 90sn içinde tamamlanmazsa polling durur (UI hata mesajı verir). */
const POLL_TIMEOUT_MS = 90_000;

type LoadingPhase =
  | "Araştırılıyor…"
  | "Resmi kaynaklar kontrol ediliyor…"
  | "İlgili firmalar eşleştiriliyor…";

const LOADING_PHASES: LoadingPhase[] = [
  "Araştırılıyor…",
  "Resmi kaynaklar kontrol ediliyor…",
  "İlgili firmalar eşleştiriliyor…",
];

/**
 * Mevcut request status'ünü kullanıcı için sade tek bir cümleye çevirir.
 * UI tarafı sadece bu metni gösterir; alt akış değiştiğinde tek satır günceller.
 */
function getLoadingPhase(elapsedMs: number): LoadingPhase {
  /** İlk 4sn ilk metin, sonra 4'er sn ile döner. */
  const idx = Math.min(LOADING_PHASES.length - 1, Math.floor(elapsedMs / 4000));
  return LOADING_PHASES[idx]!;
}

type ChatMessage = {
  id: string;
  role: AiAssistantMessageDTO["role"];
  content: string;
  status: AiAssistantMessageDTO["status"];
  request_id: string | null;
  created_at: string;
};

function dedupeMessages(existing: ChatMessage[], next: ChatMessage[]): ChatMessage[] {
  const byId = new Map<string, ChatMessage>();
  for (const m of existing) byId.set(m.id, m);
  for (const m of next) byId.set(m.id, m);
  return Array.from(byId.values()).sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );
}

export function MobileAiAssistant() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [request, setRequest] = useState<AiAssistantRequestDTO | null>(null);
  const [sources, setSources] = useState<AiAssistantSourceDTO[]>([]);
  const [firmMatches, setFirmMatches] = useState<AiAssistantFirmMatchDTO[]>([]);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const requestStartedAtRef = useRef<number | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasStarted = messages.length > 0 || submitting;

  /**
   * Sayfa kendi doğal scroll'unu kullanıyor (SiteHeader sticky üstte, input fixed altta).
   * Yeni mesaj / faz değişince pencereyi en alta kaydır — chat tarzı UX.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [messages.length, loadingPhase, sources.length, firmMatches.length]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    requestStartedAtRef.current = null;
    setLoadingPhase(null);
  }, []);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  const pollOnce = useCallback(
    async (currentSession: string, currentRequest: string) => {
      try {
        const params = new URLSearchParams({
          session_id: currentSession,
          request_id: currentRequest,
        });
        const res = await fetch(
          `/api/ai-assistant/poll?${params.toString()}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const payload = (await res.json()) as
          | AiAssistantPollResponse
          | { ok: false; error: string };
        if (!payload.ok) return;

        const { messages: newMessages, request: req, sources: srcs, firm_matches } = payload;

        setRequest(req);
        setSources(srcs);
        setFirmMatches(firm_matches);

        if (newMessages.length > 0) {
          setMessages((prev) =>
            dedupeMessages(
              prev,
              newMessages.map((m) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                status: m.status,
                request_id: m.request_id,
                created_at: m.created_at,
              }))
            )
          );
        }

        if (req && (req.status === "completed" || req.status === "failed" || req.status === "cancelled")) {
          stopPolling();
          if (req.status === "failed") {
            setErrorMsg(
              req.error?.trim() ||
                "Araştırma sırasında bir sorun oluştu. Lütfen tekrar deneyin."
            );
          }
        }

        const startedAt = requestStartedAtRef.current;
        if (startedAt && Date.now() - startedAt > POLL_TIMEOUT_MS) {
          stopPolling();
          setErrorMsg(
            "Araştırma beklenenden uzun sürdü. Sonuç hazır olduğunda bu sayfayı yenileyebilirsiniz."
          );
        }

        if (startedAt) {
          setLoadingPhase(getLoadingPhase(Date.now() - startedAt));
        }
      } catch {
        /** Tek poll hatası akışı kesmesin; bir sonraki interval tekrar dener. */
      }
    },
    [stopPolling]
  );

  const startPolling = useCallback(
    (currentSession: string, currentRequest: string) => {
      stopPolling();
      requestStartedAtRef.current = Date.now();
      setLoadingPhase(LOADING_PHASES[0]!);
      void pollOnce(currentSession, currentRequest);
      pollTimerRef.current = setInterval(() => {
        void pollOnce(currentSession, currentRequest);
      }, POLL_INTERVAL_MS);
    },
    [pollOnce, stopPolling]
  );

  const submitPrompt = useCallback(
    async (rawPrompt: string) => {
      const prompt = rawPrompt.trim();
      if (prompt.length < 2 || submitting) return;

      setErrorMsg(null);
      setSubmitting(true);

      const optimisticId = `optimistic-${Date.now()}`;
      const optimistic: ChatMessage = {
        id: optimisticId,
        role: "user",
        content: prompt,
        status: "completed",
        request_id: null,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => dedupeMessages(prev, [optimistic]));
      setDraft("");

      try {
        const res = await fetch("/api/ai-assistant/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            session_id: sessionId ?? undefined,
          }),
        });

        const payload = (await res.json()) as
          | AiAssistantStartResponse
          | { ok: false; error: string };

        if (!res.ok || !payload.ok) {
          throw new Error(
            ("error" in payload && payload.error) || "REQUEST_FAILED"
          );
        }

        setSessionId(payload.session_id);
        setActiveRequestId(payload.request_id);
        /** Optimistic mesajı gerçek ID ile değiştir (poll sırada kaybolmasın). */
        setMessages((prev) =>
          prev.map((m) =>
            m.id === optimisticId
              ? {
                  ...m,
                  id: payload.user_message_id,
                  request_id: payload.request_id,
                }
              : m
          )
        );
        startPolling(payload.session_id, payload.request_id);
      } catch (err) {
        console.error("[mobile-ai-assistant] submit failed", err);
        setErrorMsg(
          "Mesaj gönderilemedi. Lütfen birkaç saniye sonra tekrar deneyin."
        );
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
        setDraft(prompt);
      } finally {
        setSubmitting(false);
      }
    },
    [sessionId, startPolling, submitting]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void submitPrompt(draft);
    },
    [draft, submitPrompt]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void submitPrompt(draft);
      }
    },
    [draft, submitPrompt]
  );

  const renderedMessages = useMemo(() => messages, [messages]);

  /** İlgili request_id için kaynaklar/firma eşleşmeleri yalnız son AI yanıtı altında. */
  const lastAssistantMessage = useMemo(() => {
    for (let i = renderedMessages.length - 1; i >= 0; i -= 1) {
      const m = renderedMessages[i]!;
      if (m.role === "assistant") return m;
    }
    return null;
  }, [renderedMessages]);

  const showSourcesBlock = Boolean(
    lastAssistantMessage &&
      activeRequestId &&
      lastAssistantMessage.request_id === activeRequestId &&
      sources.length > 0
  );

  const showFirmMatchesBlock = Boolean(
    lastAssistantMessage &&
      activeRequestId &&
      lastAssistantMessage.request_id === activeRequestId &&
      (request?.status === "completed" || firmMatches.length > 0)
  );

  return (
    <div className="bg-white">
      {/**
       * SiteHeader sticky üstte (page.tsx'te), input fixed altta.
       * Sayfa kendi scroll'unu kullandığı için burada overflow konteyneri yok.
       * Alt padding: mobil = input (~64px) + bottom nav (64px) + safe-area; desktop = input + güvenlik.
       */}
      <div
        className="mx-auto w-full max-w-[720px] px-4 pb-[calc(env(safe-area-inset-bottom)+9.5rem)] pt-6 sm:px-6 sm:pb-32 sm:pt-10"
      >
        {!hasStarted ? (
          <WelcomeHero
            onPick={(text) => {
              setDraft(text);
              textareaRef.current?.focus();
            }}
          />
        ) : (
          <div className="flex w-full flex-col gap-4">
            {renderedMessages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}

            {loadingPhase ? (
              <div className="self-start rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 text-xs text-[#6b7280]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#0B3C5D]" />
                  {loadingPhase}
                </span>
              </div>
            ) : null}

            {errorMsg ? (
              <div className="self-start rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-xs text-[#b91c1c]">
                {errorMsg}
              </div>
            ) : null}

            {lastAssistantMessage && (showSourcesBlock || showFirmMatchesBlock) ? (
              <div className="-mt-1 flex flex-col gap-2">
                {showSourcesBlock ? <AiSourcesList sources={sources} /> : null}
                {showFirmMatchesBlock ? (
                  <AiFirmMatchesStrip matches={firmMatches} />
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-16 z-80 border-t border-[#eee] bg-white pb-[env(safe-area-inset-bottom)] md:bottom-0">
        <form
          onSubmit={onSubmit}
          className="mx-auto flex w-full max-w-[720px] items-end gap-2 px-3 py-2.5 sm:px-4 sm:py-3"
        >
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={PROMPT_PLACEHOLDER}
              rows={1}
              maxLength={2000}
              aria-label="Akıllı Asistan'a sorunuzu yazın"
              className="block w-full resize-none rounded-2xl border border-[#0B3C5D]/15 bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-[0_1px_2px_rgba(11,60,93,0.05)] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0B3C5D]/45 focus:shadow-[0_2px_10px_rgba(11,60,93,0.08)]"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || draft.trim().length < 2}
            aria-label="Soruyu gönder"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_14px_rgba(11,60,93,0.18)] transition hover:bg-primary/90 disabled:bg-[#cbd5e1] disabled:text-white/80 disabled:shadow-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

function WelcomeHero({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center pt-4 text-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3C5D]/8 text-2xl text-[#0B3C5D]">
        <span aria-hidden>✦</span>
      </div>

      <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-[#0f172a] sm:text-2xl">
        Akıllı Asistan
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#475569] sm:text-[15px]">
        Vize, göç, eğitim ve yurtdışı süreçleri hakkında sorular sorun.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {TRUST_CHIPS.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 rounded-full border border-[#0B3C5D]/12 bg-white px-2.5 py-1 text-[11px] font-medium text-[#475569]"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-7 w-full">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
          Örnek sorular
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUGGESTION_CHIPS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="inline-flex items-center rounded-full border border-[#0B3C5D]/12 bg-white px-3 py-1.5 text-xs font-medium text-[#0f172a] transition hover:border-[#0B3C5D]/30 hover:bg-[#F7F9FB]"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-[0_2px_10px_rgba(11,60,93,0.14)]">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === "system") {
    return (
      <div className="flex justify-center">
        <div className="rounded-full bg-[#F7F9FB] px-3 py-1 text-[11px] font-medium text-[#64748b]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-[#0B3C5D]/10 bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-[#111827] shadow-[0_2px_14px_rgba(11,60,93,0.06)]">
        {message.content}
      </div>
    </div>
  );
}
