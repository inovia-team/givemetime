const express = require('express')
const postgraphql = require('postgraphql').default
const gAuth = require('./auth/google-oauth')
const gAuthMock = require('./auth/google-oauth-dev-mock')
const pgFetch = require('./auth/db-fetch')
const pgJwt = require('./auth/pg-jwt')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const env = process.env

const JWT_SECRET = 'supersecret';

// set cors headers first or you get an error
app.use(cors())

// TODO: eslint
// TODO: server tests

// parse json body
app.use(bodyParser.json())

// handle auth requests
//   - get access_token from parameters
//   - check it against whatever is relevant
//   - ask the db to upsert this user
//   - create a jwt token with the user id
app.post('/jwt_auth', process.env.GOOGLE_AUTH_MOCK ? gAuthMock : gAuth)
app.use(pgFetch)
app.use(pgJwt(JWT_SECRET))

// graphql endpoint
app.use('/graphql', postgraphql(
    `postgres://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
    'give_me_time_public',
    {
        development: true,
        secret: JWT_SECRET,
        log: true,
        // any non logged user is not admin
        anonymousRole: 'give_me_time_user'
    }
))

console.log('Listening to port 3000')
app.listen(3000)