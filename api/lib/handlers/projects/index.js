'use strict';

module.exports.get = function(req, res, next) {
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

  var pool = new pg.Pool(config);
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM give_me_time_public.project', [], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      var roundedRes = result.rows.map((row) => {
          row.acquired = Math.round(parseInt(row.acquired));
          row.estimate = Math.round(parseInt(row.estimate));
          return row
      });
      res.send(roundedRes);
    });
  });
};
