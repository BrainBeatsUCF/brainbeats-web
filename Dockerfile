FROM node:10

# Remove node_modules from current directory.
RUN rm -rf node_modules

ARG apikey="c821d8b780a5b719de0140374619879929e34521"

# Copy .npmrc
RUN touch /root/.npmrc

RUN echo //npm.pkg.github.com/:_authToken=${apikey} > /root/.npmrc

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]