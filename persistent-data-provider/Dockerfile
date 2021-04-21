# This Dockerfile is based off of the Dockerfile found at https://www.keystonejs.com/guides/deployment/#docker

# https://docs.docker.com/samples/library/node/
# ARG NODE_VERSION=15.14.0
ARG NODE_VERSION=12.10.0
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

# Build container
FROM node:${NODE_VERSION}-alpine AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

RUN apk add --no-cache build-base python2 npm && \
    wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
    chmod +x dumb-init
ADD . /home/node
RUN npm install && npm run build && npm cache verify


# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

COPY --from=build /home/node /home/node

EXPOSE 3000
CMD ["./dumb-init", "npm", "run", "start"]
