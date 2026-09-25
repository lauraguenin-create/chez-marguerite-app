-- Bouquet reservations for Chez Marguerite.
-- Already applied to the Supabase project; kept here for reference and re-creation.
-- Visitors (role "anon") may only INSERT. Nobody can read the list from the app;
-- Laura reads it in the Supabase dashboard (Table Editor).

create table public.reservations (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  bouquet     text not null check (char_length(bouquet) between 1 and 120),
  nom         text not null check (char_length(btrim(nom)) between 1 and 100),
  contact     text not null check (char_length(btrim(contact)) between 3 and 150),
  jour_retrait date not null,
  message     text check (message is null or char_length(message) <= 500)
);

comment on table public.reservations is 'Réservations de bouquets depuis l''app Chez Marguerite';

alter table public.reservations enable row level security;

-- Only inserting is allowed for visitors; no select, update or delete.
-- The pickup day must lie between yesterday (time zones) and 60 days ahead.
revoke all on public.reservations from anon, authenticated;
grant insert (bouquet, nom, contact, jour_retrait, message) on public.reservations to anon;

create policy "Visitors can create reservations"
  on public.reservations
  for insert
  to anon
  with check (jour_retrait between current_date - 1 and current_date + 60);
