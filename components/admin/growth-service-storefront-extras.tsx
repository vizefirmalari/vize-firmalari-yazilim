"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import {
  adminAddSoftwareProductRelated,
  adminDeleteSoftwareProductFaq,
  adminDeleteSoftwareProductFeature,
  adminDeleteSoftwareProductImage,
  adminDeleteSoftwareProductRelated,
  adminPatchSoftwareProductFaq,
  adminReorderSoftwareProductFaq,
  adminReorderSoftwareProductImages,
  adminReorderSoftwareProductRelated,
  adminSaveGrowthContentBlocks,
  adminSetPrimarySoftwareProductImage,
  adminUpdateSoftwareProductImage,
  adminUpdateSoftwareProductRelated,
  adminUploadSoftwareProductImage,
  adminUpsertSoftwareProductFaq,
  adminUpsertSoftwareProductFeature,
  type SoftwareStorefrontImageType,
} from "@/lib/actions/growth-storefront-admin";
import { publicMediaObjectUrl } from "@/lib/media/supabase-public";

type ImgRow = {
  id: string;
  image_type: string;
  storage_path: string | null;
  image_url: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  is_active: boolean;
};

type FaqRow = { id: string; question: string; answer: string; sort_order: number; is_active: boolean };
type RelRow = { id: string; related_service_id: string; sort_order: number; is_active: boolean; related_title: string };
type FeatRow = { id: string; title: string; description: string | null; icon: string | null; sort_order: number };
type SvcOpt = { id: string; title: string };

function displayUrlForAdmin(img: ImgRow): string | null {
  const u = img.image_url?.trim();
  if (u) return u;
  const sp = img.storage_path?.trim();
  return publicMediaObjectUrl(sp ?? "") || null;
}

const IMAGE_TYPE_OPTIONS: { value: SoftwareStorefrontImageType; label: string }[] = [
  { value: "cover", label: "Kapak" },
  { value: "thumbnail", label: "Thumbnail" },
  { value: "gallery", label: "Galeri" },
  { value: "mobile_cover", label: "Mobil kapak" },
  { value: "feature", label: "Özellik görseli" },
];

