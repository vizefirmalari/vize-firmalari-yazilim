/** `<input type="datetime-local" />` değeri: tarayıcı yerel duvar saati. */
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
