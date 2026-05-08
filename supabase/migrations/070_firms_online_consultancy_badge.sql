alter table public.firms
add column if not exists online_consultancy_badge boolean not null default false;
