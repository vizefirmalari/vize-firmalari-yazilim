import { NextResponse } from "next/server";

import { validateVisaCaseDocumentUpload } from "@/lib/validation/visa-case-document";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET = "visa-case-documents";

/**
 * Firma paneli — operasyon evrakı yükleme; path: {firmId}/{caseId}/{uuid}_{basename}
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Sunucu yapılandırması eksik." }, { status: 500 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  const form = await request.formData();
  const firmId = form.get("firmId");
  const caseId = form.get("caseId");
  const docTypeRaw = form.get("documentType");
  const file = form.get("file");

  const documentType = typeof docTypeRaw === "string" ? docTypeRaw.trim().slice(0, 120) || null : null;

  if (typeof firmId !== "string" || !firmId || typeof caseId !== "string" || !caseId || !(file instanceof File)) {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const v = validateVisaCaseDocumentUpload(file);
  if (!v.ok) {
    return NextResponse.json({ error: v.reason }, { status: 400 });
  }

  const { data: caseRow } = await supabase
    .from("visa_cases")
    .select("id,firm_id")
    .eq("id", caseId)
    .eq("firm_id", firmId)
    .maybeSingle();

  if (!caseRow) {
    return NextResponse.json({ error: "Dosya bulunamadı veya erişim yok." }, { status: 404 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  const uploadId = crypto.randomUUID();
  const path = `${firmId}/${caseId}/${uploadId}_${safeName}`;

  const buf = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 400 });
  }

  const { data: doc, error: insErr } = await supabase
    .from("visa_case_documents")
    .insert({
      case_id: caseId,
      firm_id: firmId,
      file_path: path,
      file_name: file.name,
      file_type: file.type || null,
      document_type: documentType,
      uploaded_by: user.id,
    })
    .select("id,file_path,file_name,document_type,uploaded_at")
    .single();

  if (insErr || !doc) {
    await supabase.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: insErr?.message ?? "Kayıt oluşturulamadı." }, { status: 400 });
  }

  return NextResponse.json(doc);
}
