BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_function('project_search', ARRAY['character varying']);

select function_privs_are(
    'give_me_time_public', 'project_search', ARRAY['character varying'], 'give_me_time_user', ARRAY['EXECUTE']::text[],
    'User has access to this function'
);

-- data mocks
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 12);
insert into give_me_time_public.project (author_id, title, estimate, acquired)
values (1, 'aaa', 12, 6), (1, 'aab', 1, 0), (1, 'cbd', 12, 12);

prepare b_search as
  select title from project_search('b');

select isnt_empty('b_search');
select set_eq('b_search', ARRAY['aab', 'cbd']);

select finish();
ROLLBACK;