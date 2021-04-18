FROM ruby:3.0.0-alpine
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers make shared-mime-info tzdata nodejs yarn postgresql-dev postgresql-client
COPY . .
RUN bundle install
RUN yarn
