/** Sunucu bileşeni — masaüstü ve mobil arama alanları ortak mantık */
export function HeaderSearchForm({
  hiddenParams,
  defaultValue,
  inputId,
  className,
}: {
  hiddenParams: Record<string, string>;
  defaultValue: string;
  inputId: string;
  className?: string;
}) {
  return (
    <form action="/" method="get" role="search" className={className}>
      {Object.entries(hiddenParams).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label htmlFor={inputId} className="sr-only">
        Ülke veya firma ara
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Ülke veya firma ara"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </form>
  );
}
