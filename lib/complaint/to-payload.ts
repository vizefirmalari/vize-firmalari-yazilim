import type { FirmComplaintPayload } from "@/lib/complaint/types";
import type { FirmComplaintFormValues } from "@/lib/validations/firm-complaint";

export function firmComplaintValuesToPayload(
  v: FirmComplaintFormValues
): FirmComplaintPayload {
  const base: FirmComplaintPayload = {
    firmId: v.firmId,
    subject: v.subject,
    description: v.description,
    email: v.email,
  };
  if (v.phone && String(v.phone).trim() !== "") {
    return { ...base, phone: String(v.phone).trim() };
  }
  return base;
}
