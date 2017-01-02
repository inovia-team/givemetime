#!/usr/bin/env bash

# go to current directory
# @todo: find how to change workdir with docker-compose
cd $(dirname $0)

# install deps
npm install

# wait until db is available
# @TODO: use a better method
# @see: http://stackoverflow.com/questions/21183088/how-can-i-wait-for-a-docker-container-to-be-up-and-running
# @see: https://www.postgresql.org/message-id/45FD6C76.7050906@wykids.org
# sleep 5

# apply migrations
./node_modules/.bin/db-migrate --migrations-dir ./migration up

# start node server
./node_modules/.bin/nodemon --watch ./ --ignore ./node_modules server.js