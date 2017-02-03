FROM node

ARG GOOGLE_CLIENT_ID

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --quiet

# Bundle app source
COPY . /usr/src/app

ENV STAGING=production
ENV PORT=4000

RUN ./node_modules/.bin/webpack --config webpack.config.js

EXPOSE 4000

CMD [ "npm", "start" ]
