FROM node:19.6.1-alpine

WORKDIR /app/API

COPY package*.json ./
COPY server.js ./
COPY . .

RUN npm install ./

# Agregar la ruta de instalación de MongoDB al PATH

EXPOSE 3000

CMD ["npm","start"]