export function GrowthServiceStorefrontExtras(props: {
  serviceId: string;
  initialImages: ImgRow[];
  initialFaq: FaqRow[];
  initialRelated: RelRow[];
  initialFeatures: FeatRow[];
  contentBlocksJson: string;
  allServices: SvcOpt[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const images = useMemo(
    () => [...props.initialImages].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialImages]
  );
  const faq = useMemo(
    () => [...props.initialFaq].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialFaq]
  );
  const related = useMemo(
    () => [...props.initialRelated].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialRelated]
  );
  const features = useMemo(
    () => [...props.initialFeatures].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialFeatures]
  );

  const [blocksText, setBlocksText] = useState(props.contentBlocksJson);
  useEffect(() => {
    setBlocksText(props.contentBlocksJson);
  }, [props.contentBlocksJson]);

  const [newImgType, setNewImgType] = useState<SoftwareStorefrontImageType>("gallery");
  const [newImgAlt, setNewImgAlt] = useState("");
  const [newImgManual, setNewImgManual] = useState("");
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newRelId, setNewRelId] = useState("");
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatDesc, setNewFeatDesc] = useState("");
  const [newFeatIcon, setNewFeatIcon] = useState("");

  const relatedPickList = useMemo(
    () => props.allServices.filter((s) => s.id !== props.serviceId && !related.some((r) => r.related_service_id === s.id)),
    [props.allServices, props.serviceId, related]
  );

  function run<T extends { ok: boolean; error?: string }>(fn: () => Promise<T>, okMsg?: string) {
    setMsg(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) {
        setMsg("error" in res && typeof (res as { error?: string }).error === "string" ? (res as { error: string }).error : "Hata");
        return;
      }
      setMsg(okMsg ?? "Kaydedildi.");
      router.refresh();
    });
  }

  return (
    <div className="max-w-3xl space-y-8">
      {msg ? <p className="text-sm font-medium text-[#0B3C5D]">{msg}</p> : null}

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Görsel galeri</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">
          Dosyalar <code className="text-[11px]">media</code> bucket altında saklanır. growth_services üzerindeki kapak / hero URL
          alanları ayrıca korunur.
        </p>

        <form
          className="mt-4 space-y-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            fd.set("serviceId", props.serviceId);
            fd.set("image_type", newImgType);
            fd.set("alt_text", newImgAlt);
            fd.set("manual_url", newImgManual);
            run(async () => adminUploadSoftwareProductImage(fd), "Görsel eklendi.");
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-[#1A1A1A]/55">Görsel türü</label>
              <select
                value={newImgType}
                onChange={(e) => setNewImgType(e.target.value as SoftwareStorefrontImageType)}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
              >
                {IMAGE_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1A1A1A]/55">Dosya</label>
              <input name="file" type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 block w-full text-xs" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Alt metin (isteğe bağlı)</label>
            <input
              value={newImgAlt}
              onChange={(e) => setNewImgAlt(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Manuel URL (dosya yoksa)</label>
            <input
              value={newImgManual}
              onChange={(e) => setNewImgManual(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Yükle / ekle
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {images.map((img, idx) => {
            const src = displayUrlForAdmin(img);
            return (
              <li key={img.id} className="flex flex-col gap-3 rounded-xl border border-[#0B3C5D]/10 p-3 sm:flex-row sm:items-start">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#F7F9FB]">
                  {src ? (
                    <Image src={src} alt="" fill className="object-cover" sizes="112px" unoptimized={!src.includes("supabase")} />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] text-[#1A1A1A]/45">URL yok</span>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-2 text-sm">
                  <p className="font-semibold text-[#0B3C5D]">
                    {img.image_type} · sıra {img.sort_order}
                    {img.is_primary ? " · ana görsel" : ""}
                    {!img.is_active ? " · pasif" : ""}
                  </p>
                  <input
                    defaultValue={img.alt_text ?? ""}
                    placeholder="Alt metin"
                    className="w-full rounded-lg border border-[#0B3C5D]/15 px-2 py-1 text-xs"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v === (img.alt_text ?? "")) return;
                      void adminUpdateSoftwareProductImage({
                        id: img.id,
                        serviceId: props.serviceId,
                        alt_text: v || null,
                      }).then(() => router.refresh());
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pending || idx === 0}
                      className="rounded-lg border border-[#0B3C5D]/20 px-2 py-1 text-xs font-semibold text-[#0B3C5D] disabled:opacity-40"
                      onClick={() => {
                        const next = [...images];
                        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                        run(() =>
                          adminReorderSoftwareProductImages({
                            serviceId: props.serviceId,
                            orderedIds: next.map((x) => x.id),
                          })
                        );
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={pending || idx === images.length - 1}
                      className="rounded-lg border border-[#0B3C5D]/20 px-2 py-1 text-xs font-semibold text-[#0B3C5D] disabled:opacity-40"
                      onClick={() => {
                        const next = [...images];
                        [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                        run(() =>
                          adminReorderSoftwareProductImages({
                            serviceId: props.serviceId,
                            orderedIds: next.map((x) => x.id),
                          })
                        );
                      }}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-[#0B3C5D]/20 px-2 py-1 text-xs font-semibold text-[#0B3C5D]"
                      onClick={() => run(() => adminSetPrimarySoftwareProductImage({ id: img.id, serviceId: props.serviceId }), "Ana görsel seçildi.")}
                    >
                      Ana görsel
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-[#0B3C5D]/20 px-2 py-1 text-xs font-semibold text-[#0B3C5D]"
                      onClick={() =>
                        run(() =>
                          adminUpdateSoftwareProductImage({
                            id: img.id,
                            serviceId: props.serviceId,
                            is_active: !img.is_active,
                          })
                        )
                      }
                    >
                      {img.is_active ? "Pasifleştir" : "Aktifleştir"}
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-red-600/25 px-2 py-1 text-xs font-semibold text-red-700"
                      onClick={() => {
                        if (!confirm("Bu görseli silmek istiyor musunuz?")) return;
                        run(() => adminDeleteSoftwareProductImage({ id: img.id, serviceId: props.serviceId }), "Silindi.");
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B3C5D]">SSS</h2>
        <ul className="mt-4 space-y-4">
          {faq.map((f, idx) => (
            <li key={f.id} className="rounded-xl border border-[#0B3C5D]/10 p-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={idx === 0 || pending}
                  className="rounded-lg border px-2 py-1 text-xs disabled:opacity-40"
                  onClick={() => {
                    const next = [...faq];
                    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                    run(() => adminReorderSoftwareProductFaq({ serviceId: props.serviceId, orderedIds: next.map((x) => x.id) }));
                  }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={idx === faq.length - 1 || pending}
                  className="rounded-lg border px-2 py-1 text-xs disabled:opacity-40"
                  onClick={() => {
                    const next = [...faq];
                    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                    run(() => adminReorderSoftwareProductFaq({ serviceId: props.serviceId, orderedIds: next.map((x) => x.id) }));
                  }}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="rounded-lg border px-2 py-1 text-xs"
                  onClick={() => run(() => adminPatchSoftwareProductFaq({ id: f.id, serviceId: props.serviceId, is_active: !f.is_active }))}
                >
                  {f.is_active ? "Pasif" : "Aktif"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-red-600/25 px-2 py-1 text-xs text-red-700"
                  onClick={() => {
                    if (!confirm("SSS silinsin mi?")) return;
                    run(() => adminDeleteSoftwareProductFaq({ id: f.id, serviceId: props.serviceId }));
                  }}
                >
                  Sil
                </button>
              </div>
              <FaqEditorRow f={f} serviceId={props.serviceId} onSaved={() => router.refresh()} />
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 rounded-xl border border-dashed border-[#0B3C5D]/20 p-4">
          <p className="text-xs font-semibold text-[#1A1A1A]/55">Yeni soru</p>
          <input
            value={newFaqQ}
            onChange={(e) => setNewFaqQ(e.target.value)}
            placeholder="Soru"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
          <textarea
            value={newFaqA}
            onChange={(e) => setNewFaqA(e.target.value)}
            placeholder="Cevap"
            rows={3}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
          <button
            type="button"
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
            onClick={() =>
              run(async () => {
                const res = await adminUpsertSoftwareProductFaq({
                  serviceId: props.serviceId,
                  question: newFaqQ,
                  answer: newFaqA,
                  sort_order: faq.length,
                });
                if (res.ok) {
                  setNewFaqQ("");
                  setNewFaqA("");
                }
                return res;
              }, "Eklendi.")
            }
          >
            Ekle
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B3C5D]">İlgili çözümler</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <select value={newRelId} onChange={(e) => setNewRelId(e.target.value)} className="min-w-[12rem] rounded-xl border px-3 py-2 text-sm">
            <option value="">Hizmet seç…</option>
            {relatedPickList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => {
              if (!newRelId) return;
              run(async () => {
                const res = await adminAddSoftwareProductRelated({ serviceId: props.serviceId, related_service_id: newRelId });
                if (res.ok) setNewRelId("");
                return res;
              }, "Eklendi.");
            }}
          >
            Bağla
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {related.map((r, idx) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm">
              <span className="font-medium text-[#0B3C5D]">{r.related_title}</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={idx === 0 || pending}
                  className="rounded border px-2 py-0.5 text-xs disabled:opacity-40"
                  onClick={() => {
                    const next = [...related];
                    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                    run(() => adminReorderSoftwareProductRelated({ serviceId: props.serviceId, orderedIds: next.map((x) => x.id) }));
                  }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={idx === related.length - 1 || pending}
                  className="rounded border px-2 py-0.5 text-xs disabled:opacity-40"
                  onClick={() => {
                    const next = [...related];
                    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                    run(() => adminReorderSoftwareProductRelated({ serviceId: props.serviceId, orderedIds: next.map((x) => x.id) }));
                  }}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="rounded border px-2 py-0.5 text-xs"
                  onClick={() => run(() => adminUpdateSoftwareProductRelated({ id: r.id, serviceId: props.serviceId, is_active: !r.is_active }))}
                >
                  {r.is_active ? "Pasif" : "Aktif"}
                </button>
                <button
                  type="button"
                  className="rounded border border-red-600/30 px-2 py-0.5 text-xs text-red-700"
                  onClick={() => {
                    if (!confirm("Kaldırılsın mı?")) return;
                    run(() => adminDeleteSoftwareProductRelated({ id: r.id, serviceId: props.serviceId }));
                  }}
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Özellik kartları</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">Detay sayfası “Özellikler” sekmesi; boşsa paket içeriği satırları kullanılır.</p>
        <ul className="mt-3 space-y-2">
          {features.map((f) => (
            <li key={f.id} className="flex flex-col gap-1 rounded-xl border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span>
                {f.icon ? <span className="mr-1">{f.icon}</span> : null}
                <strong>{f.title}</strong>
                {f.description ? <span className="text-[#1A1A1A]/60"> — {f.description}</span> : null}
              </span>
              <button
                type="button"
                className="self-start rounded border border-red-600/30 px-2 py-0.5 text-xs text-red-700 sm:self-auto"
                onClick={() => run(() => adminDeleteSoftwareProductFeature({ id: f.id, serviceId: props.serviceId }))}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <input value={newFeatIcon} onChange={(e) => setNewFeatIcon(e.target.value)} placeholder="İkon (emoji / kısa metin)" className="rounded-xl border px-3 py-2 text-sm" />
          <input value={newFeatTitle} onChange={(e) => setNewFeatTitle(e.target.value)} placeholder="Başlık" className="rounded-xl border px-3 py-2 text-sm" />
          <textarea
            value={newFeatDesc}
            onChange={(e) => setNewFeatDesc(e.target.value)}
            placeholder="Açıklama"
            rows={2}
            className="sm:col-span-2 rounded-xl border px-3 py-2 text-sm"
          />
          <button
            type="button"
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white sm:col-span-2"
            onClick={() =>
              run(async () => {
                const res = await adminUpsertSoftwareProductFeature({
                  serviceId: props.serviceId,
                  title: newFeatTitle,
                  description: newFeatDesc || null,
                  icon: newFeatIcon || null,
                  sort_order: features.length,
                });
                if (res.ok) {
                  setNewFeatTitle("");
                  setNewFeatDesc("");
                  setNewFeatIcon("");
                }
                return res;
              }, "Özellik eklendi.")
            }
          >
            Özellik ekle
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Süreç içerik blokları (JSON)</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">
          Dizi formatında sort_order, heading ve body alanları. Örnek: bir blokta “Nasıl çalışır?” başlığı ve gövde metni.
        </p>
        <textarea
          value={blocksText}
          onChange={(e) => setBlocksText(e.target.value)}
          rows={10}
          className="mt-2 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 font-mono text-xs"
        />
        <button
          type="button"
          className="mt-2 rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
          onClick={() => run(() => adminSaveGrowthContentBlocks({ serviceId: props.serviceId, jsonText: blocksText }), "Bloklar kaydedildi.")}
        >
          Blokları kaydet
        </button>
      </section>
    </div>
  );
}

function FaqEditorRow({ f, serviceId, onSaved }: { f: FaqRow; serviceId: string; onSaved: () => void }) {
  const [q, setQ] = useState(f.question);
  const [a, setA] = useState(f.answer);
  useEffect(() => {
    setQ(f.question);
    setA(f.answer);
  }, [f.question, f.answer]);
  return (
    <div className="mt-2 space-y-2">
      <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg border px-2 py-1 text-sm font-semibold" />
      <textarea value={a} onChange={(e) => setA(e.target.value)} rows={3} className="w-full rounded-lg border px-2 py-1 text-sm" />
      <button
        type="button"
        className="rounded-lg bg-[#0B3C5D] px-3 py-1 text-xs font-semibold text-white"
        onClick={async () => {
          const res = await adminUpsertSoftwareProductFaq({
            id: f.id,
            serviceId,
            question: q,
            answer: a,
            sort_order: f.sort_order,
            is_active: f.is_active,
          });
          if (res.ok) onSaved();
        }}
      >
        Kaydet
      </button>
    </div>
  );
}
