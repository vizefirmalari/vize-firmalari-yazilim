/**
 * Tarayıcı yerel saatine göre `datetime-local` (genel amaçlı).
 * Site genelinde Türkiye saati için `@/lib/datetime/turkey-time` kullanın.
 */
export function formatDateTimeLocalValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** UTC/offset ISO → datetime-local (kullanıcının yerel takvim/saat). */
export function isoToDateTimeLocalValue(iso: string | null | undefined): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso.trim());
  if (Number.isNaN(d.getTime())) return "";
  return formatDateTimeLocalValue(d);
}

/**
 * `<input type="datetime-local">` çıktısı (bölge bilgisi yok) → UTC ISO.
 * Tarayıcıda çağrılmalı; değer kullanıcının yerel duvar saati olarak yorumlanır.
 * Sunucuda (TZ genelde UTC) aynı string parse edilirse yayın zamanı kayar.
 */
export function datetimeLocalInputToUtcIso(localValue: string): string | null {
  const s = localValue.trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}
