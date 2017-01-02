
    # reset database
    npm run reset

    # add a migration
    npm run db.migration.create my_migration
    # apply migration
    npm run db.migrate
    # revert migration
    npm run db.revert
        
    # test deployed migrations
    npm run db:test

    # run test suite
    npm test
    npm run test:watch

CONFIGURE TRAVIS
----------------

    gem install travis

    travis encrypt API_URL=http://hhhhhhhhhh:pppp
    travis encrypt GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxx-xxxxxxxxxxxx.apps.googleusercontent.com
    travis encrypt DOCKER_EMAIL=email@gmail.com
    travis encrypt DOCKER_USER=username
    travis encrypt DOCKER_PASS=password

    travis encrypt PGADMINPASSWORD=ppppppppppppp --add
    travis encrypt PGPASSWORD=ppppppppppppp --add
    travis encrypt GOOGLE_CLIENT_SECRET=ppppppppppppppppppp --add
    travis encrypt GOOGLE_REDIRECT_URL=http://hhhhhhhhhh:pppp/cccccccccccc --add

    
TODO (tooling)
--------------

- Unit test everything
- Merge db and server
- Automatic migrate on server start
- Use immutable state
- Always use id or rowId

TODO (features)
---------------

- Better header (logout)
- Project delete
- Better UI
- Deploy on some cloud provider using docker containers