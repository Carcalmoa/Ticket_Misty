FROM node:19.6.1-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 8093

# Arranca la aplicación
CMD ["npm", "start"]