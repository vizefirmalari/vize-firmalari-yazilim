alter table public.firm_blog_posts
add column if not exists company_slug text;

update public.firm_blog_posts p
set company_slug = f.slug
from public.firms f
where f.id = p.firm_id
  and (p.company_slug is null or p.company_slug = '');

create index if not exists firm_blog_posts_company_slug_idx
  on public.firm_blog_posts (company_slug, published_at desc);

