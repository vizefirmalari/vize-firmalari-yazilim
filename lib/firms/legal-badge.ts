import type { FirmRow } from "@/lib/types/firm";

/** Panelde “Yasal yapı ve operasyon (Kurumsallık skoru)” ile eşlenen beyan alanları. */
export type FirmLegalBadgeFields = Pick<
  FirmRow,
  | "company_structure"
  | "company_type"
  | "tax_number"
  | "tax_office"
  | "license_number"
  | "permit_number"
  | "has_tax_certificate"
>;

function hasTrimmedText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Yasal şirket şekli: `company_structure` (panel select); yoksa `company_type` (eski/serbest metin).
 */
function hasLegalCompanyForm(firm: FirmLegalBadgeFields): boolean {
  return hasTrimmedText(firm.company_structure) || hasTrimmedText(firm.company_type);
}

function hasLicenseNumber(firm: FirmLegalBadgeFields): boolean {
  return hasTrimmedText(firm.license_number) || hasTrimmedText(firm.permit_number);
}

/**
 * En az bir yasal beyan alanı dolu veya `has_tax_certificate === true` ise rozet gösterilir.
 */
export function hasLegalInformationBadge(firm: FirmLegalBadgeFields): boolean {
  return Boolean(
    hasLegalCompanyForm(firm) ||
      hasTrimmedText(firm.tax_number) ||
      firm.has_tax_certificate === true ||
      hasLicenseNumber(firm) ||
      hasTrimmedText(firm.tax_office)
  );
}
