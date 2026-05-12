"use client";

import type { ReactNode } from "react";

import { EmptyValue, MissingBadge, nonempty } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

function Row(props: { label: string; value: ReactNode; ok?: boolean }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-[#0B3C5D]/6 bg-[#FAFBFC] p-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
        {props.label}
      </span>
      <div className="flex flex-wrap items-center gap-2 text-sm text-[#1A1A1A]/85">
        {props.value}
        {props.ok === false ? <MissingBadge /> : null}
      </div>
    </div>
  );
}

export default function LegalTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const companyType = nonempty(f.company_type) ? String(f.company_type) : null;
  const companyStructure = nonempty(f.company_structure) ? String(f.company_structure) : null;
  const taxOk = nonempty(f.tax_number) || f.has_tax_certificate === true || f.has_tax_document === true;
  const licenseOk = nonempty(f.license_number) || nonempty(f.permit_number);
  const officeOk = f.has_physical_office === true;
  const verifiedOk = f.office_address_verified === true;
  const landlineOk = f.has_landline === true;
  const titleOk = nonempty(f.legal_company_name);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Row label="Şirket tipi" value={companyType ?? <EmptyValue />} ok={Boolean(companyType)} />
      <Row label="Yasal şekil" value={companyStructure ?? <EmptyValue />} ok={Boolean(companyStructure)} />
      <Row
        label="Vergi levhası / vergi bilgisi"
        value={taxOk ? (nonempty(f.tax_number) ? String(f.tax_number) : "Beyan edildi") : <EmptyValue />}
        ok={taxOk}
      />
      <Row
        label="Lisans bilgisi"
        value={
          licenseOk ? (
            [f.license_number, f.permit_number].map(String).find((s) => s.trim()) ?? "Kayıtlı"
          ) : (
            <EmptyValue />
          )
        }
        ok={licenseOk}
      />
      <Row label="Fiziksel ofis" value={officeOk ? "Evet" : <EmptyValue />} ok={officeOk} />
      <Row label="Ofis doğrulaması" value={verifiedOk ? "Doğrulandı" : <EmptyValue />} ok={verifiedOk} />
      <Row label="Sabit hat" value={landlineOk ? "Beyan edildi" : <EmptyValue />} ok={landlineOk} />
      <Row label="Resmi unvan" value={titleOk ? String(f.legal_company_name) : <EmptyValue />} ok={titleOk} />
    </div>
  );
}
