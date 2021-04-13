FROM node:15.14.0-alpine3.13

RUN apk add --update make \
    && npm install --global npm@7.9.0

WORKDIR /usr/app

COPY ./package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
