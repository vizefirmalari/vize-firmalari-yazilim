-- VizeFirmalari: Ek yükleme hatasında mesaj satırını geri almak için gönderen silme
drop policy if exists "messages_delete_own_sender" on public.messages;
create policy "messages_delete_own_sender"
  on public.messages
  for delete
  to authenticated
  using (sender_id = auth.uid());
