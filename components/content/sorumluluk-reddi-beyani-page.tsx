import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const CONTACT_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";
const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";
const shieldBox =
  "mt-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground/90 sm:p-6 sm:text-base";

export function SorumlulukReddiBeyaniPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Yasal metin · Sorumluluk reddi
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Sorumluluk Reddi Beyanı
            </h1>
            <p className={p}>
              İşbu <strong className="font-semibold text-foreground">Sorumluluk Reddi Beyanı</strong>
              , <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              platformuna (&quot;Platform&quot;) erişen veya kullanan tüm kişi ve kurumlar için
              geçerlidir. Platformu kullanmaya devam ederek aşağıdaki hükümleri okuduğunuzu,
              anladığınızı ve <strong className="font-semibold text-foreground">hukuki sonuçlarını
              kabul ettiğinizi</strong> beyan etmiş olursunuz. Bu metin, Kullanım Koşulları,
              Hizmet Koşulları ve diğer yasal belgelerle birlikte değerlendirilir.
            </p>
          </header>

          <section aria-labelledby="sr1" className="mt-10">
            <h2 id="sr1" className={h2First}>
              1. Genel Açıklama
            </h2>
            <p className={p}>
              Platform üzerinde sunulan bilgiler, listelemeler ve araçlar genel bilgilendirme
              ve karşılaştırma amaçlıdır. Resmi vize veya oturum kararları yalnızca yetkili
              devlet makamlarına aittir. İşbu beyan, Platform işletmecisinin (&quot;İşletmeci&quot;)
              sorumluluk risklerini açıkça sınırlamayı amaçlar.
            </p>
          </section>

          <section aria-labelledby="sr2">
            <h2 id="sr2" className={h2Next}>
              2. Platformun Rolü
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              .
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform hiçbir şekilde hizmet sağlayıcı değildir
              </strong>
              ; vize danışmanlığı, başvuru dosyası hazırlama, konsolosluk işlemi yürütme veya
              benzeri mesleki hizmetleri doğrudan sunmaz.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform, Misafir Kullanıcı / Üye ile Üye İşyeri arasında kurulan hiçbir
                ilişkinin tarafı değildir
              </strong>
              . Ticari görüşme, sözleşme, ödeme veya hizmet ifası yalnızca ilgili Kullanıcı ile
              Üye İşyeri arasındadır.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform taraflar arasındaki ilişkiden sorumlu değildir
              </strong>
              .
            </p>
          </section>

          <section aria-labelledby="sr3">
            <h2 id="sr3" className={h2Next}>
              3. Bilgi ve İçerik Sorumluluğu
            </h2>
            <p className={p}>
              Platformda görünen profiller, metinler, görseller ve iletişim bilgileri esas
              olarak <strong className="font-semibold text-foreground">Üye İşyerleri tarafından
              sağlanan verilere</strong> dayanır. İşletmeci, moderasyon veya teknik kontroller
              uygulayabilir; buna karşın:
            </p>
            <ul className={ul}>
              <li>
                Tüm içeriğin doğruluğunu, güncelliğini veya eksiksizliğini{" "}
                <strong className="font-semibold text-foreground">garanti etmez</strong>;
              </li>
              <li>
                Her beyanı sürekli denetlemek, teyit etmek veya hukuka uygunluğunu tek başına
                doğrulamakla yükümlü sayılmaz;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Yanlış, eksik, güncelliğini
                yitirmiş veya yanıltıcı</strong> bilgilerden doğabilecek zararlardan İşletmeci
                sorumlu tutulamaz.
              </li>
            </ul>
            <p className={p}>
              Üye İşyerlerinin kullanıcılara yönelik sözlü veya yazılı vaatleri, Platformun
              taahhüdü anlamına gelmez.
            </p>
          </section>

          <section aria-labelledby="sr4">
            <h2 id="sr4" className={h2Next}>
              4. Kullanıcı Sorumluluğu
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Kullanıcı tüm riskleri kabul eder
              </strong>
              . Platformda yer alan bilgilere dayanarak verilen kararlar tamamen Kullanıcı&apos;nın
              kendi takdirindedir.
            </p>
            <ul className={ul}>
              <li>
                Firma bilgilerini <strong className="font-semibold text-foreground">bağımsız
                olarak doğrulamak</strong>;
              </li>
              <li>
                Ücret, kapsam ve sözleşme şartlarını dikkatle incelemek;
              </li>
              <li>
                Platformun tavsiye veya danışmanlık vermediğini bilmek;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kendi riski altında hareket
                etmek</strong>.
              </li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">Tüm risk kullanıcıya aittir</strong>
              ; Kullanıcı, bu beyanı okuyarak bunu açıkça kabul eder.
            </p>
          </section>

          <section aria-labelledby="sr5">
            <h2 id="sr5" className={h2Next}>
              5. Üye İşyeri Sorumluluğu
            </h2>
            <p className={p}>
              Üye İşyerleri; sundukları hizmetlerin mevzuata uygunluğundan, içeriklerinin
              doğruluğundan, kullanıcılarla iletişimlerinden ve sözleşmelerinin ifasından{" "}
              <strong className="font-semibold text-foreground">bizzat ve münhasıran</strong>{" "}
              sorumludur.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform firmaları denetlemek,
              yönetmek veya onların adına taahhüt vermek zorunda değildir</strong>. Üye İşyeri
              ile Kullanıcı arasındaki anlaşmazlıklarda İşletmeci taraf değildir.
            </p>
          </section>

          <section aria-labelledby="sr6">
            <h2 id="sr6" className={h2Next}>
              6. Üçüncü Taraf Hizmetler
            </h2>
            <p className={p}>
              Listelenen tüm Üye İşyerleri <strong className="font-semibold text-foreground">
              bağımsız üçüncü taraflardır</strong>. Platform, yalnızca bu tarafların beyan
              ettiği bilgileri yayımlar; üçüncü tarafın davranışı, kalitesi veya yasal
              uygunluğu üzerinde kontrol veya mülkiyet iddiası bulunmaz.
            </p>
          </section>

          <section aria-labelledby="sr7">
            <h2 id="sr7" className={h2Next}>
              7. Garanti Vermeme Beyanı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform hiçbir hizmet garantisi vermez
              </strong>
              . Platform; doğruluk, başarı, süreklilik, güvenlik, sonuç veya herhangi bir
              nitelik bakımından <strong className="font-semibold text-foreground">açık veya
              zımni hiçbir garanti veya teminat vermez</strong>.
            </p>
            <p className={p}>
              Vize başvurusunun onaylanması, reddedilmesi veya süresi hakkında Platform
              hiçbir vaatte bulunmaz; <strong className="font-semibold text-foreground">vize
              başvuru sonucundan</strong> İşletmeci sorumlu tutulamaz.
            </p>
          </section>

          <section aria-labelledby="sr8">
            <h2 id="sr8" className={h2Next}>
              8. Sorumluluğun Sınırlandırılması
            </h2>
            <div className={shieldBox}>
              <p>
                <strong className="font-semibold text-foreground">
                  Platform hiçbir doğrudan veya dolaylı zarardan sorumlu tutulamaz
                </strong>
                . Aşağıdakiler dahil ancak bunlarla sınırlı olmamak üzere İşletmeci&apos;ye
                rücu veya tazminat talep edilemez:
              </p>
              <ul className={`${ul} mt-3`}>
                <li>Herhangi bir vize başvurusu sonucu (onay, ret, gecikme);</li>
                <li>Maddi veya manevi zarar, kâr kaybı, iş durması, veri veya itibar kaybı;</li>
                <li>Ticari veya kişisel her türlü dolaylı zarar;</li>
                <li>Kullanıcı ile Üye İşyeri arasında kurulan sözleşmelerin ihlali veya
                  ifasından doğan talepler;</li>
                <li>Üye İşyerlerinin sözlü veya yazılı taahhütleri;</li>
                <li>Yanlış, eksik veya güncel olmayan bilgiler;</li>
                <li>Yanıltıcı içerik veya iletişim;</li>
                <li>Üçüncü kişi eylemleri veya dış bağlantılar.</li>
              </ul>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">
                  Platform hiçbir zarardan sorumlu tutulamaz
                </strong>
                ; bu ifade, yukarıdaki zarar türlerini kapsayacak şekilde geniş yorumlanır.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">
                  Platformun hiçbir hukuki, mali veya cezai sorumluluğu bulunmaz
                </strong>
                — işbu sınırlama, İşletmeci&apos;nin kastı veya ağır kusuru ile doğrudan
                bağlantılı hallerde yürürlükteki <strong className="font-semibold text-foreground">zorunlu
                kanun hükümleri</strong> saklı kalmak kaydıyla uygulanır.
              </p>
            </div>
          </section>

          <section aria-labelledby="sr9">
            <h2 id="sr9" className={h2Next}>
              9. Risk Kabulü
            </h2>
            <p className={p}>
              Platforma erişen her Kullanıcı; listeleme niteliğindeki bir ortamda araştırma
              yaptığını, kararlarını kendi özgür iradesiyle verdiğini ve{" "}
              <strong className="font-semibold text-foreground">oluşabilecek tüm olumsuz
              sonuçların riskini üstlendiğini</strong> kabul eder. Bu risk kabulü, işbu beyanın
              ayrılmaz bir parçasıdır.
            </p>
          </section>

          <section aria-labelledby="sr10">
            <h2 id="sr10" className={h2Next}>
              10. İletişim
            </h2>
            <p className={p}>
              Sorumluluk reddi metni hakkında sorularınız için (telefon hattı
              bulunmamaktadır):
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Adres:</strong>{" "}
                {CONTACT_ADDRESS}
              </li>
              <li>
                <strong className="font-semibold text-foreground">E-posta:</strong>{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="sr11">
            <h2 id="sr11" className={h2Next}>
              11. Yürürlük
            </h2>
            <p className={p}>
              İşbu Sorumluluk Reddi Beyanı, Platform&apos;da yayımlandığı tarihte yürürlüğe girer.
              İşletmeci metni güncelleyebilir; güncel sürüm yayımlandığı anda erişen
              kullanıcılar için geçerli olur. Diğer sözleşme ve politikalarla çelişki
              hâlinde, uyuşmazlığın konusuna göre özel düzenleme öncelikli olabilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Hatırlatma:</strong> İşbu metin
              hukuki danışmanlık yerine geçmez. Zorunlu tüketici ve kişilik haklarına ilişkin
              kanun hükümleri saklıdır.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
