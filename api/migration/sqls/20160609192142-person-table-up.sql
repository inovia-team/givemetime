-- Deploy givemetime:person_table to pg
-- requires: appschema

BEGIN;

create domain credits as numeric(16,10) not null check (value >= 0.0);

create table give_me_time_public.person (
  id               serial not null primary key,
  fullname         character varying not null,
  credit           credits,
  created_at       timestamp with time zone not null,
  updated_at       timestamp with time zone check (updated_at >= created_at)
);

comment on table give_me_time_public.person is 'A user of the forum.';
comment on column give_me_time_public.person.id is 'The primary key for the person.';
comment on column give_me_time_public.person.credit is 'The amount of hours this person can give. Can''t be negative';

create trigger created_at before insert on give_me_time_public.person
for each row execute procedure give_me_time_private.set_created_at();
create trigger updated_at before update on give_me_time_public.person
for each row execute procedure give_me_time_private.set_updated_at();

grant select on table give_me_time_public.person to give_me_time_user;

COMMIT;
