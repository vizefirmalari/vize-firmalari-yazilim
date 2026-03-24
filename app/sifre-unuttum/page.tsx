import { redirect } from "next/navigation";

export default function SifreUnuttumPage() {
  redirect("/?auth=forgot");
}
