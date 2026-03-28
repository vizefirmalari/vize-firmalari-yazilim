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

export function KariyerPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              İnsan kaynakları
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Kariyer
            </h1>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları</strong> olarak sürekli
              gelişen bir <strong className="font-semibold text-foreground">yenilikçi platform</strong>{" "}
              inşa ediyoruz. Dijital ürün, veri ve kullanıcı deneyimini merkeze alan bir ekiple, Türkiye
              genelinde anlamlı bir listeleme ve karşılaştırma hizmeti sunmayı hedefliyoruz. Yeni
              yeteneklere açığız; birlikte büyümek isteyen profesyonelleri tanımaktan memnuniyet duyarız.
            </p>
            <p className={`${p} text-foreground/75`}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>; mesleki vize danışmanlığı işletmecilik kapsamımızda değildir. Şirket
              olarak <strong className="font-semibold text-foreground">dijital bir sistem olarak</strong>{" "}
              listeleme altyapısını işletiriz — teknik, ürün ve operasyon rolleri bu çerçevede şekillenir.
            </p>
          </header>

          <section aria-labelledby="kr-neden" className="mt-10">
            <h2 id="kr-neden" className={h2First}>
              Neden biz?
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Dinamik ve gelişime açık yapı</strong>{" "}
              sunuyoruz: öğrenmeye zaman ayıran, deneyim paylaşan ve fikri sahiplenen ekip üyeleriyle
              çalışmak istiyoruz. Dijital-öncelikli süreçler, uzaktan veya hibrit uyum ve ürünü gerçek
              kullanıcı ihtiyaçlarına göre şekillendirme fırsatı bir arada gelir.
            </p>
            <p className={p}>
              Binlerce kullanıcı ve iş ortağına dokunan bir <strong className="font-semibold text-foreground">
              yenilikçi platform</strong>da emeğinizin izini görebilirsiniz; bu da motivasyonu ve anlamı
              güçlendirir.
            </p>
          </section>

          <section aria-labelledby="kr-kultur">
            <h2 id="kr-kultur" className={h2Next}>
              Çalışma kültürü
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">İş birliği:</strong> disiplinler arası
                iletişim ve ortak hedefe odaklanma;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Şeffaflık:</strong> beklentilerin ve
                geri bildirimin açık konuşulduğu ortam;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Sürekli iyileştirme:</strong> ölçüm,
                geri bildirim ve iterasyon alışkanlığı;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kullanıcı odağı:</strong> hem son
                kullanıcı hem de iş ortağı deneyimini iyileştirmeye odaklı düşünme.
              </li>
            </ul>
          </section>

          <section aria-labelledby="kr-kim">
            <h2 id="kr-kim" className={h2Next}>
              Kimlerle çalışmak isteriz?
            </h2>
            <p className={p}>
              Motivasyonu yüksek, sorumluluk alan ve proaktif kişiler; ekip oyununda güçlenen, yapıcı
              geri bildirim verebilen profesyoneller. Teknik, tasarım, içerik, operasyon veya büyüme
              alanlarında deneyiminiz olsun ya da olmasın, öğrenme isteği ve değer uyumu bizim için
              kritiktir.
            </p>
          </section>

          <section aria-labelledby="kr-pozisyon">
            <h2 id="kr-pozisyon" className={h2Next}>
              Açık pozisyonlar
            </h2>
            <p className={p}>
              Güncel rol ilanları dönem dönem değişebilir; bu sayfada her zaman tüm açıkları
              listeleyemeyebiliriz. Yine de profilinizin bize uygun olabileceğini düşünüyorsanız{" "}
              <strong className="font-semibold text-foreground">açık bir ilan görmeseniz bile</strong>{" "}
              özgeçmişinizi göndermenizi teşvik ederiz. Uygun ekip ihtiyacı oluştuğunda sizinle iletişime
              geçmek isteriz.
            </p>
          </section>

          <section aria-labelledby="kr-basvuru">
            <h2 id="kr-basvuru" className={h2Next}>
              Başvuru süreci
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
              <li>
                Güncel özgeçmişinizi ve — varsa — portföy veya LinkedIn bağlantınızı{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Kariyer%20Başvurusu`}
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                adresine e-posta ile iletin. Konu satırına &quot;Kariyer Başvurusu&quot; yazmanız yeterlidir.
              </li>
              <li>Başvurular belirli aralıklarla değerlendirilir; uygun adaylar ön görüşme için aranır veya yazılır.</li>
              <li>Süreç boyunca iletişim çoğunlukla e-posta üzerinden yürütülür; gizliliğinize saygı duyulur.</li>
            </ol>
          </section>

          <section aria-labelledby="kr-iletisim">
            <h2 id="kr-iletisim" className={h2Next}>
              İletişim
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">E-posta:</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong> {PLATFORM_ADDRESS}
            </p>
            <p className={p}>
              Genel sorular için{" "}
              <Link href="/iletisim" className="font-medium text-secondary underline-offset-2 hover:underline">
                İletişim
              </Link>{" "}
              sayfamızı kullanabilirsiniz.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
