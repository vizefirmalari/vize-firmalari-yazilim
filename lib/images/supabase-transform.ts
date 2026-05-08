type TransformOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

const SUPABASE_PUBLIC_SEGMENT = "/storage/v1/object/public/";

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/**
 * Küçük render edilen public Supabase görselleri için istek payload'ını düşürür.
 * URL Supabase public storage değilse olduğu gibi döner.
 */
export function withSupabaseImageTransform(
  rawUrl: string | null | undefined,
  opts: TransformOptions
): string | null {
  const src = typeof rawUrl === "string" ? rawUrl.trim() : "";
  if (!src) return null;
  if (!src.includes(SUPABASE_PUBLIC_SEGMENT)) return src;

  try {
    const url = new URL(src);
    if (typeof opts.width === "number" && opts.width > 0) {
      url.searchParams.set("width", String(clampInt(opts.width, 16, 4096)));
    }
    if (typeof opts.height === "number" && opts.height > 0) {
      url.searchParams.set("height", String(clampInt(opts.height, 16, 4096)));
    }
    if (typeof opts.quality === "number" && opts.quality > 0) {
      url.searchParams.set("quality", String(clampInt(opts.quality, 20, 95)));
    }
    return url.toString();
  } catch {
    return src;
  }
}
