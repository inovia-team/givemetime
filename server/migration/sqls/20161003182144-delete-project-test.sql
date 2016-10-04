BEGIN;
select no_plan();

truncate table give_me_time_public.person cascade;

set search_path to give_me_time_public, "$user", public, tap;
select has_function('give_me_time_public', 'project_delete', ARRAY['integer']);

select function_privs_are(
    'give_me_time_public', 'project_delete', ARRAY['integer'], 'give_me_time_user', ARRAY['EXECUTE']::text[],
    'A regular user can delete a project'
);

insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 23.0), (2, 'def', 12.0);
insert into give_me_time_public.project (id, author_id, title, estimate, acquired)
values (1, 1, 'abc', 12, 6), (2, 2, 'def', 12, 6), (3, 2, 'def', 12, 6);

prepare delete_project_1 as
    select give_me_time_public.project_delete(1);

-- Should be logged to delete a project
select throws_ok('delete_project_1');
set role give_me_time_user;
select throws_ok('delete_project_1');

-- cannot delete another one's project
set local jwt.claims.user_rowId to 2;
select throws_ok('delete_project_1');

-- can delete
set local jwt.claims.user_rowId to 1;
select lives_ok('delete_project_1');
SELECT results_eq(
    $$select id from give_me_time_public.project order by id$$,
    $$values (2), (3)$$,
    'We effectively deleted a project'
);

select finish();
ROLLBACK;