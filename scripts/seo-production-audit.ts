/**
 * Üretim SEO denetimi — örnek URL’ler ve sitemap kapsayıcılığı.
 *
 * Çalıştır: npx tsx scripts/seo-production-audit.ts
 *
 * Varsayılan kök https://www.vizefirmalari.com — değiştirmek için:
 *   AUDIT_ORIGIN=https://staging.example.com npx tsx scripts/seo-production-audit.ts
 */
import fs from "node:fs";
import path from "node:path";

import { PUBLIC_SITE_CANONICAL_ORIGIN } from "../lib/site-origin";

function pickOrigin(): string {
  const raw = process.env.AUDIT_ORIGIN?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && !/localhost|127\.0\.0\.1/i.test(raw)) {
    return raw.replace(/\/$/, "");
  }
  return PUBLIC_SITE_CANONICAL_ORIGIN.replace(/\/$/, "");
}

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

function parseCanonical(html: string): string | null {
  const m =
    html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const v = m?.[1]?.trim();
  return v || null;
}

function parseRobotsMeta(html: string): string | null {
  const m = html.match(
    /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i
  );
  return m?.[1]?.trim().toLowerCase() ?? null;
}

async function fetchText(url: string): Promise<{ status: number; text: string }> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "vizefirmalari-seo-audit/1.0 (+https://www.vizefirmalari.com)",
    },
  });
  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  const origin = pickOrigin();

  console.log(`SEO audit origin: ${origin}\n`);

  const firmSlug = process.env.AUDIT_FIRM_SLUG || "cilek-vize";
  const blogFirmSlug = process.env.AUDIT_BLOG_FIRM_SLUG || "vize-firmalari";
  const blogPostSlug =
    process.env.AUDIT_BLOG_POST_SLUG || "cin-vize-basvurusu-nasil-yapilir";

  const firmUrl = `${origin}/firma/${firmSlug}`;
  const blogUrl = `${origin}/firma/${blogFirmSlug}/blog/${blogPostSlug}`;
  const expectedFirmCanonical = `${origin}/firma/${firmSlug}`;
  const expectedBlogCanonical = `${origin}/firma/${blogFirmSlug}/blog/${blogPostSlug}`;

  // 1–4 Firm profili
  const firmRes = await fetchText(firmUrl);
  assert(firmRes.status === 200, `1) ${firmUrl} beklenen 200, gelen ${firmRes.status}`);
  const firmCanon = parseCanonical(firmRes.text);
  assert(
    firmCanon === expectedFirmCanonical,
    `2) Firma canonical beklenen ${expectedFirmCanonical}, gelen ${firmCanon ?? "(yok)"}`
  );
  const firmRobots = parseRobotsMeta(firmRes.text);
  assert(
    !firmRobots || (firmRobots.includes("index") && !firmRobots.includes("noindex")),
    `3) Firma robots noindex veya eksik: ${firmRobots ?? "(meta yok — layout varsayılanı)"}`
  );

  const firmsMap = await fetchText(`${origin}/sitemaps/firms.xml`);
  assert(firmsMap.status === 200, `firms.xml 200 değil: ${firmsMap.status}`);
  assert(
    firmsMap.text.includes(`/firma/${firmSlug}`),
    `4) firms.xml içinde /firma/${firmSlug} yok`
  );

  // 5–8 Blog yazısı
  const blogRes = await fetchText(blogUrl);
  assert(blogRes.status === 200, `5) ${blogUrl} beklenen 200, gelen ${blogRes.status}`);
  const blogCanon = parseCanonical(blogRes.text);
  assert(
    blogCanon === expectedBlogCanonical,
    `6) Blog canonical beklenen ${expectedBlogCanonical}, gelen ${blogCanon ?? "(yok)"}`
  );
  const blogRobots = parseRobotsMeta(blogRes.text);
  assert(
    !blogRobots || (blogRobots.includes("index") && !blogRobots.includes("noindex")),
    `7) Blog robots noindex veya eksik: ${blogRobots ?? "(meta yok)"}`
  );

  const blogMap = await fetchText(`${origin}/sitemaps/blog.xml`);
  assert(blogMap.status === 200, `blog.xml 200 değil: ${blogMap.status}`);
  assert(
    blogMap.text.includes(`/firma/${blogFirmSlug}/blog/${blogPostSlug}`),
    `8) blog.xml içinde beklenen blog path yok`
  );

  // 9) Tek firmaya kısıtlı olmadığını sezgisel doğrula
  const firmSlugsFromBlogXml = new Set<string>();
  const locRe = /<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/gi;
  let lm: RegExpExecArray | null;
  while ((lm = locRe.exec(blogMap.text))) {
    const u = lm[1] ?? "";
    const m2 = u.match(/\/firma\/([^/]+)\/blog\//);
    if (m2?.[1]) firmSlugsFromBlogXml.add(m2[1]);
  }
  console.log(`9) blog.xml: ${firmSlugsFromBlogXml.size} farklı firma slug (path /firma/{slug}/blog/...)`);
  if (firmSlugsFromBlogXml.size <= 1) {
    console.warn(
      "9) VERİ uyarısı: blog.xml içinde beklenenden az firma slug’ı — canlı ortamda tüm yayın yazıcı firmalar dahil mi kontrol edin."
    );
  }

  // 10) generateStaticParams — firma alt blog route’unda olmaması gerekir
  const blogPagePath = path.join(
    process.cwd(),
    "app",
    "firma",
    "[slug]",
    "blog",
    "[postSlug]",
    "page.tsx"
  );
  const blogSource = fs.readFileSync(blogPagePath, "utf8");
  assert(
    !/\bgenerateStaticParams\b/.test(blogSource),
    "10) app/firma/[slug]/blog/[postSlug]/page.tsx içinde generateStaticParams bulunmamalı"
  );

  // 11) Blog metadata kodu — firma slug’ı firms tablosundan, yazı slug’ı DB kaydıyla
  assert(
    blogSource.includes("pathPostSlug") &&
      blogSource.includes("`${siteUrl}/firma/${resolvedSlug}/blog/${pathPostSlug}`") &&
      blogSource.includes("robots: { index: true, follow: true }"),
    "11) Blog metadata (canonical/pathPostSlug/robots) kaynak doğrulaması başarısız"
  );

  console.log("\nseo-production-audit: tüm kontroller başarılı");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
