"use client";

import { useEffect } from "react";

/**
 * Aktif sohbet ekranında document kaydırmasını kapatır; yalnızca mesaj listesi kayar.
 * Mobilde adres çubuğu / klavye ile birlikte beklenmedik body scroll’unu engeller.
 */
export function MessagingViewportScrollLock({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevHtmlOverscroll = html.style.overscrollBehaviorY;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    const prevBodyOverscroll = body.style.overscrollBehaviorY;
    html.style.overflow = "hidden";
    html.style.height = "100dvh";
    html.style.overscrollBehaviorY = "none";
    body.style.overflow = "hidden";
    body.style.height = "100dvh";
    body.style.overscrollBehaviorY = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.height = prevHtmlHeight;
      html.style.overscrollBehaviorY = prevHtmlOverscroll;
      body.style.overflow = prevBodyOverflow;
      body.style.height = prevBodyHeight;
      body.style.overscrollBehaviorY = prevBodyOverscroll;
    };
  }, [active]);

  return null;
}
