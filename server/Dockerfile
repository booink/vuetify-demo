FROM ruby:2.6.5-alpine

MAINTAINER booink.work@gmail.com

WORKDIR /app
ENV TZ=Asia/Tokyo

RUN apk add --no-cache build-base libxml2-dev libxslt-dev mysql-dev

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install --without doc

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

