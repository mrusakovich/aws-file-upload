FROM ruby:3.0.0-alpine
WORKDIR /code
RUN apk add --no-cache --update \
    build-base \
    linux-headers \
    tzdata \
    nodejs \
    yarn \
    postgresql-dev
COPY . .
RUN bundle install
RUN yarn
