import { Suspense } from "react";

import { CheckoutPageClient } from "@/components/membership/checkout-page-client";

export const metadata = {
  title: "Ödeme",
  robots: { index: false, follow: false },
};

export default function OdemePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-background text-sm text-foreground/60">
          Yükleniyor…
        </div>
      }
    >
      <CheckoutPageClient />
    </Suspense>
  );
}
