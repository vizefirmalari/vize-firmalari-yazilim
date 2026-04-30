import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/auth/admin";
import { getFirmPanelMemberships } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

const BUCKET = "visa-case-documents";
const TTL_SEC = 300;

/**
 * Operasyon evrakları — firma üyesi veya yönetici; public URL üretmez.
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  let body: { firmId?: string; caseId?: string; filePath?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const firmId = body.firmId?.trim();
  const caseId = body.caseId?.trim();
  const filePath = body.filePath?.trim();

  if (!firmId || !caseId || !filePath || filePath.includes("..")) {
    return NextResponse.json({ error: "Geçersiz parametreler." }, { status: 400 });
  }

  const admin = await getAdminContext();
  if (!admin) {
    const memberships = await getFirmPanelMemberships();
    const isFirmMember = memberships.some((m) => m.firmId === firmId);
    if (!isFirmMember) {
      return NextResponse.json({ error: "Bu dosyaya erişim yetkiniz yok." }, { status: 403 });
    }
  }

  const { data: fileRow, error: fileErr } = await supabase
    .from("visa_case_documents")
    .select("id")
    .eq("firm_id", firmId)
    .eq("case_id", caseId)
    .eq("file_path", filePath)
    .maybeSingle();

  if (fileErr || !fileRow) {
    return NextResponse.json({ error: "Dosya kaydı bulunamadı." }, { status: 404 });
  }

  const signer = createSupabaseServiceRoleClient() ?? supabase;
  const { data: signed, error: signErr } = await signer.storage.from(BUCKET).createSignedUrl(filePath, TTL_SEC);

  if (signErr || !signed?.signedUrl) {
    return NextResponse.json({ error: signErr?.message ?? "İmzalı bağlantı oluşturulamadı." }, { status: 400 });
  }

  return NextResponse.json({ url: signed.signedUrl, expiresIn: TTL_SEC });
}
