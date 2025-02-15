FROM metabase/metabase:latest

ARG POSTGRESQL_ADDON_DB
ARG POSTGRESQL_ADDON_HOST
ARG POSTGRESQL_ADDON_PASSWORD
ARG POSTGRESQL_ADDON_PORT
ARG POSTGRESQL_ADDON_URI
ARG POSTGRESQL_ADDON_USER

ENV MB_DB_DBNAME=$POSTGRESQL_ADDON_DB
ENV MB_DB_HOST=$POSTGRESQL_ADDON_HOST
ENV MB_DB_PASS=$POSTGRESQL_ADDON_PASSWORD
ENV MB_DB_PORT=$POSTGRESQL_ADDON_PORT
ENV MB_DB_USER=$POSTGRESQL_ADDON_USER

ENV MB_DB_TYPE="postgres"

COPY resources/sample-database.db.mv.db plugins/sample-database.db

EXPOSE 3000
