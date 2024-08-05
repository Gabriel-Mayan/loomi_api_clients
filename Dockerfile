FROM node:20

WORKDIR /

COPY package.json yarn.lock ./

RUN npm install yarn && yarn install --production

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
