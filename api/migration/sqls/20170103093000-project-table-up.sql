drop function if exists give_me_time_public.project_create(varchar, integer, text);

BEGIN;
--
create function give_me_time_public.project_create(_title varchar, _estimate integer, _description text)
returns give_me_time_public.project as $$
    insert into give_me_time_public.project(author_id, title, description, estimate)
    values ((select current_setting('jwt.claims.user_id')::integer), _title, _description, _estimate)
    returning *
$$
language sql volatile
 security definer
set search_path = give_me_time_public, pg_temp;
grant execute on function give_me_time_public.project_create(varchar, integer, text) to give_me_time_user;

COMMIT;
