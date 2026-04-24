"use client";

import { useContext } from "react";
import { MobileProgressLoaderContext } from "@/components/providers/mobile-progress-loader-provider";

export type MobileProgressLoaderControls = {
  /**
   * Programmatic client navigasyonda (router.push öncesi) yükleniyor başlar;
   * pathname / search değişince otomatik tamamlanır.
   */
  startNavigation: () => void;
  /** Arka plan / form / mesaj gibi aynı sayfada kalan async iş. */
  startTask: () => void;
  /** %100, kısa gecikmeyle kapanır. */
  done: () => void;
  /** Zorunlu kapanış: hata, timeout, takılma. */
  failSafeClose: () => void;
};

const noopControls: MobileProgressLoaderControls = {
  startNavigation: () => {
    // Provider yok: sessiz
  },
  startTask: () => {},
  done: () => {},
  failSafeClose: () => {},
};

/**
 * SSR ve provider dışı güvenli: no-op. Gerçek API, layout’taki provider ile.
 */
export function useMobileProgressLoader(): MobileProgressLoaderControls {
  const c = useContext(MobileProgressLoaderContext);
  return c ?? noopControls;
}
