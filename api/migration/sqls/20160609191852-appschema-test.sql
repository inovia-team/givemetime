BEGIN;
select no_plan();

select has_schema('give_me_time_public');
select has_schema('give_me_time_private');

select can('give_me_time_private', ARRAY['set_created_at', 'set_updated_at']);

select schema_owner_is('give_me_time_private', 'give_me_time_owner');
select schema_owner_is('give_me_time_public', 'give_me_time_owner');

select schema_privs_are('give_me_time_private', 'give_me_time_user', ARRAY[]::text[]);
select schema_privs_are('give_me_time_public', 'give_me_time_user', ARRAY['USAGE']);

select finish();
ROLLBACK;