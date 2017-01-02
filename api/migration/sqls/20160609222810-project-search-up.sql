BEGIN;

-- A procedure to search the headline and body of all posts using a given
-- search term.
create function give_me_time_public.project_search(search varchar) returns setof give_me_time_public.project as $$
select *
from give_me_time_public.project
where title ilike ('%' || search || '%')
      or description ilike ('%' || search || '%')
$$ language sql stable set search_path from current;

comment on function give_me_time_public.project_search(varchar) is 'Returns projects containing a given search term.';

grant execute on function give_me_time_public.project_search(varchar) to give_me_time_user;

COMMIT;