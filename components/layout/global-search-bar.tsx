"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, KeyboardEvent } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import type { GlobalSearchGroup, GlobalSearchItem } from "@/lib/search/global-search-response";
import { highlightSearchMatch } from "@/lib/search/highlight-search-match";
import { buildHomeSearchPath } from "@/lib/search/home-search-url";

type ApiResponse = {
  ok: boolean;
  query: string;
  groups: GlobalSearchGroup[];
  narrow?: boolean;
};

type Props = {
  hiddenParams: Record<string, string>;
  defaultValue: string;
  inputId: string;
  className?: string;
  placeholder?: string;
  compact?: boolean;
};

const DEBOUNCE_MS = 200;
const MIN_CHARS = 2;

function SuggestionIcon({ kind }: { kind: GlobalSearchItem["kind"] }) {
  const cls = "h-4 w-4 shrink-0 text-primary/70";
  switch (kind) {
    case "country":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "firm":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M4 20V10l8-4 8 4v10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "visa":
    case "service":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "explore":
    case "all":
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

function popularSuggestions(hiddenParams: Record<string, string>): { title: string; href: string }[] {
  return [
    { title: "Schengen", href: "/kesfet/schengen-vizesi" },
    { title: "İngiltere", href: "/kesfet/ingiltere-vizesi" },
    { title: "ABD", href: "/kesfet/abd-vizesi" },
    { title: "Öğrenci vizesi", href: buildHomeSearchPath(hiddenParams, { visaTypes: ["Öğrenci Vizesi"] }) },
    { title: "Çalışma vizesi", href: buildHomeSearchPath(hiddenParams, { visaTypes: ["Çalışma Vizesi"] }) },
  ];
}

export function GlobalSearchBar({
  hiddenParams,
  defaultValue,
  inputId,
  className,
  placeholder = "Ülke veya firma ara",
  compact = false,
}: Props) {
  const router = useRouter();
  const listboxId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(defaultValue);
  const [debounced, setDebounced] = useState(defaultValue.trim());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GlobalSearchGroup[]>([]);
  const [narrow, setNarrow] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    setQuery(defaultValue);
    setDebounced(defaultValue.trim());
  }, [defaultValue]);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (debounced.length < MIN_CHARS) {
      setGroups([]);
      setNarrow(false);
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    const sp = new URLSearchParams();
    sp.set("q", debounced);
    Object.entries(hiddenParams).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    fetch(`/api/public/global-search?${sp.toString()}`, { signal: ac.signal })
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => {
        if (!data.ok) return;
        setGroups(data.groups ?? []);
        setNarrow(Boolean(data.narrow));
      })
      .catch(() => {
        if (!ac.signal.aborted) {
          setGroups([]);
          setNarrow(true);
        }
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });
    return () => ac.abort();
  }, [debounced, hiddenParams]);

  const flatItems = useMemo(() => {
    const out: { group: string; item: GlobalSearchItem; flatIndex: number }[] = [];
    let i = 0;
    for (const g of groups) {
      for (const item of g.items) {
        out.push({ group: g.label, item, flatIndex: i });
        i += 1;
      }
    }
    return out;
  }, [groups]);

  const flatIndexById = useMemo(() => {
    const m = new Map<string, number>();
    flatItems.forEach((x, idx) => m.set(x.item.id, idx));
    return m;
  }, [flatItems]);

  useEffect(() => {
    setActiveIdx((i) => {
      if (flatItems.length === 0) return -1;
      if (i < 0) return -1;
      if (i >= flatItems.length) return flatItems.length - 1;
      return i;
    });
  }, [flatItems]);

  useEffect(() => {
    function onDoc(ev: MouseEvent) {
      if (!rootRef.current?.contains(ev.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (activeIdx < 0 || !flatItems[activeIdx]) return;
    const id = `${listboxId}-opt-${flatItems[activeIdx].item.id}`;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }, [activeIdx, flatItems, listboxId]);

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      setActiveIdx(-1);
      router.push(href);
    },
    [router]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const href = buildHomeSearchPath(hiddenParams, { q: query });
      navigateTo(href);
    },
    [hiddenParams, navigateTo, query]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp") && query.trim().length >= MIN_CHARS) {
        setOpen(true);
        setActiveIdx(0);
        e.preventDefault();
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIdx(-1);
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!flatItems.length) return;
        setActiveIdx((i) => {
          const next = i < 0 ? 0 : i + 1;
          return Math.min(flatItems.length - 1, next);
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!flatItems.length) return;
        setActiveIdx((i) => {
          const cur = i < 0 ? 0 : i;
          return Math.max(0, cur - 1);
        });
      }
      if (e.key === "Enter" && activeIdx >= 0 && flatItems[activeIdx]) {
        e.preventDefault();
        navigateTo(flatItems[activeIdx].item.href);
      }
    },
    [activeIdx, flatItems, navigateTo, open, query]
  );

  const showPanel = open && (query.trim().length >= MIN_CHARS || !query.trim());
  const showSuggestions = query.trim().length >= MIN_CHARS;
  const showIdlePopular = open && query.trim().length < MIN_CHARS;
  const popular = useMemo(() => popularSuggestions(hiddenParams), [hiddenParams]);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <form onSubmit={onSubmit} role="search" className="relative">
        <label htmlFor={inputId} className="sr-only">
          {placeholder}
        </label>
        {compact ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 z-[1] inline-flex items-center text-foreground/45">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        ) : null}
        <input
          ref={inputRef}
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIdx >= 0 && flatItems[activeIdx]
              ? `${listboxId}-opt-${flatItems[activeIdx].item.id}`
              : undefined
          }
          placeholder={placeholder}
          className={`w-full rounded-xl border border-border bg-background text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            compact ? "h-10 px-3 pl-9 text-[13px]" : "h-11 px-4"
          }`}
        />
        {Object.entries(hiddenParams).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      </form>

      {showPanel ? (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable={false}
          className="absolute left-0 right-0 top-full z-[200] mt-1 max-h-[min(70dvh,26rem)] overflow-y-auto overflow-x-hidden rounded-xl border border-border/90 bg-white py-2 shadow-[0_16px_48px_rgba(11,60,93,0.14)] sm:max-h-[min(75vh,28rem)]"
        >
          {showIdlePopular ? (
            <div className="px-3 pb-1 pt-1">
              <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-foreground/45">
                Popüler aramalar
              </p>
              <div className="flex flex-wrap gap-2">
                {popular.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-9 items-center rounded-lg border border-primary/12 bg-surface px-3 text-xs font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {showSuggestions && loading ? (
            <p className="px-4 py-3 text-sm text-foreground/55">Aranıyor…</p>
          ) : null}

          {showSuggestions && !loading && narrow ? (
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-primary">Sonuç bulunamadı</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                Ülke, firma veya hizmet adıyla tekrar deneyin; aşağıdaki kısayollarla keşfe başlayabilirsiniz.
              </p>
              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                onClick={() => navigateTo(buildHomeSearchPath(hiddenParams, { q: query }))}
              >
                Metinle tüm sonuçları görüntüle
              </button>
              <div className="mt-3 flex flex-wrap gap-2">
                {popular.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-9 items-center rounded-lg border border-primary/12 bg-surface px-3 text-xs font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {showSuggestions && !loading && !narrow
            ? groups.map((group) => (
                <div key={group.id} className="pb-2 pt-1">
                  <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-foreground/45">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const globalIndex = flatIndexById.get(item.id) ?? -1;
                      const active = globalIndex >= 0 && globalIndex === activeIdx;
                      const optionId = `${listboxId}-opt-${item.id}`;
                      return (
                        <li key={item.id} role="presentation">
                          <button
                            id={optionId}
                            type="button"
                            role="option"
                            aria-selected={active}
                            className={`flex w-full min-h-11 items-start gap-2.5 px-3 py-2.5 text-left text-sm transition ${
                              active ? "bg-primary/8 text-primary" : "text-foreground hover:bg-surface"
                            }`}
                            onMouseEnter={() => setActiveIdx(globalIndex)}
                            onClick={() => navigateTo(item.href)}
                          >
                            <span className="mt-0.5">
                              <SuggestionIcon kind={item.kind} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold leading-snug">
                                {highlightSearchMatch(item.title, debounced)}
                              </span>
                              {item.subtitle ? (
                                <span className="mt-0.5 line-clamp-2 block text-xs font-normal leading-snug text-foreground/55">
                                  {highlightSearchMatch(item.subtitle, debounced)}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 shrink-0 text-foreground/35" aria-hidden>
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                <path
                                  d="M9 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
