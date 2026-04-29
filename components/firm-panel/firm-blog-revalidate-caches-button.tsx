"use client";

import { useState, useTransition } from "react";

import { revalidateFirmBlogCachesForFirm } from "@/lib/actions/firm-panel-blog";

/** Blog kapakları için ayrı bir feed tablosu yok; bu yalnızca Next önbeliğini güvenli şekilde yeniler. */
export function FirmBlogRevalidateCachesButton({ firmId }: { firmId: string }) {
  const [pending, startTransition] = useTransition();
  const [banner, setBanner] = useState<{ ok: boolean; text: string } | null>(null);

  return (
    <div className="space-y-2">
      <p className="text-xs text-[#1A1A1A]/60">
        Veriler tek kaynaktan (<span className="font-mono">firm_blog_posts.cover_image_url</span>). Akış
        kartında <span className="font-mono">image_url</span> bu değerden türetilir. Gerekirse CDN/Next
        önbelliğini sıfırlamak için kullanın.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              setBanner(null);
              const r = await revalidateFirmBlogCachesForFirm(firmId);
              setBanner(r.ok ? { ok: true, text: "Önbellek yenilendi." } : { ok: false, text: r.error });
            })
          }
          className="shrink-0 rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6] disabled:opacity-60"
        >
          {pending ? "Yenileniyor…" : "Kapakları yeniden senkronize et (önbellek)"}
        </button>
        {banner ? (
          <p className={`text-xs ${banner.ok ? "text-[#067647]" : "text-[#B42318]"}`}>{banner.text}</p>
        ) : null}
      </div>
    </div>
  );
}
