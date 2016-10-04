BEGIN;


-- Transfer some credits from a user to a project
create function give_me_time_public.project_give_time(project_id integer, amount integer) returns give_me_time_public.project as $$
declare
  person_row record;
  project_row record;
  person_id integer;
begin
  -- get logged in user id
  select current_setting('jwt.claims.user_rowId')::integer into person_id;

  -- check if the amount is valid
  if (amount <= 0) then
    raise exception 'Amount % is invalid', amount;
  end if;

  -- check if the person exists
  select * from give_me_time_public.person where id = person_id into person_row;
  if (person_row.id is null) then
    raise exception 'Person % does not exists', person_id;
  end if;

  -- check if the project exists
  select * from give_me_time_public.project where id = project_id into project_row;
  if (project_row.id is null) then
    raise exception 'Project % does not exists', project_id;
  end if;

  -- check if the person has enough credits
  if (person_row.credit < amount) then
    raise exception 'This person only have % and cannot transfer %', round(person_row.credit), amount;
  end if;

  -- check if the project can accept this much credits
  if (project_row.estimate - project_row.acquired < amount) then
    raise exception 'This project can only accept %, we have to refuse your % credits', round(project_row.estimate) - round(project_row.acquired), amount;
  end if;

  -- do the transfer
  update give_me_time_public.person set credit = credit - amount where id = person_id;
  update give_me_time_public.project set acquired = acquired + amount where id = project_id
  returning * into project_row;

  return project_row;
end;
$$ language plpgsql strict
security definer
set search_path = give_me_time_public, pg_temp;

comment on function give_me_time_public.project_give_time(integer, integer) is 'Transfer credits from a user to a project.';

grant execute on function give_me_time_public.project_give_time(integer, integer) to give_me_time_user;

COMMIT;