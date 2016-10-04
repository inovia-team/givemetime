BEGIN;

create function give_me_time_public.project_delete(_id integer) returns integer as $$
declare
    _project record;
    _user_id integer;
begin

    select current_setting('jwt.claims.user_rowId')::integer into _user_id;
    select * from give_me_time_public.project where id = _id into _project;

    if (_project.author_id <> _user_id) then
        raise exception 'Please only delete your own projects';
    end if;

    delete from give_me_time_public.project where id = _project.id;

    return _project.id;
end;
$$ language plpgsql strict
security definer
set search_path = give_me_time_public, pg_temp;

comment on function give_me_time_public.project_delete(integer) is 'Delete a project';

grant execute on function give_me_time_public.project_delete(integer) to give_me_time_user;

COMMIT;