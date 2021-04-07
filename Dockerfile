FROM node:15.14.0-alpine3.13

RUN npm install --global npm@7.8.0

WORKDIR /usr/app

COPY . .

RUN npm run setupDockerImage

CMD ["npm", "run", "start"]
