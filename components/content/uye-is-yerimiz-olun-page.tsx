import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";
const noticeBox =
  "mt-6 rounded-xl border border-primary/15 bg-surface/80 p-5 text-sm leading-relaxed text-foreground/85 sm:p-6 sm:text-base";

export function UyeIsYerimizOlunPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Firma kaydı
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Üye İş Yerimiz Olun
            </h1>
            <p className={`${p} text-base sm:text-lg`}>
              İşinizi büyütün, daha fazla müşteriye ulaşın ve vize hizmeti arayan kullanıcılar tarafından
              keşfedilin. Vize Firmaları üzerinde yer alarak dijital vitrininizi açar, talepleri tek
              çatı altında toplarsınız.
            </p>
          </header>

          <section aria-labelledby="uy-ne" className="mt-10">
            <h2 id="uy-ne" className={h2First}>
              Bu sayfa kimin için?
            </h2>
            <p className={p}>
              Platforma katılmak isteyen <strong className="font-semibold text-foreground">vize
              danışmanlık firmaları</strong> ve vize süreçlerinde destek sunan hizmet sağlayıcıları
              içindir. Kayıt sonrası <strong className="font-semibold text-foreground">profilinizi
              oluşturun</strong>, hizmetlerinizi yayınlayın ve ilgilenen kullanıcılardan gelen talepleri{" "}
              <strong className="font-semibold text-foreground">doğrudan kullanıcı ile iletişim</strong>{" "}
              kurarak yönetirsiniz.
            </p>
          </section>

          <section aria-labelledby="uy-nasil">
            <h2 id="uy-nasil" className={h2Next}>
              Nasıl çalışır?
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
              <li>
                <strong className="font-semibold text-foreground">Hesap oluşturun</strong> — üyelik
                adımlarını tamamlayın.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Firma bilgilerinizi ekleyin</strong>{" "}
                — iletişim, adres ve kurumsal detaylar.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Hizmetlerinizi yayınlayın</strong> —{" "}
                sunduğunuz çözümleri net ve profesyonel şekilde tanıtın.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Talep alın</strong> — kullanıcılar
                sizi bulur; <strong className="font-semibold text-foreground">doğrudan kullanıcı ile
                iletişim</strong> kurarak süreci siz yürütürsünüz.
              </li>
            </ol>
          </section>

          <div className={noticeBox} role="note">
            <p className="m-0 font-semibold text-foreground">
              Platformun rolü
            </p>
            <p className="mt-3 text-foreground/85">
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Mesleki vize danışmanlığı sunmaz; müşteri ilişkisine müdahale etmez
              ve sözleşme taraflarından biri değildir. Size görünürlük ve bağlantı imkânı sağlarız;
              hizmeti ve iletişimi siz yönetirsiniz.
            </p>
          </div>

          <section aria-labelledby="uy-fayda">
            <h2 id="uy-fayda" className={h2Next}>
              Neden şimdi katılmalısınız?
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Daha fazla görünürlük</strong> — vize
                arayan niyetli kitleye açılırsınız;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Doğrudan temas</strong> — talepler
                size ulaşır, pazarlık ve kapanış sizin kontrolünüzdedir;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Profesyonel firma sayfası</strong> — tek
                linkte kurumsal kimliğiniz;
              </li>
              <li>
                <strong className="font-semibold text-foreground">SEO fırsatı</strong> — arama motorlarında
                keşfedilme potansiyeli;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kullanıcı güveni</strong> — şeffaf
                listeleme ve karşılaştırma ortamı.
              </li>
            </ul>
          </section>

          <section aria-labelledby="uy-kim">
            <h2 id="uy-kim" className={h2Next}>
              Kimler başvurmalı?
            </h2>
            <p className={p}>
              Vize ve ikamet danışmanlığı veren ofisler, başvuru süreçlerinde danışmanlık veya operasyonel
              destek sunan işletmeler ve ilgili hizmet sağlayıcıları platforma uyumludur. Hizmetinizi
              yasal çerçevede sunduğunuzdan emin olun.
            </p>
          </section>

          <section aria-labelledby="uy-sorumlu">
            <h2 id="uy-sorumlu" className={h2Next}>
              Firma sorumluluğu
            </h2>
            <p className={p}>
              Listelenen bilgilerin doğruluğu, sunduğunuz hizmetlerin niteliği ve kullanıcılarla
              kurduğunuz iletişim <strong className="font-semibold text-foreground">tamamen firmanıza
              aittir</strong>. Profilinizi güncel ve yanıltıcı olmayan şekilde tutmanız beklenir.
            </p>
          </section>

          <section aria-labelledby="uy-hukuk">
            <h2 id="uy-hukuk" className={h2Next}>
              Yasal sınır
            </h2>
            <p className={p}>
              Platform; sizin ile kullanıcılar arasındaki anlaşmalardan, hizmet sonuçlarından ve
              olası uyuşmazlıklardan <strong className="font-semibold text-foreground">sorumlu
              değildir</strong>. Ayrıntılar için{" "}
              <Link
                href="/hizmet-kosullari"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Hizmet Koşulları
              </Link>{" "}
              ve{" "}
              <Link
                href="/sorumluluk-reddi-beyani"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Sorumluluk Reddi Beyanı
              </Link>{" "}
              geçerlidir. Sorularınız:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section
            aria-labelledby="uy-cta"
            className="mt-10 rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:p-8"
          >
            <h2 id="uy-cta" className="text-lg font-bold tracking-tight text-primary sm:text-xl">
              Hemen başlayın
            </h2>
            <p className={`${p} mb-0`}>
              Birkaç adımda <strong className="font-semibold text-foreground">profilinizi oluşturun</strong>,
              yayına alın ve müşteri taleplerini almaya başlayın.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/firma-ekle"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Kayıt ol — firma ekle
              </Link>
              <Link
                href="/is-ortagimiz-olun"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface"
              >
                İş ortaklığı hakkında
              </Link>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
