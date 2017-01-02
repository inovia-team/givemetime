BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_table('project'::name);
select has_pk('project'::name);

select has_column('project'::name, 'id'::name);
select col_type_is('project'::name, 'id'::name, 'integer');
select col_has_default('project'::name, 'id'::name);
select col_is_pk('project'::name, 'id'::name);

select has_column('project'::name, 'author_id'::name);
select col_type_is('project'::name, 'author_id'::name, 'integer');
select col_hasnt_default('project'::name, 'author_id'::name);
select col_not_null('project'::name, 'author_id'::name);
select col_is_fk('project'::name, 'author_id');

select has_column('project'::name, 'title'::name);
select col_type_is('project'::name, 'title'::name, 'character varying');
select col_hasnt_default('project'::name, 'title'::name);
select col_not_null('project'::name, 'title'::name);

select has_column('project'::name, 'description'::name);
select col_type_is('project'::name, 'description'::name, 'text');
select col_hasnt_default('project'::name, 'description'::name);
select col_is_null('project'::name, 'description'::name);

select has_column('project'::name, 'estimate'::name);
select col_type_is('project'::name, 'estimate'::name, 'credits');
select col_hasnt_default('project'::name, 'estimate'::name);

select has_column('project'::name, 'acquired'::name);
select col_type_is('project'::name, 'acquired'::name, 'credits');
select col_has_default('project'::name, 'acquired'::name);
select col_default_is('project'::name, 'acquired'::name, 0);

select table_privs_are(
    'give_me_time_public', 'project', 'give_me_time_user', ARRAY['SELECT']::text[],
    'User has read only access to this table'
);

-- author mock
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 12);

-- valid insert
insert into give_me_time_public.project (author_id, title, estimate, acquired)
  values (1, 'abc', 12, 6), (1, 'abc', 1, 0), (1, 'abc', 12, 12);

-- invalid insert
prepare invalid_insert as
  insert into give_me_time_public.project (author_id, title, estimate, acquired)
    values (1, 'abc', 12, 25);
select throws_ok('invalid_insert');

-- create_project function
select has_function('project_create', ARRAY['character varying', 'integer', 'text']);

select function_privs_are(
    'give_me_time_public', 'project_create', ARRAY['character varying', 'integer', 'text'], 'give_me_time_user', ARRAY['EXECUTE']::text[],
    'User has access to this function'
);

prepare do_create as
  select author_id, title, description, estimate, acquired from project_create('title', 12, 'description');

-- 'Should throw if user is not logged in'
select throws_ok('do_create');

-- logged in as give_me_time_user
set role give_me_time_user;
set local jwt.claims.user_rowId to 1;
select lives_ok('do_create', 'Should be ok if user is logged in');
select isnt_empty('do_create');

select finish();
ROLLBACK;
