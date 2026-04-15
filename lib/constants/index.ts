export {
  ALL_COUNTRIES,
  SERVICE_OPTIONS,
  TOP_COUNTRIES,
} from "./filters";

export {
  MAIN_SERVICE_CATEGORIES,
  SUB_SERVICE_CATALOG,
  mergePublicServiceFilterOptions,
} from "./firm-services-taxonomy";

export { ADMIN_PANEL_ACCOUNT_EMAIL, FIRM_PANEL_DEFAULT_EMAIL } from "./platform-emails";

export { isPublicFeedPath, PUBLIC_FEED_ROUTE } from "./public-routes";

import { ALL_COUNTRIES } from "./filters";

/** FirmsListing ve benzeri için tam ülke listesi */
export const DEFAULT_COUNTRIES = ALL_COUNTRIES;

/** Site başlığı logosu — doğrudan Storage CDN; `next/image` optimizer atlanır (Turbopack uyumu). */
export const SITE_HEADER_LOGO_URL =
  "https://rgkwwjtayaysvvywbibt.supabase.co/storage/v1/object/public/media/Web%20Uygulama%20Dosyalari/Vize%20firmalari%20seffaf%20logo%20guncel%20en%20son%204.png";

/** Tarayıcı favicon — Storage CDN (metadata `icons`). `?v=` önbellek kırılması için. */
export const SITE_FAVICON_URL =
  "https://rgkwwjtayaysvvywbibt.supabase.co/storage/v1/object/public/media/Web%20Uygulama%20Dosyalari/favicon.png?v=20260324b";
