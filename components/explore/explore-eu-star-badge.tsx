/**
 * Schengen / Avrupa keşfet kartları — bayrak yerine AB yıldız halkası (sembol).
 */

type Props = {
  size?: "sm" | "md";
  className?: string;
};

function starPolygon(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = (i * Math.PI) / 5 - Math.PI / 2;
    const R = i % 2 === 0 ? outer : inner;
    pts.push(`${cx + R * Math.cos(rad)},${cy + R * Math.sin(rad)}`);
  }
  return pts.join(" ");
}

export function ExploreEuStarBadge({ size = "sm", className = "" }: Props) {
  const h = size === "md" ? 22 : 18;
  const w = Math.round((h * 3) / 2);
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
    const cx = 15 + Math.cos(a) * 8.6;
    const cy = 10 + Math.sin(a) * 8.6;
    return (
      <polygon key={i} points={starPolygon(cx, cy, 1.35, 0.52)} fill="#FFCC00" />
    );
  });
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 20"
      className={`block shrink-0 ${className}`}
      role="img"
      aria-label="Avrupa Birliği yıldızları"
    >
      <title>Avrupa Birliği yıldızları</title>
      <rect width="30" height="20" rx="2.4" fill="#003399" />
      {stars}
    </svg>
  );
}
