import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FirmComplaintForm } from "@/components/complaint/firm-complaint-form";
import type { PublishedFirmPickerRow } from "@/lib/types/published-firm-picker";

const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";

type Props = {
  firms: PublishedFirmPickerRow[];
};

export function FirmComplaintPage({ firms }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <header className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Platform · Bildirim
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Firma Şikayet Et
            </h1>
            <p className={p}>
              Yayınlanmış bir firma ile ilgili yaşadığınız olumsuz bir durumu,{" "}
              <strong className="font-semibold text-foreground">vizefirmalari.com platform yönetimine</strong>{" "}
              iletmek için bu formu kullanabilirsiniz. Bildiriminiz kayıt altına alınır; gerekli
              inceleme yapılır ve uygun görüldüğünde tarafınıza dönüş sağlanabilir.
            </p>
          </header>

          <FirmComplaintForm firms={firms} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
