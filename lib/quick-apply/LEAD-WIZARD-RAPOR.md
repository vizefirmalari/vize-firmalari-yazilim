# Hızlı Başvuru (Lead) Sihirbazı — Adım ve Alan Raporu

Bu doküman `components/quick-apply/quick-apply-launcher.tsx` ve `lib/quick-apply/questions.ts` ile uyumludur.  
Programatik özet: `lib/quick-apply/lead-wizard-report.ts` (`getLeadWizardStepReport`, `buildDynamicStepFields`).

---

## Adım indeksi (UI `step`)

| step | Anahtar | Başlık |
|------|---------|--------|
| 0 | intro | Güvenli ve Düzenli Başvuru Süreci |
| 1 | visa_type | Vize türünüz |
| 2 | target_country | Hedef ülke / ülke grubu |
| 3 | summary | Kısa durum özeti |
| 4 | contact | Kişisel ve iletişim bilgileri |
| 5 | dynamic_questions | Size özel sorular (vize türüne göre) |
| 6 | readiness | Hazırlık ve uygunluk |
| 7 | files | Belge yükleme |
| 8 | approval | Onay ve gönderim |
| 9 | success | Başvurunuz alındı |

---

## Açılır menü (`<select>`) kullanılan alanlar

| Adım | Alan | Seçenekler |
|------|------|------------|
| 5 | Dinamik sorular — `type: boolean` | Boş / Evet / Hayır (`Seçiniz`, `Evet`, `Hayır`) |
| 6 | Pasaport durumu | Pasaportum hazır / Başvuru sürecindeyim / Henüz yok (`ready`, `in_progress`, `none`) |
| 7 | Belge türü | Pasaport, Kimlik, CV, Diploma/öğrenci belgesi, Davet mektubu, İş teklifi/destekleyici evrak, Diğer |

**Not:** Vize türü (adım 1) ve intro CTA görsel olarak buton ızgarası; HTML `<select>` değil.

---

## Metin ve çok satırlı alanlar

| Adım | Alan tipi | Alanlar |
|------|-----------|---------|
| 2 | tek satır | Hedef ülke / ülke grubu |
| 3 | çok satır + tek satır | Kısa özet (textarea), planlanan zamanlama (input) |
| 4 | tek satır | Ad Soyad, Telefon, E-posta, Şehir |
| 5 | tek satır veya select | `DYNAMIC_QUESTIONS` içinde `text` → input; `boolean` → select |

---

## Onay (checkbox)

| Adım | Alan |
|------|------|
| 6 | Daha önce vize reddi aldım |
| 8 | Veri işleme onayı, iletişim onayı (gönderim için zorunlu) |

---

## Dinamik sorular (adım 5) — vize türüne göre

Kaynak: `DYNAMIC_QUESTIONS` (`lib/quick-apply/questions.ts`).

| Vize kodu | Etiket | Sorular (anahtar: etiket) |
|-----------|--------|---------------------------|
| `work` | Çalışma Vizesi | profession, experience_years, international_experience (select), language_level, cv_ready (select), job_offer (select) |
| `tourist` | Turistik Vize | travel_purpose, travel_duration, accommodation_plan (select), invitation_letter (select), recent_travel_date |
| `family_reunion` | Aile Birleşimi | relationship_type, family_member_status, official_relationship (select), documents_ready (select) |
| `student` | Öğrenci Vizesi | program_type, acceptance_letter (select), budget_status, language_readiness, education_start_date |
| `not_sure` | Emin Değilim | candidate_goal, current_profile, education_or_profession, extra_context |

---

## Veri eşlemesi (özet)

- Ana kayıt: `lead_applications` — `visa_type`, `target_country`, `short_summary`, `timeline`, `applicant_name`, `phone`, `email`, `city`, `passport_status`, `previous_refusal`, `answers` (jsonb), onay alanları, skor alanları.
- Dinamik cevaplar: `answers` içinde yukarıdaki `answerKey` değerleri.
- Dosyalar: `lead_application_files` + Storage `lead-application-files`.

---

## Güncelleme

`DYNAMIC_QUESTIONS` veya wizard adımları değiştiğinde bu raporu ve `lead-wizard-report.ts` içindeki statik adımları senkron tutun.
