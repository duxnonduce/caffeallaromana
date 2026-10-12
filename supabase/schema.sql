-- ============================================================
-- SCHEMA — Menù digitale con pannello admin
-- Esegui questo file UNA VOLTA per ogni nuovo locale, in:
-- Supabase → SQL Editor → New query → incolla tutto → Run
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- Dati anagrafici del locale (una sola riga) ----------
create table if not exists business (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Nome locale',
  tagline text not null default '',
  address text not null default '',
  maps_query text not null default '',
  phone text not null default '',
  phone_href text not null default '',
  instagram text not null default '',
  facebook text not null default '',
  logo_url text,
  hero_url text,
  updated_at timestamptz not null default now()
);

-- ---------- Orari di apertura (7 righe, una per giorno) ----------
create table if not exists hours (
  id serial primary key,
  day_index int not null unique check (day_index between 0 and 6), -- 0=lunedì ... 6=domenica
  day_it text not null,
  day_en text not null,
  open_time text,  -- formato 'HH:MM', NULL = chiuso quel giorno
  close_time text
);

-- ---------- Categorie del menù ----------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name_it text not null,
  name_en text not null default '',
  sort_order int not null default 0,
  is_active boolean not null default true  -- se falso, la categoria sparisce dal menù pubblico
);

-- ---------- Prodotti ----------
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name_it text not null,
  name_en text not null default '',
  desc_it text default '',
  desc_en text default '',
  note_it text default '',
  note_en text default '',
  price numeric(10,2),             -- NULL = "chiedi al banco"
  is_available boolean not null default true,  -- disponibilità (es. esaurito)
  sort_order int not null default 0
);

create index if not exists items_category_idx on items(category_id);

-- ============================================================
-- SICUREZZA (Row Level Security)
-- Lettura pubblica per tutti (il menù deve essere visibile senza login).
-- Scrittura solo per chi ha fatto login (l'unico account admin del locale).
-- ============================================================

alter table business enable row level security;
alter table hours enable row level security;
alter table categories enable row level security;
alter table items enable row level security;

create policy "public read business" on business for select using (true);
create policy "public read hours" on hours for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read items" on items for select using (true);

create policy "admin write business" on business for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write hours" on hours for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write categories" on categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write items" on items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE (immagini: logo e sfondo)
-- Prima crea manualmente un bucket pubblico chiamato "assets" da:
-- Supabase → Storage → New bucket → nome "assets" → Public bucket: ON
-- POI esegui le righe qui sotto.
-- ============================================================

create policy "public read assets" on storage.objects for select
  using (bucket_id = 'assets');
create policy "admin write assets" on storage.objects for insert
  with check (bucket_id = 'assets' and auth.role() = 'authenticated');
create policy "admin update assets" on storage.objects for update
  using (bucket_id = 'assets' and auth.role() = 'authenticated');
create policy "admin delete assets" on storage.objects for delete
  using (bucket_id = 'assets' and auth.role() = 'authenticated');

-- ---------- Righe orari di default (da modificare poi dal pannello admin) ----------
insert into hours (day_index, day_it, day_en, open_time, close_time) values
  (0, 'Lunedì', 'Monday', '08:00', '20:00'),
  (1, 'Martedì', 'Tuesday', '08:00', '20:00'),
  (2, 'Mercoledì', 'Wednesday', '08:00', '20:00'),
  (3, 'Giovedì', 'Thursday', '08:00', '20:00'),
  (4, 'Venerdì', 'Friday', '08:00', '20:00'),
  (5, 'Sabato', 'Saturday', '08:00', '20:00'),
  (6, 'Domenica', 'Sunday', null, null)
on conflict (day_index) do nothing;

-- ---------- Riga business di default (da modificare poi dal pannello admin) ----------
insert into business (name, tagline, address, maps_query, phone, phone_href, instagram, facebook)
select 'Nome locale', 'La tua insegna', 'Indirizzo del locale', 'Nome locale, città', '', '', '', ''
where not exists (select 1 from business);
