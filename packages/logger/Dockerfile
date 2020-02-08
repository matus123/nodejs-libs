# ---- Dependencies Node ----
FROM aimaps.azurecr.io/alpine-node-build_env:v10 AS dependencies

LABEL aimaps.project="ai-maps.shared.backend.logger" \
    aimaps.stage="dependencies"

ARG NPM_TOKEN

# copy project file
RUN mkdir app
WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm install --no-progress

# ---- Test ----
FROM dependencies AS test

LABEL aimaps.project="ai-maps.shared.backend.logger" \
    aimaps.stage="test"

ARG NPM_TOKEN

COPY . .
RUN npm run test

# ---- Build ----
FROM dependencies AS build

ARG GIT_CREDENTIALS

ENV CI=true

ARG NPM_TOKEN
ARG NPM_REGISTRY

LABEL aimaps.project="ai-maps.shared.backend.logger" \
    aimaps.stage="build"

COPY . .
RUN npm run lint && npm run build
RUN npm run semantic-release
