import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Şifremi unuttum",
  description: "Şifre sıfırlama bağlantısı alın.",
  robots: { index: false, follow: false },
};

export default function SifreUnuttumPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-12 sm:px-6 sm:py-16">
        <ForgotPasswordForm />
      </main>
      <SiteFooter />
    </>
  );
}
