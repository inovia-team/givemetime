#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "create user $PG_PROJECT_USER with encrypted password '$PG_PROJECT_PASSWORD';"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "create user $PG_PROJECT_OWNER with encrypted password '$PG_PROJECT_PASSWORD';"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "create database $PG_PROJECT_DATABASE with owner $PG_PROJECT_OWNER;"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "alter database $PG_PROJECT_DATABASE set datestyle = ISO;"
# allow owner to impersonate user or guest
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "grant $PG_PROJECT_USER to $PG_PROJECT_OWNER;"
