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
const box =
  "mt-4 rounded-xl border border-primary/15 bg-surface/80 p-5 text-sm leading-relaxed text-foreground/85 sm:p-6 sm:text-base";

export function KullanimKosullariPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Yasal metin
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Kullanım Koşulları
            </h1>
            <p className={p}>
              İşbu <strong className="font-semibold text-foreground">Kullanım Koşulları</strong>
              ,{" "}
              <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              adlı dijital platformun (&quot;Platform&quot;) kullanımına ilişkin hak ve
              yükümlülükleri düzenler. Platforma erişen veya kullanan herkes bu koşulları
              okumuş ve kabul etmiş sayılır. Bu metin,{" "}
              <strong className="font-semibold text-foreground">
                vize danışmanlık platformu
              </strong>{" "}
              niteliğindeki listeleme ve karşılaştırma işlevinin hukuki çerçevesini ortaya
              koyar; <strong className="font-semibold text-foreground">vize firmaları</strong>{" "}
              ile kullanıcılar arasındaki hizmet ilişkisinin sözleşmesi değildir.
            </p>
          </header>

          <section aria-labelledby="m1" className="mt-10">
            <h2 id="m1" className={h2First}>
              1. Taraflar ve Tanımlar
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform:</strong> Vize
              Firmaları markası altında sunulan internet sitesi, mobil uyumlu arayüz ve
              bağlı tüm dijital kanallar.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform İşletmecisi / Hizmet Sağlayıcı:
              </strong>{" "}
              Platformu işleten tüzel veya gerçek kişi (bundan böyle birlikte
              &quot;İşletmeci&quot; olarak anılacaktır). İletişim bilgileri bu metnin sonunda
              yer almaktadır.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Misafir Kullanıcı:</strong>{" "}
              Üyelik oluşturmadan Platform&apos;u ziyaret eden, içerikleri görüntüleyen veya
              sınırlı işlevleri kullanan gerçek veya tüzel kişi.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Üye:</strong> Hesap oluşturarak
              veya kimliği doğrulanmış şekilde Platform&apos;un belirli özelliklerine erişen
              gerçek veya tüzel kişi.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Üye İşyeri:</strong> Platform
              üzerinde profil veya listeleme ile yer alan, kendi adına bilgi paylaşan vize
              danışmanlığı veya ilgili hizmetleri sunduğunu beyan eden işletme veya meslek
              sahibi.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Kullanıcı:</strong> Yukarıdaki
              tüm kullanıcı tiplerini kapsayan genel ifade.
            </p>
          </section>

          <section aria-labelledby="m2">
            <h2 id="m2" className={h2Next}>
              2. Sözleşmenin Konusu
            </h2>
            <p className={p}>
              İşbu sözleşmenin konusu; Kullanıcıların Platform&apos;a erişimi, Platform
              üzerinde sunulan yazılım ve arayüzün kullanımı, listeleme ve karşılaştırma
              amaçlı bilgilerin görüntülenmesi ile İşletmeci tarafından sağlanan sınırlı
              teknik hizmetlerin koşullarının belirlenmesidir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              ; vize başvurusu hazırlama, konsolosluk işlemi yürütme, danışmanlık verme veya
              herhangi bir resmi süreçte temsil etme hizmeti sunmaz. Bu tür hizmetler, varsa,
              yalnızca Üye İşyeri ile Kullanıcı arasında ayrıca kurulacak ilişki kapsamında
              değerlendirilir.
            </p>
          </section>

          <section aria-labelledby="m3">
            <h2 id="m3" className={h2Next}>
              3. Platformun Hizmet Kapsamı
            </h2>
            <ul className={ul}>
              <li>
                Üye İşyerlerinin beyan ettiği bilgilerin dijital ortamda listelenmesi ve
                karşılaştırma için sunulması;
              </li>
              <li>
                Arama, filtreleme ve benzeri teknik araçlarla araştırma kolaylığı sağlanması;
              </li>
              <li>
                Platform altyapısının işletilmesi ve güvenliğinin temin edilmesi.
              </li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform herhangi bir taahhüt veya garanti vermez
              </strong>
              . Listelenen firmaların niteliği, yetkisi, performansı veya müşteri memnuniyeti
              konusunda İşletmeci hiçbir garanti üstlenmez. Profillerde yer alan içeriklerin
              doğruluğu, güncelliği ve hukuka uygunluğu öncelikle ilgili Üye İşyerinin
              sorumluluğundadır.
            </p>
          </section>

          <section aria-labelledby="m4">
            <h2 id="m4" className={h2Next}>
              4. Kullanım Şartları
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Kabul edilebilir kullanım:</strong>
            </p>
            <ul className={ul}>
              <li>Platformu yürürlükteki mevzuata, ahlaka ve üçüncü kişi haklarına uygun şekilde kullanmak;</li>
              <li>Başkası adına hesap açmamak veya yanıltıcı kimlik bilgisi kullanmamak;</li>
              <li>Otomatik veri toplama (scraping), aşırı yük oluşturma veya güvenliği ihlal eden yöntemlerden kaçınmak.</li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">Yasak davranışlar (örnekleyici):</strong>
            </p>
            <ul className={ul}>
              <li>Platforma zarar verecek yazılım, kod veya saldırı girişiminde bulunmak;</li>
              <li>Sahte, yanıltıcı veya iftira niteliğinde içerik yayınlamak veya iletmek;</li>
              <li>Ticari itibarı kötüye kullanmak, haksız rekabet oluşturmak;</li>
              <li>Kişisel verileri mevzuata aykırı işlemek veya üçüncü kişilerin gizliliğini ihlal etmek;</li>
              <li>Platformu yasadışı amaçlarla kullanmak.</li>
            </ul>
            <p className={p}>
              İşletmeci, bu kurallara aykırı kullanımda hesabı askıya alma, erişimi kısıtlama
              veya yasal mercilere bildirimde bulunma hakkını saklı tutar.
            </p>
          </section>

          <section aria-labelledby="m5">
            <h2 id="m5" className={h2Next}>
              5. Üyelik ve Hesap Kullanımı
            </h2>
            <p className={p}>
              Üyelik gerektiren özelliklerde doğru ve güncel bilgi vermek Kullanıcının
              yükümlülüğüdür. Giriş bilgilerinin gizliliği ve hesabın güvenliği tamamen
              Kullanıcıya aittir; hesap altında yapılan işlemlerden Kullanıcı sorumludur.
            </p>
            <p className={p}>
              Şüpheli erişim tespitinde İşletmeci hesabı geçici olarak durdurabilir.
              Üyelik, işbu koşullar ile birlikte yürürlükteki Gizlilik Politikası ve ilgili
              metinlere tabidir.
            </p>
          </section>

          <section aria-labelledby="m6">
            <h2 id="m6" className={h2Next}>
              6. Üye İşyeri Yükümlülükleri
            </h2>
            <p className={p}>
              Üye İşyeri; Platform&apos;da yayımladığı tüm metin, görsel, iletişim bilgisi,
              fiyat veya hizmet tanımının doğru, güncel ve yürürlükteki mevzuata uygun
              olmasından bizzat sorumludur. Yanıltıcı reklam, tüketiciyi aldatıcı beyan veya
              yetkisiz hizmet vaadi yasaktır.
            </p>
            <ul className={ul}>
              <li>
                Kendi faaliyet ruhsatı, meslek kuralları ve vergi mevzuatına uygun hareket
                etmek;
              </li>
              <li>
                Kullanıcılarla kurduğu sözleşme, ücret ve iade koşullarını şeffaf biçimde
                yürütmek;
              </li>
              <li>
                İşletmeciden talep edilen doğrulama veya düzeltme taleplerine makul sürede
                yanıt vermek.
              </li>
            </ul>
            <p className={p}>
              Üye İşyeri ile Kullanıcı arasında doğan uyuşmazlıklarda İşletmeci taraf
              değildir.
            </p>
          </section>

          <section aria-labelledby="m7">
            <h2 id="m7" className={h2Next}>
              7. Misafir Kullanıcı ve Üye Yükümlülükleri
            </h2>
            <p className={p}>
              Kullanıcı; Platform&apos;da gördüğü bilgileri kendi riski altında
              değerlendirir. Bir Üye İşyeri ile çalışmaya karar vermeden önce firmanın
              yetkisini, referanslarını ve sözleşme şartlarını bağımsız olarak doğrulamakla
              yükümlüdür.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Kullanıcı ve Üye İşyeri kendi sorumluluğundadır
              </strong>{" "}
              — tercih edilen hizmetin kapsamı, ücreti, süresi ve sonuç beklentisi bu iki
              taraf arasında netleştirilmelidir. Platform bu süreçte danışmanlık veya arabuluculuk
              rolü üstlenmediği sürece müdahale yükümlülüğü taşımaz.
            </p>
          </section>

          <section aria-labelledby="m8">
            <h2 id="m8" className={h2Next}>
              8. Sorumluluğun Sınırlandırılması
            </h2>
            <div className={box}>
              <p>
                <strong className="font-semibold text-foreground">
                  Vize Firmaları, Kullanıcı ile Üye İşyeri arasında kurulan herhangi bir
                  sözleşmenin tarafı değildir.
                </strong>{" "}
                Taraflar arasındaki ilişkiden doğabilecek hiçbir zarardan sorumlu değildir.
              </p>
              <p className="mt-4">
                İşletmeci; doğrudan veya dolaylı maddi/manevi zarar, kâr kaybı, veri kaybı,
                iş durması, itibar zedelenmesi, üçüncü kişi talepleri, vize başvurusunun
                sonuçlanmaması, ret, gecikme veya resmi makamların işlemleri dahil olmak
                üzere hiçbir sonuç veya zarar bakımından sorumluluk kabul etmez.
              </p>
              <p className="mt-4">
                Platform üzerinden veya platform dışında gerçekleşen görüşmeler, ödemeler,
                sözlü veya yazılı anlaşmalar yalnızca ilgili tarafları bağlar. İşletmeci,
                bu ilişkilerin ifasından, ihlalinden veya sona ermesinden kaynaklanan
                taleplerden muaf tutulur.
              </p>
            </div>
            <p className={p}>
              Yürürlükteki zorunlu hukuk kuralları saklı kalmak kaydıyla, İşletmeci&apos;nin
              Kullanıcı veya Üye İşyeri&apos;ne karşı toplam sorumluluğu (varsa) işbu
              sözleşme kapsamında öngörülebilen doğrudan zararlar ile sınırlı tutulabilir;
              dolaylı zararlar açıkça hariç tutulmuştur.
            </p>
          </section>

          <section aria-labelledby="m9">
            <h2 id="m9" className={h2Next}>
              9. İçerik ve Bilgi Sorumluluğu
            </h2>
            <p className={p}>
              Platformda görünen Üye İşyeri içerikleri esas itibarıyla ilgili işletme
              tarafından sağlanır. İşletmeci, moderasyon, teknik filtre veya yasal talep
              hallerinde içeriği kaldırma veya düzenleme hakkına sahiptir; buna karşın tüm
              içeriği sürekli denetlemek veya doğruluğunu garanti etmek zorunda değildir.
            </p>
            <p className={p}>
              Yanlış, eksik veya güncelliğini yitirmiş bilgilerden doğan zararlarda
              öncelikle içeriği sağlayan Üye İşyeri sorumludur. Kullanıcı, kararlarını
              yalnızca Platform bilgisine dayandırmamalıdır.
            </p>
          </section>

          <section aria-labelledby="m10">
            <h2 id="m10" className={h2Next}>
              10. Fikri Mülkiyet Hakları
            </h2>
            <p className={p}>
              Platform&apos;un yazılımı, tasarımı, markası, logosu, metin şablonları ve
              İşletmeci&apos;ye ait tüm unsurlar fikri mülkiyet mevzuatı ile korunmaktadır.
              İzinsiz kopyalama, çoğaltma, dağıtma veya tersine mühendislik yasaktır.
            </p>
            <p className={p}>
              Üye İşyeri, yüklediği içeriklerde üçüncü kişi haklarını ihlal etmemeyi; gerekli
              lisans ve izinlere sahip olduğunu beyan ve taahhüt eder.
            </p>
          </section>

          <section aria-labelledby="m11">
            <h2 id="m11" className={h2Next}>
              11. Platform Değişiklik Hakları
            </h2>
            <p className={p}>
              İşletmeci; Platform&apos;un işleyişini, arayüzünü, özelliklerini, listeleme
              kriterlerini ve işbu Kullanım Koşullarını önceden bildirerek veya gerektiğinde
              yayımlandığı anda yürürlüğe girecek şekilde değiştirme hakkını saklı tutar.
              Önemli değişiklikler makul süre ve yöntemle duyurulur; kullanımın sürmesi
              güncel koşulların kabulü anlamına gelebilir.
            </p>
          </section>

          <section aria-labelledby="m12">
            <h2 id="m12" className={h2Next}>
              12. Hizmetin Durdurulması
            </h2>
            <p className={p}>
              İşletmeci; bakım, güvenlik, yasal zorunluluk veya mücbir sebep hallerinde
              Platform&apos;a erişimi geçici veya kalıcı olarak kısıtlayabilir veya sona
              erdirebilir. Bu durumda Kullanıcılar önceden varsa Platform üzerinden
              bilgilendirilebilir; acil güvenlik gerekçeleriyle önceden haber verilmemesi
              mümkündür.
            </p>
          </section>

          <section aria-labelledby="m13">
            <h2 id="m13" className={h2Next}>
              13. Mücbir Sebepler
            </h2>
            <p className={p}>
              Tarafların kontrolü dışında gelişen; doğal afet, savaş, terör, salgın, genel
              internet kesintisi, kamu otoritesi kararları, grev ve benzeri olaylar mücbir
              sebep sayılır. Mücbir sebep süresince yükümlülükler askıya alınabilir;
              süreklilik hâlinde taraflar sözleşmeden doğan ifa yükümlülüklerinden kısmen veya
              tamamen kurtulabilir.
            </p>
          </section>

          <section aria-labelledby="m14">
            <h2 id="m14" className={h2Next}>
              14. Uygulanacak Hukuk ve Yetki
            </h2>
            <p className={p}>
              İşbu Kullanım Koşulları&apos;nın yorumlanması ve uygulanmasında Türkiye
              Cumhuriyeti kanunları geçerlidir. Uyuşmazlıklarda İşletmeci&apos;nin merkezinin
              bulunduğu yerdeki mahkemeler ve icra daireleri yetkilidir; tüketici sıfatıyla
              hareket eden Kullanıcılar için 6502 sayılı Kanun ve ilgili mevzuatta öngörülen
              zorunlu hükümler saklıdır.
            </p>
          </section>

          <section aria-labelledby="m15">
            <h2 id="m15" className={h2Next}>
              15. Yürürlük ve İletişim
            </h2>
            <p className={p}>
              İşbu metin, Platform&apos;da yayımlandığı tarihte yürürlüğe girer. Kullanıcıların
              Platform&apos;u kullanmaya devam etmesi, güncel koşulları okudukları ve kabul
              ettikleri anlamına gelebilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">İletişim</strong> (telefon
              hattı bulunmamaktadır):
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
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
