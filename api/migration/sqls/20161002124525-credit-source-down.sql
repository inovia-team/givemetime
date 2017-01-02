BEGIN;

drop function give_me_time_public.everybody_gets_credits(timestamp with time zone);
drop table give_me_time_private.credit_source;

COMMIT;