-- Run this script in Supabase SQL Editor (project owner only).
-- For an existing project, inspect existing policies before rerunning setup.
create table if not exists public.game_saves (
 user_id uuid not null references auth.users(id) on delete cascade,
 slot text not null default 'main',
 save_data jsonb not null,
 updated_at timestamptz not null default now(),
 primary key(user_id,slot)
);
alter table public.game_saves enable row level security;
drop policy if exists "Players read own saves" on public.game_saves;
drop policy if exists "Players insert own saves" on public.game_saves;
drop policy if exists "Players update own saves" on public.game_saves;
create policy "Players read own saves" on public.game_saves for select to authenticated using (auth.uid()=user_id);
create policy "Players insert own saves" on public.game_saves for insert to authenticated with check (auth.uid()=user_id);
create policy "Players update own saves" on public.game_saves for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
-- SINGLE, OWNER-SELECTED ADMIN ACCOUNT. Never expose writes to clients.
create table if not exists public.game_admins (
 user_id uuid primary key references auth.users(id) on delete cascade,
 singleton boolean not null default true unique check (singleton)
);
alter table public.game_admins enable row level security;
drop policy if exists "Admins can read own admin flag" on public.game_admins;
create policy "Admins can read own admin flag" on public.game_admins for select to authenticated using (auth.uid()=user_id and exists (
 select 1 from auth.users u where u.id=game_admins.user_id and lower(u.email)='kingkippy@example.com'
));
-- IMPORTANT: On Supabase Auth > Users, find the account that YOU created with
-- username KingKippy, and verify its email alias kingkippy@example.com.
-- If someone else has already registered the alias, DO NOT authorize that account.
-- Reset/resolve that account via trusted Auth administration first.
-- To appoint the legitimate owner after verification, run in SQL Editor:
-- delete from public.game_admins;
-- insert into public.game_admins (user_id) values ('YOUR_VERIFIED_KINGKIPPY_USER_UUID');
-- Only a database owner/service role can perform these changes; NEVER put secret keys in the game.
-- Unique auth email aliases already prevent case-insensitive duplicate KingKippy registrations.
