#!/usr/bin/env bash

HOST_PORT_FROM_CONTAINER=`docker exec -it givemetime_db_1 sh -c "/sbin/ip route" | awk '/default/ { print $3 }' | sed '/^$/d'`
TESTS=${1:-'*-test.sql'}
docker run --rm -v $(pwd)/api/migration/sqls/:/tests digit/docker-pg-prove -h $HOST_PORT_FROM_CONTAINER -d give_me_time -p 5430 -u give_me_time_owner -w give_me_time -t "/tests/$TESTS"
