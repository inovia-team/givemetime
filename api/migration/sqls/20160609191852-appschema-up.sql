-- Deploy givemetime:appschema to pg

BEGIN;

-- Create the schema we are going to use.
create schema give_me_time_public;

-- Create a schema to host the utilities for our schema. The reason it is in
-- another schema is so that it can be private.
create schema give_me_time_private;

grant usage on schema give_me_time_public to give_me_time_user;

create function give_me_time_private.set_created_at() returns trigger as $$
begin
  -- We will let the inserter manually set a `created_at` time if they desire.
  if (new.created_at is null) then
    new.created_at := current_timestamp;
  end if;
  return new;
end;
$$ language plpgsql;

create function give_me_time_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

COMMIT;
