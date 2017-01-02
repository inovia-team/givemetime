-- Revert givemetime:person_table from pg

BEGIN;

drop table give_me_time_public.person;
drop domain credits;

COMMIT;
