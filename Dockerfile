FROM node:18.16.0 as base

RUN apt update && apt install wait-for-it -y

WORKDIR /opt

COPY package*.json ./

RUN npm install 

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app

COPY . .

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

RUN npm run build

FROM base as DEV

ENV NODE_ENV=DEV

RUN npm install -g @nestjs/cli

CMD ["/docker-entrypoint.sh"]

FROM base as PREPROD

ENV NODE_ENV=PREPROD


CMD ["/docker-entrypoint.sh"]

FROM base as PROD

ENV NODE_ENV=PROD


CMD ["/docker-entrypoint.sh"]