"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useAuthModal } from "./auth-modal-context";

/** `/?auth=login|register|forgot` ile modalı açar ve adres çubuğunu temizler */
export function AuthUrlSync() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openWithMode } = useAuthModal();

  useEffect(() => {
    const auth = params.get("auth");
    if (auth !== "login" && auth !== "register" && auth !== "forgot") {
      return;
    }

    openWithMode(auth);

    const sp = new URLSearchParams(params.toString());
    sp.delete("auth");
    const q = sp.toString();
    const next = q ? `${pathname}?${q}` : pathname;
    router.replace(next, { scroll: false });
  }, [params, pathname, router, openWithMode]);

  return null;
}
