/**
 * Firma paneli veri saklama ilkeleri (ürün sözleşmesi)
 *
 * - Geçmiş işlemler, denetim ve üyelik kayıtları **silinmez**; erişim kaldırma = soft state (ör. revoked).
 * - Yeni modüller (mesaj, form, ödeme vb.) eklenirken tablolar **append-only** veya **soft-delete**
 *   (`deleted_at`) tasarlanmalı; kalıcı DELETE veya RLS ile `DELETE` politikalarından kaçınılmalıdır.
 * - Denetim: `firm_panel_audit_events` yalnızca INSERT; güncelleme/silme RLS ile engellenir.
 *
 * Migration: `013_firm_panel_immutable_retention.sql`
 */
export const FIRM_PANEL_DATA_RETENTION = {
  /** Üyelik satırı silinmez; admin_remove → status revoked */
  membershipSoftRevoke: true,
  /** Denetim tablosu append-only */
  auditAppendOnly: true,
} as const;
