# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:10

# Api key for brainbeats packages.
ARG apikey="INSERT_GITHUB_AUTH_TOKEN_HERE"
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /app

 # Copy .npmrc
RUN touch /root/.npmrc

RUN echo //npm.pkg.github.com/:_authToken=${apikey} > /root/.npmrc

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Copies everything over to Docker environment
COPY . .

# Remove node_modules from current directory.
RUN rm -rf node_modules

# Installs all node packages
RUN npm install

# Update npm packages (remove lost links and paths)
RUN npm update
 
# Uses port which is used by the actual application
EXPOSE 3000
 
# Finally runs the application
CMD [ "npm", "start" ]