"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { reportGrowthPaymentSubmitted } from "@/lib/actions/growth-purchase-requests";

type Props = {
  firmId: string;
  purchaseId: string;
  disabled?: boolean;
};

export function GrowthPurchaseReportPaymentButton({ firmId, purchaseId, disabled }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending || disabled}
      onClick={() => {
        startTransition(async () => {
          const res = await reportGrowthPaymentSubmitted({ firmId, purchaseId });
          if (!res.ok) {
            alert(res.error);
            return;
          }
          router.refresh();
        });
      }}
      className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:opacity-50"
    >
      {pending ? "Kaydediliyor..." : "Ödemeyi yaptım · bildir"}
    </button>
  );
}
