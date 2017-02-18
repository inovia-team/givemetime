const express = require('express');
const gAuth = require('./auth/google-oauth');
const gAuthMock = require('./auth/google-oauth-dev-mock');
const pgFetch = require('./auth/db-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const handlers = require('./lib/handlers');
const errorMiddleware = require('./lib/config').errorMiddleware;
const app = express();
const pgJwt = require('./auth/jwt');
const PORT = require('./lib/config.js').API_PORT;
const JWT_SECRET = require('./lib/config.js').JWT_SECRET;
// set cors headers first or you get an error
app.use(cors());

// TODO: server tests

// parse json body
app.use(bodyParser.json());

// handle auth requests
//   - get access_token from parameters
//   - check it against whatever is relevant
//   - ask the db to upsert this user
//   - create a jwt token with the user id
app.post('/jwt_auth', process.env.GOOGLE_AUTH_MOCK ? gAuthMock : gAuth);
app.use(pgFetch);
app.use(pgJwt(JWT_SECRET));
// endpoints

app.post('/project', handlers.project.s.post);
app.post('/project/give/:id', handlers.project.give.s.post);
app.get('/project/:id', handlers.project.s.get);
app.put('/project/:id', handlers.project.s.put);
app.delete('/project/:id', handlers.project.s.delete);
app.get('/projects', handlers.projects.s.get);
app.post('/login', handlers.login.s.post);

app.use(errorMiddleware);

console.log(`Listening to port ${PORT}`);
app.listen(PORT);

module.exports = app;
