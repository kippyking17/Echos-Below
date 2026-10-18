-- Echos Below 3.2.0. Run once in the EXISTING project's Supabase SQL Editor.
-- Adds isolated co-op data. Does not change accounts, admins or single-player saves.
begin;
create schema if not exists echos_private;
revoke all on schema echos_private from public, anon, authenticated;
create table if not exists echos_private.mp_rooms (
 code text primary key, host uuid not null references auth.users(id) on delete cascade,
 status text not null default 'lobby', chapter integer not null default 0,
 room integer not null default 0, party_size integer not null default 1,
 enemy_hp integer not null default 0, enemy_max integer not null default 0,
 enemy_kind text not null default '', peace numeric not null default 0,
 cleared boolean not null default false, wave integer not null default 0,
 target_x numeric not null default 480, target_y numeric not null default 320,
 danger_at timestamptz, next_wave timestamptz,
 updated_at timestamptz not null default clock_timestamp()
);
create table if not exists echos_private.mp_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 code text not null references echos_private.mp_rooms(code) on delete cascade,
 name text not null, character text not null default 'wanderer',
 ready boolean not null default false, level integer not null default 1,
 hp integer not null default 28, max_hp integer not null default 28,
 attack integer not null default 13, defense integer not null default 0,
 x numeric not null default 180, y numeric not null default 320,
 last_seen timestamptz not null default clock_timestamp(),
 moved_at timestamptz not null default clock_timestamp(),
 action_at timestamptz not null default 'epoch',
 dodge_until timestamptz not null default 'epoch',
 dodge_at timestamptz not null default 'epoch',
 joined_at timestamptz not null default clock_timestamp(),
 animation text not null default '', animation_at timestamptz not null default 'epoch'
);
create index if not exists mp_members_room on echos_private.mp_members(code);
create table if not exists echos_private.mp_limits (
 user_id uuid primary key references auth.users(id) on delete cascade,
 banned_until timestamptz not null default 'epoch',
 window_at timestamptz not null default clock_timestamp(), attempts integer not null default 0,
 chat_at timestamptz not null default 'epoch'
);
create table if not exists echos_private.mp_chat (
 id bigint generated always as identity primary key,
 code text not null references echos_private.mp_rooms(code) on delete cascade,
 name text not null, body text not null, sent_at timestamptz not null default clock_timestamp()
);
create index if not exists mp_chat_room on echos_private.mp_chat(code,id desc);
alter table echos_private.mp_rooms enable row level security;
alter table echos_private.mp_members enable row level security;
alter table echos_private.mp_limits enable row level security;
alter table echos_private.mp_chat enable row level security;
revoke all on all tables in schema echos_private from public, anon, authenticated;
revoke all on all sequences in schema echos_private from public, anon, authenticated;

-- A word/phrase filter, not a substring filter: harmless words such as "class" survive.
-- Normalize common leetspeak, repeated letters, spacing and punctuation in English.
create or replace function echos_private.mp_bad_text(value text) returns boolean
language plpgsql immutable set search_path = '' as $$
declare normalized text; collapsed text; compact text; word text; expression text;
begin
 normalized := lower(translate(coalesce(value,''),'013457@$!','oieastasi'));
 normalized := regexp_replace(normalized,'(.)\1{2,}','\1\1','g');
 normalized := regexp_replace(normalized,'[^a-z]+',' ','g');
 collapsed := regexp_replace(normalized,'(.)\1','\1','g');
 compact := regexp_replace(collapsed,' ','','g');
 foreach word in array array['fuck','shit','bitch','cunt','asshole','bastard','dick','cock','pussy','porn','porno','pornography','sex','sexy','sexual','nude','nudes','nudity','naked','blowjob','handjob','cum','cumming','orgasm','penis','vagina','boobs','tits','hentai','rape','fucker','fucking','motherfucker','bullshit','damn','hell','crap','piss','slut','whore','jizz','erection','erotic','masturbate','masturbation'] loop
  if (' '||normalized||' ') ~ ('(^| )'||word||'(s|ing|ed|er|ers)?( |$)')
   or (' '||collapsed||' ') ~ ('(^| )'||regexp_replace(word,'(.)\1','\1','g')||'(s|ing|ed|er|ers)?( |$)') then return true; end if;
  -- Catch deliberately spelled-out terms ("f.u.c.k" / "s e x"), with boundaries.
  expression := array_to_string(regexp_split_to_array(word,''),' *');
  if (' '||normalized||' ') ~ ('(^| )'||expression||'( |$)') then return true; end if;
 end loop;
 return false;
