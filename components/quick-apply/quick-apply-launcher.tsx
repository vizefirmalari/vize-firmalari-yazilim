"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackQuickApplyEventAction } from "@/lib/actions/quick-apply";
import { QuickApplyWizard } from "@/components/quick-apply/quick-apply-wizard";
import { QuickApplyUpgradeModal } from "@/components/quick-apply/quick-apply-upgrade-modal";
import {
  consumeWizardAutoOpen,
  loadWizardDraft,
  type WizardDraftPayload,
} from "@/lib/quick-apply/wizard-draft";

/**
 * Hızlı başvuru kapalı firmalar: tıklanamaz bilgi alanı (button değil — form/CTA ile karışmaz).
 * Sihirbaz / form yapısı değişmez; yalnızca bu slotta etkileşim yoktur.
 */
export function QuickApplyInactiveButton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Hızlı Başvur — aktif değil"
      className={
        className ??
        "flex min-h-11 w-full select-none flex-col items-center justify-center gap-0.5 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/90 py-2.5 text-center opacity-95"
      }
    >
      <span className="text-sm font-semibold text-[#1A1A1A]/48">Hızlı Başvur</span>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/40">
        Aktif Değil
      </span>
    </div>
  );
}

type LauncherProps = {
  firmId: string;
  firmName: string;
  /** Firma logosu; yoksa sihirbaz girişinde baş harf avatar kullanılır */
  firmLogoUrl?: string | null;
  /** Üst bilgi satırı, örn. "Schengen · Çalışma" */
  firmExpertiseLine?: string | null;
  /** Kısa tanıtım veya kurumsal alt satır */
  firmSubtitle?: string | null;
  disabled?: boolean;
  buttonClassName?: string;
  /**
   * true: sihirbaz yerine ücretsiz paket bilgilendirmesi (vitrin firması).
   */
  upgradeOnly?: boolean;
};

export function QuickApplyLauncher({
  firmId,
  firmName,
  firmLogoUrl,
  firmExpertiseLine,
  firmSubtitle,
  disabled,
  buttonClassName,
  upgradeOnly,
}: LauncherProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [resumeDraft, setResumeDraft] = useState<WizardDraftPayload | null>(null);
  const [resumedAfterLogin, setResumedAfterLogin] = useState(false);
  const [instanceKey, setInstanceKey] = useState(0);

  useEffect(() => {
    if (upgradeOnly) return;
    if (!consumeWizardAutoOpen(firmId)) return;
    const d = loadWizardDraft(firmId);
    if (!d) return;
    setResumeDraft(d);
    setResumedAfterLogin(true);
    setOpen(true);
    setInstanceKey((k) => k + 1);
  }, [firmId, upgradeOnly]);

  const openWizard = async () => {
    if (disabled) return;
    if (upgradeOnly) {
      setUpgradeOpen(true);
      return;
    }
    setResumeDraft(null);
    setResumedAfterLogin(false);
    setOpen(true);
    setInstanceKey((k) => k + 1);
    await trackQuickApplyEventAction(firmId, "quick_apply_opened", { firm_id: firmId });
    await trackQuickApplyEventAction(firmId, "quick_apply_intro_viewed", { firm_id: firmId });
  };

  const handleClose = () => {
    setOpen(false);
    setResumeDraft(null);
    setResumedAfterLogin(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={openWizard}
        className={
          buttonClassName ??
          "flex items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f] disabled:cursor-not-allowed disabled:opacity-40"
        }
      >
        Hızlı Başvur
      </button>

      <QuickApplyUpgradeModal
        open={upgradeOpen}
        firmName={firmName}
        onClose={() => setUpgradeOpen(false)}
      />

      {open ? (
        <div className="fixed inset-0 z-120 flex items-end justify-center bg-[#1A1A1A]/45 p-3 sm:items-center">
          <div className="w-full max-w-3xl">
            <QuickApplyWizard
              key={`${firmId}-${instanceKey}`}
              firmId={firmId}
              firmName={firmName}
              firmLogoUrl={firmLogoUrl ?? null}
              firmExpertiseLine={firmExpertiseLine ?? null}
              firmSubtitle={firmSubtitle ?? null}
              returnPath={pathname}
              initialDraft={resumeDraft}
              resumedAfterLogin={resumedAfterLogin}
              onClose={handleClose}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
