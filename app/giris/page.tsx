import { redirect } from "next/navigation";

/** Eski adresler tek modal akışına yönlendirilir */
export default function GirisPage() {
  redirect("/?auth=login");
}
