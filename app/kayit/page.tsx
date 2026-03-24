import { redirect } from "next/navigation";

export default function KayitPage() {
  redirect("/?auth=register");
}
