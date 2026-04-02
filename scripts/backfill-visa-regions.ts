/**
 * Tüm firmalar için `visa_regions` alanını `countries` dizisinden türetir.
 *
 * Gerekli env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Dry-run: DRY_RUN=1 npm run backfill:visa-regions
 */

import { createClient } from "@supabase/supabase-js";
import { deriveVisaRegions } from "../lib/visa-regions/derive";

function sameStringArray(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dry = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

  if (!url || !key) {
    console.error(
      "Eksik ortam değişkeni: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY"
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: rows, error } = await supabase
    .from("firms")
    .select("id,name,countries,visa_regions")
    .order("name");

  if (error || !rows) {
    console.error("Sorgu hatası:", error?.message ?? "bilinmiyor");
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = String(row.name ?? "");
    const countries = Array.isArray(row.countries)
      ? (row.countries as string[]).filter(Boolean)
      : [];
    const prev = Array.isArray(row.visa_regions)
      ? (row.visa_regions as string[]).filter(Boolean)
      : [];
    const next = deriveVisaRegions(countries);

    if (sameStringArray(prev, next)) {
      skipped++;
      if (dry) {
        console.log(`[atlandı] ${name}`);
      }
      continue;
    }

    console.log(
      `[güncellenecek] ${name}\n  ülkeler: ${JSON.stringify(countries)}\n  önce: ${JSON.stringify(prev)}\n  sonra: ${JSON.stringify(next)}`
    );

    if (!dry) {
      const { error: upErr } = await supabase
        .from("firms")
        .update({
          visa_regions: next,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id as string);

      if (upErr) {
        console.error(`  HATA: ${upErr.message}`);
        process.exit(1);
      }
    }
    updated++;
  }

  console.log(
    dry
      ? `Dry-run bitti. Güncellenecek: ${updated}, zaten uyumlu: ${skipped}`
      : `Tamamlandı. Güncellenen: ${updated}, atlanan: ${skipped}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
