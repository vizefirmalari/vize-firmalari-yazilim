/**
 * Çalıştır: npx tsx scripts/verify-firm-blog-body-html.ts
 * Senaryo: otomatik hr temizliği + işaretli hr korunması
 */
import { sanitizeFirmBlogBodyRichForStorage } from "../lib/blog/firm-blog-body-html";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

const s1 = sanitizeFirmBlogBodyRichForStorage("<p>a</p><hr><p>b</p>");
assert(!/<hr/i.test(s1), "plain hr removed");
assert(s1.includes("a") && s1.includes("b"), "paragraphs kept");

const s2 = sanitizeFirmBlogBodyRichForStorage(
  '<p>a</p><hr data-vf-divider="true" class="vf-blog-divider"><p>b</p>'
);
assert(s2.includes('data-vf-divider="true"'), "marked hr kept");

const s3 = sanitizeFirmBlogBodyRichForStorage("<p>a</p><hr /><p>b</p>");
assert(!/<hr/i.test(s3), "self-closing hr removed");

console.log("verify-firm-blog-body-html: ok");
