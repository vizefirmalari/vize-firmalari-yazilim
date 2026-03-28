import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const CONTACT_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";
const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const faqItems: { q: string; a: ReactNode }[] = [
  {
    q: "Vize Firmaları vize hizmeti veriyor mu?",
    a: (
      <>
        <strong className="font-semibold text-foreground">Hayır.</strong> Vize
        Firmaları bir aracı listeleme ve karşılaştırma platformudur; vize
        danışmanlığı, başvuru hazırlığı, randevu alma veya konsolosluk süreçlerinde
        doğrudan hizmet sunmaz. Tüm{" "}
        <strong className="font-semibold text-foreground">
          vize başvuru süreci
        </strong>{" "}
        ve danışmanlık ilişkisi, yalnızca seçtiğiniz{" "}
        <strong className="font-semibold text-foreground">üye işyeri</strong>{" "}
        (firma) ile aranızda kurulur.
      </>
    ),
  },
  {
    q: "Platform firmalarla nasıl çalışır?",
    a: (
      <>
        Üye işyerleri, kendi beyan ettikleri bilgileri platform üzerinde
        görünür kılar. Vize Firmaları bu bilgileri yalnızca{" "}
        <strong className="font-semibold text-foreground">
          sunum ve karşılaştırma
        </strong>{" "}
        amacıyla listeler; ticari ilişki, sözleşme veya hizmet ifası platformun
        dışında veya doğrudan firma ile sizin aranızda gerçekleşir. Platform,
        firmaların çalışanları değildir ve onların adına taahhüt vermez.
      </>
    ),
  },
  {
    q: "Firma bilgileri neye göre gösteriliyor?",
    a: (
      <>
        Profillerde yer alan içerikler esas olarak{" "}
        <strong className="font-semibold text-foreground">
          firma tarafından sağlanan verilere
        </strong>{" "}
        dayanır. Platform, belirli doğrulama veya düzenleme adımları uygulayabilir;
        buna rağmen gösterilen bilgilerin eksiksiz, güncel veya hukuka uygun
        olduğunu garanti etmez. Karar vermeden önce bilgileri{" "}
        <strong className="font-semibold text-foreground">
          mutlaka firma ile teyit etmeniz
        </strong>{" "}
        gerekir.
      </>
    ),
  },
  {
    q: "Vize sonucumdan kim sorumlu?",
    a: (
      <>
        Vize onayı, ret gerekçesi veya süreler{" "}
        <strong className="font-semibold text-foreground">
          yalnızca yetkili resmi makamların
        </strong>{" "}
        takdirindedir. Vize Firmaları hiçbir sonuç garantisi vermez. Danışmanlık
        veya aracılık hizmeti aldığınız firma ile siz, hizmet kapsamını ve
        sonuç beklentisini kendi aranızda netleştirirsiniz; platform bu sürecin
        tarafı değildir.
      </>
    ),
  },
  {
    q: "Platform üzerinden ödeme yapılıyor mu?",
    a: (
      <>
        Vize Firmaları, kullanıcı adına firma ile aranızdaki ücretlendirmeyi
        yöneten bir ödeme aracısı olarak tanımlanmamalıdır;{" "}
        <strong className="font-semibold text-foreground">
          ödemelerin nasıl ve nerede yapılacağı
        </strong>{" "}
        tamamen sizin ile firma arasındaki anlaşmaya bağlıdır. Ödeme öncesi
        tutarı, hizmet kapsamını ve iptal/iade şartlarını yazılı olarak netleştirmeniz
        önemle tavsiye edilir.
      </>
    ),
  },
  {
    q: "Firma ile iletişimde nelere dikkat etmeliyim?",
    a: (
      <>
        İletişim kurduğunuz kişinin firma adına yetkili olduğundan emin olun;
        verilen sözlü taahhütleri yazılı hale getirin; ücret, süre ve teslim
        edilecek belgeleri netleştirin. Platform üzerinden veya platform dışında
        yapılan görüşmelerde{" "}
        <strong className="font-semibold text-foreground">
          Vize Firmaları aranızdaki iletişimin içeriğinden sorumlu değildir
        </strong>
        .
      </>
    ),
  },
  {
    q: "Yanlış bilgi verilirse ne olur?",
    a: (
      <>
        Yanlış veya yanıltıcı bilginin kaynağı firma ise doğrudan{" "}
        <strong className="font-semibold text-foreground">
          ilgili üye işyeri
        </strong>{" "}
        sorumluluğundadır. Platform, listeleme sınırları içinde makul önlemler
        alabilir; ancak tüm içeriği sürekli denetlemek veya doğruluğunu garanti
        etmek zorunda değildir. Zarar durumunda hukuki başvurunuzu ilgili firma
        ve mevzuata göre değerlendirmeniz gerekir; platforma yönelik talepler,
        işbu rehberde ve ilgili metinlerde düzenlendiği çerçevede değerlendirilir.
      </>
    ),
  },
];

