FROM node:12.4
WORKDIR /usr/src/app
COPY package *.json ./
RUN npm install
COPY . . 
EXPOSE 5000