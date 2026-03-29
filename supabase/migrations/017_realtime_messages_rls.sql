-- VizeFirmalari: Realtime Broadcast — private channel authorization (realtime.messages)
-- İstemci: supabase.channel('conversation:' || id, { config: { private: true } })
-- Bildirim: supabase.channel('notifications:' || userId, { config: { private: true } })
--
-- Dashboard: Realtime → "Allow public access" kapalı olmalı; Authorization açık.
-- https://supabase.com/docs/guides/realtime/authorization

-- RLS (Supabase Realtime v2)
alter table realtime.messages enable row level security;

-- Mevcut geniş politikaları kaldırıyorsanız isimleri projeye göre uyarlayın
drop policy if exists "realtime_conversation_private_select" on realtime.messages;
drop policy if exists "realtime_notifications_private_select" on realtime.messages;

-- Konuşma kanalı: yalnızca katılımcılar
create policy "realtime_conversation_private_select"
  on realtime.messages
  for select
  to authenticated
  using (
    (select realtime.topic()) like 'conversation:%'
    and public.is_conversation_participant(
      (split_part((select realtime.topic()), ':', 2))::uuid
    )
  );

-- Kullanıcı bildirim kanalı: yalnızca kendi kullanıcı id’si
create policy "realtime_notifications_private_select"
  on realtime.messages
  for select
  to authenticated
  using (
    (select realtime.topic()) like 'notifications:%'
    and (split_part((select realtime.topic()), ':', 2))::uuid = auth.uid()
  );

-- İstemci aboneliği için (Realtime Authorization)
grant usage on schema realtime to authenticated;
grant select on realtime.messages to authenticated;
