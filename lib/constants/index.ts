export {
  ALL_COUNTRIES,
  SERVICE_OPTIONS,
  TOP_COUNTRIES,
} from "./filters";

import { ALL_COUNTRIES } from "./filters";

/** FirmsListing ve benzeri için tam ülke listesi */
export const DEFAULT_COUNTRIES = ALL_COUNTRIES;

/** Site başlığı logosu — doğrudan Storage CDN; `next/image` optimizer atlanır (Turbopack uyumu). */
export const SITE_HEADER_LOGO_URL =
  "https://rgkwwjtayaysvvywbibt.supabase.co/storage/v1/object/public/media/Web%20Uygulama%20Dosyalari/Vize%20firmalari%20seffaf%20logo%20guncel%20en%20son%204.png";

/** Tarayıcı favicon — Storage CDN (metadata `icons`). */
export const SITE_FAVICON_URL =
  "https://rgkwwjtayaysvvywbibt.supabase.co/storage/v1/object/public/media/Web%20Uygulama%20Dosyalari/favicon.png";
