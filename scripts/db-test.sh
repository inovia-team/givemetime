#!/usr/bin/env bash

cd "$(dirname "$0")"

source ./_env.sh

TESTS=${1:-'*-test.sql'}
docker run --rm -v $(pwd)/../server/migration/sqls/:/tests digit/docker-pg-prove -h $HOST_PORT_FROM_CONTAINER -d $PGDATABASE -p $PGPORT -u $PGUSER -w $PGPASSWORD -t "/tests/$TESTS"
