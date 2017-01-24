BEGIN;

ALTER TABLE give_me_time_public.project DROP COLUMN IF EXISTS associate_users;
DROP TYPE users_association;

COMMIT;
