BEGIN;
select no_plan();

set search_path to give_me_time_private, "$user", public, tap;
select has_table('person_account'::name);
select has_pk('person_account'::name);

select has_column('person_account'::name, 'person_id'::name);
select col_type_is('person_account'::name, 'person_id'::name, 'integer');
select col_hasnt_default('person_account'::name, 'person_id'::name);
select col_is_pk('person_account'::name, 'person_id'::name);
select col_is_fk('person_account'::name, 'person_id'::name);

select has_column('person_account'::name, 'email'::name);
select col_type_is('person_account'::name, 'email'::name, 'character varying');
select col_hasnt_default('person_account'::name, 'email'::name);
select col_not_null('person_account'::name, 'email'::name);
select col_has_check('person_account'::name, 'email'::name);

-- author mock
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 12);

-- valid insert
insert into give_me_time_private.person_account (person_id, email)
values (1, 'test@test.com');

-- invalid insert
prepare invalid_insert as
  insert into give_me_time_private.person_account (person_id, email)
    values (1, 'abc');
select throws_ok('invalid_insert');

select finish();
ROLLBACK;