FROM ruby:3.0-alpine
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers make shared-mime-info sqlite-dev tzdata
COPY . .
RUN bundle install
