FROM node:10.15.0-stretch-slim

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]