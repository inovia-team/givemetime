# Give me time: collaborative R&D enabler 

[![Build Status](https://travis-ci.org/prevostc/givemetime.svg?branch=master)](https://travis-ci.org/prevostc/givemetime)
[![Coverage Status](https://coveralls.io/repos/github/prevostc/givemetime/badge.svg?branch=master)](https://coveralls.io/github/prevostc/givemetime?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/576040de4931050040054918/badge.svg?style=flat)](https://www.versioneye.com/user/projects/576040de4931050040054918)
[![Forkability in progress](https://img.shields.io/badge/forkable-73%-blue.svg)](https://basicallydan.github.io/forkability/?u=prevostc&r=givemetime&l=nodejs)

# install docker for your distribution

- https://docs.docker.com/engine/installation/linux/
- https://docs.docker.com/engine/installation/mac/

# start project

    npm start
    # graphiql interface located at http://localhost:3000
    # application interface located at http://localhost:4000

    npm run db:migrate --loglevel=silent
    npm run db:test --loglevel=silent

# use google login

    API_URL=http://localhost:3000 PGADMINPASSWORD=postgres PGPASSWORD=give_me_time GOOGLE_CLIENT_ID=xxxxxx-xxxxx.apps.googleusercontent.com GOOGLE_CLIENT_SECRET=xxxxxxx GOOGLE_REDIRECT_URL=http://localhost:8080/smt docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
