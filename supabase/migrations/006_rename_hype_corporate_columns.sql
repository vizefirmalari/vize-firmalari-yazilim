-- VizeFirmalari: Ürün diline uygun sütun adları (ayrı skorlar)
-- hype_score -> raw_hype_score, corporate_score -> corporateness_score

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'firms' and column_name = 'hype_score'
  ) then
    alter table public.firms rename column hype_score to raw_hype_score;
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'firms' and column_name = 'corporate_score'
  ) then
    alter table public.firms rename column corporate_score to corporateness_score;
  end if;
end $$;

comment on column public.firms.raw_hype_score is 'Platform aktivitesi (Hype Puanı), 0–100';
comment on column public.firms.corporateness_score is 'Kurumsallık skoru (yönetilen faktörler), 0–100';

-- trust_score liste türetimi için kalır; uygulama tarafında güncellenir
create index if not exists firms_raw_hype_score_idx on public.firms (raw_hype_score desc);
create index if not exists firms_corporateness_score_idx on public.firms (corporateness_score desc);
