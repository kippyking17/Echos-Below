-- Echos Below: add friends to the original solo engine.
-- Requires the installed multiplayer-setup.sql (membership, privacy and moderation).
begin;
create table if not exists echos_private.party_journeys (
 code text primary key references echos_private.mp_rooms(code) on delete cascade,
 seed jsonb, encounters jsonb not null default '{}', progress jsonb not null default '{}'
);
create table if not exists echos_private.party_people (
 user_id uuid primary key references auth.users(id) on delete cascade,
 code text not null references echos_private.mp_rooms(code) on delete cascade,
 pose jsonb not null default '{}', nonce bigint not null default 0,
 acted_at timestamptz not null default 'epoch'
);
alter table echos_private.party_journeys enable row level security;
alter table echos_private.party_people enable row level security;
revoke all on echos_private.party_journeys,echos_private.party_people from public,anon,authenticated;
create or replace function echos_private.party_number(j jsonb,k text,lo numeric,hi numeric,fallback numeric)
returns numeric language sql immutable set search_path='' as $$
 select case when jsonb_typeof(j->k)='number' then greatest(lo,least(hi,(j->>k)::numeric)) else fallback end
$$;
revoke all on function echos_private.party_number(jsonb,text,numeric,numeric,numeric) from public,anon,authenticated;
create or replace function public.echos_party(action text,room_code text default '',message text default '',payload jsonb default '{}')
returns jsonb language plpgsql security definer set search_path='' as $$
declare
 uid uuid:=auth.uid(); t timestamptz:=clock_timestamp(); result jsonb; base_action text;
 code_value text; leader uuid; status_value text; j echos_private.party_journeys%rowtype;
 person echos_private.party_people%rowtype; pose_value jsonb; equipment jsonb; seed_value jsonb;
 peers jsonb; progress_value jsonb; entry record; key_value text; encounter jsonb;
 c integer; r integer; kind text; hp_value integer; need numeric; amount numeric; sequence_value bigint;
 is_admin boolean:=false;
