-- PostgREST insert().select() dönüşü için SELECT gerekir. Başvuran (authenticated)
-- kendi satırını okuyabilmeli; aksi halde kayıt oluşur ama istemciye id dönmez / PGRST116.

alter table public.lead_applications
  add column if not exists submitted_by_user_id uuid null references auth.users (id) on delete set null;

comment on column public.lead_applications.submitted_by_user_id is 'Başvuruyu gönderen auth kullanıcısı (RLS SELECT + insert returning).';

drop policy if exists "applicant can select own lead application" on public.lead_applications;
create policy "applicant can select own lead application"
  on public.lead_applications
  for select
  to authenticated
  using (submitted_by_user_id is not null and auth.uid() = submitted_by_user_id);
