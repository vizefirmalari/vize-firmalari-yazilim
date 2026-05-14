/**
 * `media` bucket içindeki public object path'inden tam URL üretir.
 * Path başında `/` olmamalı.
 */
export function publicMediaObjectUrl(storagePath: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  const p = typeof storagePath === "string" ? storagePath.trim().replace(/^\/+/, "") : "";
  if (!base || !p) return null;
  return `${base}/storage/v1/object/public/media/${p}`;
}
