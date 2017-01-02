#!/usr/bin/env bash

# go to current directory
# @todo: find how to change workdir with docker-compose
cd $(dirname $0)

# install deps
npm install

# start node server
./node_modules/.bin/webpack-dev-server