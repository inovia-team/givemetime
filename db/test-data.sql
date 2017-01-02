BEGIN;

select person_register_or_retrieve(fullname, email, password)
from (
       VALUES
         ('Kathryn Ramirez',   'givemetime+1@inovia.fr', 'password'),
         ('Johnny Tucker',     'givemetime+2@inovia.fr', 'password'),
         ('Nancy Diaz',        'givemetime+3@inovia.fr', 'password'),
         ('Russell Gardner',   'givemetime+4@inovia.fr', 'password'),
         ('Ann West',          'givemetime+5@inovia.fr', 'password'),
         ('Joe Cruz',          'givemetime+6@inovia.fr', 'password'),
         ('Scott Torres',      'givemetime+7@inovia.fr', 'password'),
         ('David Bell',        'givemetime+8@inovia.fr', 'password'),
         ('Carl Ward',         'givemetime+9@inovia.fr', 'password')
     ) as persons(fullname, email, password)
;

insert into project (author_id, title, description, estimate, acquired) values
  (1, 'ELK Stack', 'Something to avoid ssh to prod in case of trouble', 14, 2),
  (2, 'Give me time', 'R&D time management platform', 14, 2)
;

COMMIT;