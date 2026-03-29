-- VizeFirmalari: Kullanıcı–firma konuşması bul/oluştur (RLS dışı güvenli taraf seçimi)
-- Son kullanıcı firm_panel_members / admin profiles okuyamaz; mantık SECURITY DEFINER içinde.

create or replace function public.ensure_user_firm_conversation(p_firm_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_conv uuid;
  v_counter uuid;
  v_is_firm_member boolean;
begin
  if v_user is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if not exists (select 1 from public.firms f where f.id = p_firm_id) then
    raise exception 'firm_not_found' using errcode = 'P0002';
  end if;

  select c.id into v_conv
  from public.conversations c
  where c.kind = 'user_firm'
    and c.firm_id = p_firm_id
    and c.primary_end_user_id = v_user
  limit 1;

  if v_conv is not null then
    return v_conv;
  end if;

  select fm.user_id into v_counter
  from public.firm_panel_members fm
  where fm.firm_id = p_firm_id
    and fm.status = 'active'
    and fm.user_id is distinct from v_user
  order by case fm.role when 'owner' then 0 else 1 end, fm.created_at
  limit 1;

  if v_counter is null then
    select p.id into v_counter
    from public.profiles p
    where p.role = 'admin'
    order by p.created_at
    limit 1;
  end if;

  if v_counter is null then
    raise exception 'no_counterparty' using errcode = 'P0001';
  end if;

  begin
    insert into public.conversations (kind, firm_id, primary_end_user_id, created_by)
    values ('user_firm', p_firm_id, v_user, v_user)
    returning id into v_conv;
  exception
    when unique_violation then
      select c.id into v_conv
      from public.conversations c
      where c.kind = 'user_firm'
        and c.firm_id = p_firm_id
        and c.primary_end_user_id = v_user
      limit 1;
      return v_conv;
  end;

  select exists (
    select 1
    from public.firm_panel_members fm
    where fm.user_id = v_counter
      and fm.firm_id = p_firm_id
      and fm.status = 'active'
  ) into v_is_firm_member;

  insert into public.conversation_participants (conversation_id, user_id, member_kind, firm_id)
  values
    (v_conv, v_user, 'end_user', null),
    (
      v_conv,
      v_counter,
      case when v_is_firm_member then 'firm_member'::public.conversation_member_kind
           else 'admin'::public.conversation_member_kind
      end,
      case when v_is_firm_member then p_firm_id else null end
    );

  return v_conv;
end;
$$;

comment on function public.ensure_user_firm_conversation(uuid) is
  'Oturumlu kullanıcı için user_firm konuşması döndürür veya oluşturur; karşı taraf panel üyesi veya admin.';

grant execute on function public.ensure_user_firm_conversation(uuid) to authenticated;
