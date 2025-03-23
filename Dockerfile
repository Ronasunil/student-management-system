FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install -g npm@11.2.0
RUN npm ci
RUN npm install -g typescript

COPY ./config.env ./
COPY ./tsconfig.json ./
COPY ./src ./src

RUN npm run build

FROM node:22.14.0-alpine
WORKDIR /app

COPY --from=build /app/config.env ./
COPY  --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/src ./src

RUN npm ci --omit=dev &&  npm install -g pm2

CMD [ "npm", "start" ]



