import type { QuickApplyFormValues } from "@/lib/quick-apply/types";

const STORAGE_PREFIX = "vfy_qa_draft_";
const AUTOOPEN_PREFIX = "vfy_qa_autoopen_";

export type WizardDraftPayload = {
  v: 1;
  step: number;
  values: QuickApplyFormValues;
};

function key(firmId: string) {
  return `${STORAGE_PREFIX}${firmId}`;
}

function autoOpenKey(firmId: string) {
  return `${AUTOOPEN_PREFIX}${firmId}`;
}

export function saveWizardDraft(firmId: string, payload: WizardDraftPayload): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key(firmId), JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function loadWizardDraft(firmId: string): WizardDraftPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key(firmId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardDraftPayload;
    if (parsed?.v !== 1 || typeof parsed.step !== "number" || !parsed.values) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearWizardDraft(firmId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key(firmId));
  } catch {
    /* */
  }
}

/** Oturum açma sonrası sihirbazı bir kez otomatik açmak için (sessionStorage) */
export function markWizardResumeAfterAuth(firmId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(autoOpenKey(firmId), "1");
  } catch {
    /* */
  }
}

export function consumeWizardAutoOpen(firmId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const k = autoOpenKey(firmId);
    if (sessionStorage.getItem(k) !== "1") return false;
    sessionStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function buildLoginUrl(returnPath: string): string {
  const next = returnPath.startsWith("/") ? returnPath : `/${returnPath}`;
  return `/?auth=login&next=${encodeURIComponent(next)}`;
}
