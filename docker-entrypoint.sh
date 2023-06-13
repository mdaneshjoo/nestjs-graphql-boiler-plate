#!/bin/bash
source /opt/app/.env

POSTGRES="${POSTGRES_HOST}:${POSTGRES_PORT}"
REDIS="${REDIS_HOST}:${REDIS_PORT}"

echo "Wait for POSTGRES=${POSTGRES}, REDIS=${REDIS}"

wait-for-it ${POSTGRES}
wait-for-it ${REDIS}

node cli create:permissions

node cli create:roles

node cli create:superuser --email=mohammad.daneshjoo92@gmail.com --password=123456789

if [ "$NODE_ENV" == "DEV" ]
then
    npm run start:dev
else
    node /opt/app/dist/main
fi

