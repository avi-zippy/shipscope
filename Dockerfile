FROM node:4.0
MAINTAINER David McGaffin <david@codeship.com>

RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update && apt-get install -y \
  google-chrome-stable \
  unzip \
  xvfb

ENV DISPLAY :99
#### end chrome install

WORKDIR /app

ADD package.json ./package.json
RUN npm install
RUN npm install -g grunt-cli

ADD . ./
