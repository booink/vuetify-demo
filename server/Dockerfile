FROM ruby:3.1-slim-bullseye

LABEL maintainer="booink <booink.work@gmail.com>"

WORKDIR /app
ENV TZ=Asia/Tokyo

RUN apt-get update -y \
    && apt-get install -y \
    build-essential \
    libmariadb-dev \
    tzdata \
    libffi-dev \
    libcurl4-openssl-dev \
    libxml2-dev

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle config set --local without 'doc' && bundle install

COPY . /app

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

