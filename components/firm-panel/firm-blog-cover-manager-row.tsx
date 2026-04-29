"use client";

import Link from "next/link";
import { useEffect, useId, useState, useTransition } from "react";

import { FirmBlogCoverDisplay } from "@/components/blog/firm-blog-cover-display";
import {
  updateFirmBlogCoverOnly,
  uploadFirmBlogCoverImage,
} from "@/lib/actions/firm-panel-blog";

type Props = {
  firmId: string;
  postId: string;
  postSlug: string;
  title: string;
  status: string;
  /** DB cover_image_url */
  initialCoverUrl: string | null;
  editHref: string;
  /** Boşsa kamuya açık blog önizlemesi gizlenir */
  publicBlogHref: string | null;
};

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("TIMEOUT")), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/** Akış: `computeFeedPage` içinde blog için `image_url = cover_image_url` (lib/data/feed.ts). */
export function FirmBlogCoverManagerRow({
  firmId,
  postId,
  postSlug,
  title,
  status,
  initialCoverUrl,
  editHref,
  publicBlogHref,
}: Props) {
  const inputId = useId();
  const [coverUrl, setCoverUrl] = useState(initialCoverUrl);
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"success" | "error" | null>(null);
  const [lastNewUrl, setLastNewUrl] = useState<string | null>(null);

  useEffect(() => {
    setCoverUrl(initialCoverUrl);
  }, [initialCoverUrl, postId]);

  const onPickFile = (file: File | undefined) => {
    if (!file) return;
    setMessage(null);
    setMessageTone(null);
    setLastNewUrl(null);
    startTransition(async () => {
      setBusy(true);
      try {
        const fd = new FormData();
        fd.set("firmId", firmId);
        fd.set("file", file);
        const up = await withTimeout(uploadFirmBlogCoverImage(fd), 60000);
        if (!up.ok) {
          setMessage(up.error);
          setMessageTone("error");
          return;
        }
        const oldUrl = (coverUrl ?? "").trim();
        const newUrl = up.url.trim();
        if (oldUrl === newUrl) {
          setMessage("Yükleme tamamlandı ancak adres öncekiyle aynı görünüyor. Farklı bir dosya seçin.");
          setMessageTone("error");
          return;
        }
        const patch = await updateFirmBlogCoverOnly({
          firmId,
          postId,
          coverImageUrl: newUrl,
        });
        if (!patch.ok) {
          setMessage(patch.error);
          setMessageTone("error");
          return;
        }
        setCoverUrl(newUrl);
        setLastNewUrl(newUrl);
        setMessage("Kapak görseli güncellendi.");
        setMessageTone("success");
      } catch {
        setMessage("Yükleme zaman aşımına uğradı veya başarısız oldu.");
        setMessageTone("error");
      } finally {
        setBusy(false);
      }
    });
  };

  const feedUsesSameAsDb =
    "Akışta görünen image_url, bu yazı için doğrudan cover_image_url ile aynıdır (blog satırı).";

  return (
    <li className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <div className="w-24 shrink-0 overflow-hidden rounded-lg border border-[#1A1A1A]/10 bg-white">
          <FirmBlogCoverDisplay
            src={coverUrl}
            alt=""
            compact
            outerClassName="rounded-lg! bg-[#EEF2F6]"
            showEmptyPlaceholder
          />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <p className="text-sm font-semibold text-[#0B3C5D]">{title}</p>
            <p className="text-[11px] text-[#1A1A1A]/50">
              {status} · slug:{" "}
              <span className="font-mono text-[#1A1A1A]/65">{postSlug}</span>
            </p>
          </div>

          {/* Geçici debug — DB / akış uyumu */}
          <div className="space-y-1 rounded-lg border border-dashed border-[#0B3C5D]/20 bg-white/90 p-2 text-[10px] leading-snug text-[#1A1A1A]/70">
            <p>
              <span className="font-semibold text-[#0B3C5D]/90">Debug (DB)</span>{" "}
              <span className="font-mono break-all">{coverUrl || "— kapak yok —"}</span>
            </p>
            <p>
              <span className="font-semibold text-[#0B3C5D]/90">Akış image_url</span> yazı kartları için:{" "}
              <span className="font-mono break-all">{coverUrl || "—"}</span>{" "}
              <span className="text-[#1A1A1A]/55">({feedUsesSameAsDb})</span>
            </p>
            <p>
              <span className="font-semibold text-[#0B3C5D]/90">Blog detay kapak</span>:{" "}
              <span className="font-mono break-all">{coverUrl || "—"}</span>{" "}
              <span className="text-[#1A1A1A]/55">(aynı alan)</span>
            </p>
            <p className="text-[#1A1A1A]/50">
              Ortak kaynak: <code className="text-[11px]">firm_blog_posts.cover_image_url</code>. Ayrı{" "}
              <code className="text-[11px]">feed_items</code> satırı yoktur.
            </p>
          </div>

          {lastNewUrl ? (
            <p className="text-xs font-medium text-[#067647]">
              Yeni URL: <span className="break-all font-mono">{lastNewUrl}</span>
            </p>
          ) : null}
          {message ? (
            <p className={`text-xs ${messageTone === "success" ? "text-[#067647]" : "text-[#B42318]"}`}>
              {message}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor={inputId}
              className={`inline-flex cursor-pointer rounded-xl border border-[#0B3C5D]/25 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6] ${
                pending || busy ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {pending || busy ? "İşleniyor…" : "Kapak görselini değiştir"}
            </label>
            <input
              id={inputId}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              disabled={pending || busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                onPickFile(f);
                e.currentTarget.value = "";
              }}
            />
            <Link
              href={editHref}
              className="text-xs font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
            >
              Düzenle
            </Link>
            {publicBlogHref ? (
              <a
                href={publicBlogHref}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#124668]/90 underline-offset-2 hover:underline"
              >
                Blog sayfası
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
