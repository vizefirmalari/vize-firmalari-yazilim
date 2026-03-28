import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const CONTACT_EMAIL = "iletisim@vizefirmalari.com";
const PLATFORM_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";

export function KurumsalSitePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Kurumsal
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Kurumsal Site
            </h1>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları</strong>, Türkiye&apos;de{" "}
              <strong className="font-semibold text-foreground">vize firmaları</strong> ekosistemini
              dijital ortamda düzenli ve erişilebilir kılmayı hedefleyen bir{" "}
              <strong className="font-semibold text-foreground">vize danışmanlık platformu</strong> altyapısıdır.
              Kullanıcıların güvenilir bilgiye ulaşmasını, firmaların ise görünür ve ölçülebilir biçimde
              sunulmasını amaçlarız.
            </p>
            <p className={p}>
              Platform; dağınık bilgiyi tek çatı altında toplayarak <strong className="font-semibold text-foreground">
              tarafsız ve karşılaştırılabilir bilgiler</strong> sunar ve böylece{" "}
              <strong className="font-semibold text-foreground">kullanıcıların bilinçli karar vermesine
              yardımcı olur</strong>.
            </p>
          </header>

          <section aria-labelledby="ks-misyon" className="mt-10">
            <h2 id="ks-misyon" className={h2First}>
              Misyonumuz
            </h2>
            <p className={p}>
              Uygun <strong className="font-semibold text-foreground">vize firmaları</strong> arasında
              seçim yapmayı kolaylaştırmak; listeleme, filtreleme ve{" "}
              <strong className="font-semibold text-foreground">vize karşılaştırma sistemi</strong> ile
              araştırma süresini kısaltmak. Yapılandırılmış içerik ve şeffaf sunum, pratik bir{" "}
              <strong className="font-semibold text-foreground">vize başvuru rehberi</strong> deneyimi
              sunmayı destekler — nihai karar her zaman kullanıcıdadır.
            </p>
          </section>

          <section aria-labelledby="ks-vizyon">
            <h2 id="ks-vizyon" className={h2Next}>
              Vizyonumuz
            </h2>
            <p className={p}>
              Alanında güvenilen bir <strong className="font-semibold text-foreground">vize danışmanlık
              platformu</strong> olmak; şeffaflığı artırmak ve kullanıcı ile firma arasında net, izlenebilir
              bir buluşma noktası sağlamak. Uzun vadede bilgi kalitesini ve kullanıcı memnuniyetini sürekli
              geliştirmeyi hedefleriz.
            </p>
          </section>

          <section aria-labelledby="ks-model">
            <h2 id="ks-model" className={h2Next}>
              İş modeli ve sorumluluk sınırı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Mesleki vize danışmanlığı vermez, başvuruları işleme almaz veya
              sonuçlandırmaz. Hizmet ifası ve müşteri ilişkisi listelenen işyerlerine aittir.{" "}
              <strong className="font-semibold text-foreground">Platform taraflar arasındaki ilişkiden
              sorumlu değildir</strong>; anlaşmalar, ücretler ve hizmet sonuçları münhasıran ilgili
              tarafların sorumluluğundadır.
            </p>
          </section>

          <section aria-labelledby="ks-sistem">
            <h2 id="ks-sistem" className={h2Next}>
              Sistem yapısı
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Firma profilleri:</strong> Üye işyerleri
                bilgilerini, hizmet alanlarını ve iletişim kanallarını platform standartlarına uygun şekilde
                sunar.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kullanıcı gezintisi:</strong> Ziyaretçiler{" "}
                <strong className="font-semibold text-foreground">vize firmaları</strong> arasında arama
                yapar, profilleri inceler.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Karşılaştırma:</strong>{" "}
                <strong className="font-semibold text-foreground">Vize karşılaştırma sistemi</strong> ile
                seçenekler yan yana değerlendirilebilir.
              </li>
              <li>
                <strong className="font-semibold text-foreground">İletişim:</strong> İlgilenen kullanıcılar,
                tercih ettikleri firma ile doğrudan temas kurar; platform bu süreci teknik vitrin ile
                destekler.
              </li>
            </ul>
          </section>

          <section aria-labelledby="ks-deger">
            <h2 id="ks-deger" className={h2Next}>
              Kurumsal değerlerimiz
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Şeffaflık:</strong> Bilgilerin anlaşılır
                ve izlenebilir biçimde sunulması;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Güven:</strong> Kullanıcı ve iş ortakları
                için tutarlı süreçler;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Erişilebilirlik:</strong> Dijital kanaldan
                kolay ulaşılabilirlik ve mobil uyum;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Tarafsızlık:</strong> Listeleme ve
                karşılaştırma ortamının adil tutulması — <strong className="font-semibold text-foreground">
                tarafsız ve karşılaştırılabilir bilgiler</strong> ilkesi.
              </li>
            </ul>
          </section>

          <section aria-labelledby="ks-guven">
            <h2 id="ks-guven" className={h2Next}>
              Güven ve kalite
            </h2>
            <p className={p}>
              Düzenli liste yapısı, sınıflandırılmış bilgi ve karşılaştırma imkânı; kullanıcıların firmaları
              objektif kriterlerle değerlendirmesine yardımcı olur. Bu yapı, hem itibar hem de sürdürülebilir
              büyüme için kurumsal bir zemin oluşturur.
            </p>
          </section>

          <section aria-labelledby="ks-hukuk">
            <h2 id="ks-hukuk" className={h2Next}>
              Hukuki çerçeve (özet)
            </h2>
            <p className={p}>
              Platform; firmaların sunduğu hizmetlerden, kullanıcı–firma anlaşmalarından ve bunların
              sonuçlarından sorumlu tutulamaz. <strong className="font-semibold text-foreground">Platform
              taraflar arasındaki ilişkiden sorumlu değildir</strong>. Ayrıntılı düzenlemeler için{" "}
              <Link
                href="/kullanici-sozlesmesi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Kullanıcı Sözleşmesi
              </Link>
              ,{" "}
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
              incelenebilir.
            </p>
          </section>

          <section aria-labelledby="ks-iletisim">
            <h2 id="ks-iletisim" className={h2Next}>
              İletişim ve merkez
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Adres:</strong> {PLATFORM_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">E-posta:</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className={p}>
              Kurumsal sorular ve iş birliği için{" "}
              <Link href="/iletisim" className="font-medium text-secondary underline-offset-2 hover:underline">
                İletişim
              </Link>{" "}
              sayfamızı da kullanabilirsiniz.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
