/**
 * Mobil yükleniyor göstergesi: zaman/progress eğrileri ve dış tıklama/anchor yardımcıları.
 * UI katmanı — router veya veri akışı içermez.
 */

/**
 * Dar pencere (klasik mobil layout). Tailwind `lg` (min 1024) altı.
 */
export const MPM_MAX_WIDTH = 1023;

export const MPM_VIEWPORT_MQ = `(max-width: ${MPM_MAX_WIDTH}px)`;

/**
 * Gerçek dokunmatik cihazlar: büyük tablet / yatay telefon (görünüm >1023) da buraya girer.
 * Masaüstü fare: genelde `hover: hover` + `pointer: fine` → eşleşmez.
 */
export const MPM_TOUCH_PRIMARY_MQ = "(hover: none) and (pointer: coarse)";

const MPM_TOUCH_FALLBACK_WIDTH_MQ = "(max-width: 1280px)";

/**
 * Tüm telefon / tablet deneyiminde loader: dar görünüm VEYA dokunmatik-birincil
 * (veya eski tarayıcı yedeği: maxTouchPoints + makul genişlik).
 */
export function matchesMobileLoaderTarget(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia(MPM_VIEWPORT_MQ).matches) return true;
    if (window.matchMedia(MPM_TOUCH_PRIMARY_MQ).matches) return true;
  } catch {
    // matchMedia yok
  }
  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) {
    try {
      if (window.matchMedia(MPM_TOUCH_FALLBACK_WIDTH_MQ).matches) return true;
    } catch {
      // Eski WebKit: genişlik okunamıyorsa yedekleme yapmıyoruz
    }
  }
  return false;
}

/** Loader en az bu kadar görünsün (hızlı işlemlerde “flash” olmasın). */
export const MPM_MIN_DISPLAY_MS = 250;

/** Ağ veya sinyal kaybında takılı kalmayı engelleyen tavan. */
export const MPM_MAX_TIMEOUT_MS = 8000;

/** Başta %0 → hedef “burst” hızı (ms). */
export const MPM_BURST_MS = 200;

const ASYMPTOTE_SCALE_MS = 2200;

/**
 * 0…95: gerçek süre duyarlı, tamamlanma sinyaline kadar 95’te asimptot.
 * burstTarget: oturum başında bir kez üretilen %15–35 hedefi.
 */
export function computeIndeterminateProgress(
  elapsedMs: number,
  burstTarget: number,
  burstStartAt = MPM_BURST_MS
): number {
  if (elapsedMs <= 0) return 0;
  if (elapsedMs < burstStartAt) {
    return (elapsedMs / burstStartAt) * burstTarget;
  }
  const t = (elapsedMs - burstStartAt) / ASYMPTOTE_SCALE_MS;
  const fromBurst = 95 - burstTarget;
  const v = burstTarget + fromBurst * (1 - Math.exp(-t));
  return Math.min(95, v);
}

/** Aynı pathname + search = aynı “sayfa” (hash ayrı). */
export function isSameDocumentLocation(a: URL, b: URL): boolean {
  return a.pathname === b.pathname && a.search === b.search;
}

/**
 * Sadece sol tık, aynı origin, iç navigasyon, modifier yok, download/mailto/tel yok.
 * `e`, olay hedefi anchor üzerinde olmalı (yukarı yürütüp closest ile elde edilir).
 */
export function shouldHandleInAppAnchorClick(
  anchor: HTMLAnchorElement,
  e: MouseEvent,
  current: URL
): boolean {
  if (e.defaultPrevented) return false;
  if (e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (anchor.hasAttribute("download")) return false;
  const target = anchor.getAttribute("target");
  if (target && target.trim() !== "" && target !== "_self") {
    if (target.toLowerCase() === "_blank") return false;
  }
  const raw = anchor.getAttribute("href");
  if (raw == null) return false;
  const t = raw.trim();
  if (!t || t.startsWith("mailto:") || t.startsWith("tel:") || t.startsWith("javascript:")) {
    return false;
  }
  let dest: URL;
  try {
    dest = new URL(anchor.href, current);
  } catch {
    return false;
  }
  if (dest.origin !== current.origin) return false;
  if (isSameDocumentLocation(dest, current)) return false;
  if (dest.pathname.startsWith("/api/")) return false;
  return true;
}

/**
 * Tıklama <a> içi metin/svg vb. yaprak düğümlerinde de anchor’u bulur (Text node’da closest yok).
 */
export function getAnchorElementFromEventTarget(
  t: EventTarget | null
): HTMLAnchorElement | null {
  if (t == null) return null;
  const el =
    t instanceof Element
      ? t
      : (t as Node & { parentElement: Element | null }).parentElement;
  if (!el) return null;
  const a = el.closest("a[href]");
  return a instanceof HTMLAnchorElement ? a : null;
}

