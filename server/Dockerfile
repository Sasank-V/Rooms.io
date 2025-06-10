# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# For production, this would typically run the compiled JS: CMD ["node", "dist/index.js"]
CMD ["npm", "run", "dev"]