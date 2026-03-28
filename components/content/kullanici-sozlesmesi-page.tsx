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

export function KullaniciSozlesmesiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Sözleşme · Kullanıcı
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Kullanıcı Sözleşmesi
            </h1>
            <p className={p}>
              İşbu Kullanıcı Sözleşmesi (&quot;Sözleşme&quot;), <strong className="font-semibold text-foreground">
              Vize Firmaları</strong> (&quot;Platform&quot; / &quot;İşletmeci&quot;) ile Platform&apos;a erişen veya
              hizmetlerinden yararlanan gerçek veya tüzel kişi kullanıcılar (&quot;Kullanıcı&quot;)
              arasındaki hukuki çerçeveyi düzenler. Platformu kullanmaya devam ederek bu Sözleşme&apos;yi
              okuduğunuzu ve bağlayıcı şekilde kabul ettiğinizi beyan edersiniz.
            </p>
            <p className={p}>
              Bu metin;{" "}
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
              ile birlikte yorumlanır. Çelişki halinde özel düzenleme önceliklidir.
            </p>
          </header>

          <section aria-labelledby="ks1" className="mt-10">
            <h2 id="ks1" className={h2First}>
              1. Taraflar ve tanımlar
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform:</strong> Vize Firmaları
              adı altında işletilen dijital listeleme ve karşılaştırma platformu; işletmeci bilgileri:
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong> {PLATFORM_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">Resmi iletişim:</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Kullanıcı:</strong> Platform&apos;a
              erişen her gerçek veya tüzel kişi. Kullanıcı türleri:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Misafir Kullanıcı:</strong> üyelik
                oluşturmadan Platform&apos;u ziyaret eden kişi;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye:</strong> hesap oluşturarak veya
                kimliği doğrulanmış şekilde Platform hizmetlerinden yararlanan Kullanıcı.
              </li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">Üye İşyeri:</strong> Platform üzerinde
              listelenen, kendi adına içerik ve hizmet beyanı sunan üçüncü taraf firmalar. Üye İşyeri,
              işbu Sözleşme&apos;nin doğrudan tarafı değildir; Kullanıcı ile Üye İşyeri arasındaki
              ilişki ayrı hukuki ilişkidir.
            </p>
          </section>

          <section aria-labelledby="ks2">
            <h2 id="ks2" className={h2Next}>
              2. Temel ilke: aracı platform
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı
              platformdur</strong>. <strong className="font-semibold text-foreground">Platform hizmet
              sağlayıcı değildir</strong>; mesleki vize danışmanlığı sunmaz, vize veya ikamet başvurusu
              işlemez, resmi makamlar nezdinde işlem yapmaz ve listelenen mesleki hizmetlerin satıcısı
              veya ifa tarafı değildir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform taraflar arasındaki ilişkiden
              sorumlu değildir</strong>. Kullanıcı ile Üye İşyeri arasında kurulan her türlü iletişim,
              görüşme, teklif, sözleşme veya uyuşmazlık münhasıran bu tarafların sorumluluğundadır.
            </p>
          </section>

          <section aria-labelledby="ks3">
            <h2 id="ks3" className={h2Next}>
              3. Sözleşmenin konusu
            </h2>
            <p className={p}>
              Sözleşme&apos;nin konusu; Kullanıcı&apos;ya Platform&apos;a erişim ve dijital ortamda
              sunulan listeleme, firma bilgilerini inceleme, karşılaştırma ve Platform&apos;un izin
              verdiği ölçüde iletişim kanallarını kullanma imkânının sağlanmasıdır. Hizmetin kapsamı ve
              sınırları <Link href="/hizmet-kosullari" className="font-medium text-secondary underline-offset-2 hover:underline">Hizmet Koşulları</Link>&apos;nda
              ayrıntılandırılabilir.
            </p>
          </section>

          <section aria-labelledby="ks4">
            <h2 id="ks4" className={h2Next}>
              4. Kullanıcı yükümlülükleri
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Kullanıcı kendi sorumluluğunda hareket
              eder</strong>. Kullanıcı aşağıdaki hususlara uymayı kabul eder:
            </p>
            <ul className={ul}>
              <li>Platform&apos;a sağladığı bilgilerin doğru, güncel ve yanıltıcı olmaması;</li>
              <li>Platform&apos;u yürürlükteki mevzuata, genel ahlaka ve üçüncü kişilerin haklarına aykırı
              olmayacak şekilde kullanması;</li>
              <li>Sistemi kötüye kullanmaması, güvenliği tehdit etmemesi, otomasyon veya botlarla izinsiz
              veri toplamaması;</li>
              <li>Dolandırıcılık, yanıltıcı kimlik veya sahte beyanlarda bulunmaması;</li>
              <li>Listelenen firma bilgilerini, karar vermeden önce bağımsız olarak doğrulaması ve riskleri
              kendi değerlendirmesiyle analiz etmesi.</li>
            </ul>
          </section>

          <section aria-labelledby="ks5">
            <h2 id="ks5" className={h2Next}>
              5. Yasak fiiller
            </h2>
            <p className={p}>
              Aşağıdaki davranışlar yasaktır (sayılmakla sınırlı değildir):
            </p>
            <ul className={ul}>
              <li>Yasadışı faaliyetler veya suç teşkil eden içeriklerin yayılması;</li>
              <li>Platform altyapısına, sunuculara veya diğer kullanıcılara zarar verecek müdahaleler;</li>
              <li>Yanıltıcı veya iftira niteliğinde beyanlar;</li>
              <li>Yetkisiz veri toplama, tersine mühendislik veya güvenlik açıklarının kötüye
              kullanılması;</li>
              <li>Platform&apos;un veya diğer kullanıcıların itibarını, ticari faaliyetini veya güvenliğini
              zedeleyen eylemler.</li>
            </ul>
          </section>

          <section aria-labelledby="ks6">
            <h2 id="ks6" className={h2Next}>
              6. Platform hakları
            </h2>
            <p className={p}>
              Platform; hizmeti geliştirmek, güvenliği sağlamak ve mevzuata uymak amacıyla sistem ve
              arayüzü değiştirebilir, içerikleri kaldırabilir veya düzenleyebilir. Kullanıcı hesabını
              geçici olarak askıya alabilir, erişimi kısıtlayabilir veya feshedebilir. Ağır ihlal,
              güvenlik riski veya yasal zorunluluk hallerinde <strong className="font-semibold text-foreground">
              önceden bildirimde bulunmaksızın</strong> da işlem yapılabilir; yürürlükteki tüketici ve
              kişisel veri mevzuatından doğan zorunluluklar saklıdır.
            </p>
          </section>

          <section aria-labelledby="ks7">
            <h2 id="ks7" className={h2Next}>
              7. İçerik ve bilgi sorumluluğu
            </h2>
            <p className={p}>
              Listelerde yer alan firma adları, iletişim bilgileri, açıklamalar, fiyat veya hizmet
              vaatleri esas itibarıyla <strong className="font-semibold text-foreground">Üye İşyeri
              tarafından sağlanır</strong>. Platform, tüm verilerin doğruluğunu, güncelliğini veya
              eksiksizliğini <strong className="font-semibold text-foreground">garanti etmez</strong> ve
              her bilgiyi bizzat teyit etmiş sayılmaz. Kullanıcı, bu bilgilere dayanarak işlem yapmadan
              önce kendi araştırmasını yapmakla yükümlüdür.
            </p>
          </section>

          <section aria-labelledby="ks8">
            <h2 id="ks8" className={h2Next}>
              8. Üye İşyeri ilişkisi
            </h2>
            <p className={p}>
              Kullanıcı, Üye İşyeri ile iletişim kurması, görüşmesi veya sözleşme yapması halinde{" "}
              <strong className="font-semibold text-foreground">tüm risk kendisine aittir</strong>.{" "}
              <strong className="font-semibold text-foreground">Platform taraflar arasındaki ilişkiden
              sorumlu değildir</strong>. Platform; Üye İşyeri&apos;nin hizmet kalitesi, taahhütleri,
              ücretlendirmesi, sonuçları veya uyuşmazlıklarından <strong className="font-semibold text-foreground">
              sorumlu tutulamaz</strong>.
            </p>
          </section>

          <section aria-labelledby="ks9">
            <h2 id="ks9" className={h2Next}>
              9. Sorumluluğun sınırlandırılması
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform hiçbir doğrudan veya dolaylı zarardan sorumlu tutulamaz
              </strong>
              . Bunlar arasında; maddi ve manevi zararlar, kar kaybı, işin durması, itibar kaybı, veri
              kaybı, üçüncü taraf talepleri ve benzeri dolaylı zararlar sayılabilir. Platform; finansal
              kayıplar, kişisel zararlar, ticari zararlar, Üye İşyeri davranışları ve Kullanıcı&apos;nın
              kendi kararlarından doğan sonuçlar bakımından sorumluluk kabul etmez. Yürürlükteki zorunlu
              hukuk kuralları (örneğin tüketici mevzuatında cayma hakkı gibi mutlak hükümler) saklıdır.
            </p>
          </section>

          <section aria-labelledby="ks10">
            <h2 id="ks10" className={h2Next}>
              10. Fikri mülkiyet
            </h2>
            <p className={p}>
              Platform&apos;un tasarımı, yazılımı, metinleri, logosu, markası ve derlenmiş içerikleri
              (Üye İşyeri tarafından sağlanan içerikler hariç) İşletmeci&apos;nin fikri mülkiyet
              kapsamındadır. İzinsiz kopyalama, çoğaltma, dağıtma veya ticari kullanım yasaktır.
            </p>
          </section>

          <section aria-labelledby="ks11">
            <h2 id="ks11" className={h2Next}>
              11. Hesabın sona ermesi
            </h2>
            <p className={p}>
              Platform, işbu Sözleşme&apos;ye veya bağlayıcı diğer metinlere aykırılık, güvenlik gerekçesi
              veya yasal talep halinde Kullanıcı hesabını askıya alabilir veya sonlandırabilir. Kullanıcı
              dilediği zaman Platform kullanımını durdurabilir ve üyelik varsa kapatma talebinde
              bulunabilir; veri saklama ve silme koşulları Gizlilik Politikası ve mevzuata tabidir.
            </p>
          </section>

          <section aria-labelledby="ks12">
            <h2 id="ks12" className={h2Next}>
              12. Uygulanacak hukuk ve yetki
            </h2>
            <p className={p}>
              İşbu Sözleşme&apos;den doğan uyuşmazlıklarda <strong className="font-semibold text-foreground">
              Türkiye Cumhuriyeti kanunları</strong> uygulanır. Tüketici sıfatıyla hareket eden
              Kullanıcılar için Tüketicinin Korunması Hakkında Kanun ve ilgili mevzuattan doğan zorunlu
              haklar saklıdır. Aksi halde ve ticari uyuşmazlıklarda <strong className="font-semibold text-foreground">
              Edirne Merkez Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
            </p>
          </section>

          <section aria-labelledby="ks13">
            <h2 id="ks13" className={h2Next}>
              13. İletişim ve güncellemeler
            </h2>
            <p className={p}>
              Sözleşme ile ilgili resmi bildirim ve yazışmalar için{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresi kullanılır. Platform, Sözleşme&apos;yi yürürlükteki mevzuata uygun şekilde
              güncelleyebilir; önemli değişiklikler mümkün olduğunca Platform üzerinden duyurulur.
              Güncelleme sonrası kullanım, güncellenmiş metnin kabulü anlamına gelebilir.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