// FAQ şeması için düz metin cevaplar (HTML’siz)
const faqPlainAnswers: Record<string, string> = {
  "Vize Firmaları vize hizmeti veriyor mu?":
    "Hayır. Vize Firmaları aracı listeleme ve karşılaştırma platformudur; vize danışmanlığı veya başvuru hizmeti sunmaz. Süreç, seçtiğiniz üye işyeri ile aranızda yürütülür.",
  "Platform firmalarla nasıl çalışır?":
    "Üye işyerleri kendi beyanlarını listeler; platform yalnızca sunum ve karşılaştırma sağlar. Ticari ilişki ve hizmet ifası firma ile kullanıcı arasındadır.",
  "Firma bilgileri neye göre gösteriliyor?":
    "Öncelikle firma tarafından sağlanan verilere dayanır. Bilgilerin eksiksiz veya güncel olduğu garanti edilmez; teyit kullanıcı sorumluluğundadır.",
  "Vize sonucumdan kim sorumlu?":
    "Sonuçlar yetkili resmi makamlara bağlıdır. Platform sonuç garantisi vermez; firma ile olan hizmet ilişkisi taraflar arasındadır.",
  "Platform üzerinden ödeme yapılıyor mu?":
    "Platform ödeme aracısı değildir; ödeme koşulları kullanıcı ile firma arasında belirlenir.",
  "Firma ile iletişimde nelere dikkat etmeliyim?":
    "Yetki, ücret ve kapsamı yazılı netleştirin. Platform, aranızdaki iletişimin içeriğinden sorumlu değildir.",
  "Yanlış bilgi verilirse ne olur?":
    "Sorumluluk öncelikle ilgili üye işyerinedir. Platform listeleme sınırları içinde önlem alabilir; içerik doğruluğunu garanti etmez.",
};

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          faqPlainAnswers[item.q] ??
          "Detaylar için Vize Firmaları S.S.S. ve İşlem Rehberi sayfasını inceleyin.",
      },
    })),
  };
}

const sectionClass = "mt-12 scroll-mt-28 border-t border-border pt-10 first:mt-0 first:border-t-0 first:pt-0";
const h2Class = "text-xl font-bold tracking-tight text-primary sm:text-2xl";
const leadClass = "mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base";
const listClass = "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base";

