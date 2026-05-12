import { LINE_KEYS } from "@/lib/scoring/corporateness/line-keys";

/** Admin `FirmForm` üst sekmeleri — `?tab=` ile açılır */
export type FirmAdminFormTabId = "identity" | "contact" | "services" | "seo" | "publish";

const ALL_LINE_KEYS = new Set<string>([
  ...Object.values(LINE_KEYS.legal),
  ...Object.values(LINE_KEYS.operations),
  ...Object.values(LINE_KEYS.digital),
  ...Object.values(LINE_KEYS.content),
  ...Object.values(LINE_KEYS.services),
]);

export function corporatenessLineKeyToAdminTab(lineKey: string): FirmAdminFormTabId {
  switch (lineKey) {
    case LINE_KEYS.content.descriptions:
    case LINE_KEYS.content.logo:
      return "identity";
    case LINE_KEYS.content.seoBundle:
      return "seo";
    case LINE_KEYS.services.countries:
    case LINE_KEYS.services.subServices:
    case LINE_KEYS.services.specialization:
      return "services";
    default:
      if (ALL_LINE_KEYS.has(lineKey)) return "contact";
      return "contact";
  }
}

export function corporatenessGapCompleteHref(args: {
  firmId: string;
  lineKey: string;
  isAdmin: boolean;
}): string {
  if (args.isAdmin) {
    const tab = corporatenessLineKeyToAdminTab(args.lineKey);
    return `/admin/firms/${args.firmId}/edit?tab=${encodeURIComponent(tab)}`;
  }
  return `/panel/${args.firmId}/yonetici-mesaj`;
}

export function isFirmAdminFormTabId(v: string | undefined): v is FirmAdminFormTabId {
  return (
    v === "identity" ||
    v === "contact" ||
    v === "services" ||
    v === "seo" ||
    v === "publish"
  );
}
