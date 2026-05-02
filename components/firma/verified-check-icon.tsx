/** Doğrulandı rozeti — turkuaz zemin üzerinde beyaz tik */
export function VerifiedCheckIcon({ size }: { size: "card" | "detail" }) {
  const px = size === "card" ? 16 : 18;
  return (
    <svg
      aria-hidden
      className="shrink-0 text-white"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
