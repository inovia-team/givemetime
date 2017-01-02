BEGIN;

create table give_me_time_private.credit_source (
    id integer primary key check (id = 1),
    amount_per_year credits,
    last_distribution timestamp with time zone not null check(last_distribution <= current_timestamp)
);
insert into give_me_time_private.credit_source (id, amount_per_year, last_distribution)
values (1, 1000, now());

create function give_me_time_public.everybody_gets_credits(_now timestamp with time zone default current_timestamp) returns void as $$
declare
    _credit_source record;
    _person_count integer;
begin
    select *
    from give_me_time_private.credit_source
    into _credit_source
    for update;

    if (_credit_source.id is null) then
        raise exception 'Could not find any row in the credit_source table';
    end if;

    -- do nothing if the integration already took place
    if (_now <= _credit_source.last_distribution) then
        raise notice 'Nothing to do, _now argument is less than last distribution';
        return;
    end if;

    -- prevent inserts into person
    lock table give_me_time_public.person in exclusive mode;
    select count(*)
    from give_me_time_public.person
    into _person_count;

    if (_person_count = 0) then
        raise exception 'Could not find any person';
    end if;

    -- update everyone's credits
    update give_me_time_public.person
    set credit = credit
        + (
            (_credit_source.amount_per_year / 31536000) -- how many hours per second
            * extract('epoch' from (_now - _credit_source.last_distribution)) -- how many seconds since last time
        ) / _person_count;

    -- update last distribution date
    update give_me_time_private.credit_source set last_distribution = _now;
end;
$$ language plpgsql strict
security definer
set search_path = give_me_time_public, pg_temp;

comment on function give_me_time_public.everybody_gets_credits(timestamp with time zone) is 'Apply holy credit giving to everyone';

grant execute on function give_me_time_public.everybody_gets_credits(timestamp with time zone) to give_me_time_user;

COMMIT;