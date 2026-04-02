"use client";

import { useCallback, useId, useRef, useState } from "react";
import { FILE_TYPE_LABELS } from "@/lib/quick-apply/config";
import type { LeadFileType } from "@/lib/quick-apply/types";
import {
  CHAT_ATTACHMENT_MAX_BYTES,
  validateChatAttachment,
} from "@/lib/validation/chat-attachment";

/** Dosya seçicide öncelik; video MIME’leri dışlar (tarayıcıya göre değişir, doğrulama zorunlu). */
const ACCEPT_ATTR =
  ".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp";

export type SelectedLeadFile = { file: File; fileType: LeadFileType };

type Props = {
  files: SelectedLeadFile[];
  onAdd: (items: SelectedLeadFile[]) => void;
  onRemove: (index: number) => void;
  onChangeType?: (index: number, fileType: LeadFileType) => void;
};

const FILE_TYPES = Object.keys(FILE_TYPE_LABELS) as LeadFileType[];

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function WizardDocumentUpload({ files, onAdd, onRemove, onChangeType }: Props) {
  const inputId = useId();
  const [dragActive, setDragActive] = useState(false);
  const [pendingType, setPendingType] = useState<LeadFileType>("passport");
  const [batchHint, setBatchHint] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      const next: SelectedLeadFile[] = [];
      const rejected: string[] = [];
      for (let i = 0; i < list.length; i += 1) {
        const file = list[i];
        if (!file) continue;
        const v = validateChatAttachment(file);
        if (!v.ok) {
          rejected.push(`${file.name}: ${v.reason}`);
          continue;
        }
        next.push({ file, fileType: pendingType });
      }
      if (next.length) onAdd(next);

      if (rejected.length === 0) {
        setBatchHint(
          next.length > 1
            ? `${next.length} dosya eklendi. İsterseniz türünü satırdan değiştirebilirsiniz.`
            : next.length === 1
              ? "Dosya eklendi. İsterseniz türünü aşağıdan değiştirebilirsiniz."
              : null
        );
      } else {
        const sample = rejected.slice(0, 2).join(" · ");
        const rejectMsg =
          rejected.length > 2
            ? `${rejected.length} dosya eklenemedi (video veya desteklenmeyen tür / boyut). Örnek: ${sample}`
            : sample;
        if (next.length > 0) {
          setBatchHint(`${next.length} dosya eklendi. ${rejectMsg}`);
        } else {
          setBatchHint(rejectMsg);
        }
      }
    },
    [onAdd, pendingType]
  );

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.06)] sm:p-5">
        <p className="text-sm font-semibold text-[#0B3C5D]">Yükleme için belge türü</p>
        <p className="mt-0.5 text-xs text-[#1A1A1A]/55">
          Birden fazla dosya seçebilir veya sürükleyebilirsiniz. Önce türü seçin; her satırdan tek tek
          değiştirebilirsiniz. Video dosyaları kabul edilmez.
        </p>
        <label className="mt-3 block" htmlFor={`${inputId}-type`}>
          <span className="sr-only">Belge türü</span>
          <select
            id={`${inputId}-type`}
            value={pendingType}
            onChange={(e) => setPendingType(e.target.value as LeadFileType)}
            className="w-full rounded-xl border border-[#0B3C5D]/20 bg-[#FAFBFC] px-3 py-1.5 text-sm font-medium text-[#0B3C5D] outline-none focus:border-[#0B3C5D] sm:max-w-md"
          >
            {FILE_TYPES.map((key) => (
              <option key={key} value={key}>
                {FILE_TYPE_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-10 text-center transition ${
          dragActive ? "border-[#0B3C5D]/55 bg-[#F7F9FB]" : "border-[#0B3C5D]/18 bg-white"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] text-[#0B3C5D]" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v12m0 0l-4-4m4 4l4-4" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[#0B3C5D]">Dosyaları buraya bırakın</p>
        <p className="mt-1 max-w-md text-sm text-[#1A1A1A]/60">
          veya tıklayarak çoklu seçin · PDF, Word, Excel, metin/CSV, PNG/JPG/WebP · video hariç · en fazla{" "}
          {Math.round(CHAT_ATTACHMENT_MAX_BYTES / (1024 * 1024))} MB / dosya
        </p>
        <p className="mt-3 rounded-full bg-[#D9A441]/18 px-3 py-1 text-[11px] font-semibold text-[#1A1A1A]/80">
          Seçilen tür: {FILE_TYPE_LABELS[pendingType]}
        </p>
        <input
          ref={inputRef}
          id={`${inputId}-file`}
          type="file"
          className="sr-only"
          multiple
          accept={ACCEPT_ATTR}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {batchHint ? (
        <p
          className="rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-2 text-center text-xs leading-relaxed text-[#1A1A1A]/75"
          role="status"
        >
          {batchHint}
        </p>
      ) : null}

      <p className="text-center text-xs leading-relaxed text-[#1A1A1A]/50">
        Kategoriler (pasaport, CV, davetiye vb.): {FILE_TYPES.map((k) => FILE_TYPE_LABELS[k]).join(" · ")}.
      </p>

      {files.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#0B3C5D]/25 bg-[#FAFBFC] px-4 py-8 text-center">
          <p className="text-sm font-medium text-[#0B3C5D]/80">Henüz dosya eklemediniz</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">İsterseniz bu adımı atlayıp devam edebilirsiniz; belge eklemek değerlendirmeyi hızlandırır.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">Yüklenen dosyalar</p>
          {files.map((item, index) => (
            <li
              key={`${index}-${item.file.name}-${item.file.size}-${item.file.lastModified}`}
              className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.05)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0B3C5D]">{item.file.name}</p>
                  <p className="text-xs text-[#1A1A1A]/50">{formatSize(item.file.size)}</p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end" onClick={(e) => e.stopPropagation()}>
                  <label className="sr-only" htmlFor={`${inputId}-type-${index}`}>
                    Belge türü
                  </label>
                  <select
                    id={`${inputId}-type-${index}`}
                    value={item.fileType}
                    onChange={(e) => {
                      const next = e.target.value as LeadFileType;
                      onChangeType?.(index, next);
                    }}
                    className="w-full rounded-lg border border-[#0B3C5D]/20 px-2 py-1.5 text-xs font-medium text-[#0B3C5D] outline-none focus:border-[#0B3C5D] sm:w-auto sm:min-w-[200px]"
                  >
                    {FILE_TYPES.map((key) => (
                      <option key={key} value={key}>
                        {FILE_TYPE_LABELS[key]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                    }}
                    className="self-start rounded-lg border border-[#0B3C5D]/20 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] sm:self-end"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
