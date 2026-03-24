import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Şifremi yenile",
  description: "Yeni şifrenizi belirleyin.",
  robots: { index: false, follow: false },
};

export default function SifreYenilePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-12 sm:px-6 sm:py-16">
        <ResetPasswordForm />
      </main>
      <SiteFooter />
    </>
  );
}
