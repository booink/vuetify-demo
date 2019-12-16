FROM node:13.2-alpine

MAINTAINER booink.work@gmail.com

RUN mkdir /app
WORKDIR /app

RUN apk update && apk add python make g++

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "run", "dev"]

