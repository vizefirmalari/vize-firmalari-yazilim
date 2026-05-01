import type { ReactNode } from "react";

/** `/akis` haber ana sayfası iç genişlik ve yan boşluklar */
export function NewsHomeLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1180px] px-4">{children}</div>;
}
