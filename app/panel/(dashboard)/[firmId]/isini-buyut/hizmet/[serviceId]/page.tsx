import Link from "next/link";
import { notFound } from "next/navigation";

import { GrowthDetailPurchase } from "@/components/firm-panel/growth/growth-detail-purchase";
import { PackageFeatureList } from "@/components/firm-panel/growth/growth-package-features";
import { growthServicePriceLine } from "@/lib/format/try-lira";
import { loadGrowthServiceById } from "@/lib/data/growth-catalog";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string; serviceId: string }> };

export default async function FirmGrowthServiceDetailPage({ params }: PageProps) {
  const { firmId, serviceId } = await params;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const service = await loadGrowthServiceById(supabase, serviceId);
  if (!service) notFound();

  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const badge = service.badge?.trim() || null;
  const body = (service.long_description || service.short_description).trim();
  return (
    <div className="space-y-8">
      <Link href={`/panel/${firmId}/isini-buyut`} className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← İşini Büyüt
      </Link>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">Hizmet</p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">{service.title}</h1>
        {!service.is_active ? (
          <p className="mt-2 text-xs font-semibold text-[#1A1A1A]/55">
            Bu hizmet şu an yeni satın alımlara kapalıdır.
          </p>
        ) : null}
        {badge ? (
          <p className="mt-2 inline-block rounded-full bg-[#F4F6F8] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            {badge}
          </p>
        ) : null}
        <p className="mt-3 text-sm font-semibold text-[#0B3C5D]">{priceLine}</p>
        {service.package_includes.length > 0 ? (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/48">Paket içeriği</p>
            <div className="mt-3 rounded-xl bg-[#F5F7FA] px-4 py-4 sm:px-5 sm:py-5">
              <PackageFeatureList items={service.package_includes} />
            </div>
          </div>
        ) : null}
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Size ne kazandırır?</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#1A1A1A]/70">{body}</p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <GrowthDetailPurchase service={service} />
        <Link
          href={`/panel/${firmId}/isini-buyut`}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
        >
          Tüm hizmetler
        </Link>
      </div>
    </div>
  );
}
