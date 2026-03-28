import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const CONTROLLER_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";
const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";

export function CerezPolitikasiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              KVKK · Çerezler
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Çerez Politikası
            </h1>
            <p className={p}>
              Bu politika, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              (&quot;Platform&quot; / &quot;İşletmeci&quot;) tarafından işletilen web sitesi ve
              dijital hizmetlerde <strong className="font-semibold text-foreground">çerezler
              kullanılmaktadır</strong>. Çerez kullanımı,{" "}
              <strong className="font-semibold text-foreground">
                6698 sayılı Kişisel Verilerin Korunması Kanunu
              </strong>{" "}
              (&quot;KVKK&quot;) ve ilgili mevzuat çerçevesinde şeffaf biçimde açıklanır. Bu metin;{" "}
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
                Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik Politikası
              </Link>{" "}
              ile birlikte değerlendirilmelidir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              ; listeleme ve karşılaştırma imkânı sunar, mesleki vize danışmanlığı veya başvuru
              hizmeti vermez. Çerezler, <strong className="font-semibold text-foreground">
                vize danışmanlığı sağlamak amacıyla kullanılmaz
              </strong>
              ; yalnızca Platform&apos;un işletimi, güvenliği ve kullanıcı deneyiminin iyileştirilmesi
              ile sınırlı amaçlarla ilişkilidir.
            </p>
            <p className={p}>
              Zorunlu olmayan çerezler bakımından işleme,{" "}
              <strong className="font-semibold text-foreground">
                kullanıcı tercihleri doğrultusunda
              </strong>{" "}
              ve yürürlükteki düzenlemelere uygun şekilde (örneğin açık rıza veya sunulan tercih
              mekanizmaları üzerinden) yürütülür.
            </p>
          </header>

          <section aria-labelledby="cp1" className="mt-10">
            <h2 id="cp1" className={h2First}>
              1. Veri sorumlusu ve iletişim
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Veri sorumlusu:</strong> Vize
              Firmaları
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong>{" "}
              {CONTROLLER_ADDRESS}
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

          <section aria-labelledby="cp2">
            <h2 id="cp2" className={h2Next}>
              2. Çerez nedir?
            </h2>
            <p className={p}>
              Çerezler, ziyaret ettiğiniz web sitesi tarafından tarayıcınıza veya cihazınıza
              kaydedilen <strong className="font-semibold text-foreground">küçük metin
              dosyalarıdır</strong>. Sunucu veya üçüncü taraflar, oturumun sürmesi, tercihlerin
              hatırlanması veya kullanımın ölçülmesi gibi amaçlarla bu dosyaları okuyabilir. Çerezler,
              cihazınıza zarar vermez; ancak bazıları kişisel veri niteliğinde bilgi işleyebilir.
            </p>
            <p className={p}>
              Benzer teknolojiler (örneğin yerel depolama, oturum depolama veya piksel etiketleri)
              bu politikada &quot;çerez&quot; kavramıyla birlikte, aynı şeffaflık ve hukuki çerçeveyle
              değerlendirilebilir.
            </p>
          </section>

          <section aria-labelledby="cp3">
            <h2 id="cp3" className={h2Next}>
              3. Çerez türleri
            </h2>
            <p className={p}>
              Platform&apos;da kullanılan veya kullanılabilecek çerezler, işlevlerine göre aşağıdaki
              kategorilerde özetlenir. Gerçekte hangi çerezlerin aktif olduğu; teknik altyapı,
              sürüm ve <strong className="font-semibold text-foreground">kullanıcı tercihleri
              doğrultusunda</strong> değişebilir.
            </p>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.1. Zorunlu çerezler
            </h3>
            <p className={p}>
              Platform&apos;un temel işleyişi, güvenliği ve oturum yönetimi için gerekli çerezlerdir.
              Örnek amaçlar: oturumun sürdürülmesi, güvenlik kontrolleri, yük dengeleme, kötüye
              kullanımın önlenmesi. Bu çerezler olmadan bazı hizmetler düzgün sunulamayabilir.
            </p>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.2. Performans ve analitik çerezler
            </h3>
            <p className={p}>
              Ziyaret sayıları, sayfa görüntülemeleri, hata oranları ve benzeri özet istatistiklerin
              toplanması; hizmet kalitesinin ve performansının ölçülmesi ve iyileştirilmesi için
              kullanılır. Bu kategori, bireyi doğrudan tanımlamak zorunda olmayan teknik verilerle
              de sınırlı kalabilir; ancak bazı çözümlerde kişisel veri işlenmesi söz konusu olabilir.
            </p>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.3. Fonksiyonel çerezler
            </h3>
            <p className={p}>
              Dil tercihi, görünüm veya benzeri kullanıcı seçimlerinin hatırlanması gibi deneyimi
              kişiselleştiren işlevler için kullanılır. Bu çerezler, tercihlerinizi tekrar sormadan
              tutarlı bir kullanım sunmaya yardımcı olur.
            </p>

            <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
              3.4. Pazarlama / reklam çerezleri (uygulanabilir olduğu ölçüde)
            </h3>
            <p className={p}>
              Platform, <strong className="font-semibold text-foreground">şu an için</strong> her
              ziyaretçiye özel reklam profili oluşturmak veya geniş çaplı davranışsal reklam
              ağına bağlı pazarlama çerezleri kullanmak zorunda değildir. İleride üçüncü taraf
              reklam veya yeniden hedefleme araçları entegre edilirse, bu durum ayrıca
              duyurulur; yasal gerekliliklere uygun rıza veya tercih yönetimi sunulur ve kullanım
              bu politika ile uyumlu şekilde güncellenir. Böyle bir özellik yoksa, bu alt başlık
              yalnızca olası gelişmelere karşı çerçeve niteliğindedir.
            </p>
          </section>

          <section aria-labelledby="cp4">
            <h2 id="cp4" className={h2Next}>
              4. Çerezlerin kullanım amaçları
            </h2>
            <ul className={ul}>
              <li>Platform performansının ve kararlılığının iyileştirilmesi;</li>
              <li>Kullanıcı tercihlerinin hatırlanması ve kullanım kolaylığının artırılması;</li>
              <li>Kullanım davranışının özet düzeyde analiz edilmesi ve hizmet geliştirme;</li>
              <li>Oturum, kimlik doğrulama ve güvenlik süreçlerinin desteklenmesi;</li>
              <li>Yasal yükümlülüklerin yerine getirilmesine teknik destek (örneğin kayıt ve denetim
              gereksinimleri).</li>
            </ul>
            <p className={p}>
              Yukarıdaki amaçlar, <strong className="font-semibold text-foreground">vize
              danışmanlığı vermek, başvuru dosyası işlemek veya mesleki tavsiye üretmek için çerez
              kullanımını kapsamaz</strong>. <strong className="font-semibold text-foreground">Vize
              Firmaları yalnızca aracı platformdur</strong>; çerezler, listeleme ve karşılaştırma
              altyapısının işletimi ile bağlantılıdır.
            </p>
          </section>

          <section aria-labelledby="cp5">
            <h2 id="cp5" className={h2Next}>
              5. Hukuki dayanak (KVKK)
            </h2>
            <p className={p}>
              Çerezler aracılığıyla işlenen veriler için KVKK kapsamında birden fazla hukuki sebep
              öne çıkabilir:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Açık rıza:</strong> Zorunlu
                olmayan çerezler (örneğin bazı analitik, fonksiyonel veya — varsa — pazarlama
                çerezleri) için, yürürlükteki düzenlemeye uygun şekilde açık rıza veya eşdeğer
                tercih mekanizması esas alınabilir. Rıza, özgür iradeyle ve bilgilendirilmiş şekilde
                verilir; <strong className="font-semibold text-foreground">kullanıcı tercihleri
                doğrultusunda</strong> geri alınabilir.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Meşru menfaat:</strong>{" "}
                Platform güvenliği, dolandırıcılığa karşı temel önlemler, hizmetin sürekliliği ve
                sınırlı ölçüde ölçümleme gibi durumlarda, ilgili kişinin hak ve özgürlükleriyle
                dengeli kalmak kaydıyla meşru menfaat hukuki sebebine dayanılabilir. Zorunlu
                çerezlerde sıklıkla sözleşmenin ifası veya meşru menfaat birlikte değerlendirilir.
              </li>
            </ul>
            <p className={p}>
              Somut işleme faaliyetinde hangi sebebin öne çıktığı, çerez türü ve veri içeriğine göre
              değişebilir; ayrıntılı bilgi için{" "}
              <Link
                href="/aydinlatma-metni"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Aydınlatma Metni
              </Link>{" "}
              başvurulabilir.
            </p>
          </section>

          <section aria-labelledby="cp6">
            <h2 id="cp6" className={h2Next}>
              6. Üçüncü taraf çerezleri ve hizmet sağlayıcılar
            </h2>
            <p className={p}>
              Barındırma (hosting), altyapı, analitik veya güvenlik gibi konularda üçüncü taraf
              hizmet sağlayıcılar kullanılabilir. Bu sağlayıcılar, kendi alan adları veya
              entegrasyonları üzerinden <strong className="font-semibold text-foreground">üçüncü taraf
              çerezleri</strong> yerleştirebilir veya benzeri tanımlayıcılar kullanabilir.
            </p>
            <p className={p}>
              Vize Firmaları, bu tarafların gizlilik ve çerez uygulamalarından doğrudan sorumlu
              tutulamaz; kullanıcıların ilgili sağlayıcıların politikalarını incelemesi önerilir.
              Platform üzerinden listelenen firmaların kendi sitelerinde kullandığı çerezler ise
              tamamen o firmaların sorumluluğundadır.
            </p>
          </section>

          <section aria-labelledby="cp7">
            <h2 id="cp7" className={h2Next}>
              7. Kullanıcı kontrolü: kabul, red ve silme
            </h2>
            <p className={p}>
              Çerez yönetimi, <strong className="font-semibold text-foreground">kullanıcı tercihleri
              doğrultusunda</strong> yapılabilir:
            </p>
            <ul className={ul}>
              <li>
                Platform, sunulduğu ölçüde bir çerez tercih bandı, ayar ekranı veya benzeri araç
                ile zorunlu dışı çerezleri kabul etmenize veya reddetmenize imkân verebilir.
              </li>
              <li>
                Tarayıcınızın ayarlarından çerezleri tamamen veya kategorilere göre engelleyebilir,
                mevcut çerezleri silebilirsiniz. Bu işlemler, tarayıcı ve sürüme göre farklı menü
                adlarıyla yapılır; genel olarak &quot;Gizlilik&quot;, &quot;Çerezler&quot; veya
                &quot;Site verileri&quot; bölümlerinden yönetilir.
              </li>
            </ul>
            <p className={p}>
              Zorunlu çerezleri kapatmanız, oturumun kesilmesi veya bazı özelliklerin çalışmaması
              gibi sonuçlar doğurabilir. Analitik veya tercih çerezlerini reddetmeniz, temel
              listeleme ve karşılaştırma işlevlerinin tamamını engellemek zorunda değildir; ancak
              deneyim kişiselleştirmesi sınırlanabilir.
            </p>
          </section>

          <section aria-labelledby="cp8">
            <h2 id="cp8" className={h2Next}>
              8. Aracı platformun sınırı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. Çerezler, Platform&apos;un kendi alan adı ve hizmetleri için
              anlatıldığı şekilde kullanılır. Kullanıcıların listelenen firmalarla e-posta, telefon,
              formlar veya üçüncü taraf siteler üzerinden paylaştığı veriler ve o ortamlarda
              oluşan çerez işlemleri, <strong className="font-semibold text-foreground">Platform&apos;un
              sorumluluğu dışındadır</strong>; ilgili firma veya hizmet sağlayıcının politikaları
              geçerlidir.
            </p>
          </section>

          <section aria-labelledby="cp9">
            <h2 id="cp9" className={h2Next}>
              9. Veri güvenliği
            </h2>
            <p className={p}>
              Çerezler ve bunlarla ilişkili veri işleme faaliyetleri, idari ve teknik tedbirler
              çerçevesinde <strong className="font-semibold text-foreground">güvenli şekilde
              yürütülmeye çalışılır</strong>. Yetkisiz erişim, ifşa veya değiştirmeye karşı makul
              önlemler alınır. Bununla birlikte internet ortamında mutlak güvenlik taahhüdü verilemez;
              kullanıcıların da cihaz ve tarayıcı güvenliğine dikkat etmesi önemlidir.
            </p>
          </section>

          <section aria-labelledby="cp10">
            <h2 id="cp10" className={h2Next}>
              10. Politika güncellemeleri
            </h2>
            <p className={p}>
              Bu Çerez Politikası, mevzuat, teknik altyapı veya iş süreçlerindeki değişikliklere
              bağlı olarak güncellenebilir. Önemli değişiklikler mümkün olduğunca Platform üzerinden
              duyurulur. Düzenli aralıklarla bu sayfayı gözden geçirmeniz önerilir.
            </p>
          </section>

          <section aria-labelledby="cp11">
            <h2 id="cp11" className={h2Next}>
              11. Haklarınız ve iletişim
            </h2>
            <p className={p}>
              KVKK kapsamındaki talepleriniz için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresine başvurabilirsiniz. Çerezlere bağlı kişisel veri işlemeleri hakkında ayrıntılı
              bilgi,{" "}
              <Link
                href="/kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Gizlilik Politikası
              </Link>{" "}
              ve{" "}
              <Link
                href="/aydinlatma-metni"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Aydınlatma Metni
              </Link>{" "}
              ile tamamlanır.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
