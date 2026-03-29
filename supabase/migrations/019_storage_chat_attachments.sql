-- VizeFirmalari: Sohbet ekleri — private bucket + storage.objects RLS
-- Path kuralı: {conversation_id}/{dosya_adı} — ilk segment UUID konuşma id’si olmalı

insert into storage.buckets (id, name, public, file_size_limit)
values ('chat-attachments', 'chat-attachments', false, 5242880)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

-- storage.objects RLS (Supabase Storage)
drop policy if exists "chat_attachments_select" on storage.objects;
create policy "chat_attachments_select"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'chat-attachments'
    and public.is_conversation_participant((split_part(name, '/', 1))::uuid)
  );

drop policy if exists "chat_attachments_insert" on storage.objects;
create policy "chat_attachments_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'chat-attachments'
    and public.is_conversation_participant((split_part(name, '/', 1))::uuid)
  );

drop policy if exists "chat_attachments_update" on storage.objects;
create policy "chat_attachments_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'chat-attachments'
    and public.is_conversation_participant((split_part(name, '/', 1))::uuid)
  )
  with check (
    bucket_id = 'chat-attachments'
    and public.is_conversation_participant((split_part(name, '/', 1))::uuid)
  );

drop policy if exists "chat_attachments_delete" on storage.objects;
create policy "chat_attachments_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'chat-attachments'
    and public.is_conversation_participant((split_part(name, '/', 1))::uuid)
  );
