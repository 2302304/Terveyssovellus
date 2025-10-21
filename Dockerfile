FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma client pitää generoida ennen sovelluksen käynnistystä
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]
