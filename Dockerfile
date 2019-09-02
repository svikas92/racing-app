FROM node:latest
WORKDIR /src
COPY package.json /src
RUN npm install
RUN npm install -g ts-node
RUN npm install -g nodemon
COPY ./ /src
COPY tsconfig.json /src
COPY tsconfig.json /src