/**
 * Site varsayılanı: Türkiye yerel saati (TRT, IANA `Europe/Istanbul`).
 * Sunucu TZ’sinden bağımsız tutarlı gösterim ve panel datetime-local için kullanın.
 */
export const TURKEY_TIMEZONE = "Europe/Istanbul" as const;

/** Liste / gelen kutusu satırı (gün + saat, kısa) */
export const DATE_TIME_OPTS_LIST_COMPACT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
};

export function formatInstantInTurkey(
  input: string | Date | number,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
): string {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("tr-TR", { ...options, timeZone: TURKEY_TIMEZONE });
}

/** `<input type="datetime-local">` (İstanbul duvar saati) ← UTC anı */
export function utcIsoToTurkeyDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso.trim());
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TURKEY_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  if (!year || !month || !day || hour === "" || minute === "") return "";
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/**
 * datetime-local değeri İstanbul takvim/saati olarak yorumlanır → UTC ISO.
 * TRT yıl boyu UTC+03:00 (Türkiye’de kalıcı yaz saati uygulaması yok).
 */
export function turkeyDatetimeLocalInputToUtcIso(localValue: string): string | null {
  const m = localValue.trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m;
  const withOffset = `${y}-${mo}-${d}T${h}:${mi}:00+03:00`;
  const dt = new Date(withOffset);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString();
}

export function formatNowTurkeyDatetimeLocalValue(): string {
  return utcIsoToTurkeyDatetimeLocalValue(new Date().toISOString());
}
