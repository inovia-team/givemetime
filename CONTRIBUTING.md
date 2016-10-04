
    # reset database
    npm run db:rm
    
    # add a migration
    npm run db:migration:create my_migration
        
    # test deployed migrations
    npm run db:test

    # run test suite
    npm test
    npm run test:watch
 
    
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