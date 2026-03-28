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

export function AydinlatmaMetniPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              KVKK · Aydınlatma
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Aydınlatma Metni
            </h1>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                6698 sayılı Kişisel Verilerin Korunması Kanunu
              </strong>{" "}
              (&quot;KVKK&quot;) uyarınca, kişisel verilerinizin işlenmesine ilişkin olarak sizleri
              bilgilendirmekteyiz. Bu metin,{" "}
              <strong className="font-semibold text-foreground">
                Vize Firmaları veri sorumlusu olarak
              </strong>{" "}
              hazırlanmıştır. Platformu kullanmanız halinde{" "}
              <strong className="font-semibold text-foreground">
                kişisel verileriniz işlenmektedir
              </strong>
              ; kapsam ve hukuki çerçeve aşağıda özetlenmiştir.
            </p>
          </header>

          <section aria-labelledby="kvkk1" className="mt-10">
            <h2 id="kvkk1" className={h2First}>
              1. Veri sorumlusu ve ilgili kişi kategorileri
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">Veri sorumlusu:</strong> Vize
              Firmaları
              <br />
              <strong className="font-semibold text-foreground">Adres:</strong>{" "}
              {CONTROLLER_ADDRESS}
              <br />
              <strong className="font-semibold text-foreground">E-posta:</strong>{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <br />
              (Telefon hattı bulunmamaktadır.)
            </p>
            <p className={p}>
              Bu aydınlatma metni başlıca şu <strong className="font-semibold text-foreground">ilgili kişi</strong>{" "}
              gruplarını kapsar:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Misafir Kullanıcı:</strong>{" "}
                hesap oluşturmadan siteyi ziyaret edenler;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye:</strong> hesap oluşturan
                veya kimliği doğrulanmış kullanıcılar;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye İşyeri temsilcileri:</strong>{" "}
                platformda firma profili veya yönetim hesabı için bilgisi işlenen gerçek kişiler.
              </li>
            </ul>
          </section>

          <section aria-labelledby="kvkk2">
            <h2 id="kvkk2" className={h2Next}>
              2. İşlenen kişisel veriler
            </h2>
            <p className={p}>
              Platformun iş modeli gereği işlenen veriler, <strong className="font-semibold text-foreground">aşırı veya
              gereksiz veri toplama</strong> ilkesiyle uyumlu olacak şekilde sınırlı tutulur.
              Örnek kapsam:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Kimlik / iletişim:</strong> ad,
                soyad; e-posta adresi; hesap veya başvuru süreçlerinde talep edilen diğer temel
                iletişim bilgileri;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Hesap ve kullanım:</strong>{" "}
                oturum açma kayıtları, tercihler, platform içi işlem ve tıklama düzeyinde kullanım
                verileri (analitik amaçlı, anonimleştirilmiş veya toplu istatistik de kullanılabilir);
              </li>
              <li>
                <strong className="font-semibold text-foreground">Teknik veriler:</strong> IP
                adresi, cihaz/ tarayıcı türü, işletim sistemi, tarih-saat, çerez ve benzeri teknolojiler
                ile oluşan kayıtlar (ayrıntılar için Çerez Politikası&apos;na bakınız);
              </li>
              <li>
                <strong className="font-semibold text-foreground">Üye İşyeri tarafı:</strong>{" "}
                yetkili temsilci adı-soyadı, iletişim bilgileri, hesap yönetimi için gerekli kayıtlar;
                firma profilinde kamuya açık gösterilen içerikler kullanıcı tercihine bağlıdır.
              </li>
            </ul>
            <p className={p}>
              Özel nitelikli kişisel veri işlenmesi, yalnızca hukuki zorunluluk veya açık rıza
              gibi KVKK&apos;da öngörülen hallerde ve ayrıca bilgilendirilerek gerçekleştirilir.
            </p>
          </section>

          <section aria-labelledby="kvkk3">
            <h2 id="kvkk3" className={h2Next}>
              3. Kişisel verilerin işlenme amaçları
            </h2>
            <p className={p}>
              Kişisel verileriniz başlıca şu amaçlarla işlenir:
            </p>
            <ul className={ul}>
              <li>Platform hizmetlerinin sunulması ve hesapların yönetilmesi;</li>
              <li>Kullanıcı ile iletişim (bildirim, destek talebi, güvenlik uyarıları);</li>
              <li>Performans ölçümü, hata giderme ve kullanıcı deneyiminin iyileştirilmesi;</li>
              <li>Bilgi güvenliği, dolandırıcılığın önlenmesi ve yetkisiz erişimin engellenmesi;</li>
              <li>Mevzuattan doğan yükümlülüklerin yerine getirilmesi ve resmi taleplerin
                karşılanması.</li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Kişisel verileriniz, vize danışmanlığı hizmeti sunmak veya vize başvurusu işlemi
                yürütmek amacıyla işlenmez
              </strong>
              ; bu tür hizmetler yalnızca listelenen Üye İşyerleri ile sizin aranızdaki ilişki
              kapsamında değerlendirilir ve bu aydınlatma metninin konusu dışında kalan doğrudan
              paylaşımlar için İşletmeci veri sorumlusu sıfatıyla sorumlu tutulamaz.
            </p>
          </section>

          <section aria-labelledby="kvkk4">
            <h2 id="kvkk4" className={h2Next}>
              4. Hukuki sebepler (KVKK m. 5 ve m. 6)
            </h2>
            <p className={p}>
              Veri işleme faaliyetleri, veri türü ve işlem bağlamına göre aşağıdaki hukuki
              dayanaklardan bir veya birkaçına dayanabilir:
            </p>
            <ul className={ul}>
              <li>
                <strong className="font-semibold text-foreground">Açık rıza:</strong> Kanunda
                öngörüldüğü veya rıza gerektiren hallerde, ayrıca açıklandığı çerçevede verdiğiniz
                onay;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Sözleşmenin kurulması veya
                ifası:</strong> üyelik, ücretli platform özellikleri veya benzeri hizmet
                ilişkisinin yürütülmesi;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Hukuki yükümlülük:</strong>{" "}
                kanunlardan doğan saklama, bildirim veya denetim yükümlülükleri;
              </li>
              <li>
                <strong className="font-semibold text-foreground">Meşru menfaat:</strong>{" "}
                güvenlik, altyapının işletilmesi, dolandırıcılıkla mücadele ve hizmet kalitesi —
                temel hak ve özgürlüklerinize zarar vermeyecek ölçüde ve dengeli biçimde.
              </li>
            </ul>
          </section>

          <section aria-labelledby="kvkk5">
            <h2 id="kvkk5" className={h2Next}>
              5. Kişisel verilerin aktarılması
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Verileriniz keyfi veya ticari amaçla üçüncü kişilere satılmaz veya rastgele
                paylaşılmaz
              </strong>
              . Aktarım örnekleri:
            </p>
            <ul className={ul}>
              <li>
                Yetkili kamu kurum ve kuruluşlarına, hukuki zorunluluk veya düzenleyici talep
                hallerinde;
              </li>
              <li>
                Hosting, bulut, e-posta iletimi, analitik, ödeme altyapısı gibi{" "}
                <strong className="font-semibold text-foreground">teknik hizmet sağlayıcılarına</strong>
                , yalnızca hizmetin ifası için gerekli ölçüde ve sözleşmesel gizlilik /
                güvenlik yükümlülükleri altında;
              </li>
              <li>
                Hukuki danışmanlık veya denetim süreçlerinde, gizlilik yükümlülüğü çerçevesinde.
              </li>
            </ul>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Kullanıcı ile Üye İşyeri arasında, platform dışında veya doğrudan iletişimle
                paylaştığınız kişisel verilerden İşletmeci sorumlu değildir
              </strong>
              ; bu paylaşımlar tarafların kendi iradeleriyle yürütülen ilişkiye tabidir.
            </p>
          </section>

          <section aria-labelledby="kvkk6">
            <h2 id="kvkk6" className={h2Next}>
              6. Veri saklama süresi
            </h2>
            <p className={p}>
              Kişisel veriler, <strong className="font-semibold text-foreground">işlendikleri
              amaç için gerekli süre</strong> boyunca ve ardından yürürlükteki mevzuatta öngörülen
              zamanaşımı / saklama süreleri saklı kalmak kaydıyla muhafaza edilir. Süre sonunda
              veriler silinir, yok edilir veya <strong className="font-semibold text-foreground">anonim hale
              getirilir</strong>; teknik imkânlar elverdiğince geri döndürülemeyecek şekilde.
            </p>
          </section>

          <section aria-labelledby="kvkk7">
            <h2 id="kvkk7" className={h2Next}>
              7. İlgili kişinin hakları (KVKK m. 11)
            </h2>
            <p className={p}>
              KVKK&apos;nın 11. maddesi uyarınca ilgili kişi olarak haklarınız arasında şunlar
              bulunur:
            </p>
            <ul className={ul}>
              <li>Kişisel verilerinizin işlenip işlenmediğini <strong className="font-semibold text-foreground">öğrenme</strong>;</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme;</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme;</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme;</li>
              <li>Eksik veya yanlış işlenmişse <strong className="font-semibold text-foreground">düzeltilmesini
              isteme</strong>;</li>
              <li>KVKK&apos;da öngörülen şartlar çerçevesinde <strong className="font-semibold text-foreground">silinmesini
              veya yok edilmesini isteme</strong>;</li>
              <li>Aktarılan üçüncü kişilere yukarıdaki işlemlerin bildirilmesini isteme;</li>
              <li>Münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun
                ortaya çıkmasına <strong className="font-semibold text-foreground">itiraz etme</strong>;</li>
              <li>Kanuna aykırı işlenmesi sebebiyle <strong className="font-semibold text-foreground">zararın
              giderilmesini talep etme</strong>.</li>
            </ul>
            <p className={p}>
              Taleplerinizi{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              adresine iletebilirsiniz. Kimliğinizi doğrulamak amacıyla ek bilgi istenebilir.
              Başvurularınız, KVKK&apos;da öngörülen süreler içinde sonuçlandırılır; ret veya
              yetersiz yanıt hâlinde Kişisel Verileri Koruma Kurulu&apos;na şikâyet hakkınız
              saklıdır.
            </p>
          </section>

          <section aria-labelledby="kvkk8">
            <h2 id="kvkk8" className={h2Next}>
              8. Aracı platform olma hususu
            </h2>
            <p className={p}>
              <strong className="font-semibold text-foreground">
                Vize Firmaları yalnızca aracı platformdur
              </strong>
              . Vize başvurusu işlemi yürütülmez; mesleki anlamda vize danışmanlığı{" "}
              <strong className="font-semibold text-foreground">hizmet sağlayıcısı</strong>{" "}
              olunmaz ve veri sorumlusu sıfatıyla bu tür süreçlerin tarafı olunmaz. Üye İşyerleri ile
              kurduğunuz ilişkide işlenen veriler bakımından, söz konusu işlemenin bir kısmı
              ilgili firmanın kendi veri sorumluluğunda olabilir; bu durumda ayrıca o firmanın
              aydınlatma metni de dikkate alınmalıdır.
            </p>
          </section>

          <section aria-labelledby="kvkk9">
            <h2 id="kvkk9" className={h2Next}>
              9. Güvenlik ve ilkeler
            </h2>
            <p className={p}>
              İşletmeci; KVKK ve ikincil düzenlemelere uygun olarak <strong className="font-semibold text-foreground">teknik
              ve idari tedbirler</strong> alır (erişim kontrolü, şifreleme ve benzeri uygun
              önlemler, personel bilgilendirmesi, tedarikçi denetimi). Kişisel veriler, hukuka
              uygunluk, doğruluk ve güncellik, belirli meşru amaçlar için sınırlı işleme ve
              saklama süresi ile uyumlu işlenir.
            </p>
          </section>

          <section aria-labelledby="kvkk10">
            <h2 id="kvkk10" className={h2Next}>
              10. Metnin güncellenmesi
            </h2>
            <p className={p}>
              Bu Aydınlatma Metni, mevzuat veya iş süreçlerindeki değişikliklere bağlı olarak
              güncellenebilir. Güncel sürüm Platform&apos;da yayımlandığı tarihte geçerlidir.
              Önemli değişiklikler mümkün olduğunca duyurulur.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
