import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firma paneli",
  robots: { index: false, follow: false },
};

/**
 * Firma paneli kök layout — alt rotalar (dashboard) kendi shell’ini sağlar.
 */
export default function PanelRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
