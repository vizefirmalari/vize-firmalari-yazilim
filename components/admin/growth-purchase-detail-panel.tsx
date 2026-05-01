"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  adminActivateGrowthFromPurchase,
  adminPatchGrowthPurchaseRequest,
  adminSendGrowthPurchaseChatMessage,
} from "@/lib/actions/growth-admin";
import {
  growthBillingCycleLabel,
  growthPaymentStatusLabel,
  growthPurchaseStatusLabel,
  growthServiceSubscriptionStatusLabel,
} from "@/lib/growth/growth-purchase-labels";
import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";

export type GrowthPurchaseDetailModel = {
  purchase: Record<string, unknown>;
  firm: Record<string, unknown> | null;
  subscription: Record<string, unknown> | null;
};

function str(v: unknown): string {
  return v != null ? String(v) : "";
}

export function GrowthPurchaseDetailPanel({ model }: { model: GrowthPurchaseDetailModel }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  const p = model.purchase;
  const f = model.firm;
  const id = str(p.id);
  const firmId = str(p.firm_id);
  const firmName = str(f?.name) || str(p.company_name_snapshot) || "Firma";
  const firmSlug = str(f?.slug);
  const logoUrl = f?.logo_url != null ? String(f.logo_url) : str(p.company_logo_snapshot);
  const firmEmail = f?.email != null ? String(f.email) : "";
  const firmPhone = f?.phone != null ? String(f.phone) : "";

  const status = str(p.status);
  const paymentStatus = str(p.payment_status);
  const isSub = Boolean(p.is_subscription);
  const priceLine = growthPriceLineFromSnapshots(
    p.setup_price_snapshot as number | null,
    p.monthly_price_snapshot as number | null
  );

  const chatHref = `/admin/firm-admin-messages?firmId=${encodeURIComponent(firmId)}`;

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      const res = await fn();
      if (res.ok) router.refresh();
      else alert(res.error ?? "Hata");
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
            Satın alma talebi
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">{str(p.service_title)}</h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            {growthPurchaseStatusLabel(status)} · {growthPaymentStatusLabel(paymentStatus)}
            {isSub ? " · Abonelik" : " · Tek sefer"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={chatHref}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
          >
            Sohbet ekranı
          </Link>
          <Link
            href="/admin/growth/purchase-requests"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#1A1A1A]/12 px-4 text-sm font-semibold text-[#1A1A1A]/70 hover:bg-white"
          >
            Listeye dön
          </Link>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0B3C5D]">Firma bilgisi</h2>
          <div className="mt-4 flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#1A1A1A]/10 bg-[#F7F9FB]">
              {logoUrl ? (
                 
                <img src={logoUrl} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="text-lg font-bold text-[#0B3C5D]/40">{firmName.slice(0, 1)}</span>
              )}
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-bold text-[#0B3C5D]">{firmName}</p>
              {firmSlug ? (
                <Link
                  href={`/firma/${firmSlug}`}
                  className="mt-1 block truncate text-xs font-semibold text-[#0B3C5D]/80 underline-offset-2 hover:underline"
                >
                  /firma/{firmSlug}
                </Link>
              ) : null}
              {firmEmail ? <p className="mt-2 text-xs text-[#1A1A1A]/60">E-posta: {firmEmail}</p> : null}
              {firmPhone ? <p className="text-xs text-[#1A1A1A]/60">Telefon: {firmPhone}</p> : null}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0B3C5D]">Satın alınan hizmet (anlık görüntü)</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#1A1A1A]/50">Kategori</dt>
              <dd className="text-right font-medium text-[#1A1A1A]/80">{str(p.category_snapshot) || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#1A1A1A]/50">Özet</dt>
              <dd className="max-w-[60%] text-right text-[#1A1A1A]/75">
                {str(p.service_short_description_snapshot) || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#1A1A1A]/50">Fiyat</dt>
              <dd className="text-right font-semibold text-[#0B3C5D]">{priceLine}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#1A1A1A]/50">Abonelik</dt>
              <dd className="text-right">{isSub ? "Evet" : "Hayır (tek sefer)"}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">İşlem bilgisi</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Talep tarihi</dt>
            <dd className="font-medium">
              {p.created_at ? new Date(str(p.created_at)).toLocaleString("tr-TR") : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Havale açıklaması</dt>
            <dd className="break-words font-mono text-xs text-[#1A1A1A]/75">{str(p.transfer_description) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Ödeme tipi</dt>
            <dd>{str(p.payment_type_label) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">IBAN (anı)</dt>
            <dd className="break-all font-mono text-xs">{str(p.payment_iban_snapshot) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Alıcı adı (anı)</dt>
            <dd>{str(p.payment_receiver_name_snapshot) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Banka (anı)</dt>
            <dd>{str(p.payment_bank_name_snapshot) || "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Fatura bilgileri</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Ad soyad</dt>
            <dd className="font-medium">{str(p.billing_full_name) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Firma ünvanı</dt>
            <dd>{str(p.billing_company_name) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Vergi dairesi</dt>
            <dd>{str(p.billing_tax_office) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">VKN / TC</dt>
            <dd className="font-mono">{str(p.billing_tax_number) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">E-posta</dt>
            <dd>{str(p.billing_email) || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Telefon</dt>
            <dd>{str(p.billing_phone) || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-[#1A1A1A]/50">Adres</dt>
            <dd className="whitespace-pre-wrap text-[#1A1A1A]/75">{str(p.billing_address) || "—"}</dd>
          </div>
        </dl>
      </section>

      {model.subscription ? (
        <section className="rounded-2xl border border-[#067647]/20 bg-[#F4FBF7] p-5">
          <h2 className="text-sm font-bold text-[#067647]">Bağlı hizmet aboneliği</h2>
          <p className="mt-2 text-sm text-[#1A1A1A]/70">
            {str(model.subscription.service_title)} · {growthBillingCycleLabel(str(model.subscription.billing_cycle))} ·{" "}
            {growthServiceSubscriptionStatusLabel(str(model.subscription.status))}
          </p>
        </section>
      ) : null}

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Aksiyonlar</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run(() => adminPatchGrowthPurchaseRequest({ id, payment_status: "verified" }))
            }
            className="rounded-xl bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            Ödeme alındı (doğrula)
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => adminPatchGrowthPurchaseRequest({ id, status: "under_review" }))}
            className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-xs font-semibold text-[#0B3C5D] disabled:opacity-50"
          >
            İncelemeye al
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => adminPatchGrowthPurchaseRequest({ id, status: "approved" }))}
            className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-xs font-semibold text-[#0B3C5D] disabled:opacity-50"
          >
            Onayla (ödeme beklenir)
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (!confirm("Aboneliği oluşturup (veya tek seferi tamamlayıp) talebi kapatabilirsiniz. Devam?")) return;
              run(() => adminActivateGrowthFromPurchase(id));
            }}
            className="rounded-xl border border-[#067647]/35 bg-[#067647]/10 px-3 py-2 text-xs font-semibold text-[#067647] disabled:opacity-50"
          >
            {isSub ? "Aktif et / abonelik oluştur" : "Tamamla (tek sefer)"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => adminPatchGrowthPurchaseRequest({ id, status: "cancelled" }))}
            className="rounded-xl border border-[#B42318]/25 px-3 py-2 text-xs font-semibold text-[#B42318] disabled:opacity-50"
          >
            İptal et
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => adminPatchGrowthPurchaseRequest({ id, payment_status: "rejected" }))}
            className="rounded-xl border border-[#B42318]/20 px-3 py-2 text-xs font-semibold text-[#B42318]/80 disabled:opacity-50"
          >
            Ödemeyi reddet
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Firmaya mesaj (satın alma bağlamı)</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">
          Mesaj, yönetici–firma sohbetine düşer ve bu talep numarasına bağlanır.
        </p>
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-xl border border-[#1A1A1A]/12 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/25"
          placeholder="Belge talebi, sonraki adım veya bilgilendirme..."
        />
        <button
          type="button"
          disabled={pending || !msg.trim()}
          onClick={() => {
            const text = msg.trim();
            if (!text) return;
            run(async () => {
              const res = await adminSendGrowthPurchaseChatMessage({
                firmId,
                purchaseId: id,
                body: text,
              });
              if (res.ok) setMsg("");
              return res;
            });
          }}
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white disabled:opacity-50"
        >
          Gönder
        </button>
      </section>
    </div>
  );
}