export function SssVeIslemRehberiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema()),
        }}
      />
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
              Rehber · Sık sorulan sorular
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              S.S.S. ve İşlem Rehberi
            </h1>
            <p className={leadClass}>
              Bu sayfa, <strong className="font-semibold text-foreground">Vize Firmaları</strong>{" "}
              platformunun nasıl çalıştığını,{" "}
              <strong className="font-semibold text-foreground">
                vize danışmanlık
              </strong>{" "}
              firmalarını nasıl araştırıp karşılaştırabileceğinizi ve hangi
              konularda <strong className="font-semibold text-foreground">dikkatli olmanız</strong>{" "}
              gerektiğini açıklar. Aynı zamanda platformun{" "}
              <strong className="font-semibold text-foreground">
                aracı konumunu ve hukuki sınırlarını
              </strong>{" "}
              net biçimde ortaya koyar.
            </p>
          </header>

          <section id="giris" className={sectionClass} aria-labelledby="h-giris">
            <h2 id="h-giris" className={h2Class}>
              1. Giriş: Platform ne yapar, ne yapmaz?
            </h2>
            <p className={leadClass}>
              Vize Firmaları; <strong className="font-semibold text-foreground">vize firmaları</strong> ve benzeri danışmanlık işletmelerinin
              profillerini listeleyen, karşılaştırmanıza yardımcı olan ve araştırma
              sürecinizi düzenlemenize katkı sağlayan bir{" "}
              <strong className="font-semibold text-foreground">
                aracı bilgi sistemidir
              </strong>
              . Platform:
            </p>
            <ul className={listClass}>
              <li>
                <strong className="font-semibold text-foreground">Yapmaz:</strong>{" "}
                vize danışmanlığı veya başvuru hizmeti sunmak, konsolosluk veya resmi
                kurum adına işlem yapmak, sonuç garantisi vermek, sizin adınıza sözleşme
                imzalamak.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Yapar:</strong>{" "}
                firma bilgilerini (çoğunlukla firma beyanına dayalı şekilde) göstermek,
                listelemek ve karşılaştırma için bir çerçeve sunmak.
              </li>
            </ul>
            <p className={`${leadClass} mt-4`}>
              Kullanıcı tipleri:{" "}
              <strong className="font-semibold text-foreground">Misafir Kullanıcı</strong>{" "}
              (hesap oluşturmadan gezen),{" "}
              <strong className="font-semibold text-foreground">Üye</strong>{" "}
              (hesaplı kullanıcı) ve{" "}
              <strong className="font-semibold text-foreground">Üye İşyeri</strong>{" "}
              (listelenen firmalar). Hizmet ilişkisi, tercih ettiğiniz üye işyeri ile
              doğrudan sizin aranızda şekillenir.
            </p>
          </section>

          <section id="sistem" className={sectionClass} aria-labelledby="h-sistem">
            <h2 id="h-sistem" className={h2Class}>
              2. Sistem nasıl işler?
            </h2>
            <p className={leadClass}>
              <strong className="font-semibold text-foreground">Firma bulma:</strong>{" "}
              Arama ve filtrelerle <strong className="font-semibold text-foreground">vize rehberi</strong> niteliğinde ön araştırma yapabilir,
              profillerde hizmet alanları, iletişim kanalları ve firma tarafından
              paylaşılan diğer bilgilere ulaşabilirsiniz.
            </p>
            <p className={`${leadClass} mt-4`}>
              <strong className="font-semibold text-foreground">Karşılaştırma:</strong>{" "}
              Platform, farklı firmaların beyan ettiği bilgileri yan yana
              değerlendirmenize yardımcı olur; nihai tercih ve risk size aittir.
            </p>
            <p className={`${leadClass} mt-4`}>
              <strong className="font-semibold text-foreground">İletişim:</strong>{" "}
              Firma ile kuracağınız telefon, e-posta, mesaj veya yüz yüze görüşme
              tamamen taraflar arasıdır.{" "}
              <strong className="font-semibold text-foreground">
                Vize Firmaları bu iletişimin içeriğinden, sonuçlarından veya
                taraflar arasında doğan anlaşmalardan sorumlu tutulamaz.
              </strong>
            </p>
          </section>

          <section id="rehber" className={sectionClass} aria-labelledby="h-rehber">
            <h2 id="h-rehber" className={h2Class}>
              3. Adım adım kullanım rehberi
            </h2>
            <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
              <li>
                <strong className="font-semibold text-foreground">İhtiyacınızı netleştirin:</strong>{" "}
                Hangi ülke / <strong className="font-semibold text-foreground">vize başvuru süreci</strong> için destek aradığınızı yazın; profillerdeki hizmet
                kapsamını bu ihtiyaçla eşleştirin.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Kısa liste çıkarın:</strong>{" "}
                Birkaç üye işyerini karşılaştırın; yalnızca tek kaynağa bağlı kalmayın.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Profili kritik okuyun:</strong>{" "}
                Hizmet açıklamaları, ücret beyanları (varsa), iletişim bilgileri ve
                firmanın kendi verdiği uyarıları dikkatle inceleyin.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Bağımsız teyit alın:</strong>{" "}
                Resmi kaynakları (konsolosluk, büyükelçilik, e-ikamet vb.) kontrol edin;
                firmanın iddialarını mutlaka doğrulayın.
              </li>
              <li>
                <strong className="font-semibold text-foreground">İletişime geçmeden önce:</strong>{" "}
                Ücretlendirme, iptal koşulları, süre taahhüdü ve sorumluluk sınırlarını
                yazılı olarak isteyin.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Karar sizin:</strong>{" "}
                Hangi firmayla çalışacağınızı ve hangi koşulları kabul edeceğinizi özgürce
                seçersiniz; platform bu seçimi sizin yerinize yapmaz.
              </li>
            </ol>
          </section>

          <section id="sss" className={sectionClass} aria-labelledby="h-sss">
            <h2 id="h-sss" className={h2Class}>
              4. Sık sorulan sorular (S.S.S.)
            </h2>
            <div className="mt-6 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-border bg-surface/50 px-4 py-3 open:bg-white"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-2">
                      <span>{item.q}</span>
                      <span className="shrink-0 text-primary/40 transition group-open:rotate-180">
                        ▼
                      </span>
                    </span>
                  </summary>
                  <div className="mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-foreground/80">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section
            id="uyarilar"
            className={sectionClass}
            aria-labelledby="h-uyari"
          >
            <h2 id="h-uyari" className={h2Class}>
              5. Önemli uyarılar
            </h2>
            <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-5 sm:p-6">
              <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
                <li>
                  <strong className="font-semibold text-foreground">
                    Firmaları mutlaka kendiniz doğrulayın;
                  </strong>{" "}
                  liste görünürlüğü tek başına kalite, yetki veya sonuç garantisi anlamına gelmez.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Sözleşmeleri dikkatle okuyun;
                  </strong>{" "}
                  imzalamadan önce ücret, hizmet kapsamı ve iade şartlarını anladığınızdan emin olun.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Ödemelerde temkinli olun;
                  </strong>{" "}
                  şüpheli veya baskıcı ödeme taleplerinde işlemi durdurun ve gerekirse yetkili mercilere başvurun.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Platform, sizin ile firma arasındaki sözleşmenin tarafı değildir;
                  </strong>{" "}
                  anlaşmazlıklarda öncelikle firma ve mevzuat çerçevesinde çözüm aranmalıdır.
                </li>
              </ul>
            </div>
          </section>

          <section
            id="sorumluluk"
            className={sectionClass}
            aria-labelledby="h-sorumluluk"
          >
            <h2 id="h-sorumluluk" className={h2Class}>
              6. Sorumluluk reddi ve hukuki sınır
            </h2>
            <div className="mt-4 rounded-xl border border-primary/15 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                <strong className="font-semibold text-foreground">
                  Vize Firmaları;
                </strong>{" "}
                herhangi bir vize sonucundan, maddi veya manevi zarardan, dolaylı veya
                doğrudan zarardan, firma ile kullanıcı arasındaki iletişimden veya
                platform dışında kurulan anlaşmalardan{" "}
                <strong className="font-semibold text-foreground">
                  hukuken sorumlu tutulamaz
                </strong>
                . Platform; hizmet sunmaz, sonuç taahhüt etmez, yükümlülük altına girmez
                ve listelenen bilgilerin doğruluğunu garanti etmez. Tüm sorumluluk,
                bilgileri sağlayan{" "}
                <strong className="font-semibold text-foreground">üye işyeri</strong> ile
                kararları kendisi veren{" "}
                <strong className="font-semibold text-foreground">
                  misafir kullanıcı / üye
                </strong>{" "}
                arasında paylaşılır. Bu metin, platformun aracı rolünü pekiştirmek ve
                kullanıcıları bilgilendirmek amacıyla hazırlanmıştır; ayrıntılı hukuki
                hükümler için sitedeki diğer sözleşme ve politikalar da dikkate alınmalıdır.
              </p>
            </div>
          </section>

          <section id="kapanis" className={sectionClass} aria-labelledby="h-kapanis">
            <h2 id="h-kapanis" className={h2Class}>
              7. Kapanış notu ve iletişim
            </h2>
            <p className={leadClass}>
              Güvenli ve bilinçli kullanım, doğru soruları sormak ve taahhütleri yazılı
              netleştirmekle mümkündür. Vize Firmaları,{" "}
              <strong className="font-semibold text-foreground">vize danışmanlık</strong>{" "}
              ekosisteminde şeffaf bir{" "}
              <strong className="font-semibold text-foreground">vize rehberi</strong> ve
              karşılaştırma alanı sunmayı hedefler; nihai sorumluluk her zaman taraflara
              aittir.
            </p>
            <p className={`${leadClass} mt-6 font-medium text-foreground`}>
              Platform ile ilgili genel sorularınız için (telefon hattı bulunmamaktadır):
            </p>
            <ul className={`${listClass} mt-2`}>
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
