-- VizeFirmalari: Konuşma listesi yenilemesi için inbox broadcast + realtime.messages RLS
-- user-inbox:{user_id} — kullanıcının user_firm konuşmaları
-- firm-inbox:{firm_id} — firma paneli mesaj kutusu

-- ---------------------------------------------------------------------------
-- profiles: sohbet avatarı (isteğe bağlı; yoksa istemci initials kullanır)
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists avatar_url text;

comment on column public.profiles.avatar_url is 'İsteğe bağlı profil fotoğrafı URL’i (mesajlaşma başlığı)';

-- ---------------------------------------------------------------------------
-- realtime.messages — inbox kanalları
-- ---------------------------------------------------------------------------
drop policy if exists "realtime_user_inbox_select" on realtime.messages;
create policy "realtime_user_inbox_select"
  on realtime.messages
  for select
  to authenticated
  using (
    (select realtime.topic()) like 'user-inbox:%'
    and (split_part((select realtime.topic()), ':', 2))::uuid = auth.uid()
  );

drop policy if exists "realtime_firm_inbox_select" on realtime.messages;
create policy "realtime_firm_inbox_select"
  on realtime.messages
  for select
  to authenticated
  using (
    (select realtime.topic()) like 'firm-inbox:%'
    and public.is_firm_panel_member((split_part((select realtime.topic()), ':', 2))::uuid)
  );

-- ---------------------------------------------------------------------------
-- Mesaj sonrası inbox ping (konuşma listesi realtime)
-- ---------------------------------------------------------------------------
create or replace function public.messaging_after_message_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_topic text;
  v_payload jsonb;
  v_kind public.conversation_kind;
  v_firm_id uuid;
  v_primary uuid;
  v_inbox jsonb;
  r record;
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;

  select c.kind, c.firm_id, c.primary_end_user_id
  into v_kind, v_firm_id, v_primary
  from public.conversations c
  where c.id = new.conversation_id;

  v_topic := 'conversation:' || new.conversation_id::text;
  v_payload := jsonb_build_object(
    'id', new.id,
    'conversation_id', new.conversation_id,
    'sender_id', new.sender_id,
    'kind', new.kind,
    'created_at', new.created_at,
    'preview', left(coalesce(new.body, ''), 200)
  );

  perform realtime.send(v_payload, 'message', v_topic, true);

  if v_kind = 'user_firm' and v_firm_id is not null then
    v_inbox := jsonb_build_object(
      'conversation_id', new.conversation_id,
      'at', new.created_at
    );
    if v_primary is not null then
      perform realtime.send(v_inbox, 'inbox', 'user-inbox:' || v_primary::text, true);
    end if;
    perform realtime.send(v_inbox, 'inbox', 'firm-inbox:' || v_firm_id::text, true);
  end if;

  for r in
    select cp.user_id
    from public.conversation_participants cp
    where cp.conversation_id = new.conversation_id
      and cp.user_id is distinct from new.sender_id
  loop
    insert into public.notifications (user_id, kind, title, body, payload)
    values (
      r.user_id,
      'message.new',
      'Yeni mesaj',
      left(coalesce(new.body, 'Ek'), 120),
      jsonb_build_object(
        'conversation_id', new.conversation_id,
        'message_id', new.id
      )
    );
  end loop;

  return new;
end;
$$;
