"use client";

import Link from "next/link";

import { ShareToolActionButton } from "@/components/firm-panel/share-tool-action-button";

type ShareCenterTool = {
  id: "blog" | "video" | "post" | "campaign";
  title: string;
  status: "Aktif" | "Hazır" | "Yakında";
  premiumRequired?: boolean;
  description: string;
  advantage: string[];
  dailyLimit: string;
  hypePoints?: number;
  actionLabel: string;
  disabled?: boolean;
  helperNote?: string;
};

type ShareCenterPanelProps = {
  firmId: string;
  firmName: string;
  logoUrl: string | null;
  hypeScore: number;
  corporatenessScore: number;
  visaTypes: string[];
  countries: string[];
};

const TOOLS: readonly ShareCenterTool[] = [
  {
    id: "blog",
    title: "Blog Yazısı Oluştur",
    status: "Hazır",
    description: "Arama motorlarında görünürlüğünüzü artırın ve potansiyel müşteri çekin.",
    advantage: [
      "Uzun ömürlü görünürlük sağlar",
      "Firma uzmanlığınızı gösterir",
      "Google aramalarından trafik alma potansiyeli oluşturur",
      "Firma profilinizi daha güçlü gösterir",
    ],
    dailyLimit: "Günde 5 adet",
    hypePoints: 25,
    actionLabel: "Blog oluştur",
  },
  {
    id: "video",
    title: "Video Yayınla",
    status: "Yakında",
    premiumRequired: true,
    description: "Dikkat çekici video içeriklerle firmanızı daha görünür hale getirin.",
    advantage: [
      "Görsel etki gücü yüksektir",
      "Akışta daha fazla dikkat çeker",
      "Marka algısını güçlendirir",
      "Yüksek hype potansiyeli sağlar",
    ],
    dailyLimit: "Premium açılışında günlük kota uygulanır",
    hypePoints: 150,
    actionLabel: "Dosya yükle",
    disabled: true,
    helperNote:
      "Önerilen ölçü: 1920 × 1080 px · Minimum: 25 MB · İdeal: 50 MB · Maksimum: 100 MB (Premium)",
  },
  {
    id: "post",
    title: "Akış Gönderisi",
    status: "Hazır",
    description:
      "Kısa duyuru, güncelleme veya görselli akış gönderisi oluşturun. Gönderi yalnızca yayınlandığında akışta görünür ve hype puanınıza katkı sağlar.",
    advantage: [
      "Taslak kaydı ve yayın ayrımı",
      "Metin, görsel, bağlantı ve etiket desteği",
      "Yayında +25 hype (gönderi başına bir kez)",
      "Blogdan daha hafif, akış odaklı düzen",
    ],
    dailyLimit: "Günde 10 adet",
    hypePoints: 25,
    actionLabel: "Gönderi oluştur",
  },
  {
    id: "campaign",
    title: "Kampanya Oluştur",
    status: "Yakında",
    description:
      "Kampanyalarınızı, öne çıkan fırsatlarınızı ve dikkat çekici duyurularınızı daha güçlü biçimde yayınlayın.",
    advantage: [
      "Dönüşüm odaklı görünürlük",
      "Kampanya ve tanıtım odaklı yayın",
      "Firma profilini satış tarafında güçlendirme",
      "Akışta dikkat çekici yer kaplama",
    ],
    dailyLimit: "Kampanya tipine göre limitler bu modül açıldığında tanımlanacaktır",
    actionLabel: "Kampanya oluştur",
    disabled: true,
  },
];

function StatusBadge({
  status,
  premiumRequired,
}: {
  status: ShareCenterTool["status"];
  premiumRequired?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="rounded-full bg-[#0B3C5D]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0B3C5D]">
        {status}
      </span>
      {premiumRequired ? (
        <span className="rounded-full bg-[#D9A441]/18 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B4F10]">
          Premium gerekli
        </span>
      ) : null}
    </div>
  );
}

