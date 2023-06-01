FROM node:18.16-buster as base

WORKDIR /app

# ======== build client js ======
FROM base as client-builder

COPY frontend/. /app/
COPY webpack/config.client.js /app/webpack/
RUN npm install

RUN npm run build-client


# ======== build server js ======
FROM base as backend

COPY backend/. /app/
COPY webpack/config.server.js /app/webpack/

RUN npm install
RUN npm run build-server

COPY --from=client-builder /app/build /app/build/

CMD ["npm", "run", "prod"]
