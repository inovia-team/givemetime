FROM node

ARG GOOGLE_CLIENT_ID
ARG API_URL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV=production
ENV PORT=4000

RUN ./node_modules/.bin/webpack --config webpack.config.js

EXPOSE 3000

CMD [ "npm", "start" ]