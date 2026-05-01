import type { ReactNode } from "react";

/** `/akis` haber ana sayfası iç genişlik ve yan boşluklar */
export function NewsHomeLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div>;
}
