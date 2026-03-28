import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const PLATFORM_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";
const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";

export function BilgiToplumuHizmetleriPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Şeffaflık · Yasal bilgilendirme
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Bilgi Toplumu Hizmetleri
            </h1>
            <p className={p}>
              Bu sayfa, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              tarafından sunulan <strong className="font-semibold text-foreground">bilgi toplumu
              hizmetleri</strong> kapsamında; platform kimliği, iletişim bilgileri, hizmetin niteliği
              ve yasal çerçeve hakkında zorunlu şeffaflık bilgilerini içerir. Metin,{" "}
              <strong className="font-semibold text-foreground">5651 sayılı Kanun kapsamında</strong>{" "}
              ve elektronik ticaretle ilgili düzenlemelerin bilgilendirme beklentileri dikkate alınarak
              hazırlanmıştır.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Mesleki vize danışmanlığı sunmaz, başvuru işlemi yürütmez ve
              listelenen hizmetlerin satıcısı veya doğrudan sağlayıcısı olarak hareket etmez.
            </p>
          </header>

          <section aria-labelledby="bth1" className="mt-10">
            <h2 id="bth1" className={h2First}>
              1. Hizmet sağlayıcı kimliği ve iletişim
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Ticari unvan / platform adı:</strong>{" "}
              Vize Firmaları
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong> {PLATFORM_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">E-posta (resmi iletişim):</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className={p}>
              Talepler, bildirimler, şikâyetler ve genel sorular için öncelikli iletişim kanalı
              yukarıdaki e-posta adresidir. İletişim, bu kanal üzerinden kayda geçirilebilir ve
              yanıtlanır.
            </p>
          </section>

          <section aria-labelledby="bth2">
            <h2 id="bth2" className={h2Next}>
              2. Sunulan hizmetin kapsamı
            </h2>
            <p className={p}>
              Vize Firmaları, dijital ortamda <strong className="font-semibold text-foreground">bilgi
              toplumu hizmetleri</strong> sunar. Platformun işlevi özetle şunlardır:
            </p>
            <ul className={ul}>
              <li>Vize danışmanlığı veya ilgili alanlarda faaliyet gösteren firmaların listelenmesi;</li>
              <li>Firmalar tarafından sağlanan bilgilerin kullanıcıya sunulması ve görüntülenmesi;</li>
              <li>Kullanıcıların firmaları karşılaştırması ve araştırma yapmasına imkân verilmesi.</li>
            </ul>
            <p className={p}>
              Platform, <strong className="font-semibold text-foreground">herhangi bir sonuç veya
              başarı taahhüdü vermez</strong>; kullanıcılara özel, bağlayıcı bir hizmet taahhüdü
              (örneğin belirli bir vizenin onanacağına ilişkin garanti) içermez. Hizmet, erişilebilir
              olduğu sürece dijital listeleme ve bilgilendirme altyapısının sağlanmasıyla sınırlıdır.
            </p>
          </section>

          <section aria-labelledby="bth3">
            <h2 id="bth3" className={h2Next}>
              3. Aracı rol ve sınırlar
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Platform:
            </p>
            <ul className={ul}>
              <li>Vize danışmanlığı hizmeti vermez;</li>
              <li>Resmi veya özel başvuruları kullanıcı adına işlemez veya sonuçlandırmaz;</li>
              <li>Listelenen mesleki hizmetlerin satıcısı, doğrudan sözleşme tarafı veya bu hizmetlerin
              yerine getiricisi olarak konumlanmaz.</li>
            </ul>
            <p className={p}>
              Yürürlükteki mevzuat ve sözleşmelerle uyumlu olmak kaydıyla, Platform&apos;un rolü teknik
              ve organizasyonel olarak listeleme ile karşılaştırma imkânı sağlamaktan ibarettir.
            </p>
          </section>

          <section aria-labelledby="bth4">
            <h2 id="bth4" className={h2Next}>
              4. Üçüncü taraf firmalar ve sorumluluk ayrımı
            </h2>
            <p className={p}>
              Listede yer alan tüm firmalar, Platform&apos;dan bağımsız{" "}
              <strong className="font-semibold text-foreground">
                üçüncü taraf hizmet sağlayıcılarıdır
              </strong>
              . Platform, bu firmaların kendi beyanları ve içerikleri doğrultusunda bilgi
              yayımlayabilir; içeriğin asıl sorumlusu ilgili firmadır.
            </p>
            <p className={p}>
              Vize Firmaları aşağıdaki konularda <strong className="font-semibold text-foreground">
              doğrudan sorumlu tutulamaz</strong>:
            </p>
            <ul className={ul}>
              <li>Firmaların eylem ve ihmalleri;</li>
              <li>Sunulan danışmanlık veya diğer hizmetlerin sonuçları, kalitesi veya zamanlaması;</li>
              <li>Kullanıcı ile firma arasında kurulan her türlü ilişki, anlaşma veya uyuşmazlık.</li>
            </ul>
          </section>

          <section aria-labelledby="bth5">
            <h2 id="bth5" className={h2Next}>
              5. Kullanıcı yükümlülükleri
            </h2>
            <p className={p}>
              Kullanıcılar, Platform&apos;da görünen bilgileri <strong className="font-semibold text-foreground">
              kendi sorumluluklarında doğrulamalıdır</strong>. Karar vermeden önce resmi kaynakları,
              firma ile doğrudan iletişimi ve gerektiğinde bağımsız uzman görüşünü değerlendirmeleri
              önerilir. Platformu kullanmak, kullanıcının bu bilinçle hareket ettiğini ifade eder;
              yanlış veya eksik bilgiye dayalı riskler, ilgili mevzuat ve sözleşmeler çerçevesinde
              kullanıcıda kalır.
            </p>
          </section>

          <section aria-labelledby="bth6">
            <h2 id="bth6" className={h2Next}>
              6. Firmaların yükümlülükleri
            </h2>
            <p className={p}>
              Listelenen firmalar; sundukları hizmetler, Platform&apos;a veya kullanıcılara ilettikleri
              bilgilerin doğruluğu, güncelliği ve yasalara uygunluğu ile kullanıcılarla kurdukları
              iletişimden <strong className="font-semibold text-foreground">bizzat sorumludur</strong>.
              Yanıltıcı beyan, lisans veya yetki ihlali gibi durumlarda sorumluluk öncelikle ilgili
              firmaya aittir.
            </p>
          </section>

          <section aria-labelledby="bth7">
            <h2 id="bth7" className={h2Next}>
              7. Yasal çerçeve
            </h2>
            <p className={p}>
              İnternet ortamında yapılan yayınlar ve erişim sağlayıcı / aracı hizmetlere ilişkin
              düzenlemeler başta olmak üzere, <strong className="font-semibold text-foreground">5651
              sayılı Kanun kapsamında</strong> yürürlükteki kurallar ile{" "}
              <strong className="font-semibold text-foreground">elektronik ticarete ilişkin mevzuat</strong>{" "}
              (örneğin 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili ikincil
              düzenlemeler) bilgi toplumu hizmetleri ve tüketici bilgilendirmesi açısından dikkate
              alınır. Bu sayfa, zorunlu şeffaflık bilgilerini sunmak amacıyla hazırlanmış olup; ayrıntılı
              hukuki ilişkiler için{" "}
              <Link
                href="/kullanim-kosullari"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Kullanım Koşulları
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
              gibi metinlerle birlikte okunmalıdır.
            </p>
          </section>

          <section aria-labelledby="bth8">
            <h2 id="bth8" className={h2Next}>
              8. Bildirim ve iletişim usulü
            </h2>
            <p className={p}>
              Platform ile ilgili talep, şikâyet ve hukuki bildirimlerde resmi yazışma kanalı{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresidir. Gönderilerin konu başlığında talebin türünün (ör. bilgi talebi, içerik bildirimi)
              açıkça belirtilmesi süreçlerin hızlanmasına yardımcı olur. 5651 sayılı Kanun ve ilgili
              mevzuat kapsamında öngörülen özel usuller (örneğin belirli içerik veya erişim engelleme
              talepleri) saklıdır; bu tür taleplerde yasal şartların karşılanması gerekir.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
