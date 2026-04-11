import type { ReactNode } from "react";

const MARK_CLASS =
  "rounded-[0.2em] bg-accent/30 px-0.5 font-inherit text-inherit underline decoration-transparent";

/**
 * Metinde arama ifadesinin ilk geçtiği yeri vurgular (sunum; düz metin).
 * `toLocaleLowerCase("tr")` ile konum bulunur; metin ile aynı indekslerde dilimlenir.
 */
export function highlightSearchMatch(text: string, queryRaw: string): ReactNode {
  const raw = text ?? "";
  const needle = queryRaw.trim();
  if (!needle || !raw) return raw;

  const hayLow = raw.toLocaleLowerCase("tr");
  const nLow = needle.toLocaleLowerCase("tr");
  const idx = hayLow.indexOf(nLow);
  if (idx === -1) return raw;

  const len = Math.min(nLow.length, raw.length - idx);
  const before = raw.slice(0, idx);
  const mid = raw.slice(idx, idx + len);
  const after = raw.slice(idx + len);
  return (
    <>
      {before}
      <mark className={MARK_CLASS}>{mid}</mark>
      {after}
    </>
  );
}
