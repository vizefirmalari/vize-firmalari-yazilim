-- VizeFirmalari: Son kullanıcı mesaj kutusu — konuşma listesi + okunmamış (tek sorgu)

create or replace function public.user_messaging_inbox_rows()
returns table (
  conversation_id uuid,
  firm_id uuid,
  last_message_at timestamptz,
  last_body text,
  last_kind text,
  last_sender_id uuid,
  has_attachment boolean,
  unread_for_user bigint,
  firm_name text,
  firm_logo_url text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  return query
  select
    c.id as conversation_id,
    c.firm_id,
    c.last_message_at,
    lm.body as last_body,
    lm.kind::text as last_kind,
    lm.sender_id as last_sender_id,
    coalesce(lm.has_att, false) as has_attachment,
    (
      select count(*)::bigint
      from public.messages m
      where m.conversation_id = c.id
        and m.sender_id is distinct from auth.uid()
        and (
          me.last_read_message_id is null
          or m.created_at > (
            select m2.created_at
            from public.messages m2
            where m2.id = me.last_read_message_id
          )
        )
    ) as unread_for_user,
    f.name as firm_name,
    f.logo_url as firm_logo_url
  from public.conversations c
  inner join public.conversation_participants me
    on me.conversation_id = c.id
   and me.user_id = auth.uid()
  inner join public.firms f on f.id = c.firm_id
  left join lateral (
    select
      m.body,
      m.kind,
      m.sender_id,
      exists (
        select 1 from public.message_attachments a where a.message_id = m.id
      ) as has_att
    from public.messages m
    where m.conversation_id = c.id
    order by m.created_at desc
    limit 1
  ) lm on true
  where c.kind = 'user_firm'
    and c.primary_end_user_id = auth.uid();
end;
$$;

comment on function public.user_messaging_inbox_rows() is
  'Kullanıcı: kendi user_firm konuşmaları, firma adı/logo, okunmamış sayısı';

grant execute on function public.user_messaging_inbox_rows() to authenticated;
