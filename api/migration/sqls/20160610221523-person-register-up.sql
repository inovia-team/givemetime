BEGIN;

-- Registers a person with a few key parameters creating a `person` row and an associated `person_account` row.
-- If the person already exists by email and password means, just returns it
create function give_me_time_private.person_register_or_retrieve(fullname varchar, _email varchar) returns give_me_time_public.person as $$
declare
  row record;
begin
  -- check if person exists
  select give_me_time_public.person.*
    from give_me_time_public.person join give_me_time_private.person_account
      on give_me_time_public.person.id = give_me_time_private.person_account.person_id
    where lower(trim(both from give_me_time_private.person_account.email)) = lower(trim(both from _email))
    into row;
  if (row.id is not null) then
    return row;
  end if;

  -- Insert the person’s public profile data.
  insert into give_me_time_public.person (fullname, credit, created_at, updated_at)
    values (fullname, 20.0 /* default to 20 credits */, now(), now())
  returning * into row;

  -- Insert the person’s private account data.
  insert into give_me_time_private.person_account (person_id, email) values
    (row.id, trim(both from lower(_email)));

  return row;
end;
$$ language plpgsql strict set search_path from current;

comment on function give_me_time_private.person_register_or_retrieve(varchar, varchar) is 'Register a person. If this person already exists just return this person data.';


COMMIT;