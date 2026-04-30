export function formatVisaMoney(n: unknown): string {
  if (n === null || n === undefined || n === "") return "—";
  const num = typeof n === "number" ? n : Number.parseFloat(String(n));
  if (!Number.isFinite(num)) return "—";
  return `${num.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ₺`;
}

export function formatVisaDisplayDate(raw: string | null | undefined): string {
  if (!raw) return "—";
  const d = new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
