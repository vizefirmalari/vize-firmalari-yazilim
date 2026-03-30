import type { Viewport } from "next";
import type { ReactNode } from "react";

/**
 * Klavye açıldığında layout viewport’un yeniden boyutlanması (özellikle Android Chrome).
 * dvh/svh ile birlikte daha tutarlı “keyboard-safe” alan.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function MesajlarLayout({ children }: { children: ReactNode }) {
  return children;
}
