-- Run once in the SQL editor of a new Supabase project.
create table public.profiles (
 id uuid primary key references auth.users on delete cascade,
 full_name text not null default '',
 role text not null default 'student' check (role in ('student','instructor'))
);
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,full_name) values(new.id,left(coalesce(new.raw_user_meta_data->>'full_name','Student'),80));
 return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create table public.classes (
 id uuid primary key default gen_random_uuid(),
 instructor_id uuid not null references public.profiles(id),
 name text not null check(length(name) between 1 and 80),
 code text not null unique default upper(substr(replace(gen_random_uuid()::text,'-',''),1,12)),
 created_at timestamptz not null default now()
);
create table public.enrollments (
 class_id uuid references public.classes on delete cascade,
 student_id uuid references public.profiles on delete cascade,
 primary key(class_id,student_id)
);
create table public.progress (
 user_id uuid references public.profiles on delete cascade,
 module_id text not null check(module_id in ('foundations','equilibrium','ionization','calculations','buffers','titration','assessment')),
 payload jsonb not null default '{}' check(jsonb_typeof(payload)='object' and octet_length(payload::text)<100000),
 updated_at timestamptz not null default now(),
 primary key(user_id,module_id)
);
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.progress enable row level security;
create policy profile_self_read on public.profiles for select to authenticated using(id=auth.uid());
-- No client role updates: instructor promotion is an administrator SQL action.
create policy class_read on public.classes for select to authenticated using(instructor_id=auth.uid() or exists(select 1 from public.enrollments e where e.class_id=classes.id and e.student_id=auth.uid()));
create policy class_create on public.classes for insert to authenticated with check(instructor_id=auth.uid() and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='instructor'));
create policy enrollment_read on public.enrollments for select to authenticated using(student_id=auth.uid());
create policy progress_read on public.progress for select to authenticated using(user_id=auth.uid());
create policy progress_insert on public.progress for insert to authenticated with check(user_id=auth.uid());
create policy progress_update on public.progress for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create function public.join_class(join_code text) returns void language plpgsql security definer set search_path='' as $$
declare cid uuid;
begin
 if auth.uid() is null then raise exception 'Sign in first'; end if;
 if not exists(select 1 from public.profiles where id=auth.uid() and role='student') then raise exception 'Student account required'; end if;
 select id into cid from public.classes where code=upper(trim(join_code));
 if cid is null then raise exception 'Class code not found'; end if;
 insert into public.enrollments(class_id,student_id) values(cid,auth.uid()) on conflict do nothing;
end; $$;
create function public.class_report(target_class uuid)
returns table(student_id uuid, full_name text, module_id text, payload jsonb, updated_at timestamptz)
language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from public.classes c where c.id=target_class and c.instructor_id=auth.uid()) then raise exception 'Access denied'; end if;
 return query select p.id,p.full_name,pr.module_id,pr.payload,pr.updated_at from public.enrollments e join public.profiles p on p.id=e.student_id left join public.progress pr on pr.user_id=p.id where e.class_id=target_class order by p.full_name,pr.module_id;
end; $$;
revoke all on function public.join_class(text) from public,anon;
revoke all on function public.class_report(uuid) from public,anon;
grant execute on function public.join_class(text),public.class_report(uuid) to authenticated;
revoke all on public.profiles,public.classes,public.enrollments,public.progress from anon,authenticated;
grant select on public.profiles,public.classes,public.enrollments,public.progress to authenticated;
grant insert on public.classes,public.progress to authenticated;
grant update on public.progress to authenticated;
-- Promote a verified instructor manually, replacing the email:
-- update public.profiles set role='instructor' where id=(select id from auth.users where email='instructor@example.edu');
