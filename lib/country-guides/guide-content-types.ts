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
