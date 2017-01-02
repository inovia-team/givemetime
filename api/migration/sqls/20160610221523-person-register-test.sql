BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;

-- this function is only called by the node server when the user has been authenticated
select has_function(
  'give_me_time_private',
  'person_register_or_retrieve',
  ARRAY['character varying', 'character varying']
);

select is(
    (select id from give_me_time_public.person join give_me_time_private.person_account on person_account.person_id = person.id where email = 'someone_new@test.com'),
    null, 'Ensure person does not exists yet'
);
select isnt(
    (select id from give_me_time_private.person_register_or_retrieve('New user', 'someone_new@test.com')),
    null, 'Should create person account'
);
select isnt(
    (select id from give_me_time_public.person join give_me_time_private.person_account on person_account.person_id = person.id where email = 'someone_new@test.com'),
    null, 'Ensure person exist now'
);

select isnt(
    (select created_at from give_me_time_private.person_register_or_retrieve('New user', 'someone_new@test.com')),
    null, 'Should set created_at'
);
select isnt(
    (select updated_at from give_me_time_private.person_register_or_retrieve('New user', 'someone_new@test.com')),
    null, 'Should set updated_at'
);

select cmp_ok(
  (select id from give_me_time_private.person_register_or_retrieve('John Doe', 'test@test.com')),
  '=',
  (select id from give_me_time_private.person_register_or_retrieve('John Doe', 'test@test.com')),
  'Same credentials should return same person'
);

select cmp_ok(
    (select id from give_me_time_private.person_register_or_retrieve('John Doe', 'test1@test.com')),
    '<>',
    (select id from give_me_time_private.person_register_or_retrieve('John Doe', 'test2@test.com')),
    'Different credentials should return different person'
);

select finish();
ROLLBACK;