create extension if not exists "uuid-ossp";

create table if not exists public.beats (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  genre text not null,
  bpm integer not null check (bpm > 0),
  musical_key text not null,
  mood text,
  tags text[] default '{}',
  cover_image text,
  preview_audio text,
  featured boolean not null default false,
  availability boolean not null default true,
  play_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.licenses (
  id uuid primary key default uuid_generate_v4(),
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_name text not null,
  price numeric(10,2) not null check (price >= 0),
  rights_description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.sample_packs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  cover_image text,
  preview_audio text,
  zip_file text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  whatsapp_number text not null default '237600000000',
  social_links jsonb not null default '{}',
  homepage_content jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  contact text not null,
  message text not null,
  beat_id uuid references public.beats(id) on delete set null,
  license_name text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists settings_touch_updated_at on public.settings;
create trigger settings_touch_updated_at
before update on public.settings
for each row execute function public.touch_updated_at();

alter table public.beats enable row level security;
alter table public.licenses enable row level security;
alter table public.sample_packs enable row level security;
alter table public.settings enable row level security;
alter table public.inquiries enable row level security;

create policy "Public can read available beats" on public.beats
for select using (availability = true);

create policy "Public can read licenses" on public.licenses
for select using (
  exists (select 1 from public.beats where beats.id = licenses.beat_id and beats.availability = true)
);

create policy "Public can read sample packs" on public.sample_packs
for select using (true);

create policy "Public can read settings" on public.settings
for select using (true);

create policy "Public can create inquiries" on public.inquiries
for insert with check (true);

create policy "Authenticated admin full access beats" on public.beats
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated admin full access licenses" on public.licenses
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated admin full access sample packs" on public.sample_packs
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated admin full access settings" on public.settings
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated admin can read inquiries" on public.inquiries
for select using (auth.role() = 'authenticated');

create policy "Authenticated admin can update inquiries" on public.inquiries
for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.settings (whatsapp_number, social_links, homepage_content)
select
  '237652692039',
  '{"instagram":"https://instagram.com/mistaalino","youtube":"https://youtube.com/@mistaalino","tiktok":"https://tiktok.com/@mistaalino"}',
  '{"headline":"Alien Beatz by Mista Alino","subheadline":"Premium Afro, trap, drill, and cinematic instrumentals crafted in Cameroon."}'
where not exists (select 1 from public.settings);

insert into storage.buckets (id, name, public)
values
  ('beat-previews', 'beat-previews', true),
  ('cover-images', 'cover-images', true),
  ('sample-pack-zips', 'sample-pack-zips', false)
on conflict (id) do nothing;

drop policy if exists "Public can read cover images" on storage.objects;
create policy "Public can read cover images" on storage.objects
for select using (bucket_id = 'cover-images');

drop policy if exists "Public can read beat previews" on storage.objects;
create policy "Public can read beat previews" on storage.objects
for select using (bucket_id = 'beat-previews');

drop policy if exists "Authenticated admins upload covers" on storage.objects;
create policy "Authenticated admins upload covers" on storage.objects
for insert with check (bucket_id = 'cover-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated admins upload previews" on storage.objects;
create policy "Authenticated admins upload previews" on storage.objects
for insert with check (bucket_id = 'beat-previews' and auth.role() = 'authenticated');

drop policy if exists "Authenticated admins manage zip files" on storage.objects;
create policy "Authenticated admins manage zip files" on storage.objects
for all using (bucket_id = 'sample-pack-zips' and auth.role() = 'authenticated')
with check (bucket_id = 'sample-pack-zips' and auth.role() = 'authenticated');
