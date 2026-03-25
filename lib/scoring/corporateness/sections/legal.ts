import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 30;

export function scoreLegalSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.legal.taxDocument,
      "Vergi / resmi belge",
      input.has_tax_document ? 8 : 0,
      8
    ),
    scoringLine(
      LINE_KEYS.legal.companyType,
      "Şirket türü (yasal yapı)",
      companyTypePoints(input.company_type),
      5
    ),
    scoringLine(
      LINE_KEYS.legal.permit,
      "Yetki / izin numarası",
      input.has_permit_number ? 7 : 0,
      7
    ),
    scoringLine(
      LINE_KEYS.legal.physicalOffice,
      "Fiziksel ofis",
      input.has_physical_office ? 5 : 0,
      5
    ),
    scoringLine(
      LINE_KEYS.legal.corporateEmail,
      "Kurumsal e-posta",
      input.has_corporate_email ? 5 : 0,
      5
    ),
  ];

  return finalizeSection({
    id: "legal",
    label: "Yasal ve resmi yapı",
    section_max: MAX,
    lines,
  });
}

function companyTypePoints(t: CorporatenessInput["company_type"]): number {
  switch (t) {
    case "sahis":
      return 2;
    case "ltd":
      return 4;
    case "as":
      return 5;
    default:
      return 2;
  }
}
