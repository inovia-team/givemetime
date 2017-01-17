BEGIN;

CREATE TYPE users_association AS (
    user_id       integer,
    credits_amount       credits
);

ALTER TABLE give_me_time_public.project ADD COLUMN associate_users users_association[];

comment on column give_me_time_public.project.associate_users is 'An array of key value as user_id and credits amount a user gave to the project';

COMMIT;
