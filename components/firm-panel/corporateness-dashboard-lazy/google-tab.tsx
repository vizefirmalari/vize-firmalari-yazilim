"use client";

import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import { parseFiniteGoogleRating } from "@/lib/firms/google-profile-public";
import { DATE_TIME_OPTS_LIST_COMPACT, formatInstantInTurkey } from "@/lib/datetime/turkey-time";

export default function GoogleTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const gp = snapshot.googleProfile;
  const adm = snapshot.googleAdmin;
  const rating = parseFiniteGoogleRating(gp?.rating ?? null);
  const hasPlaceId = gp?.google_place_id != null && String(gp.google_place_id).trim() !== "";

  const last = gp?.last_synced_at ? new Date(String(gp.last_synced_at)) : null;
  const lastLabel =
    last && !Number.isNaN(last.getTime()) ? formatInstantInTurkey(last, DATE_TIME_OPTS_LIST_COMPACT) : null;

  const hasData =
    gp &&
    (rating != null || (gp.user_rating_count != null && gp.user_rating_count > 0) || hasPlaceId);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-primary">
        Google verileri otomatik senkronize edilir ve manuel değiştirilemez.
      </div>

      {!hasData ? (
        <p className="text-sm text-[#1A1A1A]/60">Henüz Google Haritalar verisi bulunmuyor.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
              Google puanı
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[#0B3C5D]">
              {rating != null ? rating.toFixed(1) : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
              Değerlendirme sayısı
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[#0B3C5D]">
              {gp?.user_rating_count != null ? gp.user_rating_count : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm sm:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
              Senkronizasyon tarihi
            </p>
            <p className="mt-2 text-sm font-medium text-[#0B3C5D]">{lastLabel ?? "—"}</p>
            {adm?.sync_status ? (
              <p className="mt-1 text-xs text-[#1A1A1A]/55">Durum: {adm.sync_status}</p>
            ) : null}
            {adm?.sync_error ? (
              <p className="mt-2 text-xs text-[#1A1A1A]/55">Son hata: {adm.sync_error}</p>
            ) : null}
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/8 bg-white p-4 shadow-sm sm:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
              Place ID durumu
            </p>
            <p className="mt-2 break-all font-mono text-xs text-[#1A1A1A]/80">
              {hasPlaceId ? String(gp?.google_place_id).trim() : "Henüz tanımlı değil"}
            </p>
            {adm?.place_id_last_refreshed_at ? (
              <p className="mt-2 text-xs text-[#1A1A1A]/55">
                Son yenileme kaydı: {adm.place_id_last_refreshed_at}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
