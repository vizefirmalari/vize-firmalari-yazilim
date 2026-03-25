import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 30;

function structurePoints(t: CorporatenessInput["company_structure"]): number {
  switch (t) {
    case "as":
      return 5;
    case "ltd":
      return 4;
    case "sahis":
      return 3;
    default:
      return 2;
  }
}

export function scoreLegalSection(input: CorporatenessInput): SectionScore {
  const lines = [
    scoringLine(
      LINE_KEYS.legal.structure,
      "Şirket yapısı (yasal şekil)",
      structurePoints(input.company_structure),
      5
    ),
    scoringLine(
      LINE_KEYS.legal.taxNumber,
      "Vergi numarası",
      input.has_tax_number ? 5 : 0,
      5
    ),
    scoringLine(
      LINE_KEYS.legal.license,
      "Lisans / yetki numarası",
      input.has_license_number ? 5 : 0,
      5
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
    scoringLine(
      LINE_KEYS.legal.officeVerified,
      "Ofis doğrulandı",
      input.office_verified ? 5 : 0,
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
