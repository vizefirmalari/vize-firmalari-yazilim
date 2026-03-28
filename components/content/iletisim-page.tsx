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
const noticeBox =
  "mt-6 rounded-xl border border-primary/15 bg-surface/80 p-5 text-sm leading-relaxed text-foreground/85 sm:p-6 sm:text-base";

export function IletisimPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Yardım · Destek
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              İletişim
            </h1>
            <p className={p}>
              Vize Firmaları ekibi olarak platformu kullanırken yaşadığınız sorunlarda yanınızda olmak
              isteriz. Teknik aksaklıklar, hesapla ilgili durumlar veya siteyi ilgilendiren sorularınız
              için bizimle iletişime geçebilirsiniz.
            </p>
          </header>

          <div className={noticeBox} role="note" aria-label="Önemli bilgi">
            <p className="m-0 font-semibold text-foreground">
              Önce okuyun: Platformun sınırı
            </p>
            <p className="mt-3 text-foreground/85">
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Mesleki vize danışmanlığı sunmuyor, başvurunuzu işleme almıyor veya
              sonuçlandırmıyoruz. Bu anlamda <strong className="font-semibold text-foreground">platform
              hizmet sağlamaz</strong>; yalnızca firmaları listeler ve karşılaştırmanıza ortam hazırlar.
            </p>
          </div>

          <section aria-labelledby="il-ne-zaman" className="mt-10">
            <h2 id="il-ne-zaman" className={h2First}>
              Ne zaman bize yazmalısınız?
            </h2>
            <p className={p}>
              Aşağıdaki konularda e-posta ile bize ulaşmanız doğru kanaldır:
            </p>
            <ul className={ul}>
              <li>Site açılmıyor, yavaş çalışıyor veya teknik hata alıyorsanız;</li>
              <li>Hesabınızla giriş, doğrulama veya platform özellikleriyle ilgili sorun yaşıyorsanız;</li>
              <li>Yanıltıcı içerik, hukuka aykırı paylaşım veya platform kurallarına aykırı bir durum
              bildirmek istiyorsanız;</li>
              <li>Platformun nasıl çalıştığı, listeleme veya genel kurallar hakkında netleştirmek
              istediğiniz bir sorunuz varsa.</li>
            </ul>
          </section>

          <section aria-labelledby="il-ne-zaman-degil">
            <h2 id="il-ne-zaman-degil" className={h2Next}>
              Ne zaman bize yazmamanız gerekir?
            </h2>
            <p className={p}>
              Aşağıdaki talepler için lütfen platformu değil, ilgili firmayı veya resmi kurumları
              adresleyin — böylece hem süreç hızlanır hem de yanlış beklenti oluşmaz:
            </p>
            <ul className={ul}>
              <li>Vize başvurunuzun sonucu, süresi veya ret/gerekçe soruları;</li>
              <li>Dosya hazırlığı, danışmanlık ücreti veya mesleki tavsiye talepleri;</li>
              <li>Listelenen bir firmanın size sunduğu hizmete ilişmemiş şikâyetler (bunlar için doğrudan
              firma ile görüşülmelidir).</li>
            </ul>
          </section>

          <section aria-labelledby="il-yonlendirme">
            <h2 id="il-yonlendirme" className={h2Next}>
              Vize hizmeti için doğru adres
            </h2>
            <p className={p}>
              Başvuru süreci, danışmanlık veya belge desteği ihtiyacınız varsa{" "}
              <strong className="font-semibold text-foreground">firmalarla doğrudan iletişime
              geçmelisiniz</strong>. Platform, firmaların iletişim bilgilerini ve profillerini
              listeler; sözleşme, ücret ve hizmet kalitesi tamamen sizin ile firma aranızdadır.
            </p>
            <p className={p}>
              Ana sayfadan firma arayabilir, profilleri inceleyebilir ve uygun gördüğünüz işletmenin
              sayfasındaki iletişim seçeneklerini kullanabilirsiniz.
            </p>
          </section>

          <section aria-labelledby="il-kanal">
            <h2 id="il-kanal" className={h2Next}>
              İletişim kanalı
            </h2>
            <div className="mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
              <p className="m-0 text-sm font-medium text-foreground/70">E-posta</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-block text-lg font-semibold text-secondary underline-offset-4 transition hover:underline sm:text-xl"
              >
                {CONTACT_EMAIL}
              </a>
              <p className={`${p} mb-0 mt-4 text-foreground/75`}>
                Mesajınızda mümkünse konu başlığında talebin türünü belirtin (ör. &quot;teknik sorun&quot;,
                &quot;hesap&quot;, &quot;içerik bildirimi&quot;). Talepler, iş yüküne bağlı olarak genellikle{" "}
                <strong className="font-semibold text-foreground">birkaç iş günü içinde</strong> yanıtlanmaya
                çalışılır; acil hukuki süreler veya resmi başvurular için gerekli bilgileri e-postanızda
                özetlemeniz yanıt süresini kısaltır. Her mesaja anında dönüş garantisi verilemez.
              </p>
            </div>
            <p className={`${p} text-foreground/70`}>
              <strong className="font-semibold text-foreground/80">Adres:</strong> {PLATFORM_ADDRESS}
            </p>
          </section>

          <section aria-labelledby="il-hukuk">
            <h2 id="il-hukuk" className={h2Next}>
              Kısa hukuki not
            </h2>
            <p className={p}>
              Platform, sizin ile listelenen firmalar arasındaki yazışma, telefon veya yüz yüze
              görüşmeleri yönetmez; bu iletişimlerden ve firmaların verdiği hizmetlerden{" "}
              <strong className="font-semibold text-foreground">sorumlu tutulamaz</strong>. Ayrıntılı
              düzenlemeler için{" "}
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

          <section
            aria-labelledby="il-cta"
            className="mt-10 rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:p-8"
          >
            <h2 id="il-cta" className="text-lg font-bold tracking-tight text-primary sm:text-xl">
              Platformdan en iyi şekilde yararlanın
            </h2>
            <p className={`${p} mb-0`}>
              Firmaları karşılaştırın, profillerdeki bilgileri okuyun ve kararınızı kendi önceliklerinize
              göre verin. İlk kez mi kullanıyorsunuz?{" "}
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
              sayfaları sık sorulan sorulara hızlı cevap verir; birçok konuda e-posta beklemenize gerek
              kalmaz.
            </p>
            <p className={`${p} mb-0 mt-4`}>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface"
              >
                Firmalara göz at
              </Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
