-- VizeFirmalari: realtime.send ile Broadcast — messages + notifications
-- Önkoşul: realtime.send() projede etkin (Supabase Realtime Broadcast from Database).
-- https://supabase.com/docs/guides/realtime/broadcast#broadcast-from-the-database

-- ---------------------------------------------------------------------------
-- Yeni mesaj: konuşma zaman damgası + konuşma kanalına broadcast + alıcı bildirimleri
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
  r record;
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;

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

comment on function public.messaging_after_message_insert() is
  'Mesaj sonrası: last_message_at, conversation kanalına broadcast, alıcı bildirim satırları';

drop trigger if exists tr_messages_messaging_broadcast on public.messages;
create trigger tr_messages_messaging_broadcast
  after insert on public.messages
  for each row
  execute function public.messaging_after_message_insert();

-- ---------------------------------------------------------------------------
-- Bildirim satırı: kullanıcıya özel notifications:{user_id} kanalına broadcast
-- ---------------------------------------------------------------------------
create or replace function public.messaging_after_notification_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_topic text;
  v_payload jsonb;
begin
  v_topic := 'notifications:' || new.user_id::text;
  v_payload := jsonb_build_object(
    'id', new.id,
    'kind', new.kind,
    'title', new.title,
    'body', new.body,
    'payload', coalesce(new.payload, '{}'::jsonb),
    'created_at', new.created_at
  );

  perform realtime.send(v_payload, 'notification', v_topic, true);

  return new;
end;
$$;

comment on function public.messaging_after_notification_insert() is
  'In-app bildirim satırı oluşunca Realtime Broadcast (private topic)';

drop trigger if exists tr_notifications_messaging_broadcast on public.notifications;
create trigger tr_notifications_messaging_broadcast
  after insert on public.notifications
  for each row
  execute function public.messaging_after_notification_insert();
