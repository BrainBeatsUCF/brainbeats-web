FROM node:10

# Remove node_modules from current directory.
RUN rm -rf node_modules

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]