ARG APP_DIR="/usr/app"
ARG ENDPOINT_PORT="4000"

# Stage 1
FROM node:15.14.0-alpine3.13 AS installer
ARG APP_DIR
ENV APP_DIR=$APP_DIR
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN apk add --update make \
    && npm install

# Stage 2
FROM node:15.14.0-slim AS runner
ARG APP_DIR
ENV APP_DIR=${APP_DIR}
WORKDIR ${APP_DIR}

COPY --from=installer ${APP_DIR} .
COPY . .
RUN npm run build

ARG ENDPOINT_PORT
ENV ENDPOINT_PORT=${ENDPOINT_PORT}
EXPOSE ${ENDPOINT_PORT}

CMD ["npm", "run", "start"]
