FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

CMD [ "cd", "client" ]

COPY package.json package.json

RUN npm install 

COPY . .

RUN npm run build

CMD ["cd",".."]

COPY . .

CMD [ "npm", "start" ]