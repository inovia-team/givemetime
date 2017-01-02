'use strict';

module.exports.post = function(req, res, next) {
  var pg = require('pg');
  var id = req.body.id;
  const env = process.env;

  // create a config to configure both pooling behavior
  // and client options
  // note: all config is optional and the environment variables
  // will be read if the config is not present
  var config = {
    user: env.PGUSER, //env var: PGUSER
    database: env.PGDATABASE, //env var: PGDATABASE
    password: env.PGPASSWORD, //env var: PGPASSWORD
    host: env.PGHOST, // Server hosting the postgres database
    port: env.PGPORT, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };



  //this initializes a connection pool
  //it will keep idle connections open for a 30 seconds
  //and set a limit of maximum 10 idle clients
  var pool = new pg.Pool(config);

  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM give_me_time_public.person WHERE id=($1)', [id], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result.rows[0]);
    });
  });
}
