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

export function IsOrtagimizOlunPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Firmalar için
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              İş Ortağımız Olun
            </h1>
            <p className={`${p} text-base sm:text-lg`}>
              İşinizi büyütün, daha fazla danışan adayına ulaşın ve dijitalde{" "}
              <strong className="font-semibold text-foreground">görünürlüğünüzü artırın</strong>. Vize
              Firmaları, vize danışmanlığı arayan kullanıcılarla sizi buluşturan; listeleme ve
              karşılaştırma odaklı bir vitrin sunar — böylece hem markanız görünür olur hem de{" "}
              <strong className="font-semibold text-foreground">doğrudan müşteri ile iletişim</strong>{" "}
              kurma şansınız artar.
            </p>
          </header>

          <section aria-labelledby="io-deger" className="mt-10">
            <h2 id="io-deger" className={h2First}>
              Size ne kazandırır?
            </h2>
            <p className={p}>
              Platform, &quot;vize danışmanlığı&quot; arayan <strong className="font-semibold text-foreground">
              hedefli kullanıcı trafiği</strong> getirir. Profilinizle hizmetlerinizi düzenli ve
              profesyonel biçimde sergilersiniz; kullanıcılar firmaları yan yana gördüğünde güven
              duygusu ve karar kolaylığı oluşur. Güçlü bir profil sayfası, arama motorlarında da
              keşfedilmenize yardımcı olabilecek <strong className="font-semibold text-foreground">SEO
              avantajı</strong> sağlayabilir.
            </p>
          </section>

          <section aria-labelledby="io-nasil">
            <h2 id="io-nasil" className={h2Next}>
              Nasıl çalışır?
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
              <li>
                <strong className="font-semibold text-foreground">Kayıt ve profil:</strong> Firmanız
                için profil oluşturur, iletişim ve hizmet bilgilerinizi eklersiniz.
              </li>
              <li>
                <strong className="font-semibold text-foreground">İçerik:</strong> Sunduğunuz
                hizmetleri, uzmanlık alanlarınızı ve kullanıcıya faydalı bilgileri profesyonel şekilde
                sunarsınız.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Keşif ve karşılaştırma:</strong>{" "}
                Kullanıcılar listelerde sizi bulur, diğer firmalarla kıyaslar.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Temas:</strong> İlgilenen kullanıcılar{" "}
                <strong className="font-semibold text-foreground">doğrudan müşteri ile iletişim</strong>{" "}
                kurmak üzere sizin belirlediğiniz kanallar üzerinden size ulaşır.
              </li>
            </ol>
          </section>

          <div className={noticeBox} role="note">
            <p className="m-0 font-semibold text-foreground">
              Net konumlandırma
            </p>
            <p className="mt-3 text-foreground/85">
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Müşteri ilişkisine müdahale etmez; sözleşme, ücretlendirme ve
              hizmet kalitesi tamamen sizin kontrolünüzdür. Platform; <strong className="font-semibold text-foreground">
              görünürlük ve bağlantı</strong> sağlar — danışmanlığı siz verirsiniz.
            </p>
          </div>

          <section aria-labelledby="io-fayda">
            <h2 id="io-fayda" className={h2Next}>
              Öne çıkan faydalar
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Daha fazla müşteri</strong> potansiyeli
                — niyeti yüksek kullanıcılarla eşleşme;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Hedefli görünürlük</strong> — arama ve
                listeleme ile doğru kitleye çıkma;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Profesyonel profil sayfası</strong> — tek
                adreste kurumsal sunum;
              </li>
              <li>
                <strong className="font-semibold text-foreground">SEO avantajı</strong> — indekslenebilir
                profil ile çevrim içi keşfedilirlik;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kullanıcı güveni</strong> — şeffaf,
                karşılaştırılabilir liste yapısı.
              </li>
            </ul>
          </section>

          <section aria-labelledby="io-guven">
            <h2 id="io-guven" className={h2Next}>
              Güven ve şeffaflık
            </h2>
            <p className={p}>
              Düzenli liste yapısı ve karşılaştırma imkânı, kullanıcıların bilinçli seçim yapmasını
              kolaylaştırır. Şeffaf bilgi sunan firmalar, uzun vadede itibar kazanır. Platform,
              kullanıcıların firmaları adil biçimde değerlendirmesine zemin hazırlar.
            </p>
          </section>

          <section aria-labelledby="io-sorumluluk">
            <h2 id="io-sorumluluk" className={h2Next}>
              Firma sorumluluğu
            </h2>
            <p className={p}>
              Hizmetlerinizin niteliği, yasal uygunluk, müşteri iletişimi ve profilde paylaştığınız
              bilgilerin doğruluğu <strong className="font-semibold text-foreground">firmanıza aittir</strong>.
              Yanıtları, teklifleri ve süreç yönetimini siz yürütürsünüz.
            </p>
          </section>

          <section aria-labelledby="io-hukuk">
            <h2 id="io-hukuk" className={h2Next}>
              Hukuki çerçeve (özet)
            </h2>
            <p className={p}>
              Platform; sizin ile müşterileriniz arasında kurulan anlaşmalardan ve hizmet
              sonuçlarından <strong className="font-semibold text-foreground">sorumlu değildir</strong>.{" "}
              Ayrıntılar için{" "}
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
              incelenebilir. İş birliği veya listeleme koşulları hakkında sorularınız için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresinden bize yazabilirsiniz.
            </p>
          </section>

          <section
            aria-labelledby="io-cta"
            className="mt-10 rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:p-8"
          >
            <h2 id="io-cta" className="text-lg font-bold tracking-tight text-primary sm:text-xl">
              Bugün listeye katılın
            </h2>
            <p className={`${p} mb-0`}>
              İşinizi büyütmek ve <strong className="font-semibold text-foreground">görünürlüğünüzü
              artırmak</strong> için hemen kayıt sürecini başlatın. Birkaç adımda profilinizi oluşturun,
              hedef kitleye açılın.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/firma-ekle"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Üye iş yeri olarak kayıt ol
              </Link>
              <Link
                href="/hakkimizda"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface"
              >
                Platformu tanıyın
              </Link>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
