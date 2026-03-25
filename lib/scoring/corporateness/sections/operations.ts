import type { CorporatenessInput, SectionScore } from "../types";
import { LINE_KEYS } from "../line-keys";
import { finalizeSection, scoringLine } from "../helpers";

const MAX = 20;

function employeePoints(n: number): number {
  if (n <= 1) return 1;
  if (n <= 5) return 4;
  if (n <= 10) return 7;
  if (n <= 20) return 9;
  return 10;
}

export function scoreOperationsSection(input: CorporatenessInput): SectionScore {
  const ec = Math.max(0, Math.floor(Number(input.employee_count) || 0));

  const lines = [
    scoringLine(
      LINE_KEYS.operations.employees,
      "Çalışan sayısı",
      employeePoints(ec),
      10
    ),
    scoringLine(
      LINE_KEYS.operations.workingHours,
      "Çalışma saatleri",
      input.has_working_hours ? 2 : 0,
      2
    ),
    scoringLine(
      LINE_KEYS.operations.phone,
      "Telefon",
      input.has_phone ? 2 : 0,
      2
    ),
    scoringLine(
      LINE_KEYS.operations.whatsapp,
      "WhatsApp",
      input.has_whatsapp ? 2 : 0,
      2
    ),
    scoringLine(
      LINE_KEYS.operations.mapsUrl,
      "Harita bağlantısı",
      input.has_maps_url ? 2 : 0,
      2
    ),
    scoringLine(
      LINE_KEYS.operations.completeContact,
      "Tam iletişim seti (telefon, e-posta, adres, harita)",
      input.has_complete_contact_set ? 2 : 0,
      2
    ),
  ];

  return finalizeSection({
    id: "operations",
    label: "Operasyonel kapasite",
    section_max: MAX,
    lines,
  });
}
