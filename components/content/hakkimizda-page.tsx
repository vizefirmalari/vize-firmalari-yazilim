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

export function HakkimizdaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Vize Firmaları
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Hakkımızda
            </h1>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları</strong>,{" "}
              <strong className="font-semibold text-foreground">vize danışmanlık firmaları</strong> arasında
              seçim yapmanızı kolaylaştırmak için tasarlanmış bir dijital platformdur.{" "}
              <strong className="font-semibold text-foreground">Vize başvurusu</strong> sürecinde doğru
              adresi bulmak, farklı seçenekleri yan yana görmek ve{" "}
              <strong className="font-semibold text-foreground">vize firması karşılaştırma</strong>{" "}
              yapmak isteyen kullanıcılara yönelik <strong className="font-semibold text-foreground">
              şeffaf ve karşılaştırılabilir bilgiler</strong> sunmayı hedefleriz.
            </p>
            <p className={p}>
              Amacımız; dağınık bilgiyi tek bir yerde toplayarak karar sürecinizi sadeleştirmektir.{" "}
              <strong className="font-semibold text-foreground">Vize Firmaları, kullanıcıların bilinçli
              karar vermesine yardımcı olur</strong>; tarafsız bir listeleme ve rehberlik alanı olarak
              konumlanır — sizin için uygun firmayı bulmanıza destek olur, nihai tercihi ise size
              bırakır.
            </p>
          </header>

          <section aria-labelledby="hk-misyon" className="mt-10">
            <h2 id="hk-misyon" className={h2First}>
              Misyonumuz
            </h2>
            <p className={p}>
              Vize ve ikamet gibi konularda profesyonel destek arayan kişilerin, güvenilir{" "}
              <strong className="font-semibold text-foreground">vize danışmanlık firmaları</strong> ile
              buluşmasını kolaylaştırmak istiyoruz. Profiller, filtreler ve düzenli sunum ile{" "}
              <strong className="font-semibold text-foreground">vize rehberi</strong> niteliğinde yapılandırılmış
              içerik sunarak; hem araştırma süresini kısaltmayı hem de yan yana değerlendirme yapmayı
              mümkün kılıyoruz.
            </p>
          </section>

          <section aria-labelledby="hk-rol">
            <h2 id="hk-rol" className={h2Next}>
              Platformun rolü
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Mesleki vize danışmanlığı vermiyor, başvurunuzu sizin adınıza
              yürütmüyor veya resmi makamlar nezdinde işlem yapmıyoruz. Yaptığımız şey; firmaların
              kendi verdikleri bilgileri listeleyerek size <strong className="font-semibold text-foreground">
              vize firması karşılaştırma</strong> ortamı sağlamaktır.
            </p>
            <p className={p}>
              Böylece tarafsız ve kullanışlı bir vitrin sunarken, mesleki sorumluluğu listelenen
              firmalarda bırakıyoruz. <strong className="font-semibold text-foreground">Platform taraflar
              arasındaki ilişkiden sorumlu değildir</strong>; sizinle firma arasında kurulan iletişim,
              anlaşma veya hizmet sonuçları doğrudan ilgili tarafların sorumluluğundadır.
            </p>
          </section>

          <section aria-labelledby="hk-nasil">
            <h2 id="hk-nasil" className={h2Next}>
              Nasıl çalışır?
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Üye işyerleri</strong> profillerini
                oluşturur; hizmet alanları, iletişim ve sundukları bilgileri kendileri paylaşır.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Siz</strong> firmaları gezer,
                filtreler ve profiller üzerinden <strong className="font-semibold text-foreground">vize
                firması karşılaştırma</strong> yaparsınız.
              </li>
              <li>
                İletişimi çoğu durumda <strong className="font-semibold text-foreground">doğrudan firma
                ile</strong> kurarsınız; Platform, listeleme ve yönlendirme düzeyinde kalır.
              </li>
              <li>
                <Link
                  href="/yardim-merkezi"
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  Yardım Merkezi
                </Link>{" "}
                ve{" "}
                <Link
                  href="/sss-ve-islem-rehberi"
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  S.S.S. ve İşlem Rehberi
                </Link>{" "}
                ile platformu daha verimli kullanmanıza destek oluruz.
              </li>
            </ul>
          </section>

          <section aria-labelledby="hk-guven">
            <h2 id="hk-guven" className={h2Next}>
              Güven ve şeffaflık
            </h2>
            <p className={p}>
              Bilgilerin mümkün olduğunca anlaşılır ve <strong className="font-semibold text-foreground">
              şeffaf ve karşılaştırılabilir bilgiler</strong> biçiminde sunulması için çalışıyoruz.
              Karşılaştırma imkânı gereksiz belirsizliği azaltır; bu düzen,{" "}
              <strong className="font-semibold text-foreground">kullanıcıların bilinçli karar vermesine
              yardımcı olur</strong>. Yine de listelenen içeriklerin kaynağı firmalardır; güncellik ve
              doğruluk için ek doğrulama adımlarını sizin atmanızı öneririz.
            </p>
          </section>

          <section aria-labelledby="hk-kullanici">
            <h2 id="hk-kullanici" className={h2Next}>
              Kullanıcı sorumluluğu
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize başvurusu</strong> ve danışmanlık
              kararları yalnızca size aittir. Firmaların profillerini, referanslarını ve iletişim
              bilgilerini kendi riskinizle değerlendirmeli; önemli taahhütler öncesinde yazılı teyit
              almanızı tavsiye ederiz. Platform, seçiminizi kolaylaştırır; nihai değerlendirme sizindir.
            </p>
          </section>

          <section aria-labelledby="hk-firma">
            <h2 id="hk-firma" className={h2Next}>
              Firma sorumluluğu
            </h2>
            <p className={p}>
              Listelenen her firma, profilinde yer alan bilgilerin doğruluğu ve sunduğu hizmetlerin
              niteliği konusunda kendi adına sorumludur. Platform, firma içeriğini düzenli biçimde
              denetlemekle birlikte her beyanı birebir doğrulamak zorunda değildir.
            </p>
          </section>

          <section aria-labelledby="hk-vizyon">
            <h2 id="hk-vizyon" className={h2Next}>
              Vizyonumuz
            </h2>
            <p className={p}>
              Türkiye&apos;de <strong className="font-semibold text-foreground">vize danışmanlık
              firmaları</strong> alanında güvenilir bir karşılaştırma adresi olmak; bilgiye erişimi
              kolaylaştırmak ve karar sürecinizi desteklemek istiyoruz. Ürün ve içerikleri geliştirerek
              hem kullanıcı deneyimini hem de <strong className="font-semibold text-foreground">vize
              rehberi</strong> kalitesini artırmayı hedefliyoruz.
            </p>
          </section>

          <section aria-labelledby="hk-hukuk">
            <h2 id="hk-hukuk" className={h2Next}>
              Hukuki konum (kısa özet)
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Firma hizmetlerinden doğan sonuçlar, ücretler veya anlaşmazlıklar
              konusunda sorumluluk kabul etmeyiz. <strong className="font-semibold text-foreground">Platform
              taraflar arasındaki ilişkiden sorumlu değildir</strong>. Ayrıntılar için{" "}
              <Link
                href="/kullanici-sozlesmesi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Kullanıcı Sözleşmesi
              </Link>{" "}
              ve{" "}
              <Link
                href="/sorumluluk-reddi-beyani"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Sorumluluk Reddi Beyanı
              </Link>{" "}
              sayfalarına bakabilirsiniz.
            </p>
          </section>

          <section aria-labelledby="hk-iletisim">
            <h2 id="hk-iletisim" className={h2Next}>
              Bize ulaşın
            </h2>
            <p className={p}>
              Öneri, iş birliği veya platform hakkında sorularınız için{" "}
              <Link href="/iletisim" className="font-medium text-secondary underline-offset-2 hover:underline">
                İletişim
              </Link>{" "}
              sayfamızı kullanabilir veya{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresinden yazabilirsiniz.
            </p>
            <p className={`${p} text-foreground/70`}>
              <strong className="font-semibold text-foreground/80">Adres:</strong> {PLATFORM_ADDRESS}
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