begin
 if uid is null then return jsonb_build_object('error','Log in to join a party.','reason','login');end if;
 if jsonb_typeof(payload)<>'object' or octet_length(payload::text)>300000 then return jsonb_build_object('error','Invalid party update.');end if;
 if action not in ('create','join','ready','start','chat','leave','poll','sync','hit','act','mercy') then return jsonb_build_object('error','Unknown party action.');end if;
 base_action:=case when action in('create','join','ready','start','chat','leave') then action else 'poll' end;
 result:=public.echos_mp(base_action,room_code,message,null,null,coalesce(payload->>'character','wanderer'));
 if result ? 'error' or result ? 'left' then
  if result ? 'left' or result->>'reason'='banned' then delete from echos_private.party_people where user_id=uid;end if;
  return result;
 end if;
 code_value:=result->'room'->>'code';leader:=(result->'room'->>'host')::uuid;status_value:=result->'room'->>'status';
 insert into echos_private.party_journeys(code) values(code_value) on conflict do nothing;
 select * into j from echos_private.party_journeys where code=code_value for update;
 insert into echos_private.party_people(user_id,code) values(uid,code_value) on conflict(user_id) do update set code=excluded.code;
 select * into person from echos_private.party_people where user_id=uid;
 if uid=leader and jsonb_typeof(payload->'seed')='object' and j.seed is null then
  seed_value:=payload->'seed';
  if seed_value->>'format'<>'4' or jsonb_typeof(seed_value->'inventory')<>'object' then return jsonb_build_object('error','Open your solo journey before inviting friends.');end if;
  update echos_private.party_journeys set seed=seed_value where code=code_value;j.seed:=seed_value;
 end if;
 if action='start' and j.seed is null then return jsonb_build_object('error','The leader must open a saved journey first.');end if;
 if status_value<>'lobby' and jsonb_typeof(payload->'pose')='object' then
  pose_value:=payload->'pose';equipment:=coalesce(pose_value->'equipment','{}');
  if equipment::text like '%devil-%' then
   select exists(select 1 from public.game_admins a join auth.users u on u.id=a.user_id where a.user_id=uid and lower(u.email)='kingkippy@example.com') into is_admin;
   if not is_admin then equipment:='{}';end if;
  end if;
  pose_value:=jsonb_build_object('x',echos_private.party_number(pose_value,'x',0,960,105),'y',echos_private.party_number(pose_value,'y',0,600,350),
   'chapter',echos_private.party_number(pose_value,'chapter',0,29,0),'room',echos_private.party_number(pose_value,'room',0,6,0),
   'level',echos_private.party_number(pose_value,'level',1,999,1),'hp',echos_private.party_number(pose_value,'hp',0,999,24),'maxHp',echos_private.party_number(pose_value,'maxHp',1,999,24),
   'character',case when pose_value->>'character' in ('wanderer','mossrunner','embercoat','duskcloak','seaglass','dawnkeeper') then pose_value->>'character' else 'wanderer' end,
   'screen',left(coalesce(pose_value->>'screen','world'),20),'place',left(coalesce(pose_value->>'place',''),80),'equipment',equipment,'fighting',pose_value->'fighting','attacking',pose_value->'attacking');
  update echos_private.party_people p set pose=pose_value where p.user_id=uid;
 end if;
 progress_value:=payload->'progress';
 if jsonb_typeof(progress_value)='object' and octet_length(progress_value::text)<30000 then
  for entry in select key,value from jsonb_each(progress_value) loop
   if entry.key ~ '^(puzzle:|unlocked:|exitKey:|key:|trailDone:|goblin:)' and entry.value='true'::jsonb then
    j.progress:=jsonb_set(j.progress,array[entry.key],'true');
   elsif entry.key ~ '^goblinHP:[0-9]+:[0-6]:[0-9]+$' and jsonb_typeof(entry.value)='number' then
    j.progress:=jsonb_set(j.progress,array[entry.key],to_jsonb(greatest(0,least(coalesce((j.progress->>entry.key)::numeric,1000000),entry.value::text::numeric))));
   end if;
  end loop;
 end if;
 key_value:=payload->>'encounter';
 if status_value<>'lobby' and key_value ~ '^([0-9]|[12][0-9]):[0-6]$' then
  c:=split_part(key_value,':',1)::integer;r:=split_part(key_value,':',2)::integer;
  kind:=case when r=case when c=29 then 1 else 4 end then 'mini' when r=case when c=29 then 2 else 6 end then 'boss' else 'ordinary' end;
  hp_value:=round(case kind when 'boss' then 54+19*c+.3*c*c when 'mini' then 32+12*c+.18*c*c else 18+3*c+.08*c*c end)::integer;
  need:=round(case kind when 'boss' then 3+c*.25 when 'mini' then 2+c*.18 else 2 end,1);
  encounter:=coalesce(j.encounters->key_value,jsonb_build_object('hp',hp_value,'max',hp_value,'peace',0,'cleared',''));
  if payload->'pose'->>'freshEncounter'='true' and not exists(select 1 from echos_private.party_people p where p.code=code_value and p.user_id<>uid and p.pose->>'fighting'='true' and (p.pose->>'hp')::numeric>0 and (p.pose->>'chapter')::integer=c and (p.pose->>'room')::integer=r) and encounter->>'cleared'='' then
   encounter:=jsonb_build_object('hp',hp_value,'max',hp_value,'peace',0,'cleared','');
  end if;
  if not (j.encounters ? key_value) then
   encounter:=jsonb_set(encounter,'{hp}',to_jsonb(echos_private.party_number(payload->'pose','battleHp',0,hp_value,hp_value)));
   encounter:=jsonb_set(encounter,'{peace}',to_jsonb(echos_private.party_number(payload->'pose','battlePeace',0,need,0)));
  end if;
  sequence_value:=echos_private.party_number(payload,'nonce',0,9007199254740991,0)::bigint;
  if action in('hit','act','mercy') and sequence_value>person.nonce then
   if person.acted_at>t-interval '850 milliseconds' then return result||jsonb_build_object('retry',true);end if;
   if (encounter->>'cleared')='' then
    if action='hit' then
     amount:=floor(echos_private.party_number(payload,'amount',1,999,1));
     encounter:=jsonb_set(encounter,'{hp}',to_jsonb(greatest(0,(encounter->>'hp')::integer-amount)));
     if (encounter->>'hp')::integer=0 then encounter:=jsonb_set(encounter,'{cleared}','"fight"');end if;
    elsif action='act' then
     amount:=echos_private.party_number(payload,'amount',0,4,1);
     encounter:=jsonb_set(encounter,'{peace}',to_jsonb(least(need,(encounter->>'peace')::numeric+amount)));
    elsif (encounter->>'peace')::numeric>=need then encounter:=jsonb_set(encounter,'{cleared}','"mercy"');end if;
   end if;
   update echos_private.party_people set nonce=sequence_value,acted_at=t where user_id=uid;person.nonce:=sequence_value;
  end if;
  j.encounters:=jsonb_set(j.encounters,array[key_value],encounter);
 end if;
 update echos_private.party_journeys set encounters=j.encounters,progress=j.progress where code=code_value;
 delete from echos_private.party_people p where p.code=code_value and not exists(select 1 from echos_private.mp_members m where m.user_id=p.user_id and m.code=p.code);
 select coalesce(jsonb_agg(jsonb_build_object('id',m.user_id,'name',m.name,'ready',m.ready,'pose',p.pose) order by m.joined_at),'[]') into peers
  from echos_private.mp_members m left join echos_private.party_people p on p.user_id=m.user_id where m.code=code_value;
 return result||jsonb_build_object('journey',case when payload->>'haveJourney'='true' then null else j.seed end,'encounters',j.encounters,'progress',j.progress,'peers',peers,'nonce',person.nonce);
end $$;
revoke all on function public.echos_party(text,text,text,jsonb) from public,anon;
grant execute on function public.echos_party(text,text,text,jsonb) to authenticated;
notify pgrst,'reload schema';
commit;