function ShareToolCard({ firmId, tool }: { firmId: string; tool: ShareCenterTool }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(11,60,93,0.1)] sm:p-5">
      <div className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full bg-[#0B3C5D]/6 transition group-hover:scale-110" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold tracking-tight text-[#0B3C5D]">{tool.title}</h3>
          <StatusBadge status={tool.status} premiumRequired={tool.premiumRequired} />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">{tool.description}</p>

        <ul className="mt-3 space-y-1.5 text-xs text-[#1A1A1A]/68">
          {tool.advantage.map((item) => (
            <li key={item} className="flex items-start gap-1.5">
              <span className="mt-0.5 text-[#0B3C5D]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-4 grid gap-2 ${tool.hypePoints != null ? "sm:grid-cols-2" : ""}`}>
          <div className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]/50">
              Günlük limit
            </p>
            <p className="mt-1 text-xs font-semibold text-[#0B3C5D]">{tool.dailyLimit}</p>
          </div>
          {tool.hypePoints != null ? (
            <div className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]/50">
                Hype katkısı
              </p>
              <p className="mt-1 text-xs font-semibold text-[#0B3C5D]">
                Hype Puanı: +{tool.hypePoints}
              </p>
            </div>
          ) : null}
        </div>

        {tool.helperNote ? (
          <p className="mt-3 rounded-xl border border-[#D9A441]/28 bg-[#D9A441]/10 px-3 py-2 text-[11px] leading-relaxed text-[#5F470E]">
            {tool.helperNote}
          </p>
        ) : null}

        <div className="mt-4">
          {tool.id === "blog" ? (
            <Link
              href={`/panel/${firmId}/paylasim/blog`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
            >
              {tool.actionLabel}
            </Link>
          ) : tool.id === "post" ? (
            <Link
              href={`/firma-panel/${firmId}/gonderi-olustur`}
              className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
                tool.disabled
                  ? "pointer-events-none border border-[#1A1A1A]/15 bg-[#EEF1F4] text-[#1A1A1A]/55"
                  : "bg-[#0B3C5D] text-white hover:bg-[#0A3552]"
              }`}
              aria-disabled={tool.disabled}
            >
              {tool.actionLabel}
            </Link>
          ) : (
            <ShareToolActionButton
              firmId={firmId}
              tool={tool.id === "campaign" ? "campaign" : "video"}
              actionLabel={tool.actionLabel}
              disabled={tool.disabled}
            />
          )}
          {!tool.disabled && tool.id !== "blog" && tool.id !== "post" ? (
            <p className="mt-1 text-[11px] text-[#1A1A1A]/55">
              Bu işlem şu an demo paylaşım kaydı oluşturur ve hype puanını senkron günceller.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function HypeInfoCard({ hypeScore }: { hypeScore: number }) {
  return (
    <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B3C5D]/65">
        Hype puanı rehberi
      </p>
      <h2 className="mt-1 text-lg font-bold text-[#0B3C5D]">Düzenli içerik üreten firmalar öne çıkar</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/68">
        Hype puanı yüksek firmalar Akış sayfasında daha görünür hale gelir. Kaliteli içerikler daha fazla
        dikkat çeker; düzenli paylaşım yapan firmalar potansiyel müşterilerle daha güçlü temas kurar.
      </p>
      <div className="mt-3 inline-flex rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
        Güncel Hype Puanınız: {hypeScore}
      </div>
    </section>
  );
}

export function ShareCenterPanel({
  firmId,
  firmName,
  logoUrl,
  hypeScore,
  corporatenessScore,
  visaTypes,
  countries,
}: ShareCenterPanelProps) {
  const visaPreview = visaTypes.slice(0, 3);
  const countryPreview = countries.slice(0, 4);
  const totalDailyLimit = TOOLS.filter((tool) => !tool.disabled).reduce((acc, tool) => {
    if (tool.id === "blog") return acc + 5;
    if (tool.id === "post") return acc + 10;
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#0B3C5D]/12 bg-linear-to-br from-[#0B3C5D] via-[#124668] to-[#0B3C5D] p-5 text-white shadow-[0_20px_44px_rgba(11,60,93,0.25)] sm:p-7">
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#328CC1]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-14 h-40 w-40 rounded-full bg-[#D9A441]/12 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Akış paylaşım merkezi
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/12 ring-1 ring-white/20">
              {logoUrl ? (
                 
                <img src={logoUrl} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="text-lg font-bold text-white/80">{firmName.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Paylaşım Yap · {firmName}</h1>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/82">
            Arama motorlarında görünürlüğünüzü artırın, firmanızı ön plana çıkarın ve kaliteli
            içeriklerle daha nitelikli müşteri çekme ihtimalinizi yükseltin. Akış paylaşımlarında
            logonuz, firma adınız, uzmanlık alanlarınız ve hizmet verdiğiniz ülkeler otomatik olarak
            içerik kartlarıyla birlikte görünür.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Rekabette öne çıkın
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Akışta daha görünür olun
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Kaliteli müşteri çekin
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/72">
                Günlük yayın kotası
              </p>
              <p className="mt-1 text-xl font-bold">{totalDailyLimit}+ içerik</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/72">
                Hype katsayısı
              </p>
              <p className="mt-1 text-xl font-bold">x{hypeScore >= 60 ? "1.6" : hypeScore >= 30 ? "1.3" : "1.1"}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/72">
                Kurumsallık skoru
              </p>
              <p className="mt-1 text-xl font-bold">{corporatenessScore}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/72">
                Güncel hype
              </p>
              <p className="mt-1 text-xl font-bold">{hypeScore}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <article className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B3C5D]/65">
            Akış kartı önizleme verileri
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/68">
            Paylaşımlarınızda firma kimliğiniz güçlü şekilde gösterilir. Düzenli içerik üretimi, Akışta
            aktif görünmenizi sağlar.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {visaPreview.length > 0 ? visaPreview.map((v) => (
              <span key={v} className="rounded-full border border-[#0B3C5D]/12 bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#0B3C5D]">
                {v}
              </span>
            )) : (
              <span className="rounded-full border border-[#1A1A1A]/12 bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#1A1A1A]/60">
                Uzmanlık alanı eklendikçe burada görünür.
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {countryPreview.length > 0 ? countryPreview.map((c) => (
              <span key={c} className="rounded-full border border-[#1A1A1A]/12 bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#1A1A1A]/75">
                {c}
              </span>
            )) : (
              <span className="rounded-full border border-[#1A1A1A]/12 bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#1A1A1A]/60">
                Hizmet ülkeleri eklendikçe burada görünür.
              </span>
            )}
          </div>
        </article>

        <HypeInfoCard hypeScore={hypeScore} />
      </section>

      <section className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B3C5D]/65">
          4 ana paylaşım aracı
        </p>
        <div className="grid gap-4 xl:grid-cols-2">
          {TOOLS.map((tool) => (
            <ShareToolCard key={tool.id} firmId={firmId} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
