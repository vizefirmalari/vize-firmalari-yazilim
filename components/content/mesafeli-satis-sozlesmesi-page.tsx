import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const SELLER_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";
const SELLER_EMAIL = "iletisim@vizefirmalari.com";

const h2First =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const h2Next =
  "mt-10 scroll-mt-28 border-t border-border pt-10 text-xl font-bold tracking-tight text-primary sm:text-2xl";
const p = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const ul = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";
const box =
  "mt-4 rounded-xl border border-primary/15 bg-surface/80 p-5 text-sm leading-relaxed text-foreground/85 sm:p-6 sm:text-base";

export function MesafeliSatisSozlesmesiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Yasal metin · Mesafeli satış
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Mesafeli Satış Sözleşmesi
            </h1>
            <p className={p}>
              İşbu sözleşme, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              platformu (&quot;Satıcı&quot; / &quot;Platform&quot;) ile Platform üzerinden{" "}
              <strong className="font-semibold text-foreground">dijital platform hizmeti</strong>{" "}
              satın alan <strong className="font-semibold text-foreground">Misafir Kullanıcı</strong> veya{" "}
              <strong className="font-semibold text-foreground">Üye</strong> (&quot;Alıcı&quot; /
              &quot;Tüketici&quot;) arasında elektronik ortamda kurulur. 6502 sayılı Tüketicinin
              Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği çerçevesinde
              bilgilendirme ve sözleşme metni niteliğindedir. Platform, fiziksel ürün satışı veya
              doğrudan vize danışmanlığı satışı yapmaz; satış konusu yalnızca aşağıda tanımlanan
              sınırlı dijital hizmetlerdir.
            </p>
          </header>

          <section aria-labelledby="ms1" className="mt-10">
            <h2 id="ms1" className={h2First}>
              1. Taraflar
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Satıcı / Hizmet Sağlayıcı
              (Platform):</strong>
              <br />
              Ünvan: <strong className="font-semibold text-foreground">Vize Firmaları</strong>
              <br />
              Adres: {SELLER_ADDRESS}
              <br />
              E-posta:{" "}
              <a
                href={`mailto:${SELLER_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {SELLER_EMAIL}
              </a>
              <br />
              (Telefon hattı bulunmamaktadır.)
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Alıcı:</strong> Platform üzerinden
              ücretli dijital hizmet satın alan gerçek veya tüzel kişi. Tüketici sıfatıyla
              hareket eden gerçek kişiler için 6502 sayılı Kanun&apos;daki zorunlu hükümler saklıdır.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Üçüncü taraf (Üye İşyeri):</strong>{" "}
              Platformda listelenen, kendi mesleki veya ticari hizmetlerini bağımsız sunan firmalar.
              İşbu mesafeli satış sözleşmesi, Alıcı ile Üye İşyeri arasındaki ilişkiyi düzenlemez.
            </p>
          </section>

          <section aria-labelledby="ms2">
            <h2 id="ms2" className={h2Next}>
              2. Sözleşmenin Konusu
            </h2>
            <p className={p}>
              Sözleşmenin konusu; Alıcı&apos;nın elektronik ortamda sipariş verdiği, bedelini
              ödediği ve aşağıda tanımlanan{" "}
              <strong className="font-semibold text-foreground">
                dijital platform hizmetlerinin
              </strong>{" "}
              Satıcı tarafından ifa edilmesidir. Konusu fiziksel mal veya konsolosluk / vize
              başvurusu sonucu olmayıp, yalnızca yazılım tabanlı erişim, görünürlük ve benzeri
              platform özellikleridir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              ; Üye İşyerleri ile Alıcı arasında kurulan hizmet veya danışmanlık sözleşmesinin
              tarafı değildir.
            </p>
          </section>

          <section aria-labelledby="ms3">
            <h2 id="ms3" className={h2Next}>
              3. Hizmet Tanımı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Satın alınan hizmet dijital platform hizmetidir
              </strong>
              . Örnek olarak: profil veya içerik görünürlüğü, iletişim / erişim araçları,
              analitik veya yönetim panelleri, bilgilendirici modüller ve Satıcı tarafından
              teklif edilen diğer ücretli yazılım özellikleri sayılabilir. Hizmetin kapsamı,
              süresi ve bedeli sipariş anında veya ödeme öncesi ekranda gösterilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Satın alınan hizmet şunları
              kapsamaz ve bunlar için bedel alınması söz konusu değildir:</strong> vize onayı,
              konsolosluk kararı, danışmanlık sonucu, belirli bir başvuru çıktısının garantisi
              veya Üye İşyeri tarafından sunulan mesleki hizmetin kendisi.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform herhangi bir sonuç garantisi vermez
              </strong>
              .
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform, Üye İşyeri tarafından sunulan hizmetlerden sorumlu değildir
              </strong>
              .
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Ödeme yapılması platformun hizmet sağlayıcı olduğu anlamına gelmez
              </strong>{" "}
              — mesleki anlamda vize danışmanlığı veya başvuru hizmeti Satıcı tarafından
              sunulmaz; ödeme yalnızca yukarıdaki dijital platform özelliklerine ilişkindir.
            </p>
          </section>

          <section aria-labelledby="ms4">
            <h2 id="ms4" className={h2Next}>
              4. Hizmetin Teslimi
            </h2>
            <p className={p}>
              Dijital hizmet, ödemenin onaylanması ve teknik aktivasyonun tamamlanması ile
              Alıcı&apos;ya sunulur. Erişim bilgileri, hesap bağlantısı veya arayüz üzerinden
              kullanım hakkı genellikle <strong className="font-semibold text-foreground">anında</strong> veya
              Satıcı&apos;nın bildirdiği kısa süre içinde devreye alınır. Hizmet, aktivasyonun
              gerçekleştiği anda teslim edilmiş sayılır; fiziksel sevkiyat yoktur.
            </p>
          </section>

          <section aria-labelledby="ms5">
            <h2 id="ms5" className={h2Next}>
              5. Ücret ve Ödeme
            </h2>
            <p className={p}>
              Bedel, Türk Lirası veya sipariş ekranında belirtilen para birimi üzerinden
              tahsil edilir. Vergi (KDV vb.) yükümlülükleri, yürürlükteki mevzuata ve fatura /
              makbuz düzenine tabidir; fiyat gösteriminde KDV dahil / hariç durumu teklif
              aşamasında açıkça belirtilir.
            </p>
            <p className={p}>
              Ödeme; kredi/banka kartı, elektronik ödeme araçları veya Satıcı&apos;nın entegre
              ettiği diğer yöntemlerle alınabilir. Ödeme sağlayıcısı tarafından reddedilen
              işlemlerde sözleşme ifa edilmez.
            </p>
          </section>

          <section aria-labelledby="ms6">
            <h2 id="ms6" className={h2Next}>
              6. Cayma Hakkı
            </h2>
            <p className={p}>
              Tüketici sıfatıyla hareket eden Alıcı, yürürlükteki mevzuat uyarınca mesafeli
              sözleşmelerde belirli şartlarda cayma hakkına sahip olabilir. Ancak{" "}
              <strong className="font-semibold text-foreground">
                dijital içerik ve dijital hizmet
              </strong>{" "}
              sunumunda, Alıcı&apos;nın açık onayı ve bilgilendirmesi ile hizmetin ifasına hemen
              başlanması hâlinde, mevzuatta öngörülen istisnalar çerçevesinde{" "}
              <strong className="font-semibold text-foreground">cayma hakkı kullanılamayabilir</strong>.
            </p>
            <div className={box}>
              <p>
                <strong className="font-semibold text-foreground">
                  Tüketici, hizmetin ifasına başlanmasını kabul eder
                </strong>
                . Alıcı; siparişi onaylayarak ve ödemeyi tamamlayarak, dijital hizmetin
                derhal veya kısa sürede ifasına başlanmasına onay vermiş sayılır. Bu kapsamda,{" "}
                <strong className="font-semibold text-foreground">
                  bu durumda cayma hakkı kullanılamayabilir
                </strong>
                ; yürürlükteki zorunlu düzenlemeler ve Satıcı&apos;nın ön bilgilendirme metni
                saklıdır.
              </p>
            </div>
            <p className={p}>
              Cayma hakkının kullanılabileceği istisnai haller (varsa) ve süreleri, ön
              bilgilendirme formunda ve iade politikasında ayrıca belirtilir.
            </p>
          </section>

          <section aria-labelledby="ms7">
            <h2 id="ms7" className={h2Next}>
              7. İade ve Geri Ödeme Koşulları
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Kullanılmış veya aktivasyonu
              tamamlanmış</strong> dijital hizmetlerde, mevzuatın izin verdiği ölçüde geri ödeme
              talebi reddedilebilir. Teknik olarak hizmet hiç sunulmamışsa veya Satıcı kusuru
              ile kalıcı erişim sağlanamamışsa, Alıcı mevzuat kapsamında çözüm talep edebilir.
            </p>
            <p className={p}>
              Yanlış veya mükerrer ödeme tespitinde düzeltme ve iade, Satıcı&apos;nın iç
              prosedürleri ve ödeme kuruluşu süreleri doğrultusunda yapılır.
            </p>
          </section>

          <section aria-labelledby="ms8">
            <h2 id="ms8" className={h2Next}>
              8. Alıcının Yükümlülükleri
            </h2>
            <ul className={ul}>
              <li>Doğru kimlik ve iletişim bilgisi vermek;</li>
              <li>Ödeme yükümlülüğünü yerine getirmek;</li>
              <li>Platformu kötüye kullanmamak, üçüncü kişi haklarını ihlal etmemek;</li>
              <li>Satın alınan özelliği yalnızca sözleşmeye uygun şekilde kullanmak.</li>
            </ul>
          </section>

          <section aria-labelledby="ms9">
            <h2 id="ms9" className={h2Next}>
              9. Satıcının Sorumluluğunun Sınırlandırılması
            </h2>
            <p className={p}>
              Satıcı, işbu sözleşme kapsamında yalnızca tanımlanan dijital platform hizmetinin
              makul teknik sunumundan sorumludur.{" "}
              <strong className="font-semibold text-foreground">Vize sonucu, firma performansı,
              Alıcı&apos;nın ticari kararları veya Üye İşyeri ile ilişkilerden doğan zararlar</strong>{" "}
              Satıcı&apos;nın sorumluluğunda değildir.
            </p>
            <p className={p}>
              Doğrudan veya dolaylı maddi/manevi zarar, kâr kaybı ve üçüncü kişi talepleri
              bakımından Satıcı&apos;nın sorumluluğu, yürürlükteki zorunlu hukuk hükümleri saklı
              kalmak kaydıyla, işbu sözleşmede ve diğer yasal metinlerde düzenlenen çerçeve ile
              sınırlıdır.
            </p>
          </section>

          <section aria-labelledby="ms10">
            <h2 id="ms10" className={h2Next}>
              10. Üçüncü Taraf Hizmetleri
            </h2>
            <p className={p}>
              Üye İşyerleri bağımsız tüzel veya meslek sahipleridir. Platform, listeleme ve
              yönlendirme dışında bu işletmelerin hizmetlerine aracılık etmez, fiyatlandırmaz
              ve taahhüt altına girmez. Alıcı ile Üye İşyeri arasındaki anlaşmalarda Satıcı{" "}
              <strong className="font-semibold text-foreground">taraf değildir</strong>.
            </p>
          </section>

          <section aria-labelledby="ms11">
            <h2 id="ms11" className={h2Next}>
              11. Sözleşmenin Feshi
            </h2>
            <p className={p}>
              Taraflar, mevzuata aykırılık, ödeme ihlali veya Kullanım / Hizmet Koşullarına
              ağır aykırılık hallerinde sözleşmeyi feshedebilir veya erişimi sona erdirebilir.
              Fesih, geçmiş dönemde ifa edilmiş ve bedeli tahsil edilmiş dijital hizmetlere
              ilişkin geri ödeme yükümlülüğü doğurmaz; mevzuatın zorunlu kıldığı haller saklıdır.
            </p>
          </section>

          <section aria-labelledby="ms12">
            <h2 id="ms12" className={h2Next}>
              12. Mücbir Sebep
            </h2>
            <p className={p}>
              Tarafların kontrolü dışındaki olaylar (doğal afet, savaş, salgın, idari karar,
              genel internet kesintisi vb.) mücbir sebep sayılır ve ifa engellendiği sürece
              yükümlülükler askıya alınır.
            </p>
          </section>

          <section aria-labelledby="ms13">
            <h2 id="ms13" className={h2Next}>
              13. Uyuşmazlıkların Çözümü
            </h2>
            <p className={p}>
              İşbu sözleşmeden doğan uyuşmazlıklarda Türkiye Cumhuriyeti kanunları uygulanır.
              Tüketici işlemlerinde Alıcı, yerleşim yerinin bulunduğu veya işlemin yapıldığı
              yerdeki Tüketici Hakem Heyetleri ve Tüketici Mahkemelerine başvurabilir. Tüzel
              kişi veya tüketici olmayan Alıcılar için Satıcı merkezinin bulunduğu yer mahkemeleri
              yetkilidir.
            </p>
          </section>

          <section aria-labelledby="ms14">
            <h2 id="ms14" className={h2Next}>
              14. Yürürlük
            </h2>
            <p className={p}>
              Alıcı, siparişi onaylayarak veya ücretli özelliği satın alarak işbu Mesafeli
              Satış Sözleşmesi&apos;ni elektronik ortamda kabul etmiş sayılır. Metin, Platform&apos;da
              yayımlandığı güncel sürüm ile yürürlüktedir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">İletişim:</strong> {SELLER_ADDRESS}{" "}
              ·{" "}
              <a
                href={`mailto:${SELLER_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {SELLER_EMAIL}
              </a>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
