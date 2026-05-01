/**
 * Firma blog gövdesi (TipTap HTML): otomatik / yapıştırma kaynaklı ayırıcıları sınırlamak.
 *
 * Kaynak: TipTap StarterKit HorizontalRule, `---` / `___` / `***` input rule ile istemsiz <hr>.
 * İzin: yalnızca toolbar ile eklenen <hr data-vf-divider="true"> (bkz. FirmBlogHorizontalRule).
 */

const HR_ALLOWED_ATTR = /data-vf-divider\s*=\s*(["'])true\1/i;

/** Sunucu + istemci: yetkisiz <hr> kaldır (işaretli ayırıcılar kalır). */
export function sanitizeFirmBlogBodyRichForStorage(html: string): string {
  if (!html) return html;
  return html.replace(/<hr\b[^>]*>/gi, (tag) => (HR_ALLOWED_ATTR.test(tag) ? tag : ""));
}

/**
 * Yapıştırılan HTML: <hr>, Word ayırıcıları ve tipik “çizgi” inline border’ları temizle.
 * Sadece editör (client) içinde çağrılır.
 */
export function sanitizeFirmBlogPastedHtml(html: string): string {
  if (!html) return html;
  const working = html.replace(/<\s*hr\b[^>]*>/gi, "");

  if (typeof document === "undefined") {
    return working;
  }

  try {
    const doc = new DOMParser().parseFromString(`<div id="vf-paste-root">${working}</div>`, "text/html");
    const root = doc.getElementById("vf-paste-root");
    if (!root) return working;

    root.querySelectorAll("hr").forEach((n) => n.remove());
    root.querySelectorAll(".MsoHorizontalLine, .msohorizontalrule").forEach((n) => n.remove());

    root.querySelectorAll("p[style], div[style], span[style]").forEach((el) => {
      const st = el.getAttribute("style");
      if (!st) return;
      if (
        !/(border-top|border-bottom)\s*:\s*[^;]*(solid|dotted|double|inset|groove|ridge)/i.test(st)
      ) {
        return;
      }
      const cleaned = st
        .split(";")
        .map((s) => s.trim())
        .filter((rule) => {
          if (!rule) return false;
          const low = rule.toLowerCase();
          if (low.startsWith("border-top:") || low.startsWith("border-bottom:")) return false;
          return true;
        })
        .join("; ");
      if (cleaned) el.setAttribute("style", cleaned);
      else el.removeAttribute("style");
    });

    return root.innerHTML;
  } catch {
    return working;
  }
}
