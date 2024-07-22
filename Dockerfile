FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

WORKDIR /app/dist/sm-clave-maestra-front

EXPOSE 80

CMD ["http-server", "-p", "80"]
