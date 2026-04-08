/**
 * Akış / blog için anlık zaman (epoch ms).
 * Postgres `timestamptz` ve Supabase genelde UTC ISO döner; `Z` yoksa bile UTC varsayılır
 * (sunucu TZ ile istemci TZ arasında `new Date(iso)` farkını önlemek için).
 */
export function parseInstantMs(raw: string | null | undefined): number {
  if (raw == null) return NaN;
  const s = String(raw).trim().replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:)/, "$1T$2");
  if (!s) return NaN;
  if (/[zZ]$|[+-]\d{2}:\d{2}$|[+-]\d{4}$/.test(s)) {
    return Date.parse(s);
  }
  // Tam ISO tarih-saat, bölge yok → ECMAScript bunu yerel saat sanır; timestamptz için UTC kabul et.
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(s)) {
    return Date.parse(`${s}Z`);
  }
  return Date.parse(s);
}

export function formatRelativeTimeAgoTr(iso: string, nowMs: number = Date.now()): string {
  const ts = parseInstantMs(iso);
  if (!Number.isFinite(ts)) return "—";
  const diff = Math.max(0, nowMs - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "şimdi";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  return `${day}g önce`;
}

/** Akış / kart: yayın anı Türkiye yerel saatine göre (SSR + istemci aynı). */
export function formatPublishedAtDisplayTr(iso: string): string {
  const ts = parseInstantMs(iso);
  if (!Number.isFinite(ts)) return "—";
  return new Date(ts).toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
