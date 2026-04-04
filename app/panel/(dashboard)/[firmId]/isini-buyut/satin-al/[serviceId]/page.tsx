import Link from "next/link";
import { notFound } from "next/navigation";

import { GrowthCheckoutActions } from "@/components/firm-panel/growth/growth-checkout-actions";
import { GrowthIbanCopy } from "@/components/firm-panel/growth/growth-iban-copy";
import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";
import { loadGrowthServiceById } from "@/lib/data/growth-catalog";
import { getGrowthPaymentBankInfo } from "@/lib/firm-panel/growth-payment-config";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string; serviceId: string }> };

export default async function FirmGrowthCheckoutPage({ params }: PageProps) {
  const { firmId, serviceId } = await params;
  const membership = await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const service = await loadGrowthServiceById(supabase, serviceId);
  if (!service || !service.is_active) notFound();

  const displayName = membership.firmName || "Firma";
  const paymentRef = `${service.title} + ${displayName}`;
  const bank = getGrowthPaymentBankInfo();
  const priceLine = growthPriceLineFromSnapshots(service.setup_price, service.monthly_price);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/panel/${firmId}/isini-buyut`}
          className="text-sm font-semibold text-[#0B3C5D] hover:underline"
        >
          ← İşini Büyüt
        </Link>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Ödeme
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#0B3C5D]">Satın alma özeti</h1>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#0B3C5D]">{service.title}</h2>
        <p className="mt-2 text-sm text-[#1A1A1A]/65">{service.description}</p>
        <p className="mt-3 text-sm font-semibold text-[#0B3C5D]">{priceLine}</p>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#0B3C5D]">Havale / EFT</h2>
        <p className="mt-2 text-sm text-[#1A1A1A]/65">
          Ödeme açıklamasına aşağıdaki ifadeyi aynen yazın; böylece işleminiz hızlı eşleşir.
        </p>
        <div className="mt-4 rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            Ödeme açıklaması
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-[#1A1A1A]">{paymentRef}</p>
        </div>

        {bank.iban ? (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">IBAN</p>
            <p className="mt-1 font-mono text-sm font-semibold tracking-wide text-[#1A1A1A]">{bank.iban}</p>
            <GrowthIbanCopy iban={bank.iban} />
            {bank.bankName ? (
              <p className="mt-3 text-sm text-[#1A1A1A]/65">
                <span className="font-semibold text-[#1A1A1A]/80">Banka: </span>
                {bank.bankName}
              </p>
            ) : null}
            {bank.accountHolder ? (
              <p className="mt-1 text-sm text-[#1A1A1A]/65">
                <span className="font-semibold text-[#1A1A1A]/80">Hesap adı: </span>
                {bank.accountHolder}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[#1A1A1A]/60">
            IBAN bilgisi yapılandırılmadı. Ödeme için platform ekibiyle{" "}
            <Link href={`/panel/${firmId}/yonetici-mesaj`} className="font-semibold text-[#0B3C5D] hover:underline">
              yönetici mesajlaşması
            </Link>{" "}
            üzerinden iletişime geçin.
          </p>
        )}

        <p className="mt-6 text-xs text-[#1A1A1A]/50">
          Ödeme onayı manuel kontrol edilir. Tutar veya paket farkı için ekibimiz sizinle iletişime geçebilir.
        </p>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#0B3C5D]">Ödeme sonrası</h2>
        <p className="mt-2 text-sm text-[#1A1A1A]/65">
          Havaleyi gönderdikten sonra bildirim bırakın; talebiniz Abonelikler sekmesinde görünür.
        </p>
        <div className="mt-5">
          <GrowthCheckoutActions firmId={firmId} serviceId={service.id} />
        </div>
      </section>
    </div>
  );
}
