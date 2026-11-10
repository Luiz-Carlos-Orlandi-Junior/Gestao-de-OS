FROM node:26-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npx prisma generate              
RUN npm run build              

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]

