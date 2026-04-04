"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef, useState, useTransition } from "react";
import type { MouseEvent } from "react";

import type { BlogCtaButton } from "@/lib/blog/cta-buttons";
import { publishFirmFeedPost, saveFirmFeedPostDraft } from "@/lib/actions/firm-feed-post";

import { FirmFeedPostEditorActionBar } from "./firm-feed-post-editor-action-bar";
import { FirmFeedPostEditorBodyField } from "./firm-feed-post-editor-body-field";
import { FirmFeedPostEditorCtaButtons } from "./firm-feed-post-editor-cta-buttons";
import { FirmFeedPostEditorHeader } from "./firm-feed-post-editor-header";
import { FirmFeedPostEditorTags } from "./firm-feed-post-editor-tags";
import type { FirmFeedPostInitialDraft } from "./types";

const FirmFeedPostEditorImages = dynamic(
  () => import("./firm-feed-post-editor-images").then((m) => m.FirmFeedPostEditorImages),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] px-3 py-6 text-center text-xs text-[#1A1A1A]/45">
        Görsel yükleme alanı yükleniyor…
      </div>
    ),
  }
);

type EditorSnapshot = {
  body: string;
  imageUrls: string[];
  ctaButtons: BlogCtaButton[];
  tags: string[];
  postId: string | null;
};

function toSnapshot(s: EditorSnapshot): string {
  return JSON.stringify({
    body: s.body,
    imageUrls: s.imageUrls,
    ctaButtons: s.ctaButtons,
    tags: s.tags,
    postId: s.postId,
  });
}

type Props = {
  firmId: string;
  initialDraft: FirmFeedPostInitialDraft | null;
};

export function FirmFeedPostEditor({ firmId, initialDraft }: Props) {
  const router = useRouter();
  const [, bumpBaselineRender] = useReducer((n: number) => n + 1, 0);
  const [isPending, startTransition] = useTransition();
  const [postId, setPostId] = useState<string | null>(initialDraft?.id ?? null);
  const [body, setBody] = useState(initialDraft?.body ?? "");
  const [imageUrls, setImageUrls] = useState<string[]>(initialDraft?.imageUrls ?? []);
  const [ctaButtons, setCtaButtons] = useState<BlogCtaButton[]>(initialDraft?.ctaButtons ?? []);
  const [tags, setTags] = useState<string[]>(initialDraft?.tags ?? []);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const baselineRef = useRef<string>(
    toSnapshot({
      body: initialDraft?.body ?? "",
      imageUrls: initialDraft?.imageUrls ?? [],
      ctaButtons: initialDraft?.ctaButtons ?? [],
      tags: initialDraft?.tags ?? [],
      postId: initialDraft?.id ?? null,
    })
  );

  const editorStateRef = useRef({ body, imageUrls, ctaButtons, tags, postId });
  editorStateRef.current = { body, imageUrls, ctaButtons, tags, postId };

  useEffect(() => {
    const dirty = toSnapshot(editorStateRef.current) !== baselineRef.current;
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [body, imageUrls, ctaButtons, tags, postId]);

  const backHref = `/panel/${firmId}/paylasim`;
  const onBackNavigation = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (toSnapshot(editorStateRef.current) === baselineRef.current) return;
    const ok = window.confirm(
      "Kaydedilmemiş değişiklikler var. Sayfadan çıkmak istediğinize emin misiniz?"
    );
    if (!ok) e.preventDefault();
  }, []);

  const setMsg = useCallback((m: string | null) => setMessage(m), []);

  const saveDraft = useCallback(() => {
    setMessage(null);
    startTransition(async () => {
      const res = await saveFirmFeedPostDraft({
        firmId,
        postId,
        body,
        imageUrls,
        ctaButtons,
        tags,
      });
      if (!res.ok) {
        setMessage(res.error);
        return;
      }
      setPostId(res.id);
      baselineRef.current = toSnapshot({
        body,
        imageUrls,
        ctaButtons,
        tags,
        postId: res.id,
      });
      bumpBaselineRender();
      setMessage("Taslak kaydedildi.");
      router.refresh();
    });
  }, [firmId, postId, body, imageUrls, ctaButtons, tags, router]);

  const publish = useCallback(() => {
    setMessage(null);
    startTransition(async () => {
      const res = await publishFirmFeedPost({
        firmId,
        postId,
        body,
        imageUrls,
        ctaButtons,
        tags,
      });
      if (!res.ok) {
        setMessage(res.error);
        return;
      }
      setPostId(res.id);
      baselineRef.current = toSnapshot({
        body,
        imageUrls,
        ctaButtons,
        tags,
        postId: res.id,
      });
      router.replace(backHref);
      router.refresh();
    });
  }, [firmId, postId, body, imageUrls, ctaButtons, tags, router, backHref]);

  const busy = isPending || uploading;
  const canPublish = body.trim().length > 0;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain isolate">
        <div className="mx-auto max-w-3xl space-y-6 pb-4">
          <FirmFeedPostEditorHeader backHref={backHref} onBackNavigation={onBackNavigation} />

          {message ? (
            <p className="rounded-xl border border-[#0B3C5D]/12 bg-[#F0F5F9] px-3 py-2 text-xs font-medium text-[#0B3C5D]">
              {message}
            </p>
          ) : null}

          <main className="space-y-6">
            <FirmFeedPostEditorBodyField body={body} onBodyChange={setBody} />
            <FirmFeedPostEditorImages
              firmId={firmId}
              imageUrls={imageUrls}
              onImageUrlsChange={setImageUrls}
              uploading={uploading}
              onUploadingChange={setUploading}
              onError={setMsg}
              disabled={busy}
            />
            <FirmFeedPostEditorCtaButtons
              ctaButtons={ctaButtons}
              onCtaButtonsChange={setCtaButtons}
              disabled={busy}
            />
            <FirmFeedPostEditorTags tags={tags} onTagsChange={setTags} disabled={busy} />
          </main>
        </div>
      </div>

      <FirmFeedPostEditorActionBar
        canPublish={canPublish}
        isPending={isPending}
        uploading={uploading}
        onSaveDraft={saveDraft}
        onPublish={publish}
      />
    </div>
  );
}
