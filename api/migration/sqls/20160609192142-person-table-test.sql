BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_table('person'::name);
select has_pk('person'::name);

select has_column('person'::name, 'id'::name);
select col_type_is('person'::name, 'id'::name, 'integer');
select col_has_default('person'::name, 'id'::name);
select col_is_pk('person'::name, 'id'::name);

select has_column('person'::name, 'fullname'::name);
select col_type_is('person'::name, 'fullname'::name, 'character varying');
select col_hasnt_default('person'::name, 'fullname'::name);
select col_not_null('person'::name, 'fullname'::name);

select has_domain('credits'::name);
select domain_type_is('credits'::name, 'numeric');
select has_column('person'::name, 'credit'::name);
select col_type_is('person'::name, 'credit'::name, 'credits');
select col_hasnt_default('person'::name, 'credit'::name);

select has_column('person'::name, 'created_at'::name);
select col_type_is('person'::name, 'created_at'::name, 'timestamp with time zone');
select col_not_null('person'::name, 'created_at'::name);
select col_hasnt_default('person'::name, 'created_at'::name);

select has_column('person'::name, 'updated_at'::name);
select col_type_is('person'::name, 'updated_at'::name, 'timestamp with time zone');
select col_hasnt_default('person'::name, 'updated_at'::name);

select table_privs_are(
    'give_me_time_public', 'person', 'give_me_time_user', ARRAY['SELECT']::text[],
    'User has read only access to this table'
);

with valid_insert as (
  insert into give_me_time_public.person (id, fullname, credit)
  values (1, 'abc', 12)
)
select pass('Can insert person');

select finish();
ROLLBACK;
