BEGIN;
select no_plan();

set search_path to give_me_time_private, "$user", public, tap;
select has_table('credit_source'::name);
select has_pk('credit_source'::name);

select has_column('credit_source'::name, 'id'::name);
select col_type_is('credit_source'::name, 'id'::name, 'integer');
select col_is_pk('credit_source'::name, 'id'::name);

select has_column('credit_source'::name, 'amount_per_year'::name);
select col_type_is('credit_source'::name, 'amount_per_year'::name, 'credits');
select col_hasnt_default('credit_source'::name, 'amount_per_year'::name);

select has_column('credit_source'::name, 'last_distribution'::name);
select col_type_is('credit_source'::name, 'last_distribution'::name, 'timestamp with time zone');
select col_hasnt_default('credit_source'::name, 'last_distribution'::name);
select col_not_null('credit_source'::name, 'last_distribution'::name);
select col_has_check('credit_source'::name, 'last_distribution'::name);

-- reset credit_source for the sake of this test suite (depends heavily on now())
truncate table give_me_time_private.credit_source;

set search_path to give_me_time_public, "$user", public, tap;
select has_function('give_me_time_public', 'everybody_gets_credits', ARRAY['timestamp with time zone']);

select function_privs_are(
    'give_me_time_public', 'everybody_gets_credits', ARRAY['timestamp with time zone'], 'give_me_time_user', ARRAY['EXECUTE']::text[],
    'User can give time'
);


prepare reset_credit_source as
    update give_me_time_private.credit_source set last_distribution = '1989-09-21 12:12:12';

-- give one day and an hour of credits
prepare apply_credits_after_one_day as
    select everybody_gets_credits('1989-09-22 13:12:12'::timestamp with time zone);

-- we need at least one credit_source row
select throws_ok('apply_credits_after_one_day', 'Could not find any row in the credit_source table');


-- check that we cannot insert more than one row
prepare create_source_row as
    insert into give_me_time_private.credit_source (id, amount_per_year, last_distribution)
    values (1, 1000, '1989-09-21 12:12:12');
prepare create_source_row_ko as
    insert into give_me_time_private.credit_source (id, amount_per_year, last_distribution)
    values (2, 1000, '1989-09-21 12:12:12');
select lives_ok('create_source_row');
select throws_ok('create_source_row');
select throws_ok('create_source_row_ko');


-- we need at least one person
truncate table give_me_time_public.person cascade;
select throws_ok('apply_credits_after_one_day', 'Could not find any person');

-- Given we have 2 persons
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 23.0), (2, 'abc', 6.0);


-- test we can do all that using a regular user
set role give_me_time_user;
set local jwt.claims.user_rowId to 1;


-- 1000h / year -> 0.00003170979h / sec -> 2.8538811h to give (*90000)
-- 2 persons -> 1.4269406393h per person
execute apply_credits_after_one_day;
SELECT results_eq(
    $$select id, credit from give_me_time_public.person$$,
    $$values (1, (23.0 + 1.4269406393)::credits), (2, (6.0 + 1.4269406393)::credits)$$,
    'We can give one day and an hour of credits to everyone (2 pers)'
);

set role give_me_time_owner;
SELECT results_eq(
    $$select last_distribution from give_me_time_private.credit_source$$,
    $$values ('1989-09-22 13:12:12'::timestamp with time zone)$$,
    'We updated the last distribution date'
);
set role give_me_time_user;


set role give_me_time_owner;
truncate table give_me_time_public.person cascade;
execute reset_credit_source;
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 23.0), (2, 'abc', 6.0), (3, 'abc', 0.0);
set role give_me_time_user;

-- 1000h / year -> 0.00003170979h / sec -> 2.8538811h to give (*90000)
-- 2 persons -> 0.9512937595h per person
execute apply_credits_after_one_day;
SELECT results_eq(
    $$select id, credit from give_me_time_public.person$$,
    $$values (1, (23.0 + 0.9512937595)::credits), (2, (6.0 + 0.9512937595)::credits), (3, (0.0 + 0.9512937595)::credits)$$,
    'Check we can give one day and an hour of credits to everyone (3 pers)'
);

-- Do nothing if the given date is less than last integration
set role give_me_time_owner;
truncate table give_me_time_public.person cascade;
execute reset_credit_source;
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 23.0), (2, 'abc', 6.0);
set role give_me_time_user;

select everybody_gets_credits('1988-01-01T12:12:12'::timestamp with time zone);
SELECT results_eq(
    $$select id, credit from give_me_time_public.person$$,
    $$values (1, 23.0::credits), (2, 6.0::credits)$$,
    'Do nothing if the given date is less than last integration'
);

prepare date_is_greater_than_now as
    select everybody_gets_credits(now() + '1 hour'::interval);
select throws_ok('date_is_greater_than_now');

select finish();
ROLLBACK;