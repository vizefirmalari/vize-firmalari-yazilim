import Link from "next/link";

type Props = {
  paramName: "page" | "bpage";
  current: number;
  totalPages: number;
  baseQuery: Record<string, string | undefined>;
  ariaLabel: string;
};

function parsePositivePage(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw === "") return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, 500);
}

function buildHref(
  baseQuery: Record<string, string | undefined>,
  paramName: "page" | "bpage",
  page: number
): string {
  const sp = new URLSearchParams();
  const q = baseQuery.q?.trim();
  if (q) sp.set("q", q);
  const fp = parsePositivePage(baseQuery.page, 1);
  const bp = parsePositivePage(baseQuery.bpage, 1);
  const nextFp = paramName === "page" ? page : fp;
  const nextBp = paramName === "bpage" ? page : bp;
  if (nextFp > 1) sp.set("page", String(nextFp));
  if (nextBp > 1) sp.set("bpage", String(nextBp));
  const qs = sp.toString();
  return qs ? `/arama?${qs}` : "/arama";
}

export function AramaPagination({ paramName, current, totalPages, baseQuery, ariaLabel }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const windowed =
    totalPages <= 7
      ? pages
      : (() => {
          const out: number[] = [];
          const push = (n: number) => {
            if (!out.includes(n)) out.push(n);
          };
          push(1);
          push(totalPages);
          for (let d = -1; d <= 1; d++) push(current + d);
          return [...new Set(out.filter((n) => n >= 1 && n <= totalPages))].sort((a, b) => a - b);
        })();

  const prev = current > 1 ? current - 1 : null;
  const next = current < totalPages ? current + 1 : null;

  return (
    <nav aria-label={ariaLabel} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {prev ? (
          <Link
            href={buildHref(baseQuery, paramName, prev)}
            className="inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-semibold text-primary transition hover:bg-surface"
          >
            ← Önceki
          </Link>
        ) : (
          <span className="inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-xl border border-border/50 bg-surface/60 px-4 text-sm font-semibold text-foreground/40">
            ← Önceki
          </span>
        )}
        {next ? (
          <Link
            href={buildHref(baseQuery, paramName, next)}
            className="inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-semibold text-primary transition hover:bg-surface"
          >
            Sonraki →
          </Link>
        ) : (
          <span className="inline-flex min-h-10 min-w-[7rem] items-center justify-center rounded-xl border border-border/50 bg-surface/60 px-4 text-sm font-semibold text-foreground/40">
            Sonraki →
          </span>
        )}
      </div>
      <ul className="flex max-w-full flex-wrap items-center justify-end gap-1.5">
        {windowed.map((p, idx) => {
          const prevItem = windowed[idx - 1];
          const showEllipsis = idx > 0 && prevItem !== undefined && p - prevItem > 1;
          return (
            <li key={p} className="flex items-center gap-1.5">
              {showEllipsis ? (
                <span className="px-1 text-xs font-semibold text-foreground/45" aria-hidden>
                  …
                </span>
              ) : null}
              {p === current ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-2 text-sm font-bold text-white"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={buildHref(baseQuery, paramName, p)}
                  className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-background px-2 text-sm font-semibold text-primary transition hover:bg-surface"
                >
                  {p}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
