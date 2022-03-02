FROM node:17-bullseye-slim

LABEL maintainer="booink <booink.work@gmail.com>"

RUN mkdir /app
WORKDIR /app

RUN apt-get update -y \
    && apt-get install -y \
    python3 \
    make \
    g++

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "run", "dev"]

