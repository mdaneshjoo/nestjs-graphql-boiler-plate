#!/bin/bash
source /opt/app/.env

POSTGRES="${POSTGRES_HOST}:${POSTGRES_PORT}"
REDIS="${REDIS_HOST}:${REDIS_PORT}"

echo "Wait for POSTGRES=${POSTGRES}, REDIS=${REDIS}"

wait-for-it ${POSTGRES}
wait-for-it ${REDIS}


if [ "$NODE_ENV" == "DEV" ]
then
    npm run start:dev
else
    node /opt/app/dist/main
fi

