"use client";

import { Suspense } from "react";

import { AuthDialog } from "./auth-dialog";
import { AuthUrlSync } from "./auth-url-sync";

/** Provider içinde: modal + `/?auth=` senkronizasyonu (`useSearchParams` için Suspense) */
export function AuthShell() {
  return (
    <Suspense fallback={null}>
      <AuthDialog />
      <AuthUrlSync />
    </Suspense>
  );
}