end $$;
revoke all on function echos_private.mp_bad_text(text) from public,anon,authenticated;

create or replace function public.echos_mp(action text, room_code text default '', message text default '',
 px numeric default null, py numeric default null, choice text default '') returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
 uid uuid := auth.uid(); t timestamptz := clock_timestamp();
 r echos_private.mp_rooms%rowtype; m echos_private.mp_members%rowtype;
 limits echos_private.mp_limits%rowtype; display_name text; code_value text;
 count_members integer; c integer; kind text; base_hp integer; base_damage integer;
 phase integer; damage_value integer; elapsed numeric; distance numeric; factor numeric;
 roster jsonb; chat jsonb; target record; hits integer; bonus_hp integer;
begin
 if uid is null then return jsonb_build_object('error','Log in to play multiplayer.','reason','login'); end if;
 insert into echos_private.mp_limits(user_id) values(uid) on conflict do nothing;
 select * into limits from echos_private.mp_limits where user_id=uid for update;
 if limits.banned_until>t then
  return jsonb_build_object('error','Multiplayer banned for inappropriate language.','reason','banned','bannedUntil',limits.banned_until,'serverTime',t);
 end if;
 if action not in ('create','join','poll','ready','start','move','attack','act','dodge','revive','heal','advance','retry','chat','leave') then
  return jsonb_build_object('error','Unknown action.');
 end if;
 if action in ('create','join') then
  if limits.window_at<t-interval '1 minute' then limits.attempts:=0;limits.window_at:=t;end if;
  update echos_private.mp_limits set attempts=limits.attempts+1,window_at=limits.window_at where user_id=uid;
  if limits.attempts>=12 then return jsonb_build_object('error','Too many room attempts. Try again in a minute.'); end if;
  select coalesce(raw_user_meta_data->>'username','Traveler') into display_name from auth.users where id=uid;
  display_name:=left(regexp_replace(coalesce(display_name,'Traveler'),'[^a-zA-Z0-9_]','','g'),20);
  if display_name='' then display_name:='Traveler';end if;
  if echos_private.mp_bad_text(display_name) then
   update echos_private.mp_limits set banned_until=t+interval '1 minute' where user_id=uid;
   delete from echos_private.mp_members where user_id=uid;
   return jsonb_build_object('error','Choose a suitable account name. One-minute multiplayer ban.','reason','banned','bannedUntil',t+interval '1 minute','serverTime',t);
  end if;
  select * into m from echos_private.mp_members where user_id=uid;
  if found and m.last_seen>t-interval '35 seconds' then return jsonb_build_object('error','You are already in a room. Leave it first.'); end if;
  delete from echos_private.mp_members where user_id=uid;
  if action='create' then
   -- Expired co-op sessions only; no player saves or accounts are removed.
   delete from echos_private.mp_rooms where updated_at<t-interval '24 hours';
   code_value:=upper(substr(replace(gen_random_uuid()::text,'-',''),1,10));
   insert into echos_private.mp_rooms(code,host) values(code_value,uid) returning * into r;
  else
   code_value:=upper(regexp_replace(room_code,'[^a-zA-Z0-9]','','g'));
   select * into r from echos_private.mp_rooms where code=code_value for update;
   if not found then return jsonb_build_object('error','Room not found. Check the private code.'); end if;
   if r.status<>'lobby' then return jsonb_build_object('error','This journey has started. Join the next lobby.'); end if;
  end if;
  delete from echos_private.mp_members where code=r.code and last_seen<t-interval '35 seconds';
  select count(*) into count_members from echos_private.mp_members where code=r.code;
  if count_members>=4 then return jsonb_build_object('error','This room is full (4 players).'); end if;
  kind:=case when choice in ('wanderer','mossrunner','embercoat','duskcloak','seaglass','dawnkeeper') then choice else 'wanderer' end;
  base_hp:=case kind when 'wanderer' then 28 when 'dawnkeeper' then 28 when 'seaglass' then 26 else 24 end;
  insert into echos_private.mp_members(user_id,code,name,character,x,y,hp,max_hp,attack,defense)
   values(uid,r.code,display_name,kind,180,240+count_members*55,base_hp,base_hp,case kind when 'embercoat' then 16 else 13 end,case kind when 'wanderer' then 1 when 'seaglass' then 3 else 0 end);
 else
  select * into m from echos_private.mp_members where user_id=uid;
  if not found then return jsonb_build_object('error','Your room has ended. Create or join a room.','reason','left'); end if;
  select * into r from echos_private.mp_rooms where code=m.code for update;
 end if;
 delete from echos_private.mp_members where code=r.code and last_seen<t-interval '35 seconds' and user_id<>uid;
 if not exists(select 1 from echos_private.mp_members where code=r.code and user_id=r.host) then
  select user_id into r.host from echos_private.mp_members where code=r.code order by joined_at limit 1;
 end if;
 update echos_private.mp_members set last_seen=t where user_id=uid returning * into m;
 if action='leave' then
  delete from echos_private.mp_members where user_id=uid;
  if r.host=uid then select user_id into r.host from echos_private.mp_members where code=r.code order by joined_at limit 1;end if;
  if r.host is null then delete from echos_private.mp_rooms where code=r.code;
  else update echos_private.mp_rooms set host=r.host,updated_at=t where code=r.code;end if;
  return jsonb_build_object('left',true);
 end if;
 if action='chat' then
  if length(message)>180 or length(trim(message))=0 then return jsonb_build_object('error','Messages must be 1–180 characters.');end if;
  if echos_private.mp_bad_text(message) then
   update echos_private.mp_limits set banned_until=t+interval '1 minute' where user_id=uid;
   delete from echos_private.mp_members where user_id=uid;
   -- Commit the ban by returning, rather than raising and rolling back the transaction.
   return jsonb_build_object('error','One-minute multiplayer ban for inappropriate language.','reason','banned','bannedUntil',t+interval '1 minute','serverTime',t);
  end if;
  if limits.chat_at>t-interval '1500 milliseconds' then return jsonb_build_object('error','Please wait before sending another message.');end if;
  insert into echos_private.mp_chat(code,name,body) values(r.code,m.name,trim(message));
  update echos_private.mp_limits set chat_at=t where user_id=uid;
  delete from echos_private.mp_chat where code=r.code and id not in(select id from echos_private.mp_chat where code=r.code order by id desc limit 40);
 end if;
 if action='ready' and r.status='lobby' then update echos_private.mp_members set ready=not ready where user_id=uid;end if;
 if action='start' then
  if r.host<>uid then return jsonb_build_object('error','Only the room leader can start.');end if;
  if r.status<>'lobby' then return jsonb_build_object('error','Journey already started.');end if;
  if exists(select 1 from echos_private.mp_members where code=r.code and not ready) then return jsonb_build_object('error','Every traveler must be ready.');end if;
  select count(*) into r.party_size from echos_private.mp_members where code=r.code;
  r.status:='world';r.cleared:=true;
 end if;
 if r.status in ('world','battle') then
  if action='move' and m.hp>0 and px is not null and py is not null then
   if px::text in ('NaN','Infinity','-Infinity') or py::text in ('NaN','Infinity','-Infinity') then return jsonb_build_object('error','Invalid movement.');end if;
   elapsed:=greatest(0,least(2,extract(epoch from(t-m.moved_at))));
   distance:=sqrt(power(px-m.x,2)+power(py-m.y,2));factor:=least(1,(case when m.character='mossrunner' then 202 else 180 end)*elapsed/greatest(distance,1));
   update echos_private.mp_members set x=greatest(120,least(840,m.x+(px-m.x)*factor)),y=greatest(180,least(450,m.y+(py-m.y)*factor)),moved_at=t where user_id=uid returning * into m;
  end if;
  if action='dodge' and m.hp>0 and m.dodge_at<t-interval '2200 milliseconds' then
   update echos_private.mp_members set dodge_at=t,dodge_until=t+interval '650 milliseconds',animation='dodge',animation_at=t where user_id=uid returning * into m;
  end if;
  if action='revive' and m.hp>0 and m.action_at<t-interval '1600 milliseconds' then
   select * into target from echos_private.mp_members where code=r.code and hp=0 and sqrt(power(x-m.x,2)+power(y-m.y,2))<85 order by joined_at limit 1;
   if found then update echos_private.mp_members set hp=least(max_hp,greatest(1,ceil(max_hp*.35)::integer)+(case when m.character='dawnkeeper' then 6 else 0 end)),dodge_until=t+interval '2 seconds' where user_id=target.user_id;update echos_private.mp_members set action_at=t where user_id=uid;end if;
  end if;
 if action='heal' and r.enemy_hp=0 and ((r.chapter<29 and r.room in(4,6)) or (r.chapter=29 and r.room in(1,2))) then
   update echos_private.mp_members set hp=max_hp where code=r.code;
  end if;
 end if;
 if r.status='battle' then
  phase:=case when r.chapter=29 and r.enemy_kind='boss' and r.enemy_hp<=r.enemy_max/3 then 3 when r.enemy_hp<=r.enemy_max*(case when r.chapter=29 and r.enemy_kind='boss' then .6667 else .5 end) then 2 else 1 end;
  if action in ('attack','act') and m.hp>0 and m.action_at<t-interval '900 milliseconds' then
   if action='attack' and sqrt(power(m.x-650,2)+power(m.y-310,2))<175 then
    r.enemy_hp:=greatest(0,r.enemy_hp-greatest(1,m.attack-floor(r.chapter*.4)::integer));
    update echos_private.mp_members set action_at=t,animation='attack',animation_at=t where user_id=uid;
   elsif action='act' then
    r.peace:=r.peace+(case when m.character='duskcloak' then 1.5 else 1 end);
    update echos_private.mp_members set action_at=t,animation='act',animation_at=t where user_id=uid;
    if r.peace>=(3+r.chapter*.25)*(1+.35*(r.party_size-1)) then r.enemy_hp:=0;end if;
   end if;
  end if;
  if r.enemy_hp>0 and r.danger_at<=t then
   base_damage:=case when r.enemy_kind='boss' then 7+6*r.chapter+floor(r.chapter*r.chapter/80.0)::integer when r.enemy_kind='mini' then round(3+5.5*r.chapter+floor(r.chapter*r.chapter/100.0))::integer else 2+floor(r.chapter/4.0)::integer end;
   damage_value:=ceil(base_damage*(case phase when 3 then 1.35 when 2 then 1.15 else 1 end))::integer;
   -- Each danger mark has a 1.4-second server-timed warning. Lag never catches up multiple hits.
   if t-r.danger_at<interval '1200 milliseconds' then
    update echos_private.mp_members set hp=greatest(0,hp-greatest(1,damage_value-defense)),animation='hurt',animation_at=t
     where code=r.code and hp>0 and dodge_until<t and
      (case r.wave%3 when 0 then abs(x-r.target_x)<65 when 1 then abs(y-r.target_y)<55 else sqrt(power(x-r.target_x,2)+power(y-r.target_y,2))<100 end);
   end if;
   r.danger_at:=null;
  end if;
  if r.enemy_hp>0 and r.danger_at is null and (r.next_wave is null or r.next_wave<=t) then
   select x,y into target from echos_private.mp_members where code=r.code and hp>0 order by md5(user_id::text||r.wave::text) limit 1;
   if found then r.target_x:=target.x;r.target_y:=target.y;r.wave:=r.wave+1;r.danger_at:=t+interval '1400 milliseconds';r.next_wave:=t+make_interval(secs=>case phase when 3 then 2.5 when 2 then 2.8 else 3.2 end);end if;
  end if;
  if r.enemy_hp=0 then
   r.status:='world';r.cleared:=true;r.danger_at:=null;
   bonus_hp:=case r.enemy_kind when 'boss' then 3 when 'mini' then 4 else 0 end;
   update echos_private.mp_members set level=level+case when bonus_hp>0 then 1 else 0 end,max_hp=max_hp+bonus_hp,hp=least(max_hp+bonus_hp,hp+bonus_hp+case when hp=0 then ceil(max_hp*.35)::integer else 0 end),attack=attack+bonus_hp,defense=defense+case r.enemy_kind when 'boss' then 2 when 'mini' then 3 else 0 end where code=r.code;
  elsif not exists(select 1 from echos_private.mp_members where code=r.code and hp>0) then r.status:='defeated';r.danger_at:=null;end if;
 end if;
 if action='retry' and r.status='defeated' and uid=r.host then
  r.enemy_hp:=r.enemy_max;r.peace:=0;r.status:='battle';r.danger_at:=null;r.next_wave:=t+interval '2 seconds';
  update echos_private.mp_members set hp=max_hp,x=180,y=240+55*(mod(abs(hashtext(user_id::text)::bigint),4)),dodge_until=t+interval '2 seconds' where code=r.code;
 end if;
 if action='advance' and r.status='world' and r.host=uid and r.cleared then
  if exists(select 1 from echos_private.mp_members where code=r.code and hp>0 and x<780) then return jsonb_build_object('error','Bring every standing traveler to the glowing door.');end if;
  if r.chapter=29 and r.room=2 then r.status:='won';
  else
   if r.room=6 then r.chapter:=r.chapter+1;r.room:=0;else r.room:=r.room+1;end if;
   r.peace:=0;r.wave:=0;r.danger_at:=null;r.next_wave:=t+interval '2 seconds';
   kind:=case when r.room=(case when r.chapter=29 then 1 else 4 end) then 'mini' when r.room=(case when r.chapter=29 then 2 else 6 end) then 'boss' when r.room=2 then 'ordinary' else '' end;
   r.enemy_kind:=kind;r.cleared:=kind='';
   c:=r.chapter;
   base_hp:=round(case kind when 'boss' then 54+19*c+.3*c*c when 'mini' then 32+12*c+.18*c*c when 'ordinary' then 18+3*c+.08*c*c else 0 end)::integer;
   r.enemy_max:=ceil(base_hp*(1+.55*(r.party_size-1)))::integer;r.enemy_hp:=r.enemy_max;
   r.status:=case when kind='' then 'world' else 'battle' end;
   update echos_private.mp_members set x=180,y=240+55*(mod(abs(hashtext(user_id::text)::bigint),4)),hp=case when kind='' then max_hp else greatest(hp,ceil(max_hp*.35)::integer) end where code=r.code;
  end if;
 end if;
 update echos_private.mp_rooms set host=r.host,status=r.status,chapter=r.chapter,room=r.room,party_size=r.party_size,
  enemy_hp=r.enemy_hp,enemy_max=r.enemy_max,enemy_kind=r.enemy_kind,peace=r.peace,cleared=r.cleared,wave=r.wave,
  target_x=r.target_x,target_y=r.target_y,danger_at=r.danger_at,next_wave=r.next_wave,updated_at=t where code=r.code;
 select coalesce(jsonb_agg(jsonb_build_object('id',user_id,'name',name,'character',character,'ready',ready,'level',level,'hp',hp,'maxHp',max_hp,'attack',attack,'defense',defense,'x',x,'y',y,'animation',animation,'animationAt',animation_at,'dodgeUntil',dodge_until) order by joined_at),'[]'::jsonb) into roster from echos_private.mp_members where code=r.code;
 select coalesce(jsonb_agg(to_jsonb(q) order by q.id),'[]'::jsonb) into chat from(select id,name,body,sent_at from echos_private.mp_chat where code=r.code order by id desc limit 30) q;
 return jsonb_build_object('room',jsonb_build_object('code',r.code,'host',r.host,'status',r.status,'chapter',r.chapter,'number',r.room,'partySize',r.party_size,'enemyHp',r.enemy_hp,'enemyMax',r.enemy_max,'enemyKind',r.enemy_kind,'peace',r.peace,'cleared',r.cleared,'wave',r.wave,'targetX',r.target_x,'targetY',r.target_y,'dangerAt',r.danger_at),'players',roster,'chat',chat,'you',uid,'serverTime',t);
end $$;
revoke all on function public.echos_mp(text,text,text,numeric,numeric,text) from public,anon;
grant execute on function public.echos_mp(text,text,text,numeric,numeric,text) to authenticated;
notify pgrst, 'reload schema';
commit;
