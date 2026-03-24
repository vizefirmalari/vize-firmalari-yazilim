type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[#0B3C5D]">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs text-[#1A1A1A]/45">{hint}</p>
      ) : null}
    </div>
  );
}
