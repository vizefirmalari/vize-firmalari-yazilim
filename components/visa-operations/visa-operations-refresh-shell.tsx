"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useVisaOperationsRealtime } from "@/hooks/use-visa-operations-realtime";

type Props = { firmId: string; children: ReactNode };

/** DB broadcast ile liste/detay SSR yenilemesi */
export function VisaOperationsRefreshShell({ firmId, children }: Props) {
  const router = useRouter();

  useVisaOperationsRealtime({
    firmId,
    enabled: true,
    onVisaCaseEvent: () => {
      router.refresh();
    },
  });

  return children;
}
