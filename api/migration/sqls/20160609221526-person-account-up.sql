BEGIN;

create table give_me_time_private.person_account (
  person_id        integer not null primary key references give_me_time_public.person,
  email            character varying not null
                   constraint email_unique unique
                   constraint email_format check (email ~* '^.+@.+\..+$')
);

comment on table give_me_time_private.person_account is 'Private information about a person’s account.';
comment on column give_me_time_private.person_account.person_id is 'The id of the person associated with this account.';
comment on column give_me_time_private.person_account.email is 'The email address of the person.';
comment on constraint email_unique on give_me_time_private.person_account is 'Email already exists';
comment on constraint email_format on give_me_time_private.person_account is 'Email format invalid';

COMMIT;