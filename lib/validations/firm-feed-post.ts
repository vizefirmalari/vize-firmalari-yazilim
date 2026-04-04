import { z } from "zod";

import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";

export const FIRM_FEED_POST_BODY_MAX = 4000;
export const FIRM_FEED_POST_TAG_MAX_LEN = 32;
export const FIRM_FEED_POST_MAX_TAGS = 5;
export const FIRM_FEED_POST_MAX_IMAGES = 10;
export const FIRM_FEED_POST_DAILY_PUBLISH_LIMIT = 10;
export const FIRM_FEED_POST_MAX_CTA_BUTTONS = 8;

export function normalizeFeedPostTags(input: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of input) {
    const n = t.trim().toLowerCase().slice(0, FIRM_FEED_POST_TAG_MAX_LEN);
    if (n.length === 0) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(n);
    if (out.length >= FIRM_FEED_POST_MAX_TAGS) break;
  }
  return out;
}

export function stripDangerousMarkup(s: string): string {
  return s.replace(/<\/script/gi, "").replace(/<script/gi, "");
}

const imageUrlSchema = z
  .string()
  .trim()
  .url("Geçersiz görsel adresi.")
  .refine((u) => {
    try {
      const x = new URL(u);
      return x.protocol === "http:" || x.protocol === "https:";
    } catch {
      return false;
    }
  }, "Yalnızca http veya https adresleri kabul edilir.");

const ctaButtonsSchema = z
  .unknown()
  .transform((raw) => normalizeBlogCtaButtons(raw))
  .superRefine((arr, ctx) => {
    if (arr.length > FIRM_FEED_POST_MAX_CTA_BUTTONS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `En fazla ${FIRM_FEED_POST_MAX_CTA_BUTTONS} yönlendirme butonu ekleyebilirsiniz.`,
      });
    }
  });

export const firmFeedPostDraftSchema = z.object({
  body: z
    .string()
    .max(FIRM_FEED_POST_BODY_MAX, `En fazla ${FIRM_FEED_POST_BODY_MAX} karakter.`)
    .transform((s) => stripDangerousMarkup(s)),
  imageUrls: z
    .array(imageUrlSchema)
    .max(FIRM_FEED_POST_MAX_IMAGES, `En fazla ${FIRM_FEED_POST_MAX_IMAGES} görsel.`),
  ctaButtons: ctaButtonsSchema,
  tags: z.array(z.string()).transform((arr) => normalizeFeedPostTags(arr)),
});

export const firmFeedPostPublishSchema = firmFeedPostDraftSchema.extend({
  body: z
    .string()
    .max(FIRM_FEED_POST_BODY_MAX, `En fazla ${FIRM_FEED_POST_BODY_MAX} karakter.`)
    .transform((s) => stripDangerousMarkup(s))
    .refine((s) => s.trim().length >= 1, "Yayınlamak için metin girin."),
});

export type FirmFeedPostDraftInput = z.infer<typeof firmFeedPostDraftSchema>;
export type FirmFeedPostPublishInput = z.infer<typeof firmFeedPostPublishSchema>;
