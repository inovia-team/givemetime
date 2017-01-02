BEGIN;

create table give_me_time_public.project (
  id               serial not null primary key,
  author_id        int not null references give_me_time_public.person(id),
  title            character varying not null,
  description      text,
  estimate         credits check (estimate > 0),
  acquired         credits check (acquired <= estimate) default 0,
  created_at       timestamp with time zone,
  updated_at       timestamp with time zone
);

comment on table give_me_time_public.project is 'A project suggested by a user.';
comment on column give_me_time_public.project.id is 'The primary key for the project.';
comment on column give_me_time_public.project.author_id is 'The id of the author user.';
comment on column give_me_time_public.project.title is 'A short and descriptive project description.';
comment on column give_me_time_public.project.description is 'A long and detailed project description.';
comment on column give_me_time_public.project.estimate is 'The amount of time in hours the author needs to realize the project';
comment on column give_me_time_public.project.acquired is 'The amount of time in hours given to this project';

create trigger created_at before insert on give_me_time_public.project
for each row execute procedure give_me_time_private.set_created_at();
create trigger updated_at before update on give_me_time_public.project
for each row execute procedure give_me_time_private.set_updated_at();

grant select on table give_me_time_public.project to give_me_time_user;

--
create function give_me_time_public.project_create(_title varchar, _estimate integer, _description text)
returns give_me_time_public.project as $$
    insert into give_me_time_public.project(author_id, title, description, estimate)
    values ((select current_setting('jwt.claims.user_rowId')::integer), _title, _description, _estimate)
    returning *
$$
language sql volatile
 security definer
set search_path = give_me_time_public, pg_temp;
grant execute on function give_me_time_public.project_create(varchar, integer, text) to give_me_time_user;

COMMIT;