"use client";

import { useEffect, useState } from "react";

/**
 * Layout viewport altı ile görsel viewport altı arasındaki mesafe (klavye, iOS bar vb.).
 * window/document scroll kullanmaz; padding/position için px değeri döner.
 */
export function useVisualViewportKeyboardInset() {
  const [insetPx, setInsetPx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;

    const sync = () => {
      const layoutH = window.innerHeight;
      const bottomGap = Math.max(0, layoutH - vv.offsetTop - vv.height);
      setInsetPx(bottomGap);
    };

    const syncDelayed = () => {
      sync();
      requestAnimationFrame(sync);
      window.setTimeout(sync, 50);
      window.setTimeout(sync, 150);
      window.setTimeout(sync, 320);
    };

    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", syncDelayed);

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (t instanceof HTMLTextAreaElement || t instanceof HTMLInputElement) {
        syncDelayed();
      }
    };

    const onFocusOut = () => {
      window.setTimeout(sync, 0);
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    sync();

    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", syncDelayed);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return insetPx;
}
