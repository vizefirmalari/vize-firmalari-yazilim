"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";

import {
  BLOG_CTA_PLATFORMS,
  normalizeBlogCtaButtons,
  sanitizeExternalUrl,
  type BlogCtaButton,
  type BlogCtaPlatform,
} from "@/lib/blog/cta-buttons";
import { saveFirmBlogPost, uploadFirmBlogCoverImage } from "@/lib/actions/firm-panel-blog";

type Props = {
  firmId: string;
  initialPost: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    cover_image_url: string | null;
    cover_image_alt: string;
    meta_description: string;
    body_rich: string;
    tags: string[];
    category_id: string | null;
    faq_items: Array<{ question: string; answer: string }>;
    related_countries: string[];
    related_visa_types: string[];
    cta_buttons: unknown[];
    status: "draft" | "scheduled" | "published";
    scheduled_at: string | null;
    published_at: string | null;
  } | null;
  firmCountries: string[];
  firmVisaTypes: string[];
  categoryOptions: Array<{ id: string; name: string; slug: string }>;
  relatedSuggestions: Array<{ id: string; title: string; slug: string; categoryId: string | null }>;
};

function toSlug(value: string): string {
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };
  return value
    .toLowerCase()
    .replace(/[çğıöşü]/g, (m) => map[m] ?? m)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 75);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("UPLOAD_TIMEOUT")), ms);
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

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
        active
          ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]"
          : "border-[#1A1A1A]/15 bg-white text-[#1A1A1A]/70 hover:bg-[#F7F9FB]"
      }`}
    >
      {label}
    </button>
  );
}

const StyledBulletList = BulletList.extend({
  addAttributes() {
    return {
      listStyle: {
        default: "disc",
        parseHTML: (element) => element.getAttribute("data-list-style") || "disc",
        renderHTML: (attributes) => {
          const v = String(attributes.listStyle || "disc");
          if (v === "check") {
            return {
              "data-list-style": "check",
              class: "vf-list-check",
              style: "list-style-type: none;",
            };
          }
          const safe = ["disc", "circle", "square"].includes(v) ? v : "disc";
          return {
            "data-list-style": safe,
            style: `list-style-type: ${safe};`,
          };
        },
      },
    };
  },
});

export function FirmBlogEditorForm({
  firmId,
  initialPost,
  firmCountries,
  firmVisaTypes,
  categoryOptions,
  relatedSuggestions,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"draft" | "scheduled" | "published">(
    initialPost?.status ?? "draft"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"success" | "error" | null>(null);

  const [postId, setPostId] = useState<string | null>(initialPost?.id ?? null);
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug));
  const [coverUrl, setCoverUrl] = useState(initialPost?.cover_image_url ?? "");
  const [coverAlt, setCoverAlt] = useState(initialPost?.cover_image_alt ?? "");
  const [metaDescription, setMetaDescription] = useState(initialPost?.meta_description ?? "");
  const [flowDescription, setFlowDescription] = useState(initialPost?.summary ?? "");
  const [scheduledAt, setScheduledAt] = useState(
    initialPost?.scheduled_at ? initialPost.scheduled_at.slice(0, 16) : ""
  );
  const [publishAt, setPublishAt] = useState(
    initialPost?.published_at
      ? initialPost.published_at.slice(0, 16)
      : initialPost?.scheduled_at
        ? initialPost.scheduled_at.slice(0, 16)
        : new Date().toISOString().slice(0, 16)
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialPost?.tags ?? []);
  const [categoryId, setCategoryId] = useState<string>(initialPost?.category_id ?? "");
  const [faqItems, setFaqItems] = useState<Array<{ question: string; answer: string }>>(
    initialPost?.faq_items?.length ? initialPost.faq_items : [{ question: "", answer: "" }, { question: "", answer: "" }]
  );
  const [ctaButtons, setCtaButtons] = useState<BlogCtaButton[]>(
    normalizeBlogCtaButtons(initialPost?.cta_buttons ?? [])
  );
  const [ctaPlatform, setCtaPlatform] = useState<BlogCtaPlatform>("whatsapp");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaError, setCtaError] = useState<string | null>(null);
  const [relatedCountries, setRelatedCountries] = useState<string[]>(
    initialPost?.related_countries ?? []
  );
  const [relatedVisaTypes, setRelatedVisaTypes] = useState<string[]>(
    initialPost?.related_visa_types ?? []
  );
  const [bodyRichState, setBodyRichState] = useState(initialPost?.body_rich ?? "<p></p>");
  const [bodyPlainState, setBodyPlainState] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverAspectWarn, setCoverAspectWarn] = useState<string | null>(null);
  const [coverLocalPreview, setCoverLocalPreview] = useState<string>("");
  const [coverPendingFile, setCoverPendingFile] = useState<File | null>(null);

  useEffect(() => {
    if (slugTouched) return;
    setSlug(toSlug(title));
  }, [title, slugTouched]);

  useEffect(() => {
    if (!coverUrl) {
      setCoverAspectWarn(null);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      const target = 1200 / 630;
      const diff = Math.abs(ratio - target);
      if (diff > 0.08) {
        setCoverAspectWarn(
          `Görsel oranı ${img.width}x${img.height}. Önerilen: 1200x630 (yaklaşık 1.91:1).`
        );
      } else {
        setCoverAspectWarn(null);
      }
    };
    img.onerror = () => setCoverAspectWarn(null);
    img.src = coverUrl;
  }, [coverUrl]);

  useEffect(() => {
    return () => {
      if (coverLocalPreview) URL.revokeObjectURL(coverLocalPreview);
    };
  }, [coverLocalPreview]);

  const editor = useEditor(
    {
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Heading.configure({ levels: [2, 3] }),
      StyledBulletList,
      OrderedList,
      ListItem,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder:
          "Giriş paragrafı ile başlayın. Ardından H2/H3 başlıklarla şartlar, belgeler, süreç adımları ve SSS bölümlerini yapılandırın.",
      }),
    ],
    content: initialPost?.body_rich || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] rounded-b-xl border border-t-0 border-[#1A1A1A]/12 bg-white px-4 py-3 text-sm leading-relaxed text-[#1A1A1A] outline-none",
      },
    },
    },
    []
  );

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(true);
    const initialText = editor.getText().trim();
    setBodyPlainState(initialText);
    setBodyRichState(editor.getHTML());
    const onUpdate = () => {
      setBodyRichState(editor.getHTML());
      setBodyPlainState(editor.getText().trim());
    };
    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
    };
  }, [editor]);

  const plainLength = useMemo(() => bodyPlainState.length, [bodyPlainState]);
  const wordCount = useMemo(
    () => bodyPlainState.split(/\s+/).map((s) => s.trim()).filter(Boolean).length,
    [bodyPlainState]
  );
  const titleLen = title.trim().length;
  const metaLen = metaDescription.trim().length;
  const flowLen = flowDescription.trim().length;
  const altLen = coverAlt.trim().length;
  const slugLen = slug.trim().length;

  const titleState = titleLen > 70 ? "error" : titleLen < 50 ? "warn" : "ok";
  const metaState = metaLen > 160 ? "error" : metaLen < 140 ? "warn" : "ok";
  const altState = altLen > 120 ? "error" : altLen < 50 ? "warn" : "ok";
  const slugState = slugLen > 75 ? "error" : "ok";
  const tagsState = tags.length > 10 ? "error" : "ok";
  const validFaqItems = faqItems
    .map((x) => ({ question: x.question.trim(), answer: x.answer.trim() }))
    .filter((x) => x.question.length > 0 || x.answer.length > 0);
  const hasAtLeastTwoFaq = validFaqItems.length >= 2;
  const hasFaqValidationError = validFaqItems.some(
    (x) => x.question.length < 10 || x.question.length > 120 || x.answer.length < 50 || x.answer.length > 400
  );
  const wordState = wordCount < 800 ? "error" : wordCount < 1200 ? "warn" : "ok";
  const h2Count = (bodyRichState.match(/<h2[\s>]/g) ?? []).length;
  const hasInternalLink = /<a\s+[^>]*href=["'](\/|https?:\/\/www\.vizefirmalari\.com)/i.test(bodyRichState);
  const firstParagraph = (bodyRichState.match(/<p>(.*?)<\/p>/i)?.[1] ?? "").replace(/<[^>]+>/g, " ").trim().toLowerCase();
  const primaryKeyword = title.trim().split(/\s+/).slice(0, 3).join(" ").toLowerCase();
  const hasKeywordInTitle = primaryKeyword.length > 0 && title.toLowerCase().includes(primaryKeyword);
  const hasKeywordInFirstParagraph = primaryKeyword.length > 0 && firstParagraph.includes(primaryKeyword);
  const selectedCategoryName =
    categoryOptions.find((x) => x.id === categoryId)?.name ?? "Kategori seçilmedi";
  const autoRelatedSuggestions = useMemo(
    () => relatedSuggestions.filter((item) => item.categoryId && item.categoryId === categoryId).slice(0, 6),
    [relatedSuggestions, categoryId]
  );

  // Sadece yayın akışını gerçekten bozacak zorunlu alanlar butonu bloklasın.
  // SEO kalite metrikleri (başlık uzunluğu vb.) kullanıcıya uyarı olarak kalır.
  const hasHardError = !categoryId || !hasAtLeastTwoFaq || hasFaqValidationError;

  const seoChecklist = [
    { label: "Başlık uygun uzunluk", ok: titleLen >= 50 && titleLen <= 70 },
    { label: "Meta açıklama var", ok: metaLen >= 140 && metaLen <= 160 },
    { label: "Anahtar kelime başlıkta", ok: hasKeywordInTitle },
    { label: "İlk paragrafta anahtar kelime", ok: hasKeywordInFirstParagraph },
    { label: "En az 2 adet H2", ok: h2Count >= 2 },
    { label: "İçerik 800+ kelime", ok: wordCount >= 800 },
    { label: "SSS mevcut", ok: hasAtLeastTwoFaq && !hasFaqValidationError },
    { label: "Görsel var", ok: Boolean(coverUrl) },
    { label: "Alt metin var", ok: altLen >= 50 && altLen <= 120 },
    { label: "İç link mevcut", ok: hasInternalLink },
  ];
  const seoScore = seoChecklist.reduce((sum, item) => (item.ok ? sum + 10 : sum), 0);
  const missingSeo = seoChecklist.filter((x) => !x.ok).map((x) => x.label);

  const toggleValue = (list: string[], val: string, checked: boolean) =>
    checked ? (list.includes(val) ? list : [...list, val]) : list.filter((x) => x !== val);

  const platformLabel = (platform: BlogCtaPlatform) =>
    BLOG_CTA_PLATFORMS.find((p) => p.id === platform)?.label ?? "Bağlantı";

  const PlatformIcon = ({ platform, className = "h-4 w-4" }: { platform: BlogCtaPlatform; className?: string }) => {
    if (platform === "whatsapp") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M20.5 3.5A11.7 11.7 0 0 0 12.2 0C5.7 0 .4 5.3.4 11.8c0 2.1.6 4.2 1.7 6L0 24l6.4-2.1a11.7 11.7 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.6-8.1ZM12.3 21.3h-.1a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.8 1.2 1.2-3.7-.3-.4a9.7 9.7 0 0 1 8.4-14.8A9.7 9.7 0 0 1 22 11.7a9.7 9.7 0 0 1-9.7 9.6Zm5.3-7.3c-.3-.2-1.8-.9-2-.9-.3-.1-.4-.2-.6.2l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.3-1.4-3.2-3-.2-.2 0-.4.1-.5l.6-.7c.2-.2.2-.3.3-.5l.1-.4c0-.2-.6-1.6-.9-2.2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-.9 2.3 0 1.4 1 2.7 1.1 2.9.2.2 2 3.1 4.9 4.4.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.8-.8 2-1.5.3-.8.3-1.4.2-1.5 0-.2-.2-.2-.5-.4Z" />
        </svg>
      );
    }
    if (platform === "instagram") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
        </svg>
      );
    }
    if (platform === "facebook") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M13.7 22v-8h2.7l.5-3h-3.2V9c0-.9.3-1.6 1.7-1.6H17V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2H7.5v3h2.8v8h3.4Z" />
        </svg>
      );
    }
    if (platform === "linkedin") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M5.4 8.5a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.8 20.2h3.3V9.8H3.8v10.4Zm5.4 0h3.2v-5.1c0-1.3.2-2.6 1.8-2.6 1.6 0 1.6 1.5 1.6 2.7v5h3.2v-5.7c0-2.8-.6-5-3.9-5-1.6 0-2.7.9-3.1 1.7h-.1V9.8H9.2v10.4Z" />
        </svg>
      );
    }
    if (platform === "youtube") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
        </svg>
      );
    }
    if (platform === "website") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path d="M10.6 13.4a3 3 0 0 0 4.2 0l2.8-2.8a3 3 0 0 0-4.2-4.2l-.7.7M13.4 10.6a3 3 0 0 0-4.2 0l-2.8 2.8a3 3 0 0 0 4.2 4.2l.7-.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  };

  const addCta = () => {
    setCtaError(null);
    const label = ctaLabel.trim();
    if (label.length < 3) {
      setCtaError("Buton metni en az 3 karakter olmalı.");
      return;
    }
    const safeUrl = sanitizeExternalUrl(ctaUrl);
    if (!safeUrl) {
      setCtaError("Geçerli bir URL girin. Örn: https://...");
      return;
    }
    const next: BlogCtaButton = {
      id: crypto.randomUUID(),
      platform: ctaPlatform,
      label: label.slice(0, 60),
      url: safeUrl,
      sort_order: ctaButtons.length,
      is_enabled: true,
    };
    setCtaButtons((prev) => [...prev, next].map((x, i) => ({ ...x, sort_order: i })));
    setCtaLabel("");
    setCtaUrl("");
  };

  const addTag = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    if (t.length > 30) return;
    setTags((prev) => {
      if (prev.includes(t) || prev.length >= 10) return prev;
      return [...prev, t];
    });
  };

  const removeCta = (id: string) =>
    setCtaButtons((prev) => prev.filter((x) => x.id !== id).map((x, i) => ({ ...x, sort_order: i })));

  const moveCta = (id: string, dir: -1 | 1) =>
    setCtaButtons((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const nextIdx = idx + dir;
      if (nextIdx < 0 || nextIdx >= prev.length) return prev;
      const list = [...prev];
      const temp = list[idx];
      list[idx] = list[nextIdx];
      list[nextIdx] = temp;
      return list.map((x, i) => ({ ...x, sort_order: i }));
    });

  const save = (nextMode: "draft" | "scheduled" | "published") => {
    if (!editor) return;
    setMode(nextMode);
    setMessage(null);
    setMessageTone(null);
    const bodyRich = bodyRichState;
    const bodyPlainText = bodyPlainState;
    startTransition(async () => {
      let publishCoverUrl = coverUrl;
      if (nextMode === "published" && !publishCoverUrl && coverPendingFile) {
        setCoverUploading(true);
        const uploaded = await uploadCoverFile(coverPendingFile);
        setCoverUploading(false);
        if (!uploaded) return;
        publishCoverUrl = uploaded;
        setCoverPendingFile(null);
      }
      const res = await saveFirmBlogPost({
        postId,
        firmId,
        mode: nextMode,
        title,
        slug,
        categoryId,
        summary: flowDescription,
        coverImageUrl: publishCoverUrl,
        coverImageAlt: coverAlt,
        metaDescription,
        bodyRich,
        bodyPlainText,
        tags,
        faqItems: validFaqItems,
        ctaButtons,
        relatedCountries,
        relatedVisaTypes,
        scheduledAt,
        publishAt,
      });
      if (!res.ok) {
        setMessage(res.error);
        setMessageTone("error");
        return;
      }
      setPostId(res.id);
      setMessage(
        nextMode === "published"
          ? "Yazı yayınlandı. Hype ve görünürlük metrikleri senkronlandı."
          : nextMode === "scheduled"
            ? "Yazı planlandı. Belirlenen tarihte yayınlanmaya hazır."
            : "Taslak kaydedildi."
      );
      setMessageTone("success");
      if (nextMode === "published") {
        resetToNewPost();
        router.replace(`/panel/${firmId}/paylasim/blog`);
      } else {
        router.replace(`/panel/${firmId}/paylasim/blog?post=${res.id}`);
      }
      router.refresh();
    });
  };

  const resetToNewPost = () => {
    setPostId(null);
    setMode("draft");
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setCoverUrl("");
    setCoverAlt("");
    setMetaDescription("");
    setFlowDescription("");
    setScheduledAt("");
    setPublishAt(new Date().toISOString().slice(0, 16));
    setTagInput("");
    setTags([]);
    setCategoryId("");
    setFaqItems([{ question: "", answer: "" }, { question: "", answer: "" }]);
    setCtaButtons([]);
    setRelatedCountries([]);
    setRelatedVisaTypes([]);
    setBodyRichState("<p></p>");
    setBodyPlainState("");
    setCoverPendingFile(null);
    if (coverLocalPreview) URL.revokeObjectURL(coverLocalPreview);
    setCoverLocalPreview("");
    setCoverAspectWarn(null);
    editor?.commands.setContent("<p></p>");
  };

  const applyBulletListStyle = (style: "disc" | "circle" | "square" | "check") => {
    if (!editor) return;
    const isBullet = editor.isActive("bulletList");
    const currentStyle = editor.getAttributes("bulletList").listStyle as
      | "disc"
      | "circle"
      | "square"
      | "check"
      | undefined;
    if (isBullet && currentStyle === style) {
      editor.chain().focus().toggleBulletList().setParagraph().run();
      return;
    }
    if (!isBullet) {
      editor.chain().focus().toggleBulletList().run();
    }
    editor.chain().focus().updateAttributes("bulletList", { listStyle: style }).run();
  };

  const toggleOrderedList = () => {
    if (!editor) return;
    const active = editor.isActive("orderedList");
    if (active) {
      editor.chain().focus().toggleOrderedList().setParagraph().run();
      return;
    }
    const ok = editor.chain().focus().toggleOrderedList().run();
    if (!ok) {
      // Bazı blok durumlarında (özellikle custom list/heading geçişlerinde)
      // doğrudan toggle başarısız olabiliyor; önce paragrafla normalize edip tekrar dene.
      editor.chain().focus().clearNodes().setParagraph().toggleOrderedList().run();
    }
  };

  const uploadCoverFile = async (file: File): Promise<string | null> => {
    try {
      let uploadFile: File = file;
      if (file.type.startsWith("image/")) {
        try {
          const bitmap = await createImageBitmap(file);
          const canvas = document.createElement("canvas");
          const maxSide = 1600;
          const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
          canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
          canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(bitmap, 0, 0);
            const toWebp = (quality: number) =>
              new Promise<Blob | null>((resolve) =>
                canvas.toBlob((blob) => resolve(blob), "image/webp", quality)
              );
            let quality = 0.86;
            let webpBlob = await toWebp(quality);
            while (webpBlob && webpBlob.size > 900 * 1024 && quality > 0.56) {
              quality -= 0.08;
              webpBlob = await toWebp(quality);
            }
            if (webpBlob) {
              uploadFile = new File([webpBlob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
                type: "image/webp",
              });
            }
          }
        } catch {
          uploadFile = file;
        }
      }

      const fd = new FormData();
      fd.set("firmId", firmId);
      fd.set("file", uploadFile);
      const res = await withTimeout(uploadFirmBlogCoverImage(fd), 45000);
      if (!res.ok) {
        setMessage(res.error);
        setMessageTone("error");
        return null;
      }
      setCoverUrl(res.url);
      return res.url;
    } catch {
      setMessage("Görsel yüklenemedi veya zaman aşımına uğradı. Daha küçük bir görsel ile tekrar deneyin.");
      setMessageTone("error");
      return null;
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-linear-to-br from-[#0B3C5D] via-[#124668] to-[#0B3C5D] p-5 text-white shadow-[0_18px_42px_rgba(11,60,93,0.24)] sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Blog yayın merkezi
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Blog Yazısı Oluştur</h1>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-white/82">
          Blog içerikleri arama motorlarında görünürlüğünüzü artırır, uzmanlığınızı gösterir ve
          nitelikli müşteri kazanımını destekler. Yapılandırılmış yayınlar Akış görünürlüğü ve hype
          performansınız için güçlü bir temel oluşturur.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
            Blog yayını başına Hype: +50
          </span>
          <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
            Tek H1 + H2/H3 hiyerarşisi önerilir
          </span>
          <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
            Hero görsel: 1200 × 630
          </span>
          <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
            Taslak · Planla · Yayınla
          </span>
        </div>
      </section>

      <div className="space-y-5">
        <section className="space-y-4 rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Başlık / H1
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: 2026 Schengen Vizesi Başvuru Rehberi"
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#0B3C5D]/30"
            />
            <p className={`mt-1 text-xs ${titleState === "error" ? "text-[#B42318]" : titleState === "warn" ? "text-[#9A6700]" : "text-[#067647]"}`}>
              Başlık uzunluğu önerisi: min 50, max 70; ideal 60-65. ({titleLen})
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Meta Açıklama (SEO)
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="Google arama sonuçlarında görünecek açıklamayı yazın..."
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#0B3C5D]/30"
            />
            <p className={`mt-1 text-xs ${metaState === "error" ? "text-[#B42318]" : metaState === "warn" ? "text-[#9A6700]" : "text-[#067647]"}`}>
              Google arama sonuçlarında görünecek açıklama. Min 140, max 160; ideal 150-155. ({metaLen})
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Akış Açıklaması
            </label>
            <input
              value={flowDescription}
              onChange={(e) => setFlowDescription(e.target.value.slice(0, 150))}
              placeholder="Akışta görünecek açıklama ilg çekici olmalı..."
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#0B3C5D]/30"
            />
            <p className={`mt-1 text-xs ${flowLen > 150 ? "text-[#B42318]" : "text-[#1A1A1A]/55"}`}>
              Akışta görünecek kısa açıklama. Blog yazısında gösterilmez. Maksimum 150 karakter. ({flowLen}/150)
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              URL / Slug
            </label>
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(toSlug(e.target.value).slice(0, 75));
              }}
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/30"
            />
            <p className={`mt-1 text-xs ${slugState === "error" ? "text-[#B42318]" : "text-[#1A1A1A]/55"}`}>
              Türkçe karakter kullanmayın; sistem otomatik dönüştürür. Maks 75 karakter. ({slugLen})
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Kategori Seç
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/30"
            >
              <option value="">Kategori seçin</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className={`mt-1 text-xs ${categoryId ? "text-[#067647]" : "text-[#B42318]"}`}>
              Yayın için zorunlu alan.
            </p>
          </div>

          <div className="space-y-3">
            <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
                  Hero görsel
                </label>
                <div className="mt-1.5 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#0B3C5D]/25 bg-[#F7F9FB] px-4 py-3 text-sm font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      disabled={coverUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setCoverPendingFile(file);
                        if (coverLocalPreview) URL.revokeObjectURL(coverLocalPreview);
                        const nextPreview = URL.createObjectURL(file);
                        setCoverLocalPreview(nextPreview);
                        setCoverUploading(true);
                        setMessage(null);
                        setMessageTone(null);
                        try {
                          const uploaded = await uploadCoverFile(file);
                          if (!uploaded) return;
                          setCoverPendingFile(null);
                        } catch {
                          setMessage(
                            "Görsel yüklenemedi veya zaman aşımına uğradı. Daha küçük bir görsel ile tekrar deneyin."
                          );
                          setMessageTone("error");
                        } finally {
                          setCoverUploading(false);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    {coverUploading ? "Yükleniyor..." : "Görsel yükle"}
                  </label>
                  {(coverLocalPreview || coverUrl) ? (
                    <div className="w-full overflow-hidden rounded-xl border border-[#1A1A1A]/12 bg-[#F8FAFC] sm:w-52">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverLocalPreview || coverUrl} alt="" className="h-24 w-full object-contain" />
                    </div>
                  ) : null}
                  </div>
                  <p className="text-xs text-[#1A1A1A]/55">
                    Önerilen ölçü: 1200 × 630. Yüklenen dosya otomatik URL ile eşlenir.
                  </p>
                  <p className={`text-xs ${coverUrl ? "text-[#067647]" : coverPendingFile ? "text-[#9A6700]" : "text-[#B42318]"}`}>
                    {coverUrl
                      ? "Hero görsel hazır."
                      : coverPendingFile
                        ? "Görsel seçildi. Yayınlarken otomatik olarak tekrar yüklenecek."
                        : "Yayınlama için hero görsel zorunludur."}
                  </p>
                  {coverAspectWarn ? (
                    <p className="text-xs text-[#9A6700]">{coverAspectWarn}</p>
                  ) : null}
                </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
                Görsel alt metni
              </label>
              <input
                value={coverAlt}
                onChange={(e) => setCoverAlt(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/14 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/30"
              />
              <p className={`mt-1 text-xs ${altState === "error" ? "text-[#B42318]" : altState === "warn" ? "text-[#9A6700]" : "text-[#067647]"}`}>
                Bu metin Google ve erişilebilirlik için kullanılır. Min 50, max 120. ({altLen})
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">İçerik gövdesi</p>
            <div className="mt-1.5 rounded-t-xl border border-[#1A1A1A]/12 bg-[#F8FAFC] p-2">
              <div className="flex flex-wrap gap-1.5">
                {!editor ? (
                  <span className="rounded-lg border border-[#1A1A1A]/15 bg-white px-2.5 py-1 text-xs text-[#1A1A1A]/60">
                    Editör başlatılıyor...
                  </span>
                ) : null}
                <ToolbarButton
                  label="B"
                  active={editor?.isActive("bold")}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                />
                <ToolbarButton
                  label="I"
                  active={editor?.isActive("italic")}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                />
                <ToolbarButton
                  label="U"
                  active={editor?.isActive("underline")}
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                />
                <ToolbarButton
                  label="H2"
                  active={editor?.isActive("heading", { level: 2 })}
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                />
                <ToolbarButton
                  label="H3"
                  active={editor?.isActive("heading", { level: 3 })}
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                />
                <ToolbarButton
                  label="• Liste"
                  active={editor?.isActive("bulletList", { listStyle: "disc" })}
                  onClick={() => applyBulletListStyle("disc")}
                />
                <ToolbarButton
                  label="Numaralı Liste"
                  active={editor?.isActive("orderedList")}
                  onClick={toggleOrderedList}
                />
                <ToolbarButton
                  label="✓ Onay"
                  active={editor?.isActive("bulletList", { listStyle: "check" })}
                  onClick={() => applyBulletListStyle("check")}
                />
                <ToolbarButton
                  label="◼ Kare"
                  active={editor?.isActive("bulletList", { listStyle: "square" })}
                  onClick={() => applyBulletListStyle("square")}
                />
                <ToolbarButton
                  label="○ Daire"
                  active={editor?.isActive("bulletList", { listStyle: "circle" })}
                  onClick={() => applyBulletListStyle("circle")}
                />
              </div>
            </div>
            <div className="editor-wrapper min-w-0 max-w-full overflow-x-hidden">
              <EditorContent
                editor={editor}
                className="editor-content min-w-0 max-w-full overflow-x-hidden"
              />
            </div>
            <style jsx global>{`
              .editor-wrapper {
                max-width: 100%;
                overflow-x: hidden;
              }
              .editor-content,
              .editor-content * {
                word-break: break-word;
                overflow-wrap: break-word;
              }
              .editor-content .ProseMirror {
                max-width: 100%;
                overflow-x: hidden;
                word-break: break-word;
                overflow-wrap: anywhere;
                white-space: normal;
                line-height: 1.55;
              }
              .editor-content .ProseMirror * {
                max-width: 100%;
                word-break: break-word;
                overflow-wrap: anywhere;
              }
              .tiptap p {
                margin: 0;
                line-height: 1.55;
                white-space: normal;
              }
              .tiptap p + p {
                margin-top: 0.9rem;
              }
              .tiptap h2 {
                margin: 1rem 0 0.55rem;
                font-size: 1.2rem;
                line-height: 1.35;
                font-weight: 700;
                color: #0b3c5d;
              }
              .tiptap h3 {
                margin: 0.85rem 0 0.45rem;
                font-size: 1.05rem;
                line-height: 1.4;
                font-weight: 700;
                color: #0b3c5d;
              }
              .tiptap ul,
              .tiptap ol {
                margin: 0.6rem 0 0.75rem 1.1rem;
                padding-left: 0.7rem;
                line-height: 1.5;
              }
              .tiptap ol {
                list-style-type: decimal;
              }
              .tiptap li {
                margin: 0.12rem 0;
                line-height: 1.5;
              }
              .tiptap ul[data-list-style="square"] > li::marker {
                color: #b42318;
              }
              .tiptap ul[data-list-style="circle"] > li::marker {
                color: #111111;
              }
              .vf-list-check > li {
                position: relative;
                list-style: none;
                margin-left: 0;
                padding-left: 1.4rem;
              }
              .vf-list-check > li::before {
                content: "✓";
                position: absolute;
                left: 0;
                top: 0.05rem;
                color: #0f8a2d;
                font-weight: 700;
                font-size: 0.9em;
              }
              body {
                overflow-x: hidden;
              }
            `}</style>
            <p className="mt-1 text-xs text-[#1A1A1A]/55">
              Kısa paragraflar kullanın, H2 ve H3 ile içeriği bölümlere ayırın, madde/numaralı
              listelerle okunabilirliği artırın, onay-kare-daire listeleriyle önemli noktaları
              vurgulayın ve CTA bağlantılarıyla okuyucuyu yönlendirin. ({plainLength} karakter · {wordCount} kelime)
            </p>
            <p className={`mt-1 text-xs ${wordState === "error" ? "text-[#B42318]" : wordState === "warn" ? "text-[#9A6700]" : "text-[#067647]"}`}>
              Kelime sayısı: {wordCount}
            </p>
            <div className="mt-2 rounded-xl border border-[#1A1A1A]/12 bg-[#F8FAFC] p-2.5 text-xs text-[#1A1A1A]/70">
              <p className="font-semibold text-[#0B3C5D]">Canlı içerik uyarıları</p>
              {!hasInternalLink ? <p>• İç link bulunamadı</p> : null}
              {wordCount < 800 ? <p>• İçerik çok kısa</p> : null}
              {h2Count < 2 ? <p>• H2 eklemediniz</p> : null}
              {!hasKeywordInFirstParagraph ? <p>• Ana anahtar kelime ilk paragrafta yok</p> : null}
              <p className="mt-1 text-[11px] text-[#1A1A1A]/55">
                H2: İçeriği bölümlere ayıran ana başlık.
              </p>
            </div>

          </div>
          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
                Sıkça Sorulan Sorular (SSS)
              </p>
              <button
                type="button"
                onClick={() =>
                  setFaqItems((prev) =>
                    prev.length >= 8 ? prev : [{ question: "", answer: "" }, ...prev]
                  )
                }
                className="rounded-lg border border-[#0B3C5D]/15 px-2.5 py-1 text-xs font-semibold text-[#0B3C5D]"
              >
                Soru ekle
              </button>
            </div>
            <p className="mt-1 text-xs text-[#1A1A1A]/55">Minimum 2, maksimum 8 SSS girişi.</p>
            <div className="mt-3 space-y-3">
              {faqItems.map((item, idx) => (
                <div key={`faq-${idx}`} className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] p-3">
                  <label className="text-[11px] font-semibold text-[#1A1A1A]/70">Soru</label>
                  <input
                    value={item.question}
                    onChange={(e) =>
                      setFaqItems((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, question: e.target.value } : x))
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#1A1A1A]/14 bg-white px-2.5 py-2 text-sm outline-none"
                  />
                  <label className="mt-2 block text-[11px] font-semibold text-[#1A1A1A]/70">Yanıt</label>
                  <textarea
                    rows={4}
                    value={item.answer}
                    onChange={(e) =>
                      setFaqItems((prev) =>
                        prev.map((x, i) => (i === idx ? { ...x, answer: e.target.value } : x))
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#1A1A1A]/14 bg-white px-2.5 py-2 text-sm outline-none"
                  />
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-[#1A1A1A]/55">
                      Soru {item.question.trim().length}/120 · Yanıt {item.answer.trim().length}/400
                    </span>
                    <button
                      type="button"
                      onClick={() => setFaqItems((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-[#B42318]"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className={`mt-2 text-xs ${hasAtLeastTwoFaq && !hasFaqValidationError ? "text-[#067647]" : "text-[#B42318]"}`}>
              Soru: 10-120 karakter, yanıt: 50-400 karakter.
            </p>
          </section>
          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Etiketler
            </p>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput("");
                }
              }}
              placeholder="etiket yazın ve virgül ile ekleyin"
              className="mt-2 w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30"
            />
            <p className={`mt-1 text-xs ${tagsState === "error" ? "text-[#B42318]" : "text-[#1A1A1A]/55"}`}>
              En fazla 10 etiket, her biri en fazla 30 karakter.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full border border-[#0B3C5D]/12 bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#0B3C5D]"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                    className="rounded-full p-0.5 text-[#0B3C5D]/70 hover:bg-[#0B3C5D]/10"
                    aria-label={`${t} etiketini kaldır`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>
        </section>

        <section className="space-y-4">
          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              SEO skoru
            </p>
            <p className="mt-1 text-lg font-bold text-[#0B3C5D]">{seoScore} / 100</p>
            <ul className="mt-2 space-y-1 text-xs">
              {missingSeo.length === 0 ? (
                <li className="text-[#067647]">Tüm kritik SEO kriterleri sağlandı.</li>
              ) : (
                missingSeo.map((item) => (
                  <li key={item} className="text-[#B42318]">❌ {item}</li>
                ))
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Open Graph önizleme
            </p>
            <div className="mt-2 overflow-hidden rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC]">
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverLocalPreview || coverUrl} alt="" className="h-28 w-full object-contain bg-[#EEF2F6]" />
              ) : null}
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold text-[#0B3C5D]">{title || "Başlık önizlemesi"}</p>
                <p className="text-xs text-[#1A1A1A]/65">{metaDescription || "Meta açıklama önizlemesi"}</p>
                <p className="text-[11px] text-[#0B3C5D]/65">Kategori: {selectedCategoryName}</p>
                <p className="text-[11px] text-[#1A1A1A]/50">{slug ? `vizefirmalari.com/firma/.../${slug}` : "URL önizlemesi"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              İçerik iskeleti önerisi
            </p>
            <ul className="mt-2 space-y-1 text-xs text-[#1A1A1A]/70">
              <li>• Giriş: soruya net yanıt</li>
              <li>• H2: Genel bilgi</li>
              <li>• H2: Şartlar</li>
              <li>• H2: Gerekli belgeler</li>
              <li>• H2/H3: Başvuru süreci adımları</li>
              <li>• CTA: firma ile iletişime geç</li>
              <li>• SSS bloğu</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              İlişkilendirme
            </p>
            <p className="mt-3 text-[11px] font-semibold text-[#1A1A1A]/60">İlgili ülkeler</p>
            <div className="mt-1.5 flex max-h-28 flex-wrap gap-1.5 overflow-auto">
              {firmCountries.map((c) => (
                <label key={c} className="inline-flex items-center gap-1 rounded-lg border border-[#1A1A1A]/12 px-2 py-1 text-[11px]">
                  <input
                    type="checkbox"
                    checked={relatedCountries.includes(c)}
                    onChange={(e) =>
                      setRelatedCountries((prev) => toggleValue(prev, c, e.target.checked))
                    }
                  />
                  {c}
                </label>
              ))}
            </div>

            <p className="mt-3 text-[11px] font-semibold text-[#1A1A1A]/60">İlgili vize türleri</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {firmVisaTypes.map((v) => (
                <label key={v} className="inline-flex items-center gap-1 rounded-lg border border-[#1A1A1A]/12 px-2 py-1 text-[11px]">
                  <input
                    type="checkbox"
                    checked={relatedVisaTypes.includes(v)}
                    onChange={(e) =>
                      setRelatedVisaTypes((prev) => toggleValue(prev, v, e.target.checked))
                    }
                  />
                  {v}
                </label>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-semibold text-[#1A1A1A]/60">İlgili içerikler (otomatik öneri)</p>
            <div className="mt-1.5 space-y-1">
              {autoRelatedSuggestions.length === 0 ? (
                <p className="text-[11px] text-[#1A1A1A]/55">
                  {categoryId ? "Bu kategori için öneri bulunamadı." : "Öneri için önce kategori seçin."}
                </p>
              ) : (
                autoRelatedSuggestions.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 text-[11px] text-[#0B3C5D]">
                    <input
                      type="checkbox"
                      checked={tags.includes(item.slug)}
                      onChange={(e) => {
                        if (e.target.checked) addTag(item.slug);
                        else setTags((prev) => prev.filter((x) => x !== item.slug));
                      }}
                    />
                    ✔ {item.title}
                  </label>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Yönlendirme butonları
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/62">
              Okuyucularınızı WhatsApp, sosyal medya veya web sitenize yönlendiren kısa ve güçlü CTA
              butonları ekleyin.
            </p>

            <div className="mt-3 grid gap-2">
              <label className="text-[11px] font-semibold text-[#1A1A1A]/65">Platform</label>
              <div className="flex flex-wrap gap-1.5">
                {BLOG_CTA_PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setCtaPlatform(p.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-semibold transition ${
                      ctaPlatform === p.id
                        ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]"
                        : "border-[#1A1A1A]/14 bg-white text-[#1A1A1A]/70 hover:bg-[#F7F9FB]"
                    }`}
                  >
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[9px]">
                      <PlatformIcon platform={p.id} className="h-3.5 w-3.5" />
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>

              <label className="text-[11px] font-semibold text-[#1A1A1A]/65">Buton metni</label>
              <input
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="Örn: WhatsApp’tan Yazın"
                className="w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30"
              />
              <p className="text-[11px] text-[#1A1A1A]/55">Kısa ve net metin kullanın. ({ctaLabel.trim().length}/60)</p>

              <label className="text-[11px] font-semibold text-[#1A1A1A]/65">URL</label>
              <input
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30"
              />
              <p className="text-[11px] text-[#1A1A1A]/55">
                Dış bağlantılar güvenli şekilde yeni sekmede açılır.
              </p>

              <div className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] p-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A]/50">
                  Önizleme
                </p>
                <div className="mt-2 inline-flex min-h-10 max-w-full items-center gap-2 rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[10px]">
                    <PlatformIcon platform={ctaPlatform} className="h-4 w-4" />
                  </span>
                  <span className="truncate">{ctaLabel.trim() || `${platformLabel(ctaPlatform)} Bağlantısı`}</span>
                </div>
              </div>

              {ctaError ? <p className="text-xs font-medium text-[#B42318]">{ctaError}</p> : null}
              <button
                type="button"
                onClick={addCta}
                className="inline-flex min-h-9 w-fit items-center rounded-xl bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0A3552]"
              >
                Buton Ekle
              </button>
            </div>

            {ctaButtons.length > 0 ? (
              <div className="mt-3 space-y-2">
                {ctaButtons.map((btn, idx) => (
                  <div
                    key={btn.id}
                    className="flex flex-wrap items-center gap-2 rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-2.5 py-2"
                  >
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[10px] font-semibold text-[#0B3C5D]">
                      <PlatformIcon platform={btn.platform} className="h-4 w-4" />
                    </span>
                    <span className="max-w-48 truncate text-xs font-semibold text-[#0B3C5D]">
                      {btn.label}
                    </span>
                    <span className="max-w-56 truncate text-[11px] text-[#1A1A1A]/55">{btn.url}</span>
                    <div className="ml-auto flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveCta(btn.id, -1)}
                        disabled={idx === 0}
                        className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#0B3C5D] disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveCta(btn.id, 1)}
                        disabled={idx === ctaButtons.length - 1}
                        className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#0B3C5D] disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCta(btn.id)}
                        className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#B42318]"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-3">
              <BlogCtaButtonsRenderer buttons={ctaButtons} />
            </div>
          </section>
        </section>
      </div>

      <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Yayın durumu
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => save("draft")}
                disabled={isPending || hasHardError}
                className="rounded-xl border border-[#1A1A1A]/14 bg-[#F7F9FB] px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6] disabled:opacity-60"
              >
                Taslak olarak kaydet
              </button>
              <button
                type="button"
                onClick={() => save("published")}
                disabled={isPending || hasHardError || !publishAt || (!coverUrl && !coverPendingFile)}
                className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0A3552] disabled:opacity-60"
              >
                Yayınla
              </button>
            </div>
          </div>
          <div className="w-full sm:w-72">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">
              Yayınlanma zamanı (zorunlu)
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="datetime-local"
                value={publishAt}
                onChange={(e) => {
                  setPublishAt(e.target.value);
                  setScheduledAt(e.target.value);
                }}
                className="w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30"
              />
              <button
                type="button"
                onClick={() => save("scheduled")}
                disabled={isPending || hasHardError || !publishAt}
                className="rounded-xl border border-[#0B3C5D]/16 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB] disabled:opacity-60"
              >
                Planla
              </button>
            </div>
            <p className={`mt-1 text-xs ${publishAt ? "text-[#1A1A1A]/58" : "text-[#B42318]"}`}>
              Yayınla ve planla işlemleri için zorunludur.
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs text-[#1A1A1A]/58">
          {mode === "published"
            ? "Yayınlanan içerik Akış entegrasyonuna hazır veri modeliyle saklanır."
            : mode === "scheduled"
              ? "Planlanan içerik seçtiğiniz zamanda yayınlanmaya hazır tutulur."
              : "Taslak içerikler düzenlemeye açık kalır."}
        </p>
        {message ? (
          <p
            className={`mt-2 rounded-lg border px-3 py-2 text-sm font-medium ${
              messageTone === "success"
                ? "border-[#067647]/20 bg-[#ECFDF3] text-[#067647]"
                : "border-[#B42318]/20 bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {messageTone === "success" ? "✓ " : "⚠ "}
            {message}
          </p>
        ) : null}
      </section>
    </div>
  );
}
