FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install -g yarn && yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]