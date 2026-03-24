import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Kayıt ol",
  description: "Vize Firmaları’nda ücretsiz hesap oluşturun.",
  robots: { index: false, follow: false },
};

export default function KayitPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-12 sm:px-6 sm:py-16">
        <RegisterForm />
      </main>
      <SiteFooter />
    </>
  );
}
