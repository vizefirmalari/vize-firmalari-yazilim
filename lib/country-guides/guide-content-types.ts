export type GuideCalloutVariant = "info" | "warning";

export type GuideAccordionBlock = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: { variant: GuideCalloutVariant; text: string };
};

export type GuideSectionBlock = {
  id: string;
  tocLabel: string;
  h2: string;
  lead: string;
  accordions: GuideAccordionBlock[];
};

/** Ülke rehberi hero altı görsel şeridi (`public/country-guides/...`). */
export type CountryGuideSlide = {
  src: string;
  alt: string;
  caption: string;
};
