/** Sunucu bileşeni — masaüstü ve mobil arama alanları ortak mantık */
export function HeaderSearchForm({
  hiddenParams,
  defaultValue,
  inputId,
  className,
  placeholder = "Ülke veya firma ara",
  compact = false,
}: {
  hiddenParams: Record<string, string>;
  defaultValue: string;
  inputId: string;
  className?: string;
  placeholder?: string;
  compact?: boolean;
}) {
  return (
    <form action="/" method="get" role="search" className={className}>
      {Object.entries(hiddenParams).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label htmlFor={inputId} className="sr-only">
        Ülke veya firma ara
      </label>
      <div className="relative">
        {compact ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-foreground/45">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        ) : null}
        <input
          id={inputId}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className={`w-full rounded-xl border border-border bg-background text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            compact ? "h-10 px-3 pl-9 text-[13px]" : "h-11 px-4"
          }`}
        />
      </div>
    </form>
  );
}
