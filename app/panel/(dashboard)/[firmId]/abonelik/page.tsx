import Link from "next/link";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelSubscriptionPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Abonelik
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Abonelik satın al</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Tüm panel özellikleri her planda açıktır. Paket seçimi liste sıralaması, görünürlük ve promosyon gücünüzü
          belirler; detaylı karşılaştırma için aşağıdaki bağlantıyı kullanın.
        </p>
      </div>
      <div className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-[#1A1A1A]/70">
          Planları karşılaştırıp yükseltmek için genel abonelik sayfasına gidin.
        </p>
        <Link
          href={`/abonelik-sec?firmId=${encodeURIComponent(firmId)}`}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
        >
          Paketleri incele
        </Link>
      </div>
    </div>
  );
}
