/**
 * Firma blog detay: orta reklam için gövde HTML’ini `</p>` sınırlarında ikiye böler.
 * Panel önizlemesi ile yayın sayfası aynı mantığı paylaşır.
 */
export function splitBodyForMiddleAd(html: string): { first: string; second: string } {
  const parts = html.split("</p>");
  if (parts.length <= 3) return { first: html, second: "" };
  const mid = Math.floor(parts.length / 2);
  const first = `${parts.slice(0, mid).join("</p>")}</p>`;
  const second = `${parts.slice(mid).join("</p>")}`;
  return { first, second };
}
