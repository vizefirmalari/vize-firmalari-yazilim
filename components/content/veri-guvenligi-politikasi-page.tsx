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

export function VeriGuvenligiPolitikasiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              KVKK · Güvenlik
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Veri Güvenliği Politikası
            </h1>
            <p className={p}>
              Bu politika, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              (&quot;Platform&quot;) tarafından yürütülen <strong className="font-semibold text-foreground">
              veri güvenliği</strong> yaklaşımının genel çerçevesini açıklar. Kişisel verilerin
              korunmasına ilişkin ayrıntılı bilgiler için{" "}
              <strong className="font-semibold text-foreground">
                6698 sayılı Kişisel Verilerin Korunması Kanunu
              </strong>{" "}
              (&quot;KVKK&quot;) uyarınca hazırlanan{" "}
              <Link
                href="/aydinlatma-metni"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Aydınlatma Metni
              </Link>{" "}
              ve{" "}
              <Link
                href="/kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Gizlilik Politikası
              </Link>{" "}
              birlikte değerlendirilmelidir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>; listeleme ve karşılaştırma hizmeti sunar, mesleki vize danışmanlığı
              vermez. Bu politika, Platform altyapısı ve işletimi kapsamındaki güvenlik ilkelerini
              tanımlar; kullanıcı ile üçüncü taraf firmalar arasındaki doğrudan veri alışverişini
              kapsamaz.
            </p>
          </header>

          <section aria-labelledby="vgp1" className="mt-10">
            <h2 id="vgp1" className={h2First}>
              1. Veri sorumlusu ve iletişim
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Veri sorumlusu:</strong> Vize
              Firmaları
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong> {PLATFORM_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">İletişim:</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section aria-labelledby="vgp2">
            <h2 id="vgp2" className={h2Next}>
              2. Veri güvenliği ilkeleri
            </h2>
            <p className={p}>
              Platform, kişisel ve işletme verilerinin işlenmesinde aşağıdaki temel ilkeleri hedef
              alır:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Gizlilik:</strong> Yetkisiz kişi
                ve sistemlerin veriye erişmesinin önlenmesi;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Bütünlük:</strong> Verinin
                yetkisiz değiştirilmesinin, bozulmasının veya kaybının riskinin azaltılması;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Erişilebilirlik:</strong> Yetkili
                kullanıcılar ve süreçler için hizmetin makul düzeyde sürdürülebilir olması; bu ilke,
                güvenlik ile denge içinde yürütülür.
              </li>
            </ul>
          </section>

          <section aria-labelledby="vgp3">
            <h2 id="vgp3" className={h2Next}>
              3. Teknik ve idari tedbirler
            </h2>
            <p className={p}>
              KVKK ve ilgili düzenlemeler uyarınca, veri güvenliği için <strong className="font-semibold text-foreground">
              teknik ve idari tedbirler</strong> uygulanmaya çalışılır. Bunlar ortam ve teknoloji
              değiştikçe gözden geçirilebilir; aşağıdaki liste örnek niteliğindedir ve tüm önlemleri
              sınırlayıcı sayılmaz.
            </p>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.1. İdari tedbirler
            </h3>
            <ul className={ul}>
              <li>Erişim kontrolü ve yetkilendirme politikaları;</li>
              <li>Gerektiğinde sınırlı ve görev tanımına dayalı veri erişimi (asgari yetki ilkesi);</li>
              <li>İç süreçlerde kişisel verilerin işlenmesi, paylaşımı ve saklanmasına ilişkin kurallar;</li>
              <li>Farkındalık ve ihtiyaç duyulduğunda eğitim/iletişim çerçevesinde güvenlik bilinci.</li>
            </ul>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.2. Teknik tedbirler
            </h3>
            <ul className={ul}>
              <li>İletişimin şifrelenmesi için SSL/TLS gibi yaygın protokollerin kullanımı;</li>
              <li>Barındırma ve uygulama altyapısında güvenliği destekleyen hizmet sağlayıcı seçimi ve
              yapılandırma;</li>
              <li>Veritabanı ve uygulama katmanında yetkisiz erişime karşı makul koruma önlemleri;</li>
              <li>Önemli olayların tespitine yardımcı olabilecek erişim ve sistem günlükleri ile izleme
              araçları (kapsam, ürün ve sürüme bağlı olarak).</li>
            </ul>
            <p className={p}>
              Hiçbir teknik yapı kusursuz değildir; uygulanan önlemler sektör pratiği ve kaynaklar
              çerçevesinde <strong className="font-semibold text-foreground">makul</strong> düzeyde
              tasarlanır.
            </p>
          </section>

          <section aria-labelledby="vgp4">
            <h2 id="vgp4" className={h2Next}>
              4. Veri erişim kontrolü
            </h2>
            <p className={p}>
              Kişisel verilere erişim, esas itibarıyla <strong className="font-semibold text-foreground">
              yetkilendirilmiş personel</strong> ile ve <strong className="font-semibold text-foreground">
              rol tabanlı</strong> ihtiyaçlar doğrultusunda sınırlanır. &quot;Bilmesi gereken&quot;
              düzeyinde erişim ilkesi benimsenir; erişim hakları gereksiz yere genişletilmez ve
              düzenli aralıklarla gözden geçirilmesi hedeflenir.
            </p>
          </section>

          <section aria-labelledby="vgp5">
            <h2 id="vgp5" className={h2Next}>
              5. Veri ihlali yönetimi
            </h2>
            <p className={p}>
              Olası ihlallerin fark edilmesi için izleme, günlükleme ve iç süreçler kullanılır.
              Şüpheli veya teyit edilmiş bir ihlal durumunda iç değerlendirme, risk azaltma adımları
              ve yasal düzenlemelerde öngörülen süre ve koşullarda <strong className="font-semibold text-foreground">
              Kurul ve/veya ilgili kişilere bildirim</strong> gibi yükümlülükler değerlendirilir.
            </p>
            <p className={p}>
              Platform, siber tehdit ortamındaki gelişmeleri kontrol edemez; bu nedenle ihlal
              riskinin sıfıra indirilebileceği veya her olayın önceden engellenebileceği taahhüt
              edilmez. Aşağıdaki sorumluluk sınırlaması bölümü geçerlidir.
            </p>
          </section>

          <section aria-labelledby="vgp6">
            <h2 id="vgp6" className={h2Next}>
              6. Üçüncü taraf hizmetler ve altyapı
            </h2>
            <p className={p}>
              Platform; barındırma, veritabanı, kimlik doğrulama veya analitik gibi konularda{" "}
              <strong className="font-semibold text-foreground">üçüncü taraf bulut ve altyapı
              hizmetleri</strong> kullanabilir. Sözleşmesel ve teknik düzeyde makul güvenlik beklentileri
              gözetilir. Bununla birlikte bu tarafların kendi sistemlerinde meydana gelen olaylar,
              Platform&apos;un makul kontrolü dışında kaldığı ölçüde <strong className="font-semibold text-foreground">
              doğrudan sorumluluğu doğurmaz</strong>; kullanıcılar ilgili sağlayıcıların güvenlik ve
              gizlilik taahhütlerini ayrıca inceleyebilir.
            </p>
          </section>

          <section aria-labelledby="vgp7">
            <h2 id="vgp7" className={h2Next}>
              7. Kullanıcı yükümlülükleri
            </h2>
            <p className={p}>
              Kullanıcılar; hesap bilgilerini, şifrelerini ve cihazlarını korumakla yükümlüdür.
              Hassas kişisel verileri gereksiz yere paylaşmaktan kaçınmalı, halka açık kanallarda
              güvenli olmayan biçimde iletişim kurmamalıdır. Platform üzerinden veya Platform
              dışında firmalarla doğrudan paylaştığınız verilerin güvenliği <strong className="font-semibold text-foreground">
              öncelikle sizin ve ilgili firmanın sorumluluğundadır</strong>.
            </p>
          </section>

          <section aria-labelledby="vgp8">
            <h2 id="vgp8" className={h2Next}>
              8. Aracı platformun sınırı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Kullanıcı ile listelenen firmalar arasında e-posta, telefon,
              anlık mesaj veya yüz yüze görüşme gibi <strong className="font-semibold text-foreground">
              harici iletişim kanalları</strong> üzerinden gerçekleşen veri alışverişini Platform
              kontrol etmez ve bu kanallarda oluşan güvenlik risklerinden <strong className="font-semibold text-foreground">
              sorumlu tutulamaz</strong>. Firmalarla doğrudan paylaştığınız içerik ve kişisel veriler,
              ilgili firmanın politikalarına tabidir.
            </p>
          </section>

          <section aria-labelledby="vgp9">
            <h2 id="vgp9" className={h2Next}>
              9. Saklama ve silme güvenliği
            </h2>
            <p className={p}>
              Veriler, işleme amacının gerektirdiği süre boyunca <strong className="font-semibold text-foreground">
              güvenli ortamlarda saklanmaya çalışılır</strong>. Süre dolduğunda veya hukuki sebep
              kalktığında silme, yok etme veya teknik olarak mümkün olduğu ölçüde anonim hale getirme
              yöntemleri değerlendirilir. Ayrıntılı saklama süreleri Gizlilik Politikası ve ilgili
              iç metinlerde düzenlenir.
            </p>
          </section>

          <section aria-labelledby="vgp10">
            <h2 id="vgp10" className={h2Next}>
              10. Hukuki çerçeve
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                6698 sayılı Kişisel Verilerin Korunması Kanunu
              </strong>{" "}
              ve ikincil düzenlemeler, kişisel verilerin güvenliğinin sağlanmasına ilişkin yükümlülükleri
              düzenler. Platform, bu çerçevede <strong className="font-semibold text-foreground">veri
              güvenliği</strong> yükümlülüklerini yerine getirmeye çalışır; politika güncellemeleri
              mevzuat ve teknoloji gelişmelerine göre yapılabilir.
            </p>
          </section>

          <section aria-labelledby="vgp11">
            <h2 id="vgp11" className={h2Next}>
              11. Sorumluluk sınırı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform makul güvenlik önlemleri almakla yükümlüdür ancak mutlak güvenlik taahhüdü
                vermez
              </strong>
              . İnternet tabanlı sistemlerde <strong className="font-semibold text-foreground">mutlak
              güvenlik garanti edilemez</strong>. Buna bağlı olarak Platform; kontrolü dışında gelişen
              siber saldırılar, kullanıcı ihmali veya zayıf parola kullanımı, üçüncü taraf sistemlerindeki
              ihlaller veya mücbir sebep niteliğindeki olaylar nedeniyle oluşabilecek zararlardan,
              işbu politikanın amacı ve KVKK çerçevesinde <strong className="font-semibold text-foreground">
              sınırlı sorumluluk</strong> kabul eder. Ayrıntılı hukuki sınırlar için{" "}
              <Link
                href="/kullanim-kosullari"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Kullanım Koşulları
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
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
