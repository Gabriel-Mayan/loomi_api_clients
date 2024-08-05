FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --ignore-engines

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
