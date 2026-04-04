import type { BlogCtaButton } from "@/lib/blog/cta-buttons";

export type FirmFeedPostInitialDraft = {
  id: string;
  body: string;
  imageUrls: string[];
  ctaButtons: BlogCtaButton[];
  tags: string[];
};
