-- Revert givemetime:appschema from pg

BEGIN;

drop function give_me_time_private.set_created_at();
drop function give_me_time_private.set_updated_at();

drop schema give_me_time_public;
drop schema give_me_time_private;

COMMIT;
