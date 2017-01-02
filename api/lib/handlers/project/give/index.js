'use strict';

module.exports.post = function(req, res, next) {
  var pg = require('pg');
const env = process.env;

var config = {
  user: env.PGUSER,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  port: env.PGPORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

  const id = req.params.id;
  const amount = req.body.amount;
  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT give_me_time_public.project_give_time ($1, $2)', [id, amount], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
};
