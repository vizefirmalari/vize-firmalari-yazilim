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

export function HizmetKosullariPage() {
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
              Hizmet Koşulları
            </h1>
            <p className={p}>
              İşbu <strong className="font-semibold text-foreground">Hizmet Koşulları</strong>
              , <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              platformunun (&quot;Platform&quot;) sunduğu dijital hizmetlerin kapsamını,
              niteliğini ve sınırlarını düzenler. Platforma erişim veya kullanım, bu koşulların
              yanı sıra yürürlükteki <strong className="font-semibold text-foreground">Kullanım Koşulları</strong> ve ilgili
              politikalarla birlikte değerlendirilir. Bu metin özellikle{" "}
              <strong className="font-semibold text-foreground">vize danışmanlık platformu</strong>{" "}
              iş modelinde ücretsiz ve ücretli özelliklerin hukuki çerçevesini belirler;{" "}
              <strong className="font-semibold text-foreground">vize firmaları</strong> ile son
              kullanıcı arasındaki mesleki hizmet ilişkisini düzenlemez.
            </p>
          </header>

          <section aria-labelledby="hk1" className="mt-10">
            <h2 id="hk1" className={h2First}>
              1. Taraflar ve Kapsam
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform İşletmecisi</strong>{" "}
              (&quot;İşletmeci&quot;), Vize Firmaları markası altında aracı listeleme ve dijital
              araçlar sunar. <strong className="font-semibold text-foreground">Misafir Kullanıcı</strong>
              , <strong className="font-semibold text-foreground">Üye</strong> ve{" "}
              <strong className="font-semibold text-foreground">Üye İşyeri</strong> işbu hizmet
              koşulları kapsamında &quot;Kullanıcı&quot; veya ayrı ayrı tanımlandığı şekilde
              yükümlülük altına girer.
            </p>
            <p className={p}>
              İşbu metin yalnızca İşletmeci tarafından sağlanan <strong className="font-semibold text-foreground">platform hizmetlerini</strong>{" "}
              (yazılım erişimi, listeleme altyapısı, görünürlük ve araçlar) kapsar.
            </p>
          </section>

          <section aria-labelledby="hk2">
            <h2 id="hk2" className={h2Next}>
              2. Hizmetin Tanımı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              . İşletmeci tarafından sağlanan hizmetler özetle şunları içerebilir:
            </p>
            <ul className={ul}>
              <li>Üye İşyerlerinin listelenmesi ve profillerinin dijital ortamda görüntülenmesi;</li>
              <li>Kullanıcıların firmaları keşfetmesi ve karşılaştırmasına yönelik teknik imkânlar;</li>
              <li>Bilgilendirme ve yönlendirme niteliğinde içeriklerin sunulması (danışmanlık değildir);</li>
              <li>
                Ücretli olabilecek <strong className="font-semibold text-foreground">premium</strong>{" "}
                özellikler: örneğin görünürlük artırımı, iletişim erişimi, içerik veya başvuru
                süreçlerine yardımcı <strong className="font-semibold text-foreground">araçlar</strong>{" "}
                (otomasyon, şablon, rehber vb. — niteliği Platform tarafından ayrıca tanımlanır).
              </li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">Platform aşağıdakileri yapmaz ve hizmet olarak sunmaz:</strong>{" "}
              vize danışmanlığı, başvuru dosyası hazırlama, konsolosluk veya resmi kurum nezdinde
              işlem yürütme, vize onayı veya red kararı üzerinde etki, sonuç taahhüdü. Bu tür
              faaliyetler yalnızca Kullanıcı ile Üye İşyeri arasında kurulabilecek ayrı bir
              ilişkinin konusu olabilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform herhangi bir hizmet garantisi vermez
              </strong>
              . Listeleme, görünürlük veya araçların çalışır olması; vize başvurusunun kabulü,
              firma performansı veya üçüncü kişi hizmetlerinin kalitesi anlamında hiçbir garanti
              oluşturmaz.
            </p>
          </section>

          <section aria-labelledby="hk3">
            <h2 id="hk3" className={h2Next}>
              3. Ücretsiz ve Ücretli Özellikler
            </h2>
            <p className={p}>
              Platformun bir kısmı ücretsiz erişime açık olabilir; belirli özellikler yalnızca
              Üye İşyeri veya Üye için ve ücret karşılığı sunulabilir. Ücretlendirme, süre,
              kapsam ve iptal koşulları ilgili teklif ekranında, sipariş öncesi bilgilendirmede
              veya ayrı sözleşmede gösterilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">Ödeme konusu</strong> yalnızca
              Platform tarafından sağlanan dijital ürün veya özelliklerdir (örneğin abonelik,
              görünürlük paketi, yazılım modülü erişimi). Ödeme; vize çıkması, danışmanlık
              sonucu, firma tarafından verilen sözün yerine getirilmesi veya herhangi bir dış
              hizmetin başarısı için <strong className="font-semibold text-foreground">karşılık veya teminat</strong>{" "}
              sayılmaz.
            </p>
            <div className={box}>
              <p>
                <strong className="font-semibold text-foreground">
                  Ödeme yapılması, platformun sorumluluğunu artırmaz
                </strong>
                . Ücret ödemiş olsanız dahi İşletmeci, hizmet sağlayıcı sıfatıyla vize veya
                danışmanlık hizmeti sunmaz; Kullanıcı ile Üye İşyeri arasındaki sözleşmenin
                tarafı olmaz. Ödeme, yalnızca Platform özelliklerine erişim veya kullanım hakkı
                tanımasıyla sınırlıdır.
              </p>
            </div>
          </section>

          <section aria-labelledby="hk4">
            <h2 id="hk4" className={h2Next}>
              4. Kullanıcı Yükümlülükleri
            </h2>
            <ul className={ul}>
              <li>
                Listelenen <strong className="font-semibold text-foreground">vize firmaları</strong>{" "}
                hakkındaki bilgileri kendi riskinde değerlendirmek ve doğrulamak;
              </li>
              <li>
                Ücretli özellik satın almadan önce kapsamı ve sınırları okumak; Platformun dış
                hizmetlere kefil olmadığını bilmek;
              </li>
              <li>
                Üye İşyeri ile iletişim, sözleşme ve ödeme konularında dikkatli olmak; anlaşmaları
                Platform dışında veya içinde başlatsa dahi <strong className="font-semibold text-foreground">Platformun bu anlaşmanın tarafı olmadığını</strong>{" "}
                kabul etmek;
              </li>
              <li>
                Yanıltıcı talepte bulunmamak, sistemi kötüye kullanmamak.
              </li>
            </ul>
          </section>

          <section aria-labelledby="hk5">
            <h2 id="hk5" className={h2Next}>
              5. Üye İşyeri Yükümlülükleri
            </h2>
            <p className={p}>
              Üye İşyeri; profilinde ve Platform üzerinde paylaştığı tüm bilgilerin doğru,
              güncel ve mevzuata uygun olmasından; sunduğu mesleki hizmetlerin kendi
              sorumluluğunda yürütülmesinden bizzat sorumludur. Kullanıcıyı yanıltıcı beyan,
              haksız rekabet veya yetkisiz hizmet vaadi yasaktır.
            </p>
            <p className={p}>
              İşletmeci; hatalı veri, yanıltıcı iddia veya hizmet ifaasındaki başarısızlık
              nedeniyle Üye İşyeri adına <strong className="font-semibold text-foreground">kefalet veya tazminat yükümlülüğü</strong>{" "}
              altına girmez.
            </p>
          </section>

          <section aria-labelledby="hk6">
            <h2 id="hk6" className={h2Next}>
              6. Sorumluluğun Sınırlandırılması
            </h2>
            <div className={box}>
              <p>
                <strong className="font-semibold text-foreground">
                  Platform, Kullanıcı ile Üye İşyeri arasında kurulan herhangi bir anlaşmanın
                  tarafı değildir.
                </strong>{" "}
                Taraflar arasındaki ilişkiden doğan hiçbir zarardan sorumlu değildir.
              </p>
              <p className="mt-4">
                <strong className="font-semibold text-foreground">
                  Platform hiçbir doğrudan veya dolaylı zarardan sorumlu tutulamaz
                </strong>
                ; buna maddi ve manevi zarar, kâr kaybı, veri kaybı, itibar kaybı, üçüncü kişi
                talepleri, vize başvurusu sonuçları, firma hizmetlerinin aksaması veya ihlali
                dahildir ancak bunlarla sınırlı değildir.
              </p>
              <p className="mt-4">
                Üçüncü kişilerin eylemleri, internet altyapısı kesintileri veya Üye İşyeri
                kaynaklı içerik ve davranışlardan doğan sonuçlarda İşletmeci&apos;nin
                sorumluluğu, yürürlükteki zorunlu hukuk hükümleri saklı kalmak kaydıyla,
                işbu koşullarda açıkça düzenlenen çerçeve ile sınırlıdır.
              </p>
              <p className="mt-4">
                Platform dışında kurulan veya yürütülen sözleşmeler ile taraflar arası
                uyuşmazlıklarda İşletmeci taraf değildir ve bu çerçevede doğan taleplerden
                sorumlu tutulamaz.
              </p>
            </div>
          </section>

          <section aria-labelledby="hk7">
            <h2 id="hk7" className={h2Next}>
              7. Hizmetin Değiştirilmesi ve Güncellenmesi
            </h2>
            <p className={p}>
              İşletmeci; Platform özelliklerini, fiyatlandırmayı, görünürlük kurallarını ve
              teknik altyapıyı önceden bildirerek veya — güvenlik, yasal uyum veya ciddi operasyonel
              gereklilik hallerinde — <strong className="font-semibold text-foreground">önceden haber vermeksizin</strong>{" "}
              değiştirme, askıya alma veya sonlandırma hakkını saklı tutar. Önemli değişiklikler
              mümkün olduğunca duyurulur; Kullanıcı&apos;nın kullanıma devam etmesi güncel koşulların
              kabulü sayılabilir.
            </p>
          </section>

          <section aria-labelledby="hk8">
            <h2 id="hk8" className={h2Next}>
              8. Askıya Alma ve Erişimin Sona Ermesi
            </h2>
            <p className={p}>
              Kullanım Koşulları veya işbu Hizmet Koşullarına aykırılık, ödeme ihlali, sahte
              bilgi, güvenlik riski veya yasal talep hallerinde İşletmeci; Kullanıcı veya Üye
              İşyeri hesabını geçici olarak askıya alabilir, içeriği kaldırabilir veya erişimi
              kalıcı olarak sona erdirebilir. Bu işlemler, İşletmeci&apos;nin yukarıda belirtilen
              sorumluluk sınırlarını genişletmez.
            </p>
          </section>

          <section aria-labelledby="hk9">
            <h2 id="hk9" className={h2Next}>
              9. Mücbir Sebep
            </h2>
            <p className={p}>
              Tarafların makul kontrolü dışında gelişen ve ifayı engelleyen olaylar (doğal afet,
              savaş, salgın, kamu kararı, genel ağ çökmesi, grev vb.) mücbir sebep sayılır.
              Süre boyunca yükümlülükler askıya alınır; mücbir sebebin devamı hâlinde tarafların
              hakları mevzuata göre şekillenir.
            </p>
          </section>

          <section aria-labelledby="hk10">
            <h2 id="hk10" className={h2Next}>
              10. Uygulanacak Hukuk ve Yetki
            </h2>
            <p className={p}>
              İşbu Hizmet Koşulları&apos;nın yorumlanması ve uygulanmasında Türkiye Cumhuriyeti
              kanunları geçerlidir. İşletmeci merkezinin bulunduğu yer mahkemeleri ve icra
              daireleri yetkilidir. Tüketici sıfatıyla hareket eden Kullanıcılar için 6502 sayılı
              Kanun ve ilgili mevzuattaki zorunlu hükümler saklıdır.
            </p>
          </section>

          <section aria-labelledby="hk11">
            <h2 id="hk11" className={h2Next}>
              11. Yürürlük ve İletişim
            </h2>
            <p className={p}>
              İşbu metin Platform&apos;da yayımlandığı tarihte yürürlüğe girer. Önceki sürümlerin
              yerini alır; geçmiş kullanımlar için yayındaki sürüm geçerli olabilir.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">İletişim</strong> (telefon hattı
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
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
