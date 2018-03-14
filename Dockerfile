FROM node:alpine

ENV NODE_ENV=development
ENV APP_NAME=your-app-name
ENV PORT=8080
ENV MONGO_URI=mongodb://localhost/app

# AWS
ENV AWS_ACCESS_KEY_ID=YOUR_ID
ENV AWS_SECRET_ACCESS_KEY=YOUR_ACCESS_KEY
ENV AWS_REGION=ap-southeast-1

LABEL maintainer="Tux Tong <huntthetux@gmail.com>"
WORKDIR /app

COPY package.json /app/
RUN yarn --pure-lockfile --production

COPY . /app/

CMD yarn start:production
