import Link from "next/link";
import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelDetailPage({ params }: PageProps) {
  const { firmId } = await params;
  const membership = await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select("name, slug, logo_url, website")
    .eq("id", firmId)
    .maybeSingle();

  if (!firm) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-[#0B3C5D]/12">
            {firm.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={firm.logo_url as string}
                alt=""
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-[#0B3C5D]/30">
                {(firm.name as string).slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
              {firm.name as string}
            </h1>
            <p className="mt-1 text-sm text-[#1A1A1A]/55">
              Panel erişimi: <span className="font-medium text-[#1A1A1A]/75">{membership.role}</span>
            </p>
          </div>
        </div>
        <Link
          href={`/firma/${firm.slug as string}`}
          className="inline-flex min-h-11 items-center justify-center self-start rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8]"
        >
          Sitedeki profili görüntüle
        </Link>
      </div>

      <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-[#0B3C5D]">İşlemler</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
          Yönetim panelinden size açılacak işlemler (mesajlaşma, formlar, duyurular vb.) burada
          adım adım eklenecek. Şu an yalnızca erişim altyapısı hazırdır.
        </p>
      </section>
    </div>
  );
}
