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

export function KisiselVerilerGizlilikPolitikasiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              KVKK · Gizlilik
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik Politikası
            </h1>
            <p className={p}>
              İşbu politika, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              (&quot;Platform&quot; / &quot;İşletmeci&quot;) tarafından yürütülen kişisel veri
              işleme faaliyetlerinin esaslarını, güvenlik ve gizlilik taahhütlerini ve ilgili
              kişi haklarını düzenler. <strong className="font-semibold text-foreground">
                6698 sayılı Kişisel Verilerin Korunması Kanunu
              </strong>{" "}
              (&quot;KVKK&quot;) ve ikincil mevzuata uyum hedeflenmiştir. Bu metin, site üzerindeki{" "}
              <Link
                href="/aydinlatma-metni"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Aydınlatma Metni
              </Link>{" "}
              ile birlikte okunmalıdır.
            </p>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları veri sorumlusu olarak
              </strong>
              , faaliyetleri kapsamında{" "}
              <strong className="font-semibold text-foreground">
                kişisel verileriniz işlenmektedir
              </strong>
              . İşleme faaliyetlerinin ayrıntıları aşağıda gruplandırılmıştır.
            </p>
          </header>

          <section aria-labelledby="gp1" className="mt-10">
            <h2 id="gp1" className={h2First}>
              1. Veri sorumlusu ve kapsam
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Veri sorumlusu:</strong> Vize
              Firmaları
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong>{" "}
              {CONTROLLER_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">İletişim (KVKK başvuruları
              dahil):</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className={p}>
              Politika; Platform&apos;a erişen ve hizmetlerden yararlanan ilgili kişiler için
              geçerlidir. <strong className="font-semibold text-foreground">Vize Firmaları yalnızca
              aracı platformdur</strong>; mesleki vize danışmanlığı veya başvuru işlemi sunulmaz.
            </p>
          </section>

          <section aria-labelledby="gp2">
            <h2 id="gp2" className={h2Next}>
              2. İlgili kişi kategorileri
            </h2>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Misafir Kullanıcı:</strong>{" "}
                üyelik oluşturmadan ziyaret edenler;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye:</strong> hesap açan veya
                kimliği doğrulanmış kullanıcılar;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye İşyeri temsilcileri:</strong>{" "}
                firma hesabı veya listeleme kapsamında kişisel verisi işlenen gerçek kişiler.
              </li>
            </ul>
          </section>

          <section aria-labelledby="gp3">
            <h2 id="gp3" className={h2Next}>
              3. İşlenen kişisel veri kategorileri
            </h2>
            <p className={p}>
              Toplanan veriler, <strong className="font-semibold text-foreground">amaçla bağlantılı
              ve ölçülü</strong> olacak şekilde sınırlanır; gerçek iş süreçleriyle uyumlu örnekler:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Kimlik verileri:</strong> ad,
                soyad (hesap veya iletişim formlarında);
              </li>
              <li>
                <strong className="font-semibold text-foreground">İletişim verileri:</strong>{" "}
                e-posta adresi; bildirim ve destek için kullanılan iletişim kanalları;
              </li>
              <li>
                <strong className="font-semibold text-foreground">İşlem / kullanım verileri:</strong>{" "}
                platform içi oturum, tercihler, arama ve listeleme etkileşimleri, destek talepleri
                ile sınırlı işlem kayıtları;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Teknik veriler:</strong> IP
                adresi, cihaz ve tarayıcı bilgisi, işletim sistemi, bağlantı zamanı, günlük
                (log) kayıtları;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Çerez ve benzeri teknolojiler:</strong>{" "}
                tanımlayıcılar, tercih çerezleri, performans ve analitik verileri (ayrıntı için
                bkz.{" "}
                <Link
                  href="/cerez-politikasi"
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  Çerez Politikası
                </Link>
                );
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye İşyeri ile ilişkili veriler:</strong>{" "}
                yetkili temsilci bilgileri, sözleşme ve faturalama için gerekli kayıtlar, profil
                yönetimine ilişkin veriler.
              </li>
            </ul>
            <p className={p}>
              Özel nitelikli kişisel veriler, ancak kanunda öngörülen şartlar ve ayrıca aydınlatma
              / rıza gerektiren hallerde işlenir.
            </p>
          </section>

          <section aria-labelledby="gp4">
            <h2 id="gp4" className={h2Next}>
              4. Kişisel verilerin işlenme amaçları
            </h2>
            <p className={p}>
              Veriler başlıca şu amaçlarla işlenir:
            </p>
            <ul className={ul}>
              <li>Platform hizmetlerinin sunulması, listeleme ve karşılaştırma işlevlerinin
                çalıştırılması;</li>
              <li>Hesap oluşturma, kimlik doğrulama ve kullanıcı deneyiminin yönetilmesi;</li>
              <li>Kullanıcı ile iletişim, bildirimler ve destek süreçleri;</li>
              <li>Arayüz ve performansın iyileştirilmesi, hata analizi ve istatistiksel özetleme;</li>
              <li>Siber tehditlere karşı koruma, yetkisiz erişimin önlenmesi ve denetim izleri;</li>
              <li>Vergi, muhafaza ve bildirim gibi <strong className="font-semibold text-foreground">hukuki
              yükümlülüklerin</strong> yerine getirilmesi.</li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Platform, kişisel verileri vize danışmanlığı hizmeti sunmak veya vize başvurusu
                sürecini yürütmek amacıyla işlemez
              </strong>
              . Bu tür amaçlar, varsa, yalnızca Kullanıcı ile Üye İşyeri arasındaki bağımsız
              ilişki kapsamında değerlendirilir.
            </p>
          </section>

          <section aria-labelledby="gp5">
            <h2 id="gp5" className={h2Next}>
              5. Hukuki sebepler (KVKK m. 5 ve m. 6)
            </h2>
            <p className={p}>
              İşleme faaliyetleri veri türü ve bağlama göre şu dayanaklardan biri veya birkaçına
              dayanır:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Açık rıza:</strong> Kanunun
                gerektirdiği veya ayrıca sunulan onay kapsamındaki işlemler;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Sözleşmenin kurulması veya
                ifası:</strong> üyelik, dijital hizmet veya Üye İşyeri sözleşmesinin ifası;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Hukuki yükümlülük:</strong>{" "}
                mevzuattan doğan saklama ve raporlama;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Meşru menfaat:</strong> güvenlik,
                dolandırıcılıkla mücadele, hizmet kalitesi ve altyapının sürdürülmesi — temel hak
                ve özgürlüklerle dengeli şekilde.
              </li>
            </ul>
          </section>

          <section aria-labelledby="gp6">
            <h2 id="gp6" className={h2Next}>
              6. Kişisel verilerin aktarılması
            </h2>
            <p className={p}>
              Veriler; <strong className="font-semibold text-foreground">rastgele veya ticari
              liste satışı</strong> amacıyla paylaşılmaz. Aktarım örnekleri:
            </p>
            <ul className={ul}>
              <li>Yasal düzenlemeler gereği <strong className="font-semibold text-foreground">yetkili
              kamu kurum ve kuruluşları</strong>;</li>
              <li>
                Hosting, bulut, CDN, e-posta, analitik, ödeme altyapısı gibi{" "}
                <strong className="font-semibold text-foreground">teknik hizmet sağlayıcıları</strong>
                , veri işleme sözleşmesi veya eşdeğer yükümlülükler çerçevesinde ve gerektiği
                kadar;
              </li>
              <li>Hukuki uyuşmazlık veya denetimde profesyonel danışmanlar (gizlilik yükümlülüğü
                altında).</li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Kullanıcıların, Üye İşyerleri ile platform dışında veya doğrudan iletişimle
                paylaştığı kişisel veriler, İşletmeci&apos;nin kontrolü dışındadır
              </strong>
              . Bu tür kullanıcı–firma iletişimi ve veri alışverişi bakımından Platform, veri
              sorumlusu sıfatıyla sorumluluk üstlenmez; taraflar arası anlaşmalar İşletmeci&apos;yi
              bağlamaz.
            </p>
          </section>

          <section aria-labelledby="gp7">
            <h2 id="gp7" className={h2Next}>
              7. Saklama süreleri
            </h2>
            <p className={p}>
              Kişisel veriler, <strong className="font-semibold text-foreground">işlendikleri
              amaç için zorunlu süre</strong> boyunca saklanır. Vergi, ticari defter, uyuşmazlık
              veya idari talepler için kanunda öngörülen <strong className="font-semibold text-foreground">asgari
              saklama süreleri</strong> saklıdır.               Süre sonunda veriler silinir, yok edilir veya teknik olarak mümkün olduğu ölçüde{" "}
              <strong className="font-semibold text-foreground">anonim hale getirilir</strong>.
            </p>
          </section>

          <section aria-labelledby="gp8">
            <h2 id="gp8" className={h2Next}>
              8. Veri güvenliği
            </h2>
            <p className={p}>
              İşletmeci, KVKK ve Kurul rehberlerine uygun <strong className="font-semibold text-foreground">idari
              ve teknik tedbirler</strong> uygular: erişim yetkilendirmesi, güvenli altyapı tercihi,
              güncellemeler, yedekleme ve olay müdahale süreçleri, çalışan ve iş ortaklarına
              yönelik gizlilik bilinci. <strong className="font-semibold text-foreground">Yetkisiz
              erişim, ifşa veya kayıp risklerine karşı</strong> makul düzeyde koruma hedeflenir;
              mutlak güvenlik vaadi verilmez, olaylarda mevzuata uygun bildirim ve iyileştirme
              yükümlülükleri dikkate alınır.
            </p>
          </section>

          <section aria-labelledby="gp9">
            <h2 id="gp9" className={h2Next}>
              9. İlgili kişinin hakları (KVKK m. 11)
            </h2>
            <p className={p}>
              İlgili kişi olarak haklarınız arasında özetle şunlar bulunur:
            </p>
            <ul className={ul}>
              <li>Kişisel verilerinizin işlenip işlenmediğini <strong className="font-semibold text-foreground">öğrenme</strong>;</li>
              <li>İşlenmişse buna ilişkin <strong className="font-semibold text-foreground">bilgi talep
              etme</strong>;</li>
              <li>Yanlış veya eksikse <strong className="font-semibold text-foreground">düzeltilmesini
              isteme</strong>;</li>
              <li>Şartları oluştuğunda <strong className="font-semibold text-foreground">silinmesini
              veya yok edilmesini isteme</strong>;</li>
              <li>Otomatik sistemlerle işlenmesi sonucu aleyhinize bir sonuca <strong className="font-semibold text-foreground">itiraz
              etme</strong>;</li>
              <li>Kanuna aykırı işleme nedeniyle <strong className="font-semibold text-foreground">zararın
              giderilmesini talep etme</strong>.</li>
            </ul>
            <p className={p}>
              Başvurularınızı{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresine iletebilirsiniz. Kimlik teyidi için ek bilgi istenebilir. Süre ve usul
              KVKK&apos;ya göredir; sonuca itiraz için Kişisel Verileri Koruma Kurulu&apos;na başvuru
              hakkınız saklıdır.
            </p>
          </section>

          <section aria-labelledby="gp10">
            <h2 id="gp10" className={h2Next}>
              10. Çerez kullanımı
            </h2>
            <p className={p}>
              Platformda <strong className="font-semibold text-foreground">çerezler ve benzeri
              teknolojiler</strong> kullanılabilir. Bunlar; sitenin çalışması (zorunlu), tercihlerin
              hatırlanması (işlevsel), performans ve <strong className="font-semibold text-foreground">analitik</strong>{" "}
              ölçümleri gibi amaçlarla sınırlı tutulur. Çerez türleri, saklama süreleri ve
              yönetim seçenekleri{" "}
              <Link
                href="/cerez-politikasi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Çerez Politikası
              </Link>
              &apos;nda açıklanır.
            </p>
          </section>

          <section aria-labelledby="gp11">
            <h2 id="gp11" className={h2Next}>
              11. Aracı platform ve sorumluluk sınırı
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              . <strong className="font-semibold text-foreground">Hizmet sağlayıcı</strong> sıfatıyla
              vize danışmanlığı veya başvuru işlemi yürütülmez. Kullanıcı ile Üye İşyeri arasındaki
              görüşme, sözleşme ve veri paylaşımı bakımından İşletmeci{" "}
              <strong className="font-semibold text-foreground">taraf değildir</strong>; platform
              dışı veya doğrudan paylaşılan verilerden ve taraflar arası anlaşmalardan doğan
              sonuçlardan sorumlu tutulamaz.
            </p>
          </section>

          <section aria-labelledby="gp12">
            <h2 id="gp12" className={h2Next}>
              12. Gizlilik ve veri kullanım ilkeleri
            </h2>
            <p className={p}>
              Kullanıcı verileri, <strong className="font-semibold text-foreground">mevzuata uygun
              ve güvenli</strong> biçimde işlenir. Kişisel veriler <strong className="font-semibold text-foreground">keyfi
              olarak satılmaz</strong> veya açıklanmaz; işleme faaliyetleri şeffaflık, amaç
              bağlılığı ve veri minimizasyonu ilkeleriyle yürütülür.
            </p>
          </section>

          <section aria-labelledby="gp13">
            <h2 id="gp13" className={h2Next}>
              13. Politikanın güncellenmesi
            </h2>
            <p className={p}>
              Bu politika; mevzuat, Kurul kararları, teknik gelişmeler veya iş modeli değişiklikleri
              nedeniyle güncellenebilir. <strong className="font-semibold text-foreground">Güncel
              metni düzenli aralıklarla gözden geçirmeniz</strong> önerilir. Önemli değişiklikler
              mümkün olduğunca Platform üzerinden duyurulur; yayımlandığı sürüm geçerlidir.
            </p>
          </section>

          <section aria-labelledby="gp14">
            <h2 id="gp14" className={h2Next}>
              14. Son hükümler
            </h2>
            <p className={p}>
              Bu Gizlilik Politikası ile Aydınlatma Metni ve Kullanım Koşulları arasında çelişki
              olması hâlinde, konuya göre özel düzenleme veya daha güncel metin öncelikli
              yorumlanabilir. Politika hukuki danışmanlık yerine geçmez; zorunlu tüketici ve
              kişilik hakkı düzenlemeleri saklıdır.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
