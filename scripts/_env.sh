#!/usr/bin/env bash

export PGHOST=0.0.0.0
export PGPORT=5430
export PGUSER="give_me_time_owner"
export PGPASSWORD=give_me_time
export PGDATABASE=give_me_time

export HOST_PORT_FROM_CONTAINER=`docker exec -it server_db_1 sh -c "/sbin/ip route" | awk '/default/ { print $3 }' | sed '/^$/d'`