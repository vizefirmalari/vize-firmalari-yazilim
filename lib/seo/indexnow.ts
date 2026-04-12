import { getSiteUrl } from "@/lib/env";

const INDEXNOW_SUBMIT_URL = "https://api.indexnow.org/indexnow";
const KEY_RE = /^[0-9A-Za-z-]{8,128}$/;

/** IndexNow anahtarı (env) — küçük harfle normalize; dosya içeriği ve JSON `key` ile aynı. */
export function normalizeIndexNowKeyFromEnv(): string | undefined {
  const raw = process.env.INDEXNOW_KEY?.trim();
  if (!raw) return undefined;
  const lower = raw.toLowerCase();
  if (!KEY_RE.test(lower)) return undefined;
  return lower;
}

/** `/xxxx.txt` yolundan anahtar parçası (küçük harf) veya eşleşme yoksa `null`. */
export function indexNowKeyFromTxtPath(pathname: string): string | null {
  const m = pathname.match(/^\/([0-9A-Za-z-]{8,128})\.txt$/i);
  return m ? m[1].toLowerCase() : null;
}

function siteHostVariants(): { primary: string; hosts: Set<string> } | null {
  const base = getSiteUrl().replace(/\/$/, "");
  let primary: string;
  try {
    primary = new URL(base).host.toLowerCase();
  } catch {
    return null;
  }
  const bare = primary.startsWith("www.") ? primary.slice(4) : primary;
  const hosts = new Set(
    [primary, bare, `www.${bare}`].map((h) => h.toLowerCase())
  );
  return { primary, hosts };
}

function urlHostAllowed(url: string, hosts: Set<string>): boolean {
  try {
    return hosts.has(new URL(url).host.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * IndexNow’a URL bildirimi (yapılandırma yoksa veya liste boşsa no-op).
 * Aynı gönderide en fazla 10.000 URL.
 */
export async function submitIndexNowUrls(absoluteUrls: string[]): Promise<void> {
  const key = normalizeIndexNowKeyFromEnv();
  if (!key || absoluteUrls.length === 0) return;

  const variants = siteHostVariants();
  if (!variants) return;

  const base = getSiteUrl().replace(/\/$/, "");
  const keyLocation = `${base}/${key}.txt`;
  const filtered = absoluteUrls
    .map((u) => u.trim())
    .filter((u) => u && urlHostAllowed(u, variants.hosts))
    .slice(0, 10_000);

  if (!filtered.length) return;

  const body = {
    host: variants.primary,
    key,
    keyLocation,
    urlList: filtered,
  };

  try {
    const res = await fetch(INDEXNOW_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok && process.env.NODE_ENV === "development") {
      const t = await res.text().catch(() => "");
      console.warn("[indexnow]", res.status, t.slice(0, 200));
    }
  } catch (e) {
    console.error("[indexnow]", e instanceof Error ? e.message : e);
  }
}
