FROM node:10-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